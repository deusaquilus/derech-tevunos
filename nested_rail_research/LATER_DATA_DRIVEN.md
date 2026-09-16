# Later: rendering the waterfall from JSON

**Not now.** This is parked material from `IMPLEMENTATION_PLAN.md`. The order
of work is: build the nested-rail visualization, look at it, decide whether it
is right — and only then any of this. Nothing here should be started before
the visualization has been judged (plan §4). It is kept so the visualization
work does not paint itself into a corner: the fold tree's state is plain
data, and the one rule to respect while building it is *keep the pure logic
free of React and pixels*, which the plan already requires.

---

## 1. The cut: four documents and a pipeline

```
sugya.json ──▶ parse ──▶ Sugya ──▶ analyze ──▶ Analysis ─┐
                                                          ├─▶ sceneOf ──▶ Scene ──▶ <SceneView/>   (React, measures rows)
view.json  ──▶ ViewConfig ────────────────────────────────┤                    └──▶ renderScene()  (static SVG, fixed rows)
state.json ──▶ FoldState (or: replay(steps, toggles)) ────┘
```

New modules when the time comes: `viz/src/scene.ts` (Scene types, `sceneOf`),
`viz/src/config.ts` (`ViewConfig`, defaults), `viz/src/parse.ts`
(`parseSugya`), `viz/schema/sugya.schema.json` (generated),
`viz/test/scenes/*.json` (golden snapshots).

### 1.1 Content: `sugya.json` — the one document that is authored

Of the four documents, **only this one is written per sugya**. `view.json` is
global and optional (defaults exist); `state.json` is ephemeral; the Scene is
output. Hand the mechanism a `sugya.json` and nothing else, and it renders.

The file is **self-describing in the sense that matters**: it describes the
*argument*, not the picture. Each sentence carries one move from the ch. 9
taxonomy and a pointer to the sentence it acts on; everything visible —
depth, standing, verdicts, movements, bands, frames, rails, lanes — is a
function of those two fields. Nothing about layout is ever written into it,
so there is no per-sugya code to write and none exists today: the app reaches
a sugya only through the `FIXTURES` array (`Root.tsx`, `GalleryPage.tsx`,
`SugyaPage.tsx` look it up by id). The six research skeletons are the proof:
each was written as rows of `id / move / target / he / en` and the fold tree,
the rails and the pages in the plan's §2 came out of the mechanism unchanged.

A minimal valid file:

```json
{
  "$schema": "https://…/derech-tevunos/sugya.schema.json",
  "format": "derech-tevunos/sugya@1",
  "id": "example",
  "title": "…", "tractate": "…", "folio": "…", "discussedAt": "…",
  "units": [
    { "id": "claim",  "en": "…", "move": { "element": "statement",  "subtype": "firsthand" } },
    { "id": "ask",    "en": "…", "move": { "element": "difficulty", "subtype": "objection" }, "target": "claim" },
    { "id": "answer", "en": "…", "move": { "element": "resolution", "subtype": "settlement" }, "target": "ask" }
  ]
}
```

Everything else in today's `Sugya` is optional and additive: `he`, `short`,
`speaker`, `marker`, `provenance`, `attested`, `note`, `anatomy`, `party`.

The vocabulary is closed and referenced, not carried: `move` must name a leaf
of `LEAVES` in `taxonomy.ts`, and what a leaf *does* (`effectOf`) lives in
code. A sugya file cannot invent a move — that is Ramchal's claim that these
elements exhaust Talmudic argument, and it is what makes any correctly
labelled sugya renderable. The `format` field pins the taxonomy version so a
file and a renderer can disagree loudly rather than silently.

`parseSugya(json)` is `validate()` from `sugya.ts` (unique ids, targets
precede) plus: every `move` is a known leaf; enums (`provenance`, anatomy
kinds) are in range; `target` ids resolve. A JSON Schema can be generated from
the TS types in a build step so editors validate as you type; the types stay
the source of truth.

What self-describing does **not** mean: raw text in, picture out. Segmenting a
passage into sentences and labelling each with a move and a target is
authoring — by hand, or by a model, with `markers.ts` (stock Aramaic phrases
→ leaves) as a seed for the `marked` labels. The mechanism starts where the
labels end.

Two **optional** additions worth reserving, both additive:

- `fold?: "frame" | "open"` on a unit — an editorial override of
  `arrivesFolded` when the taxonomy's effect gets it wrong (v3 §7.8: a
  `תיובתא` that stands alone would arrive open).
- `targets?: string[]` — v2 §9.2's multi-target, for `אלא` on both positions.
  The rail would draw to both; `anchorOf` already lands on their common
  ancestor.

Not in JSON: the ch. 9 rules (`resolveStanding`, `resolveStatus`). They are
the thesis, and a reader should not be able to change what a `סתירה` does by
editing a config file. Their *parameters* are another matter — see the view.

### 1.2 View config: `view.json`

Everything that is a constant today, in one object with defaults, threaded
through the pure functions as a parameter instead of imported as a module
constant:

```json
{
  "longReach": 4,
  "openArrival": "threads",
  "maxLanes": 3,
  "horizon": 3,
  "longSugya": 14,
  "beadsOnElbows": true,
  "layers": { "anatomy": true, "rails": true, "connectors": true, "stateOfPlay": true, "minimap": "auto" },
  "tokens": { "railWidth": 3, "laneGap": 8, "latticeMargin": 18, "indent": 22 }
}
```

