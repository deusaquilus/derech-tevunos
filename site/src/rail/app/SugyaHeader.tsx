import type { JSX, ReactNode } from "react";

import type { Sugya } from "../sugya.ts";

export type SugyaHeaderProps = {
  readonly sugya: Sugya;
  readonly total: number;
  readonly movementCount: number;
  readonly deepest: number;
  readonly coverage: { readonly attested: number; readonly marked: number };
  readonly long: boolean;
  /**
   * The instructional line under the citation. Pages that frame the passage
   * differently pass their own; omitted, it falls back to the standard copy,
   * which is the only prose the visualization carries and the reason this is a
   * component rather than markup inlined in the view.
   */
  readonly hint?: ReactNode;
};

const defaultHint = ({
  total,
  movementCount,
  deepest,
  coverage,
  long,
}: Omit<SugyaHeaderProps, "sugya" | "hint">): ReactNode =>
  long ? (
    <>
      {total} sentences, {movementCount} movements, {deepest} levels deep. Unfold it a sentence at a
      time with the control under the last one, or a whole movement at a time from its heading. When
      a move reaches back past what fits on a screen, a rail in the left margin joins it to what it
      acts on: a challenge arrives with the rail drawn its full length, to be traced back up the
      page; a refutation or a ruling arrives with the sentences between folded away, so it is seen
      landing on the claim itself. Click the rail, or the band, to fold or unfold them. Any sentence
      can be folded back up to with the chevron at its right. Of the {total} labels,{" "}
      {coverage.attested} are Ramchal&rsquo;s own and {coverage.marked} rest on a stock Aramaic
      phrase; the rest are inferred. Tick <em>Ramchal&rsquo;s anatomy</em> in the legend for a second
      layer of badges — who is speaking, what each sentence is made of, and how it stands to what
      it acts on — each explained on hover.
    </>
  ) : (
    <>
      Drag the handle down the right-hand edge to unfold the argument one sentence at a time. Each
      sentence carries an icon naming what it does, and the verdicts change as the debate proceeds.
      Tick <em>Ramchal&rsquo;s anatomy</em> in the legend for a second layer of badges — what each
      sentence is made of and how it stands to what it acts on — each explained on hover.
    </>
  );

/**
 * The per-passage header: citation, title, and one instructional line. Kept
 * out of `SugyaView` so a page can supply its own framing (or none) without
 * forking the visualization.
 */
export const SugyaHeader = ({
  sugya,
  total,
  movementCount,
  deepest,
  coverage,
  long,
  hint,
}: SugyaHeaderProps): JSX.Element => (
  <header className="sheet-head">
    <h2>
      {sugya.tractate} {sugya.folio}
      <span className="sheet-title"> — {sugya.title}</span>
    </h2>
    <p className="sheet-cite">{sugya.discussedAt}</p>
    <p className="sheet-hint">
      {hint ?? defaultHint({ total, movementCount, deepest, coverage, long })}
    </p>
  </header>
);
