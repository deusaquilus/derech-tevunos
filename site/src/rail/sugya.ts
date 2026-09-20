/**
 * A sugya as a sequence of labelled sentences plus the move each one makes.
 * Depth, standing and status are all derived; nothing here is stored twice.
 */

import { annotationErrors, type Annotation, type Party } from "./anatomy.ts";
import type { Spans } from "./spans.ts";
import { effectOf, type Effect, type Move } from "./taxonomy.ts";

/**
 * Ch8 pp112-140. The first four enter the debate already carrying authority;
 * `asserted` and `derivation` have to earn it inside the sugya.
 */
export type Provenance = "sense" | "axiom" | "endoxa" | "tradition" | "derivation" | "asserted";

/** Every provenance, in the book's order: the four that enter with authority, then the two that must earn it. */
export const PROVENANCES: readonly Provenance[] = ["sense", "axiom", "endoxa", "tradition", "derivation", "asserted"];

const SELF_AUTHORISING: readonly Provenance[] = ["sense", "axiom", "endoxa", "tradition"];

export type Unit = {
  readonly id: string;
  readonly speaker?: string;
  readonly en: string;
  readonly he?: string;
  /**
   * A few words naming this move, for navigation in a passage too long to skim.
   * Editorial: it is a caption, not a label from the taxonomy.
   */
  readonly short?: string;
  readonly move: Move;
  /** The earlier unit this move acts upon. Absent only for opening statements. */
  readonly target?: string;
  /** Aramaic phrase that licensed the label, when the text supplies one. */
  readonly marker?: string;
  readonly provenance?: Provenance;
  /** True when Ramchal himself assigns this label; false when we inferred it. */
  readonly attested?: boolean;
  readonly note?: string;
  /**
   * Chapters 1–7, a second layer over `move`: what the sentence is made of,
   * and how it stands to the sentence it acts on. Row-level kinds describe the
   * sentence alone; edge-level kinds describe its move on `target`, and need
   * one. Nothing here enters the analysis. See `anatomy.ts`.
   */
  readonly anatomy?: readonly Annotation[];
  /**
   * Which words of `he` and of `en` play which role: subject, predicate, the
   * two clauses of a hypothetical, the premises and conclusion of a deduction,
   * the separate commitments a challenge can land on. Ranges into the text,
   * never copies of it. Nothing here enters the analysis. See `spans.ts`.
   */
  readonly spans?: Spans;
  /**
   * Room for what the format does not yet name. Carried through untouched and
   * read by nothing; see `format.ts` for when a key graduates out of here.
   */
  readonly ext?: Readonly<Record<string, unknown>>;
};

/**
 * Which shelf of the gallery a passage sits on. `ramchal` is a passage the
 * book discusses, or one labelled from its markers; `research` is a passage
 * brought in for the nested-rail study, labelled from stock phrases only.
 */
export type Collection = "ramchal" | "research";

export const COLLECTIONS: readonly Collection[] = ["ramchal", "research"];

export type Sugya = {
  readonly id: string;
  readonly title: string;
  readonly tractate: string;
  readonly folio: string;
  /** Where Ramchal discusses the passage. */
  readonly discussedAt: string;
  readonly units: readonly Unit[];
  /**
   * Ch. 1: what kind of sugya this is — several rabbis in dispute, one person
   * arguing both sides, or the Talmud's own voice. A judgment about the
   * passage as a whole, so declared rather than derived from the speakers.
   */
  readonly party?: Party;
  /** Gallery shelf. Absent, the passage is shown under its own heading. */
  readonly collection?: Collection;
  /**
   * Why the passage is here and how it was labelled — the editor's preface,
   * one paragraph per entry. Documentation for whoever opens the file: the
   * passage's own page does not print it, the loader page does.
   */
  readonly about?: readonly string[];
  /**
   * Where to look on the page, replacing the header's standard copy. Plain
   * text with `**bold**` and `*italic*`; see `markup.ts`.
   */
  readonly hint?: string;
  /** As on a unit: unnamed extra data, carried through and read by nothing. */
  readonly ext?: Readonly<Record<string, unknown>>;
};

/**
 * Whether a move still exerts its force. `discharged` and `defeated` are both
 * spent; the difference is that a discharged move was answered, not refuted.
 */
export type Standing = "live" | "weakened" | "discharged" | "defeated";

const exertsForce = (standing: Standing): boolean =>
  standing === "live" || standing === "weakened";

