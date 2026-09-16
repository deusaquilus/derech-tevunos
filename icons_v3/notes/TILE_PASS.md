# The tile pass: tried, mostly rejected

Part 2's notes (section 8) said `simple`, `comparative`, `analogism`,
`absolute-opposite` and the three fallacy icons "should be rebuilt from
tiles." It was tried. Alexander rejected it, and he was right. Record:

## The rejected rebuild (SVGs in `rejected/tile-pass/`)

`comparative` and `analogism` were drawn as the `variant-subjects`
silhouette: two subject boxes sharing one predicate arrow, the known box
solid, the second box tinted (comparative) or a ghost (analogism). The two
analogism fallacies were rows of the same kind: a pill-shaped subject with an
open seam for "not alike", a second known row with the seam x for "a third
case lacks it". Primitives in `rejected/tile-pass/tilelib_rows.py`.

## Why it was wrong

1. It fixed the shared term as the predicate. Ramchal's comparative compares
   a known ענין (matter) to an unknown one (Heb p39) and never says which term
   the two share. In "just as they share the chullin, so they share the
   terumah" the comparison runs on whatever the two matters have in common.
   The first-pass ■ = □ commits to nothing, which is correct; the tile
   version reinterpreted past the cited definition. A common-subject twin
   would not fix this; the icon should not commit at all.
2. It split chapter 7 in two. `a-fortiori`, `fallacy-not-greater`, the tree
   and the dominoes are case-level glyphs; moving three siblings to tile
   level broke the family's one vocabulary. The first pass ■ → □ already says
   "found in this one, so in that similar one" at case level, which is the
   level Ramchal defines the analogism at.
3. The tile is the right atom for chapter 4 (constructs defined by what
   happens inside a statement), not a universal atom. The reference now
   states the two registers, term-level and unit-level, in section 3.

## What stayed

- `simple` is the bare statement tile: the one case where the tile is the
  literal picture of the construct and commits to nothing extra. The
  dot-and-bar first pass is in `superseded/simple-dot-bar.svg`; reverting is
  one line in `gen_icons.py`.
- `fallacy-not-included` (new): the classical syllogism fails when the member
  is not in the kind after all (Eng p94–96; Shabbos 70a, Shabbos 43b). The
  `classical-syllogism` tree with the left branch ending in a stop bar and
  its member dropped off below it, detached (Alexander's sketch; the earlier
  cut-branch version is in `superseded/`). In the tree's own vocabulary.
- The chapter 5 trio was never in scope: it was redrawn to Alexander's
  box-and-connector sketch after section 8 was written
  (`ch4-tile-history/gen_icons_ch5_stacked.py` is the earlier stacked-tile
  version).
- `fallacy-not-greater` is the failure of `a-fortiori`, which draws cases by
  weight, not statements.

## Consequence for Part 3

Chapter 8 is about whole statements (what a proof rests on, how a disproof
is turned aside). It is drawn in the unit register: boxes and cases with
connectors, as chapters 5 and 7 are. Not from the tile.
