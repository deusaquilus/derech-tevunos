"""Perspective for glyphs inlaid in the ground plane.

SVG only has affine transforms, so a glyph lying on a receding floor has to be baked: every
point of it (including bezier handles) is mapped through a homography that takes the glyph's
bounding rectangle to a trapezoid narrower at the far edge, the way Inkscape's
perspective-envelope effect does. This module parses path data, applies affine group
transforms, applies the homography, and emits absolute path data again.
"""
import math, re
import numpy as np

KAPPA = 0.5522847498

# ---------- affine matrices (a, b, c, d, e, f) as in the SVG transform attribute ----------
def m_identity(): return (1, 0, 0, 1, 0, 0)
def m_translate(tx, ty): return (1, 0, 0, 1, tx, ty)
def m_scale(sx, sy=None): return (sx, 0, 0, sx if sy is None else sy, 0, 0)
def m_rotate(deg):
    r = math.radians(deg); c, s = math.cos(r), math.sin(r)
    return (c, s, -s, c, 0, 0)
def m_mul(A, B):
    """A then B applied after? No: returns the matrix of applying B first, then A (A∘B)."""
    a, b, c, d, e, f = A; a2, b2, c2, d2, e2, f2 = B
    return (a * a2 + c * b2, b * a2 + d * b2, a * c2 + c * d2, b * c2 + d * d2,
            a * e2 + c * f2 + e, b * e2 + d * f2 + f)
def m_apply(M, x, y):
    a, b, c, d, e, f = M
    return (a * x + c * y + e, b * x + d * y + f)
def m_chain(*ms):
    """Compose like nested SVG groups: the first matrix is the outermost transform."""
    out = m_identity()
    for m in ms:
        out = m_mul(out, m)
    return out

# ---------- path data → absolute segments ----------
_num = re.compile(r'[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?')

def parse_path(d):
    """Returns a list of segments: ('M',(x,y)), ('L',(x,y)), ('C',(x1,y1),(x2,y2),(x,y)),
    ('Q',(x1,y1),(x,y)), ('Z',). Relative commands and H/V/S/T are resolved."""
    tokens = re.findall(r'[MmLlHhVvCcSsQqTtZzAa]|' + _num.pattern, d)
    segs, i, cmd = [], 0, None
    cur = start = (0.0, 0.0); prev_c = prev_q = None
    def nums(n):
        nonlocal i
        vals = [float(t) for t in tokens[i:i + n]]; i += n; return vals
    while i < len(tokens):
        t = tokens[i]
        if t.isalpha():
            cmd = t; i += 1
            if cmd in "Zz":
                segs.append(('Z',)); cur = start; prev_c = prev_q = None
                continue
        rel = cmd.islower(); C = cmd.upper()
        if C == 'M':
            x, y = nums(2); p = (cur[0] + x, cur[1] + y) if rel else (x, y)
            segs.append(('M', p)); cur = start = p; cmd = 'l' if rel else 'L'; prev_c = prev_q = None
        elif C == 'L':
            x, y = nums(2); p = (cur[0] + x, cur[1] + y) if rel else (x, y)
            segs.append(('L', p)); cur = p; prev_c = prev_q = None
        elif C == 'H':
            (x,) = nums(1); p = (cur[0] + x if rel else x, cur[1]); segs.append(('L', p)); cur = p; prev_c = prev_q = None
        elif C == 'V':
            (y,) = nums(1); p = (cur[0], cur[1] + y if rel else y); segs.append(('L', p)); cur = p; prev_c = prev_q = None
        elif C == 'C':
            v = nums(6)
            if rel: v = [v[k] + cur[k % 2] for k in range(6)]
            c1, c2, p = (v[0], v[1]), (v[2], v[3]), (v[4], v[5])
            segs.append(('C', c1, c2, p)); cur = p; prev_c = c2; prev_q = None
        elif C == 'S':
            v = nums(4)
            if rel: v = [v[k] + cur[k % 2] for k in range(4)]
            c1 = (2 * cur[0] - prev_c[0], 2 * cur[1] - prev_c[1]) if prev_c else cur
            c2, p = (v[0], v[1]), (v[2], v[3])
            segs.append(('C', c1, c2, p)); cur = p; prev_c = c2; prev_q = None
        elif C == 'Q':
            v = nums(4)
            if rel: v = [v[k] + cur[k % 2] for k in range(4)]
            c, p = (v[0], v[1]), (v[2], v[3]); segs.append(('Q', c, p)); cur = p; prev_q = c; prev_c = None
        elif C == 'T':
            v = nums(2)
            if rel: v = [v[k] + cur[k % 2] for k in range(2)]
            c = (2 * cur[0] - prev_q[0], 2 * cur[1] - prev_q[1]) if prev_q else cur
            p = (v[0], v[1]); segs.append(('Q', c, p)); cur = p; prev_q = c; prev_c = None
        elif C == 'A':
            raise ValueError("arc commands are not supported; convert the source to beziers")
        else:
            raise ValueError(f"unknown command {cmd}")
    return segs

