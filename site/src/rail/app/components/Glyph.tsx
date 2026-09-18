import type { JSX } from "react";

import { hueOf, type AnatomyKey } from "../../anatomy.ts";
import { GLYPHS, glyphAspect, glyphBox } from "../../glyphs.ts";
import { LIGHT } from "../../theme.ts";

export type GlyphProps = {
  readonly kind: AnatomyKey;
  /** The glyph's height. Its width follows the icon's frame: square, or half again for the wide three. */
  readonly size?: number;
  readonly className?: string;
};

/**
 * One anatomy-layer glyph, in its family's hue. The bodies are the generated
 * SVG in `glyphs.ts`, drawn in `currentColor`, so the hue is one CSS colour
 * set here and nowhere else. The three wide chapter 5 icons are drawn in
 * their own 36×24 frame, so `size` is a height and the width follows.
 */
export const Glyph = ({ kind, size = 16, className }: GlyphProps): JSX.Element => (
  <svg
    className={`glyph${className === undefined ? "" : ` ${className}`}`}
    width={size * glyphAspect(kind)}
    height={size}
    viewBox={glyphBox(kind)}
    style={{ color: LIGHT.hue[hueOf(kind)] }}
    aria-hidden="true"
    dangerouslySetInnerHTML={{ __html: GLYPHS[kind] }}
  />
);
