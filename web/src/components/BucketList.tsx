import type { Bucket } from "../lattice/buckets.ts";
import type { Fixture } from "../lattice/fixtures.ts";
import { CaseDiagram } from "./CaseDiagram.tsx";

type Props = {
  readonly buckets: readonly Bucket[];
  readonly onlyHere: ReadonlySet<number>;
  readonly fixture: Fixture;
};

export function BucketList({ buckets, onlyHere, fixture }: Props) {
  const termOf = (id: string) => fixture.subjects.find((subject) => subject.id === id);

  return (
    <ul className="buckets">
      {buckets.map((bucket) => {
        const unmatched = onlyHere.has(bucket.members);

        return (
          <li key={bucket.key} className={`bucket${unmatched ? " bucket--unmatched" : ""}`}>
            <div className="bucket__head">
              <span className="bucket__title">{bucket.title}</span>
              <span className="bucket__count">
                {bucket.memberIds.length} of {fixture.subjects.length}
              </span>
            </div>
            <div className="bucket__members">
              {bucket.memberIds.map((id) => {
                const term = termOf(id);
                if (term === undefined) return null;
                return (
                  <span className="chip" key={id}>
                    <CaseDiagram diagram={term.diagram} size="chip" />
                    {term.chip}
                  </span>
                );
              })}
            </div>
            {unmatched && <p className="bucket__note">Only exists on this side</p>}
          </li>
        );
      })}
    </ul>
  );
}
