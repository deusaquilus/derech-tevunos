# Interlinear notes: where chapters 1–3 most benefit from guides, sources, visuals and widgets

Companion to `DerechTevunos_benyehudah_bilingual_fixed_interlinear.md`. Every entry is keyed to a verse
ID there (`chapter.paragraph.verse`), so each proposal names the exact span it would attach to. Written
while cutting the verses, chapter by chapter; chapters 4–11 will be appended as they are cut.

The notes point at what the repository already has, so that the interactive layer is assembled rather
than invented:

| Asset | Where | What it gives chapters 1–3 |
|---|---|---|
| The glyph set | `icons_v3/icons/ch1-3/` (24), `icons_v3/icons/ch9-moves/` (7); contract in `icons_v3/ICONS_REFERENCE.md` §4–6 | One icon per speaker setting (ch. 1), per move (ch. 2), per quantity and per kind of statement (ch. 3) |
| Sugya Context Index | Appendix of the parent file, `## Sugya Context Index` | A written entry, from the Sefaria text, for **every** passage chapters 1–3 cite. Nothing needs to be researched; it needs to be surfaced |
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

- **CHART.** The master table for the chapter, one row per kind: number · the text's name where it
  gives one (kinds 1, 3, 4, 5, 6, 7, 10), otherwise the text's own describing phrase (kind 2 "qualified
  and limited", kind 11 "consequent upon another", kinds 8 and 9 the defining verse, marked "the text
  gives no name") · marker word · glyph key · intention count from chapter 6 · example verse · source.
  FOR_AGENTS §0 B is this table already; join on the verse IDs and render it. Sticky while the reader
  scrolls 3.8–3.18, with the current kind lit.
- **Naming rule for the whole page.** A displayed name must follow directly from the text. The site's
  code keys `qualified-*`, `preclusive`, `discrepancy`, `consequent`, `disjunction` are identifiers for
  glyph files and taxonomy rows and stay in the code; they are shown to a reader only where the text
  itself supplies the word (`qualified`, from 3.9.1's "qualified and limited"; `consequent`, from
  נמשך at 3.13.4 and 3.18.1). `preclusive`, `discrepancy` and `disjunction` are never shown as names.
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
- **GUIDE.** The kind is never *named* in the text; the site calls it "qualified". Say so on the
  chart row, and note that `מגבל` in 3.9.1 collides with kind 5's name (3.12.4), which is why
  ICONS_REFERENCE rule 4 keys on English.

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

- **GUIDE.** The text gives this kind **no name**. The site's key is `preclusive` (FOR_AGENTS §0 B
  row 8; ICONS_REFERENCE §6b "no Hebrew name"). Say on the chart row that the name is the site's.
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
- **GUIDE.** The text gives this kind no name; "consequent" is the site's, from `נמשך` in 3.18.1.
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

## Cross-cutting mechanisms

Things that would be built once and land on many verses.

- **Citation card (SOURCE).** Every citation in chapters 1–3 has a Sugya Context Index entry. The card:
  the 1742 citation as printed, the resolved locus (from the `[ed.]` or from the index), the entry's
  text, a Sefaria link. Fourteen citations in these chapters carry an `[ed.]` correction; the
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
- **Recurrence ribbon (SOURCE / UX).** Passages the author reuses, per the index: Berachot 20b (ch. 3,
  6, 9 ×2), Chullin 2a (ch. 2, 3, 6), Pesachim 7b (ch. 3, 10), Mishnah Demai 1:2 (ch. 3, 6), Mishnah
  Ma'asrot 2:1 (ch. 3, 6), Exodus 12:16 (ch. 3, 6), Yevamot 112b (ch. 3, 6, 9 ×2), Ketubot 75a (ch. 3
  ×2, 11), Sanhedrin 90a (ch. 3, 8), Pesachim 9b (ch. 3, 6). A small "also in ch. N, as …" ribbon on the
  example verse, with the role the passage plays each time (the index states it in its last sentence).
