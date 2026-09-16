/**
 * What to report about a sentence once the debate has acted on it.
 *
 * A claim carries an acceptance status; a move carries standing. Reporting the
 * wrong one flattens the distinction the taxonomy exists to draw, so the choice
 * is made here once and shared by every renderer.
 */

import type { Analysis, Standing, Status, Unit } from "./sugya.ts";

export type Tone = "good" | "neutral" | "bad";

export type Verdict = {
  readonly label: string;
  readonly tone: Tone;
  /** Dashed outline marks a state that is unsettled rather than concluded. */
  readonly dashed: boolean;
};

export const statusVerdict = (status: Status): Verdict => {
  switch (status) {
    case "accepted":
      return { label: "accepted", tone: "good", dashed: false };
    case "rejected":
      return { label: "rejected", tone: "bad", dashed: false };
    case "doubt":
      return { label: "in doubt", tone: "neutral", dashed: true };
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
};

export const standingVerdict = (standing: Standing): Verdict => {
  switch (standing) {
    case "live":
      return { label: "stands", tone: "good", dashed: false };
    case "weakened":
      return { label: "weakened", tone: "neutral", dashed: true };
    case "discharged":
      return { label: "answered", tone: "neutral", dashed: false };
    case "defeated":
      return { label: "refuted", tone: "bad", dashed: false };
    default: {
      const exhaustive: never = standing;
      return exhaustive;
    }
  }
};

export const verdictFor = (unit: Unit, analysis: Analysis): Verdict | undefined => {
  if (!analysis.contested.has(unit.id)) return undefined;
  return unit.move.element === "statement"
    ? statusVerdict(analysis.status.get(unit.id) ?? "doubt")
    : standingVerdict(analysis.standing.get(unit.id) ?? "live");
};

/** How far a move has been knocked down, as an opacity. */
export const standingOpacity = (standing: Standing): number => {
  switch (standing) {
    case "live":
      return 1;
    case "weakened":
      return 0.62;
    case "discharged":
    case "defeated":
      return 0.42;
    default: {
      const exhaustive: never = standing;
      return exhaustive;
    }
  }
};
