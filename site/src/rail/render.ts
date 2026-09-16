/**
 * Static SVG export of a categorized sugya: pictographs on the left, the
 * sentence each one labels on the right.
 *
 * Icon geometry comes from `icons.ts` and verdict logic from `verdict.ts`, both
 * shared with the React view.
 */

import { resolveFill, shapesFor, type IconPrimitive } from "./icons.ts";
import { connectorPath, iconX, indentFor, isLongRun } from "./layout.ts";
import { LIGHT, type Palette } from "./theme.ts";
import {
  analyze,
  maxDepth,
  type Analysis,
  type Standing,
  type Sugya,
  type Unit,
} from "./sugya.ts";
import {
  describe,
  effectOf,
  isUndefinedInSource,
  ELEMENTS,
  ELEMENT_GLOSS,
  type Element,
} from "./taxonomy.ts";
import { standingOpacity, verdictFor, type Verdict } from "./verdict.ts";

export type Theme = Palette;

export const STANDALONE: Theme = LIGHT;

const LATTICE_X0 = 30;
const LINE_H = 17;
const ROW_PAD = 14;
const META_H = 18;
const CHAR_W = 6.45;
const HEADER_H = 92;
const LEGEND_H = 60;
const PILL_W = 68;

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const wrap = (text: string, maxChars: number): readonly string[] => {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = words.reduce<string[]>((acc, word) => {
    const last = acc[acc.length - 1];
    if (last === undefined) return [word];
    if (last.length + 1 + word.length <= maxChars) {
      acc[acc.length - 1] = `${last} ${word}`;
      return acc;
    }
    acc.push(word);
    return acc;
  }, []);
  return lines.length > 0 ? lines : [""];
};

const truncate = (text: string, maxChars: number): string =>
  text.length <= maxChars ? text : `${text.slice(0, Math.max(0, maxChars - 1))}…`;

const primitiveToSvg = (p: IconPrimitive, colour: string, surface: string): string => {
  if (p.el === "text") {
    return `<text x="0" y="${p.dy}" text-anchor="middle" font-size="${p.fontSize}" font-weight="700" fill="${colour}">${esc(p.text)}</text>`;
  }
  const { fill, fillOpacity } = resolveFill(p.fill, colour, surface);
  const paint = [
    `fill="${fill}"`,
    fillOpacity === undefined ? "" : `fill-opacity="${fillOpacity}"`,
    p.strokeWidth > 0
      ? `stroke="${colour}" stroke-width="${p.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  switch (p.el) {
    case "rect":
      return `<rect x="${p.x}" y="${p.y}" width="${p.width}" height="${p.height}" rx="${p.rx}" ${paint}/>`;
    case "circle":
      return `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}" ${paint}/>`;
    case "path":
      return `<path d="${p.d}" ${paint}/>`;
    default: {
      const exhaustive: never = p;
      return exhaustive;
    }
  }
};

const renderIcon = (
  element: Element,
  x: number,
  y: number,
  standing: Standing,
  theme: Theme,
): string => {
  const colour = theme.element[element];
  const body = shapesFor(element)
    .map((p) => primitiveToSvg(p, colour, theme.surface))
    .join("");
  const strike =
    standing === "defeated"
      ? `<line x1="-11.5" y1="11.5" x2="11.5" y2="-11.5" stroke="${theme.fg}" stroke-width="1.6" stroke-linecap="round"/>`
      : "";
  return `<g transform="translate(${x} ${y})" opacity="${standingOpacity(standing)}">${body}${strike}</g>`;
};

type EdgeStyle = { readonly dash: string; readonly marker: string };

const edgeStyle = (unit: Unit): EdgeStyle => {
  const effect = effectOf(unit.move);
  switch (effect) {
    case "raise":
      return { dash: "", marker: "arrow" };
    case "reject":
      return { dash: "", marker: "bar" };
    case "discharge":
      return { dash: "", marker: "dot" };
    case "unsettle":
      return { dash: `stroke-dasharray="4 3"`, marker: "arrow" };
    case "open":
      return { dash: `stroke-dasharray="1 3"`, marker: "arrow" };
    default: {
      const exhaustive: never = effect;
      return exhaustive;
    }
  }
};

