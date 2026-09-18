# Derech Tevunos Icon Reference V2

Current icon set, 18 September 2026.

This reference documents the latest working selections for the Ramchal's *Derech Tevunos* icon project. It covers the original vocabulary, the additions made in this conversation, the exact selected versions, their conceptual hierarchy, and the rules for using them.

The ZIP contains **121 standalone SVG icons and this reference file**. Each icon key has one current file. The package is ready to use directly: `icons/` is the authoritative asset directory.

There are **39 additions to the original 82-file base set**: seven Chapter 9 subtype icons, two Chapter 10 compositions, twenty-seven Chapter 11 subject-analysis icons, and three priority icons. Some existing base icons were refined, and Different Places and Different Times received the selected paired designs. Those changes replace existing files; they do not increase the count.

## Contents

1. [Package inventory](#1-package-inventory)
2. [Hierarchy and placement](#2-hierarchy-and-placement)
3. [Current selection rules](#3-current-selection-rules)
4. [Visual grammar and implementation](#4-visual-grammar-and-implementation)
5. [Chapter 9 subtype additions](#5-chapter-9-subtype-additions)
6. [Chapter 10 reported-move compositions](#6-chapter-10-reported-move-compositions)
7. [Chapter 11 subject analysis](#7-chapter-11-subject-analysis)
8. [Three kinds of priority](#8-three-kinds-of-priority)
9. [Existing icons revised in this work](#9-existing-icons-revised-in-this-work)
10. [Complete base-icon catalog](#10-complete-base-icon-catalog)
11. [Usage and source fidelity](#11-usage-and-source-fidelity)

## 1. Package inventory

| Directory | SVG count | Meaning |
|---|---:|---|
| `icons/ch1-3/` | 24 | Participants and the anatomy of a statement |
| `icons/ch4-7/` | 32 | Relations, implications, figurative meaning, deductions, and deduction failures |
| `icons/ch8/` | 19 | Grounds, strength of support, rebuttals, presentation problems, potential and actual |
| `icons/ch9-moves/` | 7 | The seven principal discussion moves |
| `icons/ch9-subtypes/` | 7 | Selected specific forms of Proof, Contradiction, Difficulty, and Resolution |
| `icons/ch10-composites/` | 2 | Reported information functioning as proof or difficulty |
| `icons/ch11-subjects/` | 27 | The twenty-four numbered distinctions and represented branches |
| `icons/ch11-priority/` | 3 | Temporal, intellectual/rank, and natural/dependence priority |
| **Total** | **121** | **Current standalone assets** |

All file paths below are relative to the extracted package root. Stable identifiers are filename stems. For example, `subject-place` resolves to `icons/ch11-subjects/subject-place.svg`.

Asset counts, conceptual nodes, and hierarchy levels are different counts. One icon can serve more than one conceptual node. A node can also have a shared parent icon and a text label rather than a dedicated drawing.

## 2. Hierarchy and placement

### 2.1 The seven moves and their subtypes

Source: Hebrew pp.161–187; English pp.162–188. Earlier introductory enumeration: Hebrew p.13; English p.14.

| Principal move | Immediate subtypes | Further subdivision |
|---|---|---|
| Statement, מימרא | First-hand knowledge; Explanation; Inference; Reported information | Explanation: Full explanation, Forced explanation, Presumption/אוקימתא |
| Question, שאלה | Query; Question of principle/אבעיא | None added here |
| Answer, תשובה | Answer to a query; Determination/פשיטות | None added here |
| Proof, ראיה | Demonstration/הוכחה; Validation/סיעתא | None added here |
| Contradiction, סתירה | Direct contradiction/סתירה; Opposition/דחיה | None added here |
| Difficulty, קשיא | Objection/פרכא; Apparent contradiction/רמיא; Refutation/תיובתא | None added here |
| Resolution, תרוץ | Settlement/ישוב; Alternative/שנוי | None added here |

This is **seven principal categories, seventeen immediate subtypes, and nineteen terminal labels when the Explanation branch is expanded**. Nineteen does not mean nineteen principal categories.

The seven new subtype SVGs cover Demonstration, Validation, Opposition, Objection, Apparent contradiction, Settlement, and Alternative. Direct contradiction uses the existing category red-X icon. A subtype without its own selected SVG uses the relevant principal-move icon with a text label. Preserve the subtype in data and text even when the picture is shared.

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

### 4.3 Display

Use text labels alongside small icons. The set has been inspected at small display sizes, typically 20, 24, 32, and 48 pixels, and at larger review sizes. This is rendering review, not a learner-recognition study. Prefer at least 24–32 pixels when the internal distinction matters. Preserve the wider aspect ratio of the three inference badges.

Each asset includes an accessible label and title; newer additions also include a description. An ordinary image element can be used directly:

```html
<img src="icons/ch9-subtypes/demonstration.svg"
     width="32" height="32" alt="Demonstration: הוכחה">
```

If SVG markup is embedded repeatedly, prefix internal IDs for **every occurrence**, including gradient, clipping, title, and description IDs and their references. Reusing a gradient ID across several copies can produce incorrect rendering. The explanatory guide used this occurrence-level prefixing to eliminate the earlier missing-icon problems.

## 5. Chapter 9 subtype additions

The seven detailed entries below are the new files in `icons/ch9-subtypes/`. Direct contradiction remains a reuse of `icons/ch9-moves/contradiction.svg`.
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

## 7. Chapter 11 subject analysis

The numbered list has twenty-four distinctions. The twenty-seven SVGs also preserve Attribute’s three child drawings. Form has a parent concept and two branches: Essential Form reuses Essence; Perceptible Form has its own drawing. Natural/Voluntary Action and Generative/Effective Cause use their parent icons with text labels.

These badges describe the aspect under examination. A statement can address more than one aspect, such as the number of parts. Do not force each entire statement into exactly one mutually exclusive bucket.

### 7.1 Numbered coverage and asset mapping

| No. | Distinction | Current key or mapping |
|---|---|---|
| 1 | Essence / definition | `essence-definition` |
| 2 | Parts | `subject-parts` |
| 3 | Quality | `subject-quality` |
| 4 | Quantity | `subject-quantity` |
| 5 | Material | `subject-material` |
| 6 | Form | `Essential → essence-definition; perceptible → perceptible-form` |
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

**Use and limits:** Reuse this drawing for Essential Form under distinction 6. A color, temporary condition, or accidental characteristic does not by itself define the subject. The framed whole does not imply that essence is a physical shape.

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

### `perceptible-form`: Perceptible form / צורה מרגשת

**File:** [icons/ch11-subjects/perceptible-form.svg](icons/ch11-subjects/perceptible-form.svg)

**Hierarchy:** Chapter 11 / distinction 6 of 24 / Form / Perceptible branch

**Source:** Hebrew pp. 225; English pp. 226.

**Ramchal’s wording:**

המרגשת היא תבנית הנושא כמו שיראוהו העינים.

**Meaning:** The visible outline or shape of the subject as perceived by the eyes.

**Current visual:** Chapter 11, English p226, Hebrew p225. The unpatterned contour of the same block used for Material focuses on visible shape. This is only the perceptible branch of Form. Essential Form is identified with essence in the text and reuses the existing Essence icon.

**Source example:** An open-ended box and an angular form.

**Use and limits:** This is one branch of Form. The other branch, Essential Form/עצמית, is the essence grasped intellectually and reuses essence-definition. A visible-outline icon must not stand for both branches without a label.

### `subject-action`: Action / פעלה

**File:** [icons/ch11-subjects/subject-action.svg](icons/ch11-subjects/subject-action.svg)

**Hierarchy:** Chapter 11 / distinction 7 of 24

**Source:** Hebrew pp. 225; English pp. 226.

**Ramchal’s wording:**

הבחנה שביעית – הפעלה, והיא מה שהוא פועל בזולתו,

**Meaning:** The subject acts on something else. Ramchal divides Action into natural/טבעית and voluntary/רצונית.

**Current visual:** Chapter 11, English p226, Hebrew p225. An arrow leads from the larger subject block toward another thing. Ramchal distinguishes natural action from action chosen by a human agent. The arrow marks acting on another, not merely movement, logical entailment, or the subject’s capacity to act.

**Source example:** A natural effect on the intestines; a person reciting the Shema as a voluntary act.

**Use and limits:** Both branches use this icon with a subtype label. Natural includes what things do by their nature, not merely an unwilling person’s act. The arrow represents acting on another, not logical entailment or spatial movement.

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

**Current visual:** Chapter 11, English p230, Hebrew p229. A producing mechanism directs an arrow outward. The gear is a mnemonic for bringing about an effect, including both generative and effective causes, not a restriction to mechanical causes. The two causal types retain explicit text labels.

**Source example:** Tree and fruit, father and child, and a craftsperson producing utensils.

**Use and limits:** Both branches use this icon with subtype text. The gear is a mnemonic for production; it does not restrict causation to machinery. A thing’s causal role depends on the explanatory relation being considered.

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

**Current visual:** Chapter 11, English p232, Hebrew p231. An arrow leads to a produced object. The cube stands for an effect, which can also be an event, motion, or living offspring. This is what follows from the cause, not necessarily what an agent intended or merely a changed recipient.

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

**Current visual:** Chapter 11 distinction 21. A solid square and a solid triangle stand above a baseline, reusing the subject glyphs from the statement-relation icons. The question is what subject bears a given attribute. The two shapes represent possible subjects, not a requirement that there be two bearers.

**Use and limits:** Given an attribute, seek what bears it. This differs from defining the subject’s essence and from identifying the Statement discussion move.

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

## 10. Complete base-icon catalog

The following catalog accounts for all 82 inherited keys. It records their current semantic role; the added 39 files are documented individually above. Source numbers refer to printed pages in the supplied bilingual edition. English pages are even and the corresponding Hebrew pages are normally immediately preceding odd pages.

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
| [`qualified-certain`](icons/ch1-3/qualified-certain.svg) | said as certain (ודאי) |
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
| [`obverse`](icons/ch4-7/obverse.svg) | both terms replaced by their opposites: the same statement, in negative (מתהפכים) |
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
| [`absolute-opposite`](icons/ch4-7/absolute-opposite.svg) | An opposite inferred from a partial statement in the chapter’s contextual reading. This is not an unrestricted logical entailment from “some are” to “some are not.”. This records the chapter’s reading of a partial statement in context. “Some P are Q” does not, as bare formal logic, entail “some P are not Q.” Do not use the badge as an unrestricted logical rule. |

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
| [`classical-syllogism`](icons/ch4-7/classical-syllogism.svg) | true of the whole kind, so true of this member (הקש מופתי) |
| [`analogism`](icons/ch4-7/analogism.svg) | found in this one, so also in that similar one (בנין אב / מה מצינו) |
| [`a-fortiori`](icons/ch4-7/a-fortiori.svg) | if the light case, then surely the heavy one (קל וחומר) |
| [`hypothetical-syllogism`](icons/ch4-7/hypothetical-syllogism.svg) | this is now established, so that follows (הקש תלוי) |
| [`hypothetical-syllogism-tollens`](icons/ch4-7/hypothetical-syllogism-tollens.svg) | Given a valid dependency, denying the consequent excludes the antecedent. The backward arrow marks the direction of inference. |
| [`disjunctive-syllogism`](icons/ch4-7/disjunctive-syllogism.svg) | not that one, so it must be this one (הקש מחלק) |

### Why a deduction fails

Chapter 7. Specific failure modes in a challenged deduction.

Placement: Badge on a challenge to a proof. English pp. 94, 96, 100, 102, 104; Hebrew pp. 93, 95, 99, 101, 103.

| Icon | Current meaning |
|---|---|
| [`fallacy-not-included`](icons/ch4-7/fallacy-not-included.svg) | this member is not in the kind after all (Shabbos 70a, 43b) |
| [`fallacy-not-similar`](icons/ch4-7/fallacy-not-similar.svg) | the two cases are not alike after all (מה ל... שכן...) |
| [`fallacy-not-greater`](icons/ch4-7/fallacy-not-greater.svg) | which case is the heavier one is not settled |
| [`fallacy-counterexample`](icons/ch4-7/fallacy-counterexample.svg) | another case just as similar lacks it |

### Grounds of support

Chapter 8. Four immediate sources of certainty plus support obtained by deduction. These can ground proof or disproof as the text permits.

Placement: Ground on a proof or disproof connection. English pp. 112, 114, 116; Hebrew pp. 111, 113, 115.

| Icon | Current meaning |
|---|---|
| [`ground-axiom`](icons/ch8/ground-axiom.svg) | the mind dictates it, no training needed (מושכלות ראשונים) |
| [`ground-sense`](icons/ch8/ground-sense.svg) | the senses testify to it (מוחשות) |
| [`ground-common-sense`](icons/ch8/ground-common-sense.svg) | Commonly accepted opinions, המפורסמות. This does not mean whatever the individual reader finds obvious. The project’s label means the text’s commonly accepted opinions. It is not a license to substitute whatever feels obvious to the reader. |
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

## 11. Usage and source fidelity

### 11.1 Preserve the target of a move

A proof may concern a statement; a difficulty may challenge that proof rather than the statement itself. Rejection of an argument does not automatically reject its conclusion. Display the actual target of the connector. When a statement has several relevant parts, identify the part under attack rather than marking the entire row indiscriminately.

### 11.2 Keep shared pictures and text distinctions together

| Concept without an additional selected file | Use |
|---|---|
| Direct contradiction | `contradiction` plus the subtype label |
| Essential Form | `essence-definition` plus the Form/Essential context |
| Natural and Voluntary Action | `subject-action` plus the respective subtype label |
| Generative and Effective Cause | `subject-cause` plus the respective subtype label |
| Refutation/תיובתא | `difficulty` plus its subtype label |
| Statement subtypes without a dedicated selected picture | `statement` plus the subtype label; retain the Explanation hierarchy |
| Query / Question of principle | `question` plus the specific label |
| Answer to a query / Determination | `answer` plus the specific label |

The needed inference and relation badges can be combined with these move labels. For example, a Chapter 9 Inference row can use the Statement move with the relevant Chapter 5 inference annotation.

### 11.3 Definitions and examples

The source is the supplied `DerechTevunos_full_nonikud.md`, using its printed Hebrew and English page headings. Hebrew quotations in the detailed entries were checked against that supplied text after removing Markdown bold markers and normalizing whitespace. English meanings are explanations or translations; short descriptions of examples are labeled as such. They should not be presented as verbatim quotations from the supplied English edition.

For review cards, retain the chosen presentation order: Ramchal’s exact Hebrew definition first in the white area, then its English translation. A grey box contains an actual example he brings, with Hebrew first and translation after it. Where he only supplies a heading before examples, do not invent a definition. Where he gives no concrete example, do not invent a grey source box.

The Similarity quotation “דמיא לסאסאה” spans Hebrew pp.233 and 235; it is joined across the intervening English page. Source spellings such as “אדי ואדי” and source citation forms are preserved as supplied. Chapter 11 Opposition refers backward; the example reproduced in its entry is explicitly identified as Chapter 4, Hebrew p.51 / English p.52.

The supplied translation uses some labels differently from the clearer display labels here. Place corresponds to its “Position”; Orientation/posture to “Situation”; Being affected to “Affection”; Similarity to “Comparison”; Opposition/נגוד to “Contrast”; and Natural priority to “Logical Priority.” Keep the Hebrew term and chapter context attached when matching between versions.

### 11.4 Release boundaries

The set now covers the twenty-four numbered subject distinctions and the three senses of priority. The subsequent Order section does not yet have a selected icon family in this release. Counts here concern current standalone drawings, not every named concept or every application of an icon.

Use the current files linked in this reference as the export contract. Replacing a file should preserve its key unless its meaning changes. A different semantic role, such as דחיה versus נגוד, requires distinct keys even when English labels coincide.
