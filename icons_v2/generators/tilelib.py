"""Shared statement-shape geometry: the box (subject), the arrow (predicate),
the two-cell tag tile, and the glyphs that ride inside them.
Used by gen_icons_ch4_tiles.py and gen_icons_ch5.py."""
import math
from iconlib import V, S, st, pt, arrowhead

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
        bw = body_r - xl
        s1 = glyph_s if glyph_s else max(1.5, min(4.4, h - 3.0, bw - 3.0))
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

def box(x0, x1, y0, y1, c, g, gs=3.2):
    return (f'<rect x="{x0}" y="{y0}" width="{x1-x0:.2f}" height="{y1-y0:.2f}" rx="1.0" {fill_attrs(c)}/>\n  ' +
            glyph(g, (x0+x1)/2, (y0+y1)/2, c, gs))

def arrow(x0, x1, y0, y1, c, g, gs=3.0, head=3.6, barb=1.0, opaque=False):
    br = x1 - head
    ym = (y0 + y1) / 2
    path = (f'M {x0} {y0} H {br:.2f} V {y0-barb:.2f} L {x1} {ym:.2f} L {br:.2f} {y1+barb:.2f} V {y1} H {x0} Z')
    return (f'<path d="{path}" {fill_attrs(c, opaque=opaque)}/>\n  ' + glyph(g, (x0+br)/2, ym, c, gs))

