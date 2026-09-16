"""Chapter 4 relations rebuilt from ONE statement shape.

The statement shape is a tag-shaped tile (a thick hollow arrow) with two cells:
  tail cell = subject, head cell = predicate, the seam between them = "is".
State of the shape:
  seam plain      = affirms            seam slashed   = denies
  glyph full      = all                glyph half     = some
  cells tinted    = the term           cells inverted = the term's opposite
Two statements are two tiles stacked. Cells that hold the SAME term are merged
across both rows, so "shared" is a merged cell and "different" is a split one.
A swap is drawn as crossed connectors between the rows.
"""
import math
from iconlib import *

OUT = "/home/claude/icons-ch4-7"
ICONS = []
def icon(name, gloss, body, colour):
    ICONS.append((name, gloss, body, colour))

X0, X1, SEAM, HEAD = -9.6, 9.6, -1.6, 3.4   # tile extent, seam x, arrowhead length
LJ = 'stroke-linejoin="round" stroke-linecap="round"'

def outline(c, inverted=False, w=1.45):
    if inverted:
        return f'fill="{c}" stroke="{c}" stroke-width="{w}" {LJ}'
    return f'fill="{c}" fill-opacity="0.15" stroke="{c}" stroke-width="{w}" {LJ}'

def pent(y0, y1, x0=X0, x1=X1, xs=None):
    """arrow-tile outline from x0 to the point at x1; xs = left edge override"""
    xl = x0 if xs is None else xs
    ym = (y0 + y1) / 2
    return f'M {xl} {y0} H {x1-HEAD:.2f} L {x1} {ym:.2f} L {x1-HEAD:.2f} {y1} H {xl} Z'

def glyph(kind, cx, cy, c, half=False, white=False, s=3.0):
    col = "#ffffff" if white else c
    r = s / 2
    if kind == "circle":
        full = f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r:.2f}" fill="{col}"/>'
        outl = f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r:.2f}" fill="none" stroke="{col}" stroke-width="1.1"/>'
        left = f'<path d="M {cx:.2f} {cy-r:.2f} A {r:.2f} {r:.2f} 0 0 0 {cx:.2f} {cy+r:.2f} Z" fill="{col}"/>'
    elif kind == "square":
        full = f'<rect x="{cx-r:.2f}" y="{cy-r:.2f}" width="{s}" height="{s}" rx="0.6" fill="{col}"/>'
        outl = f'<rect x="{cx-r:.2f}" y="{cy-r:.2f}" width="{s}" height="{s}" rx="0.6" fill="none" stroke="{col}" stroke-width="1.1"/>'
        left = f'<rect x="{cx-r:.2f}" y="{cy-r:.2f}" width="{r:.2f}" height="{s}" fill="{col}"/>'
    elif kind == "triangle":
        full = f'<path d="M {cx:.2f} {cy-r-0.3:.2f} L {cx+r+0.3:.2f} {cy+r-0.2:.2f} H {cx-r-0.3:.2f} Z" fill="{col}" stroke="{col}" stroke-width="0.6" {LJ}/>'
        outl = left = full
    elif kind == "diamond":
        full = f'<path d="M {cx:.2f} {cy-r-0.5:.2f} L {cx+r+0.5:.2f} {cy:.2f} L {cx:.2f} {cy+r+0.5:.2f} L {cx-r-0.5:.2f} {cy:.2f} Z" fill="{col}"/>'
        outl = left = full
    return full if not half else outl + "\n  " + left

def seam(y0, y1, c, deny=False, white=False, x=SEAM):
    col = "#ffffff" if white else c
    ym = (y0 + y1) / 2
    if deny:   # the seam becomes a small x: "is not"
        return f'<path d="M {x-1.5:.2f} {ym-1.5:.2f} L {x+1.5:.2f} {ym+1.5:.2f} M {x+1.5:.2f} {ym-1.5:.2f} L {x-1.5:.2f} {ym+1.5:.2f}" {st(col, 1.6)}/>'
    s = f'<path d="M {x} {y0+0.9:.2f} V {y1-0.9:.2f}" {st(col, 1.2)}/>'
    return s

def cells(y0, y1, c, tail, head, tail_half=False, deny=False, inverted=False):
    ym = (y0 + y1) / 2
    tx = (X0 + SEAM) / 2
    hx = (SEAM + X1 - HEAD) / 2 + 0.6
    return (glyph(tail, tx, ym, c, half=tail_half, white=inverted) + "\n  " +
            glyph(head, hx, ym, c, white=inverted) + "\n  " + seam(y0, y1, c, deny=deny, white=inverted))

def tile(y0, y1, c, tail, head, tail_half=False, deny=False, inverted=False):
    return f'<path d="{pent(y0, y1)}" {outline(c, inverted)}/>\n  ' + cells(y0, y1, c, tail, head, tail_half, deny, inverted)

# row geometry: two rows inside +-9.4
R1 = (-9.4, -2.4); R2 = (2.4, 9.4)
FULL = (-9.4, 9.4)

