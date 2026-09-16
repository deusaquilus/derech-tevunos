/**
 * The plain-language layer: a thin pure module between the closure engine and
 * the components, so no component ever touches a bitmask or a ground.
 *
 * Every sentence here is derived from the fixture's own phrasings rather than
 * transcribed, so the copy cannot drift from what is actually being computed.
 */

import type { Cite } from "../source/cite.ts";
import {
  factKey,
  type Entailment,
  type GroundKind,
  type NecessaryRule,
  type Statement,
} from "./closure.ts";
import type { CaseTerm, ClassTerm, Fixture, QuestionTerm } from "./fixtures.ts";

/**
 * Ramchal's own test for the two kinds of conclusion, Ch5 pp70-72: an inference
 * is `מוכרח` when "it is impossible to accept the statement itself and reject the
 * inference", and `בלתי־מוכרח` when "it is nonetheless possible to find a reason
 * for accepting the statement while rejecting this inference".
 */
export const CRITERION = {
  firm: "You cannot accept the sentence and deny this.",
  fragile: "You can accept every word of the sentence and still deny this.",
} as const;

const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

const lower = (text: string): string => text.charAt(0).toLowerCase() + text.slice(1);

// --- what each case stands at ----------------------------------------------

export type Answer = "affirm" | "deny" | "none";

/** How a case comes to have the answer it has, for one question. */
export type Standing =
  | { readonly kind: "stated"; readonly answer: Answer; readonly statement: Statement }
  | { readonly kind: "read-in"; readonly answer: Answer; readonly from: Statement }
  | { readonly kind: "silent"; readonly answer: "none" };

const carrierOf = (
  entailments: readonly Entailment[],
  subject: string,
  predicate: string,
): Entailment | undefined =>
  (["affirm", "deny"] as const)
    .map((polarity) => factKey({ subject, predicate, polarity }))
    .flatMap((key) =>
      entailments.filter(
        (entailment) =>
          entailment.fact !== undefined && factKey(entailment.fact) === key,
      ),
    )
    .at(0);

export const standingOf = (
  entailments: readonly Entailment[],
  subject: string,
  predicate: string,
): Standing => {
  const carrier = carrierOf(entailments, subject, predicate);
  if (carrier?.fact === undefined) return { kind: "silent", answer: "none" };

  const answer = carrier.fact.polarity;
  switch (carrier.ground.kind) {
    case "stated":
      return { kind: "stated", answer, statement: carrier.ground.statement };
    case "implied":
      return { kind: "read-in", answer, from: carrier.ground.from };
    case "necessary":
      // Converses add no cells, so nothing can be carried by one.
      return { kind: "silent", answer: "none" };
    default: {
      const exhaustive: never = carrier.ground;
      return exhaustive;
    }
  }
};

export const answerLabel = (question: QuestionTerm, answer: Answer): string => {
  switch (answer) {
    case "affirm":
      return question.affirmative;
    case "deny":
      return question.negative;
    case "none":
      return "No answer";
    default: {
      const exhaustive: never = answer;
      return exhaustive;
    }
  }
};

// --- the ledger ------------------------------------------------------------

const NECESSARY_NAME: Readonly<Record<NecessaryRule, string>> = {
  contrapositive: "Contrapositive · חילוף הפכי כולל",
  limitedConverse: "Limited converse · חילוף קצתי",
  completeConverse: "Complete converse · חילוף כולל",
  absoluteOpposite: "Absolute opposite · הפך",
  limitedContrapositive: "Limited contrapositive · חלוף קצתי הפכי",
};

const necessarySentence = (
  rule: NecessaryRule,
  term: CaseTerm,
  question: QuestionTerm,
): string => {
  switch (rule) {
    case "contrapositive":
      return `Anything ${question.failsClause} is not ${term.phrase}.`;
    case "limitedConverse":
      return `At least one thing ${question.holdsClause} is ${term.phrase}.`;
    case "completeConverse":
      return `Nothing ${question.holdsClause} is ${term.phrase}.`;
    case "absoluteOpposite":
      return `Some ${term.phrase} is not a thing ${question.holdsClause}.`;
    case "limitedContrapositive":
      return `At least one thing ${question.failsClause} is ${term.phrase}.`;
    default: {
      const exhaustive: never = rule;
      return exhaustive;
    }
  }
};

const factSentence = (
  term: CaseTerm,
  question: QuestionTerm,
  polarity: "affirm" | "deny",
): string =>
  `${capitalize(term.phrase)} — ${lower(
    polarity === "affirm" ? question.affirmative : question.negative,
  )}.`;

/** One line of "here is everything this sentence gets you". */
export type LedgerRow = {
  readonly key: string;
  readonly kind: GroundKind;
  readonly sentence: string;
  /** The name of the Ch5 rule, where one applies. */
  readonly rule: string | undefined;
  readonly because: string;
  readonly cite: Cite;
};

const lookup = <T extends { readonly id: string }>(
  terms: readonly T[],
  id: string,
): T | undefined => terms.find((term) => term.id === id);

