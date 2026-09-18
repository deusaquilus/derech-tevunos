# Categorization reason — every label carries its case (`why`)

*Plan written 2026-09-18. Status: **todo**. Format version steps 1 → 2.*

This plan is written for an implementing agent who has not read the rest of the
repository. Every file it touches is named with its path; every change has the
code to paste or a before/after pair; every decision that could be reopened is
closed in §0. Read `AGENTS.md` first anyway — the rules there (no `any`, no
loosened checks, comments travel verbatim, `--dt-*` tokens, exhaustive `switch`
with an inline `never`) apply to all of this.

---

## 0. Decisions already taken — do not reopen

The owner made these on 2026-09-18 after the analysis in the chat that produced
this plan. Implement them as written.

| # | Question | Decision |
|---|---|---|
| 1 | Where does the rationale live? | A new **structured** field named **`why`**. The free-text `note` is **removed** from units and from annotations. No backwards compatibility with version 1 files: this is an early-stage project and the reader refuses `version: 1`. |
| 2 | What if a label has no `why`? | The popup shows exactly what it shows today: the type's general explanation. Nothing says "no reason recorded". |
| 3 | How is the general explanation hidden? | The popup becomes **interactive** and the general explanation sits under a **fold** ("▸ what *handed down* means") whose open/closed state is **one remembered setting** in `localStorage`, shared by every popup. Default closed. |
| 4 | Empty-rationale wording? | None. See 2. |
| 5 | Which labels get a `why`? | The ch. 9 move (`move.why`), every ch. 1–8 annotation (`anatomy[].why`), the unit's `provenance` and the sugya's `party` — the last two by letting the bare word be written as `{ "kind": word, "why": … }`. The derived ground badge (read off `provenance`) shows the provenance's `why`. |
| 6 | A `basis: "marked"` annotation must quote its stock word | Yes: `why.evidence` is required when `basis` is `marked`. The reader faults it otherwise. |
| 7 | Is the move label text a popup anchor? | Yes. Today only the element icon has the move's popup; the words "brings proof · הוכחה · demonstration" get the same popup. |

Terminology used below: a **label** is any vocabulary word the file assigns (a
move leaf, an anatomy kind, a provenance, a party). A label's **case** is its
`why`. The **general explanation** is what `anatomy.ts` / `taxonomy.ts` say
about the type, the same for every sentence. The **popup** is the `Tooltip`
component's content. The **fold** is the `TipDetails` component.

---

## 1. What changes for the reader

### 1.1 Today (measured 2026-09-18)

The badge popup (`BadgeTip.tsx`) renders, in this order: head (glyph · name ·
Hebrew), reads line, definition, *note* (italic, only if the annotation had
one), the "about" sentence, foot. Over the 74 types the definitions run
100–434 characters (median 171). The per-sentence note is fourth, after ~170
characters of generic text. The unit-level `note` (why this ch. 9 move) is
parsed and round-tripped by `format.ts` and **rendered nowhere**. The move
label text on the row has **no popup**; only the icon does, and its content is
entirely generic.

### 1.2 After

