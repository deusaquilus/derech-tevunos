"""Part 3: chapter 8, accepting and rejecting statements. Drawn in the unit register
(boxes and cases with connectors, as chapters 5 and 7), never from the tile.

Section 1, the grounds (Eng p112-116, Heb p111-115): what a proof or disproof stands on.
One base shape: the ground as a floor receding to a horizon (linear and atmospheric
perspective), with a house standing on the horizon: what is built on this ground. The glyph
that says which ground is cut out of the floor in white and laid flat on it in perspective
(narrower at the far edge, compressed towards it), so it reads as inlaid in the floor.

Two of the glyphs are Alexander's own reference drawings, read from notes/ at generation time:
the reaching hands (reference-hands-306885.svg) and the senses (reference-senses-grouped.svg).

Colour: magenta for chapter 8, the third of Ramchal's three processes.
"""
import os, re
from iconlib import *
from perspective import (parse_path, circle_segs, map_segs, m_chain, m_translate, m_scale, m_rotate,
                         m_apply, lay_on_floor, shapes_to_svg)

M = "#c026d3"   # magenta: acceptance and rejection (ch8)
W = "#ffffff"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "icons", "ch8")
NOTES = os.path.join(HERE, "..", "notes")
ICONS = []

def icon(name, gloss, body, colour):
    ICONS.append((name, gloss, body, colour))

# ---------- the ground ----------
HZ = -0.6                     # the horizon line
NEAR = 10.4                    # the near edge of the ground plane
FAR_HW, NEAR_HW = 6.4, 9.6     # half-widths of the plane at the horizon and at the near edge
CY = 5.6                       # centre line of the ground glyphs before they are laid down
NARROW, SQUASH = 0.60, 0.90    # the perspective pressed onto the glyphs (Alexander's envelope)

def house(c):
    """What stands on the ground: a house, built on it. A conclusion is built on its ground,
    and בנין is the Talmud's own word for a constructed proof. Its base sits on the horizon."""
    return (f'<path d="M -6.6 -6.4 L 0 -11.6 L 6.6 -6.4 Z" fill="{c}"/>\n  '
            f'<rect x="-4.8" y="-6.8" width="9.6" height="{6.8 + HZ:.2f}" fill="{c}"/>')

def ground(c, key, sky=None):
    """The ground as a floor receding to a horizon. Depth cues: the plane's edges converge
    towards the horizon (linear perspective); it fades with distance, solid at the near edge
    and pale at the horizon (atmospheric perspective); a horizon line runs the full width
    beyond the plane's edges. A house stands on the horizon, silhouetted against the sky."""
    gid = f"fade-{key}"
    return (f'<defs><linearGradient id="{gid}" x1="0" y1="{HZ}" x2="0" y2="{NEAR}" gradientUnits="userSpaceOnUse">'
            f'<stop offset="0" stop-color="{c}" stop-opacity="0.35"/><stop offset="0.42" stop-color="{c}" stop-opacity="0.95"/>'
            f'<stop offset="1" stop-color="{c}" stop-opacity="1"/></linearGradient></defs>\n  '
            f'<path d="M -{FAR_HW} {HZ} H {FAR_HW} L {NEAR_HW} {NEAR} H -{NEAR_HW} Z" fill="url(#{gid})"/>\n  '
            f'<path d="M -11.2 {HZ} H 11.2" {st(c, 0.9)}/>\n  ' + (sky or house)(c))

BOTTOM = 10.0                  # where the glyphs' near edge lands, just inside the plane's near edge

FLAT = False                   # True: skip the perspective and wrap the flat glyph in a group (hand-edit export)

def floor_glyph(shapes, xscale=1.0, narrow=NARROW, squash=SQUASH, bottom=BOTTOM):
    """Lay a glyph (a list of shapes in icon units) flat on the floor and cut it out in white:
    widen it (a circle on a foreshortened floor is a wide ellipse), drop its near edge to
    `bottom`, then press it into the floor trapezoid. With FLAT set, the glyph is left upright
    inside a <g> with an identity transform, for applying a perspective by hand."""
    from perspective import segs_bbox
    x0, y0, x1, y1 = segs_bbox([sg for sh in shapes for sg in sh['segs']])
    dy = bottom - y1
    pre = lambda x, y: (x * xscale, y + dy)
    shapes = [dict(sh, segs=map_segs(sh['segs'], pre)) for sh in shapes]
    if FLAT:
        return '<g id="glyph" transform="matrix(1,0,0,1,0,0)">\n  ' + shapes_to_svg(shapes, W) + '\n  </g>'
    return shapes_to_svg(lay_on_floor(shapes, narrow, squash), W)

# ---------- ground glyphs, as shapes in icon units, centred on CY ----------
def g_axiom_sun():
    """self-evident, clear as the sun (ברור כשמש)"""
    shapes = [dict(segs=circle_segs(0, CY, 1.9))]
    for a in range(0, 360, 45):
        x1, y1 = pt(3.3, a); x2, y2 = pt(4.8, a)
        shapes.append(dict(segs=[('M', (x1, CY + y1)), ('L', (x2, CY + y2))], stroke=1.3))
    return shapes

