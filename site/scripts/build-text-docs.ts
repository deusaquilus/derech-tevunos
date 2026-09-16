/**
 * Split the bilingual Derech Tevunos into one docs page per chapter.
 *
 * Source: `../DerechTevunos_benyehudah_bilingual_fixed.md` — the copy whose
 * English terminology is aligned to the Diaspora Yeshiva translation, which
 * AGENTS.md says to prefer. Output: `src/content/docs/text/*.md`, which is
 * **generated and gitignored**. Do not hand-edit those files; edit the source
 * or this script.
 *
 * The source is organised as `## Chapter N · פרק א`, then `### עברית`, then
 * `### English`. The reader asked for the two stacked in that order, which is
 * also how the source reads, so this does not attempt to pair paragraphs into
 * columns. (It could: the languages run 174 paragraphs each in the same order.
 * But the longest Hebrew paragraph is 7211 characters, so a column layout
 * desynchronizes immediately and would need a per-paragraph grid. See
 * `prose.css`, "Bilingual chapter layout".)
 *
 * ── THE TWO THINGS THAT ARE EASY TO GET WRONG ───────────────────────────────
 *
 * 1. A whole-Hebrew paragraph needs `dir="rtl"`, and the wrapper has to be
 *    written so that CommonMark still parses its contents as Markdown. A raw
 *    HTML block swallows everything up to a blank line, so the wrapper is
 *    emitted with blank lines inside it — `<div …>\n\n …md… \n\n</div>` — which
 *    closes the HTML block and reopens Markdown parsing for the body. Wrapping
 *    tightly (`<div …>text</div>`) silently disables every link and emphasis
 *    inside the chapter.
 *
 * 2. A Hebrew phrase quoted inside an English sentence must be bidi-ISOLATED,
 *    not merely marked. `"…" (הוא מותיב לה והוא מפרק לה)` puts its parentheses
 *    on the wrong side otherwise, because parentheses, quotes and digits are
 *    bidi-neutral and resolve against whichever run wins. Measured on the
 *    source: 357 lines carry Hebrew, 172 of those also carry Latin, 205 carry
 *    parentheses and 166 carry digits. So this is the common case, not an edge
 *    case. `wrapInlineHebrew` emits `<span lang="he">` around each run and
 *    `prose.css` applies `unicode-bidi: isolate`.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(here, '..', '..');
const SOURCE = path.join(repoRoot, 'DerechTevunos_benyehudah_bilingual_fixed.md');
const OUT_DIR = path.join(here, '..', 'src', 'content', 'docs', 'text');

const CATEGORY = 'The text';

/** Any Hebrew letter, including the presentation forms and the alphabetic block. */
const HEBREW_CHAR = /[\u0590-\u05FF\uFB1D-\uFB4F]/;
/**
 * One inline Hebrew run: Hebrew letters plus the marks and separators that
 * belong *inside* a run (maqaf, geresh, gershayim, spaces between words).
 * Trailing neutrals are excluded so the isolation wraps the phrase, not the
 * punctuation around it.
 */
