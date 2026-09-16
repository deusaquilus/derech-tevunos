/**
 * The acceptance test from §5.1 of the spec. Those values are exact: if this
 * fails, the visualization is lying regardless of how it looks.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  cellKey,
  consistentContextCount,
  extentOf,
  formatLattice,
  incidenceRows,
  intentOf,
  isResolved,
  latticeInterval,
  latticeOf,
  type Context,
  type Resolution,
} from "./fca.ts";
import { shabbos5b } from "./fixtures.ts";

const context = shabbos5b.context;
const disputed = cellKey("C", "L");

describe("Shabbos 5b — acceptance test", () => {
  const interval = latticeInterval(context);

  it("floor is a four-concept diamond", () => {
    assert.equal(interval.floor.concepts.length, 4);
    assert.equal(
      formatLattice(interval.floor, context),
      ["({C,F,D}, {})", "({C,F}, {E})   ({F,D}, {L})", "({F}, {E,L})"].join("\n"),
    );
  });

  it("ceiling is a two-concept chain", () => {
    assert.equal(interval.ceiling.concepts.length, 2);
    assert.equal(
      formatLattice(interval.ceiling, context),
      ["({C,F,D}, {L})", "({C,F}, {E,L})"].join("\n"),
    );
  });

  it("one doubtful cell leaves two consistent contexts", () => {
    assert.deepEqual(interval.openCells, [disputed]);
    assert.equal(consistentContextCount(interval), 2);
    assert.equal(isResolved(interval), false);
  });
});

describe("trap 9 — concept count is not monotone in I", () => {
  const interval = latticeInterval(context);

  it("the ceiling is the smaller lattice", () => {
    assert.ok(interval.ceiling.concepts.length < interval.floor.concepts.length);
  });

  it("resolution deletes the concept ({C,F}, {E})", () => {
    const hasGapNotLiable = (bound: "floor" | "ceiling"): boolean =>
      latticeOf(context, bound).concepts.some(
        (concept) => concept.extent === 0b011 && concept.intent === 0b01,
      );
    assert.equal(hasGapNotLiable("floor"), true);
    assert.equal(hasGapNotLiable("ceiling"), false);
  });
});

describe("pinning a doubtful cell", () => {
  const pinnedOut: Resolution = new Map([[disputed, "out"]]);
  const pinnedIn: Resolution = new Map([[disputed, "in"]]);

  it("collapses the interval, so both bounds agree", () => {
    const resolved = latticeInterval(context, pinnedIn);
    assert.equal(
      formatLattice(resolved.floor, context),
      formatLattice(resolved.ceiling, context),
    );
    assert.equal(isResolved(resolved), true);
    assert.equal(consistentContextCount(resolved), 1);
  });

  it("reproduces the floor when pinned out and the ceiling when pinned in", () => {
    const unresolved = latticeInterval(context);
    assert.equal(
      formatLattice(latticeOf(context, "ceiling", pinnedOut), context),
      formatLattice(unresolved.floor, context),
    );
    assert.equal(
      formatLattice(latticeOf(context, "floor", pinnedIn), context),
      formatLattice(unresolved.ceiling, context),
    );
  });
});

describe("degenerate contexts", () => {
  const bare: Context = {
    fiber: { index: { kind: "unindexed" }, modality: undefined },
    subjects: ["a", "b"],
    predicates: ["x", "y"],
    cells: new Map(),
  };

  it("empty context has two concepts, full context has one", () => {
    assert.equal(latticeOf(bare, "floor").concepts.length, 2);
    assert.equal(latticeOf(bare, "ceiling").concepts.length, 1);
  });
});

describe("every concept is a Galois fixed point", () => {
  const full = (1 << context.predicates.length) - 1;

  for (const bound of ["floor", "ceiling"] as const) {
    it(bound, () => {
      const rows = incidenceRows(context, bound, new Map());
      for (const { extent, intent } of latticeOf(context, bound).concepts) {
        assert.equal(extentOf(rows, intent), extent, "B' = A");
        assert.equal(intentOf(rows, extent, full), intent, "A' = B");
      }
    });
  }
});
