import type { Sugya } from "../sugya.ts";

/**
 * Bava Kamma 83b — `עין תחת עין`, and the one passage Ramchal uses to teach
 * chapter 10's ascribed difficulty.
 *
 * At Heb p215 / Eng p216 he quotes this exchange verbatim: the Gemara asks
 * `מאי "אם נפשך לומר"?`, answers `תו קא קשיא ליה לתנא`, and he says of it
 * "this is an ascribed difficulty, in that the reporter reported that the
 * Tanna felt this difficulty against his own words". Then he quotes
 * `אמרי, דנין` and says "this is a difficulty against the reporter's report,
 * showing that it is impossible that this was the intention of the Tanna
 * which he explained in his report". Both labels here are therefore
 * `attested`: the `statement/reported` at `tu-kashya` and the
 * `difficulty/objection` at `danin` are Ramchal's own readings of these two
 * sentences, not ours.
 *
 * That is the whole reason to ship the passage. The chapter 10 composite is
 * the only construct in the vocabulary whose point is that one sentence does
 * two jobs at once, and a reader cannot see what that means from a
 * definition. Here the difficulty is reported, the report is attacked, the
 * attack is turned with `אדרבה`, and the reserve derivation the baraita
 * held back — `אם נפשך לומר` — turns out to have been held back for exactly
 * this. The first claim is never touched through any of it.
 *
 * Text: Vilna, as Sefaria's William Davidson edition prints it. Ramchal's
 * 1742 print reads `תו קא קשיא ליה לתנא`, with `ליה`; the Vilna text has no
 * `ליה`. The unit carries the Vilna reading and records his in a note, the
 * way `pesachim-liquids` records the two folio citations rather than
 * resolving them.
 */
