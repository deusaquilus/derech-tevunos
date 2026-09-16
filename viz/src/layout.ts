/**
 * Placement rules for the depth lattice, shared by the SVG exporter and the
 * React view so both draw the same staircase.
 */

import { ICON_RADIUS } from "./icons.ts";
import type { Effect } from "./taxonomy.ts";

/** Horizontal distance between adjacent dialectical depths. */
export const INDENT = 34;

/**
 * Below this the icons of two adjacent depths begin to touch. It is a floor,
 * not a target: past the depth where the budget can hold, the lattice simply
 * gets wider and the sentence column narrower.
 */
export const MIN_INDENT = 18;

/**
 * How much horizontal room the staircase may take before it starts eating the
 * sentences. Four sentences at depth 3 cost 136px and nobody notices; fifty-
 * seven at depth 7 would cost 238px, which is a quarter of the page.
 */
export const LATTICE_BUDGET = 216;

/**
 * Indent shrinks as the argument deepens, so the staircase stays inside its
 * budget. What it has to preserve is only that one step is visibly a step —
 * nobody counts columns, and two icons at adjacent depths are almost never on
 * adjacent rows.
 */
export const indentFor = (deepest: number): number =>
  Math.max(MIN_INDENT, Math.min(INDENT, LATTICE_BUDGET / Math.max(1, deepest + 1)));

/**
 * Room to the left of depth 0 for the rail. Local elbows run in the gutters
 * *between* depth columns; a rail that runs there too lands in the same gutter
 * as every other move on the same target, which is the overdraw v2 gave up on.
 * The margin is a lane nothing else uses.
 */
export const LATTICE_MARGIN = 18;

/** Where the outermost rail's vertical trunk runs, inside the margin. */
export const RAIL_X = 6;

export const RAIL_WIDTH = 3;

/**
 * Space between two rails' trunks. The chain of rails around the attention is
 * strictly nested, so the lanes never need a collision rule — only room. Eight
 * pixels is enough for a 3px trunk and a 1.5px one to read as two lines.
 */
export const LANE_GAP = 8;

/**
 * The margin with room for `lanes` rails. The lane count is fixed per sugya
 * (the policy's `maxLanes` whenever it has a long-reaching move), so rows never
 * shift horizontally when a second rail appears.
 */
export const marginFor = (lanes: number): number =>
  LATTICE_MARGIN + Math.max(0, lanes - 1) * LANE_GAP;

/**
 * Where lane `lane`'s trunk runs. Lane 0 — the focus rail — is nearest the
 * text; each enclosing rail is one lane further out, so the outermost sits at
 * `RAIL_X` as the one rail did before.
 */
export const laneX = (lane: number, lanes: number): number =>
  RAIL_X + Math.max(0, lanes - 1 - lane) * LANE_GAP;

export const latticeWidth = (deepest: number, indent: number, lanes: number = 1): number =>
  marginFor(lanes) + (deepest + 1) * indent + 10;

export const iconX = (depth: number, originX: number, indent: number = INDENT): number =>
  originX + depth * indent;

export type Point = { readonly x: number; readonly y: number };

/**
 * Past this, an elbow is no longer a line anyone can follow: it leaves the
 * viewport, and every other move landing on the same sentence draws its
 * vertical run in the same gutter, so they arrive as one opaque stripe. Moves
 * further apart than this get a printed reference instead of a drawn line.
 */
export const LONG_RUN = 260;

export const isLongRun = (from: Point, to: Point): boolean =>
  Math.abs(to.y - from.y) > LONG_RUN;

/** How the connector is drawn: the cap says what the move does to its target. */
export type ConnectorCap = "arrow" | "bar" | "dot";

export type ConnectorStyle = {
  readonly dashed: boolean;
  readonly cap: ConnectorCap;
};

export const connectorStyle = (effect: Effect): ConnectorStyle => {
  switch (effect) {
    case "raise":
      return { dashed: false, cap: "arrow" };
    case "reject":
      return { dashed: false, cap: "bar" };
    case "discharge":
      return { dashed: false, cap: "dot" };
    case "unsettle":
      return { dashed: true, cap: "arrow" };
    case "open":
      return { dashed: true, cap: "arrow" };
    default: {
      const exhaustive: never = effect;
      return exhaustive;
    }
  }
};

/**
 * Elbow from a move back up to the sentence it acts upon.
 *
 * The vertical run sits in the gutter between two depth columns, so it can
 * never cross an icon however far apart the two rows are.
 */
export const connectorPath = (
  from: Point,
  to: Point,
  indent: number = INDENT,
): string => {
  const channel = from.x + indent / 2;
  const turn = to.y > from.y ? 6 : -6;
  return [
    `M ${from.x + ICON_RADIUS + 3} ${from.y}`,
    `H ${channel - 4}`,
    `Q ${channel} ${from.y} ${channel} ${from.y + turn}`,
    `V ${to.y - turn}`,
    `Q ${channel} ${to.y} ${channel + 4} ${to.y}`,
    `H ${to.x - ICON_RADIUS - 4}`,
  ].join(" ");
};

/**
 * The bead: an edge-level badge drawn on the elbow it describes, at the
 * midpoint of the vertical run. Best effort only — it is the same badge as the
 * chip on the row, and the chip is the one that is always there. A bead is
 * drawn when the elbow is (a local move, no handle) and the run is long enough
 * to hold it without touching the icons at either end; otherwise nothing.
 */
export const BEAD_MIN_RUN = 44;

/**
 * Half the gutter, less a hairline, so the bead never touches an icon in the
 * column on either side of it; capped at the size the glyphs stay legible.
 */
export const beadRadius = (indent: number = INDENT): number =>
  Math.min(8.5, indent / 2 - 1);

export const beadFits = (from: Point, to: Point): boolean =>
  Math.abs(to.y - from.y) >= BEAD_MIN_RUN;

/** Centre of the bead on the elbow from `from` (the target) to `to` (the move). */
export const beadPoint = (from: Point, to: Point, indent: number = INDENT): Point => ({
  x: from.x + indent / 2,
  y: (from.y + to.y) / 2,
});

/**
 * The rail: a bracket in the left margin from the sentence acted upon down to
 * the move acting on it. Drawn target-first, like an elbow, so the cap lands on
 * the target. Unlike an elbow it runs *outward* to the margin, so it spans any
 * distance without crossing a column.
 */
export const railPath = (target: Point, move: Point, trunkX: number = RAIL_X): string => {
  const r = 6;
  return [
    `M ${target.x - ICON_RADIUS - 3} ${target.y}`,
    `H ${trunkX + r}`,
    `Q ${trunkX} ${target.y} ${trunkX} ${target.y + r}`,
    `V ${move.y - r}`,
    `Q ${trunkX} ${move.y} ${trunkX + r} ${move.y}`,
    `H ${move.x - ICON_RADIUS - 3}`,
  ].join(" ");
};

/**
 * A branch off the trunk to another move in the same landing — the Talmud's
 * habit of stacking two or three blows on one claim in a row. They share the
 * trunk rather than each drawing their own, which is what a reader means by
 * "these all land on Rava".
 */
export const railBranch = (at: Point, trunkX: number = RAIL_X): string =>
  `M ${trunkX} ${at.y} H ${at.x - ICON_RADIUS - 3}`;
