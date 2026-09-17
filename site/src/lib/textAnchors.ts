/**
 * Where the site's own vocabulary lands on the text.
 *
 * Derech Tevunos defines, one by one, the constructs the Sugyascade draws:
 * the speakers of chapter 1, the seven parts of chapter 2, the kinds of
 * statement of chapter 3, the relations of chapter 4, and so on through the
 * nineteen leaves of chapter 9. The interlinear edition
 * (`DerechTevunos_benyehudah_bilingual_fixed_interlinear.md`) cuts the text so
 * that each definition, and each naming clause (`ונקרא…`, "and this is
 * called…"), is its own verse. This module says, verse by verse, which
 * construct that is, so the docs generator can put the construct's card —
 * its glyph, name, marker word and gloss, all from `anatomy.ts` and
 * `taxonomy.ts` — beside the words that define it.
 *
 * The rule for where an anchor goes: the verse that NAMES the construct where
 * the text names it, otherwise the verse that DEFINES it. Never the example.
 * Every verse ID here is checked against the interlinear at build time; a
 * verse that does not exist fails `npm run build-text`.
 *
 * `DRAWN` is the second table: verses whose passage the site ships as a
 * Sugyascade, so the page can say "drawn here" and the passage page can say
 * "read it in the text".
 */

import type { AnatomyKey } from "../rail/anatomy.ts";
import type { Element, MoveKey } from "../rail/taxonomy.ts";

/** `chapter.paragraph.verse`, as the interlinear numbers it — `3.14.11`. */
export type VerseId = string;

/**
 * One construct card. Four sources, because the site keeps them apart:
 * `anatomy` is a chapter 1–8 badge (`anatomy.ts`, with a glyph in
 * `glyphs.ts`); `tile` is the statement shape itself (subject and predicate,
 * chapter 3's first paragraph); `element` is one of the seven parts of a
 * sugya (chapter 2, `taxonomy.ts`); `leaf` is one of their nineteen kinds
 * (chapter 9).
 */
export type ConstructAnchor =
  | { readonly kind: "anatomy"; readonly key: AnatomyKey }
  | { readonly kind: "tile" }
  | { readonly kind: "element"; readonly key: Element }
  | { readonly kind: "leaf"; readonly key: MoveKey };

const anatomy = (...keys: readonly AnatomyKey[]): readonly ConstructAnchor[] =>
  keys.map((key) => ({ kind: "anatomy", key }));
const element = (...keys: readonly Element[]): readonly ConstructAnchor[] =>
  keys.map((key) => ({ kind: "element", key }));
const leaf = (...keys: readonly MoveKey[]): readonly ConstructAnchor[] =>
  keys.map((key) => ({ kind: "leaf", key }));
const tile: readonly ConstructAnchor[] = [{ kind: "tile" }];

/** The seven parts' names in the text's own words (2.2.1). */
export const ELEMENT_HEBREW: Readonly<Record<Element, string>> = {
  statement: "מימרא",
  question: "שאלה",
  answer: "תשובה",
  contradiction: "סתירה",
  proof: "ראיה",
  difficulty: "קשיא",
  resolution: "תרוץ",
};

/**
 * The statement shape (`TILE_GLYPH`), which chapter 4 builds every relation
 * from. Its reading is `icons_v3/ICONS_REFERENCE.md` §3: the box is the
 * subject, the arrow the predicate.
 */
export const TILE_CARD = {
  en: "a statement",
  he: "נושא · נשוא",
  reads: "the box is the subject, the arrow the predicate",
} as const;

