# Nested folds and nested rails — implementation plan

**Status.** Research complete; the state model has a reference implementation
that is validated over eleven sugyot; ready to implement.

**Audience.** An implementer with no prior context on this repository. This
document is meant to be sufficient on its own together with the files it
points to. Where it says "decided", take the decision as given; where it says
"the user's call", stop and ask.

**The order of work, which is the point of this document:**

1. **Build the visualization** — nested folds and the chain of rails, visible
   in the browser on real sugyot (§1–§3, steps 1–2 of §5).
2. **Look at it** (§4). The user decides whether this is the right
   visualization. Everything is arranged so that decision can be made by
   reading pages in the app, with the knobs that matter switchable live.
3. **Only then** anything else: the spec document, and the data-driven work
   (rendering from JSON), which is parked in `LATER_DATA_DRIVEN.md` and must
   not be started before step 2 has a verdict.

Nothing in steps 1–2 is a refactor for its own sake. The one constraint kept
for the future is one the code already has: the fold logic stays a pure
module with no React and no pixels in it.

---

## How to use this document

1. Read the *Read first* table below, in order. Two hours.
2. Run the prototype and read it beside §1: `cd nested_rail_research &&
   node simulate.ts`. The prose in §1 is the rationale; `foldtree.ts` is the
   spec. Where they disagree the code is right and this document has a bug.
3. Implement steps 1 and 2 of §5. Each has a definition of done.
4. Hand over for evaluation with §4's checklist. Stop there.

### Read first

| Path | What it gives you | Time |
|---|---|---|
| `viz/README.md` | What the app is, how to run it, the module map | 10 min |
| `SUGYA_WATERFALL_VISUALIZATION_V1.md` | v1: the waterfall — rows, the depth staircase, connectors, revealing one sentence at a time | 30 min |
| `SUGYA_WATERFALL_AT_SCALE_V2.md` | v2: the long sugya (the Bava Metzia 21b–22b fixture); movements, handles, the horizon, the minimap. §6 (interaction) and §9 (open) matter most | 30 min |
| `SUGYA_WATERFALL_V3_RAIL.md` | v3: the rail and the fold. **This is the model this plan replaces; read all of it.** §2 (rules), §4 (scrolling), §7 (open: items 2, 3, 7 are what this plan closes) | 40 min |
| `SUGYA_WATERFALL_V4_ANATOMY.md` | v4: the anatomy layer (badges, beads, lenses). It must keep working unchanged; §2.6 (the handle) touches this work | 20 min |
| `nested_rail_research/VERDICT.md` | The research result this plan implements: why nesting is needed and why nested rails stay rare | 15 min |
| `nested_rail_research/foldtree.ts` | **The reference implementation.** ~550 lines, pure, commented | 40 min |
| `nested_rail_research/simulate.ts` | Invariant checks, v3 comparison, and the printed pages quoted in §2 | 15 min |
| `nested_rail_research/skeletons.ts` | Six annotated long sugyot used as test material (§3.3) | skim |
| `site/src/rail/folding.ts`, `site/src/rail/sugya.ts`, `site/src/rail/app/useSugyaController.ts`, `site/src/rail/app/SugyaView.tsx`, `site/src/rail/app/components/{RailLayer,FoldBand,UnitRow}.tsx`, `site/src/rail/layout.ts`, `site/src/rail/check.ts` | The code that changes | 60 min |

### Repository facts

- **Where.** All application code is under `viz/`. React 19 + Vite; TypeScript
  strict with `noUncheckedIndexedAccess`, `erasableSyntaxOnly`,
  `verbatimModuleSyntax`, `allowImportingTsExtensions`. `.ts` files are run
  directly by Node (type stripping): Node 22.20 is installed; ≥ 22.6 is
  required.