const renderPill = (verdict: Verdict, x: number, y: number, theme: Theme): string => {
  const colour =
    verdict.tone === "good" ? theme.accepted : verdict.tone === "bad" ? theme.rejected : theme.doubt;
  const dash = verdict.dashed ? ` stroke-dasharray="3 2"` : "";
  const fillOpacity = verdict.tone === "good" ? 0.14 : 0;
  return [
    `<rect x="${x}" y="${y - 8}" width="${PILL_W}" height="16" rx="8" fill="${colour}" fill-opacity="${fillOpacity}" stroke="${colour}" stroke-width="1"${dash}/>`,
    `<text x="${x + PILL_W / 2}" y="${y + 3.5}" text-anchor="middle" font-size="10" fill="${colour}">${esc(verdict.label)}</text>`,
  ].join("");
};

type Row = {
  readonly unit: Unit;
  readonly y: number;
  readonly height: number;
  readonly cx: number;
  readonly cy: number;
  readonly lines: readonly string[];
};

export type RenderOptions = {
  readonly width?: number;
  readonly theme?: Theme;
  readonly showHebrew?: boolean;
};

export const renderSugya = (sugya: Sugya, options: RenderOptions = {}): string => {
  const width = options.width ?? 880;
  const theme = options.theme ?? STANDALONE;
  const showHebrew = options.showHebrew ?? true;
  const analysis: Analysis = analyze(sugya);
  const depthCount = maxDepth(analysis);
  const indent = indentFor(depthCount);

  const textX = LATTICE_X0 + depthCount * indent + 36;
  const pillX = width - 20 - PILL_W;
  const textW = pillX - textX - 16;
  const maxChars = Math.max(20, Math.floor(textW / CHAR_W));

  const rows: Row[] = [];
  let cursor = HEADER_H + LEGEND_H;
  for (const unit of sugya.units) {
    const lines = wrap(unit.en, maxChars);
    const hebrewLines = showHebrew && unit.he !== undefined ? 1 : 0;
    const height = ROW_PAD + META_H + lines.length * LINE_H + hebrewLines * LINE_H + 6;
    const depth = analysis.depth.get(unit.id) ?? 0;
    rows.push({
      unit,
      y: cursor,
      height,
      cx: iconX(depth, LATTICE_X0, indent),
      cy: cursor + ROW_PAD + META_H - 2,
      lines,
    });
    cursor += height;
  }

  const totalHeight = cursor + 24;
  const byId = new Map(rows.map((r) => [r.unit.id, r]));

  // Each depth column is drawn only across the rows that sit at that depth.
  const columns = Array.from({ length: depthCount + 1 }, (_, d) => {
    const at = rows.filter((row) => Math.abs(row.cx - iconX(d, LATTICE_X0, indent)) < 0.5);
    const first = at[0];
    const last = at[at.length - 1];
    if (first === undefined || last === undefined) return "";
    const x = iconX(d, LATTICE_X0, indent);
    return `<line x1="${x}" y1="${first.cy - 12}" x2="${x}" y2="${last.cy + 12}" stroke="${theme.border}" stroke-width="1" stroke-dasharray="1 4"/>`;
  }).join("");

  const edges = rows
    .filter((row) => row.unit.target !== undefined)
    .map((row) => {
      const parent = byId.get(row.unit.target!);
      if (parent === undefined) throw new Error(`missing target row for ${row.unit.id}`);
      const from = { x: parent.cx, y: parent.cy };
      const to = { x: row.cx, y: row.cy };
      // A run this long leaves the page, and every other move landing on the
      // same sentence shares its gutter, so the lines arrive as one stripe.
      if (isLongRun(from, to)) return "";
      const { dash, marker } = edgeStyle(row.unit);
      const d = connectorPath(from, to, indent);
      // marker-start with orient="auto-start-reverse" puts the head on the
      // target: a move acts upon what precedes it, not the other way round.
      return `<path d="${d}" fill="none" stroke="${theme.muted}" stroke-width="1.25" ${dash} marker-start="url(#${marker})" vector-effect="non-scaling-stroke"/>`;
    })
    .join("");

  // A move whose line was dropped says in words what it acts on instead.
  const ordinals = new Map(rows.map((row, i) => [row.unit.id, i + 1]));
  const tethered = new Map(
    rows.flatMap((row) => {
      const parent = row.unit.target === undefined ? undefined : byId.get(row.unit.target);
      if (parent === undefined) return [];
      const long = isLongRun({ x: parent.cx, y: parent.cy }, { x: row.cx, y: row.cy });
      return long ? [[row.unit.id, ordinals.get(parent.unit.id) ?? 0] as const] : [];
    }),
  );

  const icons = rows
    .map((row) =>
      renderIcon(
        row.unit.move.element,
        row.cx,
        row.cy,
        analysis.standing.get(row.unit.id) ?? "live",
        theme,
      ),
    )
    .join("");

  const bodies = rows
    .map((row) => {
      const leaf = describe(row.unit.move);
      const speaker = row.unit.speaker === undefined ? "" : ` · ${row.unit.speaker}`;
      const flag = isUndefinedInSource(row.unit.move) ? " · undefined in source" : "";
      const attested = row.unit.attested === false ? " · inferred" : "";
      const acts = tethered.has(row.unit.id) ? ` · ↑ acts on ${tethered.get(row.unit.id)}` : "";
      const detail = ` · ${leaf.he} · ${leaf.en}${speaker}${attested}${flag}${acts}`;
      const metaY = row.y + ROW_PAD + 4;

      const meta = [
        `<text x="${textX}" y="${metaY}" font-size="11">`,
        `<tspan fill="${theme.fg}" font-weight="500">${esc(leaf.plain)}</tspan>`,
        `<tspan fill="${theme.muted}">${esc(truncate(detail, maxChars))}</tspan>`,
        `</text>`,
      ].join("");

      const sentence = row.lines
        .map(
          (line, i) =>
            `<text x="${textX}" y="${metaY + META_H + i * LINE_H}" font-size="12.5" fill="${theme.fg}">${esc(line)}</text>`,
        )
        .join("");

      const hebrew =
        showHebrew && row.unit.he !== undefined
          ? `<text x="${pillX - 16}" y="${metaY + META_H + row.lines.length * LINE_H}" font-size="12" text-anchor="end" fill="${theme.muted}">${esc(truncate(row.unit.he, maxChars))}</text>`
          : "";

      const verdict = verdictFor(row.unit, analysis);
      const status = verdict === undefined ? "" : renderPill(verdict, pillX, row.cy, theme);

      const marker =
        row.unit.marker === undefined
          ? ""
          : `<text x="${pillX - 16}" y="${metaY}" font-size="10" text-anchor="end" fill="${theme.muted}">${esc(row.unit.marker)}</text>`;

      return meta + sentence + hebrew + status + marker;
    })
    .join("");

  const perRow = 4;
  const colWidth = (width - LATTICE_X0 - 20) / perRow;
  const legend = ELEMENTS.map((element, i) => {
    const x = LATTICE_X0 + 4 + (i % perRow) * colWidth;
    const y = HEADER_H + 4 + Math.floor(i / perRow) * 26;
    return [
      renderIcon(element, x, y, "live", theme),
      `<text x="${x + 15}" y="${y + 4}" font-size="10">`,
      `<tspan fill="${theme.fg}" font-weight="500">${element}</tspan>`,
      `<tspan fill="${theme.muted}"> — ${esc(ELEMENT_GLOSS[element])}</tspan>`,
      `</text>`,
    ].join("");
  }).join("");

  const header = [
    `<text x="${LATTICE_X0 - 6}" y="32" font-size="16" font-weight="500" fill="${theme.fg}">${esc(sugya.tractate)} ${esc(sugya.folio)} — ${esc(sugya.title)}</text>`,
    `<text x="${LATTICE_X0 - 6}" y="52" font-size="11" fill="${theme.muted}">${esc(sugya.discussedAt)}</text>`,
    `<text x="${LATTICE_X0 - 6}" y="70" font-size="11" fill="${theme.muted}">${sugya.units.length} sentences · indent shows what answers what · an arrow points at what the move acts on · a faded icon has been dealt with</text>`,
  ].join("");

  const defs = `<defs>
    <marker id="arrow" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 7 4 L 0 7 z" fill="${theme.muted}"/>
    </marker>
    <marker id="bar" viewBox="0 0 8 8" refX="3" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 2 0.5 L 2 7.5" stroke="${theme.muted}" stroke-width="2" fill="none"/>
    </marker>
    <marker id="dot" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <circle cx="4" cy="4" r="2.6" fill="${theme.muted}"/>
    </marker>
  </defs>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${totalHeight}" width="${width}" height="${totalHeight}" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" role="img" aria-label="${esc(sugya.tractate)} ${esc(sugya.folio)} categorized by Derech Tevunos chapter 9">
${defs}
<rect width="${width}" height="${totalHeight}" fill="${theme.surface}"/>
${header}
<line x1="${LATTICE_X0 - 6}" y1="${HEADER_H - 12}" x2="${width - 20}" y2="${HEADER_H - 12}" stroke="${theme.border}" stroke-width="1"/>
${legend}
<line x1="${LATTICE_X0 - 6}" y1="${HEADER_H + LEGEND_H - 14}" x2="${width - 20}" y2="${HEADER_H + LEGEND_H - 14}" stroke="${theme.border}" stroke-width="1"/>
${columns}
${edges}
${icons}
${bodies}
</svg>`;
};
