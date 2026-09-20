import type { Sugya } from "../sugya.ts";

/**
 * Ramchal's own illustration of `שאלה` and its `תשובה`, Heb pp169/171,
 * Eng pp170/172. Both labels are his, and the question carries one of the
 * stock markers he cites, `מאי שנא … ומאי שנא`.
 *
 * A question opens a thread rather than acting on an earlier sentence, so it
 * sits at depth 0 with no target.
 */
export const yebamosDeafMute: Sugya = {
  id: "yebamos-deafmute",
  title: "Why a deaf-mute may marry and the insane may not",
  tractate: "Yebamos",
  folio: "112b",
  discussedAt: "Derech Tevunos ch. 9, pp. 170-172",
  party: "party-talmud",
  units: [
    {
      id: "question",
      speaker: "The Gemara",
      en: "What is the difference between deaf-mutes, for whom the rabbis ordained that a marriage is valid, and the insane, for whom a marriage is invalid?",
      he: "מאי שנא חרש וחרשת דתקינו להו רבנן נשואין, ומאי שנא דשוטה ושוטה דלא תקינו להו רבנן נשואין?",
      move: { element: "question", subtype: "query" },
      marker: "מאי שנא … ומאי שנא",
      provenance: "asserted",
      attested: true,
      anatomy: [
        { kind: "subject-difference", basis: "marked", note: "`מאי שנא … ומאי שנא` asks for a הבחנה in so many words: what tells these two apart? Chapter 11's twenty-third distinction is the absence of likeness, and here it is the whole content of the question." },
      ],
    },
    {
      id: "answer",
      speaker: "The Gemara",
      en: "Since deaf-mutes are capable of fulfilling rabbinical ordinances, the rabbis validated their marriage. The insane are incapable, so the rabbis did not.",
      he: "חרש וחרשת דקימא תקנתא דרבנן – תקינו להו רבנן נשואין, שוטה ושוטה דלא קימא תקנתא דרבנן – לא תקינו רבנן נשואין",
      move: { element: "answer", subtype: "answer" },
      target: "question",
      provenance: "derivation",
      attested: true,
      anatomy: [
        { kind: "consequent", note: "Since they can keep rabbinic ordinances, the rabbis validated their marriage: this, so that." },
        { kind: "subject-quality", note: "The difference the question asked for is located in a faculty — whether a rabbinic ordinance can hold of them at all. The answer does not distinguish the two by what they are but by what they can do." },
      ],
      spans: {
        he: { antecedent: [{ from: 1, to: 5 }, { from: 11, to: 16 }], consequent: [{ from: 7, to: 10 }, { from: 18, to: 21 }] },
        en: { antecedent: [{ from: 1, to: 8 }, { from: 14, to: 17 }], consequent: [{ from: 9, to: 13 }, { from: 19, to: 22 }] },
      },
      note: "Two consequent statements in one breath, one for each class, so the antecedent and the consequent each occur twice and take a list; the two dashes carry the dependence and belong to no role, as `לפיכך` does in Ramchal's own example (Heb p39). The spans are written because the form is a `consequent`, whose two clauses chapter 3 names (Heb p31) and whose three intentions chapter 6 counts (Heb p87–89), not because a difficulty lands on one part: none does, so the `commitment` spans are not written.",
    },
  ],
};
