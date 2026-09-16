import type { JSX } from "react";

import type { Badge } from "../../anatomy.ts";
import type { Unit } from "../../sugya.ts";
import type { Verdict } from "../../verdict.ts";
import { AnatomyBadge } from "./AnatomyBadge.tsx";
import { VerdictPill } from "./VerdictPill.tsx";

export type StateOfPlayEntry = {
  readonly unit: Unit;
  readonly verdict: Verdict | undefined;
  /** Moves still exerting force on this claim. */
  readonly open: number;
};

export type StateOfPlayProps = {
  readonly entries: readonly StateOfPlayEntry[];
  /** Pin it to the top of the viewport, for a passage too long to see at once. */
  readonly sticky?: boolean;
  /** Ch. 1: what kind of sugya this is, when the layer is showing it. */
  readonly party?: Badge;
};

/**
 * Where the opening claims stand right now. This is the point of the slider:
 * the same sentence can be accepted at one step and back in doubt at the next.
 *
 * The count of open challenges is here because over a long passage the verdict
 * stops moving. Ramchal's resting state is doubt, so a claim that is argued
 * over for fifty sentences reads "in doubt" for fifty sentences and the badge
 * says nothing. What moves is how many objections are standing against it, and
 * in a sugya built of thirteen successive challenges that is the score.
 */
export const StateOfPlay = ({
  entries,
  sticky = false,
  party,
}: StateOfPlayProps): JSX.Element | null => {
  if (entries.length === 0) return null;

  return (
    <div className={`state${sticky ? " state-sticky" : ""}`} aria-live="polite">
      <span className="state-label">Where it stands</span>
      {party === undefined ? null : (
        <span className="state-party">
          <AnatomyBadge badge={party} where="strip" variant="chip" size={16} />
        </span>
      )}
      <ul className="state-list">
        {entries.map(({ unit, verdict, open }) => (
          <li key={unit.id} className="state-item">
            <span className="state-claim">{unit.speaker ?? unit.short ?? unit.en.slice(0, 40)}</span>
            {verdict === undefined ? (
              <span className="pill pill-neutral pill-dashed">not yet argued</span>
            ) : (
              <VerdictPill verdict={verdict} />
            )}
            {open > 0 ? (
              <span className="state-open">
                {open} challenge{open === 1 ? "" : "s"} open
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};
