/**
 * Hand-curated fixtures, per §4 Path A of the spec: passages Ramchal has already
 * analysed, where he prints the intermediate steps himself.
 *
 * Citations stay in the data so a reader can check the formalization against the
 * source (§7, last bullet). Page numbers are English pages of the Feldheim
 * bilingual edition; Hebrew pages are the facing odd numbers.
 */

import type { Cite } from "../source/cite.ts";
import { cellKey, type CellKey, type CellValue, type Context } from "./fca.ts";

export type { Cite };

/** Which schematic to draw for a subject. */
export type Diagram = "colonnade" | "street" | "direct";

export type SubjectTerm = {
  readonly id: string;
  /** Card title. Kept short enough to sit on one line. */
  readonly short: string;
  /** One word, for the chips inside a bucket. */
  readonly chip: string;
  /** A fuller phrase for the card body. */
  readonly label: string;
  readonly hebrew: string;
  readonly diagram: Diagram;
};

export type PredicateTerm = {
  readonly id: string;
  /** Column header in the grid of what the sources say. */
  readonly question: string;
  /** Reads as a bucket name: "passes a safe spot and is guilty". */
  readonly short: string;
  readonly affirmative: string;
  readonly negative: string;
  readonly hebrew: string;
};

export type Fixture = {
  readonly id: string;
  readonly title: string;
  readonly blurb: string;
  readonly cite: Cite;
  readonly context: Context;
  readonly subjects: readonly SubjectTerm[];
  readonly predicates: readonly PredicateTerm[];
  /** Why a cell holds the value it does, keyed by `CellKey`. */
  readonly cellNotes: ReadonlyMap<CellKey, string>;
  /** What the sugya is doing, in plain language. */
  readonly reading: {
    readonly difficulty: string;
    readonly resolution: string;
    readonly payoff: string;
  };
};

const subjects: readonly SubjectTerm[] = [
  {
    id: "C",
    short: "Through a covered walkway",
    chip: "walkway",
    label: "From a store, out to the street, passing through a colonnade.",
    hebrew: "מוציא מחנות לפלטיא דרך סטיו",
    diagram: "colonnade",
  },
  {
    id: "F",
    short: "Along the street",
    chip: "street",
    label: "Carrying it more than four cubits within a public domain.",
    hebrew: "מעביר חפץ ברשות הרבים",
    diagram: "street",
  },
  {
    id: "D",
    short: "Straight outside",
    chip: "straight out",
    label: "From a private space directly out to the street, with nothing in between.",
    hebrew: "מוציא מרשות לרשות בלי אמצעיות פטור",
    diagram: "direct",
  },
];

const predicates: readonly PredicateTerm[] = [
  {
    id: "E",
    question: "Passes a safe spot?",
    short: "passes a safe spot",
    affirmative: "Passes a safe spot",
    negative: "No safe spot",
    hebrew: "הפסק פטור באמצע",
  },
  {
    id: "L",
    question: "Guilty?",
    short: "is guilty",
    affirmative: "Guilty",
    negative: "Not guilty",
    hebrew: "חיב",
  },
];

const cells: readonly (readonly [string, string, CellValue])[] = [
  ["C", "E", "in"],
  ["C", "L", "doubt"], // the cell the sugya disputes
  ["F", "E", "in"],
  ["F", "L", "in"],
  ["D", "E", "out"],
  ["D", "L", "in"],
];

/**
 * Shabbos 5b, Ch10 pp196-210. Ramchal's own worked example, numbered 1a-4c.
 *
 * The baraisa holds the colonnade case liable; the Talmud objects that no such
 * case is known to be liable, which leaves `C|L` in doubt (p200). The resolution
 * at p208 argues from the four-cubits case that it is liable after all.
 *
 * Neither aspect nor modality is indexed in this passage, so both are left
 * unindexed rather than guessed (§4).
 */
export const shabbos5b: Fixture = {
  id: "shabbos-5b",
  title: "One unknown answer, two possible pictures of the law",
  blurb:
    "Three ways of carrying something on Shabbos, and two questions asked about each. The Talmud does not yet know the answer to one of the six — and the shape of the whole picture depends on it.",
  cite: { tractate: "Shabbos", folio: "5b", chapter: 10, pages: [196, 210] },
  context: {
    fiber: { index: { kind: "unindexed" }, modality: undefined },
    subjects: subjects.map((term) => term.id),
    predicates: predicates.map((term) => term.id),
    cells: new Map(
      cells.map(([subject, predicate, value]) => [cellKey(subject, predicate), value]),
    ),
  },
  subjects,
  predicates,
  cellNotes: new Map([
    [cellKey("C", "E"), "The colonnade is the safe spot: he could set the object down there without penalty."],
    [
      cellKey("C", "L"),
      "The baraisa says guilty. The Talmud objects that no case like this is known to be guilty, and leaves the question open.",
    ],
    [
      cellKey("F", "E"),
      "While he keeps walking he is safe, so the walk itself is the safe spot.",
    ],
    [cellKey("F", "L"), "He becomes guilty only when he sets the object down."],
    [
      cellKey("D", "E"),
      "Nothing in between. This is the plain reading of the prohibition.",
    ],
    [cellKey("D", "L"), "The core case everyone agrees is forbidden."],
  ]),
  reading: {
    difficulty:
      "“Have you ever heard of such a case being liable?” No known case is guilty where a safe spot intervenes, so the walkway case should not be either.",
    resolution:
      "“The principle is the same as carrying four cubits in a public domain.” That case also has a safe spot between lifting and setting down, and it is guilty.",
    payoff:
      "Once the walkway case is guilty, every case that passes a safe spot turns out to be guilty too. “Passes a safe spot” stops being a category of its own, and the walkway case and the street case collapse into the same kind of case. Four buckets become two. The answer did not add a distinction to the law — it removed one.",
  },
};
