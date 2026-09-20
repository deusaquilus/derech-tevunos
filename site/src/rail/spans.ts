/**
 * Word-level roles: which words of a sentence are its subject and which its
 * predicate (ch. 3), which clause of a hypothetical is the antecedent and
 * which the consequent (ch. 3), which words are the premises and which the
 * conclusion of a deduction spelt out in one breath (ch. 7), and which words
 * carry each of the separate commitments — סוף גזרתו — that a challenge can
 * defeat one at a time while the others stand (ch. 6).
 *
 * These are not labels from a closed list, like `anatomy.ts`'s kinds: the
 * subject of “women are obligated in kiddush” is *women*, a piece of the
 * sentence's own text. So a role is recorded as a **span** — a piece of the
 * sentence located by word positions into the texts the file already has,
 * `he` and `en` — and never as a copy of the words. A span is a few small
 * integers; it adds nothing to the file that could go stale, and it cannot
 * bloat. The row shows a span as a hairline under the words, named on hover.
 *
 * One span, two projections. The antecedent of a sentence is one thing said
 * in two languages, so a span is one object with a `he` range and an `en`
 * range (either may be missing where that text is not indexed), and what is
 * true of the span — its note, its loudness — is written once on the object,
 * not once per text. Before 2026-09-20 the two texts were indexed separately
 * and `showLoud` had to be written twice; that is the defect this shape
 * removes.
 *
 * Words are the maximal runs of non-whitespace in the text, numbered from 1;
 * punctuation stays with the word it touches, a lone dash counts as a word,
 * and a maqaf-joined pair (`קל־וחומר`) is one word. That rule is blunt on
 * purpose: it is the one every reader, human or agent, will compute the same
 * way. A range is inclusive at both ends and written `"2-4"`, or `"3"` for a
 * single word; a span that is discontinuous in one text — a predicate split
 * around its subject — takes a list of ranges there. A role that occurs more
 * than once in one sentence — two premises, three commitments, a compound's
 * several subjects — is a list of spans, in the order they occur.
 *
 * The seven roles have the icon set's drawings of 20 September 2026
 * (`ICONS_REFERENCE_COMPLETE_V3.md` §15–17, §24); `glyphs.ts` carries the
 * bodies as `ROLE_GLYPHS`. The subject's is `subject-bearer`, shared with the
 * chapter 11 kind of that name: the icon set treats the two as one picture,
 * and the file keeps them two constructs.
 */

import type { Hue } from "./anatomy.ts";

export type SpanRole =
  | "subject"
  | "predicate"
  | "antecedent"
  | "consequent"
  | "premise"
  | "conclusion"
  | "commitment";

/** Every role, in the order the roles are documented: the statement's two parts, the hypothetical's two, the deduction's two, then the commitments. */
export const SPAN_ROLES: readonly SpanRole[] = [
  "subject",
  "predicate",
  "antecedent",
  "consequent",
  "premise",
  "conclusion",
  "commitment",
];

/** Which of a unit's texts a span's ranges index. A span may locate itself in both; each set of ranges counts that text's own words. */
export type SpanText = "he" | "en";

export const SPAN_TEXTS: readonly SpanText[] = ["he", "en"];

/** One run of words, 1-based and inclusive at both ends. */
export type WordRange = {
  readonly from: number;
  readonly to: number;
};

/**
 * One span: a piece of the sentence playing one role, located in each text
 * the classifier indexed. At least one of `he` / `en` is present; the reader
 * enforces that, since the type cannot.
 *
 * `note` says *why these words are that role* — not what the role is, which
 * the popup already explains. It is the same field the anatomy labels carry
 * and is read the same way: a word or two where the span is unimportant
 * (`the rule`, `the carved-out case`), or nothing; a sentence or more only
 * where the span is loud. A subject or predicate never needs one.
 *
 * `showLoud` marks a span the passage's logic turns on. Almost every span is
 * quiet: the page draws it as a hairline in a taupe that nearly blends into
 * the paper and names it only when asked. A loud one is the same hairline at
 * a trace of the role's hue — still a whisper. The judgment is the
 * classifier's and it is meant to be rare — the antecedent of a hypothetical
 * is not loud because it is an antecedent, only when the sugya's argument
 * hangs on that clause and a reader would miss it.
 */
