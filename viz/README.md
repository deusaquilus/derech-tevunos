# Sugya lattice

Categorizes the sentences of a short sugya using Ramchal's *Derech Tevunos* ch. 9
and draws the result as a glyph lattice.

This is the small sibling of `derech-tevunos-visualization-spec.md`. That document
specifies seven visualizations that *compute* something — concept lattices,
circumscription closures, dependency violations. This one only *names* things: it
labels each sentence with the move it makes and draws how the moves hang together.

```
npm install
npm run dev       # React app on http://localhost:5174
npm run check     # typecheck + acceptance tests
npm run export    # writes out/*.svg and out/index.html
npm run build     # production bundle into dist/
```

The model is plain TypeScript with no framework in it. Two renderers sit on top:
a React app for reading a sugya, and an SVG exporter for pasting one into a
document. Everything they must agree on — icon geometry, lattice placement,
verdict wording — lives in a module both import, so neither can drift.

| File | What it holds |
|---|---|
| `src/taxonomy.ts` | The seven elements, nineteen leaves, icons, and effects |
| `src/anatomy.ts` | The ch. 1–7 vocabulary — fifty-three types in four families — and where each may sit |
| `src/glyphs.ts` | The fifty-three glyphs as SVG bodies, coloured by `currentColor` |
| `src/markers.ts` | The Aramaic trigger lexicon, each entry page-cited |
| `src/sugya.ts` | The data model, the status/standing reducer, and `prefixOf` |
| `src/verdict.ts` | Which of status or standing to report, and in what words |
| `src/icons.ts` | Icon geometry as data, consumed by both renderers |
| `src/layout.ts` | Indent per depth, connector elbows, edge styles |
| `src/theme.ts` | The palette |
| `src/render.ts` | Static SVG export |
| `src/index.ts` | The public barrel: model, geometry, renderer, and the React layer, in one import |
| `src/app/useSugyaController.ts` | The headless controller: revealed/fold state, measurement, derived rails, handles and verdicts, handlers; the anatomy layer's badges, beads and hot edge |
| `src/app/hooks/useAnatomyLayer.ts` | The anatomy layer's switch and lenses, remembered in `localStorage` |
| `src/app/SugyaView.tsx` | One arrangement of the controller — the full reading sheet |
| `src/app/SugyaHeader.tsx` | The per-passage header; its copy is overridable per page |
| `src/app/Root.tsx`, `src/app/pages/`, `src/app/router.tsx` | The shell, its pages — gallery, one passage, and the loader — and a dependency-free hash router |
| `src/app/sugyot.ts` | `useSugyot` is the shipped lattice; opened files live only on `#/open`, kept as files in `sessionStorage` |
| `src/app/components/` | Presentational pieces; each knows one thing (table below) |
| `src/format.ts` | The sugya file format: `parseSugya` (every fault, with its path), `toJson`, `stringify` |
| `src/sugyot/` | The passages the app ships with, one JSON file each, plus `sugya.schema.json`; `index.ts` loads them |
| `src/fixtures/` | The same passages as TypeScript — the oracle `npm test` holds the JSON files to |

### Adding a passage

A passage is a JSON file in the format described in
[`SUGYA_JSON_FORMAT.md`](../SUGYA_JSON_FORMAT.md): the sentences in order, each
with the move it makes, what it acts on, who says it, and its ch. 1–7 labels.
To ship one, put the file in `src/sugyot/` and add a line to `FILES` in
`src/sugyot/index.ts`; it is validated at import and appears in the gallery and
the tabs. To look at one without a rebuild, go to `#/open`: a page of its own,
not a tab of the lattice. Drop the file on it, pick it, or paste the JSON. The
same reader parses it and reports every fault with the path it sits at; a file
that passes is drawn there by the same `SugyaView` a shipped passage gets, and
can be downloaded back in canonical form. It does not join the shipped tabs.
What is stored for the session is `toJson` of the passage — the file — since the
model's shape is not the file's.

### Adding a page

The visualization is split into *behaviour* (`useSugyaController`), *markup*
(the components) and *framing* (the page). A new page that shows a sugya in the
standard way is one file under `src/app/pages/` that renders `<SugyaView>` and one
line in the route switch in `Root.tsx`. A page that shows it differently — a
compact timeline, a single movement, two sugyot side by side — calls
`useSugyaController(sugya)` itself and lays the same components out however it
likes; the controller hands back everything they need, including the ref to
attach to the rows container. Nothing in `src/` outside `pages/` and `Root.tsx`
needs to change. Routes are hash paths (`#/`, `#/sugya/:id`, `#/open`,
`#/open/:id`), so the built `dist/` is plain static files with no server rewrite
rules. `#/open` is a page of its own — `Root` hands it the whole window — and
`OpenPage` is the pattern: its own chrome, the same `SugyaView`.

