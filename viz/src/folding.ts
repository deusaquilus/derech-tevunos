/**
 * Folding: how a long-reaching move brings its target back into view.
 *
 * A `סתירה` forty-six sentences after the claim it refutes cannot draw a line
 * to it — v2 replaced the line with a printed reference. This module takes the
 * other route: everything between such a move and its target can be folded
 * away, so the two sit a few rows apart and the line between them is short
 * enough to draw. A move that closes business on its target — refutes it,
 * rules for it, answers it — arrives that way; a challenge arrives unfolded,
 * with the line drawn its full length, and the reader folds it if they want to.
 * The fold is a presentation state only. The analysis still runs over the
 * whole revealed prefix, so every verdict on screen accounts for the sentences
 * that are folded.
 *
 * v3 kept one fold at a time. Here the state is a *laminar family of bands* —
 * closed or open intervals of rows, each hanging under an *anchor*, the unit
 * whose teeth it hides — plus the reader's *attention*, the one relation whose
 * rail is drawn in full. Arrivals add bands; the reader opens and closes them;
 * a band that closes over other bands keeps them, so unfolding goes one level
 * at a time. Rails are derived from what is visible, never stored, and because
 * the family is laminar the rails that matter form a chain: one per level,
 * strictly nested, never crossing.
 *
 * Everything below is a pure function of `(units, revealed, policy)` plus the
 * reader's toggles, and so is replayable: seeking backwards re-derives the
 * state from scratch, as v3 did.
 */

import type { Analysis, Movement, Sugya, Unit } from "./sugya.ts";
import { movementsOf } from "./sugya.ts";
import { effectOf, type Effect } from "./taxonomy.ts";

/**
 * How many sentences may lie between a move and its target before the move is
 * treated as long-reaching. Four is roughly what a viewport holds at once, so
 * past it the target is off-screen when the move appears.
 */
export const LONG_REACH = 4;

const indexOf = (units: readonly Unit[], id: string): number =>
  units.findIndex((u) => u.id === id);

/** Sentences between a move and the one it acts upon. Zero for a root. */
export const reachOf = (units: readonly Unit[], index: number): number => {
  const target = units[index]?.target;
  if (target === undefined) return 0;
  const at = indexOf(units, target);
  return at < 0 ? 0 : index - at - 1;
};

export const isLongReach = (
  units: readonly Unit[],
  index: number,
  longReach: number = LONG_REACH,
): boolean => reachOf(units, index) >= longReach;

/**
 * Where the run of consecutive moves ending at `index` and all acting on the
 * same target begins. When the Talmud lands three blows on Rava in a row —
 * the source, the inference from it, and the `תיובתא` — they are one landing,
 * and folding must not hide the first two to show the third.
 */
export const landingStart = (units: readonly Unit[], index: number): number => {
  const target = units[index]?.target;
  if (target === undefined) return index;
  let start = index;
  while (start > 0 && units[start - 1]?.target === target) start -= 1;
  return start;
};

/**
 * Whether a move *closes* business on its target, as opposed to opening it.
 *
 * A `תא שמע` opens business: it asks a question of the claim and waits. A
 * `סתירה` refutes, a `והלכתא` rules, a `תירוץ` discharges — each of these ends
 * something. The distinction is the taxonomy's own (ch. 9 fixes these three
 * effects for the adjudicating elements) and it is what decides, below, whether
 * the arrival of a long-reaching move puts the history between it and its
 * target away.
 */
export const closesBusiness = (effect: Effect): boolean =>
  effect === "reject" || effect === "raise" || effect === "discharge";

