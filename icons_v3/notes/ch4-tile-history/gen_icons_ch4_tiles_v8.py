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

BARB = 1.0   # how far the arrowhead's corners protrude beyond the body, top and bottom

def tile(xl, xr, y0, y1, c, tail="circle", head="square", tail_half=False, deny=False,
         inverted=False, flip=False, opaque=False, glyph_s=None, mark_k=None, single=None, barb=BARB):
    """An arrow-shaped tile: body xl..body_r, head with protruding corners, tip at xr.
    single=<glyph> draws one centred glyph and no seam. flip=True mirrors it to point left at xl."""
    h = y1 - y0
    head_len = min(3.6, 0.30 * (xr - xl))
    body_r = xr - head_len
    ym = (y0 + y1) / 2
    path = (f'M {xl:.2f} {y0:.2f} H {body_r:.2f} V {y0-barb:.2f} L {xr:.2f} {ym:.2f} '
            f'L {body_r:.2f} {y1+barb:.2f} V {y1:.2f} H {xl:.2f} Z')
    parts = [f'<path d="{path}" {fill_attrs(c, inverted, opaque)}/>']
    if single:
        s1 = glyph_s if glyph_s else min(4.6, 0.55 * h)
        parts.append(glyph(single, (xl + body_r) / 2 + 0.1 * head_len, ym, c, s1, white=inverted))
    else:
        seam_x = xl + 0.48 * (body_r - xl)
        s2 = glyph_s if glyph_s else min(3.0, 0.42 * h)
        k = mark_k if mark_k else min(1.0, h / 7.0)
        tx = (xl + seam_x) / 2
        hx = (seam_x + body_r) / 2 + 0.15 * head_len
        parts += [glyph(tail, tx, ym, c, s2, half=tail_half, white=inverted),
                  glyph(head, hx, ym, c, s2, white=inverted),
                  seam_mark(seam_x, y0, y1, c, deny=deny, white=inverted, k=k)]
    out = "\n  ".join(parts)
    if flip:
        out = f'<g transform="translate({xl + xr:.2f} 0) scale(-1 1)">\n  ' + out + '\n  </g>'
    return out

# row geometry for stacked pairs
R1 = (-8.6, -2.8); R2 = (2.8, 8.6)
XL, XR = -9.6, 9.6

# ---------- the shape ----------
icon("statement-tile", "one statement: a subject cell, a seam that says is, a predicate cell",
     tile(XL, XR, -3.6, 3.6, V), V)

# ---------- chapter 4 ----------
# equivalent: two identical tiles, one behind the other (the first-pass "stacked copies" silhouette)
icon("equivalent", "the same statement, twice (דומים)",
     '<g opacity="0.5">\n  ' + tile(-5.4, 9.6, -8.4, 1.6, V, single="square") + '\n  </g>\n  ' +
     tile(-9.6, 5.4, -1.6, 8.4, V, opaque=True, single="square"), V)

# variant: shared tail cell, two heads with different predicate glyphs (unchanged from v1)
def variant(c):
    seam_x = XL + 0.48 * (XR - 3.4 - XL)
    tall_tail = f'M {XL} {R1[0]} H {seam_x:.2f} V {R2[1]} H {XL} Z'
    def head(y0, y1):
        return (f'M {seam_x:.2f} {y0} H {XR-3.4:.2f} V {y0-BARB:.2f} L {XR} {(y0+y1)/2:.2f} '
                f'L {XR-3.4:.2f} {y1+BARB:.2f} V {y1} H {seam_x:.2f} Z')
    tx = (XL + seam_x) / 2; hx = (seam_x + XR - 3.4) / 2 + 0.5
    return (f'<path d="{tall_tail}" {fill_attrs(c)}/>\n  <path d="{head(*R1)}" {fill_attrs(c)}/>\n  <path d="{head(*R2)}" {fill_attrs(c)}/>\n  ' +
            glyph("circle", tx, 0, c, 3.6) + "\n  " + glyph("square", hx, (R1[0]+R1[1])/2, c, 3.0) + "\n  " +
            glyph("triangle", hx, (R2[0]+R2[1])/2, c, 3.0))
