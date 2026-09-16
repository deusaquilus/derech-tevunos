# Code style doctrine — pragmatic functional TypeScript

**Provenance.** This is a verbatim copy of the author's authoritative long-form
statement of his TypeScript style. It is copied here, rather than referenced
across repositories, so that this repo carries its own doctrine. Everything
below the rule is unaltered, including the original title.

## Reading its examples in this repository

The doctrine cites the source repo's own `src/` files as canonical examples.
Those files are not reproduced here — they belong to a separate, unlicensed
codebase, and this repository is Apache-2.0. **`viz/` already demonstrates every
pattern the doctrine cites, in this domain, and it typechecks.** Read these
instead:

| Cited as | Read instead | Which rule it demonstrates |
|---|---|---|
| `src/wire.ts` (`toSseFrame`, `assertNever`) | `viz/src/verdict.ts` | Exhaustive `switch` over a union with a `never` guard — three of them, deciding which of status or standing to report and in what words |
| `src/domain.ts` (`DomainEvent`, `TokenUsage`) | `viz/src/sugya.ts`, `viz/src/folding.ts`, `viz/src/anatomy.ts` | Coproducts for the model, `readonly` products for the records. `folding.ts` carries the fold-tree invariants as types (laminar bands, `readonly` on 72 lines) |
| `src/errors.ts` (pure classifiers, `unknown` narrowing) | `viz/src/format.ts` | The I/O boundary done properly: `parseSugya` narrows `unknown` and reports *every* fault with its path. `SugyaFormatError extends Error` is the repo's only class, and it is the blessed "throw for errors" case |
| `src/errors.ts` (`ReadonlyArray` constant tables) | `viz/src/markers.ts`, `viz/src/taxonomy.ts` | `as const` vocabularies instead of TS `enum`s — the Aramaic trigger lexicon, and the seven elements with their nineteen leaves |
| `src/redact.ts` (one grammar, several total interpreters) | `viz/src/render.ts` vs `viz/src/app/SugyaView.tsx` | The model is framework-free; a static-SVG interpreter and a React interpreter both fold over it, and everything they must agree on lives in a module both import |
| `tsconfig.json` (strict flags) | `viz/tsconfig.json` | `strict`, `noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`, `noImplicitOverride`. Do not weaken these to silence an error |
| `src/app/router.tsx` *(no counterpart cited)* | `viz/src/app/router.tsx` | The house answer to "should we add a library": a hash router in fifty lines with no dependency |

## Four places this repository genuinely differs

Recorded so that nobody "corrects" local code toward the source repo, or the
reverse:

- **The exhaustiveness idiom is different, and both are correct.** The doctrine
  shows a throwing helper, `default: return assertNever(x)`. `viz` uses the
  inline binding instead — `default: { const exhaustive: never = status; return
  exhaustive; }` (`verdict.ts`). Both produce the same compile error when a
  variant is added, which is the entire point; only the named helper also throws
  at runtime. Match the neighbours in whichever file you are editing.
- **Tests do not mirror source here.** The doctrine specifies `vitest` with one
  `test/*.test.ts` per module. `viz` instead has a single 844-line acceptance
  script, `src/check.ts`, run by `npm test`, which holds the shipped JSON
  passages to the TypeScript fixtures as an oracle. The planned `site/` will use
  `vitest` as the doctrine describes; `viz` should keep its oracle.
- **There is no Node-22 wrapper.** The doctrine mandates routing every toolchain
  invocation through `scripts/with-node22.mjs` because that repo's shells
  resolve an older Node. This repo has no such wrapper and no `.npmrc`
  `engine-strict`; it just requires Node 22 or later.
- **`src/asyncIter.ts` has no counterpart.** Nothing in `viz` iterates
  asynchronously, so the doctrine's carve-out permitting `for...of` for
  streaming and `async` iteration has no local example. The carve-out still
  stands; there is simply nothing here to point at.

