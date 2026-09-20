/**
 * The sugya file: one passage as JSON, everything the page renders and
 * nothing it derives. `parseSugya` turns a parsed file into a `Sugya`,
 * reporting every fault at once with the path it sits at; `toJson` and
 * `stringify` go the other way, in one canonical key order, so a file that
 * has been through them once is byte-stable. `SUGYA_JSON_FORMAT.md` at the
 * repository root is the reference; this module is the implementation.
 *
 * Shape, in brief. The file is the sugya's metadata plus `units`, one record
 * per sentence. A unit is its text (`he`, `en`, `short`), who says it
 * (`speaker`), the ch. 9 move it makes (`move`: element, subtype, what it acts
 * on, the phrase that licensed the label, whether Ramchal gave it), where its
 * authority comes from (`provenance`), the anatomy layer (`anatomy`), the
 * word-level roles (`spans`: which words are the subject, the predicate, a
 * premise…, each span located by ranges into `he` and `en` and carrying its
 * own note and loudness once) and a `note`. Layers are separate
 * keys so a future one — the warrant, the axis — is a new sibling of `move`,
 * not a change to it.
 *
 * Strictness. Unknown keys are faults, because the files are written by hand
 * and by agents and a misspelt key would otherwise vanish silently. The one
 * exception is `ext`, a bag for data the format does not yet name: it is
 * carried through and read by nothing. When a key in `ext` earns a renderer,
 * it moves out of `ext` and into the schema, and `version` steps.
 */

import { ANATOMY_KEYS, BASES, PARTIES, type AnatomyKey, type Annotation, type Party } from "./anatomy.ts";
import {
  parseRange,
  printRange,
  rangeFault,
  SPAN_ROLES,
  SPAN_TEXTS,
  wordCount,
  type Span,
  type SpanRole,
  type Spans,
  type SpanText,
  type WordRange,
} from "./spans.ts";
import {
  analyze,
  COLLECTIONS,
  PROVENANCES,
  type Collection,
  type LabelBasis,
  type Provenance,
  type Sugya,
  type Unit,
} from "./sugya.ts";
import { ELEMENTS, SUBTYPES, type Element, type Move } from "./taxonomy.ts";

export const FORMAT = "derech-tevunos/sugya";
export const FORMAT_VERSION = 1;

// --- the shape on disk --------------------------------------------------------

export type MoveJson = {
  readonly element: Element;
  readonly subtype: string;
  readonly target?: string;
  readonly marker?: string;
  readonly attested?: boolean;
};

export type AnnotationJson = {
  readonly kind: AnatomyKey;
  readonly basis?: LabelBasis;
  readonly note?: string;
};

/**
 * A span's ranges into one text on disk: one range is its string (`"3"`,
 * `"2-4"`), several — a span discontinuous in that text — are a list. Word
 * positions are 1-based and inclusive; see `spans.ts`.
 */
export type RangesJson = string | readonly string[];

/**
 * One span on disk: where it is in each text the classifier indexed (at
 * least one of `he` / `en`), `showLoud: true` on the rare span the passage's
 * logic turns on, and a `note` saying why these words are that role. Quiet
 * and unexplained is `{ "he": "2-4", "en": "3-6" }` and nothing more.
 */
export type SpanJson = {
  readonly he?: RangesJson;
  readonly en?: RangesJson;
  readonly showLoud?: boolean;
  readonly note?: string;
};

/** A unit's spans on disk: by role, each a list of spans in sentence order. */
export type SpansJson = Readonly<Partial<Record<SpanRole, readonly SpanJson[]>>>;

export type UnitJson = {
  readonly id: string;
  readonly speaker?: string;
  readonly short?: string;
  readonly he?: string;
  readonly en: string;
  readonly move: MoveJson;
  readonly provenance?: Provenance;
  readonly anatomy?: readonly AnnotationJson[];
  readonly spans?: SpansJson;
  readonly note?: string;
  readonly ext?: Readonly<Record<string, unknown>>;
};

export type SugyaJson = {
  readonly $schema?: string;
  readonly format: typeof FORMAT;
  readonly version: typeof FORMAT_VERSION;
  readonly id: string;
  readonly title: string;
  readonly tractate: string;
  readonly folio: string;
  readonly discussedAt: string;
  readonly party?: Party;
  readonly collection?: Collection;
  readonly about?: readonly string[];
  readonly hint?: string;
  readonly units: readonly UnitJson[];
  readonly ext?: Readonly<Record<string, unknown>>;
};

