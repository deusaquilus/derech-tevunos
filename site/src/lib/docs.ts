import type { CollectionEntry } from 'astro:content';

export type Doc = CollectionEntry<'docs'>;

/**
 * Sidebar category order. Anything not named here sorts to the end
 * alphabetically, so adding a category is additive — it appears, just last,
 * until someone gives it a rank.
 */
const CATEGORY_RANK: ReadonlyMap<string, number> = new Map([
  ['The text', 0],
  ['Sugyascade', 1],
  ['Reference', 2],
]);

export const CATEGORY_BLURB: ReadonlyMap<string, string> = new Map([
  ['The text', "Derech Tevunos itself — the 1742 Hebrew and an English translation of it, chapter by chapter."],
  ['Sugyascade', 'How the visualization reads a sugya, and what its parts mean.'],
  ['Reference', 'The sugya file format and the label vocabularies.'],
]);

const rank = (category: string): number => CATEGORY_RANK.get(category) ?? 999;

/** Category order first, then `order` within a category, then title. */
export const compareDocs = (a: Doc, b: Doc): number => {
  const byCategory = rank(a.data.category) - rank(b.data.category);
  if (byCategory !== 0) return byCategory;
  if (a.data.category !== b.data.category) return a.data.category.localeCompare(b.data.category);
  const byOrder = a.data.order - b.data.order;
  return byOrder !== 0 ? byOrder : a.data.title.localeCompare(b.data.title);
};

export const sortDocs = (docs: readonly Doc[]): readonly Doc[] => [...docs].sort(compareDocs);

/**
 * Group into categories, preserving the sorted order of both the groups and
 * the documents inside them. A plain object would not: property order for
 * string keys is insertion order, which is fine, but a Map says so out loud.
 */
export const groupByCategory = (docs: readonly Doc[]): ReadonlyMap<string, readonly Doc[]> => {
  const out = new Map<string, Doc[]>();
  for (const doc of sortDocs(docs)) {
    const bucket = out.get(doc.data.category);
    if (bucket === undefined) out.set(doc.data.category, [doc]);
    else bucket.push(doc);
  }
  return out;
};

/** Previous and next in reading order, for the footer pager. */
export const neighbours = (
  docs: readonly Doc[],
  slug: string,
): { readonly prev: Doc | undefined; readonly next: Doc | undefined } => {
  const ordered = sortDocs(docs);
  const i = ordered.findIndex((d) => d.slug === slug);
  return i < 0
    ? { prev: undefined, next: undefined }
    : { prev: ordered[i - 1], next: ordered[i + 1] };
};
