/**
 * Every Derech Tevunos chapter except chapter 9: who is speaking, what a
 * statement is made of, how two statements stand to each other, what one
 * implies, when it is not meant literally, how a conclusion is derived from
 * what is granted, what a proof or disproof stands on, when a report is
 * itself the argument, and which aspect of its subject a sentence examines.
 *
 * Chapter 9 (`taxonomy.ts`) names what a sentence *does* to an earlier one.
 * These chapters name what a sentence *is*, how it relates, and what it rests
 * on. The two are different levels and stay apart: nothing here is a move,
 * nothing here has an effect, and no label here touches a verdict. On the page
 * it is a second layer of badges over the lattice — switched on and off as
 * one, and on by default.
 *
 * Every type is defined by an everyday phrase rather than a term of logic,
 * following the book's own habit: Ramchal fixes nearly every type by a stock
 * word (*all*, *except*, *provided that*, *if… then*, *just as… so too*), so the
 * chip label is that word's everyday picture and the tooltip gives the rest.
 *
 * Page numbers follow the bilingual edition: even pages English, odd Hebrew.
 * The glyphs are the icon set in `icons_v3/`; `icons_v3/ICONS_REFERENCE.md` is
 * the contract for the chapter 1–8 drawings, `ICONS_REFERENCE_V2.md` beside
 * it covers the chapter 9–11 additions of 18 September 2026, and
 * `ICONS_REFERENCE_COMPLETE_V3.md` the 38 drawings added on 20 September 2026
 * — fourteen of them kinds here, seven the word-span roles of `spans.ts`,
 * eleven the remaining chapter 9 leaves and their explanation parent, and six
 * chapter 11's rules of Order, which label nothing in a file.
 */

import type { LabelBasis, Provenance } from "./sugya.ts";
import type { Element } from "./taxonomy.ts";

/**
 * Ramchal's own partition (ch. 2, Eng p18–20): understanding statements
 * (chapters 3–6), deriving new ones (chapter 7), accepting or rejecting them
 * (chapter 8), and, before any of it, knowing who is talking (chapter 1).
 * Chapters 3–6 are split in two here only because a badge about one sentence
 * and a badge about two sit in different places.
 *
 * The last two are past the partition: chapter 10, where a report is also an
 * argument, and chapter 11, where the question is which aspect of a subject
 * is under examination. Neither adds a move, which is why both are here.
 */
export type Family =
  | "speakers"
  | "anatomy"
  | "relations"
  | "deductions"
  | "grounds"
  | "reports"
  | "subjects";

/** Where a badge belongs: on the row it describes, or on the move the row makes. */
export type Level = "row" | "edge";

/**
 * One hue per family, so that in a mixed view the eye reads moves by the
 * element colours and this layer by shape. Green and red stay verdicts; amber,
 * yellow and blue stay with the moves that own them. Magenta was the one clean
 * hue left when chapter 8 arrived (`icons_v3/METHODOLOGY.md` §3).
 */
export type Hue = "violet" | "teal" | "slate" | "magenta";

export type FamilyInfo = {
  readonly name: string;
  readonly chapter: string;
  readonly hue: Hue;
  /** What the family is about, for the lens pill's tooltip. */
  readonly blurb: string;
};

export const FAMILIES: Record<Family, FamilyInfo> = {
  speakers: {
    name: "Speakers",
    chapter: "ch. 1",
    hue: "slate",
    blurb:
      "Who is speaking: named rabbis in dispute, one person arguing both sides with himself, or the Talmud's own anonymous voice.",
  },
  anatomy: {
    name: "Statement anatomy",
    chapter: "ch. 3 · 5 · 6 · 8",
    hue: "violet",
    blurb:
      "What a single sentence is made of: how much of its class it speaks about, how its predicate attaches (except, provided that, if… then, just as… so too), whether an inference drawn from it is forced or loose, whether it is meant literally, and in what respect the predicate is said — of what always goes with the subject, or of what merely happens to be so.",
  },
  relations: {
    name: "Relations",
    chapter: "ch. 4",
    hue: "violet",
    blurb:
      "How two statements stand to each other: head-on, a general claim against a particular one, or only apparently opposed — and which of Ramchal's four tests (time, place, respect, homonym) dissolves the clash.",
  },
  deductions: {
    name: "Deductions",
    chapter: "ch. 7",
    hue: "teal",
    blurb:
      "What kind of inference a proof is — a fortiori, analogy, syllogism, elimination — and, on an objection to such a proof, which way it broke.",
  },
  grounds: {
    name: "Grounds",
    chapter: "ch. 8",
    hue: "magenta",
    blurb:
      "What a proof or disproof stands on — the mind's own axioms, the senses, common opinion, a received tradition, a deduction — and how it is turned aside: shown not to reach the claim, caught whichever way it is taken, held up by a theory alone, thrown back at the other view, or objected to as a matter of form; and whether a predicate is said of what can or of what does.",
  },
  reports: {
    name: "Reported moves",
    chapter: "ch. 10",
    hue: "slate",
    blurb:
      "A sentence that reports someone else's words and, in the same breath, does something with them: the report is the evidence for a claim, or it raises the difficulty that follows from another thinker's position. Whether the attribution is right and whether the argument bites are two separate questions.",
  },
  subjects: {
    name: "Subject analysis",
    chapter: "ch. 11",
    hue: "violet",
    blurb:
      "Which aspect of its subject a sentence is examining — its essence, its parts, how much of it there is, what it is made of, what it does and what is done to it, its cause and its purpose, where it is and when, what it is like and what it is unlike — and, after those twenty-four, the three senses in which one thing can be prior to another. A sentence may be about more than one.",
  },
};

/** Lens order: who speaks, then Ramchal's three processes, then the two chapters past them. */
export const FAMILY_ORDER: readonly Family[] = [
  "speakers",
  "anatomy",
  "relations",
  "deductions",
  "grounds",
  "reports",
  "subjects",
];

export type AnatomyKey =
  // ch. 1 — who is speaking
  | "party-group"
  | "party-individual"
  | "party-talmud"
  // ch. 3 — the subject: how much of the class
  | "categorical"
  | "partial"
  | "particular"
  | "unqualified"
  // ch. 3 — the predicate: how it attaches
  | "simple"
  | "qualified-certain"
  | "qualified-possible"
  | "qualified-doubtful"
  | "qualified-impossible"
  | "exclusion"
  | "exception"
  | "conditional"
  | "hypothetical"
  | "compound"
  | "compound-equal"
  | "compound-known-novel"
  | "compound-not-only"
  | "compound-needless"
  | "disjunction"
  | "preclusive"
  | "discrepancy"
  | "comparative"
  | "consequent"
  // ch. 4 — how two statements relate, and the tests for an apparent opposition
  | "equivalent"
  | "variant"
  | "variant-subjects"
  | "diametrically-opposed"
  | "contradictory"
  | "converse"
  | "converse-limited"
  | "contrapositive"
  | "obverse"
  | "incongruent"
  | "differs-in-time"
  | "differs-in-place"
  | "differs-in-context"
  | "homonym"
  // ch. 10 — the converse of the homonym: different words, one meaning
  | "synonymous-terms"
  | "no-middle"
  | "has-middle"
  // ch. 5 — what a statement implies
  | "inference-necessary"
  | "inference-loose"
  | "absolute-opposite"
  // ch. 6 — not meant literally
  | "figurative"
  | "hyperbole"
  // ch. 7 — deriving a conclusion, and why a derivation fails
  | "syllogism"
  | "classical-syllogism"
  | "analogism"
  | "a-fortiori"
  | "hypothetical-syllogism"
  | "hypothetical-syllogism-tollens"
  | "disjunctive-syllogism"
  | "disjunctive-syllogism-affirm"
  | "fallacy-not-included"
  | "fallacy-not-similar"
  | "fallacy-not-greater"
  | "fallacy-counterexample"
  // ch. 8 — in what respect a predicate is said of its subject
  | "inseparable-property"
  | "contingent-attribute"
  // ch. 8 — what a proof stands on, how it is turned aside, form, potential / actual
  | "ground-natural"
  | "ground-convention"
  | "ground-axiom"
  | "ground-sense"
  | "ground-common-sense"
  | "ground-tradition"
  | "ground-deduction"
  | "via-opposite"
  | "dilemma"
  | "ground-does-not-reach"
  | "theory"
  // ch. 8 — turning a difficulty back
  | "rebuttal-your-reasoning"
  | "rebuttal-just-the-opposite"
  | "rebuttal-proves-my-point"
  // ch. 8 — objections to form
  | "obvious"
  | "might-have-thought"
  | "redundant-part"
  | "self-contradictory"
  | "misordered"
  // ch. 8 — potential and actual
  | "potential"
  | "actual"
  // ch. 10 — a report that is also an argument
  | "ascribed-proof"
  | "ascribed-difficulty"
  // ch. 11 — the twenty-four distinctions, in the book's numbered order
  | "essence-definition"
  | "subject-parts"
  | "subject-quality"
  | "subject-quantity"
  | "subject-material"
  | "essential-form"
  | "perceptible-form"
  | "subject-action"
  | "subject-action-natural"
  | "subject-action-voluntary"
  | "subject-being-affected"
  | "kind-species"
  | "subject-cause"
  | "subject-cause-generative"
  | "subject-cause-effective"
  | "subject-means"
  | "subject-motive"
  | "subject-purpose"
  | "subject-result"
  | "subject-attribute"
  | "attribute-in-attached"
  | "attribute-concurrent"
  | "attribute-before-after"
  | "subject-place"
  | "subject-orientation"
  | "subject-movement"
  | "subject-time"
  | "subject-relation"
  | "subject-bearer"
  | "subject-similarity"
  | "subject-difference"
  | "subject-opposition"
  // ch. 11 — the three senses of priority, which follow the twenty-four
  | "priority-temporal"
  | "priority-conceptual"
  | "priority-natural";

