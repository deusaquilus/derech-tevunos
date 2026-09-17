# AGENTS.md — DerechTevunosPublic

## Code style

Pragmatic functional TypeScript, written by a functional programmer with a Scala
background. Three documents, in order of authority:

| Document | Role |
|---|---|
| [`CODE_STYLE_DOCTRINE.md`](CODE_STYLE_DOCTRINE.md) | **Authoritative.** The long-form statement, with reasoning and worked examples. Read it before arguing with a rule. Its header maps every example it cites onto the `site/src/rail/` file that demonstrates the same thing here, and records the places this repo deliberately differs. |
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

### `site/src/rail/` is the local reference implementation

The doctrine was written against a different codebase, so its examples are
mapped onto local ones in its header. These are the files that mapping points
at, and they are worth reading before writing new code here:

| File | What it demonstrates |
|---|---|
| `site/src/rail/folding.ts` | The densest union work in the repo — laminar bands, `readonly` on 72 lines, and the fold-tree invariants stated as types |
| `site/src/rail/sugya.ts` | The status/standing reducer: a pure fold over a data grammar, no behaviour attached to the nodes |
| `site/src/rail/verdict.ts` | Exhaustive matching with a `never` guard, deciding which of status or standing to report |
| `site/src/rail/format.ts` | The I/O boundary done properly: `parseSugya` reports *every* fault with its path, and `SugyaFormatError extends Error` is the one class in the tree |
| `site/src/rail/taxonomy.ts` | Closed vocabularies as `as const` tables rather than TS `enum`s |
| `site/src/rail/app/router.tsx` | A hash router in fifty lines with no dependency — the house answer to "should we add a library" |

Verified 2026-09-16: **zero** TypeScript `any` anywhere in `src/rail`, and
exactly one class declaration (the `Error` subclass above). Hold new code to
that standard.

Two local conventions the doctrine does not predict. **The exhaustiveness guard
here is the inline binding**, `default: { const exhaustive: never = status;
return exhaustive; }`, not a throwing `assertNever(x)` helper — see the three in
`site/src/rail/verdict.ts`. Both give the same compile error when a variant is
added, so match the neighbours rather than converting one to the other. And
**the rail is covered by one acceptance oracle, not per-module unit files**:
`site/src/rail/check.ts` holds the shipped JSON passages to their TypeScript
fixtures. New site code outside `src/rail/` uses `vitest` per module, as the
doctrine describes.

### Six patterns the long-form doctrine does not state

Taken from the author's Kotlin doctrine (`kotlin-compiler-server/AGENTS.md`),
translated to TypeScript. The first three are **already practised** in this
codebase and in `exobench-site` but written down nowhere, which is how a
later "simplification" removes them. The last three are new.

**1. Spread an empty object to avoid repeating a conditional field.** The point
is not immutability, which the doctrine already covers — it is that the absent
case becomes `{}`, so a field that only sometimes appears is added once instead
of in every branch.

```typescript
// The field is repeated in every branch, and grows with the union.
const bad = (r: Result, alt?: Alt) =>
  r.kind === "ok"
    ? { status: "ok", data: r.data, alt: alt ? { url: alt.url } : undefined }
    : { status: "err", message: r.error, alt: alt ? { url: alt.url } : undefined };

// Added once. The empty object contributes nothing.
const good = (r: Result, alt?: Alt) => {
  const altPart = alt !== undefined ? { alt: { url: alt.url } } : {};
  return r.kind === "ok"
    ? { status: "ok", data: r.data, ...altPart }
    : { status: "err", message: r.error, ...altPart };
};
```

The array form is the same idea: `...(x !== undefined ? [x] : [])`. Both are
already in use — see `scripts/build-blog-lastmod.ts`, `audit-plan-text.ts` and
`src/lib/linkedin/postSegments.ts` in `exobench-site`.

**2. Name a combining operation after its algebraic honesty.** Do not call
something `plus`, `merge`, or `concat` unless it really is total and has an
identity. If it is defined only on same-shape operands, or can throw, say so in
the name — `absorb`, `insert`, `intoBucket`. `a + b` must not look like it can
fail. `site/src/rail/folding.ts` already gets this right: the band combiner is
`insert(bands, band)`, which promises nothing about commutativity or identity,
and the invariant predicates (`contains`, `same`, `disjoint`, `covers`) are
separate pure functions rather than being folded into it. A future "combine two
analyses" operation is a **partial semigroup**, not a monoid; only the leaves
(a nullable accumulator, a counter) are true monoids.

**3. Derive, don't store — and make the derived value unstoreable.** If a value
follows from other fields, expose it as a function or getter over the variant
that has those fields. A stored copy is a second source of truth that goes
stale, and a stored copy that gets *serialised* is a stale value with a long
life. The rail follows this — rails, handles and verdicts are derived in
`useSugyaController`, never held — and so should anything the site persists:
derived quantities stay out of the JSON.

