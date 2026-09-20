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
    },
  ],
};
