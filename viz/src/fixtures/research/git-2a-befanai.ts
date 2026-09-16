import { skeleton } from "./skeleton.ts";

/**
 * Gittin 2a–3a — `בפני נכתב ובפני נחתם`: Rabbah and Rava.
 *
 * A two-sided dispute of the fixture's shape, in miniature: every
 * long-reaching move lands on Rabbah or on Rava, and the two sides' threads
 * alternate. Opening Rava's thread while a later move on Rabbah is the
 * attention puts Rava's rail inside Rabbah's.
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
    ["mishnah", "S", undefined, "המביא גט ממדינת הים צריך שיאמר בפני נכתב ובפני נחתם", "Mishnah: one who brings a bill of divorce from abroad must declare it was written and signed before him", { speaker: "Mishnah" }],
    ["q-taama", "Q", "mishnah", "מאי טעמא?", "Why?", { marker: "מאי טעמא?" }],
    ["rabbah", "A", "q-taama", "רבה אמר: לפי שאין בקיאין לשמה", "Rabbah: because abroad they are not versed in writing it for her sake", { speaker: "Rabbah" }],
    ["rava", "O", "rabbah", "רבא אמר: לפי שאין עדים מצויין לקיימו", "Rava: because witnesses are not available to ratify it", { speaker: "Rava" }],
    ["q-beinaihu", "Q", "rava", "מאי בינייהו?", "What is the practical difference?", { marker: "מאי בינייהו?" }],
    ["a-beinaihu", "A", "q-beinaihu", "איכא בינייהו דאתיוהו בי תרי", "Two bearers; province to province in the Land; within one province abroad", { marker: "איכא בינייהו" }],
    ["q-rabbah-trei", "D", "rabbah", "ולרבה דאמר לפי שאין בקיאין לשמה — ליבעי תרי!", "For Rabbah, require two witnesses, as for all testimony", { marker: "ולפלוני דאמר … ליבעי" }],
    ["a-ed-echad", "R", "q-rabbah-trei", "עד אחד נאמן באיסורין", "One witness is believed in matters of prohibition"],
    ["q-ischazek", "D", "a-ed-echad", "אימור דאמרינן עד אחד נאמן באיסורין… אבל הכא דאיתחזק איסורא", "Only where no prohibition is established; here she is an established married woman, a matter of two", { marker: "אימור דאמרינן … אבל הכא" }],
    ["a-rov", "R", "q-ischazek", "רוב בקיאין הן… והכא משום עיגונא אקילו בה רבנן", "Most are versed; the requirement is rabbinic, and they were lenient lest she be stranded"],
    ["q-kula", "D", "a-rov", "האי קולא הוא?! חומרא הוא!", "Lenient? It is strict: with one witness the husband can protest and invalidate it", { marker: "האי קולא הוא?! חומרא הוא!" }],
    ["a-kula", "R", "q-kula", "כיון דאמר מר: בפני כמה נותנו לה?", "Since it is given before two or three, he checks first and will not undo himself", { marker: "כיון דאמר מר" }],
    ["q-rava-trei", "D", "rava", "ולרבא דאמר לפי שאין עדים מצויין לקיימו — ליבעי תרי!", "For Rava, require two witnesses, as for ratifying any document", { marker: "ולפלוני דאמר … ליבעי" }],
    ["a-ed-echad-2", "R", "q-rava-trei", "עד אחד נאמן באיסורין", "One witness is believed in matters of prohibition"],
    ["q-ischazek-2", "D", "a-ed-echad-2", "אימר דאמרינן עד אחד נאמן באיסורין… אבל הכא איתחזק איסורא", "Only where no prohibition is established; here it is", { marker: "אימור דאמרינן … אבל הכא" }],
    ["a-bedin", "R", "q-ischazek-2", "בדין הוא דבקיום שטרות נמי לא ליבעי", "Ratification itself needs none by right, as Reish Lakish said; the rabbis required it and were lenient here", { marker: "בדין הוא ד" }],
    ["q-kula-2", "D", "a-bedin", "האי קולא הוא?! חומרא הוא!", "Lenient? It is strict", { marker: "האי קולא הוא?! חומרא הוא!" }],
    ["a-kula-2", "R", "q-kula-2", "כיון דאמר מר: בפני כמה נותנו לה?", "Since it is given before two or three, he checks first", { marker: "כיון דאמר מר" }],
    ["q-rava-not-rabbah", "Q", "rava", "ורבא, מאי טעמא לא אמר כרבה?", "Why does Rava not say as Rabbah?", { marker: "מאי טעמא לא אמר כ" }],
    ["a-mi-katani", "A", "q-rava-not-rabbah", "אמר לך: מי קתני בפני נכתב לשמה?", "The mishnah does not say 'written for her sake'", { marker: "אמר לך: מי קתני" }],
    ["q-verabbah", "D", "a-mi-katani", "ורבה?", "And Rabbah?", { marker: "ופלוני?" }],
    ["a-bedin-2", "R", "q-verabbah", "בדין הוא דליתני הכי, אלא דאי מפשת ליה דיבורא אתי למגזייה", "It should have; but a longer formula would be clipped", { marker: "בדין הוא ד… אלא ד" }],
    ["q-hashta", "D", "a-bedin-2", "השתא נמי אתי למגזייה!", "Now too he may clip it", { marker: "השתא נמי" }],
    ["a-chada", "R", "q-hashta", "חדא מתלת גאיז, חדא מתרתי לא גאיז", "One of three is clipped; one of two is not"],
    ["q-rabbah-not-rava", "Q", "rabbah", "ורבה, מאי טעמא לא אמר כרבא?", "Why does Rabbah not say as Rava?", { marker: "מאי טעמא לא אמר כ" }],
    ["a-nichtav", "A", "q-rabbah-not-rava", "אם כן ניתני בפני נחתם ותו לא; בפני נכתב למה לי?", "Then 'signed before me' alone would do; 'written' shows the requirement is for her sake", { marker: "אם כן … למה לי?" }],
    ["q-verava", "D", "a-nichtav", "ורבא?", "And Rava?", { marker: "ופלוני?" }],
    ["a-bedin-3", "R", "q-verava", "בדין הוא דליתני הכי, אלא דאם כן אתי לאיחלופי בקיום שטרות דעלמא", "It should have; but it would be confused with ordinary ratification by one witness", { marker: "בדין הוא ד… אלא ד" }],
    ["q-mi-dami", "D", "a-bedin-3", "ורבה: מי דמי?! התם ידעינן הכא בפני", "Rabbah: is it alike? There 'we know', here 'before me'; there a woman is not believed, here she is", { marker: "מי דמי?!" }],
    ["a-atu", "R", "q-mi-dami", "ורבא אמר לך: אטו הכא כי אמרי ידעינן מי לא מהימני?!", "Rava: here too 'we know' would be believed, so the confusion stands", { marker: "אמר לך: אטו" }],
    ["q-rabbah-tanna", "D", "rabbah", "ולרבה דאמר לפי שאין בקיאין לשמה, מאן האי תנא", "For Rabbah, which tanna requires both writing and signing for her sake?", { marker: "מאן האי תנא" }],
  ],
);
