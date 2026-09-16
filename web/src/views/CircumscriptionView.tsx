import { useMemo, useState } from "react";

import {
  analyse,
  diffOf,
  isFragile,
  statementsAt,
  type Reading,
} from "../circumscription/closure.ts";
import { fixtures, type Fixture } from "../circumscription/fixtures.ts";
import {
  groupsOf,
  groupsOnlyHere,
  ledgerOf,
  stepsOf,
} from "../circumscription/reading.ts";
import { CircumscriptionFormal } from "../components/CircumscriptionFormal.tsx";
import { GroupPanel } from "../components/GroupPanel.tsx";
import { Ledger } from "../components/Ledger.tsx";
import { Penumbra } from "../components/Penumbra.tsx";
import { QuotePassage } from "../components/QuotePassage.tsx";
import { StageStepper } from "../components/StageStepper.tsx";

const READINGS: readonly { readonly value: Reading; readonly label: string }[] = [
  { value: "read-in", label: "Everything we read into it" },
  { value: "literal", label: "Only what it says" },
];

/** The cases the source never speaks about, which is where a דיוק lands. */
const unspokenFor = (fixture: Fixture, stage: number) => {
  const spoken = new Set(statementsAt(fixture.source, stage).map((s) => s.subject));
  return fixture.cases.filter((term) => !spoken.has(term.id));
};

