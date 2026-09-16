# Lessons from building visualization 5.1, "Lattice interval under doubt"

**Scope: this one visualization, and no other.** Everything below was learned while implementing §5.1 of `derech-tevunos-visualization-spec.md` — a three-valued formal context, its floor and ceiling concept lattices, and the Shabbos 5b fixture. This is **not** a general guide to the seven visualizations. None of it has been tested against §§5.2–5.7, each of which has a different formal object and will produce its own notes. Where a lesson looks like it generalizes I have marked it as a **Rule**; treat even those as a hypothesis until a second build confirms them.

**Companion to:** `derech-tevunos-visualization-spec.md` (the build spec).

**How to read this.** Sections 1–4 are what I did. Sections 5–8 are what I learned, each stated as a rule attached to the concrete incident that produced it. Section 9 lists where the implementation knowingly deviates from the spec. Section 10 is a checklist extrapolated from this single build.

**What shipped.** `web/` — a Vite + React 19 + TypeScript app. The concept engine is `web/src/lattice/fca.ts`, the acceptance test is `web/src/lattice/fca.test.ts`, the hand-curated passage is `web/src/lattice/fixtures.ts`, and `web/src/lattice/buckets.ts` is the presentation layer that turns concepts into plain-language buckets. Components are in `web/src/components/`. `npm run check` runs the typecheck plus ten tests.

---

## 1. The order of work that worked

Do these in order. Each step produces something the next step depends on, and each one is cheap to redo if the step before it turns out wrong.

1. **Read spec §§0–4 before §5.** The spec says this and it is not padding. §3 (regression traps) and §4 (extraction) change implementation decisions you would otherwise make wrongly by default.
2. **Verify the fixture against the source text.** Before writing code. See section 2.
3. **Compute the expected answer by hand.** For §5.1 this means deriving the four concepts of the floor and the two of the ceiling with pen and paper. It took ten minutes and it meant that every later disagreement between code and expectation could be attributed to the code.
4. **Write the engine and the acceptance test. Run it. Get it green.** No rendering yet, no styling, no components.
5. **Only then build the UI.**

The payoff of 3 and 4 is that when the UI later disagreed with the engine, I knew instantly that the UI was wrong. That is exactly what happened (section 6.3), and it is why the bug took minutes rather than an afternoon.

**Why §5.1 is a good place to start even though the spec ranks it fourth.** The spec's build order puts §5.6 first because it is cheapest. But §5.1 has the only *exact* acceptance test in the document — a specific set of concepts, written out. That makes it the best vehicle for establishing the engine and the testing discipline, and §§5.2 and 5.3 both depend on the lattice engine anyway. If you are starting fresh, §5.6 first for speed, §5.1 first for foundations.

---

## 2. Grounding the fixture in the source

The spec's fixtures are pre-digested, which makes it tempting to copy them straight in. Verify anyway; you need the plain-language labels and the Hebrew terms, and those only come from the text.

The source is a facing-page bilingual edition, **odd pages Hebrew, even pages English**. Practical method:

1. Search a distinctive English content word from the fixture — `colonnade` for Shabbos 5b. This lands you in the English column with the facing Hebrew nearby.
2. Read a wide window around the hits (the passage spans pp. 196–210). The English and Hebrew alternate, so a window twice the size of the passage is right.
3. Confirm the *structure*, not just the topic. For Shabbos 5b, Ramchal numbers his reconstruction 1a–1c, 2a–2c, 3a–3c, 4a–4c and collapses it into a single chain at p206. Finding those numbers is the proof you are looking at the passage the spec means.
4. Pull the Hebrew terms from the facing odd pages, not from memory. `הפסק פטור באמצע` for the exempt gap and `מוציא מחנות לפלטיא דרך סטיו` for the colonnade case both come from p199 and p197 respectively.
5. Record the page number with every cell. `fixtures.ts` has a `cellNotes` map keyed by cell, each note ending in a page cite. This is spec §7's requirement and it is what makes the formalization checkable rather than asserted.

**Do not guess an index.** Spec §4 says a missing aspect must be `null`, never a default, because a guessed aspect silently re-enables the fallacy the system exists to catch. Shabbos 5b indexes on neither aspect nor modality, so the fixture records `{ kind: "unindexed" }` and `modality: undefined`, and the UI prints "not indexed in source". Resisting the urge to write `accident` here is a correctness decision, not a stylistic one.

---

## 3. The engine

Small, pure, and reusable by §§5.2 and 5.3. Worth reading `fca.ts` before writing anything new; the shape below is the part that generalizes.