One further reference, `../kotlin-compiler-server/AGENTS.md`, is cited for a
`CallLimitResult` case study on sentinel values. It has no counterpart here
either. The lesson it carries — that "unlimited" is a *variant*, not
`Number.MAX_SAFE_INTEGER` — is stated in full in the "No magic values /
sentinels" rule below, so nothing is lost by not having it.

---

# AGENTS.md — exobench-chatbot

## Code Style: Pragmatic Functional TypeScript

This repo is written by a functional programmer with a Scala background. The style
is **reasonable FP**: take the parts of FP that buy real safety and clarity —
coproducts (sum types), products, immutability, pure functions, free-grammar-style
data modeling — and leave the cathedral behind. We do **not** do Haskell-in-
TypeScript. No `fp-ts`, no `Effect`, no HKTs, no monad transformers. A monad shows
up only occasionally and only with great judiciousness (see "Monads, judiciously").

The organizing principle, borrowed from the Kotlin side of this codebase: **make
invalid states unrepresentable, and let the compiler enforce your business rules.**
If you reach for a boolean flag, a sentinel value, or a runtime cast to figure out
which shape your data has, you probably want a discriminated union instead.

> There is also a shorter always-on rule (`exobench-site/.cursor/rules/minimal-fp-style.mdc`)
> that captures the same philosophy in miniature. **This file is authoritative** when
> they conflict, and this file is where durable style decisions get recorded.

### Hard rules — break these and the change will be rejected

1. **Model coproducts as discriminated unions; model products as `type` records.**
   A OR B is a tagged union (`{ kind: "a"; ... } | { kind: "b"; ... }`). A AND B is
   a record type. If a field is only meaningful for some variants, it does not
   belong on a flat record — split it into a union. See "Functional Domain Modeling".

2. **Exhaustive matching with `assertNever`.** Any `switch`/`if`-ladder over a
   discriminated union MUST end in a `default: return assertNever(x)` (or equivalent).
   This turns "someone added a variant and forgot a consumer" into a compile error.
   See `toSseFrame` in `src/wire.ts` for the canonical example.

3. **Never cast a coproduct.** Do not write `(x as SomeVariant).field` or use `as`/
   `as?`-style casts to sidestep a union. Narrow by checking the discriminant and let
   the compiler prove the branch. If a match feels awkward or repetitive, that is a
   design signal to escalate — not a reason to cast. (`unknown` + explicit narrowing
   at true I/O boundaries is fine — see `src/errors.ts`. Never `any`.)

4. **Conditions must be pure.** Never call a function that mutates state, performs
   I/O, or has any side effect inside an `if` / `switch` / `while` / ternary predicate.
   The predicate decides; the branch performs the effect. See "Conditions must be pure".

5. **Effects live in dedicated, clearly-named blocks.** A function named `parse…`,
   `classify…`, `build…`, `find…`, `to…`, `redact…` MUST be pure. Partition data
   purely first, then act on each group in a labeled effectful section. See "Effects
   belong in dedicated effect blocks".

6. **Immutability by default.** `const` over `let`; `readonly` fields; `ReadonlyArray<T>`
   / `readonly T[]`; update via spread, never mutation across a function boundary.
   Local mutation *inside* a function for performance/clarity is fine.

7. **`throw` for errors; `Result` only for genuinely branchable typed failures.**
   Exceptions are the language convention. Do not wrap every function in `Result<T, E>`.

## Expression style

Prefer expressions over statement soup. Arrow functions with an expression body,
early `return`, and ternaries/`??`/`?.` chains keep intent visible.

