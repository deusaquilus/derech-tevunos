import type { ReactNode } from "react";

/**
 * The whole of the format's inline markup: `**bold**` and `*italic*`, no
 * nesting, no escapes. A `hint` is one sentence or three about where to look
 * on a page, and that is all the emphasis it needs; anything richer belongs
 * in `about`, which is prose for the file's reader and not printed.
 */
const TOKEN = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

export const renderMarkup = (text: string): ReactNode => {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(m[1] !== undefined ? <b key={at}>{m[1]}</b> : <i key={at}>{m[2]}</i>);
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
};
