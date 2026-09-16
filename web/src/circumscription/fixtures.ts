/**
 * The two fixtures §5.2 names, both hand-curated from passages Ramchal works out
 * himself (§4, Path A).
 *
 * - Construction: Shabbos 106a / Betzah 24a, Ch5 p68. A narrowed subject yields a
 *   default denial over the siblings it passed over.
 * - Defeat: Berachos 53a, Ch5 pp70-72. The same move, retracted, because the
 *   narrowing turns out to be an echo of the preceding clause.
 *
 * Hebrew terms are taken from the facing odd pages, not from memory. Neither
 * passage indexes on aspect or modality, so the fiber is `unindexed` rather than
 * guessed (§4).
 */

import type { Cite } from "../source/cite.ts";
import {
  factKey,
  type Move,
  type Passage,
  type Source,
  type Statement,
  type SubjectNode,
} from "./closure.ts";

/** A case, with the phrasing the derived sentences and the diagrams need. */
export type CaseTerm = SubjectNode & {
  /** Tile heading. One line. */
  readonly short: string;
  /** One or two words, for chips inside a group. */
  readonly chip: string;
  /** A noun phrase that can sit inside a sentence: "trapping a deer into a house". */
  readonly phrase: string;
  readonly label: string;
  readonly hebrew: string;
};

/** The immediate parent class. This, and nothing wider, is the scope of a דיוק. */
export type ClassTerm = {
  readonly id: string;
  readonly short: string;
  readonly label: string;
  /** The wider thing the speaker could have said instead, and did not. */
  readonly whole: string;
  readonly hebrew?: string;
};

export type QuestionTerm = {
  readonly id: string;
  readonly ask: string;
  /** Group headings. */
  readonly affirmative: string;
  readonly negative: string;
  /** Relative clauses, for the derived necessary inferences: "that is forbidden". */
  readonly holdsClause: string;
  readonly failsClause: string;
  readonly hebrew: string;
};

export type Fixture = {
  readonly id: string;
  /** Tab label. */
  readonly tab: string;
  readonly title: string;
  readonly blurb: string;
  readonly source: Source;
  readonly classes: readonly ClassTerm[];
  readonly cases: readonly CaseTerm[];
  readonly questions: readonly QuestionTerm[];
  /** The source drawing the inference itself, so the reader sees it is not ours. */
  readonly inference: Passage;
  /** Label for the state of play before any later move has landed. */
  readonly opening: string;
  readonly payoff: string;
  /** Anything the source does not supply, stated rather than papered over. */
  readonly caveat: string;
};

// --- Shabbos 106a / Betzah 24a ---------------------------------------------

const trappingCite: Cite = {
  tractate: "Shabbos",
  folio: "106a",
  chapter: 5,
  pages: [68, 68],
};

const trappingPassage: Passage = {
  speaker: "Rabbi Yehudah",
  english:
    "One who traps a bird in a tower, or a deer in a house, has transgressed.",
  hebrew: "רבי יהודה אומר: הצד צפור למגדל וצבי לבית חיב",
  cite: trappingCite,
};

const trappingCases: readonly CaseTerm[] = [
  {
    id: "house",
    parent: "trapping",
    short: "A deer, into a house",
    chip: "deer into a house",
    phrase: "trapping a deer into a house",
    label:
      "A deer driven indoors. The room is small enough that one lunge catches it, so the animal is caught the moment the door shuts.",
    hebrew: "הצד צבי לבית",
  },
  {
    id: "tower",
    parent: "trapping",
    short: "A bird, into a tower",
    chip: "bird into a tower",
    phrase: "trapping a bird into a tower",
    label: "A bird driven into a dovecote it has no way out of.",
    hebrew: "הצד צפור למגדל",
  },
  {
    id: "preserve",
    parent: "trapping",
    short: "A deer, into a game preserve",
    chip: "deer into a preserve",
    phrase: "trapping a deer into a game preserve",
    label:
      "A deer driven into a walled hunting park. It cannot get out, but the park is big enough that you would still have to chase it down.",
    hebrew: "הצד צבי לביברין",
  },
];

