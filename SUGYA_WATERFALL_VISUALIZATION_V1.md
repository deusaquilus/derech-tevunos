# Sugya Waterfall Visualization — v1

**A build guide and methodology.** This document exists so that a future agent can
extend this visualization, rebuild it for another text, or design a sibling
visualization without rediscovering the reasoning from scratch.

The artifact it describes lives in `viz/`. It takes a short passage of Talmud,
labels every sentence with the move that sentence makes according to the
Ramchal's *Derech Tevunos* chapter 9, and draws the result as a lattice you
unfold one sentence at a time with a slider.

Read Part I before changing anything about the taxonomy, and Part VIII before
debugging anything.

> **`SUGYA_WATERFALL_AT_SCALE_V2.md` is the companion to this document.** It
> records what broke when the same design was pointed at a fifty-seven sentence
> sugya, including two bugs in the model below that a four-sentence passage
> cannot expose, and it weakens one of the rules in Part III.3. Several of the
> limits listed in Part IX turned out to be live faults rather than acceptable
> simplifications. **`SUGYA_WATERFALL_V3_RAIL.md`** follows it: how a move that
> acts on something forty-six sentences above it is drawn pointing there, by
> folding what lies between and drawing one rail across the fold.

---

## 0. Orientation

### What problem this solves

A sugya is an argument, but it is printed as a wall of text with no typography
for its logical structure. A reader who does not already know the moves cannot
see which sentence is proving, which is objecting, and which is conceding. Worse,
a finished sugya shows only its final verdicts — the movement of the argument,
which is the thing actually worth seeing, has already happened and left no trace.

This visualization addresses both. It labels each sentence with a pictograph, and
it lets you replay the argument's movement by revealing it a sentence at a time.

### What it deliberately does not do

There is a sibling document, `derech-tevunos-visualization-spec.md`, which
specifies seven visualizations that *compute* something: concept lattices,
circumscription closures, dependency violations. Those are ambitious and were
set aside on purpose.

This one only *names*. It assigns each sentence a label from a closed vocabulary
and draws how the labels relate. Every ambition beyond that was cut, and the cuts
are why it works. If you are tempted to add inference, ask first whether the
result would still be checkable against the book.

### Repository map

```
  derech-tevunos-visualization-spec.md   the ambitious sibling spec
  SUGYA_WATERFALL_VISUALIZATION_V1.md    this document
  SUGYA_WATERFALL_AT_SCALE_V2.md         what breaks on a long sugya, and why
  SUGYA_WATERFALL_V3_RAIL.md             the rail: folding in place, drawing the long relation
  viz/
    src/
      taxonomy.ts     elements, leaves, icons, effects      — from the book
      markers.ts      Aramaic trigger lexicon               — from the book
      sugya.ts        data model + the status/standing reducer
      verdict.ts      which of status/standing to report, and in what words
      icons.ts        icon geometry as data
      layout.ts       indent per depth, connector elbows, edge styles, the rail's lane
      folding.ts      reach, landing, fold range, focus — what the rail joins (v3)
      theme.ts        the palette
      render.ts       static SVG exporter
      check.ts        acceptance tests
      main.ts         CLI entry for the exporter
      fixtures/       hand-labelled passages + the registry
      app/            the React app
    out/              generated SVGs
```

### Commands

```
npm install
npm run dev       React app on http://localhost:5174
npm run check     typecheck + acceptance tests
npm run export    writes out/*.svg and out/index.html
npm run build     production bundle into dist/
```

---

## Part I — Methodology: deriving a visual language from a text

This is the transferable part. Everything else is implementation.

### I.1 The governing constraint

**The source text fixes the vocabulary. The implementation may not invent
categories, and where it must interpret, it says so in the artifact.**

This single rule produced nearly every good property the project has. It is what
makes the output checkable, what keeps the taxonomy small, and what stops the
work drifting into "a diagram of what the agent thinks the argument is doing."

Three corollaries, each load-bearing:

1. **A closed enum, not open extraction.** Chapter 9 prints its full inventory —
   seven principal elements, nineteen leaf types, listed in the chapter outline
   at p253. Classification is therefore assignment into a known set. That is a
   far easier and far more reliable task than open-ended semantic analysis, and
   it means a wrong label is *detectably* wrong.
2. **Every claim carries a page.** `LEAVES` cites the page where each leaf is
   defined; `MARKERS` cites the page where each Aramaic phrase is given. A reader
   can check any one of them in under a minute. So can a future agent that
   suspects an error.
3. **Gaps are recorded, not filled.** Where the book is silent, the code says so
   rather than supplying a plausible answer.

### I.2 Choosing the layer of the book