const HEBREW_RUN = /[\u0590-\u05FF\uFB1D-\uFB4F]+(?:[\s\u05BE'"״׳-]+[\u0590-\u05FF\uFB1D-\uFB4F]+)*/g;

// ── Model ───────────────────────────────────────────────────────────────────

type Language = 'he' | 'en';

/** A run of paragraphs in one language. */
type LangBlock = {
  readonly lang: Language;
  /** The block's own first line in the source, which is the chapter's summary. */
  readonly summary: string;
  /** Everything after the summary line. */
  readonly body: readonly string[];
};

type Section =
  | { readonly kind: 'chapter'; readonly n: number; readonly hebrew: string; readonly blocks: readonly LangBlock[] }
  | { readonly kind: 'plain'; readonly title: string; readonly paragraphs: readonly string[] };

// ── Parsing (pure) ──────────────────────────────────────────────────────────

const paragraphsOf = (raw: string): readonly string[] =>
  raw
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

/** `## Chapter 1 · פרק א` → `{ n: 1, hebrew: 'פרק א' }`. */
const parseChapterHeading = (
  heading: string,
): { readonly n: number; readonly hebrew: string } | undefined => {
  const m = /^Chapter\s+(\d+)\s*[·|]\s*(.+)$/.exec(heading.trim());
  if (m === null) return undefined;
  const n = Number(m[1]);
  return Number.isNaN(n) ? undefined : { n, hebrew: (m[2] ?? '').trim() };
};

const langOf = (heading: string): Language | undefined => {
  const h = heading.trim();
  if (h === 'עברית') return 'he';
  if (h === 'English') return 'en';
  return undefined;
};

const toLangBlock = (lang: Language, raw: string): LangBlock => {
  const [summary = '', ...body] = paragraphsOf(raw);
  return { lang, summary, body };
};

/**
 * Split the document on `## ` headings.
 *
 * Returns the preamble (everything before the first `##`) separately, because
 * it is the source's own explanation of what the two files are and of the
 * `[ed.]` brackets — provenance the reader needs, and not a chapter.
 */
const splitDocument = (
  md: string,
): { readonly preamble: string; readonly sections: readonly Section[] } => {
  const parts = md.split(/^## (.+)$/m);
  const preamble = (parts[0] ?? '').replace(/^# .*$/m, '').trim();

  const sections: Section[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i] ?? '';
    const bodyRaw = parts[i + 1] ?? '';
    const chapter = parseChapterHeading(heading);

    if (chapter === undefined) {
      sections.push({ kind: 'plain', title: heading.trim(), paragraphs: paragraphsOf(bodyRaw) });
      continue;
    }

    // Inside a chapter, `### עברית` / `### English` delimit the two languages.
    const sub = bodyRaw.split(/^### (.+)$/m);
    const blocks = sub
      .slice(1)
      .reduce<LangBlock[]>((acc, piece, idx, all) => {
        if (idx % 2 !== 0) return acc;
        const lang = langOf(piece);
        return lang === undefined ? acc : [...acc, toLangBlock(lang, all[idx + 1] ?? '')];
      }, []);

    sections.push({ kind: 'chapter', n: chapter.n, hebrew: chapter.hebrew, blocks });
  }

  return { preamble, sections };
};

// ── Rendering (pure) ────────────────────────────────────────────────────────

/**
 * Isolate every inline Hebrew run in an otherwise-Latin paragraph.
 *
 * Skipped when the paragraph is Hebrew-dominant — the enclosing block already
 * carries `dir="rtl"` there, and wrapping every word would be noise. Skipped
 * inside backtick spans too: a code span is rendered verbatim, so injecting a
 * tag into one would print the tag.
 */
export const wrapInlineHebrew = (text: string): string => {
  const hebrewChars = (text.match(new RegExp(HEBREW_CHAR, 'g')) ?? []).length;
  const latinChars = (text.match(/[A-Za-z]/g) ?? []).length;
  if (hebrewChars === 0 || hebrewChars > latinChars) return text;

  // Split on code spans so replacement never reaches inside one.
  return text
    .split(/(`[^`]*`)/g)
    .map((piece) =>
      piece.startsWith('`')
        ? piece
        : piece.replace(HEBREW_RUN, (run) => `<span lang="he">${run}</span>`),
    )
    .join('');
};

/**
 * Wrap a run of paragraphs in a direction-carrying block.
 *
 * The blank lines after the opening tag and before the closing tag are
 * REQUIRED, not cosmetic: they terminate the raw-HTML block so CommonMark
 * resumes parsing Markdown for the body. See the file header.
 */
const langBlockHtml = (lang: Language, paragraphs: readonly string[]): string => {
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const body = paragraphs
    .map((p) => (lang === 'he' ? p : wrapInlineHebrew(p)))
    .join('\n\n');
  return `<div class="dt-lang-block" lang="${lang}" dir="${dir}">\n\n${body}\n\n</div>`;
};

const LABEL: Record<Language, string> = { he: 'עברית · Hebrew', en: 'English' };

const yamlString = (s: string): string => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

const frontmatter = (fields: Record<string, string | number>): string =>
  ['---', ...Object.entries(fields).map(([k, v]) => `${k}: ${typeof v === 'number' ? v : yamlString(v)}`), '---'].join(
    '\n',
  );

/** Trim a summary line down to something that fits a meta description. */
const asDescription = (s: string, fallback: string): string => {
  const clean = s.replace(/\s+/g, ' ').trim();
  if (clean.length === 0) return fallback;
  return clean.length <= 155 ? clean : `${clean.slice(0, 152).trimEnd()}…`;
};

const renderChapter = (
  section: Extract<Section, { kind: 'chapter' }>,
  order: number,
): { readonly slug: string; readonly contents: string } => {
  const english = section.blocks.find((b) => b.lang === 'en');
  const summary = english?.summary ?? '';

  const body = section.blocks
    .map((b) => {
      const paragraphs = b.summary.length > 0 ? [b.summary, ...b.body] : [...b.body];
      return [`<p class="dt-lang-heading">${LABEL[b.lang]}</p>`, '', langBlockHtml(b.lang, paragraphs)].join('\n');
    })
    .join('\n\n');

  const slug = `chapter-${String(section.n).padStart(2, '0')}`;
  const title = `Chapter ${section.n} · ${section.hebrew}`;

  return {
    slug,
    contents: [
      frontmatter({
        title,
        description: asDescription(summary, `Derech Tevunos, chapter ${section.n}, Hebrew and English.`),
        category: CATEGORY,
        order,
        kind: 'text',
      }),
      '',
      body,
      '',
    ].join('\n'),
  };
};

/**
 * A `##` section that is not a chapter — today only the Sugya Context Index,
 * which has its own `### Seder …` structure and no language split. Its entries
 * mix Hebrew citations into English prose, so every paragraph goes through the
 * inline isolation.
 */
const renderPlain = (
  section: Extract<Section, { kind: 'plain' }>,
  order: number,
): { readonly slug: string; readonly contents: string } => {
  const slug = section.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Keep `### Seder …` headings as headings; isolate Hebrew everywhere else.
  const body = section.paragraphs
    .map((p) => (p.startsWith('#') ? p : wrapInlineHebrew(p)))
    .join('\n\n');

  return {
    slug,
    contents: [
      frontmatter({
        title: section.title,
        description:
          'Every passage cited in Derech Tevunos, with the context of the sugya it comes from, written from the source text.',
        category: CATEGORY,
        order,
        kind: 'text',
      }),
      '',
      body,
      '',
    ].join('\n'),
  };
};

const renderAbout = (preamble: string): string =>
  [
    frontmatter({
      title: 'About this text',
      description:
        'What this edition of Derech Tevunos is: the 1742 Amsterdam Hebrew as keyed by Project Ben-Yehuda, and a clean-room English translation of it.',
      category: CATEGORY,
      order: 0,
      kind: 'prose',
    }),
    '',
    preamble
      .split(/\n{2,}/)
      .map((p) => wrapInlineHebrew(p.trim()))
      .filter((p) => p.length > 0)
      .join('\n\n'),
    '',
  ].join('\n');

// ── Effects ─────────────────────────────────────────────────────────────────

const main = (): void => {
  if (!fs.existsSync(SOURCE)) {
    console.error(`✗ Source text not found: ${SOURCE}`);
    process.exit(1);
  }

  const md = fs.readFileSync(SOURCE, 'utf-8');
  const { preamble, sections } = splitDocument(md);

  const chapters = sections.filter(
    (s): s is Extract<Section, { kind: 'chapter' }> => s.kind === 'chapter',
  );
  const plains = sections.filter((s): s is Extract<Section, { kind: 'plain' }> => s.kind === 'plain');

  if (chapters.length === 0) {
    console.error('✗ No chapters parsed. The source headings may have changed shape.');
    process.exit(1);
  }

  // Write in place, then remove what is stale — never `rmSync` the directory.
  // `astro dev` watches this directory, and a delete-and-recreate makes its
  // content layer drop every chapter and not pick the new files up: the
  // routes 404 until the server restarts. Measured 2026-09-16 after running
  // `npm run build` beside a live dev server. Overwriting files is a change
  // the watcher handles; a vanishing directory is not.
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const written: string[] = [];

  fs.writeFileSync(path.join(OUT_DIR, 'about.md'), renderAbout(preamble), 'utf-8');
  written.push('about');

  for (const chapter of chapters) {
    const { slug, contents } = renderChapter(chapter, chapter.n);
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), contents, 'utf-8');
    written.push(slug);
  }

  for (const [i, plain] of plains.entries()) {
    const { slug, contents } = renderPlain(plain, 90 + i);
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), contents, 'utf-8');
    written.push(slug);
  }

  const keep = new Set(written.map((slug) => `${slug}.md`));
  const stale = fs.readdirSync(OUT_DIR).filter((name) => name.endsWith('.md') && !keep.has(name));
  for (const name of stale) fs.unlinkSync(path.join(OUT_DIR, name));
  if (stale.length > 0) console.log(`   removed ${stale.length} stale page(s): ${stale.join(', ')}`);

  console.log(`✅ Text docs: ${written.length} pages → src/content/docs/text/`);
  console.log(`   ${chapters.length} chapters, ${plains.length} appended section(s)`);
};

main();