export type Span = {
  readonly he?: readonly WordRange[];
  readonly en?: readonly WordRange[];
  readonly showLoud?: true;
  readonly note?: string;
};

/** A unit's spans: for each role that occurs, its spans in the order they occur in the sentence. */
export type Spans = Readonly<Partial<Record<SpanRole, readonly Span[]>>>;

export const isLoud = (span: Span): boolean => span.showLoud === true;

/** The span's ranges into one text; none where that text is not indexed. */
export const rangesIn = (span: Span, text: SpanText): readonly WordRange[] => span[text] ?? [];

/** Every span of a unit, with its role, in role order then sentence order. */
export const allSpans = (spans: Spans): readonly { readonly role: SpanRole; readonly span: Span }[] =>
  SPAN_ROLES.flatMap((role) => (spans[role] ?? []).map((span) => ({ role, span })));

export type SpanRoleInfo = {
  readonly en: string;
  readonly he: string;
  /** What the words in this role are, for a reader who is not a logician. */
  readonly plain: string;
  /** The key of the drawing in `icons_v3/icons/`; `ROLE_GLYPHS` in `glyphs.ts` holds the body. */
  readonly icon: string;
  readonly hue: Hue;
  readonly chapter: number;
  /** Where the role is defined, in the bilingual edition. */
  readonly page: string;
};

export const SPAN_ROLE_INFO: Record<SpanRole, SpanRoleInfo> = {
  subject: {
    en: "subject",
    he: "נושא",
    plain: "what the sentence is about — the thing something is affirmed or denied of",
    icon: "subject-bearer",
    hue: "violet",
    chapter: 3,
    page: "Eng p22 · Heb p21",
  },
  predicate: {
    en: "predicate",
    he: "נשוא",
    plain: "what is affirmed or denied of the subject",
    icon: "predicate",
    hue: "violet",
    chapter: 3,
    page: "Eng p22 · Heb p21",
  },
  antecedent: {
    en: "antecedent",
    he: "הקודם",
    plain: "the clause of a hypothetical that states the condition",
    icon: "hypothetical-antecedent",
    hue: "violet",
    chapter: 3,
    page: "Eng p32 · Heb p31",
  },
  consequent: {
    en: "consequent",
    he: "הנמשך",
    plain: "the clause of a hypothetical that hangs on the condition",
    icon: "hypothetical-consequent",
    hue: "violet",
    chapter: 3,
    page: "Eng p32 · Heb p31",
  },
  premise: {
    en: "premise",
    he: "הקדמה",
    plain: "a statement the deduction starts from",
    icon: "premise",
    hue: "teal",
    chapter: 7,
    page: "Eng p94 · Heb p93",
  },
  conclusion: {
    en: "conclusion",
    he: "תולדה",
    plain: "the statement the deduction arrives at",
    icon: "conclusion",
    hue: "teal",
    chapter: 7,
    page: "Eng p94 · Heb p93",
  },
  commitment: {
    en: "commitment",
    he: "סוף גזרתו",
    plain: "one of the things the sentence ultimately asserts, on which its truth turns — a challenge can defeat one and leave the rest",
    icon: "statement-commitment",
    hue: "violet",
    chapter: 6,
    page: "Eng p76 · Heb p75",
  },
};

// --- words and ranges ---------------------------------------------------------

/** The words of a text, by the blunt rule above. An empty text has no words. */
export const words = (text: string): readonly string[] => {
  const trimmed = text.trim();
  return trimmed === "" ? [] : trimmed.split(/\s+/);
};

export const wordCount = (text: string): number => words(text).length;

const RANGE = /^(\d+)(?:-(\d+))?$/;

/** `"3"` or `"2-4"` to a range; anything else is `undefined`. Leading zeros and `0` itself are refused by the bounds check, not here. */
export const parseRange = (s: string): WordRange | undefined => {
  const m = RANGE.exec(s.trim());
  if (m === null) return undefined;
  const from = Number(m[1]);
  const to = m[2] === undefined ? from : Number(m[2]);
  return { from, to };
};

/** The canonical spelling: a single word is its number, a run is `from-to`. */
export const printRange = (r: WordRange): string => (r.from === r.to ? `${r.from}` : `${r.from}-${r.to}`);

