# The sugya file format

*One Talmudic passage as JSON: everything the page renders, nothing it derives.*

Format `derech-tevunos/sugya`, version `1`. Implementation: `site/src/rail/format.ts`.
Schema for editors: `site/src/rail/sugyot/sugya.schema.json`. The eleven passages the
app ships with are `site/src/rail/sugyot/*.json`, and every one of them is checked
against its hand-written TypeScript original for identical data, identical
analysis and an identical drawing (`npm run check:rail` in `site/`).

---

## 1. What a file is

A file is a **sugya**: a passage's metadata, then its **units** — the sentences
in the order they are said. A unit carries the sentence in Hebrew and English,
who says it, the **move** it makes (Derech Tevunos ch. 9: what the sentence
*does* to an earlier one), where its authority comes from (ch. 8), and, as a
separate layer, its **anatomy** (every chapter but the ninth: what the
sentence *is*, how it stands to the one it acts on, what a proof or disproof
stands on, when a report is itself the argument, and which aspect of its
subject it examines).

Everything else on the page is derived from that and is *not* in the file:
depth (from the chain of targets), standing and status (from the moves that
land on a unit), the verdict pill, the movements a passage divides into, the
folds, the bands, the rails, the handles, whether a label reads *attested*,
*marked* or *inferred*, and the *Talmud itself* badge on a sentence with no
speaker. If two files have the same units they draw the same page.

The smallest complete file, exactly as shipped:

```json
{
  "$schema": "./sugya.schema.json",
  "format": "derech-tevunos/sugya",
  "version": 1,
  "id": "yebamos-deafmute",
  "title": "Why a deaf-mute may marry and the insane may not",
  "tractate": "Yebamos",
  "folio": "112b",
  "discussedAt": "Derech Tevunos ch. 9, pp. 170-172",
  "party": "party-talmud",
  "collection": "ramchal",
  "about": [
    "Ramchal's own illustration of `שאלה` and its `תשובה`, Heb pp169/171, Eng pp170/172. Both labels are his, and the question carries one of the stock markers he cites, `מאי שנא … ומאי שנא`.",
    "A question opens a thread rather than acting on an earlier sentence, so it sits at depth 0 with no target."
  ],
  "units": [
    {
      "id": "question",
      "speaker": "The Gemara",
      "he": "מאי שנא חרש וחרשת דתקינו להו רבנן נשואין, ומאי שנא דשוטה ושוטה דלא תקינו להו רבנן נשואין?",
      "en": "What is the difference between deaf-mutes, for whom the rabbis ordained that a marriage is valid, and the insane, for whom a marriage is invalid?",
      "move": { "element": "question", "subtype": "query", "marker": "מאי שנא … ומאי שנא", "attested": true },
      "provenance": "asserted"
    },
    {
      "id": "answer",
      "speaker": "The Gemara",
      "he": "חרש וחרשת דקימא תקנתא דרבנן – תקינו להו רבנן נשואין, שוטה ושוטה דלא קימא תקנתא דרבנן – לא תקינו רבנן נשואין",
      "en": "Since deaf-mutes are capable of fulfilling rabbinical ordinances, the rabbis validated their marriage. The insane are incapable, so the rabbis did not.",
      "move": { "element": "answer", "subtype": "answer", "target": "question", "attested": true },
      "provenance": "derivation",
      "anatomy": [
        { "kind": "consequent", "note": "Since they can keep rabbinic ordinances, the rabbis validated their marriage: this, so that." }
      ]
    }
  ]
}
```

The only required keys are `format`, `version`, `id`, `title`, `tractate`,
`folio`, `discussedAt` and `units`; within a unit, `id`, `en` and `move`; within
a move, `element` and `subtype`. A file can be as bare as that. Everything the
page can show beyond the lattice itself — speakers, Hebrew, markers, the
anatomy badges — is opt-in per unit.

---

## 2. How a file is loaded

**Shipped.** `site/src/rail/sugyot/index.ts` imports each file and passes it through
`parseSugya`. A file with a fault fails at import, naming every fault; nothing
half-valid reaches the page. To ship a passage: put the file in that directory
and add one line to `FILES`. Order there is gallery and tab order.

