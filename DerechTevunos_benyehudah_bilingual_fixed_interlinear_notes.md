# Interlinear notes: where chapters 1–3 most benefit from guides, sources, visuals and widgets

Companion to `DerechTevunos_benyehudah_bilingual_fixed_interlinear.md`. Every entry is keyed to a verse
ID there (`chapter.paragraph.verse`), so each proposal names the exact span it would attach to. Written
while cutting the verses, chapter by chapter; chapters 10–11 will be appended as they are cut.

The notes point at what the repository already has, so that the interactive layer is assembled rather
than invented:

| Asset | Where | What it gives chapters 1–3 |
|---|---|---|
| The glyph set | `icons_v3/icons/ch1-3/` (24), `icons_v3/icons/ch9-moves/` (7); contract in `icons_v3/ICONS_REFERENCE.md` §4–6 | One icon per speaker setting (ch. 1), per move (ch. 2), per quantity and per kind of statement (ch. 3) |
| Sugya Context Index | Appendix of the parent file, `## Sugya Context Index` | A written entry, from the Sefaria text, for **every** passage chapters 1–9 cite. Nothing needs to be researched; it needs to be surfaced |
| The rail taxonomy | `site/src/rail/taxonomy.ts` (`ELEMENTS`, `ELEMENT_GLOSS`, `LEAVES`) | The seven parts and their nineteen leaves as data, with a plain-English gloss each |
| The agent card | `DERECH_TEVUNOS_FOR_AGENTS.md` §0 B (form table with intention counts), §4 (normalization example) | The eleven kinds as a table, with chapter 6's truth conditions already joined on |
| The waterfall | `site/src/rail/`, mounted at `/sugya/<id>` and `/byo` | A renderer for any short sequence of moves, so a passage quoted in the text can be *drawn*, not described |

**Type codes** used below: **GUIDE** (prose a lay reader needs), **SOURCE** (the cited passage, its
context, its corrected locus), **TERM** (a glossary hook on a technical word), **VISUAL** (a static
figure), **CHART** (a table or diagram derived from data), **WIDGET** (something the reader operates),
**FIX** (a text artefact to surface in the UI, never to emend), **UX** (a behaviour of the interlinear
page itself).

## Priority: the places with the most leverage

Ranked by how much a reader's understanding changes per unit of work, given what already exists.

1. **3.7–3.18 · The eleven kinds as one explorer.** Every kind has an icon, a marker word, a definition
   verse, an example verse with a written source entry, and a truth-condition part count from chapter 6.
   One WIDGET that shows all of that for whichever kind the reader is on turns the longest stretch of the
   chapter from a list into a reference. See the chapter 3 section.
2. **3.19.9–3.19.14 · The Pesachim 7b walkthrough.** This is the book's first worked normalization, and
   the site already labels it (ICONS_REFERENCE §12 "attested fixtures"; FOR_AGENTS §4). A step-through
   from the terse Aramaic to the three statements it intends, each with its kind badge, is the single
   most instructive interactive on these three chapters.
3. **2.4–2.10 · The seven parts as the rail's own legend.** The reader meets here, in prose, the seven
   row icons the Sugyascade draws. The legend component and `ELEMENT_GLOSS` exist; embed them, and make
   the pairing structure of the list visible (statement alone; question↔answer; contradiction↔proof;
   difficulty↔resolution).
4. **2.12.4–2.12.10 · Three arguments from wording.** Berachot 15a, Chullin 2a and Pesachim 4b are all
   "it says X; had it meant Y it would have said Z". A two-column "said / would have said" WIDGET is the
   right shape for all three, and this is the reasoning pattern the rest of the book keeps using.
5. **3.1.1–3.1.5 · Subject and predicate, on the reader's own click.** Highlight נושא and נשוא in the
   Rav Adda example, then let the reader do it to every quoted example in the chapter. The
   `statement-tile` glyph (box = subject, arrow = predicate) is the visual vocabulary for the whole site
   and this is where it must be taught.
6. **2.13–2.17 · A map of the book.** Three operations of the intellect → three chapter ranges → the
   three glyph families. Draw it once here and it becomes the site's navigation model.
7. **Citations everywhere · a hover card.** Fourteen of the twenty-eight citations in chapters 1–3
   (counting repeats) carry an `[ed.]` correction. A card that shows the 1742 citation, the resolved locus, and the Sugya Context
   Index entry, with a Sefaria link, is one component that pays off on every verse that cites.
8. **3.13 vs 3.18 · Standing dominoes against fallen dominoes.** Hypothetical (only the dependence is
   claimed) against consequent (both events and the link are claimed). Ramchal makes the distinction in
   chapter 6; the icons already encode it; showing both side by side here pre-empts the confusion.
9. **3.14 · The compound tree.** The paragraph is a tree three levels deep told in prose. Draw the tree.
10. **1.2.1–1.2.5 · The first miniature Sugyascade.** The one-person dialectic is a four-move cycle (lay
    down, attack, rebut, uphold). Render it as a four-row waterfall beside the verses that describe it,
    with the three speaker badges of ICONS_REFERENCE §5 as the toggle.

Added with chapters 4–6, ranked among themselves:

11. **5.4 · The inference generator.** The chapter ends in a table (categorical or partial, affirmative
    or negative → which inferences follow), and ICONS_REFERENCE §8 already says of it "compute it; do
    not ask the reader to memorise it". One control that takes a statement's quantity and quality and
    emits its necessary inferences, each with its chapter 4 glyph, is the whole of 5.4 made usable, and
    4.7's converse "three ways" is the same control seen from the other side.
12. **6.3 · "Which part fails?"** Every kind of statement gets its truth condition here, as a count of
    intentions. A widget with one toggle per intention, showing whether the whole statement survives,
    teaches the chapter in a minute, and the hypothetical's four cases (6.3.15–6.3.20) are the one place
    a Western-trained reader will be wrong by default: both parts true does not make it true.
13. **4.4 · The four-conditions checklist.** Same subject, same predicate, one time, one place, one
    respect, plain sense: the tool that dissolves an apparent contradiction (a `רמיא`) in chapter 9.
    The four test glyphs exist; the checklist is their natural control, and building it will force the
    time/respect discrepancy recorded at 4.4 to be settled.
14. **4.5 · Quantity × quality grid.** Diametrically opposed against contradictory is a two-by-two,
    and the text gives one example per cell that matters. Draw the grid; the reader stops confusing
    the two words.
15. **Chapter 3 ↔ chapter 6 concordance.** Seven of chapter 3's examples return in 6.3 to have their
    truth conditions stated. The verse pairs are listed under 6.3; a ribbon on each end is cheap and
    makes the book's own structure visible.

Added with chapters 7–9, ranked among themselves:

16. **9.3–9.20 · The Sugyascade's legend, made from the text.** Chapter 9 defines the nineteen leaves
    that `taxonomy.ts` already holds as data (Hebrew name, plain gloss, chip, effect, Feldheim page).
    Show that data beside each definition verse, and draw each leaf's example as one or two rows of the
    waterfall. This is the one chapter where the site's own vocabulary and the book's text coincide
    word for word, and the reader should see them coincide.
17. **8.2 and 8.19 · The status reducer's textual root.** "Accept, deny, or remain in doubt", and "a
    rebutted proof returns the statement to doubt", are the book's own statement of the site's
    `accepted` / `rejected` / `doubt` and of `discharge`. `METHODOLOGY.md` §12 already says the verdict
    state machine "is a widget"; these two verses are where it belongs.
18. **8.3–8.10 and 8.12–8.16 · The grounds tree, twice.** Proof → nature (intelligibles, sensibles),
    convention (commonly accepted, received), syllogism (the five of chapter 7); then the same tree for
    disproof, then for rebuttal. Five landscape glyphs exist for the grounds, `via-opposite` and
    `ground-does-not-reach` for the turns. One tree, with the glyphs on its leaves, is the chapter.
19. **7.3 · The a fortiori and analogism builder with its three defeats.** 7.3.7 lists exactly three
    ways the conclusion is annulled, and the three glyphs `fallacy-not-similar`, `fallacy-not-greater`,
    `fallacy-counterexample` exist for exactly those. A builder that lets the reader assemble the
    Sifra's argument and then try each defeat teaches chapter 7 and half of chapter 8 at once.
20. **8.21 · The aspect selector.** "The Temple courtyard is a public domain": true for impurity, false
    for Shabbat. A two-column with an aspect switch, plus the four-aspects chart (essence, proprium,
    accident, relation). The paragraph is 26 verses and needs a mini-table-of-contents regardless.
21. **9.6 and 9.16 / 9.20 · "How forced?"** Full explanation → forced explanation → rejected (9.6.4–9.6.6),
    and the alternative that grows "more forced" with every deficiency posited (9.20.5): a graded slider,
    not a category, and the text says so. The `unsettle` effect on these leaves comes from these verses.

## Chapter 1

### 1.1.1–1.1.3 · Definition, method, criterion

- **VISUAL.** Three verses, three stages: what is investigated (1.1.1), how (1.1.2: arguments for and
  against), by what criterion (1.1.3: their *force*, decided "in accordance with those more fitting to
  the intellect"). A three-step figure, or a scale with arguments as weights, states the whole book's
  procedure in one glance.
- **TERM.** `משא ומתן העיוני` / "dialectic investigation": the translator's rendering deserves a hover
  note, since "dialectic" carries Western baggage the Hebrew does not (it means, plainly, the give and
  take of study). Same for `מאמר` / "statement", `דעה` / "opinion", `טענה` / "argument". These four
  recur in every chapter; they are the first glossary entries.
- **UX.** 1.1.3 is the textual root of the site's status vocabulary (`accepted` / `doubt` / `rejected`,
  the state-of-play bar). A quiet link from this verse to the Sugyascade's bar, "this is what the
  book means by *decided*", ties text to drawing.

### 1.2.1–1.2.5 · Several parties, or one person supplying every side