const trappingQuestion: QuestionTerm = {
  id: "liable",
  ask: "Has he broken Shabbos?",
  affirmative: "Forbidden",
  negative: "Permitted",
  holdsClause: "that is forbidden",
  failsClause: "that is permitted",
  hebrew: "חיב",
};

const trappingStatement = (
  id: string,
  subject: string,
  narrows: string,
): Statement => ({
  id,
  subject,
  predicate: "liable",
  polarity: "affirm",
  // No quantifier in the source. `סתמי` reads as universal (Ch3 p24, trap 13).
  quantity: "universal",
  narrows,
  passage: trappingPassage,
});

export const deer: Fixture = {
  id: "deer",
  tab: "The deer — how it works",
  title: "He said “in a house”. So we hear: and nowhere else.",
  blurb:
    "Rabbi Yehudah says that trapping a deer in a house breaks Shabbos. The Talmud reads a second rule out of that sentence — one about game preserves, which the sentence never mentions. This page separates the two.",
  source: {
    fiber: { index: { kind: "unindexed" }, modality: undefined },
    cases: trappingCases,
    questions: [trappingQuestion.id],
    statements: [
      trappingStatement("deer-house", "house", "a deer in a house"),
      trappingStatement("bird-tower", "tower", "a bird in a tower"),
    ],
    moves: [],
  },
  classes: [
    {
      id: "trapping",
      short: "Trapping",
      label:
        "Catching an animal by shutting it into a space it cannot leave. One of the kinds of work forbidden on Shabbos.",
      whole: "trapping, of any kind",
      hebrew: "הצד",
    },
  ],
  cases: trappingCases,
  questions: [trappingQuestion],
  inference: {
    speaker: "The Talmud",
    english:
      "It is when he has trapped a deer in a house that he has transgressed, but not if he trapped the deer in a game preserve.",
    hebrew: "לבית הוא דמחיב, אבל לביברין – לא",
    cite: { tractate: "Betzah", folio: "24a", chapter: 5, pages: [68, 68] },
  },
  opening: "As the wording reads",
  payoff:
    "Not one word of Rabbi Yehudah’s sentence is about a game preserve. The whole of the second rule comes from a guess about why he bothered to say “in a house” — a good guess, and the Talmud makes it. But it is a different kind of thing from the sentence, and a different kind of thing can be taken back.",
  caveat:
    "Ramchal gives no reason to withdraw this one, so nothing on this page withdraws it. Undefeated is not the same as necessary: the test is whether a reason could be found, and for the next case one is.",
};

// --- Berachos 53a -----------------------------------------------------------

const blessingCases: readonly CaseTerm[] = [
  {
    id: "mostlyJewish",
    parent: "crowd",
    short: "Mostly Jewish",
    chip: "mostly Jewish",
    phrase: "a crowd that is mostly Jewish",
    label: "Most of the people whose fire you can see are Jewish.",
    hebrew: "רב ישראל",
  },
  {
    id: "halfAndHalf",
    parent: "crowd",
    short: "Half and half",
    chip: "half and half",
    phrase: "a crowd that is half Jewish and half not",
    label: "The crowd splits evenly. Neither side is the majority.",
    hebrew: "מחצה על מחצה",
  },
  {
    id: "mostlyGentile",
    parent: "crowd",
    short: "Mostly not Jewish",
    chip: "mostly not Jewish",
    phrase: "a crowd that is mostly not Jewish",
    label: "Most of the people whose fire you can see are not Jewish.",
    hebrew: "רב כותים",
  },
];

const blessingQuestion: QuestionTerm = {
  id: "bless",
  ask: "Do you say the blessing over their lights?",
  affirmative: "Blessing is said",
  negative: "Blessing is not said",
  holdsClause: "where the blessing is said",
  failsClause: "where the blessing is not said",
  hebrew: "מברך",
};

const seifa: Passage = {
  speaker: "The Mishnah",
  english:
    "If most of the people are Jewish, the blessing “who creates the lights of the fire” may be recited upon seeing their lights.",
  hebrew: "אם רב ישראל – מברך",
  cite: { tractate: "Berachos", folio: "53a", chapter: 5, pages: [70, 70] },
};

