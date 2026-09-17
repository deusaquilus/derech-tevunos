"""Renders the contact sheets and the two-column review sheets from the SVGs.

  python3 make_sheets.py            # writes ../contact-sheets/*.png

Review sheets have exactly two icon columns, "first pass" and "latest", nothing
else. Contact sheets are the whole set, grouped by section, in colour and in
greyscale. Needs cairosvg and Pillow (with raqm for the Hebrew labels).
"""
import io, os
import cairosvg
from PIL import Image, ImageDraw, ImageFont, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
ICONS = os.path.join(ROOT, "icons")
OUT = os.path.join(ROOT, "contact-sheets")
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
INK = (30, 41, 59); MUTED = (100, 116, 139); RULE = (226, 232, 240)

def render(path, height):
    png = cairosvg.svg2png(url=path, output_height=height)
    im = Image.open(io.BytesIO(png)).convert("RGBA")
    bg = Image.new("RGBA", im.size, "white"); bg.alpha_composite(im)
    return bg.convert("RGB")

def text(d, xy, s, size=15, bold=False, fill=INK, anchor="la"):
    f = ImageFont.truetype(FONT_B if bold else FONT, size)
    d.text(xy, s, fill=fill, font=f, anchor=anchor)

def find(key):
    for d in ("ch9-moves", "ch1-3", "ch4-7", "ch8"):
        p = os.path.join(ICONS, d, key + ".svg")
        if os.path.exists(p):
            return p
    raise FileNotFoundError(key)

# ---------------- contact sheets ----------------

PART1 = [
    ("Existing seven (chapter 9 moves), for comparison", [
        ("statement", "statement", ""), ("question", "question", ""), ("answer", "answer", ""), ("proof", "proof", ""),
        ("contradiction", "contradiction", ""), ("difficulty", "difficulty", ""), ("resolution", "resolution", "")]),
    ("Chapter 3, by subject: how much of the class", [
        ("categorical", "all", "כולל"), ("partial", "some", "קצתי"), ("particular", "this one", "פרטי"),
        ("unqualified", "all, implied", "סתמי")]),
    ("Chapter 3, by predicate: how firmly it is said", [
        ("simple", "plain", "סתם"), ("qualified-certain", "certain", "ודאי"), ("qualified-possible", "possible", "אפשר"),
        ("qualified-doubtful", "doubtful", "ספק"), ("qualified-impossible", "impossible", "אי אפשר")]),
    ("Chapter 3, by predicate: narrowing", [
        ("exclusion", "only", "ממעט"), ("exception", "except", "מוציא / חוץ מ"), ("conditional", "provided that", "מגבל / ובלבד ש")]),
    ("Chapter 3, by predicate: dependency", [
        ("hypothetical", "if… then", "תלוי / אם"), ("consequent", "therefore", "נמשך / לפיכך")]),
    ("Chapter 3, by predicate: more than one thing", [
        ("compound", "and (together)", "מרבה הענינים"), ("disjunction", "either / or", "או… או"),
        ("compound-not-only", "not only… but even", "לא זו אף זו"), ("compound-needless", "…and needless to say", "זו ואצ״ל זו")]),
    ("Chapter 3, by predicate: contrast and comparison", [
        ("preclusive", "not this, but that", "לא… אלא"), ("discrepancy", "even though", "מכחיש / אע״פ ש"),
        ("comparative", "just as… so too", "מדמה / כשם ש")]),
    ("Chapter 1: who is speaking", [
        ("party-group", "a group", ""), ("party-individual", "one person, both sides", ""), ("party-talmud", "the Talmud itself", "")]),
]

