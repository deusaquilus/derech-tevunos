"""Chapter 4 relations from ONE statement shape, v2.

Statement shape: a tag-shaped tile (thick hollow arrow) with two cells.
  tail cell = subject, head cell = predicate, seam = "is"
  seam plain = affirms, seam x = denies
  subject glyph full = all, half = some
  same glyph = same term, new glyph = new term
v2 keeps the strongest silhouettes of the first pass:
  head-on / contradictory: two tiles pointing at each other, tips meeting
  equivalent: two identical tiles, one behind the other
  obverse: the second tile mirrored, pointing the other way
"""
from iconlib import *

OUT = "/home/claude/icons-ch4-7"
ICONS = []
def icon(name, gloss, body, colour):
    ICONS.append((name, gloss, body, colour))

LJ = 'stroke-linejoin="round" stroke-linecap="round"'
TINT = "#ede9fe"   # violet at 15% over white, as an opaque fill where a tile must occlude another

def fill_attrs(c, inverted=False, opaque=False, w=1.45):
    if inverted:
        return f'fill="{c}" stroke="{c}" stroke-width="{w}" {LJ}'
    if opaque:
        return f'fill="{TINT}" stroke="{c}" stroke-width="{w}" {LJ}'
    return f'fill="{c}" fill-opacity="0.15" stroke="{c}" stroke-width="{w}" {LJ}'

def glyph(kind, cx, cy, c, s, half=False, white=False):
    col = "#ffffff" if white else c
    r = s / 2
    if kind == "circle":
        full = f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r:.2f}" fill="{col}"/>'
        outl = f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r:.2f}" fill="none" stroke="{col}" stroke-width="{max(0.8, s*0.33):.2f}"/>'
        left = f'<path d="M {cx:.2f} {cy-r:.2f} A {r:.2f} {r:.2f} 0 0 0 {cx:.2f} {cy+r:.2f} Z" fill="{col}"/>'
    elif kind == "square":
        full = f'<rect x="{cx-r:.2f}" y="{cy-r:.2f}" width="{s:.2f}" height="{s:.2f}" rx="{s*0.18:.2f}" fill="{col}"/>'
        outl = f'<rect x="{cx-r:.2f}" y="{cy-r:.2f}" width="{s:.2f}" height="{s:.2f}" rx="{s*0.18:.2f}" fill="none" stroke="{col}" stroke-width="{max(0.8, s*0.33):.2f}"/>'
        left = f'<rect x="{cx-r:.2f}" y="{cy-r:.2f}" width="{r:.2f}" height="{s:.2f}" fill="{col}"/>'
    elif kind == "triangle":
        full = f'<path d="M {cx:.2f} {cy-r-0.3:.2f} L {cx+r+0.3:.2f} {cy+r-0.2:.2f} H {cx-r-0.3:.2f} Z" fill="{col}" stroke="{col}" stroke-width="0.6" {LJ}/>'
        outl = left = full
    elif kind == "diamond":
        full = f'<path d="M {cx:.2f} {cy-r-0.5:.2f} L {cx+r+0.5:.2f} {cy:.2f} L {cx:.2f} {cy+r+0.5:.2f} L {cx-r-0.5:.2f} {cy:.2f} Z" fill="{col}"/>'
        outl = left = full
    return full if not half else outl + "\n  " + left

def seam_mark(x, y0, y1, c, deny=False, white=False, k=1.0):
    col = "#ffffff" if white else c
    ym = (y0 + y1) / 2
    if deny:
        a = 1.5 * k
        return f'<path d="M {x-a:.2f} {ym-a:.2f} L {x+a:.2f} {ym+a:.2f} M {x+a:.2f} {ym-a:.2f} L {x-a:.2f} {ym+a:.2f}" {st(col, 1.6*k)}/>'
    return f'<path d="M {x:.2f} {y0+0.9:.2f} V {y1-0.9:.2f}" {st(col, 1.2)}/>'

def tile(xl, xr, y0, y1, c, tail="circle", head="square", tail_half=False, deny=False,
         inverted=False, flip=False, opaque=False, glyph_s=None, mark_k=None):
    """A tile whose body spans xl..xr and points right at xr. flip=True mirrors it so it points left at xl."""
    h = y1 - y0
    head_len = min(3.4, 0.30 * (xr - xl))
    body_r = xr - head_len
    seam_x = xl + 0.48 * (body_r - xl)
    s = glyph_s if glyph_s else min(3.0, 0.42 * h)
    k = mark_k if mark_k else min(1.0, h / 7.0)
    ym = (y0 + y1) / 2
    tx = (xl + seam_x) / 2
    hx = (seam_x + body_r) / 2 + 0.15 * head_len
    path = f'M {xl:.2f} {y0:.2f} H {body_r:.2f} L {xr:.2f} {ym:.2f} L {body_r:.2f} {y1:.2f} H {xl:.2f} Z'
    parts = [f'<path d="{path}" {fill_attrs(c, inverted, opaque)}/>',
             glyph(tail, tx, ym, c, s, half=tail_half, white=inverted),
             glyph(head, hx, ym, c, s, white=inverted),
             seam_mark(seam_x, y0, y1, c, deny=deny, white=inverted, k=k)]
    out = "\n  ".join(parts)
    if flip:
        out = f'<g transform="translate({xl + xr:.2f} 0) scale(-1 1)">\n  ' + out + '\n  </g>'
    return out

