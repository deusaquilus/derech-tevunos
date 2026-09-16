/**
 * Regenerates `src/rail/glyphs.ts` from the icon set in `../icons_v3/icons/`.
 *
 *     npm run glyphs          (from viz/)
 *
 * The icon set is the source of truth for what a chapter 1–8 badge looks
 * like; this script is the only path from it into the app, so the app can
 * never drift a generation behind again (v4 shipped the first-pass glyphs and
 * kept them through two redesigns). What it does to each SVG:
 *
 *   - keeps the body — everything inside `<svg>` but the `<title>` — as one
 *     line, in the icon's own coordinate frame (`viewBox` is recorded, not
 *     rewritten: three chapter 5 icons are 36×24);
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
 *     icon, or a hue survives that is not white or `currentColor`.
 *
 * `statement-tile` is the one icon that is not a label: it is the legend for
 * the chapter 4 shape (box = subject, arrow = predicate) and is written out as
 * `TILE_GLYPH`. The chapter 9 move icons are not read here; they are the
 * app's own (`icons.ts`) and are copied *into* the icon set, not out of it.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

import { ANATOMY, ANATOMY_KEYS, type AnatomyKey } from "../src/rail/anatomy.ts";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const ICONS_DIR = join(HERE, "..", "..", "icons_v3", "icons");
const OUT = join(HERE, "..", "src", "rail", "glyphs.ts");

/** The directories that hold badges. `ch9-moves` is the app's own set and is skipped. */
const DIRS = ["ch1-3", "ch4-7", "ch8"] as const;

const FAMILY_HUES = /#(7c3aed|0d9488|475569|c026d3)\b/gi;
const TINT = "#ede9fe";
const SURFACE = "#ffffff";
const TILE_KEY = "statement-tile";

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
];

type Extracted = { readonly body: string; readonly viewBox: string; readonly dir: string };

const fail = (message: string): never => {
  throw new Error(`extract-glyphs: ${message}`);
};

/** SVG attribute values in single quotes become double-quoted, so a body is one string style throughout. */
const normaliseQuotes = (s: string): string => s.replace(/=\s*'([^']*)'/g, '="$1"');

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

const extract = (file: string, dir: string): Extracted => {
  const svg = readFileSync(file, "utf8");
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1] ?? fail(`${file}: no viewBox`);
  if (viewBox !== SQUARE_BOX && viewBox !== WIDE_BOX) fail(`${file}: unexpected viewBox "${viewBox}"`);
  const inner = svg
    .replace(/^[\s\S]*?<svg\b[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<title>[\s\S]*?<\/title>/, "");
  const oneLine = inner
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(" ");
  const body = layerTint(normaliseQuotes(oneLine)).replace(FAMILY_HUES, "currentColor");
  const stray = body.match(/#[0-9a-f]{6}\b/gi)?.filter((hex) => hex.toLowerCase() !== SURFACE) ?? [];
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

const keySet = new Set<string>(ANATOMY_KEYS);
const unknown = [...found.keys()].filter((k) => !keySet.has(k));
if (unknown.length > 0) fail(`icons with no vocabulary entry in anatomy.ts: ${unknown.join(", ")}`);
const missing = ANATOMY_KEYS.filter((k) => !found.has(k));
if (missing.length > 0) fail(`vocabulary entries with no icon: ${missing.join(", ")}`);

const wide = ANATOMY_KEYS.filter((k) => found.get(k)!.viewBox === WIDE_BOX);
const grounds = ANATOMY_KEYS.filter((k) => ANATOMY[k].family === "grounds");
const busy = [...new Set<AnatomyKey>([...BUSY_BY_HAND, ...wide, ...grounds])].filter((k) => keySet.has(k));
const inKeyOrder = (keys: readonly AnatomyKey[]): readonly AnatomyKey[] => ANATOMY_KEYS.filter((k) => keys.includes(k));

const quote = (s: string): string => `'${s.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
const list = (keys: readonly AnatomyKey[]): string => keys.map((k) => `  ${JSON.stringify(k)},`).join("\n");

const out = `/**
 * The chapter 1–8 glyphs as inline SVG bodies, generated from the icon set in
 * \`icons_v3/icons/\` (\`ch1-3\`, \`ch4-7\`, \`ch8\`) by \`scripts/extract-glyphs.ts\`.
 *
 *     npm run glyphs
 *
 * Do not edit by hand: change the icon (in its generator, so the family moves
 * together — \`icons_v3/METHODOLOGY.md\`) and regenerate. The family hue is
 * not baked in: every hue in the source is \`currentColor\`, so the family
 * decides the colour (\`anatomy.ts\`) and one body serves every state. White
 * fills stay white; they are the surface. The chapter 8 bodies carry their own
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

writeFileSync(OUT, out);
console.log(`wrote ${OUT}: ${ANATOMY_KEYS.length} glyphs (${wide.length} wide, ${busy.length} busy) + the tile`);