/**
 * Whether a long-reaching move should arrive with the sentences between it and
 * its target folded.
 *
 * A challenge arrives *unfolded*. The forty sentences between a `תא שמע` and
 * the claim it challenges are the record of how that claim has fared so far —
 * the reader is meant to feel them accumulate — and the rail is drawn its full
 * length so the challenge can be traced back to what it challenges. A move
 * that closes business arrives *folded*: at the moment the `סתירה` lands, the
 * thirteen challenges before it are settled history, and putting them away is
 * what lets the reader see the blow land on the claim itself.
 *
 * The decision is made for the landing, not the move. The `תא שמע` at 48, the
 * `סתירה` at 49 and the `תיובתא` at 50 are one landing on Rava; once the
 * `סתירה` is among them, the landing is a refutation, and the `תיובתא` that
 * follows it inherits that rather than reopening the debate.
 */
export const arrivesFolded = (units: readonly Unit[], index: number): boolean => {
  for (let i = landingStart(units, index); i <= index; i += 1) {
    const unit = units[i];
    if (unit !== undefined && closesBusiness(effectOf(unit.move))) return true;
  }
  return false;
};

// --- policy ------------------------------------------------------------------

export type Policy = {
  /** `LONG_REACH`: sentences between a move and its target before it counts as long-reaching. */
  readonly longReach: number;
  /**
   * What an *open* long-reaching arrival (a challenge) does to the rows between
   * it and its target. `flat` is v3: nothing, the rail runs its full length.
   * `threads` keeps the target's teeth on the page and folds each tooth's
   * finished thread beneath it, so the record of challenges is still seen to
   * accumulate but their answers are not.
   */
  readonly openArrival: "threads" | "flat";
  /** Enclosing rails drawn around the focus rail, at most. Beyond this: handles. */
  readonly maxLanes: number;
};

export const DEFAULT_POLICY: Policy = {
  longReach: LONG_REACH,
  openArrival: "threads",
  maxLanes: 3,
};

// --- the tree, from `target` --------------------------------------------------

/**
 * The target pointers as a forest, by index. Every `target` names an earlier
 * unit (`validate` enforces it), so the units whose target is absent are the
 * roots and every other unit hangs under exactly one parent.
 */
export type Tree = {
  readonly parent: readonly (number | undefined)[];
  readonly index: ReadonlyMap<string, number>;
};

const trees = new WeakMap<readonly Unit[], Tree>();

/** Memoised per units array: the tree is asked for on every interaction. */
export const treeOf = (units: readonly Unit[]): Tree => {
  const cached = trees.get(units);
  if (cached !== undefined) return cached;
  const index = new Map(units.map((u, i) => [u.id, i]));
  const parent = units.map((u) => (u.target === undefined ? undefined : index.get(u.target)));
  const tree: Tree = { parent, index };
  trees.set(units, tree);
  return tree;
};

const ancestorsOf = (tree: Tree, i: number): number[] => {
  const out: number[] = [];
  let at: number | undefined = i;
  while (at !== undefined) {
    out.push(at);
    at = tree.parent[at];
  }
  return out; // i first, root last
};

/** Proper or improper descent. */
const descends = (tree: Tree, i: number, ancestor: number): boolean =>
  ancestorsOf(tree, i).includes(ancestor);

const lca = (tree: Tree, a: number, b: number): number | undefined => {
  const up = new Set(ancestorsOf(tree, a));
  return ancestorsOf(tree, b).find((x) => up.has(x));
};

/**
 * The unit a stretch of rows hangs under: the nearest common ancestor of the
 * parents that lie outside the stretch. For a ruling's band that is the claim
 * it rules on; for `אלא… דכולי עלמא` over both sides' proof-texts it is the
 * first position, not the assumption the `אלא` formally rejects.
 */
export const anchorOf = (tree: Tree, from: number, to: number, fallback: number): number => {
  const outside = new Set<number>();
  for (let i = from; i <= to; i += 1) {
    const p = tree.parent[i];
    if (p !== undefined && (p < from || p > to)) outside.add(p);
  }
  const list = [...outside];
  if (list.length === 0) return fallback;
  return list.reduce<number>((acc, p) => lca(tree, acc, p) ?? acc, list[0]!);
};

// --- bands -------------------------------------------------------------------

