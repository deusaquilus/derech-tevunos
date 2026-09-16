# Derech Tevunos for AI Agents

**Ramchal's system for annotating dialectical text, restructured for classifiers.**

**What this is.** A functional bilingual reference to the system of *Derech Tevunos* (R. Moshe Chaim Luzzatto, *The Ways of Reason*), rewritten for an agent whose job is to take a passage — Talmudic or otherwise — segment it, normalize each utterance, and classify what it *is*, what it *does*, how it is *warranted*, and along which *distinction* it turns.

**Conventions.**
- `key` — stable ASCII id. The keys in §0 are the complete vocabulary; emit them exactly as written.
- `p`, `src ·` — page in the bilingual printed edition (English side; the Hebrew facing page is one less). Provenance only — nothing in this guide requires consulting it.
- Hebrew terms are unpointed, in common Talmud-study spelling. Recognizer phrases are in the form they appear in the Gemara.
- `he ·` Ramchal's own formulation, where it is short and sharper than paraphrase. `means ·` operational definition. `test ·` discriminating test against the nearest neighbors. `markers ·` stock phrases that announce the type. `ex ·` `cite — original — gloss`.
- `[supplied]` marks a definition, recognizer, or effect the book implies or omits and this document fills in, in Ramchal's style. Weight confidence accordingly.
- Both languages are given wherever a term or example is defined, so an agent can work from either and can match original-language surface forms.

**How to load.** §0 alone (~2.5K tokens) suffices to label with the enums. §1–§2 give the procedure and output shape. §3–§7 are the reference records. §8 lists gaps and aliases. §9 is a calibration set.

**Five layers, kept apart.** A sentence is annotated on independent layers; a label on one never implies a label on another.

| Layer | Question | Source | § |
|---|---|---|---|
| A · Move | What does this utterance *do* to an earlier one? | Ch 1, 2, 9, 10 | 3 |
| B · Form | What proposition *is* it, once normalized? | Ch 3, 5, 6 | 4 |
| C · Relation | How do two propositions stand to each other? | Ch 4 | 5 |
| D · Warrant | How is a proof or disproof *supposed to work*, and does it? | Ch 7, 8 | 6 |
| E · Axis | Along which distinction is a subject examined or split? | Ch 11 | 7 |

---

## §0 · Card

### A · Moves — the parts of a sugya (חלקי הסוגיות)

Seven elements, nineteen leaves. A key is `element/subtype`; emit the two halves as separate fields (`element: "difficulty", subtype: "objection"`). *Effect* = what a landed move does to its target; `open` acts on nothing.

| key | he | translit | en | effect | p |
|---|---|---|---|---|---|
| statement/firsthand | שמועה | shemuah | first-hand knowledge / received ruling | open | 162 |
| statement/explanation | פירוש מרווח | perush meruvach | full explanation | open | 164 |
| statement/forcedExplanation | פירוש דחוק | perush dachuk | forced explanation | unsettle [supplied] | 164 |
| statement/presumption | אוקימתא | okimta | presumption / case-restriction | unsettle [supplied] | 164 |
| statement/inference | דיוק | diyuk | inference | open | 166 |
| statement/reported | הגדה | haggadah | reported information | open | 166 |
| question/query | שאלה | she'elah | query | open | 168 |
| question/principle | איבעיא | ibbaya | question of principle | open | 170 |
| answer/answer | תשובה | teshuvah | answer | discharge | 172 |
| answer/determination | פשיטות | peshitut | determination | discharge | 172 |
| proof/demonstration | הוכחה | hochachah | demonstration | raise | 174 |
| proof/validation | סייעתא | siyata | validation / support | raise | 176 |
| contradiction/direct | סתירה | setirah | direct contradiction | reject | 178 |
| contradiction/opposition | דחיה | dechiyah | opposition / deflection | unsettle | 178 |
| difficulty/objection | פירכא | pircha | objection (formal) | unsettle | 180 |
| difficulty/apparentContradiction | רומיא | rumya | apparent contradiction | unsettle | 182 |
| difficulty/refutation | תיובתא | teyuvta | refutation | reject [supplied] | 184 |
| resolution/settlement | יישוב | yishuv | settlement | discharge | 184 |
| resolution/alternative | שינוי | shinui | alternative / deflecting answer | unsettle | 186 |

Label attacks by outcome, not by opening word: `מיתיבי` / `תא שמע` / `והא תניא` introduce a source-based attack — a סתירה (source shows falsity) or רומיא (sources set against each other) if it is then answered; `difficulty/refutation` only when the Gemara closes with `תיובתא`.

Composites (Ch 10, p214): `composite/ascribed-proof` — an הגדה carrying an הוכחה; `composite/ascribed-difficulty` (קושיא מגדת) — an הגדה carrying a קושיא. Parties (Ch 1, p10): `party-group` many speakers; `party-individual` one speaker on both sides (הוא מותיב לה והוא מפרק לה); `party-talmud` the anonymous voice.

### B · Form — one normalized proposition

Every utterance reduces to **subject** (נושא) + **predicate** (נשוא) + **manner of predication**.

Quantity of subject (p22–24): `categorical` כולל · `particular` פרטי (one individual) · `partial` קצתי (some of a class) · `unqualified` סתמי (no quantifier — **read as categorical**).

Manner of predication, eleven (p26–40), with truth conditions from Ch 6 (p78–90) as an *intention count*:

| # | key | he · marker | en | intentions |
|---|---|---|---|---|
| 1 | simple | סתם | simple | 1 |
| 2 | qualified-{certain,possible,doubtful,impossible} | מיוחד ומוגבל · ודאי / אפשר / ספק / לא אפשר | qualified | 1 — P in S *in that mode* |
| 3 | exclusion | ממעט · לבדו, אין … אלא | exclusion | 1 — P in S and nowhere else |
| 4 | exception | מוציא · חוץ מ | exception | 2 — base; exception. Exception may fail alone |
| 5 | conditional | מוגבל · ובלבד ש | conditional | 2 — base; condition. Condition may fail alone |
| 6 | hypothetical | תלוי · אם … | hypothetical | **1 — the dependency only** |
| 7 | compound · disjunction | מרבה הענינים · מחלק | simple compound (equal · לא זו אף זו · זו ואין צריך לומר זו) / disjunction או … או | all parts |
| 8 | preclusive | לא … אלא … | preclusive | all parts |
| 9 | discrepancy | מכחיש · אף על פי ש | discrepancy | all parts |
| 10 | comparative | מדמה · כשם ש … כך … | comparative | all parts |
| 11 | consequent | נמשך · לפיכך | consequent | **3 — antecedent; consequent; dependency** |

Inference (דיוק, Ch 5, p66–74): `inference-necessary` מוכרח vs `inference-loose` בלתי מוכרח (retractable). Necessary inferences by type:
- **A** כללי מקיים → `infer/contrapositive` חילוף הפכי כולל · `infer/converse-limited` חילוף קצתי
- **E** כללי שולל → `infer/converse-complete` חילוף כולל
- **I** קצתי מקיים → `infer/opposite` הפך · `infer/contrapositive-limited` חילוף קצתי הפכי · `infer/converse-limited`
- **O** קצתי שולל → the same three

Literal vs `figurative` (השאלה / הפלגה): truth is judged on the intended allusion (p76).

### C · Relations between two propositions (Ch 4, p48–64)

`equivalent` דומים · `variant` מתחלפים · `opposite` הפכיים → `diametrically-opposed` הפכיים ממש (both categorical or both particular) / `contradictory` מתנגדים (one categorical, one particular) · `converse` חילוף (complete) / `converse-limited` / `contrapositive` · `obverse` מתהפכים · `incongruent` נבדלים.

Opposition requires same S, same P, same **time**, **place**, **aspect**, and **literal sense**; otherwise `differs-in-time` / `differs-in-place` / `differs-in-context` / `homonym` (one word, two meanings) / `figurative` (one statement is a figure or hyperbole). Opposite terms: `no-middle` (טמא/טהור, אסור/מותר) vs `has-middle` (רשות/חובה, middle = מצוה).

### D · Warrants (Ch 7–8)

Propagation (p92): the predicate moves **up** its order (S is P, P ⊆ Q ⟹ S is Q); the subject moves **down** (S is P, T ⊆ S ⟹ T is P).

Syllogisms: `classical-syllogism` היקש מופתי · `analogism` בנין אב / מה מצינו · `a-fortiori` קל וחומר / כל שכן · `hypothetical-syllogism` היקש תלוי (ponens; `hypothetical-syllogism-tollens`) · `disjunctive-syllogism` היקש מחלק.

Defeats of analogy and a fortiori (p100–104): `fallacy-not-similar` (מה ל… שכן …) · `fallacy-not-greater` (ordering reverses under another criterion) · `fallacy-counterexample` (… יוכיח).

Status (p112): `accepted` · `rejected` · `doubt` — **doubt is the initial state.**

Provenance of premises: `sense` מוחשות · `axiom` מושכלות ראשונים · `endoxa` מפורסמות · `tradition` מקובלות (Scripture, הלכה למשה מסיני, the thirteen מדות, undisputed authority) · `derivation` היקש.

Proof: from nature (axiom, sense) · from convention (endoxa, tradition) · from syllogism · `proof/indirect` — the opposite is shown false (valid only across no-middle opposites).

Disproof: the same three sources · `disproof/indirect` (contrary derived from a true premise) · `disproof/reductio` (a consequence is patently false; via היקש תלוי) · `disproof/dilemma` ממה נפשך.

Rebuttal of a proof or disproof: `rebuttal/irrelevant` (the source does not bear on this claim) · `rebuttal/invalid-syllogism` · `rebuttal/your-reasoning` ולטעמיך / ולדידך · `rebuttal/just-the-opposite` אדרבה · `rebuttal/that-proves-mine` היא הנותנת / משם ראיה. A rebutted proof returns its claim to doubt (not rejected); a rebutted disproof returns it to doubt (not accepted). A rebuttal's `warrant.kind` is always `rebuttal/*`; the verse, tradition or syllogism it leans on is a premise.

Phrasing arguments (`אם כן לימא קרא X` · `X מיבעי ליה` · `ליתני X` · `למה לי`): aimed at a *reading* of a fixed text → `hypothetical-syllogism-tollens`, and `proof/indirect` of the only other reading; aimed at the author's *wording* with the reading agreed → a פירכא with a `style/*` warrant.

`sevara` סברא: inclines when arguments balance; never establishes alone.

Aspects (p148–150): `aspect/essence` מה שבעצמו · `aspect/proprium` מה שבסגולתו · `aspect/accident` מה שבמקריו · `aspect/relation` מה שביחסו אל זולתו. Modality (p154): `modality/potential` בכח · `modality/actual` בפועל. **Chaining requires equal aspect and equal modality.**

