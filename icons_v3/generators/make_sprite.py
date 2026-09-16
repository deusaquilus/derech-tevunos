"""Assembles every icon into one SVG sprite, all-icons.svg, as <symbol> elements keyed by
the icon's name. Use with <svg><use href="all-icons.svg#ground-axiom"/></svg>; wide icons
(the chapter 5 three) have their own viewBox on the symbol. Run from generators/."""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, "..")
ICONS = os.path.join(ROOT, "icons"); OUT = os.path.join(ROOT, "all-icons.svg")
symbols = []
for d in ("ch9-moves", "ch1-3", "ch4-7", "ch8"):
    for n in sorted(os.listdir(os.path.join(ICONS, d))):
        if not n.endswith(".svg"): continue
        key = n[:-4]
        src = open(os.path.join(ICONS, d, n), encoding="utf-8").read()
        vb = re.search(r'viewBox="([^"]+)"', src).group(1)
        inner = src[src.index(">", src.index("<svg")) + 1:src.rindex("</svg>")]
        inner = re.sub(r'<title>.*?</title>', '', inner, flags=re.S).strip()
        symbols.append(f'  <symbol id="{key}" viewBox="{vb}" data-family="{d}">\n    {inner}\n  </symbol>')
open(OUT, "w", encoding="utf-8").write('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' + "\n".join(symbols) + "\n</svg>\n")
print(len(symbols), "symbols written to", OUT)
