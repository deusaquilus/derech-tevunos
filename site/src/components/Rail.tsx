import { useMemo } from 'react';
import { SugyaView } from '../rail/app/SugyaView.tsx';
import { sugyaById } from '../rail/sugyot/index.ts';
import '../rail/app/styles.css';

/**
 * The rail visualization, embedded in a site page.
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
 *
 * `client:only` is the right directive rather than `client:load`: the
 * controller measures DOM geometry to place rails and elbows, so there is no
 * meaningful server render to hydrate from, and attempting one produces a
 * flash of unpositioned rows.
 */
export type RailProps = {
  readonly id: string;
  /** Reveal this many sentences on arrival; the rest step in on demand. */
  readonly start?: number;
};

export const Rail = ({ id, start }: RailProps): React.ReactElement => {
  const sugya = useMemo(() => sugyaById(id), [id]);

  if (sugya === undefined) {
    return (
      <p className="rail-missing">
        No passage with id <code>{id}</code>.
      </p>
    );
  }

  return (
    <SugyaView
      // Remount on a passage or step change so the controller measures fresh
      // geometry instead of reusing the previous passage's.
      key={`${sugya.id}@${start ?? 1}`}
      sugya={sugya}
      header={false}
      // No `hint` here on purpose. `SugyaView` only forwards it to
      // `SugyaHeader`, which `header={false}` removes, so passing it would be
      // inert. The four research passages that author one have it rendered by
      // the Astro page instead — server-side, where it is crawlable.
      options={start === undefined ? undefined : { start }}
    />
  );
};

export default Rail;
