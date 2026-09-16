# Derech Tevunos as a formal structure: analysis and visualization build spec

**Companion edition:** the Feldheim bilingual edition (trans. Sackton & Tscholkowsky, *The Ways of Reason*, 1988/2014).

**Audience:** an agent that will implement the seven visualizations in section 5.

**Status of this document:** section 1 is derivation, section 2 is the data model, section 3 is regression traps, section 4 is source navigation, section 5 is the build specs. Read 1 through 4 before implementing anything in 5. Section 3 in particular is not optional. Every item in it is a place where the correct behavior is the opposite of the library default you will reach for.

---

## 0. Source edition

The source is a facing-page bilingual edition. Page numbers in this document follow that print.

- **Odd pages are Hebrew. Even pages are English.** Page 4 is the first content page.
- Chapter ranges (both languages interleaved): Intro 4–8, Ch1 9–12, Ch2 13–20, Ch3 21–46, Ch4 47–64, Ch5 65–74, Ch6 75–90, Ch7 91–110, Ch8 111–160, Ch9 161–188, Ch10 189–220, Ch11 221–246.
- Back matter: chapter outlines 249–254, general index 255–258, source index 261–262. The chapter outlines at 249–254 are a complete taxonomy of the entire book and are the fastest way to verify any enum in this document.

Every citation in this document is given as chapter plus English page number. Verify before implementing. Where this document gives a Hebrew term, it has been checked against the Hebrew column at the cited page.

---

## 1. How the formal reframing was derived

This section exists so you can extend the analysis rather than only execute it. Each step is a reading of a specific passage.

### 1.1 The primitive is a Galois connection, not a claim graph

Chapter 3 (p22, Hebrew p21) defines every statement as `נשוא` (predicate, the thing affirmed or denied) applied to `נושא` (subject, the thing it is affirmed of). That looks like an RDF triple minus the object, and the obvious move is to build a claim graph. That move is wrong.

Chapter 7 (p92) states two propagation rules:

> if a predicate is applied to a subject, then whatever is a subcategory or attribute of the predicate must also be applicable to the same subject. In addition, whatever is a subcategory of the subject must have the same predicate applied to it.

Worked out against his own examples:

- Knife is mukzeh. Mukzeh implies forbidden-to-handle. Therefore knife is forbidden-to-handle. The **predicate moves up** its order.
- Writing is a primary work. Primary works incur stoning. Therefore writing incurs stoning. The **subject moves down** its order.

A binary relation that is downward closed in objects and upward closed in attributes is, by definition, a formal context in Formal Concept Analysis. The derivation operators

```
A' = { ν ∈ P : ∀ s ∈ A, (s,ν) ∈ I }        for A ⊆ S
B' = { s ∈ S : ∀ ν ∈ B, (s,ν) ∈ I }        for B ⊆ P
```

form a Galois connection, and the fixed points `(A,B)` with `A'=B` and `B'=A` are the formal concepts. They form a complete lattice.

**Consequence.** A sugya is not an argument about a proposition. It is an argument about the contents of one cell of an incidence matrix. The thing worth drawing is the concept lattice that matrix induces, and the thing that changes over the course of a sugya is the lattice's shape.

This also explains why Ramchal immediately warns (Ch7, p96) that the whole apparatus collapses when the subsumption claims are disputed. In FCA terms: the object and attribute orders are themselves derived from the context, so a disagreement about `≤` is a disagreement about `I`. There is no separate TBox to stabilize.

### 1.2 Chapter 8 makes it an interval of lattices, not a lattice

Chapter 8 (p112) sets three acceptance states: accepted, rejected, and `ספק` (doubt), with **doubt as the resting state**. Proof moves to accepted, disproof to rejected, and a rebutted proof returns to doubt rather than to rejected.

So the incidence relation is three-valued: `I : S × P → {1, 0, ?}`. Define

- `K⁻` = floor context, all `?` mapped to `0`
- `K⁺` = ceiling context, all `?` mapped to `1`

With `k` doubtful cells there are `2^k` consistent contexts. What you know is the interval `[K⁻, K⁺]`. A sugya is a search that raises the floor or lowers the ceiling.

