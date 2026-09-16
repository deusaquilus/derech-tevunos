import type { JSX } from "react";

import type { Badge } from "../../anatomy.ts";
import { LATTICE_MARGIN } from "../../layout.ts";
import { labelBasis, type Standing, type Unit } from "../../sugya.ts";
import { describe, isUndefinedInSource } from "../../taxonomy.ts";
import type { Verdict } from "../../verdict.ts";
import type { RowBadges } from "../useSugyaController.ts";
import { AnatomyBadge } from "./AnatomyBadge.tsx";
import { ElementIcon } from "./ElementIcon.tsx";
import { Tooltip } from "./Tooltip.tsx";
import { VerdictPill } from "./VerdictPill.tsx";

/**
 * The printed handle on a move whose target is far or hidden. When the move
 * is the attention its rail is drawn and the handle toggles its fold;
 * otherwise the handle says what the move acts on and, when pressed, either
 * takes the rail (a long-reaching move, folded) or brings the hidden target
 * back (a local one).
 */
export type Handle = {
  readonly targetId: string;
  readonly ordinal: number;
  readonly label: string;
  /** The move is the attention: this handle is its rail's second grip. */
  readonly open: boolean;
  /** The attention's frame is closed. */
  readonly folded: boolean;
  /** Sentences hidden between this move and its target. */
  readonly hidden: number;
  /** A local move whose target a band hides; pressing exposes it. */
  readonly away: boolean;
};

export type UnitRowProps = {
  readonly unit: Unit;
  readonly ordinal: number;
  readonly depth: number;
  readonly indent: number;
  readonly standing: Standing;
  readonly verdict: Verdict | undefined;
  readonly revealed: boolean;
  /** The last revealed sentence: the only one that can be advanced from. */
  readonly frontier: boolean;
  readonly remaining: number;
  readonly handle: Handle | undefined;
  /** Marked as the target of whichever rail or handle the reader is pointing at. */
  readonly peeked: boolean;
  /** Part of the open rail's landing: the target or one of the moves on it. */
  readonly onRail: boolean;
  /** Lets the parent measure where this row's icon sits, for the rail and connectors. */
  readonly iconRef: (el: HTMLDivElement | null) => void;
  readonly onAdvance: () => void;
  /** Hide this sentence and put the frontier on the one before it. */
  readonly onRetreat: () => void;
  readonly onCollapseTo: () => void;
  /** Press the handle: open this move's rail, or toggle its fold if already open. */
  readonly onHandle: () => void;
  readonly onPeek: (id: string | undefined) => void;

  // The chapter 1–7 layer. All empty when it is off.
  readonly badges?: RowBadges;
  /** 1-based position of the sentence this one acts on, for the badges' wording. */
  readonly targetOrdinal?: number;
  /** This row's edge badge is under the pointer — here or on its bead. */
  readonly hot?: boolean;
  /** A bead for this row's edge badge is on the page. */
  readonly beadDrawn?: boolean;
  /** The pointer is on that bead, so the chip says where the explanation is. */
  readonly hinted?: boolean;
  readonly onEdgeHover?: (on: boolean) => void;
};

const BASIS_NOTE: Record<ReturnType<typeof labelBasis>, string | undefined> = {
  attested: undefined,
  marked: undefined,
  inferred: "inferred",
};

const BASIS_TIP: Record<ReturnType<typeof labelBasis>, string> = {
  attested: "Ramchal himself gives this label for the passage.",
  marked: "The label rests on a stock Aramaic phrase in the sentence itself — the Talmud's own signposting of the move.",
  inferred: "The label is ours, not Ramchal's: he does not discuss this sentence.",
};

const NONE: RowBadges = { row: [], edge: [], speaker: undefined };

