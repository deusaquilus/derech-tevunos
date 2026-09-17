/**
 * The file the reader opened on `/byo`, kept for this tab.
 *
 * What is stored is the file, not the parsed passage: `toJson` out, the same
 * `parseSugya` the file went through on the way in. The two shapes differ — a
 * unit's target, marker and attestation sit under `move` in the file and at
 * the top of the unit in the model — so storing the model would be storing
 * something the reader refuses.
 *
 * `sessionStorage`, so a reload on `/byo` keeps the drawing and a new tab
 * starts empty. Nothing is uploaded anywhere: the file is parsed in this tab
 * and never leaves it, which is the one thing about this page worth promising.
 */

import { parseSugya, toJson, type SugyaJson } from '../rail/format.ts';
import type { Sugya } from '../rail/sugya.ts';

const STORAGE_KEY = 'derech-tevunos.byo';

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

/**
 * The stored file, or nothing. A file that no longer parses is dropped rather
 * than reported: the reader did not just offer it, the format did — this runs
 * on mount, and the only way to reach it is a reload after an edit to the
 * reader itself.
 */
export const readOpened = (): Opened | undefined => {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return undefined;
    const stored = JSON.parse(raw) as Partial<Stored>;
    const source = typeof stored.source === 'string' ? stored.source : 'the stored file';
    return { sugya: parseSugya(stored.file, source), source };
  } catch {
    return undefined;
  }
};

export const writeOpened = (opened: Opened | undefined): void => {
  try {
    if (opened === undefined) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    const stored: Stored = { source: opened.source, file: toJson(opened.sugya) };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage full or unavailable: the passage still shows for this page load.
  }
};