export const ledgerOf = (
  fixture: Fixture,
  entailments: readonly Entailment[],
): readonly LedgerRow[] => {
  const classOf = (caseId: string): ClassTerm | undefined => {
    const term = lookup(fixture.cases, caseId);
    return term === undefined ? undefined : lookup(fixture.classes, term.parent);
  };

  const rows = entailments.flatMap((entailment): readonly LedgerRow[] => {
    const { ground } = entailment;

    if (ground.kind === "necessary") {
      const term = lookup(fixture.cases, ground.from.subject);
      const question = lookup(fixture.questions, ground.from.predicate);
      if (term === undefined || question === undefined) return [];
      return [
        {
          key: entailment.key,
          kind: "necessary",
          sentence: necessarySentence(ground.rule, term, question),
          rule: NECESSARY_NAME[ground.rule],
          because: CRITERION.firm,
          cite: ground.from.passage.cite,
        },
      ];
    }

    const fact = entailment.fact;
    if (fact === undefined) return [];
    const term = lookup(fixture.cases, fact.subject);
    const question = lookup(fixture.questions, fact.predicate);
    if (term === undefined || question === undefined) return [];

    if (ground.kind === "stated") {
      return [
        {
          key: entailment.key,
          kind: "stated",
          sentence: factSentence(term, question, fact.polarity),
          rule: undefined,
          because: `${capitalize(ground.statement.passage.speaker)} says it outright.`,
          cite: ground.statement.passage.cite,
        },
      ];
    }

    const parent = classOf(ground.from.subject);
    return [
      {
        key: entailment.key,
        kind: "implied",
        sentence: factSentence(term, question, fact.polarity),
        rule: "Inference · דיוק",
        because: `Nothing in the passage says it. It is here only because ${
          ground.from.passage.speaker
        } said “${ground.from.narrows}” instead of speaking about ${
          parent?.whole ?? "the class as a whole"
        }.`,
        cite: ground.from.passage.cite,
      },
    ];
  });

  const rank: Readonly<Record<GroundKind, number>> = {
    stated: 0,
    necessary: 1,
    implied: 2,
  };
  return rows.toSorted((a, b) => rank[a.kind] - rank[b.kind]);
};

export type Tally = {
  /** Said outright. These are the solid rows a first reading needs. */
  readonly stated: number;
  /**
   * Ch5 necessary inferences. They follow from the wording, but they speak about
   * complement classes and add no cells, so the ledger folds them away.
   */
  readonly necessary: number;
  /** Conclusions you can deny while accepting every word of the sentence. */
  readonly fragile: number;
};

export const tallyOf = (rows: readonly LedgerRow[]): Tally => ({
  stated: rows.filter((row) => row.kind === "stated").length,
  necessary: rows.filter((row) => row.kind === "necessary").length,
  fragile: rows.filter((row) => row.kind === "implied").length,
});

// --- groups ----------------------------------------------------------------

export type Membership = {
  readonly term: CaseTerm;
  /** True when the answer that puts it here is only read in. */
  readonly fragile: boolean;
};

/**
 * A set of cases that answer every question identically. Two cases in the same
 * group are, as far as these questions go, the same case.
 */
export type Group = {
  readonly key: string;
  readonly title: string;
  readonly members: readonly Membership[];
  readonly answers: readonly Answer[];
};

const ANSWER_RANK: Readonly<Record<Answer, number>> = { affirm: 0, deny: 1, none: 2 };

const compareAnswers = (a: readonly Answer[], b: readonly Answer[]): number => {
  for (const [i, answer] of a.entries()) {
    const order = ANSWER_RANK[answer] - ANSWER_RANK[b[i] ?? "none"];
    if (order !== 0) return order;
  }
  return 0;
};

const titleOf = (
  answers: readonly Answer[],
  questions: readonly QuestionTerm[],
): string => {
  const said = answers.flatMap((answer, i) => {
    const question = questions[i];
    return question === undefined || answer === "none"
      ? []
      : [answerLabel(question, answer)];
  });
  return said.length === 0 ? "The source gives no answer" : said.join(" and ");
};

export const groupsOf = (
  fixture: Fixture,
  entailments: readonly Entailment[],
): readonly Group[] => {
  const read = fixture.cases.map((term) => {
    const standings = fixture.questions.map((question) =>
      standingOf(entailments, term.id, question.id),
    );
    return {
      term,
      answers: standings.map((standing) => standing.answer),
      fragile: standings.some((standing) => standing.kind === "read-in"),
    };
  });

  const groups = read.reduce((byKey, entry) => {
    const key = entry.answers.join("/");
    const existing = byKey.get(key);
    const member: Membership = { term: entry.term, fragile: entry.fragile };
    return byKey.set(key, {
      key,
      title: titleOf(entry.answers, fixture.questions),
      answers: entry.answers,
      members: [...(existing?.members ?? []), member],
    });
  }, new Map<string, Group>());

  return [...groups.values()].toSorted((a, b) => compareAnswers(a.answers, b.answers));
};

/**
 * Groups with no counterpart on the other side.
 *
 * The two closures have different concept sets and no canonical map between
 * them, so the comparison key has to be chosen deliberately and then named in
 * the UI. Membership alone is not enough: reading in a default can leave a case
 * on its own and only change what the law says about it, which is a real change
 * a reader cares about. So the key is membership *and* the answers — which cases
 * sit together, and what the source says about them.
 */
export const groupsOnlyHere = (
  here: readonly Group[],
  there: readonly Group[],
): ReadonlySet<string> => {
  const signature = (group: Group): string =>
    `${group.key}::${group.members
      .map((member) => member.term.id)
      .toSorted()
      .join(",")}`;
  const elsewhere = new Set(there.map(signature));
  return new Set(here.filter((group) => !elsewhere.has(signature(group))).map((g) => g.key));
};

// --- stages ----------------------------------------------------------------

export type Step = {
  readonly index: number;
  readonly label: string;
  readonly headline: string | undefined;
};

export const stepsOf = (fixture: Fixture): readonly Step[] => [
  { index: 0, label: fixture.opening, headline: undefined },
  ...fixture.source.moves.map((move, i) => ({
    index: i + 1,
    label: move.label,
    headline: move.headline,
  })),
];