**The non-obvious result.** Concept count is not monotone in `I`. An empty context has 2 concepts, a full context has 1, and the maximum is in the middle. So resolving a doubtful cell can either grow or shrink the lattice. Worked on the Shabbos 5b fixture in section 5.1, resolution takes the lattice from 4 concepts to 2. The Gemara's move there does not add a distinction, it destroys one. No claim-graph rendering can show this, because the quantity that changes is the node count, not a node's status.

### 1.3 Aspects make it a presheaf

Chapter 8 (pp144–150, Hebrew 143–149) establishes that a predication is indexed to an aspect, and that an inference chain is invalid if the aspects differ. His case: `עזרה רשות הרבים היא`, the Temple court is a public domain, holds under the law of doubtful impurity and **not** under Sabbath law. You may not chain the first into a Sabbath-law syllogism.

The four aspects (Hebrew p147–149):

| Hebrew | English | Meaning |
|---|---|---|
| `מה שבעצמו` | essence | removal destroys the subject's identity |
| `מה שבסגולתו` | proprium | always accompanies, identity does not depend on it |
| `מה שבמקריו` | accident | could be otherwise, subject survives |
| `מה שביחסו אל זולתו` | relational | holds only in conjunction with another subject |

So there is not one context. There is a family `I_α ⊆ S × P` indexed by aspect, with no maps between fibers by default. That is a presheaf over the aspect index set. Ramchal's bridging arguments are the restriction maps, and his rule is: do not fabricate a restriction map you were not given.

When local sections agree pairwise but no global section exists, the failure is an obstruction to gluing. This is formally the same object that sheaf-theoretic data integration uses to score ontology merges. You do not need to compute cohomology to visualize it. You need the disagreement set plus the set of inference chains that would only be legal under an assumed gluing. See 5.3.

Chapter 8 (p154, Hebrew p153) adds a second, orthogonal index: `בכח` / `בפועל`, potential and actual. The Zevachim 99a case turns entirely on it. So the fibration is over `aspect × modality`.

Chapter 11 (pp222–236) supplies 24 `הבחנות`, distinctions through which a subject may be interrogated. These type the attribute order: `≤_P` is not one poset but up to 24 disjoint ones.

### 1.4 Chapter 5 is circumscription

The `דיוק` (Ch5, p66, Hebrew p65) takes an asserted cell and infers negation over the complement of the mentioned subject. His example (Ch5, p68): Rabbi Yehudah says one who traps a deer **in a house** is liable, therefore not in a game preserve. The reasoning given is explicitly pragmatic: if he meant all trapping, he would not have narrowed the subject.

That is minimal-model reasoning, scoped to the sibling set of the mentioned subject within its immediate parent class. It is not global closed-world assumption and it is not OWL negation.

Chapter 5 also splits inferences into `מוכרח` (necessary) and `בלתי־מוכרח` (not necessary) and demonstrates a retraction (Berachos 53a, pp70–72): the inference is killed because the Tanna was merely mirroring the phrasing of the preceding clause. So there are two entailment relations on the same context, one monotonic and one defeasible, and two corresponding closures whose difference is exactly the fragile commitments.

### 1.5 Analogism is a functional dependency

Chapter 7 (pp96–104) gives three defeat conditions for `היקש`/analogism and a fortiori:

1. the subjects turn out not to be similar
2. the greater/lesser ordering turns out not to hold
3. a third similar subject exists which lacks the predicate

Condition 3 is a functional dependency violation. The analogy asserts `A → p` over the subject table, where `A` is the shared attribute set. A third row agreeing on `A` and disagreeing on `p` falsifies the dependency. His own instance: individual, prince, and Cohen Gadol, where Cohen Gadol shares the antecedent attribute and lacks the consequent.

Armstrong's axioms apply directly. This reduces to a table scan, not a reasoner.

### 1.6 A fortiori requires comparability in an intersection of orders

Condition 2 is stronger than it looks. Chapter 8 (pp152–154) shows adultery is lighter than incest under nullifiability and heavier under punishment severity. So severity is a **per-aspect partial order**, and a kal vachomer illegitimately assumes it is total.

Formally: `a <_α b` must hold in every aspect `α` relevant to the predicate. Validity is comparability in `⋂_α G_α`. Incomparability in any single aspect kills the inference. Horayos 10a (Ch7, pp100–102), Cohen Gadol versus prince, is a second instance where the order reverses.

This is a transitive-closure-and-intersect check. Cheap, total, and it is a real linter.

