# Derech Tevunos → sugya JSON

**Ramchal's system for annotating dialectical text, and the file format it is written into. One guide, for agents.**

**What this is.** A self-contained reference for an agent whose job is to take a passage — Talmudic or otherwise — segment it, normalize each utterance, classify what it *is*, what it *does*, how it is *warranted*, and along which *distinction* it turns (the system of *Derech Tevunos*, R. Moshe Chaim Luzzatto, *The Ways of Reason*), and then write the result as a **sugya file**: format `derech-tevunos/sugya`, version `1`, the JSON the visualization reads. It supersedes the two documents it consolidates, `DERECH_TEVUNOS_FOR_AGENTS.md` (the system) and `SUGYA_JSON_FORMAT.md` (the file), and carries everything in both.

**The one fact to hold in mind throughout.** The file format is younger than the system. Every one of Ramchal's constructs has a key in this guide, but only some of them have a home in the file today: the nineteen moves, the six provenances, the three parties, and sixty-four "anatomy" labels (the forms of a statement, the relations between two, the kinds of derivation and their failures, and what a proof or disproof stands on). The rest — the normalized subject and predicate, the premises of a proof, the remaining rebuttal and style kinds, aspects, modality, the twenty-four axes, composites — are **pending**: they are written into the file's `ext` bag under the field names given here, are carried through untouched, and will move into the schema proper as each earns a renderer. §4 is the complete inventory of what is present and what is pending; every construct's own entry in Part II says which it is and shows the JSON either way.

**Conventions.**
- `key` — stable ASCII id. The keys in §7 (the card) and §3 (the vocabularies) are the complete vocabulary; emit them exactly as written.
- `p`, `src ·` — page in the bilingual printed edition (English side; the Hebrew facing page is one less). Provenance only — nothing in this guide requires consulting it.
- Hebrew terms are unpointed, in common Talmud-study spelling. Recognizer phrases are in the form they appear in the Gemara.
- `he ·` Ramchal's own formulation, where it is short and sharper than paraphrase. `means ·` operational definition. `test ·` discriminating test against the nearest neighbors. `markers ·` stock phrases that announce the type. `ex ·` `cite — original — gloss`. `file ·` where the construct lives in the JSON.
- `[supplied]` marks a definition, recognizer, or effect the book implies or omits and this guide fills in, in Ramchal's style. `[constructed]` marks an example sentence written for illustration rather than quoted. Weight confidence accordingly.
- JSON examples are **valid fragments of a file**: a whole file, a unit, a list of units, a `move`, or a list of `anatomy` labels. A unit whose `move.target` names an id not shown is acting on an earlier unit left out for brevity. Nothing in a JSON block is commentary; commentary is in the surrounding prose or in `note` fields.

**How to load.** §1–§4 suffice to write a valid file with the enums. §7 (the card) suffices to label. Part II (§8–§13) gives every construct with its tests and at least two JSON examples, and the status reducer as implemented; Part III (§14–§18) the procedure and four worked files — Shabbos 5b from the book, Berachos 20b, Berachos 2b, and a non-Talmudic dialogue; Part IV (§19–§21) the gaps, aliases, calibration set and the pre-ship checklist. Every JSON block in this guide has been run through the file's own validator (`parseSugya`) and, for the whole files, the reducer.

**Five layers, kept apart.** A sentence is annotated on independent layers; a label on one never implies a label on another.

| Layer | Question | Source | In the file | § |
|---|---|---|---|---|
| A · Move | What does this utterance *do* to an earlier one? | Ch 1, 2, 9, 10 | `move` — present | 8 |
| B · Form | What proposition *is* it, once normalized? | Ch 3, 5, 6 | `anatomy` row-level kinds — present; subject/predicate/parts — pending, `ext.form` | 9 |
| C · Relation | How do two propositions stand to each other? | Ch 4 | `anatomy` edge-level kinds — present | 10 |
| D · Warrant | How is a proof or disproof *supposed to work*, and does it? | Ch 7, 8 | `anatomy` deduction kinds and `provenance` — present; premises, rebuttals, style, aspect, modality — pending, `ext.warrant` | 11 |
| E · Axis | Along which distinction is a subject examined or split? | Ch 11 | pending, `ext.axis` | 12 |

---

# Part I · The file

## §1 · What a file is

A file is a **sugya**: a passage's metadata, then its **units** — the sentences in the order they are said. A unit carries the sentence in Hebrew and English, who says it, the **move** it makes (Layer A: what the sentence *does* to an earlier one), where its authority comes from (`provenance`), and, as a separate layer, its **anatomy** (Layers B, C, D: what the sentence *is*, how it stands to the one it acts on, and how it derives). Whatever has no home yet goes in `ext`.

Everything else on the page is **derived** and is *not* in the file: depth (from the chain of targets), standing and status (from the moves that land on a unit — §13), the verdict pill, the movements a passage divides into, the folds, the bands, the rails, the handles, whether a label reads *attested*, *marked* or *inferred*, and the *Talmud itself* badge on a sentence with no speaker. If two files have the same units they draw the same page. Do not emit status or standing.

The smallest complete file, exactly as shipped (`site/src/rail/sugyot/yebamos-deafmute.json`) — Ramchal's own illustration of שאלה and תשובה:

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

The only required keys are `format`, `version`, `id`, `title`, `tractate`, `folio`, `discussedAt` and `units`; within a unit, `id`, `en` and `move`; within a move, `element` and `subtype`. A file can be as bare as that:

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

Everything the page can show beyond the lattice itself — speakers, Hebrew, markers, the anatomy badges, the editor's preface — is opt-in per unit. Everything the system knows beyond what the page shows goes in `ext` (§4).

---

## §2 · Field by field

### 2.1 The sugya

| key | type | required | what it is | what the page does with it |
|---|---|---|---|---|
| `$schema` | string | no | Path or URL of the JSON Schema, for editors. Shipped files say `"./sugya.schema.json"`. | Nothing. |
| `format` | `"derech-tevunos/sugya"` | **yes** | What kind of file this is. | Refused if anything else. |
| `version` | `1` | **yes** | The format version this file was written to. | Refused if the reader does not understand it. |
| `id` | string | **yes** | Stable and URL-safe: lower-case letters, digits, hyphens (`^[a-z0-9][a-z0-9-]*$`). | The route `#/sugya/<id>` on the lattice; `#/open/<id>` on the loader page. |
| `title` | string | **yes** | What the passage is about, in a few words. | Gallery card, tab, header. |
| `tractate` | string | **yes** | e.g. `"Bava Metzia"`. For a non-Talmudic text, the work or corpus (`"Blackstone, Commentaries"`, `"Moot court transcript"`). | Gallery card, tab, header, SVG export. |
| `folio` | string | **yes** | e.g. `"21b-22b"`. Free text — `"16a / 18b (Eng. col. 17b)"` records a disagreement between columns; for a non-Talmudic text a chapter, section or page. | Same places as `tractate`. |
| `discussedAt` | string | **yes** | Where Ramchal discusses the passage; or, for one he does not, the sentence that says so and how it was labelled instead (`"Not discussed in Derech Tevunos; labelled from the markers of ch. 9"`). | The header's citation line and the SVG export. |
| `party` | `party-group` · `party-individual` · `party-talmud` | no | Ch. 1: what kind of sugya this is as a whole — named rabbis in dispute, one person arguing both sides, or the Talmud's own voice. A judgment about the passage, so declared rather than derived from the speakers. | The *Speakers* lens of the anatomy layer. |
| `collection` | `ramchal` · `research` | no | Which shelf of the gallery. `ramchal`: discussed in the book, or labelled from its markers. `research`: brought in for the nested-rail study. An agent-made file normally omits it. | Gallery grouping and its lead text. Absent: shown under *Other passages*. |
| `about` | string[] | no | The editor's preface, one paragraph per entry: why the passage is here, how it was labelled, where the taxonomy was stretched, which edition the text is from. | Nothing — it is for the person who opens the file. |
| `hint` | string | no | Where to look on this page. Replaces the header's standard copy. `**bold**` and `*italic*` are the only markup; no nesting, no escapes. | The header's hint line. |
| `units` | unit[] | **yes** | The sentences, in order. At least one. | Everything. |
| `ext` | object | no | Room for what the format does not yet name. See §4. | Nothing. |

Two sugya headers, one Talmudic and one not:

```json
{
  "format": "derech-tevunos/sugya",
  "version": 1,
  "id": "berachos-20b-kiddush",
  "title": "Women are obligated in kiddush",
  "tractate": "Berachos",
  "folio": "20b",
  "discussedAt": "Not discussed in Derech Tevunos; labelled from the markers of ch. 9 and the structural tests",
  "party": "party-group",
  "about": [
    "Rav Adda bar Ahavah's ruling, the objection from the rule of time-bound commandments, Abaye's failed rescue, and Rava's derivation from זכור and שמור.",
    "Text: Vilna edition. English is abridged so each unit reads as one move."
  ],
  "units": [
    { "id": "ruling", "en": "Women are obligated in the sanctification of the day by Torah law.", "move": { "element": "statement", "subtype": "firsthand" } }
  ]
}
```

```json
{
  "format": "derech-tevunos/sugya",
  "version": 1,
  "id": "consideration-dialogue",
  "title": "Do all contracts require consideration?",
  "tractate": "Moot dialogue",
  "folio": "Exchange 1",
  "discussedAt": "Not Talmudic; labelled by the structural tests alone (Part II, every `test ·` line), no Aramaic markers",
  "party": "party-group",
  "units": [
    { "id": "rule", "speaker": "A", "en": "All contracts require consideration.", "move": { "element": "statement", "subtype": "firsthand" } }
  ]
}
```

### 2.2 A unit

| key | type | required | what it is | what the page does with it |
|---|---|---|---|---|
| `id` | string | **yes** | Unique within the file. Later units name it in `move.target`. Short mnemonic ids (`abaye`, `t1-ask`, `t1-ans`) read well in fault messages and in the URL; ordinals (`"1"`, `"2"`) are also valid. | Row identity, `data-id`, handles. The `?at=` deep link is by position, not id. |
| `speaker` | string | no | Who says it, when the sentence names someone: a rabbi, *Mishnah*, *The Gemara*, a verse's citation (*Genesis 28:15*), a party in a dialogue (*A*). Free text. Absent: the sentence is the Talmud's own voice. | Printed on the row. When absent, the *Speakers* lens shows *the Talmud itself* in its place. |
| `short` | string | no | A few words naming the sentence — a caption, not a label from the taxonomy. | Band summaries (*7 sentences folded · …*), movement headings, the slider's label, the state-of-play strip. Falls back to the first 48 characters of `en`. |
| `he` | string | no | The original, or its incipit with `…` for what is left out. | The right-aligned Hebrew line. |
| `en` | string | **yes** | The sentence in English, phrased as one move. For a Hebrew source this is the agent's gloss; for an English source, the text itself. | The row's text. |
| `move` | move | **yes** | Layer A: what the sentence does. §2.3. | Icon, colour, label, gloss, edge style, indent, folding, rails, analysis. |
| `provenance` | `sense` · `axiom` · `endoxa` · `tradition` · `derivation` · `asserted` | no | Ch. 8: where *this sentence's own* authority comes from. The first four enter the debate already accepted; `derivation` and `asserted` start in doubt and must earn acceptance. Absent: `asserted`. Fill it whenever known. | The unit's starting status, hence its verdict. Not printed. |
| `anatomy` | annotation[] | no | Layers B, C, D as labels: any number. §2.4. | The anatomy layer's chips, beads and tooltips; off by default. |
| `note` | string | no | Why the label; a doubt; where the taxonomy was stretched; a retraction; a cross-reference (*returns fifty sentences later as the verse that refutes Rava*). | Nothing — documentation, and material for the checks. |
| `ext` | object | no | The pending layers. §4. | Nothing. |

Three units showing the range: a bare one, a full one, and one with `ext`.

```json
[
  {
    "id": "fear",
    "speaker": "Genesis 32:8",
    "he": "ויירא יעקב מאד",
    "en": "And Yaakov was very much afraid.",
    "move": { "element": "statement", "subtype": "firsthand", "attested": true },
    "provenance": "tradition",
    "anatomy": [{ "kind": "particular" }]
  },
  {
    "id": "t11-ask",
    "short": "dew on the produce",
    "he": "תא שמע: עודהו הטל עליהן ושמח — הרי זה בכי יותן. נגבו, אף על פי ששמח — אינן בכי יותן. טעמא מאי? לאו משום דלא אמרינן כיון דאיגלאי מילתא דהשתא ניחא ליה, מעיקרא נמי ניחא ליה?",
    "en": "Come and hear: if the dew is still on the produce and he was glad, it is within \"when water is placed\"; if it had dried, even though he was glad, it is not. Is the reason not that we do not say, since he is content now he was content from the start?",
    "move": { "element": "difficulty", "subtype": "objection", "target": "rava", "marker": "תא שמע", "attested": false },
    "provenance": "tradition",
    "anatomy": [
      { "kind": "contradictory" },
      { "kind": "discrepancy", "basis": "marked", "note": "`אף על פי ששמח`: the mishnah's own second clause is a discrepancy statement, in Ramchal's exact stock word." }
    ]
  },
  {
    "id": "irrelevant",
    "speaker": "The Gemara",
    "he": "אחיו הוא במצוות",
    "en": "A Canaanite slave is his brother in the commandments, so the verse's \"his brother\" does not exclude him.",
    "move": { "element": "contradiction", "subtype": "opposition", "target": "proof-from-brother" },
    "provenance": "tradition",
    "note": "A rebuttal: the verse adduced does not bear on this claim. The rebuttal kind has no anatomy label yet, so it sits in ext.warrant.",
    "ext": {
      "warrant": {
        "kind": "rebuttal/irrelevant",
        "premises": [{ "text": "אחיו הוא במצוות — a Canaanite slave is a brother in commandments", "provenance": "tradition" }]
      }
    }
  }
]
```

### 2.3 A move

Nested under `unit.move`, because the target, the marker and the attestation all belong to the *label* — they say what the move acts on and why it was called that — and because keeping Layer A in one key leaves room for the other layers beside it.

| key | type | required | what it is |
|---|---|---|---|
| `element` | one of seven | **yes** | The principal element: `statement`, `question`, `answer`, `proof`, `contradiction`, `difficulty`, `resolution`. |
| `subtype` | one of the element's leaves | **yes** | The leaf. Validated against the element — `question/objection` is a fault, with the element's leaves listed. |
| `target` | string | no | The `id` of the **earlier** unit this move acts on. Absent only for a move that opens: the first statement, a fresh question, a mnemonic. An `id` that does not exist, or one that comes later in the file, is a fault. One target only; a second goes in `ext.move.targets` (§4). |
| `marker` | string | no | The stock phrase in the sentence that licensed the label, as it appears in the Hebrew, with `…` standing for content and `פלוני` for a name: `תא שמע`, `הכא במאי עסקינן`, `מאי שנא … ומאי שנא`, `אמר לך פלוני`. |
| `attested` | boolean | no | Whether **Ramchal himself** gives this label for this sentence of this passage. Absent: not attested. |

How a label's basis reads on the page is derived: `attested: true` → *attested*; otherwise a `marker` → *marked*; otherwise *inferred*. The meta line under the row says which, the marker prints at the row's right, and the tooltip explains the basis.

Two moves that open, two that act:

```json
{ "element": "statement", "subtype": "firsthand" }
```

```json
{ "element": "question", "subtype": "principle", "marker": "איבעיא להו" }
```

```json
{ "element": "difficulty", "subtype": "apparentContradiction", "target": "promise", "marker": "… רמי, כתיב … וכתיב", "attested": true }
```

```json
{ "element": "resolution", "subtype": "settlement", "target": "t9-ask", "marker": "הכא במאי עסקינן", "attested": false }
```

`open` acts on nothing, but an opening move may still carry a `target`: an explanation targets what it explains, a reported aside targets what it hangs off, the second opinion in a Mishnah dispute targets the first so that the relation between them can be labelled. The target places the row; the effect decides what happens to the target.

**`attested` reconciled.** The older agents' guide used `basis: attested` for "the text names the move itself" (`תיובתא`, `והלכתא`, `אמרו דבר אחד`). The file's `attested` is narrower: only Ramchal's own labelling of this sentence. When the *Talmud* names the move, record the naming phrase as the `marker` (the page then reads *marked*) and say in `note` that the text names the move. When the older guide's `basis: supplied` applies — a `[supplied]` category was used — the file has no counterpart: write `ext.move.basis: "supplied"` and say so in `note`.

### 2.4 An annotation (Layers B, C, D as labels)

| key | type | required | what it is |
|---|---|---|---|
| `kind` | one of sixty-four | **yes** | The label. The full list, by family and level, is §3.3. |
| `basis` | `attested` · `marked` · `inferred` | no | How the label was arrived at: Ramchal's own labelling of this passage; the type's stock word is in the text (`כל` for categorical, `אף על גב ד` for discrepancy, `מה … אף` for analogism); ours alone. Absent: `inferred`. |
| `note` | string | no | Why this label — the words that carry it, or the reading. Shown in the chip's tooltip. |

Two rules the reader enforces. A **row-level** kind (speakers, statement anatomy, opposite terms, inference, figurative) describes the sentence alone and may go on any unit. An **edge-level** kind (relations, opposition tests, deductions, fallacies) describes the sentence's move on its `target` and is a fault on a unit whose move has no target. A unit may carry several labels: a `differs-in-context` relation and a `qualified-possible` form on the same resolution is the normal case.

```json
[
  { "kind": "categorical", "basis": "marked", "note": "`כל עקר`: no uncleanness for liquids at all — the whole class, denied." },
  { "kind": "hypothetical-syllogism-tollens", "note": "If liquids could become unclean by Torah law, the Temple liquids would be unclean; Yosi ben Yo'ezer testified they are clean; so they cannot." }
]
```

```json
[
  { "kind": "differs-in-context", "note": "The promise holds in the respect of merit; the fear is about sin having intervened. Not the same respect, so no clash." },
  { "kind": "qualified-possible", "note": "`שמא`: said as possible, not as certain." }
]
```

```json
[
  { "kind": "analogism", "basis": "marked", "note": "`מה … אף`: what holds of `יתן` holds of `יותן`." },
  { "kind": "comparative", "basis": "marked" }
]
```

---

## §3 · The closed vocabularies

Every closed list in the file is a constant in the code, and `npm test` asserts the schema's enums equal them, so the three cannot drift: the reader (`site/src/rail/format.ts`), the schema (`site/src/rail/sugyot/sugya.schema.json`) and the vocabulary modules (`taxonomy.ts`, `anatomy.ts`, `sugya.ts`).

### 3.1 Sugya-level and unit-level enums

- `party`: `party-group` · `party-individual` · `party-talmud` — ch. 1.
- `collection`: `ramchal` · `research`.
- `provenance` (on units): `sense` · `axiom` · `endoxa` · `tradition` · `derivation` · `asserted` — ch. 8, pp. 112–140. `asserted` is the file's addition to Ramchal's five: a claim made on the speaker's own authority, the default.
- `basis` (on annotations): `attested` · `marked` · `inferred`.

### 3.2 The nineteen leaves of `move`, with the effect each has on its target when it lands

| element / subtype | Hebrew | English | effect | p. |
|---|---|---|---|---|
| `statement/firsthand` | שמועה | first-hand knowledge | open | 162 |
| `statement/explanation` | פירוש מרווח | full explanation | open | 164 |
| `statement/forcedExplanation` | פירוש דחוק | forced explanation | unsettle | 164 |
| `statement/presumption` | אוקימתא | presumption | unsettle | 164 |
| `statement/inference` | דיוק | inference | open | 166 |
| `statement/reported` | הגדה | reported information | open | 166 |
| `question/query` | שאלה | query | open | 168 |
| `question/principle` | איבעיא | question of principle | open | 170 |
| `answer/answer` | תשובה | answer | discharge | 172 |
| `answer/determination` | פשיטות | determination | discharge | 172 |
| `proof/demonstration` | הוכחה | demonstration | raise | 174 |
| `proof/validation` | סייעתא | validation | raise | 176 |
| `contradiction/direct` | סתירה | direct contradiction | reject | 178 |
| `contradiction/opposition` | דחיה | opposition | unsettle | 178 |
| `difficulty/objection` | פירכא | objection | unsettle | 180 |
| `difficulty/apparentContradiction` | רומיא | apparent contradiction | unsettle | 182 |
| `difficulty/refutation` | תיובתא | refutation | **unsettle in the file (placeholder — undefined in the source); the system reads it as reject `[supplied]`** — see §8, תיובתא, and §13 | 184 |
| `resolution/settlement` | יישוב | settlement | discharge | 184 |
| `resolution/alternative` | שינוי | alternative | unsettle | 186 |

Effects for the four adjudicating elements are fixed by the text. Ramchal pins the resolution pair at Heb p185: a שינוי "is truly a דחיה, except that a דחיה falls on a statement or a proof and a שינוי falls on a difficulty" — so it weakens where a יישוב closes. Effects on the `statement` subtypes are a reading, not a quotation: Ramchal treats a forced explanation and an אוקימתא as costs paid to keep a statement standing, so both are recorded as weakening it.

### 3.3 The sixty-four `anatomy.kind` values

*Row-level — about the sentence alone; may go on any unit.*

| family | chapter | kinds |
|---|---|---|
| speakers | ch. 1 | `party-group` `party-individual` `party-talmud` |
| the subject: how much of the class | ch. 3 | `categorical` `partial` `particular` `unqualified` |
| the predicate: how it attaches | ch. 3 | `simple` `qualified-certain` `qualified-possible` `qualified-doubtful` `qualified-impossible` `exclusion` `exception` `conditional` `hypothetical` `compound` `compound-not-only` `compound-needless` `disjunction` `preclusive` `discrepancy` `comparative` `consequent` |
| opposite terms | ch. 4 | `no-middle` `has-middle` |
| what a statement implies | ch. 5 | `inference-necessary` `inference-loose` `absolute-opposite` |
| not meant literally | ch. 6 | `figurative` |

*Edge-level — about the move on `target`; a target is required.*

| family | chapter | kinds |
|---|---|---|
| how two statements relate | ch. 4 | `equivalent` `variant` `variant-subjects` `diametrically-opposed` `contradictory` `converse` `converse-limited` `contrapositive` `obverse` `incongruent` |
| the tests that dissolve an apparent opposition | ch. 4 | `differs-in-time` `differs-in-place` `differs-in-context` `homonym` |
| deriving a conclusion | ch. 7 | `syllogism` `classical-syllogism` `analogism` `a-fortiori` `hypothetical-syllogism` `hypothetical-syllogism-tollens` `disjunctive-syllogism` |
| why a derivation fails | ch. 7 | `fallacy-not-included` `fallacy-not-similar` `fallacy-not-greater` `fallacy-counterexample` |
| what a proof or disproof stands on | ch. 8 | `ground-axiom` `ground-sense` `ground-common-sense` `ground-tradition` `ground-deduction` `via-opposite` `dilemma` `ground-does-not-reach` `theory` |

Definitions, stock words, pages and the number of separable intentions each form has are in `site/src/rail/anatomy.ts`, one entry per kind; the chip labels and tooltips on the page come from there. Three names differ from the older agents' guide: the guide's `converse-complete` is `converse` here; the guide's `infer/opposite` on a partial statement is `absolute-opposite` here; and `syllogism` (a derivation that fits no more specific kind) exists only here. The guide's one `variant` is two kinds here (`variant` / `variant-subjects`). Four warrant keys have icons under different names: `proof/indirect` is `via-opposite`, `disproof/dilemma` is `dilemma`, `rebuttal/irrelevant` is `ground-does-not-reach`, `sevara` is `theory`. The four sources of certainty that match `provenance` are usually derived, not written.

---

## §4 · Coverage — what is present, what is pending, and the `ext` convention

The system has more constructs than the file has homes. This section is the inventory. **Present** means a key or enum value in the schema, validated and rendered. **Partial** means the construct is expressible with what exists, with the stated loss. **Pending** means no home yet: write it into `ext` under the path given, exactly as shaped here, so that when it graduates the move out of `ext` is a rename and not a rewrite.

### 4.1 Inventory

| Layer | Construct | Status | Where |
|---|---|---|---|
| A | The seven elements, nineteen leaves | present | `move.element`, `move.subtype` |
| A | Effect of a landed move | derived | never emitted |
| A | Target of a move | present (one) | `move.target` — a second or third target: pending, `ext.move.targets` (all of them, primary first) |
| A | Stock phrase that licensed the label | present | `move.marker` |
| A | Basis attested / marked / inferred | present (derived) | `move.attested` + `move.marker` |
| A | Basis `supplied` | pending | `ext.move.basis: "supplied"` and a `note` |
| A | Party — group / individual / talmud | present | `party` on the sugya (the passage as a whole); `anatomy[].kind` ∈ `party-*` on a unit whose exchange differs from the whole |
| A | Composites — ascribed proof, ascribed difficulty | pending | `ext.move.composite` |
| A | Whose view a report reports | pending | `ext.move.reportedOf` |
| B | Subject, predicate, normalized proposition, parts | pending | `ext.form.subject`, `.predicate`, `.normalized`, `.parts` |
| B | Quantity of the subject (4) | present | `anatomy[].kind` |
| B | Manner of predication (11 manners → 17 kinds) | present | `anatomy[].kind` |
| B | Literal vs figurative | present | `anatomy[].kind: "figurative"` (literal is the default, no label) |
| B | Elucidation (ביאור) of another unit | pending | `ext.form.elucidationOf` |
| B | Inference necessary / loose | present | `anatomy[].kind` ∈ `inference-necessary` `inference-loose` |
| B | The five necessary-inference kinds `infer/*` | partial | `absolute-opposite` (= `infer/opposite` from a partial) is a row kind; a conversion can be labelled with the edge kinds `converse` `converse-limited` `contrapositive` when the דיוק unit targets its source; the full record: pending, `ext.inference` |
| C | The ten relations | present | `anatomy[].kind`, edge-level, on the unit whose move targets the other — `variant` is predicates change; `variant-subjects` is subjects change |
| C | The parent `opposite` | not a kind | use `diametrically-opposed` or `contradictory` |
| C | The four dissolving tests | present | `anatomy[].kind`, edge-level |
| C | `figurative` as a dissolving test | partial | the row kind `figurative` on the figurative unit; `ext.relation.dissolvedBy: "figurative"` |
| C | Opposite terms no-middle / has-middle | present | `anatomy[].kind`, row-level |
| C | Relation to a unit other than the target | pending | `ext.relation: { to, kind, dissolvedBy }` |
| D | Propagation, premise, conclusion, derivation (terms) | conceptual | — |
| D | The syllogism kinds (6) and the generic `syllogism` | present | `anatomy[].kind`, edge-level |
| D | The four defeats | present | `anatomy[].kind`, edge-level — `fallacy-not-included` is the inclusion failure of a classical syllogism |
| D | Chapter 8's nine grounds | present | `anatomy[].kind`, edge-level, magenta; four of them usually derived from `provenance` |
| D | Status accepted / rejected / doubt | derived | never emitted |
| D | Provenance of a unit's own authority (5 + `asserted`) | present | `provenance` — on a proof, contradiction or difficulty, `sense` / `axiom` / `endoxa` / `tradition` also draw the matching magenta ground badge |
| D | Provenance of each premise | pending | `ext.warrant.premises[].provenance` |
| D | The premises themselves | pending | `ext.warrant.premises` |
| D | Proof from nature / convention / syllogism | partial | `provenance` on the proof unit says which; a `proof/*` unit carries it |
| D | `proof/indirect` | partial | icon `via-opposite` in `anatomy`; keep `ext.warrant.kind` when premises are recorded; the machinery (usually a tollens) stays in `anatomy` |
| D | `disproof/indirect`, `disproof/reductio` | pending | `ext.warrant.kind` (reductio may also carry `hypothetical-syllogism-tollens`) |
| D | `disproof/dilemma` | partial | icon `dilemma` in `anatomy`; keep `ext.warrant.kind` when premises are recorded; may also carry `disjunctive-syllogism` |
| D | `rebuttal/irrelevant` | partial | icon `ground-does-not-reach` in `anatomy`; keep `ext.warrant.kind` when premises are recorded |
| D | The other four `rebuttal/*` kinds | pending | `ext.warrant.kind` |
| D | סברא | partial | icon `theory` in `anatomy`; keep `ext.warrant.kind: "sevara"`; the reducer still treats a validation as a full `raise` |
| D | The four aspects | pending | `ext.warrant.aspect` |
| D | Modality potential / actual | pending | `ext.warrant.modality` |
| D | The six `style/*` objection kinds | pending | `ext.warrant.kind` on a `difficulty/objection` |
| E | The twenty-four axes | pending | `ext.axis` (a list of `axis/*` keys) |
| E | Priority temporal / rank / natural | pending | `ext.priority` |
| — | Order, definition, division (Ramchal's rules for presenting) | guidance | shape `about`, `short`, and how units are split |

### 4.2 The `ext` convention

`ext` may sit on the sugya or on any unit. The reader checks only that it is an object; the page reads nothing from it; `toJson` writes it back. Inside it, use the field names of the older guide's §2 record, because those are the names the format will adopt (`SUGYA_JSON_FORMAT.md` §7 named `form`, `warrant`, `relation`, `axis`, `inference` as "the natural names"). The complete shape:

```json
{
  "form": {
    "normalized": "S has P, in manner M — in plain words, either language",
    "subject": "S",
    "predicate": "P",
    "parts": ["for exception, conditional, hypothetical, compound, consequent: the parts, in order"],
    "elucidationOf": "id of the unit this unit restates without adding"
  },
  "move": {
    "targets": ["primary-id", "second-id"],
    "basis": "supplied",
    "composite": "ascribed-proof",
    "reportedOf": "whose view is reported"
  },
  "warrant": {
    "kind": "rebuttal/irrelevant",
    "premises": [{ "text": "a premise", "provenance": "tradition", "id": "unit-id-if-the-premise-is-a-unit" }],
    "aspect": "aspect/relation",
    "modality": "actual",
    "defeat": "fallacy-not-similar"
  },
  "relation": { "to": "other-id", "kind": "diametrically-opposed", "dissolvedBy": "figurative" },
  "axis": ["axis/time", "axis/place"],
  "inference": { "of": "source-id", "kind": "infer/contrapositive", "necessary": true },
  "priority": "priority/temporal"
}
```

Rules:

1. **What has a home goes in its home, and is not repeated in `ext`.** A `categorical` form goes in `anatomy`, not in `ext.form`. An `a-fortiori` goes in `anatomy`, not in `ext.warrant.kind`. `ext.warrant.kind` is written only for a kind the anatomy vocabulary lacks, or to keep the classifier key beside premises when the icon has a different name (`via-opposite` / `proof/indirect`, `dilemma` / `disproof/dilemma`, `ground-does-not-reach` / `rebuttal/irrelevant`, `theory` / `sevara`). The remaining `rebuttal/*`, `style/*`, `disproof/indirect`, `disproof/reductio`, and a bare source kind still live only in `ext`. `ext.warrant.defeat` likewise only when the defeat cannot be an edge label (the unit has no target). The one deliberate repetition is `ext.move.targets`, which lists **every** target, primary first — so that `move.target` and `ext.move.targets[0]` agree and graduation to a list is a straight copy.
2. **Omit what is absent; write `null` for what was asked and is unknown.** Aspect and modality are `null` when the respect cannot be determined — never a guessed default. A key not applicable to the unit is simply not written.
3. **Keys inside `ext` are the guide's, verbatim.** `axis/` and `aspect/` and `infer/` prefixes are kept; kinds are the strings in §7.
4. **`ext` is never a substitute for a home that exists.** A file that puts `"kind": "consequent"` in `ext.form` and nothing in `anatomy` is valid but wrong: the page will not show the form.
5. **A stretched label is explained in `note`, not hidden in `ext`.** `ext` holds structured data; `note` holds the reasoning.

Three units with `ext`, showing the three commonest cases — a pending layer (axis, form), a pending warrant kind, and a pending move attribute (composite, second target):

```json
[
  {
    "id": "mishnah",
    "speaker": "Mishnah",
    "he": "מאימתי קורין את שמע בערבין? משעה שהכהנים נכנסים לאכול בתרומתן.",
    "en": "From when does one recite the Shema in the evening? From the time the priests enter to eat their terumah.",
    "move": { "element": "statement", "subtype": "firsthand" },
    "provenance": "tradition",
    "anatomy": [{ "kind": "unqualified" }, { "kind": "simple" }],
    "ext": {
      "form": { "normalized": "the evening Shema's time begins when priests enter to eat terumah", "subject": "the time of the evening Shema", "predicate": "begins when the priests enter to eat their terumah" },
      "axis": ["axis/time"]
    }
  },
  {
    "id": "tanna-heicha",
    "he": "תנא היכא קאי דקתני ״מאימתי״?",
    "en": "On what is the Tanna standing, that he teaches \"from when\"?",
    "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah", "marker": "תנא היכא קאי" },
    "provenance": "derivation",
    "ext": { "warrant": { "kind": "style/order-context", "premises": [{ "text": "a statement must not presuppose a context it has not given (p156)", "provenance": "axiom" }] } }
  },
  {
    "id": "heleni",
    "speaker": "R. Yehudah",
    "he": "מעשה בהילני המלכה בלוד, שהיתה סוכתה גבוהה מעשרים אמה, והיו זקנים נכנסין ויוצאין לשם ולא אמרו לה דבר.",
    "en": "It happened that Queen Heleni's sukkah in Lod was higher than twenty cubits, and the elders went in and out of it and said nothing to her.",
    "move": { "element": "proof", "subtype": "demonstration", "target": "yehudah", "marker": "מעשה ב…" },
    "provenance": "tradition",
    "anatomy": [{ "kind": "syllogism", "note": "The elders' silence is treated as a ruling: had the sukkah been invalid they would have objected." }],
    "ext": {
      "move": { "composite": "ascribed-proof", "targets": ["yehudah", "mishnah-a"] },
      "warrant": { "premises": [
        { "text": "the elders entered a sukkah above twenty cubits and did not object", "provenance": "tradition" },
        { "text": "sages do not silently use an invalid sukkah", "provenance": "endoxa" }
      ] }
    }
  }
]
```

### 4.3 How a pending construct graduates

When a key in `ext` earns a renderer, it moves out of `ext` into the schema, the reader learns its shape, the check suite gets a case, and `version` steps if any existing file would read differently. A key is *never* added loosely at the top level: outside `ext`, unknown is a fault, on purpose. To add a construct end to end:

1. Decide its layer: a property of the sentence alone (row), of the move on its target (edge), or of the passage. Row and edge kinds join `anatomy`; a structured layer becomes a new sibling key of `move`.
2. Give it a stable kebab-case key. Prefer this guide's key.
3. `anatomy.ts` / `taxonomy.ts`: the entry — definition, stock word, page.
4. `sugya.schema.json`: the enum or the new property.
5. `format.ts`: for a new key, read it in `readUnit`/`parseSugya` and write it in `unitJson`/`toJson`, in canonical position.
6. `check.ts`: one accepted case, one refused case.
7. Then the renderer.

Adding a Layer B/C/D kind is one entry in `ENTRIES` in `anatomy.ts` (its family, level, words, definition, glyph) plus its name in the schema's enum; the test that the two lists agree fails until both are done. A new leaf of Layer A is one entry in `LEAVES` in `taxonomy.ts` plus the schema's `allOf` branch for its element.

---

## §5 · Validation, canonical form, loading, where things are

### 5.1 Validation, and what a fault looks like

`parseSugya(json, sourceName)` checks the whole file and reports **every** fault at once, each prefixed with the JSON path it sits at. It refuses, in this order of discovery:

1. Not an object; wrong `format`; a `version` it does not understand.
2. **Unknown keys**, at every level — a misspelt key would otherwise vanish silently, and these files are written by hand and by agents. The message suggests the nearest allowed key when one is within two edits.
3. Missing required keys; wrong types; empty required strings.
4. Values outside a vocabulary, with the allowed values listed (or counted, for the sixty-four labels) and a suggestion when one is close.
5. A `subtype` that is not a leaf of its `element`.
6. Then the structural rules, from the analysis itself: duplicate unit ids; a `target` that names no unit; a `target` that names a *later* unit; an edge-level label on a unit whose move acts on nothing; no units at all.

A bad file, and what the reader says of it:

```
bad.json: 5 faults
  $.folo: unknown key (did you mean "folio"?)
  $.folio: required
  $.units[0].colour: unknown key
  $.units[1].move.subtype: "objection" is not a subtype of "answer" (expected "answer" | "determination")
  $.units[1].anatomy[0].kind: "consequant" is not one of the 64 values allowed for "kind" (did you mean "consequent"?)
```

The same list appears on the *Open* page (§5.3) when a file offered there is refused. The JSON Schema expresses the same rules as far as JSON Schema can (shape, required keys, enums, the element→subtype pairing, `additionalProperties: false` everywhere but `ext`). It cannot express the structural rules in item 6; those need the reader.

Faults an agent makes most often, and the fix:

| fault | fix |
|---|---|
| `$.units[3].anatomy[0].kind: "converse-complete" is not one of the 64 values` | the file's name is `converse` |
| `$.units[3].anatomy[0].kind: "axis/time" is not one of the 64 values` | axes are pending: `ext.axis: ["axis/time"]` |
| `$.units[4].warrant: unknown key` | pending layers go inside `ext`: `ext.warrant` |
| `$.units[5].move.target: expected a string, got ["a","b"]` | one target in `move.target`; all of them in `ext.move.targets` |
| `$.units: unit "t1-ask" carries the edge-level label "contradictory" but acts on nothing` | a relation or deduction needs `move.target` |
| `$.units: unit "sin" targets "rami", which does not precede it` | reorder, or split the unit that is being pointed back at |
| `$.units[2].move.subtype: "refutation" is not a subtype of "contradiction"` | תיובתא is `difficulty/refutation` |
| `$.units[0].provenance: "asserted " is not one of …` | trailing space |

### 5.2 Canonical form

`stringify(sugya)` writes a file in one fixed key order (the order of the tables in §2), with nothing undefined, two-space indentation, and a record or list of scalars on one line when it fits in 140 columns — so a `move` reads as one line and a preface as one paragraph per line. A shipped file is required to be canonical: `npm test` parses each and prints it back and asserts the text is unchanged. A hand-edited or agent-written file need not be; the runtime reader does not care about order or whitespace, only shape.

### 5.3 How a file is loaded

**Shipped.** `site/src/rail/sugyot/index.ts` imports each file and passes it through `parseSugya`. A file with a fault fails at import, naming every fault; nothing half-valid reaches the page. To ship a passage: put the file in that directory and add one line to `FILES`. Order there is gallery and tab order.

**Opened at runtime — how to look at what you have written.** `#/open` is a page of its own: its own chrome, not a tab of the shipped lattice. It takes a file dropped on it, chosen from its picker, or pasted into its box, and runs the same `parseSugya` on it. If it passes, the passage is drawn there by the same `SugyaView` every shipped passage uses, the route becomes `#/open/<id>`, and the file is kept in `sessionStorage` so a reload on that page redraws it. It does not join the shipped tabs or the gallery. If it fails, every fault is listed with the path it was found at and nothing is drawn: this is the fastest way to check a file you have just written. *Download canonical form* beside the drawn passage gives back the file in the canonical order of §5.2, and the file's own `about` is shown there under *The file's own preface*.

**From code.** `parseSugya(json, sourceName)` returns a `Sugya` or throws a `SugyaFormatError` whose `.faults` is the list; `toJson(sugya)` and `stringify(sugya)` go the other way. All three are exported from the barrel `site/src/rail/index.ts`. Node 22 runs the TypeScript directly, so a one-line check of an agent's output is:

```
node -e 'import("./site/src/rail/format.ts").then(m => { m.parseSugya(JSON.parse(require("fs").readFileSync(process.argv[1], "utf8")), process.argv[1]); console.log("ok"); })' out.json
```

### 5.4 Where things are

| | |
|---|---|
| `site/src/rail/format.ts` | `parseSugya`, `SugyaFormatError`, `toJson`, `stringify`, the `*Json` types |
| `site/src/rail/sugyot/sugya.schema.json` | JSON Schema 2020-12 |
| `site/src/rail/sugyot/*.json` | the nine shipped passages |
| `site/src/rail/sugyot/index.ts` | loads them: `SUGYOT`, `sugyaById`, `ofCollection` |
| `site/src/rail/taxonomy.ts` | the seven elements, nineteen leaves, effects (`LEAVES`) |
| `site/src/rail/anatomy.ts` | the sixty-four kinds (`ENTRIES`), families, levels |
| `site/src/rail/markers.ts` | the stock-phrase lexicon Ramchal himself gives, one leaf per phrase |
| `site/src/rail/sugya.ts` | `analyze`: depth, standing, status, movements — the reducer of §13 |
| `site/src/rail/app/sugyot.ts` | `useSugyot` is the shipped lattice; `useOpened` / `openSugya` are the loader page's session |
| `site/src/rail/app/pages/OpenPage.tsx` | the loader page: drop, pick or paste a file; the faults, or the passage drawn |
| `site/src/rail/app/markup.tsx` | `renderMarkup` — the `hint` markup |
| `site/src/rail/fixtures/*.ts` | the same passages as TypeScript, the oracle the JSON is checked against |
| `site/src/rail/check.ts` → *The file format* | the checks: equivalence per passage, the reader's refusals, schema ↔ code |

### 5.5 What the shipped passages use — the construct inventory

The format was drawn up by going through each passage and listing every construct it relies on, so that nothing on any page lacks a home in the file. Counts are units unless stated.

| passage | units | party | speaker | he | short | target | marker | attested | note | anatomy | families | leaves used | hint |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `pesachim-liquids` — Pesachim 16a/18b | 4 | group | 4 | 4 | — | 3 | 1 | 3 true, 1 false | 2 | 4 labels on 4 | anatomy, relations, deductions | 4 | — |
| `berachos-yaakov` — Berachos 4a | 4 | individual | 4 | 4 | — | 2 | 1 | 4 true | 1 | 5 on 4 | anatomy, relations | 3 | — |
| `yebamos-chalitzah` — Yebamos 104b | 3 | talmud | 3 | 2 | — | 2 | 1 | 3 true | 1 | 4 on 3 | anatomy, relations | 3 | — |
| `yebamos-deafmute` — Yebamos 112b | 2 | talmud | 2 | 2 | — | 1 | 1 | 2 true | — | 1 on 1 | anatomy | 2 | — |
| `bava-metzia-yeush` — Bava Metzia 21b–22b | 57 | group | 19 | 57 | 57 | 56 | 25 | 57 false | 12 | 45 on 39 | anatomy, relations, deductions | 16 | — |
| `bm-2a-ochazin` — Bava Metzia 2a–3a | 36 | talmud | 2 | 36 | 36 | 35 | 33 | 36 false | — | — | — | 7 | yes |
| `bk-2a-toldos` — Bava Kamma 2a–3b | 77 | talmud | 2 | 77 | 77 | 76 | 63 | 77 false | — | — | — | 10 | yes |
| `pes-2a-or` — Pesachim 2a–3a | 46 | group | 4 | 46 | 46 | 45 | 39 | 46 false | — | — | — | 9 | yes |
| `git-2a-befanai` — Gittin 2a–3a | 31 | group | 3 | 31 | 31 | 30 | 24 | 31 false | — | — | — | 6 | yes |

What each contributed: the four short Ramchal passages fix the core — a unit with `speaker`, `he`, `en`, a `move` with `target`, `marker` and `attested: true`, a `provenance`, and `anatomy` labels of all three kinds that appear on the page; two of them put two labels on one unit, which is why `anatomy` is a list; `yebamos-chalitzah` has a unit with no Hebrew, which is why `he` is optional; `pesachim-liquids` has the one Ramchal unit that is *not* attested and carries a `note` saying why; a speaker of *Genesis 28:15* shows `speaker` is free text. Bava Metzia 21b–22b adds scale: `short` on every unit, sixteen of the nineteen leaves, `attested: false` throughout with the `marker` carrying the checkability instead, `basis: marked` on six anatomy labels, `provenance: tradition` on the challenges from mishnayos, and a five-paragraph `about`. The four research passages add the page furniture: `collection`, `hint`, a `speaker` of *Mishnah* on the opening unit, and units with no `provenance`.

---

## §6 · Conventions for writing a file

Not enforced by the reader; how the shipped files are written, and how an agent's file should be.

- **One unit is one move.** Where a printed segment holds two moves, split it; where one move runs across segments, merge. Abridge `en` so it reads as the move, not the commentary. A single Aramaic sentence may hold a claim, a proof and a proof of the proof (Shabbos 5b, §15) — that is three units if the file is to show them, or one unit with the chain in `ext.warrant.premises`.
- **One unit, one target.** When a sentence both answers a difficulty and proves the original claim (Berachos 20b, §16), split it into a resolution targeting the difficulty and a proof targeting the claim; the reducer cannot otherwise give the claim its due.
- **`target` is the shorter reach** when a move could be read as acting on two earlier units. The others go in `ext.move.targets`.
- **`speaker`** is given when the sentence names one, including *Mishnah* for a mishnah and a verse's citation for a verse. A nameless stam sentence, and an `אמר לך פלוני` put in someone's mouth by the Gemara, carry none. For a dialogue, the party's name or letter.
- **`marker`** is a signpost of the *move*, not of its content — `תא שמע`, `אלא`, `הכא במאי עסקינן`, `מאי שנא … ומאי שנא` — generalised with `…` and `פלוני`. A phrase that only happens to occur in the sentence is not a marker. The lexicon Ramchal himself gives is `site/src/rail/markers.ts`; §8 lists more, marked `[supplied]` where the book does not cite them. A non-Talmudic text has no markers: every label is *inferred*.
- **`attested`** is `true` only where Ramchal labels *this* sentence of *this* passage. Say `attested: false` explicitly on a passage he discusses when one unit's label is yours, and explain in `note`. On a passage he does not discuss, omit it or write `false` throughout.
- **`provenance`** is `tradition` for a mishnah, baraita or verse, whether stated or brought as evidence; `derivation` for a resolution, an inference, or any reasoning; `asserted` for a rabbi's ruling on his own authority; `sense`, `axiom`, `endoxa` when a premise of that kind is itself the unit. It is about the unit's *own* authority; the provenance of the premises a unit leans on goes in `ext.warrant.premises[].provenance`.
- **`short`** is worth writing by hand on any passage long enough to fold; it is what the reader sees on a band while the sentences under it are hidden.
- **`about`** should say where the text is from, what the passage shows, and every place a label is a stretch. Order it as Ramchal orders a presentation (§12, Order): the general before the particular, the known before the unknown.
- **`note`** carries the reasoning: why this leaf and not its neighbour, which `test ·` line decided it, what was retracted.
- **Ids** are mnemonic where the passage has natural names (`abaye`, `t1-ask`), ordinal where it does not (`"1"`, `"2"`). Never reuse one.
- **Never invent a key or a value.** Outside `ext`, an unknown key is a fault; a value outside a vocabulary is a fault. If no leaf fits, take the nearest and say so in `note` (`והלכתא כוותיה דאביי` has no leaf; the shipped file uses `proof/validation` and explains).

# Part II · The system, construct by construct

## §7 · Card

The complete vocabulary on one page, with where each key lives in the file. `anatomy` means `anatomy[].kind`; `ext.…` means pending.

### A · Moves — the parts of a sugya (חלקי הסוגיות)

Seven elements, nineteen leaves. A key is `element/subtype`; emit the two halves as separate fields (`"element": "difficulty", "subtype": "objection"`). *Effect* = what a landed move does to its target; `open` acts on nothing.

| key | he | translit | en | effect | file | p |
|---|---|---|---|---|---|---|
| statement/firsthand | שמועה | shemuah | first-hand knowledge / received ruling | open | `move` | 162 |
| statement/explanation | פירוש מרווח | perush meruvach | full explanation | open | `move` | 164 |
| statement/forcedExplanation | פירוש דחוק | perush dachuk | forced explanation | unsettle [supplied] | `move` | 164 |
| statement/presumption | אוקימתא | okimta | presumption / case-restriction | unsettle [supplied] | `move` | 164 |
| statement/inference | דיוק | diyuk | inference | open | `move` | 166 |
| statement/reported | הגדה | haggadah | reported information | open | `move` | 166 |
| question/query | שאלה | she'elah | query | open | `move` | 168 |
| question/principle | איבעיא | ibbaya | question of principle | open | `move` | 170 |
| answer/answer | תשובה | teshuvah | answer | discharge | `move` | 172 |
| answer/determination | פשיטות | peshitut | determination | discharge | `move` | 172 |
| proof/demonstration | הוכחה | hochachah | demonstration | raise | `move` | 174 |
| proof/validation | סייעתא | siyata | validation / support | raise | `move` | 176 |
| contradiction/direct | סתירה | setirah | direct contradiction | reject | `move` | 178 |
| contradiction/opposition | דחיה | dechiyah | opposition / deflection | unsettle | `move` | 178 |
| difficulty/objection | פירכא | pircha | objection (formal) | unsettle | `move` | 180 |
| difficulty/apparentContradiction | רומיא | rumya | apparent contradiction | unsettle | `move` | 182 |
| difficulty/refutation | תיובתא | teyuvta | refutation | reject [supplied] — file: unsettle (placeholder) | `move` | 184 |
| resolution/settlement | יישוב | yishuv | settlement | discharge | `move` | 184 |
| resolution/alternative | שינוי | shinui | alternative / deflecting answer | unsettle | `move` | 186 |

Label attacks by outcome, not by opening word: `מיתיבי` / `תא שמע` / `והא תניא` introduce a source-based attack — a סתירה (source shows falsity) or רומיא (sources set against each other) if it is then answered; `difficulty/refutation` only when the Gemara closes with `תיובתא`.

Composites (Ch 10, p214): `composite/ascribed-proof` — an הגדה carrying an הוכחה; `composite/ascribed-difficulty` (קושיא מגדת) — an הגדה carrying a קושיא → `ext.move.composite`. Parties (Ch 1, p10): `party-group` many speakers; `party-individual` one speaker on both sides (הוא מותיב לה והוא מפרק לה); `party-talmud` the anonymous voice → `party` on the sugya, `anatomy` on a unit.

### B · Form — one normalized proposition

Every utterance reduces to **subject** (נושא) + **predicate** (נשוא) + **manner of predication** → `ext.form.subject`, `.predicate`, `.normalized`.

Quantity of subject (p22–24) → `anatomy`: `categorical` כולל · `particular` פרטי (one individual) · `partial` קצתי (some of a class) · `unqualified` סתמי (no quantifier — **read as categorical**).

Manner of predication, eleven (p26–40), with truth conditions from Ch 6 (p78–90) as an *intention count* → `anatomy`:

| # | key | he · marker | en | intentions |
|---|---|---|---|---|
| 1 | simple | סתם | simple | 1 |
| 2 | qualified-{certain,possible,doubtful,impossible} | מיוחד ומוגבל · ודאי / אפשר / ספק / לא אפשר | qualified | 1 — P in S *in that mode* |
| 3 | exclusion | ממעט · לבדו, אין … אלא | exclusion | 1 — P in S and nowhere else |
| 4 | exception | מוציא · חוץ מ | exception | 2 — base; exception. Exception may fail alone |
| 5 | conditional | מוגבל · ובלבד ש | conditional | 2 — base; condition. Condition may fail alone |
| 6 | hypothetical | תלוי · אם … | hypothetical | **1 — the dependency only** |
| 7 | compound · compound-not-only · compound-needless · disjunction | מרבה הענינים · מחלק | simple compound (equal · לא זו אף זו · זו ואין צריך לומר זו) / disjunction או … או | all parts |
| 8 | preclusive | לא … אלא … | preclusive | all parts |
| 9 | discrepancy | מכחיש · אף על פי ש | discrepancy | all parts |
| 10 | comparative | מדמה · כשם ש … כך … | comparative | all parts |
| 11 | consequent | נמשך · לפיכך | consequent | **3 — antecedent; consequent; dependency** |

Inference (דיוק, Ch 5, p66–74) → `anatomy`: `inference-necessary` מוכרח vs `inference-loose` בלתי מוכרח (retractable). Necessary inferences by type → `ext.inference.kind`, and the edge kinds where they apply:
- **A** כללי מקיים → `infer/contrapositive` חילוף הפכי כולל (edge `contrapositive`) · `infer/converse-limited` חילוף קצתי (edge `converse-limited`)
- **E** כללי שולל → `infer/converse-complete` חילוף כולל (edge `converse`)
- **I** קצתי מקיים → `infer/opposite` הפך (row `absolute-opposite`) · `infer/contrapositive-limited` חילוף קצתי הפכי · `infer/converse-limited`
- **O** קצתי שולל → the same three

Literal vs `figurative` (השאלה / הפלגה) → `anatomy`: truth is judged on the intended allusion (p76). Elucidation → `ext.form.elucidationOf`.

### C · Relations between two propositions (Ch 4, p48–64) → `anatomy`, edge-level

`equivalent` דומים · `variant` מתחלפים (same S, different P → `variant`; same P, different S → `variant-subjects`) · `opposite` הפכיים → `diametrically-opposed` הפכיים ממש (both categorical or both particular) / `contradictory` מתנגדים (one categorical, one particular) · `converse` חילוף (complete) / `converse-limited` / `contrapositive` · `obverse` מתהפכים · `incongruent` נבדלים.

Opposition requires same S, same P, same **time**, **place**, **aspect**, and **literal sense**; otherwise `differs-in-time` / `differs-in-place` / `differs-in-context` / `homonym` (one word, two meanings) / `figurative` (one statement is a figure or hyperbole — the row kind on that unit). Opposite terms → `anatomy`, row-level: `no-middle` (טמא/טהור, אסור/מותר) vs `has-middle` (רשות/חובה, middle = מצוה).

### D · Warrants (Ch 7–8)

Propagation (p92): the predicate moves **up** its order (S is P, P ⊆ Q ⟹ S is Q); the subject moves **down** (S is P, T ⊆ S ⟹ T is P).

Syllogisms → `anatomy`, edge-level: `classical-syllogism` היקש מופתי · `analogism` בנין אב / מה מצינו · `a-fortiori` קל וחומר / כל שכן · `hypothetical-syllogism` היקש תלוי (ponens; `hypothetical-syllogism-tollens`) · `disjunctive-syllogism` היקש מחלק · `syllogism` (generic, no more specific kind fits).

Defeats → `anatomy`, edge-level: `fallacy-not-included` (classical syllogism: the inclusion fails) · `fallacy-not-similar` (מה ל… שכן …) · `fallacy-not-greater` (ordering reverses under another criterion) · `fallacy-counterexample` (… יוכיח).

Status (p112): `accepted` · `rejected` · `doubt` — **doubt is the initial state.** Derived; never emitted.

Provenance of premises → `provenance` (the unit's own), `ext.warrant.premises[].provenance` (each premise): `sense` מוחשות · `axiom` מושכלות ראשונים · `endoxa` מפורסמות · `tradition` מקובלות (Scripture, הלכה למשה מסיני, the thirteen מדות, undisputed authority) · `derivation` היקש · `asserted` (file only: own authority, the default).

Proof: from nature (axiom, sense) · from convention (endoxa, tradition) · from syllogism · `proof/indirect` — the opposite is shown false (valid only across no-middle opposites) → icon `via-opposite` in `anatomy`; `ext.warrant.kind` when premises are recorded. On a proof, contradiction or difficulty, `provenance` of `sense` / `axiom` / `endoxa` / `tradition` also draws the matching magenta ground badge.

Disproof: the same three sources · `disproof/indirect` (contrary derived from a true premise) · `disproof/reductio` (a consequence is patently false; via היקש תלוי) → `ext.warrant.kind` · `disproof/dilemma` ממה נפשך → icon `dilemma` in `anatomy`; `ext.warrant.kind` when premises are recorded.

Rebuttal of a proof or disproof → `ext.warrant.kind`: `rebuttal/irrelevant` (the source does not bear on this claim; icon `ground-does-not-reach`) · `rebuttal/invalid-syllogism` · `rebuttal/your-reasoning` ולטעמיך / ולדידך · `rebuttal/just-the-opposite` אדרבה · `rebuttal/that-proves-mine` היא הנותנת / משם ראיה. A rebutted proof returns its claim to doubt (not rejected); a rebutted disproof returns it to doubt (not accepted). A rebuttal's `kind` is always `rebuttal/*`; the verse, tradition or syllogism it leans on is a premise.

Phrasing arguments (`אם כן לימא קרא X` · `X מיבעי ליה` · `ליתני X` · `למה לי`): aimed at a *reading* of a fixed text → `hypothetical-syllogism-tollens` (anatomy), and `proof/indirect` of the only other reading (`via-opposite` in anatomy; `ext.warrant.kind` for the premises); aimed at the author's *wording* with the reading agreed → a פירכא with a `style/*` warrant (ext).

`sevara` סברא: inclines when arguments balance; never establishes alone → icon `theory` in `anatomy`; keep `ext.warrant.kind: "sevara"`.

Aspects (p148–150) → `ext.warrant.aspect`: `aspect/essence` מה שבעצמו · `aspect/proprium` מה שבסגולתו · `aspect/accident` מה שבמקריו · `aspect/relation` מה שביחסו אל זולתו. Modality (p154) → `ext.warrant.modality`: `potential` בכח · `actual` בפועל. **Chaining requires equal aspect and equal modality.**

Stylistic objections (p156–158) → `ext.warrant.kind` on a `difficulty/objection`: whole — `style/obvious` פשיטא (answered by סלקא דעתך); parts — `style/redundant` הא תו למה לי · `style/self-contradictory` הא גופא קשיא · `style/order-context` תנא היכא קאי · `style/order-combine` ליערבינהו וליתנינהו · `style/order-inconsistent` פתח בכד וסיים בחבית.

### E · Axes — the 24 הבחנות (Ch 11, p222–236) → `ext.axis`

Keys are `axis/<name>`: 1 `essence` מהות → definition גדר · 2 `parts` חלקים · 3 `quality` איכות · 4 `quantity` כמות · 5 `material` חומר · 6 `form` צורה (definitive עצמית / physical מורגשת) · 7 `action` פעולה (natural טבעית / voluntary רצונית) · 8 `affection` הפעל · 9 `genus-species` סוג ומין (סוג הסוג) · 10 `cause` סיבה (generative מולדת / effective פועלת) · 11 `means` אמצעי · 12 `motive` מעורר · 13 `purpose` תכלית · 14 `result` מסובב · 15 `attribute` מתחבר (inherent / coincident / before-after) · 16 `place` מקום · 17 `posture` מצב · 18 `movement` תנועה · 19 `time` זמן · 20 `relation` יחס · 21 `bearer` נושא · 22 `similarity` דמיון · 23 `difference` הבדל · 24 `opposition` ניגוד.

Priority (p236) → `ext.priority`: `priority/temporal` זמני · `priority/rank` שכלי · `priority/natural` טבעי.

### Invariants

1. Judge the argument, never the arguer — `לא נביט … אל הטוענים, אלא אל הטענות` (p12).
2. Normalize before classifying: every utterance becomes "S has P, in manner M" (p42, p192).
3. Doubt is the initial state; promotion is explicit (p112).
4. דחיה, פירכא, רומיא yield doubt, never rejected (p178–180).
5. Rebutting a proof does not prove the negation (p142).
6. Exception and conditional statements fail partially: a false exception or condition leaves the base predication true (p80–82).
7. The hypothetical asserts only dependency: true parts with no dependency = false; false parts with true dependency = true (p82–86). Not material implication.
8. The consequent statement has three conditions, all required (p88–90).
9. Chaining requires the same aspect and the same modality; same words ≠ same term (p144–156).
10. סתמי defaults to categorical; particular is not partial (p24).
11. דיוק is scoped to the alternatives the narrowed subject displaced; loose inferences are retractable (p68–72).
12. Opposition exists only under identical time, place, aspect, and literal sense (p54–56).
13. In composite units, separate the reporter's voice from the reported view (p214–218).
14. Unknown aspect or modality → `null`, never a guessed default.
15. Closed vocabulary: do not invent a category; use a `[supplied]` entry or leave the unit with the nearest label and a `note`.
16. One unit, one move, one `target`; what has a home goes in its home; what has none goes in `ext` under its guide name.

---

## §8 · Layer A — Moves

### The seven elements (Ch 2, p14)

- he · `חלקי המשא־ומתן הראשיים, שמהם נבנות הסגיות כלן בכל התלמוד – שבעה, והם: מימרא, שאלה, תשובה, סתירה, ראיה, קשיא ותרוץ`

- **מימרא** statement — `שיאמר אומר מאמר אחד` — someone asserts.
- **שאלה** question — `שיבקש אחד מאחד ידיעת ענין־מה` — someone seeks information.
- **תשובה** answer — `שישיב הנשאל לשואל על שאלתו` — the asked responds.
- **סתירה** contradiction — `שיבטל מאמר שנאמר ויכחש מכל וכל` — nullifies a statement outright.
- **ראיה** proof — `שיובא מה שממנו תתבאר אמתת אחד מן המאמרים` — brings what makes a statement's truth evident.
- **קושיא** difficulty — `שיראה היות במאמר … מה שאינו אמת או מה שאינו נאות` — shows something untrue *or unfitting*. The "unfitting" half is why formal objections are difficulties.
- **תירוץ** resolution — `שתוסר הקשיא מן המאמר אשר הקשה עליו` — removes the difficulty.

Two pairs argue about *truth* (proof / contradiction), two about *fit* (difficulty / resolution); question / answer open and close a request; statement introduces material. Effects follow: contradiction rejects, proof raises, resolution and answer discharge, difficulty and opposition unsettle.

**The element is decided by what the move lands on.** Ramchal's own rule (Heb p185): a דחיה falls on a statement or a proof, a שינוי on a difficulty — the same act, two leaves. The shipped Bava Metzia file records `הכא במאי עסקינן` as `resolution/settlement` when it lands on a `תא שמע` difficulty, though the phrase is listed under `statement/presumption`, because there it is answering an objection, not restricting a statement. Ask first: *what is the target, and what element is it?*

### Parties (Ch 1, p10–12)

`party-group` — several speakers, one to a side. `party-individual` — one speaker plays both: `הוא מותיב לה והוא מפרק לה`. `party-talmud` — the redactor's anonymous voice questions and answers `כאלו היו רבים המדברים`. All three are judged identically.

- file · `party` on the sugya for the passage as a whole (declared, not derived from the speakers). On a unit, the row-level `anatomy` kind `party-individual` / `party-group` / `party-talmud` when an exchange inside the passage differs from the whole — a `רמי … ומשני` inside a group sugya, a named exchange inside an anonymous one. A unit with no `speaker` is shown as *the Talmud itself* automatically; the badge needs no label.

```json
{ "format": "derech-tevunos/sugya", "version": 1, "id": "pesachim-liquids", "title": "Uncleanness of liquids", "tractate": "Pesachim", "folio": "16a / 18b (Eng. col. 17b)", "discussedAt": "Derech Tevunos ch. 9, pp. 174-178", "party": "party-group", "units": [{ "id": "eleazar", "speaker": "R. Eleazar", "en": "Liquids cannot become unclean at all according to Torah law.", "move": { "element": "statement", "subtype": "firsthand", "attested": true } }] }
```

```json
{ "format": "derech-tevunos/sugya", "version": 1, "id": "berachos-yaakov", "title": "The promise and the fear", "tractate": "Berachos", "folio": "4a", "discussedAt": "Derech Tevunos ch. 9, p. 184", "party": "party-individual", "units": [{ "id": "promise", "speaker": "Genesis 28:15", "en": "Behold I am with you and will protect you wherever you go.", "move": { "element": "statement", "subtype": "firsthand", "attested": true }, "provenance": "tradition" }] }
```

Inside a group sugya, one Amora raising and answering his own contradiction `[constructed]`:

```json
[
  {
    "id": "b1",
    "speaker": "Rav Pappa",
    "he": "רב פפא רמי: כתיב ״לא תעשה כל מלאכה״, וכתיב ״ששת ימים תעבד ועשית כל מלאכתך״!",
    "en": "Rav Pappa raised a contradiction: it is written \"you shall do no work\", and it is written \"six days you shall labour and do all your work\".",
    "move": { "element": "difficulty", "subtype": "apparentContradiction", "marker": "… רמי, כתיב … וכתיב" },
    "provenance": "tradition",
    "anatomy": [{ "kind": "party-individual", "note": "הוא מותיב לה והוא מפרק לה: the same speaker answers in the next unit." }]
  },
  {
    "id": "b2",
    "speaker": "Rav Pappa",
    "he": "והוא מותיב לה והוא מפרק לה: כאן — בשבת, כאן — בששת ימי המעשה.",
    "en": "And he himself resolved it: here, on Shabbos; there, on the six working days.",
    "move": { "element": "resolution", "subtype": "settlement", "target": "b1" },
    "provenance": "derivation",
    "anatomy": [{ "kind": "party-individual" }, { "kind": "differs-in-time", "note": "The two verses speak of different days; no opposition." }]
  }
]
```

The other two row kinds, each where the exchange differs from the sugya it sits in. A named two-speaker exchange inside an anonymous (`party-talmud`) sugya — Shabbos 3a, Rav asking Rebbi:

```json
[
  {
    "id": "rav-asks",
    "speaker": "Rav",
    "he": "בעא מיניה רב מרבי: הטעינו חבירו אוכלין ומשקין והוציאן לחוץ — מהו?",
    "en": "Rav asked Rebbi: if another loaded him with food and drink and he carried them out — what is the law?",
    "move": { "element": "question", "subtype": "principle", "marker": "בעא מנה … מהו? … או … אזלינן" },
    "provenance": "asserted",
    "anatomy": [{ "kind": "party-group", "note": "Two named speakers, one to a side, inside a sugya whose voice is otherwise the Talmud's." }]
  },
  {
    "id": "rebbi-answers",
    "speaker": "Rebbi",
    "he": "אמר ליה: חייב, ואינו דומה לידו.",
    "en": "He said to him: he is liable, and it is not like his hand.",
    "move": { "element": "answer", "subtype": "determination", "target": "rav-asks" },
    "provenance": "asserted",
    "anatomy": [{ "kind": "party-group" }]
  }
]
```

The anonymous voice taking over inside a named dispute — Bava Metzia 21b, the Gemara's own `כי פליגי` between Abaye's and Rava's statements, and a `party-talmud` objection in an otherwise Amoraic exchange (Berachos 2b):

```json
[
  {
    "id": "ki-pligi",
    "he": "כי פליגי — בדבר שאין בו סימן.",
    "en": "Where they disagree is over an item with no distinguishing mark.",
    "move": { "element": "statement", "subtype": "explanation", "target": "abaye" },
    "provenance": "derivation",
    "anatomy": [{ "kind": "party-talmud", "note": "No speaker: the redactor's voice, sorting out the two Amoraim's dispute. The badge *the Talmud itself* is automatic; this label is for the contrast with the named units around it." }]
  },
  {
    "id": "lisni",
    "he": "מכדי כהנים אימת קא אכלי תרומה? משעת צאת הכוכבים. לתני: משעת צאת הכוכבים!",
    "en": "Now, when do priests eat terumah? From the emergence of the stars. Then let it teach: from the emergence of the stars!",
    "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah", "marker": "ליתני …!" },
    "provenance": "derivation",
    "anatomy": [{ "kind": "party-talmud" }],
    "ext": { "warrant": { "kind": "style/self-contradictory" } }
  }
]
```

### statement/firsthand — שמועה · shemuah · first-hand knowledge
- he · `שיאמר אומר מאמר אחד, יודיע בו אחד מן הענינים בדבר מן ההלכות, או מן המוסרים, או באיזה מין משכל שיהיה`
- means · A speaker asserts a ruling, principle, or idea on his own authority or as a tradition he transmits. Introduces material; acts on nothing. A Mishnah, a baraita and a verse are all שמועה when they are stated rather than adduced.
- test · Not explaining a prior text (→ פירוש); not derived from one (→ דיוק); not quoting another's deed or words (→ הגדה).
- recognize · `אמר רב פלוני: …` opening a topic [structural]. `תנן` / `תנו רבנן` / `דכתיב` opening a passage.
- rules · Those of statements (§9).
- file · `move: { element: "statement", subtype: "firsthand" }`, no `target` unless the statement is the second side of a dispute and the relation between them is to be labelled. `provenance`: `asserted` for a rabbi's own ruling, `tradition` for a Mishnah, baraita or verse. `speaker` names the rabbi, *Mishnah*, or the verse.
- ex · Berachos 20b — `אמר רב אדא בר אהבה: נשים חייבות בקידוש היום – דבר תורה`.
- src · 162

```json
{
  "id": "ruling",
  "speaker": "Rav Adda bar Ahavah",
  "he": "אמר רב אדא בר אהבה: נשים חייבות בקידוש היום דבר תורה.",
  "en": "Women are obligated in the sanctification of the day by Torah law.",
  "move": { "element": "statement", "subtype": "firsthand" },
  "provenance": "asserted",
  "anatomy": [
    { "kind": "unqualified", "note": "No quantifier: all women, with the force of a categorical." },
    { "kind": "simple" }
  ],
  "ext": { "form": { "normalized": "women have the Torah-law obligation of kiddush", "subject": "נשים", "predicate": "חיוב קידוש היום דבר תורה" } }
}
```

```json
{
  "id": "mishnah-a",
  "speaker": "Mishnah",
  "he": "סוכה שהיא גבוהה למעלה מעשרים אמה — פסולה.",
  "en": "A sukkah higher than twenty cubits is invalid.",
  "move": { "element": "statement", "subtype": "firsthand" },
  "provenance": "tradition",
  "anatomy": [{ "kind": "unqualified" }, { "kind": "simple" }],
  "ext": { "axis": ["axis/quantity"] }
}
```

```json
{
  "id": "promise",
  "speaker": "Genesis 28:15",
  "he": "והנה אנכי עמך ושמרתיך בכל אשר־תלך",
  "en": "Behold I am with you and will protect you wherever you go.",
  "move": { "element": "statement", "subtype": "firsthand", "attested": true },
  "provenance": "tradition",
  "anatomy": [{ "kind": "categorical", "basis": "marked", "note": "`בכל אשר תלך`: protection everywhere, the whole class of places." }],
  "ext": { "axis": ["axis/place"] }
}
```

The second opinion of a Mishnah dispute, as a statement that targets the first so the relation can be labelled (the alternative — `contradiction/opposition` — is under דחיה below):

```json
{
  "id": "chachamim",
  "speaker": "Chachamim",
  "he": "וחכמים אומרים: עד חצות.",
  "en": "And the Sages say: until midnight.",
  "move": { "element": "statement", "subtype": "firsthand", "target": "eliezer" },
  "provenance": "tradition",
  "anatomy": [{ "kind": "variant", "note": "Same subject (the deadline of the evening Shema), a different value of the same variable; neither denies the other's predicate." }],
  "ext": { "axis": ["axis/time"] }
}
```

### statement/explanation — פירוש מרווח · perush meruvach · full explanation
- he · `שיפרש אחד מן הכתובים או מן המאמרים … אם יסכים לגמרי עם המאמר – יקרא פרוש מרוח`
- means · Explains a verse or prior statement, agreeing with its essential content *and* with its wording and word order.
- test · Fits content + wording + order → מרווח. Fits content but strains wording or order (`שלא דבר בעל המאמר בדקדוק`) → דחוק. Fits neither → rejected as an explanation. Keeps the wording as is but adds a case-condition → אוקימתא.
- markers · `הכי קאמר` · `מאי …? …` followed by a restatement · `כי פליגי ב…` when it lays out the scope of a dispute without narrowing it.
- file · `statement/explanation` with `target` = the unit explained. Effect `open`: the target's status is untouched. `provenance: derivation`.
- ex · Berachos 22a — `מה טיבן של טובלי שחרין?` → `הכי קאמר: מה טיבן בארבעים סאה – אפשר בתשעה קבין? מה טיבן בטבילה – אפשר בנתינה?`
- src · 162–164

```json
[
  {
    "id": "tovlei",
    "he": "מה טיבן של טובלי שחרין?",
    "en": "What is the nature of those who immerse in the morning?",
    "move": { "element": "statement", "subtype": "firsthand" },
    "provenance": "tradition"
  },
  {
    "id": "hachi-kaamar",
    "he": "הכי קאמר: מה טיבן בארבעים סאה – אפשר בתשעה קבין? מה טיבן בטבילה – אפשר בנתינה?",
    "en": "This is what he means: what is the point of forty se'ah — is nine kav not enough? What is the point of immersion — is pouring not enough?",
    "move": { "element": "statement", "subtype": "explanation", "target": "tovlei", "marker": "הכי קאמר" },
    "provenance": "derivation",
    "note": "Fits content, wording and order: the two rhetorical questions of the source are each given their reference. A full explanation."
  }
]
```

```json
{
  "id": "scope-siman",
  "short": "not where there is a mark",
  "he": "בדבר שיש בו סימן — כולי עלמא לא פליגי דלא הוי יאוש",
  "en": "Where the item has a distinguishing mark, all agree it is not despair: when it reached the finder's hand it reached it in a prohibited manner, since the owner would say, I have a mark on it and will reclaim it.",
  "move": { "element": "statement", "subtype": "explanation", "target": "rava", "attested": false },
  "provenance": "derivation"
}
```

```json
{
  "id": "kasalka",
  "he": "קא סלקא דעתך: דמאן דאמר נגהי — נגהי ממש, ומאן דאמר לילי — לילי ממש.",
  "en": "It was assumed: the one who says 'light' means literal daylight, and the one who says 'night' means literal night.",
  "move": { "element": "statement", "subtype": "explanation", "target": "answers", "marker": "קא סלקא דעתך" },
  "provenance": "derivation",
  "note": "An explanation the Gemara itself later rejects (Pesachim 2a–2b, `אלא … ולא פליגי`). Being rejected later does not change what it is: it read both answers literally, agreeing with their words."
}
```

### statement/forcedExplanation — פירוש דחוק · perush dachuk · forced explanation
- means · Agrees with the essential message but not with all the words or their order; requires saying the author spoke imprecisely. Admitted, at a cost: the target is weakened rather than strengthened [effect supplied].
- test · As above. The more that must be assumed, the more forced; past what the words can bear it is refused (p188 — the same scale as שינוי). An explanation that contradicts a word of the text outright (Abaye's `מדרבנן` against `דבר תורה`) is at the edge of what can be admitted, and is refused when the contradiction is pointed out.
- markers `[supplied]` · `חסורי מחסרא והכי קתני` (the text is elliptical and means …) · `לא דק` (the author was not precise) · `כדי נסבה` (the word is there for no purpose) · `איידי דתנא … תנא …` (the wording was chosen for parallelism, not precision).
- file · `statement/forcedExplanation`, `target` = the unit whose wording is strained. Effect `unsettle`: the target drops to doubt.
- src · 164

```json
{
  "id": "abaye",
  "speaker": "Abaye",
  "he": "אמר אביי: מדרבנן.",
  "en": "Abaye said: the obligation is rabbinic.",
  "move": { "element": "statement", "subtype": "forcedExplanation", "target": "ruling" },
  "provenance": "derivation",
  "note": "Read as an explanation of Rav Adda's ruling, it keeps the content (women are obligated) but contradicts a word of it (`דבר תורה`) — past what the words bear, which is exactly Rava's objection in the next unit. Labelled by target: landing on the ruling it is a forced explanation; landing on the objection (`אמאי?`) it would be a `resolution/settlement`. §16 takes the second reading."
}
```

```json
{
  "id": "aidi",
  "he": "בדין הוא דאפילו מחצה על מחצה נמי מברך, ואיידי דתנא רישא רוב כותים – תנא סיפא רוב ישראל.",
  "en": "By right even half-and-half one should bless; but since the first clause taught 'a majority of Samaritans', the last clause taught 'a majority of Israelites'.",
  "move": { "element": "statement", "subtype": "forcedExplanation", "target": "mishnah-rov", "marker": "איידי דתנא … תנא …" },
  "provenance": "derivation",
  "note": "Berachos 53a. The Mishnah's `רוב ישראל` is explained as chosen for symmetry with the first clause, not for its precise content: the author did not speak בדקדוק. It also retracts the loose inference `הא מחצה על מחצה אינו מברך` drawn from it (§9, inference-loose). Marker supplied — the book does not cite the phrase."
}
```

### statement/presumption — אוקימתא · okimta · presumption / case-restriction
- he · `באור תנאי במאמר, דהינו שלא נבאר כלל ההגדה ומלותיה, אלא נניח כמשמעו הפשוט, אבל נגביל המאמר באחד התנאים`
- means · Keeps the plain sense but restricts the statement to a case or to an opinion-holder, supplying an unstated assumption. Generality is surrendered to keep the statement standing → unsettle [effect supplied].
- markers · `הכא במאי עסקינן` · `הא מני? רבי פלוני היא` · `לא שנו אלא …` · `במאי עסקינן` · `כי פליגי ב…` when it narrows the dispute to a case.
- axis · Record which הבחנה (§12) the restriction uses — time, place, subject, quantity, attribute — in `ext.axis`.
- file · `statement/presumption`, `target` = the statement restricted. When the same phrase lands on a *difficulty*, it is a `resolution/settlement` (or `alternative`), not a presumption — see the rule at the head of this section.
- ex · Berachos 24b — `לא שנו אלא שיכול לכוין את לבו בלחש`.
- src · 164–166

```json
{
  "id": "lo-shanu",
  "speaker": "Rav Huna",
  "he": "אמר רב הונא: לא שנו אלא שיכול לכוין את לבו בלחש, אבל אינו יכול לכוין את לבו בלחש – מותר.",
  "en": "Rav Huna said: they taught this only of one who can concentrate when praying quietly; one who cannot may raise his voice.",
  "move": { "element": "statement", "subtype": "presumption", "target": "baraita-kol", "marker": "לא שנו אלא …" },
  "provenance": "derivation",
  "note": "The baraita (`המשמיע קולו בתפלתו הרי זה מקטני אמנה`) keeps its plain sense and loses its generality: it now speaks only of one who can concentrate quietly.",
  "ext": { "axis": ["axis/bearer"] }
}
```

```json
{
  "id": "ki-pligi",
  "he": "כי פליגי — בדבר שאין בו סימן.",
  "en": "Where they disagree is over an item with no distinguishing mark.",
  "move": { "element": "statement", "subtype": "presumption", "target": "abaye", "marker": "כי פליגי ב…" },
  "provenance": "derivation",
  "note": "Bava Metzia 21b. The dispute is restricted to unmarked items; each side's statement keeps its words and loses its generality. The shipped file labels the same sentence `statement/explanation`; both readings are defensible, and the difference is whether one holds that the restriction was already implicit (explanation) or is supplied here (presumption).",
  "ext": { "axis": ["axis/attribute"] }
}
```

```json
{
  "id": "ha-mani",
  "he": "הא מני? רבי מאיר היא.",
  "en": "Whose view is this? It is R. Meir's.",
  "move": { "element": "statement", "subtype": "presumption", "target": "baraita-anon", "marker": "הא מני? רבי פלוני היא" },
  "provenance": "derivation",
  "note": "[constructed] The stock form of an אוקימתא that restricts a statement to an opinion-holder rather than to a case: the anonymous baraita is made to speak for one Tanna only."
}
```

### statement/inference — דיוק · diyuk · inference
- he · `שידיק ממאמר אחד או כתוב אחד מה שלא פרש בו`
- means · Asserts what a statement implies but does not say. Rules in §9: necessary vs loose.
- markers · `זאת אומרת` · `שמע מינה` · `מכלל ד…` · `הא … לא` · `טעמא ד… הא …`.
- file · `statement/inference`, `target` = the source of the inference. Effect `open`. `anatomy`: `inference-necessary` or `inference-loose`; for a necessary conversion, also the edge kind (`contrapositive`, `converse`, `converse-limited`); for a partial's הפך, `absolute-opposite`. Full record in `ext.inference`.
- ex · Berachos 20b — `בעל קרי מהרהר בלבו` → `אמר רבינא: זאת אומרת – הרהור כדבור דמי`.
- src · 166

```json
{
  "id": "ravina",
  "speaker": "Ravina",
  "he": "אמר רבינא: זאת אומרת – הרהור כדבור דמי.",
  "en": "Ravina said: this shows that contemplation is like speech.",
  "move": { "element": "statement", "subtype": "inference", "target": "mishnah-baal-keri", "marker": "זאת אומרת" },
  "provenance": "derivation",
  "anatomy": [{ "kind": "inference-loose", "note": "Read off the Mishnah's telling the בעל קרי to contemplate: it invites, but does not compel, the conclusion that contemplation counts as speech. The Gemara goes on to test it." }],
  "ext": { "inference": { "of": "mishnah-baal-keri", "necessary": false } }
}
```

```json
{
  "id": "beitzah-diyuk",
  "he": "לבית הוא דמחייב, אבל לביברין – לא.",
  "en": "To a house he is liable — but to an enclosure, not.",
  "move": { "element": "statement", "subtype": "inference", "target": "yehudah-tzad", "marker": "… הוא ד…, אבל … לא" },
  "provenance": "derivation",
  "anatomy": [{ "kind": "inference-loose", "note": "Betzah 24a on Shabbos 106a `הצד … צבי לבית חייב`: had R. Yehudah meant all trapping he would not have said 'to a house'. Scoped to the alternative the word displaced (an enclosure), and read off the choice of words — so loose." }],
  "ext": { "inference": { "of": "yehudah-tzad", "necessary": false } }
}
```

```json
{
  "id": "chagigah-contra",
  "he": "כל דלא סליק – לא הוה נקי אגב אמיה.",
  "en": "Whoever did not ascend was not pure by his mother's merit.",
  "move": { "element": "statement", "subtype": "inference", "target": "chagigah-a" },
  "provenance": "derivation",
  "anatomy": [
    { "kind": "inference-necessary", "note": "Chagigah 15b: one cannot accept `כל מאן דהוה נקי אגב אמיה סליק` and deny this." },
    { "kind": "contrapositive", "note": "Subject and predicate swapped and both negated; quantity kept." }
  ],
  "ext": { "inference": { "of": "chagigah-a", "kind": "infer/contrapositive", "necessary": true } }
}
```

```json
{
  "id": "t8-pin",
  "short": "where the difficulty bites",
  "he": "בשלמא גזלן וירדן, דקא חזי להו ומיאש. אלא גנב, מי קא חזי ליה דמיאש?",
  "en": "Granted for the robber and the Jordan, whom the owner sees and so despairs; but a thief — does the owner see him, that he should despair?",
  "move": { "element": "statement", "subtype": "inference", "target": "t8-ask", "attested": false },
  "provenance": "derivation",
  "note": "A `דיוק`: it reads out of the baraita which clause actually bears on the dispute. It adds no force of its own."
}
```

### statement/reported — הגדה · haggadah · reported information
- he · `שיגיד אחד מעשה או מאמר זולתו … וכן נכלל במין הזה כשיגיד מחשבת זולתו`
- means · Reports another's deed, statement, or reasoning — including what another *must have* found difficult or answered. Often a carrier for a proof or a difficulty (composites, below): when it is, the move is the proof or the difficulty and the report is recorded as `ext.move.composite`.
- markers · `כך היה מנהגו של …` · `מעשה ב…` · `תו קא קשיא ליה לתנא` · `דתניא / דתנן` when adduced as report rather than as proof · `במערבא … לא שמיע להו` · `אמר ליה … הכי אמר פלוני`.
- file · `statement/reported`, `target` optional (what the aside hangs off). `provenance: tradition` for a reported deed or ruling. `ext.move.reportedOf` names whose view is reported.
- ex · Shabbos 19a — `אמר רבי צדוק: כך היה מנהגו של בית רבן גמליאל`. Bava Kamma 83b — `תו קא קשיא ליה לתנא: מאי חזית דילפת ממכה בהמה – לילף ממכה אדם` (reports the Tanna's own difficulty).
- src · 166–168

```json
{
  "id": "tzadok",
  "speaker": "R. Tzadok",
  "he": "אמר רבי צדוק: כך היה מנהגו של בית רבן גמליאל, שהיו נותנין כלי לבן לכובס שלשה ימים קודם לשבת.",
  "en": "R. Tzadok said: such was the custom of the house of Rabban Gamliel — they would give white garments to the launderer three days before Shabbos.",
  "move": { "element": "statement", "subtype": "reported", "marker": "כך היה מנהגו של" },
  "provenance": "tradition",
  "ext": { "move": { "reportedOf": "the house of Rabban Gamliel" } }
}
```

```json
{
  "id": "t10-story",
  "short": "the orchard of Mari bar Isak",
  "he": "אמימר ומר זוטרא ורב אשי אקלעו לבוסתנא דמרי בר איסק …",
  "en": "Ameimar, Mar Zutra and Rav Ashi came to the orchard of Mari bar Isak. His sharecropper set dates and pomegranates before them; Ameimar and Rav Ashi ate, Mar Zutra did not.",
  "move": { "element": "statement", "subtype": "reported", "target": "t10-revise", "marker": "כך היה מנהגו של", "attested": false },
  "provenance": "tradition"
}
```

```json
{
  "id": "bemaarava",
  "he": "במערבא הא דרבה בר רב שילא לא שמיע להו.",
  "en": "In the West, this teaching of Rabbah bar Rav Shila was not known to them.",
  "move": { "element": "statement", "subtype": "reported", "target": "rabbah-shila" },
  "provenance": "tradition",
  "note": "Berachos 2b. Reports a state of knowledge; hangs off the teaching it says was unknown.",
  "ext": { "move": { "reportedOf": "the sages of Eretz Yisrael" } }
}
```

```json
{
  "id": "mnemonic",
  "short": "mnemonic for the challenges",
  "he": "(סימן פמג״ש ממקגט״י ככסע״ז)",
  "en": "A mnemonic for the series of proofs that follows.",
  "move": { "element": "statement", "subtype": "reported", "target": "scope-core", "attested": false },
  "provenance": "tradition",
  "note": "The Talmud counting its own moves. Fifteen challenges are announced before the first one is made."
}
```

### question/query — שאלה · she'elah · query
- he · `כשישאל שואל על ענין אחד, אם הוא – אם אינו, או על תנאי ממנו, כגון על מקום, או על זמן, או על טעם`
- means · Asks whether something is so, or for a circumstance — place, time, reason — or a rule.
- test · Seeks a fact, reason, or rule → שאלה. Poses two determinate alternatives and asks which → איבעיא. Asks why the *author phrased or ordered* a statement as he did (מאי שנא הכא דתני X ומאי שנא התם דתני Y; ליתני …; וניתני …) → not a query but a פירכא, and what answers it is a תירוץ, not a תשובה. Asks `אמאי?` and then supplies the reason it should not be so → the opening of a contradiction or difficulty, not a question.
- markers · `מאי שנא … ומאי שנא …` (when it asks the reason for a difference in *law*) · `כיצד …?` · `מאי טעמא?` · `מנא הני מילי?` (when the answer will be a proof, the pair is query + demonstration) · `מאי …?` asking a meaning · `במאי קא מיפלגי?`.
- file · `question/query`; `target` only when the question is about an earlier unit (`מאי אור?` about the Mishnah's word). A fresh question has none.
- ex · Yebamos 102a — `כלום אתה בקי ברבי יהודה בן בתירא?` · Berachos 35a — `כיצד מברכין על הפירות?` · Yebamos 112b — `מאי שנא חרש וחרשת דתקינו להו רבנן נשואין, ומאי שנא שוטה ושוטה דלא תקינו להו רבנן נשואין?`
- src · 168–170

```json
{
  "id": "question",
  "speaker": "The Gemara",
  "he": "מאי שנא חרש וחרשת דתקינו להו רבנן נשואין, ומאי שנא דשוטה ושוטה דלא תקינו להו רבנן נשואין?",
  "en": "What is the difference between deaf-mutes, for whom the rabbis ordained that a marriage is valid, and the insane, for whom a marriage is invalid?",
  "move": { "element": "question", "subtype": "query", "marker": "מאי שנא … ומאי שנא", "attested": true },
  "provenance": "asserted"
}
```

```json
{
  "id": "mai-or",
  "he": "מאי אור?",
  "en": "What is 'or'?",
  "move": { "element": "question", "subtype": "query", "target": "mishnah", "marker": "מאי …?" },
  "provenance": "asserted",
  "note": "Pesachim 2a. Asks the meaning of the Mishnah's word; the two answers that follow are `answer/answer`."
}
```

```json
{
  "id": "keitzad",
  "speaker": "Mishnah",
  "he": "כיצד מברכין על הפירות?",
  "en": "How does one recite a blessing over fruit?",
  "move": { "element": "question", "subtype": "query", "marker": "כיצד …?" },
  "provenance": "tradition",
  "note": "Berachos 35a. A query for a rule, in the Mishnah's own mouth."
}
```

```json
{
  "id": "baki",
  "he": "כלום אתה בקי ברבי יהודה בן בתירא?",
  "en": "Are you at all acquainted with R. Yehudah ben Beseira?",
  "move": { "element": "question", "subtype": "query" },
  "provenance": "asserted",
  "note": "Yebamos 102a. A query for a fact; answered `הן!`."
}
```

### question/principle — איבעיא · ibbaya · question of principle
- he · `כשישאל שואל על ענין אחד שיש בו פנים לשני צדדים ויבקש על ההכרעה לאחד מהם`
- means · A two-sided question: both readings are stated and a decision is requested.
- markers · `איבעיא להו` · `בעא מיניה … מהו? … או …` · `… אזלינן או … אזלינן` · `או דלמא …`.
- file · `question/principle`. Its answer is `answer/determination`.
- ex · Yebamos 58b — `בעא מיניה רבי חייא בר יוסף משמואל: כהן גדול שקידש את הקטנה ובגרה תחתיו – מהו? בתר נשואין אזלינן או בתר אירוסין אזלינן?`
- src · 170

```json
{
  "id": "chiya-asks",
  "speaker": "R. Chiya bar Yosef",
  "he": "בעא מיניה רבי חייא בר יוסף משמואל: כהן גדול שקידש את הקטנה ובגרה תחתיו – מהו? בתר נשואין אזלינן או בתר אירוסין אזלינן?",
  "en": "R. Chiya bar Yosef asked Shmuel: a High Priest who betrothed a minor and she matured under him — what is the law? Do we follow the marriage or the betrothal?",
  "move": { "element": "question", "subtype": "principle", "marker": "בעא מנה … מהו? … או … אזלינן" },
  "provenance": "asserted"
}
```

```json
{
  "id": "ibbaya",
  "he": "איבעיא להו: יאוש שלא מדעת.",
  "en": "They inquired: despair that is not conscious — is it despair or not?",
  "move": { "element": "question", "subtype": "principle", "marker": "איבעיא להו" },
  "provenance": "asserted",
  "note": "Bava Metzia 21b. The two sides are implicit in the topic and made explicit by the two Amoraim who answer it."
}
```

```json
{
  "id": "rav-asks",
  "speaker": "Rav",
  "he": "בעא מיניה רב מרבי: הטעינו חבירו אוכלין ומשקין והוציאן לחוץ — מהו? עקירת גופו כעקירת חפץ ממקומו דמי ומיחייב, או דלמא לא?",
  "en": "Rav asked Rebbi: if another loaded him with food and drink and he carried them out — what is the law? Is moving his body like lifting the object from its place, so that he is liable, or perhaps not?",
  "move": { "element": "question", "subtype": "principle", "marker": "בעא מנה … מהו? … או … אזלינן" },
  "provenance": "asserted"
}
```

### answer/answer — תשובה · teshuvah · answer
- he · `שישיב על השאלה כפי מה שהיא … ישיב לו: הן! או לאו! ואם טעם בקש – ישיבהו הטעם`
- means · Responds in the terms asked: yes/no to existence, a reason to "why," a rule to "how."
- rules · Must correspond to the question and be true. Discharges the question.
- file · `answer/answer`, `target` = the query. Effect `discharge`. `provenance: derivation` for a reasoned answer, `asserted` for a bare ruling, `tradition` when the answer is a source.
- ex · Yebamos 102a — `הן!` · Yebamos 112b — `חרש וחרשת דקיימא תקנתא דרבנן – תקינו להו רבנן נשואין, שוטה ושוטה דלא קיימא תקנתא דרבנן – לא תקינו רבנן נשואין`.
- src · 172

```json
{
  "id": "hen",
  "he": "הן!",
  "en": "Yes!",
  "move": { "element": "answer", "subtype": "answer", "target": "baki", "marker": "הן! / לאו!" },
  "provenance": "asserted"
}
```

```json
{
  "id": "answer",
  "speaker": "The Gemara",
  "he": "חרש וחרשת דקימא תקנתא דרבנן – תקינו להו רבנן נשואין, שוטה ושוטה דלא קימא תקנתא דרבנן – לא תקינו רבנן נשואין",
  "en": "Since deaf-mutes are capable of fulfilling rabbinical ordinances, the rabbis validated their marriage. The insane are incapable, so the rabbis did not.",
  "move": { "element": "answer", "subtype": "answer", "target": "question", "attested": true },
  "provenance": "derivation",
  "anatomy": [{ "kind": "consequent", "note": "Since they can keep rabbinic ordinances, the rabbis validated their marriage: this, so that." }]
}
```

```json
[
  {
    "id": "mai-taama",
    "speaker": "Rav",
    "he": "מאי טעמא?",
    "en": "What is the reason?",
    "move": { "element": "question", "subtype": "query", "target": "rebbi-answers", "marker": "מאי טעמא?" },
    "provenance": "asserted"
  },
  {
    "id": "gufo-nayach",
    "speaker": "Rebbi",
    "he": "גופו נייח, ידו לא נייח.",
    "en": "His body is at rest; his hand is not at rest.",
    "move": { "element": "answer", "subtype": "answer", "target": "mai-taama" },
    "provenance": "derivation",
    "anatomy": [{ "kind": "preclusive", "note": "Affirms rest of the body and denies it of the hand." }]
  }
]
```

### answer/determination — פשיטות · peshitut · determination
- he · `שיכריע לאחד משני צדדי האבעיא`
- means · Decides an איבעיא for one side. Same rules as תשובה.
- markers · `פשט … ד…` · `תא שמע` when what follows resolves the איבעיא [supplied]; if it attacks a claim, it is a difficulty · `והדר פשטו לה מ…` · `והלכתא` when it closes an איבעיא [supplied].
- file · `answer/determination`, `target` = the איבעיא. Effect `discharge`.
- ex · Yebamos 58b — Shmuel: `בתר נשואין אזלינן`.
- src · 172–174

```json
{
  "id": "shmuel-decides",
  "speaker": "Shmuel",
  "he": "בתר נשואין אזלינן.",
  "en": "We follow the marriage.",
  "move": { "element": "answer", "subtype": "determination", "target": "chiya-asks" },
  "provenance": "asserted"
}
```

```json
{
  "id": "rebbi-answers",
  "speaker": "Rebbi",
  "he": "אמר ליה: חייב, ואינו דומה לידו.",
  "en": "He said to him: he is liable, and it is not like his hand.",
  "move": { "element": "answer", "subtype": "determination", "target": "rav-asks" },
  "provenance": "asserted",
  "ext": { "axis": ["axis/difference"] }
}
```

```json
{
  "id": "pashtu",
  "he": "והדר פשטו לה מברייתא: מדקתני בברייתא ״סימן לדבר צאת הכוכבים״ — שמע מינה: ביאת שמשו הוא, ומאי ״וטהר״ — טהר יומא.",
  "en": "And then they resolved it from a baraita: since the baraita teaches 'the sign of the matter is the emergence of the stars', infer that it is the setting of his sun, and 'and it is clean' means the day is clear.",
  "move": { "element": "answer", "subtype": "determination", "target": "ibbaya-shemesh", "marker": "פשט … ד" },
  "provenance": "tradition",
  "note": "Berachos 2b. A determination whose authority is a baraita: the unit's own provenance is tradition."
}
```

```json
{
  "id": "acha-a3",
  "speaker": "Rav Ashi",
  "short": "forbidden",
  "he": "אמר ליה: אסירן",
  "en": "He said to him: they are forbidden.",
  "move": { "element": "answer", "subtype": "determination", "target": "acha-q3", "marker": "פשט … ד", "attested": false },
  "provenance": "derivation"
}
```

### proof/demonstration — הוכחה · hochachah · demonstration
- he · `שיביא ראיה להוכיח אמתת מאמר שנאמר`
- means · Brings evidence that establishes a stated claim by the laws of proof (§11): from nature, from convention, or by syllogism. A proof from סברא counts but is weaker (p176).
- test · Argues *to* the truth of the claim → הוכחה. Merely cites an agreeing source → סייעתא.
- markers · `תדע, שהרי …` · `מנא הני מילי? … דתנו רבנן` · `שנאמר` · `דאמר מר` · `דכתיב` · `מדקאמר … שמע מינה` · `גמר … מ…`.
- file · `proof/demonstration`, `target` = the claim proved. Effect `raise`: the target becomes accepted (defeasibly). `provenance`: `tradition` when the proof is a verse or source, `derivation` when it is reasoning. `anatomy`: the syllogism kind (edge-level). Premises in `ext.warrant.premises`. A report carrying the proof: `ext.move.composite: "ascribed-proof"`.
- ex · Pesachim 16a — `רבי אלעזר אומר: אין טומאה למשקין כל עיקר! תדע, שהרי העיד יוסי בן יועזר איש צרידה על איל קמצא דכן ועל משקין בית מטבחיא דכן`.
- src · 174–176

```json
{
  "id": "testimony",
  "speaker": "R. Eleazar",
  "he": "תדע, שהרי העיד יוסי בן יועזר איש צרידה על איל קמצא דכן ועל משקין בית מטבחיא דכן",
  "en": "Know this, for Yosi ben Yo'ezer of Zeredah testified that the ayil locust is clean and that the liquids of the Temple slaughterhouse are clean.",
  "move": { "element": "proof", "subtype": "demonstration", "target": "eleazar", "marker": "תדע, שהרי", "attested": true },
  "provenance": "tradition",
  "anatomy": [{ "kind": "hypothetical-syllogism-tollens", "note": "If liquids could become unclean by Torah law, the liquids of the Temple slaughterhouse would be unclean; Yosi ben Yo'ezer testified they are clean; so they cannot." }],
  "ext": {
    "move": { "composite": "ascribed-proof", "reportedOf": "Yosi ben Yo'ezer" },
    "warrant": { "premises": [
      { "text": "if liquids were unclean by Torah law, the Temple slaughterhouse liquids would be unclean", "provenance": "derivation" },
      { "text": "Yosi ben Yo'ezer testified that they are clean", "provenance": "tradition" }
    ] }
  }
}
```

```json
{
  "id": "av-kodem",
  "he": "דאמר מר: אב קודם לכל יוצאי ירכו.",
  "en": "For the master said: a father precedes all his descendants.",
  "move": { "element": "proof", "subtype": "demonstration", "target": "nichsei-av", "marker": "דאמר מר" },
  "provenance": "tradition",
  "anatomy": [{ "kind": "classical-syllogism", "note": "Yebamos 40a: the received rule of precedence, applied to this estate." }]
}
```

```json
{
  "id": "isaiah",
  "he": "שנאמר: ״ועמך כלם צדיקים לעולם יירשו ארץ״.",
  "en": "As it is said: \"and your people are all righteous; they shall inherit the land forever.\"",
  "move": { "element": "proof", "subtype": "demonstration", "target": "kol-yisrael", "marker": "שנאמר" },
  "provenance": "tradition",
  "note": "Sanhedrin 90a, proving `כל ישראל יש להם חלק לעולם הבא` from Isaiah 60:21."
}
```

```json
{
  "id": "kicha",
  "he": "גמר ״קיחה״ ״קיחה״ משדה עפרון: כתיב הכא ״כי יקח איש אשה״, וכתיב התם ״נתתי כסף השדה קח ממני״.",
  "en": "It is learned from 'taking' in the field of Ephron: here it is written 'when a man takes a wife', and there 'I have given the money of the field, take it from me'.",
  "move": { "element": "proof", "subtype": "demonstration", "target": "kesef-question", "marker": "גמר … מ…" },
  "provenance": "tradition",
  "anatomy": [{ "kind": "analogism", "basis": "marked", "note": "Kiddushin 2a. A גזירה שווה: the shared word licenses carrying 'acquired with money' from Ephron's field to betrothal." }],
  "ext": { "axis": ["axis/similarity"] }
}
```

The query + demonstration pair, with Ramchal's own marker for the pair (Heb p175): the question asks for the source, the baraita is the proof of the ruling asked about — not an `answer/answer`, because what comes back is a proof, and the ruling is what it raises.

```json
[
  {
    "id": "mishnah-etz",
    "speaker": "Mishnah",
    "he": "על פירות האילן אומר: בורא פרי העץ.",
    "en": "Over fruit of the tree one says: who creates the fruit of the tree.",
    "move": { "element": "statement", "subtype": "firsthand" },
    "provenance": "tradition"
  },
  {
    "id": "mnhm",
    "he": "מנא הני מילי?",
    "en": "From where are these words?",
    "move": { "element": "question", "subtype": "query", "target": "mishnah-etz", "marker": "מנא הני מלי? … דתנו רבנן" },
    "provenance": "asserted",
    "note": "Berachos 35a. Asks for the source of the Mishnah's rule; what follows is a proof, so the pair is query + demonstration and the marker spans both."
  },
  {
    "id": "detanu",
    "he": "דתנו רבנן: ״קדש הלולים״ — מלמד שטעונים ברכה לפניהם ולאחריהם.",
    "en": "For our rabbis taught: 'holy, for praises' — this teaches that they require a blessing before and after.",
    "move": { "element": "proof", "subtype": "demonstration", "target": "mishnah-etz", "marker": "מנא הני מלי? … דתנו רבנן" },
    "provenance": "tradition",
    "anatomy": [{ "kind": "syllogism", "note": "A derivation from the verse's wording (הלולים read as two praises) that fits no more specific kind." }]
  }
]
```

### proof/validation — סייעתא · siyata · validation / support
- he · `שיובא מאמר אחד שיסכים למאמר אחר לחזק הדעה שנאמרה בו`
- means · Adduces a source that agrees with the claim. Raises it; same rules as הוכחה; defeasible like any proof.
- markers · `תניא כוותיה ד…` · `תניא נמי הכי` · `מסייע ליה` · `כדתניא` · `הכי נמי מסתברא` [supplied].
- file · `proof/validation`, `target` = the claim supported. Effect `raise`. `provenance: tradition` when the source is a baraita or verse.
- ex · Yebamos 102b — `תניא כוותיה דרבא! חלצה במנעל הנפרם, שחופה את רוב הרגל – חליצתה כשרה`.
- src · 176

```json
{
  "id": "kevaseih",
  "he": "תניא כוותיה דרבא! חלצה במנעל הנפרם, שחופה את רוב הרגל – חליצתה כשרה.",
  "en": "It was taught in accordance with Rava: if she performed chalitzah with a torn shoe that covers most of the foot, her chalitzah is valid.",
  "move": { "element": "proof", "subtype": "validation", "target": "rava-shoe", "marker": "תניא כותה ד" },
  "provenance": "tradition"
}
```

```json
{
  "id": "kidetanya",
  "he": "כדתניא: ״ובא השמש וטהר״ — ביאת שמשו מעכבתו מלאכול בתרומה, ואין כפרתו מעכבתו מלאכול בתרומה.",
  "en": "As it was taught: 'and the sun sets and he is clean' — the setting of his sun bars him from eating terumah, and his atonement does not bar him from eating terumah.",
  "move": { "element": "proof", "subtype": "validation", "target": "kapparah", "marker": "כדתניא" },
  "provenance": "tradition",
  "anatomy": [{ "kind": "preclusive", "note": "The baraita affirms one bar and denies the other." }],
  "note": "Berachos 2b. A baraita adduced as agreeing with the point just made (`דכפרה לא מעכבא`)."
}
```

```json
{
  "id": "t10-support",
  "short": "so it stands to reason",
  "he": "הכי נמי מסתברא … והא ״אתם״ ״גם אתם״ אמר רחמנא לרבות שלוחכם",
  "en": "So too it stands to reason: were he not an agent, would his teruma be teruma? The verse says \"you also\", including your agent.",
  "move": { "element": "proof", "subtype": "validation", "target": "t10-ans", "marker": "תניא כותה ד", "attested": false },
  "provenance": "tradition",
  "anatomy": [{ "kind": "syllogism", "note": "From `אתם` and `גם אתם` to the agent: a derivation from Scripture that fits no more specific kind." }]
}
```

### contradiction/direct — סתירה · setirah · direct contradiction
- he · `שיסתר מאמר שנאמר או ראיה שהובאת ויראה היותם מבטלים`
- means · Nullifies a statement or a proof by the laws of disproof (§11): a source, a sense report, an axiom, or a valid syllogism showing it false. Target → rejected.
- test · Shows falsity → סתירה. Removes only necessity, by an alternative → דחיה. Shows formal unfitness → פירכא. Sets two sources against each other → רומיא.
- markers · `ואלא הא ד…` · `והא … !` · `לא סלקא דעתך, דהא …` · `מיתיבי` when the cited source refutes rather than merely troubles · `והא אנן תנן` · `והא קא חזינן` · `אמאי? … !` when the reason given shows the claim false.
- file · `contradiction/direct`, `target` = the claim or proof shown false. Effect `reject`. `provenance`: `tradition` when a source does the work, `sense` when perception does, `derivation` when reasoning does. `anatomy`: the syllogism kind when it reasons; the relation (`contradictory`, `diametrically-opposed`) it alleges. Disproof kind in `ext.warrant.kind` when it is `disproof/indirect`, `reductio` or `dilemma`.
- ex · Pesachim 17b — Rav Papa: `אפילו למאן דאמר טומאת משקין דאורייתא – משקי בית מטבחיא הלכתא גמירי לה`; Rav Huna b. R. Nathan: `ואלא הא דאמר רבי אלעזר אין טומאה למשקין כל עיקר, תדע שהרי העיד … ואי הלכתא גמירי לה – מי גמרינן מינה?` — `סתר שמועתו של רב פפא לחלוטין`.
- src · 178

```json
{
  "id": "ravhuna",
  "speaker": "Rav Huna b. Rav Nassan",
  "he": "ואלא הא דאמר רבי אלעזר אין טמאה למשקין כל עקר … ואי הלכתא גמירי לה – מי גמרינן מנה",
  "en": "But R. Eleazar concluded that liquids have no uncleanness at all precisely from Yosi ben Yo'ezer's testimony. If that is a halachah from Sinai, could we derive anything from it?",
  "move": { "element": "contradiction", "subtype": "direct", "target": "ravpapa", "attested": true },
  "provenance": "derivation",
  "anatomy": [{ "kind": "hypothetical-syllogism-tollens", "note": "If the Temple liquids were a halachah from Sinai, nothing could be derived from them; R. Eleazar did derive from them; so they are not." }],
  "note": "Ramchal: `הנה כאן סתר שמועתו של רב פפא לחלוטין` — Rav Papa's statement is absolutely contradicted (Heb p177)."
}
```

```json
{
  "id": "chazinan",
  "he": "והא קא חזינן דעבר!",
  "en": "But we see that it does pass!",
  "move": { "element": "contradiction", "subtype": "direct", "target": "gemiri", "marker": "והא קא חזינן" },
  "provenance": "sense",
  "note": "Berachos 58b, against `גמירי דלא עבר כסלא`: a disproof from the senses."
}
```

```json
{
  "id": "amai",
  "he": "אמאי? מצות עשה שהזמן גרמא הוא, וכל מצות עשה שהזמן גרמא נשים פטורות!",
  "en": "Why? It is a positive time-bound commandment, and women are exempt from every positive time-bound commandment!",
  "move": { "element": "contradiction", "subtype": "direct", "target": "ruling", "marker": "אמאי? … !" },
  "provenance": "tradition",
  "anatomy": [{ "kind": "classical-syllogism", "note": "Subject down: kiddush is a time-bound positive commandment; women are exempt from all of those; so women are exempt from kiddush." }],
  "ext": { "warrant": { "kind": "disproof/indirect", "premises": [
    { "text": "kiddush is a positive time-bound commandment", "provenance": "endoxa" },
    { "text": "women are exempt from every positive time-bound commandment", "provenance": "tradition" }
  ] } }
}
```

```json
{
  "id": "tnan-cheresh",
  "he": "והא אנן תנן: חוץ מחרש שוטה וקטן!",
  "en": "But we have learned in the Mishnah: except a deaf-mute, an imbecile and a minor!",
  "move": { "element": "contradiction", "subtype": "direct", "target": "lerabos-ketanim", "marker": "והא אנן תנן" },
  "provenance": "tradition",
  "anatomy": [{ "kind": "contradictory", "note": "Chagigah 4a. The Mishnah denies of minors what `כל זכורך – לרבות את הקטנים` affirms of all." }]
}
```

### contradiction/opposition — דחיה · dechiyah · opposition / deflection
- he · `שידחה הכרח המאמר, אך לא יבטל ענינו לגמרי, ולא תכחש אפשרותו`
- means · Removes the *necessity* of a claim or of a proof's conclusion by showing another reading is possible. The target is not shown false; it drops from established to possible → doubt, never rejected. The alternative must have `מקום בנושא` — be a live possibility for this subject; a far-fetched one fails and the target stands on סברא (p180).
- test · Attacker offers an alternative reading → דחיה. Attacker shows falsity → סתירה. Same act aimed at a קושיא rather than at a claim or proof → שינוי. A flat dispute between two authorities (Abaye/Rava) is modelled as דחיה when the file should show each leaving the other merely possible.
- markers · `מאי לאו? … לאו!` · `ודלמא …` · `ואימא …` · `דלמא שאני התם` · `לא, …` · `וממאי ד…? דלמא …`.
- file · `contradiction/opposition`, `target` = the claim or proof deflected. Effect `unsettle`. All five rebuttal kinds are דחיות of a proof or disproof; the kind goes in `ext.warrant.kind`.
- ex · The book gives the stock forms only; see שינוי for the sibling instance (Yebamos 104b).
- src · 178–180

```json
{
  "id": "ravpapa",
  "speaker": "Rav Papa",
  "he": "אפלו למאן דאמר טמאת משקין דאוריתא – משקי בית מטבחיא הלכתא גמירי לה",
  "en": "Even according to the one who holds that liquid uncleanness is Torah law, the liquids of the Temple slaughterhouse are a halachah handed down from Sinai.",
  "move": { "element": "contradiction", "subtype": "opposition", "target": "testimony", "attested": false },
  "provenance": "asserted",
  "anatomy": [{ "kind": "differs-in-context", "note": "The testimony speaks of a special halachah handed down from Sinai, not of liquid uncleanness in general — a different respect, so it proves nothing about the general case." }],
  "note": "Ramchal labels only Rav Huna's reply. `דחיה` is inferred here, on the rule at Heb p185 that a `דחיה` may land on a proof that was brought, not only on a statement.",
  "ext": { "warrant": { "kind": "rebuttal/irrelevant" } }
}
```

```json
{
  "id": "rava",
  "speaker": "Rava",
  "short": "Rava: despair",
  "he": "ורבא אמר: הוי יאוש",
  "en": "And Rava said: it is considered despair, and the finder may keep it.",
  "move": { "element": "contradiction", "subtype": "opposition", "target": "abaye", "attested": false },
  "provenance": "asserted",
  "anatomy": [{ "kind": "diametrically-opposed", "note": "Same subject, same respect, yes against no." }],
  "note": "A dispute modelled as `דחיה`: Rava does not refute Abaye, he holds otherwise, so each leaves the other merely possible."
}
```

```json
{
  "id": "dilma",
  "he": "וממאי דהאי ״ובא השמש״ — ביאת השמש, והאי ״וטהר״ — טהר יומא? דילמא ביאת אורו הוא, ומאי ״וטהר״ — טהר גברא!",
  "en": "And how do you know that 'and the sun comes' means the setting of the sun and 'and it is clean' means the day is clear? Perhaps it means the coming of its light, and 'and he is clean' means the man is clean!",
  "move": { "element": "contradiction", "subtype": "opposition", "target": "kidetanya", "marker": "ודלמא? / ואימא?" },
  "provenance": "derivation",
  "note": "Berachos 2b. Another reading of the verse is possible, so the baraita's reading is not necessary — the proof drops to doubt, it is not refuted."
}
```

```json
{
  "id": "ziveih",
  "he": "זיוה הוא דעבר.",
  "en": "It is its glow that passes.",
  "move": { "element": "contradiction", "subtype": "opposition", "target": "chazinan" },
  "provenance": "derivation",
  "note": "Berachos 58b. The sense report is reinterpreted: what is seen crossing is the glow, not the star. A rebuttal of a disproof; the disproof returns to doubt, the original claim is not thereby proved.",
  "ext": { "warrant": { "kind": "rebuttal/irrelevant" } }
}
```

Ramchal's first stock form (Heb p177): `כשאמרו "מאי לאו?" השיבו "לאו!" … הנה הוא סימן דחיה`. The proposer reads a source as proving a point (`מאי לאו …?`); the answer denies that it does (`לאו!`) and offers another reading. The marker spans both; it goes on the דחיה, whose leaf it announces:

```json
[
  {
    "id": "mai-lav",
    "he": "מאי לאו — רבי מאיר היא, דאמר: חוששין למיעוטא?",
    "en": "Is it not R. Meir's view, who says we take the minority into account?",
    "move": { "element": "proof", "subtype": "demonstration", "target": "chosheshin" },
    "provenance": "tradition",
    "note": "[constructed] A baraita is read as R. Meir's, to prove that the rule before us follows his minority principle."
  },
  {
    "id": "lav",
    "he": "לאו! דכולי עלמא — לא חוששין למיעוטא, והכא משום חזקה הוא.",
    "en": "No! All agree we do not take the minority into account; here it is because of a presumption.",
    "move": { "element": "contradiction", "subtype": "opposition", "target": "mai-lav", "marker": "מאי לאו? … לאו!" },
    "provenance": "derivation",
    "anatomy": [{ "kind": "differs-in-context", "note": "The baraita rests on a presumption, not on the minority principle: it does not bear on the point." }],
    "note": "[constructed] The stock form. The proof drops to doubt; the claim it was brought for is not refuted, only left unproven.",
    "ext": { "warrant": { "kind": "rebuttal/irrelevant" } }
  }
]
```

### difficulty/objection — פירכא · pircha · objection
- he · `כשימצא בסדר המאמר או הגדתו דבר בלתי נאות`
- means · Finds something unfitting in the *form* of a statement — its order, its necessity, its consistency, its redundancy — not in its truth. The stylistic objections of §11 are its instances. In Talmudic practice the leaf also covers the `תא שמע` challenge from a source that the Gemara goes on to answer.
- markers · `הא גופא קשיא!` · `מאי קא משמע לן?` · `היינו הך` · `הא תו למה לי?` · `פשיטא!` · `וליפלוג … ברישא!` · `תנא היכא קאי?` · `ליתני …!` / `וניתני …!` · `מאי שנא הכא דתני … ומאי שנא התם דתני …` (a question about wording is a פירכא, not a שאלה) · `תא שמע` [supplied] · `אי הכי` [supplied] · `למה לי?`.
- file · `difficulty/objection`, `target` = the statement whose form is faulted, or the claim the source is set against. Effect `unsettle`. The style rule violated goes in `ext.warrant.kind`. For a `תא שמע` from a Mishnah: `provenance: tradition`, `anatomy: contradictory` (a particular against a categorical).
- ex · Yebamos 117b — `שנים אומרים: מת, ועד אומר: לא מת – מאי קא משמע לן? … היינו הך` · Yebamos 118a — `וליפלוג רבי מאיר ברישא!`
- src · 180–182

```json
{
  "id": "haynu-hach",
  "he": "שנים אומרים: מת, ועד אומר: לא מת – מאי קא משמע לן? … היינו הך!",
  "en": "Two say he died and one says he did not — what is this teaching us? It is the very same case as before!",
  "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah-edim", "marker": "מאי קא משמע לן?" },
  "provenance": "derivation",
  "anatomy": [{ "kind": "equivalent", "note": "Yebamos 117b: the clause objected to says what an earlier clause already said." }],
  "ext": { "warrant": { "kind": "style/redundant" } }
}
```

```json
{
  "id": "liflog",
  "he": "וליפלוג רבי מאיר ברישא!",
  "en": "Then let R. Meir dispute in the first clause too!",
  "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah-meir", "marker": "ולפלג … ברישא!" },
  "provenance": "derivation",
  "ext": { "warrant": { "kind": "style/order-inconsistent" } }
}
```

```json
{
  "id": "t1-ask",
  "short": "scattered produce",
  "he": "תא שמע: פירות מפוזרין, הא לא ידע דנפל מיניה!",
  "en": "Come and hear: if one found scattered produce, it belongs to him. Why — is the owner not unaware that it fell from him?",
  "move": { "element": "difficulty", "subtype": "objection", "target": "abaye", "marker": "תא שמע", "attested": false },
  "provenance": "tradition",
  "anatomy": [{ "kind": "contradictory" }]
}
```

```json
{
  "id": "mai-shna-haca",
  "he": "מאי שנא הכא דתני ״האשה נקנית״, ומאי שנא התם דתני ״האיש מקדש״?",
  "en": "Why does it teach here 'the woman is acquired' and there 'the man betroths'?",
  "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah-kiddushin", "marker": "מאי שנא הכא דתני … ומאי שנא התם דתני …" },
  "provenance": "derivation",
  "note": "Kiddushin 2a. A question about the author's wording is a פירכא, not a שאלה: the reading is agreed, the choice of words is faulted.",
  "ext": { "warrant": { "kind": "style/order-inconsistent" } }
}
```

```json
{
  "id": "peshita",
  "he": "פשיטא!",
  "en": "That is obvious!",
  "move": { "element": "difficulty", "subtype": "objection", "target": "a1", "marker": "פשיטא!" },
  "provenance": "derivation",
  "ext": { "warrant": { "kind": "style/obvious" } }
}
```

### difficulty/apparentContradiction — רומיא · rumya · apparent contradiction
- he · `כשיובאו שני מאמרים, או שני כתובים הפכיים או מתנגדים, לבקש ישובם`
- means · Sets two statements or verses that appear opposed (§10) against each other and seeks reconciliation. Both remain in play; neither is yet rejected.
- markers · `ורמינהו` · `רמי … כתיב … וכתיב …` · `והא תניא / והא תנן` when a second source is set against the first · `מאי טעמא? לאו משום ד…?` when a source's reason is set against a claim [supplied].
- file · `difficulty/apparentContradiction`, `target` = the first of the two sources (or the claim the source is set against). Effect `unsettle`. `anatomy`: the relation alleged (`diametrically-opposed`, `contradictory`). When the second source is a unit of the file, `ext.relation.to` names it.
- ex · Yebamos 120b — `ורמינהו: אדם אינו מטמא עד שתצא נפשו, אפילו מגוייד, ואפילו גוסס` · Berachos 4a — `רבי יעקב בר אידי רמי, כתיב "והנה אנכי עמך ושמרתיך", וכתיב "ויירא יעקב מאד"`.
- src · 182–184

```json
{
  "id": "rami",
  "speaker": "R. Yaakov bar Idi",
  "he": "רבי יעקב בר אידי רמי, כתיב … וכתיב",
  "en": "He raised a contradiction: it is written thus, and it is also written thus.",
  "move": { "element": "difficulty", "subtype": "apparentContradiction", "target": "promise", "marker": "… רמי, כתיב … וכתיב", "attested": true },
  "provenance": "derivation",
  "anatomy": [{ "kind": "diametrically-opposed", "note": "Protected everywhere against very much afraid: as posed, a head-on clash." }],
  "ext": { "relation": { "to": "fear", "kind": "diametrically-opposed" } }
}
```

```json
{
  "id": "t11-rami",
  "speaker": "Rav Pappa",
  "short": "written one way, read another",
  "he": "דרב פפא רמי, כתיב ״כי יתן״, וקרינן ״כי יותן״! הא כיצד?",
  "en": "For Rav Pappa raised a contradiction: it is written \"when one places\", and we read it \"when it is placed\". How so?",
  "move": { "element": "difficulty", "subtype": "apparentContradiction", "target": "t11-ans2", "marker": "… רמי, כתיב … וכתיב", "attested": false },
  "provenance": "tradition",
  "anatomy": [{ "kind": "diametrically-opposed", "note": "Written one way, read another: a head-on clash between two forms of one verse." }]
}
```

```json
{
  "id": "baraita",
  "speaker": "The Gemara",
  "he": "חרש שנחלץ וחרשת שחלצה – חליצתה פסולה, מאי טעמא? לאו משום דלאו בני קריה נינהו?",
  "en": "We have learned that chalitzah is invalid for a deaf-mute man or woman. What is the reason? Is it not because they are not capable of speech?",
  "move": { "element": "difficulty", "subtype": "apparentContradiction", "target": "rava", "attested": true },
  "provenance": "tradition",
  "anatomy": [{ "kind": "inference-loose", "note": "The reason read out of the baraita — because they cannot speak — is suggested by the ruling but not forced by it, which is what the alternative that follows exploits." }]
}
```

Ramchal's other marker for the leaf (Heb p181), in the lexicon's spelling `ורמינהי` — two baraitos set against each other:

```json
[
  {
    "id": "meidin-meguyad",
    "he": "מעידין על המגוייד.",
    "en": "One may testify to the death of a man who was seen cut through.",
    "move": { "element": "statement", "subtype": "firsthand" },
    "provenance": "tradition",
    "note": "Yebamos 120b: a man seen מגוייד is treated as dead for the purpose of testimony."
  },
  {
    "id": "urminhi",
    "he": "ורמינהו: אדם אינו מטמא עד שתצא נפשו, אפילו מגוייד, ואפילו גוסס!",
    "en": "And they set against it: a man does not convey impurity until his soul departs — even if cut through, even if dying!",
    "move": { "element": "difficulty", "subtype": "apparentContradiction", "target": "meidin-meguyad", "marker": "ורמינהי" },
    "provenance": "tradition",
    "anatomy": [{ "kind": "contradictory", "note": "For testimony he is dead; for impurity he is alive: the same subject, opposed predicates — as posed." }],
    "note": "Yebamos 120b, Ramchal's example at Heb p181. Both sources stand; the reconciliation that follows (he will die of it, but has not yet) is a יישוב by `differs-in-time`.",
    "ext": { "axis": ["axis/time"] }
  }
]
```

### difficulty/refutation — תיובתא · teyuvta · refutation
- book · Named as the third difficulty (p180) but never defined.
- [supplied] · In Talmudic usage, a difficulty from an authoritative source (Mishnah, baraita) that the Gemara declares decisive — `תיובתא דרבא, תיובתא`. Treat as a difficulty whose landing is conclusive: target → rejected. When only `תיובתא` is said, the refuting source is the immediately preceding `תא שמע` / `מיתיבי`.
- test · Label by outcome, not by opening word. `מיתיבי` / `תא שמע` only *introduce* a source-based attack; it is a תיובתא only if the Gemara closes it with `תיובתא`. An attack that is then answered was a סתירה attempt (source shows falsity) or a רומיא (sources set against each other for reconciliation), and its answer is a דחיה, שינוי, or יישוב by the usual tests.
- markers · `תיובתא ד… תיובתא` · `תיובתא` (closing).
- file · `difficulty/refutation`, `target` = the refuted claim. **The file's effect is `unsettle`, a placeholder** (`taxonomy.ts`, `UNDEFINED_IN_SOURCE`): the leaf alone leaves its target merely weakened. Until the format adopts the `[supplied]` effect, carry the verdict on the attack itself: record the source-based attack that the stamp closes as `contradiction/direct` (effect `reject`) and the `תיובתא` line as a separate `difficulty/refutation` unit on the same target, with the closing word as `marker`. The shipped Bava Metzia file does exactly this and says so in `note`.
- src · 180, 184

```json
[
  {
    "id": "t12-dumya",
    "short": "the prohibition resembles the permission",
    "he": "ואיסורא דומיא דהיתירא: מה היתירא בין דאית בה סימן ובין דלית בה סימן — שריא, אף איסורא בין דאית בה סימן ובין דלית בה סימן — אסירא",
    "en": "And the prohibition resembles the permission: just as the permission holds whether or not there is a distinguishing mark, so the prohibition holds whether or not there is one — until it is known that the owner despaired.",
    "move": { "element": "contradiction", "subtype": "direct", "target": "rava", "attested": false },
    "provenance": "derivation",
    "anatomy": [
      { "kind": "analogism", "basis": "marked", "note": "`מה היתירא … אף איסורא`: the rule is carried from the permitted case to the prohibited one by likeness, and that is what refutes Rava." },
      { "kind": "comparative", "basis": "marked" }
    ],
    "note": "`סתירה` rather than `דחיה`: the Gemara stamps it `תיובתא` and never reopens it, which is Ramchal's own test at Heb p177 for a contradiction that lands absolutely."
  },
  {
    "id": "t12-tiyuvta",
    "short": "a conclusive refutation",
    "he": "תיובתא דרבא, תיובתא!",
    "en": "The refutation of Rava is indeed a conclusive refutation.",
    "move": { "element": "difficulty", "subtype": "refutation", "target": "rava", "marker": "תיובתא ד… תיובתא", "attested": false },
    "provenance": "derivation",
    "note": "The leaf Ramchal announces at p180 and never defines. Its placeholder effect `unsettle` contributes nothing here: the verdict on Rava comes entirely from the `סתירה` before it. If `תיובתא` were the only move on the last line, this file would end with Rava merely weakened, which is not what the Talmud says."
  }
]
```

A `תיובתא` that stamps a `תא שמע` (the shape when the attack and the stamp are one sentence — split them):

```json
[
  {
    "id": "ts-final",
    "he": "תא שמע: … הא סתמא — לא!",
    "en": "Come and hear: … but where nothing was said, it is not his!",
    "move": { "element": "contradiction", "subtype": "direct", "target": "rava", "marker": "תא שמע" },
    "provenance": "tradition",
    "anatomy": [{ "kind": "contradictory" }],
    "note": "[constructed] Recorded as a סתירה because the next unit stamps it conclusive."
  },
  {
    "id": "ts-stamp",
    "he": "תיובתא.",
    "en": "It is a refutation.",
    "move": { "element": "difficulty", "subtype": "refutation", "target": "rava", "marker": "תיובתא" },
    "provenance": "derivation",
    "note": "[constructed] The Talmud naming the move. The naming word is the marker; `attested` stays false because Ramchal did not label this passage."
  }
]
```

### resolution/settlement — יישוב · yishuv · settlement
- he · `כשתתרץ הפרכא או הרמיא בישוב נכון ואמתי, שיאמין בו המתרץ היות זה אמתת הדבר`
- means · Resolves the difficulty with an account the resolver holds true. Rules: true in itself, and consistent with the statement it defends. The difficulty is discharged; the defended claim recovers.
- test · Resolver asserts the resolution as the truth → יישוב. Resolver only shows the difficulty need not follow → שינוי.
- markers · `הכא במאי עסקינן` and `שאני התם` when they land on a difficulty · `מהו דתימא … קא משמע לן` (answering פשיטא) · `הא קא משמע לן` · `חדא קתני` · `לא זו אף זו קתני` · `מה הן קתני` · `מלתא אגב אורחיה קמשמע לן` · `אמרי: …`.
- file · `resolution/settlement`, `target` = the difficulty. Effect `discharge`: the difficulty stops exerting force and the claim it attacked recovers its prior status. `provenance: derivation`, or `tradition` when the settlement is a source (`שאני התם דכתיב …`). `anatomy`: the dissolving test (`differs-in-context`, `differs-in-time`, …) when the settlement distinguishes.
- ex · Berachos 4a — R. Yaakov b. Idi to his own רומיא: `אמר, שמא יגרום החטא`.
- src · 184

```json
{
  "id": "sin",
  "speaker": "R. Yaakov bar Idi",
  "he": "אמר, שמא יגרם החטא",
  "en": "He said: Yaakov thought that perhaps sin may have some bearing on the promise.",
  "move": { "element": "resolution", "subtype": "settlement", "target": "rami", "attested": true },
  "provenance": "derivation",
  "anatomy": [
    { "kind": "differs-in-context", "note": "The promise holds in the respect of merit; the fear is about sin having intervened. Not the same respect, so no clash." },
    { "kind": "qualified-possible", "note": "`שמא`: said as possible, not as certain." }
  ],
  "note": "A `ישוב`: the one who offers it believes it is true, so it fully discharges the difficulty."
}
```

```json
{
  "id": "t1-ans",
  "speaker": "Rav Ukva bar Ḥama",
  "short": "kernels left on the threshing floor",
  "he": "הא אמר רב עוקבא בר חמא: הכא במכנשתא דבי דרי עסקינן, דאבידה מדעת היא",
  "en": "Did Rav Ukva bar Ḥama not say: we are dealing with kernels left during the gathering on the threshing floor? That is a deliberate loss, so the despair is conscious.",
  "move": { "element": "resolution", "subtype": "settlement", "target": "t1-ask", "marker": "הכא במאי עסקינן", "attested": false },
  "provenance": "derivation",
  "anatomy": [{ "kind": "differs-in-context" }]
}
```

```json
{
  "id": "a3",
  "he": "מהו דתימא: כיון שכיון בתחלה — אף על גב שלא כיון בסוף, יצא; קא משמע לן: צריך כוונה בכולן.",
  "en": "You might have said: since he concentrated at the start, even if he did not at the end he has fulfilled it; it teaches us that concentration is needed throughout.",
  "move": { "element": "resolution", "subtype": "settlement", "target": "peshita", "marker": "מהו דתימא … קא משמע לן" },
  "provenance": "derivation",
  "note": "[constructed] The stock answer to `פשיטא`: a reason one might have thought otherwise, which the statement excludes (p156, סלקא דעתך)."
}
```

```json
{
  "id": "mah-hen",
  "speaker": "R. Abbahu",
  "he": "אמר רבי אבהו: ״מה הן״ קתני: מה הן דיני ממונות? גזילות וחבלות.",
  "en": "R. Abbahu said: it teaches 'what are they' — what are cases of monetary law? Robbery and injury.",
  "move": { "element": "resolution", "subtype": "settlement", "target": "atu", "marker": "מה הן קתני" },
  "provenance": "derivation",
  "note": "Sanhedrin 2b. The redundancy objection is answered by making the second clause an elucidation of the first; go back and set `ext.form.elucidationOf: \"1a\"` on the second clause (§9, elucidation)."
}
```

### resolution/alternative — שינוי · shinui · alternative / deflecting answer
- he · `כשתתרץ הקשיא … במה שאין הכונה בו למתרץ בהחלט שתהיה כן אמתת הדבר, אלא שתדחה הקשיא. והנה זה דומה לדחיה באמת, אלא שהדחיה תהיה על מאמר שהנח או ראיה שהובאת, והשנוי – דחיה על קשיא`
- means · Removes a difficulty by a possible reading, without claiming it is the truth — a דחיה aimed at a קושיא. The difficulty is weakened; the defended claim stays possible but unproven (doubt).
- rules · Must be compatible with the defended statement, even at the cost of some strangeness or of saying the author spoke loosely; the more that must be assumed, the more forced (דחוק); past what the words bear, it is refused (p186–188).
- markers · `לא! משום ד…` · `לא, …` · `לא צריכא …` · `שאני התם …` · `הכא במאי עסקינן` when used to deflect a difficulty rather than to explain · `ואיבעית אימא` (a second answer offered beside the first) [supplied].
- file · `resolution/alternative`, `target` = the difficulty. Effect `unsettle`: the difficulty is weakened, and a weakened difficulty still holds its target in doubt.
- ex · Yebamos 104b — objection to Rava: `חרש שנחלץ וחרשת שחלצה – חליצתה פסולה, מאי טעמא? לאו משום דלאו בני קרייה נינהו?` → `לא! משום דלאו בני דעה נינהו`.
- src · 186–188

```json
{
  "id": "shinuy",
  "speaker": "The Gemara",
  "he": "לא! משום דלאו בני דעה נינהו",
  "en": "No! It is because they lack the power of understanding.",
  "move": { "element": "resolution", "subtype": "alternative", "target": "baraita", "marker": "לא! משום ד", "attested": true },
  "provenance": "derivation",
  "anatomy": [
    { "kind": "differs-in-context", "note": "The baraita is about understanding, Rava about speech: two respects, so no clash." },
    { "kind": "preclusive", "note": "Not this, but rather that: not speech, but understanding." }
  ],
  "note": "A `שנוי`: it defends Rava without asserting that this is the truth, so Rava ends merely possible."
}
```

```json
{
  "id": "t9-ans2",
  "short": "able to save them only with difficulty",
  "he": "הכא במאי עסקינן? ביכולין להציל על ידי הדחק",
  "en": "With what are we dealing? A case where they could rescue them only with difficulty: pursuing shows they did not despair, not pursuing shows they did.",
  "move": { "element": "resolution", "subtype": "alternative", "target": "t9-press", "marker": "הכא במאי עסקינן", "attested": false },
  "provenance": "derivation",
  "anatomy": [{ "kind": "differs-in-context" }],
  "note": "Read as `שנוי` rather than `ישוב`: this is a second narrowing, offered to save the first one after it failed, and the Gemara does not return to defend it. So the difficulty is left weakened rather than closed — which is exactly the difference Ramchal draws at Heb p185."
}
```

```json
{
  "id": "ibaeis-eima",
  "he": "ואיבעית אימא: אי תנא ״קונה״, הוה אמינא אפילו בעל כרחה; תנא ״האשה נקנית״ — דמדעתה אין, שלא מדעתה לא.",
  "en": "And if you wish, say: had it taught 'acquires', I would have thought even against her will; it teaches 'the woman is acquired' — with her consent yes, without it no.",
  "move": { "element": "resolution", "subtype": "alternative", "target": "veniteni", "marker": "ואיבעית אימא" },
  "provenance": "derivation",
  "anatomy": [{ "kind": "inference-loose", "note": "Kiddushin 2b. The lesson is read off the passive form — a choice of words, so retractable." }],
  "note": "A second answer set beside the first without displacing it; neither is asserted as the truth. Marker supplied."
}
```

### Composites (Ch 10, p214–218)

**composite/ascribed-proof** — `הוכחה והגדה` · a proof carried by reported information: "as R. X said / did …" adduced to prove a claim. The move is the proof; the report is `ext.move.composite: "ascribed-proof"` and `ext.move.reportedOf`. A later attack may deny that the report proves the claim (report intact), attack the report itself (claim intact), or grant the proof and still fault the report's wording.

**composite/ascribed-difficulty** — `קושיא מגדת` · a speaker reports the difficulty another *must have* felt; the speaker may not endorse it. The move is `statement/reported` (the speaker reports) or the difficulty (when the speaker also presses it); `ext.move.composite: "ascribed-difficulty"`. A later objection may say the author could not have meant this (attacks the ascription), or that it is no difficulty (attacks the difficulty), or both — without engaging the original claim's truth.
- ex · Bava Kamma 83b — `ומאי "אם נפשך לומר"?` → `תו קא קשיא ליה לתנא: מאי חזית דילפת ממכה בהמה, לילף ממכה אדם` (ascribed difficulty) → `אמרי: דנין ניזקין מניזקין ואין דנין ניזקין ממיתה` (objection to the ascription: the Tanna had an obvious answer, so this cannot have been his difficulty).

```json
[
  {
    "id": "im-nafshecha",
    "he": "ומאי ״אם נפשך לומר״?",
    "en": "And what is 'if you wish to say'?",
    "move": { "element": "question", "subtype": "query", "target": "baraita-ayin" },
    "provenance": "asserted"
  },
  {
    "id": "tu-kashya",
    "he": "תו קא קשיא ליה לתנא: מאי חזית דילפת ממכה בהמה, לילף ממכה אדם!",
    "en": "The Tanna had a further difficulty: why do you learn from one who strikes an animal — learn from one who strikes a man!",
    "move": { "element": "statement", "subtype": "reported", "target": "im-nafshecha", "marker": "תו קא קשיא ליה לתנא" },
    "provenance": "derivation",
    "note": "The Gemara reports the difficulty the Tanna must have felt. The reporter's voice and the reported difficulty are kept apart: the move is a report, the carried difficulty is in ext.",
    "ext": { "move": { "composite": "ascribed-difficulty", "reportedOf": "the Tanna of the baraita" } }
  },
  {
    "id": "danin",
    "he": "אמרי: דנין ניזקין מניזקין ואין דנין ניזקין ממיתה.",
    "en": "They say: we derive damages from damages and do not derive damages from death.",
    "move": { "element": "difficulty", "subtype": "objection", "target": "tu-kashya" },
    "provenance": "derivation",
    "note": "Attacks the ascription: the Tanna had an obvious answer, so this cannot have been his difficulty. The original claim is untouched."
  }
]
```

```json
{
  "id": "heleni",
  "speaker": "R. Yehudah",
  "he": "אמר רבי יהודה: מעשה בהילני המלכה בלוד, שהיתה סוכתה גבוהה מעשרים אמה, והיו זקנים נכנסין ויוצאין לשם ולא אמרו לה דבר.",
  "en": "R. Yehudah said: it happened that Queen Heleni's sukkah in Lod was higher than twenty cubits, and the elders went in and out of it and said nothing to her.",
  "move": { "element": "proof", "subtype": "demonstration", "target": "yehudah", "marker": "מעשה ב…" },
  "provenance": "tradition",
  "anatomy": [{ "kind": "syllogism", "note": "The elders' silence is treated as a ruling." }],
  "ext": { "move": { "composite": "ascribed-proof", "reportedOf": "the elders in Lod" } }
}
```

```json
{
  "id": "blackstone",
  "speaker": "C",
  "en": "Blackstone must have found this passage difficult — how can a rule bind those who never saw it? — and that is why he adds his gloss on notice.",
  "move": { "element": "statement", "subtype": "reported", "target": "passage" },
  "provenance": "derivation",
  "ext": { "move": { "composite": "ascribed-difficulty", "reportedOf": "Blackstone" } }
}
```

### Label attacks by outcome — the `מיתיבי` decision

One opening phrase, three possible leaves, decided by what follows (Pesachim 2a, `מאי אור`):

```json
[
  {
    "id": "meisivi-1",
    "he": "מיתיבי: ״הבקר אור והאנשים שלחו״ — אלמא אור יממא הוא!",
    "en": "They objected: 'the morning was light and the men were sent off' — so 'or' is daytime!",
    "move": { "element": "contradiction", "subtype": "direct", "target": "kasalka", "marker": "מיתיבי" },
    "provenance": "tradition",
    "note": "Recorded as a סתירה attempt: the verse is brought to show the assumed reading false. It is answered in the next unit, so it does not land; had the Gemara closed it with תיובתא it would be difficulty/refutation, and had it merely set two sources side by side for reconciliation, difficulty/apparentContradiction."
  },
  {
    "id": "mi-kesiv-1",
    "he": "מי כתיב ״האור בקר״? ״הבקר אור״ כתיב — כמאן דאמר: צפרא נהר.",
    "en": "Is it written 'the light was morning'? 'The morning was light' is written — as one says, 'the morning has brightened'.",
    "move": { "element": "contradiction", "subtype": "opposition", "target": "meisivi-1", "marker": "מי כתיב …? … כתיב" },
    "provenance": "derivation",
    "note": "The verse is reread so that it no longer bears on the claim: a דחיה of the disproof, rebuttal/irrelevant. The disproof returns to doubt; the assumed reading is not thereby proved.",
    "ext": { "warrant": { "kind": "rebuttal/irrelevant" } }
  }
]
```

---

## §9 · Layer B — Form of a single proposition

Layer B labels are **row-level** `anatomy` kinds: they describe the sentence alone and may go on any unit, with or without a target. The normalized proposition itself — subject, predicate, parts — has no home yet and goes in `ext.form`.

### Subject and predicate (Ch 3, p22)
- he · `כל מאמר … אי אפשר שלא יהיה נבנה משני חלקים, דהינו: מענין שיקים או ישלל, ומדבר שבו יקים הענין ההוא או ישלל ממנו`
The thing affirmed or denied is the **נשוא** (predicate); that of which it is affirmed or denied is the **נושא** (subject).
- ex · Berachos 20b `נשים חייבות בקידוש היום` — S = נשים, P = חיוב קידוש היום.
Predicates are unary; relational content is packed into the predicate term. Quantifiers do not nest.
- file · pending — `ext.form: { subject, predicate, normalized }`.

```json
{
  "id": "kol-yisrael",
  "speaker": "Mishnah",
  "he": "כל ישראל יש להם חלק לעולם הבא.",
  "en": "All Israel have a share in the world to come.",
  "move": { "element": "statement", "subtype": "firsthand" },
  "provenance": "tradition",
  "anatomy": [{ "kind": "categorical", "basis": "marked", "note": "`כל`." }, { "kind": "simple" }],
  "ext": { "form": { "normalized": "every Israelite has a share in the world to come", "subject": "ישראל (every one)", "predicate": "יש לו חלק לעולם הבא" } }
}
```

```json
{
  "id": "yerushalayim",
  "he": "ירושלים אינה מטמאה בנגעים.",
  "en": "Jerusalem does not become impure through leprous marks.",
  "move": { "element": "statement", "subtype": "firsthand" },
  "provenance": "tradition",
  "anatomy": [{ "kind": "particular" }, { "kind": "simple" }],
  "ext": { "form": { "normalized": "Jerusalem lacks susceptibility to leprous impurity", "subject": "ירושלים", "predicate": "אינה מטמאה בנגעים" }, "axis": ["axis/place"] }
}
```

### Normalization (Ch 3, p42–46; Ch 10, p192)
- he · `אל תשת לבך אל דרך הדבור אלא אל המאמר המכון בו. ואם תראה הדבור קצר – תשלימהו במחשבתך, ואם תראהו ארך – תסיר ממנו את המותר` (p41) · `תצירהו בשכלך על הצורה הישרה, שהיא: הנושא פלוני יש בו ענין פלוני` (p191)
Surface forms vary — long or short, plain, rhetorical, figurative; the intended proposition is always S + P + manner. Supply elided parts, strip ornament, render questions and exclamations as assertions. A rhetorical question is an assertion.
- ex · Pesachim 7b, on why the circumcision blessing is על המילה: `התם היכי נימא? נימא "למול" – לא סגיא דלאו איהו מהיל` → (i) *the mohel can only bless* על המילה — `exclusion`; (ii) *because he is not necessarily the one who must circumcise, he cannot say* למול — `consequent`. `אבי הבן מאי איכא למימר?` → *the father must say* למול, *not* על המילה — `preclusive`. `אין הכי נמי` → *the father says* למול — `simple`.

```json
[
  {
    "id": "mohel",
    "he": "התם היכי נימא? נימא ״למול״ – לא סגיא דלאו איהו מהיל?",
    "en": "There, what could he say? Should he say 'to circumcise' — is it necessarily he who must circumcise?",
    "move": { "element": "statement", "subtype": "explanation", "target": "al-hamilah" },
    "provenance": "derivation",
    "anatomy": [{ "kind": "exclusion", "note": "Normalized: the mohel can bless only על המילה." }],
    "ext": { "form": { "normalized": "the mohel's only available blessing is על המילה", "subject": "the mohel's blessing", "predicate": "is על המילה and nothing else" } }
  },
  {
    "id": "avi-haben",
    "he": "אבי הבן מאי איכא למימר?",
    "en": "As for the father of the child — what is there to say?",
    "move": { "element": "difficulty", "subtype": "objection", "target": "mohel" },
    "provenance": "derivation",
    "anatomy": [{ "kind": "preclusive", "note": "A rhetorical question, normalized to an assertion: the father must say למול, not על המילה." }],
    "ext": { "form": { "normalized": "the father must bless למול and not על המילה", "subject": "the father's blessing", "predicate": "is למול, not על המילה" } }
  },
  {
    "id": "in-hachi-nami",
    "he": "אין הכי נמי.",
    "en": "Indeed so.",
    "move": { "element": "answer", "subtype": "answer", "target": "avi-haben" },
    "provenance": "derivation",
    "anatomy": [{ "kind": "simple", "note": "Normalized: the father says למול." }],
    "ext": { "form": { "normalized": "the father blesses למול", "subject": "the father's blessing", "predicate": "is למול" } }
  }
]
```

### Quantity of the subject (p22–26)
- **categorical** כולל — the subject is a whole class; P holds of every member. A single member that goes the other way is enough to trouble it.
- **particular** פרטי — the subject is one individual. Not partial; nothing follows from it about the class.
- **partial** קצתי — some of a class. Says nothing about the rest — and, by Ch 5, implies that some are otherwise (`absolute-opposite`).
- **unqualified** סתמי — no quantifier; `כחו ככח המאמר הכולל` — read as categorical. The commonest form in the Mishnah; a difficulty from a single case lands on it as on a categorical.
- markers · `כל` → categorical (basis `marked`) · `יש`, `רוב`, `קצת` → partial (marked) · a proper name or `זה` → particular · none → unqualified.
- file · `anatomy[].kind` ∈ `categorical` `particular` `partial` `unqualified`.

```json
[
  { "id": "b1", "he": "כל המשנה — ידו על התחתונה", "en": "Whoever deviates is at a disadvantage.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "categorical", "basis": "marked", "note": "`כל`." }, { "kind": "simple" }] },
  { "id": "eleazar", "speaker": "R. Eleazar", "he": "אין טמאה למשקין כל עקר", "en": "Liquids cannot become unclean at all according to Torah law.", "move": { "element": "statement", "subtype": "firsthand", "attested": true }, "provenance": "asserted", "anatomy": [{ "kind": "categorical", "basis": "marked", "note": "`כל עקר`: no uncleanness for liquids at all — the whole class, denied." }] }
]
```

```json
[
  { "id": "fear", "speaker": "Genesis 32:8", "he": "ויירא יעקב מאד", "en": "And Yaakov was very much afraid.", "move": { "element": "statement", "subtype": "firsthand", "attested": true }, "provenance": "tradition", "anatomy": [{ "kind": "particular" }] },
  { "id": "f8", "he": "משה קבל תורה מסיני.", "en": "Moshe received the Torah from Sinai.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "particular", "note": "One individual; not partial." }] }
]
```

```json
[
  { "id": "mutaros", "he": "יש מותרות לבעליהן ואסורות ליבמיהן.", "en": "There are women permitted to their husbands and forbidden to their brothers-in-law.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "partial", "basis": "marked", "note": "`יש`: some, not all (Yebamos 84a)." }, { "kind": "compound" }] },
  { "id": "b9", "he": "רוב מצויין אצל שחיטה — מומחין הן", "en": "Most of those found at slaughtering are experts.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "partial", "basis": "marked", "note": "`רוב`: a part of the class, unspecified." }, { "kind": "simple" }] },
  { "id": "t6-ask", "short": "gleanings after the nemushot", "he": "תא שמע: מאימתי כל אדם מותרים בלקט? משילכו בה הנמושות … נהי דעניים דהכא מיאשי, איכא עניים בדוכתא אחריתא דלא מיאשי!", "en": "Come and hear: from when may anyone collect gleanings? Once the nemushot have passed through the field. Granted the poor here despair, there are poor elsewhere who do not.", "move": { "element": "difficulty", "subtype": "objection", "target": "abaye", "marker": "תא שמע", "attested": false }, "provenance": "tradition", "anatomy": [{ "kind": "contradictory" }, { "kind": "partial", "note": "Some of the poor despair and some do not: the objection is built on a partial statement." }] }
]
```

```json
[
  { "id": "rava", "speaker": "Rava", "en": "Chalitzah may be performed by a mute man or woman, since only their power of speech is impaired.", "move": { "element": "statement", "subtype": "firsthand", "attested": true }, "provenance": "asserted", "anatomy": [{ "kind": "unqualified", "note": "No quantity stated: any mute, with the force of a categorical." }] },
  { "id": "or", "speaker": "Mishnah", "he": "אור לארבעה עשר בודקין את החמץ לאור הנר.", "en": "On the eve of the fourteenth one searches for leaven by the light of a lamp.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "unqualified" }, { "kind": "simple" }], "ext": { "axis": ["axis/time"] } }
]
```

### Manner of predication (p26–40) with truth conditions (p78–90)
- he (Ch 6) · `צריך שתתדקדק בכל מאמר שיהיה, לדעת סוף גזרתו, שבה תהיה תלויה אמתת המאמר או כזבו` — each type has an *ultimate intention* (סוף גזרה); the statement is true iff that intention holds. Where a type has several intentions, one may fail while the others stand — which is why a difficulty can land on one part of an exception or a conditional and leave the rest standing.
- file · `anatomy[].kind`, one of the seventeen predication kinds. A statement gets exactly one manner (a compound counts as one), plus its quantity. Parts go in `ext.form.parts`.

#### 1 · simple — סתם
- means · P said of S with no condition or limit. Intention: P is (or is not) in S.
- ex · `נשים חייבות בקידוש היום`.

```json
[
  { "id": "abaye", "speaker": "Abaye", "he": "יאוש שלא מדעת, אביי אמר: לא הוי יאוש", "en": "Despair that is not conscious is not despair.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "asserted", "anatomy": [{ "kind": "unqualified" }, { "kind": "simple", "note": "Subject, predicate, nothing more: one thing to be true or false." }] },
  { "id": "c1", "speaker": "Rav", "he": "רב אמר: אסור.", "en": "Rav said: it is forbidden.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "asserted", "anatomy": [{ "kind": "simple" }] }
]
```

#### 2 · qualified — מיוחד ומוגבל · certain / possible / doubtful / impossible
- means · P said of S in a definite mode: certainty or necessity (`ודאי`), possibility (`אפשר`), doubt (`ספק`), impossibility (`לא אפשר`). Intention: P in S *in that mode*. P in S in a different mode → false: `אלו לא היה ודאי שיגררוהו, אפלו יארע כן פעמים רבות, לא היה המאמר צודק`.
- keys · qualified-certain · qualified-possible · qualified-doubtful · qualified-impossible. The mode is *how the statement speaks*, not the sugya's verdict on it.
- markers · `ודאי` · `אפשר` / `שמא` / `דלמא` · `ספק` · `לא אפשר` / `אי אפשר` — all `basis: marked`.
- ex · Pesachim 9b `כיון דחולדה וברדלס מצויין שם – ודאי גררוהו` · Kesubos 75a `אפשר לעברה בקיוהא דחמרא` · Pesachim 113a `כל אשראי – ספק אתי ספק לא אתי` · Kesubos 75a `גבי אשה לא אפשר`.
- note · Shares the word מוגבל with type 5; distinguished by ordinal and definition.

```json
[
  { "id": "gararuhu", "he": "כיון דחולדה וברדלס מצויין שם – ודאי גררוהו.", "en": "Since a marten and a polecat are found there, they certainly dragged it away.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "derivation", "anatomy": [{ "kind": "qualified-certain", "basis": "marked", "note": "`ודאי`: were it merely likely, the statement would be false even if it happened often (p78)." }] },
  { "id": "f6", "he": "טבע במים שיש להם סוף ולא עלה — ודאי מת.", "en": "One who sank in water with a visible boundary and did not come up is certainly dead.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "qualified-certain", "basis": "marked" }] }
]
```

```json
[
  { "id": "kiyuha", "he": "אפשר לעברה בקיוהא דחמרא.", "en": "It can be removed with the sourness of wine.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "asserted", "anatomy": [{ "kind": "qualified-possible", "basis": "marked", "note": "`אפשר`: claims less than certainty, and a case that goes the other way does not touch it." }] },
  { "id": "b10a", "speaker": "R. Yosi HaGelili", "he": "אפשר לצמצם.", "en": "It is possible to be exact.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "asserted", "anatomy": [{ "kind": "qualified-possible", "basis": "marked" }] },
  { "id": "sin", "speaker": "R. Yaakov bar Idi", "he": "אמר, שמא יגרם החטא", "en": "He said: perhaps sin may have some bearing on the promise.", "move": { "element": "resolution", "subtype": "settlement", "target": "rami", "attested": true }, "provenance": "derivation", "anatomy": [{ "kind": "differs-in-context" }, { "kind": "qualified-possible", "note": "`שמא`: said as possible, not as certain." }] }
]
```

```json
[
  { "id": "ashrai", "he": "כל אשראי – ספק אתי ספק לא אתי.", "en": "Every credit sale — it is doubtful whether the money will come or not.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "endoxa", "anatomy": [{ "kind": "categorical", "basis": "marked" }, { "kind": "qualified-doubtful", "basis": "marked", "note": "`ספק … ספק`: the predicate is held in doubt; the speaker does not know which way it goes." }] },
  { "id": "f7", "he": "טבע במים שאין להם סוף — ספק מת, ספק לא מת.", "en": "One who sank in water with no visible boundary — perhaps he died, perhaps he did not.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "qualified-doubtful", "basis": "marked" }] }
]
```

```json
[
  { "id": "lo-efshar", "he": "גבי אשה לא אפשר.", "en": "With a woman it is impossible.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "asserted", "anatomy": [{ "kind": "qualified-impossible", "basis": "marked", "note": "The strongest denial; how the statement itself speaks, not a verdict on it." }] },
  { "id": "b10b", "speaker": "Chachamim", "he": "אי אפשר לצמצם.", "en": "It is impossible to be exact.", "move": { "element": "statement", "subtype": "firsthand", "target": "b10a" }, "provenance": "asserted", "anatomy": [{ "kind": "qualified-impossible", "basis": "marked" }, { "kind": "diametrically-opposed", "note": "Possible against impossible on one subject: yes against no." }] }
]
```

#### 3 · exclusion — ממעט
- means · P said of S and denied of everything else. Intention: P in S *alone*; P also elsewhere → false. The extra claim — that the others are excluded — is what a counter-case can be brought against.
- markers · `לבדו` · restrictive `אלא` · `אין … אלא …` · `בלבד`.
- ex · Exodus 12:16 `הוא לבדו יעשה לכם`.

```json
[
  { "id": "levado", "speaker": "Exodus 12:16", "he": "הוא לבדו יעשה לכם.", "en": "That alone may be done for you.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "exclusion", "basis": "marked", "note": "`לבדו`: this, alone, and no other." }] },
  { "id": "b6", "he": "אין לו לדיין אלא מה שעיניו רואות.", "en": "A judge has only what his eyes see.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "exclusion", "basis": "marked", "note": "`אין … אלא`." }] },
  { "id": "t10-story-a", "speaker": "Rava", "he": "הכי אמר רבא: לא אמרו ״כלך אצל יפות״ אלא לענין תרומה בלבד", "en": "Thus said Rava: they said 'go to the better ones' only regarding teruma.", "move": { "element": "resolution", "subtype": "settlement", "target": "t10-story-q" }, "provenance": "derivation", "anatomy": [{ "kind": "exclusion", "basis": "marked", "note": "`לא … אלא … בלבד`: the rule is confined to teruma and denied everywhere else." }] }
]
```

#### 4 · exception — מוציא
- means · Removes P from some members of S. **Two intentions:** (a) P in S generally; (b) the excepted members, though in S, lack P. If P turns out to hold of the exceptions, only (b) is false; (a) stands.
- markers · `חוץ מ…` · exceptive `אלא ש…` · `יצא …` / `יצתה זו` (a derivation's exclusion).
- ex · Chullin 2a `הכל שוחטין ושחיטתן כשרה – חוץ מחרש שוטה וקטן`.

```json
[
  { "id": "shochtin", "speaker": "Mishnah", "he": "הכל שוחטין ושחיטתן כשרה – חוץ מחרש שוטה וקטן.", "en": "All may slaughter and their slaughter is valid — except a deaf-mute, an imbecile and a minor.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "categorical", "basis": "marked", "note": "`הכל`." }, { "kind": "exception", "basis": "marked", "note": "`חוץ מ`: two intentions — the rule, and the carved-out piece." }], "ext": { "form": { "parts": ["all may slaughter and it is valid", "a deaf-mute, imbecile and minor may not"] } } },
  { "id": "f11", "he": "כל הכלים ניטלין בשבת — חוץ מן המסר הגדול ויתד של מחרישה.", "en": "All vessels may be moved on Shabbos, except the large saw and the ploughshare.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "categorical", "basis": "marked" }, { "kind": "exception", "basis": "marked" }] },
  { "id": "t12-ask", "speaker": "R. Yoḥanan", "he": "תא שמע דאמר רבי יוחנן משום רבי ישמעאל בן יהוצדק: מנין לאבידה ששטפה נהר שהיא מותרת? … מי שאבודה הימנו ומצויה אצל כל אדם, יצאתה זו שאבודה ממנו ואינה מצויה אצל כל אדם", "en": "Come and hear: from where do we know that an item swept off by a river is permitted? 'Which shall be lost from him, and you have found it' — that which is lost to him but available to any man; excluding this, which is lost to him and available to no one.", "move": { "element": "difficulty", "subtype": "objection", "target": "rava", "marker": "תא שמע", "attested": false }, "provenance": "tradition", "anatomy": [{ "kind": "contradictory" }, { "kind": "exception", "note": "Every lost item that is available to anyone — excluding this one, which is available to no one." }] }
]
```

#### 5 · conditional — מוגבל
- means · P said of S under a stipulation or in one respect. **Two intentions:** (a) the base predication; (b) the condition. A false condition leaves (a) true.
- markers · `ובלבד ש…` · `על מנת ש…` · `בתנאי ש…`.
- ex · Yebamos 38a `כנסה, הרי היא כאשתו לכל דבר – ובלבד שתהא כתובתה על נכסי בעלה הראשון` · Demai 1:2 `ומחללים אותו כסף על כסף … ובלבד שיחזור ויפדה את הפירות`.

```json
[
  { "id": "kenasah", "he": "כנסה, הרי היא כאשתו לכל דבר – ובלבד שתהא כתובתה על נכסי בעלה הראשון.", "en": "If he married her, she is as his wife in every respect — provided that her marriage settlement is a lien on her first husband's property.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "conditional", "basis": "marked", "note": "`ובלבד ש`: the main claim and the condition; a difficulty against the condition leaves the main claim standing." }], "ext": { "form": { "parts": ["she is as his wife in every respect", "her kesubah is on the first husband's property"] } } },
  { "id": "f1", "he": "יוצאין בקב הקיטע — ובלבד שלא יצא בו לרשות הרבים.", "en": "One may go out with an amputee's wooden leg — provided that he does not go out with it into the public domain.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "conditional", "basis": "marked" }], "ext": { "axis": ["axis/place"] } },
  { "id": "f2", "he": "המקדש את האשה על מנת שאין עליה נדרים — הרי זו מקודשת.", "en": "One who betroths a woman on condition that she has no vows upon her — she is betrothed.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "conditional", "basis": "marked", "note": "`על מנת ש`." }] }
]
```

#### 6 · hypothetical — תלוי
- means · Makes the existence of one matter depend on another. Parts: **antecedent** הקודם (the conditioning clause), **consequent** הנמשך. **One intention only — the dependency.** Both parts true but not dependent → false (`אם משה קבל את התורה – שאול הוא המלך הראשון`). Both parts false but genuinely dependent → true. Not material implication.
- markers · `אם … (אז) …` · `אי …, …`.
- ex · Demai 4:4 `ואם היו כהן או עני למודים לאכול אצלו – יבואו ויאכלו` · Sukkah 53a `אם אתה תבוא אל ביתי – אני אבוא אל ביתך` · Sanhedrin 91a `אם אתה עושה כן – רופא אומן תקרא` (antecedent false, consequent false, statement true) · I Kings 18:21 `ואם הבעל – לכו אחריו` (same).

```json
[
  { "id": "sukkah53", "he": "אם אתה תבוא אל ביתי – אני אבוא אל ביתך.", "en": "If you come to My house, I will come to your house.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "hypothetical", "basis": "marked", "note": "`אם`: neither clause asserted; only that the second depends on the first." }], "ext": { "form": { "parts": ["you come to My house", "I come to your house"] } } },
  { "id": "b3", "he": "אם אין קמח — אין תורה.", "en": "If there is no flour, there is no Torah.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "endoxa", "anatomy": [{ "kind": "hypothetical", "basis": "marked" }] },
  { "id": "rofe", "he": "אם אתה עושה כן – רופא אומן תקרא.", "en": "If you do so, you will be called a skilled physician.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "hypothetical", "basis": "marked", "note": "Sanhedrin 91a: antecedent false, consequent false, statement true — the dependency holds." }] }
]
```

#### 7 · compound — מרבה הענינים
- means · Several predicates of one subject, or one predicate of several subjects.

**7a · simple compound** (`compound`) — the predicates hold together, or one predicate of all the subjects. Intention: *all* hold; one failing falsifies the whole.
- equal (`בהשואה אחת`) — the parts are equally novel. ex · Kil'ayim 8:1 `כלאי הכרם אסורין מלזרוע ומלקיים ואסורין בהנאה` · Terumos 1:7 `אין תורמין לא במדה ולא במשקל ולא במנין` · Demai 6:1 `המקבל שדה מישראל, מן הנכרי ומן הכותי – יחלק לפניהם`.
- unequal, known first then novel — `compound-not-only` · **לא זו אף זו**. ex · Ma'aser Sheni 1:2 `הבכור מוכרין אותו: תמים – חי, ובעל מום – חי ושחוט` — alive is expected; slaughtered is the novelty.
- unequal, novel first then known — `compound-needless` · **זו ואין צריך לומר זו**. ex · Kil'ayim 8:1 `ומותרין באכילה וכל שכן בהנאה`.
- markers · `ו… ו…` · `לא … ולא …` · `אף` / `ואפילו` → not-only · `ואין צריך לומר` / `וכל שכן` → needless. The Gemara's `לא זו אף זו קתני` and `זו ואין צריך לומר זו קתני` are resolutions that assign the order.

```json
[
  { "id": "kerem", "he": "כלאי הכרם אסורין מלזרוע ומלקיים ואסורין בהנאה.", "en": "Mixed seeds of the vineyard are forbidden to sow, to maintain, and to benefit from.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "compound", "basis": "marked", "note": "Three predicates of one subject, equally novel; all must hold." }], "ext": { "form": { "parts": ["forbidden to sow", "forbidden to maintain", "forbidden to benefit from"] } } },
  { "id": "terumos", "he": "אין תורמין לא במדה ולא במשקל ולא במנין.", "en": "One does not separate terumah by measure, by weight, or by count.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "compound", "basis": "marked" }] },
  { "id": "t8-ask", "short": "the thief who passed it on", "he": "תא שמע: הגנב שנטל מזה ונתן לזה … מה שנטל נטל ומה שנתן נתן", "en": "Come and hear: a thief who took from this one and gave to that one, and likewise a robber, and likewise the Jordan — what he took he took and what he gave he gave.", "move": { "element": "difficulty", "subtype": "objection", "target": "abaye", "marker": "תא שמע", "attested": false }, "provenance": "tradition", "anatomy": [{ "kind": "contradictory" }, { "kind": "compound", "note": "Three subjects joined: the thief, the robber, and the Jordan." }] }
]
```

```json
[
  { "id": "bechor", "he": "הבכור מוכרין אותו: תמים – חי, ובעל מום – חי ושחוט.", "en": "A firstborn may be sold: unblemished — alive; blemished — alive or slaughtered.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "compound-not-only", "note": "Alive is expected; slaughtered is the novelty, and comes second: לא זו אף זו." }] },
  { "id": "f4", "he": "כותבין תפילין על עור בהמה טהורה — ואף על עור נבלתה.", "en": "Tefillin may be written on the hide of a clean animal — and even on the hide of its carcass.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "compound-not-only", "basis": "marked", "note": "`ואף`: not only this, but even that." }] }
]
```

```json
[
  { "id": "kilayim-kal", "he": "כלאי זרעים … אסורין מלזרוע ומלקיים ומותרין באכילה וכל שכן בהנאה.", "en": "Mixed seeds are forbidden to sow and to maintain, and permitted to eat — and all the more to benefit from.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "compound-needless", "basis": "marked", "note": "`וכל שכן`: the surprising case (eating) first, then the obvious one (benefit)." }] },
  { "id": "f5", "he": "הגר — מותר לישא ישראלית, ואין צריך לומר גיורת.", "en": "A convert may marry an Israelite woman, and needless to say a convert woman.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "compound-needless", "basis": "marked", "note": "`ואין צריך לומר`." }] }
]
```

**7b · disjunction** (`disjunction`) — מחלק · the subject is suspended between predicates, exactly one to hold. Intention: the alternatives are as stated; if one option is unavailable the disjunction is false — `אם האמת היה שחולץ ולא מיבם, הנה המאמר היה בלתי צודק`. Whether ruling out one branch proves the other depends on whether the terms have a middle (`no-middle` / `has-middle`, §10). Western · unlike the truth-functional "or", which is true as soon as any one disjunct is true, this disjunction is false when any listed alternative is not a live option — every branch is asserted to be genuinely open, exactly one to be realized.
- markers · `או … או …` · `ספק … ספק …`.
- ex · Yebamos 112b `או חולץ או מיבם`.

```json
[
  { "id": "cholez", "he": "או חולץ או מיבם.", "en": "He either performs chalitzah or consummates the levirate marriage.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "disjunction", "basis": "marked", "note": "`או … או`: both options must be live, or the statement is false (p86)." }, { "kind": "no-middle", "note": "Chalitzah or yibbum exhaust the levir's options here." }] },
  { "id": "dilemma", "speaker": "B", "en": "Then either charitable pledges are contracts that lack consideration, or they are not contracts at all. You cannot have it both ways.", "move": { "element": "difficulty", "subtype": "objection", "target": "estoppel" }, "provenance": "derivation", "anatomy": [{ "kind": "disjunction" }, { "kind": "no-middle", "note": "Contract or not a contract: nothing between." }], "ext": { "warrant": { "kind": "disproof/dilemma" } } }
]
```

#### 8 · preclusive — שלילה (one predicate affirmed, another denied)
- means · Affirms P₁ of S while denying P₂; or affirms P of S₁ while denying it of S₂. Intention: the affirmation and the denial both. Ramchal gives it no Hebrew name.
- markers · `לא … אלא …` · `… ולא …` · `לא …, אבל …`.
- ex · Terumos 11:5 `לא יאבד את השאר אלא יניחנו במקום מוצנע`.

```json
[
  { "id": "shear", "he": "לא יאבד את השאר אלא יניחנו במקום מוצנע.", "en": "He shall not destroy the remainder, but shall put it away in a hidden place.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "preclusive", "basis": "marked", "note": "`לא … אלא`: denies one predicate and puts another in its place." }] },
  { "id": "b7", "he": "לא תלמד לעשות, אבל אתה למד להבין ולהורות.", "en": "You shall not learn in order to do, but you may learn in order to understand and to teach.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "preclusive", "basis": "marked" }] },
  { "id": "gufo-nayach", "speaker": "Rebbi", "he": "גופו נייח, ידו לא נייח.", "en": "His body is at rest; his hand is not at rest.", "move": { "element": "answer", "subtype": "answer", "target": "mai-taama" }, "provenance": "derivation", "anatomy": [{ "kind": "preclusive", "note": "One predicate affirmed of one subject and denied of another." }] }
]
```

#### 9 · discrepancy — מכחיש
- means · Affirms P of S together with another predicate that *seems* to contradict it, asserting there is no real conflict. Intention: both predications and their compatibility. The concession tells you which objection the speaker has already seen.
- markers · `אף על פי ש…` · `אף על גב ד…` (Aramaic) · `אפילו …` · `ואף על גב ד… שרי / חייב`.
- ex · Ma'aseros 5:8 `אף על פי שאביהן תרומה – הרי אלו יאכלו`.

```json
[
  { "id": "avihen", "he": "אף על פי שאביהן תרומה – הרי אלו יאכלו.", "en": "Even though their father-plant is terumah, these may be eaten.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "discrepancy", "basis": "marked", "note": "`אף על פי ש`: affirmed against an expectation." }] },
  { "id": "b4", "he": "אף על פי שחטא — ישראל הוא.", "en": "Even though he sinned, he is an Israelite.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "discrepancy", "basis": "marked" }] },
  { "id": "scope-zuto", "short": "the tide of the sea", "he": "בזוטו של ים ובשלוליתו של נהר, אף על גב דאית ביה סימן, רחמנא שרייה", "en": "An item swept off by the tide of the sea or by a flooding river the Merciful One permits, even where it has a distinguishing mark.", "move": { "element": "statement", "subtype": "reported", "target": "scope-siman", "attested": false }, "provenance": "tradition", "anatomy": [{ "kind": "discrepancy", "basis": "marked", "note": "`אף על גב ד` is the Aramaic of Ramchal's `אף על פי ש`: permitted, even though it has a mark." }] }
]
```

#### 10 · comparative — מדמה
- means · Asserts of an unknown case what holds of a known one by equating them. The known is always the base; the unknown is equated to it. Intention: the equated predications, all as stated. Used to derive, it becomes the analogism of §11.
- markers · `כשם ש… כך …` · `הרי הוא כ…` · `דומיא ד…` · `מה … אף …`.
- ex · Demai 6:5 `כשם שחולקין בחולין – כך חולקין בתרומה`.

```json
[
  { "id": "cholkin", "he": "כשם שחולקין בחולין – כך חולקין בתרומה.", "en": "Just as they divide the non-sacred produce, so they divide the terumah.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "comparative", "basis": "marked", "note": "`כשם ש … כך`: the known side (chullin) is the base." }], "ext": { "axis": ["axis/similarity"] } },
  { "id": "b5", "he": "כשם שמברך על הטובה — כך מברך על הרעה.", "en": "Just as one blesses over the good, so one blesses over the bad.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "comparative", "basis": "marked" }] },
  { "id": "cherev", "he": "חרב הרי הוא כחלל.", "en": "A sword is like the corpse itself.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "comparative", "basis": "marked", "note": "`הרי הוא כ`: Shabbos 101b." }], "ext": { "axis": ["axis/similarity"] } }
]
```

#### 11 · consequent — נמשך
- means · One predicate stated as following from another. **Three intentions:** (a) the antecedent holds; (b) the consequent holds; (c) the consequent follows from the antecedent. Any one failing falsifies the statement. Distinguish from the hypothetical (type 6), which asserts only (c).
- markers · `לפיכך` · `הלכך` · `אם כן` · concluding `מכלל ד…` · `כיון ד…, …` · `הואיל ו…`.
- ex · Ma'aseros 2:1 `היה עובר בשוק, ואמר: טלו לכם תאנים – אוכלים ופטורים, לפיכך אם הכניסו לבתיהם – מתקנים ודאי` — (a) they may eat untithed in the market; (b) at home they must certainly tithe; (c) (b) holds *because of* (a): market permission shows the produce never entered a house, so no tithe was ever taken.

```json
[
  { "id": "teenim", "he": "היה עובר בשוק, ואמר: טלו לכם תאנים – אוכלים ופטורים, לפיכך אם הכניסו לבתיהם – מתקנים ודאי.", "en": "If he was passing through the market and said: take figs for yourselves — they eat and are exempt; therefore, if they brought them into their houses, they must certainly tithe.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "consequent", "basis": "marked", "note": "`לפיכך`: three intentions — the market rule, the house rule, and that the second follows from the first." }], "ext": { "form": { "parts": ["in the market they eat exempt", "at home they must certainly tithe", "the second because of the first"] } } },
  { "id": "b8", "he": "רצה הקדוש ברוך הוא לזכות את ישראל, לפיכך הרבה להם תורה ומצוות.", "en": "The Holy One wished to give Israel merit; therefore He multiplied Torah and commandments for them.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "consequent", "basis": "marked" }] },
  { "id": "acha-a", "speaker": "Rav Ashi", "he": "אמר ליה: כיון דאיכא שקצים ורמשים דקא אכלי להו, מעיקרא יאושי מיאש מנייהו", "en": "He said to him: since there are creeping things that eat them once they fall, the owner despairs of them from the outset.", "move": { "element": "answer", "subtype": "answer", "target": "acha-q", "attested": false }, "provenance": "derivation", "anatomy": [{ "kind": "consequent", "note": "Since vermin eat them, the owner despairs from the outset: both clauses asserted, the second following from the first." }] }
]
```

### Literal vs figurative (Ch 6, p76)
- he · `הפשוטים אמתתם וכזבם תלויים בהיות צודק … מה שנרמז במלותיהם לפי הבנתן הפשוטה. אך באותם שעל דרך ההשאלה או ההפלגה, אין האמת והכזב תלויים במה שמובן מפשט מלותיהם, אלא ברמז המכון בהם`
- key · `figurative`. Judge truth on the intended allusion. Literal is the default and gets no badge.
- file · `anatomy[].kind: "figurative"`, row-level. When the figure is what dissolves an apparent opposition, also `ext.relation.dissolvedBy: "figurative"` on the unit that alleges the opposition.
- ex · Bava Kamma 117a `ארי עלה מבבל` — a great sage (Rav Kahana) has arrived.

```json
[
  { "id": "ari", "he": "ארי עלה מבבל.", "en": "A lion has come up from Babylonia.", "move": { "element": "statement", "subtype": "reported" }, "provenance": "tradition", "anatomy": [{ "kind": "figurative", "note": "A great sage has arrived. Judge the allusion, not the words: it does not oppose 'there are no lions in Babylonia'." }] },
  { "id": "f9", "he": "כל המקיים נפש אחת מישראל — כאילו קיים עולם מלא.", "en": "Whoever sustains one soul of Israel, it is as if he sustained a whole world.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "categorical", "basis": "marked" }, { "kind": "figurative", "basis": "marked", "note": "`כאילו`: a comparison meant as praise, not a claim about worlds." }] },
  { "id": "arim", "speaker": "Deuteronomy 1:28", "he": "ערים גדולות ובצורות בשמים.", "en": "Cities great and fortified up to heaven.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "figurative", "note": "Hyperbole — `דברה תורה לשון הבאי` (Chullin 90b). Not false because no wall reaches heaven." }] }
]
```

### Elucidation — ביאור (Ch 10, p196)
- means · A ביאור restates a proposition at greater length and adds nothing. It is not a new claim and not an explanation that changes anything; it is the same proposition said again. The status is often conferred *later*: when the Gemara answers a redundancy objection with `מה טעם קאמר`, `פירושא קא מפרש`, `מה הן קתני`, or a reading on which the second clause spells out the first, the second clause becomes an elucidation of the first — go back and set it on the restating clause.
- file · pending — `ext.form.elucidationOf: "<id>"` on the **restating** unit (the ביאור), never on the later unit that announces the reading.

```json
[
  { "id": "1a", "speaker": "Mishnah", "he": "דיני ממונות — בשלשה.", "en": "Cases of monetary law are judged by three.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "unqualified" }, { "kind": "simple" }], "ext": { "axis": ["axis/quantity"] } },
  { "id": "1b", "speaker": "Mishnah", "he": "גזילות וחבלות — בשלשה.", "en": "Robbery and injury are judged by three.", "move": { "element": "statement", "subtype": "firsthand", "target": "1a" }, "provenance": "tradition", "note": "Set as an elucidation of 1a after R. Abbahu's `מה הן קתני` (Sanhedrin 2b): it spells out what cases of monetary law are, adding nothing.", "ext": { "form": { "elucidationOf": "1a" } } },
  { "id": "atu", "he": "אטו גזילות וחבלות לאו דיני ממונות נינהו?!", "en": "Are robbery and injury not cases of monetary law?!", "move": { "element": "difficulty", "subtype": "objection", "target": "1b" }, "provenance": "derivation", "ext": { "warrant": { "kind": "style/redundant" } } },
  { "id": "mah-hen", "speaker": "R. Abbahu", "he": "אמר רבי אבהו: ״מה הן״ קתני: מה הן דיני ממונות? גזילות וחבלות.", "en": "R. Abbahu said: it teaches 'what are they' — what are cases of monetary law? Robbery and injury.", "move": { "element": "resolution", "subtype": "settlement", "target": "atu", "marker": "מה הן קתני" }, "provenance": "derivation" }
]
```

```json
{
  "id": "elucidation-4b",
  "he": "כל זמן שהוא מהלך הוא פטור.",
  "en": "All the while he is walking he is exempt.",
  "move": { "element": "statement", "subtype": "explanation", "target": "meavir" },
  "provenance": "derivation",
  "note": "Shabbos 5b: restates `כמה דנקיט לה ואזיל – פטור` at greater length, adding nothing.",
  "ext": { "form": { "elucidationOf": "meavir" } }
}
```

### Inference — דיוק (Ch 5, p66–74)
- he · `כל מה שאנו מבינים מתוך מאמר אחד ולא פרש בו, נקראהו דיוק`
- Principle · A speaker's words are assumed to have the extent they deserve: `לא ייחד נשוא לנושא אחד אם הוא ראוי לרבים, ולא יאמר בנושאים רבים נשוא שאינו ראוי אלא לאחד מהם`. What falls outside the drawn boundary is taken as excluded.
- Scope · The exclusion runs over the alternatives the narrowing displaced, not the world. Shabbos 106a `רבי יהודה אומר: הצד צפור למגדל וצבי לבית חייב` → Betzah 24a `לבית הוא דמחייב, אבל לביברין – לא`: had he meant all trapping, he would not have said "to a house."
- ex · Lev 11:2 `זאת החיה אשר תאכלו` → all others forbidden · II Sam 23:1 `ואלה דברי דוד האחרונים` → Mo'ed Katan 16b `מכלל דאיכא ראשונים`.
- file · the move is `statement/inference` (§8); the form label is `anatomy[].kind` ∈ `inference-necessary` `inference-loose` `absolute-opposite`; the full record is pending, `ext.inference: { of, kind, necessary }`.

**inference-loose** — בלתי מוכרח · depends on word order and phrasing — including verb form, tense, active vs passive (הקורא → דיעבד; נקנית → מדעתה); defeated by a reason the phrasing was chosen otherwise. Record a loose inference as a retractable commitment. `necessary: false`, `kind` omitted — **anything read off the choice of words is loose, however compelling.**
- ex · Berachos 53a `אם רוב ישראל – מברך` → `הא מחצה על מחצה אינו מברך`; retracted: `בדין הוא דאפילו מחצה על מחצה נמי מברך, ואיידי דתנא רישא רוב כותים – תנא סיפא רוב ישראל` — the Tanna mirrored the first clause.

```json
[
  { "id": "mechtza", "he": "הא מחצה על מחצה – אינו מברך.", "en": "So where it is half and half, he does not bless.", "move": { "element": "statement", "subtype": "inference", "target": "mishnah-rov", "marker": "הא … לא" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-loose", "note": "Berachos 53a. Read off the Mishnah's 'a majority of Israelites'; retracted two lines later when a reason for the wording (`איידי דתנא רישא`) is found." }], "ext": { "inference": { "of": "mishnah-rov", "necessary": false } } },
  { "id": "korei", "he": "הקורא – דיעבד אין, לכתחלה לא.", "en": "'One who read' — after the fact yes, from the outset no.", "move": { "element": "statement", "subtype": "inference", "target": "mishnah-korei" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-loose", "note": "Berachos 15a. Read off the verb form: 'one who read' is heard as the completed act. A choice of words, so loose." }], "ext": { "inference": { "of": "mishnah-korei", "necessary": false } } },
  { "id": "b17", "he": "לכתחילה צריך להשמיע לאזנו.", "en": "From the outset one must make it audible to his ear.", "move": { "element": "statement", "subtype": "inference", "target": "shema-yatza" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-loose", "note": "From `הקורא את שמע ולא השמיע לאזנו – יצא`: that 'he has fulfilled it' is said only after the fact is suggested by the wording, not compelled." }], "ext": { "inference": { "of": "shema-yatza", "necessary": false } } }
]
```

**inference-necessary** — מוכרח · inseparable from the statement; one cannot accept the statement and deny it. `necessary: true` **only** for a conversion of the statement's own S and P per the table below.
- ex · Chagigah 15b `כל מאן דהוה נקי אגב אמיה – סליק` ⟹ `כל דלא סליק – לא הוה נקי אגב אמיה`.

Necessary inferences by statement type (`יש` is read as "some, not all"):

| from | necessary inferences | file |
|---|---|---|
| **A** כללי מקיים — `כל דנקי אגב אמיה סליק` | `infer/contrapositive` חילוף הפכי כולל: `כל דלא סליק – לא הוה נקי` · `infer/converse-limited` חילוף קצתי: `אחד מן העולים הוא הנקי` | edge `contrapositive` · edge `converse-limited` |
| **E** כללי שולל — `אין דבר רע יורד מלמעלה` (Bereshis Rabbah 51:3) | `infer/converse-complete` חילוף כולל: `אין יורד מלמעלה דבר רע` | edge `converse` |
| **I** קצתי מקיים — `יש זריז ונשכר` (Pesachim 50b) | `infer/opposite` הפך: `יש זריז ואינו נשכר` · `infer/contrapositive-limited` חילוף קצתי הפכי: `יש שאינו נשכר והוא זריז` · `infer/converse-limited`: `אחד מן הנשכרים הוא הזריז` | row `absolute-opposite` · (no edge kind; `ext.inference` only) · edge `converse-limited` |
| **O** קצתי שולל — `יש קדשים שאין להם פדיון` | `infer/opposite`: `יש קדשים שיש להם פדיון` · `infer/contrapositive-limited`: `יש שיש להם פדיון והם קדשים` · `infer/converse-limited`: `יש שאין להם פדיון והם קדשים` | as above |

Naming a דיוק — two questions, in order. (1) Did S and P keep their places? yes → `infer/opposite` (quality flipped, same order). (2) They swapped: did the quality flip too (מקיים ↔ שולל)? yes → `infer/contrapositive` / `infer/contrapositive-limited`; no → `infer/converse-complete` / `infer/converse-limited`. Match the table by pattern, not by intuition about validity — for a קצתי the "limited" forms are what the table says they are. As placeholders, from a קצתי שולל `יש S שאינם P`: `יש S ש־P` → opposite · `יש שאינם P והם S` (the negation kept) → converse-limited · `יש ש־P והם S` (the negation dropped) → contrapositive-limited. Check whether the "אינם" survived before choosing.

Western · `infer/opposite` (הפך, "some S are P" → "some S are not P", and O → I) is **not** valid in the square of opposition: subcontraries may both be true. It is *necessary* for Ramchal by the proportion principle above — a speaker who says "some" where "all" holds has misstated the measure, so "some" carries "not all". Record it as `inference-necessary` exactly as Ramchal does, and do not derive it from, or reject it by, Western validity; a checker built on the square would wrongly refuse it.

The five kinds, one unit each, the source statement being `כל הכשר לדון – כשר להעיד` (A), `אין דבר טמא עולה על המזבח` (E) and `יש חכם שהוא עשיר` (I):

```json
[
  { "id": "b18", "he": "כל שאינו כשר להעיד — אינו כשר לדון.", "en": "Whoever is unfit to testify is unfit to judge.", "move": { "element": "statement", "subtype": "inference", "target": "kasher-ladun" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary" }, { "kind": "contrapositive", "note": "S and P swapped, both negated, quantity kept." }], "ext": { "inference": { "of": "kasher-ladun", "kind": "infer/contrapositive", "necessary": true } } },
  { "id": "i1", "he": "יש כשר להעיד — שהוא כשר לדון.", "en": "There is one fit to testify who is fit to judge.", "move": { "element": "statement", "subtype": "inference", "target": "kasher-ladun" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary" }, { "kind": "converse-limited", "note": "Swapped; quantity drops to some; quality kept." }], "ext": { "inference": { "of": "kasher-ladun", "kind": "infer/converse-limited", "necessary": true } } },
  { "id": "i2", "he": "אין העולה על המזבח — דבר טמא.", "en": "Nothing that goes up on the altar is an unclean thing.", "move": { "element": "statement", "subtype": "inference", "target": "ein-tamei" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary" }, { "kind": "converse", "note": "A universal negative converts completely: order only changes." }], "ext": { "inference": { "of": "ein-tamei", "kind": "infer/converse-complete", "necessary": true } } },
  { "id": "i3", "he": "יש חכם שאינו עשיר.", "en": "There is a wise man who is not rich.", "move": { "element": "statement", "subtype": "inference", "target": "yesh-chacham" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary" }, { "kind": "absolute-opposite", "note": "S and P in place, quality flipped: the הפך a partial statement carries — 'some are' implies 'some are not', or it would have said all." }], "ext": { "inference": { "of": "yesh-chacham", "kind": "infer/opposite", "necessary": true } } },
  { "id": "i4", "he": "יש שאינו עשיר — והוא חכם.", "en": "There is one who is not rich and is wise.", "move": { "element": "statement", "subtype": "inference", "target": "yesh-chacham" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary", "note": "Swapped and the quality flipped, for a partial: חילוף קצתי הפכי. No edge kind names this; the record is in ext." }], "ext": { "inference": { "of": "yesh-chacham", "kind": "infer/contrapositive-limited", "necessary": true } } }
]
```

The same five from the book's own instances — `כל מאן דהוה נקי אגב אמיה סליק` (Chagigah 15b, A), `אין דבר רע יורד מלמעלה` (Bereshis Rabbah 51:3, E), `יש זריז ונשכר` (Pesachim 50b, I) and `יש קדשים שאין להם פדיון` (O):

```json
[
  { "id": "j1", "he": "כל דלא סליק – לא הוה נקי אגב אמיה.", "en": "Whoever did not ascend was not pure by his mother's merit.", "move": { "element": "statement", "subtype": "inference", "target": "chagigah-a" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary" }, { "kind": "contrapositive" }], "ext": { "inference": { "of": "chagigah-a", "kind": "infer/contrapositive", "necessary": true } } },
  { "id": "j2", "he": "אחד מן העולים הוא הנקי אגב אמיה.", "en": "One of those who ascended is the one pure by his mother's merit.", "move": { "element": "statement", "subtype": "inference", "target": "chagigah-a" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary" }, { "kind": "converse-limited", "note": "חילוף קצתי of an A statement: swapped, dropped to some." }], "ext": { "inference": { "of": "chagigah-a", "kind": "infer/converse-limited", "necessary": true } } },
  { "id": "j3", "he": "אין יורד מלמעלה דבר רע.", "en": "Nothing that comes down from above is a bad thing.", "move": { "element": "statement", "subtype": "inference", "target": "ein-ra" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary" }, { "kind": "converse", "note": "חילוף כולל of an E statement: swapped, quantity kept." }], "ext": { "inference": { "of": "ein-ra", "kind": "infer/converse-complete", "necessary": true } } },
  { "id": "j4", "he": "יש זריז ואינו נשכר.", "en": "There is one who is diligent and does not profit.", "move": { "element": "statement", "subtype": "inference", "target": "yesh-zariz" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary" }, { "kind": "absolute-opposite", "note": "Pesachim 50b: `יש זריז ונשכר` is said of some, so of others it is otherwise — the Mishnah there lists all four." }], "ext": { "inference": { "of": "yesh-zariz", "kind": "infer/opposite", "necessary": true } } },
  { "id": "j5", "he": "יש שאינו נשכר — והוא זריז.", "en": "There is one who does not profit and is diligent.", "move": { "element": "statement", "subtype": "inference", "target": "yesh-zariz" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary", "note": "חילוף קצתי הפכי: swapped and flipped, for a partial. No edge kind; ext only." }], "ext": { "inference": { "of": "yesh-zariz", "kind": "infer/contrapositive-limited", "necessary": true } } },
  { "id": "j6", "he": "יש קדשים שיש להם פדיון.", "en": "There are consecrated things that have redemption.", "move": { "element": "statement", "subtype": "inference", "target": "yesh-kodashim" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary" }, { "kind": "absolute-opposite", "note": "From an O statement, the same הפך: quality flipped, S and P in place." }], "ext": { "inference": { "of": "yesh-kodashim", "kind": "infer/opposite", "necessary": true } } },
  { "id": "j7", "he": "יש שאין להם פדיון — והם קדשים.", "en": "There are things without redemption that are consecrated.", "move": { "element": "statement", "subtype": "inference", "target": "yesh-kodashim" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-necessary" }, { "kind": "converse-limited", "note": "The negation survived the swap: converse-limited, not contrapositive-limited." }], "ext": { "inference": { "of": "yesh-kodashim", "kind": "infer/converse-limited", "necessary": true } } }
]
```

And two that are **not** necessary though they look it — a full converse of an A statement, and a reading off a word:

```json
[
  { "id": "i8", "he": "כל הכשר להעיד — כשר לדון.", "en": "Whoever is fit to testify is fit to judge.", "move": { "element": "statement", "subtype": "inference", "target": "kasher-ladun" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-loose", "note": "An A statement does not convert completely; only `יש כשר להעיד שהוא כשר לדון` follows. One can accept the source and deny this (Yebamos 66a: `כל שאינו אוכל אינו מאכיל` does not give `כל שאינו מאכיל אינו אוכל`)." }], "ext": { "inference": { "of": "kasher-ladun", "necessary": false } } },
  { "id": "i9", "he": "המוציא בשמאלו — פטור.", "en": "One who carries out with his left hand is exempt.", "move": { "element": "statement", "subtype": "inference", "target": "motzi-yemino" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-loose", "note": "From `המוציא בימינו – חייב`. Read off the word 'right hand'; a reason for mentioning the right hand defeats it." }], "ext": { "inference": { "of": "motzi-yemino", "necessary": false } } }
]
```

---

## §10 · Layer C — Relations between two propositions (Ch 4, p48–64)

Layer C labels are **edge-level** `anatomy` kinds: they describe how the sentence stands to the unit its move targets, and are a fault on a unit with no `move.target`. They sit on the **later** unit — the one whose move connects the pair. On a difficulty (רומיא, תא שמע) the label names the relation the difficulty *alleges*; on a resolution, the test that *dissolves* it. When the other member of the pair is not the target (the second verse of a רומיא), name it in `ext.relation.to`.

Compare two *normalized* propositions on S, P, quantity, and quality (affirm / deny). Decide in this order — a מחלוקת is not automatically an opposition:

1. Same S and same P, and one affirms what the other denies (הן / לאו)? → `opposite`, then `diametrically-opposed` (same quantity — two categoricals or two particulars) or `contradictory` (one categorical, one particular — not the everyday word for "they disagree"). Before settling, check the conditions below; a failed condition dissolves it.
2. Same S and same P, both affirming (or both denying) — in other words, in another order, or one the genus and the other its species? → `equivalent`. Two words for one thing — synonyms, dialect, a word and its gloss, the same law phrased twice — are one P, so the pair is equivalent even when a dispute over the *wording* is reported. (`משקי בי מדבחיא דכן` / `הדם והיין והשמן והמים טהורים`, §14 Step 7: the enumeration is the species of the genus; nothing is denied, so it is not `contradictory`.) If S and P swapped → `converse` / `converse-limited` / `contrapositive`; if quality and P negated together → `obverse`.
3. Same S, different P — two values of one variable (two times, two measures, two amounts, two proportions) — or same P, different S? → `variant`. Kesubos 57a below is the model case: each side names a value; neither says לאו to the other's P.
4. Nothing in common? → `incongruent`.

#### equivalent — דומים
- he · `שני מאמרים שיאמרו נשוא אחד בנושא אחד עצמו, אלא שבאפן האמירה וסדר הדבור יהיו מתחלפים; או … נשואים דומים בשני נושאים דומים`
- means · Same S and P in different words; or S and P similar enough that the same law is predicated. In the Talmud this is an identification, not a redundancy — unless a פירכא makes it one (`היינו הך`).
- markers · `… ו… אמרו דבר אחד` · `היינו הך` (as an objection).
- ex · Kesubos 36b `רבי יהודה ורבי דוסא אמרו דבר אחד` · Pesachim 82b — similar, not identical subjects: `והא אנינות כלאחר זריקה הויא`.

```json
[
  { "id": "davar-echad", "he": "רבי יהודה ורבי דוסא אמרו דבר אחד.", "en": "R. Yehudah and R. Dosa said the same thing.", "move": { "element": "statement", "subtype": "inference", "target": "yehudah-dosa-a", "marker": "… ו… אמרו דבר אחד" }, "provenance": "derivation", "anatomy": [{ "kind": "equivalent", "basis": "marked", "note": "Kesubos 36b: two statements, one proposition." }], "ext": { "relation": { "to": "yehudah-dosa-b", "kind": "equivalent" } } },
  { "id": "r5", "he": "הבהמה והחיה — מטמאין בנבלתן.", "en": "Domestic and wild animals impart impurity through their carcasses.", "move": { "element": "statement", "subtype": "firsthand", "target": "baalei-chayim" }, "provenance": "tradition", "anatomy": [{ "kind": "equivalent", "note": "Against `בעלי חיים מטמאין בנבלתן`: the enumeration is the species of the genus, same predicate, nothing denied." }], "ext": { "axis": ["axis/genus-species"] } },
  { "id": "t8-press", "short": "then he is a robber", "he": "אי הכי היינו גזלן!", "en": "If so, this is the same as a robber — why mention two identical cases?", "move": { "element": "difficulty", "subtype": "objection", "target": "t8-ans", "marker": "הינו הך", "attested": false }, "provenance": "derivation", "anatomy": [{ "kind": "equivalent", "note": "An armed bandit is the robber: the objection is that the two clauses would say the same thing twice." }] }
]
```

#### variant — מתחלפים
- means · Same S, different P; or same P, different S. A dispute of content, not a flat denial. What one says carries to the other only in the shared part.
- test · Two different values of one variable — two measures, two times, two amounts, two proportions — are variant, not opposite: neither side *denies* a predicate the other affirms. Opposition (below) needs one הן and one לאו on the same P.
- file · two icons. `variant` is same subject, two predicates; `variant-subjects` is same predicate, two subjects.
- ex · Kesubos 57a `רבי טרפון אומר: נותנין לה הכל תרומה; רבי עקיבא אומר: מחצה חולין ומחצה תרומה` — two proportions, neither denied.

```json
[
  { "id": "akiva-57a", "speaker": "R. Akiva", "he": "רבי עקיבא אומר: מחצה חולין ומחצה תרומה.", "en": "R. Akiva says: half non-sacred and half terumah.", "move": { "element": "statement", "subtype": "firsthand", "target": "tarfon-57a" }, "provenance": "tradition", "anatomy": [{ "kind": "variant", "note": "Against R. Tarfon's `נותנין לה הכל תרומה`: two proportions for one subject; neither says לאו to the other's predicate." }], "ext": { "axis": ["axis/quantity"] } },
  { "id": "r1", "speaker": "Chachamim", "he": "וחכמים אומרים: עד חצות.", "en": "And the Sages say: until midnight.", "move": { "element": "statement", "subtype": "firsthand", "target": "eliezer-2a" }, "provenance": "tradition", "anatomy": [{ "kind": "variant", "note": "Berachos 2a: against `עד סוף האשמורה הראשונה`, two times for one deadline." }], "ext": { "axis": ["axis/time"] } },
  { "id": "women-same-rule", "he": "נשים חייבות בקידוש היום.", "en": "Women are obligated in the day's kiddush.", "move": { "element": "statement", "subtype": "firsthand", "target": "men-kiddush" }, "provenance": "tradition", "anatomy": [{ "kind": "variant-subjects", "note": "[constructed] Same predicate (obligated in the day's kiddush), two subjects (men / women). Neither confirms nor opposes the other." }] }
]
```

#### opposite — הפכיים
- he · `שיאמרו על נשוא אחד בנושא אחד, אחד – הן ואחד – לאו`
- Conditions · `צריך שיהיו נשואם אחד ונושאם אחד, ויובנו בזמן אחד, במקום אחד, בבחינה אחת ובהבנה פשוטה בלי שום שתוף והשאלה`. Failing any one dissolves the opposition. The dissolving tests are edge kinds, placed on the resolution that applies them (or on a statement that is shown not to oppose its target):
- `differs-in-time` — Shabbos 57a `לא תצא אשה … בטוטפת` / `יוצאה אשה בטוטפת` (unsewn / sewn).
- `differs-in-place` — Shabbos 57a `ולא בכבול` / `יוצאת בכבול` (public domain / courtyard).
- `differs-in-context` — aspect (§11); Pesachim 19b `עזרה רשות הרבים היא` (for doubtful impurity) vs a private domain for Shabbos.
- `homonym` — Eruvin 102b `ואם תקע – חייב חטאת` (driving a peg) vs Rosh Hashanah 29b `תקיעת שופר … חכמה היא ואינה מלאכה` (blowing).
- `figurative` — one of the two is a figure or hyperbole (p76): Bava Kamma 117a `ארי עלה מבבל` does not oppose "there are no lions in Babylonia"; judge the intended allusion, not the words. Row kind on the figurative unit; `ext.relation.dissolvedBy: "figurative"`.

Subtypes:
- **diametrically-opposed** — הפכיים ממש · both categorical or both particular, one affirming, one denying. Both cannot stand — the sugya must decide between them, or show they are not really opposed. ex · Shabbos 124a `כל הכלים ניטלין לצורך ושלא לצורך; רבי נחמיה אומר: אין ניטלין אלא לצורך` · Shabbos 28b `רבי אליעזר אומר: טמאה היא ואין מדליקין בה; רבי עקיבא אומר: טהורה היא ומדליקין בה` · Yebamos 50a `רבן גמליאל אומר: אין גט אחר גט … וחכמים אומרים: יש גט אחר גט`.
- **contradictory** — מתנגדים · one categorical, one particular; they clash — the particular *denies* of some members what the categorical affirms of all — but the particular's author concedes the rest. A particular that affirms the same P of a subclass does not clash; it is a species under the genus → `equivalent`. This is what every `תא שמע` from a Mishnah tries to be. ex · Shabbos 76b `חוץ מקליפיהן` / `רבי יהודה אומר: חוץ מקליפי עדשים`.

```json
[
  { "id": "nechemya", "speaker": "R. Nechemya", "he": "רבי נחמיה אומר: אין ניטלין אלא לצורך.", "en": "R. Nechemya says: they may be moved only for a need.", "move": { "element": "contradiction", "subtype": "opposition", "target": "kol-hakelim" }, "provenance": "tradition", "anatomy": [{ "kind": "diametrically-opposed", "note": "Shabbos 124a. Against `כל הכלים ניטלין לצורך ושלא לצורך`: same subject, same predicate (moving without need), yes against no, both categorical." }, { "kind": "exclusion", "basis": "marked" }] },
  { "id": "akiva-28b", "speaker": "R. Akiva", "he": "רבי עקיבא אומר: טהורה היא ומדליקין בה.", "en": "R. Akiva says: it is pure and one may light with it.", "move": { "element": "contradiction", "subtype": "opposition", "target": "eliezer-28b" }, "provenance": "tradition", "anatomy": [{ "kind": "diametrically-opposed", "note": "Shabbos 28b. Pure against impure, permitted against forbidden: no-middle terms." }, { "kind": "no-middle" }, { "kind": "compound" }] },
  { "id": "rava-yeush", "speaker": "Rava", "he": "ורבא אמר: הוי יאוש", "en": "And Rava said: it is considered despair.", "move": { "element": "contradiction", "subtype": "opposition", "target": "abaye", "attested": false }, "provenance": "asserted", "anatomy": [{ "kind": "diametrically-opposed", "note": "Same subject, same respect, yes against no." }] }
]
```

```json
[
  { "id": "yehudah-76b", "speaker": "R. Yehudah", "he": "רבי יהודה אומר: חוץ מקליפי עדשים.", "en": "R. Yehudah says: except the shells of lentils.", "move": { "element": "statement", "subtype": "firsthand", "target": "klipeihen" }, "provenance": "tradition", "anatomy": [{ "kind": "contradictory", "note": "Shabbos 76b. The first Tanna excepts all shells; R. Yehudah denies the exception of all but lentil shells — a particular denying what the categorical affirms, conceding the rest." }] },
  { "id": "b13", "he": "יש נשים שאינן חייבות בתפילה.", "en": "There are women who are not obligated in prayer.", "move": { "element": "statement", "subtype": "firsthand", "target": "kol-hanashim" }, "provenance": "asserted", "anatomy": [{ "kind": "contradictory", "note": "[constructed] Against `כל הנשים חייבות בתפילה`: one counter-instance is enough to trouble a claim about all." }] },
  { "id": "t2-ask", "short": "scattered coins", "he": "תא שמע: מעות מפוזרות — הרי אלו שלו. אמאי? הא לא ידע דנפל מיניה!", "en": "Come and hear: if one found scattered coins, these belong to him. Why — is the owner not unaware that they fell from him?", "move": { "element": "difficulty", "subtype": "objection", "target": "abaye", "marker": "תא שמע", "attested": false }, "provenance": "tradition", "anatomy": [{ "kind": "contradictory" }] }
]
```

The four dissolving tests, each on the unit that applies it:

```json
[
  { "id": "b14", "he": "[after salting] הבשר מותר.", "en": "After salting, the meat is permitted.", "move": { "element": "resolution", "subtype": "settlement", "target": "basar-asur" }, "provenance": "derivation", "anatomy": [{ "kind": "differs-in-time", "note": "[constructed] `הבשר אסור` spoke of before the blood was salted out; no clash." }] },
  { "id": "b15", "he": "[in a private domain] מעבירין ארבע אמות.", "en": "In a private domain one may carry four cubits.", "move": { "element": "resolution", "subtype": "settlement", "target": "ein-maavirin" }, "provenance": "derivation", "anatomy": [{ "kind": "differs-in-place", "note": "[constructed] `אין מעבירין ארבע אמות` is the public domain; the two rulings never meet." }] },
  { "id": "b16", "he": "[with respect to midras-impurity] כלי זה טמא.", "en": "With respect to midras-impurity this vessel is impure.", "move": { "element": "resolution", "subtype": "settlement", "target": "kli-tahor" }, "provenance": "derivation", "anatomy": [{ "kind": "differs-in-context", "note": "[constructed] `כלי זה טהור` was said of corpse-impurity: one object considered two ways is two subjects." }] },
  { "id": "r3", "he": "[of the altar ramp, also called כבש] הכבש — אינו נאכל.", "en": "The ramp (kevesh) is not eaten.", "move": { "element": "resolution", "subtype": "settlement", "target": "keves-tzali" }, "provenance": "derivation", "anatomy": [{ "kind": "homonym", "note": "[constructed] `הכבש נאכל צלי` is the Passover lamb; one word, two meanings, so no opposition." }] }
]
```

Two more from the book — a place test and a homonym test applied to real pairs, and a figurative dissolution:

```json
[
  { "id": "kavul-chatzer", "he": "יוצאת בכבול … בחצר.", "en": "She may go out with a kavul — in a courtyard.", "move": { "element": "resolution", "subtype": "settlement", "target": "lo-bekavul" }, "provenance": "tradition", "anatomy": [{ "kind": "differs-in-place", "note": "Shabbos 57a: `ולא בכבול` is the public domain; the courtyard ruling does not oppose it." }] },
  { "id": "tekiah-shofar", "he": "תקיעת שופר … חכמה היא ואינה מלאכה.", "en": "Blowing the shofar is a skill and not a labour.", "move": { "element": "statement", "subtype": "firsthand", "target": "taka-chayav" }, "provenance": "tradition", "anatomy": [{ "kind": "homonym", "note": "Rosh Hashanah 29b against Eruvin 102b `ואם תקע – חייב חטאת`: there תקע is driving a peg, here blowing." }] },
  { "id": "r4", "he": "המקיים נפש אחת — לא קיים אלא נפש אחת.", "en": "One who sustains one soul has sustained only one soul.", "move": { "element": "statement", "subtype": "firsthand", "target": "f9" }, "provenance": "asserted", "anatomy": [{ "kind": "exclusion", "basis": "marked" }], "note": "[constructed] No opposition to `כאילו קיים עולם מלא`: that statement is figurative and is judged on its allusion.", "ext": { "relation": { "to": "f9", "dissolvedBy": "figurative" } } }
]
```

Opposite *terms* · each term's meaning is the other's negation: טמא/טהור, אסור/מותר, חייב/פטור, כשר/פסול — `no-middle`; רשות/חובה (middle = מצוה), מצוה/עבירה, קרוב/רחוק — `has-middle`. Indirect proof (§11) and the disjunctive syllogism are valid only across no-middle opposites. Row-level kinds, placed on a statement or disjunction built from the pair.

```json
[
  { "id": "t1", "he": "חייב / פטור", "en": "Liable / exempt.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "anatomy": [{ "kind": "no-middle", "note": "One or the other, nothing between: ruling out one proves the other." }] },
  { "id": "t2", "he": "או חולץ או מיבם.", "en": "He either performs chalitzah or marries her.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "disjunction", "basis": "marked" }, { "kind": "no-middle", "note": "Yebamos 112b: the two options exhaust the levir's duty; ruling out one leaves the other." }] },
  { "id": "t3", "he": "מצוה / עבירה", "en": "A commandment / a transgression.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "anatomy": [{ "kind": "has-middle", "note": "Permitted-and-neutral lies between: ruling out one does not prove the other." }] },
  { "id": "t4", "he": "רשות / חובה", "en": "Optional / obligatory.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "anatomy": [{ "kind": "has-middle", "note": "Ramchal's own pair (p60): מצוה lies between. `תפלת ערבית רשות` does not by itself make it a חובה when denied." }] },
  { "id": "t5", "speaker": "B", "en": "Either the contract is void or it is enforceable; there is no third thing.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "asserted", "anatomy": [{ "kind": "disjunction" }, { "kind": "has-middle", "note": "False as stated: a voidable contract lies between — enforceable until avoided. A dilemma built on this pair fails." }] }
]
```

#### converse — חילוף
- he · `מה שהוא הנושא באחד יהיה הנשוא בשני, ומה שהוא נשוא באחד יהיה הנושא בשני`
Three kinds, by what changes besides order:
- **converse** (complete) · order only; quantity and quality kept. ex · Yerushalmi Shabbos 13:3 `אין עבירה מצוה` / `אין מצוה עבירה`.
- **converse-limited** · order and quantity change; quality kept. ex · Yebamos 66a `כל שאינו אוכל אינו מאכיל` / `יש שאינו מאכיל ואינו אוכל`.
- **contrapositive** · order and quality change; quantity kept. ex · `כל האוכל מאכיל` / `כל שאינו מאכיל אינו אוכל`.

#### obverse — מתהפכים
- means · Both S and P are replaced by their opposites; the content is unchanged. ex · `כל האוכל מאכיל` / `כל שאינו אוכל אינו מאכיל`.
- Western · This is *inversion* (negate both S and P), not obversion (obversion flips the quality and negates only P). Inversion is not generally valid; it holds here because the terms are coextensive — whoever eats is exactly whoever enables. Do not validate an `obverse` against the square of opposition; it is Ramchal's relation, sound where S and P are coextensive.

```json
[
  { "id": "b12c", "he": "כל הנשכר — זריז.", "en": "Everyone who profits is diligent.", "move": { "element": "statement", "subtype": "inference", "target": "kol-zariz" }, "provenance": "derivation", "anatomy": [{ "kind": "converse", "note": "[constructed] Against `כל הזריז נשכר`: order only. As an inference from an A statement it is not necessary — see i8." }, { "kind": "inference-loose" }] },
  { "id": "b11", "he": "יש פסול שהוא פוסל.", "en": "There is a disqualified one who disqualifies.", "move": { "element": "statement", "subtype": "inference", "target": "kol-haposel" }, "provenance": "derivation", "anatomy": [{ "kind": "converse-limited", "note": "[constructed] Against `כל הפוסל פסול`: order and quantity change, quality kept." }, { "kind": "inference-necessary" }] },
  { "id": "b12a", "he": "כל שאינו נשכר — אינו זריז.", "en": "Everyone who does not profit is not diligent.", "move": { "element": "statement", "subtype": "inference", "target": "kol-zariz" }, "provenance": "derivation", "anatomy": [{ "kind": "contrapositive", "note": "[constructed] Order and quality change, quantity kept." }, { "kind": "inference-necessary" }] },
  { "id": "b12b", "he": "כל שאינו זריז — אינו נשכר.", "en": "Everyone who is not diligent does not profit.", "move": { "element": "statement", "subtype": "inference", "target": "kol-zariz" }, "provenance": "derivation", "anatomy": [{ "kind": "obverse", "note": "[constructed] Both terms replaced by their opposites, order kept; the picture is unchanged." }, { "kind": "inference-loose", "note": "Not a necessary inference from the A statement." }] },
  { "id": "eino-ochel", "he": "כל שאינו אוכל — אינו מאכיל.", "en": "Whoever does not eat does not enable others to eat.", "move": { "element": "statement", "subtype": "firsthand", "target": "kol-haochel" }, "provenance": "tradition", "anatomy": [{ "kind": "obverse", "note": "Yebamos 66a, against `כל האוכל מאכיל` (Ramchal's pair, p62): S and P each replaced by its opposite, order kept. The Gemara treats the two clauses as one rule stated twice." }] }
]
```

```json
[
  { "id": "yesh-lo-maachil", "he": "יש שאינו מאכיל ואינו אוכל.", "en": "There is one who does not confer the right to eat and does not eat.", "move": { "element": "statement", "subtype": "inference", "target": "kol-sheino-ochel" }, "provenance": "derivation", "anatomy": [{ "kind": "converse-limited", "note": "Yebamos 66a, against `כל שאינו אוכל אינו מאכיל`." }, { "kind": "inference-necessary" }] },
  { "id": "ein-mitzvah-aveirah", "he": "אין מצוה עבירה.", "en": "No commandment is a transgression.", "move": { "element": "statement", "subtype": "inference", "target": "ein-aveirah-mitzvah" }, "provenance": "derivation", "anatomy": [{ "kind": "converse", "note": "Yerushalmi Shabbos 13:3, against `אין עבירה מצוה`: a universal negative converts in full." }, { "kind": "inference-necessary" }] }
]
```

#### incongruent — נבדלים
- means · No shared or similar S or P; nothing to test. They cannot conflict and cannot support each other; a difficulty built from one against the other has misread one of them.

```json
[
  { "id": "r2", "he": "השור שנגח את הפרה — משלם חצי נזק.", "en": "An ox that gored a cow pays half damages.", "move": { "element": "statement", "subtype": "firsthand", "target": "korei-kavanah" }, "provenance": "tradition", "anatomy": [{ "kind": "incongruent", "note": "[constructed pair] Against `הקורא את שמע צריך לכוין את לבו`: nothing in common." }] },
  { "id": "yerushalayim-2", "he": "ירושלים אינה מטמאה בנגעים.", "en": "Jerusalem does not become impure through leprous marks.", "move": { "element": "statement", "subtype": "firsthand", "target": "ruling" }, "provenance": "tradition", "anatomy": [{ "kind": "incongruent", "note": "Against `נשים חייבות בקידוש היום`: neither subject nor predicate shared." }] }
]
```

---

## §11 · Layer D — Warrants: deriving, proving, disproving, rebutting

What is present: the seven deduction kinds and four defeats as **edge-level** `anatomy` kinds (on the proof, contradiction, difficulty or resolution whose move they warrant), the unit's own `provenance`, and chapter 8's nine grounds (four of them derived from `provenance` on a proof, contradiction or difficulty). What is pending, all under `ext.warrant`: the premises with their provenances, `disproof/indirect` and `disproof/reductio`, the four rebuttal kinds that have no icon, the six style kinds, aspect and modality. `proof/indirect`, `disproof/dilemma`, `rebuttal/irrelevant` and `sevara` have icons (`via-opposite`, `dilemma`, `ground-does-not-reach`, `theory`) and still keep the classifier key in `ext` when premises are recorded.

**Precedence for `ext.warrant.kind`** — ask in this order and take the first that applies:
1. the unit answers a proof or a difficulty → a `rebuttal/*` kind, whatever machinery it uses;
2. the unit faults the form of a statement (פירכא) → the `style/*` rule violated;
3. the unit derives a conclusion → the syllogism kind (which lives in `anatomy`, so `ext.warrant.kind` is omitted), or `proof/indirect`, `disproof/*`;
4. the unit only adduces a source → nothing in `ext.warrant.kind`; the unit's `provenance` says which source.

The verse, tradition or syllogism a rebuttal leans on goes in `premises`, never in `kind`.

### Propagation (Ch 7, p92–96)
- he · `כאשר יאמר נשוא אחד בנושא אחד, כל מה שיהיה נכלל או מתחבר באמת בנשוא ההוא, יאמר באותו הנושא, וכן כל מה שנכלל באותו הנושא יאמר באותו הנשוא`
- Predicate moves **up**: `האזמל של מילה הוא מוקצה` + מוקצה is forbidden to handle ⟹ the knife is forbidden to handle.
- Subject moves **down**: `העושה אב מלאכה בשבת חייב סקילה` + writing is an אב מלאכה ⟹ `הכותב חייב סקילה`.
- Terms: premise **הקדמה**, conclusion **תולדה**, derivation **היקש**.
- The whole force rests on the inclusion actually holding, `בהכרח ותמיד`. Disputes about inclusion are where derivations diverge: Rabbi Yosi holds הבערה is not an אב מלאכה → no death penalty for kindling; Shabbos 43b `טלטול מן הצד אין שמו טלטול` → the mukzeh rule does not reach sideways handling. That failure is `fallacy-not-included`.

### classical-syllogism — היקש מופתי
- means · Conclusion by the propagation rules from an established premise plus an inclusion. Fails iff the inclusion fails — predicate or subject does not subsume. Ramchal's term, not the three-term Aristotelian figure.
- file · `anatomy[].kind: "classical-syllogism"` on the unit that derives; premises in `ext.warrant.premises`.
- ex · Yebamos 66a — `מנין לכהן שנשא אשה וקנה עבדים שיאכלו בתרומה? שנאמר: וכהן כי יקנה נפש קנין כספו הוא יאכל בו` — קנין כספו eats terumah (verse); the wife is קנין כספו ⟹ she eats terumah.

```json
[
  { "id": "kinyan-kaspo", "he": "מנין לכהן שנשא אשה וקנה עבדים שיאכלו בתרומה? שנאמר: ״וכהן כי יקנה נפש קנין כספו הוא יאכל בו״.", "en": "From where do we know that a priest's wife and slaves eat terumah? As it is said: 'and a priest who acquires a person, the purchase of his money, he shall eat of it'.", "move": { "element": "proof", "subtype": "demonstration", "target": "ishto-ochelet", "marker": "שנאמר" }, "provenance": "tradition", "anatomy": [{ "kind": "classical-syllogism", "note": "Predicate up: קנין כספו eats terumah (verse); the wife is קנין כספו; so she eats." }], "ext": { "warrant": { "premises": [{ "text": "קנין כספו eats terumah", "provenance": "tradition" }, { "text": "a wife is קנין כספו", "provenance": "tradition" }] } } },
  { "id": "kosev", "he": "הכותב — חייב סקילה.", "en": "One who writes on Shabbos is liable to stoning.", "move": { "element": "statement", "subtype": "inference", "target": "av-melacha" }, "provenance": "derivation", "anatomy": [{ "kind": "classical-syllogism", "note": "Subject down: whoever does an אב מלאכה is liable to stoning; writing is an אב מלאכה." }, { "kind": "inference-necessary" }] },
  { "id": "gift-promise", "speaker": "B", "en": "Then a promise to make a gift is unenforceable as a contract.", "move": { "element": "statement", "subtype": "inference", "target": "rule" }, "provenance": "derivation", "anatomy": [{ "kind": "classical-syllogism", "note": "Subject down: all contracts require consideration; a gift promise has none; so it is not an enforceable contract." }], "ext": { "warrant": { "premises": [{ "text": "all contracts require consideration", "provenance": "asserted", "id": "rule" }, { "text": "a promise to make a gift is given without consideration", "provenance": "endoxa" }] } } }
]
```

### analogism — בנין אב / מה מצינו
- he · `שהדומים ילמדו זה מזה … אם מצאנו שני נושאים דומים, ומצאנו באחד מהם מפרש נשוא אחד, בדין המצא הנשוא ההוא גם בשני`
- means · Similar subjects share the predicate explicit in one of them. The comparative statement of §9, used to derive. It fails when the cases are not alike (`fallacy-not-similar`) or when a third like case lacks the rule (`fallacy-counterexample`).
- markers · `מה מצינו ב… … אף …` · `מה … אף …` · `ילפינן … מ…` · `דאתקש ל…` (analogy licensed by scriptural juxtaposition) · `מידי דהוה א…` · `גמר … מ…` (a גזירה שווה) · `מקיש … ל…` · `הצד השוה שבהן`.
- file · `anatomy[].kind: "analogism"`, `basis: marked` when `מה … אף` or the like is in the text. `ext.axis: ["axis/similarity"]` is the natural companion.
- ex · Toras Cohanim, חטאת §5 — `יחיד מוצא מכלל צבור ונשיא מוצא מכלל צבור, מה יחיד מביא אשם תלוי – אף נשיא מביא אשם תלוי`.

```json
[
  { "id": "nasi-asham", "he": "יחיד מוצא מכלל צבור ונשיא מוצא מכלל צבור, מה יחיד מביא אשם תלוי – אף נשיא מביא אשם תלוי.", "en": "An individual is set apart from the community and a prince is set apart from the community; just as an individual brings a suspensive guilt-offering, so a prince brings one.", "move": { "element": "proof", "subtype": "demonstration", "target": "nasi-claim", "marker": "מה … אף …" }, "provenance": "derivation", "anatomy": [{ "kind": "analogism", "basis": "marked" }], "ext": { "axis": ["axis/similarity"], "warrant": { "premises": [{ "text": "the individual and the prince are alike in being set apart from the community", "provenance": "tradition" }, { "text": "the individual brings an אשם תלוי", "provenance": "tradition" }] } } },
  { "id": "t11-yishuv", "speaker": "Rav Pappa", "he": "בעינן ״כי יותן״ דומיא ד״כי יתן״: מה ״יתן״ לדעת, אף ״כי יותן״ נמי לדעת", "en": "We require 'when it is placed' to resemble 'when one places': just as placing is with his knowledge, so being placed must be with his knowledge.", "move": { "element": "resolution", "subtype": "settlement", "target": "t11-rami", "attested": false }, "provenance": "derivation", "anatomy": [{ "kind": "analogism", "basis": "marked", "note": "`מה … אף`: what holds of `יתן` holds of `יותן`." }, { "kind": "comparative", "basis": "marked" }] },
  { "id": "meidi-dehava", "speaker": "R. Yochanan", "he": "מידי דהוה אמעביר חפץ ברשות הרבים, התם לאו אף על גב דכמה דנקיט לה ואזיל – פטור, כי מנח לה – חייב; הכא נמי לא שנא", "en": "It is like one who carries an object four cubits in the public domain: there, although all the while he holds it and walks he is exempt, when he sets it down he is liable; here too, no difference.", "move": { "element": "resolution", "subtype": "settlement", "target": "heicha", "marker": "מידי דהוה א…" }, "provenance": "derivation", "anatomy": [{ "kind": "analogism", "basis": "marked", "note": "Shabbos 5b: carrying through an exempt area ≈ carrying four cubits, where an exempt interval (the walking) also separates lifting and setting down." }], "ext": { "axis": ["axis/similarity"] } },
  { "id": "hatzad-hashaveh", "speaker": "Mishnah", "he": "הצד השוה שבהן: שדרכן להזיק ושמירתן עליך; וכשהזיק — חב המזיק לשלם תשלומי נזק במיטב הארץ.", "en": "The common feature of them all: it is their way to cause damage and their safekeeping is upon you; and when one damaged, the one liable pays from the best of the land.", "move": { "element": "proof", "subtype": "demonstration", "target": "arbaah-avos", "marker": "הצד השוה שבהן" }, "provenance": "tradition", "anatomy": [{ "kind": "analogism", "basis": "marked", "note": "Bava Kamma 2a. After each single-source analogy fails, the shared feature carries the law to all four." }], "ext": { "axis": ["axis/similarity"] } }
]
```

### a-fortiori — קל וחומר / כל שכן
- means · From the lesser to the greater or the reverse: if P holds of the lighter case and fits the heavier, P holds of the heavier; and from the heavier's exemption to the lighter's. It fails when which case is the heavier is not settled (`fallacy-not-greater`).
- markers · `ומה … אינו דין ש…` · `קל וחומר` · `כל שכן` · `לא כל שכן` · `ניליף מ…: ומה …`.
- ex · Toras Cohanim ibid. — `ומה אם היחיד שאין מביא על הנודע זכר – מביא אשם תלוי, נשיא שמביא על הנודע זכר – אינו דין שיביא אשם תלוי`.

```json
[
  { "id": "nasi-kv", "he": "ומה אם היחיד שאין מביא על הנודע זכר – מביא אשם תלוי, נשיא שמביא על הנודע זכר – אינו דין שיביא אשם תלוי?", "en": "If an individual, who does not bring a male for a known sin, brings a suspensive guilt-offering, then a prince, who does bring a male for a known sin — is it not logical that he brings one?", "move": { "element": "proof", "subtype": "demonstration", "target": "nasi-claim", "marker": "ומה … אינו דין ש…" }, "provenance": "derivation", "anatomy": [{ "kind": "a-fortiori", "basis": "marked" }] },
  { "id": "nilif-yevamah", "he": "ולמה לי קרא? ניליף מיבמה: ומה יבמה, שאין נקנית בכסף — נקנית בביאה, זו, שנקנית בכסף — אינו דין שנקנית בביאה?", "en": "Why do I need a verse? Learn it from the levirate widow: if a levirate widow, who is not acquired with money, is acquired by intercourse, then this woman, who is acquired with money — is it not logical that she is acquired by intercourse?", "move": { "element": "difficulty", "subtype": "objection", "target": "tanna-maisi", "marker": "ולמה לי קרא? ניליף מ…" }, "provenance": "derivation", "anatomy": [{ "kind": "a-fortiori", "basis": "marked", "note": "Kiddushin 4b. The a fortiori is offered as making the verse redundant; the objection is a style/redundant on the verse's use, warranted by the a fortiori." }], "ext": { "warrant": { "kind": "style/redundant" } } },
  { "id": "nilif-amah", "he": "וכסף מנא לן? ניליף מאמה העבריה: ומה אמה העבריה, שאינה נקנית בביאה — נקנית בכסף; זו, שנקנית בביאה — אינו דין שנקנית בכסף?", "en": "And money, from where? Learn it from the Hebrew maidservant: if a maidservant, who is not acquired by intercourse, is acquired with money, then this woman, who is acquired by intercourse — is it not logical that she is acquired with money?", "move": { "element": "proof", "subtype": "demonstration", "target": "kesef-claim", "marker": "ניליף מ…: ומה …" }, "provenance": "derivation", "anatomy": [{ "kind": "a-fortiori", "basis": "marked", "note": "Kiddushin 4b–5a. Defeated in the next unit: the maidservant is heavier under another criterion." }] }
]
```

### Defeats of analogism and a fortiori (p100–104)
- file · edge-level `anatomy` kinds on the unit that attacks the derivation; its `move.target` is the derivation. When the defeat cannot be an edge label (no target), `ext.warrant.defeat`.
- **fallacy-not-included** — a classical syllogism fails because the inclusion it rests on does not hold. Shabbos 70a, Rabbi Yosi holds kindling is not a principal labour; Shabbos 43b `טלטול מן הצד אין שמו טלטול`.
- **fallacy-not-similar** — the supposed similars differ in a relevant respect. Recognize `מה ל… שכן …` · `מי דמי? התם … הכא …` · `לא הרי … כהרי …` · `שאני …`. ex · Kerisos 26a `צבור מנשיא לא אתי, דאיכא למיפרך: מה לנשיא שכן יש בקרבנו נקבה`.
- **fallacy-not-greater** — the lesser/greater ordering reverses under another criterion, so neither is simply heavier. Recognize `מה ל… שכן … תאמר ב… ש…` when it names a respect in which the "lighter" case is heavier. ex · Horayos 10a, prince from Cohen Gadol: `מה למשיח שכן אינו מביא בשגגת מעשה, תאמר בנשיא שמביא בשגגת מעשה`. Severity is per aspect; an a fortiori needs the ordering to hold in every relevant aspect (Sifri Naso, §11 Aspects).
- **fallacy-counterexample** — a third subject shares the antecedent property and lacks P. Recognize `… יוכיח`. ex · Toras Cohanim ibid. — `משיח יוכיח, שמביא על הנודע זכר ואין מביא אשם תלוי`.

```json
[
  { "id": "mi-dami", "he": "מי דמי? התם כל היכא דמנח לה – מקום חיוב הוא; הכא אי מנח לה בסטיו – מקום פטור הוא!", "en": "Is it comparable? There, wherever he sets it down is a place of liability; here, if he sets it down in the colonnade it is a place of exemption!", "move": { "element": "difficulty", "subtype": "objection", "target": "meidi-dehava", "marker": "מי דמי? התם … הכא …" }, "provenance": "derivation", "anatomy": [{ "kind": "fallacy-not-similar", "basis": "marked", "note": "Shabbos 5b: the analogy's subjects differ in the respect that matters, so its conclusion falls." }], "ext": { "axis": ["axis/difference"] } },
  { "id": "mah-lenasi", "he": "צבור מנשיא לא אתי, דאיכא למיפרך: מה לנשיא שכן יש בקרבנו נקבה.", "en": "The community cannot be derived from the prince, for one can object: what of the prince — his offering includes a female.", "move": { "element": "contradiction", "subtype": "opposition", "target": "tzibbur-minasi", "marker": "מה ל… שכן …" }, "provenance": "derivation", "anatomy": [{ "kind": "fallacy-not-similar", "basis": "marked" }] },
  { "id": "lo-harei", "speaker": "Mishnah", "he": "לא הרי השור כהרי המבעה, ולא הרי המבעה כהרי השור.", "en": "The ox is not like the maveh, and the maveh is not like the ox.", "move": { "element": "difficulty", "subtype": "objection", "target": "arbaah-avos", "marker": "לא הרי … כהרי …" }, "provenance": "tradition", "anatomy": [{ "kind": "fallacy-not-similar", "note": "Bava Kamma 2a: neither can be learned from the other alone; each has a feature the other lacks." }], "ext": { "axis": ["axis/difference"] } },
  { "id": "mah-leamah", "he": "מה לאמה העבריה, שאין קנינה לשום אישות; תאמר בזו, שקנינה לשום אישות!", "en": "What of the Hebrew maidservant — her acquisition is not for marriage; can you say the same of this woman, whose acquisition is for marriage?", "move": { "element": "difficulty", "subtype": "objection", "target": "amah-tochiach", "marker": "מה ל… שכן …" }, "provenance": "derivation", "anatomy": [{ "kind": "fallacy-not-similar", "basis": "marked", "note": "Kiddushin 4b: the counterexample is itself not similar, so it does not break the a fortiori." }] }
]
```

```json
[
  { "id": "mah-lemashiach", "he": "מה למשיח שכן אינו מביא בשגגת מעשה, תאמר בנשיא שמביא בשגגת מעשה.", "en": "What of the anointed priest — he does not bring an offering for an unwitting act; can you say the same of the prince, who does?", "move": { "element": "contradiction", "subtype": "opposition", "target": "nasi-mimashiach" }, "provenance": "derivation", "anatomy": [{ "kind": "fallacy-not-greater", "note": "Horayos 10a: the anointed priest was taken as the heavier case, but in this respect the prince is heavier; the ordering does not hold in every aspect." }] },
  { "id": "yotzah-bekesef", "he": "מה לאמה העבריה, שכן יוצאה בכסף — תאמר בזו, שאינה יוצאה בכסף!", "en": "What of the Hebrew maidservant — she also goes free with money; can you say the same of this woman, who does not?", "move": { "element": "difficulty", "subtype": "objection", "target": "nilif-amah", "marker": "מה ל… שכן … תאמר ב…" }, "provenance": "derivation", "anatomy": [{ "kind": "fallacy-not-greater", "note": "Kiddushin 5a: the 'lighter' maidservant is heavier under another criterion — money reaches further in her law — so she is not simply lighter." }] }
]
```

```json
[
  { "id": "mashiach-yochiach", "he": "משיח יוכיח, שמביא על הנודע זכר ואין מביא אשם תלוי.", "en": "Let the anointed priest prove it: he brings a male for a known sin and does not bring a suspensive guilt-offering.", "move": { "element": "contradiction", "subtype": "opposition", "target": "nasi-kv", "marker": "… יוכיח" }, "provenance": "tradition", "anatomy": [{ "kind": "fallacy-counterexample", "basis": "marked", "note": "A third subject shares the antecedent property and lacks the predicate; one counter-case breaks the likeness." }], "ext": { "warrant": { "kind": "rebuttal/invalid-syllogism" } } },
  { "id": "amah-tochiach", "he": "אמה העבריה תוכיח, שנקנית בכסף ואינה נקנית בביאה.", "en": "Let the Hebrew maidservant prove it: she is acquired with money and is not acquired by intercourse.", "move": { "element": "contradiction", "subtype": "opposition", "target": "nilif-yevamah", "marker": "… תוכיח" }, "provenance": "tradition", "anatomy": [{ "kind": "fallacy-counterexample", "basis": "marked" }], "ext": { "warrant": { "kind": "rebuttal/invalid-syllogism" } } }
]
```

### hypothetical-syllogism — היקש תלוי
- he · `שני ענינים, שהם אחד קודם ואחד נמשך, יכריחו זה את זה; פרוש, שבהמצא הקודם – ימצא הנמשך, ובהעדר הנמשך – יעדר הקודם`
- means · From a hypothetical premise: antecedent established ⟹ consequent (ponens, `hypothetical-syllogism`); consequent denied ⟹ antecedent denied (`hypothetical-syllogism-tollens`). The reductio (below) is its disproof form; the tollens is the commonest shape of a Talmudic refutation from consequences.
- markers · `אי סלקא דעתך …, … ; [consequent denied] ⟹ …` · `אם כן …` · `אלא מעתה …` · `אי הכי …` · `ואי … ניתני נמי …`.
- ex · Pesachim 19a `ואי סלקא דעתך סבר כרבי עקיבא, ניתני נמי רביעי בתרומה וחמישי בקדש` — he does not teach a fourth and fifth degree ⟹ he does not hold like R. Akiva.

```json
[
  { "id": "kerabbi-akiva", "he": "ואי סלקא דעתך סבר כרבי עקיבא, ניתני נמי רביעי בתרומה וחמישי בקדש!", "en": "And if you think he holds like R. Akiva, let him also teach a fourth degree in terumah and a fifth in sacred food!", "move": { "element": "contradiction", "subtype": "direct", "target": "savar-keakiva", "marker": "אי סלקא דעתך …, …" }, "provenance": "derivation", "anatomy": [{ "kind": "hypothetical-syllogism-tollens", "note": "Pesachim 19a. If he held like R. Akiva he would teach a fourth and fifth degree; he does not; so he does not hold like R. Akiva." }] },
  { "id": "t7-press", "short": "then the first clause too", "he": "אי הכי, אפילו רישא נמי!", "en": "If so, the first clause should be prohibited as well.", "move": { "element": "difficulty", "subtype": "objection", "target": "t7-seifa-ans", "marker": "אי הכי", "attested": false }, "provenance": "derivation", "anatomy": [{ "kind": "hypothetical-syllogism-tollens", "note": "If olives are forbidden because their appearance shows whose they are, the first clause should be forbidden too; it is not; so the answer as given cannot stand. `אי הכי` objections are this shape." }] },
  { "id": "heicha", "he": "היכא אשכחנא כהאי גוונא דחייב?", "en": "Where do we find such a case that is liable?", "move": { "element": "difficulty", "subtype": "objection", "target": "tanu-rabbanan" }, "provenance": "derivation", "anatomy": [{ "kind": "hypothetical-syllogism", "note": "Shabbos 5b, normalized: if no explicit case makes domain-to-domain carrying liable when an exempt area intervenes, ours is not liable; there is no such case; so it is not liable. The antecedent is affirmed — ponens." }], "ext": { "form": { "normalized": "carrying from store to street through a colonnade is not liable" }, "warrant": { "premises": [{ "text": "if no explicit case makes such carrying liable, ours is not liable", "provenance": "derivation" }, { "text": "there is no such case", "provenance": "sense" }] } } }
]
```

### The phrasing argument — לימא קרא / ליתני / מיבעי ליה / למה לי `[supplied recognizer]`
- means · "Had the intended proposition been A, the wording would have been X; the wording is Y." A hypothetical syllogism whose antecedent is a reading and whose consequent is a wording. One surface form, two different moves — decide by what the speaker does with the wording:
- **(i) aimed at a proposed reading** of a text whose own wording is not in question (Scripture; a Mishnah as an Amora reads it). Y ≠ X refutes reading A → `hypothetical-syllogism-tollens` (anatomy); when A and B are the only readings, refuting A is `proof/indirect` of B (no-middle) → icon `via-opposite` in `anatomy`, `ext.warrant.kind` for the premises. The reply defends the reading or offers another (דחיה), not a lesson in the wording.
  - markers · `אם כן, לימא קרא X! מאי Y?` · `ליכתוב קרא X` · `לכתוב רחמנא X` · `X מיבעי ליה` when it decides between readings.
  - ex · Horayos 9a `דאי סלקא דעתך … נכתבה רחמנא להאי "מאחת" בדלות אי נמי בעשירות` — the placement of מאחת rules out the rival reading.
- **(ii) aimed at the author's own wording** when the reading is agreed: why Y rather than the plainer X? A פירכא on form — `style/redundant`, `style/self-contradictory` (words not fitted to the matter), `style/order-*` — answered by a יישוב naming what the wording teaches (`הא קא משמע לן`, `לא זו אף זו קתני`, `איידי דתנא … תנא …`).
  - markers · `ליתני X!` · `למה לי?` · `מאי איריא X? ליתני Y!` · `X מיבעי ליה` when the reading is not in doubt.
  - ex · Pesachim 4a `האי "הכל נאמנים"? "כל הבתים בחזקת בדוקים" מיבעי ליה` · Berachos 53a `איידי דתנא רישא … תנא סיפא …`.
- test · Is a *reading* being chosen or refuted (→ i, Layer D tollens) or is the reading accepted and the *economy of the words* faulted (→ ii, Layer A פירכא with a style/* warrant)? The wording itself is a premise of provenance `tradition` in both.

```json
[
  { "id": "leima-kra", "speaker": "Rabbah bar Rav Shila", "he": "אמר רבה בר רב שילא: אם כן, לימא קרא ״ויטהר״! מאי ״וטהר״? טהר יומא.", "en": "Rabbah bar Rav Shila said: if so, let the verse say 'and he shall be clean'! What is 'and it is clean'? The day is clear.", "move": { "element": "contradiction", "subtype": "direct", "target": "dilma", "marker": "אם כן, לימא קרא X! מאי Y?" }, "provenance": "tradition", "anatomy": [{ "kind": "hypothetical-syllogism-tollens", "note": "Berachos 2b. Had וטהר meant the man, the verse would say ויטהר; it says וטהר; so it means the day. Two readings only, so refuting one proves the other." }, { "kind": "via-opposite" }], "ext": { "warrant": { "kind": "proof/indirect", "premises": [{ "text": "the verse reads וטהר, not ויטהר", "provenance": "tradition" }, { "text": "'the man' and 'the day' are the only readings", "provenance": "derivation" }] } } },
  { "id": "meachas", "he": "דאי סלקא דעתך … נכתבה רחמנא להאי ״מאחת״ בדלות אי נמי בעשירות!", "en": "For if you think otherwise, let the Merciful One have written 'of one' by the poor man's offering or by the rich man's!", "move": { "element": "proof", "subtype": "demonstration", "target": "meachas-reading", "marker": "דאי סלקא דעתך … נכתבה רחמנא …" }, "provenance": "tradition", "anatomy": [{ "kind": "hypothetical-syllogism-tollens", "note": "Horayos 9a: the placement of מאחת by the tenth-ephah offering rules out the rival reading." }], "ext": { "warrant": { "kind": "proof/indirect" } } }
]
```

```json
[
  { "id": "mibaei-leih", "he": "האי ״הכל נאמנים״? ״כל הבתים בחזקת בדוקים״ מיבעי ליה!", "en": "'All are believed'? It should have said 'all houses are presumed searched'!", "move": { "element": "difficulty", "subtype": "objection", "target": "hakol-neemanim", "marker": "X מיבעי ליה" }, "provenance": "derivation", "note": "Pesachim 4a. The reading is agreed; the law should have been phrased on the houses, not the people — words not fitted to the matter.", "ext": { "warrant": { "kind": "style/self-contradictory" } } },
  { "id": "q-two-clauses", "short": "Why teach both 'I found it' and 'it is all mine'?", "he": "למה לי למתנא… ליתני חדא!", "en": "Why teach both 'I found it' and 'it is all mine'? Let it teach one!", "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah", "marker": "למה לי … ליתני", "attested": false }, "provenance": "derivation", "ext": { "warrant": { "kind": "style/redundant" } } }
]
```

### disjunctive-syllogism — היקש מחלק
- he · `נושאים שונים, שמכרח המצא אחד מהם לבדו בנושא, כשיתברר לנו מציאות האחד – יכרח העדר כל האחרים, וכשיתברר לנו העדר כלם חוץ מאחד – תכרח מציאות האחד הנשאר`
- means · From an exhaustive, exclusive disjunction: one established ⟹ the rest denied; all but one denied ⟹ the last holds. Sound only where the terms have no middle.
- markers · `היכי דמי? אי … אי … אלא לאו …` · `או … או …; [one denied] ⟹ …` · `ממה נפשך` used constructively.
- ex · Pesachim 5b `שמע מינה: הבערה לחלק יצאת` (לחלק or ללאו; not ללאו ⟹ לחלק) · Bava Kamma 104a `היכי דמי? אי דלא עשאו בעדים – מנא ידעינן? אלא לאו – דעשאו בעדים`.

```json
[
  { "id": "havarah", "he": "שמע מינה: הבערה לחלק יצאת.", "en": "Infer from this: kindling was singled out to divide the labours.", "move": { "element": "statement", "subtype": "inference", "target": "havarah-source", "marker": "שמע מינה" }, "provenance": "derivation", "anatomy": [{ "kind": "disjunctive-syllogism", "note": "Pesachim 5b: singled out either to divide or as a mere prohibition; not as a mere prohibition; so to divide." }, { "kind": "inference-necessary" }] },
  { "id": "heichi-dami-104a", "he": "היכי דמי? אי דלא עשאו בעדים – מנא ידעינן? אלא לאו – דעשאו בעדים.", "en": "What is the case? If he did not do it before witnesses, how do we know? Rather, it must be that he did it before witnesses.", "move": { "element": "statement", "subtype": "presumption", "target": "asao", "marker": "היכי דמי? אי … אלא לאו …" }, "provenance": "derivation", "anatomy": [{ "kind": "disjunctive-syllogism", "note": "Bava Kamma 104a: with witnesses or without; without is impossible; so with." }] },
  { "id": "b19", "he": "היכי דמי? אי דאיכא סהדי — ליתו סהדי ולימרו! אלא לאו — דליכא סהדי.", "en": "What is the case? If there are witnesses, let the witnesses come and say! Rather, there are no witnesses.", "move": { "element": "statement", "subtype": "presumption", "target": "b19-source", "marker": "היכי דמי? אי … אלא לאו …" }, "provenance": "derivation", "anatomy": [{ "kind": "disjunctive-syllogism" }] }
]
```

### syllogism — היקש (generic)
- means · The general form: from premises already granted, a conclusion that was not. Every kind above is one; this label is for a derivation that fits no more specific kind — a scriptural derivation by a hermeneutic rule the six do not name, an argument from silence, a chain whose form is not recoverable from the text.

```json
[
  { "id": "t10-support", "short": "so it stands to reason", "he": "הכי נמי מסתברא … והא ״אתם״ ״גם אתם״ אמר רחמנא לרבות שלוחכם", "en": "So too it stands to reason: the verse says \"you also\", including your agent — as you act knowingly, so your agent acts knowingly.", "move": { "element": "proof", "subtype": "validation", "target": "t10-ans", "marker": "תניא כותה ד", "attested": false }, "provenance": "tradition", "anatomy": [{ "kind": "syllogism", "note": "From `אתם` and `גם אתם` to the agent: a derivation from Scripture that fits no more specific kind." }] },
  { "id": "heleni", "speaker": "R. Yehudah", "he": "מעשה בהילני המלכה בלוד … והיו זקנים נכנסין ויוצאין לשם ולא אמרו לה דבר.", "en": "It happened that Queen Heleni's sukkah in Lod was higher than twenty cubits, and the elders went in and out of it and said nothing to her.", "move": { "element": "proof", "subtype": "demonstration", "target": "yehudah", "marker": "מעשה ב…" }, "provenance": "tradition", "anatomy": [{ "kind": "syllogism", "note": "An argument from the elders' silence: no more specific kind fits." }], "ext": { "move": { "composite": "ascribed-proof" } } }
]
```

### Acceptance, rejection, doubt (Ch 8, p112)
- he · `מאמר שתבוא לנו ראיה על אמתו – נקבלהו, מאמר שתהיה לנו ראיה על כזבו – נכחישהו, ושלא תהיה לנו ראיה לא על אמתו ולא על כזבו – נסתפק בו`
Doubt is where every claim starts and where it returns when its support is removed.
- file · derived by the reducer (§13) from `provenance` and the moves that land; never emitted.

### Sources of proof (p112–122) — `provenance`
**From nature — ראיה מצד הטבע.** Self-evident premises that need no further proof:
- `axiom` — מושכלות ראשונים · `ששכל האדם מורה אותם מעצמו` · two exceeds one; the half is less than the whole.
- `sense` — מוחשות · what the senses attest · stone is hard, water wet · Sukkah 40a `יצאו עצים, שהנאתן אחר ביעורן` — seen and felt.

**From convention — ראיה מצד ההסכמה.** Held in common by a community; binding for its members:
- `endoxa` — מפורסמות · what most people hold by being human · pride is base, humility praiseworthy · `כדאמרי אינשי` (Berachos 2b).
- `tradition` — מקובלות · transmitted from fathers and teachers · Scripture, הלכה למשה מסיני, the thirteen מדות, and the word of anyone we may not dispute · Yebamos 40a `ואם יש שם אב – נכסים של אב … דאמר מר: אב קודם לכל יוצאי ירכו` · Sanhedrin 90a proved from Isaiah 60:21 `ועמך כלם צדיקים`.

**From syllogism — ראיה מצד ההקש.** `derivation` · the claim is a valid conclusion from an established premise by any of the forms above · Yebamos 66a (classical) · Horayos 9a `מאחת` (hypothetical).

**Own authority.** `asserted` (file only) · a speaker's ruling or claim standing on his own word until proved; the default when `provenance` is absent.

The six, on the unit whose own authority they describe:

```json
[
  { "id": "chatzi", "speaker": "A", "en": "Half of a debt is less than the whole debt.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "anatomy": [{ "kind": "simple" }] },
  { "id": "etzim", "he": "יצאו עצים, שהנאתן אחר ביעורן.", "en": "Wood is excluded, since its benefit comes after its consumption.", "move": { "element": "statement", "subtype": "inference", "target": "shevi'is-hanaah" }, "provenance": "sense", "note": "Sukkah 40a: that wood gives its benefit after it burns is seen and felt." },
  { "id": "kedaamri", "he": "כדאמרי אינשי: איערב שמשא ואדכי יומא.", "en": "As people say: the sun has set and the day has cleared.", "move": { "element": "proof", "subtype": "validation", "target": "leima-kra", "marker": "כדאמרי אינשי" }, "provenance": "endoxa", "note": "Berachos 2b: common speech adduced for the reading 'the day is clear'." },
  { "id": "av-kodem", "he": "דאמר מר: אב קודם לכל יוצאי ירכו.", "en": "For the master said: a father precedes all his descendants.", "move": { "element": "proof", "subtype": "demonstration", "target": "nichsei-av", "marker": "דאמר מר" }, "provenance": "tradition" },
  { "id": "answer", "he": "חרש וחרשת דקימא תקנתא דרבנן – תקינו להו רבנן נשואין …", "en": "Since deaf-mutes can keep rabbinic ordinances, the rabbis validated their marriage; the insane cannot, so they did not.", "move": { "element": "answer", "subtype": "answer", "target": "question", "attested": true }, "provenance": "derivation" },
  { "id": "abaye", "speaker": "Abaye", "he": "אביי אמר: לא הוי יאוש", "en": "Abaye said: it is not despair.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "asserted" }
]
```

**Indirect proof** — `proof/indirect` · proving the opposite false proves the claim, `ובלבד שלא יהיו מאותם שיש ביניהם אמצעי` — no-middle opposites only. Partial: icon `via-opposite` in `anatomy`; keep `ext.warrant.kind: "proof/indirect"` when premises are recorded; the machinery (usually a tollens) in `anatomy`; the no-middle premise in `premises` or as a `no-middle` row label. Examples: `leima-kra` and `meachas` above.

### Sources of disproof (p122–132)
- **From nature** — Berachos 58b `וגמירי דלא עבר כסלא` ← `והא קא חזינן דעבר` (sense). File: `contradiction/direct` with `provenance: sense` (`chazinan`, §8).
- **From convention** — Chagigah 4a `כל זכורך – לרבות את הקטנים` ← `והא אנן תנן: חוץ מחרש שוטה וקטן` · Bava Kamma 83b `רואין אותו כאלו הוא עבד` ← `והא כתיב: עין תחת עין`. File: `contradiction/direct` with `provenance: tradition`.
- **From syllogism** — kinds in `ext.warrant.kind`, with an icon where one exists:
  - `disproof/indirect` — the contrary is derived from a true premise. Bava Kamma 83b `אימא במיתה ממש` ← `לא סלקא דעתך – דהא אתקש למכה בהמה ישלמנה` (the juxtaposed verse yields *money*, so *death* falls). Pending: `ext.warrant.kind` only.
  - `disproof/reductio` — a consequence of the claim is patently false, so the claim is (tollens). Bava Kamma 84a `אין נתינה אלא ממון` ← `אלא מעתה: כאשר יתן מום באדם – הכי נמי דממון הוא?` Recognize `אלא מעתה …` · `ועוד, … ?!` · `אי הכי …`. Pending: `ext.warrant.kind` only.
  - `disproof/dilemma` — ממה נפשך · every reading of the claim is enumerated and each fails. Bava Kamma 29a `כגון דעברא במיא דרך שרעתא דנהרא` ← `היכי דמי? אי דאיכא דרכא אחרינא – פושע הוא! ואי דליכא דרכא אחרינא – אנוס הוא!` Recognize `היכי דמי? אי … אי …` · `ממה נפשך`. Partial: icon `dilemma` in `anatomy`.

```json
[
  { "id": "ayin-tachas-ayin", "he": "והא כתיב: ״עין תחת עין״!", "en": "But it is written: 'an eye for an eye'!", "move": { "element": "contradiction", "subtype": "direct", "target": "roin-oso", "marker": "והא כתיב" }, "provenance": "tradition", "note": "Bava Kamma 83b. A disproof from convention: the verse against `רואין אותו כאלו הוא עבד`." },
  { "id": "lo-salka", "he": "לא סלקא דעתך – דהא אתקש למכה בהמה ישלמנה.", "en": "Do not think so — for it is juxtaposed to 'one who strikes an animal shall pay for it'.", "move": { "element": "contradiction", "subtype": "direct", "target": "misah-mamash", "marker": "לא סלקא דעתך, דהא …" }, "provenance": "tradition", "anatomy": [{ "kind": "analogism", "basis": "marked", "note": "`דאתקש`: the juxtaposed verse yields money." }], "ext": { "warrant": { "kind": "disproof/indirect", "premises": [{ "text": "מכה אדם is juxtaposed to מכה בהמה, which is paid in money", "provenance": "tradition" }] }, "axis": ["axis/similarity"] } }
]
```

```json
[
  { "id": "ela-meatah", "he": "אלא מעתה: ״כאשר יתן מום באדם״ – הכי נמי דממון הוא?", "en": "But then, 'as he has given a blemish to a man' — is that too money?", "move": { "element": "contradiction", "subtype": "direct", "target": "ein-nesinah", "marker": "אלא מעתה …" }, "provenance": "derivation", "anatomy": [{ "kind": "hypothetical-syllogism-tollens", "note": "Bava Kamma 84a. If every נתינה is money, this one is too; it patently is not; so the claim falls." }], "ext": { "warrant": { "kind": "disproof/reductio" } } },
  { "id": "veod", "speaker": "Rava", "he": "ועוד, כל מצות עשה נחייבינהו מדרבנן?!", "en": "And further — shall we then obligate them rabbinically in every positive commandment?!", "move": { "element": "contradiction", "subtype": "direct", "target": "abaye-derabbanan" }, "provenance": "derivation", "anatomy": [{ "kind": "hypothetical-syllogism-tollens", "note": "Berachos 20b. If a rabbinic obligation is created wherever the Torah exempts, it would be created everywhere; it is not; so Abaye's account falls." }], "ext": { "warrant": { "kind": "disproof/reductio" } } },
  { "id": "b20", "he": "אלא מעתה, בהמה טמאה נמי תהא אסורה בהנאה?!", "en": "But then an unclean animal too should be forbidden for benefit?!", "move": { "element": "contradiction", "subtype": "direct", "target": "b20-claim", "marker": "אלא מעתה …" }, "provenance": "derivation", "anatomy": [{ "kind": "hypothetical-syllogism-tollens" }], "ext": { "warrant": { "kind": "disproof/reductio" } } }
]
```

```json
[
  { "id": "heichi-dami-29a", "he": "היכי דמי? אי דאיכא דרכא אחרינא – פושע הוא! ואי דליכא דרכא אחרינא – אנוס הוא!", "en": "What is the case? If there was another road, he was negligent! And if there was no other road, he was compelled!", "move": { "element": "contradiction", "subtype": "direct", "target": "shirata", "marker": "היכי דמי? אי … אי …" }, "provenance": "derivation", "anatomy": [{ "kind": "dilemma", "note": "Bava Kamma 29a. Both readings enumerated, each fails: ממה נפשך." }, { "kind": "disjunctive-syllogism" }, { "kind": "no-middle", "note": "Another road or not: nothing between." }], "ext": { "warrant": { "kind": "disproof/dilemma" } } },
  { "id": "dilemma", "speaker": "B", "en": "Then either charitable pledges are contracts that lack consideration, or they are not contracts at all. You cannot have it both ways.", "move": { "element": "difficulty", "subtype": "objection", "target": "estoppel" }, "provenance": "derivation", "anatomy": [{ "kind": "dilemma" }, { "kind": "disjunction" }, { "kind": "no-middle" }], "ext": { "warrant": { "kind": "disproof/dilemma" } } }
]
```

### Rebutting a proof or disproof (p132–142)
A proof or disproof is rebutted by showing it does not bear on the claim, or that its syllogism fails. The move is a דחיה (`contradiction/opposition`) of the proof or disproof — occasionally a סתירה when the rebuttal shows the proof outright false. The kind is `ext.warrant.kind: "rebuttal/*"`; `rebuttal/irrelevant` also has the icon `ground-does-not-reach`.
- `rebuttal/irrelevant` — the verse, sense report, tradition, etc. does not prove or disprove *this* claim. Icon `ground-does-not-reach`. ex · Bava Kamma 88a `החובל בעבד כנעני שלו פטור`, proved from `כי ינצו אנשים יחדו איש ואחיו` (a slave has no brotherhood) ← `אחיו הוא במצוות` · Berachos 58b `והא קא חזינן דעבר` ← `זיוה הוא דעבר` — the sense report is reinterpreted · Sukkah 2b `משם ראייה? אשה היתה ופטורה מן הסוכה` — a false friend: the words `משם ראיה` here mean "is that a proof?", not "from there is *my* proof".
- `rebuttal/invalid-syllogism` — the derivation fails by a Ch 7 defeat. ex · `משיח יוכיח` · `אמה העבריה תוכיח`. The defeat is the edge label; the rebuttal kind is in `ext`.
- `rebuttal/your-reasoning` — ולטעמיך / ולדידך · turn the same or another difficulty on the objector's own view, forcing a qualification that saves both. ex · Bava Kamma 88a `אלא מעתה לרבנן עבד יהא כשר למלכות?` ← `ולטעמיך תקשי לך גר לדברי הכל? אלא אמר קרא: מקרב אחיך – המובחר שבאחיך` · Berachos 4b `דאי לא תימא הכי – שחרית היכי מצי סמיך?`.
- `rebuttal/just-the-opposite` — אדרבה · lift the difficulty from one's own claim and land it on the opponent's. ex · Bava Kamma 83b `דנין ניזקין מניזקין ואין דנין ניזקין ממיתה` ← `אדרבה! דנין אדם מאדם ואין דנין אדם מבהמה`.
- `rebuttal/that-proves-mine` — היא הנותנת / משם ראיה · the opponent's proof-text is read as proof of one's own view. ex · Shabbos 82a — R. Meir from `לחתות אש מיקוד`; R. Yosi: `משם ראיה! – ולחשוף מים מגבא`.

- After rebuttal · `כל זמן שתסתתר הראיה המאמתת ישוב המאמר מספק … וכן כשתסתתר המכחשת ישוב מספק` — status returns to doubt, in both directions. The reducer does this on its own: a proof that has been unsettled is *weakened*, and a weakened `raise` or `reject` pushes its target to doubt and no further.

**How a rebuttal is recorded.** `ext.warrant.kind` names what the unit *does* to the proof; whatever it leans on — a verse, a received ruling, a reinterpretation, a syllogism — is a premise. Not `provenance: tradition` alone, which would say the unit merely cites a source; the provenance of the unit is still filled, and the rebuttal kind is what is added.

```json
[
  { "id": "achiv", "he": "אחיו הוא במצוות.", "en": "He is his brother in the commandments.", "move": { "element": "contradiction", "subtype": "opposition", "target": "proof-from-brother" }, "provenance": "tradition", "anatomy": [{ "kind": "ground-does-not-reach", "note": "The verse about brothers is real; a Canaanite slave is a brother in commandments, so it does not exempt him." }], "ext": { "warrant": { "kind": "rebuttal/irrelevant", "premises": [{ "text": "אחיו הוא במצוות — a Canaanite slave is a brother in commandments", "provenance": "tradition" }] } } },
  { "id": "misham-reayah", "he": "אמרו לו: משם ראייה? אשה היתה, ופטורה מן הסוכה!", "en": "They said to him: is that a proof? She was a woman, and exempt from the sukkah!", "move": { "element": "contradiction", "subtype": "opposition", "target": "heleni" }, "provenance": "tradition", "note": "Sukkah 2b. The elders' silence proves nothing about the rule: the sukkah was a woman's, and she was exempt. `משם ראייה` here is a rhetorical 'is that a proof?', not the היא הנותנת of rebuttal/that-proves-mine.", "ext": { "warrant": { "kind": "rebuttal/irrelevant", "premises": [{ "text": "women are exempt from the sukkah", "provenance": "tradition" }] } } }
]
```

```json
[
  { "id": "uletaamich", "he": "ולטעמיך תקשי לך גר לדברי הכל? אלא אמר קרא: ״מקרב אחיך״ – המובחר שבאחיך.", "en": "And by your reasoning, a convert should trouble you on everyone's view! Rather, the verse says 'from among your brothers' — the choicest of your brothers.", "move": { "element": "contradiction", "subtype": "opposition", "target": "eved-melech", "marker": "ולטעמיך" }, "provenance": "tradition", "note": "Bava Kamma 88a. The difficulty is turned on the objector's own view; a qualification (the choicest) saves both.", "ext": { "warrant": { "kind": "rebuttal/your-reasoning", "premises": [{ "text": "מקרב אחיך — the choicest of your brothers", "provenance": "tradition" }] } } },
  { "id": "dei-lo-teima", "he": "דאי לא תימא הכי — שחרית היכי מצי סמיך? והא אמר רבי יוחנן: בתחלה אומר ״ה' שפתי תפתח״ ולבסוף הוא אומר ״יהיו לרצון אמרי פי״!", "en": "For if you do not say so, how can one join them in the morning? R. Yochanan said one first says 'O Lord, open my lips' and at the end 'may the words of my mouth be acceptable'!", "move": { "element": "proof", "subtype": "demonstration", "target": "geulah-arichta", "marker": "דאי לא תימא הכי" }, "provenance": "derivation", "anatomy": [{ "kind": "hypothetical-syllogism-tollens" }], "note": "Berachos 4b. The same difficulty is shown to arise for the objector's own morning practice, so the answer given (`כגאולה אריכתא`) must be accepted there too.", "ext": { "warrant": { "kind": "rebuttal/your-reasoning" } } },
  { "id": "oral-agreements", "speaker": "A", "en": "And by your own reasoning, if silence means inclusion, then the statute also covers oral agreements — which you deny.", "move": { "element": "contradiction", "subtype": "opposition", "target": "just-the-opposite" }, "provenance": "derivation", "anatomy": [{ "kind": "hypothetical-syllogism-tollens" }], "ext": { "warrant": { "kind": "rebuttal/your-reasoning" } } }
]
```

```json
[
  { "id": "adrabah", "he": "אדרבה! דנין אדם מאדם ואין דנין אדם מבהמה.", "en": "On the contrary! We derive man from man and do not derive man from animal.", "move": { "element": "contradiction", "subtype": "opposition", "target": "danin", "marker": "אדרבה" }, "provenance": "derivation", "ext": { "warrant": { "kind": "rebuttal/just-the-opposite" } } },
  { "id": "just-the-opposite", "speaker": "B", "en": "Just the opposite: the silence shows Congress saw no need to name what was obviously included.", "move": { "element": "contradiction", "subtype": "opposition", "target": "silence-excludes" }, "provenance": "derivation", "ext": { "warrant": { "kind": "rebuttal/just-the-opposite" } } }
]
```

```json
[
  { "id": "lachsof", "speaker": "R. Yosi", "he": "משם ראיה! – ״ולחשוף מים מגבא״.", "en": "From there is the proof! — 'and to scoop water from a cistern'.", "move": { "element": "contradiction", "subtype": "opposition", "target": "meir-lachtos", "marker": "משם ראיה" }, "provenance": "tradition", "note": "Shabbos 82a. R. Meir's verse, read on, proves R. Yosi's measure.", "ext": { "warrant": { "kind": "rebuttal/that-proves-mine", "premises": [{ "text": "ולחשוף מים מגבא", "provenance": "tradition" }] } } },
  { "id": "amendment-mine", "speaker": "B", "en": "That amendment is precisely my proof. Nobody amends a statute to add what it never touched; they amend it to settle a reading that was already being applied.", "move": { "element": "contradiction", "subtype": "opposition", "target": "amendment-proof" }, "provenance": "derivation", "ext": { "warrant": { "kind": "rebuttal/that-proves-mine", "premises": [{ "text": "amendments settle readings already in use", "provenance": "endoxa" }] } } }
]
```

### sevara — סברא (p142–144)
- he · `מין ראיה אחרת שאינה לא מאמתת לגמרי ולא מכחשת לגמרי, אלא מטה הדעת לאחד מן הצדדים`
- means · When arguments balance, the mind inclines to the more reasonable side. A tiebreak weight, not a status. A proof from סברא is admissible but weak (p176); a דחיה that is too far-fetched fails against it (p180). No calculus is given — do not invent numbers.
- markers · `מסתברא` · `מסתברא כמאן דאמר …` · `הכי נמי מסתברא` (when it is not followed by a source).
- file · partial — icon `theory` in `anatomy`; keep `ext.warrant.kind: "sevara"`. The move is a `proof/validation` of the side inclined to (the reducer will treat it as a full `raise`, which is more than Ramchal grants; say so in `note`), or an `answer/determination` when it closes an איבעיא.

```json
[
  { "id": "mistabra", "he": "ומסתברא כמאן דאמר: אף מחזיר.", "en": "And it stands to reason like the one who says: even one who returns.", "move": { "element": "proof", "subtype": "validation", "target": "af-machzir", "marker": "מסתברא כמאן דאמר …" }, "provenance": "derivation", "anatomy": [{ "kind": "theory", "note": "Chullin 19b. A סברא inclines; it does not establish. The reducer reads any `raise` as full, so the note carries the weaker weight." }], "ext": { "warrant": { "kind": "sevara" } } },
  { "id": "c3", "he": "לא איתמר בה לא ראיה ולא סתירה, ומסתברא כרב.", "en": "Neither proof nor contradiction was stated on it, and it stands to reason like Rav.", "move": { "element": "proof", "subtype": "validation", "target": "c1", "marker": "מסתברא" }, "provenance": "derivation", "note": "[constructed] Arguments balance; the inclination is recorded as a weak validation.", "ext": { "warrant": { "kind": "sevara" } } }
]
```

### Aspects — בחינות (p144–154)
- he · `המאמר שנאמר לפי בחינה אחת לא תעשהו הקדמה לתולדה בבחינה אחרת, כי אין הדמיון וההשואה ביניהם אמתיים אלא נראים`
A predicate is said of a subject *in some respect*. Terms that match as strings do not match as terms unless the respect matches. Four respects:
- `aspect/essence` — מה שבעצמו · what the subject's being depends on; remove it and the subject is something else · a knife is a cutting tool · `האדם חי מדבר`.
- `aspect/proprium` — מה שבסגולתו · always accompanies the subject, though its being does not depend on it · Parah 9:3 `חוץ מן החולדה, מפני שהיא מלקת` — lapping always accompanies the weasel; the ruling depends on it · `האדם צוחק`.
- `aspect/accident` — מה שבמקריו · could be otherwise and the subject remain · shape, size, colour; a ruling on "round" or "long" depends on the accident holding · `האדם הזה לבן`.
- `aspect/relation` — מה שביחסו אל זולתו · holds only with respect to another subject · similar/dissimilar, agent/patient, father/son, north of; the relational categories: relation, time, situation, possession, position.

- Rule · A claim in one respect neither yields nor blocks a conclusion in another. Pesachim 19b `עזרה רשות הרבים היא` holds for doubtful impurity; it does not make carrying four cubits there a Shabbos liability, and a claim that the עזרה is רשות היחיד for Shabbos does not contradict it. Sifri Naso 5:13 `כשבא איסור הקל על איסור הקל – אסר את אוסריו`: אשת איש is *lighter* than חמותו in the respect of having a release (divorce, death) and *heavier* in the respect of punishment (Yebamos 94b — strangulation vs burning reducible to excision), so an a fortiori between them fails (`fallacy-not-greater`). Specific texts index on whatever respect does the work — a legal domain, a purpose; the four are the general schema. Unknown respect → `null`.
- file · pending — `ext.warrant.aspect`. When two statements are shown to be in different respects, the present edge kind `differs-in-context` carries the relation; the aspect names which respect each is in.

```json
[
  { "id": "p1", "he": "האדם — חי מדבר.", "en": "Man is a speaking animal.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "anatomy": [{ "kind": "unqualified" }], "ext": { "warrant": { "aspect": "aspect/essence" }, "axis": ["axis/essence"] } },
  { "id": "p2", "he": "האדם — צוחק.", "en": "Man laughs.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "endoxa", "ext": { "warrant": { "aspect": "aspect/proprium" } } },
  { "id": "chuldah", "he": "חוץ מן החולדה, מפני שהיא מלקת.", "en": "Except the weasel, because it laps.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "exception", "basis": "marked" }], "note": "Parah 9:3. Lapping always accompanies the weasel without being its essence; the ruling rests on it.", "ext": { "warrant": { "aspect": "aspect/proprium" } } },
  { "id": "p3", "he": "האדם הזה — לבן.", "en": "This man is white.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "sense", "anatomy": [{ "kind": "particular" }], "ext": { "warrant": { "aspect": "aspect/accident" }, "axis": ["axis/quality"] } },
  { "id": "p4", "he": "ראובן — אביו של חנוך.", "en": "Reuven is the father of Chanoch.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "particular" }], "ext": { "warrant": { "aspect": "aspect/relation" }, "axis": ["axis/relation"] } },
  { "id": "azarah", "he": "עזרה רשות הרבים היא.", "en": "The Temple courtyard is a public domain.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Pesachim 19b. Said in the respect of doubtful impurity; it is no premise for a Shabbos conclusion, and a Shabbos claim that it is a private domain does not oppose it.", "ext": { "warrant": { "aspect": "the law of doubtful impurity (a specific respect; the four are the schema)" } } }
]
```

The four again, in a non-Talmudic register, and one chain that fails for want of a shared aspect:

```json
[
  { "id": "knife-essence", "speaker": "A", "en": "A knife is a cutting tool.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "ext": { "warrant": { "aspect": "aspect/essence" }, "axis": ["axis/essence"] } },
  { "id": "knife-proprium", "speaker": "A", "en": "A knife has an edge.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "note": "Always accompanies a knife; its being a knife does not consist in it.", "ext": { "warrant": { "aspect": "aspect/proprium" } } },
  { "id": "knife-accident", "speaker": "A", "en": "This knife is six inches long.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "sense", "anatomy": [{ "kind": "particular" }], "ext": { "warrant": { "aspect": "aspect/accident" }, "axis": ["axis/quantity"] } },
  { "id": "knife-relation", "speaker": "A", "en": "This knife is sharper than that one.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "sense", "anatomy": [{ "kind": "particular" }], "ext": { "warrant": { "aspect": "aspect/relation" }, "axis": ["axis/relation", "axis/quality"] } },
  { "id": "weapon-chain", "speaker": "B", "en": "A knife is a cutting tool; cutting tools are kitchen equipment; so a knife found on the defendant is kitchen equipment, not a weapon.", "move": { "element": "proof", "subtype": "demonstration", "target": "not-weapon" }, "provenance": "derivation", "anatomy": [{ "kind": "classical-syllogism" }], "note": "The chain slides between aspects: 'cutting tool' in the respect of essence, 'kitchen equipment' in the respect of accident (where it is kept, what it is used for). Same words, not the same term — the syllogism fails (p144).", "ext": { "warrant": { "aspect": null, "premises": [{ "text": "a knife is a cutting tool", "provenance": "axiom" }, { "text": "cutting tools are kitchen equipment", "provenance": "endoxa" }] } } }
]
```

### Modality — בכח / בפועל (p154–156)
- means · A predicate may be said of a subject as actually holding (בפועל) or as a capacity (בכח, `ראוי ל…`). Chaining requires the same modality. Unknown → `null`.
- file · pending — `ext.warrant.modality: "potential" | "actual"`.
- ex · Zevachim 99a `כהן המחטא – מחלק, ושאינו מחטא – אינו מחלק` ← `וכללא הוא? והרי משמרה כולה דאין מחטאין ומחלקין?` → `ראוי לחיטוי קאמרינן` — the objector read בפועל; the resolution reads בכח.

```json
[
  { "id": "mechate", "he": "כהן המחטא – מחלק, ושאינו מחטא – אינו מחלק.", "en": "A priest who performs the blood service shares in the meat; one who does not, does not.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "preclusive" }], "ext": { "warrant": { "modality": "potential" }, "note": "Read בכח after the resolution below." } },
  { "id": "mishmarah", "he": "וכללא הוא? והרי משמרה כולה דאין מחטאין ומחלקין?", "en": "Is that a rule? The whole watch does not perform the blood service, yet they share!", "move": { "element": "contradiction", "subtype": "direct", "target": "mechate", "marker": "וכללא הוא? והרי …" }, "provenance": "tradition", "anatomy": [{ "kind": "contradictory" }], "ext": { "warrant": { "modality": "actual" } } },
  { "id": "rauy", "he": "ראוי לחיטוי קאמרינן.", "en": "We mean one fit to perform the blood service.", "move": { "element": "resolution", "subtype": "settlement", "target": "mishmarah", "marker": "ראוי ל… קאמרינן" }, "provenance": "derivation", "anatomy": [{ "kind": "differs-in-context", "note": "Zevachim 99a: the objector read the rule as actual performance; it speaks of the capacity. Two modalities, no clash." }], "ext": { "warrant": { "modality": "potential" } } }
]
```

```json
[
  { "id": "m1", "he": "כהן זה — ראוי לעבודה.", "en": "This priest is fit for the service.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "asserted", "anatomy": [{ "kind": "particular" }], "ext": { "warrant": { "modality": "potential" } } },
  { "id": "m2", "he": "כהן זה — עובד עכשיו במקדש.", "en": "This priest is now serving in the Temple.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "sense", "anatomy": [{ "kind": "particular" }], "ext": { "warrant": { "modality": "actual" } } },
  { "id": "eligible", "speaker": "A", "en": "Every citizen is eligible to vote.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "categorical" }], "ext": { "warrant": { "modality": "potential" } } },
  { "id": "neighbor", "speaker": "B", "en": "My neighbor is a citizen and does not vote; so not every citizen votes, and your rule is false.", "move": { "element": "contradiction", "subtype": "direct", "target": "eligible" }, "provenance": "sense", "anatomy": [{ "kind": "contradictory" }, { "kind": "classical-syllogism" }], "ext": { "warrant": { "kind": "disproof/indirect", "modality": "actual" } } },
  { "id": "capacity", "speaker": "A", "en": "Eligible means entitled to vote if registered — a capacity, not the act. Your counterexample is about a different modality.", "move": { "element": "contradiction", "subtype": "opposition", "target": "neighbor" }, "provenance": "derivation", "anatomy": [{ "kind": "differs-in-context" }], "ext": { "warrant": { "kind": "rebuttal/invalid-syllogism", "modality": "potential" } } }
]
```

### Stylistic proofs and disproofs (p156–158)
A statement may be faulted for its *form* rather than its content. These are the standard instances of פירכא (`difficulty/objection`); the kind is pending, `ext.warrant.kind: "style/*"`.

**The statement as a whole** — `מחקר ישר הספור הוא שתהיה בספור תועלת ולא יהיה בו מותר ודבר בטל`:
- `style/obvious` — פשיטא! · the statement says what everyone knows. Resolved by `סלקא דעתך` (`מהו דתימא … קא משמע לן`): a reason one might have thought otherwise, which the statement excludes.

**The statement in its parts** — no part superfluous or repeated; words fit the matter and each other; order divides what should be divided and joins what should be joined:
- `style/redundant` — הא תו למה לי? · a clause adds nothing. Also `למה לי … ליתני חדא`, `אטו … לאו … נינהו`, `היינו הך`, `מאי קא משמע לן`.
- `style/self-contradictory` — הא גופא קשיא! · the parts do not cohere; or the words are not fitted to the matter (`X מיבעי ליה` when the reading is agreed).
- `style/order-context` — תנא היכא קאי? (Berachos 2a) · the statement presupposes a context not given.
- `style/order-combine` — ליערבינהו וליתנינהו! (Gittin 80b) · cases that belong together are separated.
- `style/order-inconsistent` — פתח בכד וסיים בחבית! (Bava Kamma 27a) · terms shift mid-statement; also `מאי שנא הכא דתני … ומאי שנא התם דתני …`, `וליפלוג … ברישא`, `מאי שנא דתני … ברישא`.

Also in this family, as resolutions: `הא קא משמע לן`, `זו ואין צריך לומר זו קתני`, `לא זו אף זו קתני`, `מלתא אגב אורחיה קמשמע לן`, `חדא קתני`, `מה הן קתני`.

```json
[
  { "id": "a2", "he": "פשיטא!", "en": "That is obvious!", "move": { "element": "difficulty", "subtype": "objection", "target": "a1", "marker": "פשיטא!" }, "provenance": "derivation", "ext": { "warrant": { "kind": "style/obvious" } } },
  { "id": "obviously", "speaker": "B", "en": "Obviously. Why say it at all?", "move": { "element": "difficulty", "subtype": "objection", "target": "signed" }, "provenance": "derivation", "ext": { "warrant": { "kind": "style/obvious" } } },
  { "id": "might-have-thought", "speaker": "A", "en": "You might have thought a filing signed by counsel alone suffices; the rule excludes that.", "move": { "element": "resolution", "subtype": "settlement", "target": "obviously" }, "provenance": "derivation", "note": "The English shape of `מהו דתימא … קא משמע לן`." }
]
```

```json
[
  { "id": "ha-tu", "he": "הא תו למה לי?", "en": "Why do I need this further clause?", "move": { "element": "difficulty", "subtype": "objection", "target": "seifa", "marker": "הא תו למה לי?" }, "provenance": "derivation", "ext": { "warrant": { "kind": "style/redundant" } } },
  { "id": "atu", "he": "אטו גזילות וחבלות לאו דיני ממונות נינהו?!", "en": "Are robbery and injury not cases of monetary law?!", "move": { "element": "difficulty", "subtype": "objection", "target": "1b", "marker": "אטו … לאו … נינהו" }, "provenance": "derivation", "ext": { "warrant": { "kind": "style/redundant" } } },
  { "id": "ha-gufa", "he": "הא גופא קשיא!", "en": "This itself is self-contradictory!", "move": { "element": "difficulty", "subtype": "objection", "target": "baraita-gufa", "marker": "הא גופא קשיא!" }, "provenance": "derivation", "ext": { "warrant": { "kind": "style/self-contradictory" } } },
  { "id": "mibaei-leih-2", "he": "האי ״הכל נאמנים״? ״כל הבתים בחזקת בדוקים״ מיבעי ליה!", "en": "'All are believed'? It should have said 'all houses are presumed searched'!", "move": { "element": "difficulty", "subtype": "objection", "target": "hakol-neemanim", "marker": "X מיבעי ליה" }, "provenance": "derivation", "ext": { "warrant": { "kind": "style/self-contradictory" } } }
]
```

```json
[
  { "id": "tanna-heicha", "he": "תנא היכא קאי דקתני ״מאימתי״?", "en": "On what is the Tanna standing, that he teaches 'from when'?", "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah", "marker": "תנא היכא קאי" }, "provenance": "derivation", "note": "Berachos 2a. `מאימתי` presupposes an obligation the Mishnah has not stated; the settlement is `תנא אקרא קאי`.", "ext": { "warrant": { "kind": "style/order-context" } } },
  { "id": "tanna-heicha-taanis", "he": "תנא היכא קאי דקתני ״מאימתי מזכירין גבורות גשמים״?", "en": "On what is the Tanna standing, that he teaches 'from when does one mention the power of rain'?", "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah-taanis", "marker": "תנא היכא קאי" }, "provenance": "derivation", "note": "Taanis 2a. The same objection to the same word; answered `תנא התם קאי` — the context is the Mishnah in Rosh Hashanah.", "ext": { "warrant": { "kind": "style/order-context" } } },
  { "id": "liarvinhu", "he": "ליערבינהו וליתנינהו: על פירות האילן ועל פירות הארץ מברך, חוץ מן היין ומן הפת!", "en": "Let it combine them and teach: over fruit of the tree and fruit of the ground one blesses — except wine and bread!", "move": { "element": "difficulty", "subtype": "objection", "target": "d1", "marker": "ליערבינהו וליתנינהו" }, "provenance": "derivation", "note": "[constructed] on the two clauses of Berachos 35a; the stock form is Gittin 80b.", "ext": { "move": { "targets": ["d1", "d2"] }, "warrant": { "kind": "style/order-combine" } } },
  { "id": "liarvinhu-gittin", "he": "ליערבינהו וליתנינהו!", "en": "Let it combine them and teach them together!", "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah-gittin-80b", "marker": "ליערבינהו וליתנינהו" }, "provenance": "derivation", "note": "Gittin 80b: two cases with one law taught in two clauses; the answer names what the separation teaches.", "ext": { "warrant": { "kind": "style/order-combine" } } },
  { "id": "kad-chavis", "he": "פתח בכד וסיים בחבית!", "en": "It opens with a jug and ends with a barrel!", "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah-kad", "marker": "פתח בכד וסיים בחבית" }, "provenance": "derivation", "note": "Bava Kamma 27a.", "ext": { "warrant": { "kind": "style/order-inconsistent" } } },
  { "id": "arvis-berisha", "he": "ותו: מאי שנא דתני בערבית ברישא? לתני דשחרית ברישא!", "en": "And further: why does it teach the evening first? Let it teach the morning first!", "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah", "marker": "מאי שנא דתני … ברישא" }, "provenance": "derivation", "note": "Berachos 2a.", "ext": { "warrant": { "kind": "style/order-inconsistent" } } }
]
```

---

## §12 · Layer E — Axes of distinction: the 24 הבחנות (Ch 11, p222–236)

- he · `ההבחנות שיש להבחין בנושאים שנרצה לדון כפי הסוגיות וההלכות או כפי השכל`
- Use · When a statement, an אוקימתא, a תירוץ, or a חילוק turns on *which respect* of the subject is in play, record the axis. Also the vocabulary for "what is this sentence about?" when a sentence describes rather than argues. For a statement, the הבחנה its predicate turns on; for other moves, the distinction the אוקימתא or חילוק introduces. Every statement falls under some הבחנה, so a statement gets at least one; a law that turns on a measure, count or size anywhere in the proposition (`למעלה מעשרה טפחים`, `ארבע אמות`, `רוב`, `כזית`) → `axis/quantity`; an analogy (`ניליף מ־`, `מה מצינו`, `הצד השוה`, `דומה ל־`) → `axis/similarity`; a distinction (`מה ל־X שכן`, `שאני`, `אינו דומה ל־`) → `axis/difference`; a time or place condition → `axis/time`, `axis/place`.
- file · **pending** — `ext.axis: ["axis/…", …]`, a list, on the unit. Nothing on the page reads it yet.

| # | key | he | en | means | ex |
|---|---|---|---|---|---|
| 1 | axis/essence | מהות → גדר | essence → definition | what the subject is, distinguishing it from all else; stated as a definition naming the essential, not the incidental | Pe'ah 7:4 `איזוהי עוללת? כל שאין לה לא כתף ולא נטף` |
| 2 | axis/parts | חלקים | parts | its components | Chullin 43a `שני עורות יש לו לושט` · Shevi'is 9:2 `גליל העליון, גליל התחתון, והעמק` |
| 3 | axis/quality | איכות | quality | constitution, color, hardness, temperament | Chullin 43a `חיצון אדום, ופנימי לבן` · Chullin 76a `אשוני הוו צומת הגידין, רכיכי לא` |
| 4 | axis/quantity | כמות | quantity | measure or number | Kil'ayim 5:5 `מקדש שש עשרה אמה לכל רוח` · `ארבעים וחמשה גפנים` |
| 5 | axis/material | חומר | material | what it is made of | כלי מתכת / כלי חרס |
| 6 | axis/form | צורה | form | definitive form עצמית (man = בעל חי מדבר) or physical shape מורגשת | Menachos 94b `כמין תיבה פרוצה` · Kelim 28:7 `כמין גם` |
| 7 | axis/action | פעולה | action | what it does to another: natural טבעית (`דמנקרא להו למעיא`) or voluntary רצונית | Berachos 15a `הקורא את שמע` |
| 8 | axis/affection | הפעל | affection | the impression another's action leaves on it | Chullin 50a `בני מעיין שניקבו וליחה סותמתן` · Shabbos 40b `שהיד סולדת בו` · Pesachim 74a `חם מקצתו – חם כולו` |
| 9 | axis/genus-species | סוג ומין · סוג הסוג | genus and species | which class, at which level: אדם species; בעל חי genus; גשם higher genus; כלי עץ → פשוטי / מקבלי | Pesachim 17a `משקי בי מדבחיא` vs `הדם והיין והשמן והמים` |
| 10 | axis/cause | סיבה | cause | generative מולדת (tree → fruit; father → son) or effective פועלת (craftsman → vessel) | Bava Metzia 8b `דאזלא מחמתה` · Yoma 76b `חמרא וריחני פקחין` |
| 11 | axis/means | אמצעי | means | the instrument through which the cause acts | Kesubos 75a `אפשר לעברה בקיוהא דחמרא` |
| 12 | axis/motive | מעורר | motive | what moves a voluntary agent to act | Zevachim 116a `מה שמועה שמע ובא ונתגייר? קריעת ים סוף שמע ובא` |
| 13 | axis/purpose | תכלית | purpose | what the agent seeks by the act | `הלומד על מנת לעשות` |
| 14 | axis/result | מסובב | result | what issues from the subject as its effect | walking from being led; the son; the vessel |
| 15 | axis/attribute | מתחבר | attribute | an accident joined to the subject: (a) inherent / resting on / associated — חכמה בחכם, ציפוי על הכלי, בהמה מסוכנת, מטפחת שרויה במים; (b) coincident in time; (c) before or after | (b) Pesachim 76b `פת שאפאה עם צלי` · Berachos 35b `כל שהוא עיקר ועמו טפלה` · (c) Berachos 51b `נוטלין לידים ואחר כך מוזגין את הכוס` |
| 16 | axis/place | מקום | place / position | where, and spatial arrangement | Eruvin 87b `שתי גזוזטראות זו למעלה מזו` · `שתי עיירות זו סמוכה לזו` · Eruvin 75b `עשרה בתים זה לפנים מזה` |
| 17 | axis/posture | מצב | situation / posture | how it is set in its place | Megillah 21a `הקורא את המגילה עומד ויושב` · Berachos 10b `בערב כל אדם יטה ויקרא ובבקר יעמוד` |
| 18 | axis/movement | תנועה | movement | change of place | Pesachim 50a `ההולך ממקום שאין עושים למקום שעושים` |
| 19 | axis/time | זמן | time | when | Berachos 2a `מאימתי קורין את שמע?` |
| 20 | axis/relation | יחס | relation | its standing toward another | דורו של משה · זרעו של אברהם |
| 21 | axis/bearer | נושא | subject / bearer | given an attribute, what bears it | Pesachim 14b `איזהו דבר שחלוקה טומאתו בין טומאת מת לשרץ? הוי אומר, זה מתכת` |
| 22 | axis/similarity | דמיון | comparison | likeness to another | Chullin 17b `דמיא לסאסאה` · Shabbos 101b `חרב הרי הוא כחלל` · Kesubos 60a `אידי ואידי חד שיעורא הוא` |
| 23 | axis/difference | הבדל | difference | absence of likeness | Pesachim 22a `שאני דם דאתקש למים` · 22b `שאני אבר מן החי דאתקש לדם` |
| 24 | axis/opposition | ניגוד | contrast | the opposite of likeness — §10 opposition | — |

Relation to §10's opposition tests: `differs-in-time` = axis 19; `differs-in-place` = 16; `differs-in-context` = whichever axis carries the respect (often 17, 20, 21). Relation to §11's aspects: the aspects say *how* P attaches to S; the axes say *which feature* of S is under discussion.

Two units per axis, from the book's examples and the calibration battery (`[constructed]` where marked):

```json
[
  { "id": "x1a", "he": "איזוהי עוללת? כל שאין לה לא כתף ולא נטף.", "en": "What is an olelet? Any cluster that has neither shoulder nor pendant.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/essence"] } },
  { "id": "x1b", "he": "איזהו נשך? המלוה סלע בחמשה דינרין, סאתים חטין בשלש.", "en": "What is neshech? One who lends a sela for five dinars, two se'ah of wheat for three.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/essence", "axis/quantity"] } },
  { "id": "x2a", "he": "שני עורות יש לו לושט.", "en": "The oesophagus has two skins.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "sense", "ext": { "axis": ["axis/parts"] } },
  { "id": "x2b", "he": "המנורה — קנה, גביעים, כפתורים ופרחים.", "en": "The menorah: a shaft, cups, knobs and flowers.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "compound" }], "ext": { "axis": ["axis/parts"] } },
  { "id": "x3a", "he": "חיצון אדום, ופנימי לבן.", "en": "The outer is red and the inner white.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "sense", "ext": { "axis": ["axis/quality"] } },
  { "id": "x3b", "he": "החלב — לבן, והדם — אדום.", "en": "Milk is white and blood is red.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "sense", "anatomy": [{ "kind": "compound" }], "ext": { "axis": ["axis/quality"] } },
  { "id": "x4a", "he": "מקדש שש עשרה אמה לכל רוח.", "en": "It consecrates sixteen cubits in every direction.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/quantity"] } },
  { "id": "x4b", "he": "סוכה שאין בה עשרה טפחים — פסולה.", "en": "A sukkah less than ten handbreadths high is invalid.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/quantity"] } },
  { "id": "x5a", "he": "כלי חרס — אינו מטמא מגבו; כלי מתכת — מטמא מגבו.", "en": "An earthenware vessel does not contract impurity from its outside; a metal vessel does.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "preclusive" }], "ext": { "axis": ["axis/material", "axis/difference"] } },
  { "id": "x5b", "he": "כלי אבנים — אינן מקבלין טומאה.", "en": "Stone vessels do not contract impurity.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/material"] } },
  { "id": "x6a", "he": "כמין תיבה פרוצה.", "en": "Like an open box.", "move": { "element": "statement", "subtype": "explanation", "target": "lechem-hapanim" }, "provenance": "tradition", "note": "Menachos 94b: the physical shape.", "ext": { "axis": ["axis/form"] } },
  { "id": "x6b", "he": "כלי שנעשה כמין תיבה — טמא; כמין דלת — טהור.", "en": "A vessel made like a box is susceptible; like a door, not.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "preclusive" }], "ext": { "axis": ["axis/form"] } },
  { "id": "x7a", "he": "הקורא את שמע — צריך שיכוין את לבו.", "en": "One who recites the Shema must direct his heart.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Berachos 15a: a voluntary action.", "ext": { "axis": ["axis/action"] } },
  { "id": "x7b", "he": "השור — דרכו לנגוח.", "en": "It is the ox's way to gore.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "endoxa", "note": "A natural action.", "ext": { "axis": ["axis/action", "axis/quality"] } },
  { "id": "x8a", "he": "שהיד סולדת בו.", "en": "That the hand recoils from it.", "move": { "element": "statement", "subtype": "explanation", "target": "yad-soledes-source" }, "provenance": "tradition", "note": "Shabbos 40b: the impression heat leaves.", "ext": { "axis": ["axis/affection"] } },
  { "id": "x8b", "he": "פירות שנרטבו במים — הוכשרו לקבל טומאה.", "en": "Produce that became wet with water is rendered susceptible to impurity.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/affection", "axis/result"] } },
  { "id": "x9a", "he": "משקי בי מדבחיא דכן.", "en": "The liquids of the Temple slaughterhouse are clean.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Pesachim 17a: the genus, whose species are `הדם והיין והשמן והמים`; the two statements are equivalent.", "ext": { "axis": ["axis/genus-species"] } },
  { "id": "x9b", "he": "השור — מין מן הבהמה; והבהמה — סוג מן החי.", "en": "The ox is a species of cattle; cattle are a genus of living things.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "ext": { "axis": ["axis/genus-species"] } },
  { "id": "x10a", "he": "דאזלא מחמתה.", "en": "For it goes because of her.", "move": { "element": "statement", "subtype": "explanation", "target": "bm-8b-source" }, "provenance": "derivation", "note": "Bava Metzia 8b: the effective cause of the animal's walking.", "ext": { "axis": ["axis/cause"] } },
  { "id": "x10b", "he": "האומן — עושה את הכלי.", "en": "The craftsman makes the vessel.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "ext": { "axis": ["axis/cause", "axis/action"] } },
  { "id": "x11a", "he": "אפשר לעברה בקיוהא דחמרא.", "en": "It can be removed with the sourness of wine.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "asserted", "anatomy": [{ "kind": "qualified-possible", "basis": "marked" }], "ext": { "axis": ["axis/means"] } },
  { "id": "x11b", "he": "שוחטין בכל דבר: בצור, ובזכוכית, ובקרומית של קנה.", "en": "One may slaughter with anything: a flint, glass, or a reed stalk.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "compound" }], "ext": { "axis": ["axis/means"] } },
  { "id": "x12a", "he": "מה שמועה שמע ובא ונתגייר? קריעת ים סוף שמע ובא.", "en": "What report did he hear that he came and converted? He heard of the splitting of the sea and came.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Zevachim 116a.", "ext": { "axis": ["axis/motive"] } },
  { "id": "x12b", "he": "מפני מה נתאוה משה ליכנס לארץ ישראל? כדי לקיים מצוות התלויות בה.", "en": "Why did Moshe long to enter the land? To fulfil the commandments dependent on it.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/motive", "axis/purpose"] } },
  { "id": "x13a", "he": "הלומד על מנת לעשות.", "en": "One who learns in order to do.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/purpose"] } },
  { "id": "x13b", "he": "כל מעשיך — יהיו לשם שמים.", "en": "Let all your deeds be for the sake of heaven.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "categorical", "basis": "marked" }], "ext": { "axis": ["axis/purpose", "axis/motive"] } },
  { "id": "x14a", "he": "מן הזרע — יוצא העץ.", "en": "From the seed comes the tree.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "sense", "ext": { "axis": ["axis/result", "axis/cause"] } },
  { "id": "x14b", "he": "הבן — מסובב מאביו.", "en": "The son issues from his father.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "note": "[constructed]", "ext": { "axis": ["axis/result"] } },
  { "id": "x15a", "he": "כל שהוא עיקר ועמו טפלה — מברך על העיקר ופוטר את הטפלה.", "en": "Whenever there is a principal food and with it a subordinate, one blesses over the principal and it covers the subordinate.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Berachos 35b: an attribute coincident in time.", "ext": { "axis": ["axis/attribute"] } },
  { "id": "x15b", "he": "בית שמאי אומרים: מברך על היום ואחר כך מברך על היין.", "en": "Beis Shammai say: one blesses over the day and afterwards over the wine.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Before-and-after: the third kind of מתחבר.", "ext": { "axis": ["axis/attribute", "axis/time"] } },
  { "id": "x16a", "he": "שתי גזוזטראות זו למעלה מזו.", "en": "Two balconies, one above the other.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Eruvin 87b.", "ext": { "axis": ["axis/place"] } },
  { "id": "x16b", "he": "המוציא מרשות היחיד לרשות הרבים — חייב.", "en": "One who carries out from a private domain to the public domain is liable.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/place", "axis/movement"] } },
  { "id": "x17a", "he": "הקורא את המגילה עומד ויושב.", "en": "One may read the Megillah standing or sitting.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Megillah 21a.", "ext": { "axis": ["axis/posture"] } },
  { "id": "x17b", "he": "אין ישיבה בעזרה אלא למלכי בית דוד.", "en": "There is no sitting in the Temple courtyard except for kings of the house of David.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "exclusion", "basis": "marked" }], "ext": { "axis": ["axis/posture", "axis/place"] } },
  { "id": "x18a", "he": "ההולך ממקום שאין עושים למקום שעושים.", "en": "One who goes from a place where they do not work to a place where they do.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Pesachim 50a.", "ext": { "axis": ["axis/movement"] } },
  { "id": "x18b", "he": "הולכי דרכים ביום — פטורין מן הסוכה ביום.", "en": "Travellers by day are exempt from the sukkah by day.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/movement", "axis/time"] } },
  { "id": "x19a", "he": "מאימתי קורין את שמע בערבין? משעה שהכהנים נכנסים לאכול בתרומתן.", "en": "From when does one recite the Shema in the evening? From the time the priests enter to eat their terumah.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/time"] } },
  { "id": "x19b", "he": "בערב — מברך שתים לפניה ושתים לאחריה.", "en": "In the evening one blesses two before it and two after it.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/time"] } },
  { "id": "x20a", "he": "דורו של משה.", "en": "The generation of Moshe.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/relation"] } },
  { "id": "x20b", "he": "היבם — אחיו של המת.", "en": "The levir is the brother of the deceased.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/relation"] } },
  { "id": "x21a", "he": "איזהו דבר שחלוקה טומאתו בין טומאת מת לשרץ? הוי אומר, זה מתכת.", "en": "What is the thing whose impurity differs between corpse and creeping thing? It is metal.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Pesachim 14b: given an attribute, what bears it.", "ext": { "axis": ["axis/bearer"] } },
  { "id": "x21b", "he": "איזהו דבר שאינו מקבל טומאה כלל? הוי אומר: כלי אבנים.", "en": "What is the thing that contracts no impurity at all? Stone vessels.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "ext": { "axis": ["axis/bearer", "axis/material"] } },
  { "id": "x22a", "he": "אידי ואידי חד שיעורא הוא.", "en": "This and that are one measure.", "move": { "element": "resolution", "subtype": "settlement", "target": "kesubos-60a-q" }, "provenance": "derivation", "note": "Kesubos 60a: two measures equated.", "ext": { "axis": ["axis/similarity"] } },
  { "id": "x22b", "he": "העבד — הרי הוא כקרקע.", "en": "A slave is like land.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "comparative", "basis": "marked" }], "ext": { "axis": ["axis/similarity"] } },
  { "id": "x23a", "he": "שאני דם דאתקש למים.", "en": "Blood is different, for it is juxtaposed to water.", "move": { "element": "resolution", "subtype": "settlement", "target": "pesachim-22a-q", "marker": "שאני …" }, "provenance": "tradition", "ext": { "axis": ["axis/difference"] } },
  { "id": "x23b", "he": "שאני בור — שאין דרכו לילך ולהזיק.", "en": "A pit is different, for it is not its way to move and damage.", "move": { "element": "resolution", "subtype": "settlement", "target": "bor-q", "marker": "שאני …" }, "provenance": "derivation", "ext": { "axis": ["axis/difference"] } },
  { "id": "x24a", "he": "בית שמאי — אוסרין, ובית הלל — מתירין.", "en": "Beis Shammai forbid and Beis Hillel permit.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "no-middle" }], "ext": { "axis": ["axis/opposition"] } },
  { "id": "x24b", "speaker": "R. Akiva", "he": "רבי עקיבא אומר: טהורה היא ומדליקין בה.", "en": "R. Akiva says: it is pure and one may light with it.", "move": { "element": "contradiction", "subtype": "opposition", "target": "eliezer-28b" }, "provenance": "tradition", "anatomy": [{ "kind": "diametrically-opposed" }], "ext": { "axis": ["axis/opposition"] } }
]
```

### Priority — קדימה ואיחור (p236)
- `priority/temporal` זמני — earlier in time.
- `priority/rank` שכלי — higher in dignity: king before people, upper before lower.
- `priority/natural` טבעי — cause before effect, even when simultaneous.
- file · pending — `ext.priority`.

```json
[
  { "id": "erev-boker", "he": "יליף מברייתו של עולם, דכתיב: ״ויהי ערב ויהי בקר יום אחד״.", "en": "It is learned from the creation of the world, as it is written: 'and there was evening and there was morning, one day'.", "move": { "element": "resolution", "subtype": "alternative", "target": "arvis-berisha", "marker": "ואי בעית אימא" }, "provenance": "tradition", "note": "Berachos 2a: the evening is taught first because it comes first in time.", "ext": { "priority": "priority/temporal", "axis": ["axis/time"] } },
  { "id": "melech-am", "he": "המלך קודם לעם.", "en": "The king precedes the people.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "endoxa", "note": "[constructed] Priority of rank.", "ext": { "priority": "priority/rank" } },
  { "id": "kohen-kodem", "he": "כהן קודם ללוי, לוי לישראל.", "en": "A priest precedes a Levite, a Levite an Israelite.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "compound" }], "note": "Horayos 13a: an order of dignity, קדימה שכלית.", "ext": { "priority": "priority/rank", "axis": ["axis/relation"] } },
  { "id": "shemesh-or", "he": "השמש קודמת לאורה.", "en": "The sun precedes its light.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "note": "[constructed] Natural priority: cause before effect though simultaneous.", "ext": { "priority": "priority/natural" } },
  { "id": "kinyan-kodem", "he": "עקירה קודמת להנחה.", "en": "Lifting precedes setting down.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "axiom", "note": "[constructed] Natural priority in the anatomy of a Shabbos labour: the one act is the condition of the other, whatever the interval.", "ext": { "priority": "priority/natural", "axis": ["axis/movement"] } },
  { "id": "i-hachi-seifa", "he": "אי הכי, סיפא דקתני ״בשחר מברך שתים לפניה ואחת לאחריה, ובערב מברך שתים לפניה ושתים לאחריה״ — לתני דערבית ברישא!", "en": "If so, the later clause, which teaches 'in the morning one blesses two before and one after, and in the evening two before and two after' — let it teach the evening first!", "move": { "element": "difficulty", "subtype": "objection", "target": "erev-boker", "marker": "אי הכי" }, "provenance": "derivation", "note": "Berachos 2a. The temporal priority the answer relied on is turned against the Mishnah's own later clause, which puts the morning first.", "ext": { "priority": "priority/temporal", "warrant": { "kind": "style/order-inconsistent" }, "axis": ["axis/time"] } }
]
```

### Order — for the agent's own output (p238–246)
Ramchal's rules for presenting an analysis. **Arrangement** סידור — prior before posterior, known before unknown, general before particular, simple before compound; for a theoretical subject: the subject, its parts, its causes, its accidents; for a practical one: the end, then the means in order. Never use a term before defining it; if unavoidable, say it will be explained. **Definitions** גדרים — by essentials, not accidents. **Division** חילוק — parts exhaustive and disjoint (`לא פחות ולא יותר`), few at the top level, subdivided as deep as needed, levels never mixed, nothing counted twice. ex · Shabbos 2a `יציאות השבת שתים שהן ארבע בפנים, ושתים שהן ארבע בחוץ`.

In the file: these govern `about` (what the passage is, then how it was labelled, then where it was stretched), `short` (name the sentence by its essential move), and segmentation (units exhaustive and disjoint over the text; no move counted twice).

---

## §13 · Status — the reducer, as implemented and as the book has it

Status and standing are derived; the file never carries them. This section says how `analyze` in `site/src/rail/sugya.ts` computes them, so that an agent can predict the verdict its file will draw and adjust segmentation and provenance until the verdict matches the Talmud's.

### The book's reducer

```
start                                doubt    (accepted if provenance ∈ {sense, axiom, endoxa, tradition})
demonstration / validation lands     accepted (defeasible)
setirah lands                        rejected
teyuvta lands                        rejected            [supplied]
dechiyah / pircha / rumya lands      doubt    (never rejected; even from accepted)
yishuv lands on a difficulty         difficulty discharged → its target recovers its prior status
shinui lands on a difficulty         difficulty weakened  → its target stays doubt (possible, unproven)
proof rebutted                       doubt    (not rejected)
disproof rebutted                    doubt    (not accepted)
sevara                               tiebreak only
```

A move that has itself been defeated exerts no force. A weakened move exerts reduced force: it can push a target to doubt, no further.

### The implementation

Every unit gets a **standing** (whether it still exerts force) and a **status** (accepted / doubt / rejected), computed in reverse order so that every move landing on a unit is already resolved when the unit is reached.

**Base status** — `accepted` if `provenance` ∈ {`sense`, `axiom`, `endoxa`, `tradition`}; otherwise (`derivation`, `asserted`, absent) `doubt`.

**Effect** of a landed move — from the leaf table (§3.2): `open`, `raise`, `reject`, `discharge`, `unsettle`. A move with standing `discharged` or `defeated` **exerts no force**; `live` and `weakened` moves do.

**Standing** of a unit, from the moves landing on it that exert force:
1. any *live* `reject` → `defeated`;
2. else any *live* `discharge` → `discharged`;
3. else any (live or weakened) `reject` / `discharge` / `unsettle` → `weakened`;
4. else `live`.

**Status** of a unit, from base status and the moves landing on it that exert force:
1. any *live* `reject` → `rejected`;
2. else any `unsettle` (live or weakened), or any *weakened* `reject` or `raise` → `doubt`;
3. else any *live* `raise` → `accepted`;
4. else the base status.

Moves are resolved by **precedence, not in sequence**: a claim with a `reject` and an `unsettle` on it reads the same whichever is written first. Nothing in Ch 9 licenses order-dependence, and it only shows up once several moves land on one claim.

Also derived: **depth** (a unit's depth is its target's depth + 1; an untargeted unit is 0), **movements** (a maximal run of adjacent units hanging off the same depth-1 challenge; navigation furniture, not taxonomy), **pressure** (how many non-open, non-raise moves still exert force on a unit), and **prefixes** (any prefix of the units is a well-formed sugya, which is how the debate's own progress is replayed).

### Where implementation and book agree, and where not

| rule | book | implementation |
|---|---|---|
| doubt is the initial state; tradition etc. start accepted | yes | yes (`baseStatus`) |
| a יישוב discharges the difficulty; the claim recovers | yes | yes — the discharged difficulty exerts no force, so the claim reverts to whatever else lands on it |
| a שינוי weakens the difficulty; the claim stays in doubt | yes | yes — a weakened `unsettle` still unsettles |
| a rebutted proof leaves its claim in doubt, not rejected | yes | yes — a weakened `raise` → doubt |
| a rebutted disproof leaves its claim in doubt, not accepted | yes | yes — a weakened `reject` → doubt |
| דחיה / פירכא / רומיא never reject | yes | yes — `unsettle` → doubt even from accepted |
| a live סתירה rejects even an accepted claim | yes | yes |
| a live proof and a live contradiction on one claim | undecided | `reject` wins (precedence) — so split the sentence that both answers the difficulty and proves the claim (§16) |
| תיובתא rejects | `[supplied]` | **no**: placeholder `unsettle`; pair it with a `contradiction/direct` (§8) |
| פירוש דחוק, אוקימתא unsettle | `[supplied]` | yes |
| סברא is a tiebreak, not a status | yes | **no reducer support**: a `proof/validation` carrying `sevara` is a full `raise`; note the weakness |
| a proof from סברא is weaker than one from a source | yes | no — all `raise` are equal |
| the attacker's own status affects its force | no | no — only standing does; a difficulty in doubt still unsettles |

### Two traces

**Shabbos 5b (§15).** `tanu-rabbanan` (tradition → accepted) ← `heicha` (objection, unsettle) ← `meidi-dehava` (settlement, discharge) ← `mi-dami` (objection, unsettle). Resolve from the end: `mi-dami` has nothing on it → live. `meidi-dehava` has a live unsettle → standing weakened, status doubt. `heicha` has a weakened discharge → standing weakened (rule 3), status: base doubt, no unsettle, no live raise → doubt. `tanu-rabbanan` has a weakened unsettle → standing weakened, status doubt. The baraita ends in doubt on this line — as the book says, "[1] returns to doubt."

**Yebamos 104b (shipped).** `rava` (asserted → doubt) ← `baraita` (apparentContradiction, unsettle) ← `shinuy` (alternative, unsettle). `shinuy` live; `baraita` weakened; `rava`: a weakened unsettle → doubt. Rava ends merely possible — the point of the passage. Had `shinuy` been a `settlement`, `baraita` would be discharged, exert nothing, and `rava` would read its base: doubt still, since it is `asserted`; with `provenance: tradition` on Rava it would read accepted.

---

# Part III · Procedure and worked files

## §14 · Procedure — working a passage (Ch 10 as algorithm)

Ramchal's method (p190–220) as steps. Each step names the field it fills — a present field by name, a pending one by its `ext` path.

**Step 0 · Register the idiom.** Styles differ by person, by rhetoric, by era and place (p190). Identify who speaks and the party type. Do not read one author's phrasing by another's habits. → `party` on the sugya; `speaker` on each unit; the row kind `party-*` only where an exchange differs from the whole. For a non-Talmudic text, name the speakers as the text does (`"A"`, `"Counsel for the appellant"`, `"Blackstone"`).

**Step 1 · Segment.** Split into utterances (דיבור). One utterance may hold several propositions — Shabbos 5b's single question holds a claim, a proof, and a proof of the proof (p200). → one `unit` per move (§6). Where the file must show the inner propositions, split (§15 shows both ways); otherwise keep the utterance whole and put the chain in `ext.warrant.premises`. Give each unit an `id`; the running text as `he`; the move as `en`; where `en` runs long, `short`.

**Step 2 · Normalize each utterance to canonical form.**
- he · `אל תשת לבך אל דרך הדבור אלא אל המאמר המכון בו. ואם תראה הדבור קצר – תשלימהו במחשבתך, ואם תראהו ארך – תסיר ממנו את המותר` (p41) · `תצירהו בשכלך על הצורה הישרה, שהיא: הנושא פלוני יש בו ענין פלוני` (p191)
Whatever the surface — question, exclamation, ellipsis, rhetoric — extract subject, predicate, manner (§9). Supply what is elided; strip what is ornamental. A rhetorical question is an assertion. → quantity and manner as row-level `anatomy` kinds; the words themselves in `ext.form.normalized`, `.subject`, `.predicate`, `.parts`; `figurative` as a row kind when the sense is not literal.
- ex · Pesachim 7b `אבי הבן מאי איכא למימר?` → *the father must bless* למול, *not* על המילה — a preclusive statement (p192).

**Step 3 · Determine purpose.** Standalone (informs → statement; asks → question) or acting on a prior utterance (explain, prove, contradict, object, resolve, answer)? Identify the target. → `move.element`, `move.target`. Where a stock phrase (§8) announces the type, `move.marker` = the phrase; the page then reads the label as *marked*. Where Ramchal himself names the move for this passage, `attested: true`. Otherwise neither, and the label reads *inferred*. Further targets → `ext.move.targets`.

**Step 4 · Check that the purpose is served.** Does the explanation fit the wording? Does the proof prove? Does the difficulty land? Does the resolution remove it? Does the answer answer what was asked? (p194). This chooses the leaf: full vs forced explanation; demonstration vs validation; settlement vs alternative; direct contradiction vs opposition. → `move.subtype`. When two leaves are defensible, take the one the passage's *outcome* supports and say so in `note`.

**Step 5 · Verify premises recursively.** Every premise must itself be established — by a further premise, and so on, until a terminal: something self-evident (sense, axiom) or conventionally authoritative (endoxa, tradition) (p194–196). Then read the chain back: if the last holds, the previous holds, and so to the first. Chains exist for difficulties as much as for statements. → the deduction kind as an edge-level `anatomy` kind; the unit's own `provenance` (and the derived ground badge, when it maps); the chain in `ext.warrant.premises[]`, each with its `provenance`; a pending or partial kind (`rebuttal/*`, `style/*`, `proof/indirect`, `disproof/*`, `sevara`) in `ext.warrant.kind`, with the matching icon in `anatomy` when one exists (`via-opposite`, `dilemma`, `ground-does-not-reach`, `theory`).

**Step 6 · Separate text from elucidation.** A ביאור restates a proposition at greater length and adds nothing (p196). → `ext.form.elucidationOf` on the restating unit; its move is `statement/explanation` with the elucidated unit as `target`. The status is often conferred *later*: when the Gemara answers a redundancy objection with `מה טעם קאמר`, `פירושא קא מפרש`, `מה הן קתני`, or a reading on which the second clause spells out the first, the second clause becomes an elucidation of the first — go back and set `elucidationOf` on it.

**Step 7 · Resolve synonymy.** Two utterances may be one proposition in different words or word order, or one may name the genus and the other its species — `משקי בי מדבחיא דכן` = `הדם והיין והשמן והמים טהורים` (p212). Two may be opposites though phrased apart — `קדשי מזבח אין להם פדיון` vs `הקרבנות יש להם פדיון`. Test relations (§10) on normalized forms, not on strings. → an edge-level `anatomy` kind on the later unit; when the other unit is not its `target`, `ext.relation`.

**Step 8 · Decompose composites.** Reported information can carry a proof (`ascribed-proof`) or a difficulty (`ascribed-difficulty`, קושיא מגדת) (p214–218). Annotate both parts. A later objection may attack the *report* (the author could not have meant this), the *carried proof* (it does not prove), or the *carried difficulty* (it is not one) — without touching the original claim. Keep the reporter's view separate from the view reported. → `move` = the proof or difficulty (or `statement/reported` when the speaker only reports); `ext.move.composite`, `ext.move.reportedOf`.

**Step 9 · Review.** Re-read every unit in its role. `ואם יראה לך בחלק מחלקיה שלא ישמר הגבול הראוי לו – אז תטרח ותעמל עד שתמצא לו הישוב ההגון והראוי` (p219): search for the reading that satisfies both the wording and the truth. Do not force a label; leave the nearest label with a `note`. Then run the reducer in your head (§13) and compare its verdict with the Talmud's own closing (`והלכתא`, `תיובתא`, the last word standing). Where they differ, the file is wrong somewhere — usually a sentence holding two moves (§6), a `provenance` left at the default, or a `תיובתא` without its `contradiction/direct`. Finally validate (§5) and write `about`.

**Where each step lands in the file — summary**

| step | present | pending (`ext`) |
|---|---|---|
| 0 idiom | `party`, `speaker`, row kind `party-*` | — |
| 1 segment | `units[]`, `id`, `he`, `en`, `short` | — |
| 2 normalize | row kinds: quantity, manner, `figurative`, `no-middle`/`has-middle`, `inference-*` | `ext.form` |
| 3 purpose | `move.element`, `move.target`, `move.marker`, `move.attested` | `ext.move.targets` |
| 4 served | `move.subtype` | — |
| 5 premises | edge kinds: deduction, defeats; `provenance` | `ext.warrant.premises`, `ext.warrant.kind`, `.aspect`, `.modality`, `.defeat` |
| 6 elucidation | `statement/explanation` + `target` | `ext.form.elucidationOf` |
| 7 synonymy | edge kinds: relations, opposition tests | `ext.relation` |
| 8 composites | `move` = the carried move | `ext.move.composite`, `ext.move.reportedOf` |
| 9 review | `note`, `about`; validate | — |
| axes (any step) | — | `ext.axis`, `ext.priority` |

---

## §15 · Worked file — Shabbos 5b (p196–210)

Ramchal's own worked passage. Four short Aramaic sentences carry two claims, four syllogisms, and one elucidation; every step must be reconstructed — omit one and the argument has not been understood (p212).

Surface:

```
[1] תנו רבנן: המוציא מחנות לפלטיא דרך סטיו – חייב
[2] היכא אשכחנא כהאי גוונא דחייב?
[3] אמר רב ספרא אמר רבי אמי אמר רבי יוחנן: מידי דהוה אמעביר חפץ ברשות הרבים,
    התם לאו אף על גב דכמה דנקיט לה ואזיל – פטור, כי מנח לה – חייב; הכא נמי לא שנא
[4] מי דמי? התם כל היכא דמנח לה – מקום חיוב הוא; הכא אי מנח לה בסטיו – מקום פטור הוא
```

**Layer A.** [1] `statement/firsthand`, provenance `tradition`. [2] difficulty on [1]. [3] resolution on [2] carrying a proof by analogy. [4] difficulty on [3] — the analogy's subjects are not similar (`fallacy-not-similar`).

**Layers B/D — the difficulty [2] normalized:** *carrying store→street through a colonnade should not be liable* (מוציא מחנות לפלטיא דרך סטיו – אין לנו לחייבו). Its warrant, reconstructed (p200–206):

- **1 · hypothetical syllogism.** 1a If no explicit case makes domain-to-domain carrying liable when an exempt area intervenes, ours is not liable. 1b There is no such case. 1c ∴ not liable.
- **2 · classical syllogism proving 1a.** 2a Anything outside the primary understanding of a law needs clear proof to be brought under it. 2b Carrying through an exempt area is outside the primary understanding of *מוציא מרשות לרשות*. 2c ∴ 1a. — 2a and 2b are axioms (מושכלות); the chain terminates here.
- **3 · definitional chain.** 3a Domain-to-domain through an exempt area: not liable. 3b Store→street via colonnade *is* domain-to-domain through an exempt area. 3c ∴ not liable.
- **Collapsed into one chain** (p206): the colonnade case ⊂ the exempt-interval case; the exempt-interval case ∉ the primary sense of מוציא מרשות לרשות; no proof includes it; without proof there is no liability under that law; ∴ the colonnade case is not liable under מוציא מרשות לרשות.

**The resolution [3] normalized:** *domain-to-domain through an exempt area should be liable* — statement + proof + elucidation:

- **4 · analogism.** 4a Carrying through an exempt area ≈ carrying four cubits in the public domain. 4b The latter is liable although an exempt interval (the walking) separates lifting and setting down. 4c ∴ the former is liable.
- Elucidation of 4b: `כל זמן שהוא מהלך הוא פטור`.

[4] attacks 4a: there, every resting place is a place of liability; here, the colonnade is a place of exemption — the subjects are not truly similar, the analogy's conclusion falls, and [1] returns to doubt on this line.

**The file, one unit per utterance** — the book's own segmentation, with each utterance's inner chain in `ext.warrant.premises`:

```json
{
  "$schema": "./sugya.schema.json",
  "format": "derech-tevunos/sugya",
  "version": 1,
  "id": "shabbos-5b-colonnade",
  "title": "Carrying from a store to the street through a colonnade",
  "tractate": "Shabbos",
  "folio": "5b",
  "discussedAt": "Derech Tevunos ch. 10, pp. 196-210 — Ramchal's worked example of reconstructing every premise",
  "party": "party-group",
  "about": [
    "Ramchal's own worked passage, Heb pp195–209. He gives the four utterances and reconstructs two claims, four syllogisms and one elucidation beneath them; the chains are carried here in `ext.warrant.premises` on the two argued units.",
    "Segmented one unit per utterance, as the book does. The resolution [3] holds a statement, a proof and an elucidation; a split version is given in the guide beside this file.",
    "The baraita ends in doubt on this line, as Ramchal says: the objection is answered by an analogy whose subjects are then shown not to be alike."
  ],
  "units": [
    {
      "id": "baraita",
      "speaker": "Baraita",
      "he": "תנו רבנן: המוציא מחנות לפלטיא דרך סטיו – חייב.",
      "en": "One who carries out from a store to the street through a colonnade is liable.",
      "move": { "element": "statement", "subtype": "firsthand", "marker": "תנו רבנן" },
      "provenance": "tradition",
      "anatomy": [
        { "kind": "unqualified", "note": "No quantifier: whoever carries thus." },
        { "kind": "simple" }
      ],
      "ext": {
        "form": { "normalized": "carrying from a store to the street through a colonnade is liable", "subject": "המוציא מחנות לפלטיא דרך סטיו", "predicate": "חייב" },
        "axis": ["axis/place", "axis/movement"]
      }
    },
    {
      "id": "heicha",
      "he": "היכא אשכחנא כהאי גוונא דחייב?",
      "en": "Where do we find such a case that is liable?",
      "move": { "element": "difficulty", "subtype": "objection", "target": "baraita" },
      "provenance": "derivation",
      "anatomy": [
        { "kind": "hypothetical-syllogism", "note": "If no explicit case makes such carrying liable, ours is not liable; there is none; so it is not. The antecedent is affirmed: ponens." }
      ],
      "note": "A rhetorical question, normalized to an assertion (Heb p199): carrying store→street through a colonnade should not be liable. Three chains sit under it; the last two prove the first's premises and terminate in axioms.",
      "ext": {
        "form": { "normalized": "carrying from a store to the street through a colonnade is not liable", "subject": "המוציא מחנות לפלטיא דרך סטיו", "predicate": "אין לנו לחייבו" },
        "warrant": {
          "premises": [
            { "id": "1a", "text": "if no explicit case makes domain-to-domain carrying liable when an exempt area intervenes, ours is not liable", "provenance": "derivation" },
            { "id": "1b", "text": "there is no such explicit case", "provenance": "sense" },
            { "id": "2a", "text": "anything outside the primary understanding of a law needs clear proof to be brought under it", "provenance": "axiom" },
            { "id": "2b", "text": "carrying through an exempt area is outside the primary understanding of מוציא מרשות לרשות", "provenance": "axiom" },
            { "id": "3a", "text": "domain-to-domain through an exempt area is not liable (from 1a, 1b)", "provenance": "derivation" },
            { "id": "3b", "text": "store→street through a colonnade is domain-to-domain through an exempt area", "provenance": "derivation" }
          ]
        }
      }
    },
    {
      "id": "meidi-dehava",
      "speaker": "R. Yochanan (Rav Safra citing R. Ami)",
      "he": "אמר רב ספרא אמר רבי אמי אמר רבי יוחנן: מידי דהוה אמעביר חפץ ברשות הרבים, התם לאו אף על גב דכמה דנקיט לה ואזיל – פטור, כי מנח לה – חייב; הכא נמי לא שנא.",
      "en": "It is like one who carries an object four cubits in the public domain: there, although all the while he holds it and walks he is exempt, when he sets it down he is liable; here too, no difference.",
      "move": { "element": "resolution", "subtype": "settlement", "target": "heicha", "marker": "מידי דהוה א…" },
      "provenance": "derivation",
      "anatomy": [
        { "kind": "analogism", "basis": "marked", "note": "Carrying through an exempt area ≈ carrying four cubits in the public domain, where an exempt interval (the walking) also separates lifting and setting down." }
      ],
      "note": "One utterance, three propositions (Heb p207): the resolution's claim, its proof by analogy, and an elucidation of the proof's second premise (`כל זמן שהוא מהלך הוא פטור`). Asserted as the truth by a named authority: a יישוב, not a שינוי.",
      "ext": {
        "form": { "normalized": "domain-to-domain carrying through an exempt area is liable", "subject": "המוציא מרשות לרשות דרך מקום פטור", "predicate": "חייב" },
        "warrant": {
          "premises": [
            { "id": "4a", "text": "carrying through an exempt area is like carrying four cubits in the public domain", "provenance": "derivation" },
            { "id": "4b", "text": "carrying four cubits in the public domain is liable although an exempt interval separates lifting and setting down", "provenance": "tradition" }
          ]
        },
        "axis": ["axis/similarity"]
      }
    },
    {
      "id": "mi-dami",
      "he": "מי דמי? התם כל היכא דמנח לה – מקום חיוב הוא; הכא אי מנח לה בסטיו – מקום פטור הוא!",
      "en": "Is it comparable? There, wherever he sets it down is a place of liability; here, if he sets it down in the colonnade it is a place of exemption!",
      "move": { "element": "difficulty", "subtype": "objection", "target": "meidi-dehava", "marker": "מי דמי? התם … הכא …" },
      "provenance": "derivation",
      "anatomy": [
        { "kind": "fallacy-not-similar", "basis": "marked", "note": "Attacks 4a: the subjects differ in the respect that matters, so the analogy's conclusion falls." }
      ],
      "note": "Ramchal (Heb p209): the analogy is denied, and the baraita returns to doubt on this line.",
      "ext": { "axis": ["axis/difference"] }
    }
  ]
}
```

**Reducer.** `mi-dami` live → `meidi-dehava` weakened, doubt → `heicha` weakened (its discharge came from a weakened move) → `baraita` weakened, **doubt**. As the book has it.

**The same resolution, split so the page shows the three propositions.** The claim is the settlement; the proof targets the claim; the elucidation targets the proof and adds nothing:

```json
[
  {
    "id": "yochanan-claim",
    "speaker": "R. Yochanan",
    "he": "הכא נמי לא שנא.",
    "en": "Here too, no difference: domain-to-domain carrying through an exempt area is liable.",
    "move": { "element": "resolution", "subtype": "settlement", "target": "heicha" },
    "provenance": "derivation",
    "note": "The utterance's closing words carry its claim; the order on the page is the book's logical order, not the sentence's."
  },
  {
    "id": "yochanan-proof",
    "speaker": "R. Yochanan",
    "he": "מידי דהוה אמעביר חפץ ברשות הרבים … כי מנח לה – חייב.",
    "en": "It is like one who carries four cubits in the public domain: when he sets it down he is liable.",
    "move": { "element": "proof", "subtype": "demonstration", "target": "yochanan-claim", "marker": "מידי דהוה א…" },
    "provenance": "tradition",
    "anatomy": [{ "kind": "analogism", "basis": "marked" }],
    "ext": { "axis": ["axis/similarity"] }
  },
  {
    "id": "yochanan-elucidation",
    "speaker": "R. Yochanan",
    "he": "התם לאו אף על גב דכמה דנקיט לה ואזיל – פטור.",
    "en": "There, all the while he holds it and walks, he is exempt.",
    "move": { "element": "statement", "subtype": "explanation", "target": "yochanan-proof" },
    "provenance": "derivation",
    "anatomy": [{ "kind": "discrepancy", "basis": "marked", "note": "`אף על גב`: liable although the interval is exempt." }],
    "note": "A ביאור of premise 4b — restates it at greater length and adds nothing (Heb p207).",
    "ext": { "form": { "elucidationOf": "yochanan-proof" } }
  }
]
```

In the split version `mi-dami` targets `yochanan-proof`; the reducer then weakens the proof, the claim loses its `raise` and sits at its base (doubt), and the objection `heicha` — discharged by a settlement that still stands live — stays discharged, so `baraita` reads *accepted* (its base). The two segmentations draw different verdicts on the baraita; the book's is the first, so the first is the file. This is Step 9: choose the segmentation whose verdict matches the source.

---

## §16 · Worked file — Berachos 20b (נשים חייבות בקידוש היום)

Not discussed by Ramchal; labelled from the markers of Ch 9 and the structural tests. Six sentences, a full cycle: claim, disproof, a failed defence, two attacks on the defence, and a resolution that also proves the claim. The Talmud's own verdict: Rav Adda stands; Abaye falls.

Surface:

```
[1] אמר רב אדא בר אהבה: נשים חייבות בקידוש היום דבר תורה.
[2] אמאי? מצות עשה שהזמן גרמא הוא, וכל מצות עשה שהזמן גרמא נשים פטורות!
[3] אמר אביי: מדרבנן.
[4] אמר ליה רבא: והא "דבר תורה" קאמר!
[5] ועוד, כל מצות עשה נחייבינהו מדרבנן?!
[6] אלא אמר רבא: אמר קרא "זכור" ו"שמור" — כל שישנו בשמירה ישנו בזכירה,
    והני נשי, הואיל ואיתנהו בשמירה — איתנהו בזכירה.
```

**Decisions.** [2] opens with `אמאי?` and then supplies a syllogism that shows the claim false: a סתירה, not a שאלה (§8, query, *test*). [3] lands on [2], not on [1]: read as an answer to the difficulty it is a `resolution/settlement`; read as a gloss on Rav Adda it would be a `statement/forcedExplanation` — the file takes the first because Abaye speaks after and to the objection. [4] shows [3] false by the very words of the ruling: `contradiction/direct`. [5] is a reductio on [3]: `contradiction/direct` with `disproof/reductio`. [6] does two things — it resolves [2] (women *are* in זכור) and it proves [1] — and a unit has one target, so it is **split**: the derivation of the rule as the settlement, its application to women as the proof of the ruling.

```json
{
  "$schema": "./sugya.schema.json",
  "format": "derech-tevunos/sugya",
  "version": 1,
  "id": "berachos-20b-kiddush",
  "title": "Women and the sanctification of the day",
  "tractate": "Berachos",
  "folio": "20b",
  "discussedAt": "Not discussed in Derech Tevunos; labelled from the markers of ch. 9 and the structural tests",
  "party": "party-group",
  "about": [
    "A claim, a disproof from a received rule, a defence that is refuted twice, and a resolution that proves the claim by likening זכור to שמור.",
    "Abaye's `מדרבנן` is read as answering the objection rather than glossing the ruling, because he speaks to `אמאי` — so it is a `resolution/settlement`, not a `statement/forcedExplanation`. Both are defensible; the target decides.",
    "Rava's final sentence is split into a settlement on the objection and a proof of the ruling: a unit has one target, and the reducer can give Rav Adda his due only if a live `raise` lands on him."
  ],
  "units": [
    {
      "id": "ruling",
      "speaker": "Rav Adda bar Ahavah",
      "he": "אמר רב אדא בר אהבה: נשים חייבות בקידוש היום דבר תורה.",
      "en": "Women are obligated in the sanctification of the day by Torah law.",
      "move": { "element": "statement", "subtype": "firsthand" },
      "provenance": "asserted",
      "anatomy": [
        { "kind": "unqualified", "note": "No quantifier; read as categorical." },
        { "kind": "simple" }
      ],
      "ext": {
        "form": { "normalized": "women have the Torah-law obligation of kiddush", "subject": "נשים", "predicate": "חיוב קידוש היום דבר תורה" },
        "axis": ["axis/bearer"]
      }
    },
    {
      "id": "amai",
      "he": "אמאי? מצות עשה שהזמן גרמא הוא, וכל מצות עשה שהזמן גרמא נשים פטורות!",
      "en": "Why? It is a positive time-bound commandment, and women are exempt from every positive time-bound commandment!",
      "move": { "element": "contradiction", "subtype": "direct", "target": "ruling", "marker": "אמאי? … !" },
      "provenance": "tradition",
      "anatomy": [
        { "kind": "classical-syllogism", "note": "Subject down: kiddush is a time-bound positive commandment; women are exempt from all of those; so women are exempt from kiddush." },
        { "kind": "contradictory", "note": "Women are exempt against women are obligated." }
      ],
      "note": "`אמאי` followed by the reason the claim cannot stand: a סתירה, not a query (the question form is rhetorical).",
      "ext": {
        "warrant": {
          "kind": "disproof/indirect",
          "premises": [
            { "text": "kiddush is a positive time-bound commandment", "provenance": "endoxa" },
            { "text": "women are exempt from every positive time-bound commandment", "provenance": "tradition" }
          ]
        }
      }
    },
    {
      "id": "abaye",
      "speaker": "Abaye",
      "he": "אמר אביי: מדרבנן.",
      "en": "Abaye said: the obligation is rabbinic.",
      "move": { "element": "resolution", "subtype": "settlement", "target": "amai" },
      "provenance": "derivation",
      "note": "Answers the objection by conceding its premise: women are exempt by Torah law and obligated rabbinically. Asserted as the truth, so a יישוב. Read against the ruling instead, it would be a `statement/forcedExplanation` that contradicts a word of it (`דבר תורה`) — which is exactly Rava's first attack.",
      "ext": { "warrant": { "premises": [{ "text": "the rabbis may impose a positive obligation where the Torah exempts", "provenance": "endoxa" }] } }
    },
    {
      "id": "rava-words",
      "speaker": "Rava",
      "he": "אמר ליה רבא: והא ״דבר תורה״ קאמר!",
      "en": "Rava said to him: but he said 'by Torah law'!",
      "move": { "element": "contradiction", "subtype": "direct", "target": "abaye", "marker": "והא … !" },
      "provenance": "tradition",
      "anatomy": [{ "kind": "diametrically-opposed", "note": "Rabbinic against Torah law, of the same obligation." }],
      "note": "The words of the ruling being defended show the defence false: a settlement must be consistent with the statement it defends (§8, יישוב, *rules*)."
    },
    {
      "id": "rava-reductio",
      "speaker": "Rava",
      "he": "ועוד, כל מצות עשה נחייבינהו מדרבנן?!",
      "en": "And further — shall we then obligate them rabbinically in every positive commandment?!",
      "move": { "element": "contradiction", "subtype": "direct", "target": "abaye", "marker": "ועוד, … ?!" },
      "provenance": "derivation",
      "anatomy": [{ "kind": "hypothetical-syllogism-tollens", "note": "If a rabbinic obligation arises wherever the Torah exempts, it arises everywhere; it does not; so Abaye's account falls." }],
      "ext": { "warrant": { "kind": "disproof/reductio" } }
    },
    {
      "id": "rava-rule",
      "speaker": "Rava",
      "he": "אלא אמר רבא: אמר קרא ״זכור״ ו״שמור״ — כל שישנו בשמירה ישנו בזכירה.",
      "en": "Rather, Rava said: the verse says 'remember' and 'keep' — whoever is included in keeping is included in remembering.",
      "move": { "element": "resolution", "subtype": "settlement", "target": "amai", "marker": "אלא אמר …" },
      "provenance": "tradition",
      "anatomy": [
        { "kind": "analogism", "note": "זכור is likened to שמור by their pairing in Scripture; what holds of one holds of the other." },
        { "kind": "categorical", "basis": "marked", "note": "`כל שישנו`: the derived rule is categorical." }
      ],
      "note": "The objection assumed kiddush is an ordinary time-bound commandment; the verse pairs it with שמור, whose obligation is not time-bound. First half of Rava's sentence: the rule.",
      "ext": { "axis": ["axis/similarity"] }
    },
    {
      "id": "rava-proof",
      "speaker": "Rava",
      "he": "והני נשי, הואיל ואיתנהו בשמירה — איתנהו בזכירה.",
      "en": "And these women, since they are included in keeping, are included in remembering.",
      "move": { "element": "proof", "subtype": "demonstration", "target": "ruling" },
      "provenance": "derivation",
      "anatomy": [
        { "kind": "classical-syllogism", "note": "Subject down: whoever is in שמירה is in זכירה (rava-rule); women are in שמירה; so women are in זכירה — obligated by Torah law." },
        { "kind": "consequent", "basis": "marked", "note": "`הואיל ו… — `: since this, therefore that." }
      ],
      "note": "Second half of Rava's sentence: the rule applied to women, which proves Rav Adda. Split from the settlement so that a live `raise` lands on the ruling.",
      "ext": { "warrant": { "premises": [{ "text": "whoever is in שמירה is in זכירה", "provenance": "derivation", "id": "rava-rule" }, { "text": "women are in שמירה (the negative commandments bind them)", "provenance": "tradition" }] } }
    }
  ]
}
```

**Reducer.** `rava-proof` live raise on `ruling`. `rava-rule` live discharge on `amai`. `rava-words` and `rava-reductio` live rejects on `abaye` → `abaye` defeated, **rejected**, and exerts nothing on `amai`. `amai` discharged. `ruling`: its only forceful move is a live raise → **accepted**. Verdict: Rav Adda accepted, Abaye rejected — the Talmud's.

Had [6] been left as one unit targeting `amai`, `ruling` would have no `raise` and would read its base, *doubt*, with the objection discharged — right about the objection, wrong about the ruling. Had [3] been labelled `statement/forcedExplanation` on `ruling`, the two attacks on Abaye would still defeat it, it would exert nothing, and the verdict would be the same; only the shape of the page changes (Abaye hangs off the ruling instead of off the objection). Both labellings survive Step 9; the file chooses by target.

---

## §17 · Worked file — Berachos 2b (ובא השמש וטהר)

A passage that exercises most of the moves the two files above do not: a phrasing objection with a style warrant, an incidental lesson, a validation from a baraita, a דחיה by an alternative reading, an indirect proof by tollens, a validation from common speech, a report, an איבעיא and its פשיטות.

Surface:

```
[1] מאימתי קורין את שמע בערבין? משעה שהכהנים נכנסים לאכול בתרומתן.
[2] מכדי כהנים אימת קא אכלי תרומה? משעת צאת הכוכבים. לתני: משעת צאת הכוכבים!
[3] מלתא אגב אורחיה קמשמע לן: כהנים אימת קא אכלי בתרומה — משעת צאת הכוכבים.
[4a] והא קמשמע לן: דכפרה לא מעכבא.
[4b] כדתניא: "ובא השמש וטהר" — ביאת שמשו מעכבתו מלאכול בתרומה, ואין כפרתו מעכבתו מלאכול בתרומה.
[5] וממאי דהאי "ובא השמש" — ביאת השמש, והאי "וטהר" — טהר יומא? דילמא ביאת אורו הוא, ומאי "וטהר" — טהר גברא!
[6a] אמר רבה בר רב שילא: אם כן, לימא קרא "ויטהר"! מאי "וטהר"? טהר יומא.
[6b] כדאמרי אינשי: איערב שמשא ואדכי יומא.
[7] במערבא הא דרבה בר רב שילא לא שמיע להו.
[8] ובעו לה מיבעיא: האי "ובא השמש" — ביאת שמשו הוא, ומאי "וטהר" — טהר יומא; או דילמא ביאת אורו הוא, ומאי "וטהר" — טהר גברא?
[9] והדר פשטו לה מברייתא: מדקתני בברייתא "סימן לדבר צאת הכוכבים" — שמע מינה: ביאת שמשו הוא, ומאי "וטהר" — טהר יומא.
```

**Decisions.** [1] is a Mishnah in question-and-answer form; normalized, it is one statement about a time (§14 Step 2) — the file records it as `statement/firsthand` with the Mishnah's `he` intact. [2] agrees with the reading and faults the *wording* (why the roundabout sign?): the phrasing argument, branch (ii) — a פירכא with a `style/*` warrant, not a query and not a reading dispute. [4a] draws a further lesson from the same wording: a loose דיוק. [5] offers another reading of the verse the baraita [4b] relies on: a דחיה of the proof. [6a] refutes the alternative reading from the verse's own form and, since there are two readings only, proves the baraita's: `contradiction/direct` on [5] with `proof/indirect`. [8]–[9] are the same question raised and settled in the West, as an איבעיא and פשיטות.

```json
{
  "$schema": "./sugya.schema.json",
  "format": "derech-tevunos/sugya",
  "version": 1,
  "id": "berachos-2b-shemesh",
  "title": "'And the sun sets and it is clean'",
  "tractate": "Berachos",
  "folio": "2b",
  "discussedAt": "Not discussed in Derech Tevunos; labelled from the markers of ch. 9 and the structural tests",
  "party": "party-talmud",
  "about": [
    "The Gemara on the Mishnah's `משעה שהכהנים נכנסים לאכול בתרומתן`: an objection to the wording, the lessons the wording teaches, and a dispute over the reading of Leviticus 22:7 settled twice — by Rabbah bar Rav Shila from the verse's form, and in the West from a baraita.",
    "The objection [2] is a פירכא on the form, not a question: the reading is agreed and the indirection is faulted. Its style kind is carried in `ext.warrant.kind`.",
    "Rabbah bar Rav Shila's argument is a tollens that also proves the rival reading, there being only two: `proof/indirect` in `ext.warrant.kind`, `hypothetical-syllogism-tollens` in anatomy."
  ],
  "units": [
    {
      "id": "mishnah",
      "speaker": "Mishnah",
      "he": "מאימתי קורין את שמע בערבין? משעה שהכהנים נכנסים לאכול בתרומתן.",
      "en": "From when does one recite the Shema in the evening? From the time the priests enter to eat their terumah.",
      "move": { "element": "statement", "subtype": "firsthand" },
      "provenance": "tradition",
      "anatomy": [{ "kind": "unqualified" }, { "kind": "simple" }],
      "note": "Question-and-answer form; one statement once normalized: the evening Shema begins when the priests enter to eat terumah.",
      "ext": { "form": { "normalized": "the evening Shema begins when the priests enter to eat their terumah", "subject": "זמן קריאת שמע בערבין", "predicate": "משעה שהכהנים נכנסים לאכול בתרומתן" }, "axis": ["axis/time"] }
    },
    {
      "id": "lisni",
      "he": "מכדי כהנים אימת קא אכלי תרומה? משעת צאת הכוכבים. לתני: משעת צאת הכוכבים!",
      "en": "Now, when do priests eat terumah? From the emergence of the stars. Then let it teach: from the emergence of the stars!",
      "move": { "element": "difficulty", "subtype": "objection", "target": "mishnah", "marker": "ליתני …!" },
      "provenance": "derivation",
      "anatomy": [{ "kind": "party-talmud" }],
      "note": "The reading is agreed; the words are not fitted to the matter — the time is named by an indirect sign. A פירכא, not a שאלה; the phrasing argument in its second branch (§11).",
      "ext": { "warrant": { "kind": "style/self-contradictory", "premises": [{ "text": "priests eat terumah from the emergence of the stars", "provenance": "tradition" }] } }
    },
    {
      "id": "milsa",
      "he": "מלתא אגב אורחיה קמשמע לן: כהנים אימת קא אכלי בתרומה — משעת צאת הכוכבים.",
      "en": "It teaches us something in passing: when do priests eat terumah — from the emergence of the stars.",
      "move": { "element": "resolution", "subtype": "settlement", "target": "lisni", "marker": "מלתא אגב אורחיה קמשמע לן" },
      "provenance": "derivation",
      "note": "The wording is justified by what it teaches: the stock יישוב of a style objection."
    },
    {
      "id": "kapparah",
      "he": "והא קמשמע לן: דכפרה לא מעכבא.",
      "en": "And this it teaches us: that atonement is not a bar.",
      "move": { "element": "statement", "subtype": "inference", "target": "mishnah", "marker": "והא קמשמע לן" },
      "provenance": "derivation",
      "anatomy": [{ "kind": "inference-loose", "note": "Read off the Mishnah's choice of sign: a priest who lacks atonement still enters to eat at nightfall. Suggested by the wording, not forced by it." }],
      "ext": { "inference": { "of": "mishnah", "necessary": false } }
    },
    {
      "id": "kidetanya",
      "he": "כדתניא: ״ובא השמש וטהר״ — ביאת שמשו מעכבתו מלאכול בתרומה, ואין כפרתו מעכבתו מלאכול בתרומה.",
      "en": "As it was taught: 'and the sun sets and he is clean' — the setting of his sun bars him from eating terumah, and his atonement does not bar him from eating terumah.",
      "move": { "element": "proof", "subtype": "validation", "target": "kapparah", "marker": "כדתניא" },
      "provenance": "tradition",
      "anatomy": [{ "kind": "preclusive", "note": "Affirms one bar and denies the other." }]
    },
    {
      "id": "dilma",
      "he": "וממאי דהאי ״ובא השמש״ — ביאת השמש, והאי ״וטהר״ — טהר יומא? דילמא ביאת אורו הוא, ומאי ״וטהר״ — טהר גברא!",
      "en": "And how do you know that 'and the sun comes' means the setting of the sun and 'and it is clean' means the day is clear? Perhaps it means the coming of its light, and 'and he is clean' means the man is clean!",
      "move": { "element": "contradiction", "subtype": "opposition", "target": "kidetanya", "marker": "ודלמא? / ואימא?" },
      "provenance": "derivation",
      "anatomy": [{ "kind": "homonym", "note": "`ובא השמש` can mean the sun's setting or its light's coming; `וטהר` the day or the man." }],
      "note": "Another reading is possible, so the baraita's is not necessary: the proof drops to doubt, it is not refuted. A rebuttal that the source does not bear on the claim as read.",
      "ext": { "warrant": { "kind": "rebuttal/irrelevant" } }
    },
    {
      "id": "leima-kra",
      "speaker": "Rabbah bar Rav Shila",
      "he": "אמר רבה בר רב שילא: אם כן, לימא קרא ״ויטהר״! מאי ״וטהר״? טהר יומא.",
      "en": "Rabbah bar Rav Shila said: if so, let the verse say 'and he shall be clean'! What is 'and it is clean'? The day is clear.",
      "move": { "element": "contradiction", "subtype": "direct", "target": "dilma", "marker": "אם כן, לימא קרא X! מאי Y?" },
      "provenance": "tradition",
      "anatomy": [{ "kind": "hypothetical-syllogism-tollens", "note": "Had וטהר meant the man, the verse would say ויטהר; it says וטהר; so it means the day." }],
      "note": "The phrasing argument in its first branch: aimed at a proposed reading of a fixed text. Two readings only, so refuting one proves the other.",
      "ext": { "warrant": { "kind": "proof/indirect", "premises": [{ "text": "the verse reads וטהר, not ויטהר", "provenance": "tradition" }, { "text": "'the man' and 'the day' are the only readings", "provenance": "derivation" }] } }
    },
    {
      "id": "kedaamri",
      "he": "כדאמרי אינשי: איערב שמשא ואדכי יומא.",
      "en": "As people say: the sun has set and the day has cleared.",
      "move": { "element": "proof", "subtype": "validation", "target": "leima-kra", "marker": "כדאמרי אינשי" },
      "provenance": "endoxa",
      "note": "Common speech adduced for the reading: a proof from convention, מפורסמות."
    },
    {
      "id": "bemaarava",
      "he": "במערבא הא דרבה בר רב שילא לא שמיע להו.",
      "en": "In the West, this teaching of Rabbah bar Rav Shila was not known to them.",
      "move": { "element": "statement", "subtype": "reported", "target": "leima-kra" },
      "provenance": "tradition",
      "ext": { "move": { "reportedOf": "the sages of Eretz Yisrael" } }
    },
    {
      "id": "ibbaya-shemesh",
      "speaker": "The sages of the West",
      "he": "ובעו לה מיבעיא: האי ״ובא השמש״ — ביאת שמשו הוא, ומאי ״וטהר״ — טהר יומא; או דילמא ביאת אורו הוא, ומאי ״וטהר״ — טהר גברא?",
      "en": "And they raised it as a question: does 'and the sun comes' mean the setting of his sun, and 'and it is clean' the day is clear; or perhaps the coming of its light, and 'and he is clean' the man is clean?",
      "move": { "element": "question", "subtype": "principle", "target": "bemaarava", "marker": "או דלמא …" },
      "provenance": "asserted",
      "note": "The same two readings as `dilma`, now posed as a two-sided question. Hangs off the report that introduces it."
    },
    {
      "id": "pashtu",
      "he": "והדר פשטו לה מברייתא: מדקתני בברייתא ״סימן לדבר צאת הכוכבים״ — שמע מינה: ביאת שמשו הוא, ומאי ״וטהר״ — טהר יומא.",
      "en": "And then they resolved it from a baraita: since the baraita teaches 'the sign of the matter is the emergence of the stars', infer that it is the setting of his sun, and 'and it is clean' means the day is clear.",
      "move": { "element": "answer", "subtype": "determination", "target": "ibbaya-shemesh", "marker": "פשט … ד" },
      "provenance": "tradition",
      "anatomy": [{ "kind": "inference-necessary", "note": "If the sign is the stars' emergence, the time is nightfall, so the sun's setting — one cannot accept the baraita and deny it." }]
    }
  ]
}
```

**Reducer.** `pashtu` discharges `ibbaya-shemesh`. `kedaamri` raises `leima-kra` (already accepted by base). `leima-kra` live reject on `dilma` → `dilma` **rejected**, exerts nothing. `kidetanya` (tradition) accepted, live → raises `kapparah` → **accepted**. `milsa` discharges `lisni`. `mishnah` accepted by base. The alternative reading falls; the Mishnah's wording is justified; the inference stands — the Talmud's outcome.

---

## §18 · Worked file — a non-Talmudic text (transfer)

The recognizers of §8 are Aramaic; every `test ·` line and every definition in Layers B–E is structural. For a source outside the Talmud, use the structural tests alone: what does this sentence *do* to an earlier one; does the attacker show falsity or only offer an alternative; does the resolver assert the truth or only deflect; is the source cited a tradition of this community, a matter of common opinion, a perception, an axiom. `he` is omitted; `en` is the text; `marker` is omitted unless the text has its own stock phrases (a legal corpus does — *distinguishable*, *on the contrary*, *a fortiori*, *by parity of reasoning*); `attested` is never true; `tractate` names the work or corpus and `folio` its division; `discussedAt` says the passage is not Talmudic and how it was labelled.

A dialogue between two lawyers, A and B (the calibration transfer case):

```
[1] A: All contracts require consideration.
[2] B: Then a promise to make a gift is unenforceable as a contract.
[3] A: Correct.
[4] B: But courts routinely enforce charitable pledges that were given without any consideration.
[5] A: Those pledges are enforced under promissory estoppel, not as contracts.
[6] B: Then either charitable pledges are contracts that lack consideration, or they are not contracts at all. You cannot have it both ways.
[7] A: They are not contracts; estoppel is a distinct basis of liability. So the rule stands: all contracts require consideration.
```

**Decisions.** [2] derives a consequence of [1] by an added premise: a `statement/inference` warranted by a classical syllogism, not a conversion of [1]'s own terms, so neither `inference-necessary` nor `inference-loose` applies. [3] assents: a validation on the speaker's own authority. [4] cites practice against the rule — a particular against a categorical, from the community's tradition (case law): `contradiction/direct`. [5] does not deny the practice; it says the practice does not bear on the rule — a דחיה of the disproof, `rebuttal/irrelevant`, phrased preclusively. [6] enumerates the readings of [5] and finds each unacceptable: a dilemma. [7] picks a horn and asserts it as the truth: a settlement. Its closing "so the rule stands" is not a new proof; it announces a status — and the reducer will say something more careful.

```json
{
  "$schema": "./sugya.schema.json",
  "format": "derech-tevunos/sugya",
  "version": 1,
  "id": "moot-consideration",
  "title": "Do all contracts require consideration?",
  "tractate": "Moot dialogue",
  "folio": "Exchange 1",
  "discussedAt": "Not Talmudic; labelled by the structural tests alone (Part II, every `test ·` line), no Aramaic markers",
  "party": "party-group",
  "about": [
    "Two lawyers, A and B. A states a rule; B derives a consequence, then brings practice against the rule; A says the practice rests on another doctrine; B presses a dilemma; A picks a horn.",
    "The rule ends in doubt, not accepted: B's disproof was deflected, and a deflected disproof returns its target to doubt without proving it (Ramchal p142). A's closing `so the rule stands` overclaims, and the page says so."
  ],
  "units": [
    {
      "id": "rule",
      "speaker": "A",
      "en": "All contracts require consideration.",
      "move": { "element": "statement", "subtype": "firsthand" },
      "provenance": "asserted",
      "anatomy": [{ "kind": "categorical", "basis": "marked" }, { "kind": "simple" }],
      "ext": { "form": { "normalized": "every contract has the property of requiring consideration", "subject": "contracts", "predicate": "require consideration" }, "axis": ["axis/essence"] }
    },
    {
      "id": "gift",
      "speaker": "B",
      "en": "Then a promise to make a gift is unenforceable as a contract.",
      "move": { "element": "statement", "subtype": "inference", "target": "rule" },
      "provenance": "derivation",
      "anatomy": [{ "kind": "classical-syllogism", "note": "Subject down: all contracts require consideration; a gift promise has none; so it is not an enforceable contract." }],
      "note": "Derived with an added premise, so not a conversion of the rule's own terms: neither necessary nor loose inference applies; the syllogism is the label.",
      "ext": { "warrant": { "premises": [{ "id": "rule", "text": "all contracts require consideration", "provenance": "asserted" }, { "text": "a promise to make a gift is given without consideration", "provenance": "endoxa" }] } }
    },
    {
      "id": "correct",
      "speaker": "A",
      "en": "Correct.",
      "move": { "element": "proof", "subtype": "validation", "target": "gift" },
      "provenance": "asserted",
      "note": "An assent: support on the speaker's own authority. Not an answer — nothing was asked."
    },
    {
      "id": "pledges",
      "speaker": "B",
      "en": "But courts routinely enforce charitable pledges that were given without any consideration.",
      "move": { "element": "contradiction", "subtype": "direct", "target": "rule" },
      "provenance": "tradition",
      "anatomy": [{ "kind": "contradictory", "note": "A particular (some enforced promises lack consideration) against a categorical." }, { "kind": "partial", "note": "`routinely … pledges`: some of the class, not all." }],
      "note": "Case law is this community's tradition: a disproof from convention.",
      "ext": { "axis": ["axis/opposition"] }
    },
    {
      "id": "estoppel",
      "speaker": "A",
      "en": "Those pledges are enforced under promissory estoppel, not as contracts.",
      "move": { "element": "contradiction", "subtype": "opposition", "target": "pledges" },
      "provenance": "derivation",
      "anatomy": [{ "kind": "preclusive", "note": "Not as contracts, but under estoppel." }, { "kind": "differs-in-context", "note": "The rule speaks of contracts; the practice is of another doctrine — no opposition." }],
      "note": "The practice is not denied; it is shown not to bear on the rule. A deflection of the disproof; the rule returns to doubt, it is not thereby proved.",
      "ext": { "warrant": { "kind": "rebuttal/irrelevant" } }
    },
    {
      "id": "dilemma",
      "speaker": "B",
      "en": "Then either charitable pledges are contracts that lack consideration, or they are not contracts at all. You cannot have it both ways.",
      "move": { "element": "difficulty", "subtype": "objection", "target": "estoppel" },
      "provenance": "derivation",
      "anatomy": [{ "kind": "disjunction" }, { "kind": "no-middle", "note": "Contract or not: nothing between." }, { "kind": "disjunctive-syllogism" }],
      "ext": { "warrant": { "kind": "disproof/dilemma" } }
    },
    {
      "id": "not-contracts",
      "speaker": "A",
      "en": "They are not contracts; estoppel is a distinct basis of liability. So the rule stands: all contracts require consideration.",
      "move": { "element": "resolution", "subtype": "settlement", "target": "dilemma" },
      "provenance": "derivation",
      "anatomy": [{ "kind": "preclusive" }],
      "note": "Picks the second horn and asserts it as the truth: a יישוב. The closing clause announces a status; it adds no proof, so no `proof/*` unit is made for it. The reducer leaves the rule in doubt — which is the right reading of what A has actually shown."
    }
  ]
}
```

**Reducer.** `not-contracts` discharges `dilemma`. `estoppel` live → unsettles `pledges` → weakened, doubt. `pledges` is a weakened reject on `rule` → `rule` **doubt**. Invariant 5: rebutting a disproof does not prove the claim. The file disagrees with A's last sentence, and is right to.

**Other kinds of text.** A commentary (Blackstone glossing a statute): the statute's sentences are `statement/firsthand` with `provenance: tradition` and `speaker` the statute; the gloss is `statement/explanation` or `forcedExplanation` by the §8 test; an ascribed difficulty (`Blackstone must have found this hard …`) is `statement/reported` with `ext.move.composite: "ascribed-difficulty"`. A judicial opinion: the holding as the claim; each ground as a `proof/demonstration` with the syllogism kind and premises; the dissent's points as `contradiction/direct` or `opposition` by whether they show falsity or offer another reading; *distinguishable* → `fallacy-not-similar`; *a fortiori* → `a-fortiori`; *on the contrary* → `rebuttal/just-the-opposite`. A philosophical dialogue: the same, with `party-individual` when one voice raises and answers its own objections.

---

# Part IV · Gaps, aliases, calibration, checklist

## §19 · Gaps, supplied entries, aliases

### Where the book is silent or the file falls short

**Undefined in the book.** `תיובתא` (§8): definition and effect are `[supplied]`. In the file its effect is `unsettle`, a placeholder marked `UNDEFINED_IN_SOURCE` in `taxonomy.ts`; the verdict is carried by pairing it with a `contradiction/direct` (§8, §13).

**Interpretive effects.** The book fixes effects for the adjudicating elements (proof raises; contradiction rejects; resolution and answer discharge; difficulty unsettles) and for דחיה and שינוי. Treating פירוש דחוק and אוקימתא as *unsettling* their target reads his remark that they cost the author his precision as an effect (`[supplied]`). The file implements this reading.

**Recognizers.** Stock phrases given here that the book does not itself cite — `שמע מינה`, `תניא נמי הכי`, `מיתיבי`, `לא צריכא`, `אלא מעתה` as reductio marker, `מהו דתימא … קא משמע לן`, `תא שמע`, `ואיבעית אימא`, `חסורי מחסרא`, `איידי דתנא` — are standard Talmudic usage supplied for function. Where the book gives a phrase, it is the one quoted in `site/src/rail/markers.ts`; `move.marker` should copy that form, so that files agree with the lexicon and can be checked against it. (The page itself reads *any* `marker` as *marked* — `labelBasis` tests presence, not the lexicon — so a wrong or invented marker is not caught by validation; it is the agent's discipline.)

**No calculus for סברא.** Weight it qualitatively; do not assign numbers. The reducer has no weight at all: a `proof/validation` carrying `sevara` raises like any other, and the `note` must say it should not.

**Expressiveness ceiling.** Unary predicates; no quantifier nesting; genus and species live in the same structure as everything else. Relational content goes inside the predicate term or onto an axis.

**One target.** `move.target` is a single id. A move that acts on two units names the primary and lists all in `ext.move.targets`.

**Anatomy is a flat list.** A label cannot say which *part* of a compound it applies to, nor which of two relations it dissolves. Use `note` and `ext.form.parts`.

**`basis` has two values.** `marked` (a stock phrase in the text) and `inferred` (from function). The system's `attested` and `supplied` bases are carried by `move.attested` and by the `[supplied]` mark in a `note`.

**Precedence, not sequence.** The reducer resolves conflicting moves on one claim by precedence (`reject` > `discharge` > `unsettle`); the book does not decide the case. Segment so that the case does not arise (§6).

**Aspect and modality are unread.** `ext.warrant.aspect` and `.modality` are recorded for the day chaining is checked; nothing on the page uses them. The one present proxy is the edge kind `differs-in-context`.

**Transfer beyond the Talmud.** Recognizers in Aramaic are Talmud-specific; every `test ·` line and every Layer B/C/D/E definition is structural and applies to any argumentative text (§18).

### Readings this guide leaves open

Both labels are defensible in these recurring situations; choose by the passage's outcome and say which in `note`:
- `כי פליגי ב…` — `statement/explanation` (the restriction was implicit) or `statement/presumption` (it is supplied here). Shipped: explanation.
- A named authority's flat counter-statement (`ורבא אמר: הוי יאוש`) — `statement/firsthand` with a relation label, or `contradiction/opposition` so the page shows each leaving the other possible. Shipped: opposition.
- A `הכא במאי עסקינן` that saves a claim after a first narrowing failed — `settlement` (asserted as the truth) or `alternative` (a second deflection). Shipped: alternative for the second narrowing.
- An `אמר X: …` that answers an objection by contradicting a word of the claim it defends (Abaye's `מדרבנן`) — `resolution/settlement` on the objection or `statement/forcedExplanation` on the claim. §16: settlement.
- A Mishnah in question-and-answer form — one `statement/firsthand` (normalized) or a `question/query` + `answer/answer` pair. §17: one statement.
- `תא שמע` that is answered — `difficulty/objection` (shipped Bava Metzia) or `contradiction/direct` (when the source is brought to show falsity and the answer is a דחיה). Choose by whether the answer offers another reading (→ the attack was a סתירה attempt) or removes an unfitness (→ פירכא).

### Aliases

Other names an agent may meet for the same concepts. Map them to the keys in §3 and §7; do not add categories for them.

| term here | also called |
|---|---|
| שמועה first-hand knowledge | memra (מימרא); received ruling |
| פירוש מרווח / פירוש דחוק | full / forced explanation; broad / strained reading |
| אוקימתא presumption | okimta; case-restriction; "the case is …" |
| איבעיא question of principle | ibbaya; two-sided inquiry |
| סייעתא validation | support; corroboration |
| דחיה opposition | deflection; rebuff |
| פירכא objection | formal objection; pircha |
| רומיא apparent contradiction | rumya / ramya; setting two sources against each other |
| יישוב settlement · שינוי alternative | resolution; deflecting answer; shinuya (שינויא) |
| הפכיים ממש diametrically opposed | absolute opposites |
| מתנגדים contradictory | universal-vs-particular opposites |
| מיוחד ומוגבל qualified | modal statement |
| מוגבל (type 5) conditional | limited; stipulated |
| מרבה הענינים compound · מחלק disjunction | complex statement · distributive statement |
| מושכלות ראשונים axiom · מוחשות sense | axiomatic principles · sense perceptions |
| מפורסמות endoxa | common sense; common opinion |
| מקובלות tradition | accepted tradition; received knowledge |
| מה שבעצמו essence | what it is in itself; essential aspect |
| מה שבסגולתו proprium | what is unique to it; property |
| מה שבמקריו accident | its attributes; incidental features |
| היקש מופתי classical syllogism | demonstrative syllogism |
| בנין אב / מה מצינו analogism | binyan av; argument from precedent; גזירה שווה (when the likeness is a shared word) |
| קל וחומר a fortiori | kal vachomer; כל שכן |
| היקש תלוי / היקש מחלק | hypothetical / disjunctive syllogism; modus ponens–tollens / process of elimination |
| סוג genus · מין species | kind · species |
| הפעל affection | being acted upon |
| מתחבר attribute (axis 15) | accompanying accident |
| `variant-subjects` (file) | the other half of `variant`: same predicate, two subjects |
| `fallacy-not-included` (file) | classical-syllogism inclusion failure |
| `via-opposite` (file) | `proof/indirect` |
| `dilemma` (file) | `disproof/dilemma` · ממה נפשך |
| `ground-does-not-reach` (file) | `rebuttal/irrelevant` |
| `theory` (file) | `sevara` · סברא |
| `anatomy` (file) | Layers B, C, D; "the anatomy layer"; the sixty-four kinds |
| `move` (file) | Layer A; "the move layer"; the nineteen leaves; taxonomy |
| `ext` (file) | the waiting room; pending fields |

Spelling: the same terms also appear in defective spelling — פרוש, תרוץ, קשיא, פרכא, רמיא, סיעתא, שנוי, ישוב, אבעיא. This document uses the plene forms common in Talmud study. Treat both as one term. In `marker` copy the form in `markers.ts` (which follows Ramchal's text, often defective: `תניא כותה ד`, `ולפלג … ברישא!`).

---

## §20 · Calibration set

The book's own labelled instances not already given above, each as a one-line unit so the translation is shown, not described. Ids are local to this list; a `target` names a unit that would precede it in a full file.

### Natural foundations of inference (Ch 2, p16–18)

```json
[
  { "id": "hakore", "he": "הקורא … דיעבד – אין, לכתחלה – לא.", "en": "'One who read' — after the fact yes, ab initio no.", "move": { "element": "statement", "subtype": "inference", "target": "mishnah-15a" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-loose", "note": "Berachos 15a: the completed-act form is heard as 'after the fact'. From verb form — retractable." }], "ext": { "inference": { "of": "mishnah-15a", "necessary": false } } },
  { "id": "hakol-shochtin", "he": "הכל שוחטין – לכתחלה.", "en": "'All may slaughter' — ab initio.", "move": { "element": "statement", "subtype": "inference", "target": "mishnah-chullin-2a" }, "provenance": "derivation", "anatomy": [{ "kind": "inference-loose", "note": "Chullin 2a: the participle licenses the ab-initio reading. From verb form." }], "ext": { "inference": { "of": "mishnah-chullin-2a", "necessary": false } } },
  { "id": "mibaei-4a", "he": "האי ״הכל נאמנים״? ״כל הבתים בחזקת בדוקים״ מיבעי ליה!", "en": "'All are believed'? It should have said 'all houses are presumed searched'!", "move": { "element": "difficulty", "subtype": "objection", "target": "hakol-neemanim", "marker": "X מיבעי ליה" }, "provenance": "derivation", "note": "Pesachim 4a: the law should have been phrased on the houses, not the people.", "ext": { "warrant": { "kind": "style/self-contradictory" } } }
]
```

### Forms (Ch 3, 6)

```json
[
  { "id": "kol-yisrael", "he": "כל ישראל יש להם חלק לעולם הבא.", "en": "All Israel have a share in the world to come.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "categorical", "basis": "marked" }, { "kind": "simple" }], "note": "Sanhedrin 90a; proved from Isaiah 60:21." },
  { "id": "mutaros", "he": "יש מותרות לבעליהן ואסורות ליבמיהן.", "en": "There are women permitted to their husbands and forbidden to their levirs.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "partial", "basis": "marked" }, { "kind": "compound" }], "note": "Yebamos 84a." },
  { "id": "kilei-zeraim", "he": "כלאי זרעים … אסורין מלזרוע ומלקיים ומותרין באכילה וכל שכן בהנאה.", "en": "Mixed seeds are forbidden to sow and to maintain, and permitted to eat and all the more for benefit.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "compound-needless", "basis": "marked" }], "note": "Kil'ayim 8:1: `וכל שכן` — the second part needs no saying." },
  { "id": "o-cholets", "he": "או חולץ או מיבם.", "en": "He either performs chalitzah or marries her.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "disjunction", "basis": "marked" }], "note": "Yebamos 112b: true only if both options are live (Ch 6)." }
]
```

### Relations (Ch 4)

```json
[
  { "id": "davar-echad", "he": "רבי יוחנן בן ברוקה ורבי נחמיה אמרו דבר אחד … והא אנינות כלאחר זריקה הויא.", "en": "R. Yochanan ben Beroka and R. Nechemiah said one thing … for mourning is like after the sprinkling.", "move": { "element": "statement", "subtype": "inference", "target": "nechemiah" }, "provenance": "derivation", "anatomy": [{ "kind": "equivalent", "note": "Pesachim 82b: similar, not identical, subjects; the same predicate (burn at once). `אמרו דבר אחד` is the Talmud naming the relation." }], "ext": { "relation": { "to": "ben-beroka", "kind": "equivalent" } } },
  { "id": "yesh-get", "speaker": "Chachamim", "he": "וחכמים אומרים: יש גט אחר גט ויש מאמר אחר מאמר.", "en": "And the Sages say: there is a bill after a bill and a declaration after a declaration.", "move": { "element": "contradiction", "subtype": "opposition", "target": "ein-get" }, "provenance": "tradition", "anatomy": [{ "kind": "diametrically-opposed", "note": "Yebamos 50a, against Rabban Gamliel's `אין גט אחר גט ולא מאמר אחר מאמר`: same S, same P, yes against no, both categorical." }] }
]
```

### Warrants (Ch 7, 8)

```json
[
  { "id": "kosev-lash", "he": "הכותב – חייב; הלש – חייב.", "en": "One who writes is liable; one who kneads is liable.", "move": { "element": "statement", "subtype": "inference", "target": "av-melacha" }, "provenance": "derivation", "anatomy": [{ "kind": "classical-syllogism", "note": "Shabbos 70a / Sanhedrin 53a: subject down from `העושה אב מלאכה בשבת חייב סקילה`." }, { "kind": "inference-necessary" }] },
  { "id": "min-hatzad", "he": "טלטול מן הצד אין שמו טלטול.", "en": "Sideways handling is not called handling.", "move": { "element": "contradiction", "subtype": "opposition", "target": "mukzeh-min-hatzad" }, "provenance": "tradition", "anatomy": [{ "kind": "fallacy-not-included", "note": "Shabbos 43b: the inclusion fails — the mukzeh rule does not reach sideways handling — so the conclusion is withdrawn." }], "ext": { "warrant": { "kind": "rebuttal/invalid-syllogism" } } },
  { "id": "meachas-9a", "he": "מאי שנא ״מאחת״ דמשמע להו? דכתבה רחמנא לבסוף גבי עשירית האיפה … דאי סלקא דעתך … נכתבה רחמנא להאי ״מאחת״ בדלות אי נמי בעשירות.", "en": "Why does 'of one' mean this to them? Because the Merciful One wrote it last, by the tenth-ephah offering … for if you thought otherwise, let it have been written by the poor man's offering or the rich man's.", "move": { "element": "proof", "subtype": "demonstration", "target": "meachas-reading" }, "provenance": "tradition", "anatomy": [{ "kind": "hypothetical-syllogism-tollens" }, { "kind": "via-opposite" }], "note": "Horayos 9a.", "ext": { "warrant": { "kind": "proof/indirect" } } },
  { "id": "makeh-adam", "he": "דאתקש למכה בהמה.", "en": "For it is juxtaposed to one who strikes an animal.", "move": { "element": "proof", "subtype": "demonstration", "target": "mamon-claim" }, "provenance": "tradition", "anatomy": [{ "kind": "analogism", "basis": "marked", "note": "Bava Kamma 83b: the similarity premise is tradition — juxtaposed subjects teach each other." }], "ext": { "warrant": { "premises": [{ "text": "מכה אדם and מכה בהמה are juxtaposed in Scripture", "provenance": "tradition" }] }, "axis": ["axis/similarity"] } }
]
```

Pesachim 16a / 17b, the whole shape (shipped as `pesachim-liquids.json`): R. Eleazar's demonstration from Yosi ben Yo'ezer (`proof/demonstration`, tradition) — Rav Papa's counter-claim `הלכתא גמירי לה` that would undercut it (`contradiction/opposition`, `rebuttal/irrelevant`) — Rav Huna's סתירה of Rav Papa (`contradiction/direct`, tollens: a received law yields no derivations). The undercutter is rejected, exerts nothing, and the proof recovers: R. Eleazar reads *accepted*. §8 gives all three units.

### Moves (Ch 9)

```json
[
  { "id": "keitzad", "speaker": "Mishnah", "he": "כיצד מברכין על הפירות?", "en": "How does one recite a blessing over fruit?", "move": { "element": "question", "subtype": "query", "marker": "כיצד …?" }, "provenance": "tradition", "note": "Berachos 35a: a query for a rule." },
  { "id": "nichsei-av", "he": "ואם יש שם אב – נכסים של אב.", "en": "And if there is a father, the property is the father's.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "anatomy": [{ "kind": "conditional", "basis": "marked" }], "note": "Yebamos 40a; proved by `דאמר מר: אב קודם לכל יוצאי ירכו` (§8, demonstration)." },
  { "id": "rami-4a", "speaker": "R. Yaakov bar Idi", "he": "רבי יעקב בר אידי רמי, כתיב ״והנה אנכי עמך ושמרתיך״, וכתיב ״ויירא יעקב מאד״.", "en": "He raised a contradiction between 'behold I am with you and will protect you' and 'and Yaakov was very afraid'.", "move": { "element": "difficulty", "subtype": "apparentContradiction", "target": "promise", "marker": "… רמי, כתיב … וכתיב", "attested": true }, "provenance": "derivation", "anatomy": [{ "kind": "diametrically-opposed" }], "note": "Berachos 4a; resolved by the יישוב `שמא יגרום החטא` — both verses stand." },
  { "id": "shinuy-104b", "he": "לא! משום דלאו בני דעה נינהו.", "en": "No! It is because they lack the power of understanding.", "move": { "element": "resolution", "subtype": "alternative", "target": "baraita-104b", "marker": "לא! משום ד", "attested": true }, "provenance": "derivation", "anatomy": [{ "kind": "differs-in-context" }], "note": "Yebamos 104b: Rava's claim stays possible, unproven." }
]
```

### Axes (Ch 11)

```json
[
  { "id": "mashkei", "he": "משקי בי מדבחיא דכן.", "en": "The liquids of the Temple slaughterhouse are clean.", "move": { "element": "statement", "subtype": "firsthand" }, "provenance": "tradition", "note": "Pesachim 17a: the genus of `הדם והיין והשמן והמים`; the two statements are equivalent.", "ext": { "axis": ["axis/genus-species"] } },
  { "id": "idi-veidi", "he": "אידי ואידי חד שיעורא הוא.", "en": "This and that are one measure.", "move": { "element": "resolution", "subtype": "settlement", "target": "kesubos-60a-q" }, "provenance": "derivation", "note": "Kesubos 60a: two measures equated.", "ext": { "axis": ["axis/similarity"] } }
]
```

---

## §21 · Checklist before a file ships

1. **Required keys present** — `format: "derech-tevunos/sugya"`, `version: 1`, `id`, `title`, `tractate`, `folio`, `discussedAt`, `units`; each unit `id`, `en`, `move`; each move `element`, `subtype`. No unknown keys anywhere outside `ext` (§5).
2. **Every `subtype` belongs to its `element`**; every `target` names an earlier unit's `id`; ids unique; no unit targets itself.
3. **One unit, one move, one target.** Sentences holding two moves are split (§6, §16); the split is explained in `note` or `about`.
4. **`provenance` filled wherever known** — `tradition` on every Mishnah, baraita and verse; `asserted` on a rabbi's own ruling; `derivation` on reasoning. The default is `asserted`, and a defaulted proof-text reads *doubt* instead of *accepted*.
5. **`marker` copied exactly** from `markers.ts` where the phrase appears; `attested: true` only where Ramchal labels this passage; neither otherwise.
6. **Every `anatomy.kind` is one of the sixty-four**; row kinds describe the unit, edge kinds describe its relation to its `target`; `basis: marked` only when the phrase is in the text; a `note` on any label that is not obvious. Write `variant` vs `variant-subjects` by which term changes; write `via-opposite`, `dilemma`, `ground-does-not-reach`, `theory` for the warrant kinds that have those icons; do not write a derived ground that `provenance` already implies.
7. **`ext` carries only what has no home** — `form`, `relation`, `warrant`, `axis`, `inference`, `move`, `priority` under their guide names; `ext.move.targets` lists every target with the primary first; nothing in `ext` duplicates a present field.
8. **`תיובתא` paired** with a `contradiction/direct` on the same target; `sevara` noted as weak; a rebuttal's `ext.warrant.kind` is `rebuttal/*` and what it leans on is a premise.
9. **The reducer's verdict matches the source's.** Trace §13 by hand for the claim the passage is about; where the Talmud closes with `והלכתא`, `תיובתא`, or a last word standing, the file must draw the same status. Where it cannot (a placeholder effect, a tiebreak), `about` says so.
10. **`about` written** — what the passage is, then how it was labelled, then where it was stretched. `short` on any unit whose `en` is long. `note` on every judgment call.
11. **Validated** — `parseSugya` passes with no faults (§5); the file is in canonical form (`stringify`); it opens in the gallery and the page reads as the argument does.

---

*End.*
