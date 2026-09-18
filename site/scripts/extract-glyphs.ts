/**
 * Regenerates `src/rail/glyphs.ts` and `src/rail/moveGlyphs.ts` from the icon
 * set in `../icons_v3/icons/`.
 *
 *     npm run glyphs          (from viz/)
 *
 * The icon set is the source of truth for what a badge looks like; this script
 * is the only path from it into the app, so the app can never drift a
 * generation behind again (v4 shipped the first-pass glyphs and kept them
 * through two redesigns). What it does to each SVG:
 *
 *   - keeps the body — everything inside `<svg>` but the `<title>` and
 *     `<desc>` — as one line, in the icon's own coordinate frame (`viewBox` is
 *     recorded, not rewritten: three chapter 5 icons are 36×24);
 *   - replaces every family hue (violet, teal, slate, magenta) with
 *     `currentColor`, so one body serves every state and the family decides
 *     the colour (`anatomy.ts`, `theme.ts`). White stays white: it is the
 *     surface, and the chapter 8 floor glyphs are cut out of the floor in it;
 *   - lays the one light tint the set uses (`#ede9fe`, the front tile of
 *     `equivalent`, opaque so the ghost behind does not show through) as a
 *     white copy under a 15 % `currentColor` copy, which is what that tint is;
 *   - keeps `<defs>`, gradient and clipPath ids as they are. The set gives
 *     each chapter 8 icon its own gradient id (`fade-<key>`) precisely so the
 *     markup can be inlined many times on one page; `stop-color` becomes
 *     `currentColor` like every other hue and inherits from the badge;
 *   - refuses to write if an icon has no vocabulary entry, an entry has no
 *     icon, or a hue survives that is neither white, an element colour, nor
 *     `currentColor`.
 *
 * Element colours survive literally because chapter 10's two composites embed
 * a chapter 9 glyph inside a slate document: the carrier is the family hue and
 * becomes `currentColor`, the green thumb or orange triangle inside it stays
 * the colour that move is everywhere else. The allowed set is read from
 * `theme.ts`, so re-inking the palette without re-inking the icons is a build
 * failure rather than a drift.
 *
 * `statement-tile` is the one icon that is not a label: it is the legend for
 * the chapter 4 shape (box = subject, arrow = predicate) and is written out as
 * `TILE_GLYPH`. The seven chapter 9 *move* icons are not read here; they are
 * the app's own geometry (`icons.ts`) and are copied *into* the icon set, not
 * out of it. Their *subtype* drawings are, into `moveGlyphs.ts`: those exist
 * only as SVG, and they are recoloured all the way to `currentColor` so the
 * row can grey one out before it is revealed.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

import { ANATOMY_KEYS, type AnatomyKey } from "../src/rail/anatomy.ts";
import { MOVE_KEYS, type MoveKey } from "../src/rail/taxonomy.ts";
import { LIGHT } from "../src/rail/theme.ts";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const ICONS_DIR = join(HERE, "..", "..", "icons_v3", "icons");
const OUT = join(HERE, "..", "src", "rail", "glyphs.ts");
const OUT_MOVES = join(HERE, "..", "src", "rail", "moveGlyphs.ts");

/**
 * The directories that hold chapter 1–8, 10 and 11 badges. `ch9-moves` is the
 * app's own set and is skipped; `ch9-subtypes` is read separately below.
 */
const DIRS = ["ch1-3", "ch4-7", "ch8", "ch10-composites", "ch11-subjects", "ch11-priority"] as const;
const MOVES_DIR = "ch9-subtypes";

const FAMILY_HUES = /#(7c3aed|0d9488|475569|c026d3)\b/gi;
/** Every element colour, as one alternation: the payload inside a ch. 10 composite. */
const ELEMENT_HUES = new RegExp(`#(${Object.values(LIGHT.element).map((c) => c.slice(1)).join("|")})\\b`, "gi");
const TINT = "#ede9fe";
const SURFACE = "#ffffff";
const TILE_KEY = "statement-tile";

