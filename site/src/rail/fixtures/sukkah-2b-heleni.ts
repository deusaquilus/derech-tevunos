import type { Sugya } from "../sugya.ts";

/**
 * Sukkah 2b — Queen Heleni's sukkah in Lod, and the other half of chapter 10.
 *
 * `bk-83b-ayin` ships the ascribed *difficulty*, which Ramchal names in the
 * text. This is the ascribed *proof*, which he does not: it is labelled from
 * the markers, as `bava-metzia-yeush` is. The reason to have both is that the
 * two composites fail in opposite directions and the passage shows it. R.
 * Yehudah's evidence is an incident he reports — elders went in and out of a
 * sukkah over twenty cubits and said nothing — so there are two things to
 * attack, the report and what it is supposed to prove, and the Sages go at
 * the second while granting the first. The incident is not denied once.
 *
 * `משם ראיה?` here is a trap worth stating, because the same three words are
 * a different construct in Ramchal. At Heb p137 / Eng p138–142 `משם ראיה` is
 * the rebuttal that takes the source an opponent brought and turns it into
 * one's own proof — the shard at Shabbos 82a — and that is the icon
 * `rebuttal-proves-my-point`. Here the words are a rhetorical denial: *is
 * there proof from there?*, meaning there is none. So the badge on that
 * sentence is `ground-does-not-reach`, and `rebuttal-proves-my-point` is
 * deliberately absent.
 *
 * Text: Vilna, as Sefaria's William Davidson edition prints it. The opening
 * sentence is the mishnah at 2a; everything after it is the baraita and the
 * Gemara's reading of it at 2b.
 */
