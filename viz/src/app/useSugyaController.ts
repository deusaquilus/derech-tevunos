/**
 * The interaction engine behind the waterfall, with no markup of its own.
 *
 * Everything a view needs to draw a sugya and let the reader walk through it —
 * the revealed prefix, the fold state, the measured icon positions, the derived
 * rails, connectors, handles and verdicts, and the handlers that move them — is
 * computed here and returned as one object. `SugyaView` is one arrangement of
 * this; a print view, a single-movement view or a two-sugya comparison would be
 * others, and each reuses this hook rather than the layout.
 *
 * The split is deliberate: this file owns *behaviour* (state, measurement,
 * scroll), the core modules own *logic* (analysis, folding, geometry), and the
 * components own *markup*. Nothing here reaches into the DOM except through the
 * one ref it hands back for the rows container.
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

import {
  ANATOMY,
  badgesOf,
  groundBadge,
  speakerBadge,
  type Badge,
} from "../anatomy.ts";
import {
  arrive,
  captionOf,
  frameStateOf,
  isLongReach,
  isRow,
  layout,
  nameOf as nameOfUnit,
  press,
  railsOf,
  replay,
  slotOf,
  summarizeFold,
  toggle,
  treeOf,
  type Band,
  type FoldState,
  type FoldSummary,
  type Policy,
  type Slot,
  type Tree,
} from "../folding.ts";
import {
  beadFits,
  beadPoint,
  beadRadius,
  connectorStyle,
  indentFor,
  isLongRun,
  latticeWidth,
  marginFor,
  type Point,
} from "../layout.ts";
import {
  analyze,
  labelBasis,
  maxDepth,
  movementsOf,
  prefixOf,
  type Analysis,
  type Movement,
  type Standing,
  type Sugya,
  type Unit,
} from "../sugya.ts";
import { effectOf } from "../taxonomy.ts";
import { verdictFor } from "../verdict.ts";
import type { Connector, DepthColumn } from "./components/ConnectorLayer.tsx";
import type { DrawnRail } from "./components/RailLayer.tsx";
import type { StateOfPlayEntry } from "./components/StateOfPlay.tsx";
import type { Handle } from "./components/UnitRow.tsx";
import { useAnatomyLayer, type AnatomyLayer } from "./hooks/useAnatomyLayer.ts";
import { useFoldPolicy, type FoldPolicy } from "./hooks/useFoldPolicy.ts";
import { useIconPositions } from "./hooks/useIconPositions.ts";

/**
 * Past this many sentences the passage no longer fits on a screen or two, and
 * three things that are free below it stop being free: every row can be kept in
 * the document, the rail can align its ticks to the rows, and the reader can
 * hold the whole shape in view. See `RevealRail` and the horizon below.
 */
export const LONG_SUGYA = 14;

/**
 * How far past the frontier to keep rendering. Enough to show that something is
 * coming; not so much that the page is mostly blur. Below the horizon nothing
 * is rendered at all — fifty blurred rows are four thousand pixels of scroll
 * and fifty live blur filters, for a preview nobody can see.
 */
export const HORIZON = 3;

/**
 * Whether edge-level badges are also drawn as beads on the elbows they
 * describe. The chip on the row is the badge; the bead is a best-effort second
 * copy of it on the line, and this is the one switch that drops it.
 */
export const BEADS_ON_ELBOWS = true;

export type ControllerOptions = {
  readonly beads?: boolean;
  /** Overrides on the reader's remembered policy, e.g. `{ maxLanes: 1 }` for a page with one rail. */
  readonly policy?: Partial<Policy>;
  /** How many sentences to start with revealed; the opening sentence by default. */
  readonly start?: number;
};

/** What the chapter 1–8 layer puts on one row, after the switch and lenses. */
export type RowBadges = {
  /** About the sentence alone: its form, what it implies, whether it is literal. */
  readonly row: readonly Badge[];
  /**
   * About its move on its target: how the two relate, what kind of deduction,
   * what it stands on. The file's labels first, in their order; then, on a
   * proof, disproof or difficulty whose `provenance` names a source and that
   * carries no ch. 8 label of its own, the ground read off that provenance.
   */
  readonly edge: readonly Badge[];
  /** Ch. 1, for a row with no named speaker. */
  readonly speaker: Badge | undefined;
};

const NO_BADGES: RowBadges = { row: [], edge: [], speaker: undefined };