**4. Make the signature demand the variant.** When the caller has already
established which variant it holds, do not write a function that accepts the
union and pattern-matches with a dead branch. Type the parameter as the
narrowed member and the invalid call becomes unwritable rather than merely
handled. Push variant knowledge as far up the call chain as it will go.

```typescript
type Live = Extract<Lifecycle, { kind: "live" }>;

// The `starting` branch is dead, and its dummy return is a lie.
const bad = (l: Lifecycle): string =>
  l.kind === "live" ? host(l.uri) : "<no uri yet>";

// Only callable with what it actually needs.
const good = (l: Live): string => host(l.uri);
```

Use the union-accepting form only when the function genuinely handles every
variant — serialisation, logging, rendering a legend.

**5. Brand a value to prove a check already ran.** The Kotlin doctrine calls
this a *poor man's lens*: a wrapper whose factory demands proof of the variant,
so downstream code never re-checks. In TypeScript this is a branded type with a
smart constructor, and it is cleaner than the Kotlin because the brand can
intersect the narrowed field type directly instead of casting inside a getter.

```typescript
declare const Validated: unique symbol;
export type ValidatedDoc = SupplementalDoc & { readonly [Validated]: true };

/** The only way to obtain a ValidatedDoc. Throws on any issue. */
export const validate = (raw: unknown): ValidatedDoc => { /* … */ };
```

Worth reaching for when several downstream functions all depend on the same
already-established fact. The concrete case here: a supplemental document is
validated once at build time and then simply *trusted* everywhere after. A
brand makes "this passed the schema" a fact the compiler knows. Not worth it
for one or two call sites — a local narrowing is fine.

**6. An `&&` ladder over two unions is not exhaustiveness-checked.** This is the
real reason to escalate to `ts-pattern` for a two-value match, and it is
stronger than "the nesting is ugly". `if (a.kind === "x" && b.kind === "y")`
narrows correctly, so it compiles clean — and keeps compiling clean when a new
variant is added, failing at runtime instead. A `ts-pattern` tuple match with
`.exhaustive()` turns that into a compile error. Prefer `.exhaustive()` over
`.otherwise()`; a catch-all is only for a genuinely intended default, and should
be obviously deliberate.

## Engineering discipline

### A guardrail's failure is information, not an obstacle

When a threshold check fails, the threshold is telling you something true. Fix
the thing it measured; do not raise the number. This appears three times
independently across the author's other repositories — a payload ceiling, a
package-size budget, and a text audit — which makes it a principle rather than a
local rule. The same applies to a strict compiler flag: do not weaken one to
silence an error.

If you believe a threshold is genuinely wrong, raising it requires **new
evidence that the larger value actually works**, plus a dated row in the ledger
below saying what was measured. Not an argument that it ought to be fine.

### Measure, don't estimate; record the measurement and its date

Estimates are not acceptable for anything a check depends on. Take the
measurement, write it down with the date, and if a later change moves it, append
a row rather than editing the old one — the history is the point.

State uncertainty as a **bound**, not a guess. The model to copy, from the
Kotlin doctrine: "we do not know the actual limit; it lies somewhere in
`(95,226, 96,043]`", with the two measured data points tabulated and dated. That
is far more useful to the next person than a confident wrong number, and it says
plainly what experiment would narrow it.

Measurements taken so far live inline in the sections below, each with its date.

## Terminology

Two habits of this project make drift expensive: several words name genuinely
distinct constructs that sound interchangeable, and the same drawing has
collected more than one name. Pin them.

| Term | What it means | Not |
|---|---|---|
| **Sugyascade** | The user-facing proper noun for the drawing this site ships — settled 2026-09-16. A coinage on *sugya* + *cascade*: a cascade descends over a series of ledges, which is the shape, and it already means a chain where each stage is triggered by the last, which is the dialectic. Capitalized, never "the sugyascade". | The generic layout; anything `web/` draws |
| **waterfall** | The layout `site/src/rail/` draws: a staircase of rows, one per labelled sentence, plus rails and folds. The common noun for the genre, and the preferred name for the drawing as a whole in agent-facing prose. | Any *computed* construction |
| **glyph lattice** | An earlier name for the same waterfall, from when it was a standalone app called `sugya-lattice`. Do not use it in new prose. | A concept lattice |
| **concept lattice** | The FCA construction in `derech-tevunos-visualization-spec.md`, implemented in `web/`. A genuinely different visualization that *computes* something. | The waterfall |
| **rail** | The connector drawn for one relation that reaches back many rows. | The whole drawing; a row |
| **fold** | The band that puts a settled stretch of argument behind a summary the reader can open. | A collapse — the band keeps the verdict of everything inside it |
| **status** | A statement's truth-state: `accepted` / `doubt` / `rejected`. Doubt is the resting state, not a fallback (ch. 8 p. 112). | A move's force |
| **standing** | A move's remaining force: `live` / `weakened` / `discharged` / `defeated`. A discharged move was *answered*; a defeated one was *refuted*. | A statement's truth-state |

