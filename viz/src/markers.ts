/**
 * The Talmud largely labels its own moves. Ramchal repeatedly identifies a leaf
 * type by the stock Aramaic phrase that introduces it, which turns most of the
 * classification in ch. 9 into a lexicon lookup rather than semantic analysis.
 *
 * Every entry below is quoted from the Hebrew column at the cited page. Nothing
 * here is supplied from general Talmudic knowledge; an unmatched sentence stays
 * unclassified rather than being guessed.
 */

import type { Move } from "./taxonomy.ts";

export type Marker = {
  readonly aramaic: string;
  readonly gloss: string;
  readonly move: Move;
  /** Hebrew-column page in the Feldheim edition where Ramchal gives the phrase. */
  readonly page: number;
};

export const MARKERS: readonly Marker[] = [
  {
    aramaic: "הכי קאמר",
    gloss: "this is what he meant",
    move: { element: "statement", subtype: "explanation" },
    page: 163,
  },
  {
    aramaic: "הכא במאי עסקינן",
    gloss: "here, with what case are we dealing?",
    move: { element: "statement", subtype: "presumption" },
    page: 165,
  },
  {
    aramaic: "הא מני? רבי פלוני היא",
    gloss: "whose opinion is this? it is Rabbi so-and-so",
    move: { element: "statement", subtype: "presumption" },
    page: 165,
  },
  {
    aramaic: "זאת אומרת",
    gloss: "this implies",
    move: { element: "statement", subtype: "inference" },
    page: 165,
  },
  {
    aramaic: "כך היה מנהגו של",
    gloss: "such was the custom of",
    move: { element: "statement", subtype: "reported" },
    page: 167,
  },
  {
    aramaic: "מאי שנא … ומאי שנא",
    gloss: "what is the difference between … and …?",
    move: { element: "question", subtype: "query" },
    page: 169,
  },
  {
    aramaic: "בעא מנה … מהו? … או … אזלינן",
    gloss: "he asked him: what is the law? do we follow … or …?",
    move: { element: "question", subtype: "principle" },
    page: 169,
  },
  {
    aramaic: "הן! / לאו!",
    gloss: "yes! / no!",
    move: { element: "answer", subtype: "answer" },
    page: 171,
  },
  {
    aramaic: "פשט … ד",
    gloss: "he determined that",
    move: { element: "answer", subtype: "determination" },
    page: 173,
  },
  {
    aramaic: "תדע, שהרי",
    gloss: "know this, for",
    move: { element: "proof", subtype: "demonstration" },
    page: 173,
  },
  {
    aramaic: "מנא הני מלי? … דתנו רבנן",
    gloss: "from where is this known? … for our rabbis taught",
    move: { element: "proof", subtype: "demonstration" },
    page: 175,
  },
  {
    aramaic: "תניא כותה ד",
    gloss: "it has been taught in accordance with",
    move: { element: "proof", subtype: "validation" },
    page: 175,
  },
  {
    aramaic: "מאי לאו? … לאו!",
    gloss: "is it not …? … it is not!",
    move: { element: "contradiction", subtype: "opposition" },
    page: 177,
  },
  {
    aramaic: "ודלמא? / ואימא?",
    gloss: "but perhaps? / I might say?",
    move: { element: "contradiction", subtype: "opposition" },
    page: 179,
  },
  {
    aramaic: "הא גופא קשיא!",
    gloss: "this itself is self-contradictory!",
    move: { element: "difficulty", subtype: "objection" },
    page: 179,
  },
  {
    aramaic: "מאי קא משמע לן?",
    gloss: "what does this teach us?",
    move: { element: "difficulty", subtype: "objection" },
    page: 179,
  },
  {
    aramaic: "הינו הך",
    gloss: "this is the very same thing",
    move: { element: "difficulty", subtype: "objection" },
    page: 181,
  },
  {
    aramaic: "ולפלג … ברישא!",
    gloss: "let him distinguish in the first clause too!",
    move: { element: "difficulty", subtype: "objection" },
    page: 181,
  },
  {
    aramaic: "ורמינהי",
    gloss: "and they set this against that",
    move: { element: "difficulty", subtype: "apparentContradiction" },
    page: 181,
  },
  {
    aramaic: "… רמי, כתיב … וכתיב",
    gloss: "… raised a contradiction: it is written … and it is written",
    move: { element: "difficulty", subtype: "apparentContradiction" },
    page: 183,
  },
  {
    aramaic: "לא! משום ד",
    gloss: "no! because",
    move: { element: "resolution", subtype: "alternative" },
    page: 185,
  },
];

export const markersFor = (move: Move): readonly Marker[] =>
  MARKERS.filter((m) => m.move.element === move.element && m.move.subtype === move.subtype);

/** Leaf types Ramchal never attaches a stock phrase to; these need a human. */
export const unmarkedLeaves = (all: readonly Move[]): readonly Move[] =>
  all.filter((m) => markersFor(m).length === 0);