### 1.7 Unification is coordinate equality in a product space

Putting 1.1 and 1.3 together, a claim is a point in

```
S × P × PredicationType(11) × Aspect(4) × Modality(2)
```

Two claims may be chained in a syllogism only if they agree on the index coordinates and are ordered on `S`/`P`. "Same term" is equality in a quotient, not string equality. This is the cheapest thing in the document to visualize and it catches the aspect fallacy, the modality fallacy, and the predication-type fallacy with one view.

### 1.8 Chapter 10 makes compression measurable

Chapter 10 (pp192–212) gives an explicit procedure for reconstructing the elided justification DAG from a compressed Talmudic surface, and works Shabbos 5b all the way out: a single rhetorical clause expands to a hypothetical syllogism, a supporting classical syllogism, a definitional chain, and then on the resolution side an analogism. He numbers them 1a–1c, 2a–2c, 3a–3c, 4a–4c.

So the ratio of surface tokens to reconstructed DAG nodes is a defined, computable quantity. This is the one visualization here whose inputs cannot be extracted mechanically, because reconstruction is the hard part. Treat it as lowest confidence.

### 1.9 Chapter 6 is per-field validation, not a truth value

Chapter 6 (pp76–90) decomposes truth conditions per predication type into independently failing intentions. This does not feed the lattice visualizations directly, but it governs how a cell's value is computed from a source statement, so it belongs in the data model.

Two results that must be implemented literally:

- **Exceptive** (p80): two intentions. If the exception fails, the statement is not false. The base predication survives and only the exception clause fails. Same shape for conditional (p82).
- **Hypothetical versus consequent** (pp82–90): the hypothetical has exactly **one** intention, the dependency. Antecedent and consequent truth are irrelevant. His counterexample (p86) is a true antecedent and a true consequent with a false statement. The consequent statement has **three** intentions, all required.

Material implication is therefore the wrong semantics for the hypothetical. Ramchal is committed to relevance.

---

## 2. Canonical data model

Implement this before any rendering. All seven visualizations read from it.

```ts
type Aspect = 'essence' | 'proprium' | 'accident' | 'relational';
type Modality = 'potential' | 'actual';

type PredicationType =
  | 'simple'        // מאמר סתם
  | 'qualified'     // מיוחד; carries Qualifier
  | 'exclusion'
  | 'exception'
  | 'conditional'
  | 'hypothetical'
  | 'compound'      // subtypes: simpleCompound | disjunction
  | 'preclusive'
  | 'discrepancy'
  | 'comparative'
  | 'consequent';

type Qualifier = 'certain' | 'possible' | 'doubtful' | 'impossible';

type SubjectQuantity =
  | 'universal'     // כוללים
  | 'singular'      // פרטיים  (one individual; NOT the same as existential)
  | 'partial'       // קצתיים  (existential)
  | 'unqualified';  // סתמי — treated as universal by default

type Provenance =
  | 'sense'         // מוחש
  | 'axiom'         // מושכל
  | 'endoxa'        // מפורסמות
  | 'tradition'     // מקובלות
  | 'derivation';   // logical

type Status = 'accepted' | 'rejected' | 'doubt';   // default: 'doubt'

type Intention = {
  key: string;              // e.g. 'base', 'exception', 'dependency'
  holds: boolean | null;    // null = undetermined
  principal: boolean;       // designated field; failure sinks the whole statement
};

type Claim = {
  id: string;
  subject: string;          // node id in the subject order
  predicate: string;        // node id in the predicate order
  quantity: SubjectQuantity;
  predicationType: PredicationType;
  qualifier?: Qualifier;
  aspect: Aspect;
  modality: Modality;
  hevchana?: number;        // 1..24, Ch11; types the predicate order
  intentions: Intention[];
  status: Status;           // default 'doubt'
  cite: { tractate: string; folio: string; page: number };
};

type ElementKind =
  | 'statement'      // מימרא
  | 'question'       // שאלה
  | 'answer'         // תשובה
  | 'contradiction'  // סתירה
  | 'proof'          // ראיה
  | 'difficulty'     // קשיא
  | 'resolution';    // תרוץ

type AttackKind =
  | 'setirah'        // סתירה   → target becomes 'rejected'
  | 'dechiyah'       // דחיה    → target becomes 'doubt', NEVER 'rejected'
  | 'pircha'         // פרכא    → formal/structural objection
  | 'ramya'          // רמיא    → apparent contradiction between two sources
  | 'teyuvta';       // תיובתא  → UNDEFINED IN SOURCE. See §3.10.

type Move = {
  id: string;
  kind: ElementKind;
  attack?: AttackKind;
  from: string;             // claim id or source id
  to: string;               // claim id
  provenance: Provenance;
  cite: { page: number };
};

type Order = {              // one per hevchana for predicates; one for subjects
  nodes: string[];
  edges: [string, string][];  // [lower, upper]
};

type Context = {            // the formal context, three-valued
  subjects: string[];
  predicates: string[];
  cells: Record<string, 1 | 0 | null>;   // key: `${s}|${p}|${aspect}|${modality}`
};
```

