import type { JSX } from "react";

import { FAMILIES, type Badge } from "../../anatomy.ts";
import { BadgeTip, type BadgeWhere } from "./BadgeTip.tsx";
import { Glyph } from "./Glyph.tsx";
import { Tooltip } from "./Tooltip.tsx";

export type AnatomyBadgeProps = {
  readonly badge: Badge;
  readonly where: BadgeWhere;
  readonly ordinal?: number;
  readonly targetOrdinal?: number;
  /**
   * `chip`: glyph and word in a pill. `bare`: the glyph alone, for a slot that
   * has no room for a word. `inline`: glyph and word with no pill of their
   * own, for riding inside another control such as the handle. `quiet`: glyph
   * and word set like surrounding text, for a badge that recurs on most rows.
   */
  readonly variant?: "chip" | "bare" | "inline" | "quiet";
  /**
   * The glyph's side. The default sits just under the chip's line box, so a
   * chip is as tall as the words beside it wherever it appears; raise it only
   * for a badge set in larger type, such as the one on the strip.
   */
  readonly size?: number;
  /** Its twin — the bead on the elbow — is under the pointer, or it is itself. */
  readonly hot?: boolean;
  /**
   * The pointer is on its twin rather than on the badge. The badge then shows a
   * one-line hint saying the explanation is here, instead of the explanation:
   * the reader has not asked to read anything yet, only brushed the bead.
   */
  readonly hinted?: boolean;
  readonly beadDrawn?: boolean;
  readonly onHover?: (on: boolean) => void;
};

/**
 * One chapter 1–8 badge. Hue says the family; a dashed outline says the label
 * is inferred rather than attested or marked, exactly as the row's own
 * "inferred" note does for its ch. 9 label. A badge does nothing but explain
 * itself, on hover or on focus, so it takes the tab order but is not a button.
 */
export const AnatomyBadge = ({
  badge,
  where,
  ordinal,
  targetOrdinal,
  variant = "chip",
  size = 14,
  hot = false,
  hinted = false,
  beadDrawn = false,
  onHover,
}: AnatomyBadgeProps): JSX.Element => {
  const { info, basis } = badge;
  const hue = FAMILIES[info.family].hue;
  const className = [
    "badge",
    `badge-${variant}`,
    `badge-${hue}`,
    basis === "inferred" ? "badge-inferred" : "",
    hot ? "badge-hot" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tooltip
      onHover={onHover}
      content={
        <BadgeTip
          badge={badge}
          where={where}
          ordinal={ordinal}
          targetOrdinal={targetOrdinal}
          beadDrawn={beadDrawn}
        />
      }
      hint={hinted ? "the same badge — hover here for what it means" : undefined}
    >
      <span className={className} tabIndex={0} aria-label={`${info.en}: ${info.reads}`}>
        <Glyph kind={info.key} size={size} />
        {variant === "bare" ? null : <span className="badge-word">{info.short}</span>}
      </span>
    </Tooltip>
  );
};