/** Key order on disk. Also the closed list of keys a record may carry. */
const SUGYA_FIELDS = ["$schema", "format", "version", "id", "title", "tractate", "folio", "discussedAt", "party", "collection", "about", "hint", "units", "ext"] as const;
const UNIT_FIELDS = ["id", "speaker", "short", "he", "en", "move", "provenance", "anatomy", "spans", "note", "ext"] as const;
const MOVE_FIELDS = ["element", "subtype", "target", "marker", "attested"] as const;
const ANNOTATION_FIELDS = ["kind", "basis", "note"] as const;
/** Key order on disk for one span, and the closed list of keys it may carry. */
export const SPAN_FIELDS = ["he", "en", "showLoud", "note"] as const;

// --- reading ------------------------------------------------------------------

/** Every fault in a file, each with the JSON path it was found at. */
export class SugyaFormatError extends Error {
  readonly faults: readonly string[];
  constructor(source: string, faults: readonly string[]) {
    super(`${source}: ${faults.length} fault${faults.length === 1 ? "" : "s"}\n  ${faults.join("\n  ")}`);
    this.name = "SugyaFormatError";
    this.faults = faults;
  }
}

type Faults = string[];

/** Record a fault and yield nothing, so a reader can `return fault(…)`. */
const fault = (faults: Faults, message: string): undefined => {
  faults.push(message);
  return undefined;
};

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const show = (v: unknown): string => {
  const s = JSON.stringify(v);
  return s === undefined ? String(v) : s.length > 60 ? `${s.slice(0, 57)}…` : s;
};

/** Levenshtein within 2, for "did you mean". Short keys only, so the naive form is fine. */
const nearest = (key: string, allowed: readonly string[]): string | undefined => {
  const distance = (a: string, b: string): number => {
    const row = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i += 1) {
      let prev = row[0]!;
      row[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const cur = row[j]!;
        row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = cur;
      }
    }
    return row[b.length]!;
  };
  return allowed.find((k) => distance(key.toLowerCase(), k.toLowerCase()) <= 2);
};

const unknownKeys = (obj: Record<string, unknown>, allowed: readonly string[], path: string, faults: Faults): void => {
  for (const key of Object.keys(obj)) {
    if (allowed.includes(key)) continue;
    const hint = nearest(key, allowed);
    faults.push(`${path}.${key}: unknown key${hint === undefined ? "" : ` (did you mean "${hint}"?)`}`);
  }
};

const string = (obj: Record<string, unknown>, key: string, path: string, faults: Faults, required: boolean): string | undefined => {
  const v = obj[key];
  if (v === undefined) {
    if (required) faults.push(`${path}.${key}: required`);
    return undefined;
  }
  if (typeof v !== "string") {
    faults.push(`${path}.${key}: expected a string, got ${show(v)}`);
    return undefined;
  }
  if (required && v.trim() === "") faults.push(`${path}.${key}: must not be empty`);
  return v;
};

const oneOf = <T extends string>(obj: Record<string, unknown>, key: string, allowed: readonly T[], path: string, faults: Faults, required: boolean): T | undefined => {
  const v = string(obj, key, path, faults, required);
  if (v === undefined) return undefined;
  if ((allowed as readonly string[]).includes(v)) return v as T;
  const hint = nearest(v, allowed);
  // A short list is spelt out; the anatomy labels are not.
  const expected = allowed.length <= 8
    ? allowed.map((a) => `"${a}"`).join(" | ")
    : `the ${allowed.length} values allowed for "${key}"`;
  faults.push(`${path}.${key}: ${show(v)} is not one of ${expected}${hint === undefined ? "" : ` (did you mean "${hint}"?)`}`);
  return undefined;
};

const boolean = (obj: Record<string, unknown>, key: string, path: string, faults: Faults): boolean | undefined => {
  const v = obj[key];
  if (v === undefined) return undefined;
  if (typeof v !== "boolean") {
    faults.push(`${path}.${key}: expected true or false, got ${show(v)}`);
    return undefined;
  }
  return v;
};

