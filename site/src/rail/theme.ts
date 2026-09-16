/**
 * Colour palette, shared by the SVG exporter and the React view.
 *
 * This is the "greige" palette, settled 2026-09-16: a warm gray paper, not
 * white. The rail sits under the site's dark nav, and a pure-white surface met
 * that nav as a luminance cliff with a temperature clash on top — cool ink over
 * clinical white. Warm gray is the surface that reads as one material with a
 * warmed nav, and the semantic colours below are the same hues re-inked for it:
 * a touch deeper and less saturated than the Tailwind-600 values they replace,
 * the way a printer's ink sits on paper rather than a pixel on a screen.
 *
 * `surface` is load-bearing beyond backgrounds: `ElementIcon` paints every
 * icon's interior with it, so an icon's "white" is whatever the paper is.
 *
 * The same values are declared as custom properties in `app/styles.css`
 * (`:root`), for the DOM. The two MUST agree — this file is what the SVG
 * export and the icons read, that file is what the rows read.
 */

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
  fg: "#2a2622",
  muted: "#726b62",
  border: "#d3cdc2",
  surface: "#eeeae2",
  accepted: "#2f7a42",
  // Unchanged from the white-surface palette: ochre is native to paper, and
  // the site's brass (`#8a5a00`) is tuned to sit darker than this on purpose.
  doubt: "#a16207",
  rejected: "#b0392e",
  element: {
    // Warm slate, and IDENTICAL to `hue.slate` below — the speaker badges
    // share the statement icon's grey deliberately. Change both or neither.
    statement: "#66605a",
    question: "#2563eb",
    answer: "#16a34a",
    proof: "#16a34a",
    contradiction: "#dc2626",
    difficulty: "#ea580c",
    resolution: "#ca8a04",
  },
  hue: {
    violet: "#6f4fb0",
    teal: "#237f76",
    slate: "#66605a",
    magenta: "#a2418a",
  },
};
