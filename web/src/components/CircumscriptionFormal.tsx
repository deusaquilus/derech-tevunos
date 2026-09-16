import type { Analysis, Diff } from "../circumscription/closure.ts";
import type { Fixture } from "../circumscription/fixtures.ts";
import { describeFiberIndex, formatLattice } from "../lattice/fca.ts";

type Props = {
  readonly fixture: Fixture;
  readonly literal: Analysis;
  readonly readIn: Analysis;
  readonly diff: Diff;
};

/**
 * The formal reading, folded away. Notation is printed from the engine rather
 * than transcribed, so it cannot drift from what is computed.
 */
export function CircumscriptionFormal({ fixture, literal, readIn, diff }: Props) {
  const { fiber } = fixture.source;

  return (
    <details className="formal">
      <summary className="formal__summary">
        The formal version <span className="formal__hint">for the curious</span>
      </summary>

      <div className="formal__body">
        <p>
          Two closures of the same asserted context. <code>I_mono</code> holds the
          statements plus the Ch5 necessary inferences; <code>I_circ</code> adds the{" "}
          <span lang="he" dir="rtl">
            דיוק
          </span>{" "}
          negations, scoped to the siblings of the mentioned subject within its
          immediate parent class. Incidence is signed, so positive and negative
          information are separate and disjoint sets rather than one three-valued
          matrix, and the context below carries a column per polarity. A group above
          is a formal concept; the lattices are its concepts by rank.
        </p>

        <div className="formal__lattices">
          <div>
            <h4>
              <code>𝔅(I_mono)</code> — stated only
            </h4>
            <pre>{formatLattice(literal.lattice, literal.context)}</pre>
          </div>
          <div>
            <h4>
              <code>𝔅(I_circ)</code> — with the defaults read in
            </h4>
            <pre>{formatLattice(readIn.lattice, readIn.context)}</pre>
          </div>
        </div>

        <dl className="formal__facts">
          <div>
            <dt>Defeasible cells</dt>
            <dd>
              {diff.fragileFacts.length} in <code>I_circ \ I_mono</code>
            </dd>
          </div>
          <div>
            <dt>Fragile cover edges</dt>
            <dd>{diff.fragileEdgeCount} present only under the defaults</dd>
          </div>
          <div>
            <dt>Concepts gained / lost</dt>
            <dd>
              {diff.fragileExtents.size} / {diff.lostExtents.size}, compared by extent
            </dd>
          </div>
          <div>
            <dt>Fiber</dt>
            <dd>
              aspect {describeFiberIndex(fiber.index)}, modality{" "}
              {fiber.modality ?? "not indexed in source"}
            </dd>
          </div>
        </dl>

        <p className="formal__caveat">
          The diff is taken by extent — which cases sit together — because the two
          closures have different concept sets and no canonical map between them. The
          Ch5 necessary inferences are contrapositives and converses, which speak about
          the complement classes; those are not rows of this context, so they add no cells
          and the ledger folds them away. The closure is recomputed from the statements in
          force at each stage rather than accumulated, which is what lets it shrink. The
          acceptance test is in <code>src/circumscription/closure.test.ts</code>.
        </p>
      </div>
    </details>
  );
}
