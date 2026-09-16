import type { Decided } from "../lattice/fca.ts";

/** `open` is the Talmud's unsettled answer, not a missing value. */
export type Choice = Decided | "open";

type Props = {
  readonly legend: string;
  readonly negative: string;
  readonly affirmative: string;
  readonly value: Choice;
  readonly onChange: (choice: Choice) => void;
};

const ORDER: readonly Choice[] = ["out", "open", "in"];

/**
 * The one control that drives the whole page. Three positions, because doubt is
 * a real state of the argument and not the absence of an answer (trap 1).
 */
export function AnswerControl({ legend, negative, affirmative, value, onChange }: Props) {
  const labelFor = (choice: Choice): string =>
    choice === "out" ? negative : choice === "in" ? affirmative : "Leave it open";

  return (
    <fieldset className="control">
      <legend className="control__legend">{legend}</legend>
      <div className="segmented" role="radiogroup" aria-label={legend}>
        {ORDER.map((choice) => (
          <button
            key={choice}
            type="button"
            role="radio"
            aria-checked={value === choice}
            className={`segmented__option${value === choice ? " is-selected" : ""}${
              choice === "open" ? " segmented__option--open" : ""
            }`}
            onClick={() => onChange(choice)}
          >
            {labelFor(choice)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
