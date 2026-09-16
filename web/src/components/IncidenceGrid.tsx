import { cellKey, type CellValue, type Resolution } from "../lattice/fca.ts";
import type { Fixture } from "../lattice/fixtures.ts";
import { AnswerMark } from "./AnswerMark.tsx";
import { CaseDiagram } from "./CaseDiagram.tsx";

type Props = {
  readonly fixture: Fixture;
  readonly resolution: Resolution;
};

/**
 * The companion grid the spec asks for in §5.1: every answer the sources give,
 * with the doubtful cell called out. A cell you have settled yourself is marked
 * as yours, so a choice is never mistaken for something the sugya said.
 */
export function IncidenceGrid({ fixture, resolution }: Props) {
  const { context, subjects, predicates, cellNotes } = fixture;

  return (
    <table className="grid">
      <caption className="grid__caption">
        What the sources say. Grey shading marks the one answer the Talmud leaves open.
      </caption>
      <thead>
        <tr>
          <th scope="col">Case</th>
          {predicates.map((predicate) => (
            <th scope="col" key={predicate.id}>
              {predicate.question}
              <span className="grid__hebrew" lang="he" dir="rtl">
                {predicate.hebrew}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject) => (
          <tr key={subject.id}>
            <th scope="row">
              <span className="grid__case">
                <CaseDiagram diagram={subject.diagram} size="chip" />
                {subject.short}
              </span>
            </th>
            {predicates.map((predicate) => {
              const key = cellKey(subject.id, predicate.id);
              const declared: CellValue = context.cells.get(key) ?? "doubt";
              const pinned = resolution.get(key);
              const shown: CellValue = declared === "doubt" ? (pinned ?? "doubt") : declared;

              return (
                <td
                  key={predicate.id}
                  className={declared === "doubt" ? "grid__cell grid__cell--doubtful" : "grid__cell"}
                  title={cellNotes.get(key)}
                >
                  <AnswerMark value={shown} />
                  {declared === "doubt" && pinned !== undefined && (
                    <span className="tag">your answer</span>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
