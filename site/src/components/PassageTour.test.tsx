import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PassageTour } from './PassageTour.tsx';
import { GALLERY_HREF } from '../lib/passageTour.ts';

afterEach(cleanup);

describe('PassageTour', () => {
  it('shows only Next visualization on the first drawing', () => {
    const { getByRole, queryByRole } = render(
      <PassageTour
        tour={{ next: { kind: 'passage', href: '/sugya/next', title: 'The next one' } }}
      />,
    );
    const next = getByRole('link', { name: 'Next visualization' });
    expect(next.getAttribute('href')).toBe('/sugya/next');
    expect(next.getAttribute('title')).toBe('The next one');
    expect(queryByRole('link', { name: /previous visualization/i })).toBeNull();
  });

  it('keeps the back-arrow quieter than next, labelled by the previous title', () => {
    const { getByRole } = render(
      <PassageTour
        tour={{
          prev: { href: '/', title: 'Uncleanness of liquids' },
          next: { kind: 'passage', href: '/sugya/next', title: 'The next one' },
        }}
      />,
    );
    const back = getByRole('link', { name: 'Previous visualization: Uncleanness of liquids' });
    expect(back.getAttribute('href')).toBe('/');
    expect(back.className).toContain('sheet-tour-back');
    expect(getByRole('link', { name: 'Next visualization' }).className).toContain('sheet-tour-next');
  });

  it('sends the last drawing to the gallery', () => {
    const { getByRole, queryByRole } = render(
      <PassageTour
        tour={{
          prev: { href: '/sugya/prev', title: 'Previous' },
          next: { kind: 'gallery' },
        }}
      />,
    );
    const gallery = getByRole('link', { name: 'All passages' });
    expect(gallery.getAttribute('href')).toBe(GALLERY_HREF);
    expect(queryByRole('link', { name: 'Next visualization' })).toBeNull();
  });
});
