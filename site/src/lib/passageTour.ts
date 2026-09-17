/**
 * The next/previous stop in the gallery, for the foot of a shipped passage.
 *
 * Order is `SUGYOT` order — the same order as the passage switcher — so
 * reordering that list reorders the tour. The first stop's href is `/`, not
 * `/sugya/<id>`: that is the homepage, and the back-arrow from the second
 * drawing should return a first-time reader there rather than to the same
 * drawing under a different URL. Every later stop is `/sugya/<id>`. The last
 * stop has no successor in the list; its "next" is the gallery.
 *
 * `/byo` is not a stop. A file the reader brought is not in the gallery, so
 * this module never runs on that route.
 */

import { SUGYOT } from '../rail/sugyot/index.ts';

/** The gallery index, slash-free. */
export const GALLERY_HREF = '/sugya';

export type TourStop = {
  readonly href: string;
  readonly title: string;
};

/** Where "Next visualization" goes: another drawing, or the gallery at the end. */
export type TourNext =
  | { readonly kind: 'passage'; readonly href: string; readonly title: string }
  | { readonly kind: 'gallery' };

export type Tour = {
  readonly prev?: TourStop;
  readonly next: TourNext;
};

const hrefOf = (index: number, id: string): string => (index === 0 ? '/' : `/sugya/${id}`);

const stopOf = (index: number): TourStop | undefined => {
  const sugya = SUGYOT[index];
  return sugya === undefined ? undefined : { href: hrefOf(index, sugya.id), title: sugya.title };
};

/** The tour around this passage, or nothing if the id is not one the site ships. */
export const tourOf = (id: string): Tour | undefined => {
  const index = SUGYOT.findIndex((s) => s.id === id);
  if (index < 0) return undefined;

  const prev = index > 0 ? stopOf(index - 1) : undefined;
  const prevPart = prev !== undefined ? { prev } : {};
  const nextStop = stopOf(index + 1);
  const next: TourNext =
    nextStop === undefined ? { kind: 'gallery' } : { kind: 'passage', ...nextStop };

  return { ...prevPart, next };
};