### Status reducer

This is roughly thirty lines and it is the entire intellectual content of the runtime. Write it as a pure function and test it before anything renders.

```
reduce(status, move) -> status

  proof accepted by the target's standard        → accepted
  setirah landing                                 → rejected
  dechiyah landing                                → doubt            (even from accepted)
  pircha landing                                  → doubt
  ramya landing                                   → doubt
  resolution (ישוב, settlement) landing           → accepted
  resolution (שינוי, alternative) landing         → doubt            (defends without asserting)
  rebuttal of a proof                             → doubt            (NOT rejected)
  rebuttal of a disproof                          → doubt            (NOT accepted)
  no applicable move                              → doubt            (initial state)
```

`סברא` (Theory, Ch8 p142, Hebrew `מסתברא` p143) is a tiebreak weight, not a status. Model it as a real-valued preference on claims, consulted only when attacks balance. It never produces `accepted` on its own.

---

## 3. Regression traps

Every item here is a place where the standard library behavior is wrong. If you refactor and these break, the visualization is silently lying.

1. **Doubt is the initial state, not a fallback.** Nodes start gray. Promotion is explicit. Do not initialize to accepted.
2. **`דחיה` yields doubt, never rejected.** Ch9 p178: an opposition undermines certainty while leaving the claim possible. Every argument-mapping library conflates attack with negation. This one does not.
3. **Rebutting a proof does not prove the negation.** Ch8 p142, stated explicitly. Attack defeats an argument; it does not establish the contrary.
4. **Exceptive and conditional statements fail partially.** Ch6 pp80–82. A failed exception clause leaves the base predication true. Do not model the statement as a conjunction.
5. **The hypothetical has one truth condition, the dependency.** Ch6 pp82–86. True antecedent plus true consequent plus no dependency equals a false statement. Do not implement `→` as material implication.
6. **The consequent statement has three truth conditions, all required.** Ch6 pp88–90. It is not the same construct as the hypothetical and must not share a code path with it.
7. **Aspect equality is required for chaining.** Ch8 pp144–146. Same subject string plus same predicate string plus different aspect equals different term. Do not unify on string identity.
8. **Modality equality is also required.** Ch8 p154. `בכח` and `בפועל` do not unify.
9. **Concept count is not monotone in `I`.** Adding incidences can shrink the lattice. Do not assume ceiling ⊇ floor in node count, do not animate the transition as a monotone growth, and do not use "number of concepts" as a progress bar.
10. **`תיובתא` is listed and never defined in the source.** Ch9 p180 announces three kinds of `קשיא` and defines `פרכא` and `רמיא` only; the translator flags the gap in-line. Do not invent a definition. Surface it as an explicit `undefined-in-source` marker in the UI. This is a genuine lacuna and hiding it is a correctness failure.
11. **`דיוק` is scoped negation-as-failure, not global CWA and not OWL negation.** Ch5 p68. Scope is the sibling set within the immediate parent class of the mentioned subject.
12. **Non-necessary inferences are retractable.** Ch5 pp70–72. The Berachos 53a fixture exists specifically to test that your closure can lose an edge. If your inference cache cannot shrink, it is wrong.
13. **`סתמי` (unqualified) defaults to universal.** Ch3 p24. Do not treat a missing quantifier as existential.
14. **Singular is not the same as partial.** Ch3 p24. Ramchal splits `פרטיים` (one individual) from `קצתיים` (some of a class), unlike the standard A/E/I/O square. Keep them distinct.
15. **Color must not be the sole encoder of status.** Doubt must be distinguishable from accepted and rejected by pattern or shape as well as hue, in both light and dark rendering. Three states that differ only in hue fail for a meaningful fraction of readers and fail entirely in monochrome print.

