/**
 * Replays `foldtree.ts` over the fixture and the six research skeletons,
 * checks the invariants the design depends on, compares page size and rail
 * length with v3 step by step, and prints the pages at the moments that
 * matter — including the reader opening a band, which is where nested rails
 * appear.
 *
 *   node simulate.ts
 */

import type { Sugya, Unit } from "../viz/src/sugya.ts";
import { focusAfterSeek, foldRangeOf, isLongReach, slotsOf, type Focus } from "../viz/src/folding.ts";
import { bavaMetziaYeush } from "../viz/src/fixtures/index.ts";
import { RESEARCH_SUGYOT } from "./skeletons.ts";
import {
  DEFAULT_POLICY,
  EMPTY,
  arrive,
  assertLaminar,
  isRow,
  layout,
  press,
  railsOf,
  replay,
  slotOf,
  toggle,
  treeOf,
  type FoldState,
  type Policy,
  type Slot,
} from "./foldtree.ts";

const ALL: readonly Sugya[] = [bavaMetziaYeush, ...RESEARCH_SUGYOT];
const FLAT: Policy = { ...DEFAULT_POLICY, openArrival: "flat" };

// --- v3, for comparison --------------------------------------------------------

const v3 = (units: readonly Unit[]): { rows: number[]; rail: number[] } => {
  const rows: number[] = [];
  const rail: number[] = [];
  let focus: Focus | undefined;
  for (let revealed = 1; revealed <= units.length; revealed += 1) {
    focus = focusAfterSeek(units, revealed, focus);
    const range = foldRangeOf(units, focus);
    const slots = slotsOf(revealed, range);
    rows.push(slots.length);
    if (focus === undefined) {
      rail.push(0);
      continue;
    }
    const m = units.findIndex((u) => u.id === focus!.id);
    const t = units.findIndex((u) => u.id === units[m]!.target);
    const at = (i: number): number => slots.findIndex((s) => (s.kind === "row" ? s.index === i : s.from <= i && i < s.to));
    rail.push(at(m) - at(t));
  }
  return { rows, rail };
};

// --- printing -------------------------------------------------------------------

const cap = (units: readonly Unit[], i: number, n = 58): string => {
  const s = units[i]?.short ?? units[i]?.id ?? "";
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
};

const page = (units: readonly Unit[], state: FoldState, policy: Policy, title: string): void => {
  const slots = layout(state.revealed, state.bands);
  const rails = railsOf(units, state, slots, policy);
  const lanes = Math.max(0, ...rails.map((r) => r.lane + 1));
  const marks = slots.map(() => Array.from({ length: lanes }, () => " "));
  for (const r of rails) {
    const col = lanes - 1 - r.lane; // outer lanes to the left
    const top = slotOf(slots, r.anchor);
    const bottom = slotOf(slots, r.move);
    for (let s = top; s <= bottom; s += 1) marks[s]![col] = s === top ? "┌" : s === bottom ? "└" : "│";
    for (const tooth of r.teeth) marks[slotOf(slots, tooth)]![col] = "├";
  }
  console.log(`\n--- ${title} — ${slots.length} slots on the page; rails: ${rails.map((r) => `lane ${r.lane}: ${r.anchor}→${r.move} over ${r.span} rows`).join("; ") || "none"}`);
  slots.forEach((slot, s) => {
    const lane = marks[s]!.join("");
    if (slot.kind === "row") {
      const i = slot.index;
      const flag = i === state.attention ? " ◀ attention" : "";
      console.log(`${lane} ${String(i).padStart(3)}  ${cap(units, i)}${flag}`);
    } else {
      const b = slot.band;
      console.log(`${lane}      ▸ [${b.from}..${b.to}] ${slot.hidden} folded under ${b.anchor} "${cap(units, b.anchor, 36)}"  (${b.kind}, key ${b.key})`);
    }
  });
};

// --- invariants and metrics ---------------------------------------------------------

type Run = {
  readonly rows: number[];
  readonly rail: number[];
  readonly releases: number;
  readonly jitters: number;
  readonly exposures: number;
};

