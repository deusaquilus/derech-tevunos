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
 *
 * Three more kinds of drawing arrived with the set of 20 September 2026 and
 * each has its own export, so the 1:1 lock still holds — every SVG in the
 * read directories is exactly one of: an anatomy kind, the tile, a word-span
 * role, a guidance drawing, or (in `ch9-subtypes`) a leaf or a leaf's parent:
 *
 *   - the seven **role** drawings (`spans.ts`: subject, predicate, antecedent,
 *     consequent, premise, conclusion, commitment) become `ROLE_GLYPHS`. The
 *     subject's is `subject-bearer`, which is also a chapter 11 kind, so that
 *     one body is written twice;
 *   - the six **guidance** drawings of `ch11-order/` — Order, its three
 *     principles, the two kinds of knowledge — label nothing in a file (they
 *     are Ramchal's rules for presenting) and become `GUIDANCE_GLYPHS`, for
 *     the text pages to draw beside the verses that state them;
 *   - the **parent** drawing `explanation` is the immediate kind פרוש, which
 *     the three explanation leaves flatten (`taxonomy.ts` `PARENTS`); it
 *     becomes `PARENT_GLYPHS` in `moveGlyphs.ts`, for a less detailed view.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

import { ANATOMY_KEYS, type AnatomyKey } from "../src/rail/anatomy.ts";
import { SPAN_ROLE_INFO, SPAN_ROLES, type SpanRole } from "../src/rail/spans.ts";
import { MOVE_KEYS, PARENTS, type MoveKey, type Parent } from "../src/rail/taxonomy.ts";
import { LIGHT } from "../src/rail/theme.ts";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const ICONS_DIR = join(HERE, "..", "..", "icons_v3", "icons");
const OUT = join(HERE, "..", "src", "rail", "glyphs.ts");
const OUT_MOVES = join(HERE, "..", "src", "rail", "moveGlyphs.ts");

/**
 * The directories that hold chapter 1–8, 10 and 11 badges, the role drawings
 * and the guidance drawings. `ch9-moves` is the app's own set and is skipped;
 * `ch9-subtypes` is read separately below.
 */
const DIRS = ["ch1-3", "ch4-7", "ch8", "ch10-composites", "ch11-subjects", "ch11-priority", "ch11-order"] as const;
const MOVES_DIR = "ch9-subtypes";

/**
 * Chapter 11's closing pages: Order (Eng p238), its three principles —
 * arrangement, definitions, division (p238–246) — and the two kinds of
 * knowledge whose order of study differs (p238–240). Rules for the one
 * presenting, not labels on a sentence, so they are in no vocabulary and the
 * file has no key for them; they are drawn only beside the text.
 */
const GUIDANCE = [
  "study-order",
  "study-arrangement",
  "study-definitions",
  "study-division",
  "knowledge-theoretical",
  "knowledge-practical",
] as const;
type GuidanceKey = (typeof GUIDANCE)[number];

const FAMILY_HUES = /#(7c3aed|0d9488|475569|c026d3)\b/gi;
/** Every element colour, as one alternation: the payload inside a ch. 10 composite. */
const ELEMENT_HUES = new RegExp(`#(${Object.values(LIGHT.element).map((c) => c.slice(1)).join("|")})\\b`, "gi");
const TINT = "#ede9fe";
const SURFACE = "#ffffff";
const TILE_KEY = "statement-tile";

/**
 * Which move each chapter 9 subtype drawing belongs to. Eighteen of the
 * nineteen leaves have their own picture since the set of 20 September 2026
 * (`ICONS_REFERENCE_COMPLETE_V3.md` §3.4, §5); direct contradiction shares
 * the parent's red X deliberately (§11.2) and is the one leaf absent here.
 * The set's stems are its own — `first-hand` for שמועה, `presumption` for
 * אוקימתא, `question-of-principle` for אבעיא — and the leaf keys are the
 * app's; this table is the one place the two are matched.
 *
 * The leaf `statement/explanation` means פרוש מרוח, so it takes the
 * `full-explanation` drawing. The set's plain `explanation` is the parent
 * kind those three leaves flatten, and is read into `SUBTYPE_PARENTS`.
 */
const SUBTYPE_MOVES: Readonly<Record<string, MoveKey>> = {
  "first-hand": "statement/firsthand",
  "full-explanation": "statement/explanation",
  "forced-explanation": "statement/forcedExplanation",
  presumption: "statement/presumption",
  inference: "statement/inference",
  "reported-information": "statement/reported",
  query: "question/query",
  "question-of-principle": "question/principle",
  "answer-to-query": "answer/answer",
  determination: "answer/determination",
  demonstration: "proof/demonstration",
  validation: "proof/validation",
  opposition: "contradiction/opposition",
  objection: "difficulty/objection",
  "apparent-contradiction": "difficulty/apparentContradiction",
  refutation: "difficulty/refutation",
  settlement: "resolution/settlement",
  alternative: "resolution/alternative",
};

/** The drawings in `ch9-subtypes` that picture a leaf's parent kind rather than a leaf. */
const SUBTYPE_PARENTS: Readonly<Record<string, Parent>> = {
  explanation: "explanation",
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
 * same icon on one page would collide on `id="path1004"`. Keep only the ids
 * the body itself refers to — a gradient's `url(#…)`, a `<use href="#…">` —
 * which the chapter 8 landscapes need in order to share a page; every other
 * id is an editor's and goes. The set names those gradients `fade-axiom` in
 * its second release and `ground-natural-fade` in its third, so the rule is
 * "referenced", not a name pattern: matching the prefix silently dropped the
 * third release's ids and left `url(#ground-natural-fade)` pointing at
 * nothing, which is a floor that does not draw.
 */
const stripEditorChrome = (s: string, prefixes: readonly string[]): string => {
  const alternation = prefixes.join("|");
  const withoutEditor =
    alternation === ""
      ? s
      : s
          .replace(new RegExp(`<(?:${alternation}):[\\w-]+\\b[^>]*(?:/>|>[\\s\\S]*?</(?:${alternation}):[\\w-]+>)`, "gi"), "")
          .replace(new RegExp(`\\s+(?:${alternation}):[\\w-]+="[^"]*"`, "gi"), "");
  const referenced = new Set(
    [...withoutEditor.matchAll(/url\(#([^)]+)\)|\bhref="#([^"]+)"/g)].map((m) => m[1] ?? m[2]!),
  );
  return withoutEditor.replace(/\s+id="([^"]*)"/gi, (whole, id: string) => (referenced.has(id) ? whole : ""));
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
 *
 * White in a subtype drawing is the paper of the Statement family's document
 * frame — the same frame `ElementIcon` fills with the theme's surface — and
 * the sheet is greige, not white. So in a move it becomes `var(--surface)`,
 * with white as the fallback: the page defines `--surface` on `:root` and the
 * SVG export defines it on its root element. A badge's white stays literal,
 * as it always has: the chapter 8 floors are cut out of the floor in it.
 */
type Recolour = "badge" | "move";

const SURFACE_VAR = `var(--surface, ${SURFACE})`;

/**
 * Presentation attributes a body may inherit from its root `<svg>`. The
 * third release's chapter 9 drawings put `fill="none"` on the root and let
 * every inner stroke inherit it; discard the root and those paths fall back
 * to SVG's default fill, which is black — the speech bubble, the puzzle
 * pieces and the reporter came out as black blocks. So whatever the root
 * declares of these is carried onto a `<g>` around the body. `color` is left
 * out on purpose: it is what `currentColor` resolves to, the family hue, and
 * the badge sets that itself.
 */
const INHERITED = ["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-dasharray", "fill-opacity", "stroke-opacity", "fill-rule", "opacity"] as const;

const rootPresentation = (openingTag: string): string =>
  INHERITED.flatMap((name) => {
    const m = new RegExp(`\\s${name}="([^"]*)"`).exec(openingTag);
    return m === null ? [] : [`${name}="${m[1]}"`];
  }).join(" ");

const extract = (file: string, dir: string, recolour: Recolour = "badge"): Extracted => {
  const svg = readFileSync(file, "utf8");
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1] ?? fail(`${file}: no viewBox`);
  if (viewBox !== SQUARE_BOX && viewBox !== WIDE_BOX) fail(`${file}: unexpected viewBox "${viewBox}"`);
  const opening = /<svg\b[^>]*>/.exec(svg)?.[0] ?? fail(`${file}: no <svg> element`);
  const inherited = rootPresentation(opening);
  const stripped = svg
    .replace(/^[\s\S]*?<svg\b[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/, "")
    .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/, "");
  const inner = inherited === "" ? stripped : `<g ${inherited}>${stripped}</g>`;
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
  const inHue = recolour === "move" ? recoloured.replace(ELEMENT_HUES, "currentColor") : recoloured;
  const kept = recolour === "move" ? [SURFACE] : [SURFACE, ...Object.values(LIGHT.element).map((c) => c.toLowerCase())];
  const stray = inHue.match(/#[0-9a-f]{6}\b/gi)?.filter((hex) => !kept.includes(hex.toLowerCase())) ?? [];
  if (stray.length > 0) fail(`${file}: colour left behind: ${[...new Set(stray)].join(", ")}`);
  if (inHue.includes("'")) fail(`${file}: a single quote survived normalisation`);
  const body = recolour === "move" ? inHue.replace(new RegExp(`fill="${SURFACE}"`, "gi"), `fill="${SURFACE_VAR}"`) : inHue;
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
 * The role drawings, by role. Read from `found` without removing them: the
 * subject's drawing is `subject-bearer`, which stays a chapter 11 kind too.
 * A role whose drawing is missing is a refusal to write, like a kind's.
 */
const roles = new Map<SpanRole, Extracted>(
  SPAN_ROLES.map((role) => {
    const icon = SPAN_ROLE_INFO[role].icon;
    return [role, found.get(icon) ?? fail(`role "${role}" names the drawing "${icon}", which is not in the set`)];
  }),
);
const roleOnly = new Set<string>(SPAN_ROLES.map((role) => SPAN_ROLE_INFO[role].icon).filter((icon) => !(ANATOMY_KEYS as readonly string[]).includes(icon)));

/** The guidance drawings, which no vocabulary names; each must be there. */
const guidance = new Map<GuidanceKey, Extracted>(
  GUIDANCE.map((key) => [key, found.get(key) ?? fail(`guidance drawing "${key}" is not in the set`)]),
);

/**
 * The subtype drawings, keyed by the move they belong to, and the one parent
 * drawing. A 1:1 lock like the badges': a drawing in neither `SUBTYPE_MOVES`
 * nor `SUBTYPE_PARENTS`, an entry naming a leaf `taxonomy.ts` does not have,
 * and a table entry with no drawing are all refusals to write.
 */
const moves = new Map<MoveKey, Extracted>();
const parents = new Map<Parent, Extracted>();
for (const name of readdirSync(join(ICONS_DIR, MOVES_DIR))) {
  if (!name.endsWith(".svg")) continue;
  const stem = basename(name, ".svg");
  const drawing = extract(join(ICONS_DIR, MOVES_DIR, name), MOVES_DIR, "move");
  if (drawing.viewBox !== SQUARE_BOX) fail(`${MOVES_DIR}/${name}: a move icon must be ${SQUARE_BOX}`);
  const parent = SUBTYPE_PARENTS[stem];
  if (parent !== undefined) {
    if (!(parent in PARENTS)) fail(`SUBTYPE_PARENTS["${stem}"] = "${parent}", which taxonomy.ts does not define`);
    parents.set(parent, drawing);
    continue;
  }
  const key = SUBTYPE_MOVES[stem] ?? fail(`${MOVES_DIR}/${name}: no move in SUBTYPE_MOVES and no parent in SUBTYPE_PARENTS`);
  if (!MOVE_KEYS.includes(key)) fail(`SUBTYPE_MOVES["${stem}"] = "${key}", which taxonomy.ts does not define`);
  moves.set(key, drawing);
}
const unmapped = Object.entries(SUBTYPE_MOVES).filter(([, key]) => !moves.has(key));
if (unmapped.length > 0) fail(`SUBTYPE_MOVES names drawings that are not there: ${unmapped.map(([s]) => s).join(", ")}`);
const parentsMissing = (Object.keys(PARENTS) as Parent[]).filter((p) => !parents.has(p));
if (parentsMissing.length > 0) fail(`taxonomy.ts names parents with no drawing: ${parentsMissing.join(", ")}`);

const keySet = new Set<string>(ANATOMY_KEYS);
const guidanceSet = new Set<string>(GUIDANCE);
const unknown = [...found.keys()].filter((k) => !keySet.has(k) && !roleOnly.has(k) && !guidanceSet.has(k));
if (unknown.length > 0) fail(`icons with no vocabulary entry in anatomy.ts, no role in spans.ts and no place in GUIDANCE: ${unknown.join(", ")}`);
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
 *
 * Two more tables come from the same set. \`ROLE_GLYPHS\` are the word-span
 * roles of \`spans.ts\` — the subject's is the chapter 11 \`subject-bearer\`
 * body again, as the set intends. \`GUIDANCE_GLYPHS\` are chapter 11's rules of
 * Order, which no vocabulary names and no file carries; they are for the text
 * pages, beside the verses that state them.
 */

import type { AnatomyKey } from "./anatomy.ts";
import type { SpanRole } from "./spans.ts";

export const GLYPHS: Record<AnatomyKey, string> = {
${ANATOMY_KEYS.map((k) => `  ${JSON.stringify(k)}: ${quote(found.get(k)!.body)},`).join("\n")}
};

/**
 * The chapter 4 shape on its own — a subject cell, a seam that says *is*, a
 * predicate cell — as a legend for the eleven relations built from it. Not a
 * label: \`simple\` is the same picture where a row's statement is meant.
 */
export const TILE_GLYPH: string = ${quote(tile.body)};

/** The seven word-span roles, all in the square frame; the hue is the role's (\`SPAN_ROLE_INFO\`). */
export const ROLE_GLYPHS: Record<SpanRole, string> = {
${SPAN_ROLES.map((r) => `  ${JSON.stringify(r)}: ${quote(roles.get(r)!.body)},`).join("\n")}
};

/** Order, its three principles, the two kinds of knowledge (Eng p238–246). Guidance, not labels: violet, square frame. */
export type GuidanceKey = ${GUIDANCE.map((k) => JSON.stringify(k)).join(" | ")};

export const GUIDANCE_KEYS: readonly GuidanceKey[] = [${GUIDANCE.map((k) => JSON.stringify(k)).join(", ")}];

export const GUIDANCE_GLYPHS: Record<GuidanceKey, string> = {
${GUIDANCE.map((k) => `  ${JSON.stringify(k)}: ${quote(guidance.get(k)!.body)},`).join("\n")}
};

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
 * Eighteen of the nineteen leaves have one, since the set of 20 September
 * 2026 (\`icons_v3/ICONS_REFERENCE_COMPLETE_V3.md\` §3.4, §5). Direct
 * contradiction is drawn as its parent move with the subtype's name beside
 * it: it shares the parent's red X on purpose (§11.2), not for want of a
 * picture.
 *
 * \`PARENT_GLYPHS\` is the one picture at chapter 9's middle level: פרוש, the
 * immediate kind that the three explanation leaves flatten
 * (\`taxonomy.ts\` \`PARENTS\`). The row does not draw it — a unit encodes its
 * leaf and the leaf has its own picture — but a less detailed view would.
 *
 * Every colour is \`currentColor\`, including the element hue: a row paints
 * the icon grey while its sentence is still hidden, and fades it as the move
 * is answered.
 */

import type { MoveKey, Parent } from "./taxonomy.ts";

export const MOVE_GLYPHS: Partial<Record<MoveKey, string>> = {
${moveKeysDrawn.map((k) => `  ${JSON.stringify(k)}: ${quote(moves.get(k)!.body)},`).join("\n")}
};

export const PARENT_GLYPHS: Record<Parent, string> = {
${(Object.keys(PARENTS) as Parent[]).map((p) => `  ${JSON.stringify(p)}: ${quote(parents.get(p)!.body)},`).join("\n")}
};

/** The frame every subtype drawing is in; the same one \`ElementIcon\` uses. */
export const MOVE_BOX = ${JSON.stringify(SQUARE_BOX)};

export const moveGlyph = (key: MoveKey): string | undefined => MOVE_GLYPHS[key];

export const parentGlyph = (parent: Parent): string => PARENT_GLYPHS[parent];
`;

writeFileSync(OUT, out);
writeFileSync(OUT_MOVES, outMoves);
console.log(`wrote ${OUT}: ${ANATOMY_KEYS.length} glyphs (${wide.length} wide, ${busy.length} busy) + the tile, ${roles.size} roles, ${guidance.size} guidance drawings`);
console.log(`wrote ${OUT_MOVES}: ${moveKeysDrawn.length} of ${MOVE_KEYS.length} chapter 9 leaves drawn, ${parents.size} parent`);
