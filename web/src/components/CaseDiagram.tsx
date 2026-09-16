import type { Diagram } from "../lattice/fixtures.ts";

type Props = {
  readonly diagram: Diagram;
  /** `full` for the case cards, `chip` for the small inline marks in a bucket. */
  readonly size?: "full" | "chip";
};

/**
 * A schematic of each case. Solid outlines are ordinary ground; the dashed
 * outline is the "safe spot", somewhere he could set the object down without
 * penalty. Shape carries the meaning, not colour (trap 15).
 */
export function CaseDiagram({ diagram, size = "full" }: Props) {
  const chip = size === "chip";
  const width = chip ? 26 : 78;
  const height = chip ? 11 : 30;

  return (
    <svg
      className="diagram"
      width={width}
      height={height}
      viewBox="0 0 78 30"
      aria-hidden="true"
      focusable="false"
    >
      {diagram === "colonnade" && (
        <>
          <rect className="ground" x={1} y={14} width={19} height={15} rx={2} />
          <rect className="safe" x={28} y={14} width={19} height={15} rx={2} />
          <rect className="ground" x={55} y={14} width={22} height={15} rx={2} />
          {!chip && (
            <>
              <path className="throw" d="M10 10 Q39 1 67 10" />
              <path className="throw" d="M62.5 5.5 L67.5 10.5 L61.5 12.5" />
            </>
          )}
        </>
      )}

      {diagram === "street" && (
        <>
          <rect className="ground" x={1} y={14} width={76} height={15} rx={2} />
          {chip ? (
            <path className="safe-line" d="M8 21.5 H70" />
          ) : (
            <>
              <path className="safe-line" d="M11 9 H67" />
              <circle className="endpoint" cx={11} cy={9} r={2.6} />
              <circle className="endpoint" cx={67} cy={9} r={2.6} />
            </>
          )}
        </>
      )}

      {diagram === "direct" && (
        <>
          <rect className="ground" x={1} y={14} width={33} height={15} rx={2} />
          <rect className="ground" x={44} y={14} width={33} height={15} rx={2} />
          {!chip && (
            <>
              <path className="throw" d="M16 10 Q39 3 62 10" />
              <path className="throw" d="M57.5 5.5 L62.5 10.5 L56.5 12.5" />
            </>
          )}
        </>
      )}
    </svg>
  );
}