export type AnatomyInfo = {
  readonly key: AnatomyKey;
  readonly family: Family;
  readonly level: Level;
  readonly chapter: number;
  readonly en: string;
  readonly he?: string;
  /** Ramchal's stock word for the type, where he gives one. */
  readonly word?: string;
  /** Two or three everyday words: the chip's label. */
  readonly short: string;
  /** The everyday reading, as a phrase. */
  readonly reads: string;
  /** What it means, written for a reader who is not a logician. */
  readonly definition: string;
  /**
   * How many separable intentions ch. 6 assigns the type. This is the payoff
   * of labelling a statement's form: a difficulty can land on one part and
   * leave the others standing.
   */
  readonly parts?: number;
  /** Where the type is defined. */
  readonly page: string;
};

type Entry = Omit<AnatomyInfo, "key">;

const speakers = (e: Omit<Entry, "family" | "level" | "chapter">): Entry => ({
  family: "speakers",
  level: "row",
  chapter: 1,
  ...e,
});
const form = (chapter: number, e: Omit<Entry, "family" | "level" | "chapter">): Entry => ({
  family: "anatomy",
  level: "row",
  chapter,
  ...e,
});
const relation = (e: Omit<Entry, "family" | "level" | "chapter">): Entry => ({
  family: "relations",
  level: "edge",
  chapter: 4,
  ...e,
});
const deduction = (e: Omit<Entry, "family" | "level" | "chapter">): Entry => ({
  family: "deductions",
  level: "edge",
  chapter: 7,
  ...e,
});
const ground = (e: Omit<Entry, "family" | "level" | "chapter">): Entry => ({
  family: "grounds",
  level: "edge",
  chapter: 8,
  ...e,
});
/** Chapter 8 types that describe one sentence's predicate, not a move on a target. */
const groundOnRow = (e: Omit<Entry, "family" | "level" | "chapter">): Entry => ({
  family: "grounds",
  level: "row",
  chapter: 8,
  ...e,
});
/**
 * Chapter 10's two composites are edge-level because both halves of what they
 * name act on something: an ascribed proof supports a claim, an ascribed
 * difficulty attacks one. A report that does neither is just `statement/reported`.
 */
const report = (e: Omit<Entry, "family" | "level" | "chapter">): Entry => ({
  family: "reports",
  level: "edge",
  chapter: 10,
  ...e,
});
/**
 * Chapter 11 is row-level throughout, priority included. The distinction names
 * the aspect of the subject a sentence examines, which is a fact about that
 * sentence; it says nothing about the sentence it answers. "The king precedes
 * the people" is about kings, not about the sentence before it.
 */
const subject = (e: Omit<Entry, "family" | "level" | "chapter">): Entry => ({
  family: "subjects",
  level: "row",
  chapter: 11,
  ...e,
});

