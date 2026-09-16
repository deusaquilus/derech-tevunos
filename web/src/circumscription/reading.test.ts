/**
 * The plain-language layer is derived, not transcribed, so it is testable. These
 * are the sentences a reader actually sees.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { entailmentsOf } from "./closure.ts";
import { blessing, deer } from "./fixtures.ts";
import {
  groupsOf,
  groupsOnlyHere,
  ledgerOf,
  standingOf,
  stepsOf,
  tallyOf,
} from "./reading.ts";

describe("the ledger", () => {
  const rows = ledgerOf(deer, entailmentsOf(deer.source, 0, "read-in"));

  it("states what is said, what follows, and what is read in — in that order", () => {
    assert.deepEqual(
      rows.map((row) => row.kind),
      ["stated", "stated", "necessary", "necessary", "necessary", "necessary", "implied"],
    );
  });

  it("derives the Ch5 inferences as English sentences", () => {
    const sentences = rows.map((row) => row.sentence);
    assert.ok(sentences.includes("Trapping a deer into a house — forbidden."));
    assert.ok(
      sentences.includes("Anything that is permitted is not trapping a deer into a house."),
    );
    assert.ok(
      sentences.includes(
        "At least one thing that is forbidden is trapping a deer into a house.",
      ),
    );
  });

  it("names the game preserve as the one retractable line, and says why", () => {
    const fragile = rows.filter((row) => row.kind === "implied");
    assert.equal(fragile.length, 1);
    assert.equal(
      fragile.at(0)?.sentence,
      "Trapping a deer into a game preserve — permitted.",
    );
    assert.match(fragile.at(0)?.because ?? "", /only because Rabbi Yehudah said “a deer in a house”/);
    assert.deepEqual(tallyOf(rows), { stated: 2, necessary: 4, fragile: 1 });
  });

  it("carries the right Ch5 rule name for a universal negative", () => {
    const reisha = ledgerOf(blessing, entailmentsOf(blessing.source, 0, "literal")).filter(
      (row) => row.kind === "necessary",
    );
    assert.deepEqual(reisha.map((row) => row.rule).toSorted(), [
      "Complete converse · חילוף כולל",
      "Contrapositive · חילוף הפכי כולל",
      "Limited converse · חילוף קצתי",
    ]);
  });
});

describe("groups", () => {
  const at = (stage: number, reading: "literal" | "read-in") =>
    groupsOf(blessing, entailmentsOf(blessing.source, stage, reading));

  it("sit the even split with the mostly-non-Jewish crowd once it is read in", () => {
    assert.deepEqual(
      at(0, "read-in").map((group) => [group.title, group.members.map((m) => m.term.id)]),
      [
        ["Blessing is said", ["mostlyJewish"]],
        ["Blessing is not said", ["halfAndHalf", "mostlyGentile"]],
      ],
    );
  });

  it("mark the membership that rests only on the reading", () => {
    const notBlessed = at(0, "read-in").at(1);
    assert.deepEqual(
      notBlessed?.members.map((member) => [member.term.id, member.fragile]),
      [
        ["halfAndHalf", true],
        ["mostlyGentile", false],
      ],
    );
  });

  it("leave it on its own with no answer once the reading is defeated", () => {
    assert.deepEqual(
      at(1, "read-in").map((group) => [group.title, group.members.map((m) => m.term.id)]),
      [
        ["Blessing is said", ["mostlyJewish"]],
        ["Blessing is not said", ["mostlyGentile"]],
        ["The source gives no answer", ["halfAndHalf"]],
      ],
    );
  });

  it("move it to the opposite group once the law is stated", () => {
    assert.deepEqual(
      at(2, "read-in").map((group) => group.members.map((m) => m.term.id)),
      [["mostlyJewish", "halfAndHalf"], ["mostlyGentile"]],
    );
  });

  it("report which grouping the reading is responsible for", () => {
    const only = groupsOnlyHere(at(0, "read-in"), at(0, "literal"));
    assert.deepEqual(
      [...only].map(
        (key) => at(0, "read-in").find((group) => group.key === key)?.title,
      ),
      ["Blessing is not said"],
    );
    assert.equal(groupsOnlyHere(at(1, "read-in"), at(1, "literal")).size, 0);
  });

  it("catch a change that leaves a case where it was and only answers it", () => {
    // The game preserve is on its own under either reading. What the reading buys
    // is the answer, so comparing by membership alone would report no change.
    const readIn = groupsOf(deer, entailmentsOf(deer.source, 0, "read-in"));
    const literal = groupsOf(deer, entailmentsOf(deer.source, 0, "literal"));
    assert.deepEqual(
      literal.map((group) => [group.title, group.members.map((m) => m.term.id)]),
      [
        ["Forbidden", ["house", "tower"]],
        ["The source gives no answer", ["preserve"]],
      ],
    );
    assert.deepEqual(
      [...groupsOnlyHere(readIn, literal)].map(
        (key) => readIn.find((group) => group.key === key)?.title,
      ),
      ["Permitted"],
    );
  });
});

describe("standings", () => {
  const standing = (stage: number, subject: string) =>
    standingOf(entailmentsOf(blessing.source, stage, "read-in"), subject, "bless");

  it("distinguish said, read in, and silent", () => {
    assert.equal(standing(0, "mostlyJewish").kind, "stated");
    assert.equal(standing(0, "halfAndHalf").kind, "read-in");
    assert.equal(standing(1, "halfAndHalf").kind, "silent");
    assert.equal(standing(2, "halfAndHalf").kind, "stated");
  });
});

describe("steps", () => {
  it("are the opening state plus one per move", () => {
    assert.deepEqual(stepsOf(deer).map((step) => step.label), ["As the wording reads"]);
    assert.deepEqual(stepsOf(blessing).map((step) => step.label), [
      "As the wording reads",
      "The Talmud explains the wording",
      "The law as it stands",
    ]);
  });
});
