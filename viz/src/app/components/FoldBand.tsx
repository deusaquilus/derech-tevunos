import type { JSX } from "react";

import type { Band, FoldSummary } from "../../folding.ts";

export type FoldBandProps = {
  /** The band's key, for the toggle and for scrolling to it. */
  readonly bandKey: string;
  readonly kind: Band["kind"];
  readonly summary: FoldSummary;
  /** `between … and …` for a frame, `under …` for a thread. */
  readonly caption: string;
  /** Left edge in pixels: where the anchor's children's icons sit. */
  readonly inset: number;
  /** Nesting level, for styling; one for a band under a root. */
  readonly depth: number;
  readonly onToggle: () => void;
  /** Hover: peek the anchor the band hangs under. */
  readonly onPeek: (peeking: boolean) => void;
};

const NAMED = 3;

const movementNames = (summary: FoldSummary): string => {
  const names = summary.movements.map((m) => m.opening.short ?? m.opening.id);
  if (names.length === 0) return "";
  if (names.length <= NAMED) return names.join(", ");
  const rest = names.length - NAMED;
  return `${names.slice(0, NAMED).join(", ")}, and ${rest} more`;
};

/**
 * Stands in for the sentences a fold hides. It says how many, names the
 * relation or the anchor it puts away, names the first few movements, and
 * states how many challenges among them still stand — the one number a reader
 * could otherwise be misled about, since a folded run of answered challenges
 * and a folded run of open ones look the same from outside.
 *
 * It sits where its anchor's children sit, so a band inside a band is seen to
 * be inside: a thread under a candidate answer starts one step further in
 * than the frame that held the candidates.
 */
export const FoldBand = ({
  bandKey,
  kind,
  summary,
  caption,
  inset,
  depth,
  onToggle,
  onPeek,
}: FoldBandProps): JSX.Element => {
  // A thread whose rows all belong to one movement has nothing to name that
  // the caption has not.
  const names = kind === "thread" && summary.movements.length <= 1 ? "" : movementNames(summary);
  // "Unanswered", not "open": a refutation that was never answered is doing
  // its work, and a difficulty that was never answered is still a problem.
  // The band says only which count applies; the strip above says to whom.
  const standing =
    summary.movements.length === 0
      ? undefined
      : summary.standing === 0
        ? "all answered"
        : summary.standing === 1
          ? "1 unanswered"
          : `${summary.standing} unanswered`;
  const count = `${summary.sentences} ${summary.sentences === 1 ? "sentence" : "sentences"} folded`;

  return (
    <li
      className={`fold fold-${kind}`}
      data-key={bandKey}
      data-depth={depth}
      style={{ marginLeft: inset }}
      aria-label={`${count} ${caption}`}
    >
      <button
        type="button"
        className="fold-button"
        onClick={onToggle}
        onMouseEnter={() => onPeek(true)}
        onMouseLeave={() => onPeek(false)}
        onFocus={() => onPeek(true)}
        onBlur={() => onPeek(false)}
      >
        <span className="fold-count">{count}</span>
        <span className="fold-caption">{caption}</span>
        {names !== "" ? <span className="fold-names">{names}</span> : null}
        {standing !== undefined ? <span className="fold-standing">{standing}</span> : null}
        <span className="fold-hint">unfold</span>
      </button>
    </li>
  );
};