- **WIDGET.** A four-row waterfall: statement (1.2.4 "lays down the statement"), difficulty ("sets
  arguments against"), resolution ("rebuts the arguments he brought"), and the statement upheld. Toggle
  the speaker between "two parties" and "one person" and nothing in the drawing changes, which is
  exactly the point 1.3.5–1.3.8 goes on to make.
- **VISUAL.** The three speaker badges, `party-group`, `party-individual`, `party-talmud`
  (`icons/ch1-3/`, ICONS_REFERENCE §5), shown against 1.2.1, 1.2.3 and 1.3.3 respectively.
- **GUIDE.** 1.2.4: "such as might be set against it by one who holds an opinion opposite" is the
  steel-manning instruction. A one-line gloss for the general reader: the author is not describing a
  debate, he is describing how to study alone.

### 1.3.1–1.3.4 · The three forms found in the Talmud

- **GUIDE.** 1.3.3 `מסדר הש"ס` / "the redactor of the Talmud": the anonymous voice (the *stam*) that
  asks and answers in its own person. A lay reader needs one sentence on this before chapter 9 calls it
  `party-talmud`.
- **SOURCE.** 1.3.4 `הוא מותיב לה והוא מפרק לה` is a recurring Talmudic formula, not a citation of one
  place. A formula card (what it announces, where it typically appears, a Sefaria search link) rather
  than a single-locus card. This is the first of the *formulae* the English keeps in parentheses; see
  the cross-cutting section.
- **CHART.** 1.3.2 / 1.3.3 / 1.3.4 are three rows of one table: who raises, who answers, how the text
  signals it. Small, but it is the reader's first taxonomy in the book and worth showing as one.

### 1.3.5–1.3.8 · All the ways come to one place; arguments, not arguers

- **VISUAL.** 1.3.8 "we look not to those who argue but to the arguments" is the design principle
  of the whole visualization (moves are rows, speakers are badges). A pull-quote here, and a link from
  the Sugyascade's legend back to this verse, closes the loop.
- **GUIDE.** 1.3.6–1.3.7: the "rule governing a difficulty … is one and the same" is the licence for
  labelling a self-raised objection with the same glyph as an opponent's. Worth saying so explicitly,
  since it is why the chapter 9 icon set has no "self-objection" variant.

## Chapter 2

### 2.1.1–2.3.1 · The seven parts, named

- **VISUAL / WIDGET.** Embed the rail's legend here: seven icons (`icons/ch9-moves/`), Hebrew term,
  English term, `ELEMENT_GLOSS` one-liner, and on hover the definition verse (2.4.1–2.10.1). Clicking
  an element should later jump to chapter 9's leaf definitions once those chapters are cut.
- **CHART.** The order of the list in 2.2.1 is not arbitrary: *statement* stands alone, then three
  pairs, each an act and its reply (question→answer, contradiction↔proof as the two verdicts on a
  statement,   difficulty→resolution). Lay the seven out as 1 + 2 + 2 + 2 and the reader sees the grammar
  before reading the definitions. `taxonomy.ts` already records what each part does to the thing it
  lands on (`Effect`: `raise` / `reject` / `discharge` / `unsettle` / `open`), which is the data the
  pairing is drawn from.
- **CHART.** The 7 → 19 tree (`LEAVES` in `taxonomy.ts`): each part "divides further into other parts"
  (2.11.1). A collapsed tree here, expanded in chapter 9, shows the reader that 2.11.1 is a promise the
  book keeps.

### 2.4.1–2.10.1 · The definitions

- **GUIDE.** The two pairs a newcomer conflates. *Contradiction* (2.7.1) annuls a statement outright;
  *difficulty* (2.9.1) shows "something not true or not fitting" and waits for a *resolution* (2.10.1).
  *Answer* (2.6.1) replies to a *question*; *resolution* removes a *difficulty*. A two-by-two callout
  (what it lands on / what it does) on these verses saves the reader the confusion the rail's
  `Effect` type was written to prevent.
- **TERM.** Each of the seven Hebrew terms is a glossary root: `מימרא`, `שאלה`, `תשובה`, `סתירה`,
  `ראיה`, `קשיא`, `תרוץ`. The English gives a transliteration only for *meimra*; the tooltip should
  supply the rest.
- **FIX.** 2.9.1 Hebrew `שיראה היום במאמר` : `היום` ("today") is almost certainly a keying error for
  `היות` ("there to be"), which is what the English translates. Surface as a footnote on the verse; do
  not emend the text.

### 2.12.1–2.12.3 · Foundations in the nature of the intellect

- **GUIDE.** The claim that the rules of the dialectic are "engraved in the nature of intellectual
  understanding" and need no study (2.12.12) is the book's epistemology in one sentence. A short guide
  note here, linked forward to chapter 8's `המושכלות הראשונים` (`ground-axiom`), gives the reader the
  thread.
- **TERM.** 2.12.3 lists `הקשיות והתרוצים, הראיות והדחיות`: the fourth, `דחיה` / "opposition", is a
  chapter 9 leaf (`contradiction/opposition`) that has not been defined yet. A forward-reference hook.

### 2.12.4–2.12.6 · Berachot 15a and Chullin 2a: the participle argument

- **WIDGET.** The "said / would have said" two-column: left, the actual wording `הקורא`; right, the
  inference `דיעבד אין, לכתחלה לא`; then the mirror case `הכל שוחטין` → `לכתחלה`. The reader sees that
  one grammatical feature (a participle that reads as "one who has recited") carries a legal
  conclusion, and that the *opposite* wording carries the opposite one.
- **SOURCE.** Both have Sugya Context Index entries (**Berachot 15a**; **Chullin 2a**). The Berachot
  entry explains the *Gemara's own rejection* of the inference, which the author does not mention; the
  card should show it, since it teaches that a "foundation in the nature of language" can be
  overridden by context.
- **GUIDE.** `דיעבד` / `לכתחלה` ("after the fact" / "from the outset") is the first halachic
  technical pair in the book. One sentence, with the standard transliteration, on first occurrence.
- **UX.** 2.12.4's English carries **two kinds of square bracket**: `[ed. Berachot 15a]` (editorial
  source-reading) and `[the Shema without making it audible to his ear, has fulfilled his obligation]`
  (the translator's clarifying insertion). Render them differently: the `[ed.]` as a footnote mark
  that opens the citation card; the translator's as lighter inline text, so the reader can tell the
  Talmud's words from the gloss. This applies to every chapter; see cross-cutting.
- **SOURCE.** 2.12.6 Chullin 2a recurs at 3.11.2 (as the exceptive statement) and in chapter 6. A
  "this passage returns" ribbon; see cross-cutting.

### 2.12.7–2.12.10 · Pesachim 4b: "it should have said"

- **WIDGET.** The same two-column as above, with the second column now the *counterfactual wording*
  the Gemara demands: `הכל נאמנים` versus `כל הבתים בחזקת בדוקים`. FOR_AGENTS §6 calls this "the
  phrasing argument" (`לימא קרא / ליתני / מיבעי ליה`); this verse is the book's first instance.
- **GUIDE.** Two realia: the search for leaven (`בדיקת חמץ`) and the legal *presumption* (`חזקה`) that
  a house has been searched. Without them 2.12.8–2.12.9 is opaque to a general reader.
- **TERM.** `מבעי לה` / "it should have said" is a Talmudic formula kept in Hebrew in the English;
  formula card.
- **SOURCE.** Index entry **Pesachim 4b** exists and already states what the author uses it for.

### 2.13.1–2.17.2 · The three operations of the intellect

- **CHART.** The book's map. Operation 1 (2.14.1, conception and understanding) → chapters 3–6;
  operation 2 (2.15.1, derivation) → chapter 7; operation 3 (2.16.1, acceptance or denial) → chapters
  8–9, with 10–11 as method and axes. ICONS_REFERENCE §2 already organises the glyph families along
  exactly this split (anatomy violet, derivation teal, grounds magenta), so the chart can carry the
  family colours and double as the key to every badge on the site.
- **UX.** Use the same chart as the docs section's table of contents, with the reader's current
  chapter lit.
- **TERM.** 2.14.1 `סברות` / "lines of reasoning (*sevarot*)": the word is used loosely here and
  technically in chapter 8 (`סברא`, the `theory` glyph). A tooltip that notes the two senses.

## Chapter 3

### 3.1.1–3.1.6 · Subject and predicate

- **WIDGET.** The parser. Show `נשים חיבות בקדוש היום` with `נשים` boxed and `חיבות בקדוש היום` arrowed,
  in the `statement-tile` grammar (ICONS_REFERENCE §3: "the box is the subject, the arrow is the
  predicate"). Then offer every quoted example in the chapter and let the reader mark subject and
  predicate; check against the answer. This is the skill the whole book presupposes.
- **VISUAL.** The `statement-tile` and `simple` glyphs beside 3.1.4, the verse that names the two
  parts.
- **SOURCE.** **Berachot 20b** (index entry) is the model statement of the whole book: it returns in
  chapter 6 and twice in chapter 9. The card should say so.
- **GUIDE.** 3.1.3: why "women are obligated in Kiddush" is a *statement worth making* (women are
  ordinarily exempt from time-bound positive commandments; the Gemara's discussion is in the index
  entry). Readers who do not know this will not see why the example has content.
- **FIX.** 3.1.2 Hebrew `שיקים או ישלם`: `ישלם` is a keying error for `ישלל` ("negated"), as the
  parallel `או ישלל ממנו` in the same verse and the English confirm. Footnote; do not emend.
- **TERM.** `נושא` / `נשוא` ("subject" / "predicate"): glossary roots for the entire site.

### 3.2.1–3.6.4 · Quantity of the subject

- **VISUAL.** The four grid glyphs `categorical`, `partial`, `particular`, `unqualified`
  (`icons/ch1-3/`, ICONS_REFERENCE §6a), one beside each defining verse (3.4.1, 3.6.1, 3.5.1, 3.6.3).
- **WIDGET.** A three-position control (all / some / this one) with a fourth, dashed "all, though
  *all* is not said" state; moving it re-quantifies a displayed statement. Pairs with the parser above.
- **GUIDE.** 3.6.3–3.6.4 is a rule with teeth: an unqualified statement **reads as categorical**.
  FOR_AGENTS §0 B makes it a labelling rule. A callout here, since a reader trained on formal logic
  expects the opposite default.
- **SOURCE.** **Sanhedrin 90a** (3.4.2; the `[ed.]` corrects the 1742's `ל'`), **Mishnah Nega'im 12:4**
  (3.5.2), **Yevamot 84a** (3.6.2), **Berachot 20b** (3.6.4). All four have index entries.
- **GUIDE.** Realia: 3.4.2 "share in the world to come" is the opening of *Chelek*; 3.5.2 "leprous
  marks on houses" and why Jerusalem is exempt (the index entry gives Bartenura's reason); 3.6.2 the
  widow permitted to her husband but forbidden to the brother-in-law (levirate law is needed again at
  3.12.2 and 3.14.17, so introduce it once here).
- **TERM.** `כולל` / "categorical", `פרטי` / "particular", `קצתי` / "partial", `סתמי` /
  "unqualified": the English is the Diaspora Yeshiva vocabulary the site standardises on; the tooltip
  should show the Hebrew and note that "particular" here means *one individual*, not the logician's
  "some".

### 3.7.1–3.7.2 · By predicate: eleven kinds

- **CHART.** The master table for the chapter, one row per kind: number · name · where the name comes
  from · Hebrew (the text's name, or its describing word) · marker word · glyph key · intention count
  from chapter 6 · example verse · source. FOR_AGENTS §0 B is this table already; join on the verse IDs
  and render it. Sticky while the reader scrolls 3.8–3.18, with the current kind lit.
- **Two sources of names, and the chart shows which.** Seven kinds are named by the text itself, in a
  `ונקרא` clause (simple, exclusive, exceptive, conditional, hypothetical, compound, comparative). Four
  are not, and for those the name is the **Diaspora Yeshiva translation's**, given at the place the
  text defines the kind: *qualified* (kind 2, מיחד ומגבל), *preclusive* (kind 8, no Hebrew name),
  *discrepancy* (kind 9, מכחיש), *consequent* (kind 11, נמשך); likewise *disjunction* for the second
  part of kind 7. These are the names the glyphs, `anatomy.ts`, the passage schema, FOR_AGENTS and the
  parent's own Sugya Context Index all key on, so they must be displayed: they are how a reader
  connects this chapter to every badge on the site. The "where from" column (text / translation) is
  what keeps the display honest. Provenance: `icons_v3/notes/CH1-3_ICONS_EXPLORATION.md` §2, §4.
- **UX.** Each kind's paragraph has the same shape (definition → example → gloss → name), and the
  verses are cut on exactly those seams. Style the four roles consistently (a label in the margin:
  *defines*, *example*, *explains*, *names*) so the reader learns the rhythm once.

### 3.8.1–3.8.2 · Kind 1, simple (סתם)

- **VISUAL.** `simple` glyph on 3.8.2.
- **GUIDE.** The Hebrew word `סתם` names both the *unqualified* subject (3.6.3, סתמי) and the *simple*
  predication (3.8.2). They are different axes (quantity of subject; manner of predicate). A note
  prevents the natural conflation.

### 3.9.1–3.9.6 · Kind 2, qualified: certain, possible, doubtful, impossible

- **WIDGET.** The four-detent slider. ICONS_REFERENCE §6b: "the four `qualified-*` icons are one
  glyph with four states; in a control, render them as a slider, not four choices". Snap to 3.9.2
  (ודאי), 3.9.3 (אפשר), 3.9.4 (ספק), 3.9.5 (לא אפשר), lighting the example verse for each detent.
- **SOURCE.** **Pesachim 9b** (3.9.2; `[ed.]` corrects `ד'`), **Ketubot 75a** (3.9.3 and 3.9.5; one
  sugya supplies both the *possible* and the *impossible*), **Pesachim 113a** (3.9.4; the Hebrew gives
  no citation at all, the index supplies it). All in the index.
- **GUIDE.** Realia: 3.9.2 martens and polecats dragging a stillborn from a pit (why this decides a
  priest's purity); 3.9.3 and 3.9.5 the blemishes that disqualify a priest versus a wife (vinegar
  removes a man's sweat; a woman "cannot live that way"); 3.9.4 sale on credit. Each is one sentence in
  the index entry.
- **GUIDE.** The kind is never *named* in the text (see the naming bullet at 3.7). Note that `מגבל` in
  3.9.1 collides with kind 5's name (3.12.4), which is why ICONS_REFERENCE rule 4 keys on English.

### 3.10.1–3.10.3 · Kind 3, exclusive (ממעט)

- **SOURCE.** **Exodus 12:16**: the only Scripture in the chapter; the citation is the translator's
  (`[Exodus 12:16]`, plain brackets, not `[ed.]`). Show the verse in context; the index entry exists.
  Recurs in chapter 6.
- **GUIDE.** `אוכל נפש`, work permitted on a festival for food. One sentence.
- **VISUAL.** `exclusion` glyph (bullseye: "this and nothing else") on 3.10.3.
- **FIX.** 3.10.2 Hebrew opens `דרך משל: " מאמר הכתוב`: the stray straight quotation mark after the
  colon is a keying artefact. Footnote; do not emend.

### 3.11.1–3.11.4 · Kind 4, exceptive (מוציא)

- **VISUAL.** `exception` glyph (pie with a wedge out) on 3.11.4. ICONS_REFERENCE §6b gives it **two
  parts** (base; exception), from chapter 6: an objection can hit the exception and leave the rule.
  Show the two pieces separately here so the later chapter can light one.
- **SOURCE.** **Chullin 2a**, already met at 2.12.6 in a different role (there, `הכל שוחטין` read as
  "from the outset"; here, `חוץ מ` as the exceptive marker). The recurrence ribbon should say what
  role the passage plays each time.
- **TERM.** `חש"ו` (3.11.3) is the abbreviation of `חרש שוטה וקטן`. First of the abbreviations that
  need expansion on hover; see cross-cutting.
- **GUIDE.** Why those three are excepted from slaughtering (competence), one sentence from the index.

### 3.12.1–3.12.4 · Kind 5, conditional (מגבל)

- **VISUAL.** `conditional` glyph (ring broken by an open switch) on 3.12.4; **two parts** (base;
  condition).
- **SOURCE.** **Yevamot 38a** (3.12.2), **Mishnah Demai 1:2** (3.12.3; `[ed.]` corrects "Demai 12",
  a leaf number, to the mishnah). Both in the index; Demai 1:2 recurs in chapter 6.
- **GUIDE.** Realia dense here: yibbum and the widow "taken in"; the ketubah charged on the first
  husband's estate; demai and the redemption of second-tithe money. The index entries carry all of it;
  surface them.
- **GUIDE.** The marker `ובלבד ש` / "provided that" is what distinguishes kind 5 from kind 6's `אם`.
  A marker-word callout on 3.12.2 and 3.13.2 side by side.

### 3.13.1–3.13.6 · Kind 6, hypothetical (תלוי): antecedent and consequent

- **WIDGET.** Highlight antecedent and consequent in both examples of 3.13.2 (colour the `אם …` clause
  and the `… יבואו ויאכלו` clause), driven by 3.13.5–3.13.6, which the text itself uses as the worked
  case. Then the reader marks them in 3.13.2's second example (Hillel's saying) unaided.
- **VISUAL.** `hypothetical` glyph: two *standing* dominoes with an arrow. Pair it, right here, with
  kind 11's *fallen* dominoes (3.18); see priority item 8. Chapter 6 will say that a hypothetical
  asserts **only the dependence** (FOR_AGENTS §4 type 6: both parts false but genuinely dependent → true;
  "not material implication"). A preview note here saves a later surprise.
- **SOURCE.** **Mishnah Demai 4:4** (3.13.2; `(שם ט"ו)` is "ibid., leaf 15", resolved by the `[ed.]`),
  **Sukkah 53a** (Hillel at the water-drawing; a warm aggadic context worth showing). Both in the index.
- **UX.** `שם` / "ibid." citations need a resolver that knows what the previous citation was. Here the
  chain is Demai 12 → "ibid. 15"; in 3.9.5 it is Ketubot 75 → "Ketubot, ibid.". Resolve at build time
  and show the resolved locus on hover.
- **FIX.** 3.13.2 prints `למודם`; 3.13.5, quoting the same words, prints `למודים` (the mishnah's
  reading). Footnote the inconsistency; do not emend.

### 3.14.1–3.14.18 · Kind 7, compound (מרבה הענינים)

- **CHART.** The tree the paragraph narrates:
  compound (3.14.1) → **part 1**, several predicates or subjects together (3.14.2) → branch A, equal
  footing (3.14.9); branch B, one novel and one known (3.14.10) → way 1, known first, `לא זו אף זו`
  (3.14.14); way 2, novel first, `זו ואין צריך לומר זו` (3.14.15) · **part 2**, disjunction (3.14.16).
  Draw it once; label each node with its verse ID so clicking a node scrolls to the verse.
- **VISUAL.** `compound` (bracket over three bars), `compound-not-only` (staircase up),
  `compound-needless` (staircase down), `disjunction` (fork). ICONS_REFERENCE §6b notes the two
  staircases are leaf-level; here, where the text distinguishes them, is exactly where they belong.
- **WIDGET.** The reorderer: two clauses, one marked *known* and one *novel*; drag to reorder and
  the name flips between `לא זו אף זו` and `זו ואין צריך לומר זו`. Uses 3.14.11 (alive/slaughtered)
  and 3.14.15 (eating/benefit) as its two presets.
- **SOURCE.** Six passages, all with index entries: **Mishnah Kilayim 8:1** (3.14.3 and, for
  `מתרים באכילה וכל שכן בהנאה`, 3.14.15), **Mishnah Terumot 1:7** (3.14.4), **Mishnah Demai 6:1**
  (3.14.6), **Mishnah Ma'aser Sheni 1:2** (3.14.11), **Yevamot 112b** (3.14.17; recurs in chapters 6
  and 9).
- **SOURCE / WIDGET.** 3.14.11 is the best case in these chapters for a *source-reading* view: the
  `[ed.]` records that the mishnah reads `תמים חי, ובעל מום חי ושחוט` and the 1742 print quotes only
  the second clause. Show the full mishnah with the quoted words highlighted and the dropped clause
  dimmed. The same view serves 3.18.2 (`טלו כלם` against `טלו לכם תאנים`).
- **GUIDE.** Realia, one sentence each from the index: mixed seeds of the vineyard; terumah separated
  by estimate, never by measure; the sharecropper who divides before the owner; the firstborn animal
  sold alive or slaughtered; chalitzah or yibbum as the widow's two exits.
- **GUIDE.** 3.14.16 is the hardest sentence in the chapter as translated: "suspended between two
  predicates, and it is not allowed that one of them alone be found in it". The sense, from the
  example `או חולץ או מיבם`, is that the subject must take exactly one of the two: neither may be
  absent, and the two are not both available. A guide note here, phrased as a reading of the example,
  not a correction of the translation.
- **TERM.** `לא זו אף זו` and `זו ואין צריך לומר זו` are Talmudic formulae the English keeps in
  parentheses; formula cards, and these two are the most-searched terms in the whole chapter.

### 3.15.1–3.15.2 · Kind 8, affirmed by denying another

- **GUIDE.** The text gives this kind **no name**, in Hebrew or otherwise (Heb p37; see the naming
  bullet at 3.7). *Preclusive* is the site's key throughout (FOR_AGENTS §0 B row 8; ICONS_REFERENCE §6b;
  `anatomy.ts`).
