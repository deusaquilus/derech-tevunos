import type { Passage } from "../circumscription/closure.ts";
import { formatCite } from "../source/cite.ts";

type Props = {
  readonly passage: Passage;
  /**
   * The words that narrow the subject, highlighted in place. They are the only
   * reason there is anything to read between the lines at all.
   */
  readonly narrowing?: readonly string[];
};

const escape = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** The quote split into plain runs and the runs that do the narrowing. */
const split = (
  text: string,
  phrases: readonly string[],
): readonly { readonly text: string; readonly narrowing: boolean }[] => {
  const wanted = phrases.filter((phrase) => text.includes(phrase));
  if (wanted.length === 0) return [{ text, narrowing: false }];

  const pattern = new RegExp(`(${wanted.map(escape).join("|")})`, "g");
  return text
    .split(pattern)
    .filter((run) => run.length > 0)
    .map((run) => ({ text: run, narrowing: wanted.includes(run) }));
};

export function QuotePassage({ passage, narrowing = [] }: Props) {
  return (
    <figure className="quote">
      <blockquote className="quote__english">
        {split(passage.english, narrowing).map((run, i) =>
          run.narrowing ? (
            <mark key={i} className="quote__narrowing">
              {run.text}
            </mark>
          ) : (
            <span key={i}>{run.text}</span>
          ),
        )}
      </blockquote>
      <p className="quote__hebrew" lang="he" dir="rtl">
        {passage.hebrew}
      </p>
      <figcaption className="quote__cite">
        {passage.speaker} · {formatCite(passage.cite)}
      </figcaption>
      {passage.note !== undefined && <p className="quote__note">{passage.note}</p>}
    </figure>
  );
}
