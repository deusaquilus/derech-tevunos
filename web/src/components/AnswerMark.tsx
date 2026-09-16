import type { CellValue } from "../lattice/fca.ts";

type Props = {
  readonly value: CellValue;
  /** Hide the word beside the icon, for tight cells. */
  readonly iconOnly?: boolean;
  /** Override the generic word where the question supplies a better one. */
  readonly label?: string;
};

const LABEL: Readonly<Record<CellValue, string>> = {
  in: "Yes",
  out: "No",
  doubt: "Unknown",
};

/**
 * Yes, no, or unknown. Each state has its own shape and its own word, so the
 * three are still distinguishable in monochrome (trap 15).
 */
export function AnswerMark({ value, iconOnly = false, label = LABEL[value] }: Props) {
  return (
    <span className={`mark mark--${value}`}>
      <svg width={15} height={15} viewBox="0 0 15 15" aria-hidden="true" focusable="false">
        {value === "in" && <path className="mark__glyph" d="M3 8 L6 11 L12 4" />}
        {value === "out" && <path className="mark__glyph" d="M4 4 L11 11 M11 4 L4 11" />}
        {value === "doubt" && (
          <>
            <circle className="mark__ring" cx={7.5} cy={7.5} r={6} />
            <text className="mark__query" x={7.5} y={11} textAnchor="middle">
              ?
            </text>
          </>
        )}
      </svg>
      {iconOnly ? <span className="visually-hidden">{label}</span> : <span>{label}</span>}
    </span>
  );
}
