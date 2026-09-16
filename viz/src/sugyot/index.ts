/**
 * The passages the app ships with, read from the JSON files beside this
 * module through `parseSugya`, so a file that would not load on the page
 * fails here first — at import, with every fault named. Order is gallery
 * and tab order: the book's passages, then the research passages. To add a
 * passage, drop its file here and add one line to `FILES`; the format is
 * `SUGYA_JSON_FORMAT.md`.
 */

import { parseSugya } from "../format.ts";
import type { Collection, Sugya } from "../sugya.ts";

import bavaMetziaYeush from "./bava-metzia-yeush.json" with { type: "json" };
import berachosYaakov from "./berachos-yaakov.json" with { type: "json" };
import bavaKammaToldos from "./bk-2a-toldos.json" with { type: "json" };
import bavaMetziaOchazin from "./bm-2a-ochazin.json" with { type: "json" };
import gittinBefanai from "./git-2a-befanai.json" with { type: "json" };
import pesachimOr from "./pes-2a-or.json" with { type: "json" };
import pesachimLiquids from "./pesachim-liquids.json" with { type: "json" };
import yebamosChalitzah from "./yebamos-chalitzah.json" with { type: "json" };
import yebamosDeafMute from "./yebamos-deafmute.json" with { type: "json" };

const FILES: readonly (readonly [name: string, raw: unknown])[] = [
  ["pesachim-liquids.json", pesachimLiquids],
  ["berachos-yaakov.json", berachosYaakov],
  ["yebamos-chalitzah.json", yebamosChalitzah],
  ["yebamos-deafmute.json", yebamosDeafMute],
  ["bava-metzia-yeush.json", bavaMetziaYeush],
  ["bm-2a-ochazin.json", bavaMetziaOchazin],
  ["bk-2a-toldos.json", bavaKammaToldos],
  ["pes-2a-or.json", pesachimOr],
  ["git-2a-befanai.json", gittinBefanai],
];

/** Every passage with a page, in gallery order. */
export const SUGYOT: readonly Sugya[] = FILES.map(([name, raw]) => parseSugya(raw, `sugyot/${name}`));

export const ofCollection = (collection: Collection | undefined): readonly Sugya[] =>
  SUGYOT.filter((s) => s.collection === collection);

export const sugyaById = (id: string): Sugya | undefined => SUGYOT.find((s) => s.id === id);