/** Why a range cannot index a text of `count` words, or `undefined` if it can. */
export const rangeFault = (r: WordRange, count: number): string | undefined =>
  r.from < 1
    ? `words are numbered from 1, got ${printRange(r)}`
    : r.to < r.from
      ? `a range runs forwards, got ${printRange(r)}`
      : r.to > count
        ? `${printRange(r)} runs past the end: the text has ${count} word${count === 1 ? "" : "s"}`
        : undefined;

// --- for the renderer -----------------------------------------------------------

/** Which span covers a word: its role, its position among that role's spans (so two abutting commitments stay apart), and the span itself, for its note and loudness. */
export type Cover = {
  readonly role: SpanRole;
  readonly index: number;
  readonly span: Span;
};

/**
 * A stretch of the original text, verbatim, with every span that covers it.
 * Whitespace inside a run of words covered by one span keeps that span, so
 * an underline is continuous — but only inside one span: two premises that
 * abut are two underlines, not one.
 */
export type Segment = {
  readonly text: string;
  readonly covers: readonly Cover[];
};

/** The distinct roles a segment plays, in role order. */
export const rolesOf = (segment: Segment): readonly SpanRole[] => [...new Set(segment.covers.map((c) => c.role))];

/** Whether any span covering the segment is loud. */
export const loudSegment = (segment: Segment): boolean => segment.covers.some((c) => isLoud(c.span));

const coversOf = (spans: Spans, text: SpanText, wordIndex: number): readonly Cover[] =>
  SPAN_ROLES.flatMap((role) =>
    (spans[role] ?? []).flatMap((span, index) =>
      rangesIn(span, text).some((r) => r.from <= wordIndex && wordIndex <= r.to) ? [{ role, index, span }] : [],
    ),
  );

const sameCover = (a: Cover, b: Cover): boolean => a.role === b.role && a.index === b.index;

const sameCovers = (a: readonly Cover[], b: readonly Cover[]): boolean =>
  a.length === b.length && a.every((c, i) => sameCover(c, b[i]!));

/** The covers two neighbouring words share — what the whitespace between them belongs to. */
const shared = (a: readonly Cover[], b: readonly Cover[]): readonly Cover[] =>
  a.filter((c) => b.some((d) => sameCover(c, d)));

/**
 * One text of the unit cut into segments by the spans that cover it,
 * preserving every character. Tokens alternate word / whitespace; a
 * whitespace token takes the covers its two neighbours share, so “are
 * obligated in kiddush” is one segment and one underline, a predicate stays
 * continuous across the start of a commitment nested inside it, and the seam
 * between two abutting commitments is a plain space. Leading and trailing
 * whitespace belongs to no span.
 */
export const segments = (text: string, spans: Spans | undefined, which: SpanText): readonly Segment[] => {
  if (spans === undefined || allSpans(spans).every((s) => rangesIn(s.span, which).length === 0)) return [{ text, covers: [] }];
  const tokens = text.split(/(\s+)/).filter((t) => t.length > 0);
  const total = wordCount(text);
  const NONE: readonly Cover[] = [];
  const tagged = tokens.reduce<{ readonly index: number; readonly out: readonly Segment[] }>(
    ({ index, out }, token) => {
      if (/^\s+$/.test(token)) {
        const before = out[out.length - 1]?.covers ?? NONE;
        const nextIndex = index + 1;
        const after = nextIndex <= total ? coversOf(spans, which, nextIndex) : NONE;
        return { index, out: [...out, { text: token, covers: shared(before, after) }] };
      }
      const wordIndex = index + 1;
      return { index: wordIndex, out: [...out, { text: token, covers: coversOf(spans, which, wordIndex) }] };
    },
    { index: 0, out: [] },
  ).out;
  // Merge neighbours covered by the same spans so each underline is one element.
  return tagged.reduce<readonly Segment[]>((acc, seg) => {
    const last = acc[acc.length - 1];
    return last !== undefined && sameCovers(last.covers, seg.covers)
      ? [...acc.slice(0, -1), { text: last.text + seg.text, covers: last.covers }]
      : [...acc, seg];
  }, []);
};