A badge popup whose label has a `why` (the screenshot case, once
`pesachim-liquids` carries the provenance's case):

```
┌──────────────────────────────────────────────────────────────┐
│ [glyph]  ground: tradition                        מקובלת       │
│                                                               │
│ R. Eleazar does not reason to his conclusion; he cites what   │
│ Yosi ben Yo'ezer testified. A testimony received from an      │
│ earlier generation is tradition, so the proof enters accepted │
│ and the ground it stands on is a received one.                │
│ IN THE TEXT   “העיד יוסי בן יועזר איש צרידה”                    │
│                                                               │
│ ▸ what “handed down” means                                    │
│ ───────────────────────────────────────────────────────────── │
│ Grounds · ch. 8 · Eng p114 · Heb p113 · inferred, not attested│
└──────────────────────────────────────────────────────────────┘
```

The same popup with the fold open (the state is remembered, so once opened it
is open on every popup until closed):

```
│ ▾ what “handed down” means                                    │
│ │ handed down — a verse, a halacha, an undisputed authority   │
│ │ · marked by “שנאמר · דתנן · דאמר מר”                          │
│ │ The proof rests on what was received from fathers and       │
│ │ teachers: … Two hands reaching for each other.              │
│ │ What sentence 2's move on sentence 1 stands on, or how it   │
│ │ is turned aside. Hovering highlights that sentence… Read    │
│ │ from the sentence's provenance in the file, which names its │
│ │ source; no label of its own says so.                        │
```

A badge popup whose label has **no** `why`: unchanged from today, no fold.

The move popup (on the icon **and** on the label words), when `move.why` is
given:

```
│ proof — brings proof. הוכחה · demonstration.                   │
│ The testimony is brought to establish the ruling, not merely  │
│ to support it: if the Temple liquids are clean, liquids as    │
│ such cannot be unclean by Torah law. Ramchal names it a       │
│ demonstration.                                                │
│ RAMCHAL   Heb p173, Eng p174                                  │
│ ▸ what “brings proof” means                                   │
│ ───────────────────────────────────────────────────────────── │
│ Ramchal's own label for this passage · “תדע, שהרי”             │
```

---

## 2. The format change — version 2

### 2.1 The `why` object

```jsonc
{
  "reason": "…",        // required · 1–3 sentences · what in THIS sentence makes it THIS label
  "evidence": "…",      // optional · the words of the sentence that carry it, verbatim · required when basis is "marked"
  "ratherThan": "…",    // optional · the neighbouring label considered, and the test that ruled it out · begins with that label's key
  "ramchal": "…"        // optional · where the book states the rule or labels this passage: "Heb p185", "ch. 9 p. 172"
}
```

(The comments are for this plan; JSON files carry none.)

Rules the writer follows (these go into the guide — §5.2.3 below has the text):

- **`reason` names a fact about this sentence** — its words, its target, what it
  does to the target, what the passage does with it afterwards. Test: delete
  the label's name from the reason; what remains must still pick out this
  sentence and no other. A reason that could be pasted unchanged under another
  sentence with the same label is a definition, and belongs in `anatomy.ts`,
  not in the file.
- **`reason` is plain prose for a reader of the page.** No backticks, no
  Markdown, no file names (`markers.ts`), no talk of "the fixture", "the
  taxonomy", "this file". Hebrew words may appear inline unquoted; anything
  quoted from the sentence goes in `evidence` instead.
- **`evidence` is verbatim from `he`** (or from `en` when the source is
  English). Not a paraphrase, not the whole sentence, not the `marker` again.
  Where the stock phrase brackets content — `מה … אף`, `מידי דהוה א…` — write
  it with `…` standing for the content, exactly as `marker` does.
- **`ratherThan` begins with the rejected label's key** — `resolution/settlement:
  …` for a move, `diametrically-opposed: …` for an annotation — followed by
  the test that ruled it out. The page prints it after the words *rather than*.
- **`ramchal` is a page or chapter reference**, optionally followed by the
  book's words: `"Heb p177: הנה כאן סתר שמועתו של רב פפא לחלוטין"`.

### 2.2 Where a `why` attaches

| Label | On disk | In the model (`sugya.ts`) | Popup |
|---|---|---|---|
| the ch. 9 move | `unit.move.why` | `unit.why` (beside `marker`, `attested`, which the model also lifts out of `move`) | the icon's and the label words' popup (`MoveTip`) |
| an anatomy label | `unit.anatomy[i].why` | `Annotation.why` | that badge's popup (`BadgeTip`) |
| provenance | `unit.provenance` is either `"tradition"` or `{ "kind": "tradition", "why": {…} }` | `Unit.provenance?: Labelled<Provenance>` | the derived ground badge's popup |
| party | `sugya.party` is either `"party-group"` or `{ "kind": "party-group", "why": {…} }` | `Sugya.party?: Labelled<Party>` | the strip badge's popup |

`note` is gone from units and annotations: an unknown key, refused with *did
you mean "why"?* — the Levenshtein hint will not fire (distance 4), so the
reader adds an explicit hint for exactly this key (§3.3, `unknownKeys`).

### 2.3 What the reader refuses (new faults)

| input | fault |
|---|---|
| `"version": 1` | `$.version: this reader understands version 2, got 1` |
| `"note": "…"` on a unit or annotation | `$.units[3].note: unknown key (the case for a label is "why" — on the move, the annotation, the provenance or the party)` |
| `"why": "a string"` | `$.units[3].move.why: expected an object { reason, … }, got "a string"` |
| `"why": { "evidence": "x" }` | `$.units[3].move.why.reason: required` |
| `"why": { "reason": "x", "evidnce": "y" }` | `$.units[3].move.why.evidnce: unknown key (did you mean "evidence"?)` |
| `"provenance": { "why": {…} }` | `$.units[3].provenance.kind: required` |
| `"provenance": { "kind": "hearsay" }` | `$.units[3].provenance.kind: "hearsay" is not one of "sense" \| "axiom" \| …` |
| `"provenance": 3` | `$.units[3].provenance: expected one of the allowed words or an object { kind, why }, got 3` |
| annotation `basis: "marked"` with no `why.evidence` | `$.units: <sugya-id>: unit "x" marks the label "categorical" but quotes nothing — a marked label carries its stock word in why.evidence` (a structural rule, reported from `analyze` like the edge-level rule) |

### 2.4 Canonical printing

`stringify` prints `why` as an object with keys in the order `reason`,
`evidence`, `ratherThan`, `ramchal`. A `reason` is longer than the 140-column
inline budget, so a `why` prints multi-line, and a `move` that carries one is
therefore multi-line too. A `provenance` or `party` **with no `why` prints as
the bare word**; with one, as `{ "kind": …, "why": {…} }`. Nothing else about
the printer changes.

### 2.5 A complete unit, before and after

Before (version 1, `pesachim-liquids.json`, unit `testimony`):

```json
{
  "id": "testimony",
  "speaker": "R. Eleazar",
  "he": "תדע, שהרי העיד יוסי בן יועזר איש צרידה על איל קמצא דכן ועל משקין בית מטבחיא דכן",
  "en": "Know this, for Yosi ben Yo'ezer of Zeredah testified that the ayil locust is clean and that the liquids of the Temple slaughterhouse are clean.",
  "move": { "element": "proof", "subtype": "demonstration", "target": "eleazar", "marker": "תדע, שהרי", "attested": true },
  "provenance": "tradition",
  "anatomy": [
    { "kind": "hypothetical-syllogism-tollens", "note": "If liquids could become unclean by Torah law, the liquids of the Temple slaughterhouse would be unclean; Yosi ben Yo'ezer testified they are clean; so they cannot." }
  ]
}
```

After (version 2):

```json
{
  "id": "testimony",
  "speaker": "R. Eleazar",
  "he": "תדע, שהרי העיד יוסי בן יועזר איש צרידה על איל קמצא דכן ועל משקין בית מטבחיא דכן",
  "en": "Know this, for Yosi ben Yo'ezer of Zeredah testified that the ayil locust is clean and that the liquids of the Temple slaughterhouse are clean.",
  "move": {
    "element": "proof",
    "subtype": "demonstration",
    "target": "eleazar",
    "marker": "תדע, שהרי",
    "attested": true,
    "why": {
      "reason": "The testimony is brought to establish the ruling, not merely to support it: if the Temple liquids are clean, liquids as such cannot be unclean by Torah law. Ramchal names it a demonstration.",
      "ramchal": "Heb p173, Eng p174"
    }
  },
  "provenance": {
    "kind": "tradition",
    "why": {
      "reason": "R. Eleazar does not reason to his conclusion; he cites what Yosi ben Yo'ezer testified. A testimony received from an earlier generation is tradition, so the proof enters accepted and the ground it stands on is a received one.",
      "evidence": "העיד יוסי בן יועזר איש צרידה"
    }
  },
  "anatomy": [
    {
      "kind": "hypothetical-syllogism-tollens",
      "why": {
        "reason": "If liquids could become unclean by Torah law, the liquids of the Temple slaughterhouse would be unclean; Yosi ben Yo'ezer testified they are clean; so they cannot."
      }
    }
  ]
}
```

---

## 3. Code — file by file, in this order

Work in this order so that the typechecker (`cd site && npm run typecheck`)
leads you from one file to the next. Do not run `npm run check` expecting green
until step §3.6 is done and the data in §4 is migrated.

### 3.1 `site/src/rail/sugya.ts`

Add, directly after the `SELF_AUTHORISING` constant:

```ts
/**
 * The case for a label: why *this* sentence carries *this* label, written for
 * the reader of the page and shown before the type's general definition.
 * `reason` is what in the sentence makes it so; `evidence` the words that
 * carry it, verbatim from the text; `ratherThan` the neighbouring label that
 * was considered and the test that ruled it out; `ramchal` where the book
 * states the rule or labels this passage. A label with no `why` is shown with
 * the general definition alone.
 */
export type Why = {
  readonly reason: string;
  readonly evidence?: string;
  readonly ratherThan?: string;
  readonly ramchal?: string;
};

/**
 * A word from a closed vocabulary, given as a label, with the case for it when
 * one is made. On disk the bare word is the shorthand for `{ kind }`.
 */
export type Labelled<K extends string> = {
  readonly kind: K;
  readonly why?: Why;
};
```

In `Unit`:

- replace `readonly provenance?: Provenance;` with
  `readonly provenance?: Labelled<Provenance>;`
- replace `readonly note?: string;` with

```ts
  /** The case for `move`: why this sentence does what its label says. */
  readonly why?: Why;
```

In `Sugya`: replace `readonly party?: Party;` with `readonly party?: Labelled<Party>;`
(keep its doc comment).

In `baseStatus`: `SELF_AUTHORISING.includes(unit.provenance?.kind ?? "asserted")`.

### 3.2 `site/src/rail/anatomy.ts`

Import line becomes:

```ts
import type { LabelBasis, Labelled, Provenance, Why } from "./sugya.ts";
```

Replace the `Annotation` type's body: `note?: string` → `why?: Why`. Keep its doc
comment.

Replace the `Badge` type and `badgeOf` with:

```ts
/**
 * Where a badge came from: a label written in the file's `anatomy` (or its
 * `party`), a ground read off the unit's `provenance`, or the Talmud's own
 * voice read off the file's silence about who is speaking. The popup says so
 * for the two that are read off rather than written.
 */
export type BadgeOrigin = "label" | "provenance" | "silence";

/** A badge to draw: an annotation with its vocabulary entry resolved. */
export type Badge = {
  readonly info: AnatomyInfo;
  readonly basis: LabelBasis;
  readonly origin: BadgeOrigin;
  readonly why?: Why;
};

export const badgeOf = (annotation: Annotation): Badge => ({
  info: ANATOMY[annotation.kind],
  basis: basisOf(annotation),
  origin: "label",
  ...(annotation.why === undefined ? {} : { why: annotation.why }),
});
```

`speakerBadge`: add `origin: "silence"` to the returned object.

`groundBadge`: the parameter's `provenance` becomes `Labelled<Provenance>`; the
body becomes:

```ts
  if (unit.target === undefined || !GROUND_ELEMENTS.has(unit.move.element)) return undefined;
  if ((unit.anatomy ?? []).some((a) => ANATOMY[a.kind].family === "grounds")) return undefined;
  const provenance = unit.provenance;
  if (provenance === undefined) return undefined;
  const kind = GROUND_OF_PROVENANCE[provenance.kind];
  if (kind === undefined) return undefined;
  return {
    info: ANATOMY[kind],
    basis: "inferred",
    origin: "provenance",
    ...(provenance.why === undefined ? {} : { why: provenance.why }),
  };
```

The string `"Read from the sentence's provenance in the file, which names its
source; no label of its own says so."` leaves this file and reappears verbatim
in `BadgeTip.tsx` (§3.11). Append one sentence to `groundBadge`'s doc comment:
`The case for the badge is the provenance's own why, when the file makes one.`

`annotationErrors` — replace the whole function and its comment:

```ts
/**
 * Why an annotation cannot sit where it was put. An edge-level type describes
 * how a sentence stands to the one it acts on, so it needs a target; a
 * row-level type is about the sentence alone and may go anywhere. And a label
 * whose basis is `marked` claims the type's stock word is in the text, so it
 * must quote it: `why.evidence` is where.
 */
export const annotationErrors = (unit: {
  readonly id: string;
  readonly target?: string;
  readonly anatomy?: readonly Annotation[];
}): readonly string[] =>
  (unit.anatomy ?? []).flatMap((a) => [
    ...(ANATOMY[a.kind].level === "edge" && unit.target === undefined
      ? [`unit "${unit.id}" carries the edge-level label "${a.kind}" but acts on nothing`]
      : []),
    ...(a.basis === "marked" && a.why?.evidence === undefined
      ? [`unit "${unit.id}" marks the label "${a.kind}" but quotes nothing — a marked label carries its stock word in why.evidence`]
      : []),
  ]);
```

### 3.3 `site/src/rail/format.ts`

**Header comment.** Replace the paragraph beginning `Shape, in brief.` with:

```
 * Shape, in brief. The file is the sugya's metadata plus `units`, one record
 * per sentence. A unit is its text (`he`, `en`, `short`), who says it
 * (`speaker`), the ch. 9 move it makes (`move`: element, subtype, what it acts
 * on, the phrase that licensed the label, whether Ramchal gave it, and the
 * case for it — `why`), where its authority comes from (`provenance`, a bare
 * word or `{ kind, why }`), and the ch. 1–8 layer (`anatomy`, each label with
 * its own `why`). Layers are separate keys so a future one — the normalized
 * form, the warrant, the axis — is a new sibling of `move`, not a change to it.
```

**Imports.** Add `Labelled` and `Why` to the type imports from `./sugya.ts`.

**Version.** `export const FORMAT_VERSION = 2;`

**Disk types.** Replace the block from `export type MoveJson` through
`export type SugyaJson` with:

```ts
export type WhyJson = {
  readonly reason: string;
  readonly evidence?: string;
  readonly ratherThan?: string;
  readonly ramchal?: string;
};

/** A vocabulary word, bare, or with the case for it. */
export type LabelledJson<K extends string> = K | { readonly kind: K; readonly why?: WhyJson };

export type MoveJson = {
  readonly element: Element;
  readonly subtype: string;
  readonly target?: string;
  readonly marker?: string;
  readonly attested?: boolean;
  readonly why?: WhyJson;
};

export type AnnotationJson = {
  readonly kind: AnatomyKey;
  readonly basis?: LabelBasis;
  readonly why?: WhyJson;
};

export type UnitJson = {
  readonly id: string;
  readonly speaker?: string;
  readonly short?: string;
  readonly he?: string;
  readonly en: string;
  readonly move: MoveJson;
  readonly provenance?: LabelledJson<Provenance>;
  readonly anatomy?: readonly AnnotationJson[];
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
  readonly party?: LabelledJson<Party>;
  readonly collection?: Collection;
  readonly about?: readonly string[];
  readonly hint?: string;
  readonly units: readonly UnitJson[];
  readonly ext?: Readonly<Record<string, unknown>>;
};
```

**Field lists.** Replace the four `*_FIELDS` constants with:

```ts
/** Key order on disk. Also the closed list of keys a record may carry. */
const SUGYA_FIELDS = ["$schema", "format", "version", "id", "title", "tractate", "folio", "discussedAt", "party", "collection", "about", "hint", "units", "ext"] as const;
const UNIT_FIELDS = ["id", "speaker", "short", "he", "en", "move", "provenance", "anatomy", "ext"] as const;
const MOVE_FIELDS = ["element", "subtype", "target", "marker", "attested", "why"] as const;
const ANNOTATION_FIELDS = ["kind", "basis", "why"] as const;
export const WHY_FIELDS = ["reason", "evidence", "ratherThan", "ramchal"] as const;
const LABELLED_FIELDS = ["kind", "why"] as const;
```

**`unknownKeys`.** The old key gets an explicit hint, because the edit
distance from `note` to `why` is too far for the generic one:

```ts
const unknownKeys = (obj: Record<string, unknown>, allowed: readonly string[], path: string, faults: Faults): void => {
  for (const key of Object.keys(obj)) {
    if (allowed.includes(key)) continue;
    if (key === "note") {
      faults.push(`${path}.note: unknown key (the case for a label is "why" — on the move, the annotation, the provenance or the party)`);
      continue;
    }
    const hint = nearest(key, allowed);
    faults.push(`${path}.${key}: unknown key${hint === undefined ? "" : ` (did you mean "${hint}"?)`}`);
  }
};
```

**New readers.** Add after `paragraphs`:

```ts
const readWhy = (raw: unknown, path: string, faults: Faults): Why | undefined => {
  if (raw === undefined) return undefined;
  if (!isRecord(raw)) {
    faults.push(`${path}: expected an object { reason, … }, got ${show(raw)}`);
    return undefined;
  }
  unknownKeys(raw, WHY_FIELDS, path, faults);
  const reason = string(raw, "reason", path, faults, true);
  const evidence = string(raw, "evidence", path, faults, false);
  const ratherThan = string(raw, "ratherThan", path, faults, false);
  const ramchal = string(raw, "ramchal", path, faults, false);
  if (reason === undefined) return undefined;
  return {
    reason,
    ...(evidence === undefined ? {} : { evidence }),
    ...(ratherThan === undefined ? {} : { ratherThan }),
    ...(ramchal === undefined ? {} : { ramchal }),
  };
};

/** A vocabulary word, bare or as `{ kind, why }`; both read to the same `Labelled`. */
const readLabelled = <K extends string>(obj: Record<string, unknown>, key: string, allowed: readonly K[], path: string, faults: Faults): Labelled<K> | undefined => {
  const v = obj[key];
  if (v === undefined) return undefined;
  if (typeof v === "string") {
    const kind = oneOf(obj, key, allowed, path, faults, false);
    return kind === undefined ? undefined : { kind };
  }
  if (!isRecord(v)) {
    faults.push(`${path}.${key}: expected one of the allowed words or an object { kind, why }, got ${show(v)}`);
    return undefined;
  }
  const inner = `${path}.${key}`;
  unknownKeys(v, LABELLED_FIELDS, inner, faults);
  const kind = oneOf(v, "kind", allowed, inner, faults, true);
  const why = readWhy(v["why"], `${inner}.why`, faults);
  if (kind === undefined) return undefined;
  return { kind, ...(why === undefined ? {} : { why }) };
};
```

**`readMove`.** Return type gains `why?: Why`. Add
`const why = readWhy(raw["why"], `${path}.why`, faults);` after `attested`, and
`...(why === undefined ? {} : { why }),` to the returned object.

**`readAnnotation`.** Replace the `note` line and the return:

```ts
  const why = readWhy(raw["why"], `${path}.why`, faults);
  if (kind === undefined) return undefined;
  return { kind, ...(basis === undefined ? {} : { basis }), ...(why === undefined ? {} : { why }) };
```

**`readUnit`.** Delete the `note` line. Replace the `provenance` line with
`const provenance = readLabelled(raw, "provenance", PROVENANCES, path, faults);`.
In the returned object delete `...(note === undefined ? {} : { note }),` and add,
directly after the `attested` spread,
`...(moveRead.why === undefined ? {} : { why: moveRead.why }),`.

**`parseSugya`.** Replace the `party` line with
`const party = readLabelled(input, "party", PARTIES, path, faults);`. Nothing
else: the version message already reads `FORMAT_VERSION`.

**Writers.** Replace `moveJson`, `annotationJson`, `unitJson` and the `party`
line of `toJson`:

```ts
const whyJson = (w: Why): WhyJson => ({
  reason: w.reason,
  ...(w.evidence === undefined ? {} : { evidence: w.evidence }),
  ...(w.ratherThan === undefined ? {} : { ratherThan: w.ratherThan }),
  ...(w.ramchal === undefined ? {} : { ramchal: w.ramchal }),
});

/** Bare when there is no case to make, so the common line stays `"provenance": "tradition"`. */
const labelledJson = <K extends string>(l: Labelled<K>): LabelledJson<K> =>
  l.why === undefined ? l.kind : { kind: l.kind, why: whyJson(l.why) };

const moveJson = (unit: Unit): MoveJson => ({
  element: unit.move.element,
  subtype: unit.move.subtype,
  ...(unit.target === undefined ? {} : { target: unit.target }),
  ...(unit.marker === undefined ? {} : { marker: unit.marker }),
  ...(unit.attested === undefined ? {} : { attested: unit.attested }),
  ...(unit.why === undefined ? {} : { why: whyJson(unit.why) }),
});

const annotationJson = (a: Annotation): AnnotationJson => ({
  kind: a.kind,
  ...(a.basis === undefined ? {} : { basis: a.basis }),
  ...(a.why === undefined ? {} : { why: whyJson(a.why) }),
});

const unitJson = (unit: Unit): UnitJson => ({
  id: unit.id,
  ...(unit.speaker === undefined ? {} : { speaker: unit.speaker }),
  ...(unit.short === undefined ? {} : { short: unit.short }),
  ...(unit.he === undefined ? {} : { he: unit.he }),
  en: unit.en,
  move: moveJson(unit),
  ...(unit.provenance === undefined ? {} : { provenance: labelledJson(unit.provenance) }),
  ...(unit.anatomy === undefined ? {} : { anatomy: unit.anatomy.map(annotationJson) }),
  ...(unit.ext === undefined ? {} : { ext: unit.ext }),
});
```

and in `toJson`: `...(sugya.party === undefined ? {} : { party: labelledJson(sugya.party) }),`.

### 3.4 `site/src/rail/sugyot/sugya.schema.json`

- `"version": { "const": 2, … }` (keep the description).
- Top-level `"party"`: change `"$ref": "#/$defs/party"` to `"$ref": "#/$defs/labelledParty"`; keep the description.
- In `$defs`, keep `party` and `provenance` exactly as they are (`check.ts`
  reads their `enum`), and **add**:

```json
    "why": {
      "type": "object",
      "description": "The case for a label: why this sentence carries it. Shown in the popup before the type's general definition; a label without one shows the definition alone.",
      "additionalProperties": false,
      "required": ["reason"],
      "properties": {
        "reason": { "type": "string", "minLength": 1, "description": "What in this sentence makes it this label: its words, its target, what it does, what the passage does with it. One to three sentences of plain prose for the reader of the page; not a definition of the type." },
        "evidence": { "type": "string", "description": "The words of the sentence that carry the label, verbatim from `he` (or `en` for an English source). Required on an annotation whose basis is marked." },
        "ratherThan": { "type": "string", "description": "The neighbouring label that was considered and the test that ruled it out. Begins with that label's key: `resolution/settlement: …`." },
        "ramchal": { "type": "string", "description": "Where the book states the rule or labels this passage: `Heb p185`, `ch. 9 p. 172`, optionally followed by the book's words." }
      }
    },
    "labelledProvenance": {
      "description": "A provenance, bare, or with the case for it.",
      "oneOf": [
        { "$ref": "#/$defs/provenance" },
        {
          "type": "object",
          "additionalProperties": false,
          "required": ["kind"],
          "properties": { "kind": { "$ref": "#/$defs/provenance" }, "why": { "$ref": "#/$defs/why" } }
        }
      ]
    },
    "labelledParty": {
      "description": "A party, bare, or with the case for it.",
      "oneOf": [
        { "$ref": "#/$defs/party" },
        {
          "type": "object",
          "additionalProperties": false,
          "required": ["kind"],
          "properties": { "kind": { "$ref": "#/$defs/party" }, "why": { "$ref": "#/$defs/why" } }
        }
      ]
    },
```

- `$defs.move.properties`: add `"why": { "$ref": "#/$defs/why" }` after `attested`; append to the move's description: ` \`why\` is the case for the label.`
- `$defs.annotation.properties`: delete `"note"`, add `"why": { "$ref": "#/$defs/why" }`.
- `$defs.unit.properties`: `"provenance": { "$ref": "#/$defs/labelledProvenance" }`; delete `"note"`.
- The top-level `description` still says `implementation: viz/src/format.ts`; make it `site/src/rail/format.ts` while you are there.

### 3.5 The fixtures — `site/src/rail/fixtures/*.ts`, `fixtures/research/*.ts`

The fixtures are the oracle the JSON is held to (`check.ts` compares them as
data), so they change first and the JSON is regenerated from them (§4). Three
mechanical rewrites, applied to every fixture file (`bava-metzia-yeush.ts`,
`berachos-yaakov.ts`, `pesachim-liquids.ts`, `yebamos-chalitzah.ts`,
`yebamos-deafmute.ts`, `research/git-2a-befanai.ts`, and the three other
research files for `party`):

| find (regex) | replace |
|---|---|
| `provenance: ("(?:sense\|axiom\|endoxa\|tradition\|derivation\|asserted)")` | `provenance: { kind: $1 }` |
| `party: ("party-(?:group\|individual\|talmud)")` | `party: { kind: $1 }` |
| `, note: ("(?:[^"\\]\|\\.)*") \}` (inside an annotation object) | `, why: { reason: $1 } }` |
| `^(\s+)note: ("(?:[^"\\]\|\\.)*"),$` (a unit-level line) | `$1why: { reason: $2 },` |

No fixture string spans lines (checked 2026-09-18), so the line-anchored regex
is safe. After the regexes, do the hand work in §4.2–§4.5 **in the fixtures**.

`research/skeleton.ts`: change `RowTags.provenance?: Provenance` to
`readonly provenance?: Labelled<Provenance>;` and import `Labelled` from
`../../sugya.ts`. `SkeletonMeta.party: Party` becomes `readonly party: Labelled<Party>;`.
The builder passes `tags.provenance` through unchanged, so nothing else moves.

### 3.6 `site/src/rail/check.ts`

Edits to existing checks (search for the quoted text):

- `const proofFrom = (provenance: Provenance) => ({ move: { element: "proof" } as const, target: "y", provenance });`
  → `…, provenance: { kind: provenance } });`
- the three `groundBadge({ move: { element: "difficulty" | "contradiction" | "resolution" }, target: "y", provenance: "tradition" })` calls and the `statement` one → `provenance: { kind: "tradition" }`.
- `bm.party, "party-group"` → `bm.party?.kind, "party-group"`; likewise the `berachos-yaakov` and `yebamos-chalitzah` party checks → `?.party?.kind`.
- `u.provenance === "tradition"` (the `תא שמע` check) → `u.provenance?.kind === "tradition"`.
- `"a version from the future"`: `version: 2` → `version: 3`; expected text `"$.version: this reader understands version 2, got 3"`.

Add, at the end of the *what the reader refuses* block (reuse `minimal`,
`faultsOfInput`, `canon`; `u0`/`u1` below are `minimal.units[0]!` / `minimal.units[1]!`):

```ts
console.log("\nThe file format — the case for a label");
const u0 = minimal.units[0]!;
const u1 = minimal.units[1]!;
const why = { reason: "Because the text says so.", evidence: "מאי שנא", ratherThan: "question/principle: no principle is asked for.", ramchal: "Heb p169" };
check("a why on the move round-trips", canon(parseSugya({ ...minimal, units: [{ ...u0, move: { ...u0.move, why } }, u1] }).units[0]?.why), canon(why));
check("a why on an annotation round-trips", canon(parseSugya({ ...minimal, units: [u0, { ...u1, anatomy: [{ kind: "consequent", why }] }] }).units[1]?.anatomy?.[0]?.why), canon(why));
check("a bare provenance reads as { kind }", canon(parseSugya({ ...minimal, units: [{ ...u0, provenance: "tradition" }, u1] }).units[0]?.provenance), canon({ kind: "tradition" }));
check("…and prints back bare", stringify(parseSugya({ ...minimal, units: [{ ...u0, provenance: { kind: "tradition" } }, u1] })).includes('"provenance": "tradition"'), true);
const withWhy = stringify(parseSugya({ ...minimal, units: [{ ...u0, provenance: { kind: "tradition", why } }, u1] }));
check("a provenance with a why prints as an object", withWhy.includes('"provenance": {') && withWhy.includes('"kind": "tradition"') && !withWhy.includes('"provenance": "tradition"'), true);
check("a party with a why round-trips", canon(parseSugya({ ...minimal, party: { kind: "party-talmud", why } }).party), canon({ kind: "party-talmud", why }));
check("the derived ground badge carries the provenance's why", groundBadge({ move: { element: "proof" }, target: "y", provenance: { kind: "tradition", why } })?.why?.reason, why.reason);
check("a why that is not an object", faultsOfInput({ ...minimal, units: [{ ...u0, move: { ...u0.move, why: "because" } }, u1] }).join(" | "), '$.units[0].move.why: expected an object { reason, … }, got "because"');
check("a why with no reason", faultsOfInput({ ...minimal, units: [{ ...u0, move: { ...u0.move, why: { evidence: "x" } } }, u1] }).join(" | "), "$.units[0].move.why.reason: required");
check("a misspelt why key, with the correction", faultsOfInput({ ...minimal, units: [{ ...u0, move: { ...u0.move, why: { reason: "x", evidnce: "y" } } }, u1] }).join(" | "), '$.units[0].move.why.evidnce: unknown key (did you mean "evidence"?)');
check("the old key is refused and redirected", faultsOfInput({ ...minimal, units: [{ ...u0, note: "x" }, u1] }).join(" | "), '$.units[0].note: unknown key (the case for a label is "why" — on the move, the annotation, the provenance or the party)');
check("a labelled provenance without its kind", faultsOfInput({ ...minimal, units: [{ ...u0, provenance: { why } }, u1] }).join(" | "), "$.units[0].provenance.kind: required");
check("a labelled provenance that is not one", faultsOfInput({ ...minimal, units: [{ ...u0, provenance: { kind: "hearsay" } }, u1] })[0]?.startsWith('$.units[0].provenance.kind: "hearsay" is not one of'), true);
check("a provenance that is neither word nor object", faultsOfInput({ ...minimal, units: [{ ...u0, provenance: 3 }, u1] }).join(" | "), "$.units[0].provenance: expected one of the allowed words or an object { kind, why }, got 3");
check("a marked label must quote its word", faultsOfInput({ ...minimal, units: [u0, { ...u1, anatomy: [{ kind: "consequent", basis: "marked", why: { reason: "x" } }] }] }).join(" | "), '$.units: yebamos-deafmute: unit "answer" marks the label "consequent" but quotes nothing — a marked label carries its stock word in why.evidence');
check("…and passes once it does", faultsOfInput({ ...minimal, units: [u0, { ...u1, anatomy: [{ kind: "consequent", basis: "marked", why: { reason: "x", evidence: "ד" } }] }] }).length, 0);
```

Add to the *schema agrees with the code* block:

```ts
check("the four fields of a why", Object.keys(schema.$defs["why"]?.properties ?? {}).join(), WHY_FIELDS.join());
```

(import `WHY_FIELDS` from `./format.ts`; extend the `schema` type annotation's
`$defs` entry so `properties` is typed — it already allows `properties?: Record<string, …>`).

Add to the *Chapter 8* block, after the migration in §4 has written the case:

```ts
check("the testimony's ground carries the file's case for its provenance", groundBadge(pesachimLiquids.units.find((u) => u.id === "testimony")!)?.why !== undefined, true);
```

### 3.7 `site/src/rail/app/useSugyaController.ts`

The party badge:

```ts
  const party = useMemo<Badge | undefined>(() => {
    if (sugya.party === undefined) return undefined;
    const badge: Badge = {
      info: ANATOMY[sugya.party.kind],
      basis: "inferred",
      origin: "label",
      ...(sugya.party.why === undefined ? {} : { why: sugya.party.why }),
    };
    return showing(badge) ? badge : undefined;
  }, [sugya.party, showing]);
```

Nothing else in the controller reads `provenance` or `note`.

### 3.8 `site/src/rail/app/components/Tooltip.tsx` — replace the file

```tsx
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type JSX,
  type ReactNode,
} from "react";

export type TooltipProps = {
  readonly content: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
  /** Fires with `true` on enter or focus and `false` on leave or blur, for anything that should light up alongside. */
  readonly onHover?: (on: boolean) => void;
  readonly width?: number;
  /**
   * A short line shown without being asked for, when something else on the
   * page is pointing at this anchor's twin and the reader has to be told that
   * the explanation is here. The reader's own hover replaces it with `content`.
   */
  readonly hint?: ReactNode;
  readonly hintWidth?: number;
  /**
   * The popup has something to press — the fold under a label's case — so it
   * takes the pointer and stays open while the pointer or the focus is inside
   * it. Off, the popup is inert and never gets in the way of what it explains.
   */
  readonly interactive?: boolean;
};

type Placement = {
  readonly side: "left" | "right";
  readonly vert: "below" | "above";
};

/** A generous guess at the popup's height, for deciding whether it fits below before it has been drawn. */
const POP_HEIGHT = 170;
const GUTTER = 12;

type Bounds = { readonly top: number; readonly right: number; readonly bottom: number };

/**
 * The box a popup has to fit inside: the anchor's nearest ancestor that clips
 * its overflow, or the viewport when nothing does. The popup is absolutely
 * positioned inside the anchor, so a scroller between the two cuts off whatever
 * leaves it — the rows are one such scroller and the strip's panel, where the
 * legend lives, is another. Fitting the window alone would place a popup that
 * the scroller then clips.
 */
const boundsOf = (anchor: HTMLElement): Bounds => {
  const viewport = { top: 0, right: window.innerWidth, bottom: window.innerHeight };
  for (let el = anchor.parentElement; el !== null; el = el.parentElement) {
    const { overflowX, overflowY } = getComputedStyle(el);
    if (overflowX === "visible" && overflowY === "visible") continue;
    const box = el.getBoundingClientRect();
    return {
      top: Math.max(box.top, viewport.top),
      right: Math.min(box.right, viewport.right),
      bottom: Math.min(box.bottom, viewport.bottom),
    };
  }
  return viewport;
};

/** The side of the anchor a popup `h` tall fits on; the roomier side when neither does. */
const vertFor = (box: DOMRect, bounds: Bounds, h: number): Placement["vert"] => {
  const below = bounds.bottom - GUTTER - box.bottom;
  const above = box.top - GUTTER - bounds.top;
  if (h <= below) return "below";
  if (h <= above) return "above";
  return below >= above ? "below" : "above";
};

/**
 * A real popup on hover or focus, styled and positioned by the page. The
 * native `title` attribute is not relied on anywhere a reader needs the
 * explanation: it is slow to appear, unstyled, and in some embeddings never
 * shows at all. The popup flips to the other side of its anchor when it would
 * leave the box that clips it. An inert popup takes no pointer events, so it
 * never gets in the way of the thing it explains; an `interactive` one takes
 * them, because it has a fold to press, and is bridged to its anchor so the
 * pointer can cross the gap between them.
 */
export const Tooltip = ({
  content,
  children,
  className,
  onHover,
  width = 300,
  hint,
  hintWidth = 210,
  interactive = false,
}: TooltipProps): JSX.Element => {
  const ref = useRef<HTMLSpanElement>(null);
  const popRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>({ side: "left", vert: "below" });

  const place = useCallback((w: number, h: number): void => {
    const anchor = ref.current;
    if (anchor === null) return;
    const box = anchor.getBoundingClientRect();
    const bounds = boundsOf(anchor);
    const side = box.left + w <= bounds.right - GUTTER ? "left" : "right";
    const vert = vertFor(box, bounds, h);
    // Same placement, same object: a hint is placed from an effect, and a new
    // object every render would ask for another.
    setPlacement((p) => (p.side === side && p.vert === vert ? p : { side, vert }));
  }, []);

  const show = useCallback(
    (on: boolean): void => {
      if (on) place(width, POP_HEIGHT);
      setOpen(on);
      onHover?.(on);
    },
    [onHover, place, width],
  );

  /** Focus moving to something inside the popup — its fold's button — is not a leave. */
  const blur = (event: FocusEvent<HTMLSpanElement>): void => {
    const to = event.relatedTarget;
    if (to instanceof Node && ref.current?.contains(to)) return;
    show(false);
  };

  const hinting = hint !== undefined && !open;
  useEffect(() => {
    if (hinting) place(hintWidth, POP_HEIGHT);
  }, [hinting, hintWidth, place]);

  // Once drawn, the popup knows its real height — and it changes when its
  // fold opens — so the guess above is corrected before paint. `place` only
  // sets state when the placement actually changes, so this settles at once.
  useLayoutEffect(() => {
    const pop = popRef.current;
    if (!open || pop === null) return;
    place(width, pop.getBoundingClientRect().height);
  });

  const live = open && interactive;
  return (
    <span
      ref={ref}
      className={`tip${className === undefined ? "" : ` ${className}`}`}
      onMouseEnter={() => show(true)}
      onMouseLeave={() => show(false)}
      onFocus={() => show(true)}
      onBlur={blur}
    >
      {children}
      {open || hinting ? (
        <span
          ref={popRef}
          // A popup with a button in it is no longer a tooltip to assistive technology.
          role={live ? undefined : "tooltip"}
          className={`tip-pop tip-pop-${placement.side} tip-pop-${placement.vert}${
            open ? "" : " tip-pop-hint"
          }${live ? " tip-pop-interactive" : ""}`}
          style={{ width: open ? width : hintWidth }}
        >
          {open ? content : hint}
        </span>
      ) : null}
    </span>
  );
};
```

Why each piece is there, so you do not "simplify" it away:

- `blur` checks `relatedTarget`: when the reader tabs from the badge to the
  fold's button, focus leaves the badge but stays inside the wrapper; without
  the check the popup closes as the button receives focus.
- `useLayoutEffect` with no dependency list: the popup's height changes when
  the fold opens, and the placement decided at open time (from a 170px guess)
  would leave a grown popup clipped by the rows' scroller. The `setPlacement`
  guard stops it looping.
- `role` is dropped when interactive: a tooltip must not contain interactive
  content.
- `interactive` is per anchor, not global: an inert popup closing as the
  pointer moves down to the next row is the behaviour the rest of the page
  was tuned for (V4 §2.5), and only a popup with a fold needs the pointer.

### 3.9 `site/src/rail/app/hooks/useTipDetails.ts` — new file

```ts
import { useCallback, useEffect, useState } from "react";

/** v1: closed by default. */
const STORAGE_KEY = "sugya-lattice.tip-details.v1";

const read = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "open";
  } catch {
    return false;
  }
};

const write = (open: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, open ? "open" : "closed");
  } catch {
    // Storage unavailable: the choice lasts for the session only.
  }
};

export type TipDetails = {
  readonly open: boolean;
  readonly toggle: () => void;
};

/**
 * Whether a popup unfolds the type's general definition under the case for
 * the label. One setting for every popup on the page, remembered between
 * visits: a reader who has learnt the vocabulary closes it once and every
 * popup stays short; a reader who has not opens it once. It is read when a
 * popup mounts — one popup is open at a time, and each mounts afresh — so no
 * popup needs to hear about another's toggle.
 */
export const useTipDetails = (): TipDetails => {
  const [open, setOpen] = useState<boolean>(read);
  useEffect(() => {
    write(open);
  }, [open]);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  return { open, toggle };
};
```

### 3.10 Two new components in `site/src/rail/app/components/`

`TipDetails.tsx`:

```tsx
import type { JSX, ReactNode } from "react";

import { useTipDetails } from "../hooks/useTipDetails.ts";

export type TipDetailsProps = {
  /** What the fold is called: `what “handed down” means`. */
  readonly label: string;
  readonly children: ReactNode;
};

/**
 * The general explanation of a type, folded under the case for the label so
 * that a reader who knows the vocabulary is not made to read it every time.
 * The fold's state is one remembered setting (`useTipDetails`).
 */
export const TipDetails = ({ label, children }: TipDetailsProps): JSX.Element => {
  const { open, toggle } = useTipDetails();
  return (
    <span className={`tip-details${open ? " tip-details-open" : ""}`}>
      <button type="button" className="tip-details-toggle" aria-expanded={open} onClick={toggle}>
        <span className="tip-details-caret" aria-hidden="true">
          {open ? "▾" : "▸"}
        </span>
        {label}
      </button>
      {open ? <span className="tip-details-body">{children}</span> : null}
    </span>
  );
};
```

`WhyBlock.tsx`:

```tsx
import type { JSX } from "react";

import type { Why } from "../../sugya.ts";

/**
 * The case for a label, as the file makes it: the reason, the words of the
 * sentence that carry it, the label it was chosen over, and where Ramchal
 * says so. Shown first in every popup whose label has one.
 */
export const WhyBlock = ({ why }: { readonly why: Why }): JSX.Element => (
  <span className="tip-why">
    <span className="tip-why-reason">{why.reason}</span>
    {why.evidence === undefined ? null : (
      <span className="tip-why-line">
        <span className="tip-why-label">in the text</span>
        <span className="tip-why-quote" dir="auto">
          “{why.evidence}”
        </span>
      </span>
    )}
    {why.ratherThan === undefined ? null : (
      <span className="tip-why-line">
        <span className="tip-why-label">rather than</span>
        <span>{why.ratherThan}</span>
      </span>
    )}
    {why.ramchal === undefined ? null : (
      <span className="tip-why-line">
        <span className="tip-why-label">Ramchal</span>
        <span>{why.ramchal}</span>
      </span>
    )}
  </span>
);
```

### 3.11 `site/src/rail/app/components/BadgeTip.tsx` — replace the file

```tsx
import type { JSX } from "react";

import { FAMILIES, type Badge } from "../../anatomy.ts";
import type { LabelBasis } from "../../sugya.ts";
import { Glyph } from "./Glyph.tsx";
import { TipDetails } from "./TipDetails.tsx";
import { WhyBlock } from "./WhyBlock.tsx";

/** Where the badge sits, which decides what its tooltip says it is about. */
export type BadgeWhere = "row" | "speaker" | "edge" | "strip";

export type BadgeTipProps = {
  readonly badge: Badge;
  readonly where: BadgeWhere;
  /** 1-based position of the sentence the badge sits on. */
  readonly ordinal?: number;
  /** 1-based position of the sentence that sentence acts on. */
  readonly targetOrdinal?: number;
  /** For an edge chip: a bead is on the line too, and hovering lights both. */
  readonly beadDrawn?: boolean;
};

export const BASIS_WORDING: Record<LabelBasis, string> = {
  attested: "Ramchal's own label for this passage",
  marked: "the type's stock word is in the text",
  inferred: "inferred, not attested",
};

const about = ({ badge, where, ordinal, targetOrdinal, beadDrawn }: BadgeTipProps): string => {
  const here = ordinal === undefined ? "this sentence" : `sentence ${ordinal}`;
  const there = targetOrdinal === undefined ? "the sentence it acts on" : `sentence ${targetOrdinal}`;
  const bead =
    beadDrawn === true ? ", and the bead on the line between them — the same badge, drawn where the line is" : "";
  switch (where) {
    case "row":
      return `About ${here} on its own: what it is made of, not what it does.`;
    case "speaker":
      return `About who is speaking in ${here}. No one is named, so this is the Talmud's own voice.`;
    case "edge": {
      // A ground is not a relation between the two sentences: it is what the
      // move from the one to the other rests on, or how it is turned aside.
      const relates =
        badge.info.family === "grounds"
          ? `What ${here}'s move on ${there} stands on, or how it is turned aside. Hovering highlights that sentence${bead}.`
          : `Relates ${here} to ${there}, the one it acts on. Hovering highlights that sentence${bead}.`;
      // Read off the file rather than written in it, and the reader should know.
      const derived =
        badge.origin === "provenance"
          ? " Read from the sentence's provenance in the file, which names its source; no label of its own says so."
          : "";
      return `${relates}${derived}`;
    }
    case "strip":
      return "About the passage as a whole, not any one sentence.";
    default: {
      const exhaustive: never = where;
      return exhaustive;
    }
  }
};