**Opened at runtime.** `#/open` is a page of its own
(`site/src/rail/app/pages/OpenPage.tsx`): its own chrome, not a tab of the shipped
lattice. It takes a file dropped on it, chosen from the picker, or pasted into
its box. The same `parseSugya` runs on it. If it passes, the passage is drawn
there by the same `SugyaView` every shipped passage is drawn by, and the route
becomes `#/open/<id>`; the file is kept in `sessionStorage` as `toJson` of
itself, so a reload on that page redraws it. It does not join the shipped tabs
or the gallery. If it fails, every fault is listed with the path it was found
at and nothing is drawn. Beside the drawn passage sit *Download canonical form*
(§8) and the file's own `about`.

**From code.** `parseSugya(json, sourceName)` returns a `Sugya` or throws a
`SugyaFormatError` whose `.faults` is the list; `toJson(sugya)` and
`stringify(sugya)` go the other way. All three are exported from the barrel
`site/src/rail/index.ts`.

---

## 3. What the passages use — the construct inventory

The format was drawn up by going through each passage and listing every
construct it relies on, so that nothing on any page lacks a home in the file.
Counts are units unless stated.

| passage | units | party | speaker | he | short | target | marker | attested | note | anatomy | anatomy families | leaves used | hint |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `pesachim-liquids` — Pesachim 16a/18b | 4 | group | 4 | 4 | — | 3 | 1 | 3 true, 1 false | 2 | 9 labels on 4 | anatomy, relations, deductions, grounds, subjects | 4 | — |
| `berachos-yaakov` — Berachos 4a | 4 | individual | 4 | 4 | — | 2 | 1 | 4 true | 1 | 8 on 4 | anatomy, relations, subjects | 3 | — |
| `yebamos-chalitzah` — Yebamos 104b | 3 | talmud | 3 | 2 | — | 2 | 1 | 3 true | 1 | 6 on 3 | anatomy, relations, subjects | 3 | — |
| `yebamos-deafmute` — Yebamos 112b | 2 | talmud | 2 | 2 | — | 1 | 1 | 2 true | — | 3 on 2 | anatomy, subjects | 2 | — |
| `bava-metzia-yeush` — Bava Metzia 21b–22b | 57 | group | 19 | 57 | 57 | 56 | 25 | 57 false | 12 | 53 on 44 | anatomy, relations, deductions, grounds, subjects | 16 | — |
| `bk-83b-ayin` — Bava Kamma 83b | 15 | talmud | 3 | 15 | 15 | 14 | 13 | 2 true | 7 | 15 on 9 | anatomy, relations, deductions, grounds, reports, subjects | 9 | — |
| `sukkah-2b-heleni` — Sukkah 2a–2b | 9 | group | 6 | 9 | 9 | 8 | 7 | 9 false | 4 | 11 on 8 | relations, deductions, grounds, reports, subjects | 7 | — |
| `bm-2a-ochazin` — Bava Metzia 2a–3a | 36 | talmud | 2 | 36 | 36 | 35 | 33 | 36 false | — | — | — | 7 | yes |
| `bk-2a-toldos` — Bava Kamma 2a–3b | 77 | talmud | 2 | 77 | 77 | 76 | 63 | 77 false | — | — | — | 10 | yes |
| `pes-2a-or` — Pesachim 2a–3a | 46 | group | 4 | 46 | 46 | 45 | 39 | 46 false | — | — | — | 9 | yes |
| `git-2a-befanai` — Gittin 2a–3a | 31 | group | 3 | 31 | 31 | 30 | 24 | 31 false | — | 19 on 16 | anatomy, relations, deductions, grounds | 6 | yes |

What each passage contributed to the format:

- **The four short Ramchal passages** fix the core: a unit with `speaker`,
  `he`, `en`, a `move` with `target`, `marker` and `attested: true`, a
  `provenance`, and `anatomy` labels of all three kinds that appear on the page
  — row-level form (`categorical`, `unqualified`, `qualified-possible`,
  `preclusive`, `inference-loose`, `consequent`), edge-level relations
  (`diametrically-opposed`, `differs-in-context`) and edge-level deductions
  (`hypothetical-syllogism-tollens`). Two of them put two labels on one unit,
  which is why `anatomy` is a list. `yebamos-chalitzah` has a unit with no
  Hebrew, which is why `he` is optional. `pesachim-liquids` has the one Ramchal
  unit that is *not* attested and carries a `note` saying why, which is why a
  file can say `attested: false` and explain itself. A speaker of *Genesis
  28:15* shows `speaker` is free text, not a name.