export type Band = {
  /** `${kind}:${anchor}:${from}`; stable as the frontier advances. */
  readonly key: string;
  /**
   * `frame`: made by a closing long-reaching landing on its anchor, and folds
   * everything under the anchor so far (v3's fold, and it grows as later
   * closers land on the same anchor). `thread`: one tooth's finished thread,
   * made when a challenge arrives or a band is opened one level.
   */
  readonly kind: "frame" | "thread";
  /** The unit whose teeth the band hides. */
  readonly anchor: number;
  readonly from: number;
  /** Inclusive. */
  readonly to: number;
  readonly closed: boolean;
  /**
   * Frames only: the move whose landing made the band, or last extended it.
   * Its target and the band's anchor differ when the rows between are not all
   * the target's — the `סתירה` on Rava hides Abaye's challenges too — and the
   * caption then reads "between Rava and the refutation", not "under Abaye".
   */
  readonly by?: number;
};

export type FoldState = {
  readonly revealed: number;
  /** Laminar: any two bands are disjoint or nested. Sorted by `from`, wider first. */
  readonly bands: readonly Band[];
  /** The move whose rail is drawn in full; the newest long-reaching arrival unless the reader moved it. */
  readonly attention: number | undefined;
};

export const EMPTY: FoldState = { revealed: 0, bands: [], attention: undefined };

const keyOf = (kind: Band["kind"], anchor: number, from: number): string =>
  `${kind}:${anchor}:${from}`;

const contains = (outer: Band, inner: Band): boolean =>
  outer.from <= inner.from && inner.to <= outer.to;
const same = (a: Band, b: Band): boolean => a.from === b.from && a.to === b.to;
const disjoint = (a: Band, b: Band): boolean => a.to < b.from || b.to < a.from;
const covers = (b: Band, i: number): boolean => b.from <= i && i <= b.to;

const sortBands = (bands: readonly Band[]): Band[] =>
  [...bands].sort((a, b) => a.from - b.from || b.to - a.to);

/**
 * Put a band into the family and keep it laminar.
 *
 * Bands already inside the new one are kept, closed: the new band remembers
 * them, and they are what its first unfolding will show. A frame on the same
 * anchor that the new frame contains is not kept but *extended* — the fifth
 * `אלא תולדה ד…` on `אהייא` grows the band the first one made, rather than
 * nesting five bands that each hide the teeth. A band the new one cuts
 * through is dropped: the later closure wins. This cannot happen in any of
 * the eleven sugyot studied; the rule exists so the invariant is
 * unconditional.
 */
export const insert = (bands: readonly Band[], band: Band): Band[] => {
  const kept = bands.flatMap((x): Band[] => {
    if (same(x, band)) return [];
    if (disjoint(x, band)) return [x];
    if (contains(band, x)) {
      const extended = x.kind === "frame" && band.kind === "frame" && x.anchor === band.anchor;
      return extended ? [] : [{ ...x, closed: true }];
    }
    if (contains(x, band)) return [x];
    return []; // partial overlap: absorbed
  });
  return sortBands([...kept, band]);
};

// --- teeth and threads ---------------------------------------------------------

const isLong = (units: readonly Unit[], i: number, policy: Policy): boolean =>
  reachOf(units, i) >= policy.longReach;

const thread = (anchor: number, from: number, to: number): Band => ({
  key: keyOf("thread", anchor, from),
  kind: "thread",
  anchor,
  from,
  to,
  closed: true,
});

/**
 * What decomposition walks over: a row, or a closed band already stored — an
 * opaque block that hangs from its anchor as a row hangs from its target. A
 * block is never a tooth of anything but its own anchor and never long-
 * reaching, so a run flows around it and the leaf band that results contains
 * it whole. That is what keeps a fold derived now from cutting through a
 * closure made earlier.
 */
type Item = {
  readonly from: number;
  readonly to: number;
  /** What it hangs from: a row's target, a block's anchor. */
  readonly parent: number | undefined;
  /** The row, or `undefined` for a block. */
  readonly row: number | undefined;
};

