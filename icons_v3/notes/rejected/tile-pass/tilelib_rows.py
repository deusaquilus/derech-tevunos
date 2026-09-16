"""Primitives of the rejected tile pass (subject box with a state, shared predicate arrow, rows).
Kept for the record; not used by the shipped set. See notes/TILE_PASS.md."""
from iconlib import st
from tilelib import LJ, fill_attrs, glyph

# ---------- boxes with a state, and rows built from them (the tile pass, Part 2 addendum) ----------
GHOST = 'stroke-dasharray="1.8 1.4"'   # the same dash as the chapter 5 ghost boxes

def sbox(x0, x1, y0, y1, c, state="tint", shape="square", w=1.45):
    """A subject box with no glyph. state: solid = known (chapter 7 'filled'),
    tint = stated but not previously known, ghost = derived, nobody said it.
    shape 'round' draws a pill: a subject of a different kind."""
    rx = 1.0 if shape == "square" else (y1 - y0) / 2
    if state == "solid":
        f = f'fill="{c}" stroke="{c}" stroke-width="{w}" {LJ}'
    elif state == "ghost":
        f = f'fill="{c}" fill-opacity="0.15" stroke="{c}" stroke-width="{w}" {LJ} {GHOST}'
    else:
        f = fill_attrs(c, w=w)
    return f'<rect x="{x0}" y="{y0}" width="{x1-x0:.2f}" height="{y1-y0:.2f}" rx="{rx:.2f}" {f}/>'

def parrow(x0, x1, y0, y1, c, g="circle", gs=3.4, head=2.4, barb=1.0, ghost=False):
    """A predicate arrow (the head of a tile) that can be shared by several subject boxes."""
    br = x1 - head
    ym = (y0 + y1) / 2
    path = f'M {x0} {y0} H {br:.2f} V {y0-barb:.2f} L {x1} {ym:.2f} L {br:.2f} {y1+barb:.2f} V {y1} H {x0} Z'
    out = f'<path d="{path}" {fill_attrs(c)}{" " + GHOST if ghost else ""}/>'
    if g:
        out += "\n  " + glyph(g, (x0 + br) / 2, ym, c, gs)
    return out

def seam_x(x, y, c, a=1.15, w=1.5):
    """The 'is not' mark placed on the seam between a subject box and its predicate arrow."""
    return (f'<path d="M {x-a-0.5:.2f} {y-a-0.5:.2f} L {x+a+0.5:.2f} {y+a+0.5:.2f} M {x+a+0.5:.2f} {y-a-0.5:.2f} L {x-a-0.5:.2f} {y+a+0.5:.2f}" {st("#ffffff", w+1.6)}/>\n  '
            f'<path d="M {x-a:.2f} {y-a:.2f} L {x+a:.2f} {y+a:.2f} M {x+a:.2f} {y-a:.2f} L {x-a:.2f} {y+a:.2f}" {st(c, w)}/>')

# the stacked pair: two subject boxes sharing one predicate arrow (the variant-subjects silhouette)
PBX0, PBX1 = -9.4, 0.4
PTOP = (-8.4, -1.8); PBOT = (1.8, 8.4)

def shared_pair(c, top="solid", bot="tint"):
    """Two subjects, one predicate: the top subject in state `top`, the bottom in state `bot`."""
    return (sbox(PBX0, PBX1, *PTOP, c, state=top) + "\n  " +
            parrow(PBX1, 9.4, -8.8, 8.8, c) + "\n  " +
            sbox(PBX0, PBX1, *PBOT, c, state=bot))

def row(c, y0, y1, state="solid", shape="square", gap=0.0, ghost_arrow=False, deny=False, g="circle"):
    """One subject box and its own predicate arrow. gap>0 leaves the seam open: the predicate does not attach."""
    out = sbox(PBX0, PBX1, y0, y1, c, state=state, shape=shape) + "\n  " + \
          parrow(PBX1 + gap, 9.4, y0 - 0.4, y1 + 0.4, c, g=g, gs=3.0, head=2.2, ghost=ghost_arrow)
    if deny:
        out += "\n  " + seam_x(PBX1, (y0 + y1) / 2, c)
    return out
