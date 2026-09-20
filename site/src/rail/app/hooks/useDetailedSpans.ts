import { useCallback, useEffect, useState } from "react";

/**
 * The word-span layer's one switch. Off — the default, and the state a first
 * visit finds — a span the file marked `showLoud` is a hairline dotted
 * underline at a trace of the role's hue, and every other span is a hairline
 * in a taupe that nearly blends into the paper: no hue, no icon, its name on
 * hover. On, every span is drawn the loud way — which is still a whisper. The
 * distinction is the classifier's, made in the file (`spans.ts`, `LoudSpan`);
 * the switch only decides whether the reader sees the quiet ones as anything
 * more than a hint.
 *
 * Remembered between visits, like the anatomy layer's switch.
 */
const STORAGE_KEY = "sugya-lattice.spans.detailed.v1";

const read = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const write = (on: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(on));
  } catch {
    // Storage unavailable: the choice lasts for the session only.
  }
};

export type DetailedSpans = {
  readonly on: boolean;
  readonly setOn: (on: boolean) => void;
};

export const useDetailedSpans = (): DetailedSpans => {
  const [on, setOnState] = useState<boolean>(read);
  useEffect(() => {
    write(on);
  }, [on]);
  const setOn = useCallback((next: boolean): void => setOnState(next), []);
  return { on, setOn };
};
