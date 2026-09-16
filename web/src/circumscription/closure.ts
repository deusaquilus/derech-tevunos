/**
 * Circumscription: the gap between what a source states and what its choice of
 * words lets you read into it.
 *
 * Backs visualization 5.2 of `derech-tevunos-visualization-spec.md`. Two closures
 * are taken over the same statements:
 *
 * - the **literal** closure, `I_mono` — what is stated, plus the Ch5 necessary
 *   inferences, which are exactly the conclusions you cannot deny while still
 *   accepting the statement (Ch5 p72);
 * - the **read-in** closure, `I_circ` — the same, plus the `דיוק` negations of
 *   Ch5 p68: where a speaker narrowed his subject, the predicate is denied of
 *   the siblings he passed over.
 *
 * Only the second half is defeasible, and Ch5 pp70-72 defeats one, so the
 * closure has to be able to shrink (trap 12). It is recomputed from the
 * statements at every stage rather than accumulated.
 *
 * Negative information is real here, so a single three-valued matrix will not
 * serve (§5.2 step 1). Facts are signed, and the context handed to `fca.ts`
 * carries one column per polarity.
 */

import type { Cite } from "../source/cite.ts";
import {
  cellKey,
  latticeOf,
  type CellValue,
  type Context,
  type Fiber,
  type Lattice,
} from "../lattice/fca.ts";

// --- signed facts ----------------------------------------------------------

/** `נשוא` affirmed of `נושא`, or denied of it. Denial is data, not absence. */
export type Polarity = "affirm" | "deny";

export type Fact = {
  readonly subject: string;
  readonly predicate: string;
  readonly polarity: Polarity;
};

export type FactKey = string;

export const factKey = (fact: Fact): FactKey =>
  `${fact.subject}|${fact.predicate}|${fact.polarity}`;

export const flip = (polarity: Polarity): Polarity =>
  polarity === "affirm" ? "deny" : "affirm";

// --- statements ------------------------------------------------------------

/**
 * Ch3 p24 splits `כוללים` from `קצתיים`. Both fixtures here are universal, since
 * `סתמי` defaults to universal (trap 13), but the Ch5 inference table is keyed on
 * quantity so both branches exist.
 */
export type Quantity = "universal" | "partial";

/** A passage of the source, quoted rather than paraphrased. */
export type Passage = {
  readonly english: string;
  readonly hebrew: string;
  readonly speaker: string;
  readonly cite: Cite;
  /** Where the source gestures at a passage rather than quoting it. */
  readonly note?: string;
};

export type Statement = {
  readonly id: string;
  readonly subject: string;
  readonly predicate: string;
  readonly polarity: Polarity;
  readonly quantity: Quantity;
  /**
   * The words that narrow the subject, quoted from the passage. Their presence is
   * the entire warrant for a `דיוק`: had the speaker meant the whole parent class,
   * he would not have said them.
   */
  readonly narrows: string;
  readonly passage: Passage;
};

/**
 * A later move in the sugya. `defeats` kills read-in facts; `states` adds new
 * explicit ones. Kept separate because they are different acts: killing an
 * inference is not asserting its contrary (trap 3).
 */
export type Move = {
  readonly id: string;
  readonly label: string;
  readonly headline: string;
  readonly passage: Passage;
  readonly defeats: readonly FactKey[];
  readonly states: readonly Statement[];
};

// --- the subject order -----------------------------------------------------

/**
 * A case, and the class it sits in. Siblings share a parent, and the parent is
 * the scope of a `דיוק` — not the whole subject order (trap 11).
 */
export type SubjectNode = {
  readonly id: string;
  readonly parent: string;
};

export type Source = {
  readonly fiber: Fiber;
  readonly cases: readonly SubjectNode[];
  readonly questions: readonly string[];
  readonly statements: readonly Statement[];
  /** Applied in order. Stage `n` has the first `n` of them in force. */
  readonly moves: readonly Move[];
};

// --- Ch5's necessary inferences --------------------------------------------

/**
 * Ch5 pp72-74, verbatim. These are the inferences that are `מוכרח`: inseparable
 * from the statement, so no reason can be found to keep the statement and drop
 * them.
 */
export type NecessaryRule =
  | "contrapositive" // חילוף הפכי כולל
  | "limitedConverse" // חילוף קצתי
  | "completeConverse" // חילוף כולל
  | "absoluteOpposite" // הפך
  | "limitedContrapositive"; // חלוף קצתי הפכי