/**
 * The explanation every badge carries. First the case the file makes for this
 * label on this sentence, when it makes one; then, folded under it, what the
 * type is called, how it reads in everyday words, what it means and what this
 * particular badge is about; and a foot saying where in the book it comes
 * from and how the label was arrived at. A badge with no case shows the
 * general part unfolded, as every badge did before the case existed. It is
 * the whole of what the layer has to say about a badge, so nothing here is a
 * summary of anything longer.
 */
export const BadgeTip = (props: BadgeTipProps): JSX.Element => {
  const { badge } = props;
  const { info, basis, why } = badge;
  const family = FAMILIES[info.family];
  const general = (
    <>
      <span className={`badge-tip-reads badge-tip-${family.hue}`}>
        {info.short} — {info.reads}
        {info.word === undefined ? null : (
          <span className="badge-tip-word">
            {" "}
            · marked by <span lang="he">“{info.word}”</span>
          </span>
        )}
      </span>
      <span>{info.definition}</span>
      <span className="badge-tip-where">{about(props)}</span>
    </>
  );
  return (
    <span className="badge-tip">
      <span className="badge-tip-head">
        <Glyph kind={info.key} size={18} />
        <span className="badge-tip-name">{info.en}</span>
        {info.he === undefined ? null : (
          <span className="badge-tip-he" lang="he" dir="rtl">
            {info.he}
          </span>
        )}
      </span>
      {why === undefined ? (
        general
      ) : (
        <>
          <WhyBlock why={why} />
          <TipDetails label={`what “${info.short}” means`}>{general}</TipDetails>
        </>
      )}
      <span className="badge-tip-foot">
        {family.name} · {family.chapter} · {info.page} · {BASIS_WORDING[basis]}
      </span>
    </span>
  );
};
```

The `.badge-tip-note` CSS rule becomes dead; delete it.

### 3.12 `site/src/rail/app/components/AnatomyBadge.tsx`

One change: the `<Tooltip>` gets `interactive={badge.why !== undefined}`.

### 3.13 `MoveTip.tsx` (new) and `UnitRow.tsx`

`site/src/rail/app/components/MoveTip.tsx`:

```tsx
import type { JSX } from "react";