/** An edge-level badge drawn on the elbow it describes. */
export type Bead = {
  /** The move, which is also the row whose chip this bead mirrors. */
  readonly id: string;
  readonly targetId: string;
  readonly ordinal: number;
  readonly targetOrdinal: number;
  readonly at: Point;
  readonly r: number;
  readonly badge: Badge;
};

/** Which half of a linked pair the pointer is on: the chip, or its bead. */
export type HotFrom = "chip" | "bead";

/** What a band on the page says for itself, derived from the analysis at this step. */
export type BandView = {
  readonly key: string;
  readonly kind: Band["kind"];
  readonly anchorId: string;
  readonly summary: FoldSummary;
  /** `between … and …` for a frame that names its move; `under …` otherwise. */
  readonly caption: string;
  /** Where the band sits: one step in from its anchor, where the anchor's children sit. */
  readonly depth: number;
};

/** The reader's last action, which the scroll plan needs alongside the state change. */
type Action =
  | { readonly kind: "seek" }
  | { readonly kind: "press"; readonly index: number }
  | { readonly kind: "toggle"; readonly key: string };

/**
 * What to bring into view after a change, decided from how the state moved
 * and what the reader did, so the rail, the handles, the band and the minimap
 * all get the same behaviour for free.
 */
type ScrollPlan =
  | { readonly kind: "frontier" }
  | { readonly kind: "row"; readonly id: string; readonly block: ScrollLogicalPosition }
  | { readonly kind: "band"; readonly key: string; readonly block: ScrollLogicalPosition };

type Page = { readonly fold: FoldState; readonly slots: readonly Slot[] };

const planScroll = (
  units: readonly Unit[],
  tree: Tree,
  action: Action | undefined,
  before: Page,
  after: Page,
): ScrollPlan | undefined => {
  const frontierMoved = after.fold.revealed !== before.fold.revealed;
  const m = after.fold.attention;
  const frameAfter = m === undefined ? "absent" : frameStateOf(units, after.fold, m);
  const frameBefore = m === undefined ? "absent" : frameStateOf(units, before.fold, m);
  const newlyClosed =
    m !== undefined && frameAfter === "closed" && (m !== before.fold.attention || frameBefore !== "closed");

  // Folded: the whole bracket — target, band, landing — now fits on a screen,
  // so put its top at the top, whether the fold came from the reader's press
  // or from a refutation arriving. A band toggled by hand is its own case.
  if (newlyClosed && action?.kind !== "toggle") {
    const target = tree.parent[m];
    return target === undefined ? undefined : { kind: "row", id: units[target]!.id, block: "start" };
  }

  if (action?.kind === "press") {
    // Unfolded by hand: the rows that just came back are above the move; hold
    // the move in view so the reader is at the foot of the rail and can
    // follow it up.
    if (action.index === m && !frontierMoved) return { kind: "row", id: units[m]!.id, block: "center" };
    // A local move's handle: its target came back into view above it.
    const target = tree.parent[action.index];
    return target === undefined ? undefined : { kind: "row", id: units[target]!.id, block: "nearest" };
  }

  if (action?.kind === "toggle") {
    const band = after.fold.bands.find((b) => b.key === action.key);
    if (band === undefined) return undefined;
    if (band.closed) return { kind: "band", key: band.key, block: "nearest" };
    // Opened: the first thing that appeared, whatever it is.
    const first = after.slots.find((s) =>
      s.kind === "row" ? s.index >= band.from && s.index <= band.to : s.band.from >= band.from,
    );
    if (first === undefined) return undefined;
    return first.kind === "row"
      ? { kind: "row", id: units[first.index]!.id, block: "nearest" }
      : { kind: "band", key: first.band.key, block: "nearest" };
  }

  // Reading on — including an arrival that had to expose its target.
  return frontierMoved ? { kind: "frontier" } : undefined;
};

/** Rows hidden by bands strictly between two units' slots. */
const hiddenBetween = (slots: readonly Slot[], a: number, b: number): number => {
  const lo = Math.min(slotOf(slots, a), slotOf(slots, b));
  const hi = Math.max(slotOf(slots, a), slotOf(slots, b));
  return slots
    .slice(lo + 1, hi)
    .reduce((acc, s) => acc + (s.kind === "band" ? s.hidden : 0), 0);
};

