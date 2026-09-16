import type { JSX } from "react";

import { FAMILIES, FAMILY_ORDER, type Family } from "../../anatomy.ts";
import { SQUARE_BOX, TILE_GLYPH } from "../../glyphs.ts";
import { ELEMENTS, ELEMENT_GLOSS, LEAVES, type Element, type MoveKey } from "../../taxonomy.ts";
import type { Lenses } from "../hooks/useAnatomyLayer.ts";
import { ElementIcon } from "./ElementIcon.tsx";
import { Tooltip } from "./Tooltip.tsx";

/** The chapter 1–8 layer's controls, when the sugya has anything to show. */
export type LegendAnatomyProps = {
  readonly on: boolean;
  readonly onToggle: (on: boolean) => void;
  readonly lenses: Lenses;
  readonly onLens: (family: Family) => void;
};

/** The fold policy's one switch, when the sugya has anything long-reaching to fold. */
export type LegendFoldProps = {
  /** On: a challenge's arrival folds the finished threads behind it (`threads`). Off: `flat`, as v3. */
  readonly threads: boolean;
  readonly onToggle: (on: boolean) => void;
};

export type LegendBarProps = {
  readonly anatomy?: LegendAnatomyProps;
  readonly fold?: LegendFoldProps;
};

const MASTER_TIP =
  "Ramchal's chapters 1–8 as a second layer over the chapter 9 moves: who is speaking, what each statement is made of, how two statements relate, what kind of deduction a proof is, and what it stands on. Off, the page shows only the seven moves. Your choice is remembered.";

const HUE_NOTE =
  "Colour marks the family: violet for chapters 3–6, teal for chapter 7, magenta for chapter 8, slate for chapter 1.";

/**
 * The key to the chapter 4 glyphs, shown once, on the Relations lens: every
 * relation is a variation of one shape, and the shape has to be learnt before
 * the variations can be read (`icons_v3/ICONS_REFERENCE.md` §3).
 */
const TileKey = (): JSX.Element => (
  <span className="legend-tip-tile">
    <svg
      className="glyph"
      width={30}
      height={30}
      viewBox={SQUARE_BOX}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: TILE_GLYPH }}
    />
    <span>
      One statement: the <b>box is the subject</b>, the <b>arrow is the predicate</b>, and it reads subject →
      predicate. Every relation glyph is two of these — a shared term drawn once, a negation drawn solid with
      the glyph in white, a narrower claim drawn smaller.
    </span>
  </span>
);

const FOLD_TIP =
  "What a challenge does when it arrives from far down the page. On, it folds the finished business behind it: every earlier challenge on the same claim stays as a row, every answer is tucked into a band, and the rail runs over the shorter page. Off, it arrives over the open text as before, with the rail drawn its full length. Flipping it re-lays the page out at the step you are on. Your choice is remembered.";

const leavesOf = (element: Element): string =>
  (Object.keys(LEAVES) as MoveKey[])
    .filter((key) => key.startsWith(`${element}/`))
    .map((key) => `${LEAVES[key].en} (${LEAVES[key].he})`)
    .join(", ");

/**
 * The seven ch. 9 icons with their glosses, each explained on hover; at the
 * right end, the switch for the chapter 1–8 layer; and under them, when the
 * layer is on, one pill per family to show or hide it.
 */
export const LegendBar = ({ anatomy, fold }: LegendBarProps): JSX.Element => (
  <div className="legend-block">
    <div className="legend-bar">
      <ul className="legend" aria-label="What each icon means">
        {ELEMENTS.map((element) => (
          <li key={element} className="legend-item">
            <Tooltip
              width={320}
              content={
                <span className="legend-tip">
                  <span>
                    <b>{element}</b> — {ELEMENT_GLOSS[element]}. One of the seven moves of chapter 9: what a
                    sentence <i>does</i> to an earlier one.
                  </span>
                  <span className="legend-tip-leaves">Its kinds: {leavesOf(element)}.</span>
                  {anatomy?.on ? (
                    <span className="legend-tip-leaves">
                      The badges beside the text are the other layer — what a sentence <i>is</i>, and how it
                      relates — and never change these icons.
                    </span>
                  ) : null}
                </span>
              }
            >
              <span className="legend-entry" tabIndex={0}>
                <ElementIcon element={element} size={20} />
                <span className="legend-name">{element}</span>
                <span className="legend-gloss">{ELEMENT_GLOSS[element]}</span>
              </span>
            </Tooltip>
          </li>
        ))}
      </ul>

      {anatomy === undefined && fold === undefined ? null : (
        <div className="legend-switches">
          {fold === undefined ? null : (
            <Tooltip width={340} content={<span>{FOLD_TIP}</span>} className="legend-switch-tip">
              <label className={`legend-switch legend-switch-fold${fold.threads ? " legend-switch-on" : ""}`}>
                <input
                  type="checkbox"
                  checked={fold.threads}
                  onChange={(event) => fold.onToggle(event.currentTarget.checked)}
                />
                Fold finished threads{" "}
                <span className="legend-switch-ch">{fold.threads ? "on arrival" : "off: as v3"}</span>
              </label>
            </Tooltip>
          )}
          {anatomy === undefined ? null : (
            <Tooltip width={320} content={<span>{MASTER_TIP}</span>} className="legend-switch-tip">
              <label className={`legend-switch${anatomy.on ? " legend-switch-on" : ""}`}>
                <input
                  type="checkbox"
                  checked={anatomy.on}
                  onChange={(event) => anatomy.onToggle(event.currentTarget.checked)}
                />
                Ramchal&rsquo;s anatomy <span className="legend-switch-ch">ch. 1–8</span>
              </label>
            </Tooltip>
          )}
        </div>
      )}
    </div>

    {anatomy?.on ? (
      <ul className="lenses" aria-label="Which families of badges to show">
        <li className="lenses-label">Also showing</li>
        {FAMILY_ORDER.map((family) => {
          const info = FAMILIES[family];
          const on = anatomy.lenses[family];
          return (
            <li key={family}>
              <Tooltip
                width={300}
                content={
                  <span className="legend-tip">
                    <span>
                      <b>{info.name}</b> · {info.chapter}
                    </span>
                    <span>{info.blurb}</span>
                    {family === "relations" ? <TileKey /> : null}
                    <span className="legend-tip-leaves">
                      {HUE_NOTE} Click to {on ? "hide" : "show"} these badges.
                    </span>
                  </span>
                }
              >
                <button
                  type="button"
                  className={`lens lens-${info.hue}${on ? " lens-on" : ""}`}
                  aria-pressed={on}
                  onClick={() => anatomy.onLens(family)}
                >
                  <span className="lens-dot" aria-hidden="true" />
                  {info.name}
                  <span className="lens-ch">{info.chapter}</span>
                </button>
              </Tooltip>
            </li>
          );
        })}
        <li className="lenses-note">badges: dashed outline = inferred, solid = attested or marked</li>
      </ul>
    ) : null}
  </div>
);
