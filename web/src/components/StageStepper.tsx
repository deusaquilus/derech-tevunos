import type { Step } from "../circumscription/reading.ts";

type Props = {
  readonly legend: string;
  readonly steps: readonly Step[];
  readonly value: number;
  readonly onChange: (stage: number) => void;
};

/**
 * Walks the sugya forward one move at a time. Each stage recomputes the closure
 * from the statements in force, which is how a read-in fact can leave again
 * (trap 12) — the control selects a state of the argument, it does not edit one.
 */
export function StageStepper({ legend, steps, value, onChange }: Props) {
  const active = steps.find((step) => step.index === value);

  return (
    <fieldset className="control">
      <legend className="control__legend">{legend}</legend>
      <div className="segmented" role="radiogroup" aria-label={legend}>
        {steps.map((step) => (
          <button
            key={step.index}
            type="button"
            role="radio"
            aria-checked={value === step.index}
            className={`segmented__option${value === step.index ? " is-selected" : ""}`}
            onClick={() => onChange(step.index)}
          >
            <span className="segmented__index">{step.index + 1}</span>
            {step.label}
          </button>
        ))}
      </div>
      {active?.headline !== undefined && <p className="control__headline">{active.headline}</p>}
    </fieldset>
  );
}
