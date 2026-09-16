import type { JSX } from "react";

import { connectorPath, isLongRun, type ConnectorStyle, type Point } from "../../layout.ts";
import { LIGHT } from "../../theme.ts";

export type Connector = {
  readonly id: string;
  /** The sentence being acted upon. */
  readonly from: Point;
  /** The move acting on it. */
  readonly to: Point;
  readonly style: ConnectorStyle;
  readonly revealed: boolean;
};

/**
 * A dotted vertical marking one dialectical depth, drawn only across the rows
 * that actually sit at that depth. Run full-height they read as a cage: a
 * seven-deep passage of fifty-seven sentences would put seven dotted lines down
 * five thousand pixels of canvas, almost all of it past the last row that uses
 * them.
 */
export type DepthColumn = {
  readonly x: number;
  readonly top: number;
  readonly bottom: number;
};

export type ConnectorLayerProps = {
  readonly connectors: readonly Connector[];
  readonly width: number;
  readonly height: number;
  readonly columns: readonly DepthColumn[];
  readonly indent: number;
  /**
   * The move whose edge badge is under the pointer. Its elbow is drawn heavier
   * so the chip, the bead and the line read as one thing.
   */
  readonly hotEdge?: string;
};

const caps = (
  <defs>
    <marker
      id="cap-arrow"
      viewBox="0 0 8 8"
      refX={6.5}
      refY={4}
      markerWidth={6}
      markerHeight={6}
      orient="auto-start-reverse"
    >
      <path d="M 0 1 L 7 4 L 0 7 z" fill={LIGHT.muted} />
    </marker>
    <marker
      id="cap-bar"
      viewBox="0 0 8 8"
      refX={3}
      refY={4}
      markerWidth={6}
      markerHeight={6}
      orient="auto-start-reverse"
    >
      <path d="M 2 0.5 L 2 7.5" stroke={LIGHT.muted} strokeWidth={2} fill="none" />
    </marker>
    <marker
      id="cap-dot"
      viewBox="0 0 8 8"
      refX={4}
      refY={4}
      markerWidth={5}
      markerHeight={5}
      orient="auto-start-reverse"
    >
      <circle cx={4} cy={4} r={2.6} fill={LIGHT.muted} />
    </marker>
  </defs>
);

export const ConnectorLayer = ({
  connectors,
  width,
  height,
  columns,
  indent,
  hotEdge,
}: ConnectorLayerProps): JSX.Element => (
  <svg className="connectors" width={width} height={height} aria-hidden="true">
    {caps}
    {columns.map((column) => (
      <line
        key={column.x}
        x1={column.x}
        y1={column.top}
        x2={column.x}
        y2={column.bottom}
        stroke={LIGHT.border}
        strokeWidth={1}
        strokeDasharray="1 4"
      />
    ))}
    {connectors
      .filter((c) => c.revealed && !isLongRun(c.from, c.to))
      .map((c) => (
        <path
          key={c.id}
          className={`connector${hotEdge === c.id ? " connector-hot" : ""}`}
          d={connectorPath(c.from, c.to, indent)}
          fill="none"
          stroke={LIGHT.muted}
          strokeWidth={hotEdge === c.id ? 2.25 : 1.25}
          strokeDasharray={c.style.dashed ? "4 3" : undefined}
          // The head sits on the target: a move acts upon what precedes it.
          markerStart={`url(#cap-${c.style.cap})`}
        />
      ))}
  </svg>
);
