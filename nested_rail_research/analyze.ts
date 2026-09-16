/**
 * Do rails nest? Structural analysis of long-reaching moves over the five
 * repo fixtures and the six research skeletons, plus a step-by-step replay of
 * the v3 focus/fold rules (`viz/src/folding.ts`, imported read-only) to see
 * what the flat model does when they do.
 *
 *   node analyze.ts            # report to stdout
 *   node analyze.ts --json     # machine-readable, for the canvas
 *
 * Vocabulary used below:
 *   span      — the rows a rail covers: from a move's target to the move.
 *   rake      — two long-reaching moves on the same target (v3 §3.3).
 *   nested    — span B strictly inside span A with a *different* target,
 *               where B's target descends from A's target. This is the case
 *               the question is about: a sub-argument, itself long-reaching,
 *               inside the stretch another long-reaching move brackets.
 *   crossing  — T_A < T_B < M_A < M_B: spans overlap without nesting. If these
 *               occur, nested brackets cannot be drawn cleanly.
 */

import { analyze, type Sugya, type Unit } from "../viz/src/sugya.ts";
import { effectOf } from "../viz/src/taxonomy.ts";
import {
  LONG_REACH,
  arrivesFolded,
  closesBusiness,
  focusAfterSeek,
  foldRangeOf,
  isLongReach,
  reachOf,
  type Focus,
  type FoldRange,
} from "../viz/src/folding.ts";
import { FIXTURES } from "../viz/src/fixtures/index.ts";
import { RESEARCH_SUGYOT } from "./skeletons.ts";

type Rail = {
  readonly index: number;
  readonly id: string;
  readonly target: number;
  readonly targetId: string;
  readonly reach: number;
  readonly targetDepth: number;
  readonly closes: boolean;
  readonly effect: string;
};

const indexOf = (units: readonly Unit[], id: string): number => units.findIndex((u) => u.id === id);

const railsOf = (sugya: Sugya): readonly Rail[] => {
  const { units } = sugya;
  const depth = analyze(sugya).depth;
  return units.flatMap((u, i) => {
    if (!isLongReach(units, i) || u.target === undefined) return [];
    const target = indexOf(units, u.target);
    return [
      {
        index: i,
        id: u.id,
        target,
        targetId: u.target,
        reach: reachOf(units, i),
        targetDepth: depth.get(u.target) ?? 0,
        closes: closesBusiness(effectOf(u.move)),
        effect: effectOf(u.move),
      },
    ];
  });
};

/** Is `descendant` in the subtree under `ancestor` in the move tree? */
const descendsFrom = (units: readonly Unit[], descendant: number, ancestor: number): boolean => {
  let at: number | undefined = descendant;
  while (at !== undefined && at >= 0) {
    if (at === ancestor) return true;
    const t: string | undefined = units[at]?.target;
    at = t === undefined ? undefined : indexOf(units, t);
  }
  return false;
};

/**
 * A *position*: one of the sides the sugya is about. A root statement; a
 * `דחיה` on a position (Rava on Abaye, Rava on Rabbah); or the answer to a
 * question put to a position (`מאי אור? רב הונא אמר…`). A challenge on a
 * position is a tooth of that position's rake, whatever its depth number —
 * the fixture's `t7-seifa → rava` sits at depth 1 and Pesachim's `m4 → rav-huna`
 * at depth 2, and both are the same shape. Nesting *proper* is a long-reaching
 * move on something that is not a position: a sub-argument.
 */
const isPosition = (units: readonly Unit[], i: number): boolean => {
  const u = units[i];
  if (u === undefined) return false;
  if (u.target === undefined) return true;
  const t = indexOf(units, u.target);
  if (u.move.element === "contradiction" && u.move.subtype === "opposition") return isPosition(units, t);
  if (u.move.element === "answer") {
    const q = units[t];
    if (q?.move.element === "question" && q.target !== undefined) return isPosition(units, indexOf(units, q.target));
  }
  return false;
};

type Pair = { readonly outer: Rail; readonly inner: Rail };

type Structure = {
  readonly rails: readonly Rail[];
  /** Inner span strictly inside outer, inner target a non-position descendant of outer's target. */
  readonly nested: readonly Pair[];
  /** Same target, one inside the other: v3's rake. */
  readonly rakes: readonly Pair[];
  /** Overlap without containment, both targets positions: the two sides of a dispute interleaving. */
  readonly crossingsBetweenSides: readonly Pair[];
  /** Overlap without containment, at least one target a sub-argument. Would break nested brackets. */
  readonly crossingsStructural: readonly Pair[];
  /** Longest chain of properly nested spans. */
  readonly nestingDepth: number;
  /** Rails whose target is not a position. */
  readonly interior: readonly Rail[];
};

