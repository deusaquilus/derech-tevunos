/**
 * The whole of the sugya format's inline markup: `**bold**` and `*italic*`, no
 * nesting, no escapes. A `hint` is one sentence or three about where to look on
 * a page, and that is all the emphasis it needs; anything richer belongs in
 * `about`, which is prose for the file's reader and not printed.
 *
 * This replaces the React interpreter that used to live at `app/markup.tsx`.
 * The site renders a hint in its Astro page header rather than inside the
 * drawing — `SugyaView` forwards `hint` only to `SugyaHeader`, which the site
 * switches off — so the one interpreter it needs produces an HTML string, and
 * a framework-free module is the right home for it.
 *
 * The escape pass runs FIRST and is not optional: the output is handed to
 * `set:html`, and a passage file is authored input. Escaping after the token
 * substitution would eat the `<b>` and `<i>` this function just produced.
 */
const TOKEN = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

const ESCAPES: ReadonlyMap<string, string> = new Map([
  ['&', '&amp;'],
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['"', '&quot;'],
  ["'", '&#39;'],
]);

const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => ESCAPES.get(c) ?? c);

/** `a **b** c` → `a <b>b</b> c`, with everything else escaped. */
export const markupToHtml = (text: string): string => {
  const escaped = escapeHtml(text);
  return escaped.replace(TOKEN, (_all, bold?: string, italic?: string) =>
    bold !== undefined ? `<b>${bold}</b>` : `<i>${italic}</i>`,
  );
};

/**
 * The one inline construct of a `note` — an anatomy label's or a span's:
 * backticks quote a word of the text or a unit's id, `הואיל וחזותו מוכיח
 * עליו`, `t12-dumya`. Nothing else; a note is a sentence of reasoning, not
 * prose to be styled. The pieces are returned rather than an HTML string
 * because the notes are rendered by React inside a tooltip, where a string
 * would have to be trusted; the component draws a `quoted` piece as an
 * isolated inline (`dir="auto"`), which is what a Hebrew word inside an
 * English sentence needs. An unmatched backtick is text.
 */
export type NotePiece =
  | { readonly kind: "text"; readonly text: string }
  | { readonly kind: "quoted"; readonly text: string };

const QUOTED = /`([^`]+)`/g;

export const notePieces = (note: string): readonly NotePiece[] => {
  const pieces: NotePiece[] = [];
  let last = 0;
  for (const m of note.matchAll(QUOTED)) {
    const at = m.index;
    if (at > last) pieces.push({ kind: "text", text: note.slice(last, at) });
    pieces.push({ kind: "quoted", text: m[1]! });
    last = at + m[0].length;
  }
  if (last < note.length) pieces.push({ kind: "text", text: note.slice(last) });
  return pieces;
};