*Derech Tevunos* has eleven chapters. Only chapter 9 was used. This was not
laziness; it was the central design decision, and the reasoning generalizes.

Chapter 9 opens `הנה חלקי הסוגיות בכלל כבר זכרנום` — "the parts of the sugyos we
have already mentioned." **Decomposing a sugya into labelled parts is the stated
purpose of the chapter.** The taxonomy therefore needs no adaptation to the task;
the author already did the work for exactly this use.

Chapters 3–8 are about something else: the internal structure and truth
conditions of an individual statement. They matter enormously for *reasoning
about* a sugya, but not for saying what each sentence is *doing* in it. Pulling
them in would have meant merging two incompatible levels of description.

> **Transferable rule.** Before modelling a text, find the place where the author
> is doing the same job you are. Use that layer and only that layer. If the
> author never does your job anywhere, reconsider the job.

Chapter 8 does contribute two specific things, both narrow and both cited:
`Provenance` (pp112–140, which kinds of premise arrive already authoritative) and
the doctrine that doubt is a resting state (p112). These were taken because the
reducer cannot work without them, not because chapter 8 seemed generally useful.

### I.3 Reading the source text

The source is a facing-page bilingual edition. Its structure matters:

- **Even pages are English, odd pages are Hebrew, and they face each other.**
  English p174 and Hebrew p175 are the same content in two languages.
- Chapter 9 runs pp161–188. The chapter outlines at pp249–254 contain the
  complete enumerated inventory and are the fastest way to see the shape of a
  chapter before reading it.

This is why `LEAVES` cites even page numbers and `MARKERS` cites odd ones: leaf
definitions were taken from the English column, Aramaic trigger phrases from the
Hebrew. When you add an entry, cite the column you actually read.

### I.4 The finding that made it tractable

**The Talmud largely labels its own moves, and Ramchal says so.**

Repeatedly through chapter 9 he identifies a leaf type not by its content but by
the stock Aramaic phrase that introduces it:

> `וכן כששאלו "מנא הני מלי?" והשיבו: "דתנו רבנן"` — a demonstration is indicated (Heb p175)

> `כשאמרו: "הא גופא קשיא!"` — an objection (Heb p179)

> `כשאמרו: "מאי לאו?" השיבו: "לאו!" וכן כשיאמרו: "ודלמא?" "ואימא?" הנה הוא סימן דחיה` (Heb p177–179)

This collapses most of the classification problem from semantic analysis into
lexicon lookup. `markers.ts` collects twenty-one such phrases, each quoted from
the Hebrew column with its page.

> **Transferable rule.** Look for places where the source text tells you how to
> recognize its own categories. A corpus that self-labels turns a hard inference
> problem into an easy matching problem. Finding this is worth hours of reading.

Where no marker matches, the sentence stays unlabelled rather than guessed.
`unmarkedLeaves()` exists to report which leaf types have no stock phrase at all
and therefore always need a human.

### I.5 Attestation

Each unit carries `attested: boolean`.

- `attested: true` — Ramchal himself assigns this label to this sentence.
- `attested: false` — the label is ours, inferred by rule.

Inferred labels render as "inferred" in the diagram. Currently exactly one unit
is inferred: Rav Papa in the Pesachim thread, where Ramchal labels only Rav
Huna's reply, and we applied his rule from Heb p185 that a `דחיה` may land on a
proof and not only on a statement. The reasoning is recorded in the fixture's
`note` field.

This distinction is what lets the fixtures double as a test suite. An attested
label is ground truth; an inferred one is a hypothesis the reader can reject
without discarding the diagram.

### I.6 Recording gaps

`תיובתא` is announced at p180 and never defined. The translator flags the gap
in-line at p184. Rather than assign it a plausible effect silently, the code:

- gives it the placeholder effect `unsettle`,
- lists it in `UNDEFINED_IN_SOURCE`,
- renders it with the annotation "undefined in source",
- and says so in a comment at the definition site.

Similarly, the two columns disagree on a citation — the Pesachim passage is
`פסחים יח ב` in the Hebrew and "17b" in the English. Both are recorded in the
fixture's `folio` field rather than resolved.

> **Transferable rule.** When a source is silent or self-contradictory, make the
> silence visible in the output. A diagram that quietly papers over a gap is
> worse than one that shows it, because it cannot be corrected.

---

## Part II — The domain model

### II.1 Moves as a discriminated union

```ts
export type Move =
  | { readonly element: "statement"; readonly subtype: "firsthand" | "explanation" | ... }
  | { readonly element: "question"; readonly subtype: "query" | "principle" }
  | ...
```

Seven variants, one per principal element, each with its own subtype union. This
shape is doing real work:

- **Illegal combinations are unrepresentable.** There is no way to write
  `{ element: "question", subtype: "settlement" }`.