## Reading a sugya one sentence at a time

A sugya read as a finished wall of text is hard going: every verdict is already
in, so the argument's movement is invisible. The app therefore starts with only
the opening sentence and gives you a slider down the right-hand edge. Its ticks
sit level with the sentences, so dragging down is dragging through the passage.

This is not a typewriter effect. Every move targets something earlier, so any
prefix of a sugya is itself a well-formed sugya, and `prefixOf` plus `analyze`
gives the state of play as it stood at that sentence. Verdicts are recomputed at
every step, and they move. In Pesachim, R. Eleazar's ruling is unsupported, then
proved, then unseated by Rav Papa, then restored when Rav Huna refutes him:

| Revealed | R. Eleazar's ruling |
|---|---|
| 1. the ruling alone | in doubt |
| 2. + the testimony | accepted |
| 3. + Rav Papa | in doubt |
| 4. + Rav Huna | accepted |

Watching that reversal happen is the point of the control, and `npm test` asserts
the sequence. Sentences you have not reached stay in place but blurred, so the
shape of what is coming is visible while its content is not, and nothing on the
page moves as you drag.

### Components

| Component | Knows about |
|---|---|
| `ElementIcon` | An element and a standing. Nothing else. |
| `VerdictPill` | A verdict. Nothing else. |
| `LegendBar` | The taxonomy |
| `UnitRow` | One sentence and what has happened to it |
| `ConnectorLayer` | Measured points; draws the elbows and depth columns |
| `RevealRail` | A count, a value, and tick positions |
| `StateOfPlay` | Where the opening claims currently stand |
| `RailLayer` | One measured rail from a move to its target, with its rake |
| `FoldBand` | A fold summary; what is hidden and how it stands |
| `SugyaHeader` | The passage's citation and one instructional line |
| `Tooltip` | Rich hover/focus text for anything; picks the side that fits; a short unprompted `hint` form for an anchor whose twin is hovered |
| `Glyph` | One ch. 1–7 glyph in its family's hue. Nothing else. |
| `AnatomyBadge` | One badge: glyph, short name, basis, its tooltip |
| `BadgeTip` | What a badge's tooltip says, given where the badge sits |
| `BeadLayer` | Measured elbows; draws a bead on each long enough run, which lights its chip rather than explaining itself |
| `useSugyaController` | The revealed count, the fold, the measurements, and every derived thing above; no markup |
| `SugyaView` | Lays the above out as a sheet; owns nothing the controller does not hand it |

Row heights depend on how the browser wraps the text, so connector endpoints and
rail ticks cannot be computed up front. `useIconPositions` measures them after
layout. Revealing a sentence changes only opacity, never layout, so the measuring
runs on resize rather than on every slider move.

## A second layer: chapters 1–7

Chapter 9 says what each sentence *does* — it is the layer the lattice draws.
Chapters 1–7 say what each sentence *is*: who speaks (ch. 1), the shape of the
claim (chs. 3–6), how two claims relate (ch. 4), and by what rule one is drawn
from another (ch. 7). That vocabulary sits on the sheet as a second layer,
`Ramchal's anatomy`, switched on from the legend and off by default. When it is on,
each sentence carries small badges — violet for the shape of the statement, teal
for the deduction, slate for the speaker — and each move's handle carries the
relation it bears to its target; where the connector's run is long enough, the
same relation also appears as a bead on the elbow, and hovering either lights
both. Every badge explains itself on hover, and that tooltip is the whole of
what the layer says about it; a bead, too small to hold a paragraph, sends the
reader to its chip with one line instead. The
five fixtures are annotated; none of these labels is attested, since none of
their sentences is one Ramchal labels in chapters 1–7, so each is `inferred`, or
`marked` where the Talmud's own wording (`מה … אף`, `אף על פי ש`) names the form.
See `SUGYA_WATERFALL_V4_ANATOMY.md`.

## Why chapter 9 is the right layer

Chapter 9 opens `הנה חלקי הסוגיות בכלל כבר זכרנום` — "the parts of the sugyos we
have already mentioned." Decomposing a sugya into labelled parts is the stated
purpose of the chapter, so the taxonomy needs no adaptation to the task.

It gives seven principal elements and nineteen leaf types, and it is *closed*:
the full inventory is printed in the chapter outline at p253. Classification is
therefore assignment into a known enum, not open information extraction.

Nothing from chapters 3–8 is required. Those govern the internal structure and
truth conditions of a statement, which matter for reasoning about a sugya but not
for saying what each sentence is doing in it.