export const bavaKammaAyin: Sugya = {
  id: "bk-83b-ayin",
  title: "An eye for an eye",
  tractate: "Bava Kamma",
  folio: "83b",
  discussedAt: "Derech Tevunos ch. 10, pp. 216-218",
  party: "party-talmud",
  units: [
    {
      id: "mishnah",
      speaker: "Mishnah",
      en: "One who blinds another's eye is assessed as though the injured man were a slave sold in the market: we estimate what he was worth before and what he is worth now.",
      he: "סימא את עינו, קטע את ידו, שיבר את רגלו – רואין אותו כאילו הוא עבד נמכר בשוק, ושמין כמה היה יפה וכמה הוא יפה",
      short: "damage is assessed in money, as for a slave",
      move: { element: "statement", subtype: "firsthand" },
      provenance: "tradition",
      anatomy: [
        { kind: "comparative", basis: "marked", note: "`כאילו הוא עבד נמכר בשוק`: just as a slave's worth is assessed, so the injured man's. The known side is the slave market." },
        { kind: "subject-quantity", note: "The mishnah fixes the injury by measure — what he was worth before and what he is worth now. The whole sugya turns on whether the Torah's `עין תחת עין` admits of measure at all." },
      ],
    },
    {
      id: "amai",
      en: "Why money? The Merciful One said 'an eye for an eye' — say it means an actual eye.",
      he: "אמאי? ״עין תחת עין״ אמר רחמנא – אימא עין ממש!",
      short: "say the verse means an actual eye",
      move: { element: "contradiction", subtype: "opposition" },
      target: "mishnah",
      marker: "אימא",
      provenance: "tradition",
      note: "A `דחיה`, not a `סתירה`: it does not show the mishnah false, only that the verse does not compel its reading. The literal possibility is left standing, which is what the rest of the passage has to close.",
    },
    {
      id: "baraita-makkeh",
      speaker: "Baraita",
      en: "That should not enter your mind. A baraita teaches: one might have thought that if he blinded an eye the court blinds his; the verse says 'one who strikes a person' and 'one who strikes an animal' — just as one who strikes an animal pays, so one who strikes a person pays.",
      he: "לא סלקא דעתך; דתניא: יכול סימא את עינו – מסמא את עינו? תלמוד לומר: ״מכה אדם״ ו״מכה בהמה״; מה מכה בהמה – לתשלומין, אף מכה אדם – לתשלומין",
      short: "just as striking an animal is paid for, so striking a man",
      move: { element: "contradiction", subtype: "direct" },
      target: "amai",
      marker: "לא סלקא דעתך",
      provenance: "tradition",
      anatomy: [
        { kind: "analogism", basis: "marked", note: "`מה … אף`: the rule is carried from the animal case to the human one on the shared word `מכה`." },
        { kind: "subject-similarity", note: "The likeness is between two strikings, and it is the likeness the whole derivation rests on — which is why every later attack goes at it." },
      ],
    },
    {
      id: "im-nafshecha",
      speaker: "Baraita",
      en: "And if you wish to say [that this can be objected to]: the verse says 'you shall not take ransom for the life of a murderer' — for a murderer's life you take no ransom, but you do take ransom for severed limbs, which do not grow back.",
      he: "ואם נפשך לומר, הרי הוא אומר: ״לא תקחו כפר לנפש רצח, אשר הוא רשע למות״ – לנפש רוצח אי אתה לוקח כפר, אבל אתה לוקח כפר לראשי אברים שאין חוזרין",
      short: "the reserve derivation, from the ransom verse",
      move: { element: "proof", subtype: "validation" },
      target: "mishnah",
      marker: "אם נפשך לומר",
      provenance: "tradition",
      note: "A second source brought beside the first for the same conclusion: `סיעתא`, not a fresh `הוכחה`. The baraita offers it without saying what is wrong with the first, and the Gemara will spend the last four sentences of the passage finding out.",
      anatomy: [
        { kind: "inference-necessary", note: "The verse restricts the ban on ransom to a murderer's life; that the restriction is meant to exclude the limbs is read as forced, not merely suggested." },
        { kind: "subject-difference", note: "A life and a severed limb are held apart: the aspect the derivation turns on is that limbs do not grow back." },
      ],
    },
    {
      id: "hei-makkeh",
      en: "Which 'strikes'? If the verse 'one who strikes an animal shall pay, and one who strikes a person shall be put to death' — that one is written about killing.",
      he: "הי ״מכה״? אילימא ״מכה בהמה ישלמנה, ומכה אדם יומת״ – ההוא בקטלא כתיב!",
      short: "which verse? not that one, it is about killing",
      move: { element: "difficulty", subtype: "objection" },
      target: "baraita-makkeh",
      marker: "אילימא",
      provenance: "derivation",
      note: "The question and the elimination of the first candidate are one sentence in the text, so they are one unit. The move is an objection because it faults the derivation as given, not the ruling it supports.",
      anatomy: [
        { kind: "differs-in-context", note: "The obvious verse speaks of killing, not of injury — a different respect, so the two `מכה`s are not the same `מכה`." },
      ],
    },
    {
      id: "ela-mehacha",
      en: "Rather from here: 'one who strikes an animal mortally shall pay', and juxtaposed to it 'if a man maims his neighbour, as he has done so shall be done to him'. The analogy is from striking to striking, not from the word: just as the striking said of an animal is for payment, so the striking said of a person.",
      he: "אלא מהכא: ״מכה נפש בהמה ישלמנה״, וסמיך ליה: ״ואיש כי יתן מום בעמיתו״ … ״הכאה״–״הכאה״ קאמרינן; מה הכאה האמורה בבהמה – לתשלומין, אף הכאה האמורה באדם – לתשלומין",
      short: "rather, from the juxtaposed verses",
      move: { element: "resolution", subtype: "settlement" },
      target: "hei-makkeh",
      marker: "אלא",
      provenance: "tradition",
      anatomy: [
        { kind: "analogism", basis: "marked", note: "`מה … אף` again, but now from the act and not the word: the second verse never says `מכה`, and the derivation is allowed to rest on the juxtaposition instead." },
        { kind: "synonymous-terms", note: "`״הכאה״–״הכאה״ קאמרינן`: the injury verse says `יתן מום`, not `מכה`, and the settlement rests on the two being one matter — a striking — under different words. Ramchal's מאמרים נרדפים, `שמלותיהם שונות וענינם אחד` (Heb p211): a relation the wording concealed, here the analogy the objection said the word could not carry. It is the converse of what `hei-makkeh` found, one word `מכה` covering two matters, killing and injuring." },
        { kind: "subject-similarity" },
      ],
    },
    {
      id: "veha-ksiv",
      en: "But it is written: 'and a man who strikes any person mortally shall be put to death'!",
      he: "והא כתיב: ״ואיש כי יכה כל נפש אדם, מות יומת״!",
      short: "but that verse says he is put to death",
      move: { element: "contradiction", subtype: "opposition" },
      target: "ela-mehacha",
      marker: "והא כתיב",
      provenance: "tradition",
    },
    {
      id: "bemamon",
      en: "It means with money.",
      he: "בממון",
      short: "it means money",
      move: { element: "answer", subtype: "answer" },
      target: "veha-ksiv",
      provenance: "derivation",
    },
    {
      id: "mimai",
      en: "From where do you say it means money? Say it means actual death.",
      he: "ממאי דבממון? אימא במיתה ממש!",
      short: "why money? say actual death",
      move: { element: "contradiction", subtype: "opposition" },
      target: "bemamon",
      marker: "אימא",
      provenance: "derivation",
    },
    {
      id: "lo-salka",
      en: "That should not enter your mind. First, it is juxtaposed to 'one who strikes an animal shall pay'. And further, after it is written 'as he has given a blemish to a person, so shall it be given to him' — and 'given' means money.",
      he: "לא סלקא דעתך. חדא – דהא איתקש ל״מכה בהמה ישלמנה״. ועוד, כתיב בתריה: ״כאשר יתן מום באדם, כן ינתן בו״ – ושמע מינה ממון",
      short: "two answers: the juxtaposition, and 'given'",
      move: { element: "contradiction", subtype: "direct" },
      target: "mimai",
      marker: "לא סלקא דעתך",
      provenance: "tradition",
      anatomy: [
        { kind: "compound-equal", basis: "marked", note: "`חדא … ועוד`: two independent answers in one sentence, so a difficulty against either leaves the other standing. Ramchal's first branch of the conjoined compound, `בהשואה אחת` (Heb p33): the two grounds — the juxtaposition, and the word `ינתן` — are said on one footing, each a sufficient proof, neither the expected case and neither the news. The known-and-novel branch needs one part said `כמו ענין שכבר נודע` and the other `בדרך חדוש`, as alive against slaughtered in his firstborn example; `ועוד` adds a second reason of the same standing and does not rank it. That the juxtaposition was already used at `ela-mehacha` makes it familiar in the passage, not known in his sense, which is about how the parts stand to each other inside the sentence." },
        { kind: "analogism", note: "The first of the two is the same juxtaposition the settlement above already used." },
      ],
      spans: {
        commitment: [
          { he: [{ from: 6, to: 10 }], en: [{ from: 8, to: 18 }], note: "the first reason: the juxtaposition to the striker of an animal, who pays" },
          { he: [{ from: 12, to: 24 }], en: [{ from: 21, to: 45 }], note: "the second: `ינתן` means money — a ground of its own, so either can fall while the other stands" },
        ],
      },
    },
    {
      id: "mai-im-nafshecha",
      en: "And what is 'if you wish to say'? What difficulty with the first derivation did the baraita have in mind?",
      he: "ומאי ״אם נפשך לומר״?",
      short: "what was wrong with the first derivation?",
      move: { element: "question", subtype: "query" },
      target: "im-nafshecha",
      marker: "ומאי",
      provenance: "derivation",
      note: "The baraita held a second derivation in reserve and never said why. The question is not whether the ruling is right — it is what the tanna was worried about.",
    },
    {
      id: "tu-kashya",
      en: "A further difficulty was troubling the tanna: what made you derive from 'one who strikes an animal'? Derive instead from 'one who strikes a person'!",
      he: "תו קא קשיא לתנא – מאי חזית דילפת ממכה בהמה? לילף ממכה אדם!",
      short: "the tanna's own unstated difficulty, reported",
      move: { element: "statement", subtype: "reported" },
      target: "mai-im-nafshecha",
      marker: "תו קא קשיא לתנא",
      provenance: "derivation",
      attested: true,
      note: "Ramchal quotes this sentence and names it (Heb p215, Eng p216): `הנה זו קשיה מגדת שהגיד המגיד שהתנא הרגיש קשיה זו על דברי עצמו` — an ascribed difficulty, in which the reporter reports that the tanna felt this difficulty against his own words. He prints `תו קא קשיא ליה לתנא`; the Vilna text, carried here, has no `ליה`.",
      anatomy: [
        { kind: "ascribed-difficulty", basis: "attested", note: "The move is a report and the payload is a difficulty. The Gemara does not raise this difficulty; it says the tanna felt it. Whether the ascription is right and whether the difficulty bites are two separate questions, and the next two sentences take them in that order." },
      ],
      ext: { move: { reportedOf: "the tanna of the baraita" } },
    },
    {
      id: "danin",
      en: "They say: damages are derived from damages, and damages are not derived from death.",
      he: "אמרי: דנין ניזקין מניזקין, ואין דנין ניזקין ממיתה",
      short: "damages come from damages, not from death",
      move: { element: "difficulty", subtype: "objection" },
      target: "tu-kashya",
      marker: "אמרי",
      provenance: "derivation",
      attested: true,
      note: "Ramchal quotes this too and says what it does (Heb p215, Eng p216): `הנה הוא קשיה על הגדת המגיד – מראה שאי אפשר שתהיה זאת כונת התנא` — a difficulty against the report, showing the tanna cannot have meant this, since the answer was there for him to give. It lands on the ascription and leaves the mishnah's ruling entirely alone.",
      anatomy: [
        { kind: "subject-difference", note: "Damages and death are held apart as domains: the objection is that a derivation must stay inside one." },
      ],
    },
    {
      id: "adrabba",
      en: "On the contrary — a person is derived from a person, and a person is not derived from an animal!",
      he: "אדרבה! דנין אדם מאדם, ואין דנין אדם מבהמה!",
      short: "on the contrary: man from man, not from animal",
      move: { element: "contradiction", subtype: "opposition" },
      target: "danin",
      marker: "אדרבה",
      provenance: "derivation",
      anatomy: [
        { kind: "rebuttal-just-the-opposite", basis: "marked", note: "`אדרבה` is Ramchal's own stock word for this move (Heb p137, Eng p138–140). The very principle that was supposed to settle the matter is turned round and sent back: if likeness of domain decides, likeness of subject decides the other way." },
        { kind: "subject-difference", note: "The same aspect as the objection it answers, read along the other axis — person against animal rather than damages against death. That both readings are available is the difficulty." },
      ],
    },
    {
      id: "haynu",
      en: "This is just why the baraita taught 'if you wish to say': the verse says 'you shall not take ransom for the life of a murderer' — no ransom for a life, but ransom for severed limbs, which do not grow back.",
      he: "היינו דקתני ״אם נפשך לומר״ – הרי הוא אומר: ״לא תקחו כפר לנפש רצח אשר הוא רשע למות״ – לנפש רוצח אי אתה לוקח כפר, אבל אתה לוקח כפר לראשי אברים שאינן חוזרין",
      short: "which is why the reserve derivation was there",
      move: { element: "resolution", subtype: "settlement" },
      target: "adrabba",
      marker: "היינו דקתני",
      provenance: "tradition",
      note: "The payoff. The tanna's unstated worry was real and has no answer, so his second derivation was not decoration: it is what the ruling rests on once the first is deadlocked. Nothing here touches the mishnah, which was never in doubt after the third sentence.",
    },
  ],
};