export function CircumscriptionView() {
  const [fixtureId, setFixtureId] = useState(fixtures[0]?.id ?? "");
  const [stage, setStage] = useState(0);
  const [reading, setReading] = useState<Reading>("read-in");

  const fixture = fixtures.find((f) => f.id === fixtureId) ?? fixtures[0];
  if (fixture === undefined) throw new Error("No circumscription fixtures");

  /**
   * Both closures are computed from the source at every stage. The reading toggle
   * picks which of the two is on screen; it never edits either one.
   */
  const literal = useMemo(() => analyse(fixture.source, stage, "literal"), [fixture, stage]);
  const readIn = useMemo(() => analyse(fixture.source, stage, "read-in"), [fixture, stage]);
  const diff = useMemo(() => diffOf(literal, readIn), [literal, readIn]);

  const shown = reading === "literal" ? literal : readIn;
  const ledger = useMemo(() => ledgerOf(fixture, shown.entailments), [fixture, shown]);

  const literalGroups = useMemo(() => groupsOf(fixture, literal.entailments), [fixture, literal]);
  const readInGroups = useMemo(() => groupsOf(fixture, readIn.entailments), [fixture, readIn]);
  const groups = reading === "literal" ? literalGroups : readInGroups;
  const onlyHere =
    reading === "literal"
      ? groupsOnlyHere(literalGroups, readInGroups)
      : groupsOnlyHere(readInGroups, literalGroups);
  const readingChangesPicture = groupsOnlyHere(readInGroups, literalGroups).size > 0;

  const steps = stepsOf(fixture);
  const narrowing = statementsAt(fixture.source, stage).map((s) => s.narrows);
  const passages = statementsAt(fixture.source, stage)
    .map((s) => s.passage)
    .filter((passage, i, all) => all.indexOf(passage) === i);

  const unspoken = unspokenFor(fixture, stage);
  /** Whether a read-in fact is actually on screen, which the toggle also decides. */
  const ringIsDrawn = shown.entailments.some(isFragile);
  const defeated = diff.fragileFacts.length === 0 && stage > 0;
  const activeMove = fixture.source.moves[stage - 1];

  const passedOver = unspoken.map((term) => term.chip).join(" or ");
  const penumbraNote =
    unspoken.length === 0
      ? "Every case in the class has now been spoken about outright, so there is nothing left to read between the lines."
      : ringIsDrawn
        ? `Not one word of the passage is about ${passedOver}. The ring is the reader’s inference, not the text’s claim.`
        : defeated
          ? `With the inference withdrawn, ${passedOver} is simply unanswered again. Defeating an argument does not prove its opposite.`
          : `Not one word of the passage is about ${passedOver}, so on the text alone the case has no answer at all.`;

  const groupsNote = readingChangesPicture
    ? `${onlyHere.size} grouping${onlyHere.size === 1 ? "" : "s"} here ${
        onlyHere.size === 1 ? "has" : "have"
      } no counterpart under the other reading — compared by which cases sit together and what the source says about them.`
    : "Reading it in changes nothing here. The two versions of this picture are the same.";

  const select = (next: Fixture) => {
    setFixtureId(next.id);
    setStage(0);
    setReading("read-in");
  };

  return (
    <>
      <nav className="tabs" aria-label="Passage">
        {fixtures.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            className={`tab${candidate.id === fixture.id ? " is-selected" : ""}`}
            aria-current={candidate.id === fixture.id}
            onClick={() => select(candidate)}
          >
            {candidate.tab}
          </button>
        ))}
      </nav>

      <header className="lede">
        <h1 className="lede__title">{fixture.title}</h1>
        <p className="lede__blurb">{fixture.blurb}</p>
      </header>

      <section className="section">
        <h2 className="section__title">What the source actually says</h2>
        <p className="section__note">
          The highlighted words are the narrowing: the speaker could have said something
          wider and chose not to. Everything on this page follows from that choice.
        </p>
        <div className="quotes">
          {passages.map((passage) => (
            <QuotePassage key={passage.english} passage={passage} narrowing={narrowing} />
          ))}
        </div>
      </section>

      {steps.length > 1 && (
        <section className="section">
          <h2 className="section__title">Follow the argument</h2>
          <div className="asked">
            <StageStepper
              legend="Where the sugya has got to"
              steps={steps}
              value={stage}
              onChange={setStage}
            />
            {activeMove !== undefined && (
              <div className="asked__quote">
                <QuotePassage passage={activeMove.passage} />
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section">
        <h2 className="section__title">…and what it therefore leaves unsaid</h2>
        <p className="section__note">
          {ringIsDrawn ? (
            <>
              The dashed ring is drawn <em>outside</em> the case, because it is not part
              of what was said. It is what a reader adds.
            </>
          ) : (
            "Nothing is ringed here. Every case is either said outright or left with no answer at all."
          )}
        </p>
        <Penumbra fixture={fixture} entailments={shown.entailments} />
        <p className="section__note">{penumbraNote}</p>
        {ringIsDrawn && (
          <>
            <p className="section__note">
              And this is not our invention — the Talmud draws exactly that inference:
            </p>
            <QuotePassage passage={fixture.inference} />
          </>
        )}
      </section>

      <section className="section">
        <h2 className="section__title">Two kinds of conclusion</h2>
        <p className="section__note">
          What the sentence says, and what a reader adds. The test that separates them
          is Ramchal’s: could you find a reason to keep the sentence and drop this?
        </p>
        <Ledger rows={ledger} />
      </section>

      <section className="section">
        <h2 className="section__title">What the law can tell apart</h2>
        <p className="section__note">
          A group is a set of cases that answer every question the same way. Two cases in
          the same group are, as far as these questions go, the same case. Flip the switch
          to strip out everything that was only read in.
        </p>
        <div className="segmented" role="radiogroup" aria-label="Reading">
          {READINGS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={reading === option.value}
              className={`segmented__option${
                reading === option.value ? " is-selected" : ""
              }${option.value === "literal" ? " segmented__option--open" : ""}`}
              onClick={() => setReading(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <GroupPanel groups={groups} onlyHere={onlyHere} />
        <p className="section__note">{groupsNote}</p>
      </section>

      <aside className="payoff">
        <h2 className="payoff__title">
          {defeated ? "And it is gone" : "One of these is not like the others"}
        </h2>
        <p>{fixture.payoff}</p>
        <p className="payoff__caveat">{fixture.caveat}</p>
      </aside>

      <CircumscriptionFormal
        fixture={fixture}
        literal={literal}
        readIn={readIn}
        diff={diff}
      />
    </>
  );
}