```typescript
// GOOD — expression-bodied, reads top to bottom
const displayName = (user: User | null): string =>
  user?.profile?.displayName ?? "Anonymous";

// GOOD — narrowing produces the value; no intermediate mutation
const wireMessage = (cls: AnthropicErrorClass): string => {
  switch (cls.kind) {
    case "unavailable": return UNAVAILABLE_WIRE_MESSAGE;
    case "overloaded":  return OVERLOADED_WIRE_MESSAGE;
    case "internal":    return INTERNAL_ERROR_WIRE_MESSAGE;
    default:            return assertNever(cls);
  }
};

// BAD — mutable accumulator + reassignment where a switch-expression would do
function wireMessage(cls: AnthropicErrorClass): string {
  let msg = "";
  if (cls.kind === "unavailable") msg = UNAVAILABLE_WIRE_MESSAGE;
  if (cls.kind === "overloaded")  msg = OVERLOADED_WIRE_MESSAGE;
  // ...silently returns "" if a variant is added
  return msg;
}
```

## Collection operations over loops

Use `map` / `filter` / `flatMap` / `reduce` / `some` / `every` / `find` over
hand-written index loops. `src/errors.ts` already does this
(`UNAVAILABLE_MESSAGE_MARKERS.some((marker) => …)`).

```typescript
// GOOD
const dtos = orders
  .filter((o) => o.isActive)
  .flatMap((o) => o.lineItems)
  .map(toLineItemDto);

// BAD
const dtos: LineItemDto[] = [];
for (const o of orders) {
  if (o.isActive) {
    for (const item of o.lineItems) dtos.push(toLineItemDto(item));
  }
}
```

A `for...of` loop is acceptable when it is genuinely clearer — side-effectful
iteration, early exit, or streaming/`async` iteration (see `src/asyncIter.ts`).
Don't chain more than ~3–4 operations without an intermediate `const` or a comment.

## Immutability

- `const` for every binding; `let` only when local mutation is genuinely cleaner.
- `readonly` on every field of every domain type. See the pervasive `readonly` in
  `src/domain.ts` and `src/errors.ts`.
- `ReadonlyArray<T>` / `readonly T[]` for arrays that shouldn't be mutated
  (`AUTH_RELEVANT_REASONS: ReadonlyArray<string>` in `src/errors.ts`).
- Update objects with spread: `{ ...obj, field: newVal }`. Never mutate a value that
  crossed a function boundary.
- Shallow `readonly` is enough. Do **not** reach for deep-freeze libraries or
  `Readonly<Readonly<…>>` nesting.

```typescript
// GOOD: fold into an immutable accumulator
const total = items.reduce((acc, it) => acc + it.price, 0);

// GOOD: local mutation for a hot path is fine — it never escapes
function buildLargeString(items: readonly Item[]): string {
  const parts: string[] = [];
  for (const it of items) parts.push(it.name);
  return parts.join("");
}

// BAD: module-level mutable state
const cache: Map<string, Item> = new Map(); // NEVER as shared global mutable state
```

## Functional Domain Modeling (the core of this style)

**CRITICAL PRINCIPLE:** Your types should make invalid states *unrepresentable*.
When designing a type, ask: *"Can this shape represent a state that shouldn't exist
in my domain?"* If yes, refactor into a coproduct.

### Coproducts (sum types) = discriminated unions

A OR B. Every variant carries exactly — and only — the fields meaningful to it.
This is the single most valuable pattern in the codebase; `src/domain.ts`,
`src/errors.ts`, and `src/wire.ts` are built on it.

```typescript
// ❌ BAD — a dishonest "product with flags". Illegal states are representable:
//   loading:true + data present, or error present with status "success".
type AsyncState = {
  isLoading: boolean;
  isError: boolean;
  data?: User[];
  error?: string;
};

// ✅ GOOD — a coproduct. Each state is exactly its own set of fields.
type AsyncState =
  | { readonly kind: "idle" }
  | { readonly kind: "loading" }
  | { readonly kind: "success"; readonly data: readonly User[] }
  | { readonly kind: "error"; readonly error: string };
```

Rules for unions:

- Use a single literal **discriminant** field. This codebase uses `kind`
  (`src/domain.ts`, `src/errors.ts`); the wire contract uses `type` (`src/wire.ts`)
  because it's mirrored byte-for-byte by the frontend. Pick `kind` for new internal
  types; match the neighbours.