def circle_segs(cx, cy, r):
    k = KAPPA * r
    return [('M', (cx + r, cy)),
            ('C', (cx + r, cy + k), (cx + k, cy + r), (cx, cy + r)),
            ('C', (cx - k, cy + r), (cx - r, cy + k), (cx - r, cy)),
            ('C', (cx - r, cy - k), (cx - k, cy - r), (cx, cy - r)),
            ('C', (cx + k, cy - r), (cx + r, cy - k), (cx + r, cy)), ('Z',)]

def rect_segs(x, y, w, h, rx=0.0):
    if rx <= 0:
        return [('M', (x, y)), ('L', (x + w, y)), ('L', (x + w, y + h)), ('L', (x, y + h)), ('Z',)]
    k = KAPPA * rx
    return [('M', (x + rx, y)), ('L', (x + w - rx, y)),
            ('C', (x + w - rx + k, y), (x + w, y + rx - k), (x + w, y + rx)), ('L', (x + w, y + h - rx)),
            ('C', (x + w, y + h - rx + k), (x + w - rx + k, y + h), (x + w - rx, y + h)), ('L', (x + rx, y + h)),
            ('C', (x + rx - k, y + h), (x, y + h - rx + k), (x, y + h - rx)), ('L', (x, y + rx)),
            ('C', (x, y + rx - k), (x + rx - k, y), (x + rx, y)), ('Z',)]

def map_segs(segs, fn):
    out = []
    for s in segs:
        out.append((s[0],) + tuple(fn(*p) for p in s[1:]))
    return out

def segs_bbox(segs):
    xs = [p[0] for s in segs for p in s[1:]]; ys = [p[1] for s in segs for p in s[1:]]
    return min(xs), min(ys), max(xs), max(ys)

def segs_to_d(segs, nd=3):
    f = lambda p: f"{p[0]:.{nd}f} {p[1]:.{nd}f}"
    parts = []
    for s in segs:
        if s[0] == 'Z': parts.append('Z')
        elif s[0] == 'M': parts.append('M ' + f(s[1]))
        elif s[0] == 'L': parts.append('L ' + f(s[1]))
        elif s[0] == 'C': parts.append('C ' + ' '.join(f(p) for p in s[1:]))
        elif s[0] == 'Q': parts.append('Q ' + ' '.join(f(p) for p in s[1:]))
    return ' '.join(parts)

# ---------- the homography ----------
def homography(src, dst):
    """src, dst: four (x, y) corners in the same order. Returns the 3x3 matrix mapping src → dst."""
    A, b = [], []
    for (x, y), (u, v) in zip(src, dst):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    h = np.linalg.solve(np.array(A, float), np.array(b, float))
    return np.array([[h[0], h[1], h[2]], [h[3], h[4], h[5]], [h[6], h[7], 1.0]])

def h_apply(H, x, y):
    v = H @ np.array([x, y, 1.0]); return (v[0] / v[2], v[1] / v[2])

def floor_quad(x0, y0, x1, y1, narrow, squash=1.0):
    """The trapezoid a glyph's bounding rect (x0..x1, y0..y1) is pressed into when it lies on
    the floor: the bottom edge keeps its width, the top edge is `narrow` times as wide, and the
    height is scaled by `squash`, keeping the bottom edge where it is."""
    cx = (x0 + x1) / 2; hw = (x1 - x0) / 2
    top = y1 - (y1 - y0) * squash
    return [(cx - hw * narrow, top), (cx + hw * narrow, top), (x1, y1), (x0, y1)]

def lay_on_floor(shapes, narrow=0.66, squash=0.92, bbox=None):
    """shapes: list of dicts with 'segs' (absolute, icon units) plus style keys. All are mapped
    together through one homography from their joint bounding box to the floor trapezoid.
    Returns new shapes with mapped segs."""
    allsegs = [s for sh in shapes for s in sh['segs']]
    x0, y0, x1, y1 = bbox or segs_bbox(allsegs)
    src = [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]
    H = homography(src, floor_quad(x0, y0, x1, y1, narrow, squash))
    fn = lambda x, y: h_apply(H, x, y)
    return [dict(sh, segs=map_segs(sh['segs'], fn)) for sh in shapes]

def shapes_to_svg(shapes, colour):
    out = []
    for sh in shapes:
        d = segs_to_d(sh['segs'])
        if sh.get('stroke'):
            out.append(f'<path d="{d}" fill="{"none" if not sh.get("fill") else colour}" stroke="{colour}" '
                       f'stroke-width="{sh["stroke"]:.2f}" stroke-linecap="round" stroke-linejoin="round"/>')
        else:
            out.append(f'<path d="{d}" fill="{colour}"/>')
    return "\n  ".join(out)