/**
 * Which move each chapter 9 subtype drawing belongs to. Seven of the nineteen
 * leaves have their own picture; the rest wear the parent move's icon with
 * their name beside it (`ICONS_REFERENCE_V2.md` §11.2), and direct
 * contradiction shares the parent's red X deliberately.
 */
const SUBTYPE_MOVES: Readonly<Record<string, MoveKey>> = {
  demonstration: "proof/demonstration",
  validation: "proof/validation",
  opposition: "contradiction/opposition",
  objection: "difficulty/objection",
  "apparent-contradiction": "difficulty/apparentContradiction",
  settlement: "resolution/settlement",
  alternative: "resolution/alternative",
};

export const SQUARE_BOX = "-12 -12 24 24";
export const WIDE_BOX = "-18 -12 36 24";

/**
 * Glyphs drawn as a plain dot at bead size (11px). The chapter 7 fallacies
 * and the syllogism on the denial are three-element pictures that stop
 * reading below ~14px; the chapter 8 landscapes share one silhouette at that
 * size, so a bead would say "chapter 8" and nothing more; the wide chapter 5
 * icons do not fit a disc. The chip beside the row shows every one in full.
 */
const BUSY_BY_HAND: readonly AnatomyKey[] = [
  "fallacy-counterexample",
  "fallacy-not-similar",
  "fallacy-not-greater",
  "fallacy-not-included",
  "hypothetical-syllogism-tollens",
  // Chapter 10: a document with a whole move glyph inside it. At bead size the
  // payload is the distinction and it is the first thing to go.
  "ascribed-proof",
  "ascribed-difficulty",
];

type Extracted = { readonly body: string; readonly viewBox: string; readonly dir: string };

const fail = (message: string): never => {
  throw new Error(`extract-glyphs: ${message}`);
};

/** SVG attribute values in single quotes become double-quoted, so a body is one string style throughout. */
const normaliseQuotes = (s: string): string => s.replace(/=\s*'([^']*)'/g, '="$1"');

/**
 * `#fff` and `#ffffff` are the same white and the set uses both. The hue
 * substitutions and the stray-colour check both match six digits, so the
 * short form would slip past every one of them.
 */
