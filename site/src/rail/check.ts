/**
 * Acceptance tests. Each expectation is something Ramchal states in the text,
 * not something the implementation happens to produce.
 */

import { readFileSync } from "node:fs";

import { bavaMetziaYeush } from "./fixtures/bava-metzia-yeush.ts";
import { berachosYaakov } from "./fixtures/berachos-yaakov.ts";
import { pesachimLiquids } from "./fixtures/pesachim-liquids.ts";
import { yebamosChalitzah } from "./fixtures/yebamos-chalitzah.ts";
import { yebamosDeafMute } from "./fixtures/yebamos-deafmute.ts";
import {
  analyze,
  COLLECTIONS,
  labelBasis,
  maxDepth,
  movementsOf,
  prefixOf,
  PROVENANCES,
  type Provenance,
  type Standing,
  type Status,
  type Sugya,
  type Unit,
} from "./sugya.ts";
import { LIGHT } from "./theme.ts";
import {
  anchorOf,
  arrive,
  arrivesFolded,
  assertLaminar,
  captionOf,
  closesBusiness,
  DEFAULT_POLICY,
  EMPTY,
  isLongReach,
  isRow,
  landingStart,
  layout,
  press,
  railsOf,
  reachOf,
  replay,
  summarizeFold,
  toggle,
  treeOf,
  type Band,
  type FoldState,
  type Policy,
  type Slot,
} from "./folding.ts";
import {
  bavaKammaToldos,
  bavaMetziaOchazin,
  gittinBefanai,
  pesachimOr,
  RESEARCH_FIXTURES,
} from "./fixtures/research/index.ts";
import {
  BEAD_MIN_RUN,
  beadFits,
  beadPoint,
  beadRadius,
  INDENT,
  indentFor,
  LATTICE_BUDGET,
  MIN_INDENT,
} from "./layout.ts";
import { ELEMENTS, LEAVES, MOVE_KEYS, SUBTYPES } from "./taxonomy.ts";
import {
  ANATOMY,
  ANATOMY_KEYS,
  annotationErrors,
  badgesOf,
  BASES,
  basisOf,
  FAMILY_ORDER,
  GROUND_OF_PROVENANCE,
  groundBadge,
  hueOf,
  PARTIES,
  speakerBadge,
} from "./anatomy.ts";
import { BUSY_GLYPHS, GLYPHS, glyphAspect, TILE_GLYPH, WIDE_GLYPHS } from "./glyphs.ts";
import { moveGlyph } from "./moveGlyphs.ts";
import { FIXTURES } from "./fixtures/index.ts";
import { FORMAT, FORMAT_VERSION, parseSugya, stringify, SugyaFormatError, toJson } from "./format.ts";
import { renderSugya } from "./render.ts";
import { SUGYOT, sugyaById } from "./sugyot/index.ts";

let failures = 0;

const check = (label: string, actual: unknown, expected: unknown): void => {
  const ok = actual === expected;
  if (!ok) failures += 1;
  console.log(`${ok ? "pass" : "FAIL"}  ${label}${ok ? "" : `  (got ${String(actual)}, want ${String(expected)})`}`);
};

const statusOf = (sugya: Sugya, id: string): Status | undefined => analyze(sugya).status.get(id);
const standingOf = (sugya: Sugya, id: string): Standing | undefined =>
  analyze(sugya).standing.get(id);
const sumOf = (movements: readonly { readonly units: readonly unknown[] }[]): number =>
  movements.reduce((acc, m) => acc + m.units.length, 0);

console.log("\nTaxonomy");
check("nineteen leaf types", Object.keys(LEAVES).length, 19);

console.log("\nPesachim — a refuted objection restores the proof");
check("Rav Papa absolutely contradicted (Heb p177)", statusOf(pesachimLiquids, "ravpapa"), "rejected");
check("Rav Papa's move is defeated", standingOf(pesachimLiquids, "ravpapa"), "defeated");
check("the demonstration stands again", standingOf(pesachimLiquids, "testimony"), "live");
check("R. Eleazar's ruling accepted", statusOf(pesachimLiquids, "eleazar"), "accepted");

console.log("\nPesachim counterfactual — rebutting a proof yields doubt, not rejection (Ch8 p142)");
const withoutRavHuna: Sugya = {
  ...pesachimLiquids,
  units: pesachimLiquids.units.filter((u) => u.id !== "ravhuna"),
};
check("the demonstration is weakened", standingOf(withoutRavHuna, "testimony"), "weakened");
check("R. Eleazar falls to doubt, not rejected", statusOf(withoutRavHuna, "eleazar"), "doubt");

console.log("\nPesachim by prefix — the ruling's acceptance is not monotonic");
// What the reveal slider shows: the same claim moves between states as the
// debate proceeds, so a prefix is the sugya as it stood at that sentence.
const atStep = (n: number): Status | undefined =>
  statusOf(prefixOf(pesachimLiquids, n), "eleazar");
check("1. asserted, nothing yet weighs on it", atStep(1), "doubt");
check("2. the testimony proves it", atStep(2), "accepted");
check("3. Rav Papa unseats the proof", atStep(3), "doubt");
check("4. Rav Huna refutes Rav Papa, so it stands again", atStep(4), "accepted");
check("a prefix keeps only the sentences named", prefixOf(pesachimLiquids, 2).units.length, 2);

console.log("\nBerachos — a settlement fully discharges the difficulty");
check("the ramya is discharged, not refuted", standingOf(berachosYaakov, "rami"), "discharged");
check("the verse keeps its authority", statusOf(berachosYaakov, "promise"), "accepted");

console.log("\nYebamos 104b — an alternative clears the difficulty without proving the claim");
check("the difficulty is only weakened", standingOf(yebamosChalitzah, "baraita"), "weakened");
check("Rava remains merely possible", statusOf(yebamosChalitzah, "rava"), "doubt");

console.log("\nYebamos 112b — an answer closes a question without refuting it");
check("the query is answered", standingOf(yebamosDeafMute, "question"), "discharged");

// --- scale -----------------------------------------------------------------
// Bava Metzia is the first fixture Ramchal does not discuss, so these check the
// model against the Talmud's own verdicts instead of against his.

const bm = bavaMetziaYeush;

console.log("\nBava Metzia 21b-22b — the Talmud's own verdicts");
check("`תיובתא דרבא` — Rava is refuted", standingOf(bm, "rava"), "defeated");
check("and his position rejected", statusOf(bm, "rava"), "rejected");
check("`והלכתא כוותיה דאביי` — Abaye accepted", statusOf(bm, "abaye"), "accepted");
check("Abaye's claim itself was never attacked directly", standingOf(bm, "abaye"), "live");

console.log("\nBava Metzia — every challenge the Gemara answers is closed, not refuted");
for (const id of ["t1-ask", "t2-ask", "t5-ask", "t8-ask", "t10-ask", "t11-ask"]) {
  check(`${id} is discharged`, standingOf(bm, id), "discharged");
}
check(
  "the one read as `שנוי` leaves its difficulty merely weakened",
  standingOf(bm, "t9-ask"),
  "weakened",
);

console.log("\nBava Metzia — refuting Rava restores Abaye, fifty sentences later");
// The Pesachim property at scale: Rava's `דחיה` on Abaye is spent once Rava is
// himself refuted, so nothing is pressing on Abaye when the ruling arrives.
const atAbaye = (n: number): number => analyze(prefixOf(bm, n)).pressure.get("abaye") ?? -1;
check("while Rava stands, something is pressing on Abaye", atAbaye(2), 1);
check("a fresh `תא שמע` makes it two", atAbaye(7), 2);
check("the answer takes it back to one", atAbaye(8), 1);
check("the `סתירה` on Rava clears the board", atAbaye(49), 0);