icon("variant", "same subject, different predicates (מתחלפים)", variant(V), V)

# head-on: two identical tiles pointing at each other, tips meeting; one says is, the other is not
icon("diametrically-opposed", "same terms, yes against no, tip to tip (הפכיים ממש)",
     tile(-9.6, -1.6, -3.9, 3.9, V, single="square") + "\n  " + tile(1.6, 9.6, -3.9, 3.9, V, flip=True, single="circle"), V)

# contradictory: a big tile (all, is) against a small one (some, is not), tip to tip
icon("contradictory", "all say is, some say is not, tip to tip (מתנגדים)",
     tile(-9.6, -1.6, -4.6, 4.6, V, single="square") + "\n  " + tile(1.6, 9.6, -2.3, 2.3, V, flip=True, single="circle", barb=0.7), V)

# swaps: recycle-logo arrows. Each tag arrow is a thick band that runs straight, folds at a right
# angle with a chamfered outer corner, and ends in a head. Two of them chase each other around the box.
def bent_tile(c, x_tail=-8.6, x_turn=6.0, y_run=-7.0, t=2.4, drop=6.6, head_len=3.2, barb=1.1, chamfer=1.7,
              single="square", inverted=False, glyph_s=2.9, rotate=False):
    """Top arrow: runs right along y_run (half-width t) to x_turn, folds straight down for `drop`,
    then the head. rotate=True turns it 180 degrees into the return arrow."""
    yo, yi = y_run - t, y_run + t
    xo, xi = x_turn + t, x_turn - t
    by = y_run + drop
    tip = by + head_len
    f = lambda x, y: f"{x:.2f} {y:.2f}"
    path = (f'M {f(x_tail, yo)} H {xo - chamfer:.2f} L {f(xo, yo + chamfer)} V {by:.2f} '
            f'H {xo + barb:.2f} L {f(x_turn, tip)} L {f(xi - barb, by)} H {xi:.2f} V {yi:.2f} H {x_tail} Z')
    gx = (x_tail + xi) / 2
    out = (f'<path d="{path}" {fill_attrs(c, inverted)}/>\n  ' + glyph(single, gx, y_run, c, glyph_s, white=inverted))
    if rotate:
        out = '<g transform="rotate(180)">\n  ' + out + '\n  </g>'
    return out

icon("converse", "subject and predicate trade places: the arrow comes back the other way (חלוף כולל)",
     bent_tile(V, single="square") + "\n  " + bent_tile(V, single="circle", rotate=True), V)

icon("converse-limited", "trade places, but it only comes back for some: a shorter, thinner return (חלוף קצתי)",
     bent_tile(V, single="square") + "\n  " +
     bent_tile(V, single="circle", rotate=True, x_tail=-0.6, t=1.8, y_run=-7.4, drop=6.2, head_len=2.7, barb=0.9, chamfer=1.3, glyph_s=2.0), V)

icon("contrapositive", "trade places, and is becomes is not: the return arrow in negative (חלוף הפכי)",
     bent_tile(V, single="square") + "\n  " + bent_tile(V, single="circle", rotate=True, inverted=True), V)

# obverse: both terms replaced by their opposites, content the same: the same arrow, in negative
icon("obverse", "both terms replaced by their opposites: the same statement, in negative (מתהפכים)",
     tile(XL, XR, -8.6, -1.4, V, single="square") + "\n  " + tile(XL, XR, 1.4, 8.6, V, single="square", inverted=True), V)

icon("incongruent", "different subject, different predicate (נבדלים)",
     tile(XL, XR, -9.0, -1.4, V, single="square") + "\n  " + tile(XL, XR, 1.4, 9.0, V, single="triangle"), V)

write_icons(ICONS, OUT)
