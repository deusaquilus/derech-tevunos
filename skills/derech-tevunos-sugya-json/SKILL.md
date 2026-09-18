---
name: derech-tevunos-sugya-json
description: Label a Talmudic passage (or any dialectical text) with Ramchal's Derech Tevunos system and write it as a derech-tevunos/sugya JSON file, the format derech-tevunos.com draws as a waterfall. Use when the user asks to turn a sugya, a gemara passage, or a Sefaria text into a sugya file, to label the moves of an argument (question, answer, proof, difficulty, resolution), or to produce JSON for the Bring Your Own page at derech-tevunos.com/byo.
---

# Derech Tevunos → sugya JSON

Turn a passage into one file, `<id>.json`, in the format `derech-tevunos/sugya` version `1`: the passage's sentences in order, each labelled with the move it makes (Ramchal, *Derech Tevunos*, ch. 9) and, optionally, what it *is* and how it *derives* (chs. 1–8). The reader at https://derech-tevunos.com/byo draws the file, or refuses it with every fault listed by JSON path.

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

**`anatomy[].kind`**: one of the hundred and six in guide §3.3, each with `basis` `marked` or `inferred`. Optional. Leave it out rather than guess.

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

A unit with everything the page can show:

```json
{
  "id": "answer",
  "speaker": "The Gemara",
  "he": "חרש וחרשת דקימא תקנתא דרבנן – תקינו להו רבנן נשואין …",
  "en": "Since deaf-mutes can keep rabbinic ordinances, the rabbis validated their marriage; the insane cannot, so they did not.",
  "move": { "element": "answer", "subtype": "answer", "target": "question", "attested": true },
  "provenance": "derivation",
  "anatomy": [{ "kind": "consequent", "note": "Since they can keep rabbinic ordinances, the rabbis validated their marriage: this, so that." }],
  "note": "Ramchal's own illustration of תשובה, ch. 9 p. 172."
}
```

Whatever has no field yet (normalized subject and predicate, premises, axes, further targets) goes under `ext`, with the names in guide §4. The page reads nothing from `ext` and carries it through.

## Rules that bite

- `id` is lowercase letters, digits and hyphens. Unit ids are unique; a `target` names an **earlier** unit.
- One unit, one move, one target. Further targets go in `ext.move.targets`.
- Do not write status, standing, depth, folds or a verdict. All of them are derived from `units`.
- `marker` is a signpost of the *move* (`תא שמע`, `אלא`, `מאי שנא … ומאי שנא`), not a phrase that happens to occur in the sentence. `attested: true` only where Ramchal himself labels this sentence of this passage.
- Never invent a key or a value. If no leaf fits, take the nearest and say so in `note`.
- A non-Talmudic text works the same way with no markers: every label is inferred by the structural tests (§18 is a worked dialogue).

## Validating without the page

The JSON Schema is [`site/src/rail/sugyot/sugya.schema.json`](https://github.com/deusaquilus/derech-tevunos/blob/main/site/src/rail/sugyot/sugya.schema.json) in the repository; any JSON Schema 2020-12 validator checks shape, required keys and enums against it. It cannot check that a `target` precedes its unit or that an edge-level `anatomy` label has a target; the page can, so open the file there before calling it done.
