import Fuse, { type IFuseOptions } from 'fuse.js';

/** One document in the generated search index (`public/search-index.json`). */
export type IndexEntry = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly order: number;
  readonly content: string;
  readonly headings: readonly string[];
};

export type SearchHit = {
  readonly item: IndexEntry;
  readonly score: number;
};

const FUSE_OPTIONS: IFuseOptions<IndexEntry> = {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'description', weight: 2 },
    { name: 'headings', weight: 2 },
    { name: 'category', weight: 1 },
    { name: 'content', weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

/**
 * The index and the Fuse instance are module-level caches on purpose: the
 * index is a single immutable artifact fetched once per page, and rebuilding
 * the Fuse structure per keystroke is the whole cost of searching.
 */
let cached: { readonly entries: readonly IndexEntry[]; readonly fuse: Fuse<IndexEntry> } | undefined;

const load = async (): Promise<{ readonly entries: readonly IndexEntry[]; readonly fuse: Fuse<IndexEntry> }> => {
  if (cached !== undefined) return cached;

  const entries = await (async (): Promise<readonly IndexEntry[]> => {
    const stored = sessionStorage.getItem('dt-search-index');
    if (stored !== null) {
      try {
        return JSON.parse(stored) as readonly IndexEntry[];
      } catch {
        /* fall through to a fetch — a corrupt cache is not worth reporting */
      }
    }
    const response = await fetch('/search-index.json');
    if (!response.ok) throw new Error(`search index: HTTP ${response.status}`);
    const fetched = (await response.json()) as readonly IndexEntry[];
    try {
      sessionStorage.setItem('dt-search-index', JSON.stringify(fetched));
    } catch {
      /* quota or private mode; the in-memory cache still applies */
    }
    return fetched;
  })();

  // A tie on score falls back to reading order, so results from one category
  // stay in the order the sidebar shows them rather than shuffling per query.
  const fuse = new Fuse([...entries], {
    ...FUSE_OPTIONS,
    sortFn: (a, b) => {
      if (Math.abs(a.score - b.score) > 0.05) return a.score - b.score;
      const x = entries[a.idx];
      const y = entries[b.idx];
      if (x === undefined || y === undefined) return 0;
      return x.category !== y.category
        ? x.category.localeCompare(y.category)
        : x.order - y.order;
    },
  });

  cached = { entries, fuse };
  return cached;
};

export const MIN_QUERY = 2;

export const search = async (query: string, limit = 10): Promise<readonly SearchHit[]> => {
  const q = query.trim();
  if (q.length < MIN_QUERY) return [];
  const { fuse } = await load();
  return fuse.search(q, { limit }).map((r) => ({ item: r.item, score: r.score ?? 1 }));
};

// ── Snippets and highlighting ───────────────────────────────────────────────

/**
 * A piece of text, flagged if it matched the query.
 *
 * Returning segments rather than an HTML string is the point. The Vue original
 * built `<mark>…</mark>` by string replacement and rendered it with `v-html`,
 * which means any `<` or `&` in the indexed document was interpreted as markup
 * rather than escaped. React renders these as children, so the hazard does not
 * exist and there is no `dangerouslySetInnerHTML` anywhere in the search UI.
 */
export type Segment = {
  readonly text: string;
  readonly hit: boolean;
};

const escapeRegex = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const segment = (text: string, query: string): readonly Segment[] => {
  const q = query.trim();
  if (q.length === 0) return [{ text, hit: false }];
  // The capture group keeps the delimiter, so the split alternates
  // non-match / match / non-match and the odd indices are the hits.
  return text
    .split(new RegExp(`(${escapeRegex(q)})`, 'gi'))
    .filter((piece) => piece.length > 0)
    .map((piece) => ({ text: piece, hit: piece.toLowerCase() === q.toLowerCase() }));
};

/** A window of `content` around the first match, for the result row. */
export const snippet = (text: string, query: string, context = 90): string => {
  const q = query.trim().toLowerCase();
  const at = q.length === 0 ? -1 : text.toLowerCase().indexOf(q);
  if (at < 0) return text.length <= context * 2 ? text : `${text.slice(0, context * 2).trimEnd()}…`;

  const start = Math.max(0, at - context);
  const end = Math.min(text.length, at + q.length + context);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
};