const itemsOf = (tree: Tree, bands: readonly Band[], from: number, to: number): Item[] => {
  const inside = bands.filter((b) => b.closed && from <= b.from && b.to <= to);
  const blocks = sortBands(
    inside.filter((b) => !inside.some((o) => o !== b && contains(o, b) && !same(o, b))),
  );
  const items: Item[] = [];
  let i = from;
  while (i <= to) {
    const block = blocks.find((b) => b.from === i);
    if (block !== undefined) {
      items.push({ from: block.from, to: block.to, parent: block.anchor, row: undefined });
      i = block.to + 1;
    } else {
      items.push({ from: i, to: i, parent: tree.parent[i], row: i });
      i += 1;
    }
  }
  return items;
};

/** The item's line of ancestors, nearest first: for a block, its anchor's line beginning at the anchor. */
const lineOf = (tree: Tree, item: Item): number[] =>
  item.row !== undefined
    ? ancestorsOf(tree, item.row)
    : item.parent === undefined
      ? []
      : ancestorsOf(tree, item.parent);

/** The unit a run of items hangs under: the nearest common ancestor of the parents outside the run. */
const anchorOfItems = (tree: Tree, run: readonly Item[], fallback: number): number => {
  const first = run[0];
  const last = run[run.length - 1];
  if (first === undefined || last === undefined) return fallback;
  const outside = [
    ...new Set(
      run.flatMap((it) =>
        it.parent !== undefined && (it.parent < first.from || it.parent > last.to) ? [it.parent] : [],
      ),
    ),
  ];
  if (outside.length === 0) return fallback;
  return outside.reduce<number>((acc, p) => lca(tree, acc, p) ?? acc, outside[0]!);
};

/**
 * Whether an item stays visible when a stretch under `anchor` is decomposed.
 *
 * A *tooth* is an item hanging from the anchor — or any long-reaching move.
 * The latter is what keeps a two-sided dispute honest: opening the band under
 * Abaye shows Rava's challenges as rows beside Abaye's rather than one level
 * down, and more generally a move important enough to have a rail and a
 * handle is never hidden by a fold the reader did not ask for. (A *frame* band
 * still hides everything; that fold the closing move asked for.)
 *
 * Drop the second clause and a two-sided dispute folds the other side's
 * challenges one level down — a knob worth turning while evaluating.
 */
const isTooth = (units: readonly Unit[], anchor: number, item: Item, policy: Policy): boolean =>
  item.parent === anchor || (item.row !== undefined && isLong(units, item.row, policy));

/**
 * One level of structure under `anchor` over a stretch of items: the teeth
 * stay as they are and every maximal run of other items becomes one closed
 * thread band under the unit it hangs from.
 *
 * A run whose own anchor lies inside the stretch is that unit's thread and
 * folds under it. A run hanging from something outside the stretch is not
 * this level's business: if it hangs from a unit that is visible above, it
 * stays as it is; if it hangs from another line of the argument altogether —
 * Abaye's challenges inside a stretch that belongs to Rava — it is laid out by
 * the same rule relative to its own anchor. A run whose rows come from two or
 * more teeth's subtrees with none of those teeth present is split by tooth.
 */