export const sukkahHeleni: Sugya = {
  id: "sukkah-2b-heleni",
  title: "Queen Heleni's sukkah",
  tractate: "Sukkah",
  folio: "2a-2b",
  discussedAt: "Not discussed in Derech Tevunos; labelled from the markers of chs. 9-10",
  party: "party-group",
  units: [
    {
      id: "mishnah",
      speaker: "Mishnah",
      en: "A sukkah more than twenty cubits high is invalid; R. Yehudah validates it.",
      he: "סוכה שהיא גבוהה למעלה מעשרים אמה – פסולה. ורבי יהודה מכשיר",
      short: "over twenty cubits: invalid, and R. Yehudah's dissent",
      move: { element: "statement", subtype: "firsthand" },
      provenance: "tradition",
      anatomy: [
        { kind: "subject-quantity", note: "The rule is a measure, and every sentence after this one is about whether that measure is the right one. Twenty cubits is the aspect the whole dispute turns on." },
      ],
    },
    {
      id: "yehudah",
      speaker: "R. Yehudah",
      en: "A baraita puts a number on the dissent: R. Yehudah validates up to forty or fifty cubits.",
      he: "רבי יהודה מכשיר עד ארבעים וחמשים אמה",
      short: "R. Yehudah: valid up to forty or fifty cubits",
      move: { element: "statement", subtype: "explanation" },
      target: "mishnah",
      marker: "מיתיבי",
      provenance: "tradition",
      anatomy: [
        { kind: "subject-quantity", note: "The same aspect as the mishnah, given a bound the mishnah left open." },
      ],
    },
    {
      id: "heleni",
      speaker: "R. Yehudah",
      en: "R. Yehudah said: it happened that Queen Heleni's sukkah in Lod was more than twenty cubits high, and the elders went in and out of it and said nothing to her.",
      he: "אמר רבי יהודה: מעשה בהילני המלכה בלוד שהיתה סוכתה גבוהה מעשרים אמה, והיו זקנים נכנסין ויוצאין לשם ולא אמרו לה דבר",
      short: "the elders said nothing about Heleni's high sukkah",
      move: { element: "proof", subtype: "demonstration" },
      target: "yehudah",
      marker: "מעשה ב…",
      provenance: "tradition",
      anatomy: [
        { kind: "ascribed-proof", note: "One sentence doing two jobs: it reports an incident, and the report is the evidence. Which is why there are two things a challenger may attack — whether it happened as told, and whether what happened proves the rule — and the Sages take only the second." },
        { kind: "syllogism", note: "The premise is unstated and is what the proof really rests on: elders who see an invalid sukkah say so. Their silence is therefore a ruling." },
      ],
      ext: { move: { reportedOf: "the elders who went in and out in Lod" } },
    },
    {
      id: "isha",
      speaker: "Chachamim",
      en: "They said to him: is there proof from there? She was a woman, and women are exempt from the sukkah.",
      he: "אמרו לו: משם ראיה? אשה היתה ופטורה מן הסוכה",
      short: "no proof: a woman is exempt anyway",
      move: { element: "contradiction", subtype: "opposition" },
      target: "heleni",
      marker: "משם ראיה?",
      provenance: "tradition",
      note: "`משם ראיה?` is a question here, and it means the opposite of Ramchal's stock phrase of the same words. His `משם ראיה` (Heb p137) takes the opponent's own source and turns it into a proof for one's own side; this asks whether the source proves anything at all. Different construct, so the icon for his is not used.",
      anatomy: [
        { kind: "ground-does-not-reach", note: "The incident is granted in full. What is denied is that it reaches the rule: the elders' silence proves nothing where nobody was obligated in the first place. Ramchal's `אחיו הוא במצוות` pattern (Eng p132–136)." },
        { kind: "differs-in-context", note: "The silence concerns a woman's sukkah and the rule concerns a valid sukkah — not the same respect." },
      ],
    },
    {
      id: "banim",
      speaker: "R. Yehudah",
      en: "He said to them: did she not have seven sons?",
      he: "אמר להן: והלא שבעה בנים הוו לה",
      short: "she had seven sons, who are obligated",
      move: { element: "contradiction", subtype: "direct" },
      target: "isha",
      provenance: "tradition",
      anatomy: [
        { kind: "subject-quantity", note: "Seven, and the number is load-bearing: the Gemara will lean on it below to rule out that every one of them was too young." },
      ],
      note: "It refutes the rebuttal rather than merely weakening it: the premise the Sages relied on — that nobody using the sukkah was obligated — is shown false.",
    },
    {
      id: "ve-od",
      speaker: "R. Yehudah",
      en: "And furthermore, she did nothing except in accordance with the Sages.",
      he: "ועוד: כל מעשיה לא עשתה אלא על פי חכמים",
      short: "and she acted only on the Sages' word",
      move: { element: "contradiction", subtype: "direct" },
      target: "isha",
      marker: "ועוד",
      provenance: "tradition",
      note: "A second and independent refutation of the same rebuttal, which is why the Gemara can ask what the first one left undone.",
    },
    {
      id: "lama-li",
      en: "Why teach 'and furthermore, she did nothing except in accordance with the Sages'?",
      he: "למה לי למיתני ״ועוד כל מעשיה לא עשתה אלא על פי חכמים״?",
      short: "why was the second answer needed?",
      move: { element: "difficulty", subtype: "objection" },
      target: "ve-od",
      marker: "למה לי למיתני",
      provenance: "derivation",
      anatomy: [
        { kind: "redundant-part", note: "An objection to the report in its parts, in Ramchal's `הא תו למה לי` family: the seven sons had already answered the Sages, so the clause after them adds nothing. The two sentences that follow show it does." },
      ],
    },
    {
      id: "ktanim",
      en: "This is what he said to them: if you say the sons were minors, and minors are exempt — since there were seven, it cannot be that not one of them was old enough to manage without his mother.",
      he: "הכי קאמר להו: כי תאמרו בנים קטנים היו, וקטנים פטורין מן הסוכה – כיון דשבעה הוו, אי אפשר דלא הוי בהו חד שאינו צריך לאמו",
      short: "of seven, one was old enough",
      move: { element: "resolution", subtype: "settlement" },
      target: "lama-li",
      marker: "הכי קאמר להו",
      provenance: "derivation",
      anatomy: [
        { kind: "might-have-thought", basis: "marked", note: "`כי תאמרו`: the clause is there to shut out a view one might have held — that they were all minors. Ramchal's answer to `פשיטא`, in its `מהו דתימא` form." },
        { kind: "subject-quantity", note: "Seven does the work: no claim is made about any particular son, only that a count that high cannot be all infants." },
      ],
      spans: {
        he: { premise: [{ from: 15, to: 16 }], conclusion: [{ from: 17, to: 25 }] },
        en: { premise: [{ from: 21, to: 23 }], conclusion: [{ from: 24, to: 39 }] },
      },
      note: "The deduction is spelt out inside the one sentence, so its two roles are words of it (Heb p93: `המאמר הראשון שממנו ימשך השני נקרא הקדמה, והנמשך נקרא תולדה`): `שבעה הוו` is the premise and everything after it the conclusion. `כיון ד` is the connective and belongs to neither. The clause before the dash is the view being shut out, not a premise of the settlement.",
    },
    {
      id: "derabbanan",
      en: "And if you say that such a minor is obligated only by rabbinic law, and she would not have been scrupulous about rabbinic law — come and hear: and furthermore, she did nothing except in accordance with the Sages.",
      he: "וכי תימרו קטן שאינו צריך לאמו מדרבנן הוא דמיחייב, ואיהי בדרבנן לא משגחה – תא שמע: ועוד, כל מעשיה לא עשתה אלא על פי חכמים",
      short: "and that is what the second answer is for",
      move: { element: "resolution", subtype: "settlement" },
      target: "lama-li",
      marker: "וכי תימרו",
      provenance: "derivation",
      anatomy: [
        { kind: "might-have-thought", basis: "marked", note: "`וכי תימרו`: a second view to shut out, one step further back than the first. The clause the objection called idle is the answer to it, so it was not idle." },
      ],
      note: "The two settlements are one continuous answer in the text, taken in two stages; both are recorded against the objection rather than one against the other, because each closes a different worry.",
    },
  ],
};