const ENTRIES: Record<AnatomyKey, Entry> = {
  // --- ch. 1: who is speaking (Eng p10, Heb p9) ------------------------------
  "party-group": speakers({
    en: "several rabbis in dispute",
    short: "rabbis in dispute",
    reads: "many rabbis debate one topic",
    definition:
      "Chapter 1's first kind of sugya: named disputants holding opposed positions on one question, each answering the other's proofs.",
    page: "Eng p10 · Heb p9",
  }),
  "party-individual": speakers({
    en: "one person, both sides",
    short: "asks and answers himself",
    reads: "the same one who asks has given the answer",
    definition:
      "One sage raises the difficulty and resolves it himself. The dialectic is real, but there is a single voice in it.",
    page: "Eng p10 · Heb p9",
  }),
  "party-talmud": speakers({
    en: "the Talmud itself",
    short: "the Talmud itself",
    reads: "the anonymous voice asks and answers",
    definition:
      "No named speaker: the Talmud's own editorial voice questions, answers and rules. In a sugya of named disputants it is the third party, and it is the one that says תא שמע.",
    page: "Eng p10 · Heb p9",
  }),

  // --- ch. 3: the subject, how much of the class (Eng p22–26, Heb p21–23) -----
  categorical: form(3, {
    en: "categorical statement",
    he: "כולל",
    word: "כל",
    short: "all of them",
    reads: "about the whole class",
    definition:
      "The subject is the whole class, so what is said holds of every member. A single member that goes the other way is enough to trouble it.",
    page: "Eng p22 · Heb p21",
  }),
  partial: form(3, {
    en: "partial statement",
    he: "קצתי",
    word: "קצת",
    short: "some of them",
    reads: "about some of the class",
    definition:
      "The subject is a part of the class, unspecified. It says nothing about the rest — and, by ch. 5, it implies that some are otherwise.",
    page: "Eng p22–24 · Heb p23",
  }),
  particular: form(3, {
    en: "particular statement",
    he: "פרטי",
    short: "this one",
    reads: "about one named thing",
    definition:
      "The subject is a single individual — this man, this case. Nothing follows from it about the class it belongs to.",
    page: "Eng p24 · Heb p23",
  }),
  unqualified: form(3, {
    en: "unqualified statement",
    he: "סתמי",
    short: "all, unsaid",
    reads: "about all of them, though “all” is not said",
    definition:
      "No quantity is stated, and Ramchal's rule is that an unqualified statement has the force of a categorical one. It is the commonest form in the Mishnah, and a difficulty from a single case lands on it as on a categorical.",
    page: "Eng p24–26 · Heb p23",
  }),

  // --- ch. 3: the predicate, how it attaches (Eng p26–42, Heb p25–41) --------
  simple: form(3, {
    en: "simple statement",
    he: "סתם",
    short: "plainly said",
    reads: "says one thing about one thing, plainly",
    definition:
      "Subject, predicate, nothing more. The predicate attaches without condition, exception or comparison, so there is one thing to be true or false.",
    parts: 1,
    page: "Eng p26 · Heb p25 · parts Eng p78",
  }),
  "qualified-certain": form(3, {
    en: "qualified: certain",
    he: "ודאי",
    word: "ודאי",
    short: "said as certain",
    reads: "how firmly it is said: as certain",
    definition:
      "The predicate is affirmed as certain. The qualification is part of the claim — a statement said as certain is false if the matter is merely possible.",
    parts: 1,
    page: "Eng p26–28 · Heb p25",
  }),
  "qualified-possible": form(3, {
    en: "qualified: possible",
    he: "אפשר",
    word: "אפשר",
    short: "said as possible",
    reads: "how firmly it is said: as possible",
    definition:
      "The predicate is affirmed only as possible. It claims less, and is harder to refute: a case that goes the other way does not touch it.",
    parts: 1,
    page: "Eng p26–28 · Heb p25",
  }),
  "qualified-doubtful": form(3, {
    en: "qualified: doubtful",
    he: "ספק",
    word: "ספק",
    short: "said as doubtful",
    reads: "how firmly it is said: in doubt",
    definition:
      "The predicate is held in doubt — the speaker does not know which way it goes. Ramchal's range runs from certainty to possibility and from doubt to impossibility.",
    parts: 1,
    page: "Eng p26–28 · Heb p25",
  }),
  "qualified-impossible": form(3, {
    en: "qualified: impossible",
    he: "אי אפשר",
    word: "אי אפשר",
    short: "said as impossible",
    reads: "how firmly it is said: cannot be",
    definition:
      "The predicate is denied as impossible, the strongest denial. It is how the statement itself speaks, not a verdict of the sugya on it.",
    parts: 1,
    page: "Eng p26–28 · Heb p25",
  }),
  exclusion: form(3, {
    en: "exclusive statement",
    he: "ממעט",
    word: "לבדו",
    short: "this alone",
    reads: "this and nothing else",
    definition:
      "The predicate is confined to the subject: this, alone, and no other. The extra claim — that the others are excluded — is what a later difficulty can bring a counter-case against.",
    parts: 1,
    page: "Eng p26–28 · Heb p27 · parts Eng p78",
  }),
  exception: form(3, {
    en: "exception statement",
    he: "מוציא",
    word: "חוץ מ",
    short: "all, except this",
    reads: "all of it, except this piece",
    definition:
      "A rule with a piece carved out: all of these, except this one. Two intentions, the rule and the exception, and a difficulty can land on either without touching the other.",
    parts: 2,
    page: "Eng p28 · Heb p29 · parts Eng p80",
  }),
  conditional: form(3, {
    en: "conditional statement",
    he: "מגבל",
    word: "ובלבד ש",
    short: "provided that",
    reads: "holds, provided the condition is met",
    definition:
      "The predication holds on a condition: this, provided that. Two intentions — the main claim and the condition — so a difficulty against the condition leaves the main claim standing.",
    parts: 2,
    page: "Eng p28–30 · Heb p29 · parts Eng p82",
  }),
  hypothetical: form(3, {
    en: "hypothetical statement",
    he: "תלוי",
    word: "אם",
    short: "if… then",
    reads: "if this, then that — only the link is claimed",
    definition:
      "Neither clause is asserted; only that the second depends on the first. One intention, the dependence. Ramchal separates it from the consequent, which claims both clauses happened.",
    parts: 1,
    page: "Eng p30 · Heb p31 · parts Eng p82",
  }),
  compound: form(3, {
    en: "compound statement",
    he: "מרבה הענינים",
    word: "ו… ו",
    short: "several together",
    reads: "several things said together",
    definition:
      "More than one predicate, or more than one subject, joined in one statement. One intention as a whole, but each part can be true or false on its own. Ramchal divides the conjoined kind into two branches — the parts on an equal footing, or one known and one novel — and the two badges below name them.",
    parts: 1,
    page: "Eng p34–36 · Heb p37 · parts Eng p86",
  }),
  "compound-equal": form(3, {
    en: "compound: on equal footing",
    he: "בהשואה אחת",
    short: "several, level",
    reads: "several things said together, none the surprise",
    definition:
      "The first branch of the conjoined compound: the predicates are said of their subjects on one footing, none the known case and none the novelty — terumah is not separated by measure, by weight or by count (Terumos 1:7), three level prohibitions. Two equal circles under the bracket; nothing in the drawing orders them.",
    parts: 1,
    page: "Eng p34 · Heb p33",
  }),
  "compound-known-novel": form(3, {
    en: "compound: known and novel",
    he: "בדרך חדוש · שכבר נודע",
    short: "one known, one new",
    reads: "one part already known, the other the point",
    definition:
      "The second branch: one predicate is said as a thing already known and the other as the news — a firstborn is sold alive, and blemished, even slaughtered (Ma'aser Sheni 1:2): alive was known, slaughtered is the point. Which is said first is a further split, `compound-not-only` and `compound-needless`; this badge is the branch itself, for when the order is not at issue. A circle and a star under the bracket.",
    parts: 1,
    page: "Eng p34 · Heb p33",
  }),
  "compound-not-only": form(3, {
    en: "compound: not only, but even",
    he: "לא זו אף זו",
    word: "לא זו אף זו",
    short: "not only, but even",
    reads: "not only this, but even that",
    definition:
      "A compound whose parts are unequal and the obvious one comes first: not only this, but even that. The order is itself part of what is said.",
    parts: 1,
    page: "Eng p34 · Heb p35",
  }),
  "compound-needless": form(3, {
    en: "compound: needless to say",
    he: "זו ואין צריך לומר זו",
    word: "זו ואין צריך לומר זו",
    short: "and needless to say",
    reads: "the surprising case first, then the obvious one",
    definition:
      "A compound whose parts are unequal and the surprising one comes first: this, and needless to say that. The reverse order of “not only”; the Talmud asks which a tanna meant.",
    parts: 1,
    page: "Eng p34 · Heb p35",
  }),
  disjunction: form(3, {
    en: "disjunction",
    word: "או… או",
    short: "one or the other",
    reads: "either this or that",
    definition:
      "Either this or that. Whether ruling out one branch proves the other depends on whether the two terms have a middle — see no-middle and has-middle.",
    parts: 1,
    page: "Eng p36 · Heb p37 · parts Eng p86",
  }),
  preclusive: form(3, {
    en: "preclusive statement",
    word: "לא… אלא",
    short: "not this, but that",
    reads: "not this, but rather that",
    definition:
      "Denies one predicate and puts another in its place: not this, but rather that. Ramchal gives it no Hebrew name.",
    parts: 1,
    page: "Eng p36–38 · Heb p37 · parts Eng p88",
  }),
  discrepancy: form(3, {
    en: "discrepancy statement",
    he: "מכחיש",
    word: "אף על פי ש",
    short: "even though",
    reads: "holds, even though it looks like it should not",
    definition:
      "Affirms the predicate against an expectation: this, even though that. The concession is part of the statement, and it tells you which objection the speaker has already seen.",
    parts: 1,
    page: "Eng p38 · Heb p37 · parts Eng p88",
  }),
  comparative: form(3, {
    en: "comparative statement",
    he: "מדמה",
    word: "כשם ש… כך",
    short: "just as… so too",
    reads: "just as this (known), so too that (unknown)",
    definition:
      "Carries a predicate from a known subject to an unknown one by likeness. The known side is always the basis of the comparison; used to derive, it becomes the analogism of ch. 7.",
    parts: 1,
    page: "Eng p38–40 · Heb p39 · parts Eng p88",
  }),
  consequent: form(3, {
    en: "consequent statement",
    he: "נמשך",
    word: "לפיכך",
    short: "so, therefore",
    reads: "this happened, so that happened",
    definition:
      "Both clauses are asserted and the second is said to follow from the first. Three intentions — antecedent, consequent, and the link — so it can be denied three ways.",
    parts: 3,
    page: "Eng p40 · Heb p39 · parts Eng p88",
  }),

  // --- ch. 4: how two statements relate (Eng p48–64, Heb p47–63) -------------
  equivalent: relation({
    en: "equivalent",
    he: "דומים",
    short: "the same thing",
    reads: "the same thing, said twice",
    definition:
      "Two statements with the same subject and the same predicate, in whatever words. In the Talmud this is an identification, not a redundancy (Kesubos 36b).",
    page: "Eng p48 · Heb p47",
  }),
  variant: relation({
    en: "variant: predicates change",
    he: "מתחלפים",
    short: "same subject, two claims",
    reads: "one subject, two different predicates",
    definition:
      "Two statements about the same subject that say different things of it — two measures, two times, two proportions (Kesubos 57a). They neither confirm nor oppose each other: neither denies the predicate the other affirms, and what one says carries to the other only in the shared subject.",
    page: "Eng p50 · Heb p51",
  }),
  "variant-subjects": relation({
    en: "variant: subjects change",
    he: "מתחלפים",
    short: "same claim, two subjects",
    reads: "one predicate, two different subjects",
    definition:
      "Two statements that say the same thing of different subjects. The other half of Ramchal's מתחלפים: they share the predicate and nothing else, so neither confirms nor opposes the other, and what one says carries only in the shared predicate. The icon merges the shared part: one tall arrow, two boxes.",
    page: "Eng p50 · Heb p51",
  }),
  "diametrically-opposed": relation({
    en: "diametrically opposed",
    he: "הפכיים ממש",
    short: "yes against no",
    reads: "yes against no, same scope",
    definition:
      "Same subject, same time, place and respect; one affirms what the other denies. Both cannot stand — the sugya must decide between them, or show they are not really opposed.",
    page: "Eng p56 · Heb p55",
  }),
  contradictory: relation({
    en: "contradictory",
    he: "מתנגדים",
    short: "general vs particular",
    reads: "a general claim against a particular one",
    definition:
      "A categorical statement against a particular one that goes the other way. One counter-instance is enough to trouble a claim about all; this is what every תא שמע tries to be.",
    page: "Eng p56–58 · Heb p55",
  }),
  converse: relation({
    en: "complete converse",
    he: "חלוף כולל",
    short: "swapped",
    reads: "subject and predicate trade places",
    definition:
      "The same statement with subject and predicate exchanged, and it still holds in full. Which statements convert fully is the table at Eng p72–74.",
    page: "Eng p60–62 · Heb p61, p71",
  }),
  "converse-limited": relation({
    en: "limited converse",
    he: "חלוף קצתי",
    short: "swapped, for some",
    reads: "swapped, but it only comes back for some",
    definition:
      "Subject and predicate exchanged, and the result holds only of some: all A are B gives some B are A. The quantity drops in the conversion.",
    page: "Eng p60–62 · Heb p61, p71",
  }),
  contrapositive: relation({
    en: "contrapositive",
    he: "חלוף הפכי כולל",
    short: "swapped and negated",
    reads: "swapped, and both sides flipped to no",
    definition:
      "Exchange subject and predicate and negate both: all A are B gives all not-B are not-A. Chagigah 15b is Ramchal's example of an inference that is this (Eng p72).",
    page: "Eng p60–62 · Heb p61, p71",
  }),
  obverse: relation({
    en: "obverse",
    he: "מתהפכים",
    short: "both flipped",
    reads: "both flipped to their opposites, same picture",
    definition:
      "Subject and predicate each replaced by its opposite, the statement unchanged in force. Yebamos 66a on eating and conferring terumah runs through this and the two converses (Eng p62–64).",
    page: "Eng p62–64 · Heb p63",
  }),
  incongruent: relation({
    en: "incongruent",
    he: "נבדלים",
    short: "nothing in common",
    reads: "nothing in common",
    definition:
      "Two statements sharing neither subject nor predicate. They cannot conflict and cannot support each other; a difficulty built from one against the other has misread one of them.",
    page: "Eng p62–64 · Heb p63",
  }),
  "differs-in-time": relation({
    en: "not the same time",
    short: "not the same time",
    reads: "not opposed: they speak of different times",
    definition:
      "Ramchal's first test for an apparent opposition: two statements clash only if they are about the same time. Show that one speaks of before and the other of after, and the clash dissolves.",
    page: "Eng p54 · Heb p53",
  }),
  "differs-in-place": relation({
    en: "not the same place",
    short: "not the same place",
    reads: "not opposed: they speak of different places",
    definition:
      "The second test: the same place. Shabbos 57a — permitted in a courtyard, forbidden in the public domain — is his example; the two rulings never meet.",
    page: "Eng p54 · Heb p53",
  }),
  "differs-in-context": relation({
    en: "not the same respect",
    he: "בחינה",
    short: "not the same respect",
    reads: "not opposed: the same thing, considered differently",
    definition:
      "The third test: the same respect (בחינה). One object considered two ways — sewn in or not, deliberate or not — is two subjects, and a settlement that narrows a statement to its own case is applying this test.",
    page: "Eng p54–56 · Heb p53",
  }),
  homonym: relation({
    en: "homonym",
    he: "שתוף",
    short: "one word, two senses",
    reads: "not opposed: one word, two meanings",
    definition:
      "The fourth test: the same word in its plain sense. If “blow” means one thing in Eruvin 102b and another in Rosh Hashanah 29b, the two rulings are about different things and do not oppose.",
    page: "Eng p56 · Heb p53",
  }),
  "synonymous-terms": {
    ...relation({
      en: "synonymous terms",
      he: "שמות נרדפים · מאמרים נרדפים",
      short: "two words, one thing",
      reads: "different words for the same thing — so the two statements do meet",
      definition:
        "The homonym's converse, from chapter 10: the two statements name one subject or matter in different words, or in a different order of words, so that a real opposition or a real agreement is hidden by the wording — קדשי מזבח against הקרבנות, or the genus משקי בי מדבחיא beside its species הדם והיין והשמן והמים (Pesachim 17a), which say the same thing. Where `homonym` dissolves an apparent clash, this uncovers a relation the words concealed. Two differently marked labels joined to one meaning.",
      page: "Eng p212 · Heb p211",
    }),
    chapter: 10,
  },
  "no-middle": form(4, {
    en: "no middle",
    short: "no middle",
    reads: "one or the other, nothing between",
    definition:
      "Two terms that exhaust the field — clean or unclean. Ruling out one proves the other, which is what a disjunctive syllogism needs.",
    page: "Eng p60 · Heb p59",
  }),
  "has-middle": form(4, {
    en: "a middle exists",
    short: "a middle exists",
    reads: "optional, praiseworthy, obligatory: there is a middle",
    definition:
      "Terms with a third between them. Ruling out one does not prove the other; an elimination that treats them as two has missed the middle.",
    page: "Eng p60 · Heb p59",
  }),

  // --- ch. 5: what a statement implies (Eng p66–74, Heb p67–73) --------------
  "inference-necessary": form(5, {
    en: "necessary inference",
    he: "מוכרח",
    short: "forced inference",
    reads: "cannot accept the one and reject the other",
    definition:
      "What a statement implies by its form, so that accepting it and rejecting the inference is a contradiction. The table at Eng p72–74 lists which conversions are forced for which statements.",
    page: "Eng p70–72 · Heb p71",
  }),
  "inference-loose": form(5, {
    en: "inference not logically necessary",
    he: "בלתי מוכרח",
    short: "loose inference",
    reads: "suggested by the wording, but separable",
    definition:
      "A reading the wording invites but does not compel. Berachos 53a is Ramchal's example of one rejected: the statement stands and the inference from it does not (Eng p70–72).",
    page: "Eng p68–70 · Heb p69",
  }),
  "absolute-opposite": form(5, {
    en: "absolute opposite",
    he: "הפך",
    short: "some do, so some don't",
    reads: "some do, so some do not",
    definition:
      "The inference a partial statement carries: if some are, then some are not — otherwise it would have said all. Ramchal treats it as forced.",
    page: "Eng p72 · Heb p73",
  }),

  // --- ch. 6: not meant literally (Eng p76, Heb p75) -------------------------
  figurative: form(6, {
    en: "figurative",
    he: "השאלה",
    short: "not literal",
    reads: "not literal: judge the allusion",
    definition:
      "A statement whose truth turns on what it alludes to, not on its words — “a lion has come up from Babylon”. Literal is the default and gets no badge; this one says the plain reading is the wrong one. Ramchal names two non-literal ways of speaking, the figure (השאלה) and the overstatement (הפלגה); the overstatement has its own badge below, and this one covers the figure and any non-literal statement that is not an exaggeration.",
    page: "Eng p76 · Heb p75",
  }),
  hyperbole: form(6, {
    en: "hyperbole",
    he: "הפלגה",
    short: "overstated",
    reads: "not literal: an exaggeration, judge what it means",
    definition:
      "The second of chapter 6's non-literal ways of speaking: the words overstate, and the statement is true or false by what the exaggeration is meant to convey, not by its plain sense. Ramchal sets it beside the figure of speech under one rule and gives it no example of its own. A ripple swelling into a wave inside the figurative bubble.",
    page: "Eng p76 · Heb p75",
  }),

  // --- ch. 7: deriving a conclusion (Eng p92–110, Heb p93–109) ---------------
  syllogism: deduction({
    en: "syllogism",
    he: "הקש",
    word: "הקדמה · תולדה",
    short: "premises to conclusion",
    reads: "premises added up give a conclusion",
    definition:
      "The general form: from premises already granted, a conclusion that was not. Every kind below is one; this badge is for a derivation that fits no more specific kind.",
    page: "Eng p92 · Heb p93",
  }),
  "classical-syllogism": deduction({
    en: "classical syllogism",
    he: "הקש מופתי",
    short: "kind to member",
    reads: "true of the whole kind, so true of this member",
    definition:
      "Inheritance down the subject or the predicate: what holds of the class holds of the member. Ramchal's term, not the three-term Aristotelian figure; the tree icon follows him.",
    page: "Eng p92–94 · Heb p93",
  }),
  analogism: deduction({
    en: "analogism",
    he: "בנין אב",
    word: "מה מצינו",
    short: "by analogy",
    reads: "found in this one, so in that similar one",
    definition:
      "Carry a rule from one case to another like it: מה מצינו. The comparative statement of ch. 3, used to derive. It fails when the cases are not alike, or when a third like case lacks the rule.",
    page: "Eng p94–96 · Heb p95",
  }),
  "a-fortiori": deduction({
    en: "a fortiori",
    he: "קל וחומר",
    word: "כל שכן",
    short: "all the more",
    reads: "if the light case, then surely the heavy one",
    definition:
      "If it holds in the lesser case it holds in the greater — קל וחומר, כל שכן. It fails when which case is the heavier is not settled.",
    page: "Eng p96–98 · Heb p97",
  }),
  "hypothetical-syllogism": deduction({
    en: "hypothetical syllogism",
    he: "הקש תלוי",
    short: "if… and it is so",
    reads: "this is now established, so that follows",
    definition:
      "From if this then that, and this is so: therefore that. The hypothetical statement of ch. 3 with its antecedent supplied.",
    page: "Eng p104–106 · Heb p105",
  }),
  "hypothetical-syllogism-tollens": deduction({
    en: "hypothetical syllogism, on the denial",
    he: "הקש תלוי",
    short: "if… but it is not",
    reads: "that did not follow, so this was never so",
    definition:
      "From if this then that, and that is not so: therefore this was never so. Pesachim 19a, R. Yosi and R. Akiva, is Ramchal's example (Eng p106) — the commonest shape of a Talmudic refutation from consequences.",
    page: "Eng p104–106 · Heb p105",
  }),
  "disjunctive-syllogism": deduction({
    en: "disjunctive syllogism",
    he: "הקש מחלק",
    short: "not that, so this",
    reads: "not that one, so it must be this one",
    definition:
      "From either this or that, and not that: therefore this. Sound only where the two terms have no middle. Pesachim 5b and Bava Kamma 104a (Eng p108–110).",
    page: "Eng p108–110 · Heb p109",
  }),
  "disjunctive-syllogism-affirm": deduction({
    en: "disjunctive syllogism, affirming",
    he: "הקש מחלק",
    short: "this, so not that",
    reads: "it is this one, so it is not the other",
    definition:
      "The disjunctive syllogism run the other way: from either this or that, and it is this: therefore not that. Ramchal states both directions in one rule (Eng p106) — establishing one alternative excludes all the others, excluding all but one establishes the remainder — though both of his worked examples eliminate. Sound only where the alternatives exhaust the field and exclude each other. The fork with a return arrow from the established branch to the rejected one.",
    page: "Eng p106–110 · Heb p105–109",
  }),
  "fallacy-not-included": deduction({
    en: "fallacy: not in the kind",
    short: "not in the kind",
    reads: "the member is not in the kind after all",
    definition:
      "A classical syllogism fails because the inclusion it rests on does not hold: the case is not a member of the kind, or the predicate is not part of the wider one. Rabbi Yosi holds kindling is not a principal labour, so no death penalty follows for it (Shabbos 70a); handling from the side is not handling, so the muktzeh rule does not reach it (Shabbos 43b). The tree with a branch cut off and its member dropped.",
    page: "Eng p94–96 · Heb p93–95",
  }),
  "fallacy-not-similar": deduction({
    en: "fallacy: not really alike",
    word: "מה ל… שכן",
    short: "not really alike",
    reads: "the two cases are not alike after all",
    definition:
      "An analogism or a fortiori fails because the source case has a feature the target lacks — מה לנשיא שכן… (Kerisos 26a). The objection names the feature.",
    page: "Eng p100 · Heb p99",
  }),
  "fallacy-not-greater": deduction({
    en: "fallacy: not really heavier",
    short: "not really heavier",
    reads: "which case is the heavier one is not settled",
    definition:
      "An a fortiori fails because the case taken as greater is not clearly greater — the two are equal, or each is heavier in some respect (Horayos 10a).",
    page: "Eng p102 · Heb p99–101",
  }),
  "fallacy-counterexample": deduction({
    en: "fallacy: another case lacks it",
    short: "another case lacks it",
    reads: "another case just as similar lacks the rule",
    definition:
      "An analogism fails because a third case, as like the source as the target is, lacks the predicate — the Cohen Gadol in Toras Cohanim (Eng p104). One counter-case breaks the likeness.",
    page: "Eng p102–104 · Heb p101",
  }),

  // --- ch. 8: in what respect the predicate is said (Eng p146–150, Heb p145–149)
  // Ramchal's four בחינות — the subject's essence, what always goes with it,
  // what merely happens to it, and how it stands to another — decide whether
  // two statements may be chained: a premise in one respect yields no
  // conclusion in another. They are about one sentence's predicate, so they
  // sit with the statement's anatomy, not with the grounds. Two of the four
  // have a drawing; the essence and the relation wait for theirs.
  "inseparable-property": form(8, {
    en: "inseparable property",
    he: "מה שבסגלתו",
    short: "always goes with it",
    reads: "said of what always accompanies the subject, though it is not its essence",
    definition:
      "The second respect in which a predicate is said of its subject: the property is always with it and never leaves, yet the subject would still be what it is without it — the weasel laps (Parah 9:3), man laughs. A ruling that rests on such a property holds as long as the property does. A short chain binds the property to its subject.",
    page: "Eng p148 · Heb p147",
  }),
  "contingent-attribute": form(8, {
    en: "contingent attribute",
    he: "מה שבמקריו",
    short: "happens to be so",
    reads: "said of what could be otherwise, the subject unchanged",
    definition:
      "The third respect: the feature is there by accident — it could be absent, or different, even the opposite, and the subject would be what it is all the same; round or square, long or short, this man is white. Not unimportance, and not doubt about whether it holds now. Two identical subjects, one with the property and one without.",
    page: "Eng p150 · Heb p149",
  }),

  // --- ch. 8: what a proof stands on, and how it is turned aside (Eng p112–158, Heb p111–157)
  // Sections 1–3 are the landscape: a floor seen in depth, a house built on its
  // horizon. The glyph cut into the floor says which source; the house's state
  // says the statement's fate. `icons_v3/METHODOLOGY.md` §6. Sections 4 and 5
  // leave that picture: form objections are a speech bubble, potential and
  // actual are a disc. The two parent grounds come first: Ramchal divides
  // proof into nature, agreement and deduction before he divides the first
  // two again, and a passage may let you name the parent and not the child.
  "ground-natural": ground({
    en: "ground: from nature",
    he: "ראיה מצד הטבע",
    short: "evident by nature",
    reads: "rests on what everyone finds evident by nature",
    definition:
      "Chapter 8's first parent ground: the proof rests on what is established for everyone by nature, or on something built on that. It divides into what the mind sees for itself (`ground-axiom`) and what the senses attest (`ground-sense`); write the parent when the passage does not let you say which, or names nature itself. Both children on one floor: the sun and the face.",
    page: "Eng p112 · Heb p111",
  }),
  "ground-convention": ground({
    en: "ground: from agreement",
    he: "ראיה מצד ההסכמה",
    short: "held in common",
    reads: "rests on what a community agrees to hold",
    definition:
      "The second parent ground: the proof rests on what the judgment of a community holds, and binds whoever belongs to it. It divides into common opinion (`ground-common-sense`) and received tradition (`ground-tradition`); write the parent when the child cannot be told. The three heads and the reaching hands share the floor.",
    page: "Eng p112–114 · Heb p111–113",
  }),
  "ground-axiom": ground({
    en: "ground: first axiom",
    he: "מושכלות ראשונים",
    short: "self-evident",
    reads: "the mind dictates it, no training needed",
    definition:
      "The proof rests on what the mind sees for itself — two is more than one, the half is less than the whole. Nothing is brought to establish it and nothing could. The floor carries a sun: ברור כשמש, clear as day.",
    page: "Eng p112 · Heb p111",
  }),
  "ground-sense": ground({
    en: "ground: the senses",
    he: "מוחשות",
    short: "the senses attest",
    reads: "the senses testify to it",
    definition:
      "The proof rests on perception — stones are hard, water is wet, “we have seen them pass” (Berachos 58b). A disproof from sense is answered only by reinterpreting what was seen: it was only its glow that passed.",
    page: "Eng p112 · Heb p111",
  }),
  "ground-common-sense": ground({
    en: "ground: common opinion",
    he: "מפורסמות",
    short: "everyone holds it",
    reads: "what most people hold by nature",
    definition:
      "The proof rests on what people at large take for granted — pride is base, humility is praiseworthy. Binding on those who share it, which in a sugya is everyone present. Three heads and shoulders on the floor.",
    page: "Eng p112–114 · Heb p113",
  }),
  "ground-tradition": ground({
    en: "ground: tradition",
    he: "מקובלות",
    word: "שנאמר · דתנן · דאמר מר",
    short: "handed down",
    reads: "a verse, a halacha, an undisputed authority",
    definition:
      "The proof rests on what was received from fathers and teachers: Scripture, a halachah from Sinai, the thirteen rules, the word of anyone we may not dispute. The commonest ground in the Talmud, and the one every תא שמע brings. Two hands reaching for each other.",
    page: "Eng p114 · Heb p113",
  }),
  "ground-deduction": ground({
    en: "ground: deduction",
    he: "היקש",
    short: "by deduction",
    reads: "it follows from a true premise by a deduction",
    definition:
      "The proof rests on reasoning from something already established, by one of chapter 7's forms; the teal badge beside this one says which. It is only as good as its premise and its form, so what attacks it is chapter 7's fallacies. An arrow on the floor pointing at the house.",
    page: "Eng p116 · Heb p115",
  }),
  "via-opposite": ground({
    en: "through the opposite",
    he: "ראיה על היות הפכו כוזב",
    short: "the opposite fails",
    reads: "the opposite is false, so this is true — or proved, so this is false",
    definition:
      "An indirect route: show the contrary false and the claim stands; show the contrary true and the claim falls. Sound only where the two terms have no middle — if a third state is possible, refuting one proves nothing about the other. Two houses on the horizon, one of them struck.",
    page: "Eng p116–118, p126 · Heb p115–117, p125",
  }),
  dilemma: ground({
    en: "dilemma",
    he: "ממה נפשך",
    word: "ממה נפשך",
    short: "either way, it fails",
    reads: "whichever way you take the statement, it fails",
    definition:
      "A disproof by cases: every reading of the statement is enumerated and each is refuted — היכי דמי? אי … אי … (Bava Kamma 29a). The disjunctive syllogism with every branch cut: one road forks, both ways end in a stop bar, and the house is struck.",
    page: "Eng p132 · Heb p131",
  }),
  "ground-does-not-reach": ground({
    en: "the ground does not reach",
    short: "real, but does not reach",
    reads: "the verse or perception is real but does not touch this statement",
    definition:
      "Turns a proof or disproof aside without denying its source: the verse says what it says and the thing was seen, but neither bears on this claim. אחיו הוא במצוות — the slave is a brother in commandments, so the verse about brothers does not exempt him (Bava Kamma 88a); זיוה הוא דעבר — only its glow passed (Berachos 58b). The claim returns to doubt, not to rejection. The floor stops short; a dotted line traces where it should reach.",
    page: "Eng p132–136 · Heb p131–135",
  }),
  theory: ground({
    en: "theory",
    he: "סברא",
    word: "מסתברא",
    short: "inclines, does not prove",
    reads: "inclines the mind when the proofs are balanced; it does not prove",
    definition:
      "Reasonableness as a weight: when the arguments balance, the mind leans to the more sensible side. It settles nothing on its own — a proof “on the strength of a theory” is admissible but weak (Eng p176), and a far-fetched opposition fails against it (Eng p180). The house leans; it has not fallen.",
    page: "Eng p142–144 · Heb p141–143",
  }),
  "rebuttal-your-reasoning": ground({
    en: "according to your reasoning",
    he: "ולטעמיך",
    word: "ולטעמיך · ולדידך",
    short: "hits your view too",
    reads: "the same difficulty hits your view too; the distinction that answers it saves both",
    definition:
      "The difficulty raised against us lands on the dissenting view as well. The distinction that answers it is then shared: both houses stand, each with a bolt on the roof (Bava Kamma 88a).",
    page: "Eng p136–138 · Heb p135",
  }),
  "rebuttal-just-the-opposite": ground({
    en: "just the opposite",
    he: "אדרבא",
    word: "אדרבא",
    short: "thrown back at them",
    reads: "the difficulty is turned and thrown at the dissenting view",
    definition:
      "The difficulty leaves our side entirely and is thrown at the other view. The bolt arcs from our roof onto theirs, and their house is struck (Bava Kamma 83b).",
    page: "Eng p138–140 · Heb p137",
  }),
  "rebuttal-proves-my-point": ground({
    en: "that itself is the proof",
    he: "משם ראיה",
    word: "משם ראיה · היא הנותנת",
    short: "your text proves mine",
    reads: "the text of your disproof proves my view",
    definition:
      "The source brought to knock us down is the source that establishes us. Their house is an outline; an arrow on the floor runs from their side to ours (Shabbos 82a, the shard).",
    page: "Eng p138–142 · Heb p137",
  }),
  obvious: ground({
    en: "it is obvious",
    he: "פשיטא",
    word: "פשיטא",
    short: "everyone already knew",
    reads: "the whole statement adds nothing; everyone knew it",
    definition:
      "An objection to the report as a whole: the sentence teaches what nobody doubted. The speech bubble and its lines are drawn as a ghost.",
    page: "Eng p156–158 · Heb p157",
  }),
  "might-have-thought": ground({
    en: "one might have thought",
    he: "סלקא דעתין",
    word: "סלקא דעתין · מהו דתימא",
    short: "excludes a thought",
    reads: "the statement is there to exclude a thought one might have had",
    definition:
      "The answer to פשיטא: the sentence exists to keep out a view one might have held. The bubble stands; beside it a thought-cloud is struck.",
    page: "Eng p156–158 · Heb p157",
  }),
  "redundant-part": ground({
    en: "why do I need this too",
    he: "הא תו למה לי",
    word: "הא תו למה לי",
    short: "a part repeats",
    reads: "a part of the statement repeats another",
    definition:
      "An objection to the report in its parts: one clause says again what another already said. Two identical lines in the bubble, the second struck.",
    page: "Eng p156–158 · Heb p157",
  }),
  "self-contradictory": ground({
    en: "the statement itself is difficult",
    he: "הא גופא קשיא",
    word: "הא גופא קשיא",
    short: "the words disagree",
    reads: "the statement's own words disagree with each other",
    definition:
      "An objection to the report in its parts: the sentence's own halves cannot stand together. Two lines in the bubble run at each other.",
    page: "Eng p156–158 · Heb p157",
  }),
  misordered: ground({
    en: "wrong order",
    he: "תנא היכא קאי",
    word: "תנא היכא קאי · ליערבינהו וליתנינהו · פתח בכד וסיים בחבית",
    short: "out of order",
    reads: "split what belongs together, or the parts are out of sequence",
    definition:
      "One icon for three stock objections to order: the teaching starts from the wrong place (Berachos 2a), two clauses that belong together were split (Gittin), or it opened with one vessel and closed with another (Bava Kamma 27a). The chip names which.",
    page: "Eng p156–158 · Heb p157",
  }),
  potential: groundOnRow({
    en: "in potential",
    he: "בכח",
    word: "בכח",
    short: "able, not doing",
    reads: "said of what is able or eligible",
    definition:
      "The predicate is said of what can, or is fit to, not of what is now doing it — the Cohen who is eligible to sprinkle, not the one who sprinkles (Zevachim 99a). A dashed ring around a solid core.",
    page: "Eng p154 · Heb p153",
  }),
  actual: groundOnRow({
    en: "in actuality",
    he: "בפועל",
    word: "בפועל",
    short: "actually does",
    reads: "said of what actually does",
    definition:
      "The predicate is said of what is now doing it, not of what is merely able or eligible. A solid disc.",
    page: "Eng p154 · Heb p153",
  }),

  // --- ch. 10: a report that is also an argument (Eng p214–218, Heb p213–217)
  // One sentence doing two jobs. The drawing is a quoted document carrying the
  // ch. 9 glyph of the second job, so the composite reads as what it is.
  "ascribed-proof": report({
    en: "ascribed proof",
    he: "הוכחה והגדה",
    short: "a report, as proof",
    reads: "reports what was said, and the report is the evidence",
    definition:
      "The sentence reports someone else's words or deed, and the report is what establishes the claim. The two jobs are judged apart: a report can be accurate and still not reach the claim, and a broken inference from it does not make the report false. It need not be someone else's proof that is being quoted.",
    page: "Eng p214 · Heb p213",
  }),
  "ascribed-difficulty": report({
    en: "ascribed difficulty",
    he: "קשיא מגדת",
    short: "a difficulty, ascribed",
    reads: "raises the problem as another thinker would raise it",
    definition:
      "The speaker states the difficulty that follows from someone else's position, without necessarily holding it. Whether the attribution is right and whether the difficulty bites are separate questions. Ramchal does not confine the combination to a פרכא, so the badge carries the general difficulty.",
    page: "Eng p214–218 · Heb p213–217",
  }),

  // --- ch. 11: which aspect of the subject (Eng p222–236, Heb p221–235) ------
  // Ramchal's twenty-four numbered הבחנות in his order, then the three senses
  // of priority that follow them. Form (6), Action (7), Cause (10) and
  // Attribute (15) each have branches with badges of their own, listed after
  // their parent.
  "essence-definition": subject({
    en: "essence and definition",
    he: "מהות · גדר",
    short: "what it is",
    reads: "what makes this the thing it is",
    definition:
      "The first distinction: the subject's own identity, which marks it off from everything else, and the definition (גדר) that states it. An עוללת is the cluster that has neither כתף nor נטף (Pe'ah 7:4). A colour or a passing condition does not define. Ramchal says the essential form, distinction 6, is this same essence; `essential-form` is its badge when a sentence speaks of the form as form.",
    page: "Eng p222 · Heb p221",
  }),
  "subject-parts": subject({
    en: "parts",
    he: "חלקים",
    short: "its parts",
    reads: "what it divides into",
    definition:
      "The components the subject divides into as a whole — the two layers of the esophagus; Upper Galilee, Lower Galilee and the valley. Not the stuff it is made of, and not the species under it. The icon draws three pieces; the number is illustrative.",
    page: "Eng p222 · Heb p221",
  }),
  "subject-quality": subject({
    en: "quality",
    he: "איכות",
    short: "what it is like",
    reads: "its condition: hot, hard, strong",
    definition:
      "The subject's constitution and condition — hot or cold, wet or dry, its colour, its strength or weakness. Not excellence and not a rating; putting a number on a quality brings in quantity as well.",
    page: "Eng p224 · Heb p223",
  }),
  "subject-quantity": subject({
    en: "quantity",
    he: "כמות",
    short: "how much, how many",
    reads: "measured, or counted",
    definition:
      "Measure where measure applies and number where counting applies — sixteen cubits in each direction, forty-five vines. Distinct from chapter 3's scope: that is how much of the class the statement speaks about, this is a quantity inside what it says.",
    page: "Eng p224–226 · Heb p223",
  }),
  "subject-material": subject({
    en: "material",
    he: "חמר",
    short: "what it is made of",
    reads: "the stuff it is made from",
    definition:
      "What the subject is made from — metal vessels of metal, earthenware of clay. Not its components, not its visible shape, and not whoever made it. The block is a mnemonic; material need not be solid.",
    page: "Eng p226 · Heb p225",
  }),
  "essential-form": subject({
    en: "essential form",
    he: "צורה עצמית",
    short: "its form, in essence",
    reads: "the form the mind grasps: what makes it this kind of thing",
    definition:
      "Distinction 6, Form, in its essential branch: the form by which the subject is what it is — man's form is to be the living being that speaks — grasped by the mind, not seen. Ramchal identifies it with the essence, so it stands beside `essence-definition`; this badge is for a sentence that speaks of the form as form, as against the outline the eye sees, `perceptible-form`. An outer square, four brackets and a filled inner square.",
    page: "Eng p226 · Heb p225",
  }),
  "perceptible-form": subject({
    en: "perceptible form",
    he: "צורה מרגשת",
    short: "its visible shape",
    reads: "the shape the eye sees",
    definition:
      "Distinction 6, Form, in its perceptible branch: the outline of the subject as the eyes see it — like an open box, like a gamma. The other branch, the essential form (עצמית), is the essence grasped by the mind and has its own badge. A visible-outline picture must not stand for both without a word beside it.",
    page: "Eng p226 · Heb p225",
  }),
  "subject-action": subject({
    en: "action",
    he: "פעלה",
    short: "what it does to another",
    reads: "it acts on something else",
    definition:
      "The subject considered as acting on something else, whether by its nature (טבעית) or by choice (רצונית). This is the parent badge, for when the sentence turns on the acting and not on which kind; the two branches below name the kind. Acting on another: not moving, and not entailing.",
    page: "Eng p226 · Heb p225",
  }),
  "subject-action-natural": subject({
    en: "action: by nature",
    he: "פעלה טבעית",
    short: "acts by nature",
    reads: "it acts on another because that is its nature",
    definition:
      "Action's first branch: things acting on one another by nature, without any choosing — food that scours the intestines (דמנקרא להו למעיא), the ox whose way is to gore. Waves fill the acting block: activity by nature, and no claim that it is liquid or heat.",
    page: "Eng p226 · Heb p225",
  }),
  "subject-action-voluntary": subject({
    en: "action: by choice",
    he: "פעלה רצונית",
    short: "acts by choice",
    reads: "it acts on another because it chose to",
    definition:
      "Action's second branch: what living beings do by will — one who recites the Shema, one who writes on Shabbos. A hand on a control in the acting block: a choice, not necessarily a bodily one.",
    page: "Eng p226 · Heb p225",
  }),
  "subject-being-affected": subject({
    en: "being affected",
    he: "הפעל",
    short: "what is done to it",
    reads: "it takes an effect from another",
    definition:
      "The impression the subject takes from others acting on it — heat spreading through metal, חם מקצתו חם כלו. The translation's “Affection” means being acted upon, not fondness, and an effect need not be harmful. The same picture as action, with the arrow reversed.",
    page: "Eng p226–228 · Heb p225–227",
  }),
  "kind-species": subject({
    en: "kind and species",
    he: "סוג ומין",
    short: "what class it falls under",
    reads: "the broader class and the narrower one",
    definition:
      "Which kind the subject belongs to and which species within it — body, living being, human. The levels are relative: a middle class is a species to the one above it and a kind to the ones below. Classification, not constituent parts and not a deduction.",
    page: "Eng p228–230 · Heb p227–229",
  }),
  "subject-cause": subject({
    en: "cause",
    he: "סבה",
    short: "what brings it about",
    reads: "what the thing arises from",
    definition:
      "What the effect arises from by its power. Ramchal splits it: a generative cause (מולדת), whose effect continues from it — tree and fruit, father and child — and an effective one (פועלת), which produces something separate, the craftsman and the vessel. This is the parent badge, for when the sentence turns on causing and not on which kind; the two below name the kind.",
    page: "Eng p230 · Heb p229",
  }),
  "subject-cause-generative": subject({
    en: "cause: generative",
    he: "סבה מולדת",
    short: "it grows from it",
    reads: "the effect comes out of its cause and continues from it",
    definition:
      "Cause's first branch: the effect is born of the cause and goes on from it as its continuation — the tree and the fruit that comes from it, the father and the son. A gear with a stem to a smaller gear of the same family: origin, not attachment.",
    page: "Eng p230 · Heb p229",
  }),
  "subject-cause-effective": subject({
    en: "cause: effective",
    he: "סבה פועלת",
    short: "it makes it",
    reads: "the cause produces something that stands apart from it",
    definition:
      "Cause's second branch: the cause brings about an effect that is a separate thing — the craftsman and the vessel; the animal going because it is led (דאזלא מחמתה); wine and scents that sharpen the mind. The gear points at a separate cube, cause and effect kept distinct.",
    page: "Eng p230 · Heb p229",
  }),
  "subject-means": subject({
    en: "means",
    he: "אמצעי",
    short: "what it works through",
    reads: "the instrument the cause works through",
    definition:
      "That by which the cause does what it does — vinegar as an instrument of cleaning. Not only a hand tool: a substance or an intermediary is a means. Cause and means are roles in one explanation, not permanent labels on a thing.",
    page: "Eng p230 · Heb p229",
  }),
  "subject-motive": subject({
    en: "motive",
    he: "מעורר",
    short: "what prompts the agent",
    reads: "what stirs someone to act",
    definition:
      "What rouses an agent who acts by choice — the news of the splitting of the sea, which brought Yitro. The prompt need not be a sound, and it is not the end the agent is after: that is purpose.",
    page: "Eng p230 · Heb p229",
  }),
  "subject-purpose": subject({
    en: "purpose",
    he: "תכלית",
    short: "what it is for",
    reads: "the end the agent is after",
    definition:
      "What the agent means to obtain by acting — studying in order to put the learning into practice. An intended end, which need not be reached; what actually follows is the result.",
    page: "Eng p230 · Heb p229",
  }),
  "subject-result": subject({
    en: "result",
    he: "מסבב",
    short: "what comes of it",
    reads: "the effect the subject produces",
    definition:
      "What arises from the subject acting as its cause — walking from being led, a child from a father, a vessel from a craftsman. An object, an event, a change or offspring, and not necessarily what was intended. Being affected looks at the recipient's impression; this at the effect produced.",
    page: "Eng p232 · Heb p231",
  }),
  "subject-attribute": subject({
    en: "attribute",
    he: "מתחבר",
    short: "what goes with it",
    reads: "something that comes with the subject, over and above it",
    definition:
      "The fifteenth distinction, and the parent of the three below: anything that accompanies the subject in addition to its essence — wisdom in the wise, honour in the honoured, a coating on a vessel, the condition of danger in an animal. An added property, not the thing's own identity.",
    page: "Eng p232 · Heb p231",
  }),
  "attribute-in-attached": subject({
    en: "attribute: in, on, attached",
    he: "בעצמו · עליו · אליו",
    short: "in it, on it, attached",
    reads: "the attribute is in it, on it, or fastened to it",
    definition:
      "Attribute's first branch: what is associated with the subject itself, or rests on it, or is fastened to it — wisdom in the wise, clothing on a person, a cloth soaked in water. The icon's three diamonds are the three places, alternatives rather than a requirement that all three hold at once.",
    page: "Eng p232 · Heb p231",
  }),
  "attribute-concurrent": subject({
    en: "attribute: present alongside",
    he: "נמצא עמו בזמן אחד",
    short: "present alongside",
    reads: "there at the same time as the subject",
    definition:
      "Attribute's second branch: something present with the subject at one time — bread baked with a roast; whatever is primary, with something secondary accompanying it. Accompaniment only: no attachment and no causation is claimed.",
    page: "Eng p232 · Heb p231",
  }),
  "attribute-before-after": subject({
    en: "attribute: before and after",
    he: "הקודם והמאחר",
    short: "before it, after it",
    reads: "what comes before the subject, or after it",
    definition:
      "Attribute's third branch: what precedes the subject or follows it — one washes the hands and afterwards pours the cup. Ramchal's example here is temporal, but the three priority badges distinguish time from rank and from dependence, so this one does not settle which is meant.",
    page: "Eng p232 · Heb p231",
  }),
  "subject-place": subject({
    en: "place",
    he: "מקום",
    short: "where it is",
    reads: "where the subject is",
    definition:
      "The sixteenth distinction: where, relative position included — two balconies one above the other, two towns side by side, ten houses one inside another. One pin. Two statements speaking of different places is `differs-in-place`, which has two.",
    page: "Eng p234 · Heb p233",
  }),
  "subject-orientation": subject({
    en: "orientation",
    he: "מצב",
    short: "how it is placed",
    reads: "the way it stands in its place",
    definition:
      "The seventeenth distinction: the manner of the subject's positioning — reading the Megillah standing or sitting; reclining in the evening and standing in the morning. The supplied translation calls it Situation. Not where it is, and not going anywhere.",
    page: "Eng p234 · Heb p233",
  }),
  "subject-movement": subject({
    en: "movement",
    he: "תנועה",
    short: "it moves",
    reads: "it passes from one place to another",
    definition:
      "The eighteenth distinction: the subject going from place to place — one who goes from where they do not work to where they do. The two squares are one subject at two places, not one thing acting on another.",
    page: "Eng p234 · Heb p233",
  }),
  "subject-time": subject({
    en: "time",
    he: "זמן",
    short: "when",
    reads: "when the subject is at issue",
    definition:
      "The nineteenth distinction: when — a time of day, a starting time. מאימתי קורין את שמע. One clock. Two statements speaking of different times is `differs-in-time`; one thing earlier than another is `priority-temporal`.",
    page: "Eng p234 · Heb p233",
  }),
  "subject-relation": subject({
    en: "relation",
    he: "יחס",
    short: "how it stands to another",
    reads: "what it is to something else",
    definition:
      "The twentieth distinction: the relationship one thing bears to another — the generation of Moses, the seed of Abraham. General, and not restricted to attachment, descent, likeness or cause.",
    page: "Eng p234 · Heb p233",
  }),
  "subject-bearer": subject({
    en: "subject: what bears it",
    he: "נושא",
    short: "what bears it",
    reads: "which subject carries this attribute",
    definition:
      "The twenty-first distinction: the matter before us is an attribute, and the question is what carries it — “what thing has a different impurity depending on whether it came from a corpse or a creeping creature? Metal” (Pesachim 14b). Not the subject's essence, and not chapter 9's statement move.",
    page: "Eng p234 · Heb p233",
  }),
  "subject-similarity": subject({
    en: "similarity",
    he: "דמיון",
    short: "it is like that",
    reads: "alike in the respect at issue",
    definition:
      "The twenty-second distinction: likeness in some relevant respect — דמיא לסאסאה (Chullin 18b); a sword has the status of the slain (Shabbos 141). Not complete identity, and not yet an inference: carrying a rule across by likeness is the analogism of ch. 7.",
    page: "Eng p234–236 · Heb p233–235",
  }),
  "subject-difference": subject({
    en: "difference",
    he: "הבדל",
    short: "it is not like that",
    reads: "the likeness is absent",
    definition:
      "The twenty-third distinction, which Ramchal defines as the absence of likeness — שאני דם דאתקש למים (Pesachim 23a). Nothing here denies anything. Denial is opposition, which he calls the opposite of likeness rather than its absence.",
    page: "Eng p236 · Heb p235",
  }),
  "subject-opposition": subject({
    en: "opposition",
    he: "נגוד",
    short: "it runs against that",
    reads: "set against it, in whatever way",
    definition:
      "The twenty-fourth distinction: opposition in general, which Ramchal explains by pointing back to chapter 4 — Rabban Gamliel against the Sages on a second get after a first (Yebamos 50a). It picks no particular ch. 4 shape, and it is not ch. 9's דחיה, which is a move.",
    page: "Eng p236 · Heb p235",
  }),
  "priority-temporal": subject({
    en: "priority: in time",
    he: "זמני",
    short: "earlier in time",
    reads: "one comes before the other in time",
    definition:
      "The first of Ramchal's three senses of priority, and the only one that requires time: earlier, simply. Distinct from the time badge, which says when, and from `differs-in-time`, which separates two statements.",
    page: "Eng p236 · Heb p235",
  }),
  "priority-conceptual": subject({
    en: "priority: in rank",
    he: "שכלי",
    short: "higher in rank",
    reads: "first in rank, not in time",
    definition:
      "The second sense: precedence the mind assigns — the king before the people, the higher beings before the lower. Rank or importance, not intelligence, and not a claim that the higher-ranking thing came first. The supplied translation calls it conceptual priority.",
    page: "Eng p236 · Heb p235",
  }),
  "priority-natural": subject({
    en: "priority: by dependence",
    he: "טבעי",
    short: "the other hangs on it",
    reads: "prior because the other depends on it",
    definition:
      "The third sense: where one thing's existence hangs on another's, the one that is the cause is prior even though both are there at once. The supplied translation calls it logical priority.",
    page: "Eng p236 · Heb p235",
  }),
};

