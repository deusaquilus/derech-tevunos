import type { SubjectTerm } from "../lattice/fixtures.ts";
import { CaseDiagram } from "./CaseDiagram.tsx";

type Props = {
  readonly subject: SubjectTerm;
  /** True when one of this case's answers is the open question. */
  readonly inQuestion: boolean;
};

export function CaseCard({ subject, inQuestion }: Props) {
  return (
    <article className={`case${inQuestion ? " case--in-question" : ""}`}>
      <header className="case__header">
        <h3 className="case__title">{subject.short}</h3>
        {inQuestion && <span className="tag tag--accent">in question</span>}
      </header>
      <CaseDiagram diagram={subject.diagram} />
      <p className="case__label">{subject.label}</p>
      <p className="case__hebrew" lang="he" dir="rtl">
        {subject.hebrew}
      </p>
    </article>
  );
}