import { labelBasis, type LabelBasis, type Unit } from "../../sugya.ts";
import { describe, isUndefinedInSource } from "../../taxonomy.ts";
import { BASIS_WORDING } from "./BadgeTip.tsx";
import { TipDetails } from "./TipDetails.tsx";
import { WhyBlock } from "./WhyBlock.tsx";

const BASIS_TIP: Record<LabelBasis, string> = {
  attested: "Ramchal himself gives this label for the passage.",
  marked: "The label rests on a stock Aramaic phrase in the sentence itself — the Talmud's own signposting of the move.",
  inferred: "The label is ours, not Ramchal's: he does not discuss this sentence.",
};

export type MoveTipProps = {
  readonly unit: Unit;
  /** 1-based position of the sentence this one acts on. */
  readonly targetOrdinal?: number;
};

/**
 * What the row's move label and its icon say on hover: the leaf, then — when
 * the file makes one — the case for it, with the general account of the move
 * folded beneath; otherwise the general account alone. The foot says how the
 * label was arrived at and quotes the marker where there is one.
 */
export const MoveTip = ({ unit, targetOrdinal }: MoveTipProps): JSX.Element => {
  const leaf = describe(unit.move);
  const basis = labelBasis(unit);
  const general = (
    <span className="legend-tip-leaves">
      A chapter 9 move: what this sentence <i>does</i>
      {targetOrdinal === undefined ? "" : ` to sentence ${targetOrdinal}`}. {BASIS_TIP[basis]}
      {isUndefinedInSource(unit.move) ? " Ramchal announces this kind and never defines it." : ""}
    </span>
  );
  const marker =
    unit.marker === undefined ? null : (
      <span lang="he" dir="rtl">
        “{unit.marker}”
      </span>
    );
  return (
    <span className="legend-tip">
      <span>
        <b>{unit.move.element}</b> — {leaf.plain}. <span lang="he">{leaf.he}</span> · {leaf.en}.
      </span>
      {unit.why === undefined ? (
        general
      ) : (
        <>
          <WhyBlock why={unit.why} />
          <TipDetails label={`what “${leaf.plain}” means`}>{general}</TipDetails>
        </>
      )}
      <span className="badge-tip-foot">
        {basis === "marked" && marker !== null ? (
          <>marked by {marker} in the text</>
        ) : (
          <>
            {BASIS_WORDING[basis]}
            {marker === null ? null : <> · {marker}</>}
          </>
        )}
      </span>
    </span>
  );
};
```

`BASIS_TIP` moves here **verbatim** from `UnitRow.tsx` (comments travel with code).

`UnitRow.tsx`:

1. Delete the `BASIS_TIP` constant and the `iconTip` block. Add
   `import { MoveTip } from "./MoveTip.tsx";`. `describe`, `isUndefinedInSource`
   and `labelBasis` are still used for `leaf.plain` and `detail`; keep the
   imports. `const basis = labelBasis(unit);` was only read by `iconTip`, so it
   is now unused — delete that line (the typechecker will tell you if anything
   else reads it).
2. After `const leaf = describe(unit.move);` add:

```tsx
  const moveTip = <MoveTip unit={unit} targetOrdinal={targetOrdinal} />;
  const moveTipLive = unit.why !== undefined;
