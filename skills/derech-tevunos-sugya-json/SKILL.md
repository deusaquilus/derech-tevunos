---
name: derech-tevunos-sugya-json
description: Label a Talmudic passage (or any dialectical text) with Ramchal's Derech Tevunos system and write it as a derech-tevunos/sugya JSON file, the format derech-tevunos.com draws as a waterfall. Use when the user asks to turn a sugya, a gemara passage, or a Sefaria text into a sugya file, to label the moves of an argument (question, answer, proof, difficulty, resolution), or to produce JSON for the Bring Your Own page at derech-tevunos.com/byo.
---

# Derech Tevunos → sugya JSON

Turn a passage into one file, `<id>.json`, in the format `derech-tevunos/sugya` version `1`: the passage's sentences in order, each labelled with the move it makes (Ramchal, *Derech Tevunos*, ch. 9) and, optionally, what it *is* and how it *derives* (chs. 1–8, 10–11) and which of its words play which part (subject, predicate, premise…). The reader at https://derech-tevunos.com/byo draws the file, or refuses it with every fault listed by JSON path.

The complete reference is [DERECH_TEVUNOS_SUGYA_JSON_GUIDE.md](DERECH_TEVUNOS_SUGYA_JSON_GUIDE.md), beside this file. Read its Part I (§1–§6) before the first file, keep §7 (the one-page card) open while labelling, and open a construct's entry in Part II only when two labels both seem to fit. Do not read all 3,900 lines up front.

## Workflow

1. **Get the text.** Hebrew/Aramaic and English for the exact range. With the Sefaria Texts MCP (`https://mcp.sefaria.org/sse`, no key) fetch the reference the user named; otherwise use what the user pasted, or `https://www.sefaria.org/api/v3/texts/<Tractate>.<folio>` (e.g. `Bava_Metzia.2a`). Fix the range first: a self-contained exchange, opened by a statement or a question and closed by a resolution or the Gemara's last word.
2. **Segment.** One unit per move (guide §6). Where a printed sentence holds two moves, split it; where one move spans sentences, merge. `en` is the move phrased as one English sentence; `he` is the original, or its incipit with `…`.
3. **Label each unit** by the procedure in §14, steps 0–9: who speaks (`speaker`; `party` on the sugya), what the unit does to an earlier unit (`move.element`, `move.subtype`, `move.target`), the stock phrase that announces it (`move.marker`, copied exactly), where its own authority comes from (`provenance`), and, when you can say so, what it is and how it relates to its target (`anatomy`). Put the reasoning for every judgment call in `note`.
4. **Check the checklist** (§21), then trace the reducer (§13) in your head: the Talmud's last word standing must come out as the drawing's verdict. Where they differ the file is wrong, usually a unit holding two moves or a `provenance` left at its default.
5. **Deliver** `<id>.json` with `about` written, plus two or three lines naming the judgment calls. Tell the user to open it at https://derech-tevunos.com/byo. If the page refuses it, take the fault list, fix each path, and hand the file back.

## The vocabulary you may emit

Nothing outside these lists is valid outside `ext`. The reader refuses an unknown key or value and names the nearest allowed one.

**`move.element` / `move.subtype`**, the nineteen leaves:

| element | subtypes |
|---|---|
| `statement` | `firsthand` · `explanation` · `forcedExplanation` · `presumption` · `inference` · `reported` |
| `question` | `query` · `principle` |
| `answer` | `answer` · `determination` |
| `proof` | `demonstration` · `validation` |
| `contradiction` | `direct` · `opposition` |
| `difficulty` | `objection` · `apparentContradiction` · `refutation` |
| `resolution` | `settlement` · `alternative` |

**`provenance`**: `sense` · `axiom` · `endoxa` · `tradition` · `derivation` · `asserted` (the default). `tradition` on every mishnah, baraita and verse; `derivation` on reasoning; `asserted` on a rabbi's ruling on his own authority.

**`party`** (on the sugya): `party-group` · `party-individual` · `party-talmud`.

**`anatomy[].kind`**: one of the hundred and twenty in guide §3.3, each with `basis` `marked` or `inferred`. Optional. Leave it out rather than guess.

**`spans`** (guide §2.5): which words of `he` / `en` are the `subject`, `predicate`, `antecedent`, `consequent`, `premise`, `conclusion` or a `commitment`, as word ranges — `"3"`, `"2-4"`, or a list — counted by whitespace tokens from 1. Optional; never a copy of the words. Write them where the passage turns on the split, not on every sentence. A span is **quiet by default** (the page shows the faintest mark); write `{ "words": "2-4", "showLoud": true }` **only** for the rare span the sugya's logic hangs on — most passages have none.