console.log("\nBava Metzia — the order attacks are written in must not matter");
// Four moves land on Rava. Folding them in sequence made the outcome depend on
// which was written last: `reject` then `unsettle` yields doubt, the reverse
// yields rejected. Reversing the three closing moves must change nothing.
const reordered: Sugya = {
  ...bm,
  units: [
    ...bm.units.slice(0, 47),
    bm.units[49]!,
    bm.units[48]!,
    bm.units[47]!,
    ...bm.units.slice(50),
  ],
};
check("Rava is still rejected", statusOf(reordered, "rava"), "rejected");
check("Abaye is still accepted", statusOf(reordered, "abaye"), "accepted");

console.log("\nBava Metzia — what the shape of the passage costs the layout");
check("fifty-seven sentences", bm.units.length, 57);
check("eighteen movements, derived not declared", movementsOf(bm).length, 18);
check("seven levels deep", maxDepth(analyze(bm)), 7);
check("the staircase stays inside its budget", indentFor(7) * 8 <= LATTICE_BUDGET + 1, true);
check("a short passage keeps the full indent", indentFor(3), 34);
check("indent never falls below the floor", indentFor(40), MIN_INDENT);
check("every movement is contiguous and they cover the passage", sumOf(movementsOf(bm)), 57);

// --- folding ----------------------------------------------------------------
// The closing `סתירה` is forty-six sentences from the Rava it refutes. Rather
// than draw a line that long, everything between them folds away when the move
// arrives, so the two sit together and the line between them is short.

console.log("\nBava Metzia — a refutation reaches back to what it refutes");
const bu = bm.units;
const at = (id: string): number => bu.findIndex((u) => u.id === id);

check("the `סתירה` is 46 sentences from Rava", reachOf(bu, at("t12-dumya")), 46);
check("the `תיובתא` is 47 from Rava", reachOf(bu, at("t12-tiyuvta")), 47);
check("a first `תא שמע` already reaches past a screen", reachOf(bu, at("t1-ask")), 5);
check("an answer to the sentence above it reaches nothing", reachOf(bu, at("t1-ans")), 0);

// The three closing moves all act on Rava and follow one another. They are one
// landing: folding for the last must not hide the first two.
check("the landing on Rava begins at the last `תא שמע`", landingStart(bu, at("t12-tiyuvta")), at("t12-ask"));
check("…and the `סתירה` is in the same landing", landingStart(bu, at("t12-dumya")), at("t12-ask"));
check("a lone `תא שמע` is its own landing", landingStart(bu, at("t11-ask")), at("t11-ask"));

// What arrives folded is decided by what the move does to its target: a
// challenge opens business and arrives with the history in view; a refutation,
// a ruling or an answer closes it and arrives with the history put away.
check("a `סתירה` closes business", closesBusiness("reject"), true);
check("so does a ruling", closesBusiness("raise"), true);
check("and an answer", closesBusiness("discharge"), true);
check("a challenge does not", closesBusiness("unsettle"), false);
check("nor a bare statement", closesBusiness("open"), false);
check("a `תא שמע` arrives unfolded", arrivesFolded(bu, at("t1-ask")), false);
check("so does the last `תא שמע`, forty-five sentences out", arrivesFolded(bu, at("t12-ask")), false);
check("the `סתירה` arrives folded", arrivesFolded(bu, at("t12-dumya")), true);
check("the `תיובתא` inherits that from its landing", arrivesFolded(bu, at("t12-tiyuvta")), true);
check("the ruling arrives folded", arrivesFolded(bu, at("halachta")), true);

// --- the page, as strings -----------------------------------------------------
// A page is written as its slots: a row by its index, a band as `f[2..46]@0`
// (a frame hiding 2–46 under sentence 0) or `t[7]@6` (a thread of one row
// under sentence 6). A rail is `anchor → move` with its teeth.

const FLAT: Policy = { ...DEFAULT_POLICY, openArrival: "flat" };
const THREADS: Policy = DEFAULT_POLICY;

const bandStr = (b: Band): string =>
  `${b.kind === "frame" ? "f" : "t"}[${b.from}${b.to > b.from ? `..${b.to}` : ""}]@${b.anchor}`;
const slotStr = (s: Slot): string => (s.kind === "row" ? String(s.index) : bandStr(s.band));
const pageOf = (state: FoldState): string => layout(state.revealed, state.bands).map(slotStr).join(" ");
const rowsOf = (state: FoldState): string =>
  layout(state.revealed, state.bands).flatMap((s) => (s.kind === "row" ? [s.index] : [])).join(" ");
const bandsOf = (state: FoldState): string =>
  layout(state.revealed, state.bands).flatMap((s) => (s.kind === "band" ? [bandStr(s.band)] : [])).join(" ");
const slotsOn = (state: FoldState): number => layout(state.revealed, state.bands).length;
const rails = (units: readonly Unit[], state: FoldState, policy: Policy) =>
  railsOf(units, state, layout(state.revealed, state.bands), policy);
const railStr = (units: readonly Unit[], state: FoldState, policy: Policy, lane = 0): string => {
  const r = rails(units, state, policy)[lane];
  return r === undefined ? "none" : `${r.anchor} → ${r.move}`;
};
const teethStr = (units: readonly Unit[], state: FoldState, policy: Policy, lane = 0): string =>
  rails(units, state, policy)[lane]?.teeth.join(" ") ?? "none";
const spanOf = (units: readonly Unit[], state: FoldState, policy: Policy, lane = 0): number =>
  rails(units, state, policy)[lane]?.span ?? -1;
const bandBy = (state: FoldState, key: string): Band | undefined =>
  state.bands.find((b) => b.key === key);

// --- a v3 oracle, private to these checks -------------------------------------
// The `flat` policy has to give the page v3 gave. This is v3's Focus model,
// copied from the folding module as it stood before the fold tree, so that
// the parity check does not lean on the code it is checking.

type Focus = { readonly id: string; readonly folded: boolean };
type V3Range = { readonly from: number; readonly to: number };
type V3Slot =
  | { readonly kind: "row"; readonly index: number }
  | { readonly kind: "fold"; readonly from: number; readonly to: number };

const idOf = (units: readonly Unit[], id: string): number => units.findIndex((u) => u.id === id);

const v3FoldRangeOf = (units: readonly Unit[], focus: Focus | undefined): V3Range | undefined => {
  if (focus === undefined || !focus.folded) return undefined;
  const index = idOf(units, focus.id);
  const target = units[index]?.target;
  if (target === undefined) return undefined;
  const from = idOf(units, target) + 1;
  const to = landingStart(units, index);
  return to > from ? { from, to } : undefined;
};

const v3Hidden = (range: V3Range | undefined, index: number): boolean =>
  range !== undefined && index >= range.from && index < range.to;

const v3LatestLongReach = (units: readonly Unit[], before: number): number | undefined => {
  for (let i = Math.min(before, units.length) - 1; i >= 0; i -= 1) {
    if (isLongReach(units, i)) return i;
  }
  return undefined;
};

const v3SameLanding = (units: readonly Unit[], earlier: number, later: number): boolean =>
  earlier >= 0 && earlier <= later && earlier >= landingStart(units, later);