const decomposeItems = (
  units: readonly Unit[],
  tree: Tree,
  anchor: number,
  items: readonly Item[],
  policy: Policy,
  bounds: { readonly from: number; readonly to: number },
): Band[] => {
  const within = (i: number): boolean => bounds.from <= i && i <= bounds.to;
  /** The child of `anchor` an item descends through, if any. */
  const toothOf = (it: Item): number | undefined => {
    const chain = lineOf(tree, it);
    const at = chain.indexOf(anchor);
    return at > 0 ? chain[at - 1] : undefined;
  };
  const span = (run: readonly Item[]): { from: number; to: number } => ({
    from: run[0]!.from,
    to: run[run.length - 1]!.to,
  });

  const out: Band[] = [];
  let i = 0;
  while (i < items.length) {
    if (isTooth(units, anchor, items[i]!, policy)) {
      i += 1;
      continue;
    }
    let j = i;
    while (j + 1 < items.length && !isTooth(units, anchor, items[j + 1]!, policy)) j += 1;
    const run = items.slice(i, j + 1);
    const a = anchorOfItems(tree, run, anchor);
    if (a === anchor) {
      // Items from two or more teeth's subtrees, none of the teeth in the run: split by tooth.
      let k = 0;
      while (k < run.length) {
        const t = toothOf(run[k]!);
        let e = k;
        while (e + 1 < run.length && toothOf(run[e + 1]!) === t) e += 1;
        const s = span(run.slice(k, e + 1));
        if (t !== undefined && within(t)) out.push(thread(t, s.from, s.to));
        k = e + 1;
      }
    } else if (descends(tree, a, anchor)) {
      const s = span(run);
      if (within(a)) out.push(thread(a, s.from, s.to));
    } else {
      out.push(...decomposeItems(units, tree, a, run, policy, bounds));
    }
    i = j + 1;
  }
  return out;
};

/** One level of structure over rows alone, for callers with no stored bands. */
export const decompose = (
  units: readonly Unit[],
  tree: Tree,
  anchor: number,
  from: number,
  to: number,
  policy: Policy,
): Band[] => decomposeItems(units, tree, anchor, itemsOf(tree, [], from, to), policy, { from, to });

/**
 * Decompose `from..to` under `anchor` around the closed bands already stored
 * inside it, and add the resulting leaves to the family. Used both when a
 * challenge arrives and when the reader opens a band.
 */
const decomposeAround = (
  units: readonly Unit[],
  tree: Tree,
  bands: readonly Band[],
  anchor: number,
  from: number,
  to: number,
  policy: Policy,
): Band[] => {
  const leaves = decomposeItems(units, tree, anchor, itemsOf(tree, bands, from, to), policy, {
    from,
    to,
  });
  return leaves.reduce<Band[]>(
    (acc, leaf) => (acc.some((b) => same(b, leaf)) ? acc : insert(acc, leaf)),
    [...bands],
  );
};

// --- transitions -----------------------------------------------------------------

const outermostClosedOver = (bands: readonly Band[], i: number): Band | undefined =>
  bands.find(
    (b) =>
      b.closed &&
      covers(b, i) &&
      !bands.some((o) => o !== b && o.closed && covers(o, i) && contains(o, b) && !same(o, b)),
  );

/**
 * Open a band one level: what it already remembers stays closed inside it,
 * and the gaps between are decomposed.
 */
const openOne = (
  units: readonly Unit[],
  tree: Tree,
  bands: readonly Band[],
  band: Band,
  policy: Policy,
): Band[] => {
  const opened = bands.map((b) => (b.key === band.key ? { ...b, closed: false } : b));
  return decomposeAround(units, tree, opened, band.anchor, band.from, band.to, policy);
};

/** Open whatever hides `target`, one level at a time, until it is a row. */
export const expose = (
  units: readonly Unit[],
  tree: Tree,
  bands: readonly Band[],
  target: number,
  policy: Policy,
): readonly Band[] => {
  let current: readonly Band[] = bands;
  for (;;) {
    const over = outermostClosedOver(current, target);
    if (over === undefined) return current;
    current = openOne(units, tree, current, over, policy);
  }
};

/** The frame a long-reaching move `m` would make, closed. `undefined` when nothing lies between it and its target. */
export const frameFor = (units: readonly Unit[], tree: Tree, m: number): Band | undefined => {
  const target = tree.parent[m];
  if (target === undefined) return undefined;
  const from = target + 1;
  const to = landingStart(units, m) - 1;
  if (to < from) return undefined;
  const anchor = anchorOf(tree, from, to, target);
  return { key: keyOf("frame", anchor, from), kind: "frame", anchor, from, to, closed: true, by: m };
};