/** Everything a view needs to render a sugya and drive it. */
export type SugyaController = {
  readonly sugya: Sugya;
  readonly units: readonly Unit[];
  readonly total: number;
  /** True once the passage is long enough to warrant the minimap and horizon. */
  readonly long: boolean;

  // Interaction state.
  readonly revealed: number;
  readonly fold: FoldState;
  /** The move whose rail is drawn in full, by id. */
  readonly attention: string | undefined;
  readonly policy: Policy;
  readonly foldPolicy: FoldPolicy;
  readonly peeked: string | undefined;
  /** The move whose edge badge — chip or bead — the pointer is on. Both light. */
  readonly hotEdge: string | undefined;
  /**
   * The move whose *bead* the pointer is on. The bead explains nothing itself,
   * so its chip carries a one-line hint pointing the reader at the words.
   */
  readonly hotBead: string | undefined;

  // The chapter 1–8 layer.
  readonly anatomy: AnatomyLayer;
  /**
   * True when the layer would have something to show beyond the speaker
   * badges: a sentence carries an annotation, the sugya names its party, or
   * a move's provenance gives it a ground.
   */
  readonly annotated: boolean;
  readonly party: Badge | undefined;
  readonly badgesAt: (unit: Unit) => RowBadges;
  readonly beads: readonly Bead[];
  /** Whether a bead is on the page for this move, for the chip's tooltip. */
  readonly hasBead: (id: string) => boolean;
  /** 1-based position of the sentence a move acts on, for the badges' wording. */
  readonly targetOrdinal: (unit: Unit) => number | undefined;

  // Analysis: the whole sugya (stable geometry) and the revealed prefix (verdicts).
  readonly full: Analysis;
  readonly shown: Analysis;
  readonly deepest: number;
  readonly indent: number;
  /** Lanes the margin reserves for rails: the policy's `maxLanes`, or one when nothing reaches far. */
  readonly lanes: number;
  /** Room to the left of depth 0, in pixels. */
  readonly margin: number;
  readonly width: number;

  // Movements.
  readonly movements: readonly Movement[];
  readonly movementAt: ReadonlyMap<number, Movement>;
  readonly currentMovement: Movement | undefined;
  readonly movementEnd: number;

  // What to draw.
  readonly rendered: number;
  readonly slots: readonly Slot[];
  readonly bandViews: ReadonlyMap<string, BandView>;
  readonly onRail: ReadonlySet<string>;
  /** Lane 0 first, then each enclosing rail one lane further out. */
  readonly rails: readonly DrawnRail[];
  readonly handles: ReadonlyMap<string, Handle>;
  readonly columns: readonly DepthColumn[];
  readonly connectors: readonly Connector[];
  readonly ticks: readonly number[];
  readonly roots: readonly StateOfPlayEntry[];
  readonly coverage: { readonly attested: number; readonly marked: number };

  // Measurement: attach `rowsRef` to the rows container and `register(id)` to
  // each icon; the hook measures where they land and recomputes the geometry.
  readonly rowsRef: RefObject<HTMLOListElement | null>;
  readonly register: (id: string) => (el: HTMLDivElement | null) => void;
  readonly height: number;

  // Handlers.
  readonly seek: (next: number) => void;
  readonly advance: () => void;
  readonly retreat: () => void;
  readonly collapseTo: (ordinal: number) => void;
  /** Press the rail: fold or unfold the attention's frame, one level at a time. */
  readonly toggleFold: () => void;
  readonly pressHandle: (id: string) => void;
  /** Press a band: open it one level, or close it. */
  readonly toggleBand: (key: string) => void;
  readonly setPeeked: (next: string | undefined) => void;
  readonly peekRail: (peeking: boolean) => void;
  /**
   * Point at a move's edge badge: lights its chip and its bead, and peeks its
   * target. `from` says which of the two the pointer is actually on.
   */
  readonly hoverEdge: (id: string | undefined, from?: HotFrom) => void;

  /** Per-row verdict for the revealed prefix; undefined before it is revealed. */
  readonly verdictAt: (unit: Unit, index: number) => ReturnType<typeof verdictFor>;
  /** Standing at the revealed prefix; `live` before anything lands. */
  readonly standingAt: (id: string) => Standing;
  /** Dialectical depth from the whole sugya, so the staircase never shifts. */
  readonly depthAt: (id: string) => number;
};

