"""Part 1: chapter 1-3 icon candidates. Geometry helpers live in iconlib.py."""
from iconlib import *

OUT = "/home/claude/icons-ch1-3"
ICONS = []
def icon(name, gloss, body, colour):
    ICONS.append((name, gloss, body, colour))

# ---------- chapter 3, by subject: how much of the class is spoken about ----------
ALL = {(ix, iy) for ix in range(2) for iy in range(2)}
icon("categorical", "about all of them (כולל)", grid(ALL), V)
icon("partial", "about some of them (קצתי)", grid({(0,0),(1,0)}), V)
icon("particular", "about this one (פרטי)", grid({(0,0)}), V)
icon("unqualified", "about all of them, though 'all' is not said (סתמי)",
     grid(ALL) + f'\n  <circle cx="0" cy="0" r="9.6" {st(V, 1.1)} stroke-dasharray="1.9 1.7"/>', V)

# ---------- chapter 3, by predicate: how it attaches ----------
icon("simple", "plainly says something about something (סתם)",
     f'<circle cx="-6.6" cy="0" r="2.7" fill="{V}"/>\n  '
     f'<path d="M -1.8 0 H 8.6" {st(V, 2.6)}/>', V)

icon("qualified-certain", "said as certain (ודאי)", bars(3), V)
icon("qualified-possible", "said as possible (אפשר)", bars(2), V)
icon("qualified-doubtful", "said as doubtful (ספק)", bars(1), V)
icon("qualified-impossible", "said as impossible (אי אפשר)", bars(0, slash=True), V)

icon("exclusion", "this and nothing else (ממעט)",
     f'<circle cx="0" cy="0" r="8.4" {tint(V)}/>\n  '
     f'<circle cx="0" cy="0" r="4.9" {tint(V)}/>\n  '
     f'<circle cx="0" cy="0" r="1.9" fill="{V}"/>', V)

icon("exception", "all of it, except this piece (מוציא)", pie_except(), V)


# A. recommended: a circuit that only runs once the switch closes
icon("conditional", "holds provided the switch closes (מגבל)",
     ring_gap(V, r=7.0, a1=-44, a2=-136) + "\n  " + switch_open(V, r=7.0, a1=-44, a2=-136, blade=9.8, lift=-30), V)

# fallback: the power-button shape (most legible at 20px, but reads as on/off, not as a condition)
icon("conditional-alt-power", "power-symbol variant",
     ring_gap(V, a1=-62, a2=-118) + "\n  " + f'<path d="M 0 -9.6 V -1.6" {st(V, 2.2)}/>', V)

icon("hypothetical", "if this, then that; only the link is claimed (תלוי)",
     domino(-8.6, -1.4, 4.6, 10.2, V) + "\n  " + domino(1.6, -1.4, 4.6, 10.2, V) + "\n  " +
     f'<path d="M -7.0 -6.4 H 4.6" {st(V, 1.9)}/>\n  ' +
     arrowhead(5.6, -6.4, 0, V, 2.7, 1.9), V)

icon("consequent", "this happened, so that happened (נמשך)",
     domino(-9.8, -3.0, 4.4, 10.2, V, rot=40, pivot=(-9.8, 7.2), fill=1.0) + "\n  " +
     domino(-0.6, -2.8, 4.4, 10.0, V, rot=84, pivot=(-0.6, 7.2), fill=1.0) + "\n  " +
     f'<path d="M -10.5 8.6 H 9.5" {st(V, 1.1)}/>', V)

icon("compound", "several things said together (מרבה הענינים)",
     f'<path d="M -3.2 -8.2 H -6.8 V 8.2 H -3.2" {st(V, 1.8)}/>\n  '
     f'<path d="M -1.4 -5.2 H 7.8 M -1.4 0 H 7.8 M -1.4 5.2 H 7.8" {st(V, 2.2)}/>', V)

icon("compound-not-only", "not only this, but even that (לא זו אף זו)",
     f'<path d="M -9 7.5 H -3 V 0.5 H 3 V -6.5 H 9" {st(V, 2.5)}/>\n  '
     f'<circle cx="-6.2" cy="7.5" r="1.6" fill="{V}"/>\n  <circle cx="6.2" cy="-6.5" r="2.6" fill="{V}"/>', V)