def g_common():
    """a crowd: three heads and shoulders"""
    shapes = []
    for x in (-4.8, 0, 4.8):
        shapes.append(dict(segs=circle_segs(x, CY - 2.0, 1.55)))
        shapes.append(dict(segs=[('M', (x - 2.5, CY + 3.4)), ('Q', (x - 2.5, CY + 0.2), (x, CY + 0.2)),
                                 ('Q', (x + 2.5, CY + 0.2), (x + 2.5, CY + 3.4)), ('Z',)]))
    return shapes

def g_deduction():
    """an arrow lying on the floor and pointing away, at the house: it follows"""
    return [dict(segs=[('M', (0, CY + 5.0)), ('L', (0, CY - 3.0))], stroke=1.8),
            dict(segs=[('M', (-3.4, CY - 1.4)), ('L', (0, CY - 4.8)), ('L', (3.4, CY - 1.4))], stroke=1.8)]

def _reference_paths(filename):
    """Path data and group transforms of a reference SVG in notes/: [(translate, [d, ...]), ...]."""
    src = open(os.path.join(NOTES, filename), encoding="utf-8").read()
    groups = []
    for gm in re.finditer(r'<g\b([^>]*)>(.*?)</g>', src, re.S):
        attrs, inner = gm.group(1), gm.group(2)
        ds = re.findall(r'<path\s+d="([^"]+)"', inner)
        if not ds:
            continue
        t = re.search(r'transform="translate\(([-\d.]+),([-\d.]+)\)"', attrs)
        groups.append(((float(t.group(1)), float(t.group(2))) if t else (0.0, 0.0), ds))
    return groups

def g_tradition(w=13.6, rot=-16):
    """handed down: two hands reaching for each other, fingertips almost touching (מסורה).
    Alexander's silhouette (a 1280x1056 traced image), rotated a little towards the horizontal."""
    k = w / 1280.0; h = 1056.0 * k
    fit = m_chain(m_translate(0.0, CY), m_rotate(rot), m_translate(-w / 2, -h / 2), m_scale(k),
                  m_translate(0, 1056), m_scale(0.1, -0.1))
    shapes = []
    for _, ds in _reference_paths("reference-hands-306885.svg"):
        for d in ds:
            shapes.append(dict(segs=map_segs(parse_path(d), lambda x, y: m_apply(fit, x, y))))
    return shapes

SENSES_BBOX = (15.4, 24.6, 183.6, 176.8)   # content box of the drawing in its 200-unit space

def g_sense(h=11.0, thicken=5.0):
    """the senses testify: ear, eye with rays, nose, mouth (מוחשות). Alexander's line drawing,
    with a stroke of the same colour added so the lines survive at icon size."""
    bx0, by0, bx1, by1 = SENSES_BBOX
    k = h / (by1 - by0); w = (bx1 - bx0) * k
    fit = m_chain(m_translate(-w / 2, CY - h / 2), m_scale(k), m_translate(-bx0, -by0))
    shapes = []
    for (tx, ty), ds in _reference_paths("reference-senses-grouped.svg"):
        M_ = m_chain(fit, m_translate(tx, ty))
        for d in ds:
            shapes.append(dict(segs=map_segs(parse_path(d), lambda x, y: m_apply(M_, x, y)), stroke=thicken * k, fill=True))
    return shapes

icon("ground-axiom", "the mind dictates it, no training needed (מושכלות ראשונים)", ground(M, "axiom") + "\n  " + floor_glyph(g_axiom_sun(), xscale=1.35), M)
icon("ground-sense", "the senses testify to it (מוחשות)", ground(M, "sense") + "\n  " + floor_glyph(g_sense(), xscale=1.18), M)
icon("ground-common-sense", "what most people hold by nature (מפורסמות)", ground(M, "common") + "\n  " + floor_glyph(g_common(), xscale=0.98), M)
icon("ground-tradition", "handed down: a verse, a halacha, an undisputed authority (מקובלות)", ground(M, "tradition") + "\n  " + floor_glyph(g_tradition(), xscale=1.0), M)
icon("ground-deduction", "it follows from a true premise by a deduction (הקש); the chapter 7 badge says which", ground(M, "deduction") + "\n  " + floor_glyph(g_deduction(), xscale=1.25), M)


# ====================================================================================
# Section 2 (Eng p116-132, 132-136, 142-144): indirect routes, the strongest disproof, a
# ground that does not reach, and theory. Variations of the same landscape.
# ====================================================================================

