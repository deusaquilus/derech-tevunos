"""Chapter 5: what a statement implies (Eng p66-74), drawn from the statement shape.

Every icon is a proof diagram: the STATED statement above an inference bar, the
UNSTATED inference below it, drawn as a ghost (dashed outline, no fill) because
nobody said it. The difference between the two kinds of inference is the link:

  necessary (מוכרח)       a double bar, hard-wired. You cannot cut it.
  not necessary (בלתי מוכרח)  a bar broken by an open switch, the same circuit
                          symbol used for the conditional statement in Part 1.
                          The link can be opened: keep the statement, drop the
                          inference (Berachos 53a, Eng p70).
"""
from iconlib import *
from tilelib import *

OUT = "/home/claude/icons-ch4-7"
ICONS = []
def icon(name, gloss, body, colour):
    ICONS.append((name, gloss, body, colour))

GHOST = 'fill="none" stroke-dasharray="2.2 1.7"'

def stmt(y0, y1, c, g="square", gs=None, ghost=False, half=False, deny=False, x0=-9.4, x1=9.4, head=3.2, barb=1.0):
    """One statement: a box fused to an arrowhead. ghost=True means implied, not stated."""
    br = x1 - head
    ym = (y0 + y1) / 2
    path = f'M {x0} {y0} H {br:.2f} V {y0-barb:.2f} L {x1} {ym:.2f} L {br:.2f} {y1+barb:.2f} V {y1} H {x0} Z'
    fill = f'fill="none" stroke="{c}" stroke-width="1.45" {LJ} stroke-dasharray="2.3 1.8"' if ghost else fill_attrs(c)
    s = gs if gs else min(3.4, (y1 - y0) - 2.6)
    gx = (x0 + br) / 2 if not deny else x0 + (br - x0) * 0.24
    parts = [f'<path d="{path}" {fill}/>', glyph(g, gx, ym, c, s, half=half)]
    if deny:   # the x sits in the arrowhead half: "is not"
        dx = (gx + br) / 2 + 0.6
        a = 1.45
        parts.append(f'<path d="M {dx-a:.2f} {ym-a:.2f} L {dx+a:.2f} {ym+a:.2f} M {dx+a:.2f} {ym-a:.2f} L {dx-a:.2f} {ym+a:.2f}" {st(c, 1.7)}/>')
    return "\n  ".join(parts)

def double_bar(c, y=0.0, x0=-7.6, x1=7.6, gap=1.6, w=1.3):
    return (f'<path d="M {x0} {y-gap/2:.2f} H {x1}" {st(c, w)}/>\n  '
            f'<path d="M {x0} {y+gap/2:.2f} H {x1}" {st(c, w)}/>')

def switch_bar(c, y=0.0, x0=-7.6, x1=7.6, w=1.4, gapw=5.0, lift=2.8):
    """A single inference bar broken in the middle by an open switch."""
    gl, gr = -gapw/2, gapw/2
    return (f'<path d="M {x0} {y} H {gl:.2f}" {st(c, w)}/>\n  '
            f'<path d="M {gr:.2f} {y} H {x1}" {st(c, w)}/>\n  '
            f'<path d="M {gl:.2f} {y} L {gr-0.4:.2f} {y-lift:.2f}" {st(c, w)}/>\n  '
            f'<circle cx="{gl:.2f}" cy="{y}" r="1.25" fill="{c}"/>\n  '
            f'<circle cx="{gr:.2f}" cy="{y}" r="1.25" fill="{c}"/>')

TOP = (-9.6, -4.2); BOT = (4.2, 9.6)

icon("inference-necessary",
     "stated above, implied below, hard-wired: you cannot accept the one and reject the other (מוכרח)",
     stmt(*TOP, V, "square", gs=3.0) + "\n  " + double_bar(V) + "\n  " + stmt(*BOT, V, "square", gs=3.0, ghost=True), V)

icon("inference-loose",
     "the wording suggests it, but the link can be opened: keep the statement, drop the inference (בלתי מוכרח)",
     stmt(*TOP, V, "square", gs=3.0) + "\n  " + switch_bar(V) + "\n  " + stmt(*BOT, V, "square", gs=3.0, ghost=True), V)

icon("absolute-opposite",
     "some do, therefore some do not: the same subject, the predicate denied (הפך)",
     stmt(*TOP, V, "square", half=True, gs=2.9) + "\n  " + double_bar(V) + "\n  " +
     stmt(*BOT, V, "square", half=True, gs=2.9, deny=True, ghost=True), V)

write_icons(ICONS, OUT)