Stylistic objections (p156–158): whole — `style/obvious` פשיטא (answered by סלקא דעתך); parts — `style/redundant` הא תו למה לי · `style/self-contradictory` הא גופא קשיא · `style/order-context` תנא היכא קאי · `style/order-combine` ליערבינהו וליתנינהו · `style/order-inconsistent` פתח בכד וסיים בחבית.

### E · Axes — the 24 הבחנות (Ch 11, p222–236)

Keys are `axis/<name>`: 1 `essence` מהות → definition גדר · 2 `parts` חלקים · 3 `quality` איכות · 4 `quantity` כמות · 5 `material` חומר · 6 `form` צורה (definitive עצמית / physical מורגשת) · 7 `action` פעולה (natural טבעית / voluntary רצונית) · 8 `affection` הפעל · 9 `genus-species` סוג ומין (סוג הסוג) · 10 `cause` סיבה (generative מולדת / effective פועלת) · 11 `means` אמצעי · 12 `motive` מעורר · 13 `purpose` תכלית · 14 `result` מסובב · 15 `attribute` מתחבר (inherent / coincident / before-after) · 16 `place` מקום · 17 `posture` מצב · 18 `movement` תנועה · 19 `time` זמן · 20 `relation` יחס · 21 `bearer` נושא · 22 `similarity` דמיון · 23 `difference` הבדל · 24 `opposition` ניגוד.

Priority (p236): temporal זמני · rank שכלי · natural/causal טבעי.

### Status reducer

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
15. Closed vocabulary: do not invent a category; use a `[supplied]` entry or leave the unit unlabeled with a note.

---

## §1 · Procedure — working a passage (Ch 10 as algorithm)

Ramchal's method (p190–220) as steps. Each step names the §2 fields it fills.

**Step 0 · Register the idiom.** Styles differ by person, by rhetoric, by era and place (p190). Identify who speaks and the party type → `party`, `speaker`. Do not read one author's phrasing by another's habits.

**Step 1 · Segment.** Split into utterances (דיבור). One utterance may hold several propositions — Shabbos 5b's single question holds a claim, a proof, and a proof of the proof (p200).

**Step 2 · Normalize each utterance to canonical form.**
- he · `אל תשת לבך אל דרך הדבור אלא אל המאמר המכון בו. ואם תראה הדבור קצר – תשלימהו במחשבתך, ואם תראהו ארך – תסיר ממנו את המותר` (p41) · `תצירהו בשכלך על הצורה הישרה, שהיא: הנושא פלוני יש בו ענין פלוני` (p191)
Whatever the surface — question, exclamation, ellipsis, rhetoric — extract subject, predicate, manner (§4). Supply what is elided; strip what is ornamental. A rhetorical question is an assertion. → `form`.
- ex · Pesachim 7b `אבי הבן מאי איכא למימר?` → *the father must bless* למול, *not* על המילה — a preclusive statement (p192).

**Step 3 · Determine purpose.** Standalone (informs → statement; asks → question) or acting on a prior utterance (explain, prove, contradict, object, resolve, answer)? Identify the target(s). → `move.element`, `move.target`. Where a stock phrase (§3) announces the type, `move.basis = marked`; otherwise `inferred`.

**Step 4 · Check that the purpose is served.** Does the explanation fit the wording? Does the proof prove? Does the difficulty land? Does the resolution remove it? Does the answer answer what was asked? (p194). This chooses the leaf: full vs forced explanation; demonstration vs validation; settlement vs alternative. → `move.subtype`.

**Step 5 · Verify premises recursively.** Every premise must itself be established — by a further premise, and so on, until a terminal: something self-evident (sense, axiom) or conventionally authoritative (endoxa, tradition) (p194–196). Then read the chain back: if the last holds, the previous holds, and so to the first. Chains exist for difficulties as much as for statements. → `warrant.premises`, `warrant.provenance`.

**Step 6 · Separate text from elucidation.** A ביאור restates a proposition at greater length and adds nothing (p196). → `form.elucidationOf`. The status is often conferred *later*: when the Gemara answers a redundancy objection with `מה טעם קאמר`, `פירושא קא מפרש`, or a reading on which the second clause spells out the first, the second clause becomes an elucidation of the first — go back and set `elucidationOf` on it.

**Step 7 · Resolve synonymy.** Two utterances may be one proposition in different words or word order, or one may name the genus and the other its species — `משקי בי מדבחיא דכן` = `הדם והיין והשמן והמים טהורים` (p212). Two may be opposites though phrased apart — `קדשי מזבח אין להם פדיון` vs `הקרבנות יש להם פדיון`. Test relations (§5) on normalized forms, not on strings.

**Step 8 · Decompose composites.** Reported information can carry a proof (`composite/ascribed-proof`) or a difficulty (`composite/ascribed-difficulty`, קושיא מגדת) (p214–218). Annotate both parts. A later objection may attack the *report* (the author could not have meant this), the *carried proof* (it does not prove), or the *carried difficulty* (it is not one) — without touching the original claim. Keep the reporter's view separate from the view reported. → `move.composite`, `move.reportedOf`.

**Step 9 · Review.** Re-read every unit in its role. `ואם יראה לך בחלק מחלקיה שלא ישמר הגבול הראוי לו – אז תטרח ותעמל עד שתמצא לו הישוב ההגון והראוי` (p219): search for the reading that satisfies both the wording and the truth. Do not force a label; leave `basis: inferred` with a `note`.

### Worked example — Shabbos 5b (p196–210)

Surface:

```
[1] תנו רבנן: המוציא מחנות לפלטיא דרך סטיו – חייב
[2] היכא אשכחנא כהאי גוונא דחייב?
[3] אמר רב ספרא אמר רבי אמי אמר רבי יוחנן: מידי דהוה אמעביר חפץ ברשות הרבים,
    התם לאו אף על גב דכמה דנקיט לה ואזיל – פטור, כי מנח לה – חייב; הכא נמי לא שנא
[4] מי דמי? התם כל היכא דמנח לה – מקום חיוב הוא; הכא אי מנח לה בסטיו – מקום פטור הוא
```

Layer A: [1] `statement/firsthand`, provenance `tradition`. [2] difficulty on [1]. [3] resolution on [2] carrying a proof by analogy. [4] difficulty on [3] — the analogy's subjects are not similar (`fallacy-not-similar`).

Layers B/D — the difficulty [2] normalized: *carrying store→street through a colonnade should not be liable* (מוציא מחנות לפלטיא דרך סטיו – אין לנו לחייבו). Its warrant, reconstructed:

- **1 · hypothetical syllogism.** 1a If no explicit case makes domain-to-domain carrying liable when an exempt area intervenes, ours is not liable. 1b There is no such case. 1c ∴ not liable.
- **2 · classical syllogism proving 1a.** 2a Anything outside the primary understanding of a law needs clear proof to be brought under it. 2b Carrying through an exempt area is outside the primary understanding of *מוציא מרשות לרשות*. 2c ∴ 1a. — 2a and 2b are axioms (מושכלות); the chain terminates here.
- **3 · definitional chain.** 3a Domain-to-domain through an exempt area: not liable. 3b Store→street via colonnade *is* domain-to-domain through an exempt area. 3c ∴ not liable.
- **Collapsed into one chain** (p206): the colonnade case ⊂ the exempt-interval case; the exempt-interval case ∉ the primary sense of מוציא מרשות לרשות; no proof includes it; without proof there is no liability under that law; ∴ the colonnade case is not liable under מוציא מרשות לרשות.

The resolution [3] normalized: *domain-to-domain through an exempt area should be liable* — statement + proof + elucidation:

- **4 · analogism.** 4a Carrying through an exempt area ≈ carrying four cubits in the public domain. 4b The latter is liable although an exempt interval (the walking) separates lifting and setting down. 4c ∴ the former is liable.
- Elucidation of 4b: `כל זמן שהוא מהלך הוא פטור`.

[4] attacks 4a: there, every resting place is a place of liability; here, the colonnade is a place of exemption — the subjects are not truly similar, the analogy's conclusion falls, and [1] returns to doubt on this line.

Four short Aramaic sentences carry two claims, four syllogisms, and one elucidation. Every step must be reconstructed; omit one and the argument has not been understood (p212).

---

## §2 · Output schema

One record per utterance. Key sets are those of §0. Optional fields are omitted, not guessed.

```ts
type Annotation = {
  id: string;                      // ordinal within the passage
  he: string;                      // original text
  en?: string;                     // gloss
  speaker?: string;
  party?: "party-group" | "party-individual" | "party-talmud";
      // the exchange this unit belongs to, not the unit alone: group = different speakers on the two sides (Rav asks, Rebbi answers)
      // individual = one named speaker both raises and answers (רמי … ומשני) · talmud = the anonymous voice
  provenance?: Provenance;         // for a statement: where the claim comes from — fill whenever known (tradition for a Mishnah, baraita or verse); sets the reducer's start state

  form: {                          // Layer B — after normalization (Step 2)
    normalized: string;            // "S has P" in plain words, either language
    subject: string;
    predicate: string;
    quantity: "categorical" | "particular" | "partial" | "unqualified";
    type: PredicationType;         // §0-B keys, e.g. "qualified-certain"
    parts?: string[];              // exception/conditional/hypothetical/compound/consequent
    literal: boolean;              // false → figurative or hyperbolic
    elucidationOf?: string;        // Step 6 — THIS unit restates the unit named, adding nothing. Goes on the restating clause itself
                                   // (the ביאור), never on the later unit that announces the reading (מה טעם קאמר, פירושא קא מפרש)
  };

  move: {                          // Layer A (Steps 3–4)
    element: Element; subtype: Subtype;      // §0-A keys
    target?: string[];             // ids acted upon; absent for `open`
    basis: "attested" | "marked" | "inferred" | "supplied";
      // attested = the text names the move itself (תיובתא, והלכתא, אמרו דבר אחד) · marked = a stock phrase announces it (§3 markers)
      // inferred = from function alone (Step 3) · supplied = a [supplied] category was used
    marker?: string;               // the stock phrase matched
    composite?: "ascribed-proof" | "ascribed-difficulty";   // Step 8 — REQUIRED whenever a report (אמר X …, מעשה ב־…, תניא …)
                                                            // is being used to prove or to attack; the move is still the proof/difficulty
    reportedOf?: string;           // whose view is reported
  };

  warrant?: {                      // Layer D (Step 5) — proofs, disproofs, difficulties
    kind: SyllogismKind | SourceKind | RebuttalKind | StyleKind | "sevara";   // §0-D keys
      // Precedence — ask in this order and take the FIRST that applies:
      //   1 the unit answers a proof or a difficulty        → a rebuttal/* kind, whatever machinery it uses
      //   2 the unit faults the form of a statement (פירכא)  → the style/* rule violated
      //   3 the unit derives a conclusion                    → the syllogism kind, or proof/indirect, disproof/*
      //   4 the unit only adduces a source                   → the SourceKind
      // The verse, tradition or syllogism a rebuttal leans on goes in `premises`, never in `kind` (§6, "Rebutting", example).
    premises: Array<{ text: string; provenance: Provenance; id?: string }>;
    aspect?: Aspect | string | null;    // null = unknown; never guessed
    modality?: "potential" | "actual" | null;
    defeat?: "fallacy-not-similar" | "fallacy-not-greater" | "fallacy-counterexample";
  };

  relation?: { to: string; kind: RelationKind; dissolvedBy?: OppositionTest };   // Layer C
  axis?: AxisKey[];                // Layer E — for a statement, the הבחנה its predicate turns on (time, quantity, place …);
                                   // for other moves, the distinction an אוקימתא or חילוק introduces. Keys carry the axis/ prefix.
                                   // Every statement gets at least one axis (every predication falls under some הבחנה); never null.
                                   // A law that turns on a measure, count or size anywhere in the proposition (למעלה מעשרה טפחים, ארבע אמות, רוב, כזית)
                                   // → axis/quantity; an analogy (ניליף מ־, מה מצינו, הצד השוה, דומה ל־) → axis/similarity; a distinction
                                   // (מה ל־X שכן, שאני, אינו דומה ל־) → axis/difference; a time or place condition → axis/time, axis/place.
  inference?: { of: string; kind: InferenceKind; necessary: boolean };           // for דיוק units
                                   // necessary = true ONLY for a conversion of the statement's own S and P per the §4 table (one cannot
                                   // accept the statement and deny it). Anything read off the CHOICE OF WORDS — this word rather than
                                   // that, passive rather than active, this order — is `necessary: false` with kind omitted, however
                                   // compelling, because a reason for the wording defeats it.

  note?: string;                   // why; doubts; retractions
};
// status and standing are DERIVED by the reducer — do not emit them.
```

