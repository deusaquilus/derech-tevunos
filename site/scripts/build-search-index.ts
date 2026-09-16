/**
 * Build `public/search-index.json` from the docs collection.
 *
 * Runs before `astro build` and `astro dev`. The index is generated, not
 * committed — `.gitignore` covers it.
 *
 * Markdown is reduced to plain text with `marked` and a renderer that returns
 * text instead of HTML, which keeps the extraction honest: whatever `marked`
 * treats as a construct is what gets stripped, rather than a pile of regexes
 * that drift from the parser.
 *
 * Two things this deliberately strips:
 *
 *   - The `<div class="dt-lang-block">` and `<span lang="he">` wrappers the
 *     text generator emits. `html()` returning empty is what does it, so the
 *     Hebrew itself survives while the markup does not — searching for a
 *     Hebrew phrase works, searching for `dt-lang-block` does not.
 *   - Code blocks, which in this repo are JSON sugya fixtures. Their keys
 *     would otherwise dominate a query for any ordinary word.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Marked, type RendererObject, type Tokens } from 'marked';

const here = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(here, '..', 'src', 'content', 'docs');
const OUT = path.join(here, '..', 'public', 'search-index.json');

type Frontmatter = Readonly<Record<string, string>>;

type IndexEntry = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly order: number;
  readonly content: string;
  readonly headings: readonly string[];
};

// ── Frontmatter ─────────────────────────────────────────────────────────────

const parseFrontmatter = (raw: string): { readonly data: Frontmatter; readonly body: string } => {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
  if (m === null) return { data: {}, body: raw };

  const data = (m[1] ?? '').split('\n').reduce<Record<string, string>>((acc, line) => {
    const at = line.indexOf(':');
    if (at <= 0) return acc;
    const key = line.slice(0, at).trim();
    const value = line.slice(at + 1).trim();
    const unquoted =
      (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))
        ? value.slice(1, -1)
        : value;
    return { ...acc, [key]: unquoted };
  }, {});

  return { data, body: m[2] ?? '' };
};

// ── Markdown → text ────────────────────────────────────────────────────────

const toText = (markdown: string): { readonly content: string; readonly headings: readonly string[] } => {
  const headings: string[] = [];

  const renderer: RendererObject = {
    heading({ text }: Tokens.Heading) {
      headings.push(text);
      return `${text} `;
    },
    code() {
      return '';
    },
    html() {
      return '';
    },
    codespan({ text }: Tokens.Codespan) {
      return text;
    },
    paragraph({ text }: Tokens.Paragraph) {
      return `${text} `;
    },
    link({ text }: Tokens.Link) {
      return text;
    },
    image({ text }: Tokens.Image) {
      return text ?? '';
    },
    strong({ text }: Tokens.Strong) {
      return text;
    },
    em({ text }: Tokens.Em) {
      return text;
    },
    del({ text }: Tokens.Del) {
      return text;
    },
    blockquote({ text }: Tokens.Blockquote) {
      return `${text} `;
    },
    list(token: Tokens.List) {
      return `${token.items.map((i) => i.text).join(' ')} `;
    },
    listitem({ text }: Tokens.ListItem) {
      return `${text} `;
    },
    table(token: Tokens.Table) {
      const head = token.header.map((c) => c.text).join(' ');
      const rows = token.rows.map((r) => r.map((c) => c.text).join(' ')).join(' ');
      return `${head} ${rows} `;
    },
    tablerow({ text }: Tokens.TableRow) {
      return text;
    },
    tablecell({ text }: Tokens.TableCell) {
      return `${text} `;
    },
    hr() {
      return ' ';
    },
    br() {
      return ' ';
    },
    text(token: Tokens.Text | Tokens.Escape) {
      return token.text;
    },
  };

  const parsed = new Marked({ renderer }).parse(markdown, { async: false }) as string;
  // `html()` above only catches BLOCK-level HTML. Inline tags — the
  // `<span lang="he">` wrappers the text generator emits around every quoted
  // Hebrew phrase — reach the output through the inline text path instead, so
  // without this strip the index contains 365 copies of `span lang="he"` and a
  // reader searching for `span` gets every chapter. Measured 2026-09-16.
  const stripped = parsed.replace(/<\/?[a-zA-Z][^>]*>/g, ' ');
  return { content: stripped.replace(/\s+/g, ' ').trim(), headings };
};

// ── Walk ────────────────────────────────────────────────────────────────────

const markdownFiles = (dir: string, base: string = dir): readonly string[] =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return markdownFiles(full, base);
        return entry.name.endsWith('.md') || entry.name.endsWith('.mdx')
          ? [path.relative(base, full)]
          : [];
      })
    : [];

const main = (): void => {
  const files = markdownFiles(DOCS_DIR);

  const entries = files.flatMap((rel): readonly IndexEntry[] => {
    const raw = fs.readFileSync(path.join(DOCS_DIR, rel), 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    if (data.title === undefined) {
      console.warn(`   ⚠ skipping ${rel} (no title)`);
      return [];
    }
    const { content, headings } = toText(body);
    return [
      {
        slug: rel.replace(/\.mdx?$/, '').replace(/\\/g, '/'),
        title: data.title,
        description: data.description ?? '',
        category: data.category ?? 'Uncategorized',
        order: Number(data.order ?? '999'),
        content,
        headings,
      },
    ];
  });

  const sorted = [...entries].sort((a, b) =>
    a.category !== b.category ? a.category.localeCompare(b.category) : a.order - b.order,
  );

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(sorted), 'utf-8');

  const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
  console.log(`✅ Search index: ${sorted.length} documents, ${kb} KB → public/search-index.json`);
};

main();