const v3FocusAfterSeek = (
  units: readonly Unit[],
  revealed: number,
  current: Focus | undefined,
): Focus | undefined => {
  const frontier = revealed - 1;
  const frontierUnit = units[frontier];
  if (frontierUnit !== undefined && isLongReach(units, frontier)) {
    const held = current === undefined ? -1 : idOf(units, current.id);
    const carries =
      current !== undefined &&
      v3SameLanding(units, held, frontier) &&
      arrivesFolded(units, held) === arrivesFolded(units, frontier);
    return {
      id: frontierUnit.id,
      folded: carries ? current.folded : arrivesFolded(units, frontier),
    };
  }
  if (current !== undefined && idOf(units, current.id) < revealed) return current;
  const latest = v3LatestLongReach(units, revealed);
  return latest === undefined
    ? undefined
    : { id: units[latest]!.id, folded: arrivesFolded(units, latest) };
};

const v3SlotsOf = (count: number, hidden: V3Range | undefined): readonly V3Slot[] =>
  Array.from({ length: count }, (_, i) => i).reduce<V3Slot[]>((acc, i) => {
    if (!v3Hidden(hidden, i)) {
      acc.push({ kind: "row", index: i });
      return acc;
    }
    const last = acc[acc.length - 1];
    if (last?.kind === "fold" && last.to === i) {
      acc[acc.length - 1] = { ...last, to: i + 1 };
    } else {
      acc.push({ kind: "fold", from: i, to: i + 1 });
    }
    return acc;
  }, []);

// Both pages in one neutral spelling, so they can be compared slot for slot.
const v3Page = (units: readonly Unit[], revealed: number, focus: Focus | undefined): string =>
  v3SlotsOf(revealed, v3FoldRangeOf(units, focus))
    .map((s) => (s.kind === "row" ? `r${s.index}` : `b${s.from}-${s.to - 1}`))
    .join(" ");
const treePage = (state: FoldState): string =>
  layout(state.revealed, state.bands)
    .map((s) => (s.kind === "row" ? `r${s.index}` : `b${s.band.from}-${s.band.to}`))
    .join(" ");

// --- invariants, every passage, every step, both policies ----------------------
// Laminar: no two bands cross. Frontier: no band reaches the frontier. No
// release: a row hidden before an arrival is hidden after it, unless the
// arrival had to expose its own target. No jitter: a local arrival whose
// target is on the page changes nothing above the frontier.

console.log("\nEvery passage — the fold tree's invariants hold at every step");
const hiddenRows = (slots: readonly Slot[]): Set<number> =>
  new Set(
    slots.flatMap((s) =>
      s.kind === "band" ? Array.from({ length: s.hidden }, (_, k) => s.band.from + k) : [],
    ),
  );
type Faults = { laminar: number; frontier: number; releases: number; jitters: number };
const faultsOf = (sugya: Sugya, policy: Policy): Faults => {
  const { units } = sugya;
  const tree = treeOf(units);
  const faults: Faults = { laminar: 0, frontier: 0, releases: 0, jitters: 0 };
  let state = EMPTY;
  let before: Slot[] = [];
  for (let step = 1; step <= units.length; step += 1) {
    const m = step - 1;
    const target = tree.parent[m];
    const targetHidden = target !== undefined && !isRow(before, target);
    state = arrive(units, tree, state, policy);
    try {
      assertLaminar(state.bands, `${sugya.id} step ${step}`);
    } catch {
      faults.laminar += 1;
    }
    if (state.bands.some((b) => b.to >= state.revealed || b.from > b.to)) faults.frontier += 1;
    const slots = layout(state.revealed, state.bands);
    const wasHidden = hiddenRows(before);
    const nowHidden = hiddenRows(slots);
    if (!targetHidden && [...wasHidden].some((i) => !nowHidden.has(i))) faults.releases += 1;
    const local = target !== undefined && !isLongReach(units, m);
    if (local && !targetHidden) {
      const above = slots.filter((s) => !(s.kind === "row" && s.index === m));
      const same =
        above.length === before.length &&
        above.every((s, k) => JSON.stringify(s) === JSON.stringify(before[k]));
      if (!same) faults.jitters += 1;
    }
    before = slots;
  }
  return faults;
};
for (const sugya of SUGYOT) {
  for (const [name, policy] of [["threads", THREADS], ["flat", FLAT]] as const) {
    const f = faultsOf(sugya, policy);
    check(`${sugya.id}, ${name}: laminar at every step`, f.laminar, 0);
    check(`${sugya.id}, ${name}: no band reaches the frontier`, f.frontier, 0);
    check(`${sugya.id}, ${name}: nothing hidden is released by an arrival`, f.releases, 0);
    check(`${sugya.id}, ${name}: a local arrival changes nothing above it`, f.jitters, 0);
  }
}

// --- flat ≡ v3 --------------------------------------------------------------------
// Under `flat`, the page at every step is v3's page, and pressing any
// long-reaching move whose handle is on the page gives v3's page after
// `pressHandle`. Unfolding differs by design — v3 showed every row, the tree
// opens one level — so only folding presses are compared.

console.log("\nBava Metzia, flat — the page v3 drew, at every step and after every press");
{
  let pageMismatches = 0;
  let presses = 0;
  let pressMismatches = 0;
  let focus: Focus | undefined;
  for (let n = 1; n <= bu.length; n += 1) {
    focus = v3FocusAfterSeek(bu, n, focus);
    const state = replay(bu, n, FLAT);
    if (v3Page(bu, n, focus) !== treePage(state)) pageMismatches += 1;
    for (let m = 0; m < n; m += 1) {
      if (!isLongReach(bu, m) || !isRow(layout(n, state.bands), m)) continue;
      const pressed: Focus =
        focus?.id === bu[m]!.id ? { ...focus, folded: !focus.folded } : { id: bu[m]!.id, folded: true };
      if (!pressed.folded) continue;
      presses += 1;
      if (v3Page(bu, n, pressed) !== treePage(press(bu, state, m, FLAT))) pressMismatches += 1;
    }
  }
  check("the page is v3's at all 57 steps", pageMismatches, 0);
  check("349 folding presses are possible across the walk", presses, 349);
  check("every one gives v3's page", pressMismatches, 0);
}

// The step the whole feature exists for: one press of "what happens next" at
// the last `תא שמע` hides nothing; the next hides everything between Rava and
// the blow that refutes him.
check("before the `סתירה`: nothing hidden", bandsOf(replay(bu, at("t12-dumya"), FLAT)), "");
// The band hangs from Abaye, not Rava: the stretch holds challenges on both.
check("at the `סתירה`: forty-five sentences hidden", bandsOf(replay(bu, at("t12-dumya") + 1, FLAT)), "f[2..46]@0");
check("…and the `סתירה` takes the attention", replay(bu, at("t12-dumya") + 1, FLAT).attention, at("t12-dumya"));
check("the `תיובתא` keeps the very same band", bandsOf(replay(bu, at("t12-tiyuvta") + 1, FLAT)), "f[2..46]@0");
check("the ruling folds the whole debate under Abaye", pageOf(replay(bu, at("halachta") + 1, FLAT)), `0 f[1..49]@0 ${at("halachta")}`);

// What the band says is derived from the analysis at that step, not stored.
const dumyaBand = bandBy(replay(bu, at("t12-dumya") + 1, FLAT), "frame:0:2");
const atDumya = analyze(prefixOf(bm, at("t12-dumya") + 1));
const summary =
  dumyaBand === undefined ? undefined : summarizeFold(bm, atDumya, { from: dumyaBand.from, to: dumyaBand.to + 1 });