---

## 4. Extracting the data

You have the source text. You do not have a parsed corpus. Two paths:

**Path A, hand-curated fixtures (recommended for v1).** Every visualization below ships with a fixture drawn from a passage Ramchal has already analyzed. He does the extraction for you and the intermediate steps are printed. Build against these first. They are ground truth and they are small.

**Path B, extraction at scale.** If you go here, extract from the English column, and use the Hebrew column only to disambiguate technical terms. The chapter outlines at pp249–254 give you the complete closed vocabulary, so extraction is classification into known enums rather than open information extraction. Expect the aspect and modality indices to be the hardest fields, because they are usually implicit. A missing aspect should be `null`, never a guessed default, because a guessed aspect silently re-enables exactly the fallacy the system exists to block.

---

## 5. The seven visualizations

Ranked by formal content, which is also roughly inverse to implementation cost. Items 4, 5 and 6 are shippable in a day each. Items 1 and 2 are the ones with no existing tooling anywhere.

Each spec has: what it shows, the formal object, inputs, algorithm, rendering, fixture, acceptance test, and failure modes.

---

### 5.1 Lattice interval under doubt

**Shows.** What is actually known when some cells are undetermined: not one lattice, but the interval between two.

**Formal object.** Three-valued formal context `K = (S, P, I)` with `I : S×P → {1,0,?}`. Floor `K⁻` maps `?→0`, ceiling `K⁺` maps `?→1`. Render `𝔅(K⁻)` and `𝔅(K⁺)` as Hasse diagrams.

**Inputs.** `Context`, restricted to one `(aspect, modality)` fiber. Cross-fiber contexts are meaningless here; see 5.3.

**Algorithm.**
1. Enumerate concepts with NextClosure (Ganter). Complexity `O(|S|·|P|·|𝔅|)`. For fixtures of this size, brute force over `2^|S|` closures is fine and easier to verify.
2. Hasse edges by extent containment with no intermediate: `(A₁,B₁) < (A₂,B₂)` iff `A₁ ⊂ A₂` and no concept strictly between.
3. Layout by rank, where rank is the length of the longest chain from the bottom.
4. Compute `2^k` where `k` is the count of `?` cells, and display it as the size of the consistent-context space.

**Rendering.** Two Hasse diagrams side by side, floor left and ceiling right. Label each node with its intent, subtitle with its extent. Highlight the doubtful cells in a companion incidence grid. Interactive version: click a `?` cell to pin it to 1 or 0, recompute both lattices, and animate. Because concept count is not monotone, animate as a crossfade rather than a growth transition.

**Fixture.** Shabbos 5b, Ch10 pp196–210. Ramchal's own worked example.

```
S = { C: carry store→street via colonnade,
      F: carry four cubits in public domain,
      D: direct domain-to-domain transfer }
P = { E: has intervening exempt area,
      L: liable }

I:  C×E = 1    C×L = ?     ← the cell under dispute
    F×E = 1    F×L = 1
    D×E = 0    D×L = 1
```

**Acceptance test.** This is exact. If your implementation disagrees, it is broken.

```
𝔅(K⁻)  =  4 concepts, a diamond:
          ({C,F,D}, ∅)
          ({C,F}, {E})        ({F,D}, {L})
          ({F}, {E,L})

𝔅(K⁺)  =  2 concepts, a chain:
          ({C,F,D}, {L})
          ({C,F}, {E,L})
```

Resolving the doubtful cell removes the concept `({C,F}, {E})`, which is the concept "has an exempt gap and is not liable." The Gemara's resolution does not add a fact, it collapses a distinction.

**Failure modes.** Assuming the ceiling is larger. Rendering the interval as a single lattice with some nodes faded, which is wrong because the two lattices have different node sets and no natural map between them. Using status color on lattice nodes, which is a category error: status lives on cells, not on concepts.

---

### 5.2 Circumscription diff

**Shows.** Exactly which entailments hold only by default and are therefore retractable.

**Formal object.** Two closures of the same asserted context. `I_mono` contains only explicit statements plus necessary inferences (`מוכרח`). `I_circ` additionally contains the `דיוק` negations: for an asserted `(s₀, ν)` where `s₀` is a narrowed subject, add `(s, ¬ν)` for every `s ∈ siblings(s₀)` within `parent(s₀)`. Diff the two lattices.

