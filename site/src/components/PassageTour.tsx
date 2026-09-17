import type { JSX } from 'react';
import { GALLERY_HREF, type Tour, type TourNext } from '../lib/passageTour.ts';

/**
 * The foot's way out of this drawing into another one.
 *
 * "next sentence" stays a control on this page. These are links, on purpose:
 * they leave the page, so they must not wear the same pill. The back chevron
 * is quieter and smaller because the discovery problem is forward — a
 * first-time reader on the homepage does not know there is a next drawing.
 * The marks are SVGs, the same stroke as the strip's chevron: a "←" glyph at
 * 11px on this paper vanished. `/byo` does not mount this.
 */
export const PassageTour = ({ tour }: { readonly tour: Tour }): JSX.Element => (
  <nav className="sheet-tour" aria-label="Other visualizations">
    {tour.prev !== undefined ? (
      <a
        className="sheet-tour-back"
        href={tour.prev.href}
        title={tour.prev.title}
        aria-label={`Previous visualization: ${tour.prev.title}`}
      >
        <Chevron dir="left" />
      </a>
    ) : null}
    <TourNextLink next={tour.next} />
  </nav>
);

const TourNextLink = ({ next }: { readonly next: TourNext }): JSX.Element => {
  switch (next.kind) {
    case 'passage':
      return (
        <a className="sheet-tour-next" href={next.href} title={next.title}>
          Next visualization
          <Chevron dir="right" />
        </a>
      );
    case 'gallery':
      return (
        <a className="sheet-tour-next" href={GALLERY_HREF}>
          All passages
          <Chevron dir="right" />
        </a>
      );
    default: {
      const exhaustive: never = next;
      return exhaustive;
    }
  }
};

/** Same stroke as the strip's more-chevron; left and right are a rotation of one path. */
const Chevron = ({ dir }: { readonly dir: 'left' | 'right' }): JSX.Element => (
  <svg
    className="sheet-tour-chevron"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {dir === 'left' ? <path d="m15 6-6 6 6 6" /> : <path d="m9 6 6 6-6 6" />}
  </svg>
);