/** Ch8 p112. Doubt is the resting state, not a fallback. */
export type Status = "accepted" | "doubt" | "rejected";

export type Analysis = {
  readonly depth: ReadonlyMap<string, number>;
  readonly standing: ReadonlyMap<string, Standing>;
  readonly status: ReadonlyMap<string, Status>;
  /** Units that some later unit acts upon. */
  readonly contested: ReadonlySet<string>;
  /**
   * How many moves are still exerting force on each unit. In a short sugya this
   * is always 0 or 1 and says nothing; over thirteen successive challenges it
   * is the score, and it moves where the verdict does not.
   */
  readonly pressure: ReadonlyMap<string, number>;
};

const indexById = (units: readonly Unit[]): ReadonlyMap<string, number> =>
  new Map(units.map((u, i) => [u.id, i]));

/**
 * A move may only act on something already said. Enforcing this makes the
 * reverse pass below well-founded and rules out cycles by construction.
 */
const validate = (sugya: Sugya): void => {
  const order = indexById(sugya.units);
  if (order.size !== sugya.units.length) {
    throw new Error(`${sugya.id}: duplicate unit id`);
  }
  sugya.units.forEach((unit, i) => {
    const misplaced = annotationErrors(unit);
    if (misplaced.length > 0) throw new Error(`${sugya.id}: ${misplaced.join("; ")}`);
    if (unit.target === undefined) return;
    const targetIndex = order.get(unit.target);
    if (targetIndex === undefined) {
      throw new Error(`${sugya.id}: unit "${unit.id}" targets unknown unit "${unit.target}"`);
    }
    if (targetIndex >= i) {
      throw new Error(
        `${sugya.id}: unit "${unit.id}" targets "${unit.target}", which does not precede it`,
      );
    }
  });
};

const computeDepth = (units: readonly Unit[]): ReadonlyMap<string, number> => {
  const depth = new Map<string, number>();
  for (const unit of units) {
    const parent = unit.target === undefined ? undefined : depth.get(unit.target);
    depth.set(unit.id, parent === undefined ? 0 : parent + 1);
  }
  return depth;
};

const baseStatus = (unit: Unit): Status =>
  SELF_AUTHORISING.includes(unit.provenance ?? "asserted") ? "accepted" : "doubt";

/** One landed move, as seen by the thing it landed on. */
type Incoming = { readonly effect: Effect; readonly standing: Standing };

/**
 * Incoming moves are resolved by precedence, not in sequence.
 *
 * Folding them one at a time makes the outcome depend on the order they are
 * written in: `reject` then `unsettle` leaves a claim in doubt, while
 * `unsettle` then `reject` leaves it rejected. Nothing in ch. 9 licenses that,
 * and it only shows up once a claim has several moves landing on it — which is
 * the normal case in a long sugya and does not happen at all in a short one.
 * Deciding by precedence over the whole set removes the dependence.
 */
const acting = (incoming: readonly Incoming[]): readonly Incoming[] =>
  incoming.filter((i) => exertsForce(i.standing));

const hasFull = (incoming: readonly Incoming[], effect: Effect): boolean =>
  incoming.some((i) => i.effect === effect && i.standing === "live");

/**
 * Ch9 pp178-186. An attack reduces what its target can still do:
 * `סתירה` destroys it outright, everything else only undermines its force.
 * A move that is spent delivers nothing, so it never enters the decision.
 */
const resolveStanding = (incoming: readonly Incoming[]): Standing => {
  const live = acting(incoming);
  if (hasFull(live, "reject")) return "defeated";
  if (hasFull(live, "discharge")) return "discharged";
  const undermines = (effect: Effect): boolean =>
    effect === "reject" || effect === "discharge" || effect === "unsettle";
  return live.some((i) => undermines(i.effect)) ? "weakened" : "live";
};

/**
 * Ch8 p142, Ch9 p178. A move delivers its full effect only while it stands;
 * a merely weakened move can push its target to doubt but no further. This is
 * what keeps a rebutted proof from proving the negation.
 */
const resolveStatus = (base: Status, incoming: readonly Incoming[]): Status => {
  const live = acting(incoming);
  if (hasFull(live, "reject")) return "rejected";
  const unsettles = ({ effect, standing }: Incoming): boolean =>
    effect === "unsettle" ||
    (standing === "weakened" && (effect === "reject" || effect === "raise"));
  if (live.some(unsettles)) return "doubt";
  if (hasFull(live, "raise")) return "accepted";
  return base;
};

