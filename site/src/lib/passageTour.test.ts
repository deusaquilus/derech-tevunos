import { describe, expect, it } from 'vitest';
import { SUGYOT } from '../rail/sugyot/index.ts';
import { GALLERY_HREF, tourOf } from './passageTour.ts';

const first = SUGYOT[0];
const second = SUGYOT[1];
const last = SUGYOT[SUGYOT.length - 1];
if (first === undefined || second === undefined || last === undefined) {
  throw new Error('SUGYOT is too short to have a tour');
}

describe('tourOf', () => {
  it('is undefined for an id the site does not ship', () => {
    expect(tourOf('not-a-passage')).toBeUndefined();
  });

  it('opens on the homepage with no back-arrow and the second drawing as next', () => {
    expect(tourOf(first.id)).toEqual({
      next: { kind: 'passage', href: `/sugya/${second.id}`, title: second.title },
    });
  });

  it('returns to `/` from the second drawing, not `/sugya/<first>`', () => {
    const third = SUGYOT[2];
    if (third === undefined) throw new Error('SUGYOT has no third');
    expect(tourOf(second.id)).toEqual({
      prev: { href: '/', title: first.title },
      next: { kind: 'passage', href: `/sugya/${third.id}`, title: third.title },
    });
  });

  it('walks the gallery in SUGYOT order after the homepage', () => {
    for (const [i, sugya] of SUGYOT.entries()) {
      // 0 is the homepage (no prev, `/` as the back-target); the last stop
      // goes to the gallery. Both have their own tests.
      if (i <= 1 || i === SUGYOT.length - 1) continue;
      const prev = SUGYOT[i - 1];
      const next = SUGYOT[i + 1];
      if (prev === undefined || next === undefined) continue;
      expect(tourOf(sugya.id)).toEqual({
        prev: { href: `/sugya/${prev.id}`, title: prev.title },
        next: { kind: 'passage', href: `/sugya/${next.id}`, title: next.title },
      });
    }
  });

  it('sends the last drawing to the gallery', () => {
    const prev = SUGYOT[SUGYOT.length - 2];
    if (prev === undefined) throw new Error('SUGYOT has no second-to-last');
    expect(tourOf(last.id)).toEqual({
      prev: { href: `/sugya/${prev.id}`, title: prev.title },
      next: { kind: 'gallery' },
    });
  });

  it('keeps the gallery slash-free', () => {
    expect(GALLERY_HREF).toBe('/sugya');
  });
});
