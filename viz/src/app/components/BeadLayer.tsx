import type { JSX } from "react";

import { hueOf } from "../../anatomy.ts";
import { BUSY_GLYPHS, GLYPHS } from "../../glyphs.ts";
import { LIGHT } from "../../theme.ts";
import type { Bead } from "../useSugyaController.ts";

export type BeadLayerProps = {
  readonly beads: readonly Bead[];
  readonly width: number;
  readonly height: number;
  /** The move whose edge badge is under the pointer, chip or bead. */
  readonly hotEdge: string | undefined;
  readonly onHover: (id: string | undefined) => void;
};

/**
 * Edge-level badges drawn on the elbows they describe — a small disc at the
 * midpoint of the vertical run, holding the glyph. It is the *same* badge as
 * the chip on the row, and the two are linked: pointing at either lights both.
 * The chip is the one that is always there; the bead is drawn only where an
 * elbow already is and has room, and this whole layer is one switch
 * (`BEADS_ON_ELBOWS`) away from being dropped.
 *
 * A bead carries no popup of its own. It is 17px of glyph in a gutter, too
 * small to be where a paragraph of explanation belongs, and a popup opening
 * beside it covered the chip it was telling the reader about. Pointing at one
 * lights the chip instead and puts a one-line hint on it, and the chip — which
 * has the words next to it — does the explaining.
 *
 * Above the rows, like the rail, so the beads can take the pointer; the SVG
 * itself takes none.
 */
export const BeadLayer = ({
  beads,
  width,
  height,
  hotEdge,
  onHover,
}: BeadLayerProps): JSX.Element | null => {
  if (beads.length === 0) return null;

  return (
    <svg className="beads" width={width} height={height}>
      {beads.map((bead) => {
        const { at, r, badge } = bead;
        const colour = LIGHT.hue[hueOf(badge.info.key)];
        const hot = hotEdge === bead.id;
        const inner = r * 1.35;
        return (
          <g
            key={bead.id}
            data-id={bead.id}
            className={`bead${hot ? " bead-hot" : ""}`}
            style={{ color: colour }}
            tabIndex={0}
            aria-label={`${badge.info.en}: ${badge.info.reads}. Sentence ${bead.ordinal} on sentence ${bead.targetOrdinal}.`}
            onMouseEnter={() => onHover(bead.id)}
            onMouseLeave={() => onHover(undefined)}
            onFocus={() => onHover(bead.id)}
            onBlur={() => onHover(undefined)}
          >
            {hot ? <circle className="bead-ring" cx={at.x} cy={at.y} r={r + 3} /> : null}
            <circle className="bead-disc" cx={at.x} cy={at.y} r={r} />
            {BUSY_GLYPHS.has(badge.info.key) ? (
              <circle className="bead-dot" cx={at.x} cy={at.y} r={Math.max(2.5, r * 0.36)} />
            ) : (
              <svg
                x={at.x - inner / 2}
                y={at.y - inner / 2}
                width={inner}
                height={inner}
                viewBox="-12 -12 24 24"
                dangerouslySetInnerHTML={{ __html: GLYPHS[badge.info.key] }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