export const analyze = (sugya: Sugya): Analysis => {
  validate(sugya);

  const { units } = sugya;
  const incoming = new Map<string, Unit[]>(units.map((u) => [u.id, []]));
  for (const unit of units) {
    if (unit.target !== undefined) incoming.get(unit.target)?.push(unit);
  }

  const standing = new Map<string, Standing>();
  const status = new Map<string, Status>();

  // Reverse order: every unit acting on `unit` sits later, so it is already resolved.
  for (let i = units.length - 1; i >= 0; i -= 1) {
    const unit = units[i]!;
    const landed: readonly Incoming[] = (incoming.get(unit.id) ?? []).map((a) => ({
      effect: effectOf(a.move),
      standing: standing.get(a.id) ?? "live",
    }));

    standing.set(unit.id, resolveStanding(landed));
    status.set(unit.id, resolveStatus(baseStatus(unit), landed));
  }

  const contested = new Set(
    units.filter((u) => (incoming.get(u.id) ?? []).length > 0).map((u) => u.id),
  );

  const pressure = new Map(
    units.map((u) => [
      u.id,
      (incoming.get(u.id) ?? []).filter(
        (a) =>
          effectOf(a.move) !== "open" &&
          effectOf(a.move) !== "raise" &&
          exertsForce(standing.get(a.id) ?? "live"),
      ).length,
    ]),
  );

  return { depth: computeDepth(units), standing, status, contested, pressure };
};

export const maxDepth = (analysis: Analysis): number =>
  Math.max(0, ...analysis.depth.values());

/**
 * The sugya as it stood after its first `count` sentences.
 *
 * Every move targets something earlier, so any prefix is itself a well-formed
 * sugya. Analysing prefixes in turn is how the debate's own progress is
 * recovered: a claim can be accepted at one step and back in doubt at the next.
 */
export const prefixOf = (sugya: Sugya, count: number): Sugya => ({
  ...sugya,
  units: sugya.units.slice(0, Math.max(0, Math.min(count, sugya.units.length))),
});

/**
 * A stretch of consecutive sentences all hanging off the same challenge to the
 * main dispute — what a reader would call "the argument from scattered
 * produce", or "the objection from the dew".
 *
 * Derived, not declared: a unit's *branch* is its ancestor at depth 1, and a
 * movement is a maximal run of adjacent units sharing one. Nothing here comes
 * from ch. 9. Ramchal has no unit larger than a sentence, so this is navigation
 * furniture and is kept out of the taxonomy on purpose.
 */
export type Movement = {
  /** What the movement as a whole is aimed at. Absent for an opening claim. */
  readonly anchor: string | undefined;
  /** Index of the first unit, 0-based. */
  readonly start: number;
  readonly units: readonly Unit[];
  /** The sentence that opens the movement, which is what names it. */
  readonly opening: Unit;
};

/**
 * A sentence stays in the movement under way if it hangs off something already
 * inside it. Anything else opens a new one — including a move that lands
 * straight back on an opening claim, which is exactly what a fresh `תא שמע`
 * does after the previous challenge has been put to rest.
 */
export const movementsOf = (sugya: Sugya): readonly Movement[] => {
  const roots = new Set(
    sugya.units.filter((u) => u.target === undefined).map((u) => u.id),
  );
  return sugya.units.reduce<Movement[]>((acc, unit, i) => {
    const open = acc[acc.length - 1];
    const continues =
      open !== undefined &&
      unit.target !== undefined &&
      !roots.has(unit.target) &&
      open.units.some((u) => u.id === unit.target);

    if (open !== undefined && continues) {
      acc[acc.length - 1] = { ...open, units: [...open.units, unit] };
      return acc;
    }
    acc.push({ anchor: unit.target, start: i, units: [unit], opening: unit });
    return acc;
  }, []);
};

/**
 * How a label was arrived at. `attested` is Ramchal's own; `marked` rests on a
 * stock Aramaic phrase from `markers.ts`; `inferred` is ours alone.
 *
 * Ramchal labels sentences only in the handful of passages he quotes, so for
 * any sugya he does not discuss, `attested` is unavailable and the Talmud's own
 * signposting is the only check left.
 */
export type LabelBasis = "attested" | "marked" | "inferred";

export const labelBasis = (unit: Unit): LabelBasis =>
  unit.attested === true ? "attested" : unit.marker !== undefined ? "marked" : "inferred";
