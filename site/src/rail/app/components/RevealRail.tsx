import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

/**
 * A map of the argument in the margin: one tick per sentence, evenly spaced
 * over whatever height the dock gives it, with the thumb at the frontier. It
 * is not an `<input type="range">` because the ticks carry structure — a
 * movement's first sentence is marked — and because a drag has to reach the
 * far end of a seventy-seven sentence passage without the pointer leaving the
 * window.
 *
 * It used to have a second form, `aligned`, which put each tick at the
 * measured centre of its sentence so that dragging down was dragging through
 * the passage — the better control while the passage fits on a screen or two.
 * That form went when the control was pinned beside the rows (2026-09-16): the
 * rows scroll and the map does not, so no tick can line up with a row any
 * more, and one that claimed to would lie the moment the reader scrolled.
 * Alignment is given up; reachability, with the thumb always in view, is what
 * the map buys.
 */
export type RevealRailProps = {
  readonly count: number;
  /** How many sentences are revealed, 1-based. */
  readonly value: number;
  readonly onChange: (next: number) => void;
  /** Indices, 0-based, where a new movement of the argument begins. */
  readonly boundaries?: readonly number[];
  readonly valueLabel?: string;
  readonly label: string;
};

const MAP_PAD = 14;

/**
 * Below this many pixels between ticks a ring (8px across, bordered) reads as
 * a chain, and the ticks are drawn as flat dashes instead: fifty-seven in a
 * viewport-height rail sit eight pixels apart, four in the same rail sit two
 * hundred apart. The number is a judgment — a ring plus its own width of air.
 */
const DENSE_SPACING = 16;

const clamp = (n: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, n));

export const RevealRail = ({
  count,
  value,
  onChange,
  boundaries = [],
  valueLabel,
  label,
}: RevealRailProps): JSX.Element => {
  const railRef = useRef<HTMLDivElement>(null);
  // Whether a drag is in flight has to be readable synchronously: a pointermove
  // can arrive in the same tick as the pointerdown, before state has settled.
  // The state copy exists only to swap the cursor.
  const draggingRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [railHeight, setRailHeight] = useState(0);

  // The rail owns its own geometry: it is pinned in the dock, so its height
  // comes from the dock rather than from the rows.
  useEffect(() => {
    const rail = railRef.current;
    if (rail === null) return undefined;
    const observer = new ResizeObserver(() => {
      const next = rail.getBoundingClientRect().height;
      setRailHeight((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
    });
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  const usable = Math.max(0, railHeight - 2 * MAP_PAD);
  const spread = useMemo(
    () => Array.from({ length: count }, (_, i) => MAP_PAD + (usable * i) / Math.max(1, count - 1)),
    [count, usable],
  );
  const dense = usable / Math.max(1, count - 1) < DENSE_SPACING;

  const nearestStep = useCallback(
    (offsetY: number): number => {
      if (spread.length === 0) return value;
      const best = spread.reduce(
        (acc, tick, i) =>
          Math.abs(tick - offsetY) < Math.abs((spread[acc] ?? 0) - offsetY) ? i : acc,
        0,
      );
      return best + 1;
    },
    [spread, value],
  );

  const seek = useCallback(
    (clientY: number): void => {
      const rail = railRef.current;
      if (rail === null) return;
      onChange(nearestStep(clientY - rail.getBoundingClientRect().top));
    },
    [nearestStep, onChange],
  );

  const onPointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    // Capture keeps the drag alive past the rail's edges. It can be refused if
    // the pointer is already captured elsewhere, which must not abort the seek.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* drag still works, just not outside the rail */
    }
    draggingRef.current = true;
    setDragging(true);
    seek(event.clientY);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (draggingRef.current) seek(event.clientY);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    draggingRef.current = false;
    setDragging(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const step = (delta: number): void => {
      event.preventDefault();
      onChange(clamp(value + delta, 1, count));
    };
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        return step(1);
      case "ArrowUp":
      case "ArrowLeft":
        return step(-1);
      case "PageDown":
        return step(5);
      case "PageUp":
        return step(-5);
      case "Home":
        event.preventDefault();
        return onChange(1);
      case "End":
        event.preventDefault();
        return onChange(count);
      default:
        return undefined;
    }
  };

  const first = spread[0] ?? 0;
  const thumbY = spread[value - 1] ?? first;
  const last = spread[spread.length - 1] ?? first;
  const boundarySet = useMemo(() => new Set(boundaries), [boundaries]);

  return (
    <div
      className={`rail rail-map${dragging ? " rail-dragging" : ""}`}
      ref={railRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="rail-track" style={{ top: first, height: Math.max(0, last - first) }} />
      <div
        className="rail-fill"
        style={{ top: first, height: Math.max(0, thumbY - first) }}
      />

      {spread.map((y, i) => (
        <span
          key={i}
          className={[
            "rail-tick",
            i < value ? "rail-tick-on" : "",
            dense ? "rail-tick-dense" : "",
            boundarySet.has(i) ? "rail-tick-start" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ top: y }}
        />
      ))}

      <div
        className="rail-thumb"
        style={{ top: thumbY }}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-orientation="vertical"
        aria-valuemin={1}
        aria-valuemax={count}
        aria-valuenow={value}
        aria-valuetext={
          valueLabel === undefined
            ? `${value} of ${count} sentences revealed`
            : `${value} of ${count} sentences revealed — ${valueLabel}`
        }
        onKeyDown={onKeyDown}
      >
        <span className="rail-thumb-grip" />
        <span className="rail-thumb-count">
          {value}/{count}
        </span>
      </div>
    </div>
  );
};
