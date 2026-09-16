import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

import type { Point } from "../../layout.ts";

export type IconPositions = {
  /** Centre of each row's icon, relative to the container. */
  readonly positions: ReadonlyMap<string, Point>;
  readonly register: (id: string) => (el: HTMLDivElement | null) => void;
  readonly height: number;
};

const samePositions = (
  a: ReadonlyMap<string, Point>,
  b: ReadonlyMap<string, Point>,
): boolean => {
  if (a.size !== b.size) return false;
  for (const [id, point] of a) {
    const other = b.get(id);
    if (other === undefined) return false;
    if (Math.abs(other.x - point.x) > 0.5 || Math.abs(other.y - point.y) > 0.5) return false;
  }
  return true;
};

/**
 * Measures where each row's icon landed after layout.
 *
 * Row heights depend on how the browser wraps the text, so the rail's tick
 * positions and the connector endpoints cannot be computed up front. Revealing
 * a sentence changes only opacity, never layout, so this re-runs on resize
 * rather than on every slider move.
 */
export const useIconPositions = (
  containerRef: RefObject<HTMLElement | null>,
  ids: readonly string[],
): IconPositions => {
  const nodes = useRef(new Map<string, HTMLDivElement>());
  const callbacks = useRef(new Map<string, (el: HTMLDivElement | null) => void>());
  const [positions, setPositions] = useState<ReadonlyMap<string, Point>>(new Map());
  const [height, setHeight] = useState(0);

  const register = useCallback((id: string) => {
    const existing = callbacks.current.get(id);
    if (existing !== undefined) return existing;
    const callback = (el: HTMLDivElement | null): void => {
      if (el === null) nodes.current.delete(id);
      else nodes.current.set(id, el);
    };
    callbacks.current.set(id, callback);
    return callback;
  }, []);

  const measure = useCallback((): void => {
    const container = containerRef.current;
    if (container === null) return;
    const base = container.getBoundingClientRect();
    const next = new Map<string, Point>();
    for (const [id, el] of nodes.current) {
      const box = el.getBoundingClientRect();
      next.set(id, {
        x: box.left - base.left + box.width / 2,
        y: box.top - base.top + box.height / 2,
      });
    }
    setPositions((prev) => (samePositions(prev, next) ? prev : next));
    setHeight((prev) => (Math.abs(prev - base.height) < 0.5 ? prev : base.height));
  }, [containerRef]);

  useLayoutEffect(() => {
    measure();
  }, [measure, ids]);

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) return undefined;
    const observer = new ResizeObserver(() => measure());
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, measure]);

  return { positions, register, height };
};