export const UnitRow = ({
  unit,
  ordinal,
  depth,
  indent,
  standing,
  verdict,
  revealed,
  frontier,
  remaining,
  handle,
  peeked,
  onRail,
  iconRef,
  onAdvance,
  onRetreat,
  onCollapseTo,
  onHandle,
  onPeek,
  badges = NONE,
  targetOrdinal,
  hot = false,
  beadDrawn = false,
  hinted = false,
  onEdgeHover,
}: UnitRowProps): JSX.Element => {
  const leaf = describe(unit.move);
  const basis = labelBasis(unit);
  const detail = [
    leaf.he,
    leaf.en,
    unit.speaker,
    BASIS_NOTE[labelBasis(unit)],
    isUndefinedInSource(unit.move) ? "undefined in source" : undefined,
  ].filter((part): part is string => part !== undefined);

  const className = [
    "row",
    revealed ? "" : "row-pending",
    frontier ? "row-frontier" : "",
    peeked ? "row-peeked" : "",
    onRail ? "row-on-rail" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleTitle =
    handle === undefined
      ? undefined
      : handle.away
        ? `Acts on sentence ${handle.ordinal}, which a fold has hidden. Press to bring it back into view.`
        : !handle.open
          ? `Acts on sentence ${handle.ordinal}, too far up for a drawn line. Press to fold the sentences between and draw the rail to it.`
          : handle.folded
            ? `Acts on sentence ${handle.ordinal}. ${handle.hidden} sentences between are folded; press to unfold them one level.`
            : `Acts on sentence ${handle.ordinal}. Press to fold the sentences between.`;
  const handleState = handle === undefined
    ? undefined
    : handle.open
      ? handle.folded
        ? `${handle.hidden} folded`
        : "unfolded"
      : handle.away
        ? "folded away"
        : undefined;

  const edgeBadges = revealed ? badges.edge : [];
  const inHandle = handle !== undefined && edgeBadges.length > 0;

  const edgeBadge = (badge: Badge, variant: "chip" | "inline"): JSX.Element => (
    <AnatomyBadge
      key={badge.info.key}
      badge={badge}
      where="edge"
      variant={variant}
      ordinal={ordinal}
      targetOrdinal={targetOrdinal}
      hot={hot}
      hinted={hinted}
      beadDrawn={beadDrawn}
      onHover={onEdgeHover}
    />
  );

  const speaker = revealed ? badges.speaker : undefined;

  const iconTip = (
    <span className="legend-tip">
      <span>
        <b>{unit.move.element}</b> — {leaf.plain}. <span lang="he">{leaf.he}</span> · {leaf.en}.
      </span>
      <span className="legend-tip-leaves">
        A chapter 9 move: what this sentence <i>does</i>
        {targetOrdinal === undefined ? "" : ` to sentence ${targetOrdinal}`}. {BASIS_TIP[basis]}
        {isUndefinedInSource(unit.move) ? " Ramchal announces this kind and never defines it." : ""}
      </span>
    </span>
  );

  return (
    <li className={className} data-id={unit.id} aria-hidden={revealed ? undefined : true}>
      <div className="row-lattice">
        <div
          className="row-icon"
          // The margin is the rows container's: it widens for the rail lanes.
          style={{ left: `calc(var(--lattice-margin, ${LATTICE_MARGIN}px) + ${depth * indent}px)` }}
          ref={iconRef}
        >
          <Tooltip content={iconTip} width={300} className="row-icon-tip">
            <ElementIcon element={unit.move.element} standing={standing} pending={!revealed} />
          </Tooltip>
        </div>
      </div>

      <div className="row-body">
        <span className="row-meta">
          <span className="row-plain">{leaf.plain}</span>
          <span className="row-detail">{detail.join(" · ")}</span>
          {speaker === undefined ? null : (
            <AnatomyBadge
              badge={speaker}
              where="speaker"
              variant="quiet"
              size={13}
              ordinal={ordinal}
            />
          )}
          {revealed
            ? badges.row.map((badge) => (
                <AnatomyBadge
                  key={badge.info.key}
                  badge={badge}
                  where="row"
                  variant="chip"
                  ordinal={ordinal}
                />
              ))
            : null}
          {unit.marker === undefined ? null : (
            <span className="row-marker" lang="arc">
              {unit.marker}
            </span>
          )}
        </span>

        {handle === undefined || !revealed ? null : (
          <span className={`row-handle-group${inHandle ? " row-handle-group-badged" : ""}`}>
            <Tooltip
              width={300}
              content={
                <span className="legend-tip">
                  <span>{handleTitle}</span>
                  {inHandle ? (
                    <span className="legend-tip-leaves">
                      The badge after the divider says <i>how</i> the two statements relate; the handle only says
                      that they do.
                    </span>
                  ) : null}
                </span>
              }
            >
              <button
                type="button"
                className={`row-handle${handle.open ? " row-handle-open" : ""}`}
                onMouseEnter={() => onPeek(handle.targetId)}
                onMouseLeave={() => onPeek(undefined)}
                onFocus={() => onPeek(handle.targetId)}
                onBlur={() => onPeek(undefined)}
                onClick={onHandle}
                aria-pressed={handle.open ? handle.folded : undefined}
              >
                <span aria-hidden="true">↑</span> acts on {handle.ordinal} · {handle.label}
                {handleState === undefined ? null : (
                  <span className="row-handle-state">{handleState}</span>
                )}
              </button>
            </Tooltip>
            {inHandle ? (
              <span className={`row-handle-badges${handle.open ? " row-handle-badges-open" : ""}`}>
                {edgeBadges.map((badge) => edgeBadge(badge, "inline"))}
              </span>
            ) : null}
          </span>
        )}

        {handle === undefined && edgeBadges.length > 0 ? (
          <span className="row-badges">
            <span className="row-badges-label">
              {targetOrdinal === undefined ? "relation" : `to ${targetOrdinal}`}
            </span>
            {edgeBadges.map((badge) => edgeBadge(badge, "chip"))}
          </span>
        ) : null}

        <span className="row-text">{unit.en}</span>
        {unit.he === undefined ? null : (
          <span className="row-hebrew" lang="he" dir="rtl">
            {unit.he}
          </span>
        )}
      </div>

      <div className="row-verdict">
        {verdict === undefined ? null : <VerdictPill verdict={verdict} />}
        {!revealed || frontier ? null : (
          <button
            type="button"
            className="row-collapse"
            onClick={onCollapseTo}
            title="Fold the argument back up to this sentence"
            aria-label={`Fold the argument back up to sentence ${ordinal}`}
          >
            <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
              <path
                d="M4 9.5 L8 5.5 L12 9.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {frontier && (remaining > 0 || ordinal > 1) ? (
        <div className="row-advance">
          {remaining > 0 ? (
            <button type="button" className="advance" onClick={onAdvance}>
              <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                <path
                  d="M4 6 L8 10 L12 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              what happens next
              <span className="advance-count">{remaining} left</span>
            </button>
          ) : null}
          {ordinal <= 1 ? null : (
            <button
              type="button"
              className="advance advance-up"
              onClick={onRetreat}
              title="Fold the argument back up to the previous sentence"
              aria-label={`Fold the argument back up to sentence ${ordinal - 1}`}
            >
              <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                <path
                  d="M4 10 L8 6 L12 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      ) : null}
    </li>
  );
};