- **VISUAL.** `preclusive` glyph (list: first item crossed, second pointed at) on 3.15.1.
- **SOURCE.** **Mishnah Terumot 11:5** (the `[ed.]` supplies the locus the 1742 leaves blank).
- **TERM.** Marker `לא … אלא` / "not … but rather": it returns as the shape of Pesachim 7b's "the
  father must say *to circumcise*, not *concerning*" at 3.19.13 (FOR_AGENTS §4 labels that a
  preclusive). Forward link.

### 3.16.1–3.16.3 · Kind 9, a predicate that seems to contradict (מכחיש)

- **VISUAL.** `discrepancy` glyph (umbrella in rain: "holds, even though it looks like it should not").
- **GUIDE.** Realia: growths from terumah seed and why they may be eaten (the index entry gives
  Bartenura's rule: growths count as terumah only when the seed sown is itself a food).
- **SOURCE.** **Mishnah Ma'asrot 5:8** (the 1742 gives only "chapter 4"; `[ed.]` corrects).
- **GUIDE.** Marker `אף על פי ש` / "even though": the third marker-word (after `ובלבד ש`, `אם`) that a
  reader can learn to spot. A running "marker words" strip along 3.8–3.18 (סתם · ודאי/אפשר/ספק/לא אפשר
  · לבדו · חוץ מ · ובלבד ש · אם · ו…ו / או…או · לא…אלא · אף על פי ש · כשם ש…כך · לפיכך) is a cheap
  and very effective CHART.

### 3.17.1–3.17.5 · Kind 10, comparative (מדמה)

- **VISUAL.** `comparative` glyph: filled square (known) equated to outlined square (unknown).
  ICONS_REFERENCE §6b: the icon deliberately does not say whether the two share a subject or a
  predicate, because 3.17.3 does not either. Note this in the caption; it is a place a future
  illustrator will be tempted to over-specify.
- **GUIDE.** 3.17.3 "a known matter is always taken and another, unknown one is equated to it" is the
  same known→unknown primitive as chapter 7's analogism (`בנין אב`, `מה מצינו`). Forward link; the
  reader who sees the family resemblance now will read chapter 7 faster.
- **SOURCE.** **Mishnah Demai 6:5 (with 6:3)**: the index explains why the author's gloss "one who
  receives olive trees for oil" (3.17.4) is the wording of 6:5. Show both mishnayot.

### 3.18.1–3.18.2 · Kind 11, a predicate consequent upon another (נמשך)

- **VISUAL.** `consequent` glyph: two *fallen* dominoes, **three parts** (antecedent; consequent;
  dependence, all asserted; FOR_AGENTS §0 B row 11). Place beside 3.13's standing dominoes.
- **GUIDE.** The text gives this kind no name (see 3.7); *consequent* renders `נמשך` in 3.18.1, the
  word the text itself uses for the consequent clause at 3.13.4.
- **SOURCE / WIDGET.** **Mishnah Ma'asrot 2:1**; the `[ed.]` records `טלו לכם תאנים` against the
  1742's `טלו כלם`. Source-reading view as at 3.14.11. Recurs in chapter 6 for its three intentions.
- **GUIDE.** Realia: produce becomes fixed for tithing on entering the house; a gift eaten in the
  market is free; the index entry has the whole mechanism.

### 3.19.1–3.19.8 · Style versus statement

- **GUIDE.** 3.19.2's three manners (report, rhetorical question, allusion) and two lengths (brief,
  long) are the *style* axis the icon set deliberately leaves without glyphs (ICONS_REFERENCE §6b,
  notes: "Ramchal says to ignore style and abstract the statement"). A note here explains an absence
  the reader will otherwise wonder about.
- **WIDGET.** 3.19.7 as a control: "brief → complete it", "long → strip it". Two buttons over a
  sample utterance that show the completion and the stripping. Prepares the Pesachim walkthrough.
- **VISUAL.** 3.19.8 names the three things to conceive (subject, predicate, manner): this is the
  normalized proposition of FOR_AGENTS §0 B ("subject + predicate + manner of predication") and the
  three-cell output the whole site is built on. A pull-quote with the three cells drawn.

### 3.19.9–3.19.15 · The Pesachim 7b walkthrough

- **WIDGET.** Step-through, one step per verse. 3.19.9: the terse Aramaic. 3.19.10: its style
  (brief; rhetorical). 3.19.11: the intended statements, with badges: *the mohel can bless only "concerning
  circumcision"* → `exclusion`; *because he need not be the one who circumcises, he cannot say "to
  circumcise"* → `consequent`. 3.19.13: *the father must say "to circumcise", not "concerning"* →
  `preclusive`. 3.19.14: *the father says "to circumcise"* → `simple`. These four labels are the site's
  own (ICONS_REFERENCE §12; FOR_AGENTS §4 normalization example), so the widget can be checked against
  them.
- **WIDGET.** Alternatively, or additionally, a three-row Sugyascade: the objection from the
  circumcision blessing, the question about the father, the concession. The passage recurs in chapter
  10 as the model of the whole procedure, so a drawing made here is reused there.
- **GUIDE.** The halachic scene, from the index entry **Pesachim 7b**: Rav Pappi and Rav Pappa on
  whether a blessing is worded `ל…` or `על …`, and why circumcision is the test case (the one who
  circumcises is usually not the father, who alone bears the duty). Without this the reader cannot
  tell why "to circumcise" versus "concerning circumcision" matters.
- **TERM.** Three formulae kept in the English: `לא סגיא דלאו איהו מהל`, `מאי איכא למימר`,
  `אין הכי נמי`. Formula cards.
- **FIX.** 3.19.9 Hebrew `(פסחים ד' ז':` lacks its closing parenthesis. 3.19.12 Hebrew `מתוך כל המצות
  ההמה` ("those commandments") is a keying error for `המלות ההמה` ("those words"), which the English
  translates. 3.19.13 prints `אכא` where the English and the standard text have `איכא`. Footnotes; do
  not emend.

## Chapter 4

Chapter 4 is the toolkit for one chapter 9 move: the `רמיא`, the apparent contradiction between two
statements. ICONS_REFERENCE §7 puts every relation tile "on the connector between two rows, typically a
רמיא edge", and the four conditions of 4.4 "on the `ישוב` that dissolves a `רמיא`". A one-line forward
note at the top of the chapter tells the reader what all this is *for*.

### 4.1.1–4.1.2 · Ten kinds of relation

- **CHART.** The text names six families and says ten kinds. The ten are: equivalent (1); variant (2:
  the predicates differ, or the subjects differ); opposites (2: diametrically opposed, contradictory);
  converse (3: the three ways of 4.7); obverse (1); incongruent (1). ICONS_REFERENCE §7 has one tile
  for each of the ten plus `statement-tile` for the shape itself. Draw the count as a tree from 4.1.2's
  six names down to the ten tiles, so the reader is not left wondering where "ten" came from.
- **TERM.** `ערך` "comparison" and `יחס` "relation": the text uses both; glossary roots for the chapter.

### 4.2.1–4.2.6 · Equivalent

- **VISUAL.** `equivalent` tile (one arrow ghosted behind another) on 4.2.1.
- **CHART.** 4.2.1–4.2.2 give three sub-forms (same subject and predicate, different wording; similar
  predicates of similar subjects; two similar predicates of one subject). A three-row chart, each row
  pointing at the example that fits it.
- **SOURCE.** **Ketubot 36b** (4.2.3; 1742 prints 37) and **Pesachim 82b** (4.2.5; 1742 prints 45, and
  `ר' נחמן` for R. Nechemyah). Both `[ed.]`; both in the index. The Pesachim entry is what explains
  4.2.6, "not one, but similar": the two rulings agree for reasons of their own.
- **TERM.** `אמרו דבר אחד` "said one thing" is the Talmud's own marker for equivalence; formula card.
- **FIX.** 4.2.1 `בנושא אחר עצמו` for `אחד` (English "one and the same subject"). 4.2.3 `ר”י` keyed with a
  closing curly quote for the gershayim. 4.2.5 the opening quotation mark before `ר"י בן ברוקא` is
  missing. Footnotes; do not emend.

### 4.3.1–4.3.2 · Variant

- **VISUAL.** Two tiles, `variant` (one subject, two predicates) and `variant-subjects` (one predicate,
  two subjects), matching the two halves of 4.3.1.
- **SOURCE.** **Ketubot 57a** (index: the betrothed woman fed from the priest's property, and why R.
  Akiva wants half non-sacred).

### 4.4.1–4.4.6 · Opposites, and the four conditions

- **WIDGET.** The checklist. Given two statements that look opposed, walk the conditions of 4.4.3 in
  order: same predicate, same subject, one time, one place, one respect, plain sense without
  equivocation or figure. Whichever fails names the glyph and dissolves the contradiction. This is the
  `ישוב` tool for a `רמיא` and the single most reusable control in the chapter.
- **VISUAL.** The test glyphs of ICONS_REFERENCE §7: `differs-in-time`, `differs-in-place`,
  `differs-in-context`, `homonym`, one per condition; and `figurative` (chapter 6) for the last clause of
  4.4.3, "figurative usage" (`השאלה`), which the text already lists here and defines at 6.2.
- **GUIDE, a discrepancy to settle.** The text files the sewn/unsewn case (4.4.4) under *time*:
  `בזמן שאינם תפורים`, "of when they are not sewn on". ICONS_REFERENCE §7 assigns that same Shabbat
  57a case to `differs-in-context` ("the same thing in different respects") and reserves the clock for
  time. A widget that follows the text lights the clock at 4.4.4; one that follows the glyph contract
  lights the dashed frame. Recorded here, not resolved: either the contract's caption explains the
  reading, or the case moves to time.
