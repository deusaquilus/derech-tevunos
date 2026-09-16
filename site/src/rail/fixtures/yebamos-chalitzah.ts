import type { Sugya } from "../sugya.ts";

/**
 * Ramchal's own illustration of `שנוי`, Heb p185, Eng p186. The contrast with
 * `berachos-yaakov` is the point: a settlement restores its target, an
 * alternative only clears the difficulty and leaves the claim merely possible.
 */
export const yebamosChalitzah: Sugya = {
  id: "yebamos-chalitzah",
  title: "Chalitzah of a mute",
  tractate: "Yebamos",
  folio: "104b",
  discussedAt: "Derech Tevunos ch. 9, p. 186",
  party: "party-talmud",
  units: [
    {
      id: "rava",
      speaker: "Rava",
      en: "Chalitzah may be performed by a mute man or woman, since only their power of speech is impaired.",
      move: { element: "statement", subtype: "firsthand" },
      provenance: "asserted",
      attested: true,
      anatomy: [
        { kind: "unqualified", note: "No quantity stated: any mute, with the force of a categorical." },
      ],
    },
    {
      id: "baraita",
      speaker: "The Gemara",
      en: "We have learned that chalitzah is invalid for a deaf-mute man or woman. What is the reason? Is it not because they are not capable of speech?",
      he: "חרש שנחלץ וחרשת שחלצה – חליצתה פסולה, מאי טעמא? לאו משום דלאו בני קריה נינהו?",
      move: { element: "difficulty", subtype: "apparentContradiction" },
      target: "rava",
      provenance: "tradition",
      attested: true,
      anatomy: [
        { kind: "inference-loose", note: "The reason read out of the baraita — because they cannot speak — is suggested by the ruling but not forced by it, which is what the alternative that follows exploits." },
      ],
    },
    {
      id: "shinuy",
      speaker: "The Gemara",
      en: "No! It is because they lack the power of understanding.",
      he: "לא! משום דלאו בני דעה נינהו",
      move: { element: "resolution", subtype: "alternative" },
      target: "baraita",
      marker: "לא! משום ד",
      provenance: "derivation",
      attested: true,
      note: "A `שנוי`: it defends Rava without asserting that this is the truth, so Rava ends merely possible.",
      anatomy: [
        { kind: "differs-in-context", note: "The baraita is about understanding, Rava about speech: two respects, so no clash." },
        { kind: "preclusive", note: "Not this, but rather that: not speech, but understanding." },
      ],
    },
  ],
};