- **Bava Metzia 21b–22b** adds scale: `short` on every unit (bands, handles
  and headings need it once a passage is long enough to fold), sixteen of the
  nineteen leaves, `attested: false` throughout with the `marker` carrying the
  checkability instead, labels whose `basis` is `marked` on the anatomy layer
  (six), `provenance: tradition` on the challenges from mishnayos, and a
  five-paragraph editorial preface explaining two places the taxonomy was
  stretched — which is what `about` is for.
- **Bava Kamma 83b and Sukkah 2a–2b** are the chapter 10 pair, added
  2026-09-19 with the composite icons. Bava Kamma is Ramchal's own worked
  example — he quotes `תו קא קשיא לתנא` and `אמרי, דנין` in succession at
  Heb p215 / Eng p216 and names what each does — which makes
  `ascribed-difficulty` the only anatomy label in the corpus whose `basis` is
  `attested`; every other one is ours. Sukkah is the ascribed *proof*, labelled
  from its markers. The pair is here because a composite is the one construct
  whose point is that a sentence does two jobs, and the two passages fail in
  opposite directions: in Bava Kamma the *ascription* is attacked and the
  ruling is untouched, in Sukkah the *incident* is granted and the inference
  from it denied. Both also demonstrate that chapter 11 does real work — a
  proof turning on `subject-quantity`, a rebuttal on `subject-difference` —
  and Sukkah is the first passage to use `redundant-part` and
  `might-have-thought`, which had icons and no users.
- **The four research passages** add the page furniture: `collection`
  (they sit on their own shelf in the gallery), `hint` (their header says which
  step and which band produce the folds they exist to show), and a `speaker` of
  *Mishnah* on the opening unit. Their
  `short` is a mechanical cut of `en`, materialised in the file, and every unit
  is `attested: false` with a `marker` on most. Three of the four give no
  `provenance` on any unit, so every one of their claims starts in doubt —
  which is what a skeleton looks like, not what the Talmud says.
- **Gittin 2a–3a** is the one research passage labelled past the skeleton, and
  it is the file's demonstration that the two layers are independent. Its ch. 9
  move on Rava is `דחיה`, one view set against another; its ch. 4 label is
  `variant`, one subject with two predicates and neither denying the other,
  which is why the next unit has to ask `מאי בינייהו`. Both sides' threads then
  run the same three labels — `analogism` marked by `מידי דהוה א…`,
  `fallacy-not-included`, and `ground-does-not-reach` — so the file shows a
  symmetry the move layer draws twice and never names. It is also where
  `provenance` does visible work: thirteen units are `tradition`, and on the
  objections that makes a derived ground badge.

Nothing else on any page comes from anywhere but these keys. The two things
the TypeScript originals had that the files do not are the section comments
in `bava-metzia-yeush.ts` (`// --- 1. scattered produce ---`), which the page
derives as *movements*, and the builder that expanded the research passages'
two-letter move codes — the files hold the expanded moves.

---

## 4. Field by field

### 4.1 The sugya

| key | type | required | what it is | what the page does with it |
|---|---|---|---|---|
| `$schema` | string | no | Path or URL of the JSON Schema, for editors. Shipped files say `"./sugya.schema.json"`. | Nothing. |
| `format` | `"derech-tevunos/sugya"` | **yes** | What kind of file this is. | Refused if anything else. |
| `version` | `1` | **yes** | The format version this file was written to. | Refused if the reader does not understand it. |
| `id` | string | **yes** | Stable and URL-safe: lower-case letters, digits, hyphens. | The route `#/sugya/<id>` on the lattice; `#/open/<id>` on the loader page. |
| `title` | string | **yes** | What the passage is about, in a few words. | Gallery card, tab, header. |
| `tractate` | string | **yes** | e.g. `"Bava Metzia"`. | Gallery card, tab, header, SVG export. |
| `folio` | string | **yes** | e.g. `"21b-22b"`. Free text — `"16a / 18b (Eng. col. 17b)"` records a disagreement between columns. | Same places as `tractate`. |
| `discussedAt` | string | **yes** | Where Ramchal discusses the passage; or, for one he does not, the sentence that says so and how it was labelled instead. | The header's citation line and the SVG export. |
| `party` | `party-group` · `party-individual` · `party-talmud` | no | Ch. 1: what kind of sugya this is as a whole — named rabbis in dispute, one person arguing both sides, or the Talmud's own voice. A judgment about the passage, so declared rather than derived from the speakers. | The *Speakers* lens of the anatomy layer. |
| `collection` | `ramchal` · `research` | no | Which shelf of the gallery. `ramchal`: discussed in the book, or labelled from its markers. `research`: brought in for the nested-rail study. | Gallery grouping and its lead text. Absent: shown under *Other passages*. |
| `about` | string[] | no | The editor's preface, one paragraph per entry: why the passage is here, how it was labelled, where the taxonomy was stretched, which edition the text is from. | Nothing on the passage's own page; the *Open* page shows it under *The file's own preface*, for the person who opened the file. |
| `hint` | string | no | Where to look on this page. Replaces the header's standard copy. `**bold**` and `*italic*` are the only markup; no nesting, no escapes. | The header's hint line. |
| `units` | unit[] | **yes** | The sentences, in order. At least one. | Everything. |
| `ext` | object | no | Room for what the format does not yet name. See §7. | Nothing. |