/**
 * The frontier moved onto unit `revealed - 1`. Its target is brought into
 * view; if the unit is long-reaching it either frames its history closed (it
 * closes business) or, under `threads`, folds the finished threads between it
 * and its target; and it takes attention. Anything else changes nothing above
 * the frontier — v3's guarantee, kept.
 *
 * Exposing the target replaces v3's *release*: nothing is undone except what
 * has to be for the new move to have something to land on.
 */
export const arrive = (
  units: readonly Unit[],
  tree: Tree,
  state: FoldState,
  policy: Policy,
): FoldState => {
  const m = state.revealed; // index of the unit now revealed
  const target = tree.parent[m];
  const revealed = m + 1;
  if (target === undefined) return { ...state, revealed };

  let bands = expose(units, tree, state.bands, target, policy);
  let attention = state.attention;

  if (isLong(units, m, policy)) {
    attention = m;
    if (arrivesFolded(units, m)) {
      const frame = frameFor(units, tree, m);
      if (frame !== undefined) bands = insert(bands, frame);
    } else if (policy.openArrival === "threads" && m - 1 >= target + 1) {
      bands = decomposeAround(units, tree, bands, target, target + 1, m - 1, policy);
    }
  }
  return { revealed, bands, attention };
};

/** The state a reader reaches by advancing from the start to `revealed` without touching anything. */
export const replay = (
  units: readonly Unit[],
  revealed: number,
  policy: Policy = DEFAULT_POLICY,
): FoldState => {
  const tree = treeOf(units);
  let state = EMPTY;
  for (let i = 0; i < Math.min(revealed, units.length); i += 1) {
    state = arrive(units, tree, state, policy);
  }
  return state;
};

// --- the page -----------------------------------------------------------------------

/** One thing to draw: a sentence, or the band standing in for a folded run. */
export type Slot =
  | { readonly kind: "row"; readonly index: number }
  | { readonly kind: "band"; readonly band: Band; readonly hidden: number };

/** Rows and closed bands, in reading order. Open bands are transparent. */
export const layout = (rendered: number, bands: readonly Band[]): Slot[] => {
  const slots: Slot[] = [];
  let i = 0;
  while (i < rendered) {
    const band = bands.find(
      (b) =>
        b.closed &&
        b.from === i &&
        !bands.some((o) => o !== b && o.closed && contains(o, b) && !same(o, b)),
    );
    if (band !== undefined) {
      const to = Math.min(band.to, rendered - 1);
      slots.push({ kind: "band", band, hidden: to - i + 1 });
      i = to + 1;
    } else {
      slots.push({ kind: "row", index: i });
      i += 1;
    }
  }
  return slots;
};

/** Slot position of a unit: its own row, or the band hiding it. */
export const slotOf = (slots: readonly Slot[], index: number): number =>
  slots.findIndex((s) => (s.kind === "row" ? s.index === index : covers(s.band, index)));

export const isRow = (slots: readonly Slot[], index: number): boolean =>
  slots[slotOf(slots, index)]?.kind === "row";

/**
 * The reader's toggle. Opening shows one level — the band's teeth, their
 * threads still folded — and moves attention to the latest long-reaching move
 * on the band's anchor, so the rail that appears is the one whose interior
 * just did. Closing puts everything inside back to closed, so the next
 * opening is again one level. A band hidden inside a closed one is not on the
 * page and cannot be toggled.
 */
export const toggle = (
  units: readonly Unit[],
  state: FoldState,
  key: string,
  policy: Policy = DEFAULT_POLICY,
): FoldState => {
  const tree = treeOf(units);
  const band = state.bands.find((b) => b.key === key);
  if (band === undefined) return state;
  if (state.bands.some((o) => o !== band && o.closed && contains(o, band) && !same(o, band))) {
    return state;
  }
  if (band.closed) {
    const bands = openOne(units, tree, state.bands, band, policy);
    const slots = layout(state.revealed, bands);
    const onAnchor = units
      .map((_, i) => i)
      .filter(
        (i) =>
          i < state.revealed &&
          i >= band.from &&
          tree.parent[i] === band.anchor &&
          isLong(units, i, policy) &&
          isRow(slots, i),
      );
    const attention = onAnchor.length > 0 ? onAnchor[onAnchor.length - 1] : state.attention;
    return { ...state, bands, attention };
  }
  const bands = state.bands.map((b) =>
    b.key === key ? { ...b, closed: true } : contains(band, b) ? { ...b, closed: true } : b,
  );
  return { ...state, bands };
};

