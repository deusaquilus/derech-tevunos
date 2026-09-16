import type { Bucket } from "../lattice/buckets.ts";
import type { Fixture } from "../lattice/fixtures.ts";
import { BucketList } from "./BucketList.tsx";

/** Whether this side of the interval is the one the reader has committed to. */
export type PanelState = "chosen" | "ruled-out" | "possible";

type Props = {
  readonly heading: string;
  readonly state: PanelState;
  readonly buckets: readonly Bucket[];
  readonly onlyHere: ReadonlySet<number>;
  readonly fixture: Fixture;
};

const STATE_LABEL: Readonly<Record<PanelState, string>> = {
  chosen: "the law now",
  "ruled-out": "ruled out",
  possible: "still possible",
};

/**
 * One bound of the interval. The two panels are drawn separately and never
 * joined, because the two lattices have different concept sets and no natural
 * map between them (§5.1, failure modes).
 */
export function WorldPanel({ heading, state, buckets, onlyHere, fixture }: Props) {
  return (
    <section className={`world world--${state}`} aria-label={heading}>
      <header className="world__header">
        <h3 className="world__heading">{heading}</h3>
        <span className={`tag${state === "chosen" ? " tag--accent" : ""}`}>
          {STATE_LABEL[state]}
        </span>
      </header>
      <p className="world__count">
        <strong>{buckets.length}</strong>
        <span>
          kinds of case
          <br />
          the law can tell apart
        </span>
      </p>
      <BucketList buckets={buckets} onlyHere={onlyHere} fixture={fixture} />
    </section>
  );
}
