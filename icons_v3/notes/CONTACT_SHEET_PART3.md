# Part 3: chapter 8, decision log

The methodology (METHODOLOGY.md, section 6) explains the landscape and how it
was reached. This file is the per-section log of what was shown, chosen and
rejected, so no candidate is offered twice.

## Section 1: the grounds (approved)

- Base: plinth with a statement box → rejected. Plinth with the ∴ sign →
  rejected (Latin notation; not a floor). Trapezoid / pedestal variants →
  rejected ("even worse"; no depth). Floor in depth with horizon line and
  gradient → accepted. ∴ as sky element → dropped; candidates house, flag,
  tower, pillar, tree, signpost, thumb, star → **house**.
- Axiom: "1 < 2" dots tried, read as weight → **sun** (ברור כשמש).
- Senses: an eye alone said "sight" → candidates eye+ear, eye+ear+mouth, four
  organs, head with rays → superseded by **Alexander's senses drawing**,
  embedded as is with a thickening stroke.
- Common sense: three heads and shoulders (unchanged).
- Tradition: page with lines (collided with the statement icon) → scroll →
  two hand drawings from primitives (rejected, "janky") → **Alexander's hands
  silhouette**, rotated 16° and enlarged to fill the floor.
- Deduction: plus sign → arrow → **arrow on the floor pointing at the house**
  (a rightward arrow in perspective reads as bent).
- Perspective: Alexander applied an Inkscape perspective envelope to the
  senses icon by hand; the same effect is now generated for every floor glyph
  (`perspective.py`, `NARROW` 0.60, `SQUASH` 0.90).

## Section 2 (approved)

- `via-opposite`: two houses, the right one struck. The X is confined to the
  walls so it never spills onto the neighbour.
- `dilemma`: a V of two roads → **a road that forks (Y)**, both branches
  ending in the stop bar; house struck.
- `ground-does-not-reach`: floor stopping short → plus a thin outline of the
  full ground → **dotted outline** (Alexander's call).
- `theory`: tilted balance → rejected (a scale means justice, not
  inclination). Candidates tent, weathervane, leaning house, ramp and ball →
  **leaning house** (Alexander's pick; the recommendation had been the tent).

## Exports

Hand-edit zips: pretty-printed shipped SVGs, and the flat export (glyph
upright inside `<g id="glyph" transform="matrix(1,0,0,1,0,0)">`). See
METHODOLOGY.md section 8.
