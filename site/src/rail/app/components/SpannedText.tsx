import { Fragment, useState, type CSSProperties, type JSX } from "react";

import { ROLE_GLYPHS, SQUARE_BOX } from "../../glyphs.ts";
import { loudSegment, rolesOf, segments, SPAN_ROLE_INFO, type Cover, type SpanRole, type Spans, type SpanText } from "../../spans.ts";
import { LIGHT } from "../../theme.ts";
import { NoteText } from "./NoteText.tsx";
import { Tooltip } from "./Tooltip.tsx";

export type RoleGlyphProps = {
  readonly role: SpanRole;
  readonly size?: number;
};

/** One role's drawing, in its hue — the same bodies the icon set ships, recoloured to `currentColor`. */
export const RoleGlyph = ({ role, size = 16 }: RoleGlyphProps): JSX.Element => (
  <svg
    className="glyph"
    width={size}
    height={size}
    viewBox={SQUARE_BOX}
    style={{ color: LIGHT.hue[SPAN_ROLE_INFO[role].hue] }}
    aria-hidden="true"
    dangerouslySetInnerHTML={{ __html: ROLE_GLYPHS[role] }}
  />
);

/**
 * What a span says for itself. Minimal by default — each covering span's
 * role, a small icon beside a loud one, and the span's note if the file wrote
 * one, because the note is the reason these words are that role and is the
 * one thing a reader cannot work out alone. The role's definition is not
 * shown: a reader who has met an antecedent knows what one is. A click on the
 * span expands it to the full account: the icon at reading size, the Hebrew,
 * the gloss, the chapter, and the note again beneath its role.
 */
const RoleTip = ({ covers, expanded }: { readonly covers: readonly Cover[]; readonly expanded: boolean }): JSX.Element => {
  if (!expanded) {
    return (
      <span className="row-span-tip-min">
        {covers.map((cover) => (
          <span key={`${cover.role}-${cover.index}`} className="row-span-tip-min-cover">
            <span className="row-span-tip-min-role">
              {cover.span.showLoud === true ? <RoleGlyph role={cover.role} size={14} /> : null}
              <span>{SPAN_ROLE_INFO[cover.role].en}</span>
            </span>
            {cover.span.note === undefined ? null : (
              <span className="row-span-tip-note">
                <NoteText note={cover.span.note} />
              </span>
            )}
          </span>
        ))}
        <span className="row-span-tip-more">click for more</span>
      </span>
    );
  }
  const loud = covers.some((c) => c.span.showLoud === true);
  return (
    <span className="legend-tip">
      {covers.map((cover) => {
        const info = SPAN_ROLE_INFO[cover.role];
        return (
          <span key={`${cover.role}-${cover.index}`} className="row-span-tip-role">
            <RoleGlyph role={cover.role} size={22} />
            <span>
              <b>{info.en}</b> · <span lang="he">{info.he}</span>
              <br />
              <span className="legend-tip-leaves">{info.plain}.</span>
              {cover.span.note === undefined ? null : (
                <>
                  <br />
                  <span className="row-span-tip-note">
                    <NoteText note={cover.span.note} />
                  </span>
                </>
              )}
            </span>
          </span>
        );
      })}
      <span className="legend-tip-leaves">
        A word-level role from the file's <code>spans</code>: which words of this sentence play the part. Chapter{" "}
        {[...new Set(covers.map((c) => SPAN_ROLE_INFO[c.role].chapter))].join(" and ")}.
        {loud ? " The file marks this span as one the argument turns on." : ""}
      </span>
    </span>
  );
};

export type SpannedTextProps = {
  readonly text: string;
  /** The unit's spans; `which` says which of the unit's texts this is, so the right projection is drawn. */
  readonly spans: Spans | undefined;
  readonly which: SpanText;
  /** The legend's "Detailed spans" switch: draw every span the loud way, not only the loud ones. */
  readonly detailed?: boolean;
  readonly className: string;
  readonly lang?: string;
  readonly dir?: "rtl" | "ltr";
};

/**
 * A unit's text with its word-span roles drawn on it. A span the file marks
 * loud — or every span, when the reader has switched on "Detailed spans" —
 * is a hairline dotted underline at a trace of the role's hue and explains
 * itself on hover; a quiet span is the same hairline in a taupe that nearly
 * blends into the paper, there to be found and not to be seen, and names
 * itself only when the pointer rests on it. Neither interrupts a reader who
 * came for the sentence. A click on either expands
 * its popup to the full account. The text is emitted character for character —
 * `segments` cuts it without altering it — so a unit with no spans renders
 * exactly as it did before, one plain span.
 */
export const SpannedText = ({ text, spans, which, detailed = false, className, lang, dir }: SpannedTextProps): JSX.Element => {
  const [expanded, setExpanded] = useState<number | undefined>(undefined);
  const segs = segments(text, spans, which);
  if (segs.every((s) => s.covers.length === 0)) {
    return (
      <span className={className} lang={lang} dir={dir}>
        {text}
      </span>
    );
  }
  return (
    <span className={className} lang={lang} dir={dir}>
      {segs.map((seg, i) => {
        if (seg.covers.length === 0) return <Fragment key={i}>{seg.text}</Fragment>;
        const roles = rolesOf(seg);
        const loud = loudSegment(seg);
        const full = loud || detailed;
        const noted = seg.covers.some((c) => c.span.note !== undefined);
        const hue = LIGHT.hue[SPAN_ROLE_INFO[roles[0]!].hue];
        return (
          <Tooltip
            key={i}
            content={<RoleTip covers={seg.covers} expanded={expanded === i} />}
            width={expanded === i ? 280 : noted ? 240 : 170}
            className="row-span-tip"
            onHover={(on) => {
              if (!on) setExpanded(undefined);
            }}
          >
            <span
              className={`row-span ${full ? "row-span-loud" : "row-span-quiet"} ${roles.map((r) => `row-span-${r}`).join(" ")}`}
              style={{ "--span-hue": hue } as CSSProperties}
              data-roles={roles.join(" ")}
              onClick={() => setExpanded((current) => (current === i ? undefined : i))}
            >
              {seg.text}
            </span>
          </Tooltip>
        );
      })}
    </span>
  );
};