**Representation.** Extents and intents are bitmasks over the subject and predicate index arrays. This makes closure operations single expressions and makes concept identity a cheap integer comparison. It caps a context at 31 terms per side, which is checked and thrown on, and is far beyond the hand-curated fixtures the spec recommends for v1.

**Three-valued cells as a union, not a nullable boolean.** `type CellValue = "in" | "out" | "doubt"`. Doubt is a state of the argument, not a missing value (spec trap 1), and naming it that way in the type makes the distinction survive every refactor. The reader's own answers are a separate `Resolution = ReadonlyMap<CellKey, Decided>` — kept apart from the source's cells so a choice can never be mistaken for something the sugya said.

**Bounds as a parameter.** `latticeOf(context, bound, resolution)` with `bound: "floor" | "ceiling"`. One code path, two readings of doubt. `latticeInterval` returns both plus the still-open cells.

**Concepts via NextClosure.** Ganter's algorithm, written as a tail-recursive `step` rather than a mutating loop. The spec allows brute force over `2^|S|` at fixture scale and it would have been fine; NextClosure was not much harder and it removes the size ceiling for §5.2, which will want bigger contexts.

**Exports that exist only so tests can be honest.** `incidenceRows`, `extentOf`, `intentOf` are exported because the fixed-point test needs them. See section 6.2 — this is not API bloat, it is the difference between a real test and a decorative one.

---

## 4. Translating the formal object for a lay audience

This was the largest single body of work and none of it is in the spec, because the spec is written for an implementer rather than a reader.

**A concept becomes a "bucket".** Plain framing: *a bucket is a set of cases that answer every question identically; two cases in the same bucket are, as far as these questions go, the same case.* That sentence does the whole job of explaining a formal concept, and a reader who has never heard of a lattice can act on it.

**A Hasse diagram becomes a list ordered broadest-first.** Rank information survives as reading order — most general bucket at the top, most specific at the bottom — without asking the reader to parse an edge diagram. Cover edges are computed and available; they are simply not drawn in the primary view. For three cases and two questions, the drawn edges add nothing a reader can use.

**Shapes carry meaning, colour only reinforces it.** Spec trap 15 is cheap to satisfy if you design the icon set before the palette: yes is a check, no is a cross, unknown is a dashed circle containing a question mark, and each is accompanied by the word. In the case diagrams, the "safe spot" is a *dashed stroke*, not a coloured fill, so the schematics survive monochrome printing.

**Keep the formalism, fold it away, and print it from the engine.** The bottom of the page has a collapsed "formal version" with the lattice notation, the fiber, the `2^k` count, and the citation. Critically, the notation is rendered by calling `formatLattice()` rather than transcribed into JSX, so it cannot drift from what is actually being computed. A hardcoded lattice diagram in a comment or a template is a lie waiting to happen.

---

## 5. Lesson: re-derive plain language from the data, never paraphrase the formal gloss

The spec says resolution "removes the concept `({C,F}, {E})`, which is the concept 'has an exempt gap and is not liable'". Read literally that gloss is loose: the intent of `({C,F}, {E})` is `{E}` alone, and `F` — one of its two members — *is* liable. So "has an exempt gap and is not liable" is not what that concept says.

What is actually true, and what I checked against the rows:

- Under the floor, `C` has row `{E}`, `F` has `{E,L}`, `D` has `{L}`. All three differ. There exists a case with an exempt gap that is not liable, so "has a gap" and "is liable" are genuinely different groupings.
- Under the ceiling, `C` has row `{E,L}` and `F` has row `{E,L}`. **They are identical.** Every case with a gap is now liable, so the two groupings collapse.

That gives a plain sentence that is both vivid and exactly true: **the walkway case and the street case become the same kind of case.** It is better copy than the formal gloss *and* it is more accurate.

**Rule.** When you translate a formal result into plain language, go back to the data and re-derive the plain statement. Paraphrasing the formal gloss compresses in ways that become false when un-compressed, and your reader only ever sees the un-compressed version.

---

## 6. Three correctness incidents

### 6.1 In-rank ordering is a rendering decision that presents as a correctness failure

**Symptom.** The first runnable version of the harness failed the "floor is a diamond" comparison, producing `({F,D}, {L})   ({C,F}, {E})` where the spec writes `({C,F}, {E})   ({F,D}, {L})`. Every other assertion passed, including the concept count.

**Cause.** NextClosure emits concepts in lectic order by intent. The spec's written layout implies a left-to-right convention within a rank that the algorithm does not supply. The lattice was correct; the drawing order was undefined.

**Fix.** Sort within a rank by intent bitmask ascending. `{E}` = `0b01` sorts before `{L}` = `0b10`, which reproduces the spec's order and, more importantly, is deterministic.

