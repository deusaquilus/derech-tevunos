# Derech Tevunos icon set: reference

62 SVG icons for building visualizations of the Ramchal's *Derech Tevunos*.
This file is the contract for using them. It tells you what each icon means,
where it attaches in a sugya model, and the visual grammar the icons share, so
that anything you build on top of them stays legible.

Page numbers follow the bilingual edition of *Derech Tevunos*: even pages are
English, odd pages Hebrew. Every meaning below is Ramchal's, cited to the page
where he gives it. Do not reinterpret an icon beyond its cited definition.

## 1. Layout of the bundle

```
icons/ch9-moves/     7   the moves of a debate (chapter 9)          24×24
icons/ch1-3/        24   who speaks, and the anatomy of a statement  24×24
icons/ch4-7/        31   relations, inferences, deductions           24×24, three at 36×24
contact-sheets/          every icon rendered, colour and greyscale
generators/              Python that regenerates every SVG (see section 9)
notes/                   the design notes the icons came out of, plus superseded passes
```

All icons: `viewBox="-12 -12 24 24"` (content stays inside ±9.6), rendered at
128 px, stroke width 1.45, round caps and joins, fills at 15% opacity of the
stroke colour. Three chapter 5 icons are wide: `viewBox="-18 -12 36 24"`,
192×128 px. Each SVG has `role="img"`, an `aria-label` equal to its key, and a
`<title>` giving a one-line gloss. Keys are the filename stems; use them as
identifiers.

## 2. The three families and where they attach

The set is organised around Ramchal's own division of the mind's work
(Eng p18–20): understanding statements (chapters 3–6), deriving new ones
(chapter 7), accepting or rejecting them (chapters 8–9).

| Family | Chapters | Colour | What an icon marks | Attaches to |
|---|---|---|---|---|
| Moves | 9 | one semantic colour each | what a sentence *does* to an earlier sentence | a row of the sugya |
| Anatomy | 1–6 | violet `#7c3aed` (parties in slate `#475569`) | what a sentence *is made of*, or how two relate | a badge on a row, or on the edge between two rows |
| Derivation | 7 | teal `#0d9488` | which kind of deduction produced a sentence | the edge from premises to conclusion |

Green and red are reserved for verdicts (the chapter 9 `answer` and
`contradiction` icons and whatever the model does with accepted/rejected
status). No anatomy or derivation icon uses them: a predicate "said as certain"
must never look "accepted", and "said as impossible" must never look "rejected".

The rule for placement, in one sentence: **the moves are rows; everything
else is a badge that says something about a row or about the connector between
two rows.**

## 3. The visual grammar

Everything past chapter 3 is built from a small vocabulary. Learn it once and
every icon reads itself.

**The statement shape.** A tag-shaped block arrow. The **box is the subject**,
the **arrow is the predicate**, and the direction runs subject → predicate.
Reversing the arrow is therefore the converse. Where the inside of a statement
matters, the shape carries two cells with a seam between them (`statement-tile`);
where the statement is treated as a unit, it carries one glyph.

**Glyphs inside a shape.** Square, triangle, circle. Wherever two things are
being *contrasted*, they are a **square against a triangle** (easier to tell
apart than square against circle at badge size). A circle is used only for a
term that is not being contrasted with anything. The same glyph in two places
means the same term.

**Encodings, one visual variable each:**

| Meaning | Encoded by |
|---|---|
| order (which term is subject) | arrow direction |
| sign (is / is not) | negative rendering: solid fill, white glyph |
| scope (all / some) | size: a smaller arrow is a narrower claim; a half-filled glyph is "some" |
| a shared term | one merged element serving both rows |
| something nobody said (implied) | ghost: dashed outline, same tint |
| some are, some are not | one box split diagonally, one half faded to 22% alpha |
| the same statement twice | one copy ghosted behind the other at 50% |

**Filled vs outlined**, in chapter 7: filled is what you have (known,
established), outlined is what you derive.

## 4. Chapter 9: the moves (icons/ch9-moves/)