- **No magic values / sentinels.** No `Number.MAX_SAFE_INTEGER` "unlimited", no
  `-1` "not found", no `""` "unset". If a value is absent, the *variant* that lacks
  it is absent. (Compare the Kotlin `CallLimitResult` case study in
  `../kotlin-compiler-server/AGENTS.md` — same lesson.)
- **Derive, don't store.** If a value can be computed from the variant's data,
  expose it as a helper function on that variant, not as a redundant field.

### Products (record types)

A AND B. Plain `type` records with `readonly` fields — `TokenUsage` in
`src/domain.ts` is the reference. Use `type`, not `interface`, for domain data
(interfaces are for extension points / class contracts, which we rarely need).

### Free grammars / ADTs: data first, interpretation second

When you're modeling "a little language" (events, commands, an instruction tree),
model the grammar as a coproduct of node types — a plain data ADT — and write
**separate** interpreter functions that fold over it. `DomainEvent` → `redact.ts` →
`WireEvent` is exactly this shape: one data grammar, several total interpreters that
each `switch` exhaustively. Keep the grammar dumb (no methods, no behavior) and put
behavior in functions that pattern-match. This is where the Scala instinct pays off;
resist the urge to attach an OO `interpret()` method to each node.

### Exhaustiveness with `assertNever`

Every match over a union ends in a `never` guard so that adding a variant breaks the
build at every consumer. The canonical helper lives in `src/wire.ts`:

```typescript
function assertNever(x: never): never {
  throw new Error(`Unhandled wire event: ${JSON.stringify(x)}`);
}

export function toSseFrame(event: WireEvent): string {
  switch (event.type) {
    case "content_block_start":
    case "content_block_delta":
    // ...every variant...
    case "session_meta":
      return `data: ${JSON.stringify(event)}\n\n`;
    default:
      return assertNever(event); // adding a variant → compile error here
  }
}
```

If you write a new module that matches over a local union, define a small local
`assertNever` (as `wire.ts` does) rather than inventing a shared utility module —
it's three lines and keeps files self-contained.

### Never cast to pick a variant

```typescript
// ❌ BAD — convenience cast defeats the whole point of the union
const name = (block as { name: string }).name;

// ✅ GOOD — narrow on the discriminant; the compiler proves `name` exists
switch (block.kind) {
  case "mcpToolUse":
  case "strayToolUse":
    return block.name;
  default:
    return null;
}
```

If you find yourself wanting a "convenience accessor" that casts internally, STOP —
the answer is almost always "narrow instead". A cast on a coproduct needs a very good,
explicitly-justified reason.

### For the harder cases: `ts-pattern`