**Rule.** Separate "is the lattice right" from "is the layout order defined". Choose an explicit in-rank order or every snapshot comparison you write will be flaky, and you will waste time hunting a correctness bug that does not exist.

### 6.2 A test written in terms you did not export is a decorative test

**Symptom.** My "every concept is a Galois fixed point" test failed while every other test passed, reporting nonsense values.

**Cause.** The derivation operators were private, so rather than exporting them I wrote an assertion in terms of what I *could* reach — intersecting the intents of concepts whose extents contained the extent under test. That is not the fixed-point property. It is not any property. The test was wrong, not the engine.

**Fix.** Export `incidenceRows`, `extentOf`, `intentOf` and assert the actual thing: `extentOf(rows, intent) === extent` and `intentOf(rows, extent, full) === intent`, for every concept, under both bounds.

**Rule.** If you cannot state the property with the module's public surface, widen the surface. Contorting an assertion to fit what happens to be exported produces a test that passes for the wrong reason, which is worse than no test because it consumes your confidence budget.

### 6.3 The interval-collapse bug: a control should select a world, not edit the data

This is the important one, and it is a semantic error rather than a coding error.

**Symptom.** Visible only in a browser screenshot. With the answer pinned to "not guilty", the right-hand panel still read "If he is guilty" but displayed the left panel's four buckets.

**Cause.** I passed the reader's `resolution` into `latticeInterval(context, resolution)` and rendered the resulting `floor` and `ceiling` in the two panels. But pinning a doubtful cell makes it insensitive to the bound — that is what pinning *means*, and there is a test asserting exactly that. So both bounds became the same lattice, and each panel dutifully rendered it under its own unchanged heading.

**Fix.** Compute the two bounds from the source alone, `latticeInterval(fixture.context)`, memoized once. The reader's choice now drives only which panel is marked "the law now" versus "ruled out", the grid's cell marks, and the count of pictures still on the table.

**Rule.** When visualizing an interval or a space of possibilities, the interactive control **selects among fixed worlds**; it does not mutate the underlying data. Those two designs look identical until the moment a selection collapses the thing being selected from, and then one of them silently shows the wrong world under the right label.

Note the corollary: `latticeInterval(context, resolution)` is still correct for counting consistent contexts and for driving the grid. The same function legitimately serves two roles, and you have to be deliberate about which role each call site is playing.

---

## 7. Lesson: comparing the two lattices requires choosing a key, and the obvious key is wrong

The spec warns that the floor and ceiling "have different node sets and no natural map between them". That is easy to nod at and hard to honour, because the UI wants to tell the reader what changed.

- **Comparing by concept** `(extent, intent)`: all four floor concepts vanish and two new ones appear, because the intents shift too. Technically true, useless to a reader.
- **Comparing by extent** (which cases are bucketed together): two buckets vanish, `{F,D}` and `{F}`. This is the intuitive reading and the one a reader can act on.

I compare by extent, label those buckets "only exists on this side", and state the choice explicitly in the folded formal section. The two panels are drawn as separate bordered regions with no connecting edges, because an unmarked cross-panel edge would assert exactly the node identity that does not exist.

**Rule.** Any diff between two structures with no canonical map needs its comparison key named in the UI. Pick the key that answers the reader's question, and say which key you picked.

---

## 8. Environment lessons

The one section here that has nothing to do with §5.1 and transfers wholesale to any build in this repo. These cost real time and none of them are obvious from inside the code.

**No JS runtime, and no sudo.** WSL here had no `node`, and `sudo` requires a password. The right move is the official tarball into a user prefix, not `apt`:

```bash
curl -fsSLO https://nodejs.org/dist/v24.21.0/node-v24.21.0-linux-x64.tar.xz
curl -fsSLO https://nodejs.org/dist/v24.21.0/SHASUMS256.txt
sha256sum -c --ignore-missing SHASUMS256.txt      # verify before trusting
tar -xJf node-v24.21.0-linux-x64.tar.xz -C ~/.local/lib
mv ~/.local/lib/node-v24.21.0-linux-x64 ~/.local/lib/nodejs
ln -sf ~/.local/lib/nodejs/bin/{node,npm,npx} ~/.local/bin/
```

`~/.local/bin` was already on `PATH`, so this persists across login shells with no profile edit. Check `bash -lc 'which node'` to confirm rather than assuming.

**Node 24 runs TypeScript directly.** Type stripping is on by default, so `node --test "src/**/*.test.ts"` works with no build step and no test framework. Imports must carry the explicit `.ts` extension, which also requires `allowImportingTsExtensions` in `tsconfig.json`. Vite resolves the same specifiers happily, so one import style serves both.

