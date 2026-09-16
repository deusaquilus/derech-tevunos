"""Chapter 1-3 icon candidates for Derech Tevunos, matching the existing seven
element icons: viewBox -12 -12 24 24, ~19x19 content box, 1.45 outlines,
2.3 bold marks, fill-opacity .15, round caps and joins.

Colour rule: violet for statement anatomy (chapter 3), slate for parties
(chapter 1). Green/red are reserved for verdicts (chapters 8-9) and are not
used here, so "certain" does not look "accepted".
"""
import math, os

V = "#7c3aed"   # violet: statement anatomy (ch3)
S = "#475569"   # slate: parties (ch1), same as the statement icon


def st(c, w=1.45, fill="none", extra=""):
    return f'fill="{fill}" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"{extra}'

def tint(c, w=1.45):
    return f'fill="{c}" fill-opacity="0.15" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"'

def pt(r, deg):  # SVG coords, y down
    a = math.radians(deg)
    return r*math.cos(a), r*math.sin(a)

def grid(filled, c=V, sp=3.9, r=2.9):
    out = []
    for iy, y in enumerate((-sp, sp)):
        for ix, x in enumerate((-sp, sp)):
            if (ix, iy) in filled:
                out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/>')
            else:
                out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#ffffff" stroke="{c}" stroke-width="1.3"/>')
    return "\n  ".join(out)

def bars(nfilled, c=V, slash=False):
    xs = (-7.6, -1.7, 4.2); hs = (5.0, 8.8, 12.6); w = 3.4; base = 7.0
    out = []
    for i, (x, h) in enumerate(zip(xs, hs)):
        y = base - h
        if i < nfilled:
            out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="0.9" fill="{c}"/>')
        else:
            out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="0.9" fill="#ffffff" stroke="{c}" stroke-width="1.3"/>')
    if slash:
        out.append(f'<path d="M -8.6 8.6 L 8.6 -8.6" {st(c, 2.3)}/>')
    return "\n  ".join(out)

def pie_except(c=V):
    R = 8.0; a1, a2 = -30, 30
    x1, y1 = pt(R, a2); x2, y2 = pt(R, a1)
    body = f'M 0 0 L {x1:.2f} {y1:.2f} A {R} {R} 0 1 1 {x2:.2f} {y2:.2f} Z'
    wx1, wy1 = pt(R, a1); wx2, wy2 = pt(R, a2)
    wedge = f'M 0 0 L {wx1:.2f} {wy1:.2f} A {R} {R} 0 0 1 {wx2:.2f} {wy2:.2f} Z'
    return (f'<path d="{body}" {tint(c)}/>\n  '
            f'<path d="{wedge}" transform="translate(2.9 0)" {st(c, 1.45, "#ffffff")}/>')

def asterisk(c=V, r=7.0, w=2.3):
    out = []
    for deg in (90, 30, -30):
        x, y = pt(r, deg)
        out.append(f'<path d="M {-x:.2f} {-y:.2f} L {x:.2f} {y:.2f}" {st(c, w)}/>')
    return "\n  ".join(out)

def domino(x, y, w, h, c, rot=None, pivot=None, fill=None):
    f = tint(c) if fill is None else f'fill="{c}" fill-opacity="{fill}" stroke="{c}" stroke-width="1.45" stroke-linejoin="round"'
    t = f' transform="rotate({rot} {pivot[0]} {pivot[1]})"' if rot else ""
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="1.1" {f}{t}/>'

def arrowhead(x, y, deg, c, size=2.6, w=1.6):
    # small open arrowhead pointing in direction deg
    a = math.radians(deg)
    for_ = (math.cos(a), math.sin(a))
    left = (math.cos(a + 2.5), math.sin(a + 2.5))
    right = (math.cos(a - 2.5), math.sin(a - 2.5))
    return (f'<path d="M {x + left[0]*size:.2f} {y + left[1]*size:.2f} L {x:.2f} {y:.2f} '
            f'L {x + right[0]*size:.2f} {y + right[1]*size:.2f}" {st(c, w)}/>')

def person(cx, cy, c, r=2.6, sw=7.0):
    head = f'<circle cx="{cx}" cy="{cy}" r="{r}" {tint(c)}/>'
    top = cy + r + 1.3
    body = (f'<path d="M {cx - sw/2} {top + 5.2} C {cx - sw/2} {top}, {cx + sw/2} {top}, {cx + sw/2} {top + 5.2}" {tint(c)}/>')
    return head + "\n  " + body


def ring_gap(c, r=7.4, a1=-58, a2=-122):
    # ring open at the top; fill closes across the gap (hidden under the switch)
    x1, y1 = pt(r, a1); x2, y2 = pt(r, a2)
    return f'<path d="M {x1:.2f} {y1:.2f} A {r} {r} 0 1 1 {x2:.2f} {y2:.2f}" {tint(c, 1.6)}/>'

def switch_open(c, r=7.4, a1=-58, a2=-122, blade=8.2, lift=-24):
    px, py = pt(r, a2); cx_, cy_ = pt(r, a1)
    ex = px + blade*math.cos(math.radians(lift)); ey = py + blade*math.sin(math.radians(lift))
    return (f'<path d="M {px:.2f} {py:.2f} L {ex:.2f} {ey:.2f}" {st(c, 2.3)}/>\n  '
            f'<circle cx="{px:.2f}" cy="{py:.2f}" r="1.45" fill="{c}"/>\n  '
            f'<circle cx="{cx_:.2f}" cy="{cy_:.2f}" r="1.45" fill="{c}"/>')

TEMPLATE = '''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="-12 -12 24 24" role="img" aria-label="{name}">
  <title>{name}: {gloss}</title>
  {body}
</svg>
'''

def write_icons(icons, out):
    os.makedirs(out, exist_ok=True)
    for name, gloss, body, colour in icons:
        with open(os.path.join(out, f"{name}.svg"), "w", encoding="utf-8") as f:
            f.write(TEMPLATE.format(name=name, gloss=gloss, body=body))
    print(len(icons), "icons written to", out)