- **`MoveKey` is derived, not declared.** A mapped type produces
  `"statement/firsthand" | "question/query" | ...` from the union itself, so
  `LEAVES` is a `Record<MoveKey, LeafInfo>` that the compiler forces you to keep
  exhaustive. Add a subtype and the build fails until you describe it.
- **Every switch on `Effect`, `Standing`, `Status`, or `Icon` ends in a
  `const exhaustive: never = x` default.** Widening any of those unions produces
  compile errors at precisely the sites that need a decision.

This is the project's main defence against the taxonomy and the renderers
drifting apart. Preserve it.

### II.2 Effects

```ts
export type Effect = "raise" | "reject" | "discharge" | "unsettle" | "open";
```

What a landed move does to the thing it lands on:

| Effect | Meaning | Example leaves |
|---|---|---|
| `open` | acts on nothing; introduces material | `שמועה`, `שאלה`, `דיוק` |
| `raise` | supports its target | `הוכחה`, `סיעתא` |
| `reject` | marks its target false | `סתירה` |
| `discharge` | closes its target without refuting it | `תשובה`, `פשיטות`, `ישוב` |
| `unsettle` | undermines without deciding | `דחיה`, `פרכא`, `רמיא`, `שנוי` |

`discharge` was added late and is the subtle one. Answering a question does not
prove the question false; settling a difficulty does not refute the difficulty.
Both stop it exerting force, which is a third thing distinct from both support
and refutation. See Part VIII.1 for the bug that forced this out into the open.

### II.3 The distinction that organizes everything: status vs standing

**A claim has a status. A move has standing. Conflating them destroys the
distinction the taxonomy exists to draw.**

```ts
export type Status   = "accepted" | "doubt" | "rejected";                 // claims
export type Standing = "live" | "weakened" | "discharged" | "defeated";   // moves
```

`Status` is about truth: is this proposition accepted? Doubt is the resting
state, per Ch8 p112 — not a fallback for "we couldn't decide", but the condition
a claim is genuinely in before anything establishes it.

`Standing` is about force: can this move still do its work? A weakened move still
acts, but at reduced strength. A `discharged` and a `defeated` move are both
spent, and the difference between them is exactly the difference between having
been answered and having been refuted.

Every renderer must respect this. `verdict.ts` is the single place that decides
which one to report for a given unit, and it exists so no renderer can get it
wrong independently:

```ts
unit.move.element === "statement" ? statusVerdict(...) : standingVerdict(...)
```

The user-facing words differ accordingly: claims read "accepted / in doubt /
rejected"; moves read "stands / weakened / answered / refuted".

### II.4 The reducer

`analyze(sugya)` is the whole of the logic. Its shape:

1. **`validate`** — every `target` must name an earlier unit. This single
   constraint rules out cycles by construction and makes the reverse pass
   well-founded. It is also, unexpectedly, what makes the reveal slider possible
   (Part III).
2. **`computeDepth`** — depth is parent depth + 1, forward pass. Depth drives
   horizontal indent.
3. **`baseStatus`** — a unit whose `provenance` is self-authorising (`sense`,
   `axiom`, `endoxa`, `tradition`, per Ch8 pp112–140) starts `accepted`.
   Everything else starts in `doubt`.
4. **Reverse pass** — iterate units last to first. Every unit acting on `unit`
   sits later in the sequence and is therefore already resolved, so its standing
   is known when we need it. Fold all incoming attackers over `reduceStanding`
   and `reduceStatus`.
5. **`contested`** — the set of units something later acts upon. Only contested
   units get a verdict badge; a sentence nothing has responded to yet correctly
   shows nothing.

The force rule is in one place and is the heart of the model:

```ts
const exertsForce = (standing: Standing): boolean =>
  standing === "live" || standing === "weakened";
```

A spent move delivers nothing. A weakened move delivers a reduced version of its
effect. A live move delivers it in full.

### II.5 What falls out for free

These were not special-cased. They are consequences of the above, which is the
main evidence that the model is right:

- **Rebutting a proof yields doubt, not rejection.** An undermined proof is
  `weakened`; a weakened move pushes its target to `doubt` but no further. So
  knocking down an argument for P does not establish not-P. (Ch8 p142, Ch9 p178.)
- **A refuted objection restores what it attacked.** If Rav Papa's `דחיה` is
  itself `defeated`, it stops exerting force, and the proof it attacked returns
  to `live` — so the original ruling is `accepted` again.