const run = (sugya: Sugya, policy: Policy): Run => {
  const { units } = sugya;
  const tree = treeOf(units);
  const rows: number[] = [];
  const rail: number[] = [];
  let releases = 0;
  let jitters = 0;
  let exposures = 0;
  let state = EMPTY;
  let prevSlots: Slot[] = [];
  for (let step = 1; step <= units.length; step += 1) {
    const before = state;
    const m = step - 1;
    const target = tree.parent[m];
    const targetHidden = target !== undefined && !layout(before.revealed, before.bands).some((s) => s.kind === "row" && s.index === target);
    if (targetHidden) exposures += 1;
    state = arrive(units, tree, state, policy);
    assertLaminar(state.bands, `${sugya.id} step ${step}`);
    for (const b of state.bands) {
      if (b.to >= state.revealed || b.from > b.to) throw new Error(`${sugya.id} step ${step}: band ${b.key} [${b.from}..${b.to}] reaches past the frontier`);
    }

    // No release: every row hidden before is still hidden, unless the arrival had to expose its target.
    const hiddenBefore = new Set(prevSlots.flatMap((s) => (s.kind === "band" ? Array.from({ length: s.hidden }, (_, k) => s.band.from + k) : [])));
    const slots = layout(state.revealed, state.bands);
    const hiddenNow = new Set(slots.flatMap((s) => (s.kind === "band" ? Array.from({ length: s.hidden }, (_, k) => s.band.from + k) : [])));
    if (!targetHidden && [...hiddenBefore].some((i) => !hiddenNow.has(i))) releases += 1;

    // v3's guarantee: a local arrival changes nothing above the frontier.
    const local = target !== undefined && !isLongReach(units, m);
    if (local && !targetHidden) {
      const above = slots.filter((s) => !(s.kind === "row" && s.index === m));
      const sameShape = above.length === prevSlots.length && above.every((s, k) => JSON.stringify(s) === JSON.stringify(prevSlots[k]));
      if (!sameShape) jitters += 1;
    }

    rows.push(slots.length);
    const rails = railsOf(units, state, slots, policy);
    rail.push(rails[0]?.span ?? 0);
    prevSlots = slots;
  }
  return { rows, rail, releases, jitters, exposures };
};

// --- go -------------------------------------------------------------------------------

console.log("=== invariants and page size, per sugya ===");
console.log("sugya                          units | v3: max rows  max rail | threads: max rows  max rail  releases  jitters  exposures | flat: max rows  max rail");
for (const sugya of ALL) {
  const base = v3(sugya.units);
  const tree = run(sugya, DEFAULT_POLICY);
  const flat = run(sugya, FLAT);
  const max = (xs: number[]): number => Math.max(...xs);
  console.log(
    `${(sugya.tractate + " " + sugya.folio).padEnd(30)} ${String(sugya.units.length).padStart(5)} |     ${String(max(base.rows)).padStart(8)}  ${String(max(base.rail)).padStart(8)} |          ${String(max(tree.rows)).padStart(8)}  ${String(max(tree.rail)).padStart(8)}  ${String(tree.releases).padStart(8)}  ${String(tree.jitters).padStart(7)}  ${String(tree.exposures).padStart(9)} |      ${String(max(flat.rows)).padStart(8)}  ${String(max(flat.rail)).padStart(8)}`,
  );
}

console.log("\n=== rows on the page at the step where v3 is worst ===");
for (const sugya of ALL) {
  const base = v3(sugya.units);
  const tree = run(sugya, DEFAULT_POLICY);
  const worst = base.rail.indexOf(Math.max(...base.rail));
  console.log(
    `${(sugya.tractate + " " + sugya.folio).padEnd(30)} step ${String(worst + 1).padStart(2)} "${cap(sugya.units, worst, 44)}": v3 ${base.rows[worst]} rows, rail ${base.rail[worst]}; threads ${tree.rows[worst]} rows, rail ${tree.rail[worst]}`,
  );
}

// --- v3 parity of the reader's press, under `flat` -----------------------------------------
// v3: pressing a long-reaching move's handle makes it the focus, folded. Here: `press`.
// The page after the press must be the same page, at every step, for every move.
{
  const { units } = bavaMetziaYeush;
  const key = (s: Slot): string => (s.kind === "row" ? `r${s.index}` : `b${s.band.from}-${s.band.to}`);
  let checked = 0;
  let mismatches = 0;
  let focus: Focus | undefined;
  for (let n = 1; n <= units.length; n += 1) {
    focus = focusAfterSeek(units, n, focus);
    const before = replay(units, n, FLAT);
    for (let m = 0; m < n; m += 1) {
      if (!isLongReach(units, m)) continue;
      // Only a move with a handle on the page can be pressed. v3 could reach a hidden
      // move only by releasing the fold that hides it, which is the behaviour removed.
      if (!isRow(layout(n, before.bands), m)) continue;
      const pressedV3: Focus = focus?.id === units[m]!.id ? { ...focus, folded: !focus.folded } : { id: units[m]!.id, folded: true };
      if (!pressedV3.folded) continue; // unfolding differs by design: v3 shows every row, here one level
      const a = slotsOf(n, foldRangeOf(units, pressedV3)).map((s) => (s.kind === "row" ? `r${s.index}` : `b${s.from}-${s.to - 1}`)).join(" ");
      const st = press(units, before, m, FLAT);
      const b = layout(n, st.bands).map(key).join(" ");
      checked += 1;
      if (a !== b) {
        mismatches += 1;
        if (mismatches <= 3) console.log(`press mismatch at step ${n}, move ${m}:\n  v3   ${a}\n  tree ${b}`);
      }
    }
  }
  console.log(`\n=== press parity with v3 (flat policy, fixture): ${checked} presses checked, ${mismatches} mismatches ===`);
}

