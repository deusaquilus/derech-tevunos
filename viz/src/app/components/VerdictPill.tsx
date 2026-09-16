import type { JSX } from "react";

import type { Verdict } from "../../verdict.ts";

export type VerdictPillProps = {
  readonly verdict: Verdict;
};

export const VerdictPill = ({ verdict }: VerdictPillProps): JSX.Element => (
  <span
    className={`pill pill-${verdict.tone}${verdict.dashed ? " pill-dashed" : ""}`}
    data-tone={verdict.tone}
  >
    {verdict.label}
  </span>
);