### 4.2 A unit

| key | type | required | what it is | what the page does with it |
|---|---|---|---|---|
| `id` | string | **yes** | Unique within the file. Later units name it in `move.target`. Short mnemonic ids (`abaye`, `t1-ask`, `t1-ans`) read well in fault messages and in the URL. | Row identity, `data-id`, handles, the `?at=` deep link is by position not id. |
| `speaker` | string | no | Who says it, when the sentence names someone: a rabbi, *Mishnah*, *The Gemara*, a verse. Absent: the sentence is the Talmud's own voice. | Printed on the row. When absent, the *Speakers* lens shows *the Talmud itself* in its place. |
| `short` | string | no | A few words naming the sentence — a caption, not a label from the taxonomy. | Band summaries (*7 sentences folded · …*), movement headings, the slider's label, the state-of-play strip. Falls back to the first 48 characters of `en`. |
| `he` | string | no | The original, or its incipit with `…` for what is left out. | The right-aligned Hebrew line. |
| `en` | string | **yes** | The sentence in English, phrased as one move. | The row's text. |
| `move` | move | **yes** | Ch. 9: what the sentence does. See §4.3. | Icon, colour, label, gloss, edge style, indent, folding, rails, analysis. |
| `provenance` | `sense` · `axiom` · `endoxa` · `tradition` · `derivation` · `asserted` | no | Ch. 8: where the sentence's authority comes from. The first four enter the debate already accepted; `derivation` and `asserted` start in doubt and must earn acceptance. Absent: `asserted`. | The unit's starting status, hence its verdict. On a proof, contradiction or difficulty that acts on something, the first four also draw a magenta ground badge (`ground-sense`, `ground-axiom`, `ground-common-sense`, `ground-tradition`) unless the unit already carries an explicit ch. 8 label. `derivation` and `asserted` do not auto-map. |
| `anatomy` | annotation[] | no | The anatomy layer, any number of labels. See §4.4. | The anatomy layer's chips, beads and tooltips; off by default. |
| `note` | string | no | Why the label; a doubt; where the taxonomy was stretched; a cross-reference (*returns fifty sentences later as the verse that refutes Rava*). | Nothing — documentation, and material for the checks. |
| `ext` | object | no | See §7. | Nothing. |

### 4.3 A move

Nested under `unit.move`, because the target, the marker and the attestation
all belong to the *label* — they say what the move acts on and why it was
called that — and because keeping the ch. 9 layer in one key leaves room for
the other layers beside it (§7).

| key | type | required | what it is |
|---|---|---|---|
| `element` | one of seven | **yes** | The principal element: `statement`, `question`, `answer`, `proof`, `contradiction`, `difficulty`, `resolution`. |
| `subtype` | one of the element's leaves | **yes** | The leaf. Validated against the element — `question/objection` is a fault, with the element's leaves listed. |
| `target` | string | no | The `id` of the **earlier** unit this move acts on. Absent only for a move that opens: the first statement, a fresh question, a mnemonic. An `id` that does not exist, or one that comes later in the file, is a fault. |
| `marker` | string | no | The stock phrase in the sentence that licensed the label, as it appears in the Hebrew, with `…` standing for content and `פלוני` for a name: `תא שמע`, `הכא במאי עסקינן`, `מאי שנא … ומאי שנא`, `אמר לך פלוני`. |
| `attested` | boolean | no | Whether Ramchal himself gives this label for this passage. Absent: not attested. |

