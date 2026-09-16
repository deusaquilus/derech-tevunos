/**
 * Formal Concept Analysis over a three-valued incidence relation.
 *
 * Backs visualization 5.1 of `derech-tevunos-visualization-spec.md`, and is the
 * shared engine that 5.2 (circumscription diff) and 5.3 (aspect lanes) build on.
 *
 * The central object is not a lattice but an *interval* of lattices. Where the
 * source leaves a cell in `doubt` (§1.2), what is known is bounded below by the
 * floor context, which reads doubt as absence, and above by the ceiling context,
 * which reads it as presence.
 */

// --- indices ---------------------------------------------------------------

/**
 * Ramchal's four aspects (Ch8, Hebrew pp147-149). Specific texts index on
 * whatever distinction is doing the work, which is why `FiberIndex` is open.
 */
export type Aspect = "essence" | "proprium" | "accident" | "relational";

/** `בכח` / `בפועל` (Ch8 p154). Does not unify across values; see trap 8. */
export type Modality = "potential" | "actual";

/**
 * What a fiber is indexed by. Open by design, per §5.3: the Pesachim 19b case
 * turns on a law-domain rather than one of the four aspects. `unindexed` is a
 * real state, not a default — §4 forbids guessing an index, because a guessed
 * one silently re-enables the aspect fallacy.
 */
export type FiberIndex =
  | { readonly kind: "aspect"; readonly aspect: Aspect }
  | { readonly kind: "lawDomain"; readonly domain: string }
  | { readonly kind: "unindexed" };

export const describeFiberIndex = (index: FiberIndex): string => {
  switch (index.kind) {
    case "aspect":
      return index.aspect;
    case "lawDomain":
      return index.domain;
    case "unindexed":
      return "not indexed in source";
    default: {
      const exhaustive: never = index;
      return exhaustive;
    }
  }
};

/** A single point of the `aspect × modality` base. A context lives in exactly one. */
export type Fiber = {
  readonly index: FiberIndex;
  /** `undefined` when the source does not index on modality. Never guessed. */
  readonly modality: Modality | undefined;
};

// --- the three-valued context ----------------------------------------------

/** A cell the source has settled. */
export type Decided = "in" | "out";

/** `ספק` is the resting state of a cell, not a missing value (Ch8 p112, trap 1). */
export type CellValue = Decided | "doubt";

/** `${subjectId}|${predicateId}`. The fiber is a property of the context. */
export type CellKey = string;

export const cellKey = (subject: string, predicate: string): CellKey =>
  `${subject}|${predicate}`;

export type Context = {
  readonly fiber: Fiber;
  readonly subjects: readonly string[];
  readonly predicates: readonly string[];
  /** Cells absent from the record are `doubt`. */
  readonly cells: ReadonlyMap<CellKey, CellValue>;
};

/** Cells pinned by the user, overriding `doubt`. Decided cells are unaffected. */
export type Resolution = ReadonlyMap<CellKey, Decided>;

/** Which reading of `doubt` a lattice was built under. */
export type Bound = "floor" | "ceiling";

/** How `doubt` resolves under each bound: floor reads it as absence, ceiling as presence. */
const doubtAs = (bound: Bound): Decided => (bound === "floor" ? "out" : "in");

export const valueAt = (
  context: Context,
  key: CellKey,
  bound: Bound,
  resolution: Resolution = new Map(),
): Decided => {
  const declared = context.cells.get(key) ?? "doubt";
  if (declared !== "doubt") return declared;
  return resolution.get(key) ?? doubtAs(bound);
};

/** Doubtful cells still open: declared `doubt` and not pinned. */
export const openCells = (
  context: Context,
  resolution: Resolution = new Map(),
): readonly CellKey[] =>
  context.subjects.flatMap((subject) =>
    context.predicates
      .map((predicate) => cellKey(subject, predicate))
      .filter(
        (key) =>
          (context.cells.get(key) ?? "doubt") === "doubt" &&
          !resolution.has(key),
      ),
  );

// --- concept enumeration ---------------------------------------------------

