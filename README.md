# Derech Tevunos Public

Ramchal's *Derech Tevunos* (*The Ways of Reason*) as a system for labelling
dialectical text — and a visualization that draws a sugya as a lattice of those
labels.

The Hebrew of the 1742 Amsterdam print, as keyed by [Project Ben-Yehuda](https://benyehuda.org)
(catalogue 53742), is in the public domain. Original work in this repository is
under the Apache License 2.0; see `LICENSE` and `NOTICE`.

---

## The rail visualization

`viz/` is the main app. It takes a sugya file — each sentence labelled with the
move it makes (ch. 9) and, optionally, what it *is* and how it stands to the one
it acts on (chs. 1–7) — and draws the result as a **waterfall**: a staircase of
rows, a **rail** for a long-reaching relation, and **folds** that put settled
argument behind a band.

Nine passages ship with the app: five from Ramchal's own examples, and four
opening sugyot used to study nested folds and rails. A file of your own can be
opened at `#/open` without a rebuild.

The format the page reads is `derech-tevunos/sugya`, version `1`. The complete
reference is `DERECH_TEVUNOS_SUGYA_JSON_GUIDE.md`; the file-only document is
`SUGYA_JSON_FORMAT.md`. How the page looks, and why, is the waterfall series
(`SUGYA_WATERFALL_VISUALIZATION_V1.md` through `SUGYA_WATERFALL_V5_FOLD_TREE.md`).
Module-level notes live in `viz/README.md`.

### Bring it up

Node 22 or later. From the repository root:

```
cd viz
npm install
npm run dev
```

The app is at http://localhost:5174/.

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run check` | Typecheck and the acceptance tests |
| `npm run export` | Static SVGs into `viz/out/` |
| `npm run build` | Production bundle into `viz/dist/` |

The gallery is `#/`. A shipped passage is `#/sugya/<id>`. To look at a file you
have just written, go to `#/open`, drop it, pick it, or paste the JSON.

---

## What else is here

### The book

| File | What it is |
|---|---|
| `DerechTevunos_benyehudah_bilingual.md` | Hebrew and English side by side, chapters 1–11. The Hebrew is the 1742 Amsterdam text; the English is a clean-room translation of that Hebrew. |
| `DerechTevunos_benyehudah_bilingual_fixed.md` | The same interleaving, with the English *terminology* aligned to the Diaspora Yeshiva translation (Feldheim, 1988/2014). A Sugya Context Index of every cited passage, plus `[ed.]` notes, follows chapter 11. Prefer this copy for labelling. |

### Guides for agents

| File | What it is |
|---|---|
| `DERECH_TEVUNOS_FOR_AGENTS.md` | The system, rewritten for a classifier: five layers (move, form, relation, warrant, axis), the closed vocabularies, the procedure. |
| `DERECH_TEVUNOS_SUGYA_JSON_GUIDE.md` | The system *and* the file format, in one document. Use this to write a sugya file. |
| `SUGYA_JSON_FORMAT.md` | The file alone: fields, enums, validation, how a file is loaded. |

### Plans and earlier visualizations

| Path | What it is |
|---|---|
| `SUGYA_WATERFALL_VISUALIZATION_V1.md` | The waterfall: rows, the depth staircase, revealing one sentence at a time. |
| `SUGYA_WATERFALL_AT_SCALE_V2.md` | What broke on a fifty-seven-sentence sugya: movements, handles, the horizon. |
| `SUGYA_WATERFALL_V3_RAIL.md` | The rail and the fold. |
| `SUGYA_WATERFALL_V4_ANATOMY.md` | The ch. 1–7 anatomy layer (badges, beads, lenses). |
| `SUGYA_WATERFALL_V5_FOLD_TREE.md` | Nested folds and a rail inside a rail. |
| `SUGYA_WATERFALL_V6_ADDITIONAL_ICONS.md` | The rest of `icons_v3`: a second variant, a fourth fallacy, and chapter 8's nine grounds. |
| `nested_rail_research/` | The study that v5 implements: `VERDICT.md`, a reference fold-tree, and `IMPLEMENTATION_PLAN.md`. `node simulate.ts` from that directory reprints the pages. |
| `derech-tevunos-visualization-spec.md` | Seven visualizations that *compute* something (concept lattices, circumscription, aspect lanes). Sibling of the waterfall, not a replacement. |
| `web/` | The first two of those: lattice interval under doubt, and circumscription diff. `cd web && npm install && npm run dev` — http://localhost:5173/. Notes from that build: `viz-5.1-lattice-interval-under-doubt-lessons.md`. |

### Icons

Three generations of the glyph set the waterfall's anatomy layer uses.

| Path | What it is |
|---|---|
| `icons/` | First pass: chapter 1–3 and 4–7 SVGs, plus the generators. |
| `icons_v2/` | Second pass, with a contact sheet and `ICONS_REFERENCE.md`. |
| `icons_v3/` | Current set (72 icons). `ICONS_REFERENCE.md` is the contract for using them; `METHODOLOGY.md` is the contract for making them. |

---

## License

Apache License 2.0. The 1742 Hebrew is public domain and is not claimed under
that license. Details in `NOTICE`.