- **Commands** (in `viz/`): `npm install`; `npm run dev` (http://localhost:5174);
  `npm run typecheck`; `npm test` (= `node src/check.ts`: a plain assertion
  script, no framework, prints `pass`/`FAIL` per line and exits non-zero on any
  failure); `npm run check` (both); `npm run export` (static SVG to `out/`);
  `npm run build`.
- **Style.** `const`, `readonly`, plain functions exported from modules, throw
  on error, no FP libraries, discriminated unions with exhaustive `switch`.
  Doc comments in the core modules are short essays that give the *reason* for
  a rule and cite the spec or Ramchal; match that register.
- **Conventions.** Rules live in pure modules with no React in them
  (`folding.ts`, `sugya.ts`, `layout.ts`); behaviour lives in the controller
  hook; markup in components. Every version ships a spec document at the repo
  root, `SUGYA_WATERFALL_V*.md`, with a fixed shape (§3.5). Every rule has an
  assertion in `check.ts` phrased as something the spec states.
- **`nested_rail_research/` is research.** Read it, lift logic out of it, do not
  import it from `viz/src`, do not modify it.
- **Units.** A sugya is `Sugya { units: Unit[] }`; a unit is one labelled
  sentence. Units are indexed `0..n-1` in reading order; readers see the
  1-based ordinal. Every `target` names an earlier unit (`validate()` enforces
  it), so the units form a forest whose roots are the units without a target.

### Glossary

Terms from v1–v4 that this document uses without re-explaining, and the new
ones. Alphabetical.

- **anatomy, badge, bead, lens** (v4) — the ch. 1–7 annotation layer: badges on
  rows, beads on elbows, lenses that filter badge families. No effect on
  analysis or folding.
- **anchor** (new) — the unit a band hangs under: the nearest common ancestor
  of the parents of the band's rows that lie outside it (`anchorOf`).
- **arrives folded** (v3) — a landing arrives folded if any move in it closes
  business (`arrivesFolded`).
- **attention** (new; was *focus*) — the one relation whose rail is drawn in
  full, in lane 0. The newest long-reaching arrival unless the reader moved
  it.
- **band** — the row that stands for hidden rows (`FoldBand`). New: a stored
  interval `{kind, anchor, from, to, closed}`; *frame* or *thread*.
- **closes business** (v3) — effect ∈ {`reject`, `raise`, `discharge`}.
- **connector, elbow** (v1) — the local line from a target to its move in the
  gutter between depth columns; dropped beyond `LONG_RUN` pixels.
- **decomposition** (new) — laying one level of structure over a stretch:
  teeth stay, runs become thread bands (§1.3).
- **depth** — distance from the root in the target tree (`analysis.depth`);
  the staircase indentation.
- **effect** — what a move does to its target (`effectOf`): `open`,
  `unsettle`, `reject`, `raise`, `discharge`.
- **expose** (new) — open whatever bands hide a unit until it is a row.
- **frame** (new) — a band made by a closing long-reaching landing: v3's fold.
- **frontier** — the last revealed row, index `revealed - 1`.
- **handle** (v2/v3) — the printed reference on a move whose target is far or
  hidden: `↑ acts on 2 · Rava: despair`. The keyboard route to the rail.
- **horizon** (v2) — `HORIZON = 3` rows rendered blurred past the frontier
  in a long sugya; nothing is rendered beyond them.
- **item** (new) — what decomposition walks over: a row, or a stored closed
  band as an opaque block.
- **jitter** (new, forbidden) — a row above the frontier moving on a local
  arrival.
- **laminar** — a family of intervals in which any two are disjoint or nested.
- **landing** (v3) — the maximal run of consecutive moves ending at a move and
  all acting on its target (`landingStart`).
- **lane** (new) — a rail's x within the margin; lane 0 nearest the text.
- **long sugya** (v2) — more than `LONG_SUGYA = 14` units: minimap and horizon
  on.
- **long-reaching** (v3) — reach ≥ `LONG_REACH = 4`.
- **movement** (v2) — a maximal run of adjacent units sharing their depth-1
  ancestor (`movementsOf`). Navigation furniture: minimap boundaries, band
  captions.
- **peek, hot** — hover highlights: a target row when its move is hovered; a
  badge and its bead together.
- **policy** (new) — `{ longReach, openArrival: "threads" | "flat", maxLanes }`.
- **press** (new; was `pressHandle`) — the reader's action on a move: its
  handle, or the rail when it is the attention.
- **rail** (v3) — the thick indigo line in the left margin from a long-reaching
  move up to its target: a *trunk*, a *cap* at the target, and *teeth*
  (branches) for the other moves in the rake.
- **rake** (v3) — several moves on one trunk. v3: the landing's moves. New:
  also every visible long-reaching move on the same anchor within the span.
- **reach** (v3) — units between a move and its target (`reachOf`).
- **release** (v3 behaviour, removed) — a fold undone because an unrelated
  long-reaching move arrived and took the focus.
- **revealed** — how many units the reader has reached.
- **row** — a unit as drawn (`UnitRow`).
- **Scene** (later, not now) — a plain-data description of the page; see
  `LATER_DATA_DRIVEN.md`.
- **seek** — moving the frontier: slider, movement buttons, next/rest buttons.
- **slot** (v3) — one thing in the rows list: a row or a closed band
  (`layout`).
- **standing, status, verdict** — analysis outputs: `live | weakened |
  discharged | defeated`; `accepted | doubt | rejected`; `verdictFor` picks the
  words.
- **state-of-play strip** (v2) — the sticky strip of roots and their verdicts.
- **teeth** (new, second sense) — in decomposition, the items that stay
  visible: children of the anchor and long-reaching moves. The same word as
  the rake's teeth on purpose: the visible teeth of a stretch are exactly the
  candidates for its rail's teeth.
- **thread** (new) — a band holding one tooth's finished business: a maximal
  run of rows hanging under one unit.
- **toggle** — the reader's action on a band: open one level, or close.

---

## 0. The short version

**No rearchitecture of the data model.** `Sugya` and `Unit` do not change. The
nesting is already in the data: every `target` pointer is a tree edge, and a
band is just "a stretch of rows that hang under one unit". Nothing new has to
be authored to get nested folds; the six research sugyot were annotated with
`id / move / target / text` and nothing else, and they nest.

What changes is the **presentation state**, which is one module and its
wiring:

| v3 | proposed |
|---|---|
| `Focus { id, folded }` — one move, one fold | `FoldState { revealed, bands, attention }` — a *laminar family* of bands, each `{ kind, anchor, from, to, closed }`, plus the one relation whose rail is drawn in full |
| `foldRangeOf(focus)` → one range | `layout(rendered, bands)` → rows and *closed* bands; open bands are transparent |
| a new long-reaching arrival *replaces* the focus, releasing its fold | a new arrival *adds* bands; a closer's frame keeps the bands inside it, closed, and that is what its first unfolding shows |
| unfold = every hidden row comes back | unfold = one level: the anchor's teeth, their threads still folded |
| one rail | a chain of rails around the attention relation, one lane each, strictly nested |

The analysis (`sugya.ts`, ch. 9 rules), the taxonomy, the anatomy layer, the
fixtures: untouched. `reachOf`, `landingStart`, `closesBusiness`,
`arrivesFolded`, `summarizeFold`, `LONG_REACH`: kept as they are and reused.

The rest of the change is rendering: `RailLayer` draws a list instead of one,
`FoldBand` learns its anchor and its depth, the margin grows by a lane per
nesting level, and everything that asked "is this row hidden by *the* fold"
asks the slots instead.

Two policies are kept side by side and switchable in the app while reading.
`flat` reproduces v3's pages exactly and only changes what unfolding shows.
`threads`, the recommended default, also folds finished threads when a
challenge arrives, and is what turns a 45-row rail into a 4-row one. Both are
on the page so the user can compare them on the same sugya at the same step
(§4).

The JSON/data-driven work is deliberately **not** part of this. The fold
tree's state is plain data and the logic is a pure module, so nothing built
here forecloses it; see `LATER_DATA_DRIVEN.md` when the visualization has been
judged.

---

## 1. The state model

Everything in this section is implemented in `foldtree.ts`; function names in
parentheses are its exports. Indices are used internally; the controller
converts to ids where the components need them, as it does today.

### 1.1 Bands

```ts
type Band = {
  readonly key: string;            // `${kind}:${anchor}:${from}`; stable as the frontier advances
  readonly kind: "frame" | "thread";
  readonly anchor: number;         // the unit whose teeth the band hides
  readonly from: number;           // first hidden row
  readonly to: number;             // last hidden row, inclusive
  readonly closed: boolean;
  readonly by?: number;            // frames only: the move whose landing made or last extended it
};

type FoldState = {
  readonly revealed: number;
  readonly bands: readonly Band[]; // laminar; sorted by `from`, wider first
  readonly attention: number | undefined;
};
```

Two kinds, one shape:

- A **frame** is v3's fold: made when a long-reaching landing that *closes
  business* arrives on its target, it hides `target+1 .. landingStart-1`
  (`frameFor`). It is keyed by anchor, so the fifth `אלא תולדה ד…` on `אהייא`
  *extends* the band the first one made instead of nesting five bands that
  each hide the candidates.
- A **thread** is one tooth's finished business: made when a challenge arrives
  (under `threads`) or when the reader opens a band one level. It hides a
  maximal run of rows that hang under one unit.

The family is **laminar**: any two bands are disjoint or nested. `insert`
keeps it so — a band that would cut through an existing one absorbs it (later
closure wins). This never fires on the eleven sugyot; it exists so the
invariant is unconditional and the renderer can rely on it.

A band's `anchor` is derived, not declared: the nearest common ancestor of the
parents of its rows that lie outside it (`anchorOf`). Usually that is the
move's target. Not always: `אלא… דכולי עלמא` in Pesachim formally rejects the
assumption `ka-salka`, but its band holds both sides' proof-texts, so its
anchor is Rav Huna; the fixture's `סתירה` on Rava hides rows 2–46, which
include Abaye's challenges, so its anchor is Abaye. A frame records the move
that made it in `by`, and the caption uses that (§3.2.4).

### 1.2 On arrival

All transitions are pure and replayable. Seeking backwards re-derives the
state from the start (`replay`), dropping the reader's toggles — v3 §2.3's
rule. Seeking forwards applies `arrive` per step to the current state, so a
band the reader opened stays open until a closer folds it.

**Arrival** of unit `m` with target `T` (`arrive`):

1. **Expose `T`** (`expose`). Open every closed band that hides `T`, outermost
   first, each one level, until `T` is a row. (Pesachim: `אלא` lands on
   `ka-salka`, which a challenge had folded three steps earlier; it comes
   back, its siblings stay folded.) This replaces v3's *release*: nothing is
   undone except what has to be for the new move to have something to land on.
2. If `m` is long-reaching, it takes **attention**, and:
   - if its landing **closes business** (`arrivesFolded`): insert the frame
     `frameFor(m)`, closed. Bands already inside are kept and closed; a frame
     on the same anchor is extended.
   - otherwise (a challenge), under `threads`: decompose `T+1 .. m-1` under `T`
     (§1.3) and insert the resulting thread bands, closed. Under `flat`:
     nothing, as v3.
3. A local move changes nothing above the frontier.

### 1.3 Decomposition: teeth and threads

`decompose` / `decomposeAround` is the one algorithm behind both "a challenge
arrives" and "the reader opens a band". It walks a stretch as a sequence of
*items* — rows, and stored closed bands as opaque blocks that hang from their
anchor — and:

- a **tooth** stays as it is: an item hanging directly from the anchor, *or
  any long-reaching move*. The second clause is what keeps a two-sided dispute
  honest — opening the band under Abaye shows Rava's challenges as rows beside
  Abaye's rather than one level down — and more generally, a move important
  enough to have a rail and a handle is never hidden by a fold the reader did
  not ask for. (A frame still hides everything; that fold the closing move
  asked for.)
- every maximal run of other items becomes **one closed thread band** under
  the unit the run hangs from (its `anchorOf`), provided that unit lies inside
  the stretch. A run hanging from a unit *outside the stretch and visible
  above* stays as it is. A run hanging from another line of the argument
  altogether (Abaye's challenges inside a stretch that belongs to Rava) is
  decomposed by the same rule relative to its own anchor. A run whose rows
  come from two or more teeth's subtrees with none of those teeth present is
  split by tooth.

Because blocks are atomic, a run flows *around* a stored closure and the leaf
band that results contains it whole — a fold derived now never cuts through a
closure made earlier, and there are no adjacent one-row bands where one band
would do.

### 1.4 Rails

Rails are derived from what is visible, never stored (`railsOf`):

- the **focus rail**: the attention relation `T → m`, trunk from `T`'s slot to
  `m`'s slot, teeth at every visible long-reaching move on `T` between them and
  at the landing's siblings (v3's rake, generalised to a rake across the
  band). Drawn only if both `T` and `m` are rows; otherwise the move has a
  handle and no rail.
- around it, the **chain** of relations whose span contains it and whose ends
  are both rows: for each distinct anchor above `T` with a visible
  long-reaching move below `m`, its latest such move. A chain is totally
  ordered by containment, so lanes need no collision rule: lane 0 nearest the
  text, each enclosing rail one lane further out, capped at `maxLanes` (3;
  depth 2 is the most any of the eleven sugyot produce).

Only lane 0 is drawn at full weight, with its cap and its teeth. Outer lanes
are thin context (§3.2.3).

`Rail { anchor, move, teeth, lane, span }`; `span` is the trunk's length in
slots, used only for measurement and tests.

### 1.5 The reader's actions

| Action | Where it comes from | Effect (function) |
|---|---|---|
| **seek(n)** | slider, movement headings, "next sentence", "rest of this movement", the fold-back arrows on rows | `n > revealed`: `arrive` per step from the current state. `n < revealed`: `replay(n)` from scratch (toggles dropped). |
| **press(m)** | the handle on a move; the lane-0 rail (then `m` = attention); Enter/Space on either | `press`. Both ends of `m`'s relation are exposed. If `m` is local: nothing more (its handle existed only because its target was hidden). If `m` is long-reaching and *not* the attention: it becomes the attention, **folded** — its frame is closed, made on the spot if it does not exist. If `m` *is* the attention: its frame is toggled — closed → open one level, open → closed — and `m` stays the attention. This is v3's `pressHandle`, and produces v3's page in every case v3 could reach without a release (§1.6). |
| **toggle(key)** | a band (click, Enter/Space) | `toggle`. Closed → open one level; attention moves to the latest visible long-reaching move on the band's anchor at or after `from`, if any, so the rail that appears is the one whose interior just did; otherwise attention is unchanged. Open → closed, and everything inside is set closed so the next opening is again one level. A band hidden inside a closed band is not on the page and cannot be toggled. |
| **hover** | rail, handle, band | peek the target (rail, handle) or the anchor (band); as v3. No state change. |

An outer-lane rail is not interactive beyond a `<title>` (decided, §6): a thin
context line should not be able to fold thirty rows on a stray click, and its
move's handle offers the same action deliberately.

### 1.6 Invariants

Each is checked by `simulate.ts` after every step of all eleven sugyot and
should become a `check.ts` assertion (§3.4).

1. **Laminar.** No two bands cross (`assertLaminar`).
2. **No release.** Every row hidden before an arrival is hidden after it,
   unless the arrival had to expose its target — and then only the chain of
   bands over that target opens, one level each.
3. **No jitter.** A local arrival whose target is a row changes no slot above
   the frontier.
4. **`flat` ≡ v3.** Under `flat`, the page after every arrival is v3's page
   (57/57 steps of the fixture, slot for slot), and the page after pressing
   any *visible* long-reaching move is v3's page after `pressHandle` (349/349
   presses). The only difference is what unfolding shows.