const structureOf = (sugya: Sugya): Structure => {
  const { units } = sugya;
  const rails = railsOf(sugya);
  const nested: Pair[] = [];
  const rakes: Pair[] = [];
  const crossingsBetweenSides: Pair[] = [];
  const crossingsStructural: Pair[] = [];
  for (const a of rails) {
    for (const b of rails) {
      if (a === b) continue;
      const sameTarget = a.target === b.target;
      const inside = a.target <= b.target && b.index < a.index;
      if (sameTarget && b.index < a.index) rakes.push({ outer: a, inner: b });
      else if (!sameTarget && inside && !isPosition(units, b.target) && descendsFrom(units, b.target, a.target)) {
        nested.push({ outer: a, inner: b });
      } else if (a.target < b.target && b.target < a.index && a.index < b.index) {
        const pair = { outer: a, inner: b };
        if (isPosition(units, a.target) && isPosition(units, b.target)) crossingsBetweenSides.push(pair);
        else crossingsStructural.push(pair);
      }
    }
  }
  // Nesting depth: longest chain inner ⊂ ... ⊂ outer over `nested`.
  const memo = new Map<number, number>();
  const chain = (r: Rail): number => {
    const hit = memo.get(r.index);
    if (hit !== undefined) return hit;
    const inners = nested.filter((p) => p.outer.index === r.index).map((p) => chain(p.inner));
    const d = 1 + Math.max(0, ...inners);
    memo.set(r.index, d);
    return d;
  };
  const nestingDepth = Math.max(0, ...rails.map(chain));
  const interior = rails.filter((r) => !isPosition(units, r.target));
  return { rails, nested, rakes, crossingsBetweenSides, crossingsStructural, nestingDepth, interior };
};

// ---------------------------------------------------------------------------
// What one level of unfolding would show, if bands nested.
//
// v3's band hides everything between a move's target and its landing, and
// unfolding it gives all of that back as rows. If folds were a tree, unfolding
// the band would show the target's *children* in that stretch — the teeth of
// its rake — each with its own sub-thread still folded beneath it.

type Outline = readonly string[];

const childrenIn = (units: readonly Unit[], parent: number, from: number, to: number): number[] =>
  Array.from({ length: to - from }, (_, k) => from + k).filter((i) => units[i]?.target === units[parent]?.id);

const subtreeSizeIn = (units: readonly Unit[], root: number, from: number, to: number): number =>
  Array.from({ length: to - from }, (_, k) => from + k).filter((i) => i !== root && descendsFrom(units, i, root)).length;

/** Rows shown when the band `range` under `target` is unfolded one level, and the outline. */
const unfoldOneLevel = (
  units: readonly Unit[],
  target: number,
  range: FoldRange,
): { readonly rows: number; readonly outline: Outline } => {
  const cap = (i: number): string => `${i} ${units[i]?.short ?? units[i]?.id ?? ""}`;
  /** The ancestor of `i` that is a direct child of `target`, if any. */
  const toothOf = (i: number): number | undefined => {
    let at: number | undefined = i;
    while (at !== undefined && at >= 0) {
      const t: string | undefined = units[at]?.target;
      if (t === undefined) return undefined;
      const ti = indexOf(units, t);
      if (ti === target) return at;
      at = ti;
    }
    return undefined;
  };
  const outline: string[] = [];
  let rows = 0;
  for (let i = range.from; i < range.to; i += 1) {
    const tooth = toothOf(i);
    if (tooth === i) {
      outline.push(cap(i));
      rows += 1;
      const below = subtreeSizeIn(units, i, i + 1, range.to);
      if (below > 0) {
        outline.push(`    [${below} folded]`);
        rows += 1;
      }
    } else if (tooth === undefined || tooth < range.from || tooth >= range.to) {
      // Not under any tooth that is on the page: cannot be folded beneath one.
      outline.push(cap(i));
      rows += 1;
    }
  }
  return { rows, outline };
};

// ---------------------------------------------------------------------------
// Replay of the v3 rules, step by step, to catch what the flat model loses.