`LONG_REACH`, `HORIZON`, `LONG_SUGYA`, `BEADS_ON_ELBOWS`, `RAIL_WIDTH`,
`LATTICE_MARGIN`, `INDENT` are the current homes of these. The `Policy` type
the plan introduces is the first three fields.

### 1.3 State: `state.json`

`FoldState`, serialised with unit ids rather than indices so it survives
re-annotation (from Bava Metzia 2a at step 26):

```json
{
  "revealed": 26,
  "attention": "q-r-yose",
  "bands": [
    { "kind": "frame",  "anchor": "q-two-clauses", "from": "a-chada",        "to": "q-ze-veze",      "closed": true, "by": "a-rav-pappa" },
    { "kind": "thread", "anchor": "a-rav-pappa",   "from": "tzricha",        "to": "a-zuzei",        "closed": true },
    { "kind": "thread", "anchor": "q-ben-nannas",  "from": "a-ben-nannas",   "to": "a-ben-nannas",   "closed": true },
    { "kind": "frame",  "anchor": "q-sumchos",     "from": "q-ela-rabbanan", "to": "q-kal-vachomer", "closed": true, "by": "a-sumchos-3" }
  ]
}
```

Ephemeral in the app, but worth having as a document: it is a deep link ("open
the page at this step with these bands open"), a test fixture, and the input
to the static exporter for a specific figure. It can also be given as
`{ "steps": 26, "toggles": ["frame:q-sumchos:q-ela-rabbanan"] }` and replayed.

### 1.4 Scene

Plain data, no pixels, everything the renderer needs and nothing it has to
compute:

```ts
type Scene = {
  revealed: number; rendered: number; lanes: number;
  slots: SceneSlot[];        // reading order
  rails: SceneRail[];        // by slot index
  handles: Record<string, Handle>;
  connectors: { id: string; targetId: string }[];   // local elbows; geometry is the renderer's
  roots: { id: string; verdict?: Verdict; open: number }[];
};
type SceneSlot =
  | { kind: "row"; id: string; index: number; depth: number; revealed: boolean; frontier: boolean;
      verdict?: Verdict; standing: Standing; onRail: boolean; badges: RowBadges }
  | { kind: "band"; key: string; bandKind: "frame" | "thread"; anchorId: string; from: number; to: number;
      depth: number; caption: string; summary: FoldSummary };
type SceneRail = { id: string; anchorSlot: number; moveSlot: number; teethSlots: number[];
  lane: number; role: "focus" | "frame"; style: ConnectorStyle; label: string; hidden: number };
```

Pixel positions are deliberately absent: the React renderer measures icons
(`useIconPositions`) and maps slot indices to points; the static renderer uses
fixed row heights. The same Scene serves both — which closes v3 §7.1 (the
static export cannot draw rails: it can, from a Scene with a state).

What is *not* in a Scene: transient pointer state (`peeked`, `hot`, hover).
That stays in the controller. The anatomy layer's switch and lenses *are*
inputs to `sceneOf` (they decide which badges appear), passed alongside the
`ViewConfig`.

The Scene is also a **test surface**: snapshot the page at every step of every
fixture as JSON and diff. The golden files are readable (they are the outlines
`simulate.ts` prints, as data) and the diff on a rule change is the spec
change.

### 1.5 What the controller becomes

`useSugyaController` today computes slots, rail, handles, connectors, beads
and ticks from state and measurements. Under this cut it holds `FoldState` and
the measurements, calls `sceneOf(sugya, analysis, fold, config, layer)`, and
resolves the Scene's slot indices to measured points. Its handlers become
`dispatch(action)` over `{ seek, press(id), toggle(key), hover(id) }`, each a
pure function on `FoldState`. `SugyaView` becomes `<SceneView scene points
config/>`. The components stop knowing about folds; they draw slots, rails and
bands.

---

## 2. Steps, when the time comes

Each ships on its own. They follow the visualization; A is a prerequisite for
C and D; B is independent.

**A — Scene extraction.** `viz/src/scene.ts`, `sceneOf` over the fold tree,
`<SceneView/>`; golden snapshots under `viz/test/scenes/`. *Done when:* the
app looks and behaves exactly as before and the golden files pass.

**B — Config.** `viz/src/config.ts` gathers `LONG_REACH`, `HORIZON`,
`LONG_SUGYA`, `BEADS_ON_ELBOWS`, `RAIL_WIDTH`, `LATTICE_MARGIN`, `INDENT`,
`LANE_GAP` and the fold `Policy` into `ViewConfig` with defaults, threaded as a
parameter.

**C — JSON documents.** `viz/src/parse.ts` and the schema; fixtures move to
`viz/src/fixtures/*.sugya.json` with `fixtures/index.ts` importing them
(`with { type: "json" }` works in Node 22+ and Vite); `state.json` load/save
for deep links; the app takes `?sugya=…&view=…&state=…`. *Done when:* a sugya
file that is not in the repository renders from a URL with no code change, and
an invalid one is refused with a message naming the unit and field.

**D — Static export from a Scene.** `render.ts` gains `renderScene`, so
`npm run export` can emit the figures in the specs (the press at 49, the
ruling, Bava Kamma's candidates) from state files instead of screenshots.
*Done when:* `out/` contains those figures with rails and bands drawn.
