# Do rails nest? — research verdict

Question: does the v3 thick rail (`SUGYA_WATERFALL_V3_RAIL.md`, unchanged by v4) need to
support rails within rails — large sections inside large sections — and if so, does the
renderer need lanes and colours for sugyot within sugyot?

Method: the repo's Bava Metzia 21b–22b fixture plus the opening sugya of six tractates
(Berakhot, Pesachim, Kiddushin, Gittin, Bava Kamma, Bava Metzia 2a), 325 sentences in all,
encoded as move skeletons (`skeletons.ts`) from the Sefaria text (`texts/`), and run through
`site/src/rail/folding.ts` **read-only** by `analyze.ts`. Ambiguous targets were given the shorter
reach, so nesting counts are a floor. Run: `node analyze.ts` (Node ≥ 22.18).

## Findings

| sugya | sentences | long-reaching | on sub-arguments | nested pairs | depth | crossings sides / structural | arrive folded | folds released | answers buried |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Bava Metzia 21b–22b (fixture) | 57 | 16 | 0 | 0 | 1 | 51 / 0 | 3 | – | – |
| Bava Metzia 2a–3a | 36 | 8 | 5 | 9 | 3 | 0 / 0 | 4 | 2 (15 rows) | 1 |
| Bava Kamma 2a–3b | 77 | 14 | 14 | 20 | 3 | 0 / 0 | 5 | – | 4 |
| Kiddushin 2a–3a | 37 | 7 | 6 | 3 | 2 | 0 / 0 | 2 | 1 (5 rows) | 1 |
| Gittin 2a–3a | 31 | 4 | 0 | 0 | 1 | 0 / 0 | 0 | – | – |
| Berakhot 2a–3a | 41 | 6 | 3 | 3 | 2 | 0 / 0 | 0 | – | – |
| Pesachim 2a–3a | 46 | 15 | 1 | 1 | 2 | 3 / 13 | 1 | 1 (38 rows) | – |

*Sub-argument*: the rail's target is not one of the positions the sugya is about (root,
its דחיה, or the answer to a question put to the root). *Nested pair*: a rail's span strictly
inside another's, with a different, non-position target that descends from the outer target.
*Answers buried*: a folded arrival whose band hides an earlier long-reaching answer to the
same question.

1. **Nesting is the ordinary shape.** Five of six opening sugyot have long-reaching moves on
   sub-arguments, nested up to three deep. The fixture — every rail to Abaye or Rava — is the
   exception, shared only by the other two-Amora disputes (Gittin, Pesachim).
2. **Spans are laminar.** No structural crossings in any natural encoding. Pesachim's 13 come
   from encoding קא סלקא דעתך as its own sentence and pointing the אלא at it (the אלא acts on
   both positions at once; one-target-per-move forces it onto one side and it then crosses
   the other's rake). Pointed at the position, they vanish. Nested brackets would never cross.
3. **Every loss in the flat model is a fold loss, not a rail loss.**
   - *Released folds*: an open long-reaching arrival drops the current fold (v3 §5.3), so a
     settled sub-argument re-expands under a long rail: Bava Metzia 2a ×2 (8 + 7 rows),
     Kiddushin ×1 (5), Pesachim ×1 (38 rows under a 44-row rail — ותנא דידן מאי טעמא).
   - *Buried answers*: a later answer on the same question folds the earlier answers into its
     band. Bava Kamma's אהייא chain does this four times; unfolding the last band gives back
     38 flat rows where the structure is six candidates each killed by a מאי שנא.
   - *Long open rails over finished material*: אמר מר, the next mishnah clause, ותנא דידן draw
     24–44-row rails where a tree of folds would show 2–8 rows.
4. **Two kinds of long-reaching closer.** Where the span is the target's subtree (Rav Pappa's
   answer, the אהייא candidates, אלא כל היכא דאיכא פלוגתא) a tree fold pays: unfold one level
   shows 2–11 rows instead of 8–38. Where the span is *history* — siblings, not descendants
   (the סתירה on Rava spanning Abaye's challenges; Pesachim's אלא spanning both sides' proofs) —
   a tree fold buys nothing (45→37, 38→38) and v3's range band is right.

## Verdict

Rails within rails, as *rendering* — several brackets on the page at once, one colour per
level — are **not** necessary. Nested *folds* **are**: a band should remember the bands inside
it, closers whose span is a subtree should fold by subtree (teeth visible, threads folded),
returns to the root should fold the finished movement rather than rail over it, and unfolding
should go one level at a time. With that, at most one rail per level is ever materialised, the
focus rail keeps its single indigo, and depth is carried by band indentation (optionally one
thinner enclosing lane), not hue. Ramchal describes the shape directly in ch. 10: statements,
proofs of statements, proofs of proofs, and proofs of those — and then returning back up the
chain.