The label layers are a second such set — **move** (ch. 9: what a sentence does),
**form** and **relation** (chs. 1–7: what it is, and how it stands to what it
acts on), plus **warrant** and **axis**. They are not interchangeable and a
sentence carries them independently; `DERECH_TEVUNOS_FOR_AGENTS.md` is the
authority on which vocabulary is closed and what each admits.

When in doubt, ask which question the word answers: *what is drawn* (waterfall,
rail, fold), *what is computed* (concept lattice), *what is claimed* (status),
or *what is still exerting force* (standing).

## What is in this repository

| Path | What it is |
|---|---|
| `DerechTevunos_benyehudah_bilingual_fixed.md` | The book, Hebrew and English, chapters 1–11 plus the Sugya Context Index. **Prefer this copy** for labelling; the terminology is aligned to the Diaspora Yeshiva translation. |
| `DerechTevunos_benyehudah_bilingual.md` | The parent: same interleaving, pre-alignment English. |
| `site/` | **The website, and the only npm package in the repo.** Astro + React, deployed to Vercel at `derech-tevunos.com`. The rail visualization lives inside it at `site/src/rail/`. |
| `web/` | Two computed visualizations (lattice interval under doubt, circumscription diff). Separate npm package. |
| `icons_v3/` | The current glyph set — 104 SVGs. `ICONS_REFERENCE.md` is the contract for using them, `METHODOLOGY.md` for making them. `site/src/rail/glyphs.ts` is **generated** from these by `npm run glyphs`; edit the SVGs and regenerate, never the generated file. |
| `renders/` | Exported PNGs and SVGs of the waterfall, embedded by the `SUGYA_WATERFALL_*` design documents. Was `viz/out/`. Keep the filenames — they are image references in markdown. |
| `mascott/` | The mascot. Source of the site palette; see below. |
| `DERECH_TEVUNOS_*.md`, `SUGYA_*.md` | The system and file format, written for a classifier. Roughly 1 MB; agent-facing, mostly not published. |
| `nested_rail_research/` | The study that the v5 fold tree implements. |
| `push-to-dev.sh`, `push-to-prod.sh` | Promote `main` to the `dev` / `prod` branches. Vercel production is `prod`, not `main`. See [Vercel publishing](#vercel-publishing--settled-2026-09-16). |

There is **no** workspace root, so `npm install` at the repository root does
nothing. `site/` and `web/` each have their own `package.json`; install inside
the one you are working on.

## Node and toolchains

Node 22 or later. Everything runs from `site/`:

```
cd site
npm run dev        # Astro dev server; the rail included
npm run build      # generators, then astro build
npm run check      # typecheck + the rail's acceptance oracle
npm test           # vitest
```

`npm run check:rail` runs `src/rail/check.ts`, which holds the nine shipped JSON
passages to their TypeScript fixtures as an oracle. A change that makes those
disagree is a real regression, not a stale test. It resolves its own paths from
`import.meta.url`, so it does not care about the working directory.

`npm run build` runs the generators first — the chapter split, the search index
and the blog lastmod map. Run the whole script; calling `astro build` directly
leaves those inputs stale, and the chapter pages are **generated and
gitignored**, so a bare `astro build` on a fresh clone produces a docs section
with nothing in it.

`npm run glyphs` regenerates `src/rail/glyphs.ts` from `icons_v3/icons/`. It is
not part of the build — run it when the icon set changes. It resolves
`icons_v3/` as `../../icons_v3` from `site/scripts/`, so it depends on the site
sitting one level below the repository root.

Do not disable, `skip`, comment out, or delete a failing test. Fix the code or
fix the test; if you believe a test is genuinely invalid, **ask first**.

## Vercel publishing — settled 2026-09-16

The live site is served by **Vercel** off the `prod` branch
(`./push-to-prod.sh` is `git push origin main:prod`). Pushing `main` does not
update production. That is the safety property, and it is a dashboard setting,
not a script: Vercel's **Production Branch** must be `prod`, not the default
`main`. If it is still `main`, the next `git push origin main` ships to
`derech-tevunos.com`.

The same model as `exobench-site`, minus the leftover GitHub Pages workflow
and the on-demand feed functions. This site has no Pages path, and `/rss.xml`
is a static file.

| Branch | Role | How it moves |
|---|---|---|
| `main` | Working branch. A push here may get a throwaway preview URL. It must not update the public domain. | `git push origin main` |
| `dev` | Staging. | `./push-to-dev.sh` (`git push origin main:dev`) |
| `prod` | Production. `derech-tevunos.com`. | `./push-to-prod.sh` (`git push origin main:prod`) |

The scripts live at the **repository** root because they operate on git, not
the npm package. Do not put them in `site/`.

The npm package is `site/`, not the repo root. Vercel still clones the whole
repository, then `cd`s into the Root Directory for install and build. That
matters: `build-text-docs.ts` reads `DerechTevunos_benyehudah_bilingual_fixed.md`
from one level above `site/`, so a Root Directory of `site` still sees the
source. `npm run glyphs` is not part of `build`; `glyphs.ts` is already
committed.

Under **Project → Settings → Build & Deployment**:

| Setting | Required value | If wrong |
|---|---|---|
| Root Directory | `site` | No `package.json` at the repo root; the build never starts |
| Framework Preset | Astro | Adapter output is ignored |
| Output Directory | empty / default | Conflicts with `.vercel/output`; the site 404s |
| Node.js Version | 22.x | Matches `site/package.json` `engines` |
| Production Branch | `prod` | Pushing `main` becomes a production deploy |

`site/vercel.json` stays exactly as it is — `$schema` and `trailingSlash:
false`, nothing more. Do not add `outputDirectory`. Do not put a second
`vercel.json` at the repository root; Vercel reads the one in the Root
Directory. Do not set `output: 'server'` in `astro.config.mjs`.

The public hostname is **`derech-tevunos.com`**. `astro.config.mjs`, the
canonical fallback in `Layout.astro`, the RSS fallback, and `robots.txt` all
emit that host. `derechtevunos.com` is a registrar/Vercel **redirect** onto
it, not a second site and not a string that belongs in the repo.

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
lenses, white beard, transparent background. It is the nav glyph and the source
of the favicons, which are generated into `site/public/mark-{32,48,64,180,512}.png`
and declared in `Layout.astro`. The hand-sized set
`mascott/goggles-beard-*.png` is the same mark at small pixel sizes; `web/`
still uses it directly.

The other poses are placed as follows, and they are all the **2D inked**
versions on purpose — the 3D renders read as a different hand beside them:

| Where | Image |
|---|---|
| Homepage hero | `profile_detailed.png` |
| `/docs` index | `full_post_tea_break.png` (reading a folio) |
| 404 | `full_post_hoverboard.png` |
| Unused, reserved | `full_post_fixing_bug.png`, `just_face.png` |

On the dark chrome the near-black robe dissolves into the ink, so every dark
placement needs a radial lift behind the figure; the gold piping, cyan lenses
and white beard are what carry the silhouette. See `.hero` in `index.astro`.

**Gold and cyan are unusable as text on a light surface** (contrast ratios
about 1.7:1 and 1.5:1 on white). So the literal mascot colours go on dark
chrome only, and the light content pages get a darkened brass ramp that keeps
the hue and passes WCAG. Do not "fix" a light-page heading back to `#FDC223`.

### The paper is greige, and the ink is warmed to match — settled 2026-09-16

The site's light surface is **`#eeeae2`, a warm gray — not white.** Rendered
alternatives, in order of rejection: pure white under the ink nav (a 20:1
luminance cliff at an edge that means nothing, plus cool chrome over cool
paper reading as clinical); a blue-black dark sheet (fatiguing for 57
sentences of bilingual prose, and the semantic palette had to be re-derived);
parchment (`#f4ecd8`, the strongest thematic fit but a shade too literal a
"book"); greige, chosen. Leather (`#231d17`, a warm dark) is the natural dark
toggle if one is ever wanted — same plumbing, second palette.

Two things follow that a future change could undo:

- **The nav is `#1c1a17`, not the sampled `#0E1119`.** Same darkness, blue
  removed. A cool bar over warm paper is a temperature clash before it is
  anything else, and the mascot sits on the warm ink perfectly — the robe's
  own shadows are that colour. The sampled value stays in the table above as
  the *source*; the site's ink is one deliberate step from it.
- **Every light surface is the same paper**, and the rail's `--surface` is the
  same value as the site's `--dt-surface`. Docs, notes, the rail's sheet, the
  passage strip, the search dropdown: one paper. Nothing on a light page is a
  cool gray any more — a single `#e5e7eb` rule on warm paper reads as a
  mistake. `tokens.css` carries the whole warm ramp (`--dt-fg`, `--dt-muted`,
  `--dt-faint`, `--dt-rule`, `--dt-surface*`); reach for those, never a
  literal.

Guardrail: **flat colour only.** No paper texture, no ornamental rules, no
drop caps. Warm paper stays contemporary because the type and layout are; the
moment texture arrives it is a 2005 antique template.

### The rail's colour vocabulary is nearly full, and it is semantic

`site/src/rail/app/styles.css` (`:root`, for the rows) and
`site/src/rail/theme.ts` (`LIGHT`, for the icons and the SVG export) declare
the same palette twice, and **they must agree** — `ElementIcon` paints every
icon's interior with `theme.surface`, so a drift between the two shows up as
icons the wrong colour. The values are the greige re-inking of the original
Tailwind-600 set, one step deeper and less saturated for paper: green
`#2f7a42` accepted, amber `#a16207` under doubt (unchanged), red `#b0392e`
rejected, Prussian `#3b4f8a` for the rail itself, and violet `#6f4fb0` / teal
`#237f76` / magenta `#a2418a` / slate `#66605a` for the chapter 1–8 anatomy
families. `hue.slate` and `element.statement` are the **same** value on
purpose — the speaker badges share the statement icon's grey — change both or
neither. The site's brass (`#8a5a00`) is deliberately **darker in value** than
the rail's amber so the two read as different signals despite sharing a hue.
That gap is the whole reason the palette works — do not lighten the site brass
toward `#a16207`.

### Namespace every site CSS custom property `--dt-*`

`src/rail/app/styles.css` declares `--fg`, `--muted`, `--border`, `--surface`
and `--page` on `:root`, unprefixed. Site tokens under those names would
silently restyle the visualization, which is mounted in-page on every rail
route. So **every site variable is `--dt-*`** (`src/styles/tokens.css`), and the
rail's bare names are left alone precisely because the site's are namespaced.

## The site — settled 2026-09-16

`site/` is an Astro + React site deployed to Vercel at `derech-tevunos.com`, a
heavily stripped adaptation of `exobench-site`. It is built; what follows is why
it is shaped the way it is.

### React, not Vue

`exobench-site` is Vue, but only four of its twenty-nine Vue components survive
the cull — 1017 lines, of which 452 are CSS that ports by copy-paste. The
decisive argument is that **the rail was already React 19**: staying on Vue
would mean shipping two renderers on every page that draws a waterfall.

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

### The rail is part of the site, not a thing the site embeds

There is no standalone visualization app any more. `viz/` was folded into
`site/src/rail/` on 2026-09-16 and deleted; its `index.html`, `vite.config.ts`,
`package.json` and dev server are gone, and `astro dev` is the only dev server.
The consequences that a future change could undo by accident:

- **Astro owns routing.** Each passage is a real page at `/sugya/<id>`,
  generated by `getStaticPaths` from the same `SUGYOT` registry the drawing
  reads. The hash router (`src/rail/app/router.tsx`) is still in the tree and
  still used by `Root.tsx`, but **nothing the site renders goes through it** —
  do not reintroduce `#/sugya/<id>` links.
- **Astro owns the chrome.** `<Rail>` passes `header={false}`, a prop
  `SugyaView` already offered for this case, so the site's nav and page header
  are the only header. Without it the page grows a second `<h1>` reading "Sugya
  lattice" under the site's own.
- **Only the sheet is an island.** The gallery (`/sugya`), the page headers and
  the passage switcher are Astro components and ship as HTML, so the passage
  titles are in the first response. `client:only="react"` is correct for the
  sheet rather than `client:load`: the controller measures DOM geometry to place
  rails and elbows, so there is nothing meaningful to server-render, and trying
  produces a flash of unpositioned rows.
- **The sheet's surface is `.sugya-sheet`, which used to be `body`.** A `body`
  rule in the rail's stylesheet repaints the site's dark shell stone-grey and
  swaps its typeface. `:root` and `*` are deliberately left global there.

The old standalone shell — `Root.tsx`, `router.tsx`, `sugyot.ts`, the three
page components and the React `markup.tsx` — was deleted on 2026-09-16.
`src/rail/markup.ts` is its one survivor, rewritten as an HTML interpreter so
the Astro page can render a passage's `hint` server-side.

### The rail owns the viewport — settled 2026-09-16, re-cut the same day

A page that scrolled under the drawing made the drawing unusable: wheel and
drag meant for the sheet moved the document instead. So on every rail route
(`/` and `/sugya/<id>`, via `RailStage.astro` and `Layout`'s `bare` prop):

- **Nothing scrolls except the rows.** `html` and `body` are clamped to one
  viewport with `overflow: hidden` — both, because iOS Safari does not honour
  it on `body` alone — and the footer is not rendered. `.stage-sheet` is a
  flex column that clips and does not scroll; the rail's `article.sheet`
  fills it as a flex column of its own, and **`.stage-rows`, inside that, is
  the one scroll container.** The controller's one `scrollIntoView` moves it
  and nothing else. The first cut had the whole article scrolling under three
  `position: sticky` elements; that let the foot control drift by the
  article's bottom padding as the reader passed the last row, and it is why
  the dock's height was ever written in `cqh`.
- **Three things are pinned and never move.** The state-of-play bar is the
  column's first child, directly under the strip, on every passage (it used to
  be sticky, and only on a long one). The reveal dock is the scroller's flex
  sibling in `.stage`, stretched to the band's height, so it is exactly as
  tall as the space between the bar and the foot. The foot control is the
  column's last child, always rendered — "next sentence" is `disabled` at the
  end rather than gone — and only as wide as its buttons, with the hairline
  above it on `.stage` running the full width. Measured 2026-09-16 at
  1280×800: bar 92–130, dock 130–753, foot 754–800, rows scroller 622px tall
  (it was 448px on the homepage with the legend and bar inside it). None of
  the three moved by a pixel across wheel, "next sentence", "what happens
  next", a run to the end and back, or the panel opening.
- **The reveal control is a map at every length.** Pinned beside rows that
  scroll under it, no tick can line up with a row, so the `aligned` variant
  and the controller's `ticks` were removed with the re-cut rather than left
  as a trap. Ticks are rings until they would sit closer than 16px, then
  dashes (`DENSE_SPACING` in `RevealRail.tsx`); 77 sentences in a 605px rail
  are dashes, 4 are rings.
- **The frontier scrolls all the way in.** `planScroll`'s frontier plan uses
  `block: "end"`, so "what happens next" and "next sentence" always land the
  new sentence with its foot at the bottom of the scroller (measured: 11px
  above it, the `scroll-margin-bottom`). `nearest` did nothing while any of
  the row was visible and left new sentences half-shown at the edge.
- **The legend lives in the strip's panel, not on the sheet.** `SugyaView`
  takes a `legendHost` element and portals the legend and its switches into
  it; `RailStage.astro` declares `<div id="railLegend">` in the panel and
  `Rail.tsx` resolves it once, synchronously, in a `useState` initialiser
  (safe because the island is `client:only`; an effect would render the
  legend inline for a frame and measure the rows twice). Every icon already
  explains itself on hover in the rows, so the key bought nothing for the
  ~90px it took. Two consequences that were found the hard way: the panel
  must set `color: var(--dt-fg)`, or portalled text inherits the body's
  near-white chrome colour and vanishes into the paper; and engaging the
  sheet must `blur()` a focused control inside the strip, or a just-clicked
  switch holds the panel open through `:focus-within`.
- **`Tooltip` fits its clipping ancestor, not the window.** A popup is
  absolutely positioned inside its anchor, so the rows' scroller and the
  panel both cut off whatever leaves them. `boundsOf` walks up to the nearest
  ancestor with non-visible overflow and flips against that box.
- **The article IS the region — no card.** `article.sheet` fills
  `.stage-sheet` edge to edge: no border, no radius, no width cap, and both
  paint the same `--surface` so there is no seam. It used to be a bordered
  card centred at 1040px inside a padded dark region, which read as a screen
  within a screen. Do not reintroduce a `max-width`, a padding frame, or a
  second background around it. The 408 lines of the standalone shell's CSS
  (`.app`, `.tabs`, `.gallery-*`, `.card`, `.open-*`) were removed at the
  same time, each class checked against the surviving components first — but
  note that `pill-*`, `badge-*` and `tip-pop-*` are built dynamically and a
  token search will call them dead when they are not.
- **The rail's global class names are not free.** Its stylesheet is
  unscoped, so an Astro element that borrows one takes its rules: the stage
  wrapper was `.stage` and inherited the rail's `.stage` (a stray 4px
  `margin-top`, and it would have taken the band's hairline). It is
  `.rail-stage` now. Check `styles.css` before naming an element in
  `RailStage.astro`.
- **The header is a 40px strip whose panel overlays the sheet.** The passage
  switcher and the key open on hover, focus or tap, absolutely positioned
  below the strip. It must never push the sheet down: the controller measures
  row geometry, so a header that changed the sheet's height would re-measure
  every rail and elbow on every hover. Engaging the sheet (wheel, pointer,
  touch) closes the panel.
- **The strip's three texts are one baseline group, centred as a unit.** The
  cite, the title and the counts are three sizes on one line, so they share a
  baseline — but `align-items: baseline` on a fixed-height flex line parks the
  whole group at the *top* of the cross axis, which is where they sat until
  2026-09-16 (measured: the title's ink 8px above the 40px strip's centre,
  every pixel of slack beneath it). So they live in a `.line-text` flex box
  that keeps the shared baseline, and `.line` centres that box. Do not flatten
  the wrapper away, and do not "fix" it by centring each span separately: at
  11px caps against a 15px title that leaves the cite riding high.
- **One left edge for the whole page, `2rem`.** `--sheet-gutter` on `.sheet`
  feeds the state-of-play bar, the rows and the foot control; the strip and
  the panel are set to the same literal, as is the nav (`Navigation.astro`).
  It drops to `1rem` at 640px, the nav's own breakpoint and value, so the two
  agree at every width — the strip's other media query, at 720px, is about the
  counts not fitting and must not acquire a padding rule. Measured before this
  existed: the nav's brand at 32px, the strip's cite at 20px, the bar, rows
  and foot at 28px — three ragged edges in one vertical stack. Verified after,
  at six widths from 1280 to 390: nav, cite, bar and foot all on the gutter,
  and the strip, the panel and the reveal rail all ending on it.
- **Scrollbars are hidden, not removed.** The rows and the panel scroll with
  `scrollbar-width: none`; the switcher is a wrapping grid so it has nothing
  to scroll. On a 390px phone the grid must be two columns — one column put the
  panel's bottom at 926px in an 844px viewport — and the panel carries
  `max-height: calc(100dvh - 90px)` as a net. With the key in it the panel's
  bottom is at 590px in an 800px viewport.
- **The introduction is not on the homepage.** `Hero.astro` (wordmark, lede,
  mascot) moved to `/sugya`, the passage index. A 400px introduction above a
  drawing that must own the screen left the drawing nothing.

Verified 2026-09-16 (re-cut) by 21 automated checks on the 77-sentence
passage and 9 on the 4-sentence homepage at 1280×800, plus 8 at 390×844, and
24 more across six widths for the strip's centring and the gutter:
window and `.stage-sheet` scroll stay 0 under wheel while `.stage-rows` moves;
the panel opens without changing the sheet's geometry; the legend's tooltip
stays inside the panel; a switch clicked in the panel toggles and a wheel over
the sheet then closes the panel.

**Known, not yet done:** at 390px the rail's own row layout collapses — the
secondary text column narrows to one word per line, so a single row is 1171px
tall and cannot fit the 666px scroller. That is the row grid inside
`src/rail/app/`, not the stage: the stage's three pinned elements hold there
too, and the frontier's foot still lands 10px above the foot control.

### `/byo` draws a reader's own file, through the same parts — settled 2026-09-16

**Bring Your Own** (nav, beside Sugyascade) is `/byo`: drop or paste a sugya
file and it is drawn by the same waterfall the shipped passages get. There is
no second implementation of anything, and that is the point — the page a
reader's own file lands on is the page, not an imitation of it. Two extractions
made it so, and both are the reuse seam to keep:

- **`StageShell.astro` is the chrome; `RailStage.astro` and `ByoStage.astro`
  are two fillings of it.** The strip, the overlaying panel, the sheet region,
  the open/close script and every measurement in the section above moved there
  verbatim when the second route appeared. Do not copy the strip into a third
  page — add a slot.
- **`RailSheet.tsx` is the island body; `Rail.tsx` and `Byo.tsx` are two ways
  of getting a `Sugya` to it.** `RailSheet` takes the parsed passage, resolves
  the legend host and renders `SugyaView`. `Rail.tsx` keeps the id→`SUGYOT`
  lookup rather than accepting a passage, and that is deliberate: `client:only`
  props are serialised into the page's HTML, so a `sugya` prop would inline up
  to 31KB of passage into every `/sugya/<id>` response. Measured 2026-09-16:
  `/byo` loads `Byo.js` 6KB plus the 162KB shared rail chunk; the other eight
  passages stay in `/sugya`'s 115KB `Rail.js` and never reach `/byo`.

Four details that look like tidying and are not:

- **The strip's three texts wear `dt-strip-cite` / `-title` / `-meta`, which
  are `:global()` in the shell.** Astro scopes a component's `<style>` to its
  own template, and slotted content carries the *caller's* scope, so a scoped
  `.cite` in the shell would never reach the span `RailStage.astro` writes.
  `--dt`-prefixed because the rail's own stylesheet is unscoped and already
  owns short names.
- **`#byoStripText` is `display: contents`.** The island portals the three
  spans into it, and a box between them and `.line-text` makes them one
  anonymous flex item: measured before the rule, the strip read
  "BAVA KAMMA 2A-3BAre the derivatives…77 sentences" with no space anywhere.
  With it, both routes measure a 14px gap between each pair.
- **The loader scrolls, and it is the one thing on a rail route besides
  `.stage-rows` that may.** It is prose, not a drawing: there is no row
  geometry on screen while it is showing and none of the three pinned elements
  exist yet. The moment a file opens it is replaced by `RailSheet` and the
  ordinary rule applies again.
- **`/byo` is `noindex` and in `SITEMAP_EXCLUDE`** — not because it is private
  but because it renders nothing at build time, so a crawler would index an
  empty drop zone under a title about drawing sugyot. Keep the two in sync.

Nothing is uploaded: `byoSession.ts` keeps the file — the file, via `toJson`,
not the model — in `sessionStorage`, and `parseSugya` runs in the tab. What the
page accepts and what the site ships are therefore the same format by
construction rather than by agreement, and the fault list a refusal prints is
`parseSugya`'s own, every fault at once with its JSON path and its "did you
mean".

The nav's fourth link does not fit a phone beside the wordmark. Measured at
390px: logo 166 + links 206 + gap 12 + padding 32 = 416 against 390 available.
Shrinking type and gaps lands at 391, which is not a margin, so the label has a
short form ("Bring") below 640px and **the wordmark is hidden below 430px** —
the mark alone is already the site's logo. 390px after: 290 used.

Verified 2026-09-16 by 42 automated checks in a 1280×800 browser and 4 at
390×844, with zero console errors: the loader, a 77-sentence file opened from
disk, the strip and panel it fills, wheel moving `.stage-rows` while the window
and the sheet stay at 0, the dock and foot not moving by a pixel, the panel not
changing the sheet's height, survival across a reload, a refused file listing
pathed faults, the bundled example round-tripping — plus the shipped route
unregressed on the same measurements the re-cut recorded (dock 130–753, foot
754–800, strip 40px, one left edge at 32px, title in the first response).

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
- Name a partial or throwing combiner `plus` / `merge` / `concat`, as though it
  were a monoid. See "Six patterns", item 2.
- Store a value that can be derived, or serialise a derived value into JSON
  where it can go stale.
- Write a function that accepts a union and pattern-matches with a dead branch
  when the caller already knows the variant. Narrow the *signature*.
- Match two unions with an `&&` ladder. It is not exhaustiveness-checked, so a
  new variant compiles clean and fails at runtime — use a `ts-pattern` tuple
  match with `.exhaustive()`.
- Raise a threshold, loosen an assertion, or weaken a strict compiler flag to
  make a check pass. A failing guardrail is information. Raising one needs new
  evidence plus a dated measurement.
- Record an estimate where a measurement is possible, or state a guess where a
  bound is honest.
- Use "lattice" for the waterfall in new prose, or "concept lattice" for
  anything `src/rail/` draws. See "Terminology".
- Name the whole drawing after one of its parts in user-facing chrome. The nav
  item and the 404 button said "The rail" until 2026-09-16, which is the exact
  synecdoche the "rail" row of the terminology table forbids; they say
  **Sugyascade** now. See "Terminology".
- Remove, shorten, or reword code comments when moving or refactoring code.
  Comments travel verbatim with the code they describe.
- Disable, skip, or delete a failing test to make a build pass.
- Reintroduce a hash route, a second `<h1>`, or a `body` rule into
  `src/rail/`. Each undoes part of the integration; see "The rail is part of
  the site".
- Put anything below the sheet on a rail route, render the footer there, or let
  the strip's panel push the sheet instead of overlaying it. See "The rail
  owns the viewport".
- Copy the strip, the panel or the sheet region into a new page instead of
  adding a slot to `StageShell.astro`, write a second component that renders
  `SugyaView` instead of going through `RailSheet.tsx`, or give `Rail.tsx` a
  `sugya` prop — that inlines the passage into every page's HTML. Scope the
  strip's `dt-strip-*` classes, or take `display: contents` off
  `#byoStripText`. See "`/byo` draws a reader's own file".
- Make anything but `.stage-rows` scroll on a rail route: no `overflow-y:
  auto` back on `.stage-sheet`, no `position: sticky` (or a `vh`/`cqh`
  height) on the state-of-play bar, the dock or the foot, no rendering the
  foot or the legend conditionally so that the sheet's column changes height
  mid-passage. The three are pinned flex children and the legend is in the
  panel; each was measured. See "The rail owns the viewport".
- Write a side padding on a rail route that is not `--sheet-gutter` (or, in
  `RailStage.astro`, the same `2rem`), or flatten the strip's `.line-text`
  wrapper back into `.line`. The first gives the page a second left edge; the
  second puts the strip's text back at its top edge.
- Hand-edit anything under `src/content/docs/text/` — it is generated by
  `npm run build-text` from the bilingual source and gitignored.
- Lighten the site's brass toward the rail's `--doubt` amber, emit a
  trailing-slash canonical or sitemap entry, replace an `HtmlFigure` with a PNG,
  or declare an un-namespaced CSS custom property. Each has its reasoning above;
  all four look like tidying and are regressions.
- Set any light surface back to `#ffffff`, cool the nav back to the sampled
  `#0E1119`, write a cool-gray literal (`#e5e7eb`, `#6b7280`, …) onto a light
  page, or let `theme.ts` and `styles.css` disagree on a rail token. See "The
  paper is greige". Add a paper texture or an ornamental rule, ever.
- `rmSync` the generated `src/content/docs/text/` directory. The generator
  writes in place and removes stale files; a vanishing directory makes a live
  `astro dev` drop every chapter route until restart.
- Set Vercel's Production Branch back to `main`, add `outputDirectory` to
  `vercel.json`, put a second `vercel.json` at the repository root, or set
  `output: 'server'` in `astro.config.mjs`. The first ships every `main` push
  to the public domain; the rest make the adapter's `.vercel/output` miss and
  the site 404. See [Vercel publishing](#vercel-publishing--settled-2026-09-16).
- Point `astro.config.mjs`, `Layout.astro`, `rss.xml.ts`, or `robots.txt` at
  `derechtevunos.com`. That name is a redirect onto `derech-tevunos.com`, not
  the host the site emits.
