import type { JSX } from "react";

import { FAMILIES, type Badge } from "../../anatomy.ts";
import type { LabelBasis } from "../../sugya.ts";
import { Glyph } from "./Glyph.tsx";

/** Where the badge sits, which decides what its tooltip says it is about. */
export type BadgeWhere = "row" | "speaker" | "edge" | "strip";

export type BadgeTipProps = {
  readonly badge: Badge;
  readonly where: BadgeWhere;
  /** 1-based position of the sentence the badge sits on. */
  readonly ordinal?: number;
  /** 1-based position of the sentence that sentence acts on. */
  readonly targetOrdinal?: number;
  /** For an edge chip: a bead is on the line too, and hovering lights both. */
  readonly beadDrawn?: boolean;
};

export const BASIS_WORDING: Record<LabelBasis, string> = {
  attested: "Ramchal's own label for this passage",
  marked: "the type's stock word is in the text",
  inferred: "inferred, not attested",
};

const about = ({ badge, where, ordinal, targetOrdinal, beadDrawn }: BadgeTipProps): string => {
  const here = ordinal === undefined ? "this sentence" : `sentence ${ordinal}`;
  const there = targetOrdinal === undefined ? "the sentence it acts on" : `sentence ${targetOrdinal}`;
  const bead =
    beadDrawn === true ? ", and the bead on the line between them — the same badge, drawn where the line is" : "";
  switch (where) {
    case "row":
      return `About ${here} on its own: what it is made of, not what it does.`;
    case "speaker":
      return `About who is speaking in ${here}. No one is named, so this is the Talmud's own voice.`;
    case "edge":
      // A ground is not a relation between the two sentences: it is what the
      // move from the one to the other rests on, or how it is turned aside.
      return badge.info.family === "grounds"
        ? `What ${here}'s move on ${there} stands on, or how it is turned aside. Hovering highlights that sentence${bead}.`
        : `Relates ${here} to ${there}, the one it acts on. Hovering highlights that sentence${bead}.`;
    case "strip":
      return "About the passage as a whole, not any one sentence.";
    default: {
      const exhaustive: never = where;
      return exhaustive;
    }
  }
};

/**
 * The explanation every badge carries: what the type is called, how it reads
 * in everyday words, what it means, what this particular badge is about, and
 * where in the book it comes from. It is the whole of what the layer has to
 * say about a badge, so nothing here is a summary of anything longer.
 */
export const BadgeTip = (props: BadgeTipProps): JSX.Element => {
  const { badge } = props;
  const { info, basis, note } = badge;
  const family = FAMILIES[info.family];
  return (
    <span className="badge-tip">
      <span className="badge-tip-head">
        <Glyph kind={info.key} size={18} />
        <span className="badge-tip-name">{info.en}</span>
        {info.he === undefined ? null : (
          <span className="badge-tip-he" lang="he" dir="rtl">
            {info.he}
          </span>
        )}
      </span>
      <span className={`badge-tip-reads badge-tip-${family.hue}`}>
        {info.short} — {info.reads}
        {info.word === undefined ? null : (
          <span className="badge-tip-word">
            {" "}
            · marked by <span lang="he">“{info.word}”</span>
          </span>
        )}
      </span>
      <span>{info.definition}</span>
      {note === undefined ? null : <span className="badge-tip-note">{note}</span>}
      <span className="badge-tip-where">{about(props)}</span>
      <span className="badge-tip-foot">
        {family.name} · {family.chapter} · {info.page} · {BASIS_WORDING[basis]}
      </span>
    </span>
  );
};
