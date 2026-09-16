# AGENTS.md — DerechTevunosPublic

## Code style

Pragmatic functional TypeScript, written by a functional programmer with a Scala
background. Three documents, in order of authority:

| Document | Role |
|---|---|
| [`CODE_STYLE_DOCTRINE.md`](CODE_STYLE_DOCTRINE.md) | **Authoritative.** The long-form statement, with reasoning and worked examples. Read it before arguing with a rule. |
| [`.cursor/rules/minimal-fp-style.mdc`](.cursor/rules/minimal-fp-style.mdc) | Always-on summary of the same philosophy in miniature. |
| [`.cursor/rules/typescript-domain-modeling.mdc`](.cursor/rules/typescript-domain-modeling.mdc) | Discriminated unions and exhaustive matching, applied to `.ts`/`.tsx`/`.astro`. |

The organizing principle is **make invalid states unrepresentable and let the
compiler enforce the business rules.** A OR B is a discriminated union on a
literal `kind`; A AND B is a `type` record with `readonly` fields. If you are
reaching for a boolean flag, a sentinel (`-1`, `""`, `MAX_SAFE_INTEGER`), or a
cast to find out which shape your data has, the answer is a union. Every match
over a union ends in `default: return assertNever(x)` so that adding a variant
becomes a compile error at every consumer. `ts-pattern` is the one blessed FP
library, and only for matches a flat `switch` cannot express — two values at
once, nested variants, or guards. No `fp-ts`, no `Effect`, no HKTs, no lenses.

Two rules that are easy to violate while refactoring rather than while writing:
**conditions must be pure** (a predicate decides, the branch performs), and
**effects live in dedicated, clearly-named blocks** (partition purely first,
then act on each group). A function named `parse…`, `classify…`, `build…`,
`find…` or `to…` never has a side effect.

### `viz/` is the local reference implementation

The doctrine's own examples live in another repo. This one has its own, and they
are worth reading before writing new code here:

| File | What it demonstrates |
|---|---|
| `viz/src/folding.ts` | The densest union work in the repo — laminar bands, `readonly` on 72 lines, and the fold-tree invariants stated as types |
| `viz/src/sugya.ts` | The status/standing reducer: a pure fold over a data grammar, no behaviour attached to the nodes |
| `viz/src/verdict.ts` | Exhaustive matching with a `never` guard, deciding which of status or standing to report |
| `viz/src/format.ts` | The I/O boundary done properly: `parseSugya` reports *every* fault with its path, and `SugyaFormatError extends Error` is the one class in the tree |
| `viz/src/taxonomy.ts` | Closed vocabularies as `as const` tables rather than TS `enum`s |
| `viz/src/app/router.tsx` | A hash router in fifty lines with no dependency — the house answer to "should we add a library" |

Verified 2026-09-16: **zero** TypeScript `any` anywhere in `viz/src`, and
exactly one class declaration (the `Error` subclass above). Hold new code to
that standard.

## What is in this repository

| Path | What it is |
|---|---|
| `DerechTevunos_benyehudah_bilingual_fixed.md` | The book, Hebrew and English, chapters 1–11 plus the Sugya Context Index. **Prefer this copy** for labelling; the terminology is aligned to the Diaspora Yeshiva translation. |
| `DerechTevunos_benyehudah_bilingual.md` | The parent: same interleaving, pre-alignment English. |
| `viz/` | The rail visualization. React 19 + Vite, hash-routed, its own npm package. The main app. |
| `web/` | Two computed visualizations (lattice interval under doubt, circumscription diff). Separate npm package. |
| `icons_v3/` | The current glyph set — 104 SVGs. `ICONS_REFERENCE.md` is the contract for using them, `METHODOLOGY.md` for making them. |
| `mascott/` | The mascot. Source of the site palette; see below. |
| `DERECH_TEVUNOS_*.md`, `SUGYA_*.md` | The system and file format, written for a classifier. Roughly 1 MB; agent-facing, mostly not published. |
| `nested_rail_research/` | The study that the v5 fold tree implements. |

`viz/` and `web/` are independent npm packages. There is **no** workspace root,
so `npm install` at the repository root does nothing — install inside the
package you are working on.

## Node and toolchains

Node 22 or later. Before claiming a change to `viz/` works, run its own gate:

