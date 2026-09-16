import type { JSX } from "react";

import { renderMarkup } from "../markup.tsx";
import { Link, useQuery } from "../router.tsx";
import { useSugyot } from "../sugyot.ts";
import { SugyaView } from "../SugyaView.tsx";

export type SugyaPageProps = {
  readonly id: string;
};

/**
 * One passage. Keyed on the id and the requested step, so switching passages
 * — or following a link to a step — starts fresh, freshly measured. A passage
 * that carries a `hint` shows it in place of the header's standard copy: the
 * research pages use it to say which step and which band produce the folds
 * they exist to show.
 */
export const SugyaPage = ({ id }: SugyaPageProps): JSX.Element => {
  const query = useQuery();
  const sugya = useSugyot().find((s) => s.id === id);
  if (sugya === undefined) {
    return (
      <section className="missing">
        <p>
          No passage with id <code>{id}</code>.
        </p>
        <Link to="/" className="advance advance-lead">
          Back to the gallery
        </Link>
      </section>
    );
  }
  const at = Number(query.get("at"));
  const start = Number.isInteger(at) && at > 0 ? at : undefined;
  return (
    <SugyaView
      key={`${sugya.id}@${start ?? 1}`}
      sugya={sugya}
      hint={sugya.hint === undefined ? undefined : renderMarkup(sugya.hint)}
      options={start === undefined ? undefined : { start }}
    />
  );
};