const bag = (obj: Record<string, unknown>, path: string, faults: Faults): Readonly<Record<string, unknown>> | undefined => {
  const v = obj["ext"];
  if (v === undefined) return undefined;
  if (!isRecord(v)) {
    faults.push(`${path}.ext: expected an object, got ${show(v)}`);
    return undefined;
  }
  return v;
};

const paragraphs = (obj: Record<string, unknown>, key: string, path: string, faults: Faults): readonly string[] | undefined => {
  const v = obj[key];
  if (v === undefined) return undefined;
  if (!Array.isArray(v) || !v.every((p): p is string => typeof p === "string")) {
    faults.push(`${path}.${key}: expected an array of strings, got ${show(v)}`);
    return undefined;
  }
  return v;
};

const readMove = (raw: unknown, path: string, faults: Faults): { move: Move; target?: string; marker?: string; attested?: boolean } | undefined => {
  if (!isRecord(raw)) {
    faults.push(`${path}: expected an object { element, subtype, … }, got ${show(raw)}`);
    return undefined;
  }
  unknownKeys(raw, MOVE_FIELDS, path, faults);
  const element = oneOf(raw, "element", ELEMENTS, path, faults, true);
  const subtypeRaw = string(raw, "subtype", path, faults, true);
  const target = string(raw, "target", path, faults, false);
  const marker = string(raw, "marker", path, faults, false);
  const attested = boolean(raw, "attested", path, faults);
  if (element === undefined || subtypeRaw === undefined) return undefined;
  const subtypes = SUBTYPES[element];
  if (!subtypes.includes(subtypeRaw)) {
    const hint = nearest(subtypeRaw, subtypes);
    faults.push(`${path}.subtype: ${show(subtypeRaw)} is not a subtype of "${element}" (expected ${subtypes.map((s) => `"${s}"`).join(" | ")})${hint === undefined ? "" : ` (did you mean "${hint}"?)`}`);
    return undefined;
  }
  const move = { element, subtype: subtypeRaw } as Move;
  return {
    move,
    ...(target === undefined ? {} : { target }),
    ...(marker === undefined ? {} : { marker }),
    ...(attested === undefined ? {} : { attested }),
  };
};

const readAnnotation = (raw: unknown, path: string, faults: Faults): Annotation | undefined => {
  if (!isRecord(raw)) {
    faults.push(`${path}: expected an object { kind, … }, got ${show(raw)}`);
    return undefined;
  }
  unknownKeys(raw, ANNOTATION_FIELDS, path, faults);
  const kind = oneOf(raw, "kind", ANATOMY_KEYS, path, faults, true);
  const basis = oneOf(raw, "basis", BASES, path, faults, false);
  const note = string(raw, "note", path, faults, false);
  if (kind === undefined) return undefined;
  return { kind, ...(basis === undefined ? {} : { basis }), ...(note === undefined ? {} : { note }) };
};

/** A span's ranges into one text: a range string, or a list of them. Every range must fit the text's `count` words. */
const readRanges = (raw: unknown, count: number, path: string, faults: Faults): readonly WordRange[] | undefined => {
  const items = typeof raw === "string" ? [raw] : Array.isArray(raw) ? raw : undefined;
  if (items === undefined || !items.every((r): r is string => typeof r === "string")) {
    faults.push(`${path}: expected a word range like "3" or "2-4", or a list of them, got ${show(raw)}`);
    return undefined;
  }
  if (items.length === 0) {
    faults.push(`${path}: a span needs at least one range here, or leave the text out`);
    return undefined;
  }
  const ranges = items.map((item, i) => {
    const where = items.length === 1 ? path : `${path}[${i}]`;
    const range = parseRange(item);
    if (range === undefined) return fault(faults, `${where}: expected a word range like "3" or "2-4", got ${show(item)}`);
    const problem = rangeFault(range, count);
    return problem === undefined ? range : fault(faults, `${where}: ${problem}`);
  });
  return ranges.every((r): r is WordRange => r !== undefined) ? ranges : undefined;
};

type UnitTexts = { readonly he?: string; readonly en?: string };

/**
 * One span: `{ he?, en?, showLoud?, note? }`, at least one text located. A
 * text the unit does not have cannot be indexed, and says so. A
 * `showLoud: false` is allowed and means quiet; the writer drops it. An empty
 * note is a fault: write the reason or leave the key out.
 */
