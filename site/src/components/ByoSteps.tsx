import type { JSX, ReactNode } from 'react';

import styles from './Byo.module.css';

const REPO = 'https://github.com/deusaquilus/derech-tevunos';
const SKILL_DIR = `${REPO}/tree/main/skills/derech-tevunos-sugya-json`;
const REPO_ZIP = `${REPO}/archive/refs/heads/main.zip`;
const SEFARIA_MCP = 'https://mcp.sefaria.org/sse';
const SEFARIA_MCP_GUIDE = 'https://developers.sefaria.org/docs/the-sefaria-mcp';

/**
 * What fills the sheet on `/byo` until a file is open: what the page is for,
 * and the four steps from a passage on Sefaria to a file drawn here.
 *
 * Static prose, with one moving part. `open` is the drop zone, the paste box
 * and the fault list, which the loader owns and renders into the last step —
 * "put the file here" is the last step, so the controls sit where the reader
 * arrives at it. The loader is also the drop target for the whole sheet, so a
 * file dragged onto step one lands the same as one dragged onto the zone.
 */
export const ByoSteps = ({ open }: { readonly open: ReactNode }): JSX.Element => (
  <>
    <h1 className={styles.head}>Bring your own sugya</h1>

    <p className={styles.lede}>
      This page draws a sugya file you supply. The file is JSON in the{' '}
      <code>derech-tevunos/sugya</code> format: a passage's sentences in order, each labelled
      with the move it makes in Ramchal's vocabulary (a question, its answer, a proof, an
      objection, a resolution). Open one here and it is drawn with the same waterfall the{' '}
      <a href="/sugya">shipped passages</a> use, every row, rail, fold and badge. Nothing is
      uploaded: the file is read in this tab and kept for this browser session only.
    </p>
    <p className={styles.lede}>
      You don't write the file by hand. An agent writes it from the passage's text, with a
      skill that carries the whole system, and this page is where you check its work. Four
      steps.
    </p>

    <ol className={styles.steps}>
      <li>
        <h2>Get the passage from Sefaria</h2>
        <p>
          Pick a passage. A self-contained exchange of five to twenty sentences (a ruling, an
          objection, the answer, the Gemara's last word) is the right size for a first file.
          Then get its Hebrew and English, either way:
        </p>
        <ul>
          <li>
            <strong>With the Sefaria MCP server.</strong> Sefaria runs a public MCP endpoint,{' '}
            <code>{SEFARIA_MCP}</code>, with no key or account. Add that URL to your agent's MCP
            settings (Cursor, Claude Code and most local agents take one;{' '}
            <a href={SEFARIA_MCP_GUIDE}>Sefaria's page</a> has the clicks for each). The agent
            can then fetch a passage by reference, "Bava Metzia 2a", in both languages.
          </li>
          <li>
            <strong>By hand.</strong> Open the passage on{' '}
            <a href="https://www.sefaria.org">sefaria.org</a>, copy the Hebrew and the English,
            and paste them into the chat. The raw JSON is one URL away too:{' '}
            <code>https://www.sefaria.org/api/v3/texts/Bava_Metzia.2a</code>.
          </li>
        </ul>
      </li>

      <li>
        <h2>Install the skill</h2>
        <p>
          The labelling system ships as one <em>skill</em>: a folder with a <code>SKILL.md</code>{' '}
          the agent reads when you name it or when the task matches. Cursor, Claude Code, Codex
          and most local agents use this same format. This one is{' '}
          <code>derech-tevunos-sugya-json</code>. It carries the procedure, the closed vocabulary
          of moves, and the full guide with four worked passages.
        </p>
        <ul>
          <li>
            <strong>One command:</strong> <code>npx skills add deusaquilus/derech-tevunos</code>{' '}
            installs it into whichever agents you have.
          </li>
          <li>
            <strong>Or download it.</strong> The folder is{' '}
            <a href={SKILL_DIR}>skills/derech-tevunos-sugya-json</a> in the repository (or take
            the <a href={REPO_ZIP}>whole repository as a zip</a> and pull the folder out). Copy it
            into <code>.cursor/skills/</code> for Cursor, <code>.claude/skills/</code> for Claude
            Code, or <code>.agents/skills/</code> for Codex and the rest. The same folders under
            your home directory (<code>~/.cursor/skills/</code>, <code>~/.claude/skills/</code>)
            make it available in every project.
          </li>
        </ul>
      </li>

      <li>
        <h2>Run the skill on the passage</h2>
        <p>Name the skill and the passage in one prompt:</p>
        <p className={styles.prompt}>
          Using the derech-tevunos-sugya-json skill, fetch Bava Metzia 2a from Sefaria and write
          it as a sugya file.
        </p>
        <p>
          The agent splits the text into one unit per move, labels each with its move, target,
          marker and provenance, records every judgment call in a <code>note</code>, and writes{' '}
          <code>&lt;id&gt;.json</code>. Read the notes. Where two labels were defensible the
          agent picked one and said why, and that is where your own reading of the passage comes
          in.
        </p>
      </li>

      <li>
        <h2>Open the file here</h2>
        <p>
          Drop the <code>.json</code> anywhere on this page, choose it, or paste its text. It
          goes through the same parser the shipped passages go through. A file that passes is
          drawn at once. A file that fails is refused with every fault listed by its JSON path,
          and that list is what you hand back to the agent. Fix, reopen, repeat: a sentence
          labelled wrong takes the drawing with it, and you see it before you finish reading the
          row.
        </p>
        {open}
      </li>
    </ol>

    <p className={styles.help}>
      The field-by-field reference is{' '}
      <a href={`${REPO}/blob/main/SUGYA_JSON_FORMAT.md`}>SUGYA_JSON_FORMAT.md</a>; the vocabulary
      of moves is <a href="/docs/text/chapter-09">chapter 9</a>; any of the{' '}
      <a href="/sugya">shipped passages</a> opens here unchanged.{' '}
      <a href="/about">Why this exists</a>.
    </p>
  </>
);
