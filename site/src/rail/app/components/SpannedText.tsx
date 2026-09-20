import { Fragment, type JSX } from "react";

import { ROLE_GLYPHS, SQUARE_BOX } from "../../glyphs.ts";
import { segments, SPAN_ROLE_INFO, type RoleSpans, type SpanRole } from "../../spans.ts";
import { LIGHT } from "../../theme.ts";
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

const RoleTip = ({ roles }: { readonly roles: readonly SpanRole[] }): JSX.Element => (
  <span className="legend-tip">
    {roles.map((role) => {
      const info = SPAN_ROLE_INFO[role];
      return (
        <span key={role} className="row-span-tip-role">
          <RoleGlyph role={role} size={22} />
          <span>
            <b>{info.en}</b> · <span lang="he">{info.he}</span>
            <br />
            <span className="legend-tip-leaves">{info.plain}.</span>
          </span>
        </span>
      );
    })}
    <span className="legend-tip-leaves">
      A word-level role from the file's <code>spans</code>: which words of this sentence play the part. Chapter{" "}
      {[...new Set(roles.map((r) => SPAN_ROLE_INFO[r].chapter))].join(" and ")}.
    </span>
  </span>
);

export type SpannedTextProps = {
  readonly text: string;
  readonly spans: RoleSpans | undefined;
  readonly className: string;
  readonly lang?: string;
  readonly dir?: "rtl" | "ltr";
};

/**
 * A unit's text with its word-span roles drawn on it: each run of words in a
 * role is underlined in the role's hue and explains itself on hover, with
 * the role's icon and name. The text is emitted character for character —
 * `segments` cuts it without altering it — so a unit with no spans renders
 * exactly as it did before, one plain span.
 */
export const SpannedText = ({ text, spans, className, lang, dir }: SpannedTextProps): JSX.Element => {
  const segs = segments(text, spans);
  if (segs.every((s) => s.roles.length === 0)) {
    return (
      <span className={className} lang={lang} dir={dir}>
        {text}
      </span>
    );
  }
  return (
    <span className={className} lang={lang} dir={dir}>
      {segs.map((seg, i) =>
        seg.roles.length === 0 ? (
          <Fragment key={i}>{seg.text}</Fragment>
        ) : (
          <Tooltip key={i} content={<RoleTip roles={seg.roles} />} width={260} className="row-span-tip">
            <span
              className={`row-span ${seg.roles.map((r) => `row-span-${r}`).join(" ")}`}
              style={{ textDecorationColor: LIGHT.hue[SPAN_ROLE_INFO[seg.roles[0]!].hue] }}
              data-roles={seg.roles.join(" ")}
            >
              {seg.text}
            </span>
          </Tooltip>
        ),
      )}
    </span>
  );
};
