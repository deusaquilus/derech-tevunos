"""Part 2: chapters 4-7, the icons NOT built from the statement shape.
Chapter 4 relations live in gen_icons_ch4_tiles.py; chapter 5 in gen_icons_ch5.py.

Colour follows Ramchal's own partition of the mind's work (Eng p18-20):
  violet  #7c3aed  understanding statements   chapters 3-6  (Part 1 hue, kept)
  teal    #0d9488  deriving new statements    chapter 7
Green and red stay reserved for verdicts (chapters 8-9).
"""
import os
from iconlib import *

T = "#0d9488"   # teal: derivation (ch7)
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "icons", "ch4-7")
ICONS = []
def icon(name, gloss, body, colour):
    ICONS.append((name, gloss, body, colour))

def swap(c, w=1.9, dashed_return=False, stroke_override=None):
    col = stroke_override or c
    top = f'<path d="M -6.8 -1.6 C -6.8 -7.6, 6.8 -7.6, 6.8 -1.6" {st(col, w)}/>\n  ' + arrowhead(6.8, -0.6, 90, col, 2.5, w)
    if dashed_return:
        bot = (f'<path d="M 6.8 1.6 C 6.8 5.4, 2.4 6.6, -1.6 6.2" {st(col, w)} stroke-dasharray="1.8 1.6"/>\n  '
               + arrowhead(-2.4, 6.0, 190, col, 2.2, w))
    else:
        bot = f'<path d="M 6.8 1.6 C 6.8 7.6, -6.8 7.6, -6.8 1.6" {st(col, w)}/>\n  ' + arrowhead(-6.8, 0.6, -90, col, 2.5, w)
    return top + "\n  " + bot

def sq(x, y, s, c, filled=False, rx=1.1):
    f = f'fill="{c}"' if filled else f'fill="{c}" fill-opacity="0.15" stroke="{c}" stroke-width="1.45" stroke-linejoin="round"'
    return f'<rect x="{x}" y="{y}" width="{s}" height="{s}" rx="{rx}" {f}/>'

# ---------------- chapter 4: how two statements relate (Eng p48-64) ----------------









# the tests that dissolve an apparent opposition (Eng p54-56)
icon("differs-in-time", "not opposed: they speak of different times",
     f'<circle cx="0" cy="0" r="8.2" {tint(V)}/>\n  <path d="M 0 0 V -5 M 0 0 H 3.8" {st(V, 1.9)}/>\n  <circle cx="0" cy="0" r="1.1" fill="{V}"/>', V)

icon("differs-in-place", "not opposed: they speak of different places",
     f'<path d="M 0 8.8 C -3.6 4.2, -6.4 1.2, -6.4 -2.4 A 6.4 6.4 0 1 1 6.4 -2.4 C 6.4 1.2, 3.6 4.2, 0 8.8 Z" {tint(V)}/>\n  '
     f'<circle cx="0" cy="-2.4" r="2.4" fill="#ffffff" stroke="{V}" stroke-width="1.3"/>', V)

icon("differs-in-context", "not opposed: they speak of different settings",
     f'<rect x="-8.4" y="-8.4" width="16.8" height="16.8" rx="2.4" {st(V, 1.45)} stroke-dasharray="2.3 1.7"/>\n  '
     f'<circle cx="0" cy="0" r="2.6" fill="{V}"/>', V)

icon("homonym", "not opposed: one word, two meanings",
     f'<rect x="-7.2" y="-7.2" width="14.4" height="14.4" rx="1.6" {tint(V)}/>\n  '
     f'<path d="M -6.4 -7.2 H 5.6 L -7.2 5.6 V -6.4 Q -7.2 -7.2 -6.4 -7.2 Z" fill="{V}"/>', V)

# contradictory terms with or without a middle (Eng p60)
icon("no-middle", "clean or unclean: nothing in between",
     f'<rect x="-8.6" y="-3.6" width="8.2" height="7.2" rx="1.1" fill="{V}"/>\n  ' + sq(0.4, -3.6, 8.2, V).replace('height="8.2"', 'height="7.2"'), V)

