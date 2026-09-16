import { useState, type ChangeEvent, type DragEvent, type JSX } from "react";

import { stringify, SugyaFormatError } from "../../format.ts";
import type { Sugya } from "../../sugya.ts";
import { sugyaById } from "../../sugyot/index.ts";
import { renderMarkup } from "../markup.tsx";
import { Link, navigate } from "../router.tsx";
import { forgetOne, openSugya, useOpened } from "../sugyot.ts";
import { SugyaView } from "../SugyaView.tsx";

/** The two-sentence shipped passage, offered as something to edit. */
const EXAMPLE_ID = "yebamos-deafmute";

/**
 * A file offered to the page either passes and becomes the passage on the
 * route, or is refused and its faults are listed. There is no third state
 * worth drawing: reading a local file takes no measurable time.
 */
type Attempt =
  | { readonly status: "waiting" }
  | { readonly status: "refused"; readonly source: string; readonly faults: readonly string[] };

const faultsOf = (e: unknown, source: string): readonly string[] => {
  if (e instanceof SugyaFormatError) return e.faults;
  if (e instanceof SyntaxError) return [`${source}: not JSON — ${e.message}`];
  return [String(e)];
};

/** The passage as a canonical file: what to save back over a hand-written one. */
const download = (sugya: Sugya): void => {
  const url = URL.createObjectURL(new Blob([stringify(sugya)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${sugya.id}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
};

/** A file input dressed as a button; the label keeps it in the tab order. */
const FilePick = ({
  label,
  lead,
  onFile,
}: {
  readonly label: string;
  readonly lead?: boolean;
  readonly onFile: (file: File) => void;
}): JSX.Element => (
  <label className={`advance${lead === true ? " advance-lead" : ""} file-pick`}>
    {label}
    <input
      type="file"
      accept=".json,application/json"
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        // Cleared, or picking the same file twice in a row raises no change
        // event — and picking it twice is the whole loop this page is for.
        event.currentTarget.value = "";
        if (file !== undefined) onFile(file);
      }}
    />
  </label>
);

const Faults = ({
  source,
  faults,
}: {
  readonly source: string;
  readonly faults: readonly string[];
}): JSX.Element => (
  <div className="open-faults" aria-live="polite">
    <p className="open-faults-head">
      <code>{source}</code> was refused: {faults.length}{" "}
      {faults.length === 1 ? "fault" : "faults"}. Each is named by the path it sits at.
    </p>
    <ul>
      {faults.map((fault) => (
        <li key={fault}>
          <code>{fault}</code>
        </li>
      ))}
    </ul>
  </div>
);

export type OpenPageProps = {
  /** The id of the opened passage to draw; absent, the loader alone. */
  readonly id?: string;
};

/**
 * A page of its own: load a sugya file and draw it. The lattice it draws is
 * the same `SugyaView` the shipped passages use — header, legend, rows, rails,
 * folds — and nothing else of that app (not its title, not its tabs) is here.
 */
export const OpenPage = ({ id }: OpenPageProps): JSX.Element => {
  const opened = useOpened();
  const [attempt, setAttempt] = useState<Attempt>({ status: "waiting" });
  const [over, setOver] = useState(false);
  const [pasted, setPasted] = useState("");
  // Keys the drawing, so re-opening an edited file redraws it from its opening
  // sentence instead of inheriting how far the last one had been unfolded.
  const [loads, setLoads] = useState(0);

  const load = (text: string, source: string): void => {
    try {
      const sugya = openSugya(JSON.parse(text) as unknown, source);
      setAttempt({ status: "waiting" });
      setPasted("");
      setLoads((n) => n + 1);
      navigate(`/open/${sugya.id}`);
    } catch (e) {
      setAttempt({ status: "refused", source, faults: faultsOf(e, source) });
    }
  };

  const loadFile = (file: File): void => {
    void file.text().then((text) => load(text, file.name));
  };

  const onDrop = (event: DragEvent<HTMLElement>): void => {
    event.preventDefault();
    setOver(false);
    const file = event.dataTransfer.files[0];
    if (file !== undefined) loadFile(file);
  };

  const current = id === undefined ? undefined : opened.find((o) => o.sugya.id === id);

  return (
    <div className="app open-app">
      <header className="app-head">
        <p className="open-back">
          <Link to="/">The shipped lattice</Link>
        </p>
        <h1>Open a sugya file</h1>
        <p>
          A passage written in the sugya file format is drawn here with the same lattice the
          shipped pages use — every row, rail, fold and badge — and with none of their chrome.
          Nothing is uploaded: the file is parsed in this tab, and kept for this browser session
          only.
        </p>
      </header>

      {current === undefined ? (
        <section className="open">
          {id === undefined ? null : (
            <p className="open-lost">
              Nothing is open under <code>{id}</code> — a reload in a new tab, or a cleared
              session, loses the file but not the page. Open it again.
            </p>
          )}

          <div
            className={`open-drop${over ? " open-drop-over" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={onDrop}
          >
            <p className="open-drop-lead">Drop a .json file here</p>
            <FilePick label="Choose a file…" lead onFile={loadFile} />
          </div>

          <details className="open-paste">
            <summary>Or paste the JSON</summary>
            <textarea
              className="open-paste-box"
              value={pasted}
              spellCheck={false}
              rows={10}
              placeholder='{ "format": "derech-tevunos/sugya", "version": 1, … }'
              onChange={(event) => setPasted(event.currentTarget.value)}
            />
            <p className="open-paste-acts">
              <button
                type="button"
                className="advance advance-lead"
                disabled={pasted.trim() === ""}
                onClick={() => load(pasted, "pasted text")}
              >
                Draw it
              </button>
              <button
                type="button"
                className="advance"
                onClick={() => {
                  const example = sugyaById(EXAMPLE_ID);
                  if (example !== undefined) setPasted(stringify(example));
                }}
              >
                Fill with the two-sentence example
              </button>
            </p>
          </details>

          {attempt.status === "refused" ? (
            <Faults source={attempt.source} faults={attempt.faults} />
          ) : null}

          {opened.length === 0 ? null : (
            <>
              <h3 className="gallery-heading">Open this session</h3>
              <ul className="open-list">
                {opened.map(({ sugya: s, source }) => (
                  <li key={s.id}>
                    <Link to={`/open/${s.id}`} className="open-list-name">
                      {source}
                    </Link>
                    <span className="open-list-meta">
                      {s.tractate} {s.folio} — {s.title}
                    </span>
                    <button type="button" className="advance" onClick={() => forgetOne(s.id)}>
                      Close
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      ) : (
        <>
          <section className="open-strip">
            <p className="open-strip-line">
              <span className="open-strip-file">{current.source}</span>
              <span className="open-strip-meta">
                {current.sugya.units.length} sentences · id <code>{current.sugya.id}</code>
              </span>
            </p>
            <p className="open-strip-acts">
              <FilePick label="Open another file…" onFile={loadFile} />
              <button type="button" className="advance" onClick={() => download(current.sugya)}>
                Download canonical form
              </button>
              <button
                type="button"
                className="advance"
                onClick={() => {
                  forgetOne(current.sugya.id);
                  navigate("/open");
                }}
              >
                Close it
              </button>
            </p>
            {attempt.status === "refused" ? (
              <Faults source={attempt.source} faults={attempt.faults} />
            ) : null}
            {current.sugya.about === undefined ? null : (
              <details className="open-about">
                <summary>The file&rsquo;s own preface</summary>
                {current.sugya.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </details>
            )}
          </section>

          <SugyaView
            key={`${current.sugya.id}@${loads}`}
            sugya={current.sugya}
            hint={current.sugya.hint === undefined ? undefined : renderMarkup(current.sugya.hint)}
          />
        </>
      )}
    </div>
  );
};
