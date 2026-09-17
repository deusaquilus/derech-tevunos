import { useState, type ChangeEvent, type DragEvent, type JSX, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { RailSheet } from './RailSheet.tsx';
import { parseSugya, stringify, SugyaFormatError } from '../rail/format.ts';
import { movementsOf, type Sugya } from '../rail/sugya.ts';
import { readOpened, writeOpened, type Opened } from '../lib/byoSession.ts';
import styles from './Byo.module.css';

// The two-sentence shipped passage, offered as something to edit. Imported as
// the one file rather than through `sugyot/index.ts`: the registry would put
// all nine passages — 160KB — into this route's bundle for a 2KB example.
import example from '../rail/sugyot/yebamos-deafmute.json' with { type: 'json' };

/**
 * `/byo`: draw a sugya file the reader wrote.
 *
 * The drawing is `RailSheet`, the same component `/sugya/<id>` mounts, and the
 * chrome is `StageShell.astro`, the same strip and panel — so a reader's own
 * file gets the shipped passages' page and not an imitation of it. What is
 * here is only the loader, the fault list, and the three pieces of the shell
 * that cannot be server-rendered because they describe a file the server has
 * never seen: the strip's texts, the panel's actions, and the sheet itself.
 *
 * Nothing is uploaded. The file is parsed in this tab by the same `parseSugya`
 * the build runs over the shipped passages, so what the page accepts here and
 * what the site ships are the same format by construction, not by agreement.
 */

/**
 * A file offered to the page either passes and becomes the drawing, or is
 * refused and its faults are listed. There is no third state worth drawing:
 * reading a local file takes no measurable time.
 */
type Attempt =
  | { readonly kind: 'waiting' }
  | { readonly kind: 'refused'; readonly source: string; readonly faults: readonly string[] };

/** The pure half of opening a file: text in, a passage or its faults out. */
type Offer =
  | { readonly kind: 'parsed'; readonly sugya: Sugya }
  | { readonly kind: 'refused'; readonly faults: readonly string[] };

const faultsOf = (e: unknown, source: string): readonly string[] => {
  if (e instanceof SugyaFormatError) return e.faults;
  if (e instanceof SyntaxError) return [`${source}: not JSON — ${e.message}`];
  return [String(e)];
};

const offerOf = (text: string, source: string): Offer => {
  try {
    return { kind: 'parsed', sugya: parseSugya(JSON.parse(text) as unknown, source) };
  } catch (e) {
    return { kind: 'refused', faults: faultsOf(e, source) };
  }
};

/** The passage as a canonical file: what to save back over a hand-written one. */
const download = (sugya: Sugya): void => {
  const url = URL.createObjectURL(new Blob([stringify(sugya)], { type: 'application/json' }));
  const link = document.createElement('a');
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
  <label className={`advance${lead === true ? ' advance-lead' : ''} ${styles.pick}`}>
    {label}
    <input
      type="file"
      accept=".json,application/json"
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        // Cleared, or picking the same file twice in a row raises no change
        // event — and picking it twice is the whole loop this page is for.
        event.currentTarget.value = '';
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
  <div className={styles.faults} aria-live="polite">
    <p className={styles.faultsHead}>
      <code>{source}</code> was refused: {faults.length}{' '}
      {faults.length === 1 ? 'fault' : 'faults'}. Each is named by the path it sits at.
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

export type ByoProps = {
  /** Id of the empty span inside the strip's baseline group. */
  readonly stripHost: string;
  /** Id of the empty block at the top of the strip's panel. */
  readonly panelHost: string;
  /** Id of the element the legend renders into; forwarded to `RailSheet`. */
  readonly legendHost: string;
};

export const Byo = ({ stripHost, panelHost, legendHost }: ByoProps): JSX.Element => {
  // Resolved once, on mount, for the same reason `RailSheet` resolves its own:
  // the shell is server-rendered HTML and is in the document before this
  // island, so an effect would render a frame into the wrong place first.
  const [hosts] = useState<{ readonly strip?: Element; readonly panel?: Element }>(() => ({
    strip: document.getElementById(stripHost) ?? undefined,
    panel: document.getElementById(panelHost) ?? undefined,
  }));

  const [opened, setOpened] = useState<Opened | undefined>(readOpened);
  const [attempt, setAttempt] = useState<Attempt>({ kind: 'waiting' });
  const [over, setOver] = useState(false);
  const [pasted, setPasted] = useState('');
  // Keys the drawing, so re-opening an edited file redraws it from its opening
  // sentence instead of inheriting how far the last one had been unfolded.
  const [loads, setLoads] = useState(0);

  const load = (text: string, source: string): void => {
    const offer = offerOf(text, source);
    switch (offer.kind) {
      case 'parsed': {
        const next: Opened = { sugya: offer.sugya, source };
        writeOpened(next);
        setOpened(next);
        setAttempt({ kind: 'waiting' });
        setPasted('');
        setLoads((n) => n + 1);
        return;
      }
      case 'refused': {
        setAttempt({ kind: 'refused', source, faults: offer.faults });
        return;
      }
      default: {
        const exhaustive: never = offer;
        return exhaustive;
      }
    }
  };

  const loadFile = (file: File): void => {
    void file.text().then((text) => load(text, file.name));
  };

  const close = (): void => {
    writeOpened(undefined);
    setOpened(undefined);
    setAttempt({ kind: 'waiting' });
  };

  const onDrop = (event: DragEvent<HTMLElement>): void => {
    event.preventDefault();
    setOver(false);
    const file = event.dataTransfer.files[0];
    if (file !== undefined) loadFile(file);
  };

  const faults =
    attempt.kind === 'refused' ? <Faults source={attempt.source} faults={attempt.faults} /> : null;

  // ── The strip's three texts ──────────────────────────────────────────────
  // The shell's `dt-strip-*` classes, so this line is pixel-for-pixel the line
  // a shipped passage draws; only the words differ.
  const strip: ReactNode =
    opened === undefined ? (
      <>
        <span className="dt-strip-cite">Bring your own</span>
        <span className="dt-strip-title">No file open</span>
        <span className="dt-strip-meta">a sugya file, drawn in this tab</span>
      </>
    ) : (
      <>
        <span className="dt-strip-cite">
          {opened.sugya.tractate} {opened.sugya.folio}
        </span>
        <span className="dt-strip-title">{opened.sugya.title}</span>
        <span className="dt-strip-meta">
          {opened.sugya.units.length} sentences · {movementsOf(opened.sugya).length} movements
        </span>
      </>
    );

  // ── The panel's actions ──────────────────────────────────────────────────
  const panel: ReactNode =
    opened === undefined ? (
      <p className={styles.panelNote}>
        No file is open. Drop one on the sheet, or paste it there.
      </p>
    ) : (
      <>
        <div className={styles.panelActs}>
          <span className={styles.panelSource}>{opened.source}</span>
          <FilePick label="Open another file…" onFile={loadFile} />
          <button type="button" className="advance" onClick={() => download(opened.sugya)}>
            Download canonical form
          </button>
          <button type="button" className="advance" onClick={close}>
            Close it
          </button>
        </div>
        {faults}
      </>
    );

  return (
    <>
      {hosts.strip === undefined ? null : createPortal(strip, hosts.strip)}
      {hosts.panel === undefined ? null : createPortal(panel, hosts.panel)}

      {opened === undefined ? (
        <div className={styles.loader}>
          <div className={styles.inner}>
            <h1 className={styles.head}>Bring your own sugya</h1>
            <p className={styles.lede}>
              A passage written in the sugya file format is drawn here with the same waterfall
              the shipped passages use — every row, rail, fold and badge. Nothing is uploaded:
              the file is read in this tab and kept for this browser session only.
            </p>
            <p className={styles.lede}>
              This page is the end of a loop, and the loop is the point. Ramchal's chapter 9
              vocabulary is closed and its tests are mechanical, so labelling a passage is work a
              language model can do: point one at the guide below, hand it a sugya, and it comes
              back with a file. Drop the file here and the drawing is how you check it. A sentence
              labelled wrong takes the picture with it, and you catch it before you have finished
              reading the row. <a href="/about">Why this exists</a>.
            </p>

            <div
              className={`${styles.drop}${over ? ` ${styles.dropOver}` : ''}`}
              onDragOver={(event) => {
                event.preventDefault();
                setOver(true);
              }}
              onDragLeave={() => setOver(false)}
              onDrop={onDrop}
            >
              <p className={styles.dropLead}>Drop a .json file here</p>
              <FilePick label="Choose a file…" lead onFile={loadFile} />
            </div>

            <details className={styles.paste}>
              <summary>Or paste the JSON</summary>
              <textarea
                className={styles.pasteBox}
                value={pasted}
                spellCheck={false}
                rows={10}
                placeholder='{ "format": "derech-tevunos/sugya", "version": 1, … }'
                onChange={(event) => setPasted(event.currentTarget.value)}
              />
              <p className={styles.acts}>
                <button
                  type="button"
                  className="advance advance-lead"
                  disabled={pasted.trim() === ''}
                  onClick={() => load(pasted, 'pasted text')}
                >
                  Draw it
                </button>
                <button
                  type="button"
                  className="advance"
                  onClick={() => setPasted(stringify(parseSugya(example, 'the example')))}
                >
                  Fill with the two-sentence example
                </button>
              </p>
            </details>

            {faults}

            <p className={styles.help}>
              To write one: the field-by-field reference is{' '}
              <a href="https://github.com/deusaquilus/derech-tevunos/blob/main/SUGYA_JSON_FORMAT.md">
                SUGYA_JSON_FORMAT.md
              </a>
              , and the long guide an agent can work from is{' '}
              <a href="https://github.com/deusaquilus/derech-tevunos/blob/main/DERECH_TEVUNOS_SUGYA_JSON_GUIDE.md">
                DERECH_TEVUNOS_SUGYA_JSON_GUIDE.md
              </a>
              . The vocabulary of moves is{' '}
              <a href="/docs/text/chapter-09">chapter 9</a>; the nine{' '}
              <a href="/sugya">shipped passages</a> are worked examples, and any of them will
              open here unchanged.
            </p>
          </div>
        </div>
      ) : (
        <RailSheet key={loads} sugya={opened.sugya} legendHost={legendHost} />
      )}
    </>
  );
};

export default Byo;