const readSpan = (raw: unknown, unit: UnitTexts, path: string, faults: Faults): Span | undefined => {
  if (!isRecord(raw)) {
    faults.push(`${path}: expected a span { he, en, showLoud, note }, got ${show(raw)}`);
    return undefined;
  }
  unknownKeys(raw, SPAN_FIELDS, path, faults);
  const located = SPAN_TEXTS.flatMap((text) => {
    const value = raw[text];
    if (value === undefined) return [];
    const source = unit[text];
    if (source === undefined) return [fault(faults, `${path}.${text}: the unit has no "${text}" to index`)];
    const ranges = readRanges(value, wordCount(source), `${path}.${text}`, faults);
    return ranges === undefined ? [undefined] : [[text, ranges] as const];
  });
  const loud = boolean(raw, "showLoud", path, faults);
  const note = string(raw, "note", path, faults, false);
  if (note !== undefined && note.trim() === "") faults.push(`${path}.note: must not be empty — say why these words are the role, or leave it out`);
  if (located.length === 0) return fault(faults, `${path}: a span is located in at least one text, "he" or "en"`);
  if (located.some((e) => e === undefined)) return undefined;
  const texts = Object.fromEntries(located.filter((e): e is readonly [SpanText, readonly WordRange[]] => e !== undefined)) as Partial<Record<SpanText, readonly WordRange[]>>;
  return {
    ...texts,
    ...(loud === true ? { showLoud: true as const } : {}),
    ...(note === undefined ? {} : { note }),
  };
};

/** A unit's spans: by role, every role one of the seven, each a non-empty list of spans. */
const readSpans = (raw: unknown, unit: UnitTexts, path: string, faults: Faults): Spans | undefined => {
  if (!isRecord(raw)) {
    faults.push(`${path}: expected an object { subject, predicate, … }, got ${show(raw)}`);
    return undefined;
  }
  unknownKeys(raw, SPAN_ROLES, path, faults);
  type Entry = readonly [SpanRole, readonly Span[]];
  const entries: readonly (Entry | undefined)[] = SPAN_ROLES.flatMap((role): readonly (Entry | undefined)[] => {
    const value: unknown = raw[role];
    if (value === undefined) return [];
    if (!Array.isArray(value)) return [fault(faults, `${path}.${role}: expected a list of spans [{ he, en, … }], got ${show(value)}`)];
    if (value.length === 0) return [fault(faults, `${path}.${role}: a role needs at least one span`)];
    const spans = value.map((item: unknown, i) => readSpan(item, unit, `${path}.${role}[${i}]`, faults));
    return spans.every((s): s is Span => s !== undefined) ? [[role, spans]] : [undefined];
  });
  if (entries.some((e) => e === undefined)) return undefined;
  return Object.fromEntries(entries.filter((e): e is Entry => e !== undefined)) as Spans;
};

const readUnit = (raw: unknown, path: string, faults: Faults): Unit | undefined => {
  if (!isRecord(raw)) {
    faults.push(`${path}: expected an object, got ${show(raw)}`);
    return undefined;
  }
  unknownKeys(raw, UNIT_FIELDS, path, faults);
  const id = string(raw, "id", path, faults, true);
  const speaker = string(raw, "speaker", path, faults, false);
  const short = string(raw, "short", path, faults, false);
  const he = string(raw, "he", path, faults, false);
  const en = string(raw, "en", path, faults, true);
  const moveRead = raw["move"] === undefined
    ? fault(faults, `${path}.move: required`)
    : readMove(raw["move"], `${path}.move`, faults);
  const provenance = oneOf(raw, "provenance", PROVENANCES, path, faults, false);
  const note = string(raw, "note", path, faults, false);
  const ext = bag(raw, path, faults);

  const anatomyRaw = raw["anatomy"];
  const anatomy = anatomyRaw === undefined
    ? undefined
    : !Array.isArray(anatomyRaw)
      ? fault(faults, `${path}.anatomy: expected an array, got ${show(anatomyRaw)}`)
      : anatomyRaw.map((a, i) => readAnnotation(a, `${path}.anatomy[${i}]`, faults));

  const spansRaw = raw["spans"];
  const spans = spansRaw === undefined
    ? undefined
    : readSpans(spansRaw, { ...(he === undefined ? {} : { he }), ...(en === undefined ? {} : { en }) }, `${path}.spans`, faults);

  if (id === undefined || en === undefined || moveRead === undefined) return undefined;
  if (anatomy?.some((a) => a === undefined)) return undefined;
  if (spansRaw !== undefined && spans === undefined) return undefined;
  return {
    id,
    ...(speaker === undefined ? {} : { speaker }),
    ...(short === undefined ? {} : { short }),
    ...(he === undefined ? {} : { he }),
    en,
    move: moveRead.move,
    ...(moveRead.target === undefined ? {} : { target: moveRead.target }),
    ...(moveRead.marker === undefined ? {} : { marker: moveRead.marker }),
    ...(moveRead.attested === undefined ? {} : { attested: moveRead.attested }),
    ...(provenance === undefined ? {} : { provenance }),
    ...(anatomy === undefined ? {} : { anatomy: anatomy as Annotation[] }),
    ...(spans === undefined ? {} : { spans }),
    ...(note === undefined ? {} : { note }),
    ...(ext === undefined ? {} : { ext }),
  };
};

