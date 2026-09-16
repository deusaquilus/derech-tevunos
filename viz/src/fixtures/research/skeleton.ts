/**
 * The research passages are *skeletons*: id, move, target, incipit — enough
 * to fold and rail — plus the two things the row itself supplies: the stock
 * phrase that licensed the label, when the Hebrew opens with one (`marker`,
 * so the label reads *marked* rather than *inferred*), and the speaker, when
 * the sentence names one (`speaker`; a nameless row is the Talmud's own
 * voice, as everywhere else). Nothing here is attested by Ramchal, and none
 * carries the ch. 1–7 layer. Unit boundaries follow Steinsaltz's
 * segmentation, split where one segment holds two moves and merged where one
 * move runs across segments; where a target was genuinely ambiguous the
 * shorter reach was chosen.
 *
 * Text: William Davidson edition via the Sefaria v3 API. Copied from the
 * nested-rail study (`nested_rail_research/skeletons.ts`), which `viz/src`
 * must not import.
 */

import type { Party } from "../../anatomy.ts";
import type { Sugya, Unit } from "../../sugya.ts";
import type { Move } from "../../taxonomy.ts";

/**
 * Ch. 9 leaves, abbreviated. Effects are the taxonomy's: D, RM, O and ALT
 * unsettle; R, A and DET discharge; C rejects; P and V raise; the S- and
 * Q-keys open.
 */
export const M = {
  S: { element: "statement", subtype: "firsthand" },
  SE: { element: "statement", subtype: "explanation" },
  SI: { element: "statement", subtype: "inference" },
  SR: { element: "statement", subtype: "reported" },
  Q: { element: "question", subtype: "query" },
  QP: { element: "question", subtype: "principle" },
  A: { element: "answer", subtype: "answer" },
  DET: { element: "answer", subtype: "determination" },
  P: { element: "proof", subtype: "demonstration" },
  V: { element: "proof", subtype: "validation" },
  C: { element: "contradiction", subtype: "direct" },
  O: { element: "contradiction", subtype: "opposition" },
  D: { element: "difficulty", subtype: "objection" },
  RM: { element: "difficulty", subtype: "apparentContradiction" },
  R: { element: "resolution", subtype: "settlement" },
  ALT: { element: "resolution", subtype: "alternative" },
} as const satisfies Record<string, Move>;

/**
 * What a row says about itself beyond its move. `marker` is the stock phrase
 * in the row's own Hebrew that licensed its label — `מיתיבי`, `אפילו תימא`,
 * `מאי שנא … הני נמי!` — written as the fixtures write theirs, with `…` where
 * the content goes and `פלוני` for a name. A row whose Hebrew is all content
 * (`הך דהוה במשכן חשיבא`) has none, and its label stays inferred. `speaker` is
 * set only where the sentence names who says it; the anonymous voice, and
 * the voice that quotes a baraita or speaks for an amora (`אמר לך`), stay
 * nameless.
 */
export type RowTags = {
  readonly speaker?: string;
  readonly marker?: string;
};

export type Row = readonly [
  id: string,
  move: keyof typeof M,
  target: string | undefined,
  he: string,
  en: string,
  tags?: RowTags,
];

const SHORT = 48;

/**
 * The caption a band or a handle prints for a sentence. The study used the
 * whole sentence; on a page that is too long for `between … and …`, so the
 * first clause stands for it.
 */
const shorten = (en: string): string => {
  if (en.length <= SHORT) return en;
  const cut = en.lastIndexOf(" ", SHORT - 2);
  return `${en.slice(0, cut > 20 ? cut : SHORT - 2)}…`;
};

export type SkeletonMeta = Omit<Sugya, "units" | "party" | "discussedAt"> & {
  readonly party: Party;
};

export const skeleton = (meta: SkeletonMeta, rows: readonly Row[]): Sugya => ({
  ...meta,
  discussedAt: "Not discussed in Derech Tevunos; labelled from stock phrases for the nested-rail study",
  units: rows.map(
    ([id, move, target, he, en, tags]): Unit => ({
      id,
      move: M[move],
      ...(target === undefined ? {} : { target }),
      ...(tags?.speaker === undefined ? {} : { speaker: tags.speaker }),
      ...(tags?.marker === undefined ? {} : { marker: tags.marker }),
      he,
      en,
      short: shorten(en),
      attested: false,
    }),
  ),
});
