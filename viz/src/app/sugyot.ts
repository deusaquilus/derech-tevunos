/**
 * The passages the lattice shows, and the files the loader page has opened.
 * Those two lists do not mix: an opened file lives on `#/open` and does not
 * join the shipped tabs or replace a shipped passage.
 *
 * What is stored is the file, not the parsed passage: `toJson` out, the same
 * `parseSugya` the file went through on the way in. The two shapes differ —
 * a unit's target, marker and attestation sit under `move` in the file and at
 * the top of the unit in the model — so storing the model would be storing
 * something the reader refuses. Opened passages live in `sessionStorage`, so
 * a reload on `#/open/<id>` keeps them and a new tab does not.
 */

import { useSyncExternalStore } from "react";

import { parseSugya, toJson, type SugyaJson } from "../format.ts";
import type { Sugya } from "../sugya.ts";
import { SUGYOT } from "../sugyot/index.ts";

const STORAGE_KEY = "sugya-lattice.opened";

/** A passage the reader opened, with the name of the file it came from. */
export type Opened = {
  readonly sugya: Sugya;
  /** The file name, or `pasted text` — what the faults would have been named after. */
  readonly source: string;
};

/** What sits in `sessionStorage`: the file itself, plus where it came from. */
type Stored = {
  readonly source: string;
  readonly file: SugyaJson;
};

const listeners = new Set<() => void>();

const read = (): readonly Opened[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item, i) => {
      const stored = item as Partial<Stored>;
      const source = typeof stored.source === "string" ? stored.source : `opened[${i}]`;
      try {
        return [{ sugya: parseSugya(stored.file, source), source }];
      } catch {
        return [];
      }
    });
  } catch {
    return [];
  }
};

let opened: readonly Opened[] = read();

const write = (next: readonly Opened[]): void => {
  opened = next;
  try {
    const stored: readonly Stored[] = next.map((o) => ({ source: o.source, file: toJson(o.sugya) }));
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage full or unavailable: the passage still shows for this page load.
  }
  for (const fn of listeners) fn();
};

/** Add (or replace) a passage the reader opened. Returns it, parsed. */
export const openSugya = (raw: unknown, source: string): Sugya => {
  const sugya = parseSugya(raw, source);
  write([...opened.filter((o) => o.sugya.id !== sugya.id), { sugya, source }]);
  return sugya;
};

export const forgetOpened = (): void => write([]);

/** Drop one opened passage. */
export const forgetOne = (id: string): void => write(opened.filter((o) => o.sugya.id !== id));

const subscribe = (fn: () => void): (() => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

/** The nine passages the lattice ships with. An opened file is not among them. */
export const useSugyot = (): readonly Sugya[] => SUGYOT;

export const useOpened = (): readonly Opened[] =>
  useSyncExternalStore(subscribe, () => opened, () => opened);