# row geometry for stacked pairs
R1 = (-9.4, -2.4); R2 = (2.4, 9.4)
XL, XR = -9.6, 9.6

# ---------- the shape ----------
icon("statement-tile", "one statement: a subject cell, a seam that says is, a predicate cell",
     tile(XL, XR, -3.5, 3.5, V), V)

# ---------- chapter 4 ----------
# equivalent: two identical tiles, one behind the other (the first-pass "stacked copies" silhouette)
icon("equivalent", "the same statement, twice (דומים)",
     tile(-7.0, 9.6, -8.6, -0.4, V) + "\n  " + tile(-9.6, 7.0, 0.4, 8.6, V, opaque=True), V)

# variant: shared tail cell, two heads with different predicate glyphs (unchanged from v1)
def variant(c):
    seam_x = XL + 0.48 * (XR - 3.4 - XL)
    tall_tail = f'M {XL} {R1[0]} H {seam_x:.2f} V {R2[1]} H {XL} Z'
    def head(y0, y1):
        return f'M {seam_x:.2f} {y0} H {XR-3.4:.2f} L {XR} {(y0+y1)/2:.2f} L {XR-3.4:.2f} {y1} H {seam_x:.2f} Z'
    tx = (XL + seam_x) / 2; hx = (seam_x + XR - 3.4) / 2 + 0.5
    return (f'<path d="{tall_tail}" {fill_attrs(c)}/>\n  <path d="{head(*R1)}" {fill_attrs(c)}/>\n  <path d="{head(*R2)}" {fill_attrs(c)}/>\n  ' +
            glyph("circle", tx, 0, c, 3.6) + "\n  " + glyph("square", hx, (R1[0]+R1[1])/2, c, 3.0) + "\n  " +
            glyph("triangle", hx, (R2[0]+R2[1])/2, c, 3.0))
icon("variant", "same subject, different predicates (מתחלפים)", variant(V), V)

# head-on: two identical tiles pointing at each other, tips meeting; one says is, the other is not
icon("diametrically-opposed", "same terms, yes against no, tip to tip (הפכיים ממש)",
     tile(-9.6, -0.6, -4.5, 4.5, V, glyph_s=2.3) + "\n  " + tile(0.6, 9.6, -4.5, 4.5, V, flip=True, deny=True, glyph_s=2.3, mark_k=0.85), V)

# contradictory: a big tile (all, is) against a small one (some, is not), tip to tip
icon("contradictory", "all say is, some say is not, tip to tip (מתנגדים)",
     tile(-9.6, -0.6, -4.9, 4.9, V, glyph_s=2.7) + "\n  " + tile(1.6, 9.6, -2.7, 2.7, V, flip=True, deny=True, tail_half=True, glyph_s=1.8, mark_k=0.72), V)

# swaps: two tiles stacked, crossed connectors in the gap (unchanged from v1)
def crossed(c):
    seam_x = XL + 0.48 * (XR - 3.4 - XL)
    tx = (XL + seam_x) / 2; hx = (seam_x + XR - 3.4) / 2 + 0.5
    return (f'<path d="M {tx:.2f} {R1[1]+0.2:.2f} L {hx:.2f} {R2[0]-0.2:.2f} M {hx:.2f} {R1[1]+0.2:.2f} L {tx:.2f} {R2[0]-0.2:.2f}" {st(c, 1.1)}/>')

icon("converse", "subject and predicate trade places (חלוף כולל)",
     tile(XL, XR, *R1, V) + "\n  " + tile(XL, XR, *R2, V, tail="square", head="circle") + "\n  " + crossed(V), V)
icon("converse-limited", "trade places, and all becomes some (חלוף קצתי)",
     tile(XL, XR, *R1, V) + "\n  " + tile(XL, XR, *R2, V, tail="square", head="circle", tail_half=True) + "\n  " + crossed(V), V)
icon("contrapositive", "trade places, and is becomes is not (חלוף הפכי)",
     tile(XL, XR, *R1, V) + "\n  " + tile(XL, XR, *R2, V, tail="square", head="circle", deny=True) + "\n  " + crossed(V), V)

# obverse: the same statement mirrored, pointing the other way
icon("obverse", "both terms replaced by their opposites: the same statement, mirrored (מתהפכים)",
     tile(XL, XR, *R1, V) + "\n  " + tile(XL, XR, *R2, V, flip=True), V)

icon("incongruent", "different subject, different predicate (נבדלים)",
     tile(XL, XR, *R1, V) + "\n  " + tile(XL, XR, *R2, V, tail="triangle", head="diamond"), V)

write_icons(ICONS, OUT)