```
cd viz && npm run check      # typecheck + the acceptance tests
```

`npm test` in `viz/` runs `src/check.ts`, which holds the shipped JSON passages
to the TypeScript fixtures as an oracle. A change that makes those disagree is a
real regression, not a stale test.

Do not disable, `skip`, comment out, or delete a failing test. Fix the code or
fix the test; if you believe a test is genuinely invalid, **ask first**.

## The mascot is the palette source — settled 2026-09-16

Sampled from the PNGs rather than eyeballed:

| Role | Hex | Where it comes from |
|---|---|---|
| Ink | `#0E1119` | The outline, everywhere |
| Hood | `#2D2F37` | Robe highlight |
| Gold | `#FDC223` | Goggle rims, robe piping |
| Cyan | `#02E8FD` | Goggle lenses, the crystal |
| Off-white | `#FDFDFD` | Beard |

`mascott/just_beard_goggles.png` is already a logo mark — gold rings, cyan
lenses, white beard, transparent background. It is the favicon and the nav
glyph; no additional art is needed.

**Gold and cyan are unusable as text on white** (contrast ratios about 1.7:1 and
1.5:1). So the literal mascot colours go on dark chrome only, and the light
content pages get a darkened brass ramp that keeps the hue and passes WCAG. Do
not "fix" a light-page heading back to `#FDC223`.

### The rail's colour vocabulary is nearly full, and it is semantic

`viz/src/app/styles.css` and `viz/src/theme.ts` have already spent most of the
wheel on *meaning*: green `#15803d` accepted, amber `#a16207` under doubt, red
`#b91c1c` rejected, indigo `#4338ca` for the rail itself, and violet / teal /
magenta / slate for the four chapter 1–8 anatomy families. The site's brass
(`#8a5a00`) is deliberately **darker in value** than the rail's amber so the two
read as different signals despite sharing a hue. That gap is the whole reason
the palette works — do not lighten the site brass toward `#a16207`.

### Namespace every site CSS custom property `--dt-*`

`viz` declares `--fg`, `--muted`, `--border`, `--surface`, and `--page` on
`:root`. A site that declares its own variables under those names works fine
until the rail is mounted in-page, and then silently restyles it. Namespacing is
free now and a retrofit later.

## The site — decided 2026-09-16, not yet built

The site will live in `site/` (Astro, Vercel, `derechtevunos.com`) and is a
heavily stripped adaptation of `exobench-site`. Nothing below is implemented
yet; it is written down so the decisions are not re-litigated.

### React, not Vue

`exobench-site` is Vue, but only four of its twenty-nine Vue components survive
the cull — 1017 lines, of which 452 are CSS that ports by copy-paste. The
decisive argument is that **`viz/` is already React 19**: staying on Vue means
shipping two renderers the moment the rail appears in-page. `@astrojs/react`
accepts React 19, so the versions already agree.

React has no `<style scoped>`. Use CSS Modules (`.module.css`, natively
supported) for what was scoped, and a plainly-imported stylesheet for the
genuinely global rules — the search highlighter's `.search-highlight` is
injected into article DOM from outside its component and must stay global.

Four ported behaviours fail *silently* in React and need care: a debounced
callback declared in a component body is rebuilt every render and never fires;
`setTimeout` closures that read focus/hover state need refs, not state;
`new Chart(canvas)` throws under double-invoked effects unless the instance
lives in a ref; and an `await` before touching a canvas needs a cancellation
flag or it leaks a chart onto a detached node.

### The rail is a sub-app at `/rail/` first, an island later

Build `viz/` with its own Vite into the site's `public/rail/` and serve it
there. Measured 2026-09-16, this needs **zero** changes to `viz`: its 1875-line
stylesheet has only three global rules (`:root`, `*`, `body`), there are no
absolute asset paths or `fetch()` calls anywhere in the app, and the hash router
derives everything from `location.hash` with no server rewrites.

Those same measurements make the later move — importing `SugyaView` as a React
island at real URLs like `/rail/bava-metzia-yeush` — small rather than a
rewrite. Do it when `viz` stops moving, not before. Astro bundles Vite 6 and
`viz` declares Vite 8; verify that at island time instead of assuming it.

### Doctrine carried over from `exobench-site`