```

3. The icon's tooltip becomes
   `<Tooltip content={moveTip} width={300} className="row-icon-tip" interactive={moveTipLive}>`.
4. The two label spans become one anchor for the same popup. Replace

```tsx
          <span className="row-plain">{leaf.plain}</span>
          <span className="row-detail">{detail.join(" · ")}</span>
```

with

```tsx
          <Tooltip content={moveTip} width={300} className="row-label-tip" interactive={moveTipLive}>
            <span className="row-label" tabIndex={0} aria-label={`${leaf.plain}: ${leaf.en}`}>
              <span className="row-plain">{leaf.plain}</span>
              <span className="row-detail">{detail.join(" · ")}</span>
            </span>
          </Tooltip>
```

### 3.14 `site/src/rail/app/styles.css`

Delete the `.badge-tip-note` rule. Append after the `.badge-tip-foot` rule:

```css
/* --- the case for a label, and the fold under it -------------------------- */

/* A popup with something to press takes the pointer. The bridge covers the
   6px between anchor and popup, so the pointer can cross without leaving the
   anchor's box and closing what it was reaching for. */
.tip-pop-interactive {
  pointer-events: auto;
}

.tip-pop-interactive::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 8px;
}

.tip-pop-below.tip-pop-interactive::before {
  top: -8px;
}

.tip-pop-above.tip-pop-interactive::before {
  bottom: -8px;
}