- **Abbreviation expansion (TERM).** Hover expansions for the print's abbreviations: `ש"ס`, `ד"מ`
  (דרך משל), `ע"י`, `אעפ"י`, `ג"כ`, `אח"כ`, `בעה"ב` (בעולם הבא), `חש"ו`, `וכו'`, `ר'`, `ד'` (דף), `פ"ד`
  (פרק ד'), `א'` (אחד). Cheap, and it removes the single biggest barrier for a reader with some Hebrew
  and no yeshiva background.
- **Formula cards (TERM).** The English keeps Talmudic formulae in parentheses: `הוא מותיב לה והוא
  מפרק לה`, `דיעבד — אין, לכתחלה — לא`, `מבעי לה`, `לא זו אף זו`, `זו ואין צריך לומר זו`, `לא סגיא
  דלאו איהו מהל`, `מאי איכא למימר`, `אין הכי נמי`. A card that says what each *announces* in a sugya
  (not just what it means) is the bridge from this text to reading a page of Gemara.
- **Two bracket kinds (UX).** `[ed. …]` is editorial (a source reading, always cited); plain `[…]` is
  the translator's clarifying insertion (`[i.e., Kiddush]`, `[bardelas]`, `[the sweat]`, `[Once]`,
  `[ketubah]`, `[as a sharecropper]`, `[Exodus 12:16]` …). Render them differently, and let the reader
  hide the translator's insertions to see the bare rendering.
- **Transliteration hooks (TERM).** The English italicises a transliteration when it introduces a
  term: *meimra*, *sevarot*/*sevara*, *stam*, *me'ma'et*, *motzi*, *mugbal*, *talui*, *marbeh
  ha-inyanim*. Each is a glossary anchor; the glossary should also carry the terms the text names but
  the English does not transliterate (the other six parts of ch. 2; כולל / פרטי / קצתי / סתמי; מדמה;
  and the site's own names for the four unnamed kinds).
- **Glyph placement (VISUAL).** Where a verse *names* a construct (every `ונקרא…` verse, and the
  defining verse where there is no name), place the glyph in the margin. The cut puts each naming
  clause in its own verse for exactly this reason. Keys, by verse: 1.2.1 `party-group` · 1.2.3
  `party-individual` · 1.3.3 `party-talmud` · 2.4.1–2.10.1 the seven `ch9-moves` · 3.1.4
  `statement-tile` · 3.4.1 `categorical` · 3.5.1 `particular` · 3.6.1 `partial` · 3.6.3 `unqualified` ·
  3.8.2 `simple` · 3.9.2–3.9.5 `qualified-certain` / `-possible` / `-doubtful` / `-impossible` · 3.10.3
  `exclusion` · 3.11.4 `exception` · 3.12.4 `conditional` · 3.13.3 `hypothetical` · 3.14.18 `compound`,
  3.14.14 `compound-not-only`, 3.14.15 `compound-needless`, 3.14.17 `disjunction` · 3.15.1 `preclusive` ·
  3.16.1 `discrepancy` · 3.17.5 `comparative` · 3.18.1 `consequent`.
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

Also recorded, not artefacts: 3.9.2 prints `חלדה או ברדלס` where the Gemara has `וברדלס` (the index
entry translates "a marten *and* a polecat"); and the `[ed.]` brackets at 2.12.4, 2.12.7, 3.4.2, 3.9.2,
3.12.3, 3.13.2, 3.14.3, 3.14.4, 3.14.6, 3.14.11, 3.15.2, 3.16.2, 3.17.2, 3.18.2 each record a citation
or wording that differs from the source.

## Segmentation decisions worth remembering

- **Example and gloss are always two verses** (e.g. 3.4.2 / 3.4.3; 3.11.2 / 3.11.3; 3.14.6 / 3.14.7).
  The example is where a SOURCE attaches; the gloss is where a GUIDE attaches. Merging them would force
  both onto one span.
- **Naming clauses are their own verses** (3.8.2, 3.10.3, 3.11.4, 3.12.4, 3.13.3, 3.17.5, 3.14.18) so
  a glyph has a one-line span to sit beside. Where the text names nothing (kinds 2, 8, 9, 11), the
  glyph goes on the defining verse and the chart row says the name is the site's.
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