type Event =
  | { readonly kind: "released"; readonly step: number; readonly by: string; readonly lost: FoldRange; readonly lostFocus: string }
  | { readonly kind: "flattened"; readonly step: number; readonly by: string; readonly innerFocus: string; readonly inner: FoldRange }
  | { readonly kind: "candidate-hidden"; readonly step: number; readonly by: string; readonly hidden: string };

type Unfold = {
  readonly step: number;
  readonly by: string;
  readonly target: string;
  readonly range: FoldRange;
  /** Rows v3 gives back when the band is unfolded: the whole range. */
  readonly flat: number;
  /** Rows a nested model would show: the target's teeth, each with its thread folded. */
  readonly nested: number;
  readonly outline: Outline;
};

type Replay = {
  readonly events: readonly Event[];
  /** One entry per folded arrival: what unfolding that band one level would show. */
  readonly unfolds: readonly Unfold[];
  /** Rows on the page at each step under v3 (rows + bands). */
  readonly flatRows: readonly number[];
  /** Rows on the page if every fold that ever arrived stayed, nested. */
  readonly nestedRows: readonly number[];
  /** Longest rail (rows spanned on the page) under each model, per step. */
  readonly flatRail: readonly number[];
  readonly nestedRail: readonly number[];
  readonly arrivedFolded: readonly string[];
};

const rangeContains = (outer: FoldRange, inner: FoldRange): boolean =>
  outer.from <= inner.from && inner.to <= outer.to && !(outer.from === inner.from && outer.to === inner.to);

/** Visible slots when `revealed` rows are on the page and `folds` are closed bands. */
const visibleCount = (revealed: number, folds: readonly FoldRange[]): number => {
  // Top-level folds only: a fold inside another contributes nothing visible.
  const tops = folds.filter((f) => !folds.some((g) => g !== f && rangeContains(g, f)));
  const hidden = tops.reduce((n, f) => n + (f.to - f.from), 0);
  return revealed - hidden + tops.length;
};

/** Rows a rail spans on the page, given closed bands between target and move. */
const railRows = (target: number, move: number, folds: readonly FoldRange[]): number => {
  const tops = folds.filter((f) => !folds.some((g) => g !== f && rangeContains(g, f)));
  const inside = tops.filter((f) => f.from > target && f.to <= move);
  const hidden = inside.reduce((n, f) => n + (f.to - f.from), 0);
  return move - target - hidden + inside.length;
};

const replay = (sugya: Sugya): Replay => {
  const { units } = sugya;
  const events: Event[] = [];
  const unfolds: Unfold[] = [];
  const flatRows: number[] = [];
  const nestedRows: number[] = [];
  const flatRail: number[] = [];
  const nestedRail: number[] = [];
  const arrivedFolded: string[] = [];
  const nestedFolds: { focus: Focus; range: FoldRange }[] = [];
  const closersSeen: Rail[] = [];
  const rails = railsOf(sugya);
  let focus: Focus | undefined;
  let prevRange: FoldRange | undefined;

  for (let revealed = 1; revealed <= units.length; revealed += 1) {
    const frontier = revealed - 1;
    const unit = units[frontier]!;
    const rail = rails.find((r) => r.index === frontier);
    focus = focusAfterSeek(units, revealed, focus);
    const range = foldRangeOf(units, focus);

    if (rail !== undefined) {
      const folded = arrivesFolded(units, frontier);
      if (folded) {
        arrivedFolded.push(unit.id);
        const mine = foldRangeOf(units, { id: unit.id, folded: true });
        if (mine !== undefined) {
          const one = unfoldOneLevel(units, rail.target, mine);
          unfolds.push({
            step: revealed,
            by: unit.id,
            target: rail.targetId,
            range: mine,
            flat: mine.to - mine.from,
            nested: one.rows,
            outline: one.outline,
          });
          // A fold that arrived earlier and now sits wholly inside this one.
          for (const inner of nestedFolds) {
            if (rangeContains(mine, inner.range) && inner.focus.id !== unit.id) {
              const innerTarget = units[indexOf(units, inner.focus.id)]?.target;
              if (innerTarget !== unit.target) {
                events.push({ kind: "flattened", step: revealed, by: unit.id, innerFocus: inner.focus.id, inner: inner.range });
              }
            }
          }
          // An earlier long-reaching move on the same target, now hidden.
          for (const c of closersSeen) {
            if (c.targetId === unit.target && c.index >= mine.from && c.index < mine.to) {
              events.push({ kind: "candidate-hidden", step: revealed, by: unit.id, hidden: c.id });
            }
          }
          nestedFolds.push({ focus: { id: unit.id, folded: true }, range: mine });
        }
        closersSeen.push(rail);
      } else if (prevRange !== undefined && range === undefined) {
        // An open long-reaching arrival released a fold the reader had.
        events.push({ kind: "released", step: revealed, by: unit.id, lost: prevRange, lostFocus: focus?.id ?? "?" });
      }
    }

    const flatFolds = range === undefined ? [] : [range];
    const nestedRanges = nestedFolds.map((f) => f.range);
    flatRows.push(visibleCount(revealed, flatFolds));
    nestedRows.push(visibleCount(revealed, nestedRanges));
    // The materialised rail is the focus's; measure it under both models.
    const fi = focus === undefined ? -1 : indexOf(units, focus.id);
    const ft = fi < 0 ? undefined : units[fi]?.target;
    const ti = ft === undefined ? -1 : indexOf(units, ft);
    flatRail.push(fi < 0 || ti < 0 ? 0 : railRows(ti, fi, flatFolds));
    nestedRail.push(fi < 0 || ti < 0 ? 0 : railRows(ti, fi, nestedRanges));
    prevRange = range;
  }
  return { events, unfolds, flatRows, nestedRows, flatRail, nestedRail, arrivedFolded };
};

