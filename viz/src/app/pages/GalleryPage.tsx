import type { JSX } from "react";

import { movementsOf, type Collection, type Sugya } from "../../sugya.ts";
import { Link } from "../router.tsx";
import { useOpened, useSugyot } from "../sugyot.ts";

const WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const count = (n: number): string => WORDS[n] ?? String(n);

const Cards = ({ sugyot }: { readonly sugyot: readonly Sugya[] }): JSX.Element => (
  <ul className="gallery-grid">
    {sugyot.map((sugya) => (
      <li key={sugya.id}>
        <Link to={`/sugya/${sugya.id}`} className="card">
          <span className="card-cite">
            {sugya.tractate} {sugya.folio}
          </span>
          <span className="card-title">{sugya.title}</span>
          <span className="card-meta">
            {sugya.units.length} sentences · {movementsOf(sugya).length} movements
          </span>
        </Link>
      </li>
    ))}
  </ul>
);

/**
 * What each shelf is, said once here. The book's passages come first and
 * unheaded, under the page's own lead; a passage whose `collection` is not
 * one of these — or is absent — is shown under its own heading, unexplained.
 */
const SHELVES: readonly { readonly collection: Collection; readonly heading?: string; readonly lead?: JSX.Element }[] = [
  { collection: "ramchal" },
  {
    collection: "research",
    heading: "Research passages",
    lead: (
      <p className="gallery-lead">
        The opening sugyot of four tractates, labelled from stock phrases for the study of nested
        folds and rails rather than taken from Ramchal&rsquo;s discussion. They are here so the
        folds inside folds, and the rail inside a rail, can be seen on the pages that produce them.
      </p>
    ),
  },
];

const Shelf = ({
  heading,
  lead,
  sugyot,
}: {
  readonly heading?: string;
  readonly lead?: JSX.Element;
  readonly sugyot: readonly Sugya[];
}): JSX.Element | null =>
  sugyot.length === 0 ? null : (
    <>
      {heading === undefined ? null : <h3 className="gallery-heading">{heading}</h3>}
      {lead}
      <Cards sugyot={sugyot} />
    </>
  );

/**
 * The way through to the loader: a different page, which draws a file with
 * the same lattice and none of this one's tabs.
 */
const OpenFile = (): JSX.Element => {
  const opened = useOpened();
  return (
    <section className="gallery-open">
      <h3 className="gallery-heading">Open a file</h3>
      <p className="gallery-lead">
        A passage of your own, written in the sugya file format
        (<code>SUGYA_JSON_FORMAT.md</code>), is drawn on a page of its own — the same lattice as
        these, and none of this chrome.
      </p>
      <Link to="/open" className="advance advance-lead gallery-open-link">
        Open a sugya file…
      </Link>
      {opened.length === 0 ? null : (
        <span className="gallery-open-count">
          {opened.length === 1 ? "one file" : `${opened.length} files`} open on that page
        </span>
      )}
    </section>
  );
};

/**
 * The index. A different page from the reader — an overview, not a reading —
 * built from the same data the visualization renders. Each card links to that
 * passage's own page.
 */
export const GalleryPage = (): JSX.Element => {
  const sugyot = useSugyot();
  const shelved = new Set(SHELVES.map((s) => s.collection));
  const unshelved = sugyot.filter((s) => s.collection === undefined || !shelved.has(s.collection));
  return (
    <section className="gallery">
      <p className="gallery-lead">
        {count(sugyot.length)} passages, from a four-sentence ruling to a seventy-seven-sentence
        elimination. Open one to walk through it a sentence at a time.
      </p>
      {SHELVES.map(({ collection, heading, lead }) => (
        <Shelf
          key={collection}
          heading={heading}
          lead={lead}
          sugyot={sugyot.filter((s) => s.collection === collection)}
        />
      ))}
      <Shelf heading="Other passages" sugyot={unshelved} />
      <OpenFile />
    </section>
  );
};