/**
 * A subset of subjects (extent) or predicates (intent), as a bitmask over the
 * corresponding index array. Caps the context at 31 terms per side, which is
 * far beyond the hand-curated fixtures this is built for (§4, Path A).
 */
type Mask = number;

const MAX_TERMS = 31;

/** A formal concept: a fixed point `(A, B)` with `A' = B` and `B' = A`. */
export type Concept = {
  readonly extent: Mask;
  readonly intent: Mask;
};

/** rows[i] = the predicates subject i carries, under one bound. */
export const incidenceRows = (
  context: Context,
  bound: Bound,
  resolution: Resolution,
): readonly Mask[] =>
  context.subjects.map((subject) =>
    context.predicates.reduce(
      (row, predicate, j) =>
        valueAt(context, cellKey(subject, predicate), bound, resolution) === "in"
          ? row | (1 << j)
          : row,
      0,
    ),
  );

/** `B'` — every subject carrying all of `intent`. */
export const extentOf = (rows: readonly Mask[], intent: Mask): Mask =>
  rows.reduce(
    (extent, row, i) => ((row & intent) === intent ? extent | (1 << i) : extent),
    0,
  );

/** `A'` — every predicate shared by all of `extent`. */
export const intentOf = (rows: readonly Mask[], extent: Mask, full: Mask): Mask =>
  rows.reduce((intent, row, i) => (extent & (1 << i) ? intent & row : intent), full);

/**
 * One step of Ganter's NextClosure: the lectically next closed intent, or
 * `undefined` once the top has been reached.
 */
const nextIntent = (
  close: (intent: Mask) => Mask,
  from: Mask,
  predicateCount: number,
): Mask | undefined => {
  const step = (intent: Mask, i: number): Mask | undefined => {
    if (i < 0) return undefined;
    const bit = 1 << i;
    if (intent & bit) return step(intent & ~bit, i - 1);
    const below = bit - 1; // predicates of index < i
    const candidate = close((intent & below) | bit);
    // Legal only if the closure added nothing below i.
    return (candidate & ~intent & below) === 0 ? candidate : step(intent, i - 1);
  };
  return step(from, predicateCount - 1);
};

/**
 * All formal concepts, in lectic order by intent. `O(|S|·|P|·|𝔅|)`.
 */
export const conceptsOf = (rows: readonly Mask[], predicateCount: number): readonly Concept[] => {
  const full = (1 << predicateCount) - 1;
  const close = (intent: Mask): Mask => intentOf(rows, extentOf(rows, intent), full);

  const collect = (intent: Mask, found: readonly Concept[]): readonly Concept[] => {
    const grown: readonly Concept[] = [
      ...found,
      { extent: extentOf(rows, intent), intent },
    ];
    const next = nextIntent(close, intent, predicateCount);
    return next === undefined ? grown : collect(next, grown);
  };

  return collect(close(0), []);
};

// --- Hasse diagram ---------------------------------------------------------

/** A cover edge, as indices into the concept array. Lower concept first. */
export type CoverEdge = {
  readonly lower: number;
  readonly upper: number;
};

const strictlyWithin = (a: Mask, b: Mask): boolean => (a & b) === a && a !== b;

/**
 * Cover edges: `(A₁,B₁) < (A₂,B₂)` by extent containment with no concept
 * strictly between.
 */
export const coverEdges = (concepts: readonly Concept[]): readonly CoverEdge[] =>
  concepts.flatMap((low, lower) =>
    concepts.flatMap((high, upper) => {
      if (!strictlyWithin(low.extent, high.extent)) return [];
      const intervening = concepts.some(
        (mid) =>
          strictlyWithin(low.extent, mid.extent) &&
          strictlyWithin(mid.extent, high.extent),
      );
      return intervening ? [] : [{ lower, upper }];
    }),
  );

