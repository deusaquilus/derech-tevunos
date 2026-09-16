import { useMemo, useState } from "react";

import { bucketsOf, membershipsOnlyHere } from "../lattice/buckets.ts";
import {
  latticeInterval,
  openCells,
  type CellKey,
  type Decided,
  type Resolution,
} from "../lattice/fca.ts";
import { shabbos5b, type Fixture } from "../lattice/fixtures.ts";
import { AnswerControl, type Choice } from "../components/AnswerControl.tsx";
import { CaseCard } from "../components/CaseCard.tsx";
import { FormalDetails } from "../components/FormalDetails.tsx";
import { IncidenceGrid } from "../components/IncidenceGrid.tsx";
import { WorldPanel, type PanelState } from "../components/WorldPanel.tsx";

const fixture: Fixture = shabbos5b;

/** Splits `subject|predicate` back into the terms it names. */
const termsOf = (fixture: Fixture, key: CellKey) => {
  const [subjectId, predicateId] = key.split("|");
  return {
    subject: fixture.subjects.find((term) => term.id === subjectId),
    predicate: fixture.predicates.find((term) => term.id === predicateId),
  };
};

const withChoice = (
  resolution: Resolution,
  key: CellKey,
  choice: Choice,
): Resolution => {
  const next = new Map<CellKey, Decided>(resolution);
  if (choice === "open") next.delete(key);
  else next.set(key, choice);
  return next;
};

export function LatticeIntervalView() {
  const [resolution, setResolution] = useState<Resolution>(() => new Map());

  /** Cells the source itself leaves in doubt, whatever the reader has since chosen. */
  const doubtful = useMemo(() => openCells(fixture.context), []);

  /**
   * The two bounds are computed from the source alone, so each panel always shows
   * the same picture. Choosing an answer selects between the two pictures; it does
   * not edit either one.
   */
  const interval = useMemo(() => latticeInterval(fixture.context), []);
  const floorBuckets = useMemo(() => bucketsOf(interval.floor, fixture), [interval]);
  const ceilingBuckets = useMemo(() => bucketsOf(interval.ceiling, fixture), [interval]);

  const stillOpen = doubtful.filter((key) => !resolution.has(key));
  const settled = stillOpen.length === 0;
  const picturesLeft = 2 ** stillOpen.length;
  const choiceFor = (key: CellKey): Choice => resolution.get(key) ?? "open";

  const panelState = (side: Decided): PanelState => {
    if (!settled) return "possible";
    return doubtful.every((key) => resolution.get(key) === side) ? "chosen" : "ruled-out";
  };

  return (
    <>
      <header className="lede">
        <p className="lede__eyebrow">
          {fixture.cite.tractate} {fixture.cite.folio} · Derech Tevunos ch.{" "}
          {fixture.cite.chapter}
        </p>
        <h1 className="lede__title">{fixture.title}</h1>
        <p className="lede__blurb">{fixture.blurb}</p>
      </header>

      <section className="section">
        <h2 className="section__title">The three cases</h2>
        <p className="section__note">
          In each diagram the dashed section is a “safe spot”: somewhere he could set the
          object down without penalty.
        </p>
        <div className="cases">
          {fixture.subjects.map((subject) => (
            <CaseCard
              key={subject.id}
              subject={subject}
              inQuestion={doubtful.some((key) => key.startsWith(`${subject.id}|`))}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">What is known</h2>
        <IncidenceGrid fixture={fixture} resolution={resolution} />

        <div className="asked">
          {doubtful.map((key) => {
            const { subject, predicate } = termsOf(fixture, key);
            if (subject === undefined || predicate === undefined) return null;

            return (
              <AnswerControl
                key={key}
                legend={`${predicate.question.replace(/\?$/, "")} — ${subject.short.toLowerCase()}?`}
                negative={predicate.negative}
                affirmative={predicate.affirmative}
                value={choiceFor(key)}
                onChange={(choice) =>
                  setResolution((current) => withChoice(current, key, choice))
                }
              />
            );
          })}
          <p className="asked__note">
            {settled
              ? resolution.get(doubtful[0] ?? "") === "in"
                ? fixture.reading.resolution
                : fixture.reading.difficulty
              : `Unanswered, which is where the Talmud leaves it. Both answers are still live, so ${picturesLeft} pictures of the law are still on the table.`}
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">What the law can tell apart</h2>
        <p className="section__note">
          A “kind of case” is a bucket of cases that answer both questions identically. Two
          cases in the same bucket are, as far as these questions go, the same case.
        </p>
        <div className="worlds">
          <WorldPanel
            heading="If he is not guilty"
            state={panelState("out")}
            buckets={floorBuckets}
            onlyHere={membershipsOnlyHere(floorBuckets, ceilingBuckets)}
            fixture={fixture}
          />
          <WorldPanel
            heading="If he is guilty"
            state={panelState("in")}
            buckets={ceilingBuckets}
            onlyHere={membershipsOnlyHere(ceilingBuckets, floorBuckets)}
            fixture={fixture}
          />
        </div>
      </section>

      <aside className="payoff">
        <h2 className="payoff__title">Answering the question destroyed a distinction</h2>
        <p>{fixture.reading.payoff}</p>
      </aside>

      <FormalDetails
        fixture={fixture}
        floor={interval.floor}
        ceiling={interval.ceiling}
        consistentContexts={picturesLeft}
      />
    </>
  );
}