/**
 * The page at `revealed` if folds were a tree rooted at the open rail's
 * target: rows before the target as they are; the target; its teeth, each
 * with its thread as a band; then the landing. For an *open* arrival this is
 * what a nested model would show instead of v3's full-length rail.
 */
const treePage = (units: readonly Unit[], revealed: number, focusIndex: number): { readonly rows: number; readonly outline: Outline } => {
  const t = units[focusIndex]?.target;
  if (t === undefined) return { rows: revealed, outline: [] };
  const target = indexOf(units, t);
  const range: FoldRange = { from: target + 1, to: focusIndex };
  const one = unfoldOneLevel(units, target, range);
  const cap = (i: number): string => `${i} ${units[i]?.short ?? units[i]?.id ?? ""}`;
  const outline = [
    ...(target > 0 ? [`… ${target} rows above`] : []),
    cap(target),
    ...one.outline.map((l) => (l.startsWith("    [") ? l : `  ${l}`)),
    cap(focusIndex),
    ...(revealed - 1 > focusIndex ? [`… ${revealed - 1 - focusIndex} rows below`] : []),
  ];
  return { rows: target + 1 + one.rows + (revealed - focusIndex), outline };
};

// ---------------------------------------------------------------------------

const ALL: readonly Sugya[] = [...FIXTURES, ...RESEARCH_SUGYOT];