/** Rank = length of the longest chain from the bottom concept. */
export const ranksOf = (
  concepts: readonly Concept[],
  edges: readonly CoverEdge[],
): readonly number[] => {
  const lowerNeighbours = concepts.map((_, i) =>
    edges.filter((edge) => edge.upper === i).map((edge) => edge.lower),
  );
  const memo = new Map<number, number>();
  const rank = (i: number): number => {
    const cached = memo.get(i);
    if (cached !== undefined) return cached;
    const below = lowerNeighbours[i] ?? [];
    const value = below.length === 0 ? 0 : 1 + Math.max(...below.map(rank));
    memo.set(i, value);
    return value;
  };
  return concepts.map((_, i) => rank(i));
};

export type Lattice = {
  readonly bound: Bound;
  readonly concepts: readonly Concept[];
  readonly edges: readonly CoverEdge[];
  /** Parallel to `concepts`. */
  readonly ranks: readonly number[];
};

export const latticeOf = (
  context: Context,
  bound: Bound,
  resolution: Resolution = new Map(),
): Lattice => {
  if (context.subjects.length > MAX_TERMS || context.predicates.length > MAX_TERMS) {
    throw new Error(
      `Context exceeds ${MAX_TERMS} terms per side; bitmask extents cannot represent it.`,
    );
  }
  const concepts = conceptsOf(
    incidenceRows(context, bound, resolution),
    context.predicates.length,
  );
  const edges = coverEdges(concepts);
  return { bound, concepts, edges, ranks: ranksOf(concepts, edges) };
};

// --- the interval ----------------------------------------------------------

export type LatticeInterval = {
  readonly floor: Lattice;
  readonly ceiling: Lattice;
  /** Doubtful cells still open. `2^length` contexts are consistent with what is known. */
  readonly openCells: readonly CellKey[];
};

export const latticeInterval = (
  context: Context,
  resolution: Resolution = new Map(),
): LatticeInterval => ({
  floor: latticeOf(context, "floor", resolution),
  ceiling: latticeOf(context, "ceiling", resolution),
  openCells: openCells(context, resolution),
});

/** Size of the space of contexts consistent with what is currently known. */
export const consistentContextCount = (interval: LatticeInterval): number =>
  2 ** interval.openCells.length;

/** True once every doubtful cell is settled and the two bounds coincide. */
export const isResolved = (interval: LatticeInterval): boolean =>
  interval.openCells.length === 0;

// --- naming ----------------------------------------------------------------

/** The members of `terms` selected by `mask`, in index order. */
export const namesIn = <T,>(mask: Mask, terms: readonly T[]): readonly T[] =>
  terms.filter((_, i) => (mask & (1 << i)) !== 0);

/** `({C,F}, {E})` — the notation the spec's acceptance test is written in. */
export const formatConcept = (concept: Concept, context: Context): string => {
  const extent = namesIn(concept.extent, context.subjects).join(",");
  const intent = namesIn(concept.intent, context.predicates).join(",");
  return `({${extent}}, {${intent}})`;
};

/**
 * Concept indices grouped by rank, highest rank first, so the result reads top
 * to bottom like a drawn Hasse diagram. Within a rank, ordered by intent, which
 * is deterministic and keeps cover edges from crossing in these fixtures.
 */
export const conceptsByRank = (lattice: Lattice): readonly (readonly number[])[] => {
  const byRank = lattice.concepts.reduce((acc, _, i) => {
    const rank = lattice.ranks[i] ?? 0;
    return acc.set(rank, [...(acc.get(rank) ?? []), i]);
  }, new Map<number, readonly number[]>());

  return [...byRank.keys()]
    .sort((a, b) => b - a)
    .map((rank) =>
      [...(byRank.get(rank) ?? [])].sort(
        (a, b) =>
          (lattice.concepts[a]?.intent ?? 0) - (lattice.concepts[b]?.intent ?? 0),
      ),
    );
};

/** The whole lattice as text, one line per rank. Used by the acceptance test. */
export const formatLattice = (lattice: Lattice, context: Context): string =>
  conceptsByRank(lattice)
    .map((rank) =>
      rank
        .map((i) => {
          const concept = lattice.concepts[i];
          return concept === undefined ? "" : formatConcept(concept, context);
        })
        .join("   "),
    )
    .join("\n");
