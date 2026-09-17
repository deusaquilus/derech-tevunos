import { useState } from 'react';
import { SugyaView } from '../rail/app/SugyaView.tsx';
import type { Sugya } from '../rail/sugya.ts';
import '../rail/app/styles.css';

/**
 * The island body: one parsed passage, drawn into the stage's sheet.
 *
 * Every route that draws a waterfall goes through here, so the two that exist
 * cannot drift — `Rail.tsx` hands it a passage the site ships, `Byo.tsx` hands
 * it a file the reader opened. It deliberately takes a `Sugya` and not an id:
 * the shipped route must resolve its own from the bundled registry rather than
 * have Astro serialise 31KB of passage into the page's HTML as island props.
 *
 * `client:only` is what both callers use, and it is the right directive rather
 * than `client:load`: the controller measures DOM geometry to place rails and
 * elbows, so there is no meaningful server render to hydrate from, and
 * attempting one produces a flash of unpositioned rows. It is also what makes
 * resolving the legend host synchronously safe below: this component never
 * runs without a `document`.
 */
export type RailSheetProps = {
  readonly sugya: Sugya;
  /** Reveal this many sentences on arrival; the rest step in on demand. */
  readonly start?: number;
  /**
   * Id of the element the legend renders into. The stage's panel, on the site.
   * Absent, or naming nothing in the document, the legend renders inline.
   */
  readonly legendHost?: string;
};

export const RailSheet = ({ sugya, start, legendHost }: RailSheetProps): React.ReactElement => {
  // Resolved once, on mount. The panel is server-rendered HTML, so it is in the
  // document before this island is; resolving it in an effect instead would
  // render the legend inline for a frame, measure the rows around it, then
  // move it and measure again.
  const [host] = useState<Element | undefined>(() =>
    legendHost === undefined ? undefined : (document.getElementById(legendHost) ?? undefined),
  );

  return (
    <SugyaView
      // Remount on a passage or step change so the controller measures fresh
      // geometry instead of reusing the previous passage's.
      key={`${sugya.id}@${start ?? 1}`}
      sugya={sugya}
      header={false}
      legendHost={host}
      // No `hint` here on purpose. `SugyaView` only forwards it to
      // `SugyaHeader`, which `header={false}` removes, so passing it would be
      // inert. The four research passages that author one have it rendered by
      // the Astro page instead — server-side, where it is crawlable.
      options={start === undefined ? undefined : { start }}
    />
  );
};

export default RailSheet;