5. **Bands hide only revealed rows.** `to < revealed` always; horizon rows are
   never in a band.

---

## 2. What it does on the corpus

`node simulate.ts`, 325 steps across seven long sugyot (the v2 fixture and six
research skeletons), plus 349 presses:

| sugya | units | v3 max rows / max rail | `threads` max rows / max rail | `flat` max rows / max rail |
|---|---:|---:|---:|---:|
| Bava Metzia 21b–22b (fixture) | 57 | 48 / 46 | 32 / 27 | 48 / 46 |
| Bava Metzia 2a–3a | 36 | 35 / 25 | 20 / 10 | 22 / 12 |
| Bava Kamma 2a–3b | 77 | 50 / 19 | 29 / 9 | 50 / 19 |
| Kiddushin 2a–3a | 37 | 35 / 14 | 20 / 7 | 31 / 14 |
| Gittin 2a–3a | 31 | 31 / 28 | 17 / 11 | 31 / 28 |
| Berakhot 2a–3a | 41 | 41 / 35 | 26 / 15 | 41 / 35 |
| Pesachim 2a–3a | 46 | 46 / 44 | 28 / 22 | 43 / 40 |

"Max rows" is the largest page (slots) at any step; "max rail" the longest
focus rail in slots. Releases: 0. Jitters: 0. Exposures: 1 (Pesachim's `אלא`).
At the step where v3 is worst, the `threads` page is between a half and a
ninth the size: Pesachim's `ותנא דידן` (v3: 45 rows, rail over 44) becomes 5
rows, rail over 4. `flat` is v3 with the releases removed — identical to v3 up
to the first closer, and never worse after it.

Bava Metzia 2a at 26, R. Yose's challenge arriving open — every earlier
challenge on the mishnah still on the page, every answer folded, two frames
(Rav Pappa's, Sumchos') intact with their landings visible:

```
┌   0  Mishnah: two hold a garment…
│   1  Why teach both 'I found it' and 'it is all mine'?
│      ▸ [2..9]   8 folded under 1                       (frame)
│  10  Rav Pappa: the first clause is a find…
│      ▸ [11..13] 3 folded under 10                      (thread)
├  14  Is the mishnah not Ben Nannas…
│      ▸ [15..15] 1 folded under 14                      (thread)
├  16  Is the mishnah not Sumchos…
│      ▸ [17..23] 7 folded under 16                      (frame)
│  24  Even Sumchos: this oath is rabbinic…
└  25  Is the mishnah not R. Yose…                       ◀ attention
```

The reader opens the Sumchos frame. Now, and only now, there are two rails —
the rake on Sumchos (`16 → 22, 24`) inside the mishnah's (`0 → 25`):

```
├┌  16  Is the mishnah not Sumchos…
││  17  Then whose — the rabbis?…
││      ▸ [18..18] 1 folded under 17
││  19  But for Sumchos, all the more…
││  20  Even Sumchos: he spoke of two uncertain claims…
││      ▸ [21..21] 1 folded under 20
│├  22  Even Sumchos: he spoke where there is a prior lien…
││      ▸ [23..23] 1 folded under 22
│└  24  Even Sumchos: this oath is rabbinic…            ◀ attention
└   25  Is the mishnah not R. Yose…
```

Bava Kamma 3a at 69: the fifth `אלא` on `אהייא` arrives as in v3 — `29`, a
band of 38, `68`. Opened one level, the band is the elimination itself:

```
┌  29  Then Rav Pappa's 'some are not like their primaries' — about which?
│  30  If about these horn derivatives — they too intend harm…
│  31  Rather horn's derivatives are like horn; Rav Pappa meant…
│      ▸ [32..38] 7 folded under 31
│  39  The master said 'consumes' is tooth…
│      ▸ [40..43] 4 folded under 39
│  44  Let it write only 'sends'…
│      ▸ [45..47] 3 folded under 44
│  48  What is a derivative of tooth?…
│      ▸ [49..49] 1 folded under 48
├  50  Rather tooth's derivatives are like tooth…
│      ▸ [51..52] 2 folded under 50
├  53  Rather foot's derivatives…      ▸ [54..59]
├  60  Rather pit's derivatives…       ▸ [61..64]
├  65  Rather mav'eh's derivatives…    ▸ [66..67]
└  68  Rather fire's derivatives are like fire…          ◀ attention
```

v3 shows the same click as 38 flat rows.

The fixture at 48 under `flat`, the reader presses the rail: the page is v3's
(`0 1 ▸[2..46] 47`). Presses again: 31 slots — Rava's scope sentences as rows
(they hang from Rava, who is visible above the band), every challenge of
either side as a row, every answer folded — with the rail still `1 → 47`.

---

## 3. Changes to `viz/src`

Contained. Nothing in `sugya.ts`, `taxonomy.ts`, `anatomy.ts`, `verdict.ts`,
`markers.ts`, `glyphs.ts`, `icons.ts`, `render.ts`, or the existing fixtures.

### 3.1 Files

| File | Change | Size |
|---|---|---|
| `folding.ts` | **Keep** `LONG_REACH`, `reachOf`, `isLongReach`, `landingStart`, `closesBusiness`, `arrivesFolded`, `summarizeFold`, `FoldSummary`. **Replace** `Focus`, `FoldRange`, `foldRangeOf`, `isHidden`, `latestLongReach`, `focusAfterSeek`, `slotsOf` with the fold tree, lifted from `foldtree.ts`: `Policy`, `DEFAULT_POLICY`, `Band`, `FoldState`, `EMPTY`, `Tree`, `treeOf`, `anchorOf`, `insert`, `decompose`, `expose`, `frameFor`, `arrive`, `replay`, `toggle`, `press`, `Slot`, `layout`, `slotOf`, `isRow`, `Rail`, `railsOf`, `assertLaminar`. `summarizeFold` takes `{from, to}` half-open; `Band.to` is inclusive — convert at the call site (`to + 1`), and clip `to` at `rendered - 1`. | ~450 lines replace ~120 |
| `layout.ts` | Add `LANE_GAP = 8`. `latticeWidth(deepest, indent, lanes)` grows the margin by `(lanes - 1) × LANE_GAP`. `laneX(lane, lanes) = RAIL_X + (lanes - 1 - lane) × LANE_GAP` (lane 0 nearest the text). `railPath` and `railBranch` already take the trunk x. | small |
| `app/useSugyaController.ts` | State: `focus: Focus` → `fold: FoldState`; `attention` is inside it. Handlers: `seek` → forward `arrive`/backward `replay` (§1.5); `toggleFold` → `press(attention)`; `pressHandle(id)` → `press(index)`; new `toggleBand(key)` → `toggle`. Derived: `slots = layout(rendered, fold.bands)`; `rails = railsOf(...)` resolved to measured points; `handles` per §3.2.1; `onRail` per §3.2.2; `connectors`, `beads`, `ticks`: "hidden" means `!isRow(slots, i)`. `planScroll` per §3.2.5. Options gain `policy: Policy`; changing the policy re-derives the state with `replay(revealed)`. | moderate |
| `app/hooks/useFoldPolicy.ts` (new) | The policy switch for evaluation (§3.2.7): `threads`/`flat`, remembered in `localStorage` under `sugya-lattice.fold-policy`, exactly as `useAnatomyLayer.ts` remembers the anatomy layer. | small |
| `app/components/LegendBar.tsx` | A second switch beside the anatomy layer's: *Fold finished threads* (on = `threads`). Same markup as the existing `legend-switch`. | small |
| `app/SugyaView.tsx` | Slots map to `UnitRow` or `FoldBand` as now; `FoldBand` gets the new props; pass the lane count so the margin is right; wire the policy switch. | small |
| `app/components/RailLayer.tsx` | `rails: readonly Rail[]` (positions resolved), each with `lane` and `role`. Lane 0 as today (hit path, `role="button"`, `aria-pressed`, keyboard, peek). Outer lanes per §3.2.3. | moderate |
| `app/components/FoldBand.tsx` | Props gain `caption` (§3.2.4), `depth`, `kind`. `summarizeFold` unchanged. | small |
| `app/components/UnitRow.tsx` | `Handle` shape unchanged; the `hidden` field now means "rows hidden between this move and its target". | none / trivial |
| `app/styles.css` | `--lane-gap`; `.rail-frame` (outer lanes); `.fold-depth-N` or an inline `margin-left` for band indentation; margin from the lane count. | small |
| `check.ts` | §3.4. | moderate |
| `fixtures/index.ts`, `fixtures/research/*.ts`, `app/pages/GalleryPage.tsx` | §3.3. | small |
| `index.ts` | Export the new types and functions; drop `Focus`, `FoldRange`. | small |

### 3.2 Interaction details

#### 3.2.1 Handles

A handle appears on a revealed move when its target is far or hidden — v3
§3.5, unchanged in principle:

| The move… | Handle | Text | Press does |
|---|---|---|---|
| is the attention and its frame is closed | solid, `--rail` colour, `aria-pressed=true` | `↑ acts on k · label · N folded` | opens one level |
| is the attention and its frame is open or absent | solid, `--rail`, `aria-pressed=false` | `↑ acts on k · label · unfolded` | folds (closes or makes the frame) |
| is long-reaching and not the attention | dashed, grey | `↑ acts on k · label` | takes attention, folded |
| is local and its target is not a row | dashed, grey | `↑ acts on k · label · folded away` | exposes the target |
| is local and its target is a row | none (an elbow is drawn if `isLongRun` allows) | — | — |

`N` for the attention's handle is the number of hidden rows between the move's
slot and its target's slot (sum of `hidden` over the band slots between), not
one band's size.

#### 3.2.2 Rows on the rail

`onRail` (the ring around icons the rail joins, v3 §3.2) contains the lane-0
rail's anchor, move and teeth. Outer lanes add nothing to it.

#### 3.2.3 Drawing the chain

Lane 0 is v3's rail: `RAIL_WIDTH` 3px, `--rail`, cap at the target, dashed
when the move's effect is `unsettle`, each tooth a branch in its own effect's
style, hit path 18px, `role="button"`, `aria-pressed` = frame closed, label
`Fold/Unfold the N sentences between this move and {target label}`.

Lanes 1..k: 1.5px, `--rail` at 45% opacity, no cap, no branches (a 4px tick at
each tooth is acceptable), `pointer-events: none`, a `<title>` naming the
relation (`{target label} → {move label}`). Not focusable.

The margin is reserved for `maxLanes` lanes whenever the sugya has any
long-reaching move, so rows never shift horizontally when a second rail
appears: `LATTICE_MARGIN + (maxLanes - 1) × LANE_GAP` = 34px at the defaults.
A sugya with no long-reaching move keeps the 18px margin, as today.

#### 3.2.4 The band

`FoldBand` is a `<li>` with one `<button>` (as today). Content, in order:

1. Count: `N sentences folded` (`N === 1` → `sentence`).
2. Caption (new). Frame with `by`: `between {short of target(by)} and {short
   of by}`; thread, or frame without `by`: `under {short of anchor}`. Falls
   back to `speaker`, then to ordinal (`sentence k`).
3. Movement names, as today (`summarizeFold`); omit for a thread whose rows
   all belong to one movement.
4. Standing, as today: `all answered` / `k unanswered`.
5. Hint: `unfold`.

Indentation: `margin-left` = `indent × (depth(anchor) + 1)` so a band sits
where its anchor's children sit. `aria-label`: `N sentences folded {caption}`.

#### 3.2.5 Scrolling

`planScroll` decides from how the state moved, as in v3 §4:

| State change | Scroll |
|---|---|
| the attention's frame became closed (a closer arrived, or press folded it) | the attention's **target** row to the top (`start`) |
| the attention's frame became open by press | the attention **move** to the centre |
| a band toggled by click | after opening: the first row that appeared, `nearest`; after closing: the band row, `nearest` (no-ops when on screen) |
| an arrival exposed its target | the frontier, `nearest` (that is reading on) |
| only the frontier moved | the frontier, `nearest` |

Rows keep `scroll-margin-top: 88px`.

#### 3.2.6 Horizon rows

Rows `revealed .. rendered-1` are never inside a band (invariant 5); `layout`
emits them as rows and they render blurred as today.

#### 3.2.7 The policy switch

The two policies must be comparable on the same page, live, because the
question the user will be asking is "which of these do I want to read?". A
switch in the legend bar, beside the anatomy layer's, labelled *Fold finished
threads*, with the same explanatory note pattern: on, a challenge that arrives
folds the finished business behind it (`threads`); off, it arrives over the
open text as before (`flat`). Remembered in `localStorage`. Flipping it
re-derives the fold state at the current step (`replay`), so the reader stays
where they are and the page re-lays out under the other rule.

### 3.3 Fixtures: the sugyot to look at

The existing fixtures cannot show this work: four have no long-reaching move,
and the fifth (Bava Metzia 21b–22b) never nests beyond one frame. The six
research skeletons in `nested_rail_research/skeletons.ts` do — Bava Kamma
nests two deep, Pesachim exercises exposure, Bava Metzia 2a exercises frames
inside threads and the two-rail page. The user has to be able to open them in
the app to judge the visualization.

Decided: copy three of them into `site/src/rail/fixtures/research/` as ordinary
`Sugya` modules — `bm-2a-ochazin`, `bk-2a-toldos`, `pes-2a-or` — and add them
to `FIXTURES` so they appear in the gallery and have pages. In the gallery,
list them under their own heading, *Research passages*, with one sentence
saying their labels were inferred for this study, not taken from Ramchal's
discussion (their `discussedAt` already says so); the gallery lead's "Five
passages" becomes a count. They run in `check.ts` with the others. Do not
import `skeletons.ts` from `viz/src`; copy the data. Whether they stay in the
gallery after the evaluation is the user's call.

### 3.4 Acceptance checks for `check.ts`

Keep every v3 assertion on `reachOf`, `landingStart`, `closesBusiness`,
`arrivesFolded`, `summarizeFold`. Delete those on `focusAfterSeek`,
`foldRangeOf`, `slotsOf`. Add the following; every number below is what
`simulate.ts` prints today. Indices are 0-based unit indices; `f[a..b]@x` is a
closed frame over `a..b` anchored at `x`, `t[a..b]@x` a closed thread.

**Invariants, all fixtures + research fixtures, both policies, every step:**
laminar; no release; no jitter; `to < revealed` for every band.

**Fixture `bava-metzia-yeush`, `flat`:** page identical to v3 at all 57 steps.
This is the regression net for the whole change and should be written
**first**, before `folding.ts` is touched: copy v3's `Focus`, `focusAfterSeek`,
`foldRangeOf` and `slotsOf` into `check.ts` as a private oracle (they are ~60
lines), and assert the new `replay` + `layout` gives the same slots at every
step. Then: `press` on every visible long-reaching move at every step gives
v3's `pressHandle` page (349 cases, 0 mismatches). `simulate.ts` has both
checks written against the prototype; port them.

**Fixture `bava-metzia-yeush`, `threads`:**
- step 48: 29 slots; rows `0 1 6 8 10 12 14 16 18 20 24 29 33 34 41 47`;
  bands `t[2..5]@1 t[7]@6 t[9]@8 t[11]@10 t[13]@12 t[15]@14 t[17]@16 t[19]@18
  t[21..23]@20 t[25..28]@24 t[30..32]@29 t[35..40]@34 t[42..46]@41`; one rail
  `1 → 47`, teeth `20 29 41`, span 27.
- step 51: 3 slots `0 f[1..49]@0 50`; rail `0 → 50`, span 2.
- step 51, toggle `frame:0:1`: 31 slots; rows include `1 6 8 … 18 20 24 29 33
  41 47 48 49 50`; rail `0 → 50`, teeth `6 8 10 12 14 16 18 24 33`, span 30.
- step 48, `flat`, `press(47)`: `0 1 f[2..46]@0 47` (v3's fold); `press(47)`
  again: 31 slots, attention still 47, rail `1 → 47`, span 29; then
  `press(24)`: attention 24, `f[1..23]@0` closed, rail `0 → 24`, span 2.

**`bm-2a-ochazin`, `threads`:**
- step 26: 11 slots; rows `0 1 10 14 16 24 25`; bands `f[2..9]@1 t[11..13]@10
  t[15]@14 f[17..23]@16`; rail `0 → 25`, teeth `14 16`, span 10.
- toggle `frame:16:17`: 17 slots; two rails — lane 0 `16 → 24` tooth `22`,
  lane 1 `0 → 25` teeth `14 16`; attention 24.
- then toggle `frame:1:2`: 19 slots; lane 0 `1 → 10`, lane 1 `0 → 25`;
  attention 10.
- Rav Pappa's frame `f[2..9]@1` exists from step 11 onward (`discharge` folds
  on arrival: v3 §7.7).

**`bk-2a-toldos`, `threads`:**
- step 69: 19 slots ending `29 f[30..67]@29 68`; rail `29 → 68`, span 2.
- toggle `frame:29:30`: 35 slots; rows `30 31 39 44 48 50 53 60 65 68` inside
  the frame; bands `t[32..38]@31 t[40..43]@39 t[45..47]@44 t[49]@48
  t[51..52]@50 t[54..59]@53 t[61..64]@60 t[66..67]@65`; rail `29 → 68`, teeth
  `50 53 60 65`, span 18.
- then toggle `thread:31:32`: 36 slots; lane 0 `31 → 48`, lane 1 `29 → 68`;
  attention 48.
- the frame's key stays `frame:29:30` from step 51 (first `אלא`) to 69: five
  closers extend one band.

**`pes-2a-or`, `threads`:**
- step 43: 25 slots; rail `2 → 42`, teeth `13 23 24 36 37 39 40 41`, span 22.
- step 44: 7 slots `0 1 2 3 4 f[5..42]@2 43`; the arrival exposed `ka-salka`
  (4); rail `4 → 43`, span 2. `anchorOf` of the frame is 2 (Rav Huna), not 4.
- step 45: 5 slots `0 1 t[2..42]@1 43 44`; nothing released.
- toggle `thread:1:2`, then `thread:2:3`, then `frame:2:5`: 31 slots; lane 0
  `2 → 42` teeth `13 23 24 36 37 39 40 41`, lane 1 `0 → 44`.

**Wording:** the band's caption for `f[2..46]@0` in the fixture reads
`between Rava: despair and the item a river swept off`; for `t[11..13]@10` in
Bava Metzia 2a, `under Rav Pappa: …`.

### 3.5 The spec document — after the verdict

Every version of the waterfall has shipped with a spec document at the repo
root, and this one should too — **but only once the user has looked at the
visualization and kept it** (§4). Writing it earlier documents something that
may be thrown away or changed by the evaluation. When the time comes:
`SUGYA_WATERFALL_V5_FOLD_TREE.md`, in the shape of v3:

0. The short version · 1. Why (the research, briefly; link `VERDICT.md`) ·
2. Rules — 2.1 bands, 2.2 arrival, 2.3 decomposition, 2.4 rails and lanes,
2.5 the reader's actions, 2.6 what the band says · 3. Drawing · 4. Scrolling ·
5. Measured (the §2 table, and pixel measurements from the browser at
1320×940 as v3 §5 did) · 6. Changes to the v3/v4 rules · 7. Open · Appendix —
files touched.

State these as changes to v3 rules: §2.3/§5 (an open arrival no longer
releases; under `threads` it folds finished threads, so at 48 the fixture
shows 29 rows and Rava's rake as teeth); §7.2 and §7.3 closed; §7.7 answered
by Rav Pappa's frame.

---

## 4. Evaluation: what the user looks at, and what can be turned

The implementer's job ends by handing over a running app and this checklist.
The user's job is to read these pages and decide. `npm run dev`, then:

### 4.1 Pages to read

Each item names a sugya, a step (the number in the slider / the ordinal of the
last revealed sentence), and what to do there. Read each with the *Fold
finished threads* switch on, then off, on the same step.

1. **Bava Metzia 21b–22b (`bava-metzia-yeush`), step 48.** The last תא שמע.
   Off (`flat`): v3's page, 48 rows, one rail over 46 — is that page useful,
   or is it the wall of text v3 §5 complained about? On (`threads`): 29 rows,
   every challenge of both sides visible, every answer folded, rail over 27
   with Rava's earlier challenges as teeth. Does the page read as "here is the
   whole debate, answers tucked away"?
2. **Same sugya, step 51.** The ruling. Both policies show `Abaye · 49 folded
   · הלכתא` (v3's page). Click the band. v3 showed 49 rows; now 31 slots — the
   scope sentences, both sides' challenges as rows, every answer a small band.
   Is *one level* the right amount to reveal per click? Click a small band:
   does the second level feel like reading, or like a chore?
3. **Same sugya, step 48, `flat`.** Click the rail (fold the open challenge by
   hand). Click it again. This is v3's fold/unfold with the new "one level"
   behaviour. Then press the handle on sentence 25 (`the thief who passed it
   on`): it takes the rail, folded, and the page you had opened stays as it
   was below. Does attention move the way you expect?
4. **Bava Kamma 2a–3b (`bk-2a-toldos`), step 69.** The fifth `אלא` on
   `אהייא`. Three slots around a band of 38. Click the band: the six
   candidates as rows, each with its objection folded beside it, rail from
   `אהייא` to the last `אלא` with the four other `אלא`s as teeth. **This is the
   page the research was about**: is a fold-inside-a-fold legible, or does it
   need something the plan does not have?
5. **Bava Metzia 2a–3a (`bm-2a-ochazin`), step 26.** R. Yose's challenge on
   the mishnah, open. Then click the Sumchos band (`7 folded · between Is the
   mishnah not Sumchos and Even Sumchos: this oath is rabbinic`). **Two rails
   in two lanes** — the only way a nested rail ever appears. Look at the thin
   outer rail: is it context or clutter? Is the 8px lane gap enough? Should
   the outer rail be invisible until hovered?
6. **Pesachim 2a–3a (`pes-2a-or`), steps 43 → 44 → 45.** Fifteen proof-texts
   arriving as teeth on a rail (43); `אלא` folding them all, and the
   assumption it lands on coming back out of its band (44); `ותנא דידן`
   returning to the mishnah with **nothing released** — the whole `מאי אור`
   discussion, 41 sentences, is one band under the question, with the `אלא`
   frame intact inside it (45). v3 at 45 showed 45 rows. Is the 5-row page
   at 45 too little — does the reader still know where they are? Open the
   band twice and then the `אלא` frame: three clicks to the fifteen
   proof-texts as rows. Too many?
7. **The four short fixtures.** Nothing should have changed. Check one.
8. **Scrolling.** In Bava Kamma, walk 50 → 69 with the slider: the page
   should stay put around `אהייא` as the `אלא`s land, and the band should
   grow. Nothing above the frontier should twitch on a local arrival.

### 4.2 Knobs worth turning while looking

These are one-line changes; the implementer should leave them easy to find.

| Knob | Where | What it changes |
|---|---|---|
| `threads` / `flat` | the legend switch | whether a challenge's arrival folds finished business |
| `LONG_REACH` (4) | `folding.ts` | what counts as long-reaching, hence what gets a rail, a handle, and tooth status |
| "long-reaching moves are teeth" | `isTooth` in `folding.ts` | drop the clause and a two-sided dispute folds the other side's challenges one level down |
| `maxLanes` (3) | `DEFAULT_POLICY` | how many enclosing rails may be drawn |
| outer-lane styling | `.rail-frame` in `styles.css` | opacity, width, or `display: none` to see the page with only lane 0 |
| `LANE_GAP` (8) | `layout.ts` | spacing between lanes |
| band caption | `captionOf` in `folding.ts` | `between … and …` vs `under …` vs movement names only |

### 4.3 Possible verdicts, and what each means

- **Keep it.** Write the spec document (§3.5), decide the shipped default
  policy, decide whether the research passages stay in the gallery. Then, and
  only then, `LATER_DATA_DRIVEN.md`.
- **Keep the folds, not the outer rails.** Set `maxLanes` to 1; everything
  else stands. The chain code stays, unused, or goes.
- **Keep `flat` only.** Set the default and hide the switch; the `threads`
  decomposition still runs when a band is opened (that is what "one level"
  is), so the code stays.
- **Not this.** The `flat` ≡ v3 check means reverting `folding.ts` to v3 loses
  nothing the user has not already rejected. The research fixtures can stay
  as v3 pages.

---

## 5. Build order

Two steps, then stop for the evaluation. Each leaves the app working. Run
`npm run check` before and after each.

**Step 1 — Fold tree under `flat`: v3's pages, one-level unfolding.**
1. Write the v3 oracle check first (§3.4): copy v3's `Focus`,
   `focusAfterSeek`, `foldRangeOf`, `slotsOf` into `check.ts` as private
   functions and assert against them.
2. Replace `Focus` in `folding.ts` with the fold tree, lifted from
   `foldtree.ts`: `FoldState`, `layout`, `arrive`, `replay`, `toggle`,
   `press`, `expose`, `frameFor`, `railsOf` (returning one rail for now).
3. Rewire `useSugyaController` (§3.1). `RailLayer` still draws one rail.
   `FoldBand` gets its caption and depth.
4. Add the research fixtures to `fixtures/` and the gallery (§3.3).
5. Port the §3.4 checks that apply under `flat`.

*Done when:* `flat` ≡ v3 at all 57 steps of the fixture and 349/349 presses;
laminar / no release / no jitter on all eight fixtures; in the browser,
unfolding at step 51 shows one level (31 slots) rather than 49 rows, and the
research passages open from the gallery.

**Step 2 — `threads` and the chain of rails: the visible feature.**
1. `decompose` on open arrivals under `threads`; `Policy` on the controller;
   the legend switch (§3.2.7), default `threads`.
2. `railsOf` chain; `RailLayer` draws every lane; `layout.ts` lanes; the
   margin reserves `maxLanes` (§3.2.3).
3. Handles (§3.2.1), rows on the rail (§3.2.2), scrolling (§3.2.5).
4. The rest of §3.4.

*Done when:* every §3.4 check passes under both policies; every item in §4.1
can be walked in the browser as described; nothing on the four short fixtures
has changed.

**Then stop.** Hand over with §4. The spec document (§3.5) and everything in
`LATER_DATA_DRIVEN.md` wait for the verdict.

---

## 6. Decisions taken, and what is still the user's call

Defaults an implementer should take without asking:

1. **Attention when a band opens** moves to the latest visible long-reaching
   move on the band's anchor at or after the band's start; unchanged if there
   is none. Pressing a rail or handle never moves attention away from the
   pressed move.
2. **Band captions** per §3.2.4; frames name the relation (`between … and …`),
   threads name the anchor (`under …`).
3. **Outer-lane rails are not interactive** beyond a `<title>`. The move's
   handle offers the same action.
4. **The margin reserves `maxLanes`** whenever the sugya has a long-reaching
   move, so rows never shift horizontally.
5. **Two-sided disputes** are handled by "long-reaching moves are teeth". A
   notion of *position* (a root, an opposition on a position, an answer to a
   question on a position — `analyze.ts` has an `isPosition`) is not needed
   for the eleven sugyot; if a real sugya ever shows the difference, prefer
   the position rule and adopt it in `isTooth`.
6. **Absorption** (a band cutting through another; later wins) never fires on
   the corpus and is kept for the invariant. Log it in development; if it
   fires on a real sugya, look at the sugya before trusting the rule.
7. **`Movement`** stays as navigation furniture (minimap boundaries, band
   names). It is now largely what a thread band is and could later be
   re-derived from the fold tree so there is one notion; not in scope.
8. **Research fixtures go in the gallery** under their own heading, for the
   evaluation (§3.3). Whether they stay is decided afterwards.
9. **The policy is a live switch** in the legend, default `threads`, so the
   evaluation can compare both on one page (§3.2.7).
10. **No refactoring beyond what the feature needs.** No Scene layer, no
    config object, no JSON, no changes to `render.ts`. The fold logic stays a
    pure module; that is the only provision made for later.
11. **Complexity** is not a concern: everything is O(n²)–O(n³) on n ≤ 100,
    recomputed per interaction; `simulate.ts` replays 325 steps with layouts,
    rails and 349 presses in about 0.2 s of Node. Memoise `treeOf` per sugya
    and stop.

The user's call — stop and ask:

- Anything that makes the `flat` page differ from v3's on the fixture. That
  equality is the safety net for step 1 and should not be traded away
  silently.
- Anything in §4.1 that cannot be made to work as described without a rule
  this document does not have.

Decided *by the evaluation*, not before it: the shipped default policy;
whether the research passages stay in the gallery; whether `LONG_REACH` stays
at 4; whether outer rails stay; and whether any of `LATER_DATA_DRIVEN.md`
happens.