.tip-why {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.tip-why-reason {
  color: var(--fg);
}

.tip-why-line {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.tip-why-label {
  flex: none;
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tip-why-quote {
  font-weight: 500;
}

.tip-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tip-details-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--muted);
  font: inherit;
  font-size: 10.5px;
  text-align: left;
  cursor: pointer;
}

.tip-details-toggle:hover,
.tip-details-toggle:focus-visible {
  color: var(--fg);
  outline: none;
}

.tip-details-caret {
  width: 8px;
}

.tip-details-body {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 12px;
  border-left: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
}

/* The move label is an anchor for the same popup the icon has. */
.row-label {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 7px;
  outline: none;
}

.row-label:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
```

Only the rail's own tokens (`--fg`, `--muted`, `--border`, `--focus`) — no
colour literals (AGENTS.md, *The paper is greige*).

### 3.15 `site/src/components/Byo.tsx`, `site/src/components/ByoSteps.tsx`

- `Byo.tsx`: the textarea placeholder `'{ "format": "derech-tevunos/sugya", "version": 1, … }'` → `"version": 2`.
- `ByoSteps.tsx`: the sentence *records every judgment call in a `<code>note</code>`, and writes … Read the notes.* becomes
  *records the case for every label in a `<code>why</code>`, and writes `<id>.json`. Hover any label on the drawing to read its case.*

A stored `/byo` session from before this change is a version-1 file in
`sessionStorage`; it will be refused with the version fault on the next visit.
That is correct behaviour, not a bug to work around.

---

## 4. Data — migrating the nine passages

### 4.1 Order

1. Apply the regexes of §3.5 to the fixtures.
2. Do the hand work of §4.2–§4.5 in the fixtures.
3. Regenerate the JSON from the fixtures with the script in §4.6.
4. `npm run check:rail` — every *same data* / *canonical* check must be green.

Never edit the JSON by hand during this migration: the fixture is the source
and the JSON is derived, and the oracle will catch any drift.

### 4.2 The sixteen move cases (`unit.why`)

After the regex in §3.5, every former unit-level `note` is a `why: { reason }`
whose text is still editor-facing (backticks, "`markers.ts`", "the taxonomy",
"this fixture"). Replace each with the object below. **Check every claim
against the unit's `he`/`en` before committing it**; where you disagree, write
a better reason, not a vaguer one.

| fixture · unit | `why` |
|---|---|
| `bava-metzia-yeush` · `rava` | `{ reason: "Rava does not refute Abaye; he holds otherwise. One view set against another leaves each merely possible, which is what an opposition does and a direct contradiction does not.", ratherThan: "contradiction/direct: nothing here shows Abaye's view false, so the dispute is a דחיה." }` |
| · `scope-zuto` | `{ reason: "The verse is quoted here as an aside to the mark, with no force of its own yet. It returns fifty sentences later as the verse that refutes Rava." }` |
| · `mnemonic` | `{ reason: "The Talmud counting its own moves: a report of what is about to be argued, not an argument. Fifteen challenges are announced before the first one is made." }` |
| · `t7-press` | `{ reason: "The answer is pressed by turning it back on the clause it did not cover: if that is the reason, the first clause should read the same way, and it does not. Ramchal's example of the same move is ולפלג … ברישא, and this objection is read as that pattern.", ramchal: "Heb p181" }` |
| · `t8-pin` | `{ reason: "It reads out of the baraita which clause actually bears on the dispute and asserts nothing new of its own: an inference from the wording, adding no force." }` |
| · `t9-ans2` | `{ reason: "A second narrowing, offered to save the first one after it failed, and the Gemara does not return to defend it. So the difficulty is left weakened rather than closed.", ratherThan: "resolution/settlement: a settlement is offered as the truth and closes the difficulty — exactly the difference Ramchal draws between ישוב and שנוי.", ramchal: "Heb p185" }` |
| · `t10-ans` | `{ reason: "Rava answers the difficulty on Abaye's behalf, arguing his opponent's side, and the answer closes it as a settlement does. That it is made for a position its speaker rejects is not something any label records." }` |
| · `t10-press` | `{ reason: "Not in the text as a question. The Gemara's אלא הכא במאי עסקינן in the next sentence discards the plain agency reading, which only makes sense against an unstated objection; it is supplied here so the revision has something to answer." }` |
| · `t11-ans` | `{ reason: "The difficulty is closed by distinguishing the source — there it is different — and the Gemara treats the matter as settled. The phrase is the passage's commonest way of closing a difficulty, though Ramchal does not list it among his stock phrases.", evidence: "שאני התם" }` |
| · `t12-dumya` | `{ reason: "The Gemara stamps the outcome תיובתא in the next sentence and never reopens it, which is Ramchal's own test for a contradiction that lands absolutely.", ratherThan: "contradiction/opposition: an opposition leaves its target merely in doubt, and Rava is not left in doubt here.", ramchal: "Heb p177" }` |
| · `t12-tiyuvta` | `{ reason: "The Talmud's own word for the outcome, stamped on Rava. Ramchal announces this kind and never defines it, so the label records the stamp and nothing more; the verdict on Rava comes entirely from the direct contradiction before it.", evidence: "תיובתא", ramchal: "Heb p179 — announced, not defined" }` |
| · `halachta` | `{ reason: "The halachah is ruled for Abaye by received authority, which is what settles his view as accepted. No leaf of chapter 9 is a ruling — a ruling is what the debate is for, not a part of it — so the nearest leaf is used: the one that confers acceptance from received authority.", ratherThan: "every other leaf: none confers acceptance from authority. The fit is poor and the gap is real.", evidence: "והלכתא כוותיה דאביי" }` |
| `berachos-yaakov` · `sin` | `{ reason: "The one who offers it believes it is true — Yaakov feared that a sin had cancelled the promise — so it is a settlement and fully discharges the difficulty, not an alternative offered merely to deflect it.", ratherThan: "resolution/alternative: an alternative is offered without asserting that it is the truth." }` |
| `pesachim-liquids` · `ravpapa` | `{ reason: "Rav Papa does not deny the testimony; he sets against the proof a reading on which it does not reach R. Eleazar's claim — one view against another, which leaves the proof in doubt rather than refuted. Ramchal labels only Rav Huna's reply, so this label is inferred, on his rule that a דחיה may land on a proof that was brought and not only on a statement.", ramchal: "Heb p185" }` |
| · `ravhuna` | `{ reason: "Rav Huna shows Rav Papa's reading impossible: had the Temple liquids been a halachah from Sinai, nothing could have been derived from them, and R. Eleazar did derive from them. Ramchal's own words: here he contradicted Rav Papa's statement absolutely.", ramchal: "Heb p177: הנה כאן סתר שמועתו של רב פפא לחלוטין" }` |
| `yebamos-chalitzah` · `shinuy` | `{ reason: "It defends Rava with another reading of the baraita without asserting that this reading is the truth, so Rava ends merely possible rather than established.", ratherThan: "resolution/settlement: a settlement is offered as the truth and would leave Rava accepted." }` |

Also add the move case for `pesachim-liquids` · `testimony` from §2.5 (it had
no note; it is the screenshot's sentence).

### 4.3 Evidence for the eleven marked annotations

Every annotation with `basis: "marked"` must now carry `why.evidence`
(§3.2 rule), or the oracle fails on the structural check. The stock word is
already the backticked phrase at the head of nine of their notes; move it out
of `reason` into `evidence` and start `reason` at the next word, capitalised:

| fixture · unit · kind | `evidence` |
|---|---|
| `bava-metzia-yeush` · `scope-zuto` · `discrepancy` | `אף על גב ד` |
| · `t11-ask` · `discrepancy` | `אף על פי ששמח` |
| · `t11-yishuv` · `analogism` | `מה … אף` |
| · `t11-yishuv` · `comparative` | `מה … אף` — **no note today**; write `why: { reason: "Just as this, so too that: the likeness is stated in the comparative form before it is used to derive.", evidence: "מה … אף" }` |
| · `t12-dumya` · `analogism` | `מה היתירא … אף איסורא` |
| · `t12-dumya` · `comparative` | `מה … אף` — **no note today**; same reason as above |
| `berachos-yaakov` · `promise` · `categorical` | `בכל אשר תלך` |
| `git-2a-befanai` · `q-rabbah-trei` · `analogism` | `מידי דהוה א…` |
| · `q-rava-trei` · `analogism` | `מידי דהוה א…` |
| · `q-mi-dami` · `fallacy-not-similar` | `מי דמי?!` |
| `pesachim-liquids` · `eleazar` · `categorical` | `כל עקר` |

### 4.4 The twenty provenance cases (`provenance.why`)

These are the badges the owner's screenshot complained about: every derived
ground badge in the shipped files. Listed 2026-09-18 (all `tradition`):

| fixture · unit | what it quotes | marker |
|---|---|---|
| `pesachim-liquids` · `testimony` | Yosi ben Yo'ezer's testimony | `תדע, שהרי` — use the `why` in §2.5 |
| `yebamos-chalitzah` · `baraita` | a baraita on the deaf-mute's chalitzah | — |
| `git-2a-befanai` · `q-rabbah-trei`, `q-rava-trei` | the Torah's rule for testimony / for ratifying documents | `ולפלוני דאמר … ליבעי` |
| `git-2a-befanai` · `q-mi-dami` | the two cases as the mishnah gives them | `מי דמי?!` |
| `bava-metzia-yeush` · `t1-ask` … `t12-ask` (twelve `תא שמע` challenges: `t1-ask`, `t2-ask`, `t3-ask`, `t4-ask`, `t5-ask`, `t6-ask`, `t7-reisha`, `t8-ask`, `t9-ask`, `t10-ask`, `t11-ask`, `t12-ask`) | a mishnah or baraita, named by the unit's `short` | `תא שמע` |
| `bava-metzia-yeush` · `t10-support` | a baraita brought in support | `תניא כותה ד` |
| `bava-metzia-yeush` · `t11-rami` | two readings of one verse | `… רמי, כתיב … וכתיב` |
| `bava-metzia-yeush` · `halachta` | the ruling of the halachah | — |

Pattern for the twelve `תא שמע` challenges (fill the bracket from the unit's
`short` and `en`; do not leave it generic):

```ts
provenance: {
  kind: "tradition",
  why: {
    reason: "A tannaitic ruling — [the case of scattered produce, from the mishnah] — is quoted against Abaye. What a mishnah or baraita says is received, not reasoned, so the challenge enters accepted and stands on tradition.",
    evidence: "תא שמע",
  },
},
```

Write the other eight individually on the same pattern: name what is quoted,
say why that counts as received rather than reasoned, quote the words. For
`halachta` the reason is that a ruling of the halachah is itself received
authority (`והלכתא`). Every one of the twenty must have a `why` when this plan
is done; the new check in §3.6 guards only the screenshot's unit, so count them
yourself with the one-liner in §6.1.

### 4.5 Backticks and editor-facing text in the forty-nine annotation cases

The regex in §3.5 left the note text intact inside `why.reason`. Two passes:

1. Every `` `X` `` in a `reason` becomes `X` unquoted when X is a Hebrew phrase
   or a label key, and disappears (with rewording) when X is a file name or an
   internal term. Backticks render literally in the popup; none may remain in
   any `reason`, `ratherThan` or `ramchal`. `grep -n '\`' site/src/rail/fixtures -r`
   must return only the doc comments.
2. These annotation notes talk to an editor and must be rewritten for the
   reader (2026-09-18 list): `git-2a-befanai` · `a-rov` · `partial` ("...which is
   why R. Meir, who worries about the minority, has to be answered…" — fine, keep,
   just drop the backticks), `git-2a-befanai` · `q-ischazek-2` ·
   `ground-does-not-reach` ("…and the ch. 8 label is what shows it" → say what
   the symmetry is instead of pointing at the label), `bava-metzia-yeush` ·
   `t12-dumya` · `ground-deduction` ("…and the teal badge says which syllogism"
   → "…the analogy drawn from it, which is a deduction, not a new source").
   Anything that mentions a badge colour, a file, `ext`, "the fixture", or "the
   taxonomy" is editor-facing.

Where a note began with `` `X`: `` and the label is **not** marked, still move X
into `evidence` — an inferred label may quote the words that support it; only
`marked` *requires* it.

### 4.6 The regeneration script

Create `site/scripts/migrate-why.ts` (temporary — **delete it before
committing**; nothing in `package.json` refers to it):

```ts
// One-off: write each shipped JSON passage from its TypeScript fixture,
// keeping the page furniture only the JSON carries. Run from site/:
//   npx tsx scripts/migrate-why.ts
import { readFileSync, writeFileSync } from "node:fs";

import { FIXTURES } from "../src/rail/fixtures/index.ts";
import { stringify } from "../src/rail/format.ts";
import type { Sugya } from "../src/rail/sugya.ts";

const DIR = new URL("../src/rail/sugyot/", import.meta.url);

type Furniture = { readonly collection?: Sugya["collection"]; readonly about?: readonly string[]; readonly hint?: string };

for (const fixture of FIXTURES) {
  const file = new URL(`${fixture.id}.json`, DIR);
  const old = JSON.parse(readFileSync(file, "utf8")) as Furniture;
  const merged: Sugya = {
    ...fixture,
    ...(old.collection === undefined ? {} : { collection: old.collection }),
    ...(old.about === undefined ? {} : { about: old.about }),
    ...(old.hint === undefined ? {} : { hint: old.hint }),
  };
  writeFileSync(file, stringify(merged));
  console.log(`${fixture.id}.json written from its fixture`);
}
```

`stringify` writes `version: 2` and the canonical order, so the *canonical*
check passes by construction and the *same data* check passes because the
data *is* the fixture.

---

## 5. Documentation

### 5.1 `SUGYA_JSON_FORMAT.md` (repository root)

Work top to bottom.

- **Title block.** `Format \`derech-tevunos/sugya\`, version \`1\`` → `version \`2\``.
- **§1.** Replace the whole-file example with the regenerated
  `site/src/rail/sugyot/yebamos-deafmute.json`, verbatim (the text says
  *exactly as shipped*). In the paragraph after it, the list of opt-in things
  gains: *and the case for any label (`why`)*.
- **§2.** Leave.
- **§3 inventory table.** Rename the `note` column `why` and fill it with
  three numbers `m/a/p` (move cases / annotation cases / provenance cases),
  measured with the one-liner in §6.1 after migration. Add one bullet at the
  end of the list under the table: *Every label may carry its case: `move.why`,
  `anatomy[].why`, and `{ kind, why }` on `provenance` and `party`. The four
  Ramchal passages and Gittin 2a–3a carry one on every annotation and on every
  provenance that draws a ground badge; the skeletons carry none.*
- **§4.1 `party` row.** Type column: `` `party-group` · `party-individual` · `party-talmud`, bare or as `{ "kind", "why" }` ``. Page column: append *; its `why` leads the strip badge's popup*.
- **§4.2 unit table.** `provenance` row type: `` one of the six, bare or as `{ "kind", "why" }` ``; page column append *On a proof, contradiction or difficulty that draws a ground badge, the provenance's `why` leads that badge's popup.* **Delete the `note` row.**
- **§4.3 move table.** Add a row: `` | `why` | why | no | The case for the label: why this sentence does this. §4.5. Leads the popup on the row's icon and on its label words; the general account of the move is folded beneath it. | ``. In the paragraph *How a label reads on the page is derived…*, append: *The popup leads with `why` when the file gives one, and quotes the `marker` in its foot.*
- **§4.4 annotation table.** Replace the `note` row with `` | `why` | why | no | The case for this label on this sentence. §4.5. Leads the badge's popup, the general definition folded beneath; **required to carry `evidence` when `basis` is `marked`**. | ``. Add to the *Two rules the reader enforces* paragraph a third: *A label whose `basis` is `marked` must quote the stock word in `why.evidence`.*
- **New §4.5 `why`** — paste §2.1 of this plan (the JSON shape and the five bullet rules), then the after-example from §2.5, then:
  *What the page does with it. Every popup whose label has a `why` shows it first: the reason, then* in the text *with the evidence, then* rather than*, then* Ramchal*. The type's general explanation — how it reads, its definition, what the badge is about — is folded under a line reading* what “…” means*; the fold's state is one setting remembered across visits. A label with no `why` shows the general explanation unfolded, exactly as every label did before version 2.*
- **§5.1.** Add: `` `why` (on a move, an annotation, a provenance or a party): an object with `reason` (required), `evidence`, `ratherThan`, `ramchal` ``.
- **§6 (validation).** Add the rows of §2.3 of this plan to the fault table, and *a marked annotation with no `why.evidence`* to the structural list.
- **§7 mapping table.** `` `id`, `he`, `en`, `speaker`, `note` `` → `` `id`, `he`, `en`, `speaker` ``, and a new row `` | the §2 record's `note` / reasoning | `why` on the label it is about | `reason` for the argument; `evidence` for quoted words; `ratherThan` for the rejected label; `ramchal` for a page | ``. Two cells say *say so in `note`*: make them *say so in the label's `why.reason`* (the `supplied` basis row) and *say so in the annotation's `why`* (the `sevara` row).
- **§8.** Append: *A `why` prints as an object in the order `reason`, `evidence`, `ratherThan`, `ramchal`; a `provenance` or `party` prints as the bare word unless it carries a `why`.*
- **§9 conventions.** The `attested` bullet: *explain in `note`* → *explain in `move.why`*. Add a bullet: **`why`** *is written for the reader of the page, not the next editor: plain prose, no backticks, no file names; quoted words go in `evidence`; the label nearly chosen goes in `ratherThan`; pages go in `ramchal`. Every judgment call gets one; an obvious label may go without.*
- **§10.** Leave.

### 5.2 The skill guide — `skills/derech-tevunos-sugya-json/DERECH_TEVUNOS_SUGYA_JSON_GUIDE.md`

This is the file a future labelling agent reads. It is 3,930 lines; roughly
sixty of its JSON blocks contain `note`, and about twenty prose sentences do.
Do it in three passes: the JSON blocks by script, the prose by hand, then the
new section.

#### 5.2.1 Pass 1 — the JSON blocks, by script

Create `site/scripts/migrate-guide-json.ts` (temporary; delete before
committing). It rewrites every parsable ```` ```json ```` block in the files
named on the command line: `note` becomes `why`, `version: 1` becomes `2`, and
the block is re-printed in canonical form (§5.2 of the guide says shipped files
are canonical; the examples should look like one).

```ts
// One-off: `note` → `why` in the JSON blocks of a Markdown file. Run from site/:
//   npx tsx scripts/migrate-guide-json.ts ../skills/derech-tevunos-sugya-json/DERECH_TEVUNOS_SUGYA_JSON_GUIDE.md
import { readFileSync, writeFileSync } from "node:fs";

type Rec = Record<string, unknown>;
const isRec = (v: unknown): v is Rec => typeof v === "object" && v !== null && !Array.isArray(v);

/** Backticks render literally in the popup, so a quoted word becomes a quoted word. */
const unquote = (s: string): string => s.replace(/`([^`]+)`/g, "$1");
const capital = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/** The head of a note is often the evidence: "`כל עקר`: no uncleanness…". */
const whyOf = (note: string, marked: boolean): Rec => {
  const colon = /^`([^`]+)`: (.+)$/s.exec(note);
  if (colon !== null) return { reason: capital(unquote(colon[2]!)), evidence: colon[1] };
  const lead = /^`([^`]+)`/.exec(note);
  if (marked && lead !== null) return { reason: unquote(note), evidence: lead[1] };
  return { reason: unquote(note) };
};

const walk = (v: unknown, key: string | undefined, log: string[]): unknown => {
  if (Array.isArray(v)) return v.map((x) => walk(x, key, log));
  if (!isRec(v)) return v;
  if (key === "ext") return v; // pending layers stay as they are
  const out: Rec = {};
  for (const [k, x] of Object.entries(v)) out[k] = walk(x, k, log);
  const note = out["note"];
  const move = out["move"];
  if (typeof note === "string") {
    delete out["note"];
    if (isRec(move)) {
      out["move"] = { ...move, why: { reason: unquote(note) } };
      log.push(`unit ${String(out["id"])}: ${note.slice(0, 70)}`);
    } else if (typeof out["kind"] === "string") {
      out["why"] = whyOf(note, out["basis"] === "marked");
    } else {
      out["note"] = note;
      log.push(`LEFT a note on an object with keys ${Object.keys(out).join(",")}`);
    }
  }
  if (out["format"] === "derech-tevunos/sugya" && out["version"] === 1) out["version"] = 2;
  return out;
};

// The canonical printer, copied from format.ts (`pretty` is not exported).
const INLINE_WIDTH = 140;
const isScalar = (v: unknown): boolean => v === null || typeof v !== "object";
const pretty = (value: unknown, indent: string): string => {
  if (isScalar(value)) return JSON.stringify(value);
  const inner = `${indent}  `;
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const flat = `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
    if (value.every(isScalar) && flat.length + indent.length <= INLINE_WIDTH) return flat;
    return `[\n${value.map((v) => `${inner}${pretty(v, inner)}`).join(",\n")}\n${indent}]`;
  }
  const entries = Object.entries(value as Rec).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return "{}";
  const flat = `{ ${entries.map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(", ")} }`;
  if (entries.every(([, v]) => isScalar(v)) && flat.length + indent.length <= INLINE_WIDTH) return flat;
  return `{\n${entries.map(([k, v]) => `${inner}${JSON.stringify(k)}: ${pretty(v, inner)}`).join(",\n")}\n${indent}}`;
};