**The repo is on `/mnt/c`, so Vite needs polling.** WSL receives no inotify events across the Windows mount. Without `server.watch.usePolling`, hot reload fails *silently* and serves stale modules. This actively caused a misdiagnosis: after fixing the bug in 6.3 I reloaded, saw the old behaviour, and briefly concluded the fix was wrong. The config now sets polling with a comment explaining why, so nobody removes it.

**npm 11 blocks postinstall scripts.** esbuild needs its postinstall or Vite cannot build. `npm install-scripts approve esbuild`. This will recur after any clean `node_modules` wipe.

**Verify in a real browser.** The 6.3 bug was invisible in code review and invisible to the test suite, because the tests covered the engine and the bug was in how the app wired the engine to two headings. It was obvious in the first screenshot. Take a screenshot, then click the control and take another; comparing two states catches wiring errors that no single state reveals.

**A `never` exhaustiveness check does not protect stale test expectations.** Separately, in the sibling rail project, adding a `discharge` variant to an `Effect` union correctly forced every `switch` to handle it, but a test still asserted the old outcome (`defeated` where the new semantics give `discharged`). The type system moved the code and left the expectations behind. When you add a union variant, grep the test expectations too.

---

## 9. Where this deviates from the spec

State these rather than quietly diverging.

- **No animated crossfade.** §5.1 asks for a crossfade specifically so the transition is not read as monotone growth. Not implemented. The current design sidesteps the hazard differently — both worlds are always on screen side by side, so there is no transition to misread — but the spec's request is unmet.
- **Pinning is a control beside the grid, not a click on the `?` cell.** §5.1 says "click a `?` cell to pin it". The grid highlights the doubtful cell and the three-position control sits directly beneath it, labelled with the case and question. Equivalent in function; not the specified gesture.
- **No Hasse diagram in the primary view.** Deliberate, on audience grounds (section 4). Cover edges and ranks are computed and exported, so drawing one is additive work, not a rewrite. The formal section shows the lattices as text notation rather than a drawn diagram.
- **The fiber is `unindexed`.** Not a deviation so much as a reading: §5.1 says to restrict to one `(aspect, modality)` fiber, and this fixture's fiber is the unindexed one, because the passage indexes on neither. All cells share it, so the restriction holds trivially.

---

## 10. A checklist, extrapolated from this one build

Offered as a starting point, not a validated process — it comes from a single visualization with a single fixture. Expect §§5.2–5.7 to add steps and contradict some of these.

1. Read spec §§0–4. Re-read §3.
2. Locate the fixture passage in the bilingual edition by searching a distinctive English word. Confirm structure, not just topic. Pull Hebrew terms from the facing odd pages.
3. Write the fixture with a page cite on every datum. Leave any index the source does not supply as unindexed.
4. Compute the expected output by hand.
5. Write the domain types so illegal states are unrepresentable, and name the resting state (`doubt`, `unindexed`) rather than encoding it as null-ish.
6. Write the engine and its acceptance test. Green before any rendering. Export whatever the test needs to state its properties honestly.
7. Fix a deterministic layout order explicitly.
8. Write the plain-language translation by re-deriving from the data. One sentence defining the central object in terms a non-specialist can act on.
9. Design the icon set before the palette. Every state distinguishable by shape and word.
10. Decide what the interactive control *selects* versus what it *edits*, and write that decision down before wiring it.
11. If you diff two structures, name the comparison key in the UI.
12. Render the formal layer from the engine, folded away.
13. Run it. Screenshot two different states. Click things.
14. List your deviations from the spec in the code or a note.

**Reusable from this build.** `fca.ts` gives §5.3 its per-fiber lattices directly, and gives §5.2 concept enumeration and cover edges; §5.2's additional requirement is a retractable closure and real negative information, which the current single three-valued matrix cannot express — §5.2 will need `(I⁺, I⁻)` as the spec says. `buckets.ts` is the pattern to copy for any lay-facing translation layer: a thin pure module between engine and components, so components never touch bitmasks.

---

## 11. What I would do differently

- **Build the app, not an artifact, when the visualization *is* the deliverable.** I first built this as a Cursor canvas, which forced the engine to be copied inline because a canvas is a single self-contained file. That copy is a second implementation that the acceptance test does not cover — a real cost, and the decisive argument for a plain React app whenever the thing will be iterated on.
- **Do not lead with the formalism.** The first cut carried presheaf and fiber vocabulary into the visible UI. The spec's stated audience is "an agent that will implement", and I mistook that for the *visualization's* audience. Those are different readers and the spec's register is not the artifact's register.
- **Reach for the browser sooner.** I had a full test suite passing and a subtly wrong app. The gap between "the engine is correct" and "the page tells the truth" is exactly the wiring, and only the rendered page shows it.
