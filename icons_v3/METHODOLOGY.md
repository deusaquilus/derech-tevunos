# Derech Tevunos icon set: methodology

How this icon set is made, reviewed and extended. Written so another agent can
pick up the work without re-learning the decisions. `ICONS_REFERENCE.md` is the
contract for *using* the icons (what each means, where it attaches); this file
is the contract for *making* them. Read both before adding or changing an icon.

Owner and reviewer: Alexander. He decides; the notes below record what he has
decided and why, so it is not re-litigated.

---

## 1. What the set is for

An educational tool for laymen learning the Talmud with Ramchal's *Derech
Tevunos* (The Ways of Reason) as the map. The icons mark the constructs Ramchal
names, so a sugya can be shown as a "waterfall" of moves (chapter 9's seven:
statement, question, answer, proof, contradiction, difficulty, resolution) with
badges saying what each move is made of, how it relates to another, what
derived it, and what it stands on.

Consequences for design:

- The reader is a layman, not a logician. A picture has to read on its own or
  from the marker word it stands for. Latin-logic notation (∴, ⊢, Q.E.D.) was
  tried and rejected for that reason.
- Density is a UX problem, not a reason to drop a construct. If Ramchal names
  it, it can be made clear; find the picture.
- It should feel Ramchal-style: his own words, his own examples, his own
  taxonomy. Doctrinal perfection is not required, faithfulness to his cited
  definition is.

## 2. The source and how constructs are found

The text is the bilingual printed edition (Feldheim, 1988/2014). Even pages
are English, odd pages Hebrew; page numbers in every note and in the
reference follow that edition. The chapter outlines on pp. 249–254 are the
fastest index of what the book contains.

Procedure for a chapter:

1. Read the chapter in full, both languages. The Hebrew carries Ramchal's own
   term; the English carries the translator's. Record both (the reference
   keys on the English, with the Hebrew beside it; chapter 4 keys on the
   Hebrew because the English is inconsistent there).
2. List every construct Ramchal *names or defines*, with its page, its stock
   marker phrase in the Gemara if it has one (פשיטא, ממה נפשך, אלא מעתה…), and
   the example passage he gives. Those examples become the fixtures in the
   reference (section 12).
3. Decide, construct by construct, whether it gets an icon, is covered by an
   existing icon, or is recorded as "no icon by decision". Do not improvise a
   neighbour; record the gap (reference, rule 7).
4. Draw each icon to the *cited* definition and nothing more. The one rule the
   set has been burned by twice: an icon must not assert what the text does
   not (see section 7, the tile pass).

Ramchal's three processes of the mind (Eng p18–20) organise the whole set:
understanding statements (chapters 3–6), deriving new ones (chapter 7),
accepting or rejecting them (chapters 8–9). Each is a family with a colour.

## 3. Families, colours, attachment

| Family | Chapters | Colour | Attaches to |
|---|---|---|---|
| Moves | 9 | one semantic colour each (existing set, not generated here) | a row |
| Anatomy | 1–6 | violet `#7c3aed`; parties slate `#475569` | a badge on a row, or on the edge between two rows |
| Derivation | 7 | teal `#0d9488` | the edge from premises to conclusion |
| Grounds | 8 | magenta `#c026d3` | the `proof`/`contradiction` edge, or the `difficulty` edge that attacks one |

Green and red are reserved for verdicts (accepted / rejected, the `answer`
and `contradiction` moves). No badge may use them, and no badge may be
coloured by the row's status. Amber and yellow belong to `difficulty` and
`resolution`, blue to `question`. Magenta was chosen for chapter 8 as the only
clean hue left; it was checked against violet and red on a strip.

Reserved pictures, never reused for something else: a checkmark (answer), a
thumb (proof), a lightbulb (resolution), a warning triangle (difficulty), an
open book (the Talmud as a party), a document with lines (a statement), heads
and shoulders in slate (the parties), a tree diagram (the classical
syllogism), dominoes (the hypothetical syllogism), a Y fork (a disjunction),
two hands (tradition), a sun (an axiom).

