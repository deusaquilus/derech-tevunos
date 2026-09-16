import type { Sugya } from "../sugya.ts";

/**
 * Ramchal's own illustration of `רמיא` and of `ישוב`, Heb p183, Eng p184.
 * Both labels are his. The two verses enter as `tradition`, so they hold
 * authority before the sugya begins.
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
        { kind: "categorical", basis: "marked", note: "`בכל אשר תלך`: protection everywhere, the whole class of places." },
      ],
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
        { kind: "particular" },
      ],
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
        { kind: "differs-in-context", note: "The promise holds in the respect of merit; the fear is about sin having intervened. Not the same respect, so no clash." },
        { kind: "qualified-possible", note: "`שמא`: said as possible, not as certain." },
      ],
    },
  ],
};