**Inputs.** Asserted claims, the subject order (needed for `siblings` and `parent`), and a list of known defeaters.

**Algorithm.**
1. Build `I⁺` and `I⁻` as disjoint positive and negative incidence sets. You need real negative information here, so a single three-valued matrix is insufficient. Represent as `(I⁺, I⁻)` with `I⁺ ∩ I⁻ = ∅`.
2. `I_mono` = asserted plus Ch5 necessary inferences only. Those are, per Ch5 pp72–74:
   - universal affirmative → contrapositive (`חילוף הפכי כולל`) and limited converse (`חילוף קצתי`)
   - universal negative → complete converse (`חילוף כולל`)
   - partial affirmative → absolute opposite, limited contrapositive, limited converse
   - partial negative → the same three
3. `I_circ` = `I_mono` plus scoped `דיוק` negations.
4. Diff. Every cell in `I_circ \ I_mono` is a defeasible commitment. Every lattice edge present only under `I_circ` is fragile.
5. Apply a defeater and recompute, to show an edge disappearing.

**Rendering.** One lattice with dual encoding: solid strokes for the monotone closure, dashed for the circumscribed-only additions. A toggle strips the defaults. A counter shows fragile-edge count. Companion view: the "penumbra" diagram, with the asserted subject as a solid region and the default negation as a dashed halo around it, which collapses on defeat.

**Fixtures.**
- Construction: Shabbos 106a / Betzah 24a, Ch5 p68. "Traps a deer in a house is liable" yields default not-liable for a game preserve.
- Defeat: Berachos 53a, Ch5 pp70–72. "If most are Jewish, bless" yields default not-blessing for half-and-half, and the Gemara retracts it because the Tanna was mirroring the prior clause's phrasing.

**Acceptance test.** After applying the Berachos 53a defeater, the corresponding negative cell must be removed and any lattice edge depending solely on it must disappear. If your closure is a monotone cache, this test fails.

**Failure modes.** Implementing `דיוק` as global CWA, which over-generates catastrophically. Implementing it as OWL `complementOf`, which is monotone and cannot be defeated. Scoping siblings to the whole subject order rather than the immediate parent class.

---

### 5.3 Aspect fibration and gluing obstruction

**Shows.** Where two locally consistent bodies of claims about the same subject cannot be merged, and which specific inference chains an unwarranted merge would enable.

**Formal object.** Presheaf `F` over the index set `Aspect × Modality`, discrete by default. Sections are local contexts `I_α`. Restriction maps exist only where a bridging argument supplies one. A global section exists iff all local sections agree on shared subjects under the supplied maps.

**Inputs.** `Context` with cells keyed by aspect and modality. Optional list of explicit bridging axioms.

**Algorithm.** Do not compute cohomology. Compute two finite sets:
1. **Disagreement set.** All `(s, ν, α, β)` with `(s,ν) ∈ I_α` and `(s,ν) ∉ I_β`, `α ≠ β`.
2. **Illegal-chain set.** All syllogism chains in the corpus whose premises span more than one fiber with no supplied bridging map. These are the inferences that would be licensed by a naive merge and are not licensed here.

Report `|illegal-chain set|` as the merge risk score.

**Rendering.** Horizontal lanes, one per fiber. Claims sit inside their lane. Legal chains render as solid intra-lane edges. Illegal chains render as dashed cross-lane edges with a blocking marker at the boundary. Supplied bridging axioms render as labeled gates that let a specific chain through. Do not draw a cross-lane edge without either a block marker or a gate, because an unmarked cross-lane edge is the exact error the visualization exists to prevent.

**Fixture.** Pesachim 19b, Ch8 pp144–146.

```
subject: Temple court
aspect = accident, law-domain = impurity  →  is a public domain  →  doubtful impurity ruled clean
aspect = accident, law-domain = Shabbat   →  is NOT a public domain

illegal chain: "Temple court is a public domain" ⊢ "carrying beyond four cubits is liable"
```

Note that in this case the differing index is a legal domain rather than one of Ramchal's four aspects. His four aspects are the general schema; specific texts index on whatever distinction is doing the work. Model the index as an open string set with the four aspects as a typed subset, not as a closed enum of four.