The seven principal elements of a sugya (Eng p14). These are rows. The nineteen
leaf types map onto them (Eng p162–186); the icon is the element, the leaf is
text next to it.

| Key | Colour | Picture | Reads as | Leaves it covers |
|---|---|---|---|---|
| `statement` | slate | page of text | someone speaks | שמועה, פרוש מרוח, פרוש דחוק, אוקימתא, דיוק, הגדה |
| `question` | blue | question mark | someone asks | שאלה, אבעיא |
| `answer` | green | checkbox | answers it | תשובה, פשיטות |
| `proof` | green | thumbs up | backs it up | הוכחה, סיעתא |
| `contradiction` | red | crossed-out circle | knocks it down | סתירה, דחיה |
| `difficulty` | amber | warning triangle | raises a problem | פרכא, רמיא, תיובתא |
| `resolution` | yellow | lightbulb | clears the problem | ישוב, שנוי |

`statement` is the row icon for a stated thing. It is distinct from
`statement-tile` below, which shows the *structure* of what was stated.

## 5. Chapter 1: who is speaking (icons/ch1-3/)

Speaker badges for a row. Slate, not violet, because they are not structure.

| Key | Reads as | Source |
|---|---|---|
| `party-group` | several people debating one topic | Eng p10 |
| `party-individual` | one person arguing both sides with himself ("the same one who asks has given the answer") | Eng p10 |
| `party-talmud` | the Talmud itself questioning and answering | Eng p10 |

## 6. Chapter 3: the anatomy of one statement (icons/ch1-3/)

Badges on a statement row. Each says how much of the class the subject covers,
or how the predicate attaches. Nearly every type is defined by a stock word in
the Hebrew (the "marker"); the icon is the everyday picture of that word.

### 6a. By subject: how much of the class (Eng p22–26)

| Key | Ramchal | Hebrew (Heb p) | Picture | Reads as |
|---|---|---|---|---|
| `categorical` | categorical | כולל (21) | 2×2 grid, all filled | about all of them |
| `partial` | partial | קצתי (23) | grid, two filled | about some of them |
| `particular` | particular | פרטי (23) | grid, one filled | about this one |
| `unqualified` | unqualified, with the force of categorical | סתמי (23) | all filled, dashed ring | all, though "all" is not said |

### 6b. By predicate: how it attaches (Eng p26–42)

"Parts" is the number of separable truth conditions chapter 6 assigns to the
type (Eng p78–88). The icon has exactly that many visually separable pieces,
so a later objection can light up the piece it attacks.

| Key | Ramchal | Hebrew (Heb p) | Marker | Picture | Reads as | Parts |
|---|---|---|---|---|---|---|
| `simple` | simple | סתם (25) | none | dot and bar | plainly says one thing | 1 |
| `qualified-certain` | qualified | מיחד ומגבל (25) | ודאי | 3 signal bars, all filled | said as certain | 1 |
| `qualified-possible` | qualified | | אפשר | 2 of 3 filled | said as possible | 1 |
| `qualified-doubtful` | qualified | | ספק | 1 of 3 filled | said as doubtful | 1 |
| `qualified-impossible` | qualified | | לא אפשר | none filled, slashed | said as impossible | 1 |
| `exclusion` | exclusion | ממעט (27) | לבדו | bullseye | this and nothing else | 1 |
| `exception` | exception | מוציא (29) | חוץ מ | pie with a wedge taken out | all of it, except this piece | 2 |
| `conditional` | conditional | מגבל (29) | ובלבד ש | ring broken by an open switch | holds provided the switch closes | 2 |
| `hypothetical` | hypothetical | תלוי (31) | אם | two standing dominoes, arrow over them | if this, then that; only the link is claimed | 1 |
| `compound` | compound | מרבה הענינים (37) | ו… ו | bracket over three bars | several things said together | 1 |
| `compound-not-only` | unequal compound, obvious first | (35) | לא זו אף זו | staircase up | not only this, but even that | 1 |
| `compound-needless` | unequal compound, novel first | (35) | זו ואין צריך לומר זו | staircase down | this, and needless to say that | 1 |
| `disjunction` | disjunction (a sub-type of compound) | (37) | או… או | fork with two open ends | one or the other | 1 |
| `preclusive` | preclusive | no Hebrew name (37) | לא… אלא | list: first item crossed, second pointed at | not this, but rather that | 1 |
| `discrepancy` | discrepancy | מכחיש (37) | אף על פי ש | umbrella in rain | holds, even though it looks like it should not | 1 |
| `comparative` | comparative | מדמה (39) | כשם ש… כך | filled square = outlined square | just as this (known), so too that (unknown) | 1 |
| `consequent` | consequent | נמשך (39) | לפיכך | two fallen dominoes | this happened, so that happened | 3 |