const reisha: Passage = {
  speaker: "The Mishnah, previous clause",
  english: "… the Tanna refers to a majority of non-Jews in the previous law …",
  hebrew: "…דתנא רישא רב כותים…",
  cite: { tractate: "Berachos", folio: "53a", chapter: 5, pages: [70, 72] },
  note:
    "Ramchal points at the previous clause rather than quoting it. Its content — no blessing over a mostly-non-Jewish crowd’s fire — is what makes the clause after it read as a narrowing.",
};

const ruling: Passage = {
  speaker: "The Talmud",
  english: "In fact, the law is to recite the blessing even in this case.",
  hebrew: "בדין הוא דאפלו מחצה על מחצה נמי מברך",
  cite: { tractate: "Berachos", folio: "53a", chapter: 5, pages: [70, 70] },
};

const halfAndHalfNotBlessed = factKey({
  subject: "halfAndHalf",
  predicate: "bless",
  polarity: "deny",
});

const mirroring: Move = {
  id: "mirroring",
  label: "The Talmud explains the wording",
  headline: "He said “most” to match the clause before it, not to rule anything out.",
  passage: {
    speaker: "The Talmud",
    english:
      "Since the Tanna refers to a majority of non-Jews in the previous law, he continues in this case to speak in the same way about a majority of Jews.",
    hebrew: "ואידי דתנא רישא רב כותים – תנא סיפא רב ישראל",
    cite: { tractate: "Berachos", folio: "53a", chapter: 5, pages: [70, 72] },
  },
  defeats: [halfAndHalfNotBlessed],
  states: [],
};

const theRuling: Move = {
  id: "ruling",
  label: "The law as it stands",
  headline: "The even split is blessed over — the opposite of what was read in.",
  passage: ruling,
  defeats: [],
  states: [
    {
      id: "half-blesses",
      subject: "halfAndHalf",
      predicate: "bless",
      polarity: "affirm",
      quantity: "universal",
      narrows: "even in this case",
      passage: ruling,
    },
  ],
};

export const blessing: Fixture = {
  id: "blessing",
  tab: "The blessing — how it breaks",
  title: "The same move, and then the Talmud takes it back.",
  blurb:
    "“If most of the people are Jewish, say the blessing.” Read the same way, that excludes an even split. Then the Talmud gives a reason why he phrased it that way — and the excluded case comes back, on the other side.",
  source: {
    fiber: { index: { kind: "unindexed" }, modality: undefined },
    cases: blessingCases,
    questions: [blessingQuestion.id],
    statements: [
      {
        id: "reisha",
        subject: "mostlyGentile",
        predicate: "bless",
        polarity: "deny",
        quantity: "universal",
        narrows: "a majority of non-Jews",
        passage: reisha,
      },
      {
        id: "seifa",
        subject: "mostlyJewish",
        predicate: "bless",
        polarity: "affirm",
        quantity: "universal",
        narrows: "most of the people are Jewish",
        passage: seifa,
      },
    ],
    moves: [mirroring, theRuling],
  },
  classes: [
    {
      id: "crowd",
      short: "A crowd whose fire you can see",
      label:
        "On Saturday night you say a blessing over a flame. You may not say it over a flame lit for work that Shabbos forbids, so whose fire it is decides the case.",
      whole: "a crowd of any make-up at all",
    },
  ],
  cases: blessingCases,
  questions: [blessingQuestion],
  inference: {
    speaker: "The Talmud",
    english:
      "Thus, if half of the population is Jewish and half non-Jewish, he should not recite the blessing.",
    hebrew: "הא מחצה על מחצה אינו מברך",
    cite: { tractate: "Berachos", folio: "53a", chapter: 5, pages: [70, 70] },
  },
  opening: "As the wording reads",
  payoff:
    "The read-in rule was not merely unsupported. It was backwards. The words that looked like they were fencing off the even split turned out to be an echo of the clause before them, and once that is said, nothing is left holding the fence up.",
  caveat:
    "The Talmud states the ruling first and the explanation second. They are separated here, in the other order, so that the retraction can be seen on its own before the replacement arrives.",
};

export const fixtures: readonly Fixture[] = [deer, blessing];