**Failure modes.** Treating the aspect index as decoration on a single merged graph. Auto-inferring a bridging map from subject-string identity, which is precisely the ontology-merge disaster this reproduces.

---

### 5.4 Comparability intersection for a fortiori

**Shows.** Whether a kal vachomer is structurally valid, independent of its content.

**Formal object.** A severity DAG `G_α` per aspect over subjects. The inference `a ⟹ b` is valid iff `a <_α b` in `⋂_α G_α*` (transitive closures intersected), over the aspects relevant to the predicate. Incomparability in any single relevant aspect invalidates.

**Inputs.** Per-aspect severity edges, plus the claimed inference.

**Algorithm.**
1. Transitive closure of each `G_α`. Warshall is fine at this scale.
2. Intersect the closed edge sets.
3. For each asserted a fortiori, check reachability `a → b` in the intersection.
4. If unreachable, report the specific aspect or aspects in which `a` and `b` are incomparable or reversed. That diagnostic is the whole value.

**Rendering.** Overlay the per-aspect DAGs on a shared node layout, one edge color per aspect paired with a distinct dash pattern, since color alone is insufficient. Intersection edges render solid and heavy. Claimed inferences that fail render as a flagged edge with the offending aspect named.

**Fixtures.**
- Reversal: Sifri Naso 5:13 plus Yebamos 94b, Ch8 pp152–154. Adultery is lighter than incest under nullifiability and heavier under punishment severity. The intersection leaves them incomparable, so the a fortiori is invalid.
- Second reversal: Horayos 10a, Ch7 pp100–102. Cohen Gadol versus prince, order reverses on a second criterion.

**Acceptance test.** Both fixtures must return invalid, and the diagnostic must name the reversing aspect.

**Failure modes.** Building one global severity order. Treating severity as a numeric score, which manufactures totality where the source insists on partiality.

---

### 5.5 Dependency-violation grid

**Shows.** Whether an analogism's implied functional dependency actually holds over the known subjects.

**Formal object.** A relation with rows as subjects and columns as `הבחנות` plus the target predicate. The analogism asserts `A → p`. A violation is two rows agreeing on `A` and differing on `p`.

**Inputs.** Subject-attribute table, the antecedent column set `A`, the target column `p`.

**Algorithm.**
1. Group rows by their projection onto `A`.
2. Any group with more than one distinct value of `p` is a violation.
3. Optionally compute the Armstrong closure `A⁺` to report what the antecedent set does determine.
4. Report the minimal additional column that would repair the dependency. That is the distinction the sugya is looking for.

**Rendering.** A grid. Antecedent columns marked as selected. Violating row pairs highlighted together, with the differing `p` cells emphasized. A side panel shows `A⁺` and the repair candidate.

**Fixture.** Toras Cohanim, Sin Offerings §5, Ch7 pp98 and 104.

```
                | brings male sacrifice for later-known sin | doubtful guilt offering
individual      | no                                        | yes
prince          | yes                                       | claimed yes  (the analogism)
Cohen Gadol     | yes                                       | no           (the counterexample)
```

`A = {brings male sacrifice for later-known sin}`, `p = {doubtful guilt offering}`. Prince and Cohen Gadol agree on `A` and differ on `p`. The dependency fails, which is exactly the Sifra's `יוכיח` rebuttal.

Second fixture for defeat condition 1: Kerisos 26a, Ch7 p100, public sacrifices versus prince.

**Failure modes.** Treating the analogism as a similarity score. It is not fuzzy. It is a hard dependency and it either holds or a counterexample row exists.

---

### 5.6 Parallel-coordinates unification view

**Shows.** Why two claims that look identical cannot be chained.

**Formal object.** Each claim is a point in `S × P × PredicationType × Aspect × Modality`. A chain is legal only if the index coordinates agree and the `S`/`P` coordinates are appropriately ordered.

**Inputs.** A list of `Claim`, plus a proposed chain.

**Algorithm.** Trivial. Project each claim to five coordinates. For a proposed chain, find the first coordinate where the claims diverge and report it.

**Rendering.** Five vertical axes. Each claim is a polyline. A proposed chain draws both claims; where they coincide the line is heavy, and at the first divergent axis it splits, with the axis labeled as the blocker. Ordering on the `S` and `P` axes is drawn as position, so subsumption is visible as vertical offset rather than as divergence.