Notes for use:

- The four `qualified-*` icons are one glyph with four states. In a control,
  render them as a slider with four detents, not four separate choices.
- `hypothetical` vs `consequent` is Ramchal's distinction at Eng p88: standing
  dominoes claim only the dependence; fallen dominoes claim both events and the
  link. Use the right one.
- `comparative` follows the rule at Eng p40: the known side is filled, the
  unknown side is an outline.
- `compound-not-only` and `compound-needless` are leaf-level. Prefer the single
  `compound` badge with a text chip unless the ordering matters to the case.
- `notes/rejected/conditional-alt-power.svg` is a rejected alternative (a
  power-button shape) kept for reference only.
- Style (extensive, concise, rhetorical, figurative; Eng p42) deliberately has
  no chapter 3 icons: Ramchal says to ignore style and abstract the statement.
  See `figurative` in chapter 6 for the one exception that matters.

## 7. Chapter 4: how two statements relate (icons/ch4-7/)

Edge badges. They belong on the connector between two rows, typically a `רמיא`
(apparent contradiction) edge, and say how the two statements actually relate.
All eleven are built from the statement shape; a shared term is one merged
element.

| Key | Ramchal | Hebrew (Heb p) | Picture | Reads as |
|---|---|---|---|---|
| `statement-tile` | (the shape itself) | נושא, נשוא (21) | one box fused to one point, two cells | a subject, "is", a predicate |
| `equivalent` | equivalent | דומים (47) | two identical arrows, one ghosted behind | the same statement, said twice |
| `variant` | variant, predicates change | מתחלפים (51) | one tall box, two arrows out | same subject, different predicates |
| `variant-subjects` | variant, subjects change | מתחלפים (51) | two boxes, one tall arrow out | same predicate, different subjects |
| `diametrically-opposed` | diametrically opposed | הפכיים ממש (55) | two equal arrows tip to tip, square vs triangle | two claims meeting head-on |
| `contradictory` | contradictory | מתנגדים (55) | a big arrow against a small one, tip to tip | a general claim against a particular one |
| `converse` | complete converse | חלוף כולל (61, 71) | two thick folded arrows chasing each other | subject and predicate trade places |
| `converse-limited` | limited converse | חלוף קצתי (61, 71) | the return arrow thinner and short | trade places, all becomes some |
| `contrapositive` | contrapositive converse | חלוף הפכי כולל (61, 71) | the return arrow in negative | trade places, is becomes is not |
| `obverse` | obverse | מתהפכים (63) | the same arrow again underneath, in negative | both terms replaced by their opposites, content unchanged |
| `incongruent` | incongruent | נבדלים (63) | two arrows, square and triangle | nothing in common |

The four tests at Eng p54–56 that show two statements only *look* opposed.
These belong on the `ישוב` that dissolves a `רמיא`, and say which test did it.
The Hebrew at Heb p53 names them: same time, same place, same respect
(בחינה), and the plain sense without homonymy or metaphor.

| Key | Test | Picture |
|---|---|---|
| `differs-in-time` | they speak of different times | clock |
| `differs-in-place` | they speak of different places (public domain vs courtyard, Shabbos 57a) | map pin |
| `differs-in-context` | they speak of the same thing in different respects (sewn in vs not, Shabbos 57a) | dashed frame around a dot |
| `homonym` | one word used in two senses ("blow", Eruvin 102b vs Rosh Hashanah 29b) | one square, two faces |