const by = (id: string): Sugya => ALL.find((s) => s.id === id)!;

{
  const s = by("bm-2a-ochazin");
  let st = replay(s.units, 26);
  page(s.units, st, DEFAULT_POLICY, "Bava Metzia 2a at 26: R. Yose's challenge arrives open");
  st = toggle(s.units, st, "frame:16:17");
  page(s.units, st, DEFAULT_POLICY, "…reader opens the Sumchos frame: two rails, nested");
  st = toggle(s.units, st, "frame:1:2");
  page(s.units, st, DEFAULT_POLICY, "…and Rav Pappa's frame under the first question: attention moves with it");
}

{
  const s = by("bk-2a-toldos");
  let st = replay(s.units, 69);
  page(s.units, st, DEFAULT_POLICY, "Bava Kamma 3a at 69: the fifth אלא on אהייא");
  st = toggle(s.units, st, "frame:29:30");
  page(s.units, st, DEFAULT_POLICY, "…opened one level: the candidates");
  st = toggle(s.units, st, "thread:31:32");
  page(s.units, st, DEFAULT_POLICY, "…and the first candidate's thread: the shen/regel derivation, its own rakes folded");
}

{
  const s = by("bava-metzia-yeush");
  let st = replay(s.units, 51);
  page(s.units, st, DEFAULT_POLICY, "Bava Metzia 22b at 51: the ruling (as v3)");
  st = toggle(s.units, st, "frame:0:1");
  page(s.units, st, DEFAULT_POLICY, "…opened one level: both sides' challenges as rows, every answer folded");
  st = toggle(s.units, st, "thread:41:42");
  page(s.units, st, DEFAULT_POLICY, "…and the dew thread: one level, no new rail (nothing long-reaching lands on 'dew')");
  page(s.units, replay(s.units, 48), DEFAULT_POLICY, "Bava Metzia 22b at 48: the last תא שמע, threads policy (v3 shows 48 flat rows here)");
  page(s.units, replay(s.units, 48, FLAT), FLAT, "Bava Metzia 22b at 48, flat policy: identical to v3");
  let pressed = press(s.units, replay(s.units, 48, FLAT), 47, FLAT);
  page(s.units, pressed, FLAT, "…the reader folds the open challenge by hand (press the rail): v3's fold, 2..46");
  pressed = press(s.units, pressed, 47, FLAT);
  page(s.units, pressed, FLAT, "…and presses again: one level, not forty-five rows");
  pressed = press(s.units, pressed, 24, FLAT);
  page(s.units, pressed, FLAT, "…then presses the handle of 'the thief who passed it on': it takes attention, folded");
}

{
  const s = by("pes-2a-or");
  page(s.units, replay(s.units, 43), DEFAULT_POLICY, "Pesachim 2b at 43: the fifteenth proof-text, threads policy");
  page(s.units, replay(s.units, 44), DEFAULT_POLICY, "Pesachim 2b at 44: אלא — everyone agrees");
  let st = replay(s.units, 45);
  page(s.units, st, DEFAULT_POLICY, "Pesachim 2b at 45: ותנא דידן returns to the mishnah — nothing released");
  st = toggle(s.units, st, "thread:1:2");
  st = toggle(s.units, st, "thread:2:3");
  page(s.units, st, DEFAULT_POLICY, "…two levels opened under 'what is or?': the אלא frame is intact inside");
  st = toggle(s.units, st, "frame:2:5");
  page(s.units, st, DEFAULT_POLICY, "…the אלא frame opened one level: fifteen proof-texts as rows, answers folded");
}

{
  const s = by("ber-2a-meeimasai");
  page(s.units, replay(s.units, 36), DEFAULT_POLICY, "Berakhot 3a at 36: the next clause of the mishnah");
}

{
  const s = by("kid-2a-nikneis");
  let st = replay(s.units, 36);
  page(s.units, st, DEFAULT_POLICY, "Kiddushin 2b at 36: אלא כל היכא דאיכא פלוגתא");
  st = toggle(s.units, st, "frame:21:22");
  page(s.units, st, DEFAULT_POLICY, "…opened one level");
}
