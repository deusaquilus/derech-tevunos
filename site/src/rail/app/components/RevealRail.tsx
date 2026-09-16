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
 * `aligned` puts a tick at the measured centre of every sentence, so dragging
 * down is dragging through the passage. That is the better control and it is
 * why this is not an `<input type="range">` — but it only works while the
 * passage fits on a screen or two. Past that the rail is taller than the
 * viewport, the thumb spends most of its life scrolled off, and a drag cannot
 * reach the far end without the pointer leaving the window.
 *
 * `map` gives that up deliberately: the rail sticks to the viewport at a fixed
 * height and the ticks are evenly spaced, so it is a map of the argument rather
 * than a gutter beside it. Alignment is lost; reachability is what replaces it.
 */
export type RailVariant = "aligned" | "map";

export type RevealRailProps = {
  readonly count: number;
  /** How many sentences are revealed, 1-based. */
  readonly value: number;
  readonly onChange: (next: number) => void;
  /** Vertical centre of each sentence's icon. Used by `aligned` only. */
  readonly ticks: readonly number[];
  /** Indices, 0-based, where a new movement of the argument begins. */
  readonly boundaries?: readonly number[];
  readonly variant?: RailVariant;
  readonly valueLabel?: string;
  readonly label: string;
};

const MAP_PAD = 14;

const clamp = (n: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, n));

export const RevealRail = ({
  count,
  value,
  onChange,
  ticks,
  boundaries = [],
  variant = "aligned",
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

  // In `map` the rail owns its own geometry: it is sticky, so its height comes
  // from the viewport rather than from the rows.
  useEffect(() => {
    const rail = railRef.current;
    if (rail === null || variant !== "map") return undefined;
    const observer = new ResizeObserver(() => {
      const next = rail.getBoundingClientRect().height;
      setRailHeight((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
    });
    observer.observe(rail);
    return () => observer.disconnect();
  }, [variant]);

  const spread = useMemo(() => {
    if (variant !== "map") return ticks;
    const usable = Math.max(0, railHeight - 2 * MAP_PAD);
    return Array.from(
      { length: count },
      (_, i) => MAP_PAD + (usable * i) / Math.max(1, count - 1),
    );
  }, [variant, ticks, count, railHeight]);

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
  const dense = variant === "map";
  const boundarySet = useMemo(() => new Set(boundaries), [boundaries]);

  return (
    <div
      className={`rail rail-${variant}${dragging ? " rail-dragging" : ""}`}
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