icon("has-middle", "optional, praiseworthy, obligatory: a middle exists",
     f'<rect x="-9.2" y="-3.6" width="5.6" height="7.2" rx="1.0" fill="{V}"/>\n  '
     f'<rect x="-2.8" y="-3.6" width="5.6" height="7.2" rx="1.0" fill="{V}" fill-opacity="0.45" stroke="{V}" stroke-width="1.3"/>\n  '
     f'<rect x="3.6" y="-3.6" width="5.6" height="7.2" rx="1.0" {tint(V, 1.3)}/>', V)

# ---------------- chapter 5: inferences (Eng p66-74) ----------------




# ---------------- chapter 6: literal or not (Eng p76) ----------------
icon("figurative", "not meant literally: read the allusion",
     f'<path d="M -8.5 -5 C -8.5 -6.9, -7.1 -8.3, -5.2 -8.3 H 5.2 C 7.1 -8.3, 8.5 -6.9, 8.5 -5 V 1.4 C 8.5 3.3, 7.1 4.7, 5.2 4.7 H -2.4 L -6.4 8.4 V 4.6 C -7.8 4.3, -8.5 3.1, -8.5 1.4 Z" {tint(V)}/>\n  '
     f'<path d="M -5.2 -1.4 C -3.9 -4.4, -1.8 -4.4, -0.4 -1.4 C 1.0 1.6, 3.1 1.6, 4.4 -1.4" {st(V, 1.8)}/>', V)

# ---------------- chapter 7: deriving a conclusion (Eng p92-110) ----------------
icon("syllogism", "premises added up give a conclusion (הקש)",
     f'<path d="M -4.4 -6.8 H 4.6 M -4.4 -2.8 H 4.6" {st(T, 2.2)}/>\n  '
     f'<path d="M -8.6 -2.8 H -6.6 M -7.6 -3.8 V -1.8" {st(T, 1.4)}/>\n  '
     f'<path d="M -8.6 1.3 H 8.6" {st(T, 1.5)}/>\n  '
     f'<path d="M -4.4 5.6 H 4.6" {st(T, 3.2)}/>', T)

def tree(c, broken=False):
    """The kind at the top, two members below. broken=True: the left branch ends in a stop bar
    and that member has dropped off the tree; it is not in the kind after all (Eng p94-96)."""
    out = f'<circle cx="0" cy="-6.2" r="2.5" fill="{c}"/>\n  '
    if not broken:
        out += (f'<path d="M 0 -3.7 V -0.8 M -5.6 -0.8 H 5.6 M -5.6 -0.8 V 2.6 M 5.6 -0.8 V 2.6" {st(c, 1.6)}/>\n  '
                f'<circle cx="-5.6" cy="5.4" r="2.5" fill="{c}"/>\n  <circle cx="5.6" cy="5.4" r="2.5" fill="#ffffff" stroke="{c}" stroke-width="1.45"/>')
    else:
        # Alexander's sketch: the left branch ends in a stop bar, and the member that was supposed
        # to hang there has dropped off below it, detached. The right member stays on the tree.
        out = (f'<circle cx="0" cy="-7.3" r="2.3" fill="{c}"/>\n  '
               f'<path d="M 0 -5.0 V -2.4 M -5.6 -2.4 H 5.6 M 5.6 -2.4 V 2.0 M -5.6 -2.4 V 3.4" {st(c, 1.6)}/>\n  '
               f'<path d="M -8.2 3.4 H -3.0" {st(c, 2.0)}/>\n  '
               f'<circle cx="5.6" cy="4.3" r="2.3" fill="{c}"/>\n  '
               f'<circle cx="-5.6" cy="7.3" r="2.3" fill="{c}"/>')
    return out

icon("classical-syllogism", "true of the whole kind, so true of this member (הקש מופתי)", tree(T), T)

icon("analogism", "found in this one, so also in that similar one (בנין אב / מה מצינו)",
     sq(-9.2, -2.9, 5.8, T, filled=True) + "\n  " + f'<path d="M -2.4 0 H 0.6" {st(T, 1.8)}/>\n  ' + arrowhead(1.8, 0, 0, T, 2.3, 1.8) + "\n  " + sq(3.4, -2.9, 5.8, T), T)

icon("a-fortiori", "if the light case, then surely the heavy one (קל וחומר)",
     f'<circle cx="-7.3" cy="0" r="2.1" fill="{T}"/>\n  <path d="M -4.2 0 H -1.9" {st(T, 1.8)}/>\n  ' + arrowhead(-0.8, 0, 0, T, 2.3, 1.8) +
     f'\n  <circle cx="4.5" cy="0" r="4.9" {tint(T)}/>', T)