/**
 * The reader presses a move's handle — or the rail, when the move is the
 * attention. v3's `pressHandle`, kept: pressing the attention move toggles
 * its fold; pressing any other long-reaching move makes it the attention,
 * folded. "Folded" means its frame exists and is closed — made on the spot if
 * the move arrived open (a challenge the reader chooses to fold), which is the
 * one way a band comes into being by hand rather than by arrival or by
 * opening a band one level. A local move has a handle only when its target is
 * hidden; pressing it brings the target back and nothing more.
 */
export const press = (
  units: readonly Unit[],
  state: FoldState,
  m: number,
  policy: Policy = DEFAULT_POLICY,
): FoldState => {
  const tree = treeOf(units);
  if (m >= state.revealed) return state;
  const target = tree.parent[m];
  if (target === undefined) return state;
  // Both ends of the relation must be on the page.
  const exposed = expose(units, tree, expose(units, tree, state.bands, target, policy), m, policy);
  if (!isLong(units, m, policy)) return { ...state, bands: exposed };
  const frame = frameFor(units, tree, m);
  if (frame === undefined) return { ...state, bands: exposed, attention: m };
  const existing = exposed.find((b) => same(b, frame) && b.kind === "frame");
  if (state.attention === m && existing !== undefined) {
    // Toggling by the rail: the move stays the subject, whatever the band's contents.
    return { ...toggle(units, { ...state, bands: exposed }, existing.key, policy), attention: m };
  }
  if (existing !== undefined) {
    // Fold it: close it and everything inside, as `toggle` does when closing.
    const bands = exposed.map((b) =>
      b.key === existing.key || (contains(existing, b) && !same(existing, b))
        ? { ...b, closed: true }
        : b,
    );
    return { ...state, bands, attention: m };
  }
  return { ...state, bands: insert(exposed, frame), attention: m };
};

/**
 * Whether a move's frame is on the page and closed, open, or not there at
 * all. The handle's state, `aria-pressed` on the rail, and the scroll plan all
 * ask this of the attention.
 */
export type FrameState = "closed" | "open" | "absent";

export const frameStateOf = (units: readonly Unit[], state: FoldState, m: number): FrameState => {
  const frame = frameFor(units, treeOf(units), m);
  if (frame === undefined) return "absent";
  const existing = state.bands.find((b) => b.kind === "frame" && same(b, frame));
  if (existing === undefined) return "absent";
  return existing.closed ? "closed" : "open";
};

// --- rails ------------------------------------------------------------------------------

export type Rail = {
  readonly anchor: number;
  /** The move the trunk runs to; the latest long-reaching move on the anchor that is on the page. */
  readonly move: number;
  /** Other long-reaching moves on the anchor between, and the move's landing siblings: the rake's teeth. */
  readonly teeth: readonly number[];
  /** 0 is the focus rail, nearest the text; each enclosing rail is one lane further out. */
  readonly lane: number;
  /** Rows the trunk spans on the page. */
  readonly span: number;
};

/**
 * The rails on the page: the attention relation, and around it the chain of
 * long-reaching relations whose span contains it and whose ends are both
 * visible. The chain is totally ordered by containment, so lanes need no
 * collision rule. Only the innermost is drawn in full weight.
 */
