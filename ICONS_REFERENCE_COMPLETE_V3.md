# Ramchal Icons. Complete Application Reference V3

Updated 20 September 2026. This is the application integration reference for `ramchal-icons-complete-v3.zip`.

## Contents

- [Integration contract](#reference-section-1)
- [1. Package inventory](#reference-section-2)
- [2. Hierarchy and placement](#reference-section-3)
- [3. Current selection rules](#reference-section-4)
- [4. Visual grammar and implementation](#reference-section-5)
- [5. Chapter 9 subtype additions](#reference-section-6)
- [6. Chapter 10 reported-move compositions](#reference-section-7)
- [7. Chapter 11 subject analysis](#reference-section-8)
- [8. Three kinds of priority](#reference-section-9)
- [9. Existing icons revised in this work](#reference-section-10)
- [10. Complete base-icon catalog](#reference-section-11)
- [11. Usage and source fidelity](#reference-section-12)
- [12. Order and two kinds of knowledge](#reference-section-13)
- [13. Selected Action and Cause subtypes](#reference-section-14)
- [14. Inseparable Property](#reference-section-15)
- [15. Selected Premise and Conclusion](#reference-section-16)
- [16. Selected Antecedent and Consequent](#reference-section-17)
- [17. Selected Predicate](#reference-section-18)
- [Retained previous Subject form](#reference-section-19)
- [18. Current candidates](#reference-section-20)
- [19. Current audit follow-up candidate: Contingent Attribute](#reference-section-21)
- [20. Selected compound-statement branches](#reference-section-22)
- [21. Selected parent grounds](#reference-section-23)
- [22. Hyperbole candidate and Necessity reuse](#reference-section-24)
- [23. Expanded deduction definitions and the next two families](#reference-section-25)
- [24. Statement commitments / סוף גזרתו](#reference-section-26)
- [25. Complete current asset registry](#reference-section-27)
- [26. Full statement-commitment mapping and source passages](#reference-section-28)

<a id="reference-section-1"></a>

## Integration contract

**Import all 159 current icons.** The archive contains **160 SVG files**: 159 current icons plus the explicitly retained previous Subject drawing. The older 154-icon selected-only ZIP omits five current drawings and is not the complete application export.

The design ledger distinguishes 154 selected drawings from five review drawings. This release includes all five at the user's explicit request to pass **ALL** icons downstream. That provenance does not mean the application should omit them. It also does not retrospectively claim every drawing received separate visual approval. `include_in_application: true` is the import instruction for every current entry.

The five included review drawings are `synonymous-terms`, `refutation`, `contingent-attribute`, `hyperbole`, and `statement-commitment` (סוף גזרתו). They now live under `icons/` in this export. Their original paths and source hashes are recorded for traceability. Filenames and logical keys are stable.

The current Subject is **`subject-bearer`**. The square-and-triangle drawing is retained under `alternates/subject/` only as an optional previous form. It is not a second current construct or a default replacement.

### Files to use

- `ICON_MANIFEST.json`: all 159 keys, exact asset paths, SVG titles/descriptions, view boxes, design provenance and SHA-256 hashes; the retained alternative is listed separately.
- `ICONS_REFERENCE_COMPLETE_V3.md`: this complete reference, including definitions, Hebrew terms, source examples, hierarchy, usage limits and a complete registry.
- `README_INTEGRATION.md`: direct instructions for the implementing agent.
- `ALL_ICONS_GALLERY.html`: offline gallery of all 159 current assets and the separate alternative.
- `index.html` and the named review pages: the existing illustrated source-first guide. Their historical selected/review counts describe design provenance, not an application import filter.
- `source/DerechTevunos_full_nonikud_fixed.md`: the full supplied bilingual source, unchanged. Source JSON files and reviews carry exact passages and example context. Historical count/status notes in those supporting records do not supersede this release's import contract.
- `checksums.sha256` and `tools/verify_package.py`: byte integrity and complete-coverage verification.

### Implementation rules

1. Register by the manifest's exact `key`, not an English label or a transliterated Hebrew guess. Replace existing matching-key artwork with these files. Add every missing key.
2. Preserve `viewBox`, proportions, strokes, fills, opacity, gradients and internal geometry. Use `object-fit: contain` for image elements. Some inference icons are wider than square.
3. Preserve the SVG's orientation in RTL layouts. Hebrew text is RTL; the pictorial arrow direction must not be automatically mirrored.
4. If SVGs are inlined, give IDs and all linked references a unique prefix **per rendered occurrence**, including gradient, clip, title, description, `href`, `url(#...)`, `aria-labelledby` and `aria-describedby`. External image URLs isolate these IDs naturally.
5. Supply accessible labels from the concept being shown. Shared assets need specific labels: Necessity and Certainty share `qualified-certain`; Direct contradiction uses `contradiction` with its subtype label. Avoid interpreting color or fill as a global truth verdict.
6. Keep the icon as a visual annotation, separate from the claim's truth status, statement text, source citation and challenge target. A proof can itself be challenged without marking its conclusion false.
7. Keep actual Ramchal examples in grey panels, Hebrew first and fresh English below. Put the exact definition and translation in the white area. Do not fabricate source examples where the text supplies none.
8. Preserve unrelated application assets and functionality. Do not delete icons absent from this Ramchal namespace merely because they are not in this archive.

### Taxonomy safeguards

There are seven principal discussion moves and seventeen immediate named subtypes. Full/Forced Explanation classify **fit**; Ukimta classifies **method**. Do not flatten these into an exhaustive “nineteen terminal types” enum. A method and a fit assessment can coexist.

Independent dimensions include statement form, participant/term role, relation, inference method, grounds, subject aspect and priority. An icon's directory is an asset-organizing convenience, not a claim of semantic parentage. In particular `synonymous-terms` is grouped with relation assets but its explicit source is Chapter 10, pp.211–212.

`obverse` identifies the text's relation between statements with opposite subject and predicate terms. Ramchal's p.63 wording says ונמצא ענינם אחד. That wording is preserved in the source; it does not license a general-purpose inference that both-term negation preserves truth for arbitrary propositions. The SVG title is clarified in this export; its geometry is unchanged. Do not implement automatic logical transformations from the icon alone.

### Latest designs and meanings that must survive migration

| Key or family | Required current treatment |
|---|---|
| `statement-commitment` | סוף גזרתו. Whole violet statement tile inside four focusing corners. Identifies what is asserted, which can be a dependence or multiple commitments. |
| `refutation` | Red hexagon with arrow/break interior. Preserve the explicit exception to the orange triangle family. |
| `inseparable-property` | Compact chain joining the property diamond and subject square. No infinity sign or oversized white outlined link. |
| `essential-form` | Outer square, four outward-spaced brackets, enlarged filled inner square. Keep distinct from `essence-definition`. |
| `subject-bearer`, `predicate` | Subject emphasizes the back cell; Predicate the front cell. Keep the other cell smaller and lighter. |
| `premise`, `conclusion`, `subject-result` | Dotted boundary at bottom, top and far left respectively. Do not interchange causal Result with logical Conclusion. |
| `compound-equal`, `compound-known-novel` | Shared violet grouping bracket. Two equal circles versus circle plus novel star; no extra inference arrow. |
| `ground-natural`, `ground-convention` | Magenta ground houses with selected child inlays. Nature and shared acceptance are independent parent grounds. |
| `hyperbole`, `qualified-certain` | Ripple-to-wave hyperbole in the figurative bubble. Necessity reuses Qualified Certain with its own label. |
| `disjunctive-syllogism-affirm` | Selected return-arrow fork for establishing one alternative and excluding others. Preserve original elimination icon too. |
| Classical and A fortiori | Use expanded meanings below. Classical includes subject inclusion and necessary predicate connection; A fortiori can run in either warranted direction. |
| `hypothetical`, `consequent`, `conditional` | Dependence only; both clauses plus dependence; base assertion plus restriction, respectively. |

### Integration acceptance checklist

- All 159 manifest keys resolve to their packaged SVGs and appear in the application registry.
- Five review-provenance drawings are included, especially סוף גזרתו and the red Refutation.
- The retained Subject remains available separately and does not displace `subject-bearer`.
- Existing matching keys use the current geometry, including dotted boundaries and the enlarged Essential Form center.
- Wide SVGs retain their aspect ratio; repeated inline gradients/IDs render correctly; RTL text does not mirror icons.
- Shared concepts keep distinct labels; English-name collisions do not merge separate keys.
- The implementing agent reports added/replaced keys, any unmapped application concepts and the final registry count.

<a id="reference-section-2"></a>

## 1. Package inventory

| Directory | SVG count | Meaning |
|---|---:|---|
| `icons/ch1-3/` | 29 | Participants and the anatomy of a statement |
| `icons/ch4-7/` | 38 | Relations, implications, figurative meaning, deductions, and deduction failures |
| `icons/ch8/` | 23 | Grounds, support, rebuttals, presentation problems, potential and actual, and inseparable property |
| `icons/ch9-moves/` | 7 | The seven principal discussion moves |
| `icons/ch9-subtypes/` | 19 | Selected Statement, Question, Answer, Proof, Contradiction, Difficulty, and Resolution forms, including Explanation details |
| `icons/ch10-composites/` | 2 | Reported information functioning as proof or difficulty |
| `icons/ch11-subjects/` | 32 | The twenty-four numbered distinctions and represented branches |
| `icons/ch11-priority/` | 3 | Temporal, intellectual/rank, and natural/dependence priority |
| `icons/ch11-order/` | 6 | Order, its three principles, and the two kinds of knowledge |
| **Total current** | **159** | **Import all these assets** |
| `alternates/subject/` | 1 | Retained previous Subject, not active by default |
| **Total SVG files** | **160** | **Current icons plus retained alternative** |

All file paths below are relative to the extracted package root. Stable identifiers are filename stems. For example, `subject-place` resolves to `icons/ch11-subjects/subject-place.svg`.

Asset counts, conceptual nodes, and hierarchy levels are different counts. One icon can serve more than one conceptual node. A node can also have a shared parent icon and a text label rather than a dedicated drawing.

<a id="reference-section-3"></a>

## 2. Hierarchy and placement

### 2.1 The seven moves and their subtypes

Source: Hebrew pp.161–187; English pp.162–188. Earlier introductory enumeration: Hebrew p.13; English p.14.

| Principal move | Immediate subtypes | Further subdivision |
|---|---|---|
| Statement, מימרא | Stated teaching/שמועה; Explanation; Inference; Reported information | Explanation fit: Full or Forced; separate method: Ukimta/אוקימתא |
| Question, שאלה | Query; Question of principle/אבעיא | None added here |
| Answer, תשובה | Answer to a query; Determination/פשיטות | None added here |
| Proof, ראיה | Demonstration/הוכחה; Validation/סיעתא | None added here |
| Contradiction, סתירה | Direct contradiction/סתירה; Opposition/דחיה | None added here |
| Difficulty, קשיא | Objection/פרכא; Apparent contradiction/רמיא; Refutation/תיובתא | None added here |
| Resolution, תרוץ | Settlement/ישוב; Alternative/שנוי | None added here |

There are **seven principal moves and seventeen immediate named subtypes**. Explanation fit (Full or Forced) and explanatory method (Ukimta) are separate dimensions. Do not interpret the old nineteen-item display count as an exhaustive terminal taxonomy.

The eighteen selected subtype/detail SVGs cover the four Statement forms, three Explanation details, two Question forms, two Answer forms, and the seven selected Proof, Contradiction, Difficulty, and Resolution additions. Direct contradiction uses the existing category red-X icon. Refutation/תיובתא now has a separately tracked candidate using a user-requested hexagonal frame and an externally sourced operational definition, expressly authorized by the user; see section 18. Preserve subtype information even when a picture is shared.

### 2.2 Independent dimensions

| Dimension | Question | Placement |
|---|---|---|
| Participant | Who is conducting the discussion? | Speaker annotation |
| Discussion move | What does this contribution do? | Primary row icon |
| Statement anatomy | What kind of claim is this? | Badge on the statement |
| Relation | How do two statements relate? | Connector or relation annotation |
| Inference or deduction | How does the conclusion follow? | Reasoning connector |
| Ground or support | What warrants the argument, and with what strength? | Proof/disproof connector or its evaluation |
| Subject analysis | What aspect of the subject is being examined? | Subject or statement annotation |
| Priority | In what sense is one thing prior to another? | Ordering or explanatory-dependence relation |

A Demonstration may have a Quantity badge and use a Tradition ground. These are compatible descriptions at different levels. Theory/סברא belongs to the evaluation of support; it is not a third immediate subtype of Proof alongside Demonstration and Validation.

Chapter 10's two compositions express combined functions. Chapter 11's distinctions concern the subject of inquiry. Neither creates extra principal moves.

<a id="reference-section-4"></a>

## 3. Current selection rules

### 3.1 Proof, challenge, and resolution families

| Concept | Current design and file |
|---|---|
| Proof | Green thumbs-up, `icons/ch9-moves/proof.svg` |
| Demonstration | Monitor containing the Proof thumbs-up, `icons/ch9-subtypes/demonstration.svg` |
| Validation | Two facing thumbs-up, `icons/ch9-subtypes/validation.svg` |
| Direct contradiction | Red X in a circle, `icons/ch9-moves/contradiction.svg` |
| Opposition/דחיה | Red X circle with two outgoing arrows, `icons/ch9-subtypes/opposition.svg` |
| Difficulty | Warning triangle, `icons/ch9-moves/difficulty.svg` |
| Objection | Warning triangle containing a projectile directed at an upright statement block, `icons/ch9-subtypes/objection.svg` |
| Apparent contradiction | Warning triangle containing two opposing chevrons, `icons/ch9-subtypes/apparent-contradiction.svg` |
| Settlement | Lightbulb with a continuous bridge-like filament and check, `icons/ch9-subtypes/settlement.svg` |
| Alternative | Equally bright lightbulb with a dotted bridge-like filament and open circle, `icons/ch9-subtypes/alternative.svg` |

The outer family shapes remain meaningful. The inner drawings distinguish the selected subtypes. A check inside Settlement marks the proposer's endorsement; it is not a separate adjudication that the explanation is correct.

### 3.2 Attribute, place, posture, movement, and time

| Concept | Current exported design |
|---|---|
| Attribute, מתחבר | Magnifier examining a square with a diamond at its upper-left corner |
| In/on/attached | One subject square, with three **identically sized diamonds** inside, on top, and at the side |
| Present alongside | Separate square and diamond over a common bracket |
| Before/after | Central square between two markers, with a sequence arrow below |
| Place | Single location pin |
| Orientation/posture | Standing and seated figures |
| Movement | Matching squares at two places, linked by a route |
| Time | Single clock |

All eight live under `icons/ch11-subjects/`. The chosen posture and movement drawings are exported under their ordinary concept keys. Consumers do not need design-origin-specific paths.

The three Attribute children are branches of distinction 15. Place, Orientation, Movement, and Time are separate numbered distinctions. The three diamonds represent alternative positions of an attribute; the icon does not require all three positions to occur at once. Present alongside has no clock in its drawing; the source definition's simultaneous presence is retained in the wording.

### 3.3 Cross-set distinctions

| Concept pair | Required distinction |
|---|---|
| Place vs Different Places | One pin for the aspect “place”; two pins for statements referring to different places |
| Time vs Different Times | One clock for the aspect “time”; two clocks showing different hours for statements referring to different times |
| Time vs Temporal Priority | Time identifies when; Temporal Priority shows that one thing precedes another in time |
| Opposition/דחיה vs Opposition/נגוד | `opposition` is a Chapter 9 rebuttal move; `subject-opposition` is Chapter 11's general opposition relation |
| Similarity vs Comparative vs Analogism | `subject-similarity` marks likeness; `comparative` marks a statement comparing matters; `analogism` marks a deduction |
| Subject vs Statement | `subject-bearer` asks what bears an attribute; `statement` identifies a discussion move |
| Parts vs Kind/species | Parts are constituents; kind/species concerns classification |
| Being affected vs Result | Being affected examines a recipient's received impression; Result identifies the effect arising from a cause |
| Purpose vs Result | Purpose is the intended end; Result is what actually follows |

### 3.4 Approved Statement family

The four immediate Statement designs were approved on 20 September 2026. Each uses the exact existing `statement` document outline and an individually adapted interior. These are the current exported files, with one version per key.

| Concept | Current design | File |
|---|---|---|
| Stated teaching / שמועה | Tall speech bubble containing statement lines | `icons/ch9-subtypes/first-hand.svg` |
| Explanation / פרוש | Selected wording above, connected to an explanatory gloss below | `icons/ch9-subtypes/explanation.svg` |
| Inference / דיוק | Source text above a downward arrow and separate derived point | `icons/ch9-subtypes/inference.svg` |
| Reported information / הגדה | Larger upper speech bubble containing one person; reporter below | `icons/ch9-subtypes/reported-information.svg` |

The stable `first-hand` key is retained; its display label is “Stated teaching.” The supplied edition's “First-hand Knowledge” label does not require eyewitness experience or original discovery. The four assets classify what the contribution does. A named speaker alone does not make a statement Reported information: the שמועה example also names its speaker.

<a id="reference-section-5"></a>

## 4. Visual grammar and implementation

### 4.1 Family colors

| Family | Color |
|---|---|
| Participants and statement-related additions | Slate, normally `#475569`; preserve each supplied base asset's exact color |
| Statement anatomy, relations, subject analysis, priority | Violet `#7c3aed` |
| Derivation | Teal `#0d9488` |
| Grounds and associated Chapter 8 analysis | Magenta `#c026d3` |
| Question | Blue `#2563eb` |
| Answer and Proof | Green `#16a34a` |
| Contradiction | Red `#dc2626` |
| Difficulty | Orange `#ea580c` |
| Resolution additions | Gold `#ca8a04`; retain the existing parent bulb's supplied color |

Colors are project conventions, not a replacement for hierarchy or textual labels. A green Proof icon identifies the kind of move, not a verdict that its argument succeeds. Keep evaluation/status independent from a badge's family color.

### 4.2 Geometry

Most icons use `viewBox="-12 -12 24 24"`, rounded caps and joins, a nominal 1.45-unit stroke, and a light tint around 15%. Internal details may use different strokes to preserve legibility. The three Chapter 5 inference icons use the wider `-18 -12 36 24` canvas. Preserve aspect ratio instead of stretching them into squares.

Chapter 4 uses subject/predicate geometry because the terms inside a statement matter. Other families may depict whole matters or cases. Chapter 8 uses the house and ground-plane convention. Chapter 11 extends the analytical violet palette without replacing these established grammars.

Filled, outlined, negative, and dashed shapes have context-specific meanings. In Chapter 7, solid versus outlined can mark established versus derived. A solid Chapter 4 tile with a white glyph can mark negation. Dashed implied statements in Chapter 5 differ from the provisional filament of Alternative. Apply the meaning assigned to the particular icon.

The Statement family uses the original 13.2 by 17.2-unit document frame with its 1.35-unit stroke. The four selected interiors use 0.95-unit strokes and are drawn directly in the 24-unit canvas. Their proportions and positions use the taller interior: the inference is vertical, and the reporting bubble and figures are independently sized. Keep these layouts intact when resizing the overall SVG.

### 4.3 Display

Use text labels alongside small icons. The set has been inspected at small display sizes, typically 20, 24, 32, and 48 pixels, and at larger review sizes. This is rendering review, not a learner-recognition study. Prefer at least 24–32 pixels when the internal distinction matters. Preserve the wider aspect ratio of the three inference badges.

Each asset includes an accessible label and title; newer additions also include a description. An ordinary image element can be used directly:

```html
<img src="icons/ch9-subtypes/demonstration.svg"
     width="32" height="32" alt="Demonstration: הוכחה">
```

If SVG markup is embedded repeatedly, prefix internal IDs for **every occurrence**, including gradient, clipping, title, and description IDs and their references. Reusing a gradient ID across several copies can produce incorrect rendering. The explanatory guide used this occurrence-level prefixing to eliminate the earlier missing-icon problems.

<a id="reference-section-6"></a>

## 5. Chapter 9 subtype additions

The eighteen detailed entries below are the selected files in `icons/ch9-subtypes/`. Direct contradiction remains a reuse of `icons/ch9-moves/contradiction.svg`.
### The four forms of Statement / מימרא

המימרא תתחלק לארבעה חלקים: האחד – שמועה, השני –פרוש, השלישי – דיוק, הרביעי– הגדה.

Statement divides into four parts: the first is a stated teaching, the second explanation, the third inference, and the fourth reported information.

Source: Hebrew p.161; English p.162. The four entries below are immediate children of Statement.

### `first-hand`: Stated teaching / שמועה

**File:** [icons/ch9-subtypes/first-hand.svg](icons/ch9-subtypes/first-hand.svg)

**Hierarchy:** Chapter 9 / Statement / immediate subtype

**Source:** Hebrew pp. 161; English pp. 162.

**Ramchal’s wording:**

השמועה היא – שיאמר אומר מאמר אחד, יודיע בו אחד מן הענינים בדבר מן ההלכות, או מן המוסרים, או באיזה מין משכל שיהיה.

**Translation:** A stated teaching is when a speaker makes a statement communicating a matter of halacha, ethical teaching, or any kind of intelligible subject.

**Current visual:** Tall speech bubble and three statement lines inside the Statement document outline. The bubble and tail occupy the height of the interior.

**Ramchal’s rule:**

ומשפטיה משפטי המאמרים שבארנו בפרק ג.

Its rules are the rules of statements explained in Chapter Three.

**Ramchal’s example:**

דרך משל (ברכות כ ב): "אמר רב אדא בר אהבה: נשים חיבות בקדוש היום – דבר תורה".

For example: Rav Ada bar Ahavah said, “Women are obligated in the sanctification of the day by Torah law.”

**Use and limits:** The speech bubble denotes communicating a teaching. It does not assert original authorship, eyewitness knowledge, proof, or acceptance. The technical category is broader than personal news or classroom teaching.

### `explanation`: Explanation / פרוש

**File:** [icons/ch9-subtypes/explanation.svg](icons/ch9-subtypes/explanation.svg)

**Hierarchy:** Chapter 9 / Statement / immediate subtype

**Source:** Hebrew pp. 161, 163; English pp. 162, 164.

**Ramchal’s wording:**

הפרוש הוא – שיפרש אחד מן הכתובים או מן המאמרים.

**Translation:** Explanation is when one explains a verse or a statement.

**Current visual:** Words at the top are selected by a bracket. A longer annotation leader connects them to a two-line gloss below; it has no arrowhead.

**Ramchal’s rule:**

ואמנם משפט הפרוש הוא, שמלבד הסכימו עם האמת בעצם ענינו, צריך שיסכים עם המאמר המפרש כפי מלותיו וסדר הגדתו.

The rule of explanation is that, besides agreeing with the truth in its subject matter, it must agree with the statement being explained according to its words and the order of its presentation.

**Ramchal’s example:**

דרך משל (ברכות כג א): "אמר רבי יהושע בן לוי: מה טיבן של טובלי שחרין?" פרשו אחר כך: "הכי קאמר: מה טיבן בארבעים סאה – אפשר בתשעה קבין? מה טיבן בטבילה – אפשר בנתינה?"

For example: Rabbi Yehoshua ben Levi said, “What is the point of those who immerse in the morning?” This was subsequently explained: “This is what he means: Why use forty se’ahs when nine kavs are possible? Why immerse when pouring is possible?”

**Use and limits:** The gloss clarifies the meaning of existing wording. Full and forced explanation describe its fit; אוקימתא supplies a case or condition. Those further distinctions remain within Explanation and are not extra immediate Statement subtypes.

### `inference`: Inference / דיוק

**File:** [icons/ch9-subtypes/inference.svg](icons/ch9-subtypes/inference.svg)

**Hierarchy:** Chapter 9 / Statement / immediate subtype

**Source:** Hebrew pp. 165; English pp. 166.

**Ramchal’s wording:**

הדיוק הוא – שידיק ממאמר אחד או כתוב אחד מה שלא פרש בו, וכמו שבארנו למעלה.

**Translation:** Inference is when one draws from a statement or verse something that was not made explicit in it, as explained above.

**Current visual:** Three source lines sit above a grouping rule. A centered arrow descends to a separate point, using the document height instead of a horizontal export-like layout.

**Ramchal’s rule:**

ומשפטיו נתבארו בפרק ה.

Its rules were explained in Chapter Five.

**Ramchal’s example:**

דרך משל, על משנת (ברכות כ כ) "בעל קרי מהרהר בלבו" "אמר רבינא: זאת אומרת – הרהור כדבור דמי?"

For example, concerning the Mishnah, “One who has had a seminal emission recites in his mind,” Ravina said: “Does this imply that thinking is equivalent to speech?”

**Use and limits:** This is the Chapter 9 discussion move, not a verdict about its logical force. Chapter 5 badges distinguish necessary and suggested implications. The separate point is a neutral derived item, not a truth-value mark. Labels remain useful because an arrow alone cannot encode logical inference.

### `reported-information`: Reported information / הגדה

**File:** [icons/ch9-subtypes/reported-information.svg](icons/ch9-subtypes/reported-information.svg)

**Hierarchy:** Chapter 9 / Statement / immediate subtype

**Source:** Hebrew pp. 165, 167; English pp. 166, 168.

**Ramchal’s wording:**

ההגדה – שיגיד אחד מעשה או מאמר זולתו. וכן נכלל במין הזה כשיגיד מחשבת זולתו, פרוש – כשיגיד אחד מה שהרגיש אחר לפי דעתו מן הקשיות או מן התרוצים.

**Translation:** Reported information is when someone reports another person’s deed or statement. This also includes reporting another’s thought: describing the difficulties or resolutions that the other recognized according to that person’s own view.

**Current visual:** An enlarged speech bubble in the upper interior contains the person reported about. A larger reporting person sits below toward the bubble tail.

**Ramchal’s example:**

דרך משל, כשאמרו (שבת יט א): "אמר רבי צדוק: כך היה מנהגו של בית רבן גמליאל".

For example: Rabbi Tzadok said, “This was the practice of the house of Rabban Gamliel.”

**Ramchal’s example:**

וכשאמרו (בבא קמא נב ב): "תו קא קשיא לתנא: מאי חזית דילפת ממכה בהמה – לילף ממכה אדם", הנה שם מגיד הש"ס מה שהרגיש התנא לפי דעתו בדברי עצמו.

And when they said, “The Tanna had a further difficulty: Why do you prefer to derive it from striking an animal? Derive it from striking a person,” the Talmud is reporting what the Tanna recognized, according to his own view, in his own words.

**Use and limits:** The two people distinguish the reporter from the person whose deed, words, or thought are reported. The report need not quote verbatim or endorse the other person. Attribution alone is insufficient to identify this category. Chapter 10 reported-proof and reported-difficulty icons remain separate compositions.

### `demonstration`: Demonstration / הוכחה

**File:** [icons/ch9-subtypes/demonstration.svg](icons/ch9-subtypes/demonstration.svg)

**Hierarchy:** Chapter 9 / Proof / immediate subtype

**Source:** Hebrew pp. 173, 175; English pp. 174, 176.

**Ramchal’s wording:**

ההוכחה היא – שיביא ראיה להוכיח אמתת מאמר שנאמר.

**Meaning:** Brings evidence to establish the truth of a statement. It is the establishing form of Proof.

**Current visual:** Green monitor containing the same thumbs-up vocabulary as Proof. The monitor preserves the Demonstration identity; the embedded thumb preserves its parent family.

**Source example:** Ramchal cites the testimony of Yose ben Yoezer concerning the purity of the slaughterhouse liquids, and the question “מנא הני מלי?” answered by an authoritative source.

**Use and limits:** The picture does not certify success. Ramchal permits demonstration based on reasoned inclination (סברא), while treating it as less strong than compelling proof. Keep the ground and strength of support as separate annotations.

### `validation`: Validation / סיעתא

**File:** [icons/ch9-subtypes/validation.svg](icons/ch9-subtypes/validation.svg)

**Hierarchy:** Chapter 9 / Proof / immediate subtype

**Source:** Hebrew pp. 175; English pp. 176.

**Ramchal’s wording:**

הסיעתא – שיובא מאמר אחד שיסכים למאמר אחר לחזק הדעה שנאמרה בו.

**Meaning:** One statement is brought because it agrees with another, strengthening the opinion expressed there.

**Current visual:** Two green thumbs-up facing each other.

**Source example:** “תניא כותה דרבא” introduces a teaching supporting Rava in the supplied example concerning a torn shoe used for chalitzah.

**Use and limits:** The two thumbs represent corroboration between statements, not two human judges or a vote count. Validation remains under Proof. It is not a new evidence-source family.

### `opposition`: Opposition / rebuttal of necessity / דחיה

**File:** [icons/ch9-subtypes/opposition.svg](icons/ch9-subtypes/opposition.svg)

**Hierarchy:** Chapter 9 / Contradiction / immediate subtype

**Source:** Hebrew pp. 177, 179; English pp. 178, 180.

**Ramchal’s wording:**

הדחיה – שידחה הכרח המאמר, אך לא יבטל ענינו לגמרי, ולא תכחש אפשרותו.

**Meaning:** Removes the necessity of the proposed statement or inference while leaving its possibility intact.

**Current visual:** The red X circle has a stem leading to two outgoing arrows. Both possibility branches remain open.

**Source example:** The markers “מאי לאו?” answered “לאו!”, and alternatives introduced by “ודלמא?” or “ואימא?”.

**Use and limits:** The red X circle marks the Contradiction family, not a verdict that the proposition is false. The competing possibility must have a plausible place in the subject. Removing a proof’s force does not automatically disprove its conclusion. Distinguish this move from Chapter 11 נגוד.

### `objection`: Objection / פרכא

**File:** [icons/ch9-subtypes/objection.svg](icons/ch9-subtypes/objection.svg)

**Hierarchy:** Chapter 9 / Difficulty / immediate subtype

**Source:** Hebrew pp. 179, 181; English pp. 180, 182.

**Ramchal’s wording:**

הפרכא היא – כשימצא בסדר המאמר או הגדתו דבר בלתי נאות.

**Meaning:** Identifies something unfitting in the arrangement or presentation of a statement, including the need for its whole wording or a part of it.

**Current visual:** The accepted orange warning triangle contains a projectile aimed at an upright statement block.

**Source example:** “הא גופא קשיא”, objections that material is already known or repeated, and “ולפלג רבי מאיר ברישא”.

**Use and limits:** Do not broaden this subtype to every possible attack merely because the projectile is a generic challenge image. The source concerns order, wording, necessity of saying something, and related presentation problems. The targeted statement remains standing.

### `apparent-contradiction`: Apparent contradiction / רמיא

**File:** [icons/ch9-subtypes/apparent-contradiction.svg](icons/ch9-subtypes/apparent-contradiction.svg)

**Hierarchy:** Chapter 9 / Difficulty / immediate subtype

**Source:** Hebrew pp. 181, 183; English pp. 182, 184.

**Ramchal’s wording:**

הרמיא– כשיובאו שני מאמרים, או שני כתובים הפכיים או מתנגדים, לבקש ישובם.

**Meaning:** Brings two opposed statements or scriptural passages together in order to seek their reconciliation.

**Current visual:** The accepted warning triangle contains two equal opposing chevrons.

**Source example:** “ורמינהי”; Ramchal also compares the promise to Jacob “והנה אנכי עמך ושמרתיך בכל אשר־תלך” with “ויירא יעקב מאד”.

**Use and limits:** Both sides remain present. This is a request to reconcile the apparent conflict, not an announcement that one side has already been defeated. Use Chapter 4 relation badges to describe the precise relation between the two statements.

### `settlement`: Settlement / ישוב

**File:** [icons/ch9-subtypes/settlement.svg](icons/ch9-subtypes/settlement.svg)

**Hierarchy:** Chapter 9 / Resolution / immediate subtype

**Source:** Hebrew pp. 183, 185, 187; English pp. 184, 186, 188.

**Ramchal’s wording:**

הישוב כשתתרץ הפרכא או הרמיא בישוב נכון ואמתי, שיאמין בו המתרץ היות זה אמתת הדבר.

**Meaning:** Resolves the objection or apparent contradiction with a fitting explanation that the proposer believes is the actual truth.

**Current visual:** A gold lightbulb contains a continuous bridge-like filament and a check.

**Source example:** Jacob’s fear is reconciled with the promise by “שמא יגרם החטא”.

**Use and limits:** The check expresses the proposer’s commitment. It is not an independent correctness verdict. The two filament terminals do not require two source statements: a settlement may answer an objection within one statement.

### `alternative`: Alternative / שנוי

**File:** [icons/ch9-subtypes/alternative.svg](icons/ch9-subtypes/alternative.svg)

**Hierarchy:** Chapter 9 / Resolution / immediate subtype

**Source:** Hebrew pp. 185, 187; English pp. 186, 188.

**Ramchal’s wording:**

השנוי – כשתתרץ הקשיא או הרמיא במה שאין הכונה בו למתרץ בהחלט שתהיה כן אמתת הדבר, אלא שתדחה הקשיא.

**Meaning:** Supplies a defensible reading that removes the difficulty without the proposer committing that it is the actual explanation.

**Current visual:** The same gold bulb contains a dotted bridge-like filament and an open circle. The outer bulb and brightness match Settlement.

**Source example:** The chalitzah objection initially explains invalidity through inability to recite; the reply offers lack of understanding instead.

**Use and limits:** Provisional does not mean invalid, dimmer, or necessarily forced. The same reading can function as Settlement or Alternative depending on the proposer’s commitment. An interpretation that the wording cannot bear is inadmissible. Its target is a difficulty, whereas דחיה challenges a claim or proof.

### Direct contradiction: shared asset

Direct contradiction/סתירה reuses [icons/ch9-moves/contradiction.svg](icons/ch9-moves/contradiction.svg). The source defines it as invalidating a statement or a proof, Hebrew p.177 / English p.178. The same red X circle serves the broad category and this specific form. Identify the subtype in the text or data; a duplicate SVG is unnecessary.

### Further distinctions within Explanation

Full and forced are two degrees of fit; Ukimta is a method of clarification. Preserve that distinction in the data model instead of treating all three as equal grades of fit.

**Governing rule:**

ואמנם משפט הפרוש הוא, שמלבד הסכימו עם האמת בעצם ענינו, צריך שיסכים עם המאמר המפרש כפי מלותיו וסדר הגדתו.

**Translation:** An explanation must agree with the truth in its subject matter and with the statement being explained, according to its words and the order of its presentation.

Source: Hebrew pp. 163; English pp. 164.

**Boundary of rejection:**

ואם לא יסכים כלל עם המאמר, נדחהו לגמרי.

**Translation:** If it does not agree with the statement at all, we reject it completely.

Source: Hebrew pp. 163; English pp. 164.

### `full-explanation`: Full explanation / פרוש מרוח

**File:** [icons/ch9-subtypes/full-explanation.svg](icons/ch9-subtypes/full-explanation.svg)

**Hierarchy:** Chapter 9 / Statement / Explanation / Degree of fit

**Ramchal’s wording:**

ואולם, אם יסכים לגמרי עם המאמר – יקרא פרוש מרוח,

**Translation:** If it agrees completely with the statement, it is called a full explanation.

Source: Hebrew pp. 163; English pp. 164.

Ramchal supplies no separate concrete example for this entry in the cited passage.

**Current visual:** Two broad sections meet at a clean puzzle seam inside the existing Statement document.

**Use and limits:** Full and forced classify degrees of fit between an explanation and the wording and arrangement of the statement. A clean fit is not an independent Proof or truth verdict. The two pictured pieces are illustrative, not a rule that explanations have exactly two parts.

### `forced-explanation`: Forced explanation / פרוש דחוק

**File:** [icons/ch9-subtypes/forced-explanation.svg](icons/ch9-subtypes/forced-explanation.svg)

**Hierarchy:** Chapter 9 / Statement / Explanation / Degree of fit

**Ramchal’s wording:**

ואם יסכים בעקר המאמר ולא יאות היטב עם כל המלות או עם כל הסדר, עד שנצטרך לומר שלא דבר בעל המאמר בדקדוק – יקרא פרוש דחוק;

**Translation:** If it agrees with the essential point of the statement but does not fit all its words or their arrangement well, so that we must say the author did not speak precisely, it is called a forced explanation.

Source: Hebrew pp. 163; English pp. 164.

Ramchal supplies no separate concrete example for this entry in the cited passage.

**Current visual:** The same connected seam remains, but the lower section narrows between two inward arrows.

**Use and limits:** The explanation still fits the essential point, while requiring latitude in wording or arrangement. Strain is not total incompatibility, falsehood, or coercion of a person. A reading that does not agree with the statement at all is rejected, rather than classified as merely forced.

### `presumption`: Ukimta / specifying the case / אוקימתא

**File:** [icons/ch9-subtypes/presumption.svg](icons/ch9-subtypes/presumption.svg)

**Hierarchy:** Chapter 9 / Statement / Explanation / Method of explanation

**Ramchal’s wording:**

והנה בכלל זה, יכלל דרך באור הנקרא אוקימתא, והוא באור תנאי במאמר, דהינו שלא נבאר כלל ההגדה ומלותיה, אלא נניח כמשמעו הפשוט, אבל נגביל המאמר באחד התנאים, והוא כשנאמר: "הכא במאי עסקינן", או "הא מני? רבי פלוני היא".

**Translation:** This includes the method of clarification called Ukimta: specifying a condition in the statement. We do not reinterpret its expression or words; we leave them in their plain meaning, but restrict the statement by a condition. For example: “Here, what case are we dealing with?” or “Whose view is this? It is that of Rabbi so-and-so.”

Source: Hebrew pp. 163, 165; English pp. 164, 166.

**Ramchal’s example:**

דרך משל (ברכות כג) "הכא במאי עסקינן", וכן (ברכות כד ג) "לא שנו אלא שיכול לכון את לבו בלחש".

**Translation:** For example: “Here, what case are we dealing with?” And: “They taught this only where he can concentrate while praying quietly.”

Source: Hebrew pp. 165; English pp. 166.

**Current visual:** Unmodified wording at the top leads through a funnel to one bounded case inside the Statement document.

**Use and limits:** Ukimta supplies a condition while retaining the words’ plain meaning. It is a method of clarification, not a third degree of fit. The supplied outline indents it beneath Forced explanation, but the main passage does not assert that every Ukimta is forced. The stable key presumption preserves the edition’s label; the displayed name clarifies the operation. The funnel means restricting application, not deleting or rewriting words.

### The two Question forms and their corresponding Answers

A Query requests information and its Answer supplies what was asked. An Ibayya presents grounds for two sides and its Determination decides between them.

**Question division:**

השאלה תחלק לשנים: האחד – שאלה, השני – אבעיא.

**Translation:** Question divides into two: Query and Ibayya, a two-sided question.

Source: Hebrew pp. 167; English pp. 168.

**Answer division:**

התשובה תחלק גם כן לשנים: האחד – תשובת השאלה, השני – תשובת האבעיא, ונקראת פשיטות.

**Translation:** Answer also divides into two: the answer to a Query and the answer to an Ibayya, which is called Determination.

Source: Hebrew pp. 171; English pp. 172.

### `query`: Query / שאלה

**File:** [icons/ch9-subtypes/query.svg](icons/ch9-subtypes/query.svg)

**Hierarchy:** Chapter 9 / Question / immediate subtype

**Ramchal’s wording:**

השאלה – כשישאל שואל על ענין אחד, אם הוא – אם אינו, או על תנאי ממנו, כגון על מקום, או על זמן, או על טעם, וכיוצא בזה.

**Translation:** A Query asks about a matter, whether it is so or not, or about one of its circumstances, such as place, time, reason, or the like.

Source: Hebrew pp. 167; English pp. 168.

**Ramchal’s example:**

דרך משל (יבמות קנב א): "אמרתי לו: כלום אתה בקי ברבי יהודה בן בתירא?"

**Translation:** For example: “I said to him: Are you familiar with Rabbi Yehudah ben Beteira?”

Source: Hebrew pp. 167; English pp. 168.

**Ramchal’s example:**

וכן כשאמרו (ברכות לה א): "כיצד מברכין על הפרות ?"

**Translation:** And: “How does one recite a blessing over fruits?”

Source: Hebrew pp. 167; English pp. 168.

**Ramchal’s example:**

וכן כשאמרו (יבמות קיב ב): "מאי שנא חרש וחרשת דתקינו להו רבנן נשואין, ומאי שנא דשוטה ושוטה דלא תקינו להו רבנן נשואין?"

**Translation:** And: “Why did the Sages institute marriage for a deaf-mute man and woman, but not for a man and woman lacking mental competence?”

Source: Hebrew pp. 169; English pp. 170.

**Current visual:** A blue question mark above one open response field.

**Use and limits:** A Query can request yes or no, or information about a circumstance. It is not restricted to open-ended questions. The single field represents the requested information, not a one-word answer limit.

### `question-of-principle`: Two-sided question / אבעיא

**File:** [icons/ch9-subtypes/question-of-principle.svg](icons/ch9-subtypes/question-of-principle.svg)

**Hierarchy:** Chapter 9 / Question / immediate subtype

**Ramchal’s wording:**

תאבעיא – כשישאל שואל על ענין אחד שיש בו פנים לשני צדדים ויבקש על ההכרעה לאחד מהם.

**Translation:** An Ibayya asks about a matter that has grounds for two sides, seeking a decision in favor of one of them.

Source: Hebrew pp. 169; English pp. 170.

**Ramchal’s example:**

דרך משל (יבמות נח ב): "בעא מנה רבי חיא בר יוסף משמואל: כהן גדול שקדש את הקטנה ובגרה תחתיו – מהו? בתר נשואין אזלינן או בתר ארוסין אזלינן?"

**Translation:** For example: “Rabbi Chiyya bar Yosef asked Shmuel: A High Priest betrothed a minor, and she reached maturity while betrothed to him. What is the ruling? Do we follow the time of marriage or the time of betrothal?”

Source: Hebrew pp. 169; English pp. 170.

**Current visual:** A blue question mark above a fork terminating in two equal empty option boxes.

**Use and limits:** The defining feature is a matter with grounds for two sides and a request for a decision. Merely asking yes or no does not make a Query an Ibayya. The English edition calls this Question of Principle; the stable key is retained. The supplied definition’s תאבעיא spelling is preserved in the quotation.

### `answer-to-query`: Answer to a query / תשובת השאלה

**File:** [icons/ch9-subtypes/answer-to-query.svg](icons/ch9-subtypes/answer-to-query.svg)

**Hierarchy:** Chapter 9 / Answer / immediate subtype

**Ramchal’s wording:**

התשובה – שישיב על השאלה כפי מה שהיא.  אם שאל על מציאות ענין, אם הוא – אם אינו – ישיב לו: הן! או לאו! ואם טעם בקש – ישיבהו הטעם.

**Translation:** An Answer responds to the Query according to what it asks. If it asks whether a matter is so or not, he answers yes or no. If it asks for a reason, he gives the reason.

Source: Hebrew pp. 171; English pp. 172.

**Ramchal’s further rule:**

וכן השאר. ומשפטה להיות תשובה על פי השאלה ולהיות אמתית.

**Translation:** And similarly for the other cases. Its rule is that it must answer what was asked and be true.

Source: Hebrew pp. 171; English pp. 172.

**Ramchal’s example:**

דרך משל, על שאלת (יבמות קב א): "כלום אתה בקי ברבי יהודה בן בתירא" השיב: "הן!"

**Translation:** For example, to the question “Are you familiar with Rabbi Yehudah ben Beteira?” he answered, “Yes.”

Source: Hebrew pp. 171; English pp. 172.

**Ramchal’s example:**

על שאלת (יבמות קיב ב): "מאי שנא חרש וחרשת?" השיב: "חרש וחרשת דקימא תקנתא דרבנן – תקינו להו רבנן נשואין, שוטה ושוטה דלא קימא תקנתא דרבנן – לא תקינו רבנן נשואין".

**Translation:** To “Why are a deaf-mute man and woman different?” he answered: “For a deaf-mute man and woman, for whom the rabbinic arrangement is sustainable, the Sages instituted marriage. For a man and woman lacking mental competence, for whom the arrangement is not sustainable, they did not institute marriage.”

Source: Hebrew pp. 171; English pp. 172.

**Current visual:** Text lines above the same response field, now containing a check, within the exact existing green Answer frame.

**Use and limits:** The Answer must supply what was asked and be true. The check marks a supplied answer, not necessarily yes, and does not certify independent verification. This is the counterpart of Query, not the Chapter 9 Proof move.

### `determination`: Determination / פשיטות

**File:** [icons/ch9-subtypes/determination.svg](icons/ch9-subtypes/determination.svg)

**Hierarchy:** Chapter 9 / Answer / immediate subtype

**Ramchal’s wording:**

הפשיטות היא – שיכריע לאחד משני צדדי האבעיא.

**Translation:** Determination decides in favor of one of the two sides of the Ibayya.

Source: Hebrew pp. 171; English pp. 172.

**Ramchal’s further rule:**

ומשפטה כמשפט התשובה.

**Translation:** Its rule is the same as that of an Answer.

Source: Hebrew pp. 173; English pp. 174.

**Ramchal’s example:**

דרך משל, על הבעיא (יבמות נח ב): "כהן גדול שקדש את הקטנה ובגרה תחתיו – מהו?" פשט שמואל דבתר נשואין אזלינן.

**Translation:** For example, regarding “A High Priest betrothed a minor, and she reached maturity while betrothed to him. What is the ruling?” Shmuel determined that we follow the time of marriage.

Source: Hebrew pp. 173; English pp. 174.

**Current visual:** A fork ending in two options, one checked and one unselected, within the exact existing green Answer frame.

**Use and limits:** Determination selects one of an Ibayya’s two sides and follows the same rule as an Answer. The left-hand selection is illustrative, not a preference for the first side. פשיטות is distinct from פשיטא, an assertion that something is obvious.

<a id="reference-section-7"></a>

## 6. Chapter 10 reported-move compositions

These two additions express combined functions. They do not expand the seven-move hierarchy. Both use a slate report/document carrier with quotation marks and an existing move glyph. Quotation marks also cover reported deeds and reconstructed viewpoints; they do not promise a verbatim quotation.

### `ascribed-proof`: Ascribed proof / הוכחה והגדה

**File:** [icons/ch10-composites/ascribed-proof.svg](icons/ch10-composites/ascribed-proof.svg)

**Hierarchy:** Chapter 10 / combination of Reported information and Demonstration

**Source:** Hebrew pp. 213; English pp. 214.

**Meaning:** Reported information supplies evidence for a claim. The report performs a reporting function and an evidential function together.

**Current visual:** A slate quoted document contains the existing green Proof thumb, embedded without changing its underlying paths.

**Use and limits:** This need not mean quoting another person’s proof. Assess the truth of the report separately from whether the report establishes the claim. A defect in the inference need not invalidate the report, and rejection of the proof need not falsify the conclusion.

### `ascribed-difficulty`: Ascribed difficulty / קשיא מגדת

**File:** [icons/ch10-composites/ascribed-difficulty.svg](icons/ch10-composites/ascribed-difficulty.svg)

**Hierarchy:** Chapter 10 / combination of Reported information and Difficulty

**Source:** Hebrew pp. 213, 215, 217; English pp. 214, 216, 218.

**Meaning:** A speaker reports or reconstructs a difficulty according to another thinker’s position.

**Current visual:** A slate quoted document contains the existing orange Difficulty triangle.

**Use and limits:** The reporter need not endorse the difficulty. Accuracy of attribution and force of the difficulty are separate questions. The passage does not restrict the combination to Objection/פרכא, so the payload is the general Difficulty icon.

<a id="reference-section-8"></a>

## 7. Chapter 11 subject analysis

The numbered list has twenty-four distinctions. The thirty-two SVGs also preserve Attribute’s three child drawings and the four Action/Cause children. Form has a parent concept and two branches: Essential Form has a nested-square drawing; Perceptible Form has an outline drawing. The distinct Essential Form artwork follows the user’s explicit instruction, while Ramchal’s identification of essential form with essence remains unchanged. Natural/Voluntary Action and Generative/Effective Cause now have their own four selected child icons; see section 13.

These badges describe the aspect under examination. A statement can address more than one aspect, such as the number of parts. Do not force each entire statement into exactly one mutually exclusive bucket.

### 7.1 Numbered coverage and asset mapping

| No. | Distinction | Current key or mapping |
|---|---|---|
| 1 | Essence / definition | `essence-definition` |
| 2 | Parts | `subject-parts` |
| 3 | Quality | `subject-quality` |
| 4 | Quantity | `subject-quantity` |
| 5 | Material | `subject-material` |
| 6 | Form | `Essential → essential-form; perceptible → perceptible-form` |
| 7 | Action | `subject-action` |
| 8 | Being affected | `subject-being-affected` |
| 9 | Kind and species | `kind-species` |
| 10 | Cause | `subject-cause` |
| 11 | Means | `subject-means` |
| 12 | Motive | `subject-motive` |
| 13 | Purpose | `subject-purpose` |
| 14 | Result | `subject-result` |
| 15 | Attribute | `subject-attribute; three child keys below` |
| 16 | Place | `subject-place` |
| 17 | Orientation / posture | `subject-orientation` |
| 18 | Movement | `subject-movement` |
| 19 | Time | `subject-time` |
| 20 | Relation | `subject-relation` |
| 21 | Subject / bearer | `subject-bearer` |
| 22 | Similarity | `subject-similarity` |
| 23 | Difference | `subject-difference` |
| 24 | Opposition | `subject-opposition` |

### 7.2 Detailed subject entries

### `essence-definition`: Essence / definition / מהות · גדר

**File:** [icons/ch11-subjects/essence-definition.svg](icons/ch11-subjects/essence-definition.svg)

**Hierarchy:** Chapter 11 / distinction 1 of 24

**Source:** Hebrew pp. 221; English pp. 222.

**Ramchal’s wording:**

הבחנה ראשונה – המהות, והיא כלל ענינו של הנושא כפי מה שהוא באמת, שבו תבחינהו במחשבתך מכל שאר הנושאים המצוירים בה. ובאור הענין הכללי הזה כראוי, נקרא גדר.

**Meaning:** Essence is the subject’s defining identity. A definition expresses what makes it what it is, distinguishing it from other subjects.

**Current visual:** Chapter 11, English p222, Hebrew p221. A single whole is precisely framed. The frame is a mnemonic for a definition that captures essential identity, not for physical shape, an inner material core, or individual identification. Essence is the thing’s what-it-is; definition states it.

**Source example:** Ramchal defines an עוללת, a particular grape cluster, by lacking both כתף and נטף, citing Pe’ah 7:4.

**Use and limits:** Essential Form under distinction 6 now uses its own nested-square drawing, at the user’s request. The shared corner brackets preserve their conceptual connection. A color, temporary condition, or accidental characteristic does not by itself define the subject. The framed whole does not imply that essence is a physical shape.

### `subject-parts`: Parts / חלקים

**File:** [icons/ch11-subjects/subject-parts.svg](icons/ch11-subjects/subject-parts.svg)

**Hierarchy:** Chapter 11 / distinction 2 of 24

**Source:** Hebrew pp. 221; English pp. 222.

**Ramchal’s wording:**

הבחנה שניה – החלקים.

**Meaning:** The components or regions into which the subject is divided as a whole.

**Current visual:** Chapter 11, English p222, Hebrew p221. A whole is separated into constituent pieces. The three pictured pieces are illustrative; the subject need not have three parts. Parts are not the same as the material from which a subject is made or species within a kind.

**Source example:** The two layers of the esophagus; Upper Galilee, Lower Galilee, and the valley.

**Use and limits:** Parts are not the material from which a thing is made, and are not species within a genus. The number of drawn pieces is illustrative.

### `subject-quality`: Quality / איכות

**File:** [icons/ch11-subjects/subject-quality.svg](icons/ch11-subjects/subject-quality.svg)

**Hierarchy:** Chapter 11 / distinction 3 of 24

**Source:** Hebrew pp. 223; English pp. 224.

**Ramchal’s wording:**

הבחנה שלישית – האיכות, והיא תכונת הנושא ומזגו, כגון אם הוא קר ואם הוא חם, אם הוא לח ואם יבש, המראה שבו, חזקו או חלשתו, וכיוצא בזה.

**Meaning:** The subject’s constitution, condition, appearance, strength, and similar characteristics.

**Current visual:** Chapter 11, English p224, Hebrew p223. A thermometer and texture swatch suggest characteristics such as hot or cold, hard or soft, appearance, strength or weakness. Quality here does not mean excellence, a star rating, or a measured amount.

**Source example:** Red and white; hard and soft.

**Use and limits:** Quality does not mean excellence or a rating. Temperature and texture are examples of the wider concept. Numerical measurement of a quality can also involve Quantity.

### `subject-quantity`: Quantity / כמות

**File:** [icons/ch11-subjects/subject-quantity.svg](icons/ch11-subjects/subject-quantity.svg)

**Hierarchy:** Chapter 11 / distinction 4 of 24

**Source:** Hebrew pp. 223, 225; English pp. 224, 226.

**Ramchal’s wording:**

הבחנה רביעית– הכמות, והיא המדה במה ששיך מדה, ומנין במה ששיך מנין.

**Meaning:** Measurement where measurement applies, and number where counting applies.

**Current visual:** Chapter 11, English pp224–226, Hebrew p223. A graduated ruler and three separate units represent the two cases: measuring what is measurable and counting what is countable. This differs from whether a statement applies to all, some, or one subject.

**Source example:** Sixteen cubits in each direction; forty-five vines.

**Use and limits:** It covers both how much and how many. It is distinct from Chapter 3’s universal/partial/particular scope of a statement.

### `subject-material`: Material / חמר

**File:** [icons/ch11-subjects/subject-material.svg](icons/ch11-subjects/subject-material.svg)

**Hierarchy:** Chapter 11 / distinction 5 of 24

**Source:** Hebrew pp. 225; English pp. 226.

**Ramchal’s wording:**

הבחנה חמישית – החמר, והוא מה שממנו נעשה הנושא.

**Meaning:** What the subject is made from.

**Current visual:** Chapter 11, English p226, Hebrew p225. A tinted block has a hatched cut surface to suggest substance. Material is what the object is made from, such as metal or clay, rather than its component parts, its shape, or the agent that makes it. The block is a mnemonic, not a claim that all material is solid.

**Source example:** Metal utensils are made of metal; earthenware is made of clay.

**Use and limits:** Keep Material distinct from components, visible shape, and the agent that makes the object. The block does not restrict the concept to solids.

### `essential-form`: Essential form / צורה עצמית

**File:** [icons/ch11-subjects/essential-form.svg](icons/ch11-subjects/essential-form.svg)

**Hierarchy:** Chapter 11 / distinction 6 of 24 / Form / Essential branch

**Source:** Hebrew p.225; English p.226.

**Ramchal’s wording:** העצמית היא מהותו של הנושא

**Meaning:** The essential form is the essence of the subject, grasped intellectually.

**Current visual:** An outer square encloses four corner brackets, which frame a substantial solid inner square. The user explicitly requested these three nested layers to evoke a structural skeleton: the filled center represents the defining form of the whole. The initial tiny center looked like a target; the current center is twice as wide, with the brackets shifted outward. Violet and the corner brackets connect it to the existing Essence vocabulary.

**Source example:** צורת האדם היא היותו בעל־חי מדבר. Ramchal presents the human being as a living being endowed with speech and says this form is grasped intellectually, not sensed or seen.

**Use and limits:** This is a distinct contextual drawing for the Essential branch of Form, not an assertion that essential form and essence are philosophically different. The skeleton is a visual metaphor, not a literal anatomical skeleton, physical component, or material core. Keep the independent Essence icon unchanged. The user’s explicit new design supersedes earlier reuse instructions.

### `perceptible-form`: Perceptible form / צורה מרגשת

**File:** [icons/ch11-subjects/perceptible-form.svg](icons/ch11-subjects/perceptible-form.svg)

**Hierarchy:** Chapter 11 / distinction 6 of 24 / Form / Perceptible branch

**Source:** Hebrew pp. 225; English pp. 226.

**Ramchal’s wording:**

המרגשת היא תבנית הנושא כמו שיראוהו העינים.

**Meaning:** The visible outline or shape of the subject as perceived by the eyes.

**Current visual:** Chapter 11, English p226, Hebrew p225. The unpatterned contour of the same block used for Material focuses on visible shape. This is only the perceptible branch of Form. Essential Form is identified with essence in the text and now has its own nested-square icon at the user’s request.

**Source example:** An open-ended box and an angular form.

**Use and limits:** This is one branch of Form. The other branch, Essential Form/עצמית, is the essence grasped intellectually and uses the essential-form icon. A visible-outline icon must not stand for both branches without a label.

### `subject-action`: Action / פעלה

**File:** [icons/ch11-subjects/subject-action.svg](icons/ch11-subjects/subject-action.svg)

**Hierarchy:** Chapter 11 / distinction 7 of 24

**Source:** Hebrew pp. 225; English pp. 226.

**Ramchal’s wording:**

הבחנה שביעית – הפעלה, והיא מה שהוא פועל בזולתו,

**Meaning:** The subject acts on something else. Ramchal divides Action into natural/טבעית and voluntary/רצונית.

**Current visual:** Chapter 11, English p226, Hebrew p225. An arrow leads from the larger subject block toward another thing. Ramchal distinguishes natural action from action chosen by a human agent. The arrow marks acting on another, not merely movement, logical entailment, or the subject’s capacity to act.

**Source example:** A natural effect on the intestines; a person reciting the Shema as a voluntary act.

**Use and limits:** The branches use selected `subject-action-natural` and `subject-action-voluntary` icons. Natural includes what things do by their nature, not merely an unwilling person’s act. The arrow represents acting on another, not logical entailment or spatial movement.

### `subject-being-affected`: Being affected / הפעל

**File:** [icons/ch11-subjects/subject-being-affected.svg](icons/ch11-subjects/subject-being-affected.svg)

**Hierarchy:** Chapter 11 / distinction 8 of 24

**Source:** Hebrew pp. 225, 227; English pp. 226, 228.

**Ramchal’s wording:**

הבחנה שמינית – ההפעל, והוא רשם שנרשם בנושא ממה שפועלים בו אחרים,

**Meaning:** An impression or effect received by the subject from others acting on it.

**Current visual:** Chapter 11, English pp226–228, Hebrew pp225–227. The arrow points from another thing toward the same larger subject block. The subject is considered as receiving an effect. The translation’s Affection does not mean fondness; receiving an effect need not involve damage.

**Source example:** Heat spreading through metal: “חם מקצתו – חם כלו”.

**Use and limits:** The supplied English “Affection” means being acted upon, not emotion. An effect need not be harmful. The same subject/other arrangement as Action is retained with the direction reversed.

### `kind-species`: Kind and species / סוג ומין

**File:** [icons/ch11-subjects/kind-species.svg](icons/ch11-subjects/kind-species.svg)

**Hierarchy:** Chapter 11 / distinction 9 of 24

**Source:** Hebrew pp. 227, 229; English pp. 228, 230.

**Ramchal’s wording:**

הבחנה תשיעית – הסוג והמין, דהינו מאיזה סוג הוא הנושא או מאיזה מין.

**Meaning:** The broader and narrower classes under which the subject falls. A middle class can be a species relative to a higher class and a kind relative to its own subordinate classes.

**Current visual:** Chapter 11, English pp228–230, Hebrew pp227–229. Nested groups show progressively narrower classifications. A classification can be a species relative to a broader kind and a kind relative to narrower species. The nesting represents classification, not component parts or a syllogistic inference.

**Source example:** Body, living being, and human; wooden vessels and their kinds.

**Use and limits:** These are relative classification levels, not necessarily biological ranks. Nested enclosures represent inclusion in classes, not physical constituents or a deduction.

### `subject-cause`: Cause / סבה

**File:** [icons/ch11-subjects/subject-cause.svg](icons/ch11-subjects/subject-cause.svg)

**Hierarchy:** Chapter 11 / distinction 10 of 24

**Source:** Hebrew pp. 229; English pp. 230.

**Ramchal’s wording:**

הבחנה עשירית – הסבה, והיא מה שמכחה נולד ונמצא המסבב.

**Meaning:** That from whose power the effect arises. Generative/מולדת cause has an effect proceeding as a continuation from it; effective/פועלת cause produces something that is not a continuation of itself.

**Current visual:** Chapter 11, English p230, Hebrew p229. A producing mechanism directs an arrow outward. The gear is a mnemonic for bringing about an effect, including both generative and effective causes, not a restriction to mechanical causes. The two causal types have selected subtype icons and explicit text labels.

**Source example:** Tree and fruit, father and child, and a craftsperson producing utensils.

**Use and limits:** The branches use selected `subject-cause-generative` and `subject-cause-effective` icons. The gear is a mnemonic for production; it does not restrict causation to machinery. A thing’s causal role depends on the explanatory relation being considered.

### `subject-means`: Means / אמצעי

**File:** [icons/ch11-subjects/subject-means.svg](icons/ch11-subjects/subject-means.svg)

**Hierarchy:** Chapter 11 / distinction 11 of 24

**Source:** Hebrew pp. 229; English pp. 230.

**Ramchal’s wording:**

הבחנה אחת־עשרה – האמצעי, שעל ידו פועלת הסבה את פעלתה.

**Meaning:** That through which the cause performs its action.

**Current visual:** Chapter 11, English p230, Hebrew p229. A wrench depicts an instrument through which an agent or cause works. Means are not restricted to hand tools; Ramchal gives a substance used to effect an action as an example.

**Source example:** Vinegar as an instrument of cleaning.

**Use and limits:** An instrument can be a substance or intermediary, not only a hand tool. Cause and Means are roles within an explanation; do not permanently label every tool as only a means.

### `subject-motive`: Motive / מעורר

**File:** [icons/ch11-subjects/subject-motive.svg](icons/ch11-subjects/subject-motive.svg)

**Hierarchy:** Chapter 11 / distinction 12 of 24

**Source:** Hebrew pp. 229; English pp. 230.

**Ramchal’s wording:**

הבחנה שתים־עשרה – המעורר, והוא מה שמעורר את הפועל ברצון שיפעל.

**Meaning:** What prompts an agent who acts by choice to act.

**Current visual:** Chapter 11, English p230, Hebrew p229. A ringing bell represents an arousing prompt. The prompt need not be a sound; the source example is news that moves Yitro to come. Motive prompts the agent, while Purpose names the end sought.

**Source example:** News of the splitting of the sea prompts Yitro to come.

**Use and limits:** The prompt is distinct from the intended end. The bell does not require the prompt to be a sound.

### `subject-purpose`: Purpose / תכלית

**File:** [icons/ch11-subjects/subject-purpose.svg](icons/ch11-subjects/subject-purpose.svg)

**Hierarchy:** Chapter 11 / distinction 13 of 24

**Source:** Hebrew pp. 229; English pp. 230.

**Ramchal’s wording:**

הבחנה שלש־עשרה – התכלית, והיא הכונה שמתכון הפועל בפעלתו, פרוש – מה שהוא מבקש להשיג על ידי פעלתו.

**Meaning:** What the agent intends to obtain through the action.

**Current visual:** Chapter 11, English p230, Hebrew p229. A goal flag represents the end sought through an action. It does not assert that the goal was attained. The desired end and the actual result can differ.

**Source example:** Studying in order to put the learning into practice.

**Use and limits:** An intended end need not be attained. Preserve the distinction between a goal, its motivating prompt, and the actual result.

### `subject-result`: Result / מסבב

**File:** [icons/ch11-subjects/subject-result.svg](icons/ch11-subjects/subject-result.svg)

**Hierarchy:** Chapter 11 / distinction 14 of 24

**Source:** Hebrew pp. 231; English pp. 232.

**Ramchal’s wording:**

הבחנה ארבע־עשרה – המסבב, והוא הנולד מן הנושא, שנמצא הנושא סבה לו.

**Meaning:** The effect that arises from a subject acting as its cause.

**Current visual:** Chapter 11, English p232, Hebrew p231. An arrow emerges from a vertical dotted line at the far left and leads to a produced object. This boundary was requested to echo Conclusion’s emerging-from relation in the causal family. The cube stands for an effect, which can also be an event, motion, or living offspring. This is what follows from the cause, not necessarily what an agent intended or merely a changed recipient.

**Source example:** Walking as an effect of being led; a child relative to a father; a utensil relative to a craftsperson.

**Use and limits:** A result can be an object, event, change, or offspring. It is not necessarily intended or successful. Being Affected considers a recipient’s impression, while Result identifies the produced effect.

### `subject-attribute`: Attribute / מתחבר

**File:** [icons/ch11-subjects/subject-attribute.svg](icons/ch11-subjects/subject-attribute.svg)

**Hierarchy:** Chapter 11 / 15 / Parent of the next three branches

**Source:** Hebrew pp. 231; English pp. 232.

**Ramchal’s wording:**

הבחנה חמש־עשרה – המתחבר, והוא כל מקרה שיתלוה ויתחבר לנושא, נוסף על עצמותו. ויחלק לשלשה מינים:

**Meaning:** The fifteenth distinction: Attribute. This is any accident that accompanies and is associated with a subject, in addition to its essence. It is divided into three kinds.

**Current visual:** Chapter 11, Hebrew p231, English p232. A magnifying glass examines a square with a diamond attached at its upper-left corner. This is the parent badge for three forms of association, including concurrent and preceding/following cases; the composite is a mnemonic for examining an additional property or condition and does not imply physical contact in every case.

**Use and limits:** The parent of the next three entries. It concerns an additional property or condition, not the subject’s essence. Attributes and qualities can overlap as analytical questions.

### `attribute-in-attached`: In / on / attached / בעצמו · עליו · אליו

**File:** [icons/ch11-subjects/attribute-in-attached.svg](icons/ch11-subjects/attribute-in-attached.svg)

**Hierarchy:** Chapter 11 / 15 / Attribute / First branch

**Source:** Hebrew pp. 231; English pp. 232.

**Ramchal’s wording:**

האחד – מה שמתחבר בעצמו של הנושא, או עליו, או אליו, כגון החכמה בחכם, הקלות בדבר קל, הכבוד בנכבד; הצפוי על הכלי, הלבוש על האדם.

**Meaning:** The first: what is associated with the subject itself, or is on it, or attached to it, such as wisdom in the wise, lightness in something light, honor in the honored; a coating on a vessel, clothing on a person.

**Current visual:** Three diamonds of identical size appear inside the subject square, resting on its top edge, and touching its side. These represent alternative cases, not a requirement that all occur together.

**Source example:** An animal whose life is endangered: it has the condition of danger. A cloth soaked in water: it has this condition of being soaked in water.

**Use and limits:** All three diamonds use the same path and scale. Their three locations are alternative cases. Do not reduce the icon to only an interior diamond or give one diamond a different size.

**Examples in Ramchal’s wording:**

בהמה מסכנת – שיש בה מקרה הסכנה

An animal whose life is endangered: it has the condition of danger.

מטפחת שרויה במים – שיש בה מקרה זה של היותה שרויה במים.

A cloth soaked in water: it has this condition of being soaked in water.

### `attribute-concurrent`: Present alongside / נמצא עמו בזמן אחד

**File:** [icons/ch11-subjects/attribute-concurrent.svg](icons/ch11-subjects/attribute-concurrent.svg)

**Hierarchy:** Chapter 11 / 15 / Attribute / Second branch

**Source:** Hebrew pp. 231; English pp. 232.

**Ramchal’s wording:**

השני – ענין שנמצא עם הנושא בזמן אחד.

**Meaning:** The second: something that is present with the subject at the same time.

**Current visual:** Chapter 11, Hebrew p231, English p232. A square and separate diamond share a baseline bracket. They are present together at one time. Neither physical attachment nor causation is asserted.

**Source example:** Bread that was baked with a roast. Whatever is primary and has something secondary accompanying it.

**Use and limits:** Keep the square, diamond, and bracket. The source says they coexist at one time; the chosen picture emphasizes accompaniment. It does not assert causation or dependency.

**Examples in Ramchal’s wording:**

פת שאפאה עם צלי

Bread that was baked with a roast.

כל שהוא עקר ועמו טפלה

Whatever is primary and has something secondary accompanying it.

### `attribute-before-after`: Before / after / הקודם והמאחר

**File:** [icons/ch11-subjects/attribute-before-after.svg](icons/ch11-subjects/attribute-before-after.svg)

**Hierarchy:** Chapter 11 / 15 / Attribute / Third branch

**Source:** Hebrew pp. 231; English pp. 232.

**Ramchal’s wording:**

השלישי – הוא הקודם והמאחר, והוא מה שיקדם לנושא או שיבוא אחריו.

**Meaning:** The third: what precedes and what follows, namely, what comes before the subject or comes after it.

**Current visual:** Chapter 11, Hebrew p231, English p232. A central subject square has a companion marker before and after. A sequencing arrow represents the temporal example given here. Either relation may apply; both are not required. Ramchal later distinguishes temporal, intellectual and natural priority, so the drawing does not define all priority as time.

**Source example:** One washes the hands and afterward pours the cup.

**Use and limits:** This is the third branch of Attribute. The source’s example is temporal, but the later priority section distinguishes time, rank, and dependence. This badge does not define all priority as time.

**Examples in Ramchal’s wording:**

נוטלין לידים ואחר כך מוזגין את הכוס

One washes the hands and afterward pours the cup.

### `subject-place`: Place / מקום

**File:** [icons/ch11-subjects/subject-place.svg](icons/ch11-subjects/subject-place.svg)

**Hierarchy:** Chapter 11 / 16 / Separate numbered distinction

**Source:** Hebrew pp. 233; English pp. 234.

**Ramchal’s wording:**

הבחנה שש־עשרה – המקום.

**Meaning:** The sixteenth distinction: Place.

**Current visual:** Chapter 11, Hebrew p233, English p234. A location pin marks where the subject is. The source also includes relative location, such as above, beside and inside, not only map coordinates.

**Source example:** Two balconies, one above the other. Two towns, one adjacent to the other. Ten houses, one inside another.

**Use and limits:** Use the single pin. For a Chapter 4 reconciliation based on different places, use differs-in-place, which has two pins.

**Examples in Ramchal’s wording:**

שתי גזוזטראות זו למעלה מזו

Two balconies, one above the other.

שתי עירות זו סמוכה לזו

Two towns, one adjacent to the other.

עשרה בתים זה לפנים מזה

Ten houses, one inside another.

### `subject-orientation`: Orientation / posture / מצב

**File:** [icons/ch11-subjects/subject-orientation.svg](icons/ch11-subjects/subject-orientation.svg)

**Hierarchy:** Chapter 11 / 17 / Separate numbered distinction

**Source:** Hebrew pp. 233; English pp. 234.

**Ramchal’s wording:**

הבחנה שבע־עשרה – המצב, והוא תכונת התיצב הנושא במקומו.

**Meaning:** The seventeenth distinction: Situation, the manner in which the subject is positioned in its place.

**Current visual:** A standing body and a seated body share one ground line. Their different configurations make posture concrete without arrows that would imply movement to another place.

**Source example:** One who reads the Megillah, standing or sitting. In the evening, everyone should recline and recite; in the morning, stand.

**Use and limits:** The selected standing/seated pair shows manner of positioning. It is separate from location and from movement.

**Examples in Ramchal’s wording:**

הקורא את המגלה עומד ויושב

One who reads the Megillah, standing or sitting.

בערב כל אדם יטה ויקרא ובבקר יעמד

In the evening, everyone should recline and recite; in the morning, stand.

### `subject-movement`: Movement / תנועה

**File:** [icons/ch11-subjects/subject-movement.svg](icons/ch11-subjects/subject-movement.svg)

**Hierarchy:** Chapter 11 / 18 / Separate numbered distinction

**Source:** Hebrew pp. 233; English pp. 234.

**Ramchal’s wording:**

הבחנה שמונה־עשרה – התנועה, והוא מה שיעתק הנושא ממקום אל מקום.

**Meaning:** The eighteenth distinction: Movement, the subject’s passage from one place to another.

**Current visual:** The same square appears at two separated positions, with an arrowed route from the lower starting position toward the upper destination. Short local ground marks emphasize a change of place.

**Source example:** One who goes from a place where they do not work to a place where they do work.

**Use and limits:** The matching squares represent one subject at two places. They do not depict one subject acting on another or producing a different object.

**Examples in Ramchal’s wording:**

ההולך ממקום שאין עושים למקום שעושים

One who goes from a place where they do not work to a place where they do work.

### `subject-time`: Time / זמן

**File:** [icons/ch11-subjects/subject-time.svg](icons/ch11-subjects/subject-time.svg)

**Hierarchy:** Chapter 11 / 19 / Separate numbered distinction

**Source:** Hebrew pp. 233; English pp. 234.

**Ramchal’s wording:**

הבחנה תשע־עשרה – הזמן.

**Meaning:** The nineteenth distinction: Time.

**Current visual:** Chapter 11, Hebrew p233, English p234. A clock represents when, including a time of day or a starting time. The illustrated clock reading is arbitrary and is not a ruling about any religious practice.

**Source example:** From when does one recite the Shema? In the evening, everyone should recline and recite; in the morning, stand.

**Use and limits:** Keep the single clock. Use differs-in-time for two statements concerning different times; use priority-temporal for chronological precedence.

**Examples in Ramchal’s wording:**

מאימתי קורין את שמע?

From when does one recite the Shema?

בערב כל אדם יטה ויקרא ובבקר יעמד

In the evening, everyone should recline and recite; in the morning, stand.

### `subject-relation`: Relation / יחס

**File:** [icons/ch11-subjects/subject-relation.svg](icons/ch11-subjects/subject-relation.svg)

**Hierarchy:** Chapter 11 / distinction 20 of 24

**Source:** Hebrew pp. 233; English pp. 234.

**Ramchal’s wording:**

הבחנה עשרים – היחס, והוא מה שאחד מתיחס לזולתו.

**Meaning:** The twentieth distinction. Relation: the relationship one thing has to another.

**Current visual:** Chapter 11 distinction 20. Two linked chain segments symbolize one subject’s relation to another. The relation need not be physical attachment, kinship alone, similarity, or causation.

**Use and limits:** A general relation to another thing. The chain does not limit this to physical attachment, ancestry, or similarity.

**Examples Ramchal brings:**

דרך משל: דורו של משה, זרעו של אברהם.

For example: the generation of Moses; the descendants of Abraham.

### `subject-bearer`: Subject / נושא

**File:** [icons/ch11-subjects/subject-bearer.svg](icons/ch11-subjects/subject-bearer.svg)

**Hierarchy:** Chapter 11 / distinction 21 of 24

**Source:** Hebrew pp. 233; English pp. 234.

**Ramchal’s wording:**

הבחנה עשרים ואחת – הנושא, והינו כשהנדון שלפנינו הוא מקרה מן המקרים שיהיה נשוא על אחד מן הנושאים, הנה נבקש מי הוא נושאו.

**Meaning:** The twenty-first distinction. Subject: when the matter before us is an incidental attribute predicated of some subject, we seek the subject that bears it.

**Current visual:** The back subject cell of the established violet statement tile is enlarged and emphasized, retaining its circle term glyph. The front arrow-shaped predicate cell and its square are smaller and partially transparent. This is the user-requested counterpart to Predicate, which enlarges the front and de-emphasizes the back. The arrow retains its subject-to-predicate direction. This replaces the former baseline-and-shapes drawing under the same `subject-bearer` key. The role also follows the Chapter 3 definition on Hebrew p.21 / English p.22.

**Use and limits:** Given an attribute, seek what bears it. In Chapter 3, Subject is that of which something is affirmed or denied. The circle is a term glyph, not a restriction to round or physical subjects. Emphasis identifies the role; it does not encode truth, scope, amount, or temporal priority. This differs from defining the subject’s essence and from identifying the Statement discussion move.

**Examples Ramchal brings:**

דרך משל, כשאמרו (פסחים יד ב): "איזהו דבר שחלוקה טמאתו בין טמאת מת לשרץ? הוי אומר, זה מתכת"

For example, as they said (Pesachim 14b): “What thing has a different impurity status depending on whether it became impure through a corpse or through a creeping creature? You must say: metal.”

### `subject-similarity`: Similarity / דמיון

**File:** [icons/ch11-subjects/subject-similarity.svg](icons/ch11-subjects/subject-similarity.svg)

**Hierarchy:** Chapter 11 / distinction 22 of 24

**Source:** Hebrew pp. 233, 235; English pp. 234, 236.

**Ramchal’s wording:**

הבחנה עשרים ושתים – הדמיון.

**Meaning:** The twenty-second distinction. Similarity.

**Current visual:** Chapter 11 distinction 22. Two overlapping circles have a shared lens, suggesting likeness in a relevant respect. The drawing does not assert complete identity, equality in every respect, or an inference from one case to another.

**Use and limits:** Likeness in a relevant respect, not complete identity and not a deduction by analogy. The two circles’ overlap is a mnemonic, not a claim about literal set intersections in the cited cases.

**Examples Ramchal brings:**

דרך משל (חולין יח ב): "דמיא לסאסאה"

For example (Chullin 18b): “It resembles an ear of grain.”

(שבת קמ"א): "חרב הרי הוא כחלל"

(Shabbat 141): “A sword has the same [impurity status] as the slain person.”

(כתובות ס"א): "אדי ואדי חד שעורא הוא"

(Ketubot 61): “Both have the same measure.”

### `subject-difference`: Difference / הבדל

**File:** [icons/ch11-subjects/subject-difference.svg](icons/ch11-subjects/subject-difference.svg)

**Hierarchy:** Chapter 11 / distinction 23 of 24

**Source:** Hebrew pp. 235; English pp. 236.

**Ramchal’s wording:**

הבחנה עשרים ושלש – ההבדל, והוא העדר הדמיון.

**Meaning:** The twenty-third distinction. Difference: the absence of similarity.

**Current visual:** Chapter 11 distinction 23. A circle and a square have different outlines, showing absence of likeness in the respect being examined. They are not mutually negating statements; there is no collision arrow or rejection mark.

**Use and limits:** Ramchal calls this absence of similarity. Keep it distinct from Opposition, which he calls the opposite of similarity.

**Examples Ramchal brings:**

דרך משל (פסחים כ"ג א): "שאני דם דאתקש למים"

For example (Pesachim 23a): “Blood is different, for it is compared to water.”

(פסחים כ"ג ב): "שאני אבר מן החי דאתקש לדם"

(Pesachim 23b): “A limb from a living animal is different, for it is compared to blood.”

### `subject-opposition`: Opposition / נגוד

**File:** [icons/ch11-subjects/subject-opposition.svg](icons/ch11-subjects/subject-opposition.svg)

**Hierarchy:** Chapter 11 / distinction 24 of 24

**Source:** Hebrew pp. 235; English pp. 236.

**Ramchal’s wording:**

הבחנה עשרים וארבע– הנגוד, והוא הפך הדמיון, וכבר נתפרש למעלה הנגוד בכל מיניו והבאנו משליהם, עין שם.

**Meaning:** The twenty-fourth distinction. Opposition: the opposite of similarity. Opposition in all its kinds has already been explained above, and we have brought examples of them; see there.

**Current visual:** Chapter 11 distinction 24. Two inward-facing arrowheads express opposition. This general relational badge does not select a Chapter 4 subtype and is distinct from the Chapter 9 rebuttal move דחיה. Ramchal refers back to Chapter 4 for its varieties.

**Use and limits:** This is the broad relation נגוד. It does not pick a specific Chapter 4 subtype and is distinct from the Chapter 9 rebuttal move דחיה. Ramchal refers back to the earlier chapter for the forms and examples.

**Example from Chapter 4, to which Ramchal refers here:**

דרך משל (יבמות נ א): "רבן גמליאל אומר: אין גט אחר גט ולא מאמר אחר מאמר; וחכמים אומרים: יש גט אחר גט ויש מאמר אחר מאמר".

For example (Yevamot 50a): “Rabban Gamliel says: a second get after a first get has no effect, nor does a second ma’amar after a first ma’amar; the Sages say: a second get after a first get has effect, and so does a second ma’amar after a first ma’amar.”

Source of this example: Hebrew p.51; English p.52.

<a id="reference-section-9"></a>

## 8. Three kinds of priority

These are three senses of priority following the completed list of twenty-four distinctions. They are not distinctions 25–27, and they are not three new discussion moves.

וצריך שתדע, שיש קדימה ואחור משלשה מינים: האחד– זמני, השני– שכלי, והשלישי – טבעי.

You should know that priority and posteriority are of three kinds: the first is temporal, the second intellectual, and the third natural.

### `priority-temporal`: Temporal priority / זמני

**File:** [icons/ch11-priority/priority-temporal.svg](icons/ch11-priority/priority-temporal.svg)

**Hierarchy:** Chapter 11 / Priority / Time

**Source:** Hebrew pp. 235; English pp. 236.

**Ramchal’s wording:**

זמני– הוא מה שיקדים לזולתו בזמן.

**Meaning:** Temporal: that which precedes another in time.

**Current visual:** Chapter 11, Hebrew p235, English p236. One thing precedes another in time. A clock accompanies two equal units in a directional sequence. The clock reading is illustrative. This is a relation of temporal precedence, separate from the Time subject badge and the Different Times statement badge.

**Use and limits:** Only this kind requires earlier time. Keep the clock plus sequence distinct from the single-clock Time badge and the paired-clock Different Times badge.

Ramchal supplies a definition without a separate concrete example for this kind in this paragraph.

### `priority-conceptual`: Priority in rank / שכלי

**File:** [icons/ch11-priority/priority-conceptual.svg](icons/ch11-priority/priority-conceptual.svg)

**Hierarchy:** Chapter 11 / Priority / Intellectual / conceptual

**Source:** Hebrew pp. 235; English pp. 236.

**Ramchal’s wording:**

שכלי – הוא מה שלא יקדם בזמן אלא במעלה, שנתן לו קדימה בשכל;

**Meaning:** Intellectual: that which takes precedence in rank rather than in time, with precedence assigned to it by the intellect.

**Current visual:** Chapter 11, Hebrew p235, English p236. Intellectual or conceptual priority is precedence in rank, not chronological precedence. A crowned unit occupies the higher of two levels. The crown recalls Ramchal’s own king-and-people example; the concept is not limited to kings, intelligence, or literal physical elevation.

**Use and limits:** “Intellectual” here concerns precedence in rank or importance. It is not an intelligence rating or a claim that the higher-ranking thing existed earlier. The supplied translation calls this Conceptual Priority.

**Ramchal’s example:**

דרך משל: המלך והעם: המלך קודם והעם מאחר, העליונים קודמים לתחתונים, וכן כיוצא בזה.

For example, the king and the people: the king is prior and the people posterior; the higher beings are prior to the lower beings, and similarly in other cases.

### `priority-natural`: Priority by dependence / טבעי

**File:** [icons/ch11-priority/priority-natural.svg](icons/ch11-priority/priority-natural.svg)

**Hierarchy:** Chapter 11 / Priority / Natural

**Source:** Hebrew pp. 235; English pp. 236.

**Ramchal’s wording:**

הטבעי – הוא מי שמציאותו תלויה במציאות חברו, אף על פי שימצאו שניהם כאחד, אותו שהוא סבה לחברו יקרא – קודם, והמסבב ממנו – מאחר.

**Meaning:** Natural: where one thing’s existence depends on the existence of another, even though both exist together, the one that is the cause of the other is called prior, and the effect that results from it is called posterior.

**Current visual:** Chapter 11, Hebrew p235, English p236. Natural priority belongs to the cause on which an effect’s existence depends, even when both exist together. A suspended block depends on its supporting beam. The support and dependent object are shown together, without a temporal arrow. The suspension is an icon metaphor, not an example quoted from Ramchal.

**Use and limits:** Priority belongs to the cause on which the other thing’s existence depends. The dependent effect is posterior even if both coexist. The hanging block is an icon metaphor, not an example quoted from Ramchal. The supplied English edition calls this Logical Priority.

Ramchal supplies a definition without a separate concrete example for this kind in this paragraph.

<a id="reference-section-10"></a>

## 9. Existing icons revised in this work

The existing concept keys are retained. These changes improve the current drawing or resolve a specific ambiguity without creating a new logical category.

| Icon | Current treatment |
|---|---|
| `consequent` | Two fallen dominoes and their floor line fit within the canvas |
| `hypothetical-syllogism-tollens` | Denial marks fit cleanly inside the dominoes; the backward inference remains visible |
| `fallacy-not-similar` | The broken transfer has enough space to keep its gap and slash distinct |
| `fallacy-not-greater` | Separate arrow tracks keep the disputed direction of comparison readable |
| `rebuttal-your-reasoning` | Both standing houses and the two difficulties remain visible within the canvas |
| `rebuttal-just-the-opposite` | The returning difficulty and the dissenting house’s X remain separate |
| `dilemma` | The roof/X geometry fits the canvas; the chosen ground fork and stop bars are preserved |
| `theory` | The leaning house fits the canvas and retains its 14-degree lean |
| `might-have-thought` | The thought cloud fits the canvas and stays separate from the utterance |
| `redundant-part` | The strike marks the repeated part rather than the whole utterance |
| `misordered` | Text and ordering arrows have separate visual space |
| `differs-in-place` | Two location pins distinguish it from the single-pin Place badge |
| `differs-in-time` | Two clocks showing nine and three distinguish it from the single-clock Time badge |

The particular clock readings are illustrative. They are not tied to a source ruling. The chapter 8 reference drawings and hand-edited geometry are retained in the current resulting SVGs.

<a id="reference-section-11"></a>

## 10. Complete base-icon catalog

The following catalog accounts for all 82 inherited keys. It records their current semantic role; the 77 additional current assets are documented in the detailed entries and registry. Source numbers refer to printed pages in the supplied bilingual edition. English pages are even and the corresponding Hebrew pages are normally immediately preceding odd pages.

### Principal moves, Chapter 9

| Icon | Meaning | English source pages |
|---|---|---|
| [`statement`](icons/ch9-moves/statement.svg) / מימרא | Introduces or communicates an idea, interprets a prior text, draws out an implication, or reports someone else’s contribution. | 162, 164, 166, 168 |
| [`question`](icons/ch9-moves/question.svg) / שאלה | Asks for information or asks which of two live possibilities should be chosen. | 168, 170 |
| [`answer`](icons/ch9-moves/answer.svg) / תשובה | Responds to a question in the form the question requires. | 172, 174 |
| [`proof`](icons/ch9-moves/proof.svg) / ראיה | Brings support for a statement or opinion. Its subtype describes how that support is presented. | 174, 176 |
| [`contradiction`](icons/ch9-moves/contradiction.svg) / סתירה | Challenges a statement or its proof. Chapter 9 includes both outright invalidation and the weaker removal of certainty under this heading. | 176, 178, 180 |
| [`difficulty`](icons/ch9-moves/difficulty.svg) / קשיא | Raises a problem that a statement, its presentation, or its relation to another statement needs to answer. | 180, 182, 184 |
| [`resolution`](icons/ch9-moves/resolution.svg) / תרוץ | Removes a difficulty. The two subtypes differ in the proposer’s commitment to the offered explanation. | 184, 186, 188 |

### Who is speaking

Chapter 1. A separate description of the participants.

Placement: Speaker annotation. English pp. 10; Hebrew pp. 9.

| Icon | Current meaning |
|---|---|
| [`party-group`](icons/ch1-3/party-group.svg) | several people debating |
| [`party-individual`](icons/ch1-3/party-individual.svg) | one person arguing both sides with himself |
| [`party-talmud`](icons/ch1-3/party-talmud.svg) | the Talmud itself, asking and answering |

### Statement scope

Chapter 3. How much of the subject class does the statement cover?

Placement: Anatomy badge on a statement. English pp. 22, 24, 26; Hebrew pp. 21, 23, 25.

| Icon | Current meaning |
|---|---|
| [`categorical`](icons/ch1-3/categorical.svg) | about all of them (כולל) |
| [`partial`](icons/ch1-3/partial.svg) | about some of them (קצתי) |
| [`particular`](icons/ch1-3/particular.svg) | about this one (פרטי) |
| [`unqualified`](icons/ch1-3/unqualified.svg) | about all of them, though 'all' is not said (סתמי) |

### Statement form

Chapter 3. How does the predicate attach? These are forms of statements, not extra debate moves.

Placement: Anatomy badge on a statement. English pp. 26, 28, 30, 32, 34, 36, 38, 40, 42; Hebrew pp. 25, 27, 29, 31, 33, 35, 37, 39, 41.

| Icon | Current meaning |
|---|---|
| [`simple`](icons/ch1-3/simple.svg) | plainly says something about something: the statement shape itself (סתם) |
| [`qualified-certain`](icons/ch1-3/qualified-certain.svg) | said as certain or necessary (ודאות / הכרח). Use the precise mode in the label. |
| [`qualified-possible`](icons/ch1-3/qualified-possible.svg) | said as possible (אפשר) |
| [`qualified-doubtful`](icons/ch1-3/qualified-doubtful.svg) | said as doubtful (ספק) |
| [`qualified-impossible`](icons/ch1-3/qualified-impossible.svg) | said as impossible (אי אפשר) |
| [`exclusion`](icons/ch1-3/exclusion.svg) | this and nothing else (ממעט) |
| [`exception`](icons/ch1-3/exception.svg) | all of it, except this piece (מוציא) |
| [`conditional`](icons/ch1-3/conditional.svg) | holds provided the switch closes (מגבל) |
| [`hypothetical`](icons/ch1-3/hypothetical.svg) | if this, then that; only the link is claimed (תלוי) |
| [`compound`](icons/ch1-3/compound.svg) | several things said together (מרבה הענינים) |
| [`compound-not-only`](icons/ch1-3/compound-not-only.svg) | not only this, but even that (לא זו אף זו) |
| [`compound-needless`](icons/ch1-3/compound-needless.svg) | this, and needless to say that (זו ואין צריך לומר זו) |
| [`disjunction`](icons/ch1-3/disjunction.svg) | one or the other (או... או) |
| [`preclusive`](icons/ch1-3/preclusive.svg) | not this, but rather that (לא... אלא) |
| [`discrepancy`](icons/ch1-3/discrepancy.svg) | holds, even though it looks like it should not (מכחיש) |
| [`comparative`](icons/ch1-3/comparative.svg) | just as this, so too that (מדמה) |
| [`consequent`](icons/ch1-3/consequent.svg) | this happened, so that happened (נמשך) |

### Relations between statements

Chapter 4. The tag’s subject and predicate geometry describes a relation.

Placement: Relation badge on a connector. English pp. 48, 52, 54, 56, 58, 60, 62, 64; Hebrew pp. 47, 51, 53, 55, 57, 59, 61, 63.

| Icon | Current meaning |
|---|---|
| [`statement-tile`](icons/ch4-7/statement-tile.svg) | one statement: a subject cell, a seam that says is, a predicate cell. This explains subject/predicate structure. It is different from the page-shaped Statement move icon. |
| [`equivalent`](icons/ch4-7/equivalent.svg) | the same statement, twice (דומים) |
| [`variant`](icons/ch4-7/variant.svg) | same subject, different predicates: one box, two arrows out (מתחלפים) |
| [`variant-subjects`](icons/ch4-7/variant-subjects.svg) | same predicate, different subjects: two boxes, one arrow out (מתחלפים) |
| [`diametrically-opposed`](icons/ch4-7/diametrically-opposed.svg) | same terms, yes against no, tip to tip (הפכיים ממש) |
| [`contradictory`](icons/ch4-7/contradictory.svg) | all say is, some say is not, tip to tip (מתנגדים) |
| [`converse`](icons/ch4-7/converse.svg) | subject and predicate trade places: the arrow comes back the other way (חלוף כולל) |
| [`converse-limited`](icons/ch4-7/converse-limited.svg) | trade places, but it only comes back for some: a shorter, thinner return (חלוף קצתי) |
| [`contrapositive`](icons/ch4-7/contrapositive.svg) | trade places, and is becomes is not: the return arrow in negative (חלוף הפכי) |
| [`obverse`](icons/ch4-7/obverse.svg) | Corresponding subject and predicate terms are opposite (מתהפכים). This relation alone is not a universally valid truth-preserving inference. |
| [`incongruent`](icons/ch4-7/incongruent.svg) | different subject, different predicate (נבדלים) |

### Distinctions that matter to a relation

Chapter 4. The first four can dissolve an apparent conflict; the final pair checks whether an exhaustive opposition is available.

Placement: Relation or resolution annotation. English pp. 54, 56, 60; Hebrew pp. 53, 55, 59.

| Icon | Current meaning |
|---|---|
| [`differs-in-time`](icons/ch4-7/differs-in-time.svg) | Two clocks at different hours: the statements concern different times. |
| [`differs-in-place`](icons/ch4-7/differs-in-place.svg) | Two pins: the statements concern different places. |
| [`differs-in-context`](icons/ch4-7/differs-in-context.svg) | The statements concern different respects or aspects (בחינה). |
| [`homonym`](icons/ch4-7/homonym.svg) | not opposed: one word, two meanings |
| [`no-middle`](icons/ch4-7/no-middle.svg) | clean or unclean: nothing in between. Eliminating one alternative only establishes the other when the alternatives are exhaustive and the relevant opposition is valid. |
| [`has-middle`](icons/ch4-7/has-middle.svg) | optional, praiseworthy, obligatory: a middle exists |

### Inference strength

Chapter 5. What follows from the language of a prior statement, and with what force?

Placement: Badge on an inference connection. English pp. 66, 68, 70, 72, 74; Hebrew pp. 65, 67, 69, 71, 73.

| Icon | Current meaning |
|---|---|
| [`inference-necessary`](icons/ch4-7/inference-necessary.svg) | stated on the left, implied on the right (dashed: nobody said it), wired straight through (מוכרח) |
| [`inference-loose`](icons/ch4-7/inference-loose.svg) | the wording suggests it, but the line wobbles: the link is there but not firm (בלתי מוכרח) |
| [`absolute-opposite`](icons/ch4-7/absolute-opposite.svg) | An opposite inferred from a partial statement in the chapter’s contextual reading. This records the chapter’s reading of a partial statement in context. “Some P are Q” does not, as bare formal logic, entail “some P are not Q.” Do not use the badge as an unrestricted logical rule. |

### Literal or figurative intention

Chapter 6. Literal meaning is the default in the icon set; the badge flags an intended figure of speech.

Placement: Interpretation annotation. English pp. 76; Hebrew pp. 75.

| Icon | Current meaning |
|---|---|
| [`figurative`](icons/ch4-7/figurative.svg) | not meant literally: read the allusion |

### Deduction methods

Chapter 7. These describe derivation, independently of the chapter 9 job a sentence performs.

Placement: Badge on the reasoning connection. English pp. 92, 94, 96, 98, 100, 106, 108, 110; Hebrew pp. 91, 93, 95, 97, 99, 105, 107, 109.

| Icon | Current meaning |
|---|---|
| [`syllogism`](icons/ch4-7/syllogism.svg) | premises added up give a conclusion (הקש) |
| [`classical-syllogism`](icons/ch4-7/classical-syllogism.svg) | Derive through an included subject or a necessary predicate connection (הקש מופתי). |
| [`analogism`](icons/ch4-7/analogism.svg) | found in this one, so also in that similar one (בנין אב / מה מצינו) |
| [`a-fortiori`](icons/ch4-7/a-fortiori.svg) | Infer from lesser to greater or greater to lesser, as the relevant predicate and comparison warrant (קל וחמר). |
| [`hypothetical-syllogism`](icons/ch4-7/hypothetical-syllogism.svg) | Given an established dependency, affirm the antecedent and derive the consequent (הקש תלוי). |
| [`hypothetical-syllogism-tollens`](icons/ch4-7/hypothetical-syllogism-tollens.svg) | Given an established dependency, deny the consequent and exclude the antecedent (הקש תלוי). |
| [`disjunctive-syllogism`](icons/ch4-7/disjunctive-syllogism.svg) | Exclude all but one of an exhaustive set of alternatives, then establish the survivor (הקש מחלק). |

### Why a deduction fails

Chapter 7. Specific failure modes in a challenged deduction.

Placement: Badge on a challenge to a proof. English pp. 94, 96, 100, 102, 104; Hebrew pp. 93, 95, 99, 101, 103.

| Icon | Current meaning |
|---|---|
| [`fallacy-not-included`](icons/ch4-7/fallacy-not-included.svg) | The claimed subject inclusion or necessary predicate connection fails. |
| [`fallacy-not-similar`](icons/ch4-7/fallacy-not-similar.svg) | the two cases are not alike after all (מה ל... שכן...) |
| [`fallacy-not-greater`](icons/ch4-7/fallacy-not-greater.svg) | which case is the heavier one is not settled |
| [`fallacy-counterexample`](icons/ch4-7/fallacy-counterexample.svg) | another case just as similar lacks it |

### Grounds of support

Chapter 8. Natural ground contains Axioms and Senses. Shared acceptance contains Common Judgments and Received Tradition. Logical ground is their third sibling. Both parent drawings are now selected (section 21). These grounds can support proof or disproof as the text permits.

Placement: Ground on a proof or disproof connection. English pp. 112, 114, 116; Hebrew pp. 111, 113, 115.

| Icon | Current meaning |
|---|---|
| [`ground-axiom`](icons/ch8/ground-axiom.svg) | the mind dictates it, no training needed (מושכלות ראשונים) |
| [`ground-sense`](icons/ch8/ground-sense.svg) | the senses testify to it (מוחשות) |
| [`ground-common-sense`](icons/ch8/ground-common-sense.svg) | Commonly accepted opinions, המפורסמות. This means the text’s commonly accepted opinions, not whatever feels obvious to an individual reader. |
| [`ground-tradition`](icons/ch8/ground-tradition.svg) | handed down: a verse, a halacha, an undisputed authority (מקובלות) |
| [`ground-deduction`](icons/ch8/ground-deduction.svg) | it follows from a true premise by a deduction (הקש); the chapter 7 badge says which |

### Indirect routes and relevance

Chapter 8. Routes to a result and the failure of a source to establish the particular claim.

Placement: Proof, disproof, or challenge annotation. English pp. 116, 118, 126, 128, 130, 132, 134, 136; Hebrew pp. 115, 117, 125, 127, 129, 131, 133, 135.

| Icon | Current meaning |
|---|---|
| [`via-opposite`](icons/ch8/via-opposite.svg) | the opposite is false, so this is true; or the opposite is proved, so this is false (הפך) |
| [`dilemma`](icons/ch8/dilemma.svg) | whichever way you take it, it fails (ממה נפשך) |
| [`ground-does-not-reach`](icons/ch8/ground-does-not-reach.svg) | the ground is real but does not reach the statement |

### Reasoned inclination

Chapter 8. Favors one side without conclusive proof. It can qualify a chapter 9 demonstration.

Placement: Support / evaluation badge. English pp. 142, 144; Hebrew pp. 141, 143.

| Icon | Current meaning |
|---|---|
| [`theory`](icons/ch8/theory.svg) | a theory inclines the mind, it does not prove (סברא). See the dedicated Theory section: it is not a third subtype of Proof beside Demonstration and Validation. |

### Rebuttals to disproofs

Chapter 8. Ways to turn aside or reverse an opposing argument.

Placement: Annotation on the response to a disproof. English pp. 136, 138, 140, 142; Hebrew pp. 135, 137, 139, 141.

| Icon | Current meaning |
|---|---|
| [`rebuttal-your-reasoning`](icons/ch8/rebuttal-your-reasoning.svg) | the same difficulty hits your view too, forcing a distinction that saves both (ולטעמיך) |
| [`rebuttal-just-the-opposite`](icons/ch8/rebuttal-just-the-opposite.svg) | the difficulty is thrown back at the dissenting view (אדרבא) |
| [`rebuttal-proves-my-point`](icons/ch8/rebuttal-proves-my-point.svg) | your disproof text proves my view (משם ראיה / היא הנותנת) |

### Objections to presentation and their repair

Chapter 8 supplies these detailed form checks. “One might have thought” explains why a statement was needed and belongs with the repair, not with the objection itself.

Placement: Defect on a difficulty; repair on its resolution. English pp. 156, 158; Hebrew pp. 155, 157.

| Icon | Current meaning |
|---|---|
| [`obvious`](icons/ch8/obvious.svg) | the whole statement adds nothing; everyone knew it (פשיטא) |
| [`might-have-thought`](icons/ch8/might-have-thought.svg) | one might have thought otherwise; the statement is there to exclude that (סלקא דעתין / מהו דתימא). This is a response to “obvious”: the statement excludes a mistaken thought. Its placement follows the response’s actual role. |
| [`redundant-part`](icons/ch8/redundant-part.svg) | a part of the statement repeats another (הא תו למה לי) |
| [`self-contradictory`](icons/ch8/self-contradictory.svg) | the statement's own words disagree with each other (הא גופא קשיא). An objection to a statement’s own wording or arrangement. Do not automatically substitute the icon for a two-text רמיא. |
| [`misordered`](icons/ch8/misordered.svg) | wrong order: what should be joined is split, or the parts are out of sequence (תנא היכא קאי / ליערבינהו וליתנינהו / פתח בכד וסיים בחבית) |

### Potential and actual

Chapter 8. Is a predicate about capacity or about actual performance?

Placement: Predicate or explanatory resolution annotation. English pp. 154; Hebrew pp. 153.

| Icon | Current meaning |
|---|---|
| [`potential`](icons/ch8/potential.svg) | said of what can, not of what does: eligible, able (בכח) |
| [`actual`](icons/ch8/actual.svg) | said of what actually does (בפועל) |

<a id="reference-section-12"></a>

## 11. Usage and source fidelity

### 11.1 Preserve the target of a move

A proof may concern a statement; a difficulty may challenge that proof rather than the statement itself. Rejection of an argument does not automatically reject its conclusion. Display the actual target of the connector. When a statement has several relevant parts, identify the part under attack rather than marking the entire row indiscriminately.

### 11.2 Keep shared pictures and text distinctions together

| Shared or separately tracked concept | Use |
|---|---|
| Direct contradiction | `contradiction` plus the subtype label |
| Refutation/תיובתא | Included as `refutation`; design provenance remains review. See section 18. |

The needed inference and relation badges can be combined with these move labels. For example, a Chapter 9 Inference row uses `inference` with the relevant Chapter 5 inference-strength annotation.

### 11.3 Definitions and examples

The current source is the supplied `DerechTevunos_full_nonikud_fixed.md`, using its printed Hebrew and English page headings. Hebrew quotations in the detailed entries were checked against that supplied text after removing Markdown bold markers and normalizing whitespace. English meanings are explanations or translations; short descriptions of examples are labeled as such. They should not be presented as verbatim quotations from the supplied English edition.

For review cards, retain the chosen presentation order: Ramchal’s exact Hebrew definition first in the white area, then its English translation. A grey box contains an actual example he brings, with Hebrew first and translation after it. Where he only supplies a heading before examples, do not invent a definition. Where he gives no concrete example, do not invent a grey source box.

The Similarity quotation “דמיא לסאסאה” spans Hebrew pp.233 and 235; it is joined across the intervening English page. Source spellings such as “אדי ואדי” and source citation forms are preserved as supplied. Chapter 11 Opposition refers backward; the example reproduced in its entry is explicitly identified as Chapter 4, Hebrew p.51 / English p.52.

The supplied translation uses some labels differently from the clearer display labels here. Place corresponds to its “Position”; Orientation/posture to “Situation”; Being affected to “Affection”; Similarity to “Comparison”; Opposition/נגוד to “Contrast”; and Natural priority to “Logical Priority.” Keep the Hebrew term and chapter context attached when matching between versions.

### 11.4 Release boundaries

The complete release contains 159 current drawings and one retained Subject alternative. The design ledger records 154 selected and five review drawings; import all 159. The Disjunctive affirmation companion is the latest selected addition, following the two parent grounds, following the compound branches and Predicate, following Antecedent/Consequent and Premise/Conclusion. Essential Form uses an outer square, four outward-spaced internal brackets, and an enlarged solid central square. Inseparable Property preceded it. The preceding four are Natural/Voluntary Action and Generative/Effective Cause, accepted following the user’s positive feedback and instruction to continue. The previous thirteen are six Order/knowledge icons, three Explanation details, and four Question/Answer forms. The earlier drawings retain their selected geometry except for subsequent revisions explicitly requested by the user, including Causal Result’s dotted left boundary. Counts here concern current standalone drawings, not every named concept or every application of an icon. The one explicitly retained previous Subject is included separately. Supporting review pages, previews and source files are supplied for semantic context.

Use the current files linked in this reference as the export contract. Replacing a file should preserve its key unless its meaning changes. A different semantic role, such as דחיה versus נגוד, requires distinct keys even when English labels coincide.

<a id="reference-section-13"></a>

## 12. Order and two kinds of knowledge

These six selected drawings complete the closing Chapter 11 batch. Order has three principles; theoretical and practical knowledge form a separate classification governing how study is arranged. They do not increase the twenty-four numbered subject distinctions.

**The principles of Order:**

עקרי הסדר – שלשה: הסדור, הגדרים והחלוק.

**Translation:** The principles of Order are three: Arrangement, Definitions, and Division.

Source: Hebrew pp. 237; English pp. 238.

**The two kinds of knowledge:**

ואמנם צריך שתדע, כי הנה מיני החכמות שנים, והם: השכליות והמעשיות.

**Translation:** You should know that there are two kinds of knowledge: theoretical and practical.

Source: Hebrew pp. 237; English pp. 238.

### `study-order`: Order / סדר

**File:** [icons/ch11-order/study-order.svg](icons/ch11-order/study-order.svg)

**Hierarchy:** Chapter 11 / Parent principle

**Ramchal’s wording:**

ומה שעוזר אל ההשכלה עזר גדול ומקל לה את הטרח הוא הסדר, וזה בין ללמד ובין ללמד, כי הנה בזה מסקל את המסלה לפני השכל שיוכל ללכת בדרכי ההתבוננות בלי מכשולות. ואם לומד הוא – ישיג המשכלות שהוא מבקש על נכון, ואם מלמד הוא – יבאר מה שבדעתו לבאר באור מספיק ויקל אל הלמד ממנו להשיג מה שילמדהו.

**Translation:** Order greatly helps understanding and lightens its burden, in both learning and teaching. It clears the path before the intellect so that it can proceed in reflection without obstacles. A learner will correctly grasp the concepts sought; a teacher will explain what is in mind sufficiently and make it easier for the student to understand what is taught.

Source: Hebrew pp. 237; English pp. 238.

Ramchal supplies no separate concrete example for this entry in the cited passage.

**Current visual:** Six aligned units in two orderly rows, using the violet analytical palette.

**Use and limits:** Order is the parent principle for learning and teaching. Its three principles are Arrangement, Definitions, and Division. It is not an additional numbered subject distinction or a fourth kind of priority. The number and equal size of drawn units are illustrative.

### `study-arrangement`: Arrangement / סדור

**File:** [icons/ch11-order/study-arrangement.svg](icons/ch11-order/study-arrangement.svg)

**Hierarchy:** Chapter 11 / Order / principle 1 of 3

**Ramchal’s wording:**

הסדור– הוא סדור הענינים מה שראוי להיות בתחלתם ומה שראוי להיות אחר כך. והנה הסדור הנאות הוא המתהלך תמיד מן הענינים הקודמים אל המאחרים, מהיותר נודעים אל הנעלמים יותר. פרוש, הכוללים הם תמיד קודמים, ויותר נודעים מהפרטים; הפשוטים – יותר נודעים מהמרכבים.

**Translation:** Arrangement is placing topics in the order in which they ought to come, what belongs at the beginning and what should follow. Proper arrangement always proceeds from prior matters to later ones, from the better known to the less known. That is, general matters are always prior and better known than particulars; simple matters are better known than composites.

Source: Hebrew pp. 237; English pp. 238.

**Ramchal’s further rule:**

וממה שצריך שתזהר מאד בסדור הוא, שלא תזכיר הענינים חוץ למקומם ומדרגתם, והינו שלא תבאר המאחר לפני הקודם, כי יהיה בלתי אפשר להבין את אשר תלמדהו, מפני שתחסר ידיעת ענין מה שראוי שיקדם, או שלא תזכיר דבר אשר לא בארתו, כי זה יבלבל דעת השומע וימנעהו מהשיג מה שתלמדהו, אלא אם תכרח להביא דבר אשר לא בארתו עדין, הנה תזכיר אצלו מיד שעוד לפנים תבארהו, כי זה ממה שמשקיט דעת השומע שלא ישוטט לבקש ידיעת הדבר ההוא שאי אפשר לו למצא אותה.

**Translation:** Be very careful not to introduce topics outside their proper place and level. Do not explain a later matter before the prior one, since the learner will lack the knowledge needed to understand it. Do not mention an unexplained matter in a way that confuses the listener. If you must introduce something not yet explained, immediately say that you will explain it later. This settles the listener’s mind and prevents a fruitless search for information not yet available.

Source: Hebrew pp. 241; English pp. 242.

**Ramchal’s example:**

דרך משל, בחכמת הדקדוק, הנה מה שראוי שידבר תחלה הוא בענין האותיות, אחר כך על התבות והנקדות, אחר כך על חלקי הדבור, דהינו השמות, הפעלים, והמלות, אחר כך על חבורי המאמרים אלה עם אלה.

**Translation:** For example, in grammar one should first discuss letters, then words and vowel marks, then the parts of speech, namely nouns, verbs, and particles, and then the combination of statements with one another.

Source: Hebrew pp. 237; English pp. 238.

**Ramchal’s example:**

דרך משל, אלו היית מבאר בלמוד קביעות החדשים שזכרנו ענין השנים הסדורות והחסרות והשלמות קדם ענין החדשים החסרים והמלאים, הנה זה חסרון סדר, כי ענין הסדורות, החסרות והשלמות תלוי בענין חסרון החדשים ומלואם. ואי אפשר שתוכל לבארו כראוי קדם שתבאר חסרון החדשים ומלואם.

**Translation:** For example, if, when teaching the calendar, you explained regular, deficient, and complete years before deficient and full months, that would be a failure of order. The categories of years depend on whether their months are deficient or full. They cannot be explained properly before the months have been explained.

Source: Hebrew pp. 241; English pp. 242.

**Current visual:** Three starting circles with distinct routed arrows, following the selected football-play-diagram motif.

**Use and limits:** Arrangement assigns topics their proper sequence and level. The routed paths are a mnemonic, not a sport, physical movement, or fixed number of topics. General precedes particular, simple precedes composite, and needed explanations precede what depends on them. Presentation order is not necessarily chronological order.

### `study-definitions`: Definitions / גדרים

**File:** [icons/ch11-order/study-definitions.svg](icons/ch11-order/study-definitions.svg)

**Hierarchy:** Chapter 11 / Order / principle 2 of 3

**Ramchal’s wording:**

הגדרים – הוא שתתבונן מאד בכל הענינים שתזכיר, לגדר אותם לאמתם בגדר שלם שיכלל כל עקר ענינם, עד שיציר ציורם היטב בדעת השומע, ולא תקח הענינים המקריים תחת העצמיים לגדר בהם ענינך, כי לא יתן זה ציור שלם אל שומעיך.

**Translation:** Definitions: consider carefully every topic you mention, defining it truly and completely so that its whole essential content is included and it is clearly conceived in the listener’s mind. Do not use incidental features in place of essential ones to define your topic, since that will not give your listeners a complete conception.

Source: Hebrew pp. 241; English pp. 242.

Ramchal supplies no separate concrete example for this entry in the cited passage.

**Current visual:** A traditional list of three round bullets and horizontal lines, without an arrow.

**Use and limits:** Define the essential content completely rather than substituting incidental features. This is the user-selected bulleted-list drawing. It does not replace the separate accepted Essence/Definition badge used for subject analysis. The number of bullets is illustrative.

### `study-division`: Division / analysis / חלוק

**File:** [icons/ch11-order/study-division.svg](icons/ch11-order/study-division.svg)

**Hierarchy:** Chapter 11 / Order / principle 3 of 3

**Ramchal’s wording:**

החלוק – הוא גם כן עקר גדול להקל ללמד השגת מבקשו, כי כל זמן שאין השכל משיג אלא הכללים – אין השגתו שלמה. וכדי שישתלם, צריך שינתח לפניו הנושא לנתחיו, כדי שיוכל להביט על כלם ולהכירם כמו שהם, ואז יקרא שנצטיר בו הנושא ציור שלם.

**Translation:** Division is also a major principle for making it easier for a learner to grasp what is sought. As long as the intellect grasps only generalities, its understanding is incomplete. To complete it, the subject must be separated into its parts before the learner, so that all can be examined and recognized as they are. The subject can then be said to be fully conceived.

Source: Hebrew pp. 241, 243; English pp. 242, 244.

**Ramchal’s further rule:**

ואמנם מה שצריך שתשמר בזה הוא, שיהיו החלקים אשר תבחין, כוללים כל נושאיך באמת, לא פחות ולא יותר, פרוש – שלא תניח חלק מנושאיך אשר לא תמנהו, וכן לא תמנה יותר על מה שיש בו באמת. והמבחר שבחלוקה הוא, שתחלק נושאך לחלקים כוללים, ואחר כך תשוב ותחלק כל חלק מחלקיו לחלקים שניים, פרטיים מהראשונים, וכל אחד מן השניים לשלישיים, וכן על דרך זה. וטוב שתמעט במספר החלקים כל מה שאפשר לך, ותרבה בחלוק כל מה שאפשר, פרוש, שאם תוכל תשתדל לכלול כל נושאך בשני חלקים או שלשה, וכן על דרך זה.

**Translation:** Ensure that the parts truly encompass your entire subject, neither less nor more. Omit no part, and include nothing that does not actually belong. The best division first separates the subject into general parts, then each part into more particular secondary parts, and each secondary part into tertiary parts, continuing in this way. Keep the number of parts at each division as small as possible, while extending the process of subdivision as far as possible. If possible, encompass the subject in two or three parts, and proceed similarly thereafter.

Source: Hebrew pp. 243; English pp. 244.

**Ramchal’s further rule:**

והנה תזהר בזה להתהלך בהדרגה הראויה, ולא תזכיר חלק שניי עם הראשונים, ולא שלישיי עם השניים, וכן כיוצא בזה, אלא כל דבר במקומו ומדרגתו, ויהיו החלקים כל אחד שונה מחברו ונבדל ממנו באמת, שלא תמנה ענין אחד שתי פעמים.

**Translation:** Proceed through the appropriate levels. Do not list a secondary part alongside the primary parts, or a tertiary part alongside the secondary ones. Keep each in its proper place and level. Each part must truly differ from the others and be distinct from them, so that the same matter is not counted twice.

Source: Hebrew pp. 245; English pp. 246.

**Ramchal’s example:**

דרך משל (שבת ב.א): "יציאות השבת שתים שהן ארבע בפנים, ושתים שהן ארבע בחוץ", הנה כאן חלק כלל יציאות השבת לשני חלקים, והינו בפנים ובחוץ, ואחר כך חלק כל אחד משני החלקים לשנים. וכל אחד מאלה השנים לשנים אחרים, ונמצאו ארבעה, וזהו "שתים שהן ארבע".

**Translation:** For example (Shabbat 2a): “The acts of carrying on Shabbat are two that are four inside, and two that are four outside.” Here the whole subject of carrying on Shabbat is divided into two parts, inside and outside. Each of those two parts is then divided into two, and each of those two into another two, making four. This is “two that are four.”

Source: Hebrew pp. 243, 245; English pp. 244, 246.

**Current visual:** A whole partitioned into regions with further subdivisions contained inside each region.

**Use and limits:** The divisions must cover the whole topic, stay within its bounds, avoid overlap, and preserve levels of subdivision. This differs from physical Parts and from classification by Kind/Species. The drawing does not require equal sizes, two branches, or a fixed number of levels.

### `knowledge-theoretical`: Theoretical knowledge / שכליות

**File:** [icons/ch11-order/knowledge-theoretical.svg](icons/ch11-order/knowledge-theoretical.svg)

**Hierarchy:** Chapter 11 / Kind of knowledge / 1 of 2

**Ramchal’s wording:**

שכליות – מה שענינן ידיעת מדע אחד,

**Translation:** Theoretical: knowledge whose subject is understanding a science.

Source: Hebrew pp. 237; English pp. 238.

**Ramchal’s further rule:**

ואולם הסדר הראוי בלמודים השכליים הוא תחלת הכל ידיעת הנושא שעליו נעסק, אחר כך ידיעת חלקיו, אחר כך ידיעת סבותיו, אחר כך ידיעת מקריו לפי ההדרגה, דהינו בתחלה הכוללים ואחר כך הפרטים, בתחלה הפשוטים ואחר כך המרכבים, וכמו שאמרתי למעלה.

**Translation:** In theoretical studies the proper order is first to know the subject being studied, then its parts, then its causes, and then its attributes in their gradations: first the general and then the particular, first the simple and then the composite, as stated above.

Source: Hebrew pp. 239; English pp. 240.

**Ramchal’s example:**

דרך משל: חכמת התכונה היא ידיעת הגלגלים וכוכביהם בסבוביהם,

**Translation:** For example, astronomy is knowledge of the heavenly spheres and their stars in their revolutions.

Source: Hebrew pp. 237; English pp. 238.

**Ramchal’s example:**

חכמת התכונה תקרא שכלית, שאין בה אלא השכלת אחד מן הענינים שבמציאות כמו שהוא בה,

**Translation:** Astronomy is called theoretical because it consists in understanding a matter found in reality as it is.

Source: Hebrew pp. 239; English pp. 240.

**Current visual:** A heavenly body and orbit, drawing on the astronomy example.

**Use and limits:** This concerns understanding a subject as it is. Astronomy is a source example, not a restriction of the category. It is distinct from Chapter 8 Theory/סברא and conceptual priority. The theoretical and practical categories are a separate pair, not additional principles of Order.

### `knowledge-practical`: Practical knowledge / מעשיות

**File:** [icons/ch11-order/knowledge-practical.svg](icons/ch11-order/knowledge-practical.svg)

**Hierarchy:** Chapter 11 / Kind of knowledge / 2 of 2

**Ramchal’s wording:**

מעשיות – מה שענינן ידיעת מלאכה אחת.

**Translation:** Practical: knowledge whose subject is knowing how to carry out an art.

Source: Hebrew pp. 237; English pp. 238.

**Ramchal’s further rule:**

והסדר הראוי בלמודים המעשיים הוא, תחלת הכל ידיעת התכלית אשר נרצה להשיג, אחר כך ידיעת האמצעים המצטרכים להשגת התכלית ההיא לפי ההדרגה.

**Translation:** In practical studies the proper order is first to know the end we wish to achieve, and then to know the means necessary to achieve that end, in their proper gradations.

Source: Hebrew pp. 239; English pp. 240.

**Ramchal’s example:**

וחכמת הדקדוק היא ידיעת מעשה הדבור המתקן.

**Translation:** Grammar is knowledge of the practice of correct speech.

Source: Hebrew pp. 237, 239; English pp. 238, 240.

**Ramchal’s example:**

וחכמת הדקדוק תקרא מעשית, שהרי תכליתה היא ללמד איך ראוי שידבר בלשון ההיא.

**Translation:** Grammar is called practical because its purpose is to teach how one should speak that language.

Source: Hebrew pp. 239; English pp. 240.

**Ramchal’s example:**

דרך משל, כשנרצה ללמד קביעות חדשי השנה, הנה צריך שנבאר בתחלה התכלית, והיא קביעות ראשי החדשים בזמן הראוי, אחר כך נבאר האמצעים המצטרכים לזה, והיא ידיעת ענין החדשים החסרים והמלאים והשנים הסדורות והחסרות והשלמות, ענין הפשוטות והמעברות, חשבון המולדות וידיעת הדחיות.

**Translation:** For example, in teaching the fixing of the months of the year, first explain the purpose: establishing the beginnings of months at their proper times. Then explain the means needed: deficient and full months; regular, deficient, and complete years; ordinary and leap years; calculation of the new moons; and the postponement rules.

Source: Hebrew pp. 239; English pp. 240.

**Current visual:** The established Purpose flag combined with the established Means wrench.

**Use and limits:** Practical knowledge concerns an intended end and the means by which to attain it. It includes grammar and calendar calculation, not only physical handwork. The flag does not certify that the intended end has been achieved. The pair determines the appropriate arrangement of study.

<a id="reference-section-14"></a>

## 13. Selected Action and Cause subtypes

Status: **selected** on 20 September 2026, following the user’s “Sounds great! Continue.” The four previously presented candidates are now included in the current application inventory. Their artwork is unchanged.

| Selected icon | Parent | Source Hebrew / English | SVG |
|---|---|---|---|
| Natural action / פעלה טבעית | `subject-action` | 225 / 226 | [SVG](icons/ch11-subjects/subject-action-natural.svg) |
| Voluntary action / פעלה רצונית | `subject-action` | 225 / 226 | [SVG](icons/ch11-subjects/subject-action-voluntary.svg) |
| Generative cause / סבה מולדת | `subject-cause` | 229 / 230 | [SVG](icons/ch11-subjects/subject-cause-generative.svg) |
| Effective cause / סבה פועלת | `subject-cause` | 229 / 230 | [SVG](icons/ch11-subjects/subject-cause-effective.svg) |

Exact Hebrew excerpts, translations, and actual examples remain in [the source cards](action-cause-review.html) and the full guide.

### `subject-action-natural`

The existing source block, outward arrow, and recipient remain recognizable. Flowing waves fill the source block. They are a mnemonic for activity by nature, not a restriction to liquids, heat, or biological processes.

### `subject-action-voluntary`

The same source-to-recipient structure contains a hand activating a control. Deliberate activation expresses choice without borrowing the green Answer check or the Resolution bulb. The hand is a mnemonic, not a claim that voluntary acts are necessarily bodily.

### `subject-cause-generative`

The selected Cause gear is adapted as a source. A continuous stem leads to a smaller gear of the same family, indicating continuation from its source. The connection denotes origin, not permanent physical attachment. Repeated form does not require identical properties. This is not a mechanical-versus-biological taxonomy.

### `subject-cause-effective`

The same Cause gear points to a separate cube, drawing on the existing Result vocabulary. Cause and effect remain distinct. The cube stands for any produced effect, including an event, movement, or changed understanding, and does not restrict effective causes to manufacturing.

<a id="reference-section-15"></a>

## 14. Inseparable Property

Status: **selected** on 20 September 2026, after the user requested incorporation of the smaller-chain revision into the whole set. The accepted count at that selection was 143; Essential Form subsequently brought it to 144.

**Key:** `inseparable-property`.

**SVG:** [icons/ch8/inseparable-property.svg](icons/ch8/inseparable-property.svg).

**Hierarchy:** Chapter 8, analysis of a subject’s frame of reference. This is an analytical dimension, not a ground of support or a new Chapter 9 discussion move. It is not automatically a child of the Chapter 11 Attribute icon.

**Source:** Hebrew p.147 / English p.148, with neighboring distinctions on Hebrew p.149 / English p.150.

**Exact definition:**

מה שבסגלתו – הוא ענין שמתלוה תמיד אל הנושא ולא יסור ממנו, אך אין הוית הנושא תלויה בו, שהרי אלו יציר העדרו, לא היה חדל הנושא מלהיות מה שהוא.

**Meaning:** What always accompanies the subject but is not essential to what it is. Its imagined absence would not make the subject cease to be what it is.

**Source example:** Ramchal’s weasel/lapping example, reproduced in full in the review card. The garbled Hebrew citation is preserved and flagged; the supplied English identifies Parah 9:3.

**Visual:** A compact closed chain directly binds an upper-left property diamond to a lower-right subject square. Following user feedback, its length is approximately halved and its stroke lightened. Short stems attach the chain, and the broad white outline has been removed so both larger shapes stay complete and dominant. Two coupled links make inseparability the relationship between the shapes, while keeping property and subject distinct. This replaces the user-rejected infinity sign. The motif is analytically violet. The magnifier is omitted because this is an independent aspect, not a declared subtype of Chapter 11 Attribute.

**Limits:** The chain is a mnemonic for inseparable accompaniment. It does not assert that the subject and property are literal physical objects or that the property constitutes the subject’s essence. The diamond remains a distinct accompanying property, not an inner essential core. The definition does not assert exclusivity to a species. It does not use the popular mystical meaning of segulah. Chapter 8 contingent attributes may be absent or different; the existing Chapter 11 Attribute badge has a broader scope and is shown only as related vocabulary.

**Review:** [inseparable-property-review.html](inseparable-property-review.html), with exact Hebrew first, new English translations, actual source examples in grey, and nearby definitions. [inseparable-property-preview.png](inseparable-property-preview.png) compares the drawings and small-size renders.


<a id="reference-section-16"></a>

## 15. Selected Premise and Conclusion

**Status:** selected on 20 September 2026 following the user’s approval and request for the next batch. The exact dotted-boundary drawings are now included in the 159-icon current application inventory.

| Key | Term | Role | Selected SVG |
|---|---|---|---|
| `premise` | Premise / הקדמה | The statement used as the starting point of a deduction | [SVG](icons/ch4-7/premise.svg) |
| `conclusion` | Conclusion / תולדה | The statement that follows in the deduction | [SVG](icons/ch4-7/conclusion.svg) |

**Source:** Chapter 7, Hebrew p.93 / English p.94.

**Ramchal’s wording:** והנה המאמר הראשון שממנו ימשך השני נקרא הקדמה, והנמשך נקרא תולדה, והולדת התולדה מהקדמתה, נקראת הקש וכשיהיה על דרך זה, נקרא הקש מופתי.

**Meaning:** The initial statement is the premise; the statement following from it is the conclusion; deriving one from the other is הקש. These are roles of statements in reasoning, not new discussion moves.

**Visual:** Both selected icons use teal whole-statement units. A filled upper unit sends an arrow down toward a dotted baseline in Premise. An outlined lower unit receives an arrow emerging from a dotted top line in Conclusion. The dotted boundaries represent the surrounding reasoning, as requested by the user. The composition separates input from derived statement without importing term-level subject/predicate claims or causal machinery.

**Source example:** Ramchal begins with the circumcision knife being muktzeh, supplies the rule that muktzeh may not be moved, and derives that the knife may not be moved. The complete source paragraph and the subsequent qualification about valid inclusion/association appear in the review.

**Limits:** A premise badge does not certify truth. An outlined conclusion does not imply uncertainty. Neither badge specifies how many premises are needed. Keep logical Conclusion distinct from the effect of a cause, Chapter 11 מסבב, and from the Chapter 9 Inference move, דיוק. The single arrow is the direction of reasoning, not a timeline.

**Review files in the full handoff:** `logical-roles-review.html`, `logical-roles-preview.png`, `source/CHAPTER7_LOGICAL_ROLES_REVIEW.json`.

<a id="reference-section-17"></a>

## 16. Selected Antecedent and Consequent

**Status:** selected on 20 September 2026 following “Good! Continue on to the next batch.” The exact reviewed drawings are included in the 159-icon current application inventory.

| Key | Term | Role | Selected SVG |
|---|---|---|---|
| `hypothetical-antecedent` | Antecedent / הקודם | The clause stating the condition | [SVG](icons/ch1-3/hypothetical-antecedent.svg) |
| `hypothetical-consequent` | Consequent / הנמשך | The clause dependent on the first | [SVG](icons/ch1-3/hypothetical-consequent.svg) |

**Source:** Chapter 3, Hebrew p.31 / English p.32; clarification on Hebrew p.87 / English p.88; whole-statement premise on Hebrew p.105 / English p.106.

**Definitions:** הקודם – הוא החלק שהזכר בו התנאי. The antecedent is the part in which the condition is stated. הנמשך – הוא הנתלה בראשון. The consequent is the part dependent on the first.

**Source example:** If a priest or a poor person regularly eats at his table, let them come and eat (Demai 4:4). The source cards preserve both the full wording and each clause excerpt as printed, including the לאכל / לאכול spelling difference.

**Visual:** The selected Hypothetical Statement’s violet outlined dominoes and exact top dependency arrow are retained. Antecedent enlarges and emphasizes the left condition unit; Consequent does so to the right dependent unit. A smaller, lighter partner preserves the whole-statement context. Both remain outlined and lightly tinted.

**Limits:** Emphasis identifies a part, not its truth, certainty, importance, or amount. The connection is asserted without asserting that either clause has occurred. Antecedent does not mean earlier in time. Consequent here is a clause, not the separate whole Consequent Statement keyed `consequent`, which asserts both things and their dependence. Premise/Conclusion are roles of statements in a deduction; a whole hypothetical statement can be a premise. These parts are not new Chapter 9 moves. Do not replace Ramchal’s dependence notion with a material-implication truth table.

**Review files:** `antecedent-consequent-review.html`, `antecedent-consequent-preview.png`, `source/CHAPTER3_HYPOTHETICAL_ROLES_REVIEW.json`.

<a id="reference-section-18"></a>

## 17. Selected Predicate

**Status:** selected unchanged after the user requested proceeding to the next two icons. Included in the 159-icon current application inventory and in the complete application ZIP.

**Key:** `predicate`. **Asset:** [predicate.svg](icons/ch1-3/predicate.svg).

**Hierarchy:** Chapter 3, a role within a statement. The existing `statement-tile` supplies its visual vocabulary, not a semantic parent/subtype classification. Subject / נושא uses the revised selected `subject-bearer` icon: enlarged back cell, smaller translucent predicate front.

**Source:** Hebrew p.21 / English p.22; negative example on Hebrew p.23 / English p.24.

**Definition:** והנה הענין המקים או המשלל, נקרא "נשוא". That which is affirmed or denied is called the predicate.

**Source example:** In “Women are obligated in sanctifying the day,” women are the subject and the obligation is the predicate. The source cards preserve the complete Berakhot 20b example and Ramchal’s identification of the parts. Jerusalem’s not becoming impure through afflictions provides a negative statement from p.23.

**Visual:** The violet statement tile’s arrow-shaped predicate cell is enlarged to dominate the composition. It retains an internal square term glyph. A smaller, lighter subject cell with a circle remains attached for context. The predicate tile is outlined and tinted, not solid with a white term glyph.

**Limits:** This identifies what is affirmed or denied; it does not itself affirm, deny, or certify truth. The arrow-shaped cell is a role carrier, not logical derivation, causal production, or temporal order. Emphasis does not encode importance, quantity, scope, or uncertainty. Internal term shapes are illustrative, not a rule that every subject is a circle or every predicate a square. Predicate is not restricted to physical attributes, not a kind of Chapter 11 Attribute, and not a new Chapter 9 move. Keep it distinct from a consequent clause and a derived conclusion.

**Review files:** `subject-predicate-review.html`, `subject-predicate-preview.png`, `source/CHAPTER3_PREDICATE_REVIEW.json`.

<a id="reference-section-19"></a>

## Retained previous Subject form

At the user’s explicit request, keep `alternates/subject/subject-square-triangle.svg` as a previous form of Subject, in case it proves more intuitive. The new enlarged-back-cell Subject remains active. The earlier form has a preview and download under `#subject-previous-form` in the Subject/Predicate review and is included in the full handoff. It is not a new construct and does not change the selected count. Do not discard it under the general rule excluding old variants. See `alternates/subject/README.md` for restoration instructions.

<a id="reference-section-20"></a>

## 18. Current candidates

These two drawings completed the original bounded queue. Both are included in this complete application export. Design provenance remains review; it is not an import exclusion.

| Candidate | Meaning | Current path |
|---|---|---|
| Synonymous terms / שמות נרדפים | Different expressions share meaning in context. Hebrew p.211 / English p.212. | `icons/ch4-7/synonymous-terms.svg` |
| Refutation / תיובתא | A decisive challenge defeats a claim, often by conflict with an authoritative source. | `icons/ch9-subtypes/refutation.svg` |

Synonymous terms uses two differently marked labels joined to one meaning circle. It is not Homonym and does not declare whole statements equivalent. Ramchal’s first example uses corresponding subject expressions in contradictory propositions.

Refutation uses a distinct red hexagonal outline by explicit user instruction. The earlier arrow-and-break motif is preserved, enlarged, and centered inside it. This is an intentional exception to the triangle family’s visual inheritance; the source classification is unchanged. Objection leaves its block intact; Apparent Contradiction presents an unresolved conflict. Ramchal lists Refutation on p.179. The user explicitly requested external sources to supply the distinguishing meaning: [Avnion](https://www.milononline.net/תיובתא), [Wikiyeshiva](https://www.yeshiva.org.il/wiki/index.php/קשיא), and [Yinon Klein on Daf Yomi](https://daf-yomi.com/DYItemDetails.aspx?itemId=48810). This is not a recovered definition from Ramchal. A refutation can rely on authoritative contradictory evidence, and exceptional occurrences do not settle the final halachic ruling. The operational distinction is the ordinary decisive sense.

See `remaining-constructs-review.html`, `source/REMAINING_CONSTRUCTS_REVIEW.json`, and the two candidate preview sheets. The older square-and-triangle Subject remains a named alternative in the full handoff, without changing the selected or candidate counts.


<a id="reference-section-21"></a>

## 19. Current audit follow-up candidate: Contingent Attribute

**Key:** `contingent-attribute`. **Status:** included in the complete application export; design provenance: review. The complete current inventory is 159.

**File:** [icons/ch8/contingent-attribute.svg](icons/ch8/contingent-attribute.svg).

**Source:** Chapter 8, Hebrew p.149 / English p.150. One of four subject-aspect categories introduced on Hebrew p.147.

**Exact definition:** מה שבמקריו – הוא מה שמתלוה אל הנושא בדרך מקרה; פרוש, שכבר היה אפשר שלא יתלוה לו, או שיתלוה לו ענין מתחלף מזה, ואפלו ההפכי לו, ואף על פי כן היה הנושא ההוא מה שהוא.

**Meaning:** A feature could be absent or different, even opposite, while the subject remains what it is.

**Source example:** Ramchal describes round/square and long/short as possible differences without making the subject another subject. The full Hebrew and fresh translation appear in the grey example panel of the review.

**Visual:** Two identical violet subject squares show alternative conditions. One carries a small property diamond at its upper-left corner; the other is bare. The two-way elbow joins the alternatives. It contrasts with Essence’s defining frame and Inseparable Property’s closed chain. Both squares use exactly the same dimensions, tint, stroke, and corner radius. Their differing positions are layout, not a difference in subject identity.

**Limits:** Possible variation, not necessary change, temporal sequence, derivation, two distinct species, a broken essence, or a detachable physical part. Contingency is not unimportance or uncertainty about whether the feature is presently there. The Chapter 11 Attribute badge is broader; no semantic parentage is imposed. This is a new candidate requested after the full-text audit, outside the old twelve-item queue.

**Review:** `contingent-attribute-review.html`, `contingent-attribute-preview.png`, and `source/CONTINGENT_ATTRIBUTE_REVIEW.json`.


<a id="reference-section-22"></a>

## 20. Selected compound-statement branches

Selected unchanged following the user’s “Good. Continue to the next batch.” At that historical selection checkpoint there were 151 selected icons. The ground parents have since been selected (section 21); the current five candidates are the earlier three, Hyperbole (section 22) and Statement commitment (section 24). The Disjunctive affirmation companion is selected (section 23).

| Key | Display name | Hebrew excerpt | Source |
|---|---|---|---|
| `compound-equal` | Equal footing | בהשואה אחת | Hebrew p.33 / English p.34 |
| `compound-known-novel` | Known + novel | בדרך חדוש / שכבר נודע | Hebrew p.33 / English p.34 |

Files: [compound-equal.svg](icons/ch1-3/compound-equal.svg) and [compound-known-novel.svg](icons/ch1-3/compound-known-novel.svg).

**Exact division:** והנה החלק הזה יסתעף עוד לשני ענפים: האחד – שיהיו הנשואים נאמרים בהשואה אחת בנושאיהם; השני – שאחד מהם יאמר בדרך חדוש, והאחד כמו ענין שכבר נודע.

These are two branches within conjunctive compound, not two additional top-level predicate modes. The English names are descriptive; Ramchal does not give the branches separate formal Hebrew titles. The conjunctive grouping reuses `compound` with a label. Disjunction is the other major branch of Compound. Within Known + novel, `compound-not-only` means known first and novel second; `compound-needless` means novel first and known second.

**Visuals:** Both preserve the violet grouping bracket. Equal footing has two identical filled circles at the same height. Known + novel has a circle and a four-point starburst. The starburst is a mnemonic for a novel assertion, not greater certainty, sacredness, a Resolution, or a newly proved theorem. The circles do not make the assertions synonymous or restrict the compound to exactly two parts. The bracket groups coasserted contents. There is no connector or arrow from known to novel; this parent branch leaves verbal order unspecified. Left/right placement is illustrative.

**Source examples:** The equal-footing card quotes the three prohibitions on separating terumah by measurement, weight, or number. The known/novel card quotes the firstborn-animal rule and Ramchal’s explanation: sale alive is already known; sale after slaughter is the novel point for the blemished case. The source citation difference (Hebrew Ma’aser Sheni 1:3, English 1:2) is preserved and noted.

**Review:** `compound-branches-review.html`, `compound-branches-preview.png`, and `source/COMPOUND_BRANCHES_REVIEW.json`. The full hierarchy and exact source excerpts are included. All preceding artwork is unchanged.


<a id="reference-section-23"></a>

## 21. Selected parent grounds

The two Chapter 8 parent categories are selected unchanged following “Okays continue to the next batch.” They are now included in the complete application ZIP. Current export: 159 current icons, comprising 154 selected and five review-provenance drawings.

### `ground-natural`: Natural ground / ראיה מצד הטבע

**File:** [ground-natural.svg](icons/ch8/ground-natural.svg).

**Source:** Hebrew p.111 / English p.112.

**Exact definition:** ראיה מצד הטבע היא – שיהיה המאמר מן הדברים המאמתים אצל הכל בטבע, או נוסד על אחד מן הדברים האלה. פרוש – הנה שני מיני ענינים יש שהם מאמתים מצד עצמם ואינם צריכים ראיה אחרת, והם המשכלות הראשונים והמוחשות.

**Translation:** A ground from nature: the statement is one of the things naturally evident to everyone, or rests on one of those things. That is, two kinds of things are evident in themselves and need no further proof: first principles and sensory perceptions.

**Branches:** Axioms / המשכלות הראשונים, Senses / המוחשות.

**Source examples:** For example, that two is more than one, that half is less than the whole, and the like. Sensory perceptions are what the senses testify to, such as that stone is hard and water is wet.

**Use and limits:** Nature does not mean ecology, natural causation, or exclusively physical facts. The two inlays enumerate branches; both need not support the same statement. Detailed child emblems should be shown at 48 px or larger when their details must be read.

### `ground-convention`: Shared acceptance / ראיה מצד ההסכמה

**File:** [ground-convention.svg](icons/ch8/ground-convention.svg).

**Source:** Hebrew p.113 / English p.114.

**Exact definition:** ראיה מצד ההסכמה היא – שיהיה המאמר מה שדעת כלל האנשים מסכימה עליו, או נוסד על זה, שאז יהיה אותו המאמר מאמת לכל מי שיהיה מן הכלל ההוא. ויחלק זה לשני מינים: האחד – המפרסמות, והשני – המקבלות.

**Translation:** A ground from agreement: the statement is something on which the judgment of a community agrees, or rests on it. The statement is then established for those who belong to that community. This divides into two kinds: commonly accepted judgments and received traditions.

**Branches:** Common judgments / המפרסמות, Received tradition / המקבלות.

**Source examples:** For example, that pride is blameworthy and humility praiseworthy, and the like. When they said (Sanhedrin 90a), “All Israel has a share in the world to come,” they established the statement through the verse (Isaiah 60:21), “Your people are all righteous; they shall inherit the land forever.” And likewise in similar cases.

**Use and limits:** Common judgments do not mean whatever an individual finds obvious. The category includes authoritative received tradition; it is not simply a majority vote. The two inlays enumerate branches; both need not support the same statement. Detailed child emblems should be shown at 48 px or larger when their details must be read.

**Visual grammar:** Both use the existing magenta ground house, full horizon, converging ground-plane edges and depth gradient. The floor carries exact child inlays under uniform scale/translation transforms: sun + Sense face, or Common Judgments people + Tradition hands. The two emblems enumerate branches, not jointly required premises. The ground landscape denotes support; these are not new Chapter 9 moves or universal certificates of truth. At 24 px the paired silhouettes remain distinguishable, but labels are needed and fine detail should be read at 48 px or larger.

**Review:** `ground-parents-review.html`, `ground-parents-preview.png`, `ground-parents-icons.png`, and `source/GROUND_PARENTS_REVIEW.json`. The hierarchy includes the selected Logical Ground as the third sibling.


<a id="reference-section-24"></a>

## 22. Hyperbole candidate and Necessity reuse

At the Hyperbole batch checkpoint: 153 selected assets and four candidates. That batch created one new SVG, Hyperbole. The two parent grounds are selected unchanged. Necessity reuses the existing Qualified Certain drawing; its title and accessible label are broadened, with identical geometry.

### Hyperbole / הפלגה

**File:** [hyperbole.svg](icons/ch4-7/hyperbole.svg). **Status:** included; design provenance: review. **Source:** Hebrew p.75 / English p.76.

**Visual:** Figurative’s exact violet speech-bubble carrier contains a small ripple that swells into an oversized wave. The shape of the expression is exaggerated. The intact outline and lack of arrows avoid suggesting an inference, temporal process, or damaged statement.

**Ramchal’s shared rule:** והנה צריך שתתבחן בזה בין המאמרים הפשוטים והמאמרים הנאמרים על דרך ההשאלה או ההפלגה, כי הפשוטים אמתתם וכזבם תלויים בהיות צודק או בלתי־צודק מה שנרמז במלותיהם לפי הבנתן הפשוטה. אך באותם שעל דרך ההשאלה או ההפלגה, אין האמת והכזב תלויים במה שמובן מפשט מלותיהם, אלא ברמז המכון בהם.

**Translation:** Distinguish literal statements from those expressed figuratively or hyperbolically. The truth or falsity of literal statements depends on whether what their words indicate in their plain sense is correct. For figurative or hyperbolic statements, truth and falsity depend on the intended allusion, rather than the plain meaning of the words.

**Source example and its limit:** For example, when they told Rabbi Yochanan (Bava Kamma 117a), “A lion has come up from Babylon,” the statement’s truth lies in the intended allusion: a man who is a great Torah scholar has come from Babylon, namely Rav Kahana. This is a metaphor example illustrating the shared nonliteral rule. It is not relabeled as a distinct hyperbole example. The text names hyperbole but does not separately define it or supply a separate example in this passage.

**Limits:** A rhetorical mode, not a verdict that the statement is false or deceptive. Enlargement represents exaggeration in wording, not louder speech, temporal growth, or stronger evidence. Hyperbole and metaphor are distinct named cases under the shared nonliteral rule. The generic Figurative icon remains available for nonliteral intention.

**Visual relation:** The generic `figurative` icon supplies the speech-bubble carrier. Hyperbole is not declared a semantic subtype of metaphor / השאלה. The shared higher category is nonliteral intention.

### Necessity / הכרח

**Asset:** [qualified-certain.svg](icons/ch1-3/qualified-certain.svg), selected reuse. **Source:** Hebrew p.25 / English p.26.

**Exact passage:** המין השני – אותם שיאמר בהם הנשוא בנושא בדרך מיחד ומגבל, כגון שיאמר הנשוא בדרך ודאות או הכרח,

**Translation:** The second kind states the predicate of the subject in a specified and restricted manner, for example, as a certainty or a necessity.

**Source example:** For example (Pesachim 9b): “Since a weasel or marten is found there, they certainly dragged it away at that time.” The printed example explicitly asserts certainty, not an independent illustration distinguishing necessity from certainty.

**Limits:** Reuses qualified-certain; no additional SVG or fifth modal group is introduced. A shared graphic does not equate certainty with necessity. Preserve the precise wording in the label. The badge records the statement’s asserted mode, not the analyst’s guarantee of its truth.

**Review:** `expression-nuances-review.html`, `hyperbole-preview.png`, `hyperbole-comparison.png`, and `source/EXPRESSION_NUANCES_REVIEW.json`. This finishes the agreed drawing list from the audit follow-up, not every possible documentation improvement in the audit.


<a id="reference-section-25"></a>

## 23. Expanded deduction definitions and the next two families

The user requested fuller definitions for Classical deduction and A fortiori, then work on the next two families. The next two in the five-method sequence are Hypothetical and Disjunctive deduction. The full source pp.91–110 was reread. Current inventory: **154 selected assets and five candidates**. One directional companion was added and subsequently selected unchanged; all previous artwork is unchanged. Six existing title captions are broadened or clarified. Earlier candidate statuses remain unchanged.

### Classical deduction / הקש מופתי

Derive a conclusion through a necessary inclusion or connection already carried by the premise. Ramchal gives two routes within the same method: carry a general predication to an included subject, or carry what necessarily belongs to the predicate back to the same subject.

**Hebrew pp.91:** טבע ההתבוננות נותן, שכאשר יאמר נשוא אחד בנושא אחד, כל מה שיהיה נכלל או מתחבר באמת בנשוא ההוא, יאמר באותו הנושא, וכן כל מה שנכלל באותו הנושא יאמר באותו הנשוא.

**Translation:** When a predicate is asserted of a subject, whatever is truly included in or connected with that predicate is asserted of the same subject; likewise, what is included under that subject comes under the same predication.

**Hebrew pp.93:** והנה המאמר הראשון שממנו ימשך השני נקרא הקדמה, והנמשך נקרא תולדה, והולדת התולדה מהקדמתה, נקראת הקש וכשיהיה על דרך זה, נקרא הקש מופתי.

**Translation:** The first statement, from which the second follows, is called a premise; the derived statement is called a conclusion. Deriving the conclusion from its premise is called inference, and when it follows this pattern it is called classical deduction.

| Route | Pattern | Use |
|---|---|---|
| Included subject | Every A is B; x belongs to A; therefore x is B. | Apply the general predication to a member or included class. |
| Necessary predicate connection | x has P; P necessarily carries Q; therefore x has Q. | The connection must hold necessarily and consistently, not merely sometimes. |

**Ramchal’s example: included subject (Hebrew pp.91, 93):** Suppose we have heard that one who performs a primary labor on Shabbat incurs the stated penalty. Every act known to fall under primary labor then comes under that predication. Ramchal derives the cases of writing and kneading, because they are included under the subject of the original statement, “one who performs a primary labor.”

**Ramchal’s example: predicate connection (Hebrew pp.93):** Likewise, if you heard that the circumcision knife is muktzeh, whatever is known to belong to that predicate would apply to the knife. Thus, knowing that muktzeh is forbidden to handle, you would infer that the circumcision knife is forbidden to handle.

**Limits:** The kind-to-member picture is a mnemonic for one route; it does not restrict the method to that route. Failure can lie in subject inclusion or in the required predicate connection. The existing fallacy-not-included badge covers either failure with a precise label. The two schematic routes explain the source; they are not additional deduction families.


### A fortiori / כל־שכן / קל־וחמר

Transfer a predicate between comparable cases because the relevant ordering makes its application at least as warranted in the target case. Ramchal explicitly permits lesser to greater and greater to lesser. The predicate and the relevant comparison determine the direction.

**Hebrew pp.95, 97:** וכן על דרך זה נדון מהפחות על היתר או להפך, והינו שאם נמצא נשוא בנושא שהוא פחות מחברו, וראוי אותו נשוא להמצא בנושא שהוא יותר ממנו, נדון היותו בו. וכן מהיתר לפחות. וזה נקרא כל־שכן וקל־וחמר.

**Translation:** In this manner we reason from the lesser to the greater, or conversely. If a predicate is found in a lesser subject, and it is fitting that the predicate should be found in the greater, we infer that it is found there. Likewise from greater to lesser. This is called “all the more so” or a fortiori.

| Route | Pattern | Use |
|---|---|---|
| Lesser → greater | The predicate holds in the lesser case. | Infer it in the greater only when the relevant comparison warrants that transfer. |
| Greater → lesser | The predicate holds in the greater case. | Infer it in the lesser only when that is the warranted direction for this predicate. |

**Ramchal’s proposed lesser-to-greater argument (Hebrew pp.97):** “If an individual, who does not bring a male offering for a known sin, brings a contingent guilt offering, should not a ruler, who does bring a male offering for a known sin, bring a contingent guilt offering?” Ramchal calls this a fortiori.

**Ramchal’s later counterexample to that argument (Hebrew pp.103):** When they sought to derive the ruler’s case from the individual’s, the argument was challenged by the anointed priest: he brings a male offering for a known sin but does not bring a contingent guilt offering. Ramchal explains that a comparable case has been found without the predicate under discussion.

**Ramchal’s greater-to-lesser example, with its defeat (Hebrew pp.101):** Initially the anointed priest was treated as greater than the ruler: if he does not bring an offering for earlier sins, all the more so the supposedly lesser ruler. But another respect was then found in which the ruler is greater, so the comparison no longer supports the inference.

**Limits:** The direction is not mechanically reversible. “Greater” and “lesser” concern the respect relevant to this predicate, not a universal ranking of the cases. The selected small-to-large icon remains a family mnemonic; use a direction label for a greater-to-lesser argument. The source examples illustrate proposed argument forms and their possible defeat; they are not displayed as unqualified valid conclusions.


### Hypothetical deduction / הקש תלוי

Reason from an established dependence between antecedent and consequent. Establishing the antecedent establishes the consequent. Excluding the consequent excludes the antecedent. The two existing icons already cover these two directions.

**Hebrew pp.105:** עוד מטבע ההתבוננות, ששני ענינים, שהם אחד קודם ואחד נמשך, יכריחו זה את זה; פרוש, שבהמצא הקודם – ימצא הנמשך, ובהעדר הנמשך – יעדר הקודם.

**Translation:** Where one matter is an antecedent and another its consequent, establishing the antecedent establishes the consequent, and the absence of the consequent entails the absence of the antecedent.

**Hebrew pp.105:** הנה הדין הזה נקרא הקש תלוי, לפי שהקדמתו מאמר תלוי.

**Translation:** This inference is called hypothetical deduction because its premise is a hypothetical statement.

| Route | Pattern | Use |
|---|---|---|
| Affirm antecedent | A entails B; A; therefore B. | hypothetical-syllogism |
| Deny consequent | A entails B; not B; therefore not A. | hypothetical-syllogism-tollens |

**Ramchal’s example: denying the consequent (Hebrew pp.105):** For example (Pesachim 19a): if he held Rabbi Akiva’s view, he would also have taught a fourth degree of impurity for terumah and a fifth for sacred food. Because he does not teach these, the conclusion is that he does not hold Rabbi Akiva’s view. Ramchal bases this on the stated necessary dependence.

**Limits:** No license to affirm the consequent and infer the antecedent, or to deny the antecedent and infer denial of the consequent. The dependence must be established in the relevant context. Silence or failure to observe something alone does not automatically establish its absence. The return arrow records logical inference, not travel backward in time. These are whole deduction badges, distinct from the Antecedent and Consequent clause icons.


### Disjunctive deduction / הקש מחלק

Reason from an exhaustive partition in which exactly one alternative applies. Establishing one excludes all the others. Excluding every alternative but one establishes the remaining one. The existing icon depicts elimination; the new companion depicts affirmation followed by exclusion.

**Hebrew pp.105, 107:** עוד מטבע ההתבוננות, שנושאים שונים, שמכרח המצא אחד מהם לבדו בנושא, כשיתברר לנו מציאות האחד – יכרח העדר כל האחרים, וכשיתברר לנו העדר כלם חוץ מאחד– תכרח מציאות האחד הנשאר.

**Translation:** When alternatives are such that exactly one must apply to the subject, establishing one requires the absence of all the others; establishing the absence of all but one requires the presence of the remaining one.

**Hebrew pp.109:** והנה דין זה נקרא הקש מחלק, לפי שהקדמתו מאמר מחלק; או נשוא זה או נשוא זה יש בנושא זה, או להפך, או לנושא זה או לנושא זה ייחס זה הנשוא, וכמו שאמרנו למעלה.

**Translation:** This inference is called disjunctive deduction because its premise is a disjunctive statement: either this predicate or that predicate applies to a subject, or conversely, either this subject or that subject bears a predicate.

| Route | Pattern | Use |
|---|---|---|
| Eliminate → establish survivor | Exactly one of A, B, C; not A and not B; therefore C. | Selected: disjunctive-syllogism |
| Establish one → exclude others | Exactly one of A, B, C; A; therefore not B and not C. | Selected: disjunctive-syllogism-affirm |

**Ramchal’s example: eliminate one of two alternatives (Hebrew pp.107):** For example (Pesachim 5b), the singling out of kindling is interpreted either to distinguish liabilities or to establish a mere prohibition. Having excluded the latter in the argument, one must conclude the former.

**Ramchal’s second elimination example (Hebrew pp.109):** For example (Bava Kamma 104a), the appointment was either made before witnesses or not before witnesses. The argument excludes the unwitnessed case, because then the agency could not be known, and concludes that the appointment was made before witnesses.

**Limits:** The shared two-direction rule assumes an exhaustive, mutually exclusive partition. An arbitrary inclusive “or” does not license affirmation followed by exclusion. With more than two alternatives, rejecting one does not establish a unique survivor. All alternatives but one must be excluded. For elimination alone, exhaustiveness is the needed condition; exclusion from an affirmed alternative additionally requires mutual exclusivity. Both printed worked examples use elimination. The affirmation direction is explicitly stated in the rule, even without a separate worked example. Two branches in the icon are illustrative, not a fixed arity.

**Selected companion:** [disjunctive-syllogism-affirm.svg](icons/ch4-7/disjunctive-syllogism-affirm.svg). Selected unchanged when the user asked to proceed; included in the complete application ZIP. The selected teal fork is retained under a uniform .86 scale and small vertical translation. A top return arrow starts at the established right alternative and points to the rejected left alternative. This distinguishes the reasoning direction without inventing a sixth deduction family.

**Related correction:** `fallacy-not-included` covers failed subject inclusion or failed necessary predicate connection. Its geometry is unchanged. The broader caption is backed by p.93; examples continue on p.95.

**Source cautions:** The A-fortiori examples are labeled as proposed arguments with their later rebuttals. The greater-to-lesser example in pp.99–102 is explicitly defeated after its ordering is challenged. Both Disjunctive worked examples use elimination; affirmation-to-exclusion is stated in the general rule. Source examples are not relabeled to manufacture coverage. The Hebrew and English Shabbat citations differ in the first Classical example and are preserved as printed.

**Review:** `deduction-methods-review.html`, `deduction-methods-preview.png`, `disjunctive-directions.png`, and `source/DEDUCTION_METHODS_REVIEW.json`. Read this current expansion alongside the historical audit’s F4 finding.

<a id="reference-section-26"></a>

## 24. Statement commitments / סוף גזרתו

Chapter 6 asks what each statement ultimately asserts before judging its truth or falsity. The [eleven-form table](statement-commitments.md) and [illustrated review](statement-commitments-review.html) map existing icons to the asserted content and the component a challenge defeats. Exact Hebrew passages and English renderings appear below the table. Source: Hebrew pp.75–89 / English pp.76–90, with Chapter 3 form identities checked against pp.35–40.

Hypothetical / תלוי asserts dependence without asserting either clause's occurrence. Consequent / נמשך asserts both clauses and their dependence, each as stated. A clause may itself express a rule or condition. Conditional / מגבל adds a stipulation to an underlying assertion; a false stipulation need not defeat that base assertion. Qualified / מיחד must be assessed in its stated mode, so a possibility claim does not assert actual occurrence.

The three source examples are the money-exchange stipulation, Moshe/Shaul's unrelated truths, and the offered chalitzah/yibbum choice. The last commits to both routes' availability, not both being performed. Source citation differences are retained. The eighth through tenth forms share Ramchal's general rule; their component analyses interpret that rule alongside Chapter 3's definitions.

The usage guide is accompanied by a dedicated icon at the user’s explicit request. This is not a twelfth statement form. Current inventory: 154 selected assets, five candidates. Conditional and Consequent metadata/catalog captions are clarified, with all icon geometry unchanged. Source metadata: `source/STATEMENT_COMMITMENTS.json`.

### Dedicated Statement commitment icon

**File:** [statement-commitment.svg](icons/ch4-7/statement-commitment.svg). **Key:** `statement-commitment`. **Status:** included; design provenance: review.

**Hebrew:** סוף גזרתו. **English:** Statement commitment. **Source:** Hebrew p.75 / English p.76; applications across pp.77–90.

**Meaning:** Identify exactly what a statement asserts, on which its truth or falsity depends. The asserted content varies according to its form.

**Visual:** Four focusing corners enclose the entire violet statement tile, with its subject and predicate glyphs intact. The existing tile is uniformly scaled to .78. The framing applies to the whole claim rather than to the predicate cell alone. The rectangular aspect and arrow tile distinguish this from the square framed object used for Essence.

**Limits:** A dedicated Chapter 6 analysis badge, not a new statement subtype or a Chapter 9 move. The tile stands for statements generally, not only Simple. What it identifies can be a dependence or several constituent assertions. Framing neither proves nor refutes the statement and does not derive a conclusion. It does not mean the last words of the sentence or the final stage in time.

This explicit user request supersedes the preceding text-only treatment. The full guide places the icon alongside the exact principle and English rendering; the existing source examples remain below. [Preview](statement-commitment-preview.png). All earlier artwork is unchanged.

<a id="reference-section-27"></a>

## 25. Complete current asset registry

Every row is included in the application. The detailed sections above explain meanings; SVG titles below are identification metadata. Use the exact key and path. All hashes are in `ICON_MANIFEST.json`.

| Key | Asset path | SVG title | Design provenance |
|---|---|---|---|
| `a-fortiori` | [icons/ch4-7/a-fortiori.svg](icons/ch4-7/a-fortiori.svg) | a-fortiori: Infer from lesser to greater or greater to lesser, as the relevant predicate and comparison warrant (קל וחמר). | selected |
| `absolute-opposite` | [icons/ch4-7/absolute-opposite.svg](icons/ch4-7/absolute-opposite.svg) | absolute-opposite: some do, therefore some do not: the implied box half present, half faded (הפך) | selected |
| `actual` | [icons/ch8/actual.svg](icons/ch8/actual.svg) | actual: said of what actually does (בפועל) | selected |
| `alternative` | [icons/ch9-subtypes/alternative.svg](icons/ch9-subtypes/alternative.svg) | Alternative: lightbulb with a dotted bridge and open center | selected |
| `analogism` | [icons/ch4-7/analogism.svg](icons/ch4-7/analogism.svg) | analogism: found in this one, so also in that similar one (בנין אב / מה מצינו) | selected |
| `answer` | [icons/ch9-moves/answer.svg](icons/ch9-moves/answer.svg) | answer , answers it | selected |
| `answer-to-query` | [icons/ch9-subtypes/answer-to-query.svg](icons/ch9-subtypes/answer-to-query.svg) | Answer to a query / תשובת השאלה | selected |
| `apparent-contradiction` | [icons/ch9-subtypes/apparent-contradiction.svg](icons/ch9-subtypes/apparent-contradiction.svg) | Apparent contradiction: two opposing chevrons inside a warning triangle | selected |
| `ascribed-difficulty` | [icons/ch10-composites/ascribed-difficulty.svg](icons/ch10-composites/ascribed-difficulty.svg) | Ascribed difficulty: a problem attributed to another view | selected |
| `ascribed-proof` | [icons/ch10-composites/ascribed-proof.svg](icons/ch10-composites/ascribed-proof.svg) | Ascribed proof: a report used as evidence | selected |
| `attribute-before-after` | [icons/ch11-subjects/attribute-before-after.svg](icons/ch11-subjects/attribute-before-after.svg) | Attribute: preceding or following the subject | selected |
| `attribute-concurrent` | [icons/ch11-subjects/attribute-concurrent.svg](icons/ch11-subjects/attribute-concurrent.svg) | Attribute: present alongside the subject | selected |
| `attribute-in-attached` | [icons/ch11-subjects/attribute-in-attached.svg](icons/ch11-subjects/attribute-in-attached.svg) | Attribute: in, on, or attached | selected |
| `categorical` | [icons/ch1-3/categorical.svg](icons/ch1-3/categorical.svg) | categorical: about all of them (כולל) | selected |
| `classical-syllogism` | [icons/ch4-7/classical-syllogism.svg](icons/ch4-7/classical-syllogism.svg) | classical-syllogism: Derive through an included subject or a necessary predicate connection (הקש מופתי). | selected |
| `comparative` | [icons/ch1-3/comparative.svg](icons/ch1-3/comparative.svg) | comparative: just as this, so too that (מדמה) | selected |
| `compound` | [icons/ch1-3/compound.svg](icons/ch1-3/compound.svg) | compound: several things said together (מרבה הענינים) | selected |
| `compound-equal` | [icons/ch1-3/compound-equal.svg](icons/ch1-3/compound-equal.svg) | Equal-footing compound / בהשואה אחת | selected |
| `compound-known-novel` | [icons/ch1-3/compound-known-novel.svg](icons/ch1-3/compound-known-novel.svg) | Known-and-novel compound / בדרך חדוש · שכבר נודע | selected |
| `compound-needless` | [icons/ch1-3/compound-needless.svg](icons/ch1-3/compound-needless.svg) | compound-needless: this, and needless to say that (זו ואין צריך לומר זו) | selected |
| `compound-not-only` | [icons/ch1-3/compound-not-only.svg](icons/ch1-3/compound-not-only.svg) | compound-not-only: not only this, but even that (לא זו אף זו) | selected |
| `conclusion` | [icons/ch4-7/conclusion.svg](icons/ch4-7/conclusion.svg) | Conclusion / תולדה | selected |
| `conditional` | [icons/ch1-3/conditional.svg](icons/ch1-3/conditional.svg) | conditional: an underlying assertion with a restriction or stipulation; assess both components (מגבל) | selected |
| `consequent` | [icons/ch1-3/consequent.svg](icons/ch1-3/consequent.svg) | consequent: the antecedent, consequent and their dependence are all asserted, as stated (נמשך) | selected |
| `contingent-attribute` | [icons/ch8/contingent-attribute.svg](icons/ch8/contingent-attribute.svg) | Contingent attribute / מה שבמקריו | review |
| `contradiction` | [icons/ch9-moves/contradiction.svg](icons/ch9-moves/contradiction.svg) | contradiction , knocks it down | selected |
| `contradictory` | [icons/ch4-7/contradictory.svg](icons/ch4-7/contradictory.svg) | contradictory: all say is, some say is not, tip to tip (מתנגדים) | selected |
| `contrapositive` | [icons/ch4-7/contrapositive.svg](icons/ch4-7/contrapositive.svg) | contrapositive: trade places, and is becomes is not: the return arrow in negative (חלוף הפכי) | selected |
| `converse` | [icons/ch4-7/converse.svg](icons/ch4-7/converse.svg) | converse: subject and predicate trade places: the arrow comes back the other way (חלוף כולל) | selected |
| `converse-limited` | [icons/ch4-7/converse-limited.svg](icons/ch4-7/converse-limited.svg) | converse-limited: trade places, but it only comes back for some: a shorter, thinner return (חלוף קצתי) | selected |
| `demonstration` | [icons/ch9-subtypes/demonstration.svg](icons/ch9-subtypes/demonstration.svg) | Demonstration: monitor with thumbs up | selected |
| `determination` | [icons/ch9-subtypes/determination.svg](icons/ch9-subtypes/determination.svg) | Determination / פשיטות | selected |
| `diametrically-opposed` | [icons/ch4-7/diametrically-opposed.svg](icons/ch4-7/diametrically-opposed.svg) | diametrically-opposed: same terms, yes against no, tip to tip (הפכיים ממש) | selected |
| `differs-in-context` | [icons/ch4-7/differs-in-context.svg](icons/ch4-7/differs-in-context.svg) | differs-in-context: not opposed: they speak of different settings | selected |
| `differs-in-place` | [icons/ch4-7/differs-in-place.svg](icons/ch4-7/differs-in-place.svg) | Different places: the statements refer to different locations | selected |
| `differs-in-time` | [icons/ch4-7/differs-in-time.svg](icons/ch4-7/differs-in-time.svg) | Different times: the statements refer to different times | selected |
| `difficulty` | [icons/ch9-moves/difficulty.svg](icons/ch9-moves/difficulty.svg) | difficulty , raises a problem | selected |
| `dilemma` | [icons/ch8/dilemma.svg](icons/ch8/dilemma.svg) | dilemma: whichever way you take it, it fails (ממה נפשך) | selected |
| `discrepancy` | [icons/ch1-3/discrepancy.svg](icons/ch1-3/discrepancy.svg) | discrepancy: holds, even though it looks like it should not (מכחיש) | selected |
| `disjunction` | [icons/ch1-3/disjunction.svg](icons/ch1-3/disjunction.svg) | disjunction: one or the other (או... או) | selected |
| `disjunctive-syllogism` | [icons/ch4-7/disjunctive-syllogism.svg](icons/ch4-7/disjunctive-syllogism.svg) | disjunctive-syllogism: Exclude all but one of an exhaustive set of alternatives, then establish the survivor (הקש מחלק). | selected |
| `disjunctive-syllogism-affirm` | [icons/ch4-7/disjunctive-syllogism-affirm.svg](icons/ch4-7/disjunctive-syllogism-affirm.svg) | Disjunctive deduction: affirm one, exclude the others / הקש מחלק | selected |
| `equivalent` | [icons/ch4-7/equivalent.svg](icons/ch4-7/equivalent.svg) | equivalent: the same statement, twice (דומים) | selected |
| `essence-definition` | [icons/ch11-subjects/essence-definition.svg](icons/ch11-subjects/essence-definition.svg) | Essence and definition: what makes the subject what it is | selected |
| `essential-form` | [icons/ch11-subjects/essential-form.svg](icons/ch11-subjects/essential-form.svg) | Essential form: the defining structure within the whole | selected |
| `exception` | [icons/ch1-3/exception.svg](icons/ch1-3/exception.svg) | exception: all of it, except this piece (מוציא) | selected |
| `exclusion` | [icons/ch1-3/exclusion.svg](icons/ch1-3/exclusion.svg) | exclusion: this and nothing else (ממעט) | selected |
| `explanation` | [icons/ch9-subtypes/explanation.svg](icons/ch9-subtypes/explanation.svg) | Explanation / פרוש | selected |
| `fallacy-counterexample` | [icons/ch4-7/fallacy-counterexample.svg](icons/ch4-7/fallacy-counterexample.svg) | fallacy-counterexample: another case just as similar lacks it | selected |
| `fallacy-not-greater` | [icons/ch4-7/fallacy-not-greater.svg](icons/ch4-7/fallacy-not-greater.svg) | fallacy-not-greater: which case is the heavier one is not settled | selected |
| `fallacy-not-included` | [icons/ch4-7/fallacy-not-included.svg](icons/ch4-7/fallacy-not-included.svg) | fallacy-not-included: The claimed subject inclusion or necessary predicate connection fails. | selected |
| `fallacy-not-similar` | [icons/ch4-7/fallacy-not-similar.svg](icons/ch4-7/fallacy-not-similar.svg) | fallacy-not-similar: the two cases are not alike after all (מה ל... שכן...) | selected |
| `figurative` | [icons/ch4-7/figurative.svg](icons/ch4-7/figurative.svg) | figurative: not meant literally: read the allusion | selected |
| `first-hand` | [icons/ch9-subtypes/first-hand.svg](icons/ch9-subtypes/first-hand.svg) | Stated teaching / שמועה | selected |
| `forced-explanation` | [icons/ch9-subtypes/forced-explanation.svg](icons/ch9-subtypes/forced-explanation.svg) | Forced explanation / פרוש דחוק | selected |
| `full-explanation` | [icons/ch9-subtypes/full-explanation.svg](icons/ch9-subtypes/full-explanation.svg) | Full explanation / פרוש מרוח | selected |
| `ground-axiom` | [icons/ch8/ground-axiom.svg](icons/ch8/ground-axiom.svg) | ground-axiom: the mind dictates it, no training needed (מושכלות ראשונים) | selected |
| `ground-common-sense` | [icons/ch8/ground-common-sense.svg](icons/ch8/ground-common-sense.svg) | ground-common-sense: what most people hold by nature (מפורסמות) | selected |
| `ground-convention` | [icons/ch8/ground-convention.svg](icons/ch8/ground-convention.svg) | Conventional ground / ראיה מצד ההסכמה | selected |
| `ground-deduction` | [icons/ch8/ground-deduction.svg](icons/ch8/ground-deduction.svg) | ground-deduction: it follows from a true premise by a deduction (הקש); the chapter 7 badge says which | selected |
| `ground-does-not-reach` | [icons/ch8/ground-does-not-reach.svg](icons/ch8/ground-does-not-reach.svg) | ground-does-not-reach: the ground is real but does not reach the statement | selected |
| `ground-natural` | [icons/ch8/ground-natural.svg](icons/ch8/ground-natural.svg) | Natural ground / ראיה מצד הטבע | selected |
| `ground-sense` | [icons/ch8/ground-sense.svg](icons/ch8/ground-sense.svg) | ground-sense: the senses testify to it (מוחשות) | selected |
| `ground-tradition` | [icons/ch8/ground-tradition.svg](icons/ch8/ground-tradition.svg) | ground-tradition: handed down: a verse, a halacha, an undisputed authority (מקובלות) | selected |
| `has-middle` | [icons/ch4-7/has-middle.svg](icons/ch4-7/has-middle.svg) | has-middle: optional, praiseworthy, obligatory: a middle exists | selected |
| `homonym` | [icons/ch4-7/homonym.svg](icons/ch4-7/homonym.svg) | homonym: not opposed: one word, two meanings | selected |
| `hyperbole` | [icons/ch4-7/hyperbole.svg](icons/ch4-7/hyperbole.svg) | Hyperbole / הפלגה | review |
| `hypothetical` | [icons/ch1-3/hypothetical.svg](icons/ch1-3/hypothetical.svg) | hypothetical: if this, then that; only the link is claimed (תלוי) | selected |
| `hypothetical-antecedent` | [icons/ch1-3/hypothetical-antecedent.svg](icons/ch1-3/hypothetical-antecedent.svg) | Antecedent / הקודם | selected |
| `hypothetical-consequent` | [icons/ch1-3/hypothetical-consequent.svg](icons/ch1-3/hypothetical-consequent.svg) | Consequent / הנמשך | selected |
| `hypothetical-syllogism` | [icons/ch4-7/hypothetical-syllogism.svg](icons/ch4-7/hypothetical-syllogism.svg) | hypothetical-syllogism: Given an established dependency, affirm the antecedent and derive the consequent (הקש תלוי). | selected |
| `hypothetical-syllogism-tollens` | [icons/ch4-7/hypothetical-syllogism-tollens.svg](icons/ch4-7/hypothetical-syllogism-tollens.svg) | hypothetical-syllogism-tollens: Given an established dependency, deny the consequent and exclude the antecedent (הקש תלוי). | selected |
| `incongruent` | [icons/ch4-7/incongruent.svg](icons/ch4-7/incongruent.svg) | incongruent: different subject, different predicate (נבדלים) | selected |
| `inference` | [icons/ch9-subtypes/inference.svg](icons/ch9-subtypes/inference.svg) | Inference / דיוק | selected |
| `inference-loose` | [icons/ch4-7/inference-loose.svg](icons/ch4-7/inference-loose.svg) | inference-loose: the wording suggests it, but the line wobbles: the link is there but not firm (בלתי מוכרח) | selected |
| `inference-necessary` | [icons/ch4-7/inference-necessary.svg](icons/ch4-7/inference-necessary.svg) | inference-necessary: stated on the left, implied on the right (dashed: nobody said it), wired straight through (מוכרח) | selected |
| `inseparable-property` | [icons/ch8/inseparable-property.svg](icons/ch8/inseparable-property.svg) | Inseparable property / סגולה | selected |
| `kind-species` | [icons/ch11-subjects/kind-species.svg](icons/ch11-subjects/kind-species.svg) | Kind and species: relative levels of inclusion | selected |
| `knowledge-practical` | [icons/ch11-order/knowledge-practical.svg](icons/ch11-order/knowledge-practical.svg) | Practical knowledge / חכמות מעשיות | selected |
| `knowledge-theoretical` | [icons/ch11-order/knowledge-theoretical.svg](icons/ch11-order/knowledge-theoretical.svg) | Theoretical knowledge / חכמות שכליות | selected |
| `might-have-thought` | [icons/ch8/might-have-thought.svg](icons/ch8/might-have-thought.svg) | might-have-thought: one might have thought otherwise; the statement is there to exclude that (סלקא דעתין / מהו דתימא) | selected |
| `misordered` | [icons/ch8/misordered.svg](icons/ch8/misordered.svg) | misordered: wrong order: what should be joined is split, or the parts are out of sequence (תנא היכא קאי / ליערבינהו וליתנינהו / פתח בכד וסיים בחבית) | selected |
| `no-middle` | [icons/ch4-7/no-middle.svg](icons/ch4-7/no-middle.svg) | no-middle: clean or unclean: nothing in between | selected |
| `objection` | [icons/ch9-subtypes/objection.svg](icons/ch9-subtypes/objection.svg) | Objection: incoming impact inside a warning triangle | selected |
| `obverse` | [icons/ch4-7/obverse.svg](icons/ch4-7/obverse.svg) | Obverse relation / מתהפכים: corresponding subjects and predicates are opposite; assess implications separately | selected |
| `obvious` | [icons/ch8/obvious.svg](icons/ch8/obvious.svg) | obvious: the whole statement adds nothing; everyone knew it (פשיטא) | selected |
| `opposition` | [icons/ch9-subtypes/opposition.svg](icons/ch9-subtypes/opposition.svg) | Opposition: crossed circle with branching arrows | selected |
| `partial` | [icons/ch1-3/partial.svg](icons/ch1-3/partial.svg) | partial: about some of them (קצתי) | selected |
| `particular` | [icons/ch1-3/particular.svg](icons/ch1-3/particular.svg) | particular: about this one (פרטי) | selected |
| `party-group` | [icons/ch1-3/party-group.svg](icons/ch1-3/party-group.svg) | party-group: several people debating | selected |
| `party-individual` | [icons/ch1-3/party-individual.svg](icons/ch1-3/party-individual.svg) | party-individual: one person arguing both sides with himself | selected |
| `party-talmud` | [icons/ch1-3/party-talmud.svg](icons/ch1-3/party-talmud.svg) | party-talmud: the Talmud itself, asking and answering | selected |
| `perceptible-form` | [icons/ch11-subjects/perceptible-form.svg](icons/ch11-subjects/perceptible-form.svg) | Perceptible form: the shape seen by the eye | selected |
| `potential` | [icons/ch8/potential.svg](icons/ch8/potential.svg) | potential: said of what can, not of what does: eligible, able (בכח) | selected |
| `preclusive` | [icons/ch1-3/preclusive.svg](icons/ch1-3/preclusive.svg) | preclusive: not this, but rather that (לא... אלא) | selected |
| `predicate` | [icons/ch1-3/predicate.svg](icons/ch1-3/predicate.svg) | Predicate / נשוא | selected |
| `premise` | [icons/ch4-7/premise.svg](icons/ch4-7/premise.svg) | Premise / הקדמה | selected |
| `presumption` | [icons/ch9-subtypes/presumption.svg](icons/ch9-subtypes/presumption.svg) | Ukimta: specifying the case / אוקימתא | selected |
| `priority-conceptual` | [icons/ch11-priority/priority-conceptual.svg](icons/ch11-priority/priority-conceptual.svg) | Priority in rank / שכלי | selected |
| `priority-natural` | [icons/ch11-priority/priority-natural.svg](icons/ch11-priority/priority-natural.svg) | Priority by dependence / טבעי | selected |
| `priority-temporal` | [icons/ch11-priority/priority-temporal.svg](icons/ch11-priority/priority-temporal.svg) | Temporal priority / זמני | selected |
| `proof` | [icons/ch9-moves/proof.svg](icons/ch9-moves/proof.svg) | proof , backs it up | selected |
| `qualified-certain` | [icons/ch1-3/qualified-certain.svg](icons/ch1-3/qualified-certain.svg) | qualified-certain: said as certain or necessary (ודאות / הכרח) | selected |
| `qualified-doubtful` | [icons/ch1-3/qualified-doubtful.svg](icons/ch1-3/qualified-doubtful.svg) | qualified-doubtful: said as doubtful (ספק) | selected |
| `qualified-impossible` | [icons/ch1-3/qualified-impossible.svg](icons/ch1-3/qualified-impossible.svg) | qualified-impossible: said as impossible (אי אפשר) | selected |
| `qualified-possible` | [icons/ch1-3/qualified-possible.svg](icons/ch1-3/qualified-possible.svg) | qualified-possible: said as possible (אפשר) | selected |
| `query` | [icons/ch9-subtypes/query.svg](icons/ch9-subtypes/query.svg) | Query / שאלה | selected |
| `question` | [icons/ch9-moves/question.svg](icons/ch9-moves/question.svg) | question , someone asks | selected |
| `question-of-principle` | [icons/ch9-subtypes/question-of-principle.svg](icons/ch9-subtypes/question-of-principle.svg) | Two-sided question / אבעיא | selected |
| `rebuttal-just-the-opposite` | [icons/ch8/rebuttal-just-the-opposite.svg](icons/ch8/rebuttal-just-the-opposite.svg) | rebuttal-just-the-opposite: the difficulty is thrown back at the dissenting view (אדרבא) | selected |
| `rebuttal-proves-my-point` | [icons/ch8/rebuttal-proves-my-point.svg](icons/ch8/rebuttal-proves-my-point.svg) | rebuttal-proves-my-point: your disproof text proves my view (משם ראיה / היא הנותנת) | selected |
| `rebuttal-your-reasoning` | [icons/ch8/rebuttal-your-reasoning.svg](icons/ch8/rebuttal-your-reasoning.svg) | rebuttal-your-reasoning: the same difficulty hits your view too, forcing a distinction that saves both (ולטעמיך) | selected |
| `redundant-part` | [icons/ch8/redundant-part.svg](icons/ch8/redundant-part.svg) | redundant-part: a part of the statement repeats another (הא תו למה לי) | selected |
| `refutation` | [icons/ch9-subtypes/refutation.svg](icons/ch9-subtypes/refutation.svg) | Refutation / תיובתא | review |
| `reported-information` | [icons/ch9-subtypes/reported-information.svg](icons/ch9-subtypes/reported-information.svg) | Reported information / הגדה | selected |
| `resolution` | [icons/ch9-moves/resolution.svg](icons/ch9-moves/resolution.svg) | resolution , clears the problem | selected |
| `self-contradictory` | [icons/ch8/self-contradictory.svg](icons/ch8/self-contradictory.svg) | self-contradictory: the statement's own words disagree with each other (הא גופא קשיא) | selected |
| `settlement` | [icons/ch9-subtypes/settlement.svg](icons/ch9-subtypes/settlement.svg) | Settlement: lightbulb with a continuous bridge and check | selected |
| `simple` | [icons/ch1-3/simple.svg](icons/ch1-3/simple.svg) | simple: plainly says something about something: the statement shape itself (סתם) | selected |
| `statement` | [icons/ch9-moves/statement.svg](icons/ch9-moves/statement.svg) | statement , someone speaks | selected |
| `statement-commitment` | [icons/ch4-7/statement-commitment.svg](icons/ch4-7/statement-commitment.svg) | Statement commitment / סוף גזרתו | review |
| `statement-tile` | [icons/ch4-7/statement-tile.svg](icons/ch4-7/statement-tile.svg) | statement-tile: one statement: a subject cell, a seam that says is, a predicate cell | selected |
| `study-arrangement` | [icons/ch11-order/study-arrangement.svg](icons/ch11-order/study-arrangement.svg) | Arrangement / סדור | selected |
| `study-definitions` | [icons/ch11-order/study-definitions.svg](icons/ch11-order/study-definitions.svg) | Definitions / גדרים | selected |
| `study-division` | [icons/ch11-order/study-division.svg](icons/ch11-order/study-division.svg) | Division / analysis / חלוק | selected |
| `study-order` | [icons/ch11-order/study-order.svg](icons/ch11-order/study-order.svg) | Order / סדר | selected |
| `subject-action` | [icons/ch11-subjects/subject-action.svg](icons/ch11-subjects/subject-action.svg) | Action: the subject acts upon something else | selected |
| `subject-action-natural` | [icons/ch11-subjects/subject-action-natural.svg](icons/ch11-subjects/subject-action-natural.svg) | Natural action / פעלה טבעית | selected |
| `subject-action-voluntary` | [icons/ch11-subjects/subject-action-voluntary.svg](icons/ch11-subjects/subject-action-voluntary.svg) | Voluntary action / פעלה רצונית | selected |
| `subject-attribute` | [icons/ch11-subjects/subject-attribute.svg](icons/ch11-subjects/subject-attribute.svg) | Attribute: what accompanies a subject beyond its essence | selected |
| `subject-bearer` | [icons/ch11-subjects/subject-bearer.svg](icons/ch11-subjects/subject-bearer.svg) | Subject / נושא | selected |
| `subject-being-affected` | [icons/ch11-subjects/subject-being-affected.svg](icons/ch11-subjects/subject-being-affected.svg) | Being affected: an effect received from another thing | selected |
| `subject-cause` | [icons/ch11-subjects/subject-cause.svg](icons/ch11-subjects/subject-cause.svg) | Cause: what brings the effect into being | selected |
| `subject-cause-effective` | [icons/ch11-subjects/subject-cause-effective.svg](icons/ch11-subjects/subject-cause-effective.svg) | Effective cause / סבה פועלת | selected |
| `subject-cause-generative` | [icons/ch11-subjects/subject-cause-generative.svg](icons/ch11-subjects/subject-cause-generative.svg) | Generative cause / סבה מולדת | selected |
| `subject-difference` | [icons/ch11-subjects/subject-difference.svg](icons/ch11-subjects/subject-difference.svg) | Difference / הבדל | selected |
| `subject-material` | [icons/ch11-subjects/subject-material.svg](icons/ch11-subjects/subject-material.svg) | Material: what the subject is made from | selected |
| `subject-means` | [icons/ch11-subjects/subject-means.svg](icons/ch11-subjects/subject-means.svg) | Means: that through which a cause acts | selected |
| `subject-motive` | [icons/ch11-subjects/subject-motive.svg](icons/ch11-subjects/subject-motive.svg) | Motive: what prompts a voluntary agent to act | selected |
| `subject-movement` | [icons/ch11-subjects/subject-movement.svg](icons/ch11-subjects/subject-movement.svg) | Movement | selected |
| `subject-opposition` | [icons/ch11-subjects/subject-opposition.svg](icons/ch11-subjects/subject-opposition.svg) | Opposition / נגוד | selected |
| `subject-orientation` | [icons/ch11-subjects/subject-orientation.svg](icons/ch11-subjects/subject-orientation.svg) | Orientation / posture | selected |
| `subject-parts` | [icons/ch11-subjects/subject-parts.svg](icons/ch11-subjects/subject-parts.svg) | Parts: the constituents of a subject | selected |
| `subject-place` | [icons/ch11-subjects/subject-place.svg](icons/ch11-subjects/subject-place.svg) | Place: where the subject is | selected |
| `subject-purpose` | [icons/ch11-subjects/subject-purpose.svg](icons/ch11-subjects/subject-purpose.svg) | Purpose: the end an agent intends to achieve | selected |
| `subject-quality` | [icons/ch11-subjects/subject-quality.svg](icons/ch11-subjects/subject-quality.svg) | Quality: the subject’s characteristics or condition | selected |
| `subject-quantity` | [icons/ch11-subjects/subject-quantity.svg](icons/ch11-subjects/subject-quantity.svg) | Quantity: measurement or number | selected |
| `subject-relation` | [icons/ch11-subjects/subject-relation.svg](icons/ch11-subjects/subject-relation.svg) | Relation / יחס | selected |
| `subject-result` | [icons/ch11-subjects/subject-result.svg](icons/ch11-subjects/subject-result.svg) | Result: the effect that comes from a cause | selected |
| `subject-similarity` | [icons/ch11-subjects/subject-similarity.svg](icons/ch11-subjects/subject-similarity.svg) | Similarity / דמיון | selected |
| `subject-time` | [icons/ch11-subjects/subject-time.svg](icons/ch11-subjects/subject-time.svg) | Time: when the subject or event is considered | selected |
| `syllogism` | [icons/ch4-7/syllogism.svg](icons/ch4-7/syllogism.svg) | syllogism: premises added up give a conclusion (הקש) | selected |
| `synonymous-terms` | [icons/ch4-7/synonymous-terms.svg](icons/ch4-7/synonymous-terms.svg) | Synonymous terms / שמות נרדפים | review |
| `theory` | [icons/ch8/theory.svg](icons/ch8/theory.svg) | theory: a theory inclines the mind, it does not prove (סברא) | selected |
| `unqualified` | [icons/ch1-3/unqualified.svg](icons/ch1-3/unqualified.svg) | unqualified: about all of them, though 'all' is not said (סתמי) | selected |
| `validation` | [icons/ch9-subtypes/validation.svg](icons/ch9-subtypes/validation.svg) | Validation: two facing thumbs up | selected |
| `variant` | [icons/ch4-7/variant.svg](icons/ch4-7/variant.svg) | variant: same subject, different predicates: one box, two arrows out (מתחלפים) | selected |
| `variant-subjects` | [icons/ch4-7/variant-subjects.svg](icons/ch4-7/variant-subjects.svg) | variant-subjects: same predicate, different subjects: two boxes, one arrow out (מתחלפים) | selected |
| `via-opposite` | [icons/ch8/via-opposite.svg](icons/ch8/via-opposite.svg) | via-opposite: the opposite is false, so this is true; or the opposite is proved, so this is false (הפך) | selected |

Retained alternative: [subject-square-triangle.svg](alternates/subject/subject-square-triangle.svg), alternative for `subject-bearer`, excluded from the default 159-key registry.

<a id="reference-section-28"></a>

## 26. Full statement-commitment mapping and source passages

### What each statement commits to: סוף גזרתו

**Dedicated icon:** [statement-commitment.svg](icons/ch4-7/statement-commitment.svg). Four focusing corners enclose the entire violet statement tile. It marks the precise asserted content, which may be a dependence or several constituent assertions.

Source: supplied Derech Tevunos, Hebrew pp.75–89 / English pp.76–90.

עוד צריך שתתדקדק בכל מאמר שיהיה, לדעת סוף גזרתו, שבה תהיה תלויה אמתת המאמר או כזבו, וזה יתחלף לפי התחלף המינים שזכרנו למעלה.

Examine each statement carefully to identify its ultimate assertion, on which its truth or falsity depends. This varies with the statement types discussed earlier.

| Form | What it asserts | Challenge target | Source (Hebrew) |
|---|---|---|---|
| Simple / סתם | The predication or denial actually expressed. | Challenge that predication or denial. | 77 |
| Qualified / מיחד | The content in the exact stated mode: certainty, necessity, possibility, doubt or impossibility. | Challenge the claimed mode as well as the content. | 77 |
| Exclusion / ממעט | The predicate applies here alone within the relevant range. | Challenge the predication or the claim of exclusiveness. | 77 |
| Exception / מוציא | A general predication, plus its denial of specified members of the subject class. | Distinguish the general assertion from the exception. | 79 |
| Conditional / restricted / מגבל | An underlying assertion together with a stated restriction or stipulation. | Distinguish the underlying assertion from the restriction. | 81 |
| Hypothetical / תלוי | The dependence of the consequent on the antecedent. | Challenge the asserted dependence. | 81, 83 |
| Compound / מרכב / מרבה־הענינים | Every constituent predication that the sentence actually puts forward. | Identify which constituent assertion or offered option fails. | 85 |
| Preclusive / בשלילת / לא…אלא | The rejection and the replacement predication, as stated. | Check both the rejected and the asserted sides. | 87 |
| Discrepancy / מכחיש | The constituent predications together with the stated “despite” relationship. | Check each predication and the contrast asserted between them. | 87 |
| Comparative / מדמה | The matters being compared and their stated likeness in the relevant respect. | Check the base case, the compared case and the claimed likeness. | 87 |
| Consequent statement / נמשך | Three commitments: the antecedent, the consequent, and their dependence, each as stated. | Any of the three commitments can be challenged. | 87 |

#### Simple

כי הנה המאמר הסתמי סוף גזרתו הוא המצא הנשוא ההוא בנושא שיאמרהו בו או העדר ממנו.

A simple statement ultimately asserts that its predicate is present in, or absent from, the subject of which it is stated.

**Use and limits:** This is the Simple mode from Chapter 3, not the separate Unqualified scope badge. Chapter 6 calls it הסתמי.

#### Qualified

אך המאמר המיחד שזכרנו, שהוא האומר הנשוא בנושא בדרך מיחד, הנה סוף גזרתו הוא המצא הנשוא ההוא באותו הנושא באותו הדרך, ואלו ימצא הנשוא בנושא אך לא באותו הדרך – לא יהיה המאמר צודק.

A qualified statement asserts the predicate of its subject in a particular mode. Even if the predicate applies, but not in the stated mode, the statement is not correct.

**Use and limits:** Frequent occurrence does not establish certainty. A possibility claim is assessed as possibility; it does not by itself assert actual occurrence. The four existing modal icons represent this family.

#### Exclusion

המאמר הממעט, שאומר נשוא בנושא ושוללו מכל זולתו, סוף גזרתו הוא, שבאותו הדבר לבדו נמצא אותו הענין, ואלו היה נמצא בזולתו – לא היה צודק.

An exclusion statement applies a predicate to a subject and denies it of everything else. Its assertion is that the predicate belongs to that subject alone; if it also belongs elsewhere, the statement is not correct.

**Use and limits:** Finding the predicate elsewhere defeats “only here,” even if it also applies here.

#### Exception

המאמר המוציא, שמוציא קצת מן הנכללים בנושא מן הנשוא, גזרותיו שתים: אחת – שבנושא ההוא נמצא הנשוא ההוא. שניה – שאותם המוצאים, אף על פי שהם מן הנושא ההוא, אין בהם הנשוא ההוא. ואם ימצא גם במוצאים, הנה לא יהיה כל המאמר כוזב, אלא הגזרה השניה תהיה כוזבת, והראשונה – צודקת.

An exception statement has two assertions: the predicate applies generally to the subject, and specified members of that subject class lack it. If the predicate also applies to those excluded members, the second assertion is false while the first remains correct.

**Use and limits:** If the excluded members also have the predicate, the exception can fail while the general assertion remains correct. The original wording still needs correction.

#### Conditional / restricted

וכן המאמר המגבל, אם יהיה הגבול בלתי צודק, לא מפני זה יהיה בלתי צודק כל המאמר, אלא הגזרה הראשונה – צודקת, והשניה – בלתי צודקת.

Likewise, in a restricted statement, an incorrect restriction does not make every part incorrect: the first assertion is correct, while the second is not.

**Use and limits:** An incorrect restriction need not invalidate the underlying assertion. This is distinct from the dependence-only Hypothetical form.

#### Hypothetical

והמאמר התלוי, שתולה מציאות ענין אחד במציאות ענין אחר, הנה אין סוף גזרתו שום אחד מן הענינים בפני עצמו, אך סוף גזרתו הוא היותם נתלים זה בזה, ואלו היו שני הענינים אמת כל אחד בפני עצמו, אך תליתם זה בזה בלתי צודקת – יהיה המאמר כוזב. ואלו היו הענינים בפני עצמם כוזבים ותליתם זה בזה אמת – יהיה המאמר אמתי.

A hypothetical statement asserts dependence between two matters, not either matter by itself. If both are independently true but their dependence is false, the statement is false. If both matters are false in themselves but the dependence is true, the statement is true.

**Use and limits:** Neither clause is thereby asserted to occur. Two independently true clauses do not establish a true dependence; neither clause occurring does not by itself refute the dependence.

#### Compound

אך המאמר המרכב, שמקבץ נשואים רבים בנושא אחד או נושאים רבים לנשוא אחד, הנה סוף גזרתו, שכל אותם הנשואים הם באותו הנושא, או בכל אותם הנושאים יהיה אותו הנשוא, ועל כן לשיהיה צודק, צריך שכלם יהיו אמת.

A compound statement gathers several predicates in one subject, or several subjects under one predicate. It asserts all those predications; for the statement to be correct, each must be true.

**Use and limits:** In Ramchal’s “either chalitzah or yibbum” example, both routes must be available as offered. He is not requiring both to be performed, or giving a blanket truth table for every “or.”

#### Preclusive

ועל דרך זה שלשה המינים, השמיני, התשיעי והעשירי, שכלם מקבצים ענינים הרבה כאחד להיות המאמר צודק, צריך שכל אותם הענינים יהיו כמו שנאמרים במאמר.

The eighth, ninth and tenth types likewise combine several matters. For the statement to be correct, all those matters must be as the statement asserts them.

**Use and limits:** Use the wording to identify what is excluded. This is a statement form, not the discussion move of refuting someone.

#### Discrepancy

ועל דרך זה שלשה המינים, השמיני, התשיעי והעשירי, שכלם מקבצים ענינים הרבה כאחד להיות המאמר צודק, צריך שכל אותם הענינים יהיו כמו שנאמרים במאמר.

The eighth, ninth and tenth types likewise combine several matters. For the statement to be correct, all those matters must be as the statement asserts them.

**Use and limits:** An apparent tension does not mean an actual logical contradiction is being affirmed.

#### Comparative

ועל דרך זה שלשה המינים, השמיני, התשיעי והעשירי, שכלם מקבצים ענינים הרבה כאחד להיות המאמר צודק, צריך שכל אותם הענינים יהיו כמו שנאמרים במאמר.

The eighth, ninth and tenth types likewise combine several matters. For the statement to be correct, all those matters must be as the statement asserts them.

**Use and limits:** A comparison does not assert that the cases are identical in every respect.

#### Consequent statement

אך המין האחד־עשר, שהוא שיאמר בו ענין נמשך מענין אחר, הנה גזרותיו שלש: המצא הקודם, והמצא הנמשך, והיות מציאות הנמשך המשך ממציאות הקודם. ותראה, שבזה יבדל המין הזה מן המאמר התלוי, כי בתלוי אין הגזרה על מציאות שום אחד מן הענינים אלא על התלותם לבד, אך זה גוזר מציאות שני הענינים וגוזר התלותם זה בזה.

The eleventh type states one matter as following from another. It makes three assertions: the antecedent, the consequent, and the consequent’s dependence on the antecedent. This differs from a hypothetical statement, which asserts only the dependence; this type asserts both matters and their dependence.

**Use and limits:** Unlike Hypothetical, this asserts the clauses as well as the dependence. These can themselves express rules or conditions; this is not restricted to two past events.

#### A stipulation can fail without defeating the base assertion

דרך משל (דמאי פ״ג מ״ג): "ומחללים אותו כסף על כסף – ובלבד שיחזר ויפדה את הפרות", אלו לא היה זה התנאי אמתי ולא היה זה החיוב, אף על פי כן היתה אמתית הגזרה הראשונה "מחללים אותו כסף על כסף".

For example: “One may exchange that money, silver for silver, provided that one returns and redeems the fruit.” If that condition were not correct and that obligation did not exist, the first assertion, permitting the exchange, would nevertheless be true.

**Component analysis:** Underlying assertion: The exchange is permitted.; Stipulation: Returning and redeeming the fruit is required.

**What fails:** Ramchal asks us to suppose the stipulation is not required. That defeats the added restriction, while the permission can remain correct. This is a hypothetical test of the statement, not a new ruling about the example.

**Citation note:** The supplied Hebrew cites Demai 3:3; the English cites 1:2. Both citations are preserved on the source pages.

#### True clauses do not establish a true dependence

והפך זה, אם יהיו הענינים אמת ותליתם זה בזה שקר – יהיה המאמר כוזב. דרך משל, אם תאמר: אם משה קבל את התורה – שאול הוא המלך הראשון שמלך על ישראל! הנה שני הענינים אמתיים כל אחד בפני עצמו, אך אינם תלויים זה בזה כלל, והמאמר הזה שתולה אותם זה בזה הוא בלתי צודק.

Conversely, if the matters are true but their dependence is false, the statement is false. For example: “If Moshe received the Torah, Shaul is the first king who ruled over Israel.” Each matter is independently true, but they do not depend on each other, so the statement asserting that dependence is incorrect.

**Component analysis:** First clause: Moshe received the Torah.; Second clause: Shaul was the first king of Israel.; Claimed dependence: The second follows from the first.

**What fails:** The clauses’ separate truth does not validate the hypothetical. Ramchal rejects the asserted dependence. Do not replace this analysis with a material-implication truth table.

**Citation note:** The whole Hypothetical icon is used here. The separate Antecedent and Consequent clause icons remain scoped to their documented hypothetical context.

#### An offered choice commits to the availability of both routes

דרך משל, כשאמר (יבמות קי״ג ב׳): "או חולץ או מיבם", אם האמת היה שחולץ ולא מיבם, הנה המאמר היה בלתי צודק, אף על פי שחלק ממנו שהוא חולץ היה צודק.

For example: “He may either perform chalitzah or enter levirate marriage.” If the truth were that he may perform chalitzah but not levirate marriage, the statement would be incorrect, even though its chalitzah component was correct.

**Component analysis:** Offered route A: Chalitzah is available.; Offered route B: Yibbum is available.

**What fails:** If only chalitzah is available, the statement offering either route is incorrect as stated. Its true component survives; the offered choice does not. Availability of both options is different from performing both.

**Citation note:** Hebrew Chapter 6 cites Yevamot 113b; its English cites 112b. Chapter 3’s Hebrew also cites 112b. These source differences are retained, not silently corrected.
