import { useCallback, useEffect, useRef, useState, type JSX, type ReactNode } from "react";

export type TooltipProps = {
  readonly content: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
  /** Fires with `true` on enter or focus and `false` on leave or blur, for anything that should light up alongside. */
  readonly onHover?: (on: boolean) => void;
  readonly width?: number;
  /**
   * A short line shown without being asked for, when something else on the
   * page is pointing at this anchor's twin and the reader has to be told that
   * the explanation is here. The reader's own hover replaces it with `content`.
   */
  readonly hint?: ReactNode;
  readonly hintWidth?: number;
};

type Placement = {
  readonly side: "left" | "right";
  readonly vert: "below" | "above";
};

/** A generous guess at the popup's height, for deciding whether it fits below. */
const POP_HEIGHT = 170;
const GUTTER = 12;

/**
 * A real popup on hover or focus, styled and positioned by the page. The
 * native `title` attribute is not relied on anywhere a reader needs the
 * explanation: it is slow to appear, unstyled, and in some embeddings never
 * shows at all. The popup flips to the other side of its anchor when it would
 * leave the viewport, and takes no pointer events, so it never gets in the way
 * of the thing it explains.
 */
export const Tooltip = ({
  content,
  children,
  className,
  onHover,
  width = 300,
  hint,
  hintWidth = 210,
}: TooltipProps): JSX.Element => {
  const ref = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>({ side: "left", vert: "below" });

  const place = useCallback((w: number): void => {
    const anchor = ref.current;
    if (anchor === null) return;
    const box = anchor.getBoundingClientRect();
    const side = box.left + w <= window.innerWidth - GUTTER ? "left" : "right";
    const vert = box.bottom + POP_HEIGHT <= window.innerHeight - GUTTER ? "below" : "above";
    // Same placement, same object: a hint is placed from an effect, and a new
    // object every render would ask for another.
    setPlacement((p) => (p.side === side && p.vert === vert ? p : { side, vert }));
  }, []);

  const show = useCallback(
    (on: boolean): void => {
      if (on) place(width);
      setOpen(on);
      onHover?.(on);
    },
    [onHover, place, width],
  );

  const hinting = hint !== undefined && !open;
  useEffect(() => {
    if (hinting) place(hintWidth);
  }, [hinting, hintWidth, place]);

  return (
    <span
      ref={ref}
      className={`tip${className === undefined ? "" : ` ${className}`}`}
      onMouseEnter={() => show(true)}
      onMouseLeave={() => show(false)}
      onFocus={() => show(true)}
      onBlur={() => show(false)}
    >
      {children}
      {open || hinting ? (
        <span
          role="tooltip"
          className={`tip-pop tip-pop-${placement.side} tip-pop-${placement.vert}${
            open ? "" : " tip-pop-hint"
          }`}
          style={{ width: open ? width : hintWidth }}
        >
          {open ? content : hint}
        </span>
      ) : null}
    </span>
  );
};