A plain `switch` on a single discriminant is the default and stays the default for
flat unions. But some matches are genuinely harder than a one-level `switch`, and
that's where a hand-written `if`/`switch` ladder turns into the imperative,
non-exhaustive mess this style exists to avoid. For those, **use
[`ts-pattern`](https://github.com/gvergnaud/ts-pattern)** (`match(...).with(...).exhaustive()`).
It's ergonomic Scala-style pattern matching — not esoteric type-level machinery — and
its `.exhaustive()` gives the same compile-time "you forgot a case" guarantee as
`assertNever`, but for shapes a `switch` can't express.

Reach for `ts-pattern` when the match involves any of:

- **Matching on two or more values at once** (a "tuple match" / product of coproducts) —
  e.g. `(state, event)` in a state machine. A nested `switch`-in-`switch` here is
  exactly the smell.
- **Nested structure** — matching on a variant *and* one of its fields' variants in
  one step (e.g. a `Limited` result whose `resetBehavior` is `Windowed`).
- **Guards / value predicates** — `.with(P.string.and(P.when(isUrl)), …)`,
  `.with({ status: P.number.gte(500) }, …)`.
- **Binding sub-values** with `P.select()` instead of re-destructuring in the branch.

```typescript
import { match, P } from "ts-pattern";

// GOOD — a two-value match that a nested switch would make unreadable.
// .exhaustive() makes an unhandled (state, event) pair a COMPILE error.
const nextState = (state: SessionState, event: DomainEvent): SessionState =>
  match([state, event] as const)
    .with([{ kind: "idle" }, { kind: "messageStart" }], ([, e]) => ({ kind: "streaming", model: e.model } as const))
    .with([{ kind: "streaming" }, { kind: "messageStop" }], () => ({ kind: "done" } as const))
    .with([{ kind: "streaming" }, { kind: "apiError" }], ([, e]) => ({ kind: "failed", detail: e.detail } as const))
    .with([P._, { kind: "unavailable" }], () => ({ kind: "failed", detail: "unavailable" } as const))
    .otherwise(([s]) => s); // explicit fallthrough — a deliberate choice, not an oversight

// GOOD — matching a variant AND a nested variant in one expression
const resetLabel = (r: CallLimitResult): string =>
  match(r)
    .with({ kind: "unlimited" }, () => "No limits")
    .with({ kind: "blocked" }, () => "Access denied")
    .with({ kind: "limited", resetBehavior: { kind: "never" } }, () => "Never resets")
    .with({ kind: "limited", resetBehavior: { kind: "windowed" } }, ({ resetBehavior }) =>
      `Resets at ${resetBehavior.resetsAt}`)
    .exhaustive();
```

Rules:

- **Prefer `.exhaustive()` over `.otherwise()`.** `.exhaustive()` is the `assertNever`
  of `ts-pattern` — it's the whole reason to use the library. Use `.otherwise()` only
  when a catch-all is a genuine, intended default (as in the state-machine fallthrough
  above), and make that intent obvious.
- **Don't reach for it on flat single-discriminant unions.** A `switch` +
  `assertNever` is lighter and everyone reads it instantly. `toSseFrame` should stay a
  `switch`. Escalate to `ts-pattern` only when the `switch` starts nesting or needs
  guards.
- **Stay within the ergonomic subset** — `.with`, `.when`, `P.select`, `P.union`,
  `P.array`, literal patterns, `.exhaustive()`. That's Scala-grade matching. You do
  **not** need (and shouldn't build) anything more exotic.

`ts-pattern` is a runtime dependency (add via `npm i ts-pattern`); it's tiny and
tree-shakes. It is the **one** blessed exception to "no FP libraries" precisely
because it's a pattern-matching primitive, not a monad framework.

## `as const` and `satisfies`

- Use `as const` for enum-like constant tables and literal wire strings. `src/errors.ts`
  already does this (`"…" as const`). Prefer an `as const` string-union over a TS `enum`:
  enums emit runtime code, tree-shake poorly, and numeric enums have type holes.

  ```typescript
  const OPERATIONS = ["validation", "execution", "benchmark"] as const;
  type Operation = (typeof OPERATIONS)[number]; // "validation" | "execution" | "benchmark"
  ```

- Use `satisfies` to type-check an object literal *without* widening away its precise
  inferred types. Combine as `{ … } as const satisfies SomeType` for "frozen and checked".

  ```typescript
  const LIMITS = {
    validation: 50,
    execution: 20,
    benchmark: 5,
  } as const satisfies Record<Operation, number>;
  // Missing/extra keys are a compile error; values stay literal-typed.
  ```

## Conditions must be pure — never call effectful functions in predicates

A conditional **decides** which branch to take. Its predicate must be a pure
inspection. Calling a function that mutates, does I/O, or has side effects inside an
`if`/`switch`/`while`/ternary condition is a hard anti-pattern: it hides the effect
behind boolean syntax and makes the code untestable as a predicate.

```typescript
// BAD — tryInject mutates AND returns a hint; the `if` condition is doing work.
if (!tryInjectStamp(contentArray, sessionId)) {
  appendFallbackBlock(contentArray, sessionId);
}

// GOOD — pure inspection decides; each branch then performs its effect.
const target = findFirstJsonTextBlock(contentArray); // pure: returns candidate | null
if (target !== null) {
  injectStamp(target, sessionId);
} else {
  appendFallbackBlock(contentArray, sessionId);
}
```

Test: would calling the predicate **twice** be observably identical? If not, it isn't
a predicate — it's a procedure. Split it into a pure `find…`/`parse…`/`classify…`
that returns the candidate (or `null` / a union), then a separate effect on it.
`classifyAnthropicError` and `sanitizeMcpToolError` in `src/errors.ts` are the model:
pure classifiers returning a union, no I/O.

If a function returns `boolean` AND mutates state, rename it (`apply…`, `commit…`,
`process…`) so it can never sit in a condition position by accident.

## Effects belong in dedicated effect blocks

A function whose name implies computation (`parse`, `classify`, `build`, `redact`,
`to…`, `count`, `find`) must never perform side effects. Partition first (pure),
then act on each group (effects isolated).

```typescript
// ❌ BAD — deletion (an effect!) hidden inside what looks like a "count"
const count = slots.map((s) => {
  if (s.kind === "starting") {
    repo.delete(s.id);   // effect buried in a map!
    return 0;
  }
  return s.activeCount;
});

// ✅ GOOD — partition purely, then run each effect group in a labeled pass
const starting = slots.filter((s) => s.kind === "starting");
const live     = slots.filter((s) => s.kind === "live");

// Effect group 1: delete abandoned placeholders
for (const s of starting) await repo.delete(s.id);

// Effect group 2: reconcile live counts
for (const s of live) await repo.updateActiveCount(s.id, s.activeCount);
```

Testing "what gets counted" must be possible without triggering "what gets deleted".

## Null / undefined handling

Chain with `?.` and `??`. Reserve `!` (non-null assertion) for tests; avoid it in
`src/`. `noUncheckedIndexedAccess` is on (`tsconfig.json`), so array/index reads are
`T | undefined` — handle the `undefined`, don't `!` it away.

```typescript
// GOOD
const name = user?.profile?.displayName ?? "Anonymous";
const first = xs[0];
if (first !== undefined) use(first);

// BAD
const name = user!.profile!.displayName;
const first = xs[0]!;
```

## Error handling: `throw`, with `Result` only when failures are branchable

- **Throw exceptions for errors** — it's the language convention, and `try/catch`
  with narrowing (`err instanceof SomeError`) is idiomatic. See `src/errors.ts` for
  how we narrow `unknown` errors safely.
- **Do NOT** wrap every function in `Result<T, E>`. That's ceremony.
- A discriminated-union result (`{ kind: "ok"; … } | { kind: "err"; … }`) is
  appropriate **only** when a function has multiple distinct, typed failure modes
  that callers genuinely branch on at the type level. `SanitizedMcpToolError`
  (`auth_required` vs `generic_tool_error`) is a legitimate example — the caller
  renders each differently. That's rare; most functions should just `throw`.

## Monads, judiciously

`Promise` is the monad we use constantly, and `async`/`await` is how we keep it flat
and readable — that's the whole point. `Array.flatMap` and `Optional`-style `?.`
chaining are the other monadic patterns worth reaching for.

Beyond that: **stop.** No `fp-ts`, no `Effect`, no `Task`/`IO`/`Either` monad zoos,
no HKTs, no monad transformers, no pointfree gymnastics. (`ts-pattern` is the one
blessed library — it's a pattern-matching primitive, not a monad framework. See
"For the harder cases: `ts-pattern`".) If you feel the pull toward
a `Reader` monad or a typeclass encoding, that's the signal to write a plain function
that takes its dependencies as arguments instead. A hand-rolled monad shows up in
this codebase roughly never; introducing one is a discussion to have with the user
first, not a default.

## File Organization

Flat, consolidated modules — not Java-style one-class-per-file. `src/` is flat
(`domain.ts`, `errors.ts`, `wire.ts`, …) with a couple of cohesive subfolders
(`storage/`, `reconcile/`). Match that.

- Related types + the functions over them live together (`errors.ts` = classifiers +
  their message constants + the sanitizer).
- Aim for ~100–300 lines per file; split when a file exceeds ~500 lines or mixes
  unrelated concerns.
- Use section comments (`// ===== Section =====`) for navigation in larger files.
- Tests mirror source under `test/` (`vitest`), one `*.test.ts` per module.

## Naming

- Discriminant literals and variant tags: lowerCamel string literals matching the
  neighbours (`"mcpToolUse"`, `"auth_required"` — note the wire contract uses
  snake_case because the frontend mirror expects it; internal types use camelCase).
- Types and type aliases: `UpperCamelCase` (`DomainEvent`, `AnthropicErrorClass`).
- Functions and values: `lowerCamelCase`. Pure transforms read as nouns/`to…`
  (`toSseFrame`), classifiers as `classify…`/`sanitize…`, predicates as `is…`/`has…`.
- Constant tables: `UPPER_SNAKE` is used in this repo for wire-message and marker
  constants (`OVERLOADED_WIRE_MESSAGE`, `AUTH_RELEVANT_REASONS`). Keep that convention.

## Boundaries — do not

- Introduce `fp-ts`, `Effect`, HKTs, monad transformers, or lens libraries.
  (`ts-pattern` is the one allowed FP library, for hard matches — see its section.)
- Cast a coproduct (`as SomeVariant`) or use `any`. Narrow, or use `unknown` +
  explicit checks at I/O boundaries.
- Use magic/sentinel values instead of a variant (`-1`, `""`, `MAX_SAFE_INTEGER`).
- Call effectful functions inside `if`/`switch`/`while`/ternary predicates.
- Hide effects inside pure-looking `map`/`reduce`/value-binding expressions.
- Drop the `assertNever` default when matching a union.
- Convert a functional chain to an imperative loop "for readability".
- Use a TS `enum` where an `as const` string union works.
- Remove, shorten, or drop code comments when moving/refactoring code — comments
  move verbatim with the code they describe.
- Disable, `skip`, comment out, or delete a failing test. Fix the code or fix the
  test; if you believe a test is genuinely invalid, **ask the user first**.

---

## Node.js 22 (required)

This repo targets **Node.js 22+** (Lambda runtime `nodejs22.x`, `package.json`
`engines`). Do **not** invoke toolchain binaries directly (`vitest`, `tsx`,
`tsc`, `node src/…`) — shells (including Cursor’s agent terminal) may default to
an older system Node under `/usr/bin`.

**Always use npm scripts**, which route through `scripts/with-node22.mjs` and
discover Node 22 from `n`, nvm, or `/usr/local` independently of the shell PATH:

```bash
npm test                  # unit tests
npm run test:integration  # LocalStack integration tests
npm run typecheck         # tsc --noEmit
npm run build             # esbuild bundle for Lambda
npm run local             # local dev server
```

`.npmrc` sets `engine-strict=true` — `npm install` fails on Node < 22. That
guards installs; it does not replace the wrapper for `npm run` commands in a
split-PATH environment.

When adding new scripts in `package.json`, prefix with
`node scripts/with-node22.mjs …` unless the script is pure Docker/shell
(`localstack:up`, etc.).

## Build & Test

- `npm run typecheck` — the type checker is your first line of defense. `strict`,
  `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`,
  and friends are all on (`tsconfig.json`); keep them on.
- `npm test` — `vitest` unit tests. Every `src/` module has a `test/*.test.ts`.
- `npm run test:integration` — LocalStack-backed integration tests
  (`npm run localstack:up` first).
- Do not weaken a strict compiler flag to make an error go away — fix the code.