PART2 = [
    ("From Part 1, the icons these extend", [
        ("simple", "plain statement", "סתם"), ("comparative", "just as… so too", "מדמה"), ("hypothetical", "if… then", "תלוי"),
        ("consequent", "therefore", "נמשך"), ("disjunction", "either / or", "או… או"), ("partial", "some", "קצתי"),
        ("proof", "proof (ch 9)", "ראיה")]),
    ("The statement shape, and chapter 4: how two statements relate", [
        ("statement-tile", "one statement", "נושא | נשוא"), ("equivalent", "same thing", "דומים"),
        ("variant", "1 subject, 2 predicates", "מתחלפים"), ("variant-subjects", "2 subjects, 1 predicate", "מתחלפים"),
        ("diametrically-opposed", "head-on", "הפכיים ממש"), ("contradictory", "general vs particular", "מתנגדים"),
        ("converse", "swapped", "חלוף כולל"), ("converse-limited", "swapped, all → some", "חלוף קצתי"),
        ("contrapositive", "swapped, is → is not", "חלוף הפכי"), ("obverse", "both terms flipped", "מתהפכים"),
        ("incongruent", "nothing shared", "נבדלים")]),
    ("Chapter 4: why two statements only look opposed", [
        ("differs-in-time", "different time", ""), ("differs-in-place", "different place", ""),
        ("differs-in-context", "different setting", ""), ("homonym", "one word, 2 meanings", ""),
        ("no-middle", "no middle term", ""), ("has-middle", "a middle term", "")]),
    ("Chapter 5: what a statement implies", [
        ("inference-necessary", "forced inference", "מוכרח"), ("inference-loose", "loose inference", "בלתי מוכרח"),
        ("absolute-opposite", "some do, some don't", "הפך")]),
    ("Chapter 6: not meant literally", [("figurative", "figurative", "משל / הפלגה")]),
    ("Chapter 7: deriving a conclusion", [
        ("syllogism", "premises add up", "הקש"), ("classical-syllogism", "kind → member", "הקש מופתי"),
        ("analogism", "like → like", "בנין אב"), ("a-fortiori", "light → heavy", "קל וחומר"),
        ("hypothetical-syllogism", "known → follows", "הקש תלוי"), ("hypothetical-syllogism-tollens", "denied ← denied", "הקש תלוי"),
        ("disjunctive-syllogism", "not that, so this", "הקש מחלק")]),
    ("Chapter 7: why a deduction fails", [
        ("fallacy-not-included", "not in the kind after all", ""), ("fallacy-not-similar", "not alike after all", "מה ל… שכן"),
        ("fallacy-not-greater", "which is heavier?", ""), ("fallacy-counterexample", "a third case lacks it", "")]),
]