## The smallest valid file

```json
{
  "format": "derech-tevunos/sugya",
  "version": 1,
  "id": "berachos-35a-fruit",
  "title": "How does one bless over fruit?",
  "tractate": "Berachos",
  "folio": "35a",
  "discussedAt": "Derech Tevunos ch. 9, p. 168 — the Mishnah's question is Ramchal's example of a שאלה for a rule",
  "units": [
    { "id": "q", "en": "How does one recite a blessing over fruit?", "move": { "element": "question", "subtype": "query" } },
    { "id": "a", "en": "Over fruit of the tree one says: who creates the fruit of the tree.", "move": { "element": "answer", "subtype": "answer", "target": "q" } }
  ]
}
```

Required: `format`, `version`, `id`, `title`, `tractate`, `folio`, `discussedAt`, `units`; per unit `id`, `en`, `move`; per move `element`, `subtype`. For a passage Ramchal does not discuss, `discussedAt` says so: `"Not discussed in Derech Tevunos; labelled from the markers of ch. 9"`.

A unit with everything the page can show — the answer from that file, verbatim (its `spans` are quiet, as spans almost always are):

```json
{
  "id": "answer",
  "speaker": "The Gemara",
  "he": "חרש וחרשת דקימא תקנתא דרבנן – תקינו להו רבנן נשואין, שוטה ושוטה דלא קימא תקנתא דרבנן – לא תקינו רבנן נשואין",
  "en": "Since deaf-mutes are capable of fulfilling rabbinical ordinances, the rabbis validated their marriage. The insane are incapable, so the rabbis did not.",
  "move": { "element": "answer", "subtype": "answer", "target": "question", "attested": true },
  "provenance": "derivation",
  "anatomy": [
    { "kind": "consequent", "note": "Since they can keep rabbinic ordinances, the rabbis validated their marriage: this, so that." },
    {
      "kind": "subject-quality",
      "note": "The difference the question asked for is located in a faculty — whether a rabbinic ordinance can hold of them at all. The answer does not distinguish the two by what they are but by what they can do."
    }
  ],
  "spans": {
    "he": {
      "antecedent": ["1-5", "11-16"],
      "consequent": ["7-10", "18-21"]
    },
    "en": {
      "antecedent": ["1-8", "14-17"],
      "consequent": ["9-13", "19-22"]
    }
  },
  "note": "Two consequent statements in one breath, one for each class, so the antecedent and the consequent each occur twice and take a list; the two dashes carry the dependence and belong to no role, as `לפיכך` does in Ramchal's own example (Heb p39). The spans are written because the form is a `consequent`, whose two clauses chapter 3 names (Heb p31) and whose three intentions chapter 6 counts (Heb p87–89), not because a difficulty lands on one part: none does, so the `commitment` spans are not written."
}
```

Whatever has no field yet (the normalized paraphrase, premises that are not words of the sentence, further targets) goes under `ext`, with the names in guide §4. The page reads nothing from `ext` and carries it through.

## Rules that bite

- `id` is lowercase letters, digits and hyphens. Unit ids are unique; a `target` names an **earlier** unit.
- One unit, one move, one target. Further targets go in `ext.move.targets`.
- Do not write status, standing, depth, folds or a verdict. All of them are derived from `units`.
- `marker` is a signpost of the *move* (`תא שמע`, `אלא`, `מאי שנא … ומאי שנא`), not a phrase that happens to occur in the sentence. `attested: true` only where Ramchal himself labels this sentence of this passage.
- Never invent a key or a value. If no leaf fits, take the nearest and say so in `note`.
- `inseparable-property`, `contingent-attribute`, `potential`, `actual` are written **only when the passage turns on the respect or the modality** — a clash dissolved or a chain broken *by* it. Nearly every predicate in Shas is a proprium or an accident; that is never a reason to label it. Default: no label (guide §11, Aspects).
- A non-Talmudic text works the same way with no markers: every label is inferred by the structural tests (§18 is a worked dialogue).

## Validating without the page

The JSON Schema is [`site/src/rail/sugyot/sugya.schema.json`](https://github.com/deusaquilus/derech-tevunos/blob/main/site/src/rail/sugyot/sugya.schema.json) in the repository; any JSON Schema 2020-12 validator checks shape, required keys and enums against it. It cannot check that a `target` precedes its unit or that an edge-level `anatomy` label has a target; the page can, so open the file there before calling it done.