export const ANATOMY: Record<AnatomyKey, AnatomyInfo> = Object.fromEntries(
  (Object.keys(ENTRIES) as AnatomyKey[]).map((key) => [key, { key, ...ENTRIES[key] }]),
) as Record<AnatomyKey, AnatomyInfo>;

export const ANATOMY_KEYS: readonly AnatomyKey[] = Object.keys(ANATOMY) as AnatomyKey[];

export const describeAnatomy = (key: AnatomyKey): AnatomyInfo => ANATOMY[key];

export const hueOf = (key: AnatomyKey): Hue => FAMILIES[ANATOMY[key].family].hue;

/**
 * One label from these chapters on one sentence. `basis` follows `labelBasis`
 * for the ch. 9 move: `attested` is Ramchal's own labelling of this passage,
 * `marked` rests on the type's stock word being in the text, `inferred` is
 * ours alone. Absent, it is inferred.
 */
export type Annotation = {
  readonly kind: AnatomyKey;
  readonly basis?: LabelBasis;
  readonly note?: string;
};

export const basisOf = (annotation: Annotation): LabelBasis => annotation.basis ?? "inferred";

/** Chapter 1's three kinds of sugya, declared on the sugya as a whole. */
export type Party = "party-group" | "party-individual" | "party-talmud";

