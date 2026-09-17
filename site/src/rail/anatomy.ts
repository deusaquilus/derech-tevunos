/**
 * Derech Tevunos chapters 1–8: who is speaking, what a statement is made of,
 * how two statements stand to each other, what one implies, when it is not
 * meant literally, how a conclusion is derived from what is granted, and what
 * a proof or disproof stands on.
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
 * the contract for what each means and where it attaches.
 */

import type { LabelBasis, Provenance } from "./sugya.ts";
import type { Element } from "./taxonomy.ts";

/**
 * Ramchal's own partition (ch. 2, Eng p18–20): understanding statements
 * (chapters 3–6), deriving new ones (chapter 7), accepting or rejecting them
 * (chapter 8), and, before any of it, knowing who is talking (chapter 1).
 * Chapters 3–6 are split in two here only because a badge about one sentence
 * and a badge about two sit in different places.
 */
export type Family = "speakers" | "anatomy" | "relations" | "deductions" | "grounds";

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
    chapter: "ch. 3 · 5 · 6",
    hue: "violet",
    blurb:
      "What a single sentence is made of: how much of its class it speaks about, how its predicate attaches (except, provided that, if… then, just as… so too), whether an inference drawn from it is forced or loose, and whether it is meant literally.",
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
      "What a proof or disproof stands on — the mind's own axioms, the senses, common opinion, a received tradition, a deduction — and how it is turned aside: shown not to reach the claim, caught whichever way it is taken, or held up by a theory alone.",
  },
};

/** Lens order: who speaks, then Ramchal's three processes in the book's order. */
export const FAMILY_ORDER: readonly Family[] = ["speakers", "anatomy", "relations", "deductions", "grounds"];

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
  | "no-middle"
  | "has-middle"
  // ch. 5 — what a statement implies
  | "inference-necessary"
  | "inference-loose"
  | "absolute-opposite"
  // ch. 6 — not meant literally
  | "figurative"
  // ch. 7 — deriving a conclusion, and why a derivation fails
  | "syllogism"
  | "classical-syllogism"
  | "analogism"
  | "a-fortiori"
  | "hypothetical-syllogism"
  | "hypothetical-syllogism-tollens"
  | "disjunctive-syllogism"
  | "fallacy-not-included"
  | "fallacy-not-similar"
  | "fallacy-not-greater"
  | "fallacy-counterexample"
  // ch. 8 — what a proof or disproof stands on, and how it is turned aside
  | "ground-axiom"
  | "ground-sense"
  | "ground-common-sense"
  | "ground-tradition"
  | "ground-deduction"
  | "via-opposite"
  | "dilemma"
  | "ground-does-not-reach"
  | "theory";

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
      "More than one predicate, or more than one subject, joined in one statement. One intention as a whole, but each part can be true or false on its own.",
    parts: 1,
    page: "Eng p34–36 · Heb p37 · parts Eng p86",
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
      "A statement whose truth turns on what it alludes to, not on its words — “a lion has come up from Babylon”. Literal is the default and gets no badge; this one says the plain reading is the wrong one.",
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

  // --- ch. 8: what a proof stands on, and how it is turned aside (Eng p112–144, Heb p111–143)
  // Every picture is one landscape: a floor seen in depth, a house built on its
  // horizon. The glyph cut into the floor says which source; the house's state
  // says the statement's fate. `icons_v3/METHODOLOGY.md` §6.
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
