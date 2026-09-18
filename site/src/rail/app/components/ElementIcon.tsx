import type { JSX } from "react";

import { resolveFill, shapesFor, type IconPrimitive } from "../../icons.ts";
import type { Standing } from "../../sugya.ts";
import type { Element } from "../../taxonomy.ts";
import { LIGHT } from "../../theme.ts";
import { standingOpacity } from "../../verdict.ts";

const primitive = (
  p: IconPrimitive,
  key: number,
  colour: string,
  surface: string,
): JSX.Element => {
  if (p.el === "text") {
    return (
      <text
        key={key}
        x={0}
        y={p.dy}
        textAnchor="middle"
        fontSize={p.fontSize}
        fontWeight={700}
        fill={colour}
      >
        {p.text}
      </text>
    );
  }

  const { fill, fillOpacity } = resolveFill(p.fill, colour, surface);
  const paint =
    p.strokeWidth > 0
      ? {
          stroke: colour,
          strokeWidth: p.strokeWidth,
          strokeLinecap: "round" as const,
          strokeLinejoin: "round" as const,
        }
      : {};

  switch (p.el) {
    case "rect":
      return (
        <rect
          key={key}
          x={p.x}
          y={p.y}
          width={p.width}
          height={p.height}
          rx={p.rx}
          fill={fill}
          fillOpacity={fillOpacity}
          {...paint}
        />
      );
    case "circle":
      return (
        <circle
          key={key}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill={fill}
          fillOpacity={fillOpacity}
          {...paint}
        />
      );
    case "path":
      return <path key={key} d={p.d} fill={fill} fillOpacity={fillOpacity} {...paint} />;
    default: {
      const exhaustive: never = p;
      return exhaustive;
    }
  }
};

/**
 * The bar through a refuted move. Shared with `MoveIcon`, which draws the
 * same icon from the icon set's SVG rather than from `icons.ts` geometry: a
 * defeated demonstration must be struck exactly as a defeated proof is.
 */
export const DefeatedStrike = (): JSX.Element => (
  <line x1={-11.5} y1={11.5} x2={11.5} y2={-11.5} stroke={LIGHT.fg} strokeWidth={1.6} strokeLinecap="round" />
);

export type ElementIconProps = {
  readonly element: Element;
  /** Fades the icon by how far the move has been knocked down. */
  readonly standing?: Standing;
  readonly size?: number;
  /** Not yet revealed: drawn as a faint placeholder. */
  readonly pending?: boolean;
  readonly title?: string;
};

export const ElementIcon = ({
  element,
  standing = "live",
  size = 22,
  pending = false,
  title,
}: ElementIconProps): JSX.Element => {
  const colour = pending ? LIGHT.border : LIGHT.element[element];
  const opacity = pending ? 1 : standingOpacity(standing);

  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="-12 -12 24 24"
      role="img"
      aria-label={title ?? element}
      style={{ opacity }}
    >
      {title === undefined ? null : <title>{title}</title>}
      {shapesFor(element).map((p, i) => primitive(p, i, colour, LIGHT.surface))}
      {standing === "defeated" && !pending ? <DefeatedStrike /> : null}
    </svg>
  );
};