## The Talmud labels itself

The finding that makes this tractable: Ramchal repeatedly identifies a leaf type
by the stock Aramaic phrase that introduces it, rather than by its content.

> `וכן כששאלו "מנא הני מלי?" והשיבו: "דתנו רבנן"` — a demonstration is indicated (Heb p175)

> `כשאמרו: "הא גופא קשיא!"` — an objection (Heb p179)

> `כשאמרו: "מאי לאו?" השיבו: "לאו!" וכן כשיאמרו: "ודלמא?" "ואימא?" הנה הוא סימן דחיה` (Heb p177–179)

`src/markers.ts` collects twenty-one of these, each quoted from the Hebrew column
with its page. So most of the classification is a lexicon lookup. Where no marker
matches, the sentence stays unlabelled rather than being guessed — the same
discipline the parent spec applies to a missing aspect index.

## The encoding

The icons are pictographs, not abstract shapes, so a reader with no background in
logic can follow the diagram without studying a key:

| Element | Icon | Reads as |
|---|---|---|
| statement | page of text | someone speaks |
| question | question mark | someone asks |
| answer | green checkbox | answers it |
| proof | thumbs up | backs it up |
| contradiction | red crossed-out circle | knocks it down |
| difficulty | amber warning triangle | raises a problem |
| resolution | lightbulb | clears the problem |

Each is a distinct silhouette, so the set still works in monochrome and colour is
never the only thing carrying the meaning. The element name, its Hebrew term, and
a plain-English gloss of the specific leaf sit beside every sentence — a `הוכחה`
reads as "brings proof", a `שנוי` as "offers a way out, without claiming it is
true". Those glosses live in `LEAVES` in `src/taxonomy.ts`.

Position carries structure. Row order is reading order; horizontal indent is
dialectical depth, computed from each unit's `target`. A sugya therefore draws
itself as a staircase whose shape is diagnostic — a flat row of circles is a
mishnah with no dialectic, a deep zigzag is a difficulty-resolution chain.

Edges carry the effect: an arrow points at what the move acts upon, dashed when
the move only leaves its target in doubt, bar-terminated when it refutes it,
dot-terminated when it answers it.

## Claims have status, moves have standing

Conflating these flattens the distinction the taxonomy exists to draw, so the
reducer in `src/sugya.ts` keeps them apart. A claim is `accepted`, in `doubt`, or
`rejected`; doubt is the resting state, never a fallback. A move `stands`, is
`weakened`, is `answered`, or is `refuted`, and only a move that still exerts
force delivers its effect.

Two consequences fall out rather than being special-cased:

- **Rebutting a proof yields doubt, not rejection.** An undermined proof is
  `weakened`, and a weakened move can push its target to doubt but no further.
- **A settlement and an alternative differ.** Ramchal fixes this exactly at
  Heb p185: a `שנוי` "is truly a `דחיה`, except that a `דחיה` falls on a statement
  or a proof and a `שנוי` falls on a difficulty." So a `ישוב` discharges the
  difficulty and the original claim recovers, while a `שנוי` only weakens it and
  the claim stays merely possible.

The fixtures are chosen so both show up: Berachos 4a ends `accepted`, Yebamos 104b
ends in `doubt`, and they differ only in which resolution type closes them.

## Fixtures

All four are passages Ramchal quotes and labels himself, so the labels are
checkable against the book and `npm test` asserts outcomes he states in words.

| Fixture | Shows |
|---|---|
| `pesachim-liquids` | A refuted objection restores the proof it attacked |
| `berachos-yaakov` | `ישוב` — settlement, claim recovers |
| `yebamos-chalitzah` | `שנוי` — alternative, claim stays possible |
| `yebamos-deafmute` | `שאלה` and `תשובה` — a question closed without being refuted |

Between them they exercise all seven icons.

Where a label is ours rather than Ramchal's it is marked `attested: false` and
renders as "inferred". Currently that is one unit, Rav Papa in the Pesachim thread.

## Limits

- Depth assumes each move has one target. A difficulty raised against two sources
  at once has to pick one, which understates the structure.
- `תיובתא` is announced at p180 and never defined; the translator flags the gap at
  p184. Its effect in `taxonomy.ts` is a placeholder, not a reading.
- The columns disagree on some citations — the Pesachim passage is `פסחים יח ב` in
  the Hebrew and "17b" in the English. Both are recorded rather than resolved.
- Effects on the `statement` subtypes are interpretive. Ramchal fixes the four
  adjudicating elements; treating a forced explanation or an `אוקימתא` as weakening
  its target is a reading of his remark that they cost the author his precision.