const report = (sugya: Sugya): void => {
  const s = structureOf(sugya);
  const r = replay(sugya);
  const { units } = sugya;
  const cap = (i: number): string => units[i]?.short ?? units[i]?.id ?? String(i);
  console.log(`\n=== ${sugya.tractate} ${sugya.folio} — ${sugya.title} (${units.length} units) ===`);
  console.log(`long-reaching (reach ≥ ${LONG_REACH}): ${s.rails.length}; on sub-arguments rather than positions: ${s.interior.length}`);
  for (const rail of s.rails) {
    const kind = isPosition(units, rail.target) ? "position" : "sub-argument";
    console.log(
      `  ${String(rail.index).padStart(2)} → ${String(rail.target).padStart(2)}  reach ${String(rail.reach).padStart(2)}  ${kind.padEnd(12)}  ${rail.closes ? "CLOSES (arrives folded)" : "open"}  ${rail.id} → ${rail.targetId}`,
    );
  }
  console.log(
    `nested pairs: ${s.nested.length}; rakes: ${s.rakes.length}; crossings between the two sides: ${s.crossingsBetweenSides.length}; structural crossings: ${s.crossingsStructural.length}; nesting depth: ${s.nestingDepth}`,
  );
  for (const p of s.nested) {
    console.log(`  [${p.outer.target}..${p.outer.index}] ${p.outer.id} ⊃ [${p.inner.target}..${p.inner.index}] ${p.inner.id}`);
  }
  console.log(`arrive folded: ${r.arrivedFolded.length === 0 ? "none" : r.arrivedFolded.join(", ")}`);
  for (const u of r.unfolds) {
    if (u.nested < u.flat) {
      console.log(`  unfold the band at step ${u.step} ("${cap(u.step - 1)}") one level: v3 gives back ${u.flat} rows; nested would show ${u.nested}:`);
      for (const line of u.outline) console.log(`      ${line}`);
    } else {
      console.log(`  unfold the band at step ${u.step} ("${cap(u.step - 1)}"): ${u.flat} rows either way — the band covers siblings, not a sub-argument`);
    }
  }
  const lastOpen = [...s.rails].reverse().find((x) => !x.closes && x.reach >= 12);
  if (lastOpen !== undefined) {
    const page = treePage(units, lastOpen.index + 1, lastOpen.index);
    console.log(`  the longest open rail, at step ${lastOpen.index + 1} ("${cap(lastOpen.index)}"): v3 draws ${lastOpen.reach + 1} rows of rail over ${lastOpen.index + 1} rows; a tree of folds would show ${page.rows} rows:`);
    for (const line of page.outline) console.log(`      ${line}`);
  }
  if (r.events.length > 0) console.log("what the flat model does:");
  for (const e of r.events) {
    if (e.kind === "released") {
      console.log(`  step ${e.step}: "${cap(e.step - 1)}" arrives open → releases the fold ${e.lost.from}..${e.lost.to - 1} (${e.lost.to - e.lost.from} rows re-expand)`);
    } else if (e.kind === "flattened") {
      console.log(`  step ${e.step}: "${cap(e.step - 1)}" folds over an earlier fold (${e.innerFocus}: ${e.inner.from}..${e.inner.to - 1}); unfolding this band gives back flat rows`);
    } else {
      console.log(`  step ${e.step}: "${cap(e.step - 1)}" hides the earlier candidate "${cap(indexOf(units, e.hidden))}" on the same target`);
    }
  }
  const worst = r.flatRows.map((f, i) => f - r.nestedRows[i]!).reduce((a, b) => Math.max(a, b), 0);
  const atEnd = r.flatRows.length - 1;
  console.log(
    `rows on page at the end: flat ${r.flatRows[atEnd]} vs nested ${r.nestedRows[atEnd]}; largest gap at any step: ${worst} rows; longest materialised rail: flat ${Math.max(...r.flatRail)} vs nested ${Math.max(...r.nestedRail)} rows`,
  );
};

if (process.argv.includes("--json")) {
  const out = ALL.map((sugya) => {
    const s = structureOf(sugya);
    const r = replay(sugya);
    return {
      id: sugya.id,
      tractate: sugya.tractate,
      folio: sugya.folio,
      title: sugya.title,
      units: sugya.units.length,
      rails: s.rails,
      nested: s.nested.map((p) => ({ outer: p.outer.id, inner: p.inner.id })),
      rakes: s.rakes.length,
      crossingsBetweenSides: s.crossingsBetweenSides.length,
      crossingsStructural: s.crossingsStructural.length,
      nestingDepth: s.nestingDepth,
      interior: s.interior.length,
      positions: sugya.units.map((_, i) => isPosition(sugya.units, i)),
      arrivedFolded: r.arrivedFolded,
      events: r.events,
      unfolds: r.unfolds,
      flatRows: r.flatRows,
      nestedRows: r.nestedRows,
      flatRail: r.flatRail,
      nestedRail: r.nestedRail,
      captions: sugya.units.map((u) => u.short ?? u.id),
      targets: sugya.units.map((u) => (u.target === undefined ? null : indexOf(sugya.units, u.target))),
      closes: sugya.units.map((u) => closesBusiness(effectOf(u.move))),
    };
  });
  console.log(JSON.stringify(out, null, 1));
} else {
  for (const sugya of ALL) report(sugya);
  console.log("\n=== summary ===");
  console.log("sugya                                   units  rails  sub-arg  nested  depth  x-sides  x-struct  folded  released  flattened  cand-hidden");
  for (const sugya of ALL) {
    const s = structureOf(sugya);
    const r = replay(sugya);
    const n = (k: Event["kind"]): number => r.events.filter((e) => e.kind === k).length;
    console.log(
      `${(sugya.tractate + " " + sugya.folio).padEnd(40)}${String(sugya.units.length).padStart(5)}${String(s.rails.length).padStart(7)}${String(s.interior.length).padStart(9)}${String(s.nested.length).padStart(8)}${String(s.nestingDepth).padStart(7)}${String(s.crossingsBetweenSides.length).padStart(9)}${String(s.crossingsStructural.length).padStart(10)}${String(r.arrivedFolded.length).padStart(8)}${String(n("released")).padStart(10)}${String(n("flattened")).padStart(11)}${String(n("candidate-hidden")).padStart(13)}`,
    );
  }
}