icon("compound-needless", "this, and needless to say that (זו ואין צריך לומר זו)",
     f'<path d="M -9 -6.5 H -3 V 0.5 H 3 V 7.5 H 9" {st(V, 2.5)}/>\n  '
     f'<circle cx="-6.2" cy="-6.5" r="2.6" fill="{V}"/>\n  <circle cx="6.2" cy="7.5" r="1.6" fill="{V}"/>', V)

icon("disjunction", "one or the other (או... או)",
     f'<path d="M 0 8.5 V 0.5 M 0 0.5 L -6.2 -6 M 0 0.5 L 6.2 -6" {st(V, 2.0)}/>\n  '
     f'<circle cx="-6.2" cy="-6" r="2.1" fill="#ffffff" stroke="{V}" stroke-width="1.45"/>\n  '
     f'<circle cx="6.2" cy="-6" r="2.1" fill="#ffffff" stroke="{V}" stroke-width="1.45"/>\n  '
     f'<circle cx="0" cy="8.5" r="1.5" fill="{V}"/>', V)

icon("preclusive", "not this, but rather that (לא... אלא)",
     f'<path d="M -8.6 -6.4 L -4.4 -2.2 M -4.4 -6.4 L -8.6 -2.2" {st(V, 2.0)}/>\n  '
     f'<path d="M -1.6 -4.3 H 8.8" {st(V, 2.0)} stroke-opacity="0.5"/>\n  '
     f'<path d="M -9.0 4.3 H -4.6" {st(V, 1.8)}/>\n  ' + arrowhead(-4.2, 4.3, 0, V, 2.4, 1.8) + "\n  "
     f'<path d="M -1.6 4.3 H 8.8" {st(V, 2.8)}/>', V)

icon("discrepancy", "holds, even though it looks like it should not (מכחיש)",
     f'<path d="M -8.4 0.6 C -8.4 -4.6, -4.2 -6.6, 0 -6.6 C 4.2 -6.6, 8.4 -4.6, 8.4 0.6 Z" {tint(V)}/>\n  '
     f'<path d="M 0 0.6 V 6.6 C 0 8.6, -3.2 8.6, -3.2 7.0" {st(V, 1.5)}/>\n  '
     f'<path d="M -6.2 -10 L -5.2 -8.2 M -0.5 -10.4 L 0.5 -8.6 M 5.2 -10 L 6.2 -8.2" {st(V, 1.4)}/>', V)

icon("comparative", "just as this, so too that (מדמה)",
     f'<rect x="-9.2" y="-2.9" width="5.8" height="5.8" rx="1.1" fill="{V}"/>\n  '
     f'<path d="M -1.6 -1.4 H 1.6 M -1.6 1.4 H 1.6" {st(V, 1.7)}/>\n  '
     f'<rect x="3.4" y="-2.9" width="5.8" height="5.8" rx="1.1" {tint(V)}/>', V)

# ---------- chapter 1: who is speaking ----------
icon("party-group", "several people debating", person(-3.8, -1.4, S) + "\n  " + person(3.8, -1.4, S), S)
icon("party-individual", "one person arguing both sides with himself",
     person(0, 0.2, S, r=3.0, sw=8.5) + "\n  " +
     f'<path d="M -6.6 -8.2 H 6.6" {st(S, 1.7)}/>\n  ' + arrowhead(7.4, -8.2, 0, S, 2.4, 1.7) + "\n  " + arrowhead(-7.4, -8.2, 180, S, 2.4, 1.7), S)
icon("party-talmud", "the Talmud itself, asking and answering",
     f'<path d="M -9 -6.4 C -6.2 -7.6, -2.6 -7.2, 0 -5.4 V 7.4 C -2.6 5.6, -6.2 5.4, -9 6.4 Z" {tint(S)}/>\n  '
     f'<path d="M 9 -6.4 C 6.2 -7.6, 2.6 -7.2, 0 -5.4 V 7.4 C 2.6 5.6, 6.2 5.4, 9 6.4 Z" {tint(S)}/>\n  '
     f'<path d="M -6.4 -3.2 C -4.6 -3.9, -3.6 -3.8, -2.4 -3.3 M -6.4 -0.2 C -4.6 -0.9, -3.6 -0.8, -2.4 -0.3 M 2.4 -3.3 C 3.6 -3.8, 4.6 -3.9, 6.4 -3.2 M 2.4 -0.3 C 3.6 -0.8, 4.6 -0.9, 6.4 -0.2" {st(S, 1.1)}/>', S)


write_icons(ICONS, OUT)