const PARTIAL_RULES: readonly NecessaryRule[] = [
  "absoluteOpposite",
  "limitedContrapositive",
  "limitedConverse",
];

const necessaryRules = (statement: Statement): readonly NecessaryRule[] => {
  if (statement.quantity === "partial") return PARTIAL_RULES;
  return statement.polarity === "affirm"
    ? ["contrapositive", "limitedConverse"]
    : ["completeConverse"];
};

// --- entailments -----------------------------------------------------------

/** Why a conclusion is in the closure. Only `implied` can be taken back. */
export type Ground =
  | { readonly kind: "stated"; readonly statement: Statement }
  | {
      readonly kind: "necessary";
      readonly rule: NecessaryRule;
      readonly from: Statement;
    }
  | {
      readonly kind: "implied";
      readonly from: Statement;
      readonly parent: string;
      /** The siblings the speaker passed over, this one among them. */
      readonly passedOver: readonly string[];
    };

export type GroundKind = Ground["kind"];

export type Entailment = {
  readonly key: string;
  readonly ground: Ground;
  /**
   * The cell this conclusion puts in the context, when it has one. Converses and
   * contrapositives are about the complement classes, which are not rows here,
   * so they add none — they are carried for the ledger, not for the lattice.
   */
  readonly fact: Fact | undefined;
};

export const isFragile = (entailment: Entailment): boolean =>
  entailment.ground.kind === "implied";

// --- building a closure ----------------------------------------------------

/** Which of the two closures to build. */
export type Reading = "literal" | "read-in";

const movesInForce = (source: Source, stage: number): readonly Move[] =>
  source.moves.slice(0, stage);

export const statementsAt = (source: Source, stage: number): readonly Statement[] => [
  ...source.statements,
  ...movesInForce(source, stage).flatMap((move) => move.states),
];

export const defeatedAt = (source: Source, stage: number): ReadonlySet<FactKey> =>
  new Set(movesInForce(source, stage).flatMap((move) => move.defeats));

const stated = (statements: readonly Statement[]): readonly Entailment[] =>
  statements.map((statement) => ({
    key: `stated:${statement.id}`,
    ground: { kind: "stated", statement },
    fact: {
      subject: statement.subject,
      predicate: statement.predicate,
      polarity: statement.polarity,
    },
  }));

const necessary = (statements: readonly Statement[]): readonly Entailment[] =>
  statements.flatMap((statement) =>
    necessaryRules(statement).map((rule) => ({
      key: `necessary:${statement.id}:${rule}`,
      ground: { kind: "necessary" as const, rule, from: statement },
      fact: undefined,
    })),
  );

/**
 * `דיוק` (Ch5 p68). For an affirmed `(s₀, ν)`, deny `ν` of every sibling of `s₀`
 * within `parent(s₀)`.
 *
 * Three restrictions, each of which the spec's failure modes name:
 *
 * - scope is the immediate parent class, never the whole subject order;
 * - only affirmations generate one, because the rule is about a predicate being
 *   *applied* to a narrowed subject — denials say nothing about the complement;
 * - a sibling the source has already spoken about is skipped, which is what
 *   keeps `I⁺ ∩ I⁻ = ∅`.
 */
const implied = (
  source: Source,
  statements: readonly Statement[],
  defeated: ReadonlySet<FactKey>,
): readonly Entailment[] => {
  const parentOf = new Map(source.cases.map((node) => [node.id, node.parent]));
  const spokenFor = new Set(
    statements.map((statement) => `${statement.subject}|${statement.predicate}`),
  );

  const generated = statements
    .filter((statement) => statement.polarity === "affirm")
    .flatMap((statement) => {
      const parent = parentOf.get(statement.subject);
      if (parent === undefined) return [];

      const passedOver = source.cases
        .filter((node) => node.parent === parent && node.id !== statement.subject)
        .map((node) => node.id)
        .filter((id) => !spokenFor.has(`${id}|${statement.predicate}`));

      return passedOver.map((id): Entailment => {
        const fact: Fact = {
          subject: id,
          predicate: statement.predicate,
          polarity: "deny",
        };
        return {
          key: factKey(fact),
          ground: { kind: "implied", from: statement, parent, passedOver },
          fact,
        };
      });
    });

  // Two mentioned siblings can point at the same unmentioned one; keep the first
  // and drop anything a move in force has taken back.
  const seen = new Set<string>();
  return generated.filter((entailment) => {
    if (seen.has(entailment.key) || defeated.has(entailment.key)) return false;
    seen.add(entailment.key);
    return true;
  });
};