export const useSugyaController = (
  sugya: Sugya,
  options: ControllerOptions = {},
): SugyaController => {
  const beadsWanted = options.beads ?? BEADS_ON_ELBOWS;
  const overrides = options.policy;

  const units = sugya.units;
  const total = units.length;
  const long = total > LONG_SUGYA;
  const tree = useMemo(() => treeOf(units), [units]);

  const foldPolicy = useFoldPolicy();
  const policy = useMemo<Policy>(
    () => ({ ...foldPolicy.policy, ...overrides }),
    // Overrides are a small literal; comparing its fields keeps the policy object stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [foldPolicy.policy, overrides?.longReach, overrides?.openArrival, overrides?.maxLanes],
  );

  // Starts at the opening sentence (or where the page asked); the caller
  // remounts on a new sugya.
  const start = Math.max(1, Math.min(total, options.start ?? 1));
  const [fold, setFold] = useState<FoldState>(() => replay(units, start, policy));
  const revealed = fold.revealed;
  const [peeked, setPeeked] = useState<string | undefined>(undefined);
  // One piece of state for the pair, so the chip and its bead cannot disagree
  // about which of them the pointer is on.
  const [hot, setHot] = useState<{ readonly id: string; readonly from: HotFrom } | undefined>(
    undefined,
  );
  const anatomy = useAnatomyLayer();
  const action = useRef<Action | undefined>(undefined);

  const indexOf = useMemo(() => tree.index, [tree]);
  const unitOf = useCallback((id: string) => units[indexOf.get(id) ?? -1], [units, indexOf]);

  // Depth comes from the whole sugya so the staircase never shifts as the
  // slider moves; standing and status come from the prefix, so they do.
  const full = useMemo(() => analyze(sugya), [sugya]);
  const shown = useMemo(() => analyze(prefixOf(sugya, revealed)), [sugya, revealed]);
  const deepest = maxDepth(full);
  const indent = indentFor(deepest);

  // The margin reserves every lane whenever a rail could appear, so rows never
  // shift horizontally when a second one does.
  const hasLongReach = useMemo(
    () => units.some((_, i) => isLongReach(units, i, policy.longReach)),
    [units, policy.longReach],
  );
  const lanes = hasLongReach ? policy.maxLanes : 1;
  const margin = marginFor(lanes);
  const width = latticeWidth(deepest, indent, lanes);

  const movements = useMemo(() => movementsOf(sugya), [sugya]);
  const movementAt = useMemo(() => {
    const byStart = new Map<number, Movement>();
    for (const movement of movements) byStart.set(movement.start, movement);
    return byStart;
  }, [movements]);
  const currentMovement = useMemo(
    () => movements.filter((m) => m.start < revealed).at(-1),
    [movements, revealed],
  );

  // Below the horizon rows are not in the document. Above the frontier, rows
  // move only when a band opens or closes — which is the reader's doing, or
  // the arrival of a long-reaching move, and either way the whole point.
  const rendered = long ? Math.min(total, revealed + HORIZON) : total;
  const slots = useMemo(() => layout(rendered, fold.bands), [rendered, fold.bands]);

  const rowsRef = useRef<HTMLOListElement>(null);
  const ids = useMemo(
    () => slots.flatMap((slot) => (slot.kind === "row" ? [units[slot.index]!.id] : [])),
    [slots, units],
  );
  const { positions, register, height } = useIconPositions(rowsRef, ids);

  const nameOf = useCallback((i: number): string => nameOfUnit(units, i), [units]);

  // What each band on the page says: count and standing from the analysis at
  // this step, and a caption naming the relation (a frame) or the anchor (a
  // thread) whose business it puts away.
  const bandViews = useMemo<ReadonlyMap<string, BandView>>(() => {
    const out = new Map<string, BandView>();
    for (const slot of slots) {
      if (slot.kind !== "band") continue;
      const { band } = slot;
      const to = Math.min(band.to, rendered - 1) + 1;
      out.set(band.key, {
        key: band.key,
        kind: band.kind,
        anchorId: units[band.anchor]!.id,
        summary: summarizeFold(sugya, shown, { from: band.from, to }),
        caption: captionOf(units, band),
        depth: (full.depth.get(units[band.anchor]!.id) ?? 0) + 1,
      });
    }
    return out;
  }, [slots, rendered, units, sugya, shown, full]);

  // The chain of rails, by index; resolved to measured points below.
  const chain = useMemo(() => railsOf(units, fold, slots, policy), [units, fold, slots, policy]);
  const focusRail = chain[0];

  const onRail = useMemo(
    () =>
      new Set(
        focusRail === undefined
          ? []
          : [focusRail.anchor, focusRail.move, ...focusRail.teeth].map((i) => units[i]!.id),
      ),
    [focusRail, units],
  );

  const rails = useMemo<readonly DrawnRail[]>(
    () =>
      chain.flatMap((rail) => {
        const moveUnit = units[rail.move]!;
        const anchorUnit = units[rail.anchor]!;
        const move = positions.get(moveUnit.id);
        const target = positions.get(anchorUnit.id);
        if (move === undefined || target === undefined) return [];
        return [
          {
            id: moveUnit.id,
            targetId: anchorUnit.id,
            target,
            move,
            branches: rail.teeth.flatMap((i) => {
              const at = positions.get(units[i]!.id);
              return at === undefined ? [] : [{ at, style: connectorStyle(effectOf(units[i]!.move)) }];
            }),
            style: connectorStyle(effectOf(moveUnit.move)),
            folded: rail.lane === 0 && frameStateOf(units, fold, rail.move) === "closed",
            label: nameOf(rail.anchor),
            moveLabel: nameOf(rail.move),
            hiddenCount: hiddenBetween(slots, rail.anchor, rail.move),
            lane: rail.lane,
          },
        ];
      }),
    [chain, units, positions, fold, nameOf, slots],
  );

  // A move gets a printed handle when its target is far enough away that no
  // elbow could reach it, or is folded out of view. The attention's handle is
  // the rail's second grip; another long-reaching move's, pressed, makes that
  // move the attention, folded; a local move's brings its target back.
  const handles = useMemo<ReadonlyMap<string, Handle>>(() => {
    const out = new Map<string, Handle>();
    for (const slot of slots) {
      if (slot.kind !== "row" || slot.index >= revealed) continue;
      const i = slot.index;
      const targetIndex = tree.parent[i];
      if (targetIndex === undefined) continue;
      const far = isLongReach(units, i, policy.longReach);
      const targetShown = isRow(slots, targetIndex);
      if (!far && targetShown) continue;
      const open = fold.attention === i;
      out.set(units[i]!.id, {
        targetId: units[targetIndex]!.id,
        ordinal: targetIndex + 1,
        label: nameOf(targetIndex),
        open,
        folded: open && frameStateOf(units, fold, i) === "closed",
        hidden: hiddenBetween(slots, targetIndex, i),
        away: !far && !targetShown,
      });
    }
    return out;
  }, [slots, revealed, tree, units, policy.longReach, fold, nameOf]);

  const columns = useMemo<readonly DepthColumn[]>(() => {
    const extent = new Map<number, { top: number; bottom: number }>();
    for (const point of positions.values()) {
      const x = Math.round(point.x);
      const seen = extent.get(x);
      extent.set(
        x,
        seen === undefined
          ? { top: point.y, bottom: point.y }
          : { top: Math.min(seen.top, point.y), bottom: Math.max(seen.bottom, point.y) },
      );
    }
    return [...extent.entries()]
      .map(([x, { top, bottom }]) => ({ x, top: top - 10, bottom: bottom + 10 }))
      .sort((a, b) => a.x - b.x);
  }, [positions]);

  // Local elbows only. Anything with a handle is either drawn as a rail or
  // referred to in words; and a line that would be too long to follow even
  // between two visible rows is dropped rather than drawn.
  const connectors = useMemo<readonly Connector[]>(
    () =>
      slots.flatMap((slot) => {
        if (slot.kind !== "row") return [];
        const unit = units[slot.index]!;
        if (unit.target === undefined || handles.has(unit.id) || slot.index === fold.attention) return [];
        const to = positions.get(unit.id);
        const from = positions.get(unit.target);
        if (to === undefined || from === undefined || isLongRun(from, to)) return [];
        return [
          {
            id: unit.id,
            from,
            to,
            style: connectorStyle(effectOf(unit.move)),
            revealed: slot.index < revealed,
          },
        ];
      }),
    [slots, units, handles, fold.attention, positions, revealed],
  );

  // For the aligned rail, a hidden row borrows the height of the last visible
  // one above it, so the ticks stay monotonic across a fold.
  const ticks = useMemo(() => {
    let last = 0;
    return units.slice(0, rendered).map((unit) => {
      const y = positions.get(unit.id)?.y;
      if (y !== undefined) last = y;
      return last;
    });
  }, [units, rendered, positions]);

  const roots = useMemo<readonly StateOfPlayEntry[]>(
    () =>
      units
        .filter((unit) => unit.target === undefined)
        .map((unit, i) => ({
          unit,
          verdict: i < revealed ? verdictFor(unit, shown) : undefined,
          open: shown.pressure.get(unit.id) ?? 0,
        })),
    [units, shown, revealed],
  );

  const coverage = useMemo(() => {
    const basis = units.map(labelBasis);
    return {
      attested: basis.filter((b) => b === "attested").length,
      marked: basis.filter((b) => b === "marked").length,
    };
  }, [units]);

  // --- the chapter 1–8 layer -------------------------------------------------
  // Everything below is derived from the annotations, the provenances and the
  // switch; the only state is the switch itself (persisted) and which badge is
  // hot.

  const annotated = useMemo(
    () =>
      sugya.party !== undefined ||
      units.some((u) => (u.anatomy ?? []).length > 0 || groundBadge(u) !== undefined),
    [sugya, units],
  );

  const { on: layerOn, lenses } = anatomy;
  const showing = useCallback(
    (badge: Badge): boolean => layerOn && lenses[badge.info.family],
    [layerOn, lenses],
  );

  const party = useMemo<Badge | undefined>(() => {
    if (sugya.party === undefined) return undefined;
    const badge: Badge = { info: ANATOMY[sugya.party], basis: "inferred" };
    return showing(badge) ? badge : undefined;
  }, [sugya.party, showing]);

  const badgesAt = useCallback(
    (unit: Unit): RowBadges => {
      if (!layerOn) return NO_BADGES;
      const speaker = speakerBadge(unit);
      // The derived ground comes last, so a relation or deduction the file
      // wrote stays first — and stays the badge the bead carries.
      const ground = groundBadge(unit);
      return {
        row: badgesOf(unit.anatomy, "row").filter(showing),
        edge: [...badgesOf(unit.anatomy, "edge"), ...(ground === undefined ? [] : [ground])].filter(showing),
        speaker: speaker !== undefined && showing(speaker) ? speaker : undefined,
      };
    },
    [layerOn, showing],
  );

  const targetOrdinal = useCallback(
    (unit: Unit): number | undefined => {
      if (unit.target === undefined) return undefined;
      const at = indexOf.get(unit.target);
      return at === undefined ? undefined : at + 1;
    },
    [indexOf],
  );

  // A bead for every drawn elbow whose move carries an edge badge and whose
  // run has room. Long-reaching moves have no elbow and so no bead; their
  // badge rides in the handle instead.
  const beads = useMemo<readonly Bead[]>(() => {
    if (!layerOn || !beadsWanted) return [];
    const r = beadRadius(indent);
    return connectors.flatMap((c) => {
      if (!c.revealed || !beadFits(c.from, c.to)) return [];
      const unit = unitOf(c.id);
      if (unit === undefined || unit.target === undefined) return [];
      const badge = badgesAt(unit).edge[0];
      if (badge === undefined) return [];
      const at = indexOf.get(unit.id);
      const targetAt = indexOf.get(unit.target);
      if (at === undefined || targetAt === undefined) return [];
      return [
        {
          id: unit.id,
          targetId: unit.target,
          ordinal: at + 1,
          targetOrdinal: targetAt + 1,
          at: beadPoint(c.from, c.to, indent),
          r,
          badge,
        },
      ];
    });
  }, [layerOn, beadsWanted, indent, connectors, unitOf, badgesAt, indexOf]);

  const beadIds = useMemo(() => new Set(beads.map((b) => b.id)), [beads]);
  const hasBead = useCallback((id: string) => beadIds.has(id), [beadIds]);

  const hoverEdge = useCallback(
    (id: string | undefined, from: HotFrom = "chip") => {
      setHot(id === undefined ? undefined : { id, from });
      setPeeked(id === undefined ? undefined : unitOf(id)?.target);
    },
    [unitOf],
  );

  // --- the reader's actions ---------------------------------------------------
  // Forward: arrive per step from the current state, so a band the reader
  // opened stays open until a closer folds it. Backward: re-derive from the
  // start, dropping the reader's toggles.
  const seek = useCallback(
    (next: number) => {
      const clamped = Math.max(1, Math.min(total, next));
      action.current = { kind: "seek" };
      setFold((current) => {
        if (clamped === current.revealed) return current;
        if (clamped < current.revealed) return replay(units, clamped, policy);
        let state = current;
        while (state.revealed < clamped) state = arrive(units, tree, state, policy);
        return state;
      });
    },
    [units, tree, total, policy],
  );
  const advance = useCallback(() => seek(revealed + 1), [seek, revealed]);
  const retreat = useCallback(() => seek(revealed - 1), [seek, revealed]);
  const collapseTo = useCallback((ordinal: number) => seek(ordinal), [seek]);

  const pressAt = useCallback(
    (index: number) => {
      action.current = { kind: "press", index };
      setFold((current) => press(units, current, index, policy));
    },
    [units, policy],
  );
  const pressHandle = useCallback(
    (id: string) => {
      const index = indexOf.get(id);
      if (index !== undefined) pressAt(index);
    },
    [indexOf, pressAt],
  );
  const toggleFold = useCallback(() => {
    if (fold.attention !== undefined) pressAt(fold.attention);
  }, [fold.attention, pressAt]);
  const toggleBand = useCallback(
    (key: string) => {
      action.current = { kind: "toggle", key };
      setFold((current) => toggle(units, current, key, policy));
    },
    [units, policy],
  );

  // Flipping the policy re-derives the state at the current step, so the
  // reader stays where they are and the page re-lays out under the other rule.
  const appliedPolicy = useRef(policy);
  useEffect(() => {
    if (appliedPolicy.current === policy) return;
    appliedPolicy.current = policy;
    setFold((current) => replay(units, current.revealed, policy));
  }, [units, policy]);

  // Scroll after the DOM reflects the new state, and before paint.
  const previous = useRef<Page>({ fold, slots });
  const firstRender = useRef(true);
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      previous.current = { fold, slots };
      return;
    }
    const plan = planScroll(units, tree, action.current, previous.current, { fold, slots });
    previous.current = { fold, slots };
    action.current = undefined;
    if (plan === undefined) return;

    const rows = rowsRef.current;
    if (rows === null) return;
    const node =
      plan.kind === "frontier"
        ? rows.querySelector(".row-frontier")
        : plan.kind === "row"
          ? rows.querySelector(`[data-id="${plan.id}"]`)
          : rows.querySelector(`[data-key="${plan.key}"]`);
    // `nearest` for the frontier is deliberate: it does nothing while the row
    // is on screen, and otherwise moves the page by the least it can.
    node?.scrollIntoView({
      block: plan.kind === "frontier" ? "nearest" : plan.block,
      behavior: "smooth",
    });
  }, [fold, slots, units, tree]);

  useEffect(() => {
    setPeeked(undefined);
    setHot(undefined);
  }, [sugya]);

  const movementEnd = currentMovement
    ? currentMovement.start + currentMovement.units.length
    : revealed;

  const peekRail = useCallback(
    (peeking: boolean) => setPeeked(peeking ? rails[0]?.targetId : undefined),
    [rails],
  );

  const verdictAt = useCallback(
    (unit: Unit, index: number) => (index < revealed ? verdictFor(unit, shown) : undefined),
    [revealed, shown],
  );
  const standingAt = useCallback(
    (id: string) => shown.standing.get(id) ?? "live",
    [shown],
  );
  const depthAt = useCallback((id: string) => full.depth.get(id) ?? 0, [full]);

  return {
    sugya,
    units,
    total,
    long,
    revealed,
    fold,
    attention: fold.attention === undefined ? undefined : units[fold.attention]?.id,
    policy,
    foldPolicy,
    peeked,
    hotEdge: hot?.id,
    hotBead: hot?.from === "bead" ? hot.id : undefined,
    anatomy,
    annotated,
    party,
    badgesAt,
    beads,
    hasBead,
    targetOrdinal,
    full,
    shown,
    deepest,
    indent,
    lanes,
    margin,
    width,
    movements,
    movementAt,
    currentMovement,
    movementEnd,
    rendered,
    slots,
    bandViews,
    onRail,
    rails,
    handles,
    columns,
    connectors,
    ticks,
    roots,
    coverage,
    rowsRef,
    register,
    height,
    seek,
    advance,
    retreat,
    collapseTo,
    toggleFold,
    pressHandle,
    toggleBand,
    setPeeked,
    peekRail,
    hoverEdge,
    verdictAt,
    standingAt,
    depthAt,
  };
};