export const PARTIES: readonly Party[] = ["party-group", "party-individual", "party-talmud"];

export const BASES: readonly LabelBasis[] = ["attested", "marked", "inferred"];

/** A badge to draw: an annotation with its vocabulary entry resolved. */
export type Badge = {
  readonly info: AnatomyInfo;
  readonly basis: LabelBasis;
  readonly note?: string;
};

export const badgeOf = (annotation: Annotation): Badge => ({
  info: ANATOMY[annotation.kind],
  basis: basisOf(annotation),
  note: annotation.note,
});

/** The annotations of one level on a unit, resolved, in declaration order. */
export const badgesOf = (
  annotations: readonly Annotation[] | undefined,
  level: Level,
): readonly Badge[] =>
  (annotations ?? []).map(badgeOf).filter((badge) => badge.info.level === level);

/**
 * Chapter 1 for one row: a sentence with no named speaker is the Talmud's own
 * voice, and the badge says so where the name would otherwise be. The basis is
 * `marked` — the mark is the text's own silence about who is talking, which is
 * as checkable as any stock phrase.
 */
export const speakerBadge = (unit: { readonly speaker?: string }): Badge | undefined =>
  unit.speaker === undefined ? { info: ANATOMY["party-talmud"], basis: "marked" } : undefined;