/**
 * A parsed file to a `Sugya`, or a `SugyaFormatError` naming every fault.
 * `source` is only for the message — a file name, a URL, "pasted text".
 * The structural rules (`analyze`: ids unique, every target earlier, edge
 * labels on moves that act on something) are applied after the shape is
 * right, so a file that passes here is a file the page can render.
 */
export const parseSugya = (input: unknown, source = "sugya"): Sugya => {
  const faults: Faults = [];
  if (!isRecord(input)) throw new SugyaFormatError(source, [`$: expected an object, got ${show(input)}`]);
  const path = "$";
  unknownKeys(input, SUGYA_FIELDS, path, faults);

  const format = string(input, "format", path, faults, true);
  if (format !== undefined && format !== FORMAT) faults.push(`${path}.format: expected "${FORMAT}", got ${show(format)}`);
  const version = input["version"];
  if (version === undefined) faults.push(`${path}.version: required`);
  else if (version !== FORMAT_VERSION) faults.push(`${path}.version: this reader understands version ${FORMAT_VERSION}, got ${show(version)}`);
  string(input, "$schema", path, faults, false);

  const id = string(input, "id", path, faults, true);
  const title = string(input, "title", path, faults, true);
  const tractate = string(input, "tractate", path, faults, true);
  const folio = string(input, "folio", path, faults, true);
  const discussedAt = string(input, "discussedAt", path, faults, true);
  const party = oneOf(input, "party", PARTIES, path, faults, false);
  const collection = oneOf(input, "collection", COLLECTIONS, path, faults, false);
  const about = paragraphs(input, "about", path, faults);
  const hint = string(input, "hint", path, faults, false);
  const ext = bag(input, path, faults);

  const unitsRaw = input["units"];
  const units = unitsRaw === undefined
    ? (fault(faults, `${path}.units: required`) ?? [])
    : !Array.isArray(unitsRaw)
      ? (fault(faults, `${path}.units: expected an array, got ${show(unitsRaw)}`) ?? [])
      : unitsRaw.map((u, i) => readUnit(u, `${path}.units[${i}]`, faults));
  if (Array.isArray(unitsRaw) && unitsRaw.length === 0) faults.push(`${path}.units: a sugya has at least one sentence`);

  if (faults.length > 0 || id === undefined || title === undefined || tractate === undefined || folio === undefined || discussedAt === undefined) {
    throw new SugyaFormatError(source, faults);
  }
  const sugya: Sugya = {
    id,
    title,
    tractate,
    folio,
    discussedAt,
    ...(party === undefined ? {} : { party }),
    ...(collection === undefined ? {} : { collection }),
    ...(about === undefined ? {} : { about }),
    ...(hint === undefined ? {} : { hint }),
    units: units as Unit[],
    ...(ext === undefined ? {} : { ext }),
  };
  try {
    analyze(sugya);
  } catch (e) {
    throw new SugyaFormatError(source, [`$.units: ${e instanceof Error ? e.message : String(e)}`]);
  }
  return sugya;
};

// --- writing ------------------------------------------------------------------

const moveJson = (unit: Unit): MoveJson => ({
  element: unit.move.element,
  subtype: unit.move.subtype,
  ...(unit.target === undefined ? {} : { target: unit.target }),
  ...(unit.marker === undefined ? {} : { marker: unit.marker }),
  ...(unit.attested === undefined ? {} : { attested: unit.attested }),
});