export const entailmentsOf = (
  source: Source,
  stage: number,
  reading: Reading,
): readonly Entailment[] => {
  const statements = statementsAt(source, stage);
  const base = [...stated(statements), ...necessary(statements)];
  return reading === "literal"
    ? base
    : [...base, ...implied(source, statements, defeatedAt(source, stage))];
};

// --- the doubled context ---------------------------------------------------

/** Column name for one polarity of a question. */
export const signedPredicate = (predicate: string, polarity: Polarity): string =>
  `${predicate}${polarity === "affirm" ? "+" : "−"}`;

/**
 * A signed incidence relation, scaled into a plain context so `fca.ts` can read
 * it: one column per `(question, polarity)`. Every cell is decided, so the floor
 * and ceiling of §5.1 coincide and either bound gives the lattice.
 */
export const contextOf = (
  source: Source,
  entailments: readonly Entailment[],
): Context => {
  const present = new Set(
    entailments.flatMap((entailment) =>
      entailment.fact === undefined ? [] : [factKey(entailment.fact)],
    ),
  );
  const polarities: readonly Polarity[] = ["affirm", "deny"];

  return {
    fiber: source.fiber,
    subjects: source.cases.map((node) => node.id),
    predicates: source.questions.flatMap((question) =>
      polarities.map((polarity) => signedPredicate(question, polarity)),
    ),
    cells: new Map<string, CellValue>(
      source.cases.flatMap((node) =>
        source.questions.flatMap((question) =>
          polarities.map((polarity): readonly [string, CellValue] => [
            cellKey(node.id, signedPredicate(question, polarity)),
            present.has(factKey({ subject: node.id, predicate: question, polarity }))
              ? "in"
              : "out",
          ]),
        ),
      ),
    ),
  };
};

export type Analysis = {
  readonly reading: Reading;
  readonly entailments: readonly Entailment[];
  readonly context: Context;
  readonly lattice: Lattice;
};

export const analyse = (source: Source, stage: number, reading: Reading): Analysis => {
  const entailments = entailmentsOf(source, stage, reading);
  const context = contextOf(source, entailments);
  return { reading, entailments, context, lattice: latticeOf(context, "floor") };
};

// --- the diff --------------------------------------------------------------

const extentsOf = (lattice: Lattice): ReadonlySet<number> =>
  new Set(lattice.concepts.map((concept) => concept.extent));

/**
 * Cover edges keyed by the extents they join. The two lattices share a subject
 * array, so extent masks are comparable across them; concept indices are not.
 */
const edgeKeys = (lattice: Lattice): ReadonlySet<string> =>
  new Set(
    lattice.edges.flatMap((edge) => {
      const lower = lattice.concepts[edge.lower];
      const upper = lattice.concepts[edge.upper];
      return lower === undefined || upper === undefined
        ? []
        : [`${lower.extent}<${upper.extent}`];
    }),
  );

const only = <T,>(here: ReadonlySet<T>, there: ReadonlySet<T>): ReadonlySet<T> =>
  new Set([...here].filter((item) => !there.has(item)));

export type Diff = {
  /** Facts that hold only by default, and are therefore retractable. */
  readonly fragileFacts: readonly Entailment[];
  /** Groupings of cases that exist only once the defaults are read in. */
  readonly fragileExtents: ReadonlySet<number>;
  /** Groupings the defaults destroy — reading in can cost distinctions too. */
  readonly lostExtents: ReadonlySet<number>;
  readonly fragileEdgeCount: number;
};

/**
 * Compared by extent, not by concept: the question a reader is asking is which
 * cases the law still tells apart, and extents answer it. Naming the key is the
 * point — two lattices over the same subjects have several defensible diffs.
 */
export const diffOf = (literal: Analysis, readIn: Analysis): Diff => ({
  fragileFacts: readIn.entailments.filter(isFragile),
  fragileExtents: only(extentsOf(readIn.lattice), extentsOf(literal.lattice)),
  lostExtents: only(extentsOf(literal.lattice), extentsOf(readIn.lattice)),
  fragileEdgeCount: only(edgeKeys(readIn.lattice), edgeKeys(literal.lattice)).size,
});
