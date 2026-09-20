import type { Sugya } from "../sugya.ts";

/**
 * Ramchal quotes both ends of this thread and labels them himself: the proof as
 * `הוכחה` (Heb p173, Eng p174) and Rav Huna's reply as `סתירה` (Heb p177, Eng p178).
 * That gives two attested labels and makes the passage usable as a test fixture.
 *
 * The columns disagree on the second citation: the Hebrew reads `פסחים יח ב`
 * and the English reads "Pesachim 17b". Both are recorded rather than resolved.
 */
export const pesachimLiquids: Sugya = {
  id: "pesachim-liquids",
  title: "Uncleanness of liquids",
  tractate: "Pesachim",
  folio: "16a / 18b (Eng. col. 17b)",
  discussedAt: "Derech Tevunos ch. 9, pp. 174-178",
  party: "party-group",
  units: [
    {
      id: "eleazar",
      speaker: "R. Eleazar",
      en: "Liquids cannot become unclean at all according to Torah law.",
      he: "אין טמאה למשקין כל עקר",
      move: { element: "statement", subtype: "firsthand" },
      provenance: "asserted",
      attested: true,
      anatomy: [
        { kind: "categorical", basis: "marked", note: "`כל עקר`: no uncleanness for liquids at all — the whole class, denied." },
        { kind: "subject-being-affected", note: "Uncleanness is something a thing takes from what touches it, which is chapter 11's eighth distinction exactly. R. Eleazar's claim is that liquids receive no such impression at all." },
      ],
    },
    {
      id: "testimony",
      speaker: "R. Eleazar",
      en: "Know this, for Yosi ben Yo'ezer of Zeredah testified that the ayil locust is clean and that the liquids of the Temple slaughterhouse are clean.",
      he: "תדע, שהרי העיד יוסי בן יועזר איש צרידה על איל קמצא דכן ועל משקין בית מטבחיא דכן",
      move: { element: "proof", subtype: "demonstration" },
      target: "eleazar",
      marker: "תדע, שהרי",
      provenance: "tradition",
      attested: true,
      anatomy: [
        { kind: "hypothetical-syllogism-tollens", note: "If liquids could become unclean by Torah law, the liquids of the Temple slaughterhouse would be unclean; Yosi ben Yo'ezer testified they are clean; so they cannot." },
        { kind: "kind-species", note: "Ramchal reads this very sentence under this distinction (Heb p215, Eng p216): `משקין בי מדבחיא דכן` and `השמן והדם והיין והמים טהורים` say the same thing, he writes, `כי אחד הזכיר הסוג ואחד הזכיר המינים` — one named the genus and the other the species. The proof only works because the Temple liquids are a species of liquid." },
      ],
    },
    {
      id: "ravpapa",
      speaker: "Rav Papa",
      en: "Even according to the one who holds that liquid uncleanness is Torah law, the liquids of the Temple slaughterhouse are a halachah handed down from Sinai.",
      he: "אפלו למאן דאמר טמאת משקין דאוריתא – משקי בית מטבחיא הלכתא גמירי לה",
      move: { element: "contradiction", subtype: "opposition" },
      target: "testimony",
      provenance: "asserted",
      attested: false,
      note: "Ramchal labels only Rav Huna's reply. `דחיה` is inferred here, on the rule at Heb p185 that a `דחיה` may land on a proof that was brought, not only on a statement.",
      anatomy: [
        { kind: "differs-in-context", note: "The testimony speaks of a special halachah handed down from Sinai, not of liquid uncleanness in general — a different respect, so it proves nothing about the general case." },
        { kind: "ground-does-not-reach", note: "Rav Papa does not deny the testimony; he denies that it reaches R. Eleazar's claim. The ground is real and the house stands over a gap — Ramchal's `אחיו הוא במצוות` pattern (Eng p132–136)." },
        { kind: "kind-species", note: "The same distinction as the proof, turned against it. Rav Papa grants that the Temple liquids are a species of liquid and denies that this one carries its own law up to the genus." },
      ],
    },
    {
      id: "ravhuna",
      speaker: "Rav Huna b. Rav Nassan",
      en: "But R. Eleazar concluded that liquids have no uncleanness at all precisely from Yosi ben Yo'ezer's testimony. If that is a halachah from Sinai, could we derive anything from it?",
      he: "ואלא הא דאמר רבי אלעזר אין טמאה למשקין כל עקר … ואי הלכתא גמירי לה – מי גמרינן מנה",
      move: { element: "contradiction", subtype: "direct" },
      target: "ravpapa",
      provenance: "derivation",
      attested: true,
      note: "Ramchal: `הנה כאן סתר שמועתו של רב פפא לחלוטין` — Rav Papa's statement is absolutely contradicted (Heb p177).",
      anatomy: [
        { kind: "hypothetical-syllogism-tollens", note: "If the Temple liquids were a halachah from Sinai, nothing could be derived from them; R. Eleazar did derive from them; so they are not. The same shape as the proof it defends." },
        { kind: "ground-deduction", note: "The contradiction rests on no verse or testimony of its own, only on the deduction beside this badge: R. Eleazar's derivation is the premise, and a received law yields no derivations (Eng p116)." },
      ],
    },
  ],
};
