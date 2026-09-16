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
import os
from iconlib import *
from tilelib import *

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "icons", "ch4-7")
ICONS = []
def icon(name, gloss, body, colour):
    ICONS.append((name, gloss, body, colour))

R1 = (-9.0, -1.7); R2 = (1.7, 9.0)
XL, XR = -9.6, 9.6

# ---------- the shape ----------
icon("statement-tile", "one statement: a subject cell, a seam that says is, a predicate cell",
     tile(XL, XR, -3.6, 3.6, V), V)

# ---------- chapter 4 ----------
# equivalent: two identical tiles, one behind the other (the first-pass "stacked copies" silhouette)
icon("equivalent", "the same statement, twice (דומים)",
     '<g opacity="0.5">\n  ' + tile(-5.4, 9.6, -8.4, 1.6, V, single="square") + '\n  </g>\n  ' +
     tile(-8.8, 6.2, -1.6, 8.4, V, opaque=True, single="square"), V)

# variant: boxes are subjects, arrows are predicates.
#   same subject, other predicates  = ONE box, TWO arrows coming out
#   same predicate, other subjects  = TWO boxes, ONE arrow coming out
icon("variant", "same subject, different predicates: one box, two arrows out (מתחלפים)",
     box(-9.4, -2.6, -8.8, 8.8, V, "circle", gs=3.8) + "\n  " +
     arrow(-2.6, 9.4, -8.4, -1.8, V, "square", gs=3.1) + "\n  " +
     arrow(-2.6, 9.4, 1.8, 8.4, V, "triangle", gs=3.2), V)

icon("variant-subjects", "same predicate, different subjects: two boxes, one arrow out (מתחלפים)",
     box(-9.4, 0.4, -8.4, -1.8, V, "square", gs=3.1) + "\n  " +
     box(-9.4, 0.4, 1.8, 8.4, V, "triangle", gs=3.2) + "\n  " +
     arrow(0.4, 9.4, -8.8, 8.8, V, "circle", gs=3.4, head=2.4, barb=1.0), V)

# head-on: two identical tiles pointing at each other, tips meeting; one says is, the other is not
icon("diametrically-opposed", "same terms, yes against no, tip to tip (הפכיים ממש)",
     tile(-9.9, -1.2, -4.9, 4.9, V, single="square", glyph_s=3.5) + "\n  " + tile(1.2, 9.9, -4.9, 4.9, V, flip=True, single="triangle", glyph_s=3.5), V)

# contradictory: a big tile (all, is) against a small one (some, is not), tip to tip
icon("contradictory", "all say is, some say is not, tip to tip (מתנגדים)",
     tile(-9.9, -1.2, -5.6, 5.6, V, single="square", glyph_s=3.9) + "\n  " + tile(1.2, 9.9, -2.9, 2.9, V, flip=True, single="triangle", barb=0.8, glyph_s=2.5), V)

# swaps: recycle-logo arrows. Each tag arrow is a thick band that runs straight, folds at a right
# angle with a chamfered outer corner, and ends in a head. Two of them chase each other around the box.
def bent_tile(c, x_tail=-9.4, x_turn=5.2, y_run=-6.5, t=2.9, drop=4.3, head_len=3.0, barb=1.0, chamfer=1.9,
              single="square", inverted=False, glyph_s=2.7, rotate=False):
    """Top arrow: runs right along y_run (half-width t) to x_turn, folds straight down for `drop`,
    then the head. rotate=True turns it 180 degrees into the return arrow."""
    yo, yi = y_run - t, y_run + t
    xo, xi = x_turn + t, x_turn - t
    by = y_run + drop
    tip = by + head_len
    f = lambda x, y: f"{x:.2f} {y:.2f}"
    path = (f'M {f(x_tail, yo)} H {xo - chamfer:.2f} L {f(xo, yo + chamfer)} V {by:.2f} '
            f'H {xo + barb:.2f} L {f(x_turn, tip)} L {f(xi - barb, by)} H {xi:.2f} V {yi:.2f} H {x_tail} Z')
    gx, gy = (x_tail + xi) / 2, y_run
    band = f'<path d="{path}" {fill_attrs(c, inverted)}/>'
    if rotate:
        band = '<g transform="rotate(180)">\n  ' + band + '\n  </g>'
        gx, gy = -gx, -gy          # the glyph rides with the band but stays upright
    return band + "\n  " + glyph(single, gx, gy, c, glyph_s, white=inverted)

icon("converse", "subject and predicate trade places: the arrow comes back the other way (חלוף כולל)",
     bent_tile(V, single="square") + "\n  " + bent_tile(V, single="triangle", rotate=True), V)

icon("converse-limited", "trade places, but it only comes back for some: a shorter, thinner return (חלוף קצתי)",
     bent_tile(V, single="square") + "\n  " +
     bent_tile(V, single="triangle", rotate=True, x_tail=-2.4, t=2.7, y_run=-6.6, drop=4.4, head_len=2.9, barb=1.0, chamfer=1.6, glyph_s=2.7), V)

icon("contrapositive", "trade places, and is becomes is not: the return arrow in negative (חלוף הפכי)",
     bent_tile(V, single="square") + "\n  " + bent_tile(V, single="triangle", rotate=True, inverted=True), V)

# obverse: both terms replaced by their opposites, content the same: the same arrow, in negative
icon("obverse", "both terms replaced by their opposites: the same statement, in negative (מתהפכים)",
     tile(XL, XR, -8.6, -1.4, V, single="square") + "\n  " + tile(XL, XR, 1.4, 8.6, V, single="square", inverted=True), V)

icon("incongruent", "different subject, different predicate (נבדלים)",
     tile(XL, XR, -9.0, -1.4, V, single="square") + "\n  " + tile(XL, XR, 1.4, 9.0, V, single="triangle"), V)

write_icons(ICONS, OUT)
