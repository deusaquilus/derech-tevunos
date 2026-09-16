"""Chapter 5: what a statement implies (Eng p66-74), drawn as two linked boxes.

Layout follows Alexander's sketch: the stated statement in a box on the left, the
inference in a box on the right, and a CONNECTOR between them that carries the
whole distinction:

  forced (מוכרח)          a plain solid arrow. Direct wire, nothing in the way.
  loose (בלתי מוכרח)      a resistor in the line. The current still flows, but the
                          link is resisted and can be broken (Berachos 53a, p70).
  some do, some don't     a double-shaft arrow: the immediate-inference rule of
  (הפך)                   logic notation, one claim yielding its own opposite.
"""
import os
from iconlib import *
from tilelib import *

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "icons", "ch4-7")
ICONS = []
def icon(name, gloss, body, colour):
    ICONS.append((name, gloss, body, colour))

VB_W = 36                      # wide canvas: viewBox -18 -12 36 24
BX0, BX1 = -17.2, -8.6        # left box
CX0, CX1 = 8.6, 17.2          # right box
BY0, BY1 = -4.8, 4.8
SW = 0.9                      # box outline
W = 1.0                       # connector stroke

def sbox(x0, x1, c, g, gs=3.5, half=False, deny=False, ghost=False):
    fill = (f'fill="{c}" fill-opacity="0.15" stroke="{c}" stroke-width="{SW}" {LJ} stroke-dasharray="1.8 1.4"'
            if ghost else fill_attrs(c, w=SW))
    cx = (x0 + x1) / 2
    parts = [f'<rect x="{x0}" y="{BY0}" width="{x1-x0:.2f}" height="{BY1-BY0:.2f}" rx="1.0" {fill}/>']
    parts.append(glyph(g, cx, 0, c, gs, half=half))
    if deny:   # struck through: the predicate denied
        a = gs / 2 + 0.6
        parts.append(f'<path d="M {cx-a:.2f} {a:.2f} L {cx+a:.2f} {-a:.2f}" {st("#ffffff", 1.9)}/>')
        parts.append(f'<path d="M {cx-a:.2f} {a:.2f} L {cx+a:.2f} {-a:.2f}" {st(c, 0.9)}/>')
    return "\n  ".join(parts)


def split_box(x0, x1, c, g, gs=3.8, low=0.22, cid="split"):
    """Dashed (implied) box, tinted, whose lower-right half is faded to low alpha: some are, some are not."""
    cx = (x0 + x1) / 2
    ul = f'M {x0-1} {BY0-1} H {x1+1} L {x0-1} {BY1+1} Z'          # upper-left triangle (with slack for the stroke)
    lr = f'M {x1+1} {BY0-1} V {BY1+1} H {x0-1} Z'                # lower-right triangle
    whole = (f'<rect x="{x0}" y="{BY0}" width="{x1-x0:.2f}" height="{BY1-BY0:.2f}" rx="1.0" '
             f'fill="{c}" fill-opacity="0.15" stroke="{c}" stroke-width="{SW}" {LJ} stroke-dasharray="1.8 1.4"/>\n  '
             + glyph(g, cx, 0, c, gs))
    return (f'<clipPath id="{cid}-a"><path d="{ul}"/></clipPath>\n  '
            f'<clipPath id="{cid}-b"><path d="{lr}"/></clipPath>\n  '
            f'<g clip-path="url(#{cid}-a)">\n  {whole}\n  </g>\n  '
            f'<g clip-path="url(#{cid}-b)" opacity="{low}">\n  {whole}\n  </g>')

def head(x, c, size=2.4, w=1.0):
    return f'<path d="M {x-size:.2f} {-size:.2f} L {x:.2f} 0 L {x-size:.2f} {size:.2f}" {st(c, w)}/>'

def wire_plain(c):
    return f'<path d="M {BX1} 0 H {CX0-0.4:.2f}" {st(c, W)}/>\n  ' + head(CX0 - 0.4, c)

def wire_resistor(c, amp=2.1, waves=2):
    """A smooth wave in the line, like a tilde: the link is there, but it wobbles."""
    x0 = BX1 + 2.4
    x1 = CX0 - 4.0
    period = (x1 - x0) / waves
    q = period / 4
    d = f'M {BX1} 0 H {x0:.2f} '
    x = x0
    for _ in range(waves):
        # one full wave as two smooth half-waves (cubic curves through the peak and trough)
        d += (f'C {x+0.55*q:.2f} {-amp*1.35:.2f}, {x+1.45*q:.2f} {-amp*1.35:.2f}, {x+2*q:.2f} 0 '
              f'C {x+2.55*q:.2f} {amp*1.35:.2f}, {x+3.45*q:.2f} {amp*1.35:.2f}, {x+4*q:.2f} 0 ')
        x += period
    d += f'H {CX0-0.4:.2f}'
    return f'<path d="{d}" fill="none" stroke="{c}" stroke-width="{W}" stroke-linejoin="round" stroke-linecap="round"/>\n  ' + head(CX0 - 0.4, c)

def wire_double(c, gap=1.3):
    return (f'<path d="M {BX1} {-gap:.2f} H {CX0-2.8:.2f}" {st(c, W)}/>\n  '
            f'<path d="M {BX1} {gap:.2f} H {CX0-2.8:.2f}" {st(c, W)}/>\n  ' + head(CX0 - 0.4, c, size=2.6))

icon("inference-necessary",
     "stated on the left, implied on the right (dashed: nobody said it), wired straight through (מוכרח)",
     sbox(BX0, BX1, V, "square") + "\n  " + wire_plain(V) + "\n  " + sbox(CX0, CX1, V, "triangle", gs=3.8, ghost=True), V)

icon("inference-loose",
     "the wording suggests it, but the line wobbles: the link is there but not firm (בלתי מוכרח)",
     sbox(BX0, BX1, V, "square") + "\n  " + wire_resistor(V) + "\n  " + sbox(CX0, CX1, V, "triangle", gs=3.8, ghost=True), V)

icon("absolute-opposite",
     "some do, therefore some do not: the implied box half present, half faded (הפך)",
     sbox(BX0, BX1, V, "square") + "\n  " + wire_double(V) + "\n  " + split_box(CX0, CX1, V, "square", cid="abs"), V)

WIDE = '''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="192" height="128" viewBox="-18 -12 36 24" role="img" aria-label="{name}">
  <title>{name}: {gloss}</title>
  {body}
</svg>
'''
os.makedirs(OUT, exist_ok=True)
for name, gloss, body, colour in ICONS:
    with open(os.path.join(OUT, f"{name}.svg"), "w", encoding="utf-8") as f:
        f.write(WIDE.format(name=name, gloss=gloss, body=body))
print(len(ICONS), "wide icons written to", OUT)
