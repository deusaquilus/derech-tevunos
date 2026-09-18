import type { JSX } from "react";

import { MOVE_BOX, moveGlyph } from "../../moveGlyphs.ts";
import type { Standing } from "../../sugya.ts";
import { keyOf, type Move } from "../../taxonomy.ts";
import { LIGHT } from "../../theme.ts";
import { standingOpacity } from "../../verdict.ts";
import { DefeatedStrike, ElementIcon } from "./ElementIcon.tsx";

export type MoveIconProps = {
  readonly move: Move;
  /** Fades the icon by how far the move has been knocked down. */
  readonly standing?: Standing;
  readonly size?: number;
  /** Not yet revealed: drawn as a faint placeholder. */
  readonly pending?: boolean;
  readonly title?: string;
};

/**
 * What a sentence does, drawn as precisely as the icon set allows: the
 * subtype's own picture where there is one, the parent move's silhouette
 * where there is not.
 *
 * Seven of the nineteen leaves have a drawing of their own (`moveGlyphs.ts`),
 * and each of those keeps its parent's vocabulary inside it — a demonstration
 * is the proof thumb in a monitor, an apparent contradiction is the difficulty
 * triangle with two chevrons facing off in it. So the family still reads at a
 * glance and the subtype reads on a second look, which is why the row draws
 * the subtype rather than the parent: the parent is never lost by showing it.
 *
 * The set measures the internal distinction as needing 24–32px
 * (`ICONS_REFERENCE_V2.md` §4.3), which is what the row's 26px is for; the
 * legend's parents stay at 20 because there is nothing inside them to read.
 */
export const MoveIcon = ({
  move,
  standing = "live",
  size = 26,
  pending = false,
  title,
}: MoveIconProps): JSX.Element => {
  const body = moveGlyph(keyOf(move));
  if (body === undefined) {
    return (
      <ElementIcon element={move.element} standing={standing} size={size} pending={pending} title={title} />
    );
  }

  const colour = pending ? LIGHT.border : LIGHT.element[move.element];
  const opacity = pending ? 1 : standingOpacity(standing);

  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox={MOVE_BOX}
      role="img"
      aria-label={title ?? `${move.element}: ${move.subtype}`}
      style={{ color: colour, opacity }}
    >
      {title === undefined ? null : <title>{title}</title>}
      <g dangerouslySetInnerHTML={{ __html: body }} />
      {standing === "defeated" && !pending ? <DefeatedStrike /> : null}
    </svg>
  );
};