How a label reads on the page is derived: `attested: true` → *attested*;
otherwise a `marker` → *marked*; otherwise *inferred*. The meta line under the
row says which, the marker prints at the row's right, and the tooltip explains
the basis.

The nineteen leaves, with the effect each has on its target when it lands:

| element / subtype | Hebrew | English | effect | p. |
|---|---|---|---|---|
| `statement/firsthand` | שמועה | first-hand knowledge | open | 162 |
| `statement/explanation` | פרוש מרוח | full explanation | open | 164 |
| `statement/forcedExplanation` | פרוש דחוק | forced explanation | unsettle | 164 |
| `statement/presumption` | אוקימתא | presumption | unsettle | 164 |
| `statement/inference` | דיוק | inference | open | 166 |
| `statement/reported` | הגדה | reported information | open | 166 |
| `question/query` | שאלה | query | open | 168 |
| `question/principle` | אבעיא | question of principle | open | 170 |
| `answer/answer` | תשובה | answer | discharge | 172 |
| `answer/determination` | פשיטות | determination | discharge | 172 |
| `proof/demonstration` | הוכחה | demonstration | raise | 174 |
| `proof/validation` | סיעתא | validation | raise | 176 |
| `contradiction/direct` | סתירה | direct contradiction | reject | 178 |
| `contradiction/opposition` | דחיה | opposition | unsettle | 178 |
| `difficulty/objection` | פרכא | objection | unsettle | 180 |
| `difficulty/apparentContradiction` | רמיא | apparent contradiction | unsettle | 182 |
| `difficulty/refutation` | תיובתא | refutation | unsettle (placeholder — undefined in the source) | 184 |
| `resolution/settlement` | ישוב | settlement | discharge | 184 |
| `resolution/alternative` | שנוי | alternative | unsettle | 186 |

`open` acts on nothing, but an opening move may still carry a `target`: an
explanation targets what it explains, a reported aside targets what it hangs
off. The target places the row; the effect decides what happens to the target.

### 4.4 An annotation (the anatomy layer)

| key | type | required | what it is |
|---|---|---|---|
| `kind` | one of a hundred and six | **yes** | The label. The full list, by family, is in §5.2. |
| `basis` | `attested` · `marked` · `inferred` | no | How the label was arrived at: Ramchal's own labelling of this passage; the type's stock word is in the text (`כל` for categorical, `אף על גב ד` for discrepancy, `מה … אף` for analogism); ours alone. Absent: `inferred`. |
| `note` | string | no | Why this label — the words that carry it, or the reading. Shown in the chip's tooltip. |

Two rules the reader enforces. A **row-level** kind (speakers, statement
anatomy, ch. 5–6, and the whole of ch. 11) describes the sentence alone and may
go on any unit. An **edge-level** kind (relations, deductions, grounds, and
both ch. 10 composites) describes the sentence's move on its `target` and is a
fault on a unit whose move has no target. A unit may carry several labels: a
`differs-in-context` relation and a `qualified-possible` form on the same
resolution is the normal case. An explicit ch. 8 label on a proof,
contradiction or difficulty suppresses the ground the page would otherwise
derive from `provenance`.

---

## 5. The vocabularies

Every closed list in the file is a constant in the code, and `npm test`
asserts the schema's enums equal them, so the three cannot drift: the reader
(`format.ts`), the schema (`sugya.schema.json`) and the vocabulary modules
(`taxonomy.ts`, `anatomy.ts`, `sugya.ts`).

### 5.1 Sugya-level

- `party`: `party-group` · `party-individual` · `party-talmud` — ch. 1.
- `collection`: `ramchal` · `research`.
- `provenance` (on units): `sense` · `axiom` · `endoxa` · `tradition` · `derivation` · `asserted` — ch. 8, pp. 112–140.
- `basis` (on annotations): `attested` · `marked` · `inferred`.

### 5.2 The hundred and six `anatomy.kind` values

*Row-level — about the sentence alone.*