**Fixtures.**
- Aspect divergence: Temple court, Ch8 pp144–146.
- Modality divergence: Zevachim 99a, Ch8 pp154–156. "The Cohen who sprinkles" read as actual versus potential.
- Predicate-order divergence: mukzeh and carrying in an unusual way, Ch7 p96, Shabbos 43b. The predicate turns out not to subsume.

**Why this one first.** It is the cheapest build in the document, it requires no lattice engine, and it catches three distinct fallacy classes with one view. If you ship one thing, ship this.

---

### 5.7 Reconstruction depth map

**Shows.** How much argument is elided per unit of surface text.

**Formal object.** For a passage, the ratio of reconstructed justification-DAG node count to surface token count, following Ch10's procedure: normalize each utterance to `(subject, predicate, predicationType)` even when the surface form is a question or an objection, tag its `ElementKind`, verify the role is discharged, then recursively expand the justification chain until reaching a terminal (`sense`, `axiom`, `endoxa`, or `tradition`).

**Inputs.** Passage text plus a reconstructed DAG. The DAG is the expensive part.

**Algorithm.**
1. Surface token count is trivial.
2. DAG reconstruction is not mechanizable at acceptable accuracy from this text alone. Build the fixture by hand from Ramchal's own worked expansion, and mark every other passage as requiring human review before its number is displayed.
3. Ratio, plus DAG depth, plus terminal-type distribution.

**Rendering.** Scatter or bar per passage, with drill-down to the DAG. Any auto-reconstructed passage must be visually marked as unverified.

**Fixture.** Shabbos 5b, Ch10 pp196–210. Ramchal prints the expansion himself and numbers the steps:

```
surface (difficulty side):  "Have you ever heard of such a case being liable?"
reconstructed:
  proposition:  carrying store→street via colonnade should not be liable
  1a/1b/1c      hypothetical syllogism
  2a/2b/2c      classical syllogism supporting 1a
  3a/3b/3c      definitional chain, collapsed into a single argument at p206
surface (resolution side): "The principle is the same as carrying four cubits in a public domain"
reconstructed:
  4a/4b/4c      analogism, plus an elucidation of the comparison
```

**Acceptance test.** Your reconstruction of Shabbos 5b must reproduce Ramchal's numbered steps, including his final collapse into a single chain at p206. If it does not, do not run the extractor on anything else.

**Failure modes.** Publishing auto-reconstructed ratios as if they were measured. This visualization is the most seductive and the least trustworthy in the set. Its honest form is a small hand-verified sample, not a corpus-wide heatmap.

---

## 6. Build order

1. Data model plus status reducer plus the section 3 test table. Nothing renders until these pass.
2. **5.6** parallel coordinates. No lattice engine, catches three fallacy classes, validates the index model.
3. **5.4** and **5.5**. Both reduce to predicates over finite relations. Ship as static analyzers over the fixture set.
4. **5.1** lattice interval. Needs a concept enumerator and a Hasse layout. The Shabbos 5b acceptance test in 5.1 is exact, so correctness is verifiable before any layout work.
5. **5.3** aspect lanes. Depends on 5.1 for the per-fiber lattices.
6. **5.2** circumscription diff. Depends on 5.1 plus a retractable closure, which is the hardest runtime requirement here.
7. **5.7** last, hand-verified only.

## 7. What this system does not give you

State these limits in the UI rather than papering over them.

- **No polyadic relations.** `נשוא` is a unary predicate; relational content is packed inside the predicate term. You cannot express "every person has a father" with correct quantifier scope. The 24 `הבחנות` are the partial workaround, functioning as a case-role inventory, but they are slots on a subject rather than true relations.
- **No variables, no quantifier nesting.** This is the term-logic ceiling.
- **No schema/instance separation.** There is no TBox. Genus and species (Ch11 p228) live in the same structure as everything else.
- **No calculus for `סברא`.** Plausibility is a stated tiebreak weight with no ordering formalism. Do not invent numbers for it.
- **`תיובתא` is undefined.** See trap 10.
- **Formalization is a reading.** Every enum in section 2 traces to a specific passage, but the mapping from Ramchal's prose to FCA is an interpretation. Keep the citations in the data model so a reader can check the reading against the source. That is the difference between a tool and a claim.