// Twelve, not thirteen: the twelfth challenge is the landing, and stays in view.
check("twelve movements are folded", summary?.movements.length, 12);
check("all but the beams challenge have been answered", summary?.standing, 1);
check("the beams challenge is the one still standing", standingOf(prefixOf(bm, at("t12-dumya") + 1), "t9-ask"), "weakened");

// --- threads: the same passage with finished threads put away --------------------
// At the last `תא שמע` v3 showed forty-eight flat rows and a rail forty-six
// long. The threads policy shows the twelve challenges as teeth on Rava's rail
// with their answers folded under them.

console.log("\nBava Metzia, threads — the challenges stay, their answers fold");
{
  const s48 = replay(bu, 48, THREADS);
  check("step 48: twenty-nine slots, not forty-eight", slotsOn(s48), 29);
  check("…the rows are Abaye, Rava and the teeth", rowsOf(s48), "0 1 6 8 10 12 14 16 18 20 24 29 33 34 41 47");
  check("…the first bands are one thread each", bandsOf(s48).startsWith("t[2..5]@1 t[7]@6 t[9]@8"), true);
  check("…one rail, Rava to the last `תא שמע`", railStr(bu, s48, THREADS), "1 → 47");
  check("…whose teeth are the long-reaching challenges", teethStr(bu, s48, THREADS), "20 29 41");
  check("…spanning twenty-seven rows", spanOf(bu, s48, THREADS), 27);
  check("…in one lane", rails(bu, s48, THREADS).length, 1);

  const s51 = replay(bu, 51, THREADS);
  check("step 51: the ruling leaves three slots", pageOf(s51), "0 f[1..49]@0 50");
  check("…rail Abaye to the ruling", railStr(bu, s51, THREADS), "0 → 50");
  check("…two rows long", spanOf(bu, s51, THREADS), 2);

  const opened = toggle(bu, s51, "frame:0:1", THREADS);
  check("opening the ruling's band: thirty-one slots", slotsOn(opened), 31);
  check("…Rava and his challengers back on the page", rowsOf(opened).startsWith("0 1 6 8 10 12 14 16 18"), true);
  check("…the rail is still Abaye's", railStr(bu, opened, THREADS), "0 → 50");
  check("…with Abaye's own challengers as teeth", teethStr(bu, opened, THREADS), "6 8 10 12 14 16 18 24 33");
  check("…spanning thirty rows", spanOf(bu, opened, THREADS), 30);
  check("closing it again gives the page of three", pageOf(toggle(bu, opened, "frame:0:1", THREADS)), "0 f[1..49]@0 50");

  // The reader's presses under flat: v3's fold by hand, then one level, then another move.
  const flat48 = replay(bu, 48, FLAT);
  const once = press(bu, flat48, 47, FLAT);
  check("flat, step 48, press the open challenge: v3's fold", pageOf(once), "0 1 f[2..46]@0 47");
  const twice = press(bu, once, 47, FLAT);
  check("…press again: one level, thirty-one slots, not forty-eight", slotsOn(twice), 31);
  check("…the challenge keeps the attention", twice.attention, 47);
  check("…and its rail", railStr(bu, twice, FLAT), "1 → 47");
  check("…twenty-nine rows long", spanOf(bu, twice, FLAT), 29);
  const thief = press(bu, twice, 24, FLAT);
  check("…press the thief's handle: it takes attention", thief.attention, 24);
  check("…folded", bandBy(thief, "frame:0:1")?.closed, true);
  check("…rail Abaye to the thief", railStr(bu, thief, FLAT), "0 → 24");
  check("…two rows long", spanOf(bu, thief, FLAT), 2);

  // What the bands say.
  check("a frame is captioned by the relation that made it", captionOf(bu, bandBy(once, "frame:0:2")!), "between Rava: despair and the item a river swept off");
  check("a thread is captioned by the sentence it hangs under", captionOf(bu, bandBy(s48, "thread:6:7")!), `under ${bu[6]!.short}`);
}

// --- the research passages: nested frames and two rails --------------------------

console.log("\nBava Metzia 2a — Rav Pappa's frame inside the `אלא` frame");
{
  const u = bavaMetziaOchazin.units;
  const s26 = replay(u, 26, THREADS);
  check("step 26: eleven slots", slotsOn(s26), 11);
  check("…rows", rowsOf(s26), "0 1 10 14 16 24 25");
  check("…bands: two frames, two threads", bandsOf(s26), "f[2..9]@1 t[11..13]@10 t[15]@14 f[17..23]@16");
  check("…rail from the mishna to the `אלא`", railStr(u, s26, THREADS), "0 → 25");
  check("…teeth", teethStr(u, s26, THREADS), "14 16");
  check("…span", spanOf(u, s26, THREADS), 10);
  check("Rav Pappa's frame is there from step 11", bandBy(replay(u, 11, THREADS), "frame:1:2") !== undefined, true);
  check("…and still there at step 26", bandBy(s26, "frame:1:2") !== undefined, true);

  const inner = toggle(u, s26, "frame:16:17", THREADS);
  check("open the inner frame: seventeen slots", slotsOn(inner), 17);
  check("…attention moves to the move whose interior opened", inner.attention, 24);
  check("…lane 0 is that move's rail", railStr(u, inner, THREADS, 0), "16 → 24");
  check("…with one tooth", teethStr(u, inner, THREADS, 0), "22");
  check("…lane 1 is the enclosing `אלא` rail", railStr(u, inner, THREADS, 1), "0 → 25");
  check("…with its teeth unchanged", teethStr(u, inner, THREADS, 1), "14 16");

  const both = toggle(u, inner, "frame:1:2", THREADS);
  check("open Rav Pappa's frame too: nineteen slots", slotsOn(both), 19);
  check("…attention moves to Rav Pappa's closer", both.attention, 10);
  check("…lane 0 is Rav Pappa's rail", railStr(u, both, THREADS, 0), "1 → 10");
  check("…lane 1 is still the `אלא` rail", railStr(u, both, THREADS, 1), "0 → 25");
  check("…two lanes, no more", rails(u, both, THREADS).length, 2);
}

console.log("\nBava Kamma 2a — one frame over the whole `אבות` debate");
{
  const u = bavaKammaToldos.units;
  const s69 = replay(u, 69, THREADS);
  check("step 69: nineteen slots", slotsOn(s69), 19);
  check("…ending in the frame and the closer", pageOf(s69).endsWith("29 f[30..67]@29 68"), true);
  check("…rail two rows long", railStr(u, s69, THREADS), "29 → 68");
  check("…span", spanOf(u, s69, THREADS), 2);
  check("the frame's key holds from step 51", bandBy(replay(u, 51, THREADS), "frame:29:30") !== undefined, true);
  check("…to step 69", bandBy(s69, "frame:29:30") !== undefined, true);

  const opened = toggle(u, s69, "frame:29:30", THREADS);
  check("open it: thirty-five slots", slotsOn(opened), 35);
  check("…the rows inside", rowsOf(opened).endsWith("30 31 39 44 48 50 53 60 65 68"), true);
  check("…the first thread inside it", bandsOf(opened).includes("t[32..38]@31 t[40..43]@39"), true);
  check("…the rail is the same relation", railStr(u, opened, THREADS), "29 → 68");
  check("…now with teeth", teethStr(u, opened, THREADS), "50 53 60 65");
  check("…spanning eighteen rows", spanOf(u, opened, THREADS), 18);

  const thread = toggle(u, opened, "thread:31:32", THREADS);
  check("open a thread inside: thirty-six slots", slotsOn(thread), 36);
  check("…attention moves into the thread", thread.attention, 48);
  check("…lane 0 is the thread's relation", railStr(u, thread, THREADS, 0), "31 → 48");
  check("…lane 1 is the frame's", railStr(u, thread, THREADS, 1), "29 → 68");
}

