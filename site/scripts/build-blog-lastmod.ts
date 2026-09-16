/**
 * Emit a URL → ISO lastmod map for the sitemap's `serialize` hook.
 *
 * Uses frontmatter `updated` when present, otherwise `date`. Written to
 * `public/` so `astro.config.mjs` can read it synchronously at config load.
 *
 * NOTE THE KEY SHAPE. Entries are keyed on the **slash-ful** pathname
 * (`/blog/x/`), because the sitemap hook looks lastmod up BEFORE it strips the
 * trailing slash. Those two steps are ordered that way on purpose; swapping
 * them, or "tidying" these keys to the slash-free form the site actually
 * emits, silently drops every lastmod from the sitemap. See AGENTS.md.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(here, '..', 'src', 'content', 'blog');
const OUT = path.join(here, '..', 'public', 'blog-lastmod.json');

const dateFields = (raw: string): { readonly date?: string; readonly updated?: string } => {
  const m = /^---\n([\s\S]*?)\n---/.exec(raw);
  if (m?.[1] === undefined) return {};

  const fields = m[1].split('\n').reduce<Record<string, string>>((acc, line) => {
    const at = line.indexOf(':');
    if (at <= 0) return acc;
    const key = line.slice(0, at).trim();
    const value = line.slice(at + 1).trim().replace(/^['"]|['"]$/g, '');
    return { ...acc, [key]: value };
  }, {});

  return {
    ...(fields.date !== undefined ? { date: fields.date } : {}),
    ...(fields.updated !== undefined ? { updated: fields.updated } : {}),
  };
};

/** Date-only values get noon UTC so the calendar day is stable in every zone. */
const toIso = (raw: string): string =>
  raw.includes('T') ? new Date(raw).toISOString() : new Date(`${raw}T12:00:00.000Z`).toISOString();

const main = (): void => {
  const files = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((n) => n.endsWith('.md') || n.endsWith('.mdx'))
    : [];

  const map = files.reduce<Record<string, string>>((acc, name) => {
    const slug = name.replace(/\.mdx?$/, '');
    const { date, updated } = dateFields(fs.readFileSync(path.join(BLOG_DIR, name), 'utf-8'));
    const source = updated ?? date;
    return source === undefined ? acc : { ...acc, [`/blog/${slug}/`]: toIso(source) };
  }, {});

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(map, null, 2)}\n`, 'utf-8');
  console.log(`✅ Blog lastmod: ${Object.keys(map).length} post(s) → public/blog-lastmod.json`);
};

main();
