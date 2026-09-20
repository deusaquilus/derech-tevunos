import type { Sugya } from "../sugya.ts";

/**
 * Ramchal's own illustration of `רמיא` and of `ישוב`, Heb p183, Eng p184.
 * Both labels are his. The two verses enter as `tradition`, so they hold
 * authority before the sugya begins.
 *
 * The three statements carry word spans (`spans.ts`) for their subject and
 * predicate in both languages — the corpus's demonstration of the roles. The
 * second verse is the reason a role takes a list: its predicate, `ויירא … מאד`,
 * is split around its subject, so it is two ranges, not one.
 */
export const berachosYaakov: Sugya = {
  id: "berachos-yaakov",
  title: "The promise and the fear",
  tractate: "Berachos",
  folio: "4a",
  discussedAt: "Derech Tevunos ch. 9, p. 184",
  party: "party-individual",
  units: [
    {
      id: "promise",
      speaker: "Genesis 28:15",
      en: "Behold I am with you and will protect you wherever you go.",
      he: "והנה אנכי עמך ושמרתיך בכל אשר־תלך",
      move: { element: "statement", subtype: "firsthand" },
      provenance: "tradition",
      attested: true,
      anatomy: [
        { kind: "subject-action", note: "The predicate is what one party does for another — protection — which is chapter 11's seventh distinction. It is a promise of action, so the settlement can later ask on what the action depends without touching the words." }, { kind: "categorical", basis: "marked", note: "`בכל אשר תלך`: protection everywhere, the whole class of places." },
      ],
      spans: {
        he: { subject: [{ from: 2, to: 2 }], predicate: [{ from: 3, to: 6 }] },
        en: { subject: [{ from: 2, to: 2 }], predicate: [{ from: 3, to: 12 }] },
      },
    },
    {
      id: "fear",
      speaker: "Genesis 32:8",
      en: "And Yaakov was very much afraid.",
      he: "ויירא יעקב מאד",
      move: { element: "statement", subtype: "firsthand" },
      provenance: "tradition",
      attested: true,
      anatomy: [
        { kind: "attribute-in-attached", note: "Fear is an accident inhering in Yaakov, the shape of Ramchal's own example `בהמה מסכנת – שיש בה מקרה הסכנה` (Heb p231). It says nothing about what he is, only about a condition he is in — which is why the settlement can leave both sentences standing." }, { kind: "particular" },
      ],
      spans: {
        he: { subject: [{ from: 2, to: 2 }], predicate: [{ from: 1, to: 1 }, { from: 3, to: 3 }] },
        en: { subject: [{ from: 2, to: 2 }], predicate: [{ from: 3, to: 6 }] },
      },
    },
    {
      id: "rami",
      speaker: "R. Yaakov bar Idi",
      en: "He raised a contradiction: it is written thus, and it is also written thus.",
      he: "רבי יעקב בר אידי רמי, כתיב … וכתיב",
      move: { element: "difficulty", subtype: "apparentContradiction" },
      target: "promise",
      marker: "… רמי, כתיב … וכתיב",
      provenance: "derivation",
      attested: true,
      anatomy: [
        { kind: "diametrically-opposed", note: "Protected everywhere against very much afraid: as posed, a head-on clash." },
      ],
    },
    {
      id: "sin",
      speaker: "R. Yaakov bar Idi",
      en: "He said: Yaakov thought that perhaps sin may have some bearing on the promise.",
      he: "אמר, שמא יגרם החטא",
      move: { element: "resolution", subtype: "settlement" },
      target: "rami",
      provenance: "derivation",
      attested: true,
      note: "A `ישוב`: the one who offers it believes it is true, so it fully discharges the difficulty.",
      anatomy: [
        { kind: "subject-cause", note: "`שמא יגרם החטא` — perhaps sin will *cause* it to lapse. The settlement works by naming a cause that can intervene between the promise and its fulfilment, so the respect it distinguishes is chapter 11's tenth distinction." }, { kind: "differs-in-context", note: "The promise holds in the respect of merit; the fear is about sin having intervened. Not the same respect, so no clash." },
        { kind: "qualified-possible", note: "`שמא`: said as possible, not as certain." },
      ],
      spans: {
        he: { subject: [{ from: 4, to: 4 }], predicate: [{ from: 3, to: 3 }] },
        en: { subject: [{ from: 7, to: 7 }], predicate: [{ from: 8, to: 14 }] },
      },
    },
  ],
};