console.log("\nPesachim 2a — a closer lands on a hidden target");
{
  const u = pesachimOr.units;
  const tree = treeOf(u);
  const s43 = replay(u, 43, THREADS);
  check("step 43: twenty-five slots", slotsOn(s43), 25);
  check("…rail from the question to the last proof", railStr(u, s43, THREADS), "2 → 42");
  check("…eight teeth", teethStr(u, s43, THREADS), "13 23 24 36 37 39 40 41");
  check("…span", spanOf(u, s43, THREADS), 22);

  const s44 = replay(u, 44, THREADS);
  check("step 44: `אלא` folds the proofs under the question", pageOf(s44), "0 1 2 3 4 f[5..42]@2 43");
  check("…its rail is two rows long", railStr(u, s44, THREADS), "4 → 43");
  check("…span", spanOf(u, s44, THREADS), 2);
  check("…the frame's anchor is the question, not the `אלא`'s target", anchorOf(tree, 5, 42, 4), 2);

  const s45 = replay(u, 45, THREADS);
  check("step 45: the ruling folds the frame into a thread", pageOf(s45), "0 1 t[2..42]@1 43 44");

  const opened = toggle(u, toggle(u, toggle(u, s45, "thread:1:2", THREADS), "thread:2:3", THREADS), "frame:2:5", THREADS);
  check("open three levels: thirty-one slots", slotsOn(opened), 31);
  check("…lane 0 is the proofs' rail", railStr(u, opened, THREADS, 0), "2 → 42");
  check("…with the eight teeth back", teethStr(u, opened, THREADS, 0), "13 23 24 36 37 39 40 41");
  check("…lane 1 is the ruling's", railStr(u, opened, THREADS, 1), "0 → 44");
}

console.log("\nThe research skeletons — what each row says about itself");
{
  const all = RESEARCH_FIXTURES.flatMap((s) => s.units);
  const basis = all.map(labelBasis);
  check("nothing in them is attested", basis.filter((b) => b === "attested").length, 0);
  check("most rows open with a stock phrase and read `marked`", basis.filter((b) => b === "marked").length >= 110, true);
  check("…and a fifth are all content and stay `inferred`", basis.filter((b) => b === "inferred").length >= 25, true);
  check("a marker never sits on an empty string", all.every((u) => u.marker === undefined || u.marker.length > 0), true);
  check("each mishnah names its speaker", RESEARCH_FIXTURES.every((s) => s.units[0]?.speaker === "Mishnah"), true);
  const named = (s: Sugya): string => s.units.map((u) => u.speaker).filter((x): x is string => x !== undefined && x !== "Mishnah").join(" ");
  check("Bava Metzia names Rav Pappa", named(bavaMetziaOchazin), "Rav Pappa");
  check("Bava Kamma names Rav Pappa", named(bavaKammaToldos), "Rav Pappa");
  check("Pesachim names the two disputants and Mar Zutra", named(pesachimOr), "Rav Huna Rav Yehuda Mar Zutra");
  check("Gittin names Rabbah and Rava", named(gittinBefanai), "Rabbah Rava");
  check("the `מיתיבי` rows are all difficulties", pesachimOr.units.filter((u) => u.marker === "מיתיבי").every((u) => u.move.element === "difficulty"), true);
  check("…thirteen of them", pesachimOr.units.filter((u) => u.marker === "מיתיבי").length, 13);
  check("the `אפילו תימא` rows are all resolutions", bavaMetziaOchazin.units.filter((u) => u.marker === "אפילו תימא").every((u) => u.move.element === "resolution"), true);
  check("the `אלא … וכי קאמר` closers are all answers", bavaKammaToldos.units.filter((u) => u.marker === "אלא … וכי קאמר").every((u) => u.move.element === "answer"), true);
  check("…six of them", bavaKammaToldos.units.filter((u) => u.marker === "אלא … וכי קאמר").length, 6);
  check("a named row gets no speaker badge", all.filter((u) => u.speaker !== undefined).every((u) => speakerBadge(u) === undefined), true);
}

// --- every chapter but the ninth: the anatomy layer -------------------------
// A second vocabulary over the ch. 9 moves. None of it enters the analysis, so
// what there is to check is the vocabulary itself, where a label may sit, what
// the fixtures carry, and the geometry of the bead.

console.log("\nThe anatomy layer — the vocabulary");
const inFamily = (family: string): number =>
  ANATOMY_KEYS.filter((k) => ANATOMY[k].family === family).length;