const annotationJson = (a: Annotation): AnnotationJson => ({
  kind: a.kind,
  ...(a.basis === undefined ? {} : { basis: a.basis }),
  ...(a.note === undefined ? {} : { note: a.note }),
});

/** One range is written as its string, several as a list — the shortest form that reads back the same. */
const rangesJson = (ranges: readonly WordRange[]): RangesJson =>
  ranges.length === 1 ? printRange(ranges[0]!) : ranges.map(printRange);

/** Keys in `SPAN_FIELDS` order: the texts, then the flag, then the reason. A quiet, unexplained span is its two texts and nothing more. */
const spanJson = (span: Span): SpanJson => ({
  ...(span.he === undefined ? {} : { he: rangesJson(span.he) }),
  ...(span.en === undefined ? {} : { en: rangesJson(span.en) }),
  ...(span.showLoud === true ? { showLoud: true } : {}),
  ...(span.note === undefined ? {} : { note: span.note }),
});

/** Roles in the order `SPAN_ROLES` gives them, spans in the order the file gives them, so a file is canonical. */
const spansJson = (spans: Spans): SpansJson =>
  Object.fromEntries(
    SPAN_ROLES.flatMap((role) => {
      const list = spans[role];
      return list === undefined ? [] : [[role, list.map(spanJson)] as const];
    }),
  ) as SpansJson;

const unitJson = (unit: Unit): UnitJson => ({
  id: unit.id,
  ...(unit.speaker === undefined ? {} : { speaker: unit.speaker }),
  ...(unit.short === undefined ? {} : { short: unit.short }),
  ...(unit.he === undefined ? {} : { he: unit.he }),
  en: unit.en,
  move: moveJson(unit),
  ...(unit.provenance === undefined ? {} : { provenance: unit.provenance }),
  ...(unit.anatomy === undefined ? {} : { anatomy: unit.anatomy.map(annotationJson) }),
  ...(unit.spans === undefined ? {} : { spans: spansJson(unit.spans) }),
  ...(unit.note === undefined ? {} : { note: unit.note }),
  ...(unit.ext === undefined ? {} : { ext: unit.ext }),
});

/** The file's object form, keys in canonical order, nothing undefined. */
export const toJson = (sugya: Sugya, schema = "./sugya.schema.json"): SugyaJson => ({
  $schema: schema,
  format: FORMAT,
  version: FORMAT_VERSION,
  id: sugya.id,
  title: sugya.title,
  tractate: sugya.tractate,
  folio: sugya.folio,
  discussedAt: sugya.discussedAt,
  ...(sugya.party === undefined ? {} : { party: sugya.party }),
  ...(sugya.collection === undefined ? {} : { collection: sugya.collection }),
  ...(sugya.about === undefined ? {} : { about: sugya.about }),
  ...(sugya.hint === undefined ? {} : { hint: sugya.hint }),
  units: sugya.units.map(unitJson),
  ...(sugya.ext === undefined ? {} : { ext: sugya.ext }),
});

const INLINE_WIDTH = 140;

const isScalar = (v: unknown): boolean => v === null || typeof v !== "object";

/**
 * JSON with a reader in mind: a record or list whose members are all scalars
 * goes on one line when it fits, so a `move` reads as one line and a list of
 * paragraphs as one per line. Everything else is nested two spaces at a time.
 */
const pretty = (value: unknown, indent: string): string => {
  if (isScalar(value)) return JSON.stringify(value);
  const inner = `${indent}  `;
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const flat = `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
    if (value.every(isScalar) && flat.length + indent.length <= INLINE_WIDTH) return flat;
    return `[\n${value.map((v) => `${inner}${pretty(v, inner)}`).join(",\n")}\n${indent}]`;
  }
  const entries = Object.entries(value as Record<string, unknown>).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return "{}";
  const flat = `{ ${entries.map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(", ")} }`;
  if (entries.every(([, v]) => isScalar(v)) && flat.length + indent.length <= INLINE_WIDTH) return flat;
  return `{\n${entries.map(([k, v]) => `${inner}${JSON.stringify(k)}: ${pretty(v, inner)}`).join(",\n")}\n${indent}}`;
};

/** The file's text: `toJson`, printed canonically, with a trailing newline. */
export const stringify = (sugya: Sugya, schema?: string): string => `${pretty(toJson(sugya, schema), "")}\n`;