- **Every URL the site emits about itself is slash-free**, the homepage `/`
  excepted. Three places must agree: the canonical tag, the sitemap `serialize`
  hook, and `vercel.json`'s `trailingSlash: false`. On the ExoBench domain
  Google canonicalized the slash-free form of all 22 indexed URLs and overrode
  the trailing-slash tag outright; converting *to* trailing slashes would have
  invalidated every one. This site starts on the correct policy with nothing
  indexed, so there is no migration — just do not drift.
- **A figure whose point is its text must be real HTML in the first response**,
  via the `HtmlFigure` component inlining a sibling `.html` fragment. Not a PNG,
  not an `<img>`, not a new data-block type. Google does not reliably OCR a
  dark-theme monospace screenshot and a reader cannot select pixels.
- **The supplemental bus carries typed data blocks** (`chart`, and whatever the
  visualizations need later) with a build-time schema that fails on unwritten
  copy. It is not a dump for arbitrary HTML — that is what `HtmlFigure` is for.
  The ExoBench `mcp-call` block type does **not** come across.
- **"Indexing" is two unrelated systems.** Fuse.js site search over a generated
  `search-index.json` is one; the canonical/sitemap/lastmod SEO machinery is the
  other. Keep both, don't conflate them. The lastmod map is keyed on the
  *slash-ful* pathname because the sitemap hook looks it up before stripping —
  a "cleanup" there silently drops every lastmod.
- **Verify emission from build output, not by assumption.** After touching
  canonical or sitemap code, read the built `sitemap-0.xml` and the built HTML.

Dropped deliberately: the `docs-combined.md` split pipeline and its dev watcher
(this repo's sources are already separate files), the Planet PostgreSQL
syndication machinery, and the `mcp-call` schema.

### The Hebrew is the largest piece of new work

Measured 2026-09-16 against `DerechTevunos_benyehudah_bilingual_fixed.md`: 357
lines contain Hebrew; 172 of those also contain Latin characters, 205 contain
parentheses and 166 contain digits. Parentheses and digits are bidi-neutral, so
English prose quoting Hebrew inline — `"…" (הוא מותיב לה והוא מפרק לה)` — puts
its punctuation on the wrong side without explicit isolation (`dir="auto"` or
`<bdi>`). That is roughly 200 sites, so it belongs in the markdown-to-HTML step,
never in hand-authored markup.

The file's claim of 174 matched paragraphs per side is true and usable, but the
longest Hebrew paragraph is **7211 characters**, so the two languages will never
have equal heights. A two-column layout therefore has to be a grid in which
**each paragraph pair is its own row** — alignment enforced per paragraph rather
than depending on equal text length. It degrades to stacked on mobile for free.

## Content voice

Carried from the ExoBench build: **no em-dashes in figure captions.** That was a
hard build failure there, enforced in the supplemental schema and sourced to an
`Alexander_Voice_Guide.md` that is not in this repository — so treat it as the
author's standing preference rather than a checkable rule until that guide
arrives. Captions are written copy, not data readouts; a mechanical readout
("Query plan: 1M rows · Index Only Scan · 14.9 ms") is a placeholder, not a
caption.

## Boundaries — do not

- Introduce `fp-ts`, `Effect`, HKTs, monad transformers, or a lens library.
  `ts-pattern` is the single allowed exception, for hard matches only.
- Cast a coproduct (`as SomeVariant`) or use `any`. Narrow on the discriminant,
  or use `unknown` plus explicit checks at a real I/O boundary.
- Drop the `assertNever` default from a match over a union.
- Use a sentinel value where a variant belongs, or a TS `enum` where an
  `as const` string union works.
- Call an effectful function inside an `if` / `switch` / `while` / ternary
  predicate, or hide an effect inside a `map` / `reduce`.
- Remove, shorten, or reword code comments when moving or refactoring code.
  Comments travel verbatim with the code they describe.
- Disable, skip, or delete a failing test to make a build pass.
- Edit `viz/` on the assumption it is idle — it is under active development in
  parallel. Coordinate before touching it.
- Lighten the site's brass toward the rail's `--doubt` amber, emit a
  trailing-slash canonical or sitemap entry, replace an `HtmlFigure` with a PNG,
  or declare an un-namespaced CSS custom property. Each has its reasoning above;
  all four look like tidying and are regressions.