check("one hundred and six types", ANATOMY_KEYS.length, 106);
check("three speakers", inFamily("speakers"), 3);
check("twenty-seven forms of a statement", inFamily("anatomy"), 27);
check("fourteen relations", inFamily("relations"), 14);
check("eleven deductions", inFamily("deductions"), 11);
check("nineteen grounds", inFamily("grounds"), 19);
check("two reported moves", inFamily("reports"), 2);
// Ramchal's twenty-four numbered הבחנות, plus Attribute's three branches and
// the perceptible branch of Form, plus the three senses of priority that
// follow the list. Twenty-four is the count of distinctions, not of drawings.
check("thirty subject distinctions", inFamily("subjects"), 30);
check("seven families, in the book's order", FAMILY_ORDER.join(), "speakers,anatomy,relations,deductions,grounds,reports,subjects");
check("every type has a glyph", ANATOMY_KEYS.every((k) => GLYPHS[k].length > 0), true);
check("no glyph without a type", Object.keys(GLYPHS).every((k) => k in ANATOMY), true);
// The icon set's own hues (icons_v3/ICONS_REFERENCE.md §2), none of which may
// survive extraction: the family decides the colour, not the body.
const HUES = /#(7c3aed|0d9488|475569|c026d3)/i;
check("glyphs carry no hue of their own", Object.values(GLYPHS).every((g) => !HUES.test(g)), true);
check("…nor does the tile", TILE_GLYPH.length > 0 && !HUES.test(TILE_GLYPH), true);
const landscapes = ANATOMY_KEYS.filter((k) => /<linearGradient id="fade-/.test(GLYPHS[k]));
check("twelve landscapes carry a floor fade", landscapes.length, 12);
check("…with currentColor stops", landscapes.every((k) => /stop-color="currentColor"/.test(GLYPHS[k])), true);
check("the busy glyphs are types", [...BUSY_GLYPHS].every((k) => k in ANATOMY), true);
check("the wide glyphs are the three of chapter 5", [...WIDE_GLYPHS].sort().join(), "absolute-opposite,inference-loose,inference-necessary");
check("…drawn half again as wide", glyphAspect("inference-necessary"), 1.5);
check("…and a square one is square", glyphAspect("exception"), 1);
check("every landscape falls back to a dot at bead size", landscapes.every((k) => BUSY_GLYPHS.has(k)), true);
// Chapter 10's two composites are a slate document carrying a ch. 9 glyph. The
// carrier gives up its hue like every other badge; the payload keeps the
// colour that move is in every row, which is the whole point of the drawing.
check("the ascribed proof keeps its thumb green", GLYPHS["ascribed-proof"].includes(LIGHT.element.proof), true);
check("…and the ascribed difficulty its triangle orange", GLYPHS["ascribed-difficulty"].includes(LIGHT.element.difficulty), true);
check("…and both are too dense for a bead", BUSY_GLYPHS.has("ascribed-proof") && BUSY_GLYPHS.has("ascribed-difficulty"), true);
check(
  "no other glyph smuggles in an element colour",
  ANATOMY_KEYS.filter((k) => ANATOMY[k].family !== "reports").every(
    (k) => !Object.values(LIGHT.element).some((c) => GLYPHS[k].includes(c)),
  ),
  true,
);

console.log("\nChapter 9 — the subtype drawings");
// Seven of the nineteen leaves have a picture of their own; the other twelve
// wear the parent move's, with their name beside it. The row draws whichever
// applies (`app/components/MoveIcon.tsx`, `renderMoveIcon` in `render.ts`).
const drawnLeaves = MOVE_KEYS.filter((k) => moveGlyph(k) !== undefined);
check("seven of the nineteen leaves draw themselves", drawnLeaves.length, 7);
check(
  "…one per element that has a picture, and none for statement, question or answer",
  drawnLeaves.join(),
  "proof/demonstration,proof/validation,contradiction/opposition,difficulty/objection,difficulty/apparentContradiction,resolution/settlement,resolution/alternative",
);
check("direct contradiction shares the parent's red X on purpose", moveGlyph("contradiction/direct"), undefined);
check(
  "a subtype drawing is one colour throughout, so a pending row can grey it",
  drawnLeaves.every((k) => !/#[0-9a-f]{3,6}\b/i.test(moveGlyph(k)!)),
  true,
);
check("…and carries the element's tint at the badge opacity", moveGlyph("proof/demonstration")!.includes('fill-opacity="0.15"'), true);
check("every leaf without a drawing still has a name to show", MOVE_KEYS.filter((k) => moveGlyph(k) === undefined).every((k) => LEAVES[k].en.length > 0), true);
check(
  "relations and deductions sit on edges",
  ANATOMY_KEYS.filter((k) => ANATOMY[k].family === "relations" || ANATOMY[k].family === "deductions").every(
    (k) => ANATOMY[k].level === "edge",
  ),
  true,
);
check(
  "speakers and statement anatomy sit on rows",
  ANATOMY_KEYS.filter((k) => ANATOMY[k].family === "speakers" || ANATOMY[k].family === "anatomy").every(
    (k) => ANATOMY[k].level === "row",
  ),
  true,
);
check("potential and actual sit on the row", ANATOMY.potential.level === "row" && ANATOMY.actual.level === "row", true);
check(
  "a reported move is an edge: both halves of it act on something",
  ANATOMY_KEYS.filter((k) => ANATOMY[k].family === "reports").every((k) => ANATOMY[k].level === "edge"),
  true,
);
check(
  "chapter 11 is row-level throughout, priority included",
  ANATOMY_KEYS.filter((k) => ANATOMY[k].family === "subjects").every((k) => ANATOMY[k].level === "row"),
  true,
);
check(
  "every other ground sits on an edge",
  ANATOMY_KEYS.filter((k) => ANATOMY[k].family === "grounds" && k !== "potential" && k !== "actual").every(
    (k) => ANATOMY[k].level === "edge",
  ),
  true,
);
check("chapter 7 is teal", hueOf("a-fortiori"), "teal");
check("chapters 3–6 are violet", hueOf("exception"), "violet");
check("chapter 1 is slate", hueOf("party-talmud"), "slate");
check("chapter 8 is magenta", hueOf("ground-tradition"), "magenta");
check("chapter 10 is slate too: a report is about whose words these are", hueOf("ascribed-proof"), "slate");
check("chapter 11 is violet", hueOf("subject-quantity"), "violet");
check("…and no badge is a verdict colour", Object.values(LIGHT.hue).every((h) => h !== LIGHT.accepted && h !== LIGHT.rejected && h !== LIGHT.doubt), true);
check("every type cites a page", ANATOMY_KEYS.every((k) => /p\d/.test(ANATOMY[k].page)), true);
check("every type reads in everyday words", ANATOMY_KEYS.every((k) => ANATOMY[k].short.length <= 26), true);
check(
  "parts follow ch. 6: exception 2, conditional 2, hypothetical 1, consequent 3",
  [ANATOMY.exception, ANATOMY.conditional, ANATOMY.hypothetical, ANATOMY.consequent]
    .map((t) => t.parts)
    .join(""),
  "2213",
);

console.log("\nThe anatomy layer — where a label may sit");
check("an edge label needs a target", annotationErrors({ id: "x", anatomy: [{ kind: "contradictory" }] }).length, 1);
check("so does a ground", annotationErrors({ id: "x", anatomy: [{ kind: "ground-tradition" }] }).length, 1);
check("a row label does not", annotationErrors({ id: "x", anatomy: [{ kind: "categorical" }] }).length, 0);
check("with a target, either may sit", annotationErrors({ id: "x", target: "y", anatomy: [{ kind: "analogism" }, { kind: "simple" }] }).length, 0);

console.log("\nChapter 8 — the ground read off a move's provenance");
const proofFrom = (provenance: Provenance) => ({ move: { element: "proof" } as const, target: "y", provenance });
check("the four sources each have a ground", Object.entries(GROUND_OF_PROVENANCE).map(([p, g]) => `${p}→${g}`).join(" "), "sense→ground-sense axiom→ground-axiom endoxa→ground-common-sense tradition→ground-tradition");
check("a proof from tradition stands on tradition", groundBadge(proofFrom("tradition"))?.info.key, "ground-tradition");
check("…and the badge is inferred: the file names a source, not a stock word", groundBadge(proofFrom("tradition"))?.basis, "inferred");
check("a proof from the senses", groundBadge(proofFrom("sense"))?.info.key, "ground-sense");
check("a derivation says only that the move must earn its keep, so nothing is read off it", groundBadge(proofFrom("derivation")), undefined);
check("nor off an assertion", groundBadge(proofFrom("asserted")), undefined);
check("a difficulty from a mishnah stands on tradition", groundBadge({ move: { element: "difficulty" }, target: "y", provenance: "tradition" })?.info.key, "ground-tradition");
check("so does a contradiction", groundBadge({ move: { element: "contradiction" }, target: "y", provenance: "tradition" })?.info.key, "ground-tradition");
check("a resolution is about fit, not truth: no ground", groundBadge({ move: { element: "resolution" }, target: "y", provenance: "tradition" }), undefined);
check("an opening statement has no edge to put it on", groundBadge({ move: { element: "statement" }, provenance: "tradition" }), undefined);
check("an explicit ch. 8 label stands alone", groundBadge({ ...proofFrom("tradition"), anatomy: [{ kind: "theory" }] }), undefined);
check("…but a relation beside it does not suppress the ground", groundBadge({ ...proofFrom("tradition"), anatomy: [{ kind: "contradictory" }] })?.info.key, "ground-tradition");
const misplaced: Sugya = {
  ...pesachimLiquids,
  units: [
    { ...pesachimLiquids.units[0]!, anatomy: [{ kind: "analogism" }] },
    ...pesachimLiquids.units.slice(1),
  ],
};
check("analyze refuses a relation on an opening claim", (() => { try { analyze(misplaced); return false; } catch { return true; } })(), true);
check("an absent basis is inferred", basisOf({ kind: "categorical" }), "inferred");
check("a nameless sentence is the Talmud's own voice", speakerBadge({})?.info.key, "party-talmud");
check("…and that rests on the text's silence, so it is marked", speakerBadge({})?.basis, "marked");
check("a named sentence gets no speaker badge", speakerBadge({ speaker: "Rava" }), undefined);
check(
  "badgesOf splits a sentence's labels by level",
  badgesOf([{ kind: "comparative" }, { kind: "analogism" }], "edge").map((b) => b.info.key).join(),
  "analogism",
);
check("…and keeps declaration order", badgesOf([{ kind: "compound" }, { kind: "partial" }], "row").map((b) => b.info.key).join(), "compound,partial");

console.log("\nThe anatomy layer — what the fixtures carry");
check("every fixture names its party", FIXTURES.every((s) => s.party !== undefined), true);
check("Bava Metzia: rabbis in dispute", bm.party, "party-group");
check("Berachos: one man asks and answers himself", FIXTURES.find((s) => s.id === "berachos-yaakov")?.party, "party-individual");
check("Yebamos 104b: the Talmud's own voice examines Rava", FIXTURES.find((s) => s.id === "yebamos-chalitzah")?.party, "party-talmud");
check(
  "no ch. 1–7 label is attested: none of these sentences is one Ramchal labels in chs. 1–7",
  FIXTURES.every((s) => s.units.every((u) => (u.anatomy ?? []).every((a) => a.basis !== "attested"))),
  true,
);
check(
  "every תא שמע is read as a general claim against a particular one",
  bm.units.filter((u) => u.marker === "תא שמע").every((u) => u.anatomy?.some((a) => a.kind === "contradictory") === true),
  true,
);
check(
  "every ישוב that narrows the case applies the test of respect",
  bm.units.filter((u) => u.marker === "הכא במאי עסקינן").every((u) => u.anatomy?.some((a) => a.kind === "differs-in-context") === true),
  true,
);
check("the סתירה refutes by analogy, marked by `מה … אף`", bm.units.find((u) => u.id === "t12-dumya")?.anatomy?.find((a) => a.kind === "analogism")?.basis, "marked");
check("`אף על פי ש` in the mishnah is a discrepancy, marked", bm.units.find((u) => u.id === "t11-ask")?.anatomy?.find((a) => a.kind === "discrepancy")?.basis, "marked");
check("an `אי הכי` press is a syllogism on the denial", bm.units.find((u) => u.id === "t9-press")?.anatomy?.[0]?.kind, "hypothetical-syllogism-tollens");
check("Bava Metzia carries labels on most sentences", bm.units.filter((u) => (u.anatomy ?? []).length > 0).length >= 35, true);
check("Rav Papa's opposition says the testimony does not reach the claim", pesachimLiquids.units.find((u) => u.id === "ravpapa")?.anatomy?.some((a) => a.kind === "ground-does-not-reach"), true);
check("Rav Huna's contradiction stands on a deduction, said explicitly", pesachimLiquids.units.find((u) => u.id === "ravhuna")?.anatomy?.some((a) => a.kind === "ground-deduction"), true);
check("…so nothing is read off its provenance beside it", groundBadge(pesachimLiquids.units.find((u) => u.id === "ravhuna")!), undefined);
check("the testimony stands on tradition, read off its provenance", groundBadge(pesachimLiquids.units.find((u) => u.id === "testimony")!)?.info.key, "ground-tradition");
check("every תא שמע from a mishnah stands on tradition", bm.units.filter((u) => u.marker === "תא שמע" && u.provenance === "tradition").every((u) => groundBadge(u)?.info.key === "ground-tradition"), true);
check("…thirteen challenges and two proofs, fifteen grounds in all", bm.units.filter((u) => groundBadge(u) !== undefined).length, 15);
check("the סתירה by analogy names its ground: a deduction", bm.units.find((u) => u.id === "t12-dumya")?.anatomy?.some((a) => a.kind === "ground-deduction"), true);

// --- the file format ----------------------------------------------------------
// The JSON files under `sugyot/` are what the app renders; the TypeScript
// fixtures are the oracle they are checked against, passage by passage: the
// same data, the same analysis, the same drawing. Then the reader's own
// behaviour — what it accepts, what it refuses and how it says so — and that
// the schema an editor sees agrees with the constants the code uses.

const SUGYOT_DIR = new URL("./sugyot/", import.meta.url);
const readText = (name: string): string => readFileSync(new URL(name, SUGYOT_DIR), "utf8");

/** A value as JSON with keys sorted at every level, so two objects compare as data. */
const canon = (v: unknown): string =>
  JSON.stringify(v, (_, value: unknown) =>
    value !== null && typeof value === "object" && !Array.isArray(value)
      ? Object.fromEntries(Object.entries(value as Record<string, unknown>).filter(([, x]) => x !== undefined).sort(([a], [b]) => (a < b ? -1 : 1)))
      : value,
  );

/** What the JSON carries that the TypeScript oracle never had: page furniture. */
const bare = (s: Sugya): Sugya => {
  const { collection: _c, about: _a, hint: _h, ...rest } = s;
  return rest;
};

console.log("\nThe file format — every passage, JSON against its TypeScript oracle");
check("nine passages ship", SUGYOT.length, 9);
check("…the same nine as the oracle, in the same order", SUGYOT.map((s) => s.id).join(" "), FIXTURES.map((s) => s.id).join(" "));
for (const oracle of FIXTURES) {
  const loaded = sugyaById(oracle.id);
  check(`${oracle.id}: loads from JSON`, loaded !== undefined, true);
  if (loaded === undefined) continue;
  check(`${oracle.id}: the same data`, canon(bare(loaded)), canon(oracle));
  check(`${oracle.id}: the same analysis`, canon([...analyze(loaded).status]), canon([...analyze(oracle).status]));
  check(`${oracle.id}: the same drawing`, renderSugya(loaded) === renderSugya(oracle), true);
  check(`${oracle.id}: shelved`, loaded.collection, oracle.id.match(/^(bm|bk|pes|git)-2a-/) ? "research" : "ramchal");
  check(`${oracle.id}: carries its preface`, (loaded.about?.length ?? 0) > 0, true);
  const text = readText(`${oracle.id}.json`);
  check(`${oracle.id}: the file is canonical — parse then print gives the file back`, stringify(parseSugya(JSON.parse(text))) === text, true);
  check(`${oracle.id}: toJson round-trips through parseSugya`, canon(parseSugya(toJson(loaded))), canon(loaded));
  check(`${oracle.id}: and through JSON text, which is how the session store keeps an opened file`, canon(parseSugya(JSON.parse(JSON.stringify(toJson(loaded))))), canon(loaded));
}
check("the research passages carry a hint, the book's do not", SUGYOT.map((s) => (s.hint === undefined ? "-" : "h")).join(""), "-----hhhh");

console.log("\nThe file format — what the reader refuses, and how it says so");
const faultsOfInput = (input: unknown): readonly string[] => {
  try {
    parseSugya(input, "test");
    return [];
  } catch (e) {
    return e instanceof SugyaFormatError ? e.faults : [String(e)];
  }
};
const minimal = toJson(yebamosDeafMute);
check("a canonical file has no faults", faultsOfInput(minimal).length, 0);
// The model is not the file: a unit's target, marker and attestation sit under
// `move` on disk and at the top of the unit in the model. So anything storing a
// passage for the reader to open again must store `toJson` of it, not the model.
check("a parsed passage is not itself a file", faultsOfInput(JSON.parse(JSON.stringify(yebamosDeafMute))).length > 0, true);
check("not an object", faultsOfInput("x")[0], '$: expected an object, got "x"');
check("a missing version", faultsOfInput({ ...minimal, version: undefined }).join(" | "), "$.version: required");
check("a version from the future", faultsOfInput({ ...minimal, version: 2 }).join(" | "), "$.version: this reader understands version 1, got 2");
check("another format", faultsOfInput({ ...minimal, format: "x" }).join(" | "), '$.format: expected "derech-tevunos/sugya", got "x"');
check("a misspelt key, with the correction", faultsOfInput({ ...minimal, folo: "4a", folio: undefined }).join(" | "), '$.folo: unknown key (did you mean "folio"?) | $.folio: required');
check("an `ext` bag passes untouched", parseSugya({ ...minimal, ext: { anything: [1, 2] } }).ext?.["anything"]?.toString(), "1,2");
check("…on a unit too", parseSugya({ ...minimal, units: [{ ...minimal.units[0]!, ext: { x: 1 } }, minimal.units[1]!] }).units[0]?.ext?.["x"], 1);
check("a key outside `ext` is refused even when harmless", faultsOfInput({ ...minimal, units: [{ ...minimal.units[0]!, colour: "red" }, minimal.units[1]!] }).join(" | "), "$.units[0].colour: unknown key");
check("an element that is not one", faultsOfInput({ ...minimal, units: [{ ...minimal.units[0]!, move: { element: "quesion", subtype: "query" } }, minimal.units[1]!] })[0], '$.units[0].move.element: "quesion" is not one of "statement" | "question" | "answer" | "proof" | "contradiction" | "difficulty" | "resolution" (did you mean "question"?)');
check("a subtype of the wrong element", faultsOfInput({ ...minimal, units: [{ ...minimal.units[0]!, move: { element: "question", subtype: "objection" } }, minimal.units[1]!] })[0], '$.units[0].move.subtype: "objection" is not a subtype of "question" (expected "query" | "principle")');
check("a party that is not one", faultsOfInput({ ...minimal, party: "party-groop" })[0], '$.party: "party-groop" is not one of "party-group" | "party-individual" | "party-talmud" (did you mean "party-group"?)');
check("a provenance that is not one", faultsOfInput({ ...minimal, units: [{ ...minimal.units[0]!, provenance: "hearsay" }, minimal.units[1]!] })[0]?.startsWith('$.units[0].provenance: "hearsay" is not one of'), true);
check("a label that is not one", faultsOfInput({ ...minimal, units: [minimal.units[0]!, { ...minimal.units[1]!, anatomy: [{ kind: "consequant" }] }] })[0]?.startsWith('$.units[1].anatomy[0].kind: "consequant" is not one of'), true);
check("…with the correction", faultsOfInput({ ...minimal, units: [minimal.units[0]!, { ...minimal.units[1]!, anatomy: [{ kind: "consequant" }] }] })[0]?.endsWith('(did you mean "consequent"?)'), true);
check("a target that comes later", faultsOfInput({ ...minimal, units: [{ ...minimal.units[0]!, move: { ...minimal.units[0]!.move, target: "answer" } }, minimal.units[1]!] }).join(" | "), '$.units: yebamos-deafmute: unit "question" targets "answer", which does not precede it');
check("a target that does not exist", faultsOfInput({ ...minimal, units: [minimal.units[0]!, { ...minimal.units[1]!, move: { ...minimal.units[1]!.move, target: "nowhere" } }] }).join(" | "), '$.units: yebamos-deafmute: unit "answer" targets unknown unit "nowhere"');
check("an edge label on a move that acts on nothing", faultsOfInput({ ...minimal, units: [{ ...minimal.units[0]!, anatomy: [{ kind: "analogism" }] }, minimal.units[1]!] }).join(" | "), '$.units: yebamos-deafmute: unit "question" carries the edge-level label "analogism" but acts on nothing');
check("two units with one id", faultsOfInput({ ...minimal, units: [minimal.units[0]!, { ...minimal.units[1]!, id: "question" }] }).join(" | "), "$.units: yebamos-deafmute: duplicate unit id");
check("no units", faultsOfInput({ ...minimal, units: [] }).join(" | "), "$.units: a sugya has at least one sentence");
check("several faults are reported together", faultsOfInput({ ...minimal, title: 3, tractate: undefined, units: [{ ...minimal.units[0]!, en: undefined }, minimal.units[1]!] }).length, 3);
check("a fault's message names the source", (() => { try { parseSugya({}, "gold.json"); return ""; } catch (e) { return (e as Error).message.split("\n")[0]; } })(), "gold.json: 8 faults");
check("the printer puts a move on one line", stringify(yebamosDeafMute).includes('"move": { "element": "question", "subtype": "query", "marker": "מאי שנא … ומאי שנא", "attested": true }'), true);
const para = "A paragraph long enough that two of them will not sit on one line of the file, which is what a preface is.";
check("…and a preface one paragraph per line", stringify({ ...yebamosDeafMute, about: [para, para] }).includes(`"about": [\n    "${para}",\n    "${para}"\n  ]`), true);
check("…while a short list stays on one line", stringify({ ...yebamosDeafMute, about: ["a", "b"] }).includes('"about": ["a", "b"]'), true);

console.log("\nThe file format — the schema agrees with the code");
const schema = JSON.parse(readText("sugya.schema.json")) as {
  readonly properties: Record<string, { readonly enum?: readonly string[]; readonly const?: unknown }>;
  readonly $defs: Record<string, { readonly enum?: readonly string[]; readonly properties?: Record<string, { readonly enum?: readonly string[] }>; readonly allOf?: readonly { readonly if: { readonly properties: { readonly element: { readonly const: string } } }; readonly then: { readonly properties: { readonly subtype: { readonly enum: readonly string[] } } } }[] }>;
};
check("format", schema.properties["format"]?.const, FORMAT);
check("version", schema.properties["version"]?.const, FORMAT_VERSION);
check("collections", schema.properties["collection"]?.enum?.join(), COLLECTIONS.join());
check("parties", schema.$defs["party"]?.enum?.join(), PARTIES.join());
check("bases", schema.$defs["basis"]?.enum?.join(), BASES.join());
check("provenances", schema.$defs["provenance"]?.enum?.join(), PROVENANCES.join());
check("elements", schema.$defs["move"]?.properties?.["element"]?.enum?.join(), ELEMENTS.join());
check("the subtypes of every element", (schema.$defs["move"]?.allOf ?? []).map((c) => `${c.if.properties.element.const}: ${c.then.properties.subtype.enum.join()}`).join(" / "), ELEMENTS.map((e) => `${e}: ${SUBTYPES[e].join()}`).join(" / "));
check("the anatomy labels, all one hundred and six", schema.$defs["annotation"]?.properties?.["kind"]?.enum?.join(), ANATOMY_KEYS.join());
check("every file names the schema beside it", SUGYOT.every((s) => (JSON.parse(readText(`${s.id}.json`)) as { $schema?: string }).$schema === "./sugya.schema.json"), true);

console.log("\nThe anatomy layer — the bead");
check("a bead needs a run of 44px", BEAD_MIN_RUN, 44);
check("two adjacent rows, 60px apart, hold one", beadFits({ x: 0, y: 0 }, { x: 34, y: 60 }), true);
check("a run of 30px does not", beadFits({ x: 0, y: 0 }, { x: 34, y: 30 }), false);
check("it sits in the gutter, halfway down the run", JSON.stringify(beadPoint({ x: 18, y: 0 }, { x: 52, y: 80 }, 34)), JSON.stringify({ x: 35, y: 40 }));
check("at full indent it is 8.5px", beadRadius(INDENT), 8.5);
check("at the indent floor it shrinks to clear the icons", beadRadius(MIN_INDENT), 8);

console.log(`\n${failures === 0 ? "All checks passed." : `${failures} check(s) failed.`}`);
if (failures > 0) process.exitCode = 1;