---

## §3 · Layer A — Moves

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

### Parties (Ch 1, p10–12)

`party-group` — several speakers, one to a side. `party-individual` — one speaker plays both: `הוא מותיב לה והוא מפרק לה`. `party-talmud` — the redactor's anonymous voice questions and answers `כאלו היו רבים המדברים`. All three are judged identically.

### statement/firsthand — שמועה · shemuah · first-hand knowledge
- he · `שיאמר אומר מאמר אחד, יודיע בו אחד מן הענינים בדבר מן ההלכות, או מן המוסרים, או באיזה מין משכל שיהיה`
- means · A speaker asserts a ruling, principle, or idea on his own authority or as a tradition he transmits. Introduces material; acts on nothing.
- test · Not explaining a prior text (→ פירוש); not derived from one (→ דיוק); not quoting another's deed or words (→ הגדה).
- recognize · `אמר רב פלוני: …` opening a topic [structural].
- rules · Those of statements (§4).
- ex · Berachos 20b — `אמר רב אדא בר אהבה: נשים חייבות בקידוש היום – דבר תורה`.
- src · 162

### statement/explanation — פירוש מרווח · perush meruvach · full explanation
- he · `שיפרש אחד מן הכתובים או מן המאמרים … אם יסכים לגמרי עם המאמר – יקרא פרוש מרוח`
- means · Explains a verse or prior statement, agreeing with its essential content *and* with its wording and word order.
- test · Fits content + wording + order → מרווח. Fits content but strains wording or order (`שלא דבר בעל המאמר בדקדוק`) → דחוק. Fits neither → rejected as an explanation. Keeps the wording as is but adds a case-condition → אוקימתא.
- markers · `הכי קאמר` · `מאי …? …` followed by a restatement.
- ex · Berachos 22a — `מה טיבן של טובלי שחרין?` → `הכי קאמר: מה טיבן בארבעים סאה – אפשר בתשעה קבין? מה טיבן בטבילה – אפשר בנתינה?`
- src · 162–164

### statement/forcedExplanation — פירוש דחוק · perush dachuk · forced explanation
- means · Agrees with the essential message but not with all the words or their order; requires saying the author spoke imprecisely. Admitted, at a cost: the target is weakened rather than strengthened [effect supplied].
- test · As above. The more that must be assumed, the more forced; past what the words can bear it is refused (p188 — the same scale as שינוי).
- src · 164

### statement/presumption — אוקימתא · okimta · presumption / case-restriction
- he · `באור תנאי במאמר, דהינו שלא נבאר כלל ההגדה ומלותיה, אלא נניח כמשמעו הפשוט, אבל נגביל המאמר באחד התנאים`
- means · Keeps the plain sense but restricts the statement to a case or to an opinion-holder, supplying an unstated assumption. Generality is surrendered to keep the statement standing → unsettle [effect supplied].
- markers · `הכא במאי עסקינן` · `הא מני? רבי פלוני היא` · `לא שנו אלא …` · `במאי עסקינן`.
- axis · Record which הבחנה (§7) the restriction uses — time, place, subject, quantity, and so on.
- ex · Berachos 24b — `לא שנו אלא שיכול לכוין את לבו בלחש`.
- src · 164–166

### statement/inference — דיוק · diyuk · inference
- he · `שידיק ממאמר אחד או כתוב אחד מה שלא פרש בו`
- means · Asserts what a statement implies but does not say. Rules in §4: necessary vs loose.
- markers · `זאת אומרת` · `שמע מינה` · `מכלל ד…` · `הא … לא`.
- ex · Berachos 20b — `בעל קרי מהרהר בלבו` → `אמר רבינא: זאת אומרת – הרהור כדבור דמי`.
- src · 166

