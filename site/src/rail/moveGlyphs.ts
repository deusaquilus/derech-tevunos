/**
 * The chapter 9 *subtype* drawings as inline SVG bodies, generated from
 * `icons_v3/icons/ch9-subtypes/` by `scripts/extract-glyphs.ts`.
 *
 *     npm run glyphs
 *
 * Do not edit by hand. These are the only part of the chapter 9 picture that
 * lives as SVG: the seven parent silhouettes are geometry in `icons.ts`,
 * shared by the React view and the static export, and are copied out to the
 * icon set rather than read from it. A subtype drawing is the parent's own
 * vocabulary with the distinguishing detail added — the proof thumb inside a
 * monitor for a demonstration, two of them facing for a validation — so the
 * two sources agree by construction.
 *
 * Seven of the nineteen leaves have one. The rest are drawn as their parent
 * move with the subtype's name beside them, which is what the icon set
 * intends (`icons_v3/ICONS_REFERENCE_V2.md` §11.2); direct contradiction
 * shares the parent's red X on purpose rather than for want of a picture.
 *
 * Every colour is `currentColor`, including the element hue: a row paints
 * the icon grey while its sentence is still hidden, and fades it as the move
 * is answered.
 */

import type { MoveKey } from "./taxonomy.ts";

export const MOVE_GLYPHS: Partial<Record<MoveKey, string>> = {
  "proof/demonstration": '<g fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"> <rect x="-9.8" y="-9.8" width="19.6" height="15" rx="1.65"/> <path d="M0 5.2v4.1M-4.7 9.3h9.4"/> </g> <g transform="translate(0 -2.4) scale(.70)" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"> <rect x="-8.4" y="-1.4" width="4.8" height="9.6" rx="1.3"/> <path d="M -2.1 8.2 L -2.1 -0.6 C -1 -0.9, -0.3 -1.7, 0 -2.7 L 1.1 -6.6 C 1.4 -7.8, 3.5 -7.7, 3.5 -6.1 L 3.5 -2.5 L 6.3 -2.5 C 7.7 -2.5, 8.5 -1.2, 8.1 0.1 L 6.5 6.3 C 6.2 7.5, 5.3 8.2, 4.2 8.2 Z"/> </g>',
  "proof/validation": '<g transform="translate(-5.45 -.4) scale(.56 .70)" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"> <rect x="-8.4" y="-1.4" width="4.8" height="9.6" rx="1.3"/> <path d="M -2.1 8.2 L -2.1 -0.6 C -1 -0.9, -0.3 -1.7, 0 -2.7 L 1.1 -6.6 C 1.4 -7.8, 3.5 -7.7, 3.5 -6.1 L 3.5 -2.5 L 6.3 -2.5 C 7.7 -2.5, 8.5 -1.2, 8.1 0.1 L 6.5 6.3 C 6.2 7.5, 5.3 8.2, 4.2 8.2 Z"/> </g> <g transform="translate(5.45 -.4) scale(-.56 .70)" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"> <rect x="-8.4" y="-1.4" width="4.8" height="9.6" rx="1.3"/> <path d="M -2.1 8.2 L -2.1 -0.6 C -1 -0.9, -0.3 -1.7, 0 -2.7 L 1.1 -6.6 C 1.4 -7.8, 3.5 -7.7, 3.5 -6.1 L 3.5 -2.5 L 6.3 -2.5 C 7.7 -2.5, 8.5 -1.2, 8.1 0.1 L 6.5 6.3 C 6.2 7.5, 5.3 8.2, 4.2 8.2 Z"/> </g>',
  "contradiction/opposition": '<circle cx="0" cy="-4.3" r="5.8" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.45"/> <path d="M-2.6 -6.9l5.2 5.2M2.6 -6.9l-5.2 5.2" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/> <g fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round"> <path d="M0 1.5v2.7M0 4.2l-7.5 5M0 4.2l7.5 5"/> <path d="M-7.5 5.6v3.6h3.6M7.5 5.6v3.6H3.9"/> </g>',
  "difficulty/objection": '<path d="M 0 -8.6 L 8.2 6.5 C 8.7 7.5, 8.1 8.4, 7.1 8.4 L -7.1 8.4 C -8.1 8.4, -8.7 7.5, -8.2 6.5 Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"/> <g fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"> <path d="M-4.65 3.7h1.5M-3.75 1.8h1.1"/> <path d="M.25 .4L1.1 1.65M.35 6.15l.8-.95"/> </g> <circle cx="-.65" cy="3.7" r="1.15" fill="currentColor"/> <rect x="2" y=".2" width="1.65" height="6.25" rx=".55" fill="currentColor"/>',
  "difficulty/apparentContradiction": '<path d="M 0 -8.6 L 8.2 6.5 C 8.7 7.5, 8.1 8.4, 7.1 8.4 L -7.1 8.4 C -8.1 8.4, -8.7 7.5, -8.2 6.5 Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"/> <g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"> <path d="M-3.55 1.2l2.2 2.4-2.2 2.4"/> <path d="M3.55 1.2l-2.2 2.4 2.2 2.4"/> </g>',
  "resolution/settlement": '<g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"> <path d="M-3.6 3.2C-4.4 1.9-7.4 .2-7.4-3.15C-7.4-6.55-4.25-8.5 0-8.5C4.25-8.5 7.4-6.55 7.4-3.15C7.4 .2 4.4 1.9 3.6 3.2Z" fill="currentColor" fill-opacity=".15" stroke-width="1.4"/> <path d="M-3.2 5.6h6.4M-2.1 8.1h4.2" fill="none" stroke-width="1.5"/> </g><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"> <path d="M-4.25 .65h1.5M2.75 .65h1.5"/> </g> <g fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"> <path d="M-3.5 .65V-3.7Q-3.5-5.05-2.15-5.05H2.15Q3.5-5.05 3.5-3.7V.65"/> <path d="M-1.65-1.45l1.2 1.3L1.9-2.5" stroke-width="1.3"/> </g>',
  "resolution/alternative": '<g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"> <path d="M-3.6 3.2C-4.4 1.9-7.4 .2-7.4-3.15C-7.4-6.55-4.25-8.5 0-8.5C4.25-8.5 7.4-6.55 7.4-3.15C7.4 .2 4.4 1.9 3.6 3.2Z" fill="currentColor" fill-opacity=".15" stroke-width="1.4"/> <path d="M-3.2 5.6h6.4M-2.1 8.1h4.2" fill="none" stroke-width="1.5"/> </g><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"> <path d="M-4.25 .65h1.5M2.75 .65h1.5"/> </g> <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"> <path d="M-3.5 .65V-.05M3.5 .65V-.05" stroke-width="1.15"/> <path d="M-3.5-1.8V-3.7Q-3.5-5.05-2.15-5.05H2.15Q3.5-5.05 3.5-3.7V-1.8" stroke-width="1.15" stroke-dasharray=".1 1.85"/> <circle cx="0" cy="-1.45" r="1.3" stroke-width="1.1"/> </g>',
};

/** The frame every subtype drawing is in; the same one `ElementIcon` uses. */
export const MOVE_BOX = "-12 -12 24 24";

export const moveGlyph = (key: MoveKey): string | undefined => MOVE_GLYPHS[key];