export const CONSTRUCTS: Readonly<Record<VerseId, readonly ConstructAnchor[]>> = {
  // ── ch. 1 — who is speaking ──────────────────────────────────────────────
  "1.2.1": anatomy("party-group"),
  "1.2.3": anatomy("party-individual"),
  "1.3.3": anatomy("party-talmud"),

  // ── ch. 2 — the seven parts, each at its definition ──────────────────────
  "2.4.1": element("statement"),
  "2.5.1": element("question"),
  "2.6.1": element("answer"),
  "2.7.1": element("contradiction"),
  "2.8.1": element("proof"),
  "2.9.1": element("difficulty"),
  "2.10.1": element("resolution"),

  // ── ch. 3 — subject and predicate; the quantity of the subject ───────────
  "3.1.4": tile,
  "3.4.1": anatomy("categorical"),
  "3.5.1": anatomy("particular"),
  "3.6.1": anatomy("partial"),
  "3.6.3": anatomy("unqualified"),

  // ── ch. 3 — the eleven kinds, at the naming clause where there is one ────
  "3.8.2": anatomy("simple"),
  "3.9.2": anatomy("qualified-certain"),
  "3.9.3": anatomy("qualified-possible"),
  "3.9.4": anatomy("qualified-doubtful"),
  "3.9.5": anatomy("qualified-impossible"),
  "3.10.3": anatomy("exclusion"),
  "3.11.4": anatomy("exception"),
  "3.12.4": anatomy("conditional"),
  "3.13.3": anatomy("hypothetical"),
  "3.14.14": anatomy("compound-not-only"),
  "3.14.15": anatomy("compound-needless"),
  "3.14.17": anatomy("disjunction"),
  "3.14.18": anatomy("compound"),
  "3.15.1": anatomy("preclusive"),
  "3.16.1": anatomy("discrepancy"),
  "3.17.5": anatomy("comparative"),
  "3.18.1": anatomy("consequent"),

  // ── ch. 4 — how two statements relate ────────────────────────────────────
  "4.2.1": anatomy("equivalent"),
  "4.3.1": anatomy("variant", "variant-subjects"),
  // 4.4.3 lists the conditions for opposition; 4.4.4–4.4.6 work one each.
  // The sewn/unsewn case at 4.4.4 is filed under *time* because the text's
  // own word there is בזמן; the glyph contract files the same Shabbat 57a
  // case under `differs-in-context`. The text wins on the text's page.
  "4.4.3": anatomy("differs-in-time", "differs-in-place", "differs-in-context", "homonym", "figurative"),
  "4.4.4": anatomy("differs-in-time"),
  "4.4.5": anatomy("differs-in-place"),
  "4.4.6": anatomy("homonym"),
  "4.5.1": anatomy("diametrically-opposed", "contradictory"),
  "4.6.3": anatomy("has-middle", "no-middle"),
  "4.7.5": anatomy("converse"),
  "4.7.7": anatomy("converse-limited"),
  "4.7.9": anatomy("contrapositive"),
  "4.8.1": anatomy("obverse"),
  "4.9.1": anatomy("incongruent"),

  // ── ch. 5 — what a statement implies ─────────────────────────────────────
  "5.3.2": anatomy("inference-loose"),
  "5.3.5": anatomy("inference-necessary"),
  "5.4.3": anatomy("contrapositive"),
  "5.4.4": anatomy("converse-limited"),
  "5.4.6": anatomy("converse"),
  "5.4.8": anatomy("absolute-opposite"),
  // 5.4.9, the limited contrapositive, has no glyph by decision (ICONS_REFERENCE rule 7).
  "5.4.10": anatomy("converse-limited"),

  // ── ch. 6 — not meant literally; the truth condition of each kind ────────
  "6.2.4": anatomy("figurative"),
  "6.3.3": anatomy("simple"),
  "6.3.7": anatomy("exclusion"),
  "6.3.9": anatomy("exception"),
  "6.3.12": anatomy("conditional"),
  "6.3.14": anatomy("hypothetical"),
  "6.3.21": anatomy("compound"),
  "6.3.24": anatomy("consequent"),

  // ── ch. 7 — deriving a conclusion, and why a derivation fails ────────────
  "7.2.9": anatomy("syllogism", "classical-syllogism"),
  "7.2.11": anatomy("fallacy-not-included"),
  "7.3.2": anatomy("analogism"),
  "7.3.4": anatomy("a-fortiori"),
  // 7.3.7 names the three defeats in one sentence, in this order.
  "7.3.7": anatomy("fallacy-not-similar", "fallacy-not-greater", "fallacy-counterexample"),
  "7.4.6": anatomy("hypothetical-syllogism", "hypothetical-syllogism-tollens"),
  "7.5.6": anatomy("disjunctive-syllogism"),

  // ── ch. 8 — what a proof stands on, how it is turned aside, form, modality ─
  "8.5.1": anatomy("ground-axiom"),
  "8.6.1": anatomy("ground-sense"),
  "8.8.1": anatomy("ground-common-sense"),
  "8.9.1": anatomy("ground-tradition"),
  "8.10.1": anatomy("ground-deduction"),
  "8.10.3": anatomy("via-opposite"),
  "8.15.3": anatomy("dilemma"),
  "8.16.1": anatomy("ground-does-not-reach"),
  "8.17.2": anatomy("rebuttal-your-reasoning"),
  "8.18.2": anatomy("rebuttal-just-the-opposite", "rebuttal-proves-my-point"),
  "8.20.1": anatomy("theory"),
  "8.21.22": anatomy("potential", "actual"),
  "8.23.2": anatomy("obvious"),
  "8.23.3": anatomy("might-have-thought"),
  "8.24.1": anatomy("redundant-part"),
  "8.24.3": anatomy("self-contradictory"),
  "8.24.5": anatomy("misordered"),

  // ── ch. 9 — the parts of the sugyot and their leaves ─────────────────────
  "9.1.1": element("statement", "question", "answer", "contradiction", "proof", "difficulty", "resolution"),
  // Listed at 9.4.3 and never defined; `taxonomy.ts` records it as UNDEFINED_IN_SOURCE.
  "9.4.3": leaf("difficulty/refutation"),
  "9.5.2": leaf("statement/firsthand"),
  "9.6.4": leaf("statement/explanation"),
  "9.6.5": leaf("statement/forcedExplanation"),
  "9.6.7": leaf("statement/presumption"),
  "9.7.1": leaf("statement/inference"),
  "9.8.1": leaf("statement/reported"),
  "9.9.1": leaf("question/query"),
  "9.10.1": leaf("question/principle"),
  "9.11.1": leaf("answer/answer"),
  "9.12.1": leaf("answer/determination"),
  "9.13.1": leaf("proof/demonstration"),
  // "we can also demonstrate by force of a sevara, but it is not as strong": the `theory` glyph on a proof edge.
  "9.13.4": anatomy("theory"),
  "9.14.1": leaf("proof/validation"),
  "9.15.1": leaf("contradiction/direct"),
  "9.16.1": leaf("contradiction/opposition"),
  // The objection is chapter 8's "objections to form" as a leaf; the five glyphs serve it here too.
  "9.17.1": [
    ...leaf("difficulty/objection"),
    ...anatomy("obvious", "might-have-thought", "redundant-part", "self-contradictory", "misordered"),
  ],
  "9.18.1": leaf("difficulty/apparentContradiction"),
  "9.19.1": leaf("resolution/settlement"),
  "9.20.1": leaf("resolution/alternative"),
};