export const railsOf = (
  units: readonly Unit[],
  state: FoldState,
  slots: readonly Slot[],
  policy: Policy = DEFAULT_POLICY,
): Rail[] => {
  const tree = treeOf(units);
  const m = state.attention;
  if (m === undefined || m >= state.revealed) return [];
  const t = tree.parent[m];
  if (t === undefined || !isRow(slots, m) || !isRow(slots, t)) return [];

  const railFor = (anchor: number, move: number): Rail => {
    const between = units
      .map((_, i) => i)
      .filter(
        (i) =>
          i > anchor && i < move && i < state.revealed && isRow(slots, i) && tree.parent[i] === anchor,
      );
    const teeth = between.filter((i) => isLong(units, i, policy) || i >= landingStart(units, move));
    return { anchor, move, teeth, lane: 0, span: slotOf(slots, move) - slotOf(slots, anchor) };
  };

  const focus = railFor(t, m);
  // Enclosing: distinct anchors above `t` with a visible long-reaching move below `m`.
  const enclosing = new Map<number, number>();
  units.forEach((_, i) => {
    if (i <= m || i >= state.revealed || !isLong(units, i, policy) || !isRow(slots, i)) return;
    const a = tree.parent[i];
    if (a === undefined || a >= t || !isRow(slots, a)) return;
    enclosing.set(a, Math.max(enclosing.get(a) ?? -1, i));
  });
  const chain = [...enclosing.entries()].sort((x, y) => y[0] - x[0]).map(([a, mv]) => railFor(a, mv));
  return [focus, ...chain].slice(0, policy.maxLanes).map((r, lane) => ({ ...r, lane }));
};

/** Sanity: the family is laminar. Throws otherwise. */
export const assertLaminar = (bands: readonly Band[], where: string): void => {
  for (const a of bands) {
    for (const b of bands) {
      if (a === b || disjoint(a, b) || contains(a, b) || contains(b, a)) continue;
      throw new Error(
        `${where}: bands cross — ${a.key} [${a.from}..${a.to}] vs ${b.key} [${b.from}..${b.to}]`,
      );
    }
  }
};

// --- what the band says ------------------------------------------------------------------

/** What names a sentence on a band or a handle: its caption, else its speaker, else its ordinal. */
export const nameOf = (units: readonly Unit[], i: number): string =>
  units[i]?.short ?? units[i]?.speaker ?? `sentence ${i + 1}`;

/**
 * What a band says it puts away. A frame names the relation whose landing
 * made it — `between Rava: despair and the item a river swept off` — because
 * its rows are that move's history and not all of them the anchor's own. A
 * thread names the sentence it hangs under: `under Rav Pappa: …`. The wording
 * is a knob for the evaluation; this is the one place it is set.
 */
export const captionOf = (units: readonly Unit[], band: Band): string => {
  const by = band.by;
  const target = by === undefined ? undefined : treeOf(units).parent[by];
  return band.kind === "frame" && by !== undefined && target !== undefined
    ? `between ${nameOf(units, target)} and ${nameOf(units, by)}`
    : `under ${nameOf(units, band.anchor)}`;
};

/** Indices hidden by a fold, half-open. A band's `to` is inclusive: pass `to + 1`. */
export type FoldRange = {
  readonly from: number;
  readonly to: number;
};

/**
 * What a band has to say for the sentences it hides. Derived from the same
 * analysis as the visible rows, so nothing behind the band is quietly resolved:
 * the count of challenges still pressing is exactly what the state-of-play
 * strip would show for them.
 */
export type FoldSummary = {
  readonly sentences: number;
  readonly movements: readonly Movement[];
  /** Movement openers that are moves and have not been put to rest. */
  readonly standing: number;
};

export const summarizeFold = (
  sugya: Sugya,
  analysis: Analysis,
  range: FoldRange,
): FoldSummary => {
  const movements = movementsOf(sugya).filter(
    (m) => m.start >= range.from && m.start < range.to,
  );
  const standing = movements.filter((m) => {
    if (m.opening.move.element === "statement") return false;
    const s = analysis.standing.get(m.opening.id);
    return s === "live" || s === "weakened";
  }).length;
  return { sentences: range.to - range.from, movements, standing };
};