def contact_sheet(sections, out, grey=False, cols=6, cell=200, icon_h=72, pad=40):
    rows = []
    for title, items in sections:
        n = (len(items) + cols - 1) // cols
        rows.append((title, n))
    H = pad
    for title, n in rows:
        H += 44 + n * (icon_h + 66) + 16
    W = pad * 2 + cols * cell
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)
    y = pad
    for (title, items), (_, n) in zip(sections, rows):
        text(d, (pad, y), title, 19, bold=True)
        y += 44
        for i, (key, label, heb) in enumerate(items):
            cx = pad + (i % cols) * cell + cell // 2
            cy = y + (i // cols) * (icon_h + 66)
            im = render(find(key), icon_h)
            if grey:
                im = ImageOps.grayscale(im).convert("RGB")
            img.paste(im, (cx - im.width // 2, cy))
            text(d, (cx, cy + icon_h + 10), label, 15, anchor="ma")
            if heb:
                text(d, (cx, cy + icon_h + 32), heb, 13, fill=MUTED, anchor="ma")
        y += n * (icon_h + 66) + 16
    img.save(out)
    print("wrote", out)

# ---------------- two-column review sheets ----------------

def review_sheet(rows, out, icon_h=96):
    """rows: (label, hebrew, key, first_pass_svg_or_None). Two icon columns, nothing else."""
    W, LEFT, C1, C2 = 760, 40, 340, 560
    RH = icon_h + 60
    H = 90 + RH * len(rows) + 20
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)
    text(d, (C1, 50), "first pass", 19, bold=True, anchor="ma")
    text(d, (C2, 50), "latest", 19, bold=True, anchor="ma")
    d.line([(LEFT, 84), (W - LEFT, 84)], fill=MUTED, width=1)
    y = 90
    for label, heb, key, before in rows:
        cy = y + RH // 2
        text(d, (LEFT, cy - 12), label, 16, anchor="la")
        if heb:
            text(d, (LEFT, cy + 12), heb, 13, fill=MUTED, anchor="la")
        if before and os.path.exists(before):
            im = render(before, icon_h); img.paste(im, (C1 - im.width // 2, cy - im.height // 2))
        else:
            text(d, (C1, cy), "(new)", 14, fill=MUTED, anchor="mm")
        im = render(find(key), icon_h); img.paste(im, (C2 - im.width // 2, cy - im.height // 2))
        y += RH
        d.line([(LEFT, y), (W - LEFT, y)], fill=RULE, width=1)
    img.save(out)
    print("wrote", out)

PART3 = {
    "section1": [("Part 3, chapter 8. Section 1: what a proof stands on", [
        ("ground-axiom", "the mind dictates it", "מושכלות ראשונים"), ("ground-sense", "the senses testify", "מוחשות"),
        ("ground-common-sense", "everyone holds it", "מפורסמות"), ("ground-tradition", "handed down", "מקובלות"),
        ("ground-deduction", "it follows", "הקש")])],
    "section2": [("Part 3, chapter 8. Section 2: indirect routes, the dilemma, a ground that does not reach, and theory", [
        ("via-opposite", "via the opposite", "הפך"), ("dilemma", "either way it fails", "ממה נפשך"),
        ("ground-does-not-reach", "the ground does not reach it", ""), ("theory", "leans, does not prove", "סברא")])],
    "sections3-5": [
        ("Part 3, chapter 8. Section 3: the rebuttals (my house left, the dissenting view right)", [
            ("rebuttal-your-reasoning", "hits you too", "ולטעמיך"), ("rebuttal-just-the-opposite", "thrown back", "אדרבא"),
            ("rebuttal-proves-my-point", "your text proves my point", "משם ראיה")]),
        ("Section 4: objections to form, what was said", [
            ("obvious", "adds nothing", "פשיטא"), ("might-have-thought", "excludes a thought", "סלקא דעתין"),
            ("redundant-part", "a part repeats", "הא תו למה לי"), ("self-contradictory", "words disagree", "הא גופא קשיא"),
            ("misordered", "out of order", "תנא היכא קאי")]),
        ("Section 5: the predicate said potentially or actually", [
            ("potential", "can, is eligible", "בכח"), ("actual", "actually does", "בפועל")]),
    ],
}

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    contact_sheet(PART1, os.path.join(OUT, "contact-sheet-part1.png"))
    contact_sheet(PART1, os.path.join(OUT, "contact-sheet-part1-grey.png"), grey=True)
    contact_sheet(PART2, os.path.join(OUT, "contact-sheet-part2.png"))
    contact_sheet(PART2, os.path.join(OUT, "contact-sheet-part2-grey.png"), grey=True)
    for name, sec in PART3.items():
        n = max(len(items) for _, items in sec)
        contact_sheet(sec, os.path.join(OUT, f"part3-{name}.png"), cols=n, cell=240, icon_h=120)
        contact_sheet(sec, os.path.join(OUT, f"part3-{name}-grey.png"), grey=True, cols=n, cell=240, icon_h=120)
    review_sheet([
        ("plain statement", "סתם", "simple", os.path.join(ROOT, "notes", "superseded", "simple-dot-bar.svg")),
        ("not in the kind after all", "", "fallacy-not-included", os.path.join(ROOT, "notes", "superseded", "fallacy-not-included-cut-branch.svg")),
    ], os.path.join(OUT, "tile-pass-before-after.png"))
