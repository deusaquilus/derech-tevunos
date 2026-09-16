import { useCallback, useEffect, useState } from "react";

import { FAMILY_ORDER, type Family } from "../../anatomy.ts";

/** Which families of the chapter 1–8 layer are showing. */
export type Lenses = Record<Family, boolean>;

export const ALL_LENSES: Lenses = {
  speakers: true,
  anatomy: true,
  relations: true,
  deductions: true,
  grounds: true,
};

/** The layer's switchable state, as the reader left it. */
export type AnatomyLayerState = {
  readonly on: boolean;
  readonly lenses: Lenses;
};

/**
 * Off until the reader turns it on. The layer is a second vocabulary over the
 * one the page already asks a first-time reader to learn, and the legend is
 * where they will find the switch.
 */
export const DEFAULT_LAYER: AnatomyLayerState = { on: false, lenses: ALL_LENSES };

const STORAGE_KEY = "sugya-lattice.anatomy";

/**
 * A remembered lens setting, family by family. A family the stored record
 * does not know — one added since the reader last visited, as `grounds` was
 * in v6 — is shown, which is what every family is by default; the reader's
 * choices about the others are kept.
 */
const lensesOf = (value: unknown): Lenses => {
  const stored = typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  return Object.fromEntries(
    FAMILY_ORDER.map((f) => [f, typeof stored[f] === "boolean" ? stored[f] : ALL_LENSES[f]]),
  ) as Lenses;
};

const read = (): AnatomyLayerState => {
  if (typeof window === "undefined") return DEFAULT_LAYER;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return DEFAULT_LAYER;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return DEFAULT_LAYER;
    const { on, lenses } = parsed as { on?: unknown; lenses?: unknown };
    return {
      on: typeof on === "boolean" ? on : DEFAULT_LAYER.on,
      lenses: lensesOf(lenses),
    };
  } catch {
    return DEFAULT_LAYER;
  }
};

const write = (state: AnatomyLayerState): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable: the choice lasts for the session only.
  }
};

export type AnatomyLayer = AnatomyLayerState & {
  readonly setOn: (on: boolean) => void;
  readonly toggleLens: (family: Family) => void;
};

/**
 * The master switch and the per-family lenses, remembered between visits.
 * Nothing else about the layer is stateful: what it shows on each row is
 * derived from the annotations by the controller.
 */
export const useAnatomyLayer = (): AnatomyLayer => {
  const [state, setState] = useState<AnatomyLayerState>(read);

  useEffect(() => {
    write(state);
  }, [state]);

  const setOn = useCallback((on: boolean) => setState((s) => ({ ...s, on })), []);
  const toggleLens = useCallback(
    (family: Family) =>
      setState((s) => ({ ...s, lenses: { ...s.lenses, [family]: !s.lenses[family] } })),
    [],
  );

  return { ...state, setOn, toggleLens };
};
