/**
 * Icon geometry, described as data rather than markup so the static SVG
 * exporter and the React component draw from one source.
 *
 * Every icon is centred on the origin inside roughly 19x19 units.
 */

import { ICONS, type Element, type Icon } from "./taxonomy.ts";

/** `tint` is the element colour at low opacity; `solid` is it at full. */
export type IconFill = "none" | "tint" | "surface" | "solid";

export type IconPrimitive =
  | {
      readonly el: "rect";
      readonly x: number;
      readonly y: number;
      readonly width: number;
      readonly height: number;
      readonly rx: number;
      readonly fill: IconFill;
      readonly strokeWidth: number;
    }
  | {
      readonly el: "circle";
      readonly cx: number;
      readonly cy: number;
      readonly r: number;
      readonly fill: IconFill;
      readonly strokeWidth: number;
    }
  | {
      readonly el: "path";
      readonly d: string;
      readonly fill: IconFill;
      readonly strokeWidth: number;
    }
  | {
      readonly el: "text";
      readonly text: string;
      readonly fontSize: number;
      /** Baseline offset from the centre. */
      readonly dy: number;
    };

export const TINT_OPACITY = 0.15;

/** Nominal half-extent of an icon, used for connector clearance. */
export const ICON_RADIUS = 9.5;

export const ICON_SHAPES: Record<Icon, readonly IconPrimitive[]> = {
  page: [
    { el: "rect", x: -6.6, y: -8.6, width: 13.2, height: 17.2, rx: 1.8, fill: "surface", strokeWidth: 1.35 },
    {
      el: "path",
      d: "M -3.7 -4.7 H 3.7 M -3.7 -1.6 H 3.7 M -3.7 1.5 H 3.7 M -3.7 4.6 H 1.2",
      fill: "none",
      strokeWidth: 1.15,
    },
  ],
  questionMark: [{ el: "text", text: "?", fontSize: 21, dy: 7 }],
  checkbox: [
    { el: "rect", x: -8.2, y: -8.2, width: 16.4, height: 16.4, rx: 3.6, fill: "tint", strokeWidth: 1.45 },
    { el: "path", d: "M -4.3 0.2 L -1.3 3.4 L 4.4 -3.7", fill: "none", strokeWidth: 2.3 },
  ],
  thumbsUp: [
    { el: "rect", x: -8.4, y: -1.4, width: 4.8, height: 9.6, rx: 1.3, fill: "tint", strokeWidth: 1.3 },
    {
      el: "path",
      d: "M -2.1 8.2 L -2.1 -0.6 C -1 -0.9, -0.3 -1.7, 0 -2.7 L 1.1 -6.6 C 1.4 -7.8, 3.5 -7.7, 3.5 -6.1 L 3.5 -2.5 L 6.3 -2.5 C 7.7 -2.5, 8.5 -1.2, 8.1 0.1 L 6.5 6.3 C 6.2 7.5, 5.3 8.2, 4.2 8.2 Z",
      fill: "tint",
      strokeWidth: 1.35,
    },
  ],
  crossedOut: [
    { el: "circle", cx: 0, cy: 0, r: 8.5, fill: "tint", strokeWidth: 1.45 },
    { el: "path", d: "M -3.8 -3.8 L 3.8 3.8 M 3.8 -3.8 L -3.8 3.8", fill: "none", strokeWidth: 2.3 },
  ],
  warning: [
    {
      el: "path",
      d: "M 0 -8.6 L 8.2 6.5 C 8.7 7.5, 8.1 8.4, 7.1 8.4 L -7.1 8.4 C -8.1 8.4, -8.7 7.5, -8.2 6.5 Z",
      fill: "tint",
      strokeWidth: 1.45,
    },
    { el: "path", d: "M 0 -2.6 V 2.6", fill: "none", strokeWidth: 1.9 },
    { el: "circle", cx: 0, cy: 5.7, r: 1.15, fill: "solid", strokeWidth: 0 },
  ],
  lightbulb: [
    {
      el: "path",
      d: "M -3.6 3.2 C -7.2 0.2, -7.2 -4.9, -3.5 -7 C -1.2 -8.4, 1.2 -8.4, 3.5 -7 C 7.2 -4.9, 7.2 0.2, 3.6 3.2 Z",
      fill: "tint",
      strokeWidth: 1.4,
    },
    { el: "path", d: "M -3.2 5.6 H 3.2 M -2.1 8.1 H 2.1", fill: "none", strokeWidth: 1.5 },
  ],
};

export const shapesFor = (element: Element): readonly IconPrimitive[] => ICON_SHAPES[ICONS[element]];

export type ResolvedFill = {
  readonly fill: string;
  readonly fillOpacity: number | undefined;
};

export const resolveFill = (
  fill: IconFill,
  colour: string,
  surface: string,
): ResolvedFill => {
  switch (fill) {
    case "none":
      return { fill: "none", fillOpacity: undefined };
    case "tint":
      return { fill: colour, fillOpacity: TINT_OPACITY };
    case "surface":
      return { fill: surface, fillOpacity: undefined };
    case "solid":
      return { fill: colour, fillOpacity: undefined };
    default: {
      const exhaustive: never = fill;
      return exhaustive;
    }
  }
};