icon("hypothetical-syllogism", "this is now established, so that follows (הקש תלוי)",
     domino(-8.6, -1.4, 4.6, 10.2, T, fill=1.0) + "\n  " + domino(1.6, -1.4, 4.6, 10.2, T) + "\n  " +
     f'<path d="M -7.0 -6.4 H 4.6" {st(T, 1.9)}/>\n  ' + arrowhead(5.6, -6.4, 0, T, 2.7, 1.9), T)

icon("hypothetical-syllogism-tollens", "that did not follow, so this was never so (הקש תלוי, on the denial)",
     domino(-8.6, -1.4, 4.6, 10.2, T) + "\n  " + domino(1.6, -1.4, 4.6, 10.2, T) + "\n  " +
     f'<path d="M 2.4 2.0 L 6.4 6.0 M 6.4 2.0 L 2.4 6.0" {st(T, 2.1)}/>\n  '
     f'<path d="M -7.8 2.0 L -3.8 6.0 M -3.8 2.0 L -7.8 6.0" {st(T, 2.1)}/>\n  '
     f'<path d="M 4.6 -6.4 H -5.0" {st(T, 1.9)}/>\n  ' + arrowhead(-6.0, -6.4, 180, T, 2.7, 1.9), T)

icon("disjunctive-syllogism", "not that one, so it must be this one (הקש מחלק)",
     f'<path d="M 0 8.5 V 0.5 M 0 0.5 L -6.2 -6" {st(T, 1.6)} stroke-dasharray="2 1.5"/>\n  '
     f'<path d="M 0 0.5 L 6.2 -6" {st(T, 2.4)}/>\n  '
     f'<path d="M -8.3 -8.1 L -4.1 -3.9 M -4.1 -8.1 L -8.3 -3.9" {st(T, 2.0)}/>\n  '
     f'<circle cx="6.2" cy="-6" r="2.4" fill="{T}"/>\n  <circle cx="0" cy="8.5" r="1.5" fill="{T}"/>', T)

# why an analogism or a fortiori fails (Eng p100-104)
# why the classical syllogism fails (Eng p94-96): the member is not in the kind after all
icon("fallacy-not-included", "this member is not in the kind after all (Shabbos 70a, 43b)", tree(T, broken=True), T)

# why an analogism or a fortiori fails (Eng p100-104), in the same case-level vocabulary as
# analogism and a-fortiori: filled = the known case, outlined = the case argued to, arrow = it carries.
icon("fallacy-not-similar", "the two cases are not alike after all (מה ל... שכן...)",
     sq(-9.2, -2.9, 5.8, T, filled=True) + "\n  " +
     f'<path d="M -2.4 0 H -1.0 M 0.4 0 H 1.0" {st(T, 1.8)}/>\n  ' + arrowhead(2.0, 0, 0, T, 2.1, 1.8) +
     f'\n  <path d="M -0.9 -2.6 L 0.3 2.6" {st(T, 1.6)}/>\n  <circle cx="6.3" cy="0" r="2.9" {tint(T)}/>', T)

icon("fallacy-not-greater", "which case is the heavier one is not settled",
     f'<circle cx="-5.9" cy="0" r="3.2" {tint(T)}/>\n  <circle cx="5.9" cy="0" r="3.2" {tint(T)}/>\n  '
     f'<path d="M -1.4 0 H 1.4" {st(T, 1.7)}/>\n  ' + arrowhead(-2.0, 0, 180, T, 1.9, 1.7) + "\n  " + arrowhead(2.0, 0, 0, T, 1.9, 1.7), T)

icon("fallacy-counterexample", "another case just as similar lacks it",
     sq(-9.4, -9.0, 6.2, T, filled=True) + "\n  " + f'<path d="M -2.2 -5.9 H 0.4" {st(T, 1.8)}/>\n  ' + arrowhead(1.4, -5.9, 0, T, 2.2, 1.8) +
     "\n  " + sq(3.2, -9.0, 6.2, T) + "\n  " +
     sq(3.2, 2.6, 6.2, T) + "\n  " +
     f'<path d="M 4.6 4.0 L 8.0 7.4 M 8.0 4.0 L 4.6 7.4" {st(T, 1.8)}/>', T)

write_icons(ICONS, OUT)