for (const path of process.argv.slice(2)) {
  const text = readFileSync(path, "utf8");
  const log: string[] = [];
  let rewritten = 0;
  let left = 0;
  const out = text.replace(/```json\n([\s\S]*?)\n```/g, (whole: string, body: string) => {
    try {
      const parsed: unknown = JSON.parse(body);
      rewritten += 1;
      return `\`\`\`json\n${pretty(walk(parsed, undefined, log), "")}\n\`\`\``;
    } catch {
      left += 1;
      log.push(`LEFT a block that is not JSON: ${body.slice(0, 60).replace(/\n/g, " ")}…`);
      return whole;
    }
  });
  writeFileSync(path, out);
  console.log(`${path}: ${rewritten} blocks rewritten, ${left} left\n  ${log.join("\n  ")}`);
}
```

Then, reading the script's log:

- Every line beginning `unit …` is a former unit-level note now sitting in
  `move.why.reason`. Read each in place. Where it is a *reason for the move*,
  keep it and clean it (no backticks — the script removed them — and no
  editor-facing text). Where it is a *cross-reference or aside* that is not
  about the move, fold it into the end of the reason as a second sentence, as
  §4.2 does for `scope-zuto`.
- Every `LEFT …` line needs a hand edit.
- For every annotation block with `"basis": "marked"` confirm `why.evidence`
  is present. The bare `{ "kind": "comparative", "basis": "marked" }` in §2.4
  needs one written (`"מה … אף"`).
- Search the file for `` ` `` inside JSON string values (`rg '": "[^"]*`'`)
  and remove any survivors.

Also run the script over `SUGYA_JSON_FORMAT.md` and `SKILL.md`; then replace
the §1 block of the format document with the shipped file as §5.1 says.

#### 5.2.2 Pass 2 — the prose, by hand

Search for each phrase and apply the replacement. Line numbers are from
2026-09-18 and will have moved; search by text.

| where (search for) | change |
|---|---|
| Header, *"Nothing in a JSON block is commentary; commentary is in the surrounding prose or in `note` fields."* | … *or in `why` fields, which the page shows.* |
| §2.2 unit table, the `note` row | Delete. |
| §2.2 unit table, `provenance` row | type: `` one of the six, bare, or `{ "kind", "why" }` ``; page column: replace *Not printed.* with *Not printed as a word; when it draws a ground badge, its `why` leads that badge's popup.* |
| §2.2, *"Three units showing the range"* block | The script has rewritten it; check the third unit's `move.why.reason` reads as a reason for the `contradiction/opposition` label, and that the `ext.warrant` block is untouched. |
| §2.3 move table | Add the `why` row written for the format document's §4.3 in §5.1 of this plan. |
| §2.3, *"…and the tooltip explains the basis."* | *…and the popup on the icon and on the label words leads with the move's `why`, folding the general account of the move beneath it; its foot quotes the marker.* |
| §2.3, **`attested` reconciled** paragraph: *"say in `note` that the text names the move"* and *"say so in `note`"* | both → *`move.why.reason`* |
| §2.4 annotation table, `note` row | Replace with the `why` row written for the format document's §4.4 in §5.1 of this plan, including the **marked ⇒ evidence** rule; add that rule to the *Two rules the reader enforces* paragraph as a third. |
| §3.1 | Add: *`provenance` and `party` may be written bare or as `{ "kind": word, "why": … }`; the reader accepts both and prints the bare word when there is no `why`.* |
| §4.1 inventory table, row **A · Basis `supplied`** | *`ext.move.basis: "supplied"` and a `note`* → *… and the reason in `move.why`* |
| §4.2 rule 5, *"A stretched label is explained in `note`, not hidden in `ext`."* | *A stretched label is explained in its `why`, not hidden in `ext`.* `ext` holds structured data; `why` holds the reasoning, and the page shows it. |
| §5.1 fault list item 1 | *a `version` it does not understand (this reader: `2`)* |
| §5.1 fault list item 6 | append *; a `marked` annotation that quotes no `why.evidence`* |
| §5.1 *"Faults an agent makes most often"* table | Add rows: `$.units[3].note: unknown key (the case for a label is "why" …)` → *the reasoning goes in `why` on the label it is about*; `$.units[3].move.why.reason: required` → *a `why` needs a `reason`; `evidence` alone is not one*; `$.units: … marks the label "categorical" but quotes nothing` → *`basis: marked` needs `why.evidence`*. |
| §5.2 canonical form | Append the sentence written for the format document's §8 in §5.1 of this plan. |
| §5.5 inventory table | `note` column → `why` with the `m/a/p` counts measured after migration (§6.1 one-liner); rewrite the *"pesachim-liquids has the one Ramchal unit that is not attested and carries a `note` saying why"* clause as *carries a `move.why` saying why*. |
| §6, `attested` bullet: *"explain in `note`"* | *explain in `move.why`* |
| §6, `note` bullet | Replace with the **`why`** bullet from §5.2.3 below. |
| §6, *"Never invent a key or a value"* bullet: *"say so in `note`"* | *say so in the label's `why.ratherThan`* |
| §7 Invariants, item 15 | *…or leave the unit with the nearest label and a `why` whose `ratherThan` names what would not fit.* |
| §14 Step 3 | Append: *→ `move.why`: why this element and this target — what the sentence does to the earlier one.* |
| §14 Step 4, *"…say so in `note`"* | *…take the one the passage's outcome supports, and put the losing leaf and the test that decided it in `move.why.ratherThan`.* |
| §14 Step 5 | Append: *When `provenance` is not the default, say why in `provenance.why` — what is quoted, and why that counts as received rather than reasoned; the ground badge the page derives from it shows that case.* |
| §14 Step 7 | Append: *Each relation label carries its `why`: which of the four tests decided it, and the words on each side.* |
| §14 Step 9, *"Do not force a label; leave the nearest label with a `note`."* | *Do not force a label; leave the nearest label with a `why` whose `ratherThan` says what was tried.* |
| §14 summary table, row **9 review** | `note`, `about` → `why` (on every label that needed a decision), `about` |
| §15–§18 worked files, prose | Wherever the prose says *the note on …* or *`note`*, say *the `why` on …*. The JSON was rewritten by the script; read every `move.why.reason` in these four sections once, because these are the examples agents copy. |
| §21 checklist item 1 | `version: 2` |
| §21 item 3, *"the split is explained in `note` or `about`"* | *…in the `why` of the units concerned, or in `about`* |
| §21 item 6, *"a `note` on any label that is not obvious"* | *a `why` on any label that is not obvious, and `why.evidence` on every `basis: marked`* |
| §21 item 10, *"`note` on every judgment call"* | *a `why` on every judgment call, written for the reader: reason, evidence, the label it beat, the page* |
| Anywhere else `rg -n '`note`' ` finds | Read and convert; there should be none left when done. |

#### 5.2.3 Pass 3 — the new section and the new §6 bullet

Insert as **§2.5** (after §2.4, before §3), and renumber nothing else (the
guide's sections are cited by number elsewhere):

```markdown
### 2.5 The case for a label: `why`

Every label in the file may carry the case for it, and the page shows that case
before anything else when the reader hovers the label. The `why` is not a
comment for the next editor; it is the sentence the reader sees. Write it that way.

| key | type | required | what it is |
|---|---|---|---|
| `reason` | string | **yes** | What in *this* sentence makes it *this* label: its words, its target, what it does to the target, what the passage does with it afterwards. One to three sentences. Plain prose — no backticks, no Markdown, no file names, no "the taxonomy", no "this file". |
| `evidence` | string | no — **yes when `basis` is `marked`** | The words of the sentence that carry the label, verbatim from `he` (from `en` for an English source). Not a paraphrase; not the whole sentence; not the `marker` repeated. Where the phrase brackets content, `…` stands for the content, as in `marker`: `מה … אף`. |
| `ratherThan` | string | no | The neighbouring label you nearly chose and the test that ruled it out. Begin with that label's key: `resolution/settlement: …`, `diametrically-opposed: …`. |
| `ramchal` | string | no | Where the book states the rule or labels this passage — `Heb p185`, `ch. 9 p. 172` — optionally followed by the book's words. |

Where it goes:

| label | where its `why` sits |
|---|---|
| the move | `move.why` |
| an anatomy label | `anatomy[i].why` |
| the unit's provenance | write `provenance` as `{ "kind": "tradition", "why": { … } }` instead of the bare word |
| the sugya's party | write `party` as `{ "kind": "party-group", "why": { … } }` |

The test for a `reason`: strike the label's name out of it. What is left must
still pick out this sentence and no other. If it could be pasted unchanged
under another sentence with the same label, it is a definition, and the page
already has the definition.

Two annotations with their cases, one marked and one inferred:

```json
[
  {
    "kind": "categorical",
    "basis": "marked",
    "why": {
      "reason": "No uncleanness for liquids at all: the whole class, denied.",
      "evidence": "כל עקר"
    }
  },
  {
    "kind": "hypothetical-syllogism-tollens",
    "why": {
      "reason": "If liquids could become unclean by Torah law, the liquids of the Temple slaughterhouse would be unclean; Yosi ben Yo'ezer testified they are clean; so they cannot.",
      "ratherThan": "analogism: nothing is carried from one case to another by likeness; a consequence is denied."
    }
  }
]
```

A move with its case, and the provenance that draws its ground badge:

```json
{
  "move": {
    "element": "proof",
    "subtype": "demonstration",
    "target": "eleazar",
    "marker": "תדע, שהרי",
    "attested": true,
    "why": {
      "reason": "The testimony is brought to establish the ruling, not merely to support it: if the Temple liquids are clean, liquids as such cannot be unclean by Torah law. Ramchal names it a demonstration.",
      "ramchal": "Heb p173, Eng p174"
    }
  },
  "provenance": {
    "kind": "tradition",
    "why": {
      "reason": "R. Eleazar does not reason to his conclusion; he cites what Yosi ben Yo'ezer testified. A testimony received from an earlier generation is tradition, so the proof enters accepted and the ground it stands on is a received one.",
      "evidence": "העיד יוסי בן יועזר איש צרידה"
    }
  }
}
```

Three reasons that are wrong, and why:

| written | wrong because | write instead |
|---|---|---|
| `"A demonstration proves a claim from what is already accepted."` | a definition; true of every demonstration | `"The testimony is brought to establish the ruling, not to support a ruling already held."` |
| ``"`תא שמע` is in `markers.ts`, so marked."`` | editor-facing; backticks; a file name | put `תא שמע` in `evidence` and write what the quoted text is and what it does |
| `"Probably an objection."` | no fact about the sentence | name the target and what the sentence denies of it |

What the page does. A label with a `why` shows: the reason; *in the text* and
the evidence; *rather than* and the rejected label; *Ramchal* and the page. The
type's general definition is folded beneath a line reading *what “…” means*,
and the fold's state is remembered across the reader's visits. A label with no
`why` shows the general definition unfolded, so an omitted `why` is never an
error — but every judgment call should have one.
```

The **`why`** bullet for §6 (replacing the `note` bullet):

```markdown
- **`why`** is the case for a label, and the page shows it: `reason` says what in this sentence makes it this label; `evidence` quotes the words that carry it (required when `basis` is `marked`); `ratherThan` names the leaf you nearly chose and the test that decided against it; `ramchal` gives the page. Write it for the reader of the page, not for the next editor — plain prose, no backticks, no file names. Every judgment call gets one; a label that is obvious from the text may go without.
```

#### 5.2.4 What must be true when the guide is done

- `rg -n '`note`|"note"' skills/` returns nothing.
- `rg -n '"version": 1' skills/` returns nothing.
- Every JSON block in §15–§18 parses (`npx tsx scripts/migrate-guide-json.ts`
  reported `0 left` for them — blocks it left are fragments with `…` and are
  fine only outside the worked files).
- §2.5 exists and §3 still begins `## §3`.
- The one-line validation command in §5.3 still works against a version-2 file.

### 5.3 `skills/derech-tevunos-sugya-json/SKILL.md`

- Line 8, *"version `1`"* → *"version `2`"*.
- Workflow step 3, last sentence → *Put the case for every judgment call in `why` — on the move, on the annotation, or on the provenance as `{ "kind", "why" }`. The reader of the page sees it: write the reason, quote the words in `evidence`, name the leaf you rejected in `ratherThan`.*
- Workflow step 5: *plus two or three lines naming the judgment calls* → *the judgment calls are already in the file's `why`s; name the two or three hardest in the reply.*
- The vocabulary section: after `**provenance**` add *— write `{ "kind": "tradition", "why": { "reason": … } }` when a mishnah, baraita or verse is quoted against a claim, so the page can say why the challenge enters accepted*.
- *"The smallest valid file"*: `"version": 2`.
- *"A unit with everything the page can show"*: the script rewrote the block; confirm it reads `anatomy: [{ kind: "consequent", why: { reason: … } }]` and `move: { …, why: { reason: "Ramchal's own illustration of תשובה.", ramchal: "ch. 9 p. 172" } }`.
- Rules that bite: *"If no leaf fits, take the nearest and say so in `note`."* → *"…take the nearest and say what would not fit in `why.ratherThan`."*

### 5.4 `SUGYA_WATERFALL_V4_ANATOMY.md` — dated amendment to §2.5

Do not rewrite §2.5; it is a record of what was built in v4. Append, after
the table and before *"The context line is written per place"*:

```markdown
**Amended 2026-09-18 — the case comes first.** The file now carries, for any
label, the case for it (`why`: reason, evidence, the label it beat, the page),
and the popup leads with that. The rows above from *gloss* to *context* are
folded under a line reading *what “…” means*; the fold's open state is one
setting remembered in `localStorage` for every popup. A popup with a fold takes
the pointer and stays open while the pointer or the focus is inside it, which
reverses the "takes no pointer events" rule below for exactly those popups and
no others. A label with no case shows the table above unchanged. The move's
popup is now also on the label words, not only on the icon. The pinned card
described below was not revived: the fold lives in the popup that appears where
the eye already is.
```

### 5.5 `AGENTS.md`

Add under *The site*, after *"Construct cards and 'drawn' links"*:

```markdown
### Every label carries its case, and the popup leads with it — settled 2026-09-18

The sugya format is version 2. A label's rationale is a structured `why`
(`reason`, `evidence`, `ratherThan`, `ramchal`) on the move, on each anatomy
label, and — as `{ kind, why }` — on `provenance` and `party`; the free-text
`note` is gone and the reader refuses it by name. `BadgeTip` and `MoveTip`
show the case first and fold the type's general explanation under
`TipDetails`, whose open state is one `localStorage` setting
(`useTipDetails`). A label with no `why` shows the general explanation
unfolded. Three things that look like tidying and are not: a popup is
`interactive` only when it has a fold (an inert popup closing as the pointer
moves to the next row is the tuned behaviour everywhere else); `Tooltip` keeps
the popup open on `blur` when focus moves *into* it, or the fold's button can
never be reached by keyboard; and a `basis: marked` annotation must quote its
word in `why.evidence`, enforced in `annotationErrors`. The fixtures are the
source of the shipped JSON — a case is written in the fixture and the JSON is
regenerated, never the other way. The `why` is reader-facing: no backticks, no
file names, no "the fixture"; the skill guide §2.5 is the writer's contract.
```

Add to *Boundaries — do not*:

```markdown
- Put a `note` back on a unit or an annotation, write a `why.reason` that is a
  definition rather than a fact about the sentence, leave a backtick in one, or
  make an inert popup `interactive`. See "Every label carries its case".
```

---

## 6. Verification

### 6.1 Automated

From `site/`:

1. `npm run typecheck` — clean.
2. `npm run check:rail` — every check green, including the new ones in §3.6.
   Do not weaken a check to get there (AGENTS.md).
3. `npm test` — unchanged tests still pass.
4. `npm run build` — clean.
5. Recount for the docs' inventory tables (paste into the `why` column as `m/a/p`):

```sh
node -e '
const fs=require("fs");
for (const f of fs.readdirSync("src/rail/sugyot").filter(f=>f.endsWith(".json")&&f!=="sugya.schema.json")) {
  const s=JSON.parse(fs.readFileSync("src/rail/sugyot/"+f,"utf8"));
  const m=s.units.filter(u=>u.move.why).length;
  const a=s.units.flatMap(u=>u.anatomy??[]).filter(x=>x.why).length;
  const p=s.units.filter(u=>typeof u.provenance==="object"&&u.provenance.why).length;
  console.log(`${f}: ${m}/${a}/${p}`);
}'
```

Expected after this plan: `pesachim-liquids` `3/6/1`; `berachos-yaakov`
`1/4/0` at least — its `particular` label on `fear` ("And Yaakov was very much
afraid": one man, one occasion) has no case today; `1/5/0` once you write it
(`{ reason: "One man, on one occasion: the verse speaks of Yaakov's fear that night, not of fear in general." }`);
`yebamos-chalitzah` `1/4/1`; `yebamos-deafmute` `0/1/0`; `git-2a-befanai`
`0/19/3`; `bava-metzia-yeush` at least `12/17/15` (the 15 annotation cases that
exist plus the two `comparative` ones written in §4.3), `12/46/15` if the 31
missing annotation cases are written (§9); the three skeletons `0/0/0`. Anything
lower than these is a case the migration lost — find it before moving on.

6. `rg -n '\`' site/src/rail/fixtures --glob '*.ts' | rg -v '^\S+:\s*(/\*\*|\*| \*|//)'` — no backticks in fixture strings.
7. `rg -n 'note' site/src/rail/format.ts site/src/rail/sugya.ts site/src/rail/anatomy.ts site/src/rail/sugyot/sugya.schema.json` — only the `unknownKeys` redirect in `format.ts`.

### 6.2 In the browser (the repo's habit: measured, dated, at two sizes)

Run `npm run dev`, open `/sugya/pesachim-liquids` at 1280×800, and check —
recording the numbers in the AGENTS.md paragraph if any differ from the plan:

1. Hover the **handed down** chip on sentence 2. The popup's first text line
   after the head is the provenance's reason (§2.5), then *IN THE TEXT* with
   the Hebrew quote, then the fold line `▸ what “handed down” means`, then the
   foot. No definition text is visible.
2. Move the pointer straight down from the chip into the popup. It stays open
   (the bridge). Click the fold: the definition, reads line and *about*
   sentence appear indented under a hairline; the popup grows; nothing is
   clipped by the rows' scroller (if the popup was near the bottom it flips
   above).
3. Reload. Hover the same chip: the fold is **open** (remembered). Click it
   closed. Hover the **not the same respect** chip on sentence 3: closed there
   too (one setting).
4. Hover the words **brings proof · הוכחה · demonstration** on sentence 2 (not
   the icon). The move popup appears with the `move.why` reason first and the
   foot reading *Ramchal's own label for this passage · “תדע, שהרי”*. Hover the
   icon: the same popup.
5. Tab from the page start: the badge receives focus and its popup opens;
   Tab again moves focus to the fold's button **without closing the popup**;
   Enter toggles the fold; Tab again leaves and the popup closes.
6. Open `/sugya/bk-2a-toldos` (a skeleton: no `why` anywhere). Hover any
   badge or move label: the popup is exactly the pre-change popup — no fold,
   `role="tooltip"`, `pointer-events: none` (moving the pointer into it closes
   it).
7. Hover the **Talmud itself** speaker badge on any nameless row: unchanged,
   no fold (origin `silence`, no `why`).
8. Hover a bead on an elbow: the chip still gets the one-line hint; the hint
   is not interactive.
9. Confirm none of the three pinned elements moved (bar 92–130, dock 130–753,
   foot 754–800 at 1280×800 on the 77-sentence passage) — the popup is
   absolutely positioned and must not affect layout.
10. At 390×844 on `/sugya/pesachim-liquids`: tap the chip (focus opens the
    popup), tap the fold (it toggles), tap elsewhere (it closes). The popup
    stays inside the rows' scroller (`Tooltip` flips it).
11. `/byo`: paste the migrated `yebamos-deafmute.json` — it draws; paste a
    version-1 file — the refusal lists `$.version: this reader understands
    version 2, got 1` and, for a unit with `note`, the redirect fault naming `why`.
12. Zero console errors throughout.

---

## 7. Order of work and checkpoints

1. §3.1 `sugya.ts`, §3.2 `anatomy.ts`, §3.3 `format.ts`, §3.4 schema, §3.5
   skeleton types → `npm run typecheck` will now complain about the fixtures,
   `check.ts` and the controller. Fix in that order: §3.5 regexes, §3.6, §3.7.
   **Checkpoint:** `npm run typecheck` clean; `npm run check:rail` red only on
   *same data* / *canonical* / *marked … quotes nothing*.
2. §4.2–§4.5 hand work in the fixtures; §4.6 regenerate JSON.
   **Checkpoint:** `npm run check:rail` green.
3. §3.8–§3.15 the components and CSS.
   **Checkpoint:** `npm run typecheck` clean, §6.2 browser checks pass.
4. §5.1–§5.5 the documents; run the guide script, then the prose pass, then
   §5.2.4's assertions.
5. Delete `site/scripts/migrate-why.ts` and `site/scripts/migrate-guide-json.ts`.
6. Move this file from `plans/todo/` to `plans/completed/` and add a dated
   *Done* line at the top with the measurements from §6.

---

## 8. Rules for the implementer

- **Do not add a compatibility path for version 1.** The reader refuses it.
  The owner decided this.
- **Do not keep `note` anywhere.** Not as an alias, not "for now".
- **Do not make every popup interactive.** Only the ones with a fold.
- **Do not render a "no reason recorded" line.** A label without a `why`
  shows the general explanation, unchanged from today.
- **Do not loosen a check to go green.** If the *same data* check fails, the
  fixture and the JSON disagree: regenerate the JSON from the fixture.
- **Comments travel verbatim.** `BASIS_TIP` moves to `MoveTip.tsx` with its
  wording; the "Read from the sentence's provenance…" sentence moves to
  `BadgeTip.tsx` with its wording.
- **No colour literals, no `any`, no casts on a union, exhaustive `switch`.**
  The one `switch` here (`about`) keeps its inline `never`.
- **Write `why` text for the reader.** If you find yourself typing a backtick,
  a file name, or "the fixture" into a `reason`, stop and rewrite.
- **Measure, don't estimate**, and put the date on it — the browser numbers in
  §6.2 go into the AGENTS.md paragraph if they differ from the plan's.

## 9. Out of scope — do not touch

- `DERECH_TEVUNOS_FOR_AGENTS.md` and the other root `DERECH_TEVUNOS_*.md`
  documents: they describe the older classifier record, which the format
  document's §7 table maps onto this file. The mapping row for `note` is
  updated in §5.1; the older documents are not.
- `renders/*.png`: the screenshots embedded in the design documents show the
  pre-change popup and stay as historical record. Do not regenerate them.
- `web/`: the concept-lattice visualization does not read sugya files.
- The 31 annotations in `bava-metzia-yeush` with no case: writing them is
  content work the owner may want to do or review personally. If you write
  them, follow §2.1 and §4.5; if you do not, record the count in the format
  document's §3 bullet as a measured shortfall with the date.
- A `why` on the derived *Talmud itself* speaker badge: the badge is read off
  the absence of a `speaker`, there is nothing in the file to hang a case on,
  and its popup already says why it is there.
