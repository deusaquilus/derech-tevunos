import type { JSX } from "react";

import { hueOf, type AnatomyKey } from "../../anatomy.ts";
import { GLYPHS } from "../../glyphs.ts";
import { LIGHT } from "../../theme.ts";

export type GlyphProps = {
  readonly kind: AnatomyKey;
  readonly size?: number;
  readonly className?: string;
};

/**
 * One chapter 1–7 glyph, in its family's hue. The bodies are the generated
 * SVG in `glyphs.ts`, drawn in `currentColor`, so the hue is one CSS colour
 * set here and nowhere else.
 */
export const Glyph = ({ kind, size = 16, className }: GlyphProps): JSX.Element => (
  <svg
    className={`glyph${className === undefined ? "" : ` ${className}`}`}
    width={size}
    height={size}
    viewBox="-12 -12 24 24"
    style={{ color: LIGHT.hue[hueOf(kind)] }}
    aria-hidden="true"
    dangerouslySetInnerHTML={{ __html: GLYPHS[kind] }}
  />
);