- **SOURCE.** **Yevamot 50a** (4.4.2), **Shabbat 57a** (4.4.4–4.4.5; the index notes 1742's `סנבוטין`
  against Sefaria's `סרביטין`, and that the permissions quoted are Mishnah Shabbat 6:5), **Eruvin 102b**
  and **Rosh Hashanah 29b** (4.4.6, the homonym `תקיעה`). All in the index.
- **GUIDE.** Realia, one sentence each from the index: the levirate betrothal (`מאמר`) and the
  bill of divorce between co-widows; the frontlet, the pendants and the woolen kavul, and why sewing
  them on or being in a courtyard changes the ruling; the hinge-pin driven home as "building".

### 4.5.1–4.5.8 · Diametrically opposed and contradictory

- **CHART.** The two-by-two: both categorical, or both particular, one affirming and one negating →
  diametrically opposed (4.5.2–4.5.5); one categorical and one particular → contradictory (4.5.6–4.5.8),
  and the author of the particular "would concede" the rest (4.5.8). The Shabbat 28b wick is the
  "both particular" cell; note that "particular" here means a single case, as chapter 3 defined it.
- **VISUAL.** `diametrically-opposed` (equal arrows tip to tip) on 4.5.1 and 4.5.4; `contradictory`
  (a big arrow against a small one) on 4.5.6.
- **WIDGET.** In 4.5.6–4.5.8, draw the categorical "peels" as the outer set and "peels of lentils" as
  the inner one; the concession in 4.5.8 is the outer set minus the inner.
- **SOURCE.** **Shabbat 124a** (4.5.3), **Shabbat 28b** (4.5.5), **Shabbat 76b** (4.5.6). `שם` "ibid."
  resolves to Shabbat twice here; the resolver noted under 3.13.
- **GUIDE.** Realia: moving vessels on Shabbat "for a purpose"; the wick folded from a garment; foods
  combining to the bulk of a dried fig, and why lentil shells count. All in the index.

### 4.6.1–4.6.4 · Opposite terms, with and without an intermediate

- **VISUAL.** `no-middle` (two cells) on `טמא / טהור`, `אסור / מתר`; `has-middle` (three cells) on
  `רשות / מצוה / חובה`.
- **CHART.** The ladder optional · commended · obligatory beside the two binary pairs. One figure.
- **GUIDE.** Forward links: this is the precondition of chapter 8's disjunctive syllogism
  (ICONS_REFERENCE §7: "only when there is no middle term does eliminating one branch prove the
  other"), and it bears on chapter 3's disjunction (3.14.16–3.14.17). The translator's bracket at 4.6.4,
  "a commended but not binding act", is the one-sentence gloss on `מצוה` in this technical sense.

### 4.7.1–4.7.10 · Converse, three ways

- **CHART.** Three rows: way 1 (4.7.5), order changes, quantity and quality kept; way 2 (4.7.7), order
  and quantity change, quality kept; way 3 (4.7.9), order and quality change, quantity kept. Add the
  chapter 5 names and glyphs to each row: way 1 is the complete converse (`converse`), way 2 the limited
  converse (`converse-limited`), way 3 the contrapositive (`contrapositive`). The two chapters name the
  same operations from opposite sides, and a reader should see that once, in one table.
- **WIDGET.** The tile flipper: a statement-tile with three controls, swap subject and predicate,
  toggle all/some, toggle is/is not. The display names the way produced and, once chapter 5 is read,
  whether it is a necessary inference of the original.
- **SOURCE.** **Yerushalmi Shabbat 13:3** (4.7.2; `[ed.]` supplies the locus the 1742 gives as bare
  "Yerushalmi"), **Yevamot 66a** (4.7.8, 4.7.10 and 4.8.2; the index explains the terumah rule and
  notes that the author builds his converse and obverse examples on it).
- **TERM.** `כמות` "quantity" and `גזרה` "quality" (4.7.5). The same word `גזרה` is rendered
  "intention" in chapter 6 (`סוף גזרתו`, 6.3.1). A tooltip on either must show both renderings and say
  they are one Hebrew word; a reader searching the Hebrew will otherwise miss half the occurrences.
- **GUIDE.** Realia: "whoever eats [terumah] enables others to eat", the priest's household and slaves.

### 4.8.1–4.8.2 · Obverse

- **VISUAL.** `obverse` tile (the same arrow again beneath, in negative).
- **GUIDE.** 4.8.1 in plain words: negate both terms and the content is unchanged. The example is the
  pair the converse section just used, which is why the tile reuses the same statement.
- **FIX.** 4.8.2 stray space after the opening quotation mark.

### 4.9.1 · Incongruent

- **VISUAL.** `incongruent` tile (square and triangle, nothing shared).
- **GUIDE.** The null relation is still a finding: two statements set against each other by a `רמיא`
  may turn out to share nothing, which ends the difficulty. Forward link to chapter 9.

## Chapter 5

### 5.1.1–5.1.7 · The inference (דיוק) defined

- **VISUAL.** The wide glyphs of ICONS_REFERENCE §8, stated statement solid on the left, implied one
  as a ghost on the right, introduced here on 5.1.6, the verse that names the construct.
- **TERM.** `דיוק` is also a chapter 9 leaf, `statement/inference` (chip `in`, `taxonomy.ts`). This
  verse is where the move's name is defined; ribbon forward.
- **SOURCE.** **Leviticus 11:2** (5.1.3–5.1.4) and **II Samuel 23:1** with **Moed Katan 16b** (5.1.5;
  the index tells the story of Zutra bar Toviyah asking Rav Yehudah what the *first* words were, and
  the day's admonition that followed). Both citations are the translator's, in plain brackets.
- **GUIDE.** 5.1.2 "engraved in our nature" is chapter 2's language (2.12.1, 2.12.12); ribbon back.

### 5.2.1–5.2.10 · Proportion and measure; "into a house"

- **WIDGET.** The limited-subject highlighter. Show 5.2.6 with `לבית` marked as the limiter and, from
  5.2.7, `לביברין` as the excluded complement; then let the reader mark the limiter in any statement
  and see the implied exclusion. This is the first inference the book works, and the shape of every
  `statement/inference` row in the Sugyascade.
- **CHART.** 5.2.2–5.2.3 are four symmetric rules (confine or spread, a predicate or a subject): a
  two-by-two.
- **SOURCE.** **Shabbat 106a** (5.2.6; the English supplies "Mishnah Shabbat 13:5" in plain brackets) and
  **Beitzah 24a** (5.2.7, where the Gemara draws the inference). Both in the index; the entries explain
  cupboard, house and enclosure as three degrees of confinement.
- **FIX.** 5.2.9 Hebrew `אף על פי שיהיה החיוב` ("even though") where the argument, and the English's
  "for if", require a counterfactual. Footnote; do not emend.

### 5.3.1–5.3.6 · Necessary and non-necessary

- **VISUAL.** `inference-loose` (the tilde) on 5.3.2–5.3.4; `inference-necessary` (the straight arrow)
  on 5.3.5–5.3.6. ICONS_REFERENCE §8 defines the pair on exactly these verses.
- **SOURCE.** **Berachot 53a** (5.3.3; the `[ed.]` records that the inference clause `הא מחצה על מחצה
  אינו מברך` is not printed in 1742: a source-reading view, as at 3.14.11) and **Chagigah 15b** (5.3.6;
  the index has the parable of Acher and the wool, a story worth a GUIDE panel of its own).
- **TERM.** Two formulae: `בדין הוא` "by right", and `איידי דתנא רישא … תנא סיפא` "since the first
  clause taught X, the second taught X too", the standard deflection of a wording-inference. Formula
  cards; the second returns whenever a difficulty from wording is answered.
- **GUIDE.** The retractable inference is the one that can be "waived" (ICONS §8 on `inference-loose`):
  it is why an inference row in the Sugyascade can be attacked and dropped without the statement it
  came from being touched.
- **FIX.** 5.3.5 `שאי אפשר שנודע המאמר. ונכחיש` for `שנודה במאמר ונכחיש` (English "acknowledge the
  statement and deny"); the stray period splits the clause. The seam 5.3.5 / 5.3.6 has no punctuation
  in the print (`ממנו דרך משל`).

### 5.4.1–5.4.12 · The necessary inferences by kind of statement

- **CHART / WIDGET.** The chapter's deliverable. Rows: categorical affirmative (5.4.2), categorical
  negative (5.4.5), partial affirmative (5.4.7), partial negative (5.4.11). Columns: the inferences each
  yields, with the text's names: contrapositive `חלוף הפכי כולל` (5.4.3), limited converse `חלוף קצתי`
  (5.4.4, 5.4.10), complete converse `חלוף כולל` (5.4.6), absolute opposite `הפך` (5.4.8), limited
  contrapositive `חלוף קצתי הפכי` (5.4.9). FOR_AGENTS §0 B carries this table already. As a widget:
  pick the quantity and quality of a statement, or one of the text's four examples, and the inferences
  appear with their chapter 4 glyphs. Cross-link every name to its 4.7 "way".
- **VISUAL.** `contrapositive` on 5.4.3, `converse-limited` on 5.4.4 and 5.4.10, `converse` on 5.4.6,
  `absolute-opposite` (wide) on 5.4.8. The limited contrapositive (5.4.9) has no glyph, by decision
  (ICONS_REFERENCE rule 7); a widget will need a text chip for it, or the decision revisited.
- **SOURCE.** **Chagigah 15b** (5.4.3–5.4.4), **Bereshit Rabbah 51:3** (5.4.6; citation supplied by the
  translator in plain brackets; index), **Pesachim 50b** (5.4.8–5.4.10; the index has the baraita's four
  kinds of worker, which is the whole partial-affirmative lesson in one line).
- **FIX.** 5.4.12 is garbled as printed and keyed: the example for the partial *negative* is worded as
  an affirmative (`יש קדשים שיש להם פדיון`), the parenthetical that follows repeats the same words, and
  only two of the promised three inferences are given. The English reproduces it faithfully. A GUIDE
  should say, marked plainly as reconstruction, what the example almost certainly was (`יש קדשים שאין
  להם פדיון`, "there are consecrated things that have no redemption") and list the three inferences it
  would yield by the rule of 5.4.11.
- **TERM.** `נשכר` is "gains" in the text and "rewarded" in the index entry; the glossary should carry
  both.

## Chapter 6

### 6.1.1–6.1.2 · True and false

- **UX.** Chapter 6 has three body paragraphs and one of them, 6.3, is 28 verses long. The reader
  needs a mini-table-of-contents inside 6.3 by kind: 6.3.3 simple · 6.3.5 qualified · 6.3.7 exclusive ·
  6.3.9 exceptive · 6.3.12 conditional · 6.3.14 hypothetical · 6.3.21 compound · 6.3.23 kinds 8–10 ·
  6.3.24 consequent. The verses are cut on those seams.

### 6.2.1–6.2.5 · Literal, metaphor, hyperbole

- **VISUAL.** `figurative` glyph on 6.2.4 (ICONS_REFERENCE §9: "literal is the default and gets no
  badge").
- **SOURCE.** **Bava Kamma 117a** (6.2.5; the index has the whole story of Rav Kahana, the lion and the
  fox, which a GUIDE panel should tell in full: it is the most memorable page in these three chapters).
- **GUIDE.** 4.4.3 already listed "figurative usage" as a condition that defeats opposition; ribbon
  back, and forward to chapter 8 where the same test recurs.
- **FIX.** 6.2.3 is a dittography in the parent, on **both** sides: the stretch "For with the literal
  ones … But in those that are by way of metaphor or hyperbole" is printed twice. It is cut as its own
  verse so the interlinear page can fold or dim it with a footnote; the text is not emended. Also
  `השאלה` (6.2.1) beside `ההשאלה` (6.2.3, 6.2.4).

### 6.3.1–6.3.28 · The ultimate intention of each kind

- **CHART.** Kind → number of intentions: simple 1 (6.3.3) · qualified 1, in that mode (6.3.5) ·
  exclusive 1 (6.3.7) · exceptive 2 (6.3.9) · conditional 2 (6.3.12) · hypothetical 1, the dependence
  only (6.3.14) · compound, all (6.3.21) · kinds 8, 9, 10, all (6.3.23) · consequent 3 (6.3.24). This is
  the "Parts" column of ICONS_REFERENCE §6b and the "intentions" column of FOR_AGENTS §0 B; both cite
  these verses. Render it as extra columns on the 3.7 master table, since the rows are the same.
- **WIDGET.** "Which part fails?" One toggle per intention, the statement's truth updating live, with
  the text's own examples preloaded. Exceptive (6.3.9–6.3.11): flip "the excluded also slaughter" and
  part two goes false while the whole survives. Conditional (6.3.12–6.3.13): the same. Hypothetical
  (6.3.14–6.3.20): the two-by-two of parts true or false × dependence true or false, with the text's
  cases in their cells: parts true and dependent → true; parts true, not dependent → false (Moses and
  Saul, 6.3.20); parts false, dependent → true (Geviha, 6.3.16; Elijah, 6.3.17–6.3.18). Consequent
  (6.3.24–6.3.28): three toggles.
- **GUIDE.** Say plainly at 6.3.15 that this is not material implication (FOR_AGENTS §4, type 6): a
  reader trained on truth tables expects "both parts true → true" regardless of dependence, and the
  text says the opposite. This is the one place in chapters 4–6 where the reader's prior knowledge
  works against him.
- **VISUAL.** The chapter 3 glyphs return with their parts lit: `exception` two pieces, `conditional`
  ring and switch, `hypothetical` standing dominoes, `consequent` fallen dominoes. ICONS_REFERENCE rule
  3, "when you show an objection landing, light the part it lands on", is licensed by these verses.
- **SOURCE.** **Berachot 20b** (6.3.4), **Pesachim 9b** (6.3.6), **Exodus 12:16** (6.3.8), **Chullin 2a**
  (6.3.11), **Mishnah Demai 1:2** (6.3.13; the `[ed.]` notes 1742's `שיעלו הפרות` is the Sages' wording
  later in the same mishnah, not the proviso quoted in 3.12.3: a source-reading view), **Sanhedrin 91a**
  (6.3.16; Geviha ben Pesisa and the heretic, in the index), **I Kings 18:21** (6.3.17; `[ed.]` 1742 adds
  `אלהים`), **Yevamot 112b** (6.3.22; `[ed.]` 1742 prints `אחד` for `או`), **Mishnah Ma'asrot 2:1**
  (6.3.26). Every one is in the index.
- **CHART, the chapter 3 ↔ chapter 6 concordance.** The same example, defined there and given its
  truth condition here: 3.1.3 ↔ 6.3.4 (Berachot 20b) · 3.9.2 ↔ 6.3.6 (Pesachim 9b) · 3.10.2 ↔ 6.3.8
  (Exodus 12:16) · 3.11.2 ↔ 6.3.11 (Chullin 2a) · 3.12.3 ↔ 6.3.13 (Demai 1:2) · 3.14.17 ↔ 6.3.22
  (Yevamot 112b) · 3.18.2 ↔ 6.3.26 (Ma'asrot 2:1). A ribbon at each end; the pairs are the book's own
  structure made visible.
- **TERM.** `סוף גזרתו`: the translator glosses it once, at 6.3.1, "ultimate intention (literally, the
  sum of its assertion)". A tooltip should carry that gloss to every later occurrence (6.3.3, 6.3.5,
  6.3.7, 6.3.14, 6.3.21), and note the same word `גזרה` is "quality" at 4.7.5.
- **GUIDE.** 6.3.23 treats kinds 8, 9 and 10 together, "all of which gather many matters": the text
  does not give them individual truth conditions, which is why FOR_AGENTS rows 8–10 all read "all
  parts". Say so, or a careful reader will look for the missing three paragraphs.
- **FIX.** 6.3.11 `צודקת,:חוץ מחרש שוטה וקטן"` is a punctuation and quotation garble. 6.3.13 `אלו היה זה
  התנאי אמתי` ("if this condition were true") where the argument requires the condition to be untrue;
  the English supplies "[not]". 6.3.13 `וכו''` doubled geresh. 6.3.22 `מיבם”"` doubled closing quote.
  Chapter 6 is keyed with en dashes (`–`) where chapters 1–5 use em dashes (`—`); a renderer should
  treat the two as one mark. Footnotes; do not emend.

## Chapter 7

Chapter 7 is the teal family of ICONS_REFERENCE §10, one glyph per kind of syllogism and one per way
a syllogism fails. Every construct is named by the text. The chapter also introduces the words the
rest of the book uses for deduction: `הקדמה` premise, `תולדה` conclusion, `הקש` syllogism (7.2.9).

### 7.1.1–7.1.2 · The second foundation

- **UX.** The book's roadmap (2.13–2.17) has a stop here: "the first foundation, understanding
  statements" is chapters 3–6, "the second, generating conclusions" is this chapter. Light the map.

### 7.2.1–7.2.14 · The classical syllogism (הקש מופתי)

- **GUIDE, load-bearing.** 7.2.1–7.2.2 define the syllogism as inheritance in two directions: down
  the *predicate* (whatever is joined to the predicate holds of the subject) and down the *subject*
  (whatever falls under the subject takes the predicate). ICONS_REFERENCE §10 is explicit: "Ramchal's
  'classical syllogism' is not the Aristotelian three-term figure. It is inheritance down the subject
  or the predicate. Do not 'correct' it." A reader who knows Barbara will misread these verses unless
  told so here.
- **WIDGET.** The inheritance tree (`classical-syllogism` glyph: top node filled, one leaf filled).
  Premise at the root (7.2.4, "one who performs a primary category of labor is liable to stoning");
  members below (writing, kneading, 7.2.6); pick a member and the conclusion lights. Then the second
  direction with the circumcision knife (7.2.7–7.2.8): "set aside" → "forbidden to move".
- **WIDGET, the defeat.** `fallacy-not-included` (the tree with a branch cut): 7.2.12, R. Yose says
  kindling is not a primary labor, so "one who kindles" drops out of the class; 7.2.13, "moving from
  the side is not called moving". Both are ICONS_REFERENCE §12 attested fixtures. Let the reader cut the
  branch and watch the conclusion go dark.
- **SOURCE.** **Shabbat 73a** with **Sanhedrin 53a** (7.2.4, the premise), **Shabbat 70a** (7.2.12, R.
  Yose on kindling), **Shabbat 43b** (7.2.13, moving from the side). All in the index; none is cited in
  the print, so the card must say the loci are the index's.
- **GUIDE.** Realia: the thirty-nine primary labors and stoning; `מוקצה` ("set aside") and why a
  circumcision knife is one on Shabbat; indirect moving.
- **GUIDE, a pull-quote.** 7.2.14: dispute between sages arises when one person's premise turns out
  to be another's non-premise. This is the book's account of *why there is machloket at all*, said in
  one sentence; a callout, and a forward link to chapter 9's `contradiction` element.
- **TERM.** `הקדמה` / `תולדה` / `הקש` / `הקש מופתי` (7.2.9): glossary roots for the teal family.

### 7.3.1–7.3.12 · Analogism and a fortiori; three defeats

- **VISUAL.** `analogism` (filled square → outlined square) on 7.3.2; `a-fortiori` (small dot → big
  circle) on 7.3.4. The analogism glyph is the `comparative` glyph of 3.17 plus an arrow
  (`METHODOLOGY.md`, "same primitive, one step further"); say so, since 3.17.3 already taught the
  known→unknown direction.
- **CHART.** 7.3.7 names three defeats in one sentence, and the text then works one example of each:
  not truly similar (7.3.8, Keritot 26a) → `fallacy-not-similar`; not truly lesser or greater (7.3.9–
  7.3.10, the anointed priest is greater in one aspect and lesser in another) → `fallacy-not-greater`;
  a similar subject that lacks the predicate (7.3.11–7.3.12, `משיח יוכיח`) → `fallacy-counterexample`.
  Three rows, three glyphs, three verse pairs.
- **WIDGET.** The builder. Three persons (individual, prince, anointed priest), their offerings, and a
  predicate ("brings a suspensive guilt offering"); assemble the Sifra's analogism (7.3.5) and a
  fortiori (7.3.6), then apply each defeat and see the conclusion annulled. The realia are the whole
  difficulty of the paragraph, so the widget must carry them.
- **GUIDE, realia table.** Individual: brings a female for a known sin, and a suspensive guilt
  offering (`אשם תלוי`) for a doubtful one. Prince (`נשיא`, the king): a male goat for a known sin.
  Anointed priest (`משיח`, the High Priest): a bull, and only for a mistaken ruling he acted on; brings
  even after leaving office; no suspensive guilt offering. One table beside 7.3.5 turns the paragraph
  from opaque to readable. The index entries **Torat Kohanim, Dibbura de-Chovah, parashah 5** (§9,
  §7, §2), **Keritot 26a** and **Horayot 10a** carry all of it, and the Horayot entry notes that the
  author quotes the Sifra's direction of the argument (priest → prince), which Horayot 10a runs the
  other way.
- **TERM.** `בנין אב` / `מה מצינו` (7.3.2), `כל שכן` / `קל וחמר` (7.3.4), `אינו דין` (7.3.6),
  `מה ל… שכן` (7.3.8, 7.3.9), `… יוכיח` (7.3.11): the a fortiori's own formulae, all kept in the
  English. Formula cards; `מה ל… שכן` and `יוכיח` are what a reader needs to recognise a defeat in
  the wild.
- **GUIDE.** 7.3.10's "in another aspect he is greater" is chapter 8's aspects (8.21) arriving early;
  forward link.

### 7.4.1–7.4.6 · The hypothetical syllogism (הקש תלוי)

- **VISUAL.** `hypothetical-syllogism` (filled domino → outlined domino) for 7.4.2's first half,
  `hypothetical-syllogism-tollens` (both crossed, arrow back) for its second half and for the example:
  the Pesachim 19a argument (7.4.3–7.4.5) denies the consequent to deny the antecedent.
- **GUIDE.** 7.4.2 states both directions in one verse; the example uses only the second. Say so, and
  link back to 3.13 (the hypothetical statement) and 6.3.14–6.3.20 (its truth condition), since 7.4.6
  names the premise "a hypothetical statement".
- **SOURCE.** **Pesachim 19a** (index: the degrees of impurity, R. Akiva and R. Yose). Realia: what
  "a fourth in terumah and a fifth in consecrated food" means.
- **TERM.** `אי סלקא דעתך` "if it enters your mind": the marker of the hypothetical syllogism
  (FOR_AGENTS §6 lists it). Formula card; it returns at 8.11.1 and 8.14.4.
- **FIX.** 7.4.4 `כרבי עקיבא. היה נמשך` has a stray period splitting the clause.

### 7.5.1–7.5.6 · The disjunctive syllogism (הקש מחלק)

- **VISUAL.** `disjunctive-syllogism` (a fork, one branch struck, the other filled). Its precondition is
  4.6's `no-middle` (ICONS_REFERENCE §7); ribbon back, and forward to 8.10.4 which restates it.
- **SOURCE.** **Pesachim 5b** (7.5.2; `[ed.]` corrects "4–5"), **Bava Kamma 104a** (7.5.4). Both in the
  index. Realia: kindling "singled out to divide" against "for a mere prohibition"; the agent
  appointed before witnesses.
- **TERM.** `שמע מינה` "learn from it", `היכי דמי` "what are the circumstances", `מנא ידעינן` "how do
  we know": formula cards; `היכי דמי` returns at 8.15.2 as the opening of a dilemma.
- **FIX.** 7.5.4 `בבא-קמא ק"ד):` lacks its opening parenthesis. 7.5.6 `או נשוא זה או נשוא זה. יש בנושא
  זה` has a stray period inside the clause; the English smooths it.

## Chapter 8

Chapter 8 is the magenta family, the landscape of ICONS_REFERENCE §3 and §11: a floor whose glyph
names the *source* of a proof, and a house whose state is the *fate* of the statement. Sections 1 and
2 of the chapter are drawn; `METHODOLOGY.md` §13 lists what is not, and this chapter's notes say at
each verse whether a glyph exists or is only planned.

### 8.1.1–8.2.2 · Accept, deny, or remain in doubt

- **WIDGET.** The status machine. 8.2.2 gives three states and the two transitions into the outer
  two; 8.19.1 gives the transition back. These are the site's `accepted` / `rejected` / `doubt`
  (AGENTS.md, terminology: "doubt is the resting state, not a fallback (ch. 8 p. 112)"), and
  `METHODOLOGY.md` §12 says the state machine "is a widget". Build it here, with the state-of-play bar's
  own colours, and link the Sugyascade's bar back to 8.2.2.
- **UX.** The roadmap's third stop: "accepting or denying" is 2.16's third operation.

### 8.3.1–8.9.4 · The sources of proof

- **CHART.** The tree: proof (8.3.1) → from nature (8.4) → first intelligibles (8.5), sensibles (8.6);
  from convention (8.7) → commonly accepted opinions (8.8), received traditions (8.9); from syllogism
  (8.10) → the five kinds of chapter 7 (8.10.2). Put the five landscape glyphs on the leaves:
  `ground-axiom` (8.5.1), `ground-sense` (8.6.1), `ground-common-sense` (8.8.1), `ground-tradition`
  (8.9.1), `ground-deduction` (8.10.1). ICONS_REFERENCE §11a is this tree already.
- **VISUAL.** Explain the landscape once, at 8.3.1: the floor is the source, the glyph cut into it
  says which source, the house standing on the horizon is the statement established. Every later glyph
  in the chapter is a variation and reads itself once this is known.
- **SOURCE.** **Sukkah 40a** (8.6.2, wood's benefit comes after its burning), **Yevamot 40a** (8.9.3),
  **Sanhedrin 90a** with **Isaiah 60:21** (8.9.4). All in the index.
- **GUIDE.** 8.9.1 names, as received tradition, Scripture, the halachot given to Moses at Sinai and
  the thirteen hermeneutic principles "together with all their rules": one sentence on what the
  thirteen principles are, since chapter 7's `בנין אב` and `קל וחומר` are two of them. 8.5.2's "two is
  more than one" and 8.6.1's "a stone is hard" are the glyph captions in ICONS_REFERENCE §11a.
- **TERM.** `המשכלות הראשונות`, `המוחשות`, `המפרסמות`, `המקבלות`: the four are glossary roots, and
  the translator's Greek gloss on `מפרסמות`, "*endoxa*", deserves its own tooltip.
- **FIX.** 8.6.3 `וכל כל כיוצא בזה` for `וכן כל`.

### 8.10.1–8.10.7 · Proof from syllogism; the opposite's falsity; the priest's wife

- **VISUAL.** `via-opposite` (two houses on the horizon, the right one crossed) on 8.10.3–8.10.4, with
  the precondition `no-middle` restated in 8.10.4 ("provided they are not among those between which
  there is an intermediate"); ribbon to 4.6.
- **WIDGET.** 8.10.5–8.10.7 is a three-row Sugyascade: the statement (a priest's wife eats terumah),
  the received premise from the verse (the purchase of his money eats), the middle term (a wife is
  acquired with money), the conclusion. `classical-syllogism` on the proof edge, `ground-tradition`
  under it. ICONS_REFERENCE §12 lists **Yevamot 66a** as the attested fixture for exactly this.
- **SOURCE.** **Yevamot 66a** with **Leviticus 22:11**. The index entry also gives the rule this
  passage supplied to 4.7 and 4.8; ribbon.
- **FIX.** 8.10.3 `אם תבוא לנו. ראיה עליו` stray period. 8.10.7 `שאשת(!)`: the `(!)` is the
  transcriber's sic mark on a keying or print error for `שאשתו`, and must be rendered as such, not as
  text.

### 8.11.1–8.11.5 · A demonstration by hypothetical syllogism

- **VISUAL.** `hypothetical-syllogism-tollens` on the proof edge, `ground-tradition` beneath: the
  argument denies "the verse would have written it elsewhere" to deny "one is liable for one but not
  all". 8.11.5 says outright this is the hypothetical syllogism.
- **SOURCE.** **Horayot 9a** (`[ed.]` corrects the 1742's "ב'"); the index explains the sliding-scale
  offering (lamb, birds, flour by wealth) without which 8.11.1's "poverty" and "wealth" are opaque.
  GUIDE from it.

### 8.12.1–8.13.3 · Disproof from nature and from convention

- **CHART.** The same tree as 8.3–8.9, now for disproof: 8.12.1 says so. Reuse the tree with the
  house outlined and crossed.
- **SOURCE.** **Berachot 58b** (8.12.3; Shmuel, the comet and Orion: the index has the story, and it
  returns at 8.16.5 for the rebuttal), **Chagigah 4a** (8.13.2), **Bava Kamma 83b** with **Leviticus
  24:17–21** (8.13.3). All in the index.
- **GUIDE.** 8.13.2 quotes `חוץ מחרש שוטה וקטן`, which the reader met at 3.11.2 from Chullin; here it
  is the mishnah of Chagigah. Same words, different mishnah; the card should say so.
- **TERM.** `והא אנן תנן` "but we have learned", `והא כתיב` "but it is written", `והא קא חזינן` "but
  we see": the three disproof openers, one per source. Formula cards.
- **FIX.** 8.12.3 `כשלא הביאו ראיה` ("when they did *not* bring") for `כשהביאו` (English "when they
  brought").

### 8.14.1–8.14.11 · Disproof from syllogism

- **WIDGET.** Two chains, cut to their steps. The "actual death" chain (8.14.4–8.14.8): the
  explanation proposed; the disproof `לא סלקא דעתך`; its ground, the juxtaposition to "one who strikes
  an animal" (an analogism, 8.14.6, resting on a received tradition); the conclusion that the variant
  (money) stands and "death" falls of itself (8.14.8). The "giving" chain (8.14.9–8.14.11): the
  premise "every giving is money"; the reductio `אלא מעתה`; the well-known falsehood derived; the
  premise falls. Each as a short Sugyascade. The index entry for **Bava Kamma 83b** lays both out.
- **VISUAL.** 8.14.9–8.14.11 is the reductio. `METHODOLOGY.md` §12 and ICONS_REFERENCE §11b: no glyph
  of its own, by decision; use `hypothetical-syllogism-tollens` on the `contradiction` edge with
  `ground-deduction`. 8.14.11 states the tollens form in full, so the caption can quote it.
- **GUIDE.** 8.14.6: "subjects juxtaposed to one another in the verses are learned from one
  another" is the hermeneutic principle of `היקש` / `סמוכים`; one sentence, and note it is one of the
  "received traditions" of 8.9.1.
- **SOURCE.** **Bava Kamma 83b** and **84a**, with **Leviticus 24:17–21**; all in the index.
- **TERM.** `לא סלקא דעתך` and `אלא מעתה`: the two disproof formulae of this paragraph; `אלא מעתה`
  returns at 8.17.3. Formula cards.

### 8.15.1–8.15.3 · The dilemma (ממה נפשך)

- **VISUAL.** `dilemma` (the house crossed; one road forks and both branches end in a stop bar). It is
  the `disjunctive-syllogism` glyph with both branches blocked (`METHODOLOGY.md`, "same primitive, one
  step further"); say so.
- **SOURCE.** **Bava Kamma 29a** (the camel and the river bank; the index explains why either reading
  ends the dispute).
- **TERM.** `היכי דמי … אי … אי …` is the dilemma's shape; `ממה נפשך` its name. Formula cards.

### 8.16.1–8.16.6 · Rebutting a proof or a disproof

- **VISUAL.** `ground-does-not-reach` (the floor stops short of the horizon; the house stands over the
  gap) for 8.16.4 ("he is his brother in the commandments": the verse is real but does not exempt him)
  and 8.16.5 ("it is its glow that passes": the sense is real but does not disprove). ICONS_REFERENCE
  §12 lists both as the attested fixtures for this glyph. 8.16.6 (`משיח יוכיח`) is
  `fallacy-counterexample` from chapter 7.
- **CHART.** Three rows: what was rebutted (a proof from a verse; a disproof from sense; an a fortiori)
  → how (the source does not reach; the source does not reach; the syllogism fails) → glyph. 8.16.1
  and 8.16.2 are the two halves of that "how".
- **SOURCE.** **Bava Kamma 87a with 88a** and **Deuteronomy 25:11** (8.16.3–8.16.4; the `[ed.]` records
  1742's `אחים` for the verse's `אנשים … איש ואחיו`), **Berachot 58b** (8.16.5), the **Sifra** (8.16.6).
- **UX.** 8.16.5 and 8.12.3 quote the same exchange twice, once as disproof and once as its rebuttal;
  a ribbon between them shows the reader the move and the counter-move on one passage.

### 8.17.1–8.18.4 · Turning the difficulty back; turning the proof around

- **GAP, recorded.** No glyphs exist for these. `METHODOLOGY.md` §13 plans three, "Part 3, section
  3: the rebuttals": `rebuttal-your-reasoning` (ולטעמך · ולדידך, 8.17.2), `rebuttal-just-the-opposite`
  (אדרבא, 8.18.2), `rebuttal-proves-my-point` (משם ראיה · היא הנותנת, 8.18.2), and names the open
  design question (how to show the opponent's position in the landscape). These verses are the
  specification for that work; the interlinear page should render text chips until the glyphs exist.
- **GUIDE.** 8.17.1 is subtle: the difficulty turned back does not defeat the opponent, it forces
  *both* sides to adopt a distinction that saves both. 8.18.1 is the stronger move: the difficulty
  leaves our side entirely, or the opponent's proof becomes ours. A two-step figure (shared escape;
  reversal) beside the two verses.
- **SOURCE.** **Bava Kamma 88a** (8.17.3, the slave and the kingship, "from the choicest of your
  brothers"), **Bava Kamma 83b** (8.18.3, "we derive a man from a man"), **Shabbat 82a** with **Isaiah
  30:14** (8.18.4, the shard for fire or for water). All in the index.
- **TERM.** `ולטעמך`, `ולדידך`, `אדרבא`, `היא הנותנת`, `משם ראיה`: five formulae, all kept in the
  English at 8.17.2 and 8.18.2. These are among the most frequent words a learner meets on a page of
  Gemara; formula cards with the "what it announces" line.
- **FIX.** 8.18.2 `או:היא הנותנת",` garbled punctuation and quotes; 8.18.3 `השיבו: אדרבא. דנין …
  מבהמה".` missing opening quote and a stray period.

### 8.19.1 · Return to doubt

- **WIDGET.** The transition back in the status machine of 8.2 (see there). This verse is why the
  rail's `discharge` effect exists: a settled difficulty or a rebutted proof does not *reject*, it
  returns the statement to the resting state. Quote it in the Sugyascade's legend.

### 8.20.1–8.20.3 · Sevara (סברא)

- **VISUAL.** `theory` (the house leaning 14°) on 8.20.1. ICONS_REFERENCE §11b assigns it also to the
  "weak proof on the strength of a theory" of 9.13.4; ribbon forward.
- **GUIDE.** 8.20.2 defines sevara as a tilt when the arguments are balanced; 9.16.4 will use it as
  the thing that keeps a statement standing against a far-fetched opposition. Both uses in one
  glossary entry, and a note that `סברא` in 2.14.1 and 7.2.14 (`סברות`, "lines of reasoning") is the
  looser sense.
- **SOURCE.** **Chullin 19b** (the pinching of a bird offering; the index explains the two traditions).
- **TERM.** `מסתברא` "it stands to reason": formula card.
- **FIX.** 8.20.1 `מטה הדעת לא מן הצדדין` for `לאחד מן הצדדין` (English "to one of the sides"). 8.20.3
  has no closing quotation mark.

### 8.21.1–8.21.26 · Aspects; the four aspects; light and severe; potentiality and actuality

- **UX.** 26 verses; a mini-table-of-contents as for 6.3: 8.21.1 the rule · 8.21.5 the courtyard ·
  8.21.10 the four aspects (8.21.11 essence · 8.21.12 proprium · 8.21.14 accident · 8.21.16 relation) ·
  8.21.18 light and severe · 8.21.22 potentiality and actuality · 8.21.26 the close.
- **WIDGET.** The aspect selector (8.21.5–8.21.9): "The Temple courtyard is a public domain", with a
  switch between *impurity* and *Shabbat*; the statement is true under one and its derivation fails
  under the other. The same control serves the married woman at 8.21.19–8.21.21 (light in the aspect
  of release, severe in the aspect of punishment) and the priest at 8.21.22–8.21.25 (sprinkles in
  actuality, or fit to sprinkle).
- **CHART.** The four aspects (8.21.10–8.21.17) with the text's own examples: essence, the knife that
  cuts; proprium, the weasel that laps; accident, round or square; relation, similar or dissimilar,
  acting or acted upon. `METHODOLOGY.md` §13 records that these four "stay skipped" in the glyph set
  because `differs-in-context` covers what a learner needs; the chart is therefore the only place the
  four are ever shown, and the interlinear is where it belongs.
- **GAP, recorded.** Potentiality and actuality (8.21.22–8.21.25) are planned as two glyphs
  (`METHODOLOGY.md` §13, "Section 5: a hollow shape against a filled one"), not drawn. Text chips until
  then; FOR_AGENTS §6 "Modality — בכח / בפועל" already carries the distinction as data.
- **GUIDE.** 8.21.1's list, "the generating statements and the conclusions, the verifying and the
  verified, the disproved and the disproving", is the rule that every edge in the Sugyascade must join
  two statements taken *in the same aspect*. Say so; it is the reason `differs-in-context` exists as a
  test in chapter 4, and 8.21.7 ("a statement made according to one aspect you must not make into a
  premise for a conclusion in another aspect") is its clearest statement in the book.
- **TERM.** `בחינה` "aspect" is the word the whole site uses for "respect" (`differs-in-context`,
  "same respect"); the glossary should tie the three renderings (aspect, respect, context) to the one
  Hebrew word. The translator's "proprium" for `סגלה` needs a one-line gloss (a property that always
  accompanies a thing without being its essence).
- **SOURCE.** **Pesachim 19b** (8.21.5; `[ed.]` corrects "20"), **Mishnah Parah 9:3** (8.21.13; `[ed.]`
  corrects "3"), **Sifrei Bamidbar 7** (8.21.19; `[ed.]` notes 1742's `הקל` twice for `הקל … הקלה`),
  **Zevachim 99a** (8.21.23; `[ed.]` corrects "91"). All in the index; the Zevachim entry explains the
  priestly watch (`משמרה`) that 8.21.24–8.21.25 turn on.

### 8.22.1–8.24.5 · Agreement from the report, not the matter

- **GAP, recorded.** These are chapter 9's `objection` leaf (9.17), and `METHODOLOGY.md` §13 plans
  five glyphs for them, "Section 4: objections to form": `obvious` (פשיטא, 8.23.2), `might-have-thought`
  (סלקא דעתן, 8.23.3), `redundant-part`, `self-contradictory` (הא גופא קשיא, 8.24.3), `misordered`
  (תנא היכא קאי · ליערבינהו ולתנינהו · פתח בכד וסים בחבית, 8.24.5, "one icon, three text chips"). Not
  drawn. These verses are their specification.
- **CHART.** 8.22.3's two ways (the report as a whole; its parts) → 8.23 and 8.24 → the five formulae.
  A small tree, mirroring the proof tree above it.
- **WIDGET.** "It is obvious!" and its answer: show a mishnah clause, raise `פשיטא`, then reveal the
  contrary view it exists to exclude (`סלקא דעתן`). The pair is the most common exchange in the Gemara
  and the one a beginner most needs to recognise.
- **SOURCE.** **Berachot 2a** (8.24.5, `תנא היכא קאי`), **Gittin 80b** (8.24.5, `ליערבינהו ולתנינהו`;
  the `[ed.]` records that 1742 files it under Berachot 2), **Bava Kamma 27a** (8.24.5, the jug and the
  barrel). All in the index.
- **TERM.** `פשיטא`, `סלקא דעתך`, `הא גופא קשיא`, `תנא היכא קאי`, `ליערבינהו ולתנינהו`, `פתח בכד
  וסים בחבית`: six formulae, all kept in the English. Formula cards.
- **FIX.** 8.24.5 `(ברכות ב')::` doubled colon.

### 8.25.1–8.26.1 · Transition to the parts of the sugyot

- **UX.** 8.25.1 closes the "foundations" (chapters 2–8) and 8.26.1 opens the "structures" (chapter
  9). The roadmap's last major boundary; light it.

## Chapter 9

Chapter 9 is `taxonomy.ts` in prose. The seven elements (9.1.1), their nineteen leaves (9.3–9.5), and
one paragraph per leaf with definition, example and rule. Every construct is named by the text. The
notes for this chapter are therefore mostly about *joining* the two: the verse and the data row.

### 9.1.1–9.5.1 · The seven parts and their divisions

- **CHART / WIDGET.** The 7 → 19 tree, from `LEAVES` in `taxonomy.ts`, rendered from these verses:
  each node shows the text's Hebrew name (9.3.1–9.5.1), the site's English, the two-letter chip, and
  the `Effect` (`raise` / `reject` / `discharge` / `unsettle` / `open`). Clicking a leaf scrolls to its
  definition paragraph below. This is the same tree promised at 2.11 and drawn collapsed there; here
  it opens fully.
- **GUIDE, a gap in the text itself.** 9.4.3 lists three kinds of difficulty, but the chapter defines
  only two (9.17 objection, 9.18 apparent contradiction); `תיובתא` is never defined. `taxonomy.ts`
  records this as `UNDEFINED_IN_SOURCE` and notes the translator flags it. Say so at 9.4.3, and mark the
  refutation's row in the tree as "listed, not defined".
- **GUIDE.** Two naming variances inside the chapter: 9.5.1 `ישיבה` against 9.19.1 `הישוב`; 9.3.3
  `פשיטית` against 9.12.1 `הפשיטות`. One footnote each.
- **VISUAL.** The seven `ch9-moves` icons on 9.1.1, as at 2.2.1; ribbon between the two verses.

### 9.5.2–9.20.5 · The leaves, one by one

- **UX, the shape of every paragraph.** Definition (`… הוא – ש…`), example (`דרך משל`), rule
  (`ומשפטו`/`ומשפטה`). The verses are cut on those seams; style the three roles in the margin as for
  chapter 3's kinds. Where the rule is "like the rule of X" (9.12.3, 9.14.3), link to X.
- **WIDGET, per leaf.** Beside each definition verse, draw the leaf's own example as one or two rows
  of the waterfall with the right element icon and effect: 9.9.2 / 9.11.2 a query and its "yes"; 9.10.2
  / 9.12.2 a question of principle and its determination; 9.13.2 a demonstration raising a statement;
  9.14.2 a validation; 9.15.2 a direct contradiction rejecting; 9.16.2 `מאי לאו? — לא` as an opposition
  unsettling; 9.17.2–9.17.3 objections; 9.18.2–9.18.3 an apparent contradiction; 9.19.2 its settlement
  discharging; 9.20.3 an alternative unsettling. Nineteen tiny Sugyascades make the legend concrete.
- **CHART.** Beside each definition, the `LEAVES` row: `plain` gloss ("states a ruling", "asks which
  of two ways the law goes", …), chip, effect, Feldheim page. The `plain` line was written for a
  reader "meeting the system cold" and is the right one-line companion to Ramchal's definition.
- **GAP, recorded.** `METHODOLOGY.md` §13, "Part 4": eight leaves have distinct logical force and no
  glyph (פירוש דחוק 9.6.5, אוקימתא 9.6.7, הגדה 9.8, אבעיא 9.10, פשיטות 9.12, סייעתא 9.14, דחיה 9.16,
  שינויא 9.20); giving them glyphs "reverses the earlier 'leaf = text chip' ruling, so it needs
  Alexander's call". The interlinear page is where that call can be made with the definitions in view.

### 9.5.2–9.5.4 · The firsthand statement (שמועה)

- **SOURCE.** **Berachot 20b** once more (the `[ed.]` records that 1742 attributes Rav Adda bar Ahavah's
  words to R. Eliezer). The book's model statement, now as the model `statement/firsthand`; the
  recurrence ribbon's fourth stop (3.1.3, 3.6.4, 6.3.4, 9.5.3).
- **GUIDE.** 9.5.2 widens the leaf beyond halachah: "from the ethical teachings, or of whatever kind
  of intelligible it may be". A note, since the shipped passages are all halachic.

### 9.6.1–9.6.9 · The explanation: full, forced, rejected; the presumption

- **WIDGET.** The "how forced?" slider: 9.6.4 full (agrees completely), 9.6.5 forced (we must say the
  author "did not speak with precision"), 9.6.6 rejected. `taxonomy.ts` gives `explanation` the effect
  `open` and `forcedExplanation` `unsettle`, with the comment that this is "a reading, not a quotation":
  9.6.5 is the reading's source. Show the three positions and the effect each carries.
- **GUIDE.** 9.6.7–9.6.9 define the `אוקימתא` (`statement/presumption`, effect `unsettle`): the words
  are left as they are and the case is narrowed. This is the move most often mislabelled as an
  explanation; the text's own contrast (9.6.7 "we do not elucidate the report and its words at all")
  is the test. The two formulae `הכא במאי עסקינן` and `הא מני, ר' פלוני היא` are its markers.
- **SOURCE.** **Berachot 22a** (9.6.2; R. Yehoshua ben Levi and the morning immersers), **Berachot 26a**
  (9.6.9; the `[ed.]` notes the formula does not occur on 2a, where the 1742 places it), **Berachot 24b**
  (9.6.9, `לא שנו אלא`). All in the index.
- **TERM.** `הכי קאמר` "this is what he is saying" (9.6.2): the explanation's own marker; `לא שנו
  אלא` (9.6.9): a second presumption marker. Formula cards.
- **FIX.** 9.6.7 `נגמל המאמר` for `נגביל` ("we confine"). 9.6.9 has no closing quotation mark.

### 9.7.1–9.7.2 · The inference (דיוק)

- **SOURCE.** **Berachot 20b** again (the `[ed.]` records 1742's `רבא` for `רבינא`). Ribbon back to
  chapter 5, which 9.7.2 cites by name.
- **UX.** 9.7.2 could not be cut from its rule because the English joins them with an unspaced dash
  (`רבא]—and its rules`); the verse therefore carries example and rule together. Recorded under
  segmentation decisions.

### 9.8.1–9.8.3 · The report (הגדה)

- **GUIDE.** 9.8.1 defines the report as relating "what another felt, on his view, of the difficulties
  or of the resolutions": this is the chapter 10 idea of an *ascribed* move (`METHODOLOGY.md` §13 plans
  `ascribed-proof` and `ascribed-difficulty` for it), and 9.8.3's `תו קשיא ליה` is its model. Forward
  link to chapter 10 when it is cut.
- **SOURCE.** **Shabbat 19a** (9.8.2; the `[ed.]` records that the report there is R. Tzadok's, where
  1742 prints R. Yehoshua ben Levi), **Bava Kamma 83b** (9.8.3; the Tanna's "further difficulty").
- **FIX.** 9.8.2 `דרך משל. כשאמרו` stray period; 9.8.3 the quotation of `תו קשיא ליה` lacks its opening
  mark.

### 9.9.1–9.12.3 · Query, question of principle, answer, determination

- **CHART.** Two pairs, side by side: query (9.9) → answer (9.11); question of principle (9.10) →
  determination (9.12). 9.9.1 lists what a query may ask (is it so; place; time; reason) and 9.11.1
  the matching answers (yes or no; the reason). A two-column of question-type → answer-type.
- **SOURCE.** **Yevamot 102a** (9.9.2, 9.11.2), **Berachot 35a** (9.9.3), **Yevamot 112b** (9.9.4,
  9.11.2; its fourth appearance), **Yevamot 58b–59a** (9.10.2, 9.12.2). All in the index; the Yevamot
  58b entry explains why "betrothal or marriage" is a genuine two-sided question.
- **TERM.** `בעא מיניה` "asked him" (9.10.2) is the marker of a question of principle; `מאי שנא`
  "what is different" (9.9.4) of a query about a reason. Formula cards.

### 9.13.1–9.14.3 · Demonstration and validation

- **GUIDE.** 9.13.4 grades the demonstration: by necessity, "according to the laws of necessary proof",
  or by sevara, "not as strong". The `theory` glyph on the proof edge is for the second (ICONS
  REFERENCE §11b). 9.14 is the weaker cousin: a source that *agrees*, not one that *proves*; both carry
  `raise` in `taxonomy.ts`, and the gloss "cites a source that agrees" is the distinction.
- **SOURCE.** **Pesachim 16a** (9.13.2; `[ed.]` supplies the folio), **Yevamot 102b** (9.14.2, `תניא
  כותיה דרבא`). Both in the index.
- **TERM.** `תדע` "know it" (9.13.2), `מנא הני מילי` / `דתנו רבנן` (9.13.3), `תניא כותיה` (9.14.2):
  formula cards; `תניא כותיה` is the validation's own marker.
- **FIX.** 9.13.4 and 9.15.4 `שפיר` for `שפירשתי` ("that I explained"), twice.

### 9.15.1–9.16.4 · Direct contradiction and opposition

- **GUIDE.** The pair the rail's `Effect` was built to keep apart: 9.15 `reject` ("shows it to be
  annulled", "absolutely"), 9.16 `unsettle` ("deflects the necessity … does not deny its
  possibility", leaving the statement "doubtful and non-necessary", 9.16.3). Quote 9.16.3 in the
  legend; it is the definition of the site's `weakened` standing.
- **GUIDE.** 9.16.4 sets the floor for an opposition: what it proposes must "have a footing in the
  subject" and not be "far-fetched in the extreme", else the statement stands "by force of sevara".
  This is the `theory` glyph again, now on the `contradiction` edge for a `דחיה` (ICONS_REFERENCE
  §11b says exactly this). Ribbon to 8.20.
- **SOURCE.** **Pesachim 17b** (9.15.2). The index, from the Sefaria text, gives the reply to Rav Huna
  son of Rav Natan; the 1742 prints `אמר ליה רב אשי`, and the English follows the print. No `[ed.]`
  marks it; the card should.
- **TERM.** `מאי לאו` / `לא`, `ודלמא`, `אימא` (9.16.2): the three opposition markers, named as such by
  the text ("a sign of opposition"). Formula cards.

### 9.17.1–9.18.3 · Objection and apparent contradiction

- **GUIDE.** 9.17 is chapter 8's "report" section (8.22–8.24) as a leaf; ribbon both ways, and the
  planned "objections to form" glyphs apply here too. 9.18 is the move chapter 4 exists to dissolve;
  ribbon to 4.4's four conditions and to the `רמיא` edge that carries the relation tiles.
- **SOURCE.** **Yevamot 117b** (9.17.2, `היינו הך`), **Yevamot 118a** (9.17.3), **Yevamot 120b** (9.18.2;
  `[ed.]` corrects "121"), **Berachot 4a** with **Genesis 28:15 and 32:8** (9.18.3). All in the index.
- **TERM.** `מאי קא משמע לן` / `היינו הך` (9.17.2), `ולפלוג … ברישא` (9.17.3), `ורמינהי` / `… רמי`
  (9.18.2–9.18.3): formula cards; `ורמינהי` is the apparent contradiction's own marker.
- **FIX.** 9.18.2 has no closing quotation mark.

### 9.19.1–9.20.5 · Settlement and alternative

- **GUIDE.** 9.20.2 is the sentence `taxonomy.ts` quotes for the resolution pair: an alternative "is
  in truth similar to the opposition, except that the opposition is against a statement … while the
  alternative is an opposition against a difficulty". So `settlement` discharges (9.19.1, "which the
  answerer believes to be the truth") and `alternative` unsettles. Show the two effects beside the two
  definitions.
- **WIDGET.** The forcedness slider again (9.20.4–9.20.5): the more deficiency posited in the
  statement, the more forced the alternative, until "its words truly cannot bear it" and it gets no
  place. Pair with 9.6's slider; the two are one scale.
- **SOURCE.** **Berachot 4a** (9.19.2; the text's example is truncated to `סבר וכו'`, and the index
  gives the full settlement, "perhaps sin will cause it"), **Yevamot 104b** (9.20.3). Both in the index.
- **TERM.** `דחו ואמרו: לאו` (9.20.3) is the alternative in the act; formula card.

## Cross-cutting mechanisms

Things that would be built once and land on many verses.

- **Citation card (SOURCE).** Every citation in chapters 1–9 has a Sugya Context Index entry. The card:
  the 1742 citation as printed, the resolved locus (from the `[ed.]` or from the index), the entry's
  text, a Sefaria link. Fourteen citations in chapters 1–3 carry an `[ed.]` correction, seven more in
  4–6, fifteen more in 7–9; the
  correction itself is a fact worth showing, and the GUIDE that explains it is one paragraph: the 1742
  print cites the Bavli by folio, and cites the Mishnah by what appear to be the *leaf numbers of a
  printed Mishnah* rather than by chapter and mishnah (they climb through Seder Zera'im in order:
  Demai 12, 15, 17; Kilayim 31; Terumot 48; Ma'asrot 61), and several Bavli folios differ from the
  modern pagination (Berachot 4 for 15a, Sanhedrin 30 for 90a, Pesachim 4 for 9b).
  Citations in chapters 1–3, in order of appearance: Berachot 15a · Chullin 2a · Pesachim 4b (ch. 2);
  Berachot 20b · Sanhedrin 90a · Mishnah Nega'im 12:4 · Yevamot 84a · Pesachim 9b · Ketubot 75a (×2) ·
  Pesachim 113a · Exodus 12:16 · Chullin 2a · Yevamot 38a · Mishnah Demai 1:2 · Mishnah Demai 4:4 ·
  Sukkah 53a · Mishnah Kilayim 8:1 (×2) · Mishnah Terumot 1:7 · Mishnah Demai 6:1 · Mishnah Ma'aser
  Sheni 1:2 · Yevamot 112b · Mishnah Terumot 11:5 · Mishnah Ma'asrot 5:8 · Mishnah Demai 6:5 · Mishnah
  Ma'asrot 2:1 · Pesachim 7b (ch. 3).
  Chapters 4–6: Ketubot 36b · Pesachim 82b · Ketubot 57a · Yevamot 50a · Shabbat 57a (×2) · Eruvin
  102b · Rosh Hashanah 29b · Shabbat 124a · Shabbat 28b · Shabbat 76b · Yerushalmi Shabbat 13:3 ·
  Yevamot 66a (×3) (ch. 4); Leviticus 11:2 · II Samuel 23:1 with Moed Katan 16b · Shabbat 106a · Beitzah
  24a · Berachot 53a · Chagigah 15b (×2) · Bereshit Rabbah 51:3 · Pesachim 50b (ch. 5); Bava Kamma 117a ·
  Berachot 20b · Pesachim 9b · Exodus 12:16 · Chullin 2a · Mishnah Demai 1:2 · Sanhedrin 91a · I Kings
  18:21 · Yevamot 112b · Mishnah Ma'asrot 2:1 (ch. 6). In chapters 5 and 6 several citations are the
  translator's, in plain brackets, where the 1742 print names no source at all (Leviticus 11:2, II
  Samuel 23:1, Mishnah Shabbat 13:5, Bereshit Rabbah 51:3, Pesachim 50b); the card should say so.
  Chapters 7–9: Shabbat 73a with Sanhedrin 53a · Shabbat 70a · Shabbat 43b · Sifra, Dibbura de-Chovah
  parashah 5 (×3) · Keritot 26a · Horayot 10a · Pesachim 19a · Pesachim 5b · Bava Kamma 104a (ch. 7);
  Sukkah 40a · Yevamot 40a · Sanhedrin 90a with Isaiah 60:21 · Yevamot 66a with Leviticus 22:11 ·
  Horayot 9a · Berachot 58b (×2) · Chagigah 4a · Bava Kamma 83b (×3) with Leviticus 24:17–21 · Bava
  Kamma 84a · Bava Kamma 29a · Bava Kamma 87a with 88a and Deuteronomy 25:11 (×2) · Sifra (משיח יוכיח)
  · Shabbat 82a with Isaiah 30:14 · Chullin 19b · Pesachim 19b · Mishnah Parah 9:3 · Sifrei Bamidbar 7 ·
  Zevachim 99a · Berachot 2a · Gittin 80b · Bava Kamma 27a (ch. 8); Berachot 20b (×2) · Berachot 22a ·
  Berachot 26a · Berachot 24b · Shabbat 19a · Bava Kamma 83b · Yevamot 102a (×2) · Berachot 35a ·
  Yevamot 112b (×2) · Yevamot 58b–59a (×2) · Pesachim 16a · Yevamot 102b · Pesachim 17b · Yevamot 117b ·
  Yevamot 118a · Yevamot 120b · Berachot 4a (×2) with Genesis 28:15 · Yevamot 104b (ch. 9). In chapter 7
  the print cites neither the Shabbat premises nor R. Yose nor the moving-from-the-side case; the
  index supplies all three. Chapter 9's `[ed.]` brackets are mostly *attribution* corrections (R.
  Eliezer → Rav Adda bar Ahavah; Rava → Ravina; R. Yehoshua ben Levi → R. Tzadok), a kind the card
  should distinguish from a corrected folio.
- **Recurrence ribbon (SOURCE / UX).** Passages the author reuses, per the index: Berachot 20b (ch. 3,
  6, 9 ×2), Chullin 2a (ch. 2, 3, 6), Pesachim 7b (ch. 3, 10), Mishnah Demai 1:2 (ch. 3, 6), Mishnah
  Ma'asrot 2:1 (ch. 3, 6), Exodus 12:16 (ch. 3, 6), Yevamot 112b (ch. 3, 6, 9 ×2), Ketubot 75a (ch. 3
  ×2, 11), Sanhedrin 90a (ch. 3, 8), Pesachim 9b (ch. 3, 6). A small "also in ch. N, as …" ribbon on the
  example verse, with the role the passage plays each time (the index states it in its last sentence).
  From chapters 4–6 add: Shabbat 57a (ch. 4 ×2), Yevamot 66a (ch. 4 ×3, ch. 8), Chagigah 15b (ch. 5
  ×2), Berachot 53a (ch. 5), Bava Kamma 117a (ch. 6), and the seven chapter 3 ↔ chapter 6 pairs listed
  under 6.3, which are the densest recurrence in the book and the first to build.
  From chapters 7–9 add: Bava Kamma 83b (ch. 8 ×3, ch. 9; the book's single most-worked page, and
  chapter 10 returns to it), the Sifra on the suspensive guilt offering (ch. 7 ×3, ch. 8), Berachot
  58b (ch. 8 ×2, as disproof then as its rebuttal), Bava Kamma 87a–88a (ch. 8 ×2), Berachot 20b (ch. 9
  ×2, its fifth and sixth appearances), Yevamot 112b (ch. 9 ×2), Yevamot 102a (ch. 9 ×2), Berachot 4a
  (ch. 9 ×2, as apparent contradiction then as its settlement), Sanhedrin 90a (ch. 3, 8), Yevamot 66a
  (ch. 4, 8). The move-and-counter-move pairs (Berachot 58b, Berachot 4a) deserve a two-ended ribbon
  that names both roles.
- **Abbreviation expansion (TERM).** Hover expansions for the print's abbreviations: `ש"ס`, `ד"מ`
  (דרך משל), `ע"י`, `אעפ"י`, `ג"כ`, `אח"כ`, `בעה"ב` (בעולם הבא), `חש"ו`, `וכו'`, `ר'`, `ד'` (דף), `פ"ד`
  (פרק ד'), `א'` (אחד). Cheap, and it removes the single biggest barrier for a reader with some Hebrew
  and no yeshiva background.
- **Formula cards (TERM).** The English keeps Talmudic formulae in parentheses: `הוא מותיב לה והוא
  מפרק לה`, `דיעבד — אין, לכתחלה — לא`, `מבעי לה`, `לא זו אף זו`, `זו ואין צריך לומר זו`, `לא סגיא
  דלאו איהו מהל`, `מאי איכא למימר`, `אין הכי נמי`. A card that says what each *announces* in a sugya
  (not just what it means) is the bridge from this text to reading a page of Gemara. Chapters 4–6 add
  `אמרו דבר אחד`, `ואידי דתנן רישא … תנא סיפא נמי`, `בדין הוא`, `מכלל ד…` ("by implication").
  Chapters 7–9 add the bulk of the Gemara's working vocabulary, and the text itself names several as
  markers ("this is called…", "a sign of…"): `אינו דין`, `מה ל… שכן`, `… יוכיח`, `אי סלקא דעתך`, `שמע
  מינה`, `היכי דמי`, `מנא ידעינן` (ch. 7); `והא אנן תנן`, `והא כתיב`, `והא קא חזינן`, `לא סלקא דעתך`,
  `אלא מעתה`, `ממה נפשך`, `ולטעמך`, `ולדידך`, `אדרבא`, `היא הנותנת`, `משם ראיה`, `מסתברא`, `פשיטא`,
  `סלקא דעתך`, `הא גופא קשיא`, `תנא היכא קאי`, `ליערבינהו ולתנינהו`, `פתח בכד וסים בחבית` (ch. 8);
  `הכי קאמר`, `הכא במאי עסקינן`, `הא מני`, `לא שנו אלא`, `בעא מיניה`, `מאי שנא`, `תדע`, `מנא הני
  מילי`, `דתנו רבנן`, `תניא כותיה`, `מאי לאו`, `ודלמא`, `אימא`, `מאי קא משמע לן`, `היינו הך`,
  `ורמינהי` (ch. 9). Nearly fifty in all across the nine chapters. A formula card is therefore not a
  nicety; built once, it lands on well over a hundred verses, and it is the single component that
  turns this text into a reading aid for the Gemara itself.
- **Two bracket kinds (UX).** `[ed. …]` is editorial (a source reading, always cited); plain `[…]` is
  the translator's clarifying insertion (`[i.e., Kiddush]`, `[bardelas]`, `[the sweat]`, `[Once]`,
  `[ketubah]`, `[as a sharecropper]`, `[Exodus 12:16]` …). Render them differently, and let the reader
  hide the translator's insertions to see the bare rendering.
- **Transliteration hooks (TERM).** The English italicises a transliteration when it introduces a
  term: *meimra*, *sevarot*/*sevara*, *stam*, *me'ma'et*, *motzi*, *mugbal*, *talui*, *marbeh
  ha-inyanim*. Each is a glossary anchor; the glossary should also carry the terms the text names but
  the English does not transliterate (the other six parts of ch. 2; כולל / פרטי / קצתי / סתמי; מדמה;
  and the names of the four unnamed kinds, see 3.7).
- **Glyph placement (VISUAL).** Where a verse *names* a construct (every `ונקרא…` verse, and the
  defining verse where there is no name), place the glyph in the margin. The cut puts each naming
  clause in its own verse for exactly this reason. Keys, by verse: 1.2.1 `party-group` · 1.2.3
  `party-individual` · 1.3.3 `party-talmud` · 2.4.1–2.10.1 the seven `ch9-moves` · 3.1.4
  `statement-tile` · 3.4.1 `categorical` · 3.5.1 `particular` · 3.6.1 `partial` · 3.6.3 `unqualified` ·
  3.8.2 `simple` · 3.9.2–3.9.5 `qualified-certain` / `-possible` / `-doubtful` / `-impossible` · 3.10.3
  `exclusion` · 3.11.4 `exception` · 3.12.4 `conditional` · 3.13.3 `hypothetical` · 3.14.18 `compound`,
  3.14.14 `compound-not-only`, 3.14.15 `compound-needless`, 3.14.17 `disjunction` · 3.15.1 `preclusive` ·
  3.16.1 `discrepancy` · 3.17.5 `comparative` · 3.18.1 `consequent`.
  Chapters 4–6: 4.2.1 `equivalent` · 4.3.1 `variant`, `variant-subjects` · 4.4.3 the four tests
  (4.4.4 `differs-in-time` by the text's own word, see the discrepancy under 4.4; 4.4.5
  `differs-in-place`; 4.4.6 `homonym`) · 4.5.1 `diametrically-opposed`, `contradictory` · 4.6.3
  `no-middle`, `has-middle` · 4.7.5 `converse` · 4.7.7 `converse-limited` · 4.7.9 `contrapositive` ·
  4.8.1 `obverse` · 4.9.1 `incongruent` · 5.1.6 the wide inference pair · 5.3.2 `inference-loose` ·
  5.3.5 `inference-necessary` · 5.4.8 `absolute-opposite` · 6.2.4 `figurative`. These are asset keys
  (file names in `icons_v3/`), not display names.
  Chapters 7–9: 7.2.9 `syllogism`, `classical-syllogism` · 7.2.12–7.2.13 `fallacy-not-included` · 7.3.2
  `analogism` · 7.3.4 `a-fortiori` · 7.3.8 `fallacy-not-similar` · 7.3.9 `fallacy-not-greater` · 7.3.11
  `fallacy-counterexample` · 7.4.6 `hypothetical-syllogism`, `hypothetical-syllogism-tollens` · 7.5.6
  `disjunctive-syllogism` · 8.5.1 `ground-axiom` · 8.6.1 `ground-sense` · 8.8.1 `ground-common-sense` ·
  8.9.1 `ground-tradition` · 8.10.1 `ground-deduction` · 8.10.3 `via-opposite` · 8.15.3 `dilemma` ·
  8.16.4, 8.16.5 `ground-does-not-reach` · 8.20.1 `theory` · 9.1.1 the seven `ch9-moves`. Planned, not
  drawn (`METHODOLOGY.md` §13): 8.17.2, 8.18.2 the three rebuttals; 8.21.22 potential / actual;
  8.23.2–8.24.5 and 9.17 the five objections to form; 9.6.5, 9.6.7, 9.8, 9.10, 9.12, 9.14, 9.16, 9.20 the
  eight chapter 9 leaves awaiting a decision. Text chips there until then.
- **Bidi (UX).** Every English verse that quotes Hebrew needs the isolation `build-text-docs.ts`
  already applies (`wrapInlineHebrew`); the interlinear renderer must reuse it, not reimplement it.
  The Hebrew verses need `dir="rtl"` on the verse, not on a block, since the two languages now
  alternate every few lines.
- **Interlinear page controls (UX).** Per-verse anchors with copy-link (the IDs are made for it);
  a Hebrew / English / both toggle; a "flow" toggle that re-joins the verses of a paragraph into the
  parent's paragraph for continuous reading (the verse cuts are lossless, so this is exact); a sticky
  paragraph label (the `### N.P · label` text) so the reader always knows which kind or which part they
  are inside.

## Text artefacts found while cutting

To surface as footnotes. None is emended in the interlinear; the parent's principle that "the Hebrew
print and its translation stand as they were" is kept.

| Verse | As printed / keyed | Likely intended | Evidence |
|---|---|---|---|
| 2.9.1 | `שיראה היום במאמר` | `שיראה היות במאמר` | English "shows there to be"; sense |
| 3.1.2 | `שיקים או ישלם` | `שיקים או ישלל` | Parallel `או ישלל ממנו` in the same verse; English "negated" |
| 3.10.2 | `דרך משל: " מאמר הכתוב` | no stray `"` | Keying artefact |
| 3.12.3 | `כסף על כסף וכו,` | `וכו'` | Missing geresh |
| 3.13.2 / 3.13.5 | `למודם` / `למודים` | `למודים` (mishnah) | Same words quoted twice with different spelling |
| 3.19.9 | `(פסחים ד' ז':` | `(פסחים ד' ז'):` | Unclosed parenthesis |
| 3.19.12 | `מתוך כל המצות ההמה` | `מתוך כל המלות ההמה` | English "out of all those words"; sense |
| 3.19.13 | `מאי אכא למימר` | `מאי איכא למימר` | English gives `איכא`; standard formula |
| 4.2.1 | `בנושא אחר עצמו` | `בנושא אחד עצמו` | English "one and the same subject" |
| 4.2.3 | `ר”י` | `ר"י` | A closing curly quote keyed for the gershayim |
| 4.2.5 | `(פסחים מ"ה): ר"י בן ברוקא` | opening `“` before `ר"י` | The quotation has a closing mark and no opening one |
| 4.8.2 | `דרך משל: " כל האוכל` | no stray space | Keying artefact |
| 5.2.9 | `אף על פי שיהיה החיוב` | a counterfactual (`שאלו היה`) | English "for if"; the argument needs it |
| 5.3.5 | `שאי אפשר שנודע המאמר. ונכחיש` | `שנודה במאמר ונכחיש` | English "acknowledge the statement and deny"; stray period |
| 5.4.12 | `יש קדשים שיש להם פדיון` as the partial *negative* example | `יש קדשים שאין להם פדיון` | The parenthetical repeats the affirmative; two of three promised inferences follow |
| 6.2.3 | the whole verse | (dittography) | Repeats 6.2.2 and the opening of 6.2.4, on both sides of the parent |
| 6.3.11 | `צודקת,:חוץ מחרש שוטה וקטן"` | `צודקת, “חוץ מחרש שוטה וקטן”` | Punctuation and quotation garble |
| 6.3.13 | `אלו היה זה התנאי אמתי` | the condition *un*true | English supplies "[not]"; the argument needs it |
| 6.3.13 | `וכו''` | `וכו'` | Doubled geresh |
| 6.3.22 | `מיבם”"` | `מיבם”` | Doubled closing quote |
| ch. 6 | `–` (en dash) throughout | `—` as in chs. 1–5 | Keying inconsistency; treat as one mark |
| 7.4.4 | `כרבי עקיבא. היה נמשך` | `כרבי עקיבא, היה נמשך` | Stray period splits the clause |
| 7.5.4 | `בבא-קמא ק"ד):` | `(בבא-קמא ק"ד):` | Missing opening parenthesis |
| 7.5.6 | `או נשוא זה או נשוא זה. יש בנושא זה` | no period | Stray period inside the clause; English smooths |
| 8.6.3 | `וכל כל כיוצא בזה` | `וכן כל כיוצא בזה` | |
| 8.10.3 | `אם תבוא לנו. ראיה עליו` | `אם תבוא לנו ראיה עליו` | Stray period |
| 8.10.7 | `שאשת(!)` | `שאשתו`; `(!)` is the transcriber's sic mark | Render the mark as an editorial sign, not text |
| 8.12.3 | `כשלא הביאו ראיה` | `כשהביאו ראיה` | English "when they brought"; sense |
| 8.18.2 | `או:היא הנותנת",` | `או: “היא הנותנת”,` | Punctuation and quote garble |
| 8.18.3 | `השיבו: אדרבא. דנין … מבהמה".` | `השיבו: “אדרבא, דנין … מבהמה”.` | Missing opening quote; stray period |
| 8.20.1 | `מטה הדעת לא מן הצדדין` | `מטה הדעת לאחד מן הצדדין` | English "to one of the sides"; sense |
| 8.24.5 | `(ברכות ב')::` | `(ברכות ב'):` | Doubled colon |
| 9.6.7 | `נגמל המאמר` | `נגביל המאמר` | English "we confine"; sense |
| 9.8.2 | `דרך משל. כשאמרו` | `דרך משל, כשאמרו` | Stray period |
| 9.13.4, 9.15.4 | `שפיר` | `שפירשתי` | English "that I explained", twice |
| 9.15.2 | `אמר ליה רב אשי` | (attribution) | The index, from Sefaria, gives the reply to Rav Huna son of Rav Natan; no `[ed.]` marks it |
| chs. 7–9 | unmatched or mixed quotation marks | | 7.3.4, 7.3.8, 8.10.2, 8.10.5 (`בש”ס`), 8.13.2, 8.15.2, 8.20.3, 9.6.9, 9.8.3, 9.18.2: an opening or closing mark missing, or a curly closing quote keyed for gershayim |

Also recorded, not artefacts: 3.9.2 prints `חלדה או ברדלס` where the Gemara has `וברדלס` (the index
entry translates "a marten *and* a polecat"); and the `[ed.]` brackets at 2.12.4, 2.12.7, 3.4.2, 3.9.2,
3.12.3, 3.13.2, 3.14.3, 3.14.4, 3.14.6, 3.14.11, 3.15.2, 3.16.2, 3.17.2, 3.18.2, in chapters 4–6 at
4.2.3, 4.2.5, 4.7.2, 5.3.3, 6.3.13, 6.3.17, 6.3.22, and in chapters 7–9 at 7.5.2, 8.11.1, 8.12.3, 8.16.3,
8.21.5, 8.21.13, 8.21.19, 8.21.23, 8.24.5, 9.5.3, 9.6.9, 9.7.2, 9.8.2, 9.13.2, 9.18.2, each record a
citation, wording or attribution that differs from the source.

## Segmentation decisions worth remembering

- **Example and gloss are always two verses** (e.g. 3.4.2 / 3.4.3; 3.11.2 / 3.11.3; 3.14.6 / 3.14.7).
  The example is where a SOURCE attaches; the gloss is where a GUIDE attaches. Merging them would force
  both onto one span.
- **Naming clauses are their own verses** (3.8.2, 3.10.3, 3.11.4, 3.12.4, 3.13.3, 3.17.5, 3.14.18) so
  a glyph has a one-line span to sit beside. Where the text names nothing (kinds 2, 8, 9, 11), the
  glyph goes on the defining verse and the chart row shows where the name comes from (see 3.7).
- **3.14 is cut to its tree.** Each node of the compound tree is one verse (3.14.1, .2, .8, .9, .10,
  .13, .14, .15, .16, .18), so the tree diagram can link node → verse.
- **3.19.10 and 3.19.11 are separate** although one sentence: *form* ("brief, rhetorical") against
  *intent* ("the intent in it is") is the point of the paragraph, and the walkthrough widget steps on
  that seam.
- **2.2.1 and 3.3.1 are single verses** although lists: the items are defined one per paragraph
  immediately after, and those are where per-item attachments go.
- **The `[ed.]` bracket travels with the example verse** (3.14.11, 3.18.2, 3.13.2 …), never with the
  gloss, because it is a statement about the quoted words.
- **The coarser-boundary rule was needed at 1.2.1–1.2.4 and 1.3.4.** In 1.2 the English uses paired
  dashes where the Hebrew uses `פרוש` and a comma; the cut falls at the Hebrew's `פרוש`, and the
  English side begins its verse with "that is," so both sides open on the same word. In 1.3.4 the
  Hebrew runs on through `והינו —` with a comma into `ואולם`, while the English closes the sentence
  at "his difficulty."; the verse therefore keeps the formula and its gloss together and ends where
  the English ends.
- **6.3 is cut by kind, then by definition / example** (6.3.3 / 6.3.4, 6.3.5 / 6.3.6, …), so the
  truth-condition table can point at a definition verse and the "which part fails?" widget at an
  example verse. The hypothetical's four cases each have their own verse (6.3.15 the rule, 6.3.16 and
  6.3.17–6.3.18 the two "false parts, true statement" cases, 6.3.19 the converse rule, 6.3.20 Moses
  and Saul), because the two-by-two widget needs to light one at a time.
- **The dittography at 6.2.3 is isolated in its own verse** rather than merged into 6.2.2 or 6.2.4,
  so a renderer can fold it with a footnote and the "flow" toggle still reproduces the parent exactly.
- **5.4 is cut one inference per verse** (5.4.3, 5.4.4; 5.4.6; 5.4.8, 5.4.9, 5.4.10), each ending on
  its name, so the generator widget has one verse per row of its table.
- **4.7 is cut one "way" per verse pair** (rule, then example: 4.7.5 / 4.7.6, 4.7.7 / 4.7.8, 4.7.9 /
  4.7.10), matching the three rows of the chart under 4.7.
- **A shared dash closes both sides at 4.5.7 and 5.3.3.** Where Hebrew and English both break a
  sentence with `—` at the same point, the dash ends the first verse on both sides rather than opening
  the second, so no verse begins with a dash. In 5.3.3 the Hebrew's `”. —` therefore sits at the end
  of the verse. The same rule puts a trailing `–` on the Hebrew of 7.3.9, 7.4.3, 9.11.2, 9.12.2 and
  9.14.2, where the print has a dash after a closing quotation mark and the English has none.
- **Cuts fall only where both sides have a space at the seam.** Re-joining a paragraph's verses with
  single spaces must reproduce the parent exactly, so a seam with no whitespace in the original cannot
  be cut. Chapter 9's English uses unspaced em dashes (`heart"—"Rava said`, `רבא]—and its rules`),
  which is why 9.7.2 carries the inference's example and its rule in one verse where every other leaf
  has them apart.
- **8.14 is cut into its two chains** (8.14.4–8.14.8 "actual death"; 8.14.9–8.14.11 "giving"), each
  step a verse, so the two Sugyascades the notes propose have one verse per row.
- **8.21 is cut by aspect** (8.21.11, .12, .14, .16 the four definitions, each followed by its
  example), and 8.21.22–8.21.25 by the four moves of the Zevachim exchange (statement, difficulty,
  resolution, gloss), so the potential/actual widget has a verse per move.
- **Chapter 9 is cut definition / example / rule** for every leaf (e.g. 9.13.1 / 9.13.2–9.13.3 /
  9.13.4), and the four division sentences of 9.3–9.5 are one verse per element, so the 7 → 19 tree can
  link each node to the verse that lists its leaves.
- **9.5 keeps the print's odd paragraphing.** The parent joins the resolution's division (9.5.1) and
  the first leaf's definition (9.5.2) in one paragraph; the interlinear keeps that paragraph and lets
  the label say what it holds.
