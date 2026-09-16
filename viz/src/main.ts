import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { renderSugya } from "./render.ts";
import { analyze, type Sugya } from "./sugya.ts";
import { SUGYOT } from "./sugyot/index.ts";
import { describe } from "./taxonomy.ts";

const summarise = (sugya: Sugya): string => {
  const analysis = analyze(sugya);
  const lines = sugya.units.map((unit) => {
    const leaf = describe(unit.move);
    const depth = analysis.depth.get(unit.id) ?? 0;
    const standing = analysis.standing.get(unit.id) ?? "live";
    const status = analysis.contested.has(unit.id)
      ? ` status=${analysis.status.get(unit.id)}`
      : "";
    const indent = "  ".repeat(depth);
    return `  ${indent}${leaf.chip}  ${unit.id.padEnd(12)} ${leaf.en} (${leaf.he})  standing=${standing}${status}`;
  });
  return [`${sugya.tractate} ${sugya.folio} — ${sugya.title}`, ...lines].join("\n");
};

const main = async (): Promise<void> => {
  const outDir = join(import.meta.dirname, "..", "out");
  await mkdir(outDir, { recursive: true });

  for (const sugya of SUGYOT) {
    const svg = renderSugya(sugya);
    await writeFile(join(outDir, `${sugya.id}.svg`), svg, "utf8");
    console.log(summarise(sugya));
    console.log();
  }

  const index = `<!doctype html>
<meta charset="utf-8">
<title>Sugya lattices — Derech Tevunos ch. 9</title>
<style>
  body { font: 14px/1.5 ui-sans-serif, system-ui, sans-serif; margin: 0 auto; padding: 32px; max-width: 960px; color: #1c1917; }
  img { display: block; width: 100%; border: 1px solid #e7e5e4; border-radius: 8px; margin-bottom: 32px; }
</style>
<h1>Sugya lattices</h1>
<p>Each sentence carries one glyph naming the move it makes, per <em>Derech Tevunos</em> ch. 9.</p>
${SUGYOT.map((s) => `<img src="${s.id}.svg" alt="${s.tractate} ${s.folio}">`).join("\n")}
`;
  await writeFile(join(outDir, "index.html"), index, "utf8");
  console.log(`Wrote ${SUGYOT.length} diagrams to ${outDir}`);
};

await main();