/**
 * Chapter 8's four sources of certainty are already in the file, as a unit's
 * `provenance` — the same four words, chosen for what they do to the unit's
 * starting status. Each has a ground badge; `derivation` and `asserted` do
 * not. `derivation` says only that the sentence must earn its acceptance, not
 * that it is a deduction, so `ground-deduction` is the author's to place.
 */
export const GROUND_OF_PROVENANCE: Readonly<Partial<Record<Provenance, AnatomyKey>>> = {
  sense: "ground-sense",
  axiom: "ground-axiom",
  endoxa: "ground-common-sense",
  tradition: "ground-tradition",
};

/**
 * The moves chapter 8 is about: proof (ראיה), disproof (הכחשה, which ch. 9
 * calls סתירה or דחיה), and the objection that turns one aside. A resolution
 * or an answer is about fit, not truth, and a statement or question opens.
 */
export const GROUND_ELEMENTS: ReadonlySet<Element> = new Set<Element>(["proof", "contradiction", "difficulty"]);

/**
 * Chapter 8 for one move: what it stands on, read off the file's `provenance`
 * where that names a source of certainty and the move is a proof, a disproof
 * or a difficulty acting on something. The badge is `inferred`: the file
 * records the source as an editorial judgment, not as a stock word found in
 * the text. An explicit ch. 8 label on the unit is the author speaking, and
 * stands alone — nothing is derived beside it.
 */