## 4. The canvas and the rendering rules

- `viewBox="-12 -12 24 24"`; content stays inside ±9.6 unless the picture needs
  the sky (chapter 8's house reaches −11.6). Three chapter 5 icons are wide,
  `viewBox="-18 -12 36 24"`.
- Stroke 1.45, round caps and joins; fills at 15 % opacity of the stroke
  colour for the tinted outline; solid fill for "known"; white glyphs on a
  solid fill for the negative rendering.
- Each SVG carries `role="img"`, `aria-label` = key, and a `<title>` gloss.
  Keys are the filename stems.
- Chapter 8 is the one family with gradients; each icon owns its gradient id
  (`fade-<key>`) so icons can be inlined together.
- Everything is checked at 20 px (30 px for the wide three) and in greyscale.
  The greyscale sheet is the test that shape, not colour, carries the meaning.
  Fine detail that vanishes at 20 px is acceptable when the silhouette still
  carries the construct and the detail is visible at 48 px (the hands, the
  senses drawing).

## 5. The picture rules

**Chapter 3, everyday pictures of the marker word.** A chapter 3 badge is a
picture of the stock word: signal bars for certainty, a bullseye for "only", a
pie with a slice out for "except", an umbrella for "even though". These are
not built from a shared shape; the shape is whatever reads at a glance.

**Chapter 4, one shape and every relation a variation of it.** Alexander's
rule, given after the first chapter 4 pass was rejected: relations between
two statements need one unifying shape for "a statement" so that every
relation renders as a variation of it. The shape is the tag-shaped block
arrow: box = subject, arrow = predicate, direction = order. Its grammar (the
encodings table in the reference, section 3) gives each meaning exactly one
visual variable: order → direction, sign → negative rendering, scope → size,
shared term → merged element, implied → ghost, the same statement → a
ghosted copy behind.

**Same primitive, one step further.** Where two constructs are one idea at
two stages, the second icon is the first plus one mark, so the link is
visible: `comparative` (■ = □) → `analogism` (■ → □); `disjunctive-syllogism`
(a fork, one branch struck) → `dilemma` (both branches blocked);
`classical-syllogism` (the tree) → `fallacy-not-included` (the tree with a
branch cut). Look for this before inventing a new picture.

**Two registers, decided by the text.** The tile is *term-level* and belongs
only where Ramchal defines a construct by what happens inside a statement
(chapter 4). Constructs defined on whole statements or matters (ענינים) are
drawn at *unit level*: a box or case glyph, filled = known, outlined =
derived, ghost = implied, connector = the relation. That is chapters 3
(`comparative`), 5, 7 and 8. Do not rebuild a unit-level icon from the tile
(section 7 below).

**Chapter 8, the landscape.** A base picture with depth, described in
section 6. Every chapter 8 icon is that landscape with something changed.

**Metaphors with a fixed public meaning are off limits when the meaning is
wrong.** A tilted balance means "unjust", not "inclined toward" (rejected for
`theory`). A checkmark means "accepted". A house can mean "home" in generic UI
but reads as "a building on ground" here, which is why it was accepted.

**A construct with no marker word gets the plainest picture.** `simple` is the
bare statement tile: a plain statement is nothing but a subject and a
predicate.

## 6. The chapter 8 landscape, and how it was arrived at

The chapter 8 badges say what a proof stands on. The base picture went
through four rejected forms before the current one; the sequence matters
because each rejection set a rule.

1. **A statement box on a solid plinth**, glyph cut out of the plinth.
   Rejected: the box on top said nothing ("not the right thing to put on the
   ground"), and the plinth did not read as ground.
2. **The three-dot "therefore" sign on the plinth**, then lifted into the
   sky and enlarged. Rejected: Latin-logic notation means nothing to a layman.
3. **Trapezoids and a pedestal** in place of the plinth, dots resting on the
   edge. Rejected as "even worse": still boxes, no depth. Alexander's
   instruction was explicit: use depth-perspective psychology, a horizon
   line, gradients.
4. **The floor in depth** (accepted): a ground plane whose sides converge
   towards a full-width **horizon line** at y = −0.6 (linear perspective);
   fill fading from solid at the near edge (y = 10.4) to 35 % at the horizon
   (atmospheric perspective); the far edge 12.8 units wide, the near edge
   19.2.
5. **The sky element.** Among eight candidates for "what stands on the
   ground" (house, flag, tower, pillar, tree, signpost, thumb, star), the
   **house** won: a conclusion is *built* on its ground, and בנין is the
   Talmud's word for a constructed proof. It stands on the horizon with its
   base on the line, roof apex at y = −11.6, walls 9.6 wide.
6. **The ground glyph** (which source) is cut out of the floor in white and
   laid *flat on it in perspective*: every point is mapped through a
   homography from the glyph's bounding box to a trapezoid whose top edge is
   60 % of its bottom edge and whose height is 90 %, bottom edge fixed at
   y = 10. This reproduces the Inkscape perspective-envelope effect Alexander
   applied by hand to the senses icon; the parameters (`NARROW`, `SQUASH` in
   `gen_icons_ch8.py`) were tuned to match his edit. Glyphs are widened first
   (a circle on a foreshortened floor is a wide ellipse) and dropped to the
   near edge so they fill the floor.
7. **States of the house** carry the statement's fate: standing =
   established; outlined with an X through the walls = knocked down; leaning
   14° on its base corner = held only by a theory; standing over a gap with
   the ground's full outline dotted beneath = the source is real but does not
   reach the claim. **Roads on the floor** are the argument's course: an arrow
   pointing at the house = "it follows"; a fork whose branches both end in a
   **stop bar** = "whichever way, it fails". The stop bar is the same "cut
   off" mark Alexander drew for `fallacy-not-included`.

Depth cues used, and what each is for: the horizon line (a world that
continues past the plane), converging edges (a plane, not a box), the value
gradient (distance), occlusion where an object's base overlaps the plane's
far edge (it stands *on* the ground), foreshortened inlays (a symbol *in* the
floor, not pasted on a wall). When something must read as "ground", use
these, not a thicker box.

## 7. The tile pass: a decision not to repeat

After the chapter 4 tile was approved, a note proposed propagating it into
every icon that draws a statement (`simple`, `comparative`, `analogism`, the
fallacies). It was done and rejected within the hour, for three reasons that
are now rules:

1. It asserted what the text does not. Ramchal's comparative compares a known
   *matter* to an unknown one (Heb p39) and never says whether they share a
   subject or a predicate; a tile with a shared predicate arrow committed to
   one. Alexander's words: the arrow-as-predicate is his design for chapter 4
   and must not be borrowed where the thing shared could be the subject.
2. It split a family in two. Three chapter 7 icons went tile-level while
   `a-fortiori`, `fallacy-not-greater`, the tree and the dominoes stayed
   case-level.
3. The first-pass pictures already said the construct at the right level:
   ■ = □ ("a known matter, an unknown one equated to it"), ■ → □ ("found in
   this one, so in that similar one").

The rejected SVGs and their primitives are in `notes/rejected/tile-pass/`.
Only `simple` kept the tile. Details in `notes/TILE_PASS.md`.

## 8. Alexander's references and hand edits

- When Alexander attaches a reference image or SVG, **use it as is**:
  miniaturise it into the icon, do not redraw it from primitives. Two hand
  drawings made from scratch were rejected before his hands silhouette was
  embedded; the senses drawing went in on the first try because it was
  embedded directly. Line art needs a stroke of the same colour added to
  thicken it (the senses drawing gets stroke 5 in its own 200-unit space);
  silhouettes need nothing.
- Reference files live in `notes/` (`reference-hands-306885.svg`,
  `reference-senses-grouped.svg`) and are read by the generator at run time,
  so the generator, not a pasted path, is the source of truth.
- He hand-edits in Inkscape. Two export modes exist for that:
  pretty-printed copies of the shipped SVGs (one element per line), and the
  **flat export** (`FLAT = True` in `gen_icons_ch8.py`): the floor glyph
  upright, widened and sitting at the near edge, inside
  `<g id="glyph" transform="matrix(1,0,0,1,0,0)">`, so he can apply a
  perspective envelope or anything else to the group. When he sends an edit
  back, fold it into the generator (match the parameters, or embed the
  geometry) rather than shipping the edited file.
- He sketches on paper; a photo of a sketch is a spec. `fallacy-not-included`
  was drawn to his sketch: the tree, the left rod longer, ending in a stop
  bar, the member dropped off and centred under the rod.

## 9. The review loop

1. Draw a **section** (one sub-family, four to six icons), never the whole
   chapter. The base shape is approved first, then the section that inherits
   it.
2. Render a **section sheet**: icon, English label, Hebrew, at 120 px, in
   colour and in greyscale (`make_sheets.py`, `PART3`). Check every icon at
   48, 32 and 20 px before showing it.
3. When the metaphor is open, render a **candidate sheet**: several options
   over the same base, labelled with what each says, at 200/48/32/20 px, and
   give one recommendation with the reasons for and against each. Alexander
   picks. He has picked against the recommendation (the leaning house over the
   tent), so give real alternatives, not a favourite and two strawmen.
4. For revisions of an approved icon, a **two-column review sheet**: "first
   pass" and "latest", nothing else (no third column, no size strip). The
   superseded SVG is kept in `notes/superseded/`.
5. Update `ICONS_REFERENCE.md` when a section is approved, not per
   iteration. Record rejections and the reason in `notes/`.
6. Reply style he expects: direct, the answer first, strong opinions, no
   em-dashes (use a period or a comma), short. Say when he is right and what
   the mistake was; do not apologise at length. Do not narrate the tools.

## 10. Toolchain

```
generators/
  iconlib.py            shared primitives: st(), tint(), pt(), grids, bars, dominoes, arrowhead, person, write_icons()
  tilelib.py            the statement shape: box(), arrow(), tile(), glyph(), seam_mark(), fill_attrs()
  perspective.py        path parsing (M L H V C S Q T Z, absolute and relative), affine matrices,
                        circle/rect to beziers, homography(), lay_on_floor(), shapes_to_svg()
  gen_icons.py          chapters 1 and 3 (Part 1)
  gen_icons_part2.py    chapter 4 tests, chapter 6, chapter 7 and its fallacies (Part 2)
  gen_icons_ch4_tiles.py the eleven chapter 4 relations on the tile
  gen_icons_ch5.py      the three wide chapter 5 icons (Alexander's box-and-connector sketch)
  gen_icons_ch8.py      chapter 8 (Part 3): the landscape, the grounds, section 2
  make_sheets.py        contact sheets, section sheets, two-column review sheets (cairosvg + Pillow, DejaVu fonts with raqm for Hebrew)
  make_sprite.py        all-icons.svg, every icon as a <symbol>
```

Each `gen_*.py` builds a list of `(key, gloss, svg_body, colour)` and calls
`write_icons(list, out_dir)`, which wraps the body in the standard `<svg>`
with the title and aria-label. Geometry lives in Python, never in the SVGs.
`gen_icons_ch8.py` needs numpy (for the homography) and the two reference
drawings in `notes/`.

To add an icon: define its body in the right generator (a new function if it
introduces a shape, a call to an existing one if it is a variation), `icon()`
it, regenerate, add it to the sheet lists in `make_sheets.py`, render, check
at 20 px and in grey, then add its row to the reference. To change a shared
shape, change the function; the family regenerates together.

`ICONS_REFERENCE.md` section 14 lists the commands. `diff -rq` against the
previous bundle after regenerating: only the icons you meant to change should
differ (this caught nothing wrong so far and is cheap).

## 11. Vocabulary of marks (quick table)

| Mark | Means | First used in |
|---|---|---|
| solid fill | known, established | chapter 7 |
| tinted outline | stated, not yet established / derived | chapters 5, 7 |
| dashed ghost | nobody said it, implied | chapter 5 |
| solid tile with white glyphs | the negative (is not / the opposite term) | chapter 4 |
| X through a thing | knocked down, rejected | chapter 7 (`fallacy-counterexample`), chapter 8 |
| stop bar at the end of a line | cut off, blocked | `fallacy-not-included`, `dilemma` |
| dotted outline | where something should be and is not | `ground-does-not-reach` |
| a fork | two ways | `disjunction`, `disjunctive-syllogism`, `dilemma` |
| an arrow | it follows / carries over | chapter 7, `ground-deduction` |
| the house | what is built on the ground: the conclusion | chapter 8 |
| the leaning house | held by a theory only | `theory` |
| a glyph in the floor | the source the proof stands on | chapter 8 grounds |

## 12. Status

Done and approved: Part 1 (chapters 1 and 3, 24 icons), Part 2 (chapters 4 to
7, 32 icons, including `fallacy-not-included`), Part 3 sections 1 and 2
(chapter 8, 9 icons). The seven chapter 9 moves are shipped assets from the
waterfall, not generated here.

Recorded as no icon by decision: the three verdict states (row status, not
badges; the chapter 8 state machine at Eng p142 is a widget), the chapter 5
limited contrapositive (a text chip on `contrapositive`), the chapter 3 style
types, chapter 2's three processes (tab labels), reductio (`hypothetical-
syllogism-tollens` on a `contradiction` edge with `ground-deduction`).

## 13. What comes next, in order

**Part 3, section 3: the rebuttals** (Eng p136–142). Badges on the
`difficulty` edge that attacks a proof. They need a second actor, the
opponent, in the landscape; the open design question is how to show "your
position" against "mine" (a second house? a figure? a second plot of
ground?). Ramchal's own idiom is that the opponent's proof is turned.

| Key | Ramchal (Heb p) | Reads as |
|---|---|---|
| `rebuttal-your-reasoning` | ולטעמיך / ולדידך (135) | the same difficulty hits your position too, forcing a distinction that saves both |
| `rebuttal-just-the-opposite` | אדרבא (137) | the difficulty is thrown back entirely |
| `rebuttal-proves-my-point` | משם ראיה / היא הנותנת (137) | your disproof text becomes my proof |

**Section 4: objections to form** (Eng p156–158, Heb p157). These are
chapter 9's `objection` leaf. Ramchal splits them into the statement as a
whole and the statement in its parts; the parts can use the `compound`
icon's bars.

| Key | Ramchal | Reads as |
|---|---|---|
| `obvious` | פשיטא | the whole statement adds nothing |
| `might-have-thought` | סלקא דעתין (the Gemara's מהו דתימא) | resolves פשיטא: the statement exists to exclude another view |
| `redundant-part` | הא תו למה לי | a part repeats |
| `self-contradictory` | הא גופא קשיא | the statement's own halves disagree |
| `misordered` | תנא היכא קאי / ליערבינהו וליתנינהו / פתח בכד וסיים בחבית | wrong order, or split what belongs together; one icon, three text chips |

**Section 5: potential and actual** (בכח / בפועל, Eng p154): two icons, a
hollow shape against a filled one. The four aspects of a subject (p148–150)
stay skipped: a learner tags a resolution as "different respect", which
`differs-in-context` already covers.

**Part 4, chapter 9 leaves**: eight leaves with distinct logical force and
no glyph (פירוש דחוק, אוקימתא, הגדה, אבעיא, פשיטות, סייעתא, דחיה, שינויא).
Recommended, not yet decided; it reverses the earlier "leaf = text chip"
ruling, so it needs Alexander's call.

**Chapter 10**: two icons, `ascribed-proof` and `ascribed-difficulty` (one
move carried by reported information, Eng p214–218). The rest of the chapter
is procedure, a checklist widget.

**Chapter 11**: no icons. Its Analysis section (p242–246) is a partition
widget.

Each of these follows the same loop: base first if there is one, then the
section sheet, then the reference.