| family | kinds |
|---|---|
| ch. 1 · speakers | `party-group` `party-individual` `party-talmud` |
| ch. 3 · the subject: how much of the class | `categorical` `partial` `particular` `unqualified` |
| ch. 3 · the predicate: how it attaches | `simple` `qualified-certain` `qualified-possible` `qualified-doubtful` `qualified-impossible` `exclusion` `exception` `conditional` `hypothetical` `compound` `compound-not-only` `compound-needless` `disjunction` `preclusive` `discrepancy` `comparative` `consequent` |
| ch. 4 · opposite terms | `no-middle` `has-middle` |
| ch. 5 · what a statement implies | `inference-necessary` `inference-loose` `absolute-opposite` |
| ch. 6 · not meant literally | `figurative` |
| ch. 8 · potential and actual | `potential` `actual` |
| ch. 11 · which aspect of the subject | `essence-definition` `subject-parts` `subject-quality` `subject-quantity` `subject-material` `perceptible-form` `subject-action` `subject-being-affected` `kind-species` `subject-cause` `subject-means` `subject-motive` `subject-purpose` `subject-result` `subject-attribute` `attribute-in-attached` `attribute-concurrent` `attribute-before-after` `subject-place` `subject-orientation` `subject-movement` `subject-time` `subject-relation` `subject-bearer` `subject-similarity` `subject-difference` `subject-opposition` |
| ch. 11 · in what sense one thing is prior | `priority-temporal` `priority-conceptual` `priority-natural` |

*Edge-level — about the move on `target`; a target is required.*

| family | kinds |
|---|---|
| ch. 4 · how two statements relate | `equivalent` `variant` `variant-subjects` `diametrically-opposed` `contradictory` `converse` `converse-limited` `contrapositive` `obverse` `incongruent` |
| ch. 4 · the tests that dissolve an apparent opposition | `differs-in-time` `differs-in-place` `differs-in-context` `homonym` |
| ch. 7 · deriving a conclusion | `syllogism` `classical-syllogism` `analogism` `a-fortiori` `hypothetical-syllogism` `hypothetical-syllogism-tollens` `disjunctive-syllogism` |
| ch. 7 · why a derivation fails | `fallacy-not-included` `fallacy-not-similar` `fallacy-not-greater` `fallacy-counterexample` |
| ch. 8 · what a proof or disproof stands on | `ground-axiom` `ground-sense` `ground-common-sense` `ground-tradition` `ground-deduction` `via-opposite` `dilemma` `ground-does-not-reach` `theory` |
| ch. 8 · turning a difficulty back | `rebuttal-your-reasoning` `rebuttal-just-the-opposite` `rebuttal-proves-my-point` |
| ch. 8 · objections to form | `obvious` `might-have-thought` `redundant-part` `self-contradictory` `misordered` |
| ch. 10 · a report that is also an argument | `ascribed-proof` `ascribed-difficulty` |

Definitions, stock words, pages and the number of separable intentions each
form has are in `site/src/rail/anatomy.ts`, one entry per kind; the chip labels and
tooltips on the page come from there. `variant` is same subject, two predicates;
`variant-subjects` is same predicate, two subjects. The four `ground-*` sources
of certainty that match `provenance` (`sense`, `axiom`, `endoxa`, `tradition`)
are usually derived, not written; write `ground-deduction`, `via-opposite`,
`dilemma`, `ground-does-not-reach` or `theory` when the page cannot read them
off another field.

Three distinctions the vocabulary insists on, because the same English word
names two different things. `subject-time` says *when* a sentence's subject is
at issue; `differs-in-time` says two sentences speak of different times;
`priority-temporal` says one thing is earlier than another. The same three-way
split holds for place, minus the priority. And `subject-opposition` is
chapter 11's general נגוד, a relation between things, while
`contradiction/opposition` is chapter 9's דחיה, a move one sentence makes on
another — distinct keys on purpose, however the English coincides.

---

## 6. Validation, and what a fault looks like

`parseSugya` checks the whole file and reports **every** fault at once, each
prefixed with the JSON path it sits at. It refuses, in this order of discovery:

1. Not an object; wrong `format`; a `version` it does not understand.
2. **Unknown keys**, at every level — a misspelt key would otherwise vanish
   silently, and these files are written by hand and by agents. The message
   suggests the nearest allowed key when one is within two edits.
3. Missing required keys; wrong types; empty required strings.
4. Values outside a vocabulary, with the allowed values listed (or counted,
   for the hundred and six labels) and a suggestion when one is close.
5. A `subtype` that is not a leaf of its `element`.
6. Then the structural rules, from the analysis itself: duplicate unit ids; a
   `target` that names no unit; a `target` that names a *later* unit; an
   edge-level label on a unit whose move acts on nothing; no units at all.

