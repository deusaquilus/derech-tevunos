import type { JSX, KeyboardEvent } from "react";

import {
  laneX,
  railBranch,
  railPath,
  RAIL_WIDTH,
  type ConnectorStyle,
  type Point,
} from "../../layout.ts";

/**
 * One rail with its positions resolved: the relation between a long-reaching
 * move and its target, as a bracket in the margin.
 */
export type DrawnRail = {
  /** The move's id. */
  readonly id: string;
  readonly targetId: string;
  /** The sentence acted upon. */
  readonly target: Point;
  /** The move. The trunk runs from the target to here. */
  readonly move: Point;
  /**
   * The rake's teeth: other long-reaching moves on the same target, and the
   * moves in the same landing, which branch off the trunk. Each carries its
   * own effect: a `סתירה` and the `תיובתא` after it share a trunk but not a
   * force, and the branch is where that shows.
   */
  readonly branches: readonly { readonly at: Point; readonly style: ConnectorStyle }[];
  /** The move's effect; the trunk and its cap take this. */
  readonly style: ConnectorStyle;
  /** Lane 0 only: whether the move's frame is closed. */
  readonly folded: boolean;
  /** The target's caption, for the accessible name. */
  readonly label: string;
  readonly moveLabel: string;
  /** Rows folded away between the two ends. */
  readonly hiddenCount: number;
  /** 0 is the attention's rail, nearest the text; each enclosing rail is one lane further out. */
  readonly lane: number;
};

export type RailLayerProps = {
  readonly rails: readonly DrawnRail[];
  /** Lanes the margin reserves, which fixes where each lane's trunk runs. */
  readonly lanes: number;
  readonly width: number;
  readonly height: number;
  /** Press lane 0: fold or unfold the attention's frame. */
  readonly onToggle: () => void;
  readonly onPeek: (peeking: boolean) => void;
};

const caps = (
  <defs>
    <marker
      id="rail-cap-arrow"
      viewBox="0 0 8 8"
      refX={6.5}
      refY={4}
      markerWidth={4}
      markerHeight={4}
      orient="auto-start-reverse"
    >
      <path d="M 0 1 L 7 4 L 0 7 z" className="rail-cap" />
    </marker>
    <marker
      id="rail-cap-bar"
      viewBox="0 0 8 8"
      refX={3}
      refY={4}
      markerWidth={4}
      markerHeight={4}
      orient="auto-start-reverse"
    >
      <path d="M 2 0.5 L 2 7.5" className="rail-cap rail-cap-stroke" strokeWidth={2} fill="none" />
    </marker>
    <marker
      id="rail-cap-dot"
      viewBox="0 0 8 8"
      refX={4}
      refY={4}
      markerWidth={3.5}
      markerHeight={3.5}
      orient="auto-start-reverse"
    >
      <circle cx={4} cy={4} r={2.6} className="rail-cap" />
    </marker>
  </defs>
);

/** Half the length of the tick an outer lane puts at each tooth. */
const TICK = 2;

/**
 * The attention's rail, drawn in full: thick, capped at the target, a branch
 * for each tooth, and a wide invisible stroke over the same geometry so it is
 * easy to hit. Clicking anywhere on it folds or unfolds the move's frame.
 */
const FocusRail = ({
  rail,
  x,
  onToggle,
  onPeek,
}: {
  readonly rail: DrawnRail;
  readonly x: number;
  readonly onToggle: () => void;
  readonly onPeek: (peeking: boolean) => void;
}): JSX.Element => {
  const trunk = railPath(rail.target, rail.move, x);
  const branches = rail.branches.map(({ at, style }) => ({ d: railBranch(at, x), style }));
  const all = [trunk, ...branches.map((b) => b.d)].join(" ");

  const onKeyDown = (event: KeyboardEvent<SVGPathElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  const verb = rail.folded ? "Unfold" : "Fold";
  const name = rail.folded
    ? `${verb} the ${rail.hiddenCount} sentences between this move and ${rail.label}`
    : `${verb} the sentences between this move and ${rail.label}`;

  return (
    <g className={`rail-focus${rail.folded ? " rail-focus-folded" : ""}`}>
      <path
        className="rail-line"
        d={trunk}
        fill="none"
        strokeWidth={RAIL_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={rail.style.dashed ? "12 6" : undefined}
        // The cap sits on the target, as an elbow's does.
        markerStart={`url(#rail-cap-${rail.style.cap})`}
      />
      {branches.map(({ d, style }, i) => (
        <path
          key={i}
          className="rail-line rail-branch"
          d={d}
          fill="none"
          strokeWidth={RAIL_WIDTH}
          strokeLinecap="round"
          strokeDasharray={style.dashed ? "6 4" : undefined}
        />
      ))}
      <path
        className="rail-hit"
        d={all}
        fill="none"
        stroke="transparent"
        strokeWidth={18}
        strokeLinecap="round"
        role="button"
        tabIndex={0}
        aria-label={name}
        aria-pressed={rail.folded}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        onMouseEnter={() => onPeek(true)}
        onMouseLeave={() => onPeek(false)}
        onFocus={() => onPeek(true)}
        onBlur={() => onPeek(false)}
      >
        <title>{name}</title>
      </path>
    </g>
  );
};

/**
 * An enclosing rail: thin context, one lane further out for each level. No
 * cap, a short tick at each tooth, not interactive — a hairline should not be
 * able to fold thirty rows on a stray click, and the move's handle offers the
 * same action deliberately. A `<title>` names the relation for anyone who
 * looks.
 */
const FrameRail = ({ rail, x }: { readonly rail: DrawnRail; readonly x: number }): JSX.Element => (
  <g className="rail-frame">
    <title>
      {rail.label} → {rail.moveLabel}
    </title>
    <path
      className="rail-frame-line"
      d={railPath(rail.target, rail.move, x)}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={rail.style.dashed ? "6 5" : undefined}
    />
    {rail.branches.map(({ at }, i) => (
      <line key={i} className="rail-frame-line" x1={x - TICK} y1={at.y} x2={x + TICK} y2={at.y} />
    ))}
  </g>
);

/**
 * Draws the chain of rails: the attention's relation in full in lane 0, and
 * around it the long-reaching relations that contain it, one lane further out
 * each. The chain is strictly nested, so lanes never collide; the margin is
 * wide enough for every lane whenever any rail can appear, so rows never move
 * when a second one does.
 *
 * Lane 0 is thick and in a colour nothing else on the page uses, so it can be
 * followed by scrolling along it when unfolded. Only its strokes take the
 * pointer.
 */
export const RailLayer = ({
  rails,
  lanes,
  width,
  height,
  onToggle,
  onPeek,
}: RailLayerProps): JSX.Element | null => {
  if (rails.length === 0) return null;
  const focus = rails.find((r) => r.lane === 0);

  return (
    <svg className={`rails${focus?.folded ? " rails-folded" : ""}`} width={width} height={height}>
      {caps}
      {rails
        .filter((r) => r.lane > 0)
        .map((r) => <FrameRail key={r.id} rail={r} x={laneX(r.lane, lanes)} />)}
      {focus === undefined ? null : (
        <FocusRail rail={focus} x={laneX(0, lanes)} onToggle={onToggle} onPeek={onPeek} />
      )}
    </svg>
  );
};
