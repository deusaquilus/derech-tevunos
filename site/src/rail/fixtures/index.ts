import type { Sugya } from "../sugya.ts";
import { bavaMetziaYeush } from "./bava-metzia-yeush.ts";
import { berachosYaakov } from "./berachos-yaakov.ts";
import { pesachimLiquids } from "./pesachim-liquids.ts";
import { RESEARCH_FIXTURES } from "./research/index.ts";
import { yebamosChalitzah } from "./yebamos-chalitzah.ts";
import { yebamosDeafMute } from "./yebamos-deafmute.ts";

/** The passages Ramchal discusses, and the one long dispute labelled from his markers. */
export const RAMCHAL_FIXTURES: readonly Sugya[] = [
  pesachimLiquids,
  berachosYaakov,
  yebamosChalitzah,
  yebamosDeafMute,
  bavaMetziaYeush,
];

/**
 * The Ramchal passages, then the research passages — as TypeScript. The app
 * reads the same passages from `sugyot/*.json`; these are the oracle
 * `check.ts` holds those files to, passage by passage: same data, same
 * analysis, same drawing.
 */
export const FIXTURES: readonly Sugya[] = [...RAMCHAL_FIXTURES, ...RESEARCH_FIXTURES];

export {
  bavaMetziaYeush,
  berachosYaakov,
  pesachimLiquids,
  RESEARCH_FIXTURES,
  yebamosChalitzah,
  yebamosDeafMute,
};
export { bavaKammaToldos, bavaMetziaOchazin, gittinBefanai, pesachimOr } from "./research/index.ts";