- **`ישוב` and `שנוי` come apart correctly.** Ramchal fixes this exactly at
  Heb p185: a `שנוי` "is truly a `דחיה`, except that a `דחיה` falls on a statement
  or a proof and a `שנוי` falls on a difficulty." So a settlement `discharge`s the
  difficulty and the original claim recovers, while an alternative merely
  `unsettle`s it and the claim stays possible. Berachos 4a ends `accepted`;
  Yebamos 104b ends in `doubt`; they differ only in which resolution closes them.
- **Acceptance is non-monotonic.** Adding a sentence can move a claim from
  accepted to doubt and back. Part III turns this into the central interaction.

---

## Part III — The interaction: a prefix is a sugya

### III.1 The problem

A long waterfall is very hard to read. All the verdicts are final, so the
argument appears as a static object rather than as a sequence of moves. The
reader has to hold the whole structure in their head to see why anything is where
it is.

### III.2 The insight

**Every move targets something earlier. Therefore any prefix of a sugya is
itself a well-formed sugya, and `analyze` will happily analyse it.**

```ts
export const prefixOf = (sugya: Sugya, count: number): Sugya => ({
  ...sugya,
  units: sugya.units.slice(0, Math.max(0, Math.min(count, sugya.units.length))),
});
```

Nine lines, and it is the whole feature. The slider does not reveal text; it
selects a prefix, re-runs the analysis, and shows the state of play *as it stood
at that sentence*. Because acceptance is non-monotonic, the verdicts move:

| Revealed | R. Eleazar's ruling |
|---|---|
| 1. the ruling alone | in doubt |
| 2. + the testimony proving it | accepted |
| 3. + Rav Papa unseating the proof | in doubt |
| 4. + Rav Huna refuting Rav Papa | accepted |

Watching that reversal is the point. It is also asserted in `check.ts`, so the
interaction has a test.

Note the property that makes this safe: `validate` already guarantees targets
precede, so a prefix can never contain a dangling reference. The interaction is a
free consequence of a constraint imposed for a different reason. This is worth
generalizing:

> **Transferable rule.** When an interaction can be expressed as "run the
> existing model over a subset of the existing data", build it that way. The
> alternative — a separate animation timeline maintained alongside the model — is
> where inconsistency lives.

### III.3 Two rules the reveal must obey

**Layout must not shift as you drag.** All rows are always rendered. Unrevealed
ones stay in place but are blurred (`filter: blur(3.5px); opacity: .3`). This
gives the reader the shape of what is coming without its content, and — more
importantly — means the measured geometry stays valid and nothing jumps under the
cursor. If you make unrevealed rows `display: none`, you will reintroduce both
problems at once.

**Layout comes from the whole sugya; verdicts come from the prefix.**

```ts
const full  = useMemo(() => analyze(sugya), [sugya]);                    // depth, columns
const shown = useMemo(() => analyze(prefixOf(sugya, revealed)), [...]);  // standing, status
```

