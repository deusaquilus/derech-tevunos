import type { Sugya } from "../../sugya.ts";
import { bavaKammaToldos } from "./bk-2a-toldos.ts";
import { bavaMetziaOchazin } from "./bm-2a-ochazin.ts";
import { gittinBefanai } from "./git-2a-befanai.ts";
import { pesachimOr } from "./pes-2a-or.ts";

/**
 * The passages the nested-rail study was run on, here so the folds and the
 * chain of rails can be judged on the pages that produce them: the four
 * Ramchal fixtures have no long-reaching move, and Bava Metzia 21b–22b never
 * nests beyond one frame. Whether these stay in the gallery once the
 * visualization has been judged is an open decision.
 */
export const RESEARCH_FIXTURES: readonly Sugya[] = [
  bavaMetziaOchazin,
  bavaKammaToldos,
  pesachimOr,
  gittinBefanai,
];

export { bavaKammaToldos, bavaMetziaOchazin, gittinBefanai, pesachimOr };
