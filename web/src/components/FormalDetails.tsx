import { describeFiberIndex, formatLattice, type Lattice } from "../lattice/fca.ts";
import type { Fixture } from "../lattice/fixtures.ts";

type Props = {
  readonly fixture: Fixture;
  readonly floor: Lattice;
  readonly ceiling: Lattice;
  readonly consistentContexts: number;
};

/**
 * The formal reading, folded away. Notation is printed from the engine rather
 * than transcribed, so it cannot drift from what is actually being computed.
 */
export function FormalDetails({ fixture, floor, ceiling, consistentContexts }: Props) {
  const { context, predicates } = fixture;

  return (
    <details className="formal">
      <summary className="formal__summary">
        The formal version <span className="formal__hint">for the curious</span>
      </summary>

      <div className="formal__body">
        <p>
          The cases and questions form a formal context, three-valued because one cell is
          in doubt. A bucket is a formal concept. The two panels above are the concept
          lattices of the floor context, where doubt reads as no, and the ceiling context,
          where doubt reads as yes — the interval that bounds what is known.
        </p>

        <div className="formal__lattices">
          <div>
            <h4>Floor, doubt as no</h4>
            <pre>{formatLattice(floor, context)}</pre>
          </div>
          <div>
            <h4>Ceiling, doubt as yes</h4>
            <pre>{formatLattice(ceiling, context)}</pre>
          </div>
        </div>

        <dl className="formal__facts">
          <div>
            <dt>Attributes</dt>
            <dd>
              {predicates.map((term) => `${term.id} = ${term.short}`).join(", ")}
            </dd>
          </div>
          <div>
            <dt>Consistent contexts</dt>
            <dd>
              {consistentContexts} — that is 2<sup>k</sup> for k doubtful cells
            </dd>
          </div>
          <div>
            <dt>Fiber</dt>
            <dd>
              aspect {describeFiberIndex(context.fiber.index)}, modality{" "}
              {context.fiber.modality ?? "not indexed in source"}
            </dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>
              {fixture.cite.tractate} {fixture.cite.folio}, Derech Tevunos ch.{" "}
              {fixture.cite.chapter}, pp. {fixture.cite.pages[0]}–{fixture.cite.pages[1]}
            </dd>
          </div>
        </dl>

        <p className="formal__caveat">
          Concept count is not monotone in the incidence relation, which is why settling a
          cell can shrink the lattice rather than grow it. The two lattices have different
          concept sets and no canonical map between them, so the panels are drawn separately
          and “only exists on this side” compares buckets by membership. Concepts are
          enumerated with Ganter’s NextClosure; the exact acceptance test is in{" "}
          <code>src/lattice/fca.test.ts</code>.
        </p>
      </div>
    </details>
  );
}