Depth is identical in prefix and whole (a unit's ancestors always precede it), so
this costs nothing and guarantees the staircase never moves.

### III.4 Slider design

The control is a custom `role="slider"`, not an `<input type="range">`. The
reason is alignment: **the rail's ticks sit at the measured vertical centre of
each sentence's icon**, so dragging down is dragging through the passage rather
than through an abstract 1-to-N range. Row heights vary with text wrapping, so
tick spacing is non-uniform and a native range input cannot express it.

What that costs, and what had to be reimplemented by hand:

- `role="slider"`, `aria-orientation`, `aria-valuemin/max/now/text`, `tabIndex=0`
- Arrow keys, Page Up/Down (±3), Home, End
- Pointer capture so a drag survives leaving the rail
- Nearest-tick snapping, so a drag lands on sentences rather than pixels

Clicking anywhere on the rail jumps there; clicking a row's text also sets the
step, which makes the rows a second way to navigate.

---

## Part IV — Visual encoding

### IV.1 Icons

The brief was that a reader with no background in logic should follow the diagram
without studying a key. That ruled out the abstract shapes the first version used
(circles, squares, diamonds) in favour of pictographs:

| Element | Icon | Reads as |
|---|---|---|
| statement | page of text | someone speaks |
| question | question mark | someone asks |
| answer | green checkbox | answers it |
| proof | thumbs up | backs it up |
| contradiction | red crossed-out circle | knocks it down |
| difficulty | amber warning triangle | raises a problem |
| resolution | lightbulb | clears the problem |

Constraints any replacement must satisfy:

- **Distinct silhouette.** The set must survive being printed in monochrome.
  Colour may reinforce meaning but may never be the only thing carrying it.
- **No logic vocabulary.** The icon should be legible to someone who has never
  heard the word "premise".
- **Element-level, not leaf-level.** Seven icons, not nineteen. The specific leaf
  is named in text beside the sentence; nineteen pictographs would be a key to
  memorize, which is the thing being avoided.

Each element's label is accompanied by a plain-English gloss of its *specific*
leaf, from `LEAVES[...].plain`: a `הוכחה` reads "brings proof", a `שנוי` reads
"offers a way out, without claiming it is true". These glosses are written for a
non-logician and are worth as much as the icons.

### IV.2 Position carries structure

Row order is reading order. Horizontal indent is dialectical depth. A sugya
therefore draws itself as a staircase whose shape is diagnostic at a glance — a
flat column is a mishnah with no dialectic, a deep zigzag is a
difficulty-resolution chain.

### IV.3 Edges carry effect

An edge runs from a move to the thing it acts upon. Two encodings:

| | Meaning |
|---|---|
| solid | the move decides something |
| dashed | the move only leaves its target unsettled |
| arrowhead | supports or raises |
| bar terminal | refutes |
| dot terminal | answers or settles |

The arrowhead points *at the target*, because a move acts upon what precedes it.
In SVG this is done with `marker-start` plus `orient="auto-start-reverse"` — the
path is drawn from target to move, and the marker is reversed. Doing it the
obvious way (drawing move-to-target with `marker-end`) makes the elbow geometry
much worse.

Vertical runs sit in the gutter *between* two depth columns (`from.x + indent/2`),
so a connector can never cross an icon however far apart its endpoints are.

### IV.4 Verdicts and fading

Two redundant channels, deliberately:

- **Icon opacity** encodes standing — `live` 1.0, `weakened` 0.62, `discharged`
  and `defeated` 0.42 — plus a strike-through line for `defeated` only.
- **A pill** states the verdict in words, coloured green/amber/red, with a
  *dashed* border for unsettled states and a solid one for concluded states.

The dashed-vs-solid border is the important detail: it means "is this settled?"
is legible without colour.

---

## Part V — Architecture

### V.1 The shape

```
        ┌──────────────── model (no framework, no rendering) ───────────────┐
        │  taxonomy.ts    sugya.ts    markers.ts    fixtures/               │
        └───────────────────────────────┬───────────────────────────────────┘
                                        │
        ┌───────────── shared presentation decisions ───────────────────────┐
        │  icons.ts (geometry)   layout.ts (placement)                      │
        │  verdict.ts (wording)  theme.ts (palette)                         │
        └──────────────┬────────────────────────────┬───────────────────────┘
                       │                            │
             render.ts (SVG string)        app/ (React)
```

Two renderers exist because they serve different needs: the React app is for
reading and exploring a sugya; the SVG exporter is for pasting one into a
document or a chat. They must not disagree, so **everything they could disagree
about is factored into the middle layer.**

`icons.ts` is the clearest case. Icon shapes are stored as data, not markup:

```ts
export type IconPrimitive =
  | { el: "rect";   x, y, width, height, rx, fill, strokeWidth }
  | { el: "circle"; cx, cy, r, fill, strokeWidth }
  | { el: "path";   d, fill, strokeWidth }
  | { el: "text";   text, fontSize, dy };
```

`render.ts` maps each primitive to an SVG string; `ElementIcon.tsx` maps it to
JSX. One geometry, two emitters. Before this refactor the icon paths existed
twice and had already begun to diverge.

### V.2 React components

Each is as ignorant as it can be:

| Component | Knows about |
|---|---|
| `ElementIcon` | An element and a standing. Nothing else. |
| `VerdictPill` | A verdict. Nothing else. |
| `LegendBar` | The taxonomy |
| `UnitRow` | One sentence and what has happened to it |
| `ConnectorLayer` | Measured points; draws elbows and depth columns |
| `RevealRail` | A count, a value, and tick positions |
| `StateOfPlay` | Where the opening claims currently stand |
| `SugyaView` | Ties them together; owns the revealed count |

`SugyaView` is the only component that knows what a sugya is. Everything below it
takes primitives, which is what makes them reusable in a sibling visualization.

### V.3 Measurement

HTML text wrapping is the browser's business, so row heights — and therefore
connector endpoints and rail ticks — cannot be computed up front. `useIconPositions`
measures them after layout with `getBoundingClientRect`, keyed by unit id, and
exposes a stable per-id ref callback.

Two details that matter:

- **It re-measures on resize, not on reveal.** Revealing changes only opacity, so
  positions are stable across slider moves. If you ever make reveal affect
  layout, this becomes a per-frame measurement and the design needs revisiting.
- **It compares before setting state** (`samePositions`, 0.5px tolerance).
  Without that guard, a `ResizeObserver` that triggers a state update that
  triggers a re-render is an infinite loop.

The connectors are an absolutely-positioned SVG overlay on the HTML rows, not an
all-SVG diagram. This keeps the text selectable, accessible, and responsive,
which the static exporter's text is not.

---

## Part VI — Recipes

### VI.1 Add a sugya

1. **Find a passage Ramchal quotes and labels himself.** This is the constraint
   that keeps fixtures usable as tests. Search chapter 9 for the tractate name or
   read the leaf definition whose behaviour you want to exercise — his examples
   sit immediately after each definition.
2. **Create `src/fixtures/<name>.ts`** exporting a `Sugya`. Required per unit:
   `id`, `en`, `move`. Strongly wanted: `he`, `speaker`, `target`, `provenance`,
   `attested`, and `marker` when the text supplies a stock phrase.
3. **Set `discussedAt`** to where Ramchal discusses it, with page numbers.
4. **Mark inferred labels** `attested: false` and explain them in `note`.
5. **Register it in `src/fixtures/index.ts`.** That is the single registry; both
   the app and the exporter read from it.
6. **Add an assertion to `check.ts`** — see Part VII for what makes a good one.
7. `npm run check && npm run export`.

A minimal unit:

```ts
{
  id: "ravpapa",
  speaker: "Rav Papa",
  en: "Even according to the one who holds that liquid uncleanness is Torah law, ...",
  he: "אפלו למאן דאמר טמאת משקין דאוריתא – משקי בית מטבחיא הלכתא גמירי לה",
  move: { element: "contradiction", subtype: "opposition" },
  target: "testimony",
  provenance: "asserted",
  attested: false,
  note: "Ramchal labels only Rav Huna's reply. `דחיה` is inferred here, on the rule at Heb p185 that a `דחיה` may land on a proof that was brought, not only on a statement.",
}
```

### VI.2 Add or change a leaf type

Add the subtype to the relevant `Move` variant. The compiler will then require an
entry in `LEAVES` — supply `en`, `he`, `plain`, `chip`, `effect`, and the English
page where it is defined. Write `plain` for someone who is not a logician.

If the effect is a reading rather than a quotation, say so in a comment at the
definition site, as the `statement` subtypes do.

### VI.3 Add an icon

Add to the `Icon` union, add shapes to `ICON_SHAPES` in `icons.ts`, map the
element in `ICONS`. Both renderers pick it up automatically. Keep it inside
roughly a 19×19 box centred on the origin, and check it in greyscale.

### VI.4 Build a sibling visualization

The model layer (`taxonomy`, `sugya`, `markers`, `fixtures`) is framework-free and
should be imported unchanged. `ElementIcon`, `VerdictPill`, and `RevealRail` take
primitives and are reusable as-is. Write a new view component beside `SugyaView`
rather than adding modes to it.

Ideas that fit the existing model without extending it: a comparison view showing
two sugyot with the same shape side by side; a marker-coverage view showing which
sentences were classified by lexicon and which by hand; a taxonomy browser that
shows each leaf with its page citation and an example.

---

## Part VII — Testing philosophy

**Every assertion in `check.ts` is something Ramchal states in words, not
something the implementation happens to produce.**

```ts
check("Rav Papa absolutely contradicted (Heb p177)", statusOf(pesachimLiquids, "ravpapa"), "rejected");
```

The label quotes the page. Ramchal writes `הנה כאן סתר שמועתו של רב פפא לחלוטין`
— "here Rav Papa's statement is absolutely contradicted" — so `rejected` is the
book's verdict, not ours.

This is what makes the suite meaningful. A test that asserts the reducer returns
what the reducer returns is worthless; a test that asserts the reducer agrees
with the author is a real constraint, and it is the reason the `discharge` bug
was caught rather than shipped.

Two further kinds of test worth keeping:

- **Counterfactual tests.** Delete a unit and assert the outcome changes as the
  doctrine says it should. The Pesachim fixture with Rav Huna removed must leave
  the ruling in `doubt`, not `rejected` — this is the direct test of "rebutting a
  proof does not prove the negation" (Ch8 p142).
- **Interaction tests.** The prefix sequence in Part III.2 is asserted step by
  step, so the slider's core behaviour is covered without a browser.

Run `npm run check` before claiming anything works. The typecheck is half the
suite, because of the exhaustiveness machinery in Part II.1.

---

## Part VIII — Pitfalls

All of these were hit during the v1 build. They are recorded so they are not hit
again.

### VIII.1 Modelling: `discharge` was missing

Originally `resolution/settlement` (`ישוב`) had effect `raise`, on the reasoning
that settling a difficulty supports the original claim. The Berachos fixture then
failed: the difficulty stayed `live` when Ramchal plainly treats it as closed.

The error was that `raise`, `reject`, and `unsettle` do not span the space.
Answering a question and settling a difficulty *close* their target without
asserting it is false. That required a fourth effect, `discharge`, and a fourth
standing, `discharged`.

The general lesson: when a fixture derived from the source disagrees with the
model, the model is usually missing a distinction the source draws. Look for the
missing category before adjusting weights.

### VIII.2 Modelling: reporting status for moves

The verdict badge originally showed `Status` for every unit, which produced
nonsense like a defeated objection displaying "in doubt". Fixed by introducing
`verdict.ts`, which reports `Status` for claims and `Standing` for moves, with
separate vocabularies. Do not let this collapse again.

### VIII.3 React: drag state in `useState`

```ts
// wrong — a pointermove in the same tick as pointerdown reads the stale value
const [dragging, setDragging] = useState(false);
const onPointerMove = (e) => { if (dragging) seek(e.clientY); };
```

React state updates are asynchronous, so a fast flick drops its first moves. The
flag must be a ref, read synchronously; the `useState` copy is kept only to swap
the cursor.

### VIII.4 React: `setPointerCapture` can throw

It rejects a pointer id that is not active. Wrap it in `try/catch` — a refused
capture should degrade to "drag stops working outside the rail", not abort the
whole handler.

### VIII.5 Tooling: `tsconfig.json` silently excluded `.tsx`

`"include": ["src/**/*.ts"]` does not match `.tsx`. The typecheck passed cleanly
while checking none of the React code. **A suspiciously clean first run is a
signal to verify what was checked**, e.g. `tsc --listFilesOnly | grep app`.

### VIII.6 Tooling: Vite serves stale modules under WSL

This project lives on `/mnt/c`, a Windows drive mounted into WSL, where inotify
never fires. Vite's watcher sees nothing and serves stale transforms, so edits
appear not to work. `vite.config.ts` now sets `server.watch.usePolling`. If you
ever debug a change that "isn't taking effect", check what the dev server is
actually serving:

```
curl -s http://localhost:5174/src/app/components/RevealRail.tsx | grep <your-symbol>
```

Related: start the dev server detached (`setsid nohup npx vite &`) or it dies
with the shell, and an empty `curl` response looks exactly like a stale one.

### VIII.7 SVG: Hebrew text overflow

Combining `direction="rtl"` with `text-anchor="end"` makes text overflow the
viewport — the two interact badly. Use `text-anchor="end"` alone and let Unicode
bidi handle the ordering. (In the HTML renderer, `dir="rtl"` is correct and fine;
this is an SVG-specific trap.)

### VIII.8 SVG: rasterizing for embedding

To embed a generated SVG as a PNG in Markdown, the root `<svg>` height must be
extracted. `grep`/`sed` get this wrong — they match inner elements and mishandle
fractional values. Use a regex against the root tag specifically, and round.

### VIII.9 Design: strike-through on verdict pills

The first design struck through "rejected" pills, which made them unreadable.
Distinguish states by colour *and* border style, never by defacing the text.

### VIII.10 Process: parallel edits

During the v1 build a `src/lattice/` directory and changes to `package.json`
appeared and disappeared, apparently from another agent working concurrently.
Verify the file tree before assuming a missing import is your bug.

---

## Part IX — Limits and open directions

### Known limits

- **One target per move.** `Unit.target` is a single id. A difficulty raised
  against two sources at once has to pick one, which understates the structure.
  Fixing this means `target: readonly string[]`, a depth rule for multiple
  parents (max? min?), and connector geometry that fans out.
- **`תיובתא` is a placeholder.** Announced p180, never defined. Its `unsettle`
  effect is a guess, flagged as such.
- **`statement` effects are interpretive.** Ramchal fixes the four adjudicating
  elements. Treating a forced explanation or an `אוקימתא` as weakening its target
  is a reading of his remark that they cost the author his precision.
- **Attacks are unordered within a unit.** All incoming moves are folded
  together; two attackers arriving in different orders give the same result.
  Whether that is right is untested against the text.
- **The rail assumes the sugya fits comfortably on a page.** For a passage of
  thirty sentences the rail becomes taller than the viewport. A sticky rail with
  proportional rather than aligned ticks would be the fallback, at the cost of
  the alignment that makes the current design good.

### Directions worth taking

1. **Marker-driven classification.** `markers.ts` exists but nothing consumes it
   at runtime. A function that scans a sentence for stock phrases and proposes a
   label — with its page citation — would turn fixture authoring from manual work
   into review of proposals, and `unmarkedLeaves()` already identifies where a
   human is unavoidable.
2. **More fixtures, chosen to stress the model.** The current four exercise all
   seven icons but only a handful of the nineteen leaves. Passages exercising
   `אבעיא`, `פשיטות`, `סיעתא`, and the `statement` subtypes would probably surface
   another missing distinction, as Berachos did.
3. **Multi-target moves.** The most valuable structural fix; see above.
4. **A diff view.** Two prefixes side by side, highlighting which verdicts
   changed between them. The model already supports it entirely.
5. **Chapter 8 integration.** `Provenance` is in the model but barely visible in
   the output. Showing which claims arrived self-authorising and which had to
   earn acceptance inside the sugya is a real addition and needs no new theory.

### What not to do

- Do not add categories the book does not have.
- Do not let the two renderers acquire independent copies of anything.
- Do not make reveal affect layout.
- Do not report a status for a move or a standing for a claim.
- Do not silently resolve a gap in the source.

---

## Appendix A — The nineteen leaves

| Key | Hebrew | English | Effect | Eng. page |
|---|---|---|---|---|
| `statement/firsthand` | שמועה | first-hand knowledge | `open` | 162 |
| `statement/explanation` | פרוש מרוח | full explanation | `open` | 164 |
| `statement/forcedExplanation` | פרוש דחוק | forced explanation | `unsettle` | 164 |
| `statement/presumption` | אוקימתא | presumption | `unsettle` | 164 |
| `statement/inference` | דיוק | inference | `open` | 166 |
| `statement/reported` | הגדה | reported information | `open` | 166 |
| `question/query` | שאלה | query | `open` | 168 |
| `question/principle` | אבעיא | question of principle | `open` | 170 |
| `answer/answer` | תשובה | answer | `discharge` | 172 |
| `answer/determination` | פשיטות | determination | `discharge` | 172 |
| `proof/demonstration` | הוכחה | demonstration | `raise` | 174 |
| `proof/validation` | סיעתא | validation | `raise` | 176 |
| `contradiction/direct` | סתירה | direct contradiction | `reject` | 178 |
| `contradiction/opposition` | דחיה | opposition | `unsettle` | 178 |
| `difficulty/objection` | פרכא | objection | `unsettle` | 180 |
| `difficulty/apparentContradiction` | רמיא | apparent contradiction | `unsettle` | 182 |
| `difficulty/refutation` | תיובתא | refutation *(undefined in source)* | `unsettle` | 184 |
| `resolution/settlement` | ישוב | settlement | `discharge` | 184 |
| `resolution/alternative` | שנוי | alternative | `unsettle` | 186 |

## Appendix B — Fixtures

| Fixture | Tractate | Shows |
|---|---|---|
| `pesachim-liquids` | Pesachim 16a / 18b | A refuted objection restores the proof it attacked; the only inferred label |
| `berachos-yaakov` | Berachos 4a | `ישוב` — settlement, the claim recovers; two root claims |
| `yebamos-chalitzah` | Yebamos 104b | `שנוי` — alternative, the claim stays merely possible |
| `yebamos-deafmute` | Yebamos 112b | `שאלה` / `תשובה` — a question closed without being refuted |

## Appendix C — Reduction tables

`reduceStanding(current, effect, attacker)` — returns `current` unchanged if the
attacker is spent (`discharged` or `defeated`):

| Effect | attacker `live` | attacker `weakened` |
|---|---|---|
| `reject` | `defeated` | `weakened` |
| `discharge` | `discharged` | `weakened` |
| `unsettle` | `weakened` | `weakened` |
| `raise`, `open` | unchanged | unchanged |

`reduceStatus(current, effect, attacker)` — same guard:

| Effect | attacker `live` | attacker `weakened` |
|---|---|---|
| `raise` | `accepted` | `doubt` |
| `reject` | `rejected` | `doubt` |
| `unsettle` | `doubt` | `doubt` |
| `discharge`, `open` | unchanged | unchanged |

## Appendix D — Icon files

The seven element pictographs are geometry in `viz/src/icons.ts`, not shipped
as image assets. Standalone copies live in `icons/` for upload. Colours are
the light palette from `viz/src/theme.ts`.

| Element | Icon | File |
|---|---|---|
| statement | page of text | [icons/statement.svg](icons/statement.svg) |
| question | question mark | [icons/question.svg](icons/question.svg) |
| answer | green checkbox | [icons/answer.svg](icons/answer.svg) |
| proof | thumbs up | [icons/proof.svg](icons/proof.svg) |
| contradiction | red crossed-out circle | [icons/contradiction.svg](icons/contradiction.svg) |
| difficulty | amber warning triangle | [icons/difficulty.svg](icons/difficulty.svg) |
| resolution | lightbulb | [icons/resolution.svg](icons/resolution.svg) |

![statement](icons/statement.svg)
![question](icons/question.svg)
![answer](icons/answer.svg)
![proof](icons/proof.svg)
![contradiction](icons/contradiction.svg)
![difficulty](icons/difficulty.svg)
![resolution](icons/resolution.svg)