const normaliseHex = (s: string): string =>
  s.replace(/#([0-9a-f])([0-9a-f])([0-9a-f])\b/gi, (_m, r: string, g: string, b: string) => `#${r}${r}${g}${g}${b}${b}`);

/**
 * A child element may repeat `xmlns`; inside an inlined body it is noise, and
 * the ch. 10 composites carry one on every path of their embedded glyph.
 */
const stripRedundantNamespace = (s: string): string =>
  s.replace(/\s+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/gi, "");

/** The two editors' namespaces, matched by URI because the prefix is not stable. */
const EDITOR_NAMESPACES: readonly string[] = [
  "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd",
  "http://www.inkscape.org/namespaces/inkscape",
];

/**
 * Which prefixes this file binds to those namespaces. The v2 package was
 * round-tripped through a serializer that rewrote `sodipodi:` and `inkscape:`
 * to `ns1:` and `ns2:`, so matching the prefix by name silently stopped
 * stripping anything and the namedview's colours reached the hue check.
 */
const editorPrefixes = (svg: string): readonly string[] =>
  [...svg.matchAll(/xmlns:([A-Za-z_][\w.-]*)\s*=\s*["']([^"']+)["']/g)]
    .filter((m) => EDITOR_NAMESPACES.includes(m[2]!))
    .map((m) => m[1]!);

/**
 * Inkscape writes a `namedview` (page/desk colours), live path-effects and
 * per-node ids into the file. None of that is the drawing; the namedview's
 * `#000000` / `#d1d1d1` would fail the hue check, and a second copy of the
 * same icon on one page would collide on `id="path1004"`. Keep only the
 * `fade-*` gradient ids the chapter 8 landscapes need in order to share a page.
 */
const stripEditorChrome = (s: string, prefixes: readonly string[]): string => {
  const alternation = prefixes.join("|");
  const withoutEditor =
    alternation === ""
      ? s
      : s
          .replace(new RegExp(`<(?:${alternation}):[\\w-]+\\b[^>]*(?:/>|>[\\s\\S]*?</(?:${alternation}):[\\w-]+>)`, "gi"), "")
          .replace(new RegExp(`\\s+(?:${alternation}):[\\w-]+="[^"]*"`, "gi"), "");
  return withoutEditor.replace(/\s+id="(?!fade-)[^"]*"/gi, "");
};

const stripStroke = (attrs: string): string =>
  attrs.replace(/\s(stroke|stroke-width|stroke-linecap|stroke-linejoin|stroke-dasharray|stroke-opacity)="[^"]*"/g, "");

/** An opaque light tint is a white surface with the family colour laid over it at 15 %. */
const layerTint = (body: string): string =>
  body.replace(
    new RegExp(`<(path|rect|circle)\\b([^>]*?)\\sfill="${TINT}"([^>]*?)/>`, "gi"),
    (_m, el: string, before: string, after: string) =>
      `<${el}${stripStroke(before)} fill="${SURFACE}"${stripStroke(after)}/> ` +
      `<${el}${before} fill="currentColor" fill-opacity="0.15"${after}/>`,
  );

/**
 * A badge keeps the element colours it embeds and recolours only its own
 * family hue; a move's subtype drawing is one colour throughout and gives all
 * of it up, so the row can paint it grey while the sentence is still hidden.
 */
type Recolour = "badge" | "move";

const extract = (file: string, dir: string, recolour: Recolour = "badge"): Extracted => {
  const svg = readFileSync(file, "utf8");
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1] ?? fail(`${file}: no viewBox`);
  if (viewBox !== SQUARE_BOX && viewBox !== WIDE_BOX) fail(`${file}: unexpected viewBox "${viewBox}"`);
  const inner = svg
    .replace(/^[\s\S]*?<svg\b[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/, "")
    .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/, "");
  const oneLine = stripEditorChrome(
    inner
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join(" "),
    editorPrefixes(svg),
  );
  const clean = stripRedundantNamespace(normaliseHex(normaliseQuotes(oneLine)));
  const recoloured = layerTint(clean).replace(FAMILY_HUES, "currentColor");
  const body = recolour === "move" ? recoloured.replace(ELEMENT_HUES, "currentColor") : recoloured;
  const kept = recolour === "move" ? [SURFACE] : [SURFACE, ...Object.values(LIGHT.element).map((c) => c.toLowerCase())];
  const stray = body.match(/#[0-9a-f]{6}\b/gi)?.filter((hex) => !kept.includes(hex.toLowerCase())) ?? [];
  if (stray.length > 0) fail(`${file}: colour left behind: ${[...new Set(stray)].join(", ")}`);
  if (body.includes("'")) fail(`${file}: a single quote survived normalisation`);
  return { body, viewBox, dir };
};

const found = new Map<string, Extracted>();
for (const dir of DIRS) {
  for (const name of readdirSync(join(ICONS_DIR, dir))) {
    if (!name.endsWith(".svg")) continue;
    const key = basename(name, ".svg");
    if (found.has(key)) fail(`"${key}" appears in two directories`);
    found.set(key, extract(join(ICONS_DIR, dir, name), dir));
  }
}

const tile = found.get(TILE_KEY) ?? fail(`no ${TILE_KEY}.svg`);
found.delete(TILE_KEY);

/**
 * The subtype drawings, keyed by the move they belong to. A 1:1 lock like the
 * badges': a drawing with no entry in `SUBTYPE_MOVES` and an entry naming a
 * leaf `taxonomy.ts` does not have are both refusals to write.
 */
const moves = new Map<MoveKey, Extracted>();
for (const name of readdirSync(join(ICONS_DIR, MOVES_DIR))) {
  if (!name.endsWith(".svg")) continue;
  const stem = basename(name, ".svg");
  const key = SUBTYPE_MOVES[stem] ?? fail(`${MOVES_DIR}/${name}: no move in SUBTYPE_MOVES`);
  if (!MOVE_KEYS.includes(key)) fail(`SUBTYPE_MOVES["${stem}"] = "${key}", which taxonomy.ts does not define`);
  const drawing = extract(join(ICONS_DIR, MOVES_DIR, name), MOVES_DIR, "move");
  if (drawing.viewBox !== SQUARE_BOX) fail(`${MOVES_DIR}/${name}: a move icon must be ${SQUARE_BOX}`);
  moves.set(key, drawing);
}
const unmapped = Object.entries(SUBTYPE_MOVES).filter(([, key]) => !moves.has(key));
if (unmapped.length > 0) fail(`SUBTYPE_MOVES names drawings that are not there: ${unmapped.map(([s]) => s).join(", ")}`);

const keySet = new Set<string>(ANATOMY_KEYS);
const unknown = [...found.keys()].filter((k) => !keySet.has(k));
if (unknown.length > 0) fail(`icons with no vocabulary entry in anatomy.ts: ${unknown.join(", ")}`);
const missing = ANATOMY_KEYS.filter((k) => !found.has(k));
if (missing.length > 0) fail(`vocabulary entries with no icon: ${missing.join(", ")}`);

const wide = ANATOMY_KEYS.filter((k) => found.get(k)!.viewBox === WIDE_BOX);
// A floor fade is the landscape. Speech bubbles and discs in chapter 8 have
// none, and they still read at bead size, so they stay out of BUSY_GLYPHS.
const landscapes = ANATOMY_KEYS.filter((k) => found.get(k)!.body.includes("<linearGradient"));
const busy = [...new Set<AnatomyKey>([...BUSY_BY_HAND, ...wide, ...landscapes])].filter((k) => keySet.has(k));
const inKeyOrder = (keys: readonly AnatomyKey[]): readonly AnatomyKey[] => ANATOMY_KEYS.filter((k) => keys.includes(k));

const quote = (s: string): string => `'${s.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
const list = (keys: readonly AnatomyKey[]): string => keys.map((k) => `  ${JSON.stringify(k)},`).join("\n");

const out = `/**
 * The chapter 1–8, 10 and 11 glyphs as inline SVG bodies, generated from the
 * icon set in \`icons_v3/icons/\` by \`scripts/extract-glyphs.ts\`.
 *
 *     npm run glyphs
 *
 * Do not edit by hand: change the icon (in its generator, so the family moves
 * together — \`icons_v3/METHODOLOGY.md\`) and regenerate. The family hue is
 * not baked in: every family hue in the source is \`currentColor\`, so the
 * family decides the colour (\`anatomy.ts\`) and one body serves every state.
 * White fills stay white; they are the surface. The two chapter 10 composites
 * keep the element colour of the move they carry, which is the point of them:
 * a slate document with the green proof thumb inside it. The chapter 8 bodies carry their own
 * \`<defs>\` — a gradient each, with the id the set gave it — so they can be
 * inlined any number of times on one page.
 *
 * Most bodies are drawn in the 24×24 frame \`SQUARE_BOX\`; the three chapter 5
 * icons are 36×24 (\`WIDE_BOX\`) and \`WIDE_GLYPHS\` names them, so a renderer
 * gives them half again the width. \`glyphBox\` and \`glyphAspect\` say which.
 */

import type { AnatomyKey } from "./anatomy.ts";

export const GLYPHS: Record<AnatomyKey, string> = {
${ANATOMY_KEYS.map((k) => `  ${JSON.stringify(k)}: ${quote(found.get(k)!.body)},`).join("\n")}
};

/**
 * The chapter 4 shape on its own — a subject cell, a seam that says *is*, a
 * predicate cell — as a legend for the eleven relations built from it. Not a
 * label: \`simple\` is the same picture where a row's statement is meant.
 */
export const TILE_GLYPH: string = ${quote(tile.body)};

export const SQUARE_BOX = ${JSON.stringify(SQUARE_BOX)};
export const WIDE_BOX = ${JSON.stringify(WIDE_BOX)};

/** Drawn 36×24: the stated statement on the left, the implied one on the right. */
export const WIDE_GLYPHS: ReadonlySet<AnatomyKey> = new Set<AnatomyKey>([
${list(inKeyOrder(wide))}
]);

export const glyphBox = (kind: AnatomyKey): string => (WIDE_GLYPHS.has(kind) ? WIDE_BOX : SQUARE_BOX);

/** Width over height: 1 for the square frame, 1.5 for the wide one. */
export const glyphAspect = (kind: AnatomyKey): number => (WIDE_GLYPHS.has(kind) ? 1.5 : 1);

/**
 * Glyphs that stop reading at bead size (11px) and are drawn there as a plain
 * dot in the family hue: the three-element chapter 7 pictures, the wide
 * chapter 5 icons, and every chapter 8 landscape, which at that size all
 * share one silhouette. The chip beside the row still shows the full glyph
 * with its word.
 */
export const BUSY_GLYPHS: ReadonlySet<AnatomyKey> = new Set<AnatomyKey>([
${list(inKeyOrder(busy))}
]);
`;

const moveKeysDrawn = MOVE_KEYS.filter((k) => moves.has(k));

const outMoves = `/**
 * The chapter 9 *subtype* drawings as inline SVG bodies, generated from
 * \`icons_v3/icons/ch9-subtypes/\` by \`scripts/extract-glyphs.ts\`.
 *
 *     npm run glyphs
 *
 * Do not edit by hand. These are the only part of the chapter 9 picture that
 * lives as SVG: the seven parent silhouettes are geometry in \`icons.ts\`,
 * shared by the React view and the static export, and are copied out to the
 * icon set rather than read from it. A subtype drawing is the parent's own
 * vocabulary with the distinguishing detail added — the proof thumb inside a
 * monitor for a demonstration, two of them facing for a validation — so the
 * two sources agree by construction.
 *
 * Seven of the nineteen leaves have one. The rest are drawn as their parent
 * move with the subtype's name beside them, which is what the icon set
 * intends (\`icons_v3/ICONS_REFERENCE_V2.md\` §11.2); direct contradiction
 * shares the parent's red X on purpose rather than for want of a picture.
 *
 * Every colour is \`currentColor\`, including the element hue: a row paints
 * the icon grey while its sentence is still hidden, and fades it as the move
 * is answered.
 */

import type { MoveKey } from "./taxonomy.ts";

export const MOVE_GLYPHS: Partial<Record<MoveKey, string>> = {
${moveKeysDrawn.map((k) => `  ${JSON.stringify(k)}: ${quote(moves.get(k)!.body)},`).join("\n")}
};

/** The frame every subtype drawing is in; the same one \`ElementIcon\` uses. */
export const MOVE_BOX = ${JSON.stringify(SQUARE_BOX)};

export const moveGlyph = (key: MoveKey): string | undefined => MOVE_GLYPHS[key];
`;

writeFileSync(OUT, out);
writeFileSync(OUT_MOVES, outMoves);
console.log(`wrote ${OUT}: ${ANATOMY_KEYS.length} glyphs (${wide.length} wide, ${busy.length} busy) + the tile`);
console.log(`wrote ${OUT_MOVES}: ${moveKeysDrawn.length} of ${MOVE_KEYS.length} chapter 9 leaves drawn`);