def house_at(c, x, scale=1.0, state="solid"):
    """A house standing on the horizon at x. state: solid (established), struck (knocked down:
    outlined, with an X through it)."""
    k = scale
    roof = f'M {x-6.6*k:.2f} {HZ-5.8*k:.2f} L {x:.2f} {HZ-11.0*k:.2f} L {x+6.6*k:.2f} {HZ-5.8*k:.2f} Z'
    walls = (x - 4.8 * k, HZ - 6.2 * k, 9.6 * k, 6.2 * k)
    if state == "solid":
        return (f'<path d="{roof}" fill="{c}"/>\n  '
                f'<rect x="{walls[0]:.2f}" y="{walls[1]:.2f}" width="{walls[2]:.2f}" height="{walls[3]:.2f}" fill="{c}"/>')
    out = (f'<path d="{roof}" {tint(c, w=1.2)}/>\n  '
           f'<rect x="{walls[0]:.2f}" y="{walls[1]:.2f}" width="{walls[2]:.2f}" height="{walls[3]:.2f}" {tint(c, w=1.2)}/>\n  ')
    # the X sits inside the walls, so it never spills onto a neighbour
    x0, x1 = x - 3.2 * k, x + 3.2 * k; y0, y1 = HZ - 5.4 * k, HZ - 0.8 * k
    cross = f'M {x0:.2f} {y0:.2f} L {x1:.2f} {y1:.2f} M {x1:.2f} {y0:.2f} L {x0:.2f} {y1:.2f}'
    out += f'<path d="{cross}" {st("#ffffff", 3.0 * k + 0.6)}/>\n  <path d="{cross}" {st(c, 1.6 * k + 0.4)}/>'
    return out

def plane(c, key, far=HZ):
    """The floor and the horizon line, without a house. far: where the plane's far edge is;
    normally the horizon, lower when the ground does not reach."""
    gid = f"fade-{key}"
    hw_far = FAR_HW + (NEAR_HW - FAR_HW) * (far - HZ) / (NEAR - HZ)
    out = (f'<defs><linearGradient id="{gid}" x1="0" y1="{far}" x2="0" y2="{NEAR}" gradientUnits="userSpaceOnUse">'
           f'<stop offset="0" stop-color="{c}" stop-opacity="0.35"/><stop offset="0.42" stop-color="{c}" stop-opacity="0.95"/>'
           f'<stop offset="1" stop-color="{c}" stop-opacity="1"/></linearGradient></defs>\n  ')
    if far > HZ:
        # a thin outline of the whole ground, horizon to near edge: where the ground should be
        out += f'<path d="M -{FAR_HW} {HZ} H {FAR_HW} L {NEAR_HW} {NEAR} H -{NEAR_HW} Z" {st(c, 0.9, extra=" stroke-dasharray=\'0.1 1.7\'")}/>\n  '
    out += (f'<path d="M -{hw_far:.2f} {far} H {hw_far:.2f} L {NEAR_HW} {NEAR} H -{NEAR_HW} Z" fill="url(#{gid})"/>\n  '
            f'<path d="M -11.2 {HZ} H 11.2" {st(c, 0.9)}/>')
    return out

def leaning_house(c, deg=-14):
    """Theory: the house built, but leaning. It stands on the ground and it holds for now, and it
    is not straight; a theory inclines the mind, it does not establish. Pivoted on the base's
    left corner so the house stays on the horizon."""
    return f'<g transform="translate(-4.8 {HZ}) rotate({deg}) translate(4.8 {-HZ})">' + house(c) + '</g>'

def g_fork():
    """one road on the floor forks into two, and both are blocked: whichever way you take it, it fails"""
    shapes = [dict(segs=[('M', (0, CY + 5.0)), ('L', (0, CY + 1.6))], stroke=1.5)]
    for sgn in (-1, 1):
        shapes.append(dict(segs=[('M', (0, CY + 1.6)), ('L', (sgn * 3.6, CY - 3.0))], stroke=1.5))
        shapes.append(dict(segs=[('M', (sgn * 3.6 - 1.9, CY - 3.7)), ('L', (sgn * 3.6 + 1.9, CY - 3.7))], stroke=1.5))
    return shapes

# via the opposite (Eng p116-118, 126): this house stands because the opposite one fell.
# Any ground can be applied to the opposite; precondition, no middle (no-middle).
icon("via-opposite", "the opposite is false, so this is true; or the opposite is proved, so this is false (הפך)",
     plane(M, "via") + "\n  " + house_at(M, -5.3, 0.7) + "\n  " + house_at(M, 5.3, 0.7, state="struck"), M)
# dilemma (Eng p132): every possible reading fails
icon("dilemma", "whichever way you take it, it fails (ממה נפשך)",
     plane(M, "dilemma") + "\n  " + house_at(M, 0, 1.0, state="struck") + "\n  " + floor_glyph(g_fork(), xscale=1.15), M)
# the ground does not reach the statement (Eng p132-136): the verse or the perception is real, but
# it does not touch this claim; the house stands on nothing
icon("ground-does-not-reach", "the ground is real but does not reach the statement",
     plane(M, "reach", far=3.4) + "\n  " + house_at(M, 0, 1.0), M)
# theory (Eng p142-144): inclines the mind when proofs are balanced; not a proof
icon("theory", "a theory inclines the mind, it does not prove (סברא)", plane(M, "theory") + "\n  " + leaning_house(M), M)

if __name__ == "__main__":
    write_icons(ICONS, OUT)