A bad file, and what the reader says of it:

```
bad.json: 5 faults
  $.folo: unknown key (did you mean "folio"?)
  $.folio: required
  $.units[0].colour: unknown key
  $.units[1].move.subtype: "objection" is not a subtype of "answer" (expected "answer" | "determination")
  $.units[1].anatomy[0].kind: "consequant" is not one of the 106 values allowed for "kind" (did you mean "consequent"?)
```

The same list appears on the *Open* page when a file offered there is refused.

The JSON Schema expresses the same rules as far as JSON Schema can (shape,
required keys, enums, the element→subtype pairing, `additionalProperties:
false` everywhere but `ext`). It cannot express the structural rules in item 6;
those need the reader.

---

## 7. Extending the format

The format will grow: more of Ramchal's constructs will get icons, and an
agent's richer annotation (`DERECH_TEVUNOS_FOR_AGENTS.md` §2) will want a
home. Three things are arranged so that growth is additive.

**Layers are separate keys.** A unit's ch. 9 layer is the one key `move`; its
anatomy layer is the one key `anatomy`. A new layer is a new sibling key on the
unit — `form`, `warrant`, `relation`, `axis`, `inference` are the natural
names, matching the agents' guide — and nothing existing changes. Within
`move`, likewise: a `composite` or a `reportedOf` is a new optional key.

**`ext` is the waiting room.** Any object may go in `ext`, on the sugya or on
a unit. The reader carries it through untouched and checks only that it is an
object; the page reads nothing from it; `toJson` writes it back. Put data
there before it has a renderer:

```json
"ext": { "warrant": { "kind": "a-fortiori", "premises": ["…"] } }
```

When a key in `ext` earns a renderer, it moves out of `ext` into the schema,
the reader learns its shape, the check suite gets a case, and `version` steps
if any existing file would read differently. A key is *never* added loosely at
the top level: outside `ext`, unknown is a fault, on purpose.

**Vocabularies are lists in one place.** Adding an anatomy kind is one entry
in `ENTRIES` in `anatomy.ts` (its family, level, words, definition, glyph) plus
its name in the schema's enum; the test that the two lists agree fails until
both are done. A new leaf of ch. 9 is one entry in `LEAVES` in `taxonomy.ts`
plus the schema's `allOf` branch for its element.

**To add a construct end to end:**

1. Decide its layer: a property of the sentence alone (row), of the move on its
   target (edge), or of the passage. Row and edge kinds join `anatomy`; a
   structured layer becomes a new key.
2. Give it a stable kebab-case key. Prefer the guide's key if the guide has one.
3. `anatomy.ts` / `taxonomy.ts`: the entry — definition, stock word, page.
4. `sugya.schema.json`: the enum or the new property.
5. `format.ts`: for a new key, read it in `readUnit`/`parseSugya` and write it
   in `unitJson`/`toJson`, in canonical position.
6. `check.ts`: one accepted case, one refused case.
7. Then the renderer.

### The agents' guide (§2) and this format

The guide's §2 record is what a classifier emits; this file is what the page
reads. They agree where they overlap and this table says how the rest maps.