/** A shipped passage that draws the exchange a verse quotes, and the role that exchange plays in it. */
export type Drawn = {
  /** A passage id in `src/rail/sugyot/`, e.g. `berachos-yaakov`. */
  readonly sugya: string;
  /** What the quoted words are in the drawing, as a phrase the sentence "drawn as …" can take. */
  readonly role: string;
};

/**
 * Chapter 9's examples that the site ships as passages. Each passage's own
 * `discussedAt` names the Feldheim pages these verses translate.
 */
export const DRAWN: Readonly<Record<VerseId, readonly Drawn[]>> = {
  "9.9.4": [{ sugya: "yebamos-deafmute", role: "the query" }],
  "9.11.2": [{ sugya: "yebamos-deafmute", role: "the answer" }],
  "9.13.2": [{ sugya: "pesachim-liquids", role: "the demonstration" }],
  "9.15.2": [{ sugya: "pesachim-liquids", role: "the direct contradiction" }],
  "9.18.3": [{ sugya: "berachos-yaakov", role: "the apparent contradiction" }],
  "9.19.2": [{ sugya: "berachos-yaakov", role: "its settlement" }],
  "9.20.3": [{ sugya: "yebamos-chalitzah", role: "the alternative" }],
};

/** The verses that quote a passage, in reading order — the passage page's way back into the text. */
export const versesDrawing = (sugyaId: string): readonly VerseId[] =>
  Object.entries(DRAWN)
    .filter(([, drawn]) => drawn.some((d) => d.sugya === sugyaId))
    .map(([verse]) => verse)
    .sort(compareVerseIds);

const partsOf = (id: VerseId): readonly number[] => id.split(".").map(Number);

/** Numeric order by chapter, then paragraph, then verse — `9.11.2` before `9.13.2`. */
export const compareVerseIds = (a: VerseId, b: VerseId): number => {
  const [ac = 0, ap = 0, av = 0] = partsOf(a);
  const [bc = 0, bp = 0, bv = 0] = partsOf(b);
  return ac - bc || ap - bp || av - bv;
};

/** The docs URL of a verse: the chapter page and the verse's anchor. */
export const verseHref = (id: VerseId): string => {
  const [chapter = 0] = partsOf(id);
  return `/docs/text/chapter-${String(chapter).padStart(2, "0")}#v${id.replace(/\./g, "-")}`;
};