# ---------- the shape itself ----------
icon("statement-tile", "one statement: a subject cell, a seam that says 'is', a predicate cell",
     tile(-3.5, 3.5, V, "circle", "square"), V)

# ---------- chapter 4 relations ----------
def merged_full(c, deny2=False):
    return (f'<path d="{pent(*FULL)}" {outline(c)}/>\n  '
            f'<path d="M {X0+1.2} 0 H {X1-HEAD-1.0:.2f}" {st(c, 0.9)} stroke-dasharray="1.4 1.4"/>\n  ' +
            cells(*R1, c, "circle", "square") + "\n  " + cells(*R2, c, "circle", "square", deny=deny2))

icon("equivalent", "same subject, same predicate, said twice (דומים)", merged_full(V), V)

icon("diametrically-opposed", "same both; one says is, the other is not (הפכיים ממש)", merged_full(V, deny2=True), V)

# variant: one tall tail cell (shared subject), two heads (different predicates)
def variant(c):
    tall_tail = f'M {X0} {R1[0]} H {SEAM} V {R2[1]} H {X0} Z'
    head1 = f'M {SEAM} {R1[0]} H {X1-HEAD:.2f} L {X1} {(R1[0]+R1[1])/2:.2f} L {X1-HEAD:.2f} {R1[1]} H {SEAM} Z'
    head2 = f'M {SEAM} {R2[0]} H {X1-HEAD:.2f} L {X1} {(R2[0]+R2[1])/2:.2f} L {X1-HEAD:.2f} {R2[1]} H {SEAM} Z'
    tx = (X0 + SEAM) / 2; hx = (SEAM + X1 - HEAD) / 2 + 0.6
    return (f'<path d="{tall_tail}" {outline(c)}/>\n  <path d="{head1}" {outline(c)}/>\n  <path d="{head2}" {outline(c)}/>\n  ' +
            glyph("circle", tx, 0, c, s=4.0) + "\n  " + glyph("square", hx, (R1[0]+R1[1])/2, c) + "\n  " +
            glyph("triangle", hx, (R2[0]+R2[1])/2, c))
icon("variant", "same subject, different predicates (מתחלפים)", variant(V), V)

# contradictory: two tail cells (all / some), one shared head, seams is / is not
def contradictory(c):
    sx = SEAM + 1.0                      # seam a touch right: the shared head cell has room, the tails need it
    tail1 = f'M {X0} {R1[0]} H {sx} V {R1[1]} H {X0} Z'
    tail2 = f'M {X0} {R2[0]} H {sx} V {R2[1]} H {X0} Z'
    tall_head = f'M {sx} {R1[0]} H {X1-HEAD:.2f} L {X1} 0 L {X1-HEAD:.2f} {R2[1]} H {sx} Z'
    tx = (X0 + sx) / 2 - 0.5; hx = (sx + X1 - HEAD) / 2 + 0.6
    return (f'<path d="{tall_head}" {outline(c)}/>\n  <path d="{tail1}" {outline(c)}/>\n  <path d="{tail2}" {outline(c)}/>\n  ' +
            glyph("circle", tx, (R1[0]+R1[1])/2, c) + "\n  " + glyph("circle", tx, (R2[0]+R2[1])/2, c, half=True) + "\n  " +
            glyph("square", hx, 0, c, s=3.6) + "\n  " + seam(*R1, c, x=sx) + "\n  " + seam(*R2, c, deny=True, x=sx))
icon("contradictory", "all say is, some say is not: same terms, different scope (מתנגדים)", contradictory(V), V)

# swaps: two tiles, crossed connectors in the gap
def crossed(c):
    tx = (X0 + SEAM) / 2; hx = (SEAM + X1 - HEAD) / 2 + 0.6
    return (f'<path d="M {tx:.2f} {R1[1]+0.2:.2f} L {hx:.2f} {R2[0]-0.2:.2f} M {hx:.2f} {R1[1]+0.2:.2f} L {tx:.2f} {R2[0]-0.2:.2f}" '
            f'{st(c, 1.1)}/>')

icon("converse", "subject and predicate trade places (חלוף כולל)",
     tile(*R1, V, "circle", "square") + "\n  " + tile(*R2, V, "square", "circle") + "\n  " + crossed(V), V)

icon("converse-limited", "trade places, and all becomes some (חלוף קצתי)",
     tile(*R1, V, "circle", "square") + "\n  " + tile(*R2, V, "square", "circle", tail_half=True) + "\n  " + crossed(V), V)

icon("contrapositive", "trade places, and is becomes is not (חלוף הפכי)",
     tile(*R1, V, "circle", "square") + "\n  " + tile(*R2, V, "square", "circle", deny=True) + "\n  " + crossed(V), V)

icon("obverse", "both terms replaced by their opposites, same content (מתהפכים)",
     tile(*R1, V, "circle", "square") + "\n  " + tile(*R2, V, "circle", "square", inverted=True), V)

icon("incongruent", "different subject, different predicate (נבדלים)",
     tile(*R1, V, "circle", "square") + "\n  " + tile(*R2, V, "triangle", "diamond"), V)

write_icons(ICONS, OUT)