### statement/reported — הגדה · haggadah · reported information
- he · `שיגיד אחד מעשה או מאמר זולתו … וכן נכלל במין הזה כשיגיד מחשבת זולתו`
- means · Reports another's deed, statement, or reasoning — including what another *must have* found difficult or answered. Often a carrier for a proof or a difficulty (composites, below).
- markers · `כך היה מנהגו של …` · `מעשה ב…` · `תו קא קשיא ליה לתנא` · `דתניא / דתנן` when adduced as report rather than as proof.
- ex · Shabbos 19a — `אמר רבי צדוק: כך היה מנהגו של בית רבן גמליאל`. Bava Kamma 83b — `תו קא קשיא ליה לתנא: מאי חזית דילפת ממכה בהמה – לילף ממכה אדם` (reports the Tanna's own difficulty).
- src · 166–168

### question/query — שאלה · she'elah · query
- he · `כשישאל שואל על ענין אחד, אם הוא – אם אינו, או על תנאי ממנו, כגון על מקום, או על זמן, או על טעם`
- means · Asks whether something is so, or for a circumstance — place, time, reason — or a rule.
- test · Seeks a fact, reason, or rule → שאלה. Poses two determinate alternatives and asks which → איבעיא. Asks why the *author phrased or ordered* a statement as he did (מאי שנא הכא דתני X ומאי שנא התם דתני Y; ליתני …; וניתני …) → not a query but a פירכא, and what answers it is a תירוץ, not a תשובה.
- markers · `מאי שנא … ומאי שנא …` (when it asks the reason for a difference in *law*) · `כיצד …?` · `מאי טעמא?` · `מנא הני מילי?` (when the answer will be a proof, the pair is query + demonstration).
- ex · Yebamos 102a — `כלום אתה בקי ברבי יהודה בן בתירא?` · Berachos 35a — `כיצד מברכין על הפירות?` · Yebamos 112b — `מאי שנא חרש וחרשת דתקינו להו רבנן נשואין, ומאי שנא שוטה ושוטה דלא תקינו להו רבנן נשואין?`
- src · 168–170

### question/principle — איבעיא · ibbaya · question of principle
- he · `כשישאל שואל על ענין אחד שיש בו פנים לשני צדדים ויבקש על ההכרעה לאחד מהם`
- means · A two-sided question: both readings are stated and a decision is requested.
- markers · `איבעיא להו` · `בעא מיניה … מהו? … או …` · `… אזלינן או … אזלינן`.
- ex · Yebamos 58b — `בעא מיניה רבי חייא בר יוסף משמואל: כהן גדול שקידש את הקטנה ובגרה תחתיו – מהו? בתר נשואין אזלינן או בתר אירוסין אזלינן?`
- src · 170

### answer/answer — תשובה · teshuvah · answer
- he · `שישיב על השאלה כפי מה שהיא … ישיב לו: הן! או לאו! ואם טעם בקש – ישיבהו הטעם`
- means · Responds in the terms asked: yes/no to existence, a reason to "why," a rule to "how."
- rules · Must correspond to the question and be true. Discharges the question.
- ex · Yebamos 102a — `הן!` · Yebamos 112b — `חרש וחרשת דקיימא תקנתא דרבנן – תקינו להו רבנן נשואין, שוטה ושוטה דלא קיימא תקנתא דרבנן – לא תקינו רבנן נשואין`.
- src · 172

### answer/determination — פשיטות · peshitut · determination
- he · `שיכריע לאחד משני צדדי האבעיא`
- means · Decides an איבעיא for one side. Same rules as תשובה.
- markers · `פשט … ד…` · `תא שמע` when what follows resolves the איבעיא [supplied]; if it attacks a claim, it is a difficulty.
- ex · Yebamos 58b — Shmuel: `בתר נשואין אזלינן`.
- src · 172–174

### proof/demonstration — הוכחה · hochachah · demonstration
- he · `שיביא ראיה להוכיח אמתת מאמר שנאמר`
- means · Brings evidence that establishes a stated claim by the laws of proof (§6): from nature, from convention, or by syllogism. A proof from סברא counts but is weaker (p176).
- test · Argues *to* the truth of the claim → הוכחה. Merely cites an agreeing source → סייעתא.
- markers · `תדע, שהרי …` · `מנא הני מילי? … דתנו רבנן` · `שנאמר` · `דאמר מר` · `דכתיב` · `מדקאמר … שמע מינה`.
- ex · Pesachim 16a — `רבי אלעזר אומר: אין טומאה למשקין כל עיקר! תדע, שהרי העיד יוסי בן יועזר איש צרידה על איל קמצא דכן ועל משקין בית מטבחיא דכן`.
- src · 174–176

### proof/validation — סייעתא · siyata · validation / support
- he · `שיובא מאמר אחד שיסכים למאמר אחר לחזק הדעה שנאמרה בו`
- means · Adduces a source that agrees with the claim. Raises it; same rules as הוכחה; defeasible like any proof.
- markers · `תניא כוותיה ד…` · `תניא נמי הכי` · `מסייע ליה`.
- ex · Yebamos 102b — `תניא כוותיה דרבא! חלצה במנעל הנפרם, שחופה את רוב הרגל – חליצתה כשרה`.
- src · 176

### contradiction/direct — סתירה · setirah · direct contradiction
- he · `שיסתר מאמר שנאמר או ראיה שהובאת ויראה היותם מבטלים`
- means · Nullifies a statement or a proof by the laws of disproof (§6): a source, a sense report, an axiom, or a valid syllogism showing it false. Target → rejected.
- test · Shows falsity → סתירה. Removes only necessity, by an alternative → דחיה. Shows formal unfitness → פירכא. Sets two sources against each other → רומיא.
- markers · `ואלא הא ד…` · `והא … !` · `לא סלקא דעתך, דהא …` · `מיתיבי` when the cited source refutes rather than merely troubles.
- ex · Pesachim 17b — Rav Papa: `אפילו למאן דאמר טומאת משקין דאורייתא – משקי בית מטבחיא הלכתא גמירי לה`; Rav Huna b. R. Nathan: `ואלא הא דאמר רבי אלעזר אין טומאה למשקין כל עיקר, תדע שהרי העיד … ואי הלכתא גמירי לה – מי גמרינן מינה?` — `סתר שמועתו של רב פפא לחלוטין`.
- src · 178

### contradiction/opposition — דחיה · dechiyah · opposition / deflection
- he · `שידחה הכרח המאמר, אך לא יבטל ענינו לגמרי, ולא תכחש אפשרותו`
- means · Removes the *necessity* of a claim or of a proof's conclusion by showing another reading is possible. The target is not shown false; it drops from established to possible → doubt, never rejected. The alternative must have `מקום בנושא` — be a live possibility for this subject; a far-fetched one fails and the target stands on סברא (p180).
- test · Attacker offers an alternative reading → דחיה. Attacker shows falsity → סתירה. Same act aimed at a קושיא rather than at a claim or proof → שינוי.
- markers · `מאי לאו? … לאו!` · `ודלמא …` · `ואימא …` · `דלמא שאני התם` · `לא, …`.
- ex · The book gives the stock forms only; see שינוי for the sibling instance (Yebamos 104b).
- src · 178–180

### difficulty/objection — פירכא · pircha · objection
- he · `כשימצא בסדר המאמר או הגדתו דבר בלתי נאות`
- means · Finds something unfitting in the *form* of a statement — its order, its necessity, its consistency, its redundancy — not in its truth. The stylistic objections of §6 are its instances.
- markers · `הא גופא קשיא!` · `מאי קא משמע לן?` · `היינו הך` · `הא תו למה לי?` · `פשיטא!` · `וליפלוג … ברישא!` · `תנא היכא קאי?` · `ליתני …!` / `וניתני …!` · `מאי שנא הכא דתני … ומאי שנא התם דתני …` (a question about wording is a פירכא, not a שאלה).
- ex · Yebamos 117b — `שנים אומרים: מת, ועד אומר: לא מת – מאי קא משמע לן? … היינו הך` · Yebamos 118a — `וליפלוג רבי מאיר ברישא!`
- src · 180–182

### difficulty/apparentContradiction — רומיא · rumya · apparent contradiction
- he · `כשיובאו שני מאמרים, או שני כתובים הפכיים או מתנגדים, לבקש ישובם`
- means · Sets two statements or verses that appear opposed (§5) against each other and seeks reconciliation. Both remain in play; neither is yet rejected.
- markers · `ורמינהו` · `רמי … כתיב … וכתיב …` · `והא תניא / והא תנן` when a second source is set against the first.
- ex · Yebamos 120b — `ורמינהו: אדם אינו מטמא עד שתצא נפשו, אפילו מגוייד, ואפילו גוסס` · Berachos 4a — `רבי יעקב בר אידי רמי, כתיב "והנה אנכי עמך ושמרתיך", וכתיב "ויירא יעקב מאד"`.
- src · 182–184

### difficulty/refutation — תיובתא · teyuvta · refutation
- book · Named as the third difficulty (p180) but never defined.
- [supplied] · In Talmudic usage, a difficulty from an authoritative source (Mishnah, baraita) that the Gemara declares decisive — `תיובתא דרבא, תיובתא`. Treat as a difficulty whose landing is conclusive: target → rejected. When only `תיובתא` is said, the refuting source is the immediately preceding `תא שמע` / `מיתיבי`.
- test · Label by outcome, not by opening word. `מיתיבי` / `תא שמע` only *introduce* a source-based attack; it is a תיובתא only if the Gemara closes it with `תיובתא`. An attack that is then answered was a סתירה attempt (source shows falsity) or a רומיא (sources set against each other for reconciliation), and its answer is a דחיה, שינוי, or יישוב by the usual tests.
- markers · `תיובתא ד… תיובתא` · `תיובתא` (closing).
- src · 180, 184

### resolution/settlement — יישוב · yishuv · settlement
- he · `כשתתרץ הפרכא או הרמיא בישוב נכון ואמתי, שיאמין בו המתרץ היות זה אמתת הדבר`
- means · Resolves the difficulty with an account the resolver holds true. Rules: true in itself, and consistent with the statement it defends. The difficulty is discharged; the defended claim recovers.
- test · Resolver asserts the resolution as the truth → יישוב. Resolver only shows the difficulty need not follow → שינוי.
- ex · Berachos 4a — R. Yaakov b. Idi to his own רומיא: `אמר, שמא יגרום החטא`.
- src · 184

### resolution/alternative — שינוי · shinui · alternative / deflecting answer
- he · `כשתתרץ הקשיא … במה שאין הכונה בו למתרץ בהחלט שתהיה כן אמתת הדבר, אלא שתדחה הקשיא. והנה זה דומה לדחיה באמת, אלא שהדחיה תהיה על מאמר שהנח או ראיה שהובאת, והשנוי – דחיה על קשיא`
- means · Removes a difficulty by a possible reading, without claiming it is the truth — a דחיה aimed at a קושיא. The difficulty is weakened; the defended claim stays possible but unproven (doubt).
- rules · Must be compatible with the defended statement, even at the cost of some strangeness or of saying the author spoke loosely; the more that must be assumed, the more forced (דחוק); past what the words bear, it is refused (p186–188).
- markers · `לא! משום ד…` · `לא, …` · `לא צריכא …` · `שאני התם …` · `הכא במאי עסקינן` when used to deflect a difficulty rather than to explain.
- ex · Yebamos 104b — objection to Rava: `חרש שנחלץ וחרשת שחלצה – חליצתה פסולה, מאי טעמא? לאו משום דלאו בני קרייה נינהו?` → `לא! משום דלאו בני דעה נינהו`.
- src · 186–188

### Composites (Ch 10, p214–218)

**composite/ascribed-proof** — `הוכחה והגדה` · a proof carried by reported information: "as R. X said / did …" adduced to prove a claim. Annotate the report (`statement/reported`) and the proof (`proof/demonstration`) separately. A later attack may deny that the report proves the claim (report intact), attack the report itself (claim intact), or grant the proof and still fault the report's wording.

**composite/ascribed-difficulty** — `קושיא מגדת` · a speaker reports the difficulty another *must have* felt; the speaker may not endorse it. A later objection may say the author could not have meant this (attacks the ascription), or that it is no difficulty (attacks the difficulty), or both — without engaging the original claim's truth.
- ex · Bava Kamma 83b — `ומאי "אם נפשך לומר"?` → `תו קא קשיא ליה לתנא: מאי חזית דילפת ממכה בהמה, לילף ממכה אדם` (ascribed difficulty) → `אמרי: דנין ניזקין מניזקין ואין דנין ניזקין ממיתה` (objection to the ascription: the Tanna had an obvious answer, so this cannot have been his difficulty).

---

## §4 · Layer B — Form of a single proposition

### Subject and predicate (Ch 3, p22)
- he · `כל מאמר … אי אפשר שלא יהיה נבנה משני חלקים, דהינו: מענין שיקים או ישלל, ומדבר שבו יקים הענין ההוא או ישלל ממנו`
The thing affirmed or denied is the **נשוא** (predicate); that of which it is affirmed or denied is the **נושא** (subject).
- ex · Berachos 20b `נשים חייבות בקידוש היום` — S = נשים, P = חיוב קידוש היום.
Predicates are unary; relational content is packed into the predicate term. Quantifiers do not nest.

### Normalization (Ch 3, p42–46; Ch 10, p192)
Surface forms vary — long or short, plain, rhetorical, figurative; the intended proposition is always S + P + manner. Supply elided parts, strip ornament, render questions and exclamations as assertions.
- ex · Pesachim 7b, on why the circumcision blessing is על המילה: `התם היכי נימא? נימא "למול" – לא סגיא דלאו איהו מהיל` → (i) *the mohel can only bless* על המילה — `exclusion`; (ii) *because he is not necessarily the one who must circumcise, he cannot say* למול — `consequent`. `אבי הבן מאי איכא למימר?` → *the father must say* למול, *not* על המילה — `preclusive`. `אין הכי נמי` → *the father says* למול — `simple`.

### Quantity of the subject (p22–26)
- **categorical** כולל — the subject is a whole class; P holds of every member. ex · Sanhedrin 90a `כל ישראל יש להם חלק לעולם הבא`.
- **particular** פרטי — the subject is one individual. ex · Nega'im 12:4 `ירושלים אינה מטמאה בנגעים`. Not partial.
- **partial** קצתי — some of a class. ex · Yebamos 84a `יש מותרות לבעליהן`.
- **unqualified** סתמי — no quantifier; `כחו ככח המאמר הכולל` — read as categorical. ex · `נשים חייבות בקידוש היום` = all women.

### Manner of predication (p26–40) with truth conditions (p78–90)
- he (Ch 6) · `צריך שתתדקדק בכל מאמר שיהיה, לדעת סוף גזרתו, שבה תהיה תלויה אמתת המאמר או כזבו` — each type has an *ultimate intention* (סוף גזרה); the statement is true iff that intention holds. Where a type has several intentions, one may fail while the others stand.

#### 1 · simple — סתם
- means · P said of S with no condition or limit. Intention: P is (or is not) in S.
- ex · `נשים חייבות בקידוש היום`.

#### 2 · qualified — מיוחד ומוגבל · certain / possible / doubtful / impossible
- means · P said of S in a definite mode: certainty or necessity (`ודאי`), possibility (`אפשר`), doubt (`ספק`), impossibility (`לא אפשר`). Intention: P in S *in that mode*. P in S in a different mode → false: `אלו לא היה ודאי שיגררוהו, אפלו יארע כן פעמים רבות, לא היה המאמר צודק`.
- keys · qualified-certain · qualified-possible · qualified-doubtful · qualified-impossible.
- ex · Pesachim 9b `כיון דחולדה וברדלס מצויין שם – ודאי גררוהו` · Kesubos 75a `אפשר לעברה בקיוהא דחמרא` · Pesachim 113a `כל אשראי – ספק אתי ספק לא אתי` · Kesubos 75a `גבי אשה לא אפשר`.
- note · Shares the word מוגבל with type 5; distinguished by ordinal and definition.

#### 3 · exclusion — ממעט
- means · P said of S and denied of everything else. Intention: P in S *alone*; P also elsewhere → false.
- markers · `לבדו` · restrictive `אלא` · `אין … אלא …`.
- ex · Exodus 12:16 `הוא לבדו יעשה לכם`.

#### 4 · exception — מוציא
- means · Removes P from some members of S. **Two intentions:** (a) P in S generally; (b) the excepted members, though in S, lack P. If P turns out to hold of the exceptions, only (b) is false; (a) stands.
- markers · `חוץ מ…` · exceptive `אלא ש…`.
- ex · Chullin 2a `הכל שוחטין ושחיטתן כשרה – חוץ מחרש שוטה וקטן`.

#### 5 · conditional — מוגבל
- means · P said of S under a stipulation or in one respect. **Two intentions:** (a) the base predication; (b) the condition. A false condition leaves (a) true.
- markers · `ובלבד ש…` · `על מנת ש…` · `בתנאי ש…`.
- ex · Yebamos 38a `כנסה, הרי היא כאשתו לכל דבר – ובלבד שתהא כתובתה על נכסי בעלה הראשון` · Demai 1:2 `ומחללים אותו כסף על כסף … ובלבד שיחזור ויפדה את הפירות`.

#### 6 · hypothetical — תלוי
- means · Makes the existence of one matter depend on another. Parts: **antecedent** הקודם (the conditioning clause), **consequent** הנמשך. **One intention only — the dependency.** Both parts true but not dependent → false (`אם משה קבל את התורה – שאול הוא המלך הראשון`). Both parts false but genuinely dependent → true. Not material implication.
- markers · `אם … (אז) …` · `אי …, …`.
- ex · Demai 4:4 `ואם היו כהן או עני למודים לאכול אצלו – יבואו ויאכלו` · Sukkah 53a `אם אתה תבוא אל ביתי – אני אבוא אל ביתך` · Sanhedrin 91a `אם אתה עושה כן – רופא אומן תקרא` (antecedent false, consequent false, statement true) · I Kings 18:21 `ואם הבעל – לכו אחריו` (same).

#### 7 · compound — מרבה הענינים
- means · Several predicates of one subject, or one predicate of several subjects.

**7a · simple compound** (`compound`) — the predicates hold together, or one predicate of all the subjects. Intention: *all* hold; one failing falsifies the whole.
- equal (`בהשואה אחת`) — the parts are equally novel. ex · Kil'ayim 8:1 `כלאי הכרם אסורין מלזרוע ומלקיים ואסורין בהנאה` · Terumos 1:7 `אין תורמין לא במדה ולא במשקל ולא במנין` · Demai 6:1 `המקבל שדה מישראל, מן הנכרי ומן הכותי – יחלק לפניהם`.
- unequal, known first then novel — `compound-not-only` · **לא זו אף זו**. ex · Ma'aser Sheni 1:2 `הבכור מוכרין אותו: תמים – חי, ובעל מום – חי ושחוט` — alive is expected; slaughtered is the novelty.
- unequal, novel first then known — `compound-needless` · **זו ואין צריך לומר זו**. ex · Kil'ayim 8:1 `ומותרין באכילה וכל שכן בהנאה`.

**7b · disjunction** (`disjunction`) — מחלק · the subject is suspended between predicates, exactly one to hold. Intention: the alternatives are as stated; if one option is unavailable the disjunction is false — `אם האמת היה שחולץ ולא מיבם, הנה המאמר היה בלתי צודק`. Western · unlike the truth-functional "or", which is true as soon as any one disjunct is true, this disjunction is false when any listed alternative is not a live option — every branch is asserted to be genuinely open, exactly one to be realized.
- markers · `או … או …`.
- ex · Yebamos 112b `או חולץ או מיבם`.

#### 8 · preclusive — שלילה (one predicate affirmed, another denied)
- means · Affirms P₁ of S while denying P₂; or affirms P of S₁ while denying it of S₂. Intention: the affirmation and the denial both.
- markers · `לא … אלא …` · `… ולא …`.
- ex · Terumos 11:5 `לא יאבד את השאר אלא יניחנו במקום מוצנע`.

#### 9 · discrepancy — מכחיש
- means · Affirms P of S together with another predicate that *seems* to contradict it, asserting there is no real conflict. Intention: both predications and their compatibility.
- markers · `אף על פי ש…` · `אף על גב ד…` (Aramaic) · `אפילו …` · `ואף על גב ד… שרי / חייב`.
- ex · Ma'aseros 5:8 `אף על פי שאביהן תרומה – הרי אלו יאכלו`.

#### 10 · comparative — מדמה
- means · Asserts of an unknown case what holds of a known one by equating them. The known is always the base; the unknown is equated to it. Intention: the equated predications, all as stated.
- markers · `כשם ש… כך …` · `הרי הוא כ…` · `דומיא ד…`.
- ex · Demai 6:5 `כשם שחולקין בחולין – כך חולקין בתרומה`.

#### 11 · consequent — נמשך
- means · One predicate stated as following from another. **Three intentions:** (a) the antecedent holds; (b) the consequent holds; (c) the consequent follows from the antecedent. Any one failing falsifies the statement. Distinguish from the hypothetical (type 6), which asserts only (c).
- markers · `לפיכך` · `הלכך` · `אם כן` · concluding `מכלל ד…`.
- ex · Ma'aseros 2:1 `היה עובר בשוק, ואמר: טלו לכם תאנים – אוכלים ופטורים, לפיכך אם הכניסו לבתיהם – מתקנים ודאי` — (a) they may eat untithed in the market; (b) at home they must certainly tithe; (c) (b) holds *because of* (a): market permission shows the produce never entered a house, so no tithe was ever taken.

### Literal vs figurative (Ch 6, p76)
- he · `הפשוטים אמתתם וכזבם תלויים בהיות צודק … מה שנרמז במלותיהם לפי הבנתן הפשוטה. אך באותם שעל דרך ההשאלה או ההפלגה, אין האמת והכזב תלויים במה שמובן מפשט מלותיהם, אלא ברמז המכון בהם`
- key · `figurative`. Judge truth on the intended allusion.
- ex · Bava Kamma 117a `ארי עלה מבבל` — a great sage (Rav Kahana) has arrived.

### Inference — דיוק (Ch 5, p66–74)
- he · `כל מה שאנו מבינים מתוך מאמר אחד ולא פרש בו, נקראהו דיוק`
- Principle · A speaker's words are assumed to have the extent they deserve: `לא ייחד נשוא לנושא אחד אם הוא ראוי לרבים, ולא יאמר בנושאים רבים נשוא שאינו ראוי אלא לאחד מהם`. What falls outside the drawn boundary is taken as excluded.
- Scope · The exclusion runs over the alternatives the narrowing displaced, not the world. Shabbos 106a `רבי יהודה אומר: הצד צפור למגדל וצבי לבית חייב` → Betzah 24a `לבית הוא דמחייב, אבל לביברין – לא`: had he meant all trapping, he would not have said "to a house."
- ex · Lev 11:2 `זאת החיה אשר תאכלו` → all others forbidden · II Sam 23:1 `ואלה דברי דוד האחרונים` → Mo'ed Katan 16b `מכלל דאיכא ראשונים`.

**inference-loose** — בלתי מוכרח · depends on word order and phrasing — including verb form, tense, active vs passive (הקורא → דיעבד; נקנית → מדעתה); defeated by a reason the phrasing was chosen otherwise. ex · Berachos 53a `אם רוב ישראל – מברך` → `הא מחצה על מחצה אינו מברך`; retracted: `בדין הוא דאפילו מחצה על מחצה נמי מברך, ואיידי דתנא רישא רוב כותים – תנא סיפא רוב ישראל` — the Tanna mirrored the first clause. Record a loose inference as a retractable commitment.

**inference-necessary** — מוכרח · inseparable from the statement; one cannot accept the statement and deny it. ex · Chagigah 15b `כל מאן דהוה נקי אגב אמיה – סליק` ⟹ `כל דלא סליק – לא הוה נקי אגב אמיה`.

Necessary inferences by statement type (`יש` is read as "some, not all"):

| from | necessary inferences |
|---|---|
| **A** כללי מקיים — `כל דנקי אגב אמיה סליק` | `infer/contrapositive` חילוף הפכי כולל: `כל דלא סליק – לא הוה נקי` · `infer/converse-limited` חילוף קצתי: `אחד מן העולים הוא הנקי` |
| **E** כללי שולל — `אין דבר רע יורד מלמעלה` (Bereshis Rabbah 51:3) | `infer/converse-complete` חילוף כולל: `אין יורד מלמעלה דבר רע` |
| **I** קצתי מקיים — `יש זריז ונשכר` (Pesachim 50b) | `infer/opposite` הפך: `יש זריז ואינו נשכר` · `infer/contrapositive-limited` חילוף קצתי הפכי: `יש שאינו נשכר והוא זריז` · `infer/converse-limited`: `אחד מן הנשכרים הוא הזריז` |
| **O** קצתי שולל — `יש קדשים שאין להם פדיון` | `infer/opposite`: `יש קדשים שיש להם פדיון` · `infer/contrapositive-limited`: `יש שיש להם פדיון והם קדשים` · `infer/converse-limited`: `יש שאין להם פדיון והם קדשים` |

Naming a דיוק — two questions, in order. (1) Did S and P keep their places? yes → `infer/opposite` (quality flipped, same order). (2) They swapped: did the quality flip too (מקיים ↔ שולל)? yes → `infer/contrapositive` / `infer/contrapositive-limited`; no → `infer/converse-complete` / `infer/converse-limited`. Match the table by pattern, not by intuition about validity — for a קצתי the "limited" forms are what the table says they are. As placeholders, from a קצתי שולל `יש S שאינם P`: `יש S ש־P` → opposite · `יש שאינם P והם S` (the negation kept) → converse-limited · `יש ש־P והם S` (the negation dropped) → contrapositive-limited. Check whether the "אינם" survived before choosing.

Western · `infer/opposite` (הפך, "some S are P" → "some S are not P", and O → I) is **not** valid in the square of opposition: subcontraries may both be true. It is *necessary* for Ramchal by the proportion principle above — a speaker who says "some" where "all" holds has misstated the measure, so "some" carries "not all". Record it as `inference-necessary` exactly as Ramchal does, and do not derive it from, or reject it by, Western validity; a checker built on the square would wrongly refuse it.

---

## §5 · Layer C — Relations between two propositions (Ch 4, p48–64)

Compare two *normalized* propositions on S, P, quantity, and quality (affirm / deny). Decide in this order — a מחלוקת is not automatically an opposition:

1. Same S and same P, and one affirms what the other denies (הן / לאו)? → `opposite`, then `diametrically-opposed` (same quantity — two categoricals or two particulars) or `contradictory` (one categorical, one particular — not the everyday word for "they disagree"). Before settling, check the conditions below; a failed condition dissolves it (`dissolvedBy`).
2. Same S and same P, both affirming (or both denying) — in other words, in another order, or one the genus and the other its species? → `equivalent`. Two words for one thing — synonyms, dialect, a word and its gloss, the same law phrased twice — are one P, so the pair is equivalent even when a dispute over the *wording* is reported. (`משקי בי מדבחיא דכן` / `הדם והיין והשמן והמים טהורים`, Step 7: the enumeration is the species of the genus; nothing is denied, so it is not `contradictory`.) If S and P swapped → `converse` / `converse-limited` / `contrapositive`; if quality and P negated together → `obverse`.
3. Same S, different P — two values of one variable (two times, two measures, two amounts, two proportions) — or same P, different S? → `variant`. Kesubos 57a below is the model case: each side names a value; neither says לאו to the other's P.
4. Nothing in common? → `incongruent`.

#### equivalent — דומים
- he · `שני מאמרים שיאמרו נשוא אחד בנושא אחד עצמו, אלא שבאפן האמירה וסדר הדבור יהיו מתחלפים; או … נשואים דומים בשני נושאים דומים`
- means · Same S and P in different words; or S and P similar enough that the same law is predicated.
- markers · `… ו… אמרו דבר אחד`.
- ex · Kesubos 36b `רבי יהודה ורבי דוסא אמרו דבר אחד` · Pesachim 82b — similar, not identical subjects: `והא אנינות כלאחר זריקה הויא`.

#### variant — מתחלפים
- means · Same S, different P; or same P, different S. A dispute of content, not a flat denial.
- test · Two different values of one variable — two measures, two times, two amounts, two proportions — are variant, not opposite: neither side *denies* a predicate the other affirms. Opposition (below) needs one הן and one לאו on the same P.
- ex · Kesubos 57a `רבי טרפון אומר: נותנין לה הכל תרומה; רבי עקיבא אומר: מחצה חולין ומחצה תרומה` — two proportions, neither denied.

#### opposite — הפכיים
- he · `שיאמרו על נשוא אחד בנושא אחד, אחד – הן ואחד – לאו`
- Conditions · `צריך שיהיו נשואם אחד ונושאם אחד, ויובנו בזמן אחד, במקום אחד, בבחינה אחת ובהבנה פשוטה בלי שום שתוף והשאלה`. Failing any one dissolves the opposition:
- `differs-in-time` — Shabbos 57a `לא תצא אשה … בטוטפת` / `יוצאה אשה בטוטפת` (unsewn / sewn).
- `differs-in-place` — Shabbos 57a `ולא בכבול` / `יוצאת בכבול` (public domain / courtyard).
- `differs-in-context` — aspect (§6); Pesachim 19b `עזרה רשות הרבים היא` (for doubtful impurity) vs a private domain for Shabbos.
- `homonym` — Eruvin 102b `ואם תקע – חייב חטאת` (driving a peg) vs Rosh Hashanah 29b `תקיעת שופר … חכמה היא ואינה מלאכה` (blowing).
- `figurative` — one of the two is a figure or hyperbole (p76): Bava Kamma 117a `ארי עלה מבבל` does not oppose "there are no lions in Babylonia"; judge the intended allusion, not the words.

Subtypes:
- **diametrically-opposed** — הפכיים ממש · both categorical or both particular, one affirming, one denying. ex · Shabbos 124a `כל הכלים ניטלין לצורך ושלא לצורך; רבי נחמיה אומר: אין ניטלין אלא לצורך` · Shabbos 28b `רבי אליעזר אומר: טמאה היא ואין מדליקין בה; רבי עקיבא אומר: טהורה היא ומדליקין בה`.
- **contradictory** — מתנגדים · one categorical, one particular; they clash — the particular *denies* of some members what the categorical affirms of all — but the particular's author concedes the rest. A particular that affirms the same P of a subclass does not clash; it is a species under the genus → `equivalent` (Step 7). ex · Shabbos 76b `חוץ מקליפיהן` / `רבי יהודה אומר: חוץ מקליפי עדשים`.

Opposite *terms* · each term's meaning is the other's negation: טמא/טהור, אסור/מותר — `no-middle`; רשות/חובה — `has-middle` (מצוה). Indirect proof (§6) is valid only across no-middle opposites.

#### converse — חילוף
- he · `מה שהוא הנושא באחד יהיה הנשוא בשני, ומה שהוא נשוא באחד יהיה הנושא בשני`
Three kinds, by what changes besides order:
- **converse** (complete) · order only; quantity and quality kept. ex · Yerushalmi Shabbos 13:3 `אין עבירה מצוה` / `אין מצוה עבירה`.
- **converse-limited** · order and quantity change; quality kept. ex · Yebamos 66a `כל שאינו אוכל אינו מאכיל` / `יש שאינו מאכיל ואינו אוכל`.
- **contrapositive** · order and quality change; quantity kept. ex · `כל האוכל מאכיל` / `כל שאינו מאכיל אינו אוכל`.

#### obverse — מתהפכים
- means · Both S and P are replaced by their opposites; the content is unchanged. ex · `כל האוכל מאכיל` / `כל שאינו אוכל אינו מאכיל`.
- Western · This is *inversion* (negate both S and P), not obversion (obversion flips the quality and negates only P). Inversion is not generally valid; it holds here because the terms are coextensive — whoever eats is exactly whoever enables. Do not validate an `obverse` against the square of opposition; it is Ramchal's relation, sound where S and P are coextensive.

#### incongruent — נבדלים
- means · No shared or similar S or P; nothing to test.

---

## §6 · Layer D — Warrants: deriving, proving, disproving, rebutting

### Propagation (Ch 7, p92–96)
- he · `כאשר יאמר נשוא אחד בנושא אחד, כל מה שיהיה נכלל או מתחבר באמת בנשוא ההוא, יאמר באותו הנושא, וכן כל מה שנכלל באותו הנושא יאמר באותו הנשוא`
- Predicate moves **up**: `האזמל של מילה הוא מוקצה` + מוקצה is forbidden to handle ⟹ the knife is forbidden to handle.
- Subject moves **down**: `העושה אב מלאכה בשבת חייב סקילה` + writing is an אב מלאכה ⟹ `הכותב חייב סקילה`.
- Terms: premise **הקדמה**, conclusion **תולדה**, derivation **היקש**.
- The whole force rests on the inclusion actually holding, `בהכרח ותמיד`. Disputes about inclusion are where derivations diverge: Rabbi Yosi holds הבערה is not an אב מלאכה → no death penalty for kindling; Shabbos 43b `טלטול מן הצד אין שמו טלטול` → the mukzeh rule does not reach sideways handling.

### classical-syllogism — היקש מופתי
- means · Conclusion by the propagation rules from an established premise plus an inclusion. Fails iff the inclusion fails — predicate or subject does not subsume.
- ex · Yebamos 66a — `מנין לכהן שנשא אשה וקנה עבדים שיאכלו בתרומה? שנאמר: וכהן כי יקנה נפש קנין כספו הוא יאכל בו` — קנין כספו eats terumah (verse); the wife is קנין כספו ⟹ she eats terumah.

### analogism — בנין אב / מה מצינו
- he · `שהדומים ילמדו זה מזה … אם מצאנו שני נושאים דומים, ומצאנו באחד מהם מפרש נשוא אחד, בדין המצא הנשוא ההוא גם בשני`
- means · Similar subjects share the predicate explicit in one of them.
- markers · `מה מצינו ב… … אף …` · `מה … אף …` · `ילפינן … מ…` · `דאתקש ל…` (analogy licensed by scriptural juxtaposition).
- ex · Toras Cohanim, חטאת §5 — `יחיד מוצא מכלל צבור ונשיא מוצא מכלל צבור, מה יחיד מביא אשם תלוי – אף נשיא מביא אשם תלוי`.

### a-fortiori — קל וחומר / כל שכן
- means · From the lesser to the greater or the reverse: if P holds of the lighter case and fits the heavier, P holds of the heavier; and from the heavier's exemption to the lighter's.
- markers · `ומה … אינו דין ש…` · `קל וחומר` · `כל שכן` · `לא כל שכן`.
- ex · Toras Cohanim ibid. — `ומה אם היחיד שאין מביא על הנודע זכר – מביא אשם תלוי, נשיא שמביא על הנודע זכר – אינו דין שיביא אשם תלוי`.

### Defeats of analogism and a fortiori (p100–104)
- **fallacy-not-similar** — the supposed similars differ in a relevant respect. Recognize `מה ל… שכן …`. ex · Kerisos 26a `צבור מנשיא לא אתי, דאיכא למיפרך: מה לנשיא שכן יש בקרבנו נקבה`.
- **fallacy-not-greater** — the lesser/greater ordering reverses under another criterion, so neither is simply heavier. ex · Horayos 10a, prince from Cohen Gadol: `מה למשיח שכן אינו מביא בשגגת מעשה, תאמר בנשיא שמביא בשגגת מעשה`. Severity is per aspect; an a fortiori needs the ordering to hold in every relevant aspect (Sifri Naso, below).
- **fallacy-counterexample** — a third subject shares the antecedent property and lacks P. Recognize `… יוכיח`. ex · Toras Cohanim ibid. — `משיח יוכיח, שמביא על הנודע זכר ואין מביא אשם תלוי`.

### hypothetical-syllogism — היקש תלוי
- he · `שני ענינים, שהם אחד קודם ואחד נמשך, יכריחו זה את זה; פרוש, שבהמצא הקודם – ימצא הנמשך, ובהעדר הנמשך – יעדר הקודם`
- means · From a hypothetical premise: antecedent established ⟹ consequent (ponens); consequent denied ⟹ antecedent denied (`hypothetical-syllogism-tollens`). The reductio (below) is its disproof form.
- markers · `אי סלקא דעתך …, … ; [consequent denied] ⟹ …` · `אם כן …` · `אלא מעתה …`.
- ex · Pesachim 19a `ואי סלקא דעתך סבר כרבי עקיבא, ניתני נמי רביעי בתרומה וחמישי בקדש` — he does not teach a fourth and fifth degree ⟹ he does not hold like R. Akiva.

### The phrasing argument — לימא קרא / ליתני / מיבעי ליה / למה לי [supplied recognizer]
- means · "Had the intended proposition been A, the wording would have been X; the wording is Y." A hypothetical syllogism whose antecedent is a reading and whose consequent is a wording. One surface form, two different moves — decide by what the speaker does with the wording:
- **(i) aimed at a proposed reading** of a text whose own wording is not in question (Scripture; a Mishnah as an Amora reads it). Y ≠ X refutes reading A → `hypothetical-syllogism-tollens`; when A and B are the only readings, refuting A is `proof/indirect` of B (no-middle). The reply defends the reading or offers another (דחיה), not a lesson in the wording.
  - markers · `אם כן, לימא קרא X! מאי Y?` · `ליכתוב קרא X` · `לכתוב רחמנא X` · `X מיבעי ליה` when it decides between readings.
  - ex · Horayos 9a `דאי סלקא דעתך … נכתבה רחמנא להאי "מאחת" בדלות אי נמי בעשירות` — the placement of מאחת rules out the rival reading (§9).
- **(ii) aimed at the author's own wording** when the reading is agreed: why Y rather than the plainer X? A פירכא on form — `style/redundant`, `style/self-contradictory` (words not fitted to the matter), `style/order-*` — answered by a יישוב naming what the wording teaches (`הא קא משמע לן`, `לא זו אף זו קתני`, `איידי דתנא … תנא …`).
  - markers · `ליתני X!` · `למה לי?` · `מאי איריא X? ליתני Y!` · `X מיבעי ליה` when the reading is not in doubt.
  - ex · Pesachim 4a `האי "הכל נאמנים"? "כל הבתים בחזקת בדוקים" מיבעי ליה` (§9) · Berachos 53a `איידי דתנא רישא … תנא סיפא …` (§4, the retracted דיוק).
- test · Is a *reading* being chosen or refuted (→ i, Layer D tollens) or is the reading accepted and the *economy of the words* faulted (→ ii, Layer A פירכא with a style/* warrant)? The wording itself is a premise of provenance `tradition` in both.

### disjunctive-syllogism — היקש מחלק
- he · `נושאים שונים, שמכרח המצא אחד מהם לבדו בנושא, כשיתברר לנו מציאות האחד – יכרח העדר כל האחרים, וכשיתברר לנו העדר כלם חוץ מאחד – תכרח מציאות האחד הנשאר`
- means · From an exhaustive, exclusive disjunction: one established ⟹ the rest denied; all but one denied ⟹ the last holds.
- markers · `היכי דמי? אי … אי … אלא לאו …` · `או … או …; [one denied] ⟹ …` · `ממה נפשך` used constructively.
- ex · Pesachim 5b `שמע מינה: הבערה לחלק יצאת` (לחלק or ללאו; not ללאו ⟹ לחלק) · Bava Kamma 104a `היכי דמי? אי דלא עשאו בעדים – מנא ידעינן? אלא לאו – דעשאו בעדים`.

### Acceptance, rejection, doubt (Ch 8, p112)
- he · `מאמר שתבוא לנו ראיה על אמתו – נקבלהו, מאמר שתהיה לנו ראיה על כזבו – נכחישהו, ושלא תהיה לנו ראיה לא על אמתו ולא על כזבו – נסתפק בו`
Doubt is where every claim starts and where it returns when its support is removed.

### Sources of proof (p112–122)
**From nature — ראיה מצד הטבע.** Self-evident premises that need no further proof:
- `axiom` — מושכלות ראשונים · `ששכל האדם מורה אותם מעצמו` · two exceeds one; the half is less than the whole.
- `sense` — מוחשות · what the senses attest · stone is hard, water wet · Sukkah 40a `יצאו עצים, שהנאתן אחר ביעורן` — seen and felt.

**From convention — ראיה מצד ההסכמה.** Held in common by a community; binding for its members:
- `endoxa` — מפורסמות · what most people hold by being human · pride is base, humility praiseworthy.
- `tradition` — מקובלות · transmitted from fathers and teachers · Scripture, הלכה למשה מסיני, the thirteen מדות, and the word of anyone we may not dispute · Yebamos 40a `ואם יש שם אב – נכסים של אב … דאמר מר: אב קודם לכל יוצאי ירכו` · Sanhedrin 90a proved from Isaiah 60:21 `ועמך כלם צדיקים`.

**From syllogism — ראיה מצד ההקש.** `derivation` · the claim is a valid conclusion from an established premise by any of the five forms · Yebamos 66a (classical) · Horayos 9a `מאחת` (hypothetical: had the Cohen Gadol been liable for one form of the offering without the tenth-ephah form, the Torah would have placed `מאחת` by the rich or the poor man's offering; it did not ⟹ only one liable for all is liable for any).

**Indirect proof** — `proof/indirect` · proving the opposite false proves the claim, `ובלבד שלא יהיו מאותם שיש ביניהם אמצעי` — no-middle opposites only.

### Sources of disproof (p122–132)
- **From nature** — Berachos 58b `וגמירי דלא עבר כסלא` ← `והא קא חזינן דעבר` (sense).
- **From convention** — Chagigah 4a `כל זכורך – לרבות את הקטנים` ← `והא אנן תנן: חוץ מחרש שוטה וקטן` · Bava Kamma 83b `רואין אותו כאלו הוא עבד` ← `והא כתיב: עין תחת עין`.
- **From syllogism:**
  - `disproof/indirect` — the contrary is derived from a true premise. Bava Kamma 83b `אימא במיתה ממש` ← `לא סלקא דעתך – דהא אתקש למכה בהמה ישלמנה` (the juxtaposed verse yields *money*, so *death* falls).
  - `disproof/reductio` — a consequence of the claim is patently false, so the claim is (tollens). Bava Kamma 84a `אין נתינה אלא ממון` ← `אלא מעתה: כאשר יתן מום באדם – הכי נמי דממון הוא?` Recognize `אלא מעתה …`.
  - `disproof/dilemma` — ממה נפשך · every reading of the claim is enumerated and each fails. Bava Kamma 29a `כגון דעברא במיא דרך שרעתא דנהרא` ← `היכי דמי? אי דאיכא דרכא אחרינא – פושע הוא! ואי דליכא דרכא אחרינא – אנוס הוא!` Recognize `היכי דמי? אי … אי …`.

### Rebutting a proof or disproof (p132–142)
A proof or disproof is rebutted by showing it does not bear on the claim, or that its syllogism fails.
- `rebuttal/irrelevant` — the verse, sense report, tradition, etc. does not prove or disprove *this* claim. ex · Bava Kamma 88a `החובל בעבד כנעני שלו פטור`, proved from `כי ינצו אנשים יחדו איש ואחיו` (a slave has no brotherhood) ← `אחיו הוא במצוות` · Berachos 58b `והא קא חזינן דעבר` ← `זיוה הוא דעבר` — the sense report is reinterpreted.
- `rebuttal/invalid-syllogism` — the derivation fails by a Ch 7 defeat. ex · `משיח יוכיח`.
- `rebuttal/your-reasoning` — ולטעמיך / ולדידך · turn the same or another difficulty on the objector's own view, forcing a qualification that saves both. ex · Bava Kamma 88a `אלא מעתה לרבנן עבד יהא כשר למלכות?` ← `ולטעמיך תקשי לך גר לדברי הכל? אלא אמר קרא: מקרב אחיך – המובחר שבאחיך`.
- `rebuttal/just-the-opposite` — אדרבה · lift the difficulty from one's own claim and land it on the opponent's. ex · Bava Kamma 83b `דנין ניזקין מניזקין ואין דנין ניזקין ממיתה` ← `אדרבה! דנין אדם מאדם ואין דנין אדם מבהמה`.
- `rebuttal/that-proves-mine` — היא הנותנת / משם ראיה · the opponent's proof-text is read as proof of one's own view. ex · Shabbos 82a — R. Meir from `לחתות אש מיקוד`; R. Yosi: `משם ראיה! – ולחשוף מים מגבא`.

- After rebuttal · `כל זמן שתסתתר הראיה המאמתת ישוב המאמר מספק … וכן כשתסתתר המכחשת ישוב מספק` — status returns to doubt, in both directions.

**How a rebuttal is recorded.** `warrant.kind` names what the unit *does* to the proof; whatever it leans on — a verse, a received ruling, a reinterpretation, a syllogism — is a premise. Bava Kamma 88a, the deflection `אחיו הוא במצוות` of a proof from `איש ואחיו`:

```json
{ "move":    { "element": "contradiction", "subtype": "opposition", "target": ["2"] },
  "warrant": { "kind": "rebuttal/irrelevant",
               "premises": [{ "text": "אחיו הוא במצוות — a Canaanite slave is a brother in commandments", "provenance": "tradition" }] } }
```

Not `kind: "tradition"` — that would say the unit merely cites a source. The same holds for a rebuttal that reasons: `kind` stays `rebuttal/*`, and the syllogism it runs is described in `premises` or `note`.

### sevara — סברא (p142–144)
- he · `מין ראיה אחרת שאינה לא מאמתת לגמרי ולא מכחשת לגמרי, אלא מטה הדעת לאחד מן הצדדים`
- means · When arguments balance, the mind inclines to the more reasonable side. A tiebreak weight, not a status. A proof from סברא is admissible but weak (p176); a דחיה that is too far-fetched fails against it (p180). No calculus is given — do not invent numbers.
- markers · `מסתברא` · `מסתברא כמאן דאמר …`.
- ex · Chullin 19b `ומסתברא כמאן דאמר: אף מחזיר`.

### Aspects — בחינות (p144–154)
- he · `המאמר שנאמר לפי בחינה אחת לא תעשהו הקדמה לתולדה בבחינה אחרת, כי אין הדמיון וההשואה ביניהם אמתיים אלא נראים`
A predicate is said of a subject *in some respect*. Terms that match as strings do not match as terms unless the respect matches. Four respects:
- `aspect/essence` — מה שבעצמו · what the subject's being depends on; remove it and the subject is something else · a knife is a cutting tool.
- `aspect/proprium` — מה שבסגולתו · always accompanies the subject, though its being does not depend on it · Parah 9:3 `חוץ מן החולדה, מפני שהיא מלקת` — lapping always accompanies the weasel; the ruling depends on it.
- `aspect/accident` — מה שבמקריו · could be otherwise and the subject remain · shape, size; a ruling on "round" or "long" depends on the accident holding.
- `aspect/relation` — מה שביחסו אל זולתו · holds only with respect to another subject · similar/dissimilar, agent/patient; the relational categories: relation, time, situation, possession, position.

- Rule · A claim in one respect neither yields nor blocks a conclusion in another. Pesachim 19b `עזרה רשות הרבים היא` holds for doubtful impurity; it does not make carrying four cubits there a Shabbos liability, and a claim that the עזרה is רשות היחיד for Shabbos does not contradict it. Sifri Naso 5:13 `כשבא איסור הקל על איסור הקל – אסר את אוסריו`: אשת איש is *lighter* than חמותו in the respect of having a release (divorce, death) and *heavier* in the respect of punishment (Yebamos 94b — strangulation vs burning reducible to excision), so an a fortiori between them fails (`fallacy-not-greater`). Specific texts index on whatever respect does the work — a legal domain, a purpose; the four are the general schema. Unknown respect → `null`.

### Modality — בכח / בפועל (p154–156)
- means · A predicate may be said of a subject as actually holding (בפועל) or as a capacity (בכח, `ראוי ל…`). Chaining requires the same modality.
- ex · Zevachim 99a `כהן המחטא – מחלק, ושאינו מחטא – אינו מחלק` ← `וכללא הוא? והרי משמרה כולה דאין מחטאין ומחלקין?` → `ראוי לחיטוי קאמרינן` — the objector read בפועל; the resolution reads בכח.

### Stylistic proofs and disproofs (p156–158)
A statement may be faulted for its *form* rather than its content. These are the standard instances of פירכא.

**The statement as a whole** — `מחקר ישר הספור הוא שתהיה בספור תועלת ולא יהיה בו מותר ודבר בטל`:
- `style/obvious` — פשיטא! · the statement says what everyone knows. Resolved by `סלקא דעתך` (`מהו דתימא … קא משמע לן`): a reason one might have thought otherwise, which the statement excludes.

**The statement in its parts** — no part superfluous or repeated; words fit the matter and each other; order divides what should be divided and joins what should be joined:
- `style/redundant` — הא תו למה לי? · a clause adds nothing.
- `style/self-contradictory` — הא גופא קשיא! · the parts do not cohere.
- `style/order-context` — תנא היכא קאי? (Berachos 2a) · the statement presupposes a context not given.
- `style/order-combine` — ליערבינהו וליתנינהו! (Gittin 80b) · cases that belong together are separated.
- `style/order-inconsistent` — פתח בכד וסיים בחבית! (Bava Kamma 27a) · terms shift mid-statement.

Also in this family: `מאי קא משמע לן?` · `היינו הך` · `וליפלוג … ברישא` · and, as a resolution of an ordering objection, `זו ואין צריך לומר זו קתני`.

---

## §7 · Layer E — Axes of distinction: the 24 הבחנות (Ch 11, p222–236)

- he · `ההבחנות שיש להבחין בנושאים שנרצה לדון כפי הסוגיות וההלכות או כפי השכל`
- Use · When a statement, an אוקימתא, a תירוץ, or a חילוק turns on *which respect* of the subject is in play, record the axis. Also the vocabulary for "what is this sentence about?" when a sentence describes rather than argues.

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
| 24 | axis/opposition | ניגוד | contrast | the opposite of likeness — §5 opposition | — |

Relation to §5's opposition tests: `differs-in-time` = axis 19; `differs-in-place` = 16; `differs-in-context` = whichever axis carries the respect (often 17, 20, 21). Relation to §6's aspects: the aspects say *how* P attaches to S; the axes say *which feature* of S is under discussion.

### Priority — קדימה ואיחור (p236)
- `priority/temporal` זמני — earlier in time.
- `priority/rank` שכלי — higher in dignity: king before people, upper before lower.
- `priority/natural` טבעי — cause before effect, even when simultaneous.

### Order — for the agent's own output (p238–246)
Ramchal's rules for presenting an analysis. **Arrangement** סידור — prior before posterior, known before unknown, general before particular, simple before compound; for a theoretical subject: the subject, its parts, its causes, its accidents; for a practical one: the end, then the means in order. Never use a term before defining it; if unavoidable, say it will be explained. **Definitions** גדרים — by essentials, not accidents. **Division** חילוק — parts exhaustive and disjoint (`לא פחות ולא יותר`), few at the top level, subdivided as deep as needed, levels never mixed, nothing counted twice. ex · Shabbos 2a `יציאות השבת שתים שהן ארבע בפנים, ושתים שהן ארבע בחוץ`.

---

## §8 · Gaps, supplied entries, aliases

**Undefined in the book.** `תיובתא` (§3): definition and effect are `[supplied]`.

**Interpretive effects.** The book fixes effects for the adjudicating elements (proof raises; contradiction rejects; resolution and answer discharge; difficulty unsettles) and for דחיה and שינוי. Treating פירוש דחוק and אוקימתא as *unsettling* their target reads his remark that they cost the author his precision as an effect (`[supplied]`).

**Recognizers.** Stock phrases given here that the book does not itself cite — `שמע מינה`, `תניא נמי הכי`, `מיתיבי`, `לא צריכא`, `אלא מעתה` as reductio marker, `מהו דתימא … קא משמע לן`, `תא שמע` — are standard Talmudic usage supplied for function. Where the book gives a phrase, it is the one quoted in the record.

**No calculus for סברא.** Weight it qualitatively; do not assign numbers.

**Expressiveness ceiling.** Unary predicates; no quantifier nesting; genus and species live in the same structure as everything else. Relational content goes inside the predicate term or onto an axis.

**Transfer beyond the Talmud.** Recognizers in Aramaic are Talmud-specific; every `test ·` line and every Layer B/C/D/E definition is structural and applies to any argumentative text. Use the structural tests alone for non-Talmudic sources.

### Aliases

Other names an agent may meet for the same concepts. Map them to the keys in §0; do not add categories for them.

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
| בנין אב / מה מצינו analogism | binyan av; argument from precedent |
| קל וחומר a fortiori | kal vachomer; כל שכן |
| היקש תלוי / היקש מחלק | hypothetical / disjunctive syllogism; modus ponens–tollens / process of elimination |
| סוג genus · מין species | kind · species |
| הפעל affection | being acted upon |
| מתחבר attribute (axis 15) | accompanying accident |

Spelling: the same terms also appear in defective spelling — פרוש, תרוץ, קשיא, פרכא, רמיא, סיעתא, שנוי, ישוב, אבעיא. This document uses the plene forms common in Talmud study. Treat both as one term.

---

## §9 · Calibration set

The book's own labeled instances not already given above, one line each: `cite — original — gloss — label`.

### Natural foundations of inference (Ch 2, p16–18)
- Berachos 15a — `הקורא … דיעבד – אין, לכתחלה – לא` — "one who *read*" is heard as the completed act — `inference-loose` from verb form.
- Chullin 2a — `הכל שוחטין – לכתחלה` — the participle licenses the ab-initio reading — `inference-loose` from verb form.
- Pesachim 4a — `האי "הכל נאמנים"? "כל הבתים בחזקת בדוקים" מיבעי ליה` — the law should have been phrased on the houses, not the people — `style/self-contradictory` (words not fitted to the matter) → `difficulty/objection`.

### Forms (Ch 3, 6)
- Sanhedrin 90a — `כל ישראל יש להם חלק לעולם הבא` — `categorical`, `simple`; proved from Isaiah 60:21 — provenance `tradition`.
- Yebamos 84a — `יש מותרות לבעליהן ואסורות ליבמיהן` — `partial`, `compound`.
- Kil'ayim 8:1 — `כלאי זרעים … אסורין מלזרוע ומלקיים ומותרין באכילה וכל שכן בהנאה` — `compound-needless`.
- Yebamos 112b — `או חולץ או מיבם` — `disjunction`; all options must be live (Ch 6).

### Relations (Ch 4)
- Pesachim 82b — `רבי יוחנן בן ברוקה ורבי נחמיה אמרו דבר אחד … והא אנינות כלאחר זריקה הויא` — `equivalent` with similar, not identical, subjects; same predicate (burn at once).
- Yebamos 50a — `רבן גמליאל אומר: אין גט אחר גט ולא מאמר אחר מאמר; וחכמים אומרים: יש גט אחר גט ויש מאמר אחר מאמר` — `diametrically-opposed`.

### Warrants (Ch 7, 8)
- Shabbos 70a / Sanhedrin 53a — `העושה אב מלאכה בשבת חייב סקילה` → הכותב, הלש — `classical-syllogism`, subject down.
- Shabbos 43b — mukzeh forbidden to handle ↛ forbidden `מן הצד`, because `טלטול מן הצד אין שמו טלטול` — inclusion fails; conclusion withdrawn.
- Horayos 9a — `מאי שנא "מאחת" דמשמע להו? דכתבה רחמנא לבסוף גבי עשירית האיפה … דאי סלקא דעתך … נכתבה רחמנא להאי "מאחת" בדלות אי נמי בעשירות` — `hypothetical-syllogism-tollens` as `proof/indirect`.
- Bava Kamma 83b — מכה אדם learned from מכה בהמה by `דאתקש` — `analogism` whose similarity premise is `tradition` (juxtaposed subjects teach each other).
- Pesachim 16a / 17b — R. Eleazar's demonstration from Yosi b. Yo'ezer; Rav Papa's counter-claim (`הלכתא גמירי לה`) that would undercut it; Rav Huna's סתירה of Rav Papa (a received law yields no derivations) — proof, undercutting claim, contradiction of the undercutter; the proof recovers.

### Moves (Ch 9)
- Berachos 35a — `כיצד מברכין על הפירות?` — `question/query` for a rule.
- Yebamos 40a — `ואם יש שם אב – נכסים של אב` → `דאמר מר: אב קודם לכל יוצאי ירכו` — `proof/demonstration`, provenance `tradition`.
- Berachos 4a — רומיא from two verses, resolved by יישוב (`שמא יגרום החטא`) — `difficulty/apparentContradiction` → `resolution/settlement`; both verses stand.
- Yebamos 104b — objection to Rava answered by `לא! משום דלאו בני דעה נינהו` — `resolution/alternative`; Rava's claim stays possible, unproven.

### Axes (Ch 11)
- Pesachim 17a vs the enumerated liquids — genus / species — `axis/genus-species`; the two statements are `equivalent`.
- Kesubos 60a — `אידי ואידי חד שיעורא הוא` — two measures equated — `axis/similarity`.

---

*End.*
