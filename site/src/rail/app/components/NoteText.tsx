import { Fragment, type JSX } from "react";

import { notePieces } from "../../markup.ts";

export type NoteTextProps = {
  readonly note: string;
};

/**
 * A `note` — an anatomy label's or a span's — with its backtick quotations
 * drawn as quoted words: the same face as the sentence around them, on a faint
 * chip, and bidi-isolated so `הואיל וחזותו מוכיח עליו` inside an English
 * sentence keeps its punctuation on the right side. Until 2026-09-20 both
 * tooltips printed the backticks literally.
 */
export const NoteText = ({ note }: NoteTextProps): JSX.Element => (
  <>
    {notePieces(note).map((piece, i) =>
      piece.kind === "quoted" ? (
        <span key={i} className="note-quoted" dir="auto">
          {piece.text}
        </span>
      ) : (
        <Fragment key={i}>{piece.text}</Fragment>
      ),
    )}
  </>
);