Contradictory terms with or without a middle (Eng p60). A precondition for the
disjunctive syllogism (Eng p108): only when there is no middle term does
eliminating one branch prove the other.

| Key | Reads as | Picture |
|---|---|---|
| `no-middle` | clean or unclean: nothing in between | two cells |
| `has-middle` | optional, praiseworthy, obligatory: a middle exists | three cells |

## 8. Chapter 5: what a statement implies (icons/ch4-7/, wide)

Badges on a `דיוק` (inference) row. Wide canvas, 36×24. The stated statement is
the solid box on the left, the implied one is the ghost box on the right
(dashed, same tint: nobody said it), and the connector carries the distinction.

| Key | Ramchal | Hebrew (Heb p) | Connector | Reads as |
|---|---|---|---|---|
| `inference-necessary` | logically necessary inference | מוכרח (71) | straight arrow | wired through: accept the one and you have accepted the other |
| `inference-loose` | inference not logically necessary | בלתי מוכרח (69) | a tilde wave | suggested by the wording, not firm, can be waived (Berachos 53a, Eng p70) |
| `absolute-opposite` | absolute opposite, from a partial statement | הפך (73) | double-shaft arrow into a half-faded box | some do, so some do not |

The table of necessary inferences at Eng p72–74 needs no further icons: each
entry is one of the converse icons above, selected by the quantity and sign of
the source statement. Compute it; do not ask the reader to memorise it.

## 9. Chapter 6: not meant literally (icons/ch4-7/)

| Key | Reads as | Source |
|---|---|---|
| `figurative` | not literal; judge the allusion, not the words ("a lion has come from Babylon") | Eng p76 |

Literal is the default and gets no badge. The rest of chapter 6, the ultimate
intention of each statement type, is already encoded as the part count in
section 6b.

## 10. Chapter 7: deriving a conclusion (icons/ch4-7/, teal)

Badges on a `proof` edge, saying which kind of deduction it is. Filled is what
you have, outlined is what you derive.

| Key | Ramchal | Hebrew (Heb p) | Marker | Picture | Reads as |
|---|---|---|---|---|---|
| `syllogism` | syllogism (premise → conclusion) | הקש, הקדמה, תולדה (93) | | an arithmetic sum | premises added up give a result |
| `classical-syllogism` | classical syllogism | הקש מופתי (93) | | tree, top node filled, one leaf filled | true of the whole kind, so true of this member |
| `analogism` | analogism | בנין אב (95) | מה מצינו | filled square → outlined square | found in this one, so also in that similar one |
| `a-fortiori` | a fortiori | קל וחומר (97) | כל שכן | small dot → big circle | if the light case, then surely the heavy one |
| `hypothetical-syllogism` | hypothetical syllogism | הקש תלוי (105) | | filled domino → outlined domino | this is now established, so that follows |
| `hypothetical-syllogism-tollens` | the same, on the denial | הקש תלוי (105) | | both dominoes crossed, arrow back | that did not follow, so this was never so (Pesachim 19a) |
| `disjunctive-syllogism` | disjunctive syllogism | הקש מחלק (109) | | fork, one branch struck, other filled | not that one, so it must be this one |

Why an analogism or a fortiori fails (Eng p100–104, Heb p99). Badges on the
`difficulty` edge that attacks such a proof; they say which way it broke.

| Key | Ramchal's condition | Picture |
|---|---|---|
| `fallacy-not-similar` | the two cases are not alike after all (Kerisos 26a, "מה ל… שכן") | filled square, broken arrow, outlined circle |
| `fallacy-not-greater` | which case is the heavier one is not settled (Horayos 10a) | two equal circles, arrows both ways |
| `fallacy-counterexample` | another case just as similar lacks the predicate (Toras Cohanim, the Cohen Gadol) | filled → outlined, and a third case crossed |

Ramchal's "classical syllogism" is not the Aristotelian three-term figure. It is
inheritance down the subject or the predicate (Eng p92–94). The tree icon
follows Ramchal. Do not "correct" it.

