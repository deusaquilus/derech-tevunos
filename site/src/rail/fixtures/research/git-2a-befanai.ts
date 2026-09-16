import { skeleton } from "./skeleton.ts";

/**
 * Gittin 2a–3a — `בפני נכתב ובפני נחתם`: Rabbah and Rava.
 *
 * A two-sided dispute of the fixture's shape, in miniature: every
 * long-reaching move lands on Rabbah or on Rava, and the two sides' threads
 * alternate. Opening Rava's thread while a later move on Rabbah is the
 * attention puts Rava's rail inside Rabbah's.
 *
 * The one research passage carrying the ch. 1–8 layer. It earns it twice
 * over. Rabbah and Rava are drawn by ch. 9 as `דחיה`, one view set against
 * another, and that is as much as the move layer can say; ch. 4 says they
 * are `variant` — one subject, two predicates, neither denying the other —
 * which is why the Gemara's next word is `מאי בינייהו`. And the two sides'
 * threads are the same argument twice, so the same three labels appear on
 * each: an analogism carried from Torah testimony or from ordinary
 * ratification, an inclusion that fails, and a maxim that is true but does
 * not reach a matter of ervah.
 */
export const gittinBefanai = skeleton(
  {
    id: "git-2a-befanai",
    title: "Written before me, signed before me",
    tractate: "Gittin",
    folio: "2a-3a",
    party: "party-group",
  },
  [
    ["mishnah", "S", undefined, "המביא גט ממדינת הים צריך שיאמר בפני נכתב ובפני נחתם", "Mishnah: one who brings a bill of divorce from abroad must declare it was written and signed before him", { speaker: "Mishnah", provenance: "tradition", anatomy: [{ kind: "unqualified", note: "`המביא` — whoever brings one. No quantity is stated, so by Ramchal's rule it carries the force of a categorical, which is what lets the whole sugya argue from single cases." }] }],
    ["q-taama", "Q", "mishnah", "מאי טעמא?", "Why?", { marker: "מאי טעמא?" }],
    ["rabbah", "A", "q-taama", "רבה אמר: לפי שאין בקיאין לשמה", "Rabbah: because abroad they are not versed in writing it for her sake", { speaker: "Rabbah", provenance: "asserted" }],
    ["rava", "O", "rabbah", "רבא אמר: לפי שאין עדים מצויין לקיימו", "Rava: because witnesses are not available to ratify it", { speaker: "Rava", provenance: "asserted", anatomy: [{ kind: "variant", note: "One subject — why the mishnah requires the declaration — and two predicates. Neither says לאו to what the other affirms, so this is `מתחלפים` and not opposition, which is exactly why the Gemara has to ask `מאי בינייהו`: two reasons that do not clash have to be separated by a case where they part." }] }],
    ["q-beinaihu", "Q", "rava", "מאי בינייהו?", "What is the practical difference?", { marker: "מאי בינייהו?" }],
    ["a-beinaihu", "A", "q-beinaihu", "איכא בינייהו דאתיוהו בי תרי", "Two bearers; province to province in the Land; within one province abroad", { marker: "איכא בינייהו", provenance: "derivation", anatomy: [{ kind: "compound", note: "Three cases joined: two bearers, province to province inside the Land, one province to another abroad. Each is a case where one reason holds and the other does not." }] }],
    ["q-rabbah-trei", "D", "rabbah", "ולרבה דאמר לפי שאין בקיאין לשמה — ליבעי תרי, מידי דהוה אכל עדיות שבתורה!", "For Rabbah, require two witnesses, as for all testimony in the Torah", { marker: "ולפלוני דאמר … ליבעי", provenance: "tradition", anatomy: [{ kind: "analogism", basis: "marked", note: "`מידי דהוה א…`: the declaration is carried under the rule for every testimony in the Torah, which needs two." }] }],
    ["a-ed-echad", "R", "q-rabbah-trei", "עד אחד נאמן באיסורין", "One witness is believed in matters of prohibition", { provenance: "tradition", anatomy: [{ kind: "fallacy-not-included", note: "The inclusion fails: the declaration is not one of the Torah's testimonies but a matter of prohibition, where one witness is believed. The objection is phrased as an analogy, but what the answer denies is the membership, not the likeness." }] }],
    ["q-ischazek", "D", "a-ed-echad", "אימור דאמרינן עד אחד נאמן באיסורין… אבל הכא דאיתחזק איסורא", "Only where no prohibition is established; here she is an established married woman, a matter of two", { marker: "אימור דאמרינן … אבל הכא", provenance: "tradition", anatomy: [{ kind: "differs-in-context", note: "The maxim was said of the piece that may be forbidden fat or permitted suet, where no prohibition is yet established. A married woman's status is established. Two respects, so the maxim does not carry across." }, { kind: "ground-does-not-reach", note: "`אימור דאמרינן … אבל הכא` is Ramchal's pattern exactly: the ground is not denied — one witness really is believed in prohibitions — it is shown not to reach this claim, `ואין דבר שבערוה פחות משנים` (Eng p132–136)." }] }],
    ["a-rov", "R", "q-ischazek", "רוב בקיאין הן… והכא משום עיגונא אקילו בה רבנן", "Most are versed; the requirement is rabbinic, and they were lenient lest she be stranded", { provenance: "derivation", anatomy: [{ kind: "partial", note: "`רוב` — most, not all. A partial statement, which is why R. Meir, who worries about the minority, has to be answered on his own terms in the next clause." }] }],
    ["q-kula", "D", "a-rov", "האי קולא הוא?! חומרא הוא!", "Lenient? It is strict: with one witness the husband can protest and invalidate it", { marker: "האי קולא הוא?! חומרא הוא!", provenance: "derivation", anatomy: [{ kind: "diametrically-opposed", note: "Lenient against strict, said of the same ruling in the same respect: yes against no. The difficulty is the `אדרבה` shape — it does not deny the answer's fact, it turns the answer's own description around." }] }],
    ["a-kula", "R", "q-kula", "כיון דאמר מר: בפני כמה נותנו לה?", "Since it is given before two or three, he checks first and will not undo himself", { marker: "כיון דאמר מר", provenance: "tradition" }],
    ["q-rava-trei", "D", "rava", "ולרבא דאמר לפי שאין עדים מצויין לקיימו — ליבעי תרי, מידי דהוה אקיום שטרות דעלמא!", "For Rava, require two witnesses, as for ratifying any document", { marker: "ולפלוני דאמר … ליבעי", provenance: "tradition", anatomy: [{ kind: "analogism", basis: "marked", note: "`מידי דהוה א…` again, from the other side: the declaration is carried under the rule for ratifying documents generally." }] }],
    ["a-ed-echad-2", "R", "q-rava-trei", "עד אחד נאמן באיסורין", "One witness is believed in matters of prohibition", { provenance: "tradition", anatomy: [{ kind: "fallacy-not-included", note: "The same answer, and the same failure of inclusion: ratification of documents is not the kind this belongs to." }] }],
    ["q-ischazek-2", "D", "a-ed-echad-2", "אימר דאמרינן עד אחד נאמן באיסורין… אבל הכא איתחזק איסורא", "Only where no prohibition is established; here it is", { marker: "אימור דאמרינן … אבל הכא", provenance: "tradition", anatomy: [{ kind: "differs-in-context", note: "As on Rabbah's side: the maxim belongs to the case where nothing is yet established." }, { kind: "ground-does-not-reach", note: "The maxim stands and does not reach: the two sides' threads run the same argument, and the ch. 8 label is what shows it." }] }],
    ["a-bedin", "R", "q-ischazek-2", "בדין הוא דבקיום שטרות נמי לא ליבעי", "Ratification itself needs none by right, as Reish Lakish said; the rabbis required it and were lenient here", { marker: "בדין הוא ד", provenance: "tradition" }],
    ["q-kula-2", "D", "a-bedin", "האי קולא הוא?! חומרא הוא!", "Lenient? It is strict", { marker: "האי קולא הוא?! חומרא הוא!", provenance: "derivation", anatomy: [{ kind: "diametrically-opposed", note: "The same turn as on Rabbah's side." }] }],
    ["a-kula-2", "R", "q-kula-2", "כיון דאמר מר: בפני כמה נותנו לה?", "Since it is given before two or three, he checks first", { marker: "כיון דאמר מר", provenance: "tradition" }],
    ["q-rava-not-rabbah", "Q", "rava", "ורבא, מאי טעמא לא אמר כרבה?", "Why does Rava not say as Rabbah?", { marker: "מאי טעמא לא אמר כ" }],
    ["a-mi-katani", "A", "q-rava-not-rabbah", "אמר לך: מי קתני בפני נכתב לשמה?", "The mishnah does not say 'written for her sake'", { marker: "אמר לך: מי קתני", provenance: "tradition", anatomy: [{ kind: "hypothetical-syllogism-tollens", note: "Had the requirement been `לשמה`, the mishnah would have said so; it does not; so it is not. A phrasing argument run on the mishnah's wording." }] }],
    ["q-verabbah", "D", "a-mi-katani", "ורבה?", "And Rabbah?", { marker: "ופלוני?" }],
    ["a-bedin-2", "R", "q-verabbah", "בדין הוא דליתני הכי, אלא דאי מפשת ליה דיבורא אתי למגזייה", "It should have; but a longer formula would be clipped", { marker: "בדין הוא ד… אלא ד", provenance: "derivation" }],
    ["q-hashta", "D", "a-bedin-2", "השתא נמי אתי למגזייה!", "Now too he may clip it", { marker: "השתא נמי", provenance: "derivation" }],
    ["a-chada", "R", "q-hashta", "חדא מתלת גאיז, חדא מתרתי לא גאיז", "One of three is clipped; one of two is not", { provenance: "derivation", anatomy: [{ kind: "differs-in-context", note: "Clipping was said of a three-word formula; the mishnah's is two. The objection's own claim is left standing and confined to where it was made." }] }],
    ["q-rabbah-not-rava", "Q", "rabbah", "ורבה, מאי טעמא לא אמר כרבא?", "Why does Rabbah not say as Rava?", { marker: "מאי טעמא לא אמר כ" }],
    ["a-nichtav", "A", "q-rabbah-not-rava", "אם כן ניתני בפני נחתם ותו לא; בפני נכתב למה לי? שמע מינה בעינן לשמה", "Then 'signed before me' alone would do; 'written' shows the requirement is for her sake", { marker: "אם כן … למה לי?", provenance: "tradition", anatomy: [{ kind: "hypothetical-syllogism-tollens", note: "Had the reason been ratification, `בפני נחתם` alone would have carried it; the mishnah says `בפני נכתב` too; so that is not the reason." }, { kind: "via-opposite", note: "`שמע מינה בעינן לשמה` — the conclusion is drawn from the other side's failure, not from anything said for this one. Ramchal allows the indirect route only where the two leave nothing between them (Eng p116–118); the sugya is treating Rabbah's reason and Rava's as the only two on offer, which is the assumption the rest of the page then tests." }] }],
    ["q-verava", "D", "a-nichtav", "ורבא?", "And Rava?", { marker: "ופלוני?" }],
    ["a-bedin-3", "R", "q-verava", "בדין הוא דליתני הכי, אלא דאם כן אתי לאיחלופי בקיום שטרות דעלמא", "It should have; but it would be confused with ordinary ratification by one witness", { marker: "בדין הוא ד… אלא ד", provenance: "derivation" }],
    ["q-mi-dami", "D", "a-bedin-3", "ורבה: מי דמי?! התם ידעינן הכא בפני", "Rabbah: is it alike? There 'we know', here 'before me'; there a woman is not believed, here she is", { marker: "מי דמי?!", provenance: "tradition", anatomy: [{ kind: "fallacy-not-similar", basis: "marked", note: "`מי דמי?!` is Ramchal's own recognizer for the defeat. The two cases Rava says would be confused differ in what is said and in who may say it: there `ידעינן`, here `בפני`; there a woman is not believed, here she is." }] }],
    ["a-atu", "R", "q-mi-dami", "ורבא אמר לך: אטו הכא כי אמרי ידעינן מי לא מהימני?!", "Rava: here too 'we know' would be believed, so the confusion stands", { marker: "אמר לך: אטו", provenance: "derivation" }],
    ["q-rabbah-tanna", "D", "rabbah", "ולרבה דאמר לפי שאין בקיאין לשמה, מאן האי תנא", "For Rabbah, which tanna requires both writing and signing for her sake?", { marker: "מאן האי תנא", provenance: "derivation" }],
  ],
);
