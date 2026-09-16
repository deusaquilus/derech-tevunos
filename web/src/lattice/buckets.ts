/**
 * Turns the lattice into display-ready "buckets", so the components stay dumb.
 *
 * A bucket is a formal concept read in plain language: a set of cases that answer
 * every question identically, named by the answers they share.
 */

import { namesIn, type Concept, type Lattice } from "./fca.ts";
import type { Fixture } from "./fixtures.ts";

export type Bucket = {
  /** Stable across renders; not stable across the two bounds, by design. */
  readonly key: string;
  readonly title: string;
  readonly memberIds: readonly string[];
  /** Membership as a bitmask, for comparing bucket sets between the two bounds. */
  readonly members: number;
};

const bitCount = (mask: number): number => {
  const step = (rest: number, total: number): number =>
    rest === 0 ? total : step(rest >>> 1, total + (rest & 1));
  return step(mask, 0);
};

const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

const titleOf = (concept: Concept, fixture: Fixture): string => {
  const shared = namesIn(concept.intent, fixture.predicates).map((term) => term.short);
  return shared.length === 0 ? "Every case" : capitalize(shared.join(" and "));
};

/** Broadest bucket first, so the list reads from most general to most specific. */
export const bucketsOf = (lattice: Lattice, fixture: Fixture): readonly Bucket[] =>
  lattice.concepts
    .map(
      (concept): Bucket => ({
        key: `${concept.extent}:${concept.intent}`,
        title: titleOf(concept, fixture),
        memberIds: namesIn(concept.extent, fixture.subjects).map((term) => term.id),
        members: concept.extent,
      }),
    )
    .toSorted(
      (a, b) => bitCount(b.members) - bitCount(a.members) || a.key.localeCompare(b.key),
    );

/**
 * Buckets whose membership has no counterpart under the other bound.
 *
 * Compared by membership rather than by concept, because the two lattices have
 * different concept sets and no canonical map between them (§5.1, failure modes).
 */
export const membershipsOnlyHere = (
  here: readonly Bucket[],
  there: readonly Bucket[],
): ReadonlySet<number> => {
  const elsewhere = new Set(there.map((bucket) => bucket.members));
  return new Set(
    here.map((bucket) => bucket.members).filter((members) => !elsewhere.has(members)),
  );
};
