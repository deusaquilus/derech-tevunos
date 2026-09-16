/** Colour palette, shared by the SVG exporter and the React view. */

import type { Hue } from "./anatomy.ts";
import type { Element } from "./taxonomy.ts";

export type Palette = {
  readonly fg: string;
  readonly muted: string;
  readonly border: string;
  readonly surface: string;
  readonly accepted: string;
  readonly doubt: string;
  readonly rejected: string;
  readonly element: Record<Element, string>;
  /**
   * The chapter 1–8 layer, one hue per family. None of these is a verdict
   * colour, and none is an element colour except slate, which the speaker
   * badges share with `statement` on purpose: they too are about who speaks.
   * The values are the icon set's own (`icons_v3/ICONS_REFERENCE.md` §2).
   */
  readonly hue: Record<Hue, string>;
};

export const LIGHT: Palette = {
  fg: "#1c1917",
  muted: "#78716c",
  border: "#d6d3d1",
  surface: "#ffffff",
  accepted: "#15803d",
  doubt: "#a16207",
  rejected: "#b91c1c",
  element: {
    statement: "#475569",
    question: "#2563eb",
    answer: "#16a34a",
    proof: "#16a34a",
    contradiction: "#dc2626",
    difficulty: "#ea580c",
    resolution: "#ca8a04",
  },
  hue: {
    violet: "#7c3aed",
    teal: "#0d9488",
    slate: "#475569",
    magenta: "#c026d3",
  },
};
