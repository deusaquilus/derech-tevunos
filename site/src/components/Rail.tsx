import { useMemo } from 'react';
import { RailSheet } from './RailSheet.tsx';
import { sugyaById } from '../rail/sugyot/index.ts';

/**
 * A shipped passage, embedded in a site page.
 *
 * This is the whole integration surface, and it is deliberately thin. The
 * visualization used to be a standalone app with its own shell — a title, a
 * blurb, a passage-switcher strip — and its own dependency-free hash router.
 * None of that is used here:
 *
 *   - **Astro owns routing.** Each passage is a real page at `/sugya/<id>`,
 *     generated at build time from `SUGYOT`, so the passages are crawlable and
 *     linkable. The hash router (`#/sugya/<id>`) is still what `viz`'s own dev
 *     server uses, and nothing here touches it.
 *   - **Astro owns the chrome.** `header={false}` is a prop `SugyaView`
 *     already offers for exactly this case, so the site's nav and page header
 *     are the only header, and there is no second `<h1>` reading "Sugya
 *     lattice" underneath the site's own.
 *   - **Only the sheet is a React island.** The gallery, the page headers and
 *     the passage switcher are Astro components and ship as HTML.
 *   - **The legend renders into the strip's panel**, an element the Astro
 *     stage owns and names by id. A React portal puts the key and its
 *     switches there, so they take no height on the sheet and open with the
 *     passages; the switches stay wired to the controller because they are
 *     still React children of the view.
 *
 * The drawing itself is `RailSheet.tsx`, which `/byo` shares. Resolving the
 * passage here rather than there is what keeps the registry out of that
 * route's bundle and out of this page's HTML: the id is three words, the
 * passage is up to 31KB.
 */
export type RailProps = {
  readonly id: string;
  /** Reveal this many sentences on arrival; the rest step in on demand. */
  readonly start?: number;
  /** Id of the element the legend renders into. The stage's panel, on the site. */
  readonly legendHost?: string;
};

export const Rail = ({ id, start, legendHost }: RailProps): React.ReactElement => {
  const sugya = useMemo(() => sugyaById(id), [id]);

  if (sugya === undefined) {
    return (
      <p className="rail-missing">
        No passage with id <code>{id}</code>.
      </p>
    );
  }

  return <RailSheet sugya={sugya} start={start} legendHost={legendHost} />;
};

export default Rail;
