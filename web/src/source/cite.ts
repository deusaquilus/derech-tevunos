/**
 * A pointer back into the source, carried on every datum so a reader can check
 * the formalization against the text (spec §7, last bullet).
 */
export type Cite = {
  readonly tractate: string;
  readonly folio: string;
  readonly chapter: number;
  /** English pages in the Feldheim edition where Ramchal works the passage. */
  readonly pages: readonly [number, number];
};

export const formatCite = (cite: Cite): string => {
  const [first, last] = cite.pages;
  const span = first === last ? `p. ${first}` : `pp. ${first}–${last}`;
  return `${cite.tractate} ${cite.folio} · Derech Tevunos ch. ${cite.chapter}, ${span}`;
};