## 11. Attested fixtures

Passages Ramchal labels himself. Each can double as a test case for the icon
named beside it.

| Passage | Icons | Where |
|---|---|---|
| Pesachim 7b, the blessing over circumcision | `exclusion`, `consequent`, `preclusive`, `simple` | Eng p44–46 |
| Shabbos 57a, frontlets and hair net | `differs-in-context`, `differs-in-place` | Eng p54 |
| Eruvin 102b vs Rosh Hashanah 29b, "blow" | `homonym` | Eng p56 |
| Shabbos 124a; Shabbos 28b | `diametrically-opposed` (general; particular) | Eng p56–58 |
| Shabbos 76b, husks of lentils | `contradictory` | Eng p58 |
| Yebamos 66a, eating and conferring terumah | `converse-limited`, `contrapositive`, `obverse` | Eng p62–64 |
| Berachos 53a, half Jewish and half not | `inference-loose` (rejected) | Eng p70–72 |
| Chagigah 15b, clean wool dyes completely | `inference-necessary` (a contrapositive) | Eng p72 |
| Toras Cohanim, doubtful guilt offering | `analogism`, then `a-fortiori` | Eng p98 |
| Kerisos 26a; Horayos 10a; Toras Cohanim | `fallacy-not-similar`; `fallacy-not-greater`; `fallacy-counterexample` | Eng p100–104 |
| Pesachim 19a, Rabbi Yosi and Rabbi Akiva | `hypothetical-syllogism-tollens` | Eng p106 |
| Pesachim 5b; Bava Kamma 104a | `disjunctive-syllogism` | Eng p108–110 |

## 12. Rules for using the set

1. **One move per row, badges alongside.** A row gets exactly one chapter 9
   icon. Chapter 3 badges sit on the row; chapter 4, 5 and 7 badges sit on the
   edge that connects it to the row it acts on.
2. **Never colour a badge by verdict.** Anatomy stays violet, derivation stays
   teal, whatever the row's status. Status belongs to the row, not the badge.
3. **The type of a statement decides its attack surface.** A `conditional` has
   two parts, so an objection can hit the condition and leave the predication
   standing (Eng p82); a `hypothetical` has one part, the link. When you show
   an objection landing, light the part it lands on.
4. **Key on the English names.** The Hebrew word מגבל names both the qualified
   statement (Heb p25) and the conditional one (Heb p29); the preclusive
   statement has no Hebrew name at all. Chapter 4 is the exception: its family
   name "contradictory" is used inconsistently in the English, so there the
   Hebrew (הפכיים ממש, מתנגדים) is the safer key.
5. **Do not shrink below 20 px.** Every icon was checked at 20 px (30 px for
   the wide three). Below that, the chapter 4 tiles collapse into "two tags".
6. **Do not recolour, restroke, or restyle.** If an icon needs to change, change
   it in the generator (section 13) so the whole family moves together.
7. **Missing icons are recorded, not improvised.** The chapter 8 verdicts,
   the chapter 5 limited contrapositive, and the chapter 3 style types have no
   icons by decision. If a case needs one, say so rather than reusing a
   neighbour.

## 13. Regenerating

Run from `generators/`; each writes into `../icons/`.

```
python3 gen_icons.py            # icons/ch1-3, 25 files (one of them, conditional-alt-power, is the rejected fallback)
python3 gen_icons_part2.py      # icons/ch4-7, the 17 not built from the statement shape
python3 gen_icons_ch4_tiles.py  # icons/ch4-7, the 11 chapter 4 relations
python3 gen_icons_ch5.py        # icons/ch4-7, the 3 wide chapter 5 icons
```

The chapter 9 icons are not generated here; they come from the sugya
waterfall's `viz/src/icons.ts` and are copied in as shipped assets.

`iconlib.py` holds the shared primitives (strokes, glyph grids, dominoes,
switch). `tilelib.py` holds the statement shape (box, arrow, tile, glyphs).
Geometry lives in these files, never in the SVGs. Requires Python 3 only;
`cairosvg` and `Pillow` are needed only for the contact sheets.
