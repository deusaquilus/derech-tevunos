import type { Entailment } from "../circumscription/closure.ts";
import type { Fixture } from "../circumscription/fixtures.ts";
import { answerLabel, standingOf, type Standing } from "../circumscription/reading.ts";
import { AnswerMark } from "./AnswerMark.tsx";

type Props = {
  readonly fixture: Fixture;
  readonly entailments: readonly Entailment[];
};

const STANDING_TAG: Readonly<Record<Standing["kind"], string>> = {
  stated: "said outright",
  "read-in": "read in, never said",
  silent: "not mentioned",
};

/**
 * §5.2's companion "penumbra" view. The mentioned cases are solid. The sibling
 * the speaker passed over carries a dashed ring — the default negation — which
 * is drawn outside the case rather than inside it, because it is not part of
 * what was said. When the default is defeated the ring is simply gone.
 *
 * Dashed against solid is the primary encoder, so the distinction survives in
 * monochrome, and every tile also carries the word (trap 15).
 */
export function Penumbra({ fixture, entailments }: Props) {
  return (
    <div className="penumbra">
      {fixture.classes.map((parent) => {
        const members = fixture.cases.filter((term) => term.parent === parent.id);

        return (
          <section className="field" key={parent.id}>
            <header className="field__header">
              <h3 className="field__title">
                All of: {parent.short}
                {parent.hebrew !== undefined && (
                  <span className="field__hebrew" lang="he" dir="rtl">
                    {parent.hebrew}
                  </span>
                )}
              </h3>
              <p className="field__label">{parent.label}</p>
            </header>

            <ul className="field__slots">
              {members.map((term) => {
                const standings = fixture.questions.map((question) => ({
                  question,
                  standing: standingOf(entailments, term.id, question.id),
                }));
                // One question per fixture here; the strongest standing drives the ring.
                const kind = standings.some((entry) => entry.standing.kind === "read-in")
                  ? "read-in"
                  : standings.every((entry) => entry.standing.kind === "silent")
                    ? "silent"
                    : "stated";

                return (
                  <li className={`slot slot--${kind}`} key={term.id}>
                    <span className="slot__ring-label">{STANDING_TAG[kind]}</span>
                    <article className="tile">
                      <h4 className="tile__title">{term.short}</h4>
                      <p className="tile__hebrew" lang="he" dir="rtl">
                        {term.hebrew}
                      </p>
                      <p className="tile__label">{term.label}</p>
                      <ul className="tile__answers">
                        {standings.map(({ question, standing }) => (
                          <li className="tile__answer" key={question.id}>
                            <span className="tile__ask">{question.ask}</span>
                            <AnswerMark
                              value={
                                standing.answer === "affirm"
                                  ? "in"
                                  : standing.answer === "deny"
                                    ? "out"
                                    : "doubt"
                              }
                              label={answerLabel(question, standing.answer)}
                            />
                          </li>
                        ))}
                      </ul>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