| §2 field | here | note |
|---|---|---|
| `id`, `he`, `en`, `speaker`, `note` | the same keys on the unit | |
| `party` (per record) | `party` on the **sugya** | Ch. 1 is a judgment about the passage. |
| `move.element`, `move.subtype`, `move.marker` | the same keys under `move` | |
| `move.target: string[]` | `move.target: string` | The page draws one edge per move. A second target has no home yet; put it in `ext` or split the unit. |
| `move.basis` | derived from `move.attested` + `move.marker` | `attested` → `attested: true`; `marked` → give the `marker`; `inferred` → neither. `supplied` (a label from a `[supplied]` definition) has no counterpart — say so in `note`, or carry it in `ext`. |
| `form.quantity` | `anatomy[].kind` ∈ `categorical` `partial` `particular` `unqualified` | |
| `form.type` | `anatomy[].kind` ∈ the eleven predication kinds | |
| `form.literal: false` | `anatomy[].kind: "figurative"` | |
| `relation.kind`, `relation.dissolvedBy` | `anatomy[].kind` ∈ relations / tests, on the unit whose move targets `relation.to` | `converse-complete` in the guide is `converse` here. The guide's one `variant` is two kinds here: `variant` (predicates change) and `variant-subjects` (subjects change). |
| `warrant.kind` (a syllogism) | `anatomy[].kind` ∈ deductions | |
| `warrant.defeat` | `anatomy[].kind` ∈ `fallacy-*` | Including `fallacy-not-included`, the inclusion failure of a classical syllogism. |
| `warrant.kind: "proof/indirect"` | `anatomy[].kind: "via-opposite"` | Keep the warrant kind in `ext` when premises are recorded; the icon is the anatomy label. |
| `warrant.kind: "disproof/dilemma"` | `anatomy[].kind: "dilemma"` | Same: icon here, premises still in `ext`. |
| `warrant.kind: "rebuttal/irrelevant"` | `anatomy[].kind: "ground-does-not-reach"` | The other four `rebuttal/*` kinds have no icon yet. |
| `warrant.kind: "sevara"` | `anatomy[].kind: "theory"` | The reducer still treats a validation as a full `raise`; say so in `note`. |
| `inference.necessary` | `anatomy[].kind` ∈ `inference-necessary` / `inference-loose` | |
| `form.normalized`, `form.subject`, `form.predicate`, `form.parts`, `warrant.premises`, `warrant.aspect`, `warrant.modality`, `axis`, `move.composite`, `move.reportedOf`, remaining source/rebuttal/style kinds | **no renderer yet** — `ext` | These are the layers that will become new sibling keys when they get icons. |

---

## 8. Canonical form

`stringify(sugya)` writes a file in one fixed key order (the order of the
tables above), with nothing undefined, two-space indentation, and a record or
list of scalars on one line when it fits in 140 columns — so a `move` reads as
one line and a preface as one paragraph per line. A shipped file is required to
be canonical: `npm test` parses each and prints it back and asserts the text is
unchanged. A hand-edited file need not be; the runtime reader does not care
about order or whitespace, only shape.

---

## 9. Conventions for writing one

Not enforced by the reader; how the shipped files are written.

- **One unit is one move.** Where Steinsaltz's segment holds two moves, split
  it; where one move runs across segments, merge. Abridge `en` so it reads as
  the move, not the commentary.
- **`target` is the shorter reach** when a move could be read as acting on two
  earlier units.
- **`speaker`** is given when the sentence names one, including *Mishnah* for a
  mishnah and a verse's citation for a verse. A nameless stam sentence, and an
  `אמר לך פלוני` put in someone's mouth by the Gemara, carry none.
- **`marker`** is a signpost of the *move*, not of its content — `תא שמע`,
  `אלא`, `הכא במאי עסקינן`, `מאי שנא … ומאי שנא` — generalised with `…` and
  `פלוני`. A phrase that only happens to occur in the sentence is not a marker.
  The lexicon is `site/src/rail/markers.ts`.
- **`attested`** is `true` only where Ramchal labels *this* sentence of *this*
  passage. Say `attested: false` explicitly on a passage he discusses when one
  unit's label is yours, and explain in `note`.
- **`provenance`** is `tradition` for a mishnah, baraita or verse brought as
  evidence; `derivation` for a resolution or inference; `asserted` for a
  rabbi's ruling.
- **`short`** is worth writing by hand on any passage long enough to fold; it
  is what the reader sees on a band while the sentences under it are hidden.
- **`about`** should say where the text is from, what the passage shows, and
  every place a label is a stretch.

---

## 10. Where things are

| | |
|---|---|
| `site/src/rail/format.ts` | `parseSugya`, `SugyaFormatError`, `toJson`, `stringify`, the `*Json` types |
| `site/src/rail/sugyot/sugya.schema.json` | JSON Schema 2020-12 |
| `site/src/rail/sugyot/*.json` | the eleven shipped passages |
| `site/src/rail/sugyot/index.ts` | loads them: `SUGYOT`, `sugyaById`, `ofCollection` |
| `site/src/rail/app/sugyot.ts` | `useSugyot` is the shipped lattice; `useOpened` / `openSugya` are the loader page's session |
| `site/src/rail/app/pages/OpenPage.tsx` | the loader page: drop, pick or paste a file; the faults, or the passage drawn |
| `site/src/rail/app/markup.tsx` | `renderMarkup` — the `hint` markup |
| `site/src/rail/fixtures/*.ts` | the same passages as TypeScript, the oracle the JSON is checked against |
| `site/src/rail/check.ts` → *The file format* | the checks: equivalence per passage, the reader's refusals, schema ↔ code |