export const groundBadge = (unit: {
  readonly move: { readonly element: Element };
  readonly target?: string;
  readonly provenance?: Provenance;
  readonly anatomy?: readonly Annotation[];
}): Badge | undefined => {
  if (unit.target === undefined || !GROUND_ELEMENTS.has(unit.move.element)) return undefined;
  if ((unit.anatomy ?? []).some((a) => ANATOMY[a.kind].family === "grounds")) return undefined;
  const kind = unit.provenance === undefined ? undefined : GROUND_OF_PROVENANCE[unit.provenance];
  if (kind === undefined) return undefined;
  return {
    info: ANATOMY[kind],
    basis: "inferred",
    note: "Read from the sentence's provenance in the file, which names its source; no label of its own says so.",
  };
};

/**
 * Why an annotation cannot sit where it was put. An edge-level type describes
 * how a sentence stands to the one it acts on, so it needs a target; a
 * row-level type is about the sentence alone and may go anywhere.
 */
export const annotationErrors = (unit: {
  readonly id: string;
  readonly target?: string;
  readonly anatomy?: readonly Annotation[];
}): readonly string[] =>
  (unit.anatomy ?? []).flatMap((a) =>
    ANATOMY[a.kind].level === "edge" && unit.target === undefined
      ? [`unit "${unit.id}" carries the edge-level label "${a.kind}" but acts on nothing`]
      : [],
  );
