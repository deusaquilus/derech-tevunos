import { CRITERION, tallyOf, type LedgerRow } from "../circumscription/reading.ts";
import { formatCite } from "../source/cite.ts";

type Props = {
  readonly rows: readonly LedgerRow[];
};

const Row = ({ row }: { readonly row: LedgerRow }) => (
  <li className={`row row--${row.kind === "implied" ? "fragile" : "firm"}`}>
    <p className="row__sentence">{row.sentence}</p>
    <p className="row__because">{row.because}</p>
    <p className="row__meta">
      {row.rule !== undefined && <span className="tag">{row.rule}</span>}
      <span className="row__cite">{formatCite(row.cite)}</span>
    </p>
  </li>
);

/**
 * The two kinds of conclusion a first reading can act on: what was said, and
 * what was only read in. The Ch5 necessary inferences (contrapositives and
 * converses) stay in the engine and fold away here — they add no cells and do
 * not change any case on the page.
 */
export function Ledger({ rows }: Props) {
  const tally = tallyOf(rows);
  const primary = rows.filter((row) => row.kind !== "necessary");
  const necessary = rows.filter((row) => row.kind === "necessary");

  return (
    <div className="ledger">
      <dl className="key">
        <div className="key__item key__item--firm">
          <dt className="key__term">
            <span className="key__swatch key__swatch--firm" aria-hidden="true" />
            Solid — {tally.stated} said outright
          </dt>
          <dd className="key__def">{CRITERION.firm}</dd>
        </div>
        <div className="key__item key__item--fragile">
          <dt className="key__term">
            <span className="key__swatch key__swatch--fragile" aria-hidden="true" />
            Dashed — {tally.fragile} read in
          </dt>
          <dd className="key__def">{CRITERION.fragile}</dd>
        </div>
      </dl>

      <ul className="rows">
        {primary.map((row) => (
          <Row key={row.key} row={row} />
        ))}
      </ul>

      {necessary.length > 0 && (
        <details className="ledger__more">
          <summary className="ledger__more-summary">
            {necessary.length} necessary inference{necessary.length === 1 ? "" : "s"}{" "}
            folded away
            <span className="ledger__more-hint">
              Contrapositives and converses. They follow from the wording, but they
              talk about everything else and do not change any case on this page.
            </span>
          </summary>
          <ul className="rows rows--quiet">
            {necessary.map((row) => (
              <Row key={row.key} row={row} />
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
