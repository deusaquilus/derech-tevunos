/**
 * The acceptance test from §5.2 of the spec:
 *
 *   "After applying the Berachos 53a defeater, the corresponding negative cell
 *    must be removed and any lattice edge depending solely on it must disappear.
 *    If your closure is a monotone cache, this test fails."
 *
 * The lattices below were worked out by hand before the engine existed. If the
 * engine disagrees with them, the engine is wrong.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatLattice } from "../lattice/fca.ts";
import {
  analyse,
  contextOf,
  diffOf,
  entailmentsOf,
  factKey,
  isFragile,
  statementsAt,
  type Entailment,
  type Reading,
  type Source,
} from "./closure.ts";
import { blessing, deer } from "./fixtures.ts";

const readings: readonly Reading[] = ["literal", "read-in"];

const factKeys = (entailments: readonly Entailment[]): readonly string[] =>
  entailments.flatMap((entailment) =>
    entailment.fact === undefined ? [] : [factKey(entailment.fact)],
  );

const lattice = (source: Source, stage: number, reading: Reading): string => {
  const analysis = analyse(source, stage, reading);
  return formatLattice(analysis.lattice, analysis.context);
};

describe("Shabbos 106a / Betzah 24a — the דיוק is constructed", () => {
  const source = deer.source;

  it("denies the predicate of the sibling the speaker passed over", () => {
    const readIn = entailmentsOf(source, 0, "read-in").filter(isFragile);
    assert.deepEqual(factKeys(readIn), ["preserve|liable|deny"]);
  });

  it("does not touch a sibling the source has already spoken about", () => {
    // The bird-in-a-tower clause is also narrowed, and also points away from the
    // preserve, but it cannot deny of the house what the house clause affirms.
    const keys = factKeys(entailmentsOf(source, 0, "read-in"));
    assert.equal(keys.includes("house|liable|deny"), false);
    assert.equal(keys.includes("tower|liable|deny"), false);
  });

  it("keeps I⁺ and I⁻ disjoint", () => {
    for (const reading of readings) {
      const keys = factKeys(entailmentsOf(source, 0, reading));
      const affirmed = keys.filter((key) => key.endsWith("|affirm"));
      const contradicted = affirmed.filter((key) =>
        keys.includes(key.replace(/\|affirm$/, "|deny")),
      );
      assert.deepEqual(contradicted, [], reading);
    }
  });

  it("literally leaves the game preserve out of the lattice altogether", () => {
    assert.equal(
      lattice(source, 0, "literal"),
      [
        "({house,tower,preserve}, {})",
        "({house,tower}, {liable+})",
        "({}, {liable+,liable−})",
      ].join("\n"),
    );
  });

  it("reading it in adds a group the text never created", () => {
    assert.equal(
      lattice(source, 0, "read-in"),
      [
        "({house,tower,preserve}, {})",
        "({house,tower}, {liable+})   ({preserve}, {liable−})",
        "({}, {liable+,liable−})",
      ].join("\n"),
    );
  });

  it("counts one fragile fact and the two edges hanging off it", () => {
    const diff = diffOf(analyse(source, 0, "literal"), analyse(source, 0, "read-in"));
    assert.equal(diff.fragileFacts.length, 1);
    assert.deepEqual([...diff.fragileExtents], [0b100]); // {preserve}
    assert.deepEqual([...diff.lostExtents], []);
    assert.equal(diff.fragileEdgeCount, 2);
  });
});

describe("Berachos 53a — the דיוק is defeated", () => {
  const source = blessing.source;
  const disputed = "halfAndHalf|bless|deny";

  it("puts the even split in with the mostly-non-Jewish crowd", () => {
    assert.deepEqual(factKeys(entailmentsOf(source, 0, "read-in")).toSorted(), [
      "halfAndHalf|bless|deny",
      "mostlyGentile|bless|deny",
      "mostlyJewish|bless|affirm",
    ]);
    assert.equal(
      lattice(source, 0, "read-in"),
      [
        "({mostlyJewish,halfAndHalf,mostlyGentile}, {})",
        "({mostlyJewish}, {bless+})   ({halfAndHalf,mostlyGentile}, {bless−})",
        "({}, {bless+,bless−})",
      ].join("\n"),
    );
  });

  it("draws no דיוק from the denial in the previous clause", () => {
    // "Most are not Jewish → no blessing" is a denial. Ramchal's rule is about a
    // predicate being *applied* to a narrowed subject, so denials generate none —
    // which is also what keeps the two clauses from contradicting each other.
    const implied = entailmentsOf(source, 0, "read-in").filter(isFragile);
    assert.deepEqual(factKeys(implied), [disputed]);
  });

  it("ACCEPTANCE: the defeater removes the negative cell", () => {
    assert.equal(factKeys(entailmentsOf(source, 0, "read-in")).includes(disputed), true);
    assert.equal(factKeys(entailmentsOf(source, 1, "read-in")).includes(disputed), false);
  });

  it("ACCEPTANCE: the edges that depended on it disappear with it", () => {
    const before = diffOf(analyse(source, 0, "literal"), analyse(source, 0, "read-in"));
    const after = diffOf(analyse(source, 1, "literal"), analyse(source, 1, "read-in"));

    assert.equal(before.fragileEdgeCount, 2);
    assert.deepEqual([...before.fragileExtents], [0b110]); // {halfAndHalf, mostlyGentile}

    assert.equal(after.fragileEdgeCount, 0);
    assert.deepEqual([...after.fragileExtents], []);
    assert.deepEqual([...after.fragileFacts], []);
  });

  it("ACCEPTANCE: the closure shrinks, so it is not a monotone cache", () => {
    const before = new Set(factKeys(entailmentsOf(source, 0, "read-in")));
    const after = new Set(factKeys(entailmentsOf(source, 1, "read-in")));
    assert.ok(after.size < before.size);
    assert.ok([...after].every((key) => before.has(key)));
  });

  it("leaves the even split unanswered rather than settled the other way", () => {
    // Trap 3: defeating an inference does not establish its contrary.
    assert.equal(
      lattice(source, 1, "read-in"),
      [
        "({mostlyJewish,halfAndHalf,mostlyGentile}, {})",
        "({mostlyJewish}, {bless+})   ({mostlyGentile}, {bless−})",
        "({}, {bless+,bless−})",
      ].join("\n"),
    );
  });

  it("the later ruling moves it to the opposite group", () => {
    assert.equal(
      lattice(source, 2, "read-in"),
      [
        "({mostlyJewish,halfAndHalf,mostlyGentile}, {})",
        "({mostlyJewish,halfAndHalf}, {bless+})   ({mostlyGentile}, {bless−})",
        "({}, {bless+,bless−})",
      ].join("\n"),
    );
    assert.deepEqual([...diffOf(
      analyse(source, 2, "literal"),
      analyse(source, 2, "read-in"),
    ).fragileFacts], []);
  });

  it("does not regenerate the default once the case is spoken about", () => {
    assert.equal(factKeys(entailmentsOf(source, 2, "read-in")).includes(disputed), false);
  });
});

describe("Ch5 pp72-74 — the necessary inferences", () => {
  it("gives a universal affirmative two and a universal negative one", () => {
    const rules = (id: string): readonly string[] =>
      entailmentsOf(blessing.source, 0, "literal")
        .filter(
          (entailment) =>
            entailment.ground.kind === "necessary" && entailment.ground.from.id === id,
        )
        .map((entailment) =>
          entailment.ground.kind === "necessary" ? entailment.ground.rule : "",
        );

    assert.deepEqual(rules("seifa"), ["contrapositive", "limitedConverse"]);
    assert.deepEqual(rules("reisha"), ["completeConverse"]);
  });

  it("adds no cells, because converses are about classes that are not rows here", () => {
    const necessary = entailmentsOf(deer.source, 0, "literal").filter(
      (entailment) => entailment.ground.kind === "necessary",
    );
    assert.ok(necessary.length > 0);
    assert.deepEqual(factKeys(necessary), []);
  });
});

describe("the scaled context", () => {
  it("has one column per question and polarity, and no undecided cell", () => {
    const context = contextOf(deer.source, entailmentsOf(deer.source, 0, "read-in"));
    assert.deepEqual(context.predicates, ["liable+", "liable−"]);
    assert.equal(context.cells.size, deer.source.cases.length * 2);
    assert.ok([...context.cells.values()].every((value) => value !== "doubt"));
  });
});

describe("stages", () => {
  it("bring their statements into force in order", () => {
    const ids = (stage: number) =>
      statementsAt(blessing.source, stage).map((statement) => statement.id);
    assert.deepEqual(ids(0), ["reisha", "seifa"]);
    assert.deepEqual(ids(1), ["reisha", "seifa"]);
    assert.deepEqual(ids(2), ["reisha", "seifa", "half-blesses"]);
  });
});
