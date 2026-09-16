import { skeleton } from "./skeleton.ts";

/**
 * Pesachim 2a–3a — `מאי אור`: the opening sugya of the tractate.
 *
 * Rav Huna says daybreak, Rav Yehuda says night, and fifteen proof-texts are
 * brought against one side or the other before the `אלא` declares that both
 * agree and each used his own town's word. The `אלא` formally rejects the
 * assumption (`קא סלקא דעתך`) but its band holds both sides' proof-texts, so
 * its anchor is Rav Huna; then `ותנא דידן` returns to the mishnah over the
 * whole discussion without releasing any of it.
 */
export const pesachimOr = skeleton(
  {
    id: "pes-2a-or",
    title: "What is 'or'?",
    tractate: "Pesachim",
    folio: "2a-3a",
    party: "party-group",
  },
  [
    ["mishnah", "S", undefined, "אור לארבעה עשר בודקין את החמץ לאור הנר", "Mishnah: on the 'or' of the fourteenth one searches for leaven by lamplight", { speaker: "Mishnah" }],
    ["q-mai-or", "Q", "mishnah", "מאי אור?", "What is 'or'?", { marker: "מאי …?" }],
    ["rav-huna", "A", "q-mai-or", "רב הונא אמר: נגהי", "Rav Huna: daybreak", { speaker: "Rav Huna" }],
    ["rav-yehuda", "O", "rav-huna", "ורב יהודה אמר: לילי", "Rav Yehuda: night", { speaker: "Rav Yehuda" }],
    ["ka-salka", "SE", "rav-yehuda", "קא סלקא דעתך דמאן דאמר נגהי — נגהי ממש", "The assumption: daybreak means actual day and night means actual night", { marker: "קא סלקא דעתך" }],
    ["m1", "D", "rav-yehuda", "מיתיבי: הבקר אור — אלמא אור יממא הוא!", "'The morning was light' — so 'or' is day", { marker: "מיתיבי" }],
    ["a1", "R", "m1", "מי כתיב האור בקר?", "It says 'the morning lit up', not 'the light was morning'", { marker: "מי כתיב …?" }],
    ["m2", "D", "rav-yehuda", "מיתיבי: וכאור בקר יזרח שמש", "'As the light of morning the sun rises' — so 'or' is day", { marker: "מיתיבי" }],
    ["a2", "R", "m2", "מי כתיב אור בקר?", "It says 'like the light of morning' — the world to come", { marker: "מי כתיב …?" }],
    ["m3", "D", "rav-yehuda", "מיתיבי: ויקרא אלהים לאור יום", "'God called the light day' — so 'or' is day", { marker: "מיתיבי" }],
    ["a3", "R", "m3", "הכי קאמר: למאיר ובא קראו יום", "It means: the brightening he called day", { marker: "הכי קאמר" }],
    ["q3", "D", "a3", "אלא מעתה, ולחשך קרא לילה — למחשיך ובא קרא לילה?!", "Then 'the darkness he called night' would be dusk — but until the stars it is day", { marker: "אלא מעתה" }],
    ["a3b", "R", "m3", "אלא הכי קאמר: קרייה רחמנא לנהורא ופקדיה אמצותא דיממא", "Rather: He summoned the light and charged it with the day's duties", { marker: "אלא הכי קאמר" }],
    ["m4", "D", "rav-huna", "מיתיבי: הללוהו כל כוכבי אור — אלמא אור אורתא הוא", "'Praise Him, all stars of light' — so 'or' is night", { marker: "מיתיבי" }],
    ["a4", "R", "m4", "הכי קאמר: הללוהו כל כוכבים המאירים", "It means: all shining stars", { marker: "הכי קאמר" }],
    ["q4", "D", "a4", "אלא מעתה, כוכבים המאירים הוא דבעו שבוחי", "Then only shining stars praise? 'Praise Him, all His hosts'", { marker: "אלא מעתה" }],
    ["a4b", "R", "q4", "אלא הא קא משמע לן דאור דכוכבים נמי אור הוא", "It teaches that starlight is light — for one who vows off light", { marker: "הא קא משמע לן" }],
    ["m5", "D", "rav-yehuda", "מיתיבי: לאור יקום רוצח… ובלילה יהי כגנב", "'At light the murderer rises… at night he is as a thief' — so 'or' is day", { marker: "מיתיבי" }],
    ["a5", "R", "m5", "התם הכי קאמר", "There: if it is clear as light he is a murderer; if doubtful as night, a thief", { marker: "התם הכי קאמר" }],
    ["m6", "D", "rav-yehuda", "מיתיבי: יקו לאור ואין", "'Let it hope for light and have none' — so 'or' is day", { marker: "מיתיבי" }],
    ["a6", "R", "m6", "התם מילט הוא דקא לייט ליה איוב למזליה", "There Job curses his fortune", { marker: "התם" }],
    ["m7", "D", "rav-yehuda", "מיתיבי: ולילה אור בעדני", "'Night is light about me' — so 'or' is day", { marker: "מיתיבי" }],
    ["a7", "R", "m7", "התם הכי קאמר דוד", "There David speaks of this world and the next", { marker: "התם הכי קאמר" }],
    ["m8", "D", "rav-huna", "מיתיבי, רבי יהודה אומר: בודקין אור ארבעה עשר ובארבעה עשר שחרית", "R. Yehuda: search on the 'or' of the fourteenth and on the fourteenth morning — so 'or' is night. Conclude so", { marker: "מיתיבי" }],
    ["m9", "D", "rav-huna", "מיתיבי: מאימתי ארבעה עשר אסור בעשיית מלאכה?", "R. Eliezer b. Yaakov: from the 'or'; R. Yehuda: from sunrise", { marker: "מיתיבי" }],
    ["m9-baraisa", "SR", "m9", "אמר ליה ראב״י לרבי יהודה: וכי היכן מצינו יום שמקצתו אסור", "Their exchange: where is a day part forbidden and part permitted? The day itself proves it, for leaven"],
    ["m9-inference", "SE", "m9", "מדקאמר רבי יהודה משעת הנץ החמה, אלמא אור דקאמר ראב״י — אורתא הוא!", "Since R. Yehuda says sunrise, R. Eliezer's 'or' is night", { marker: "מדקאמר … אלמא" }],
    ["a9", "R", "m9", "לא, מאי אור — עמוד השחר", "No: 'or' is dawn"],
    ["q9", "D", "a9", "אי הכי… נימא איהו לנפשיה: הא איכא לילה", "Then R. Eliezer's own night is a part-permitted day", { marker: "אי הכי" }],
    ["a9b", "R", "q9", "הכי קאמר: בשלמא לדידי אשכחנא דקא פלגי רבנן בין יממא לליליא", "He meant: the rabbis divide day from night, not a day within itself", { marker: "הכי קאמר" }],
    ["q9c", "D", "a9b", "שפיר קאמר ליה רבי יהודה לרבי אליעזר?", "Did R. Yehuda's leaven answer hold?", { marker: "שפיר קאמר ליה …?" }],
    ["a9c", "R", "q9c", "הכי קאמר ליה רבי אליעזר: אמינא לך אנא מלאכה דרבנן", "R. Eliezer: I speak of rabbinic labour, you answer with Torah leaven", { marker: "הכי קאמר ליה" }],
    ["q9d", "Q", "a9c", "ואידך?", "And R. Yehuda?", { marker: "ואידך?" }],
    ["a9d", "A", "q9d", "שעות דרבנן", "The hours are rabbinic"],
    ["q9e", "Q", "a9d", "ואידך?", "And R. Eliezer?", { marker: "ואידך?" }],
    ["a9e", "A", "q9e", "הרחקה הוא דעבוד רבנן לדאורייתא", "A rabbinic fence around Torah law"],
    ["m10", "D", "rav-huna", "מיתיבי: אין משיאין משואות… לאור עבורו", "Beacons are lit on the 'or' of the intercalated day — so 'or' is night. Conclude so", { marker: "מיתיבי" }],
    ["m11", "D", "rav-huna", "מיתיבי: היה עומד כל הלילה ומקריב… לאורה טעון קידוש", "One who offers all night must wash at 'orah' — so 'or' is night", { marker: "מיתיבי" }],
    ["a11", "R", "m11", "אורה שאני", "'Orah' is different", { marker: "… שאני" }],
    ["m12", "D", "rav-huna", "מיתיבי מר זוטרא: המפלת אור לשמונים ואחד", "Mar Zutra: miscarrying on the 'or' of the eighty-first — Beis Hillel's reply shows 'or' is night. Conclude so", { speaker: "Mar Zutra", marker: "מיתיבי" }],
    ["m13", "D", "rav-huna", "מיתיבי: יכול יהא נאכל אור לשלישי", "'It might be eaten on the or of the third day' — so 'or' is night. Conclude so", { marker: "מיתיבי" }],
    ["m14", "D", "rav-huna", "תא שמע: אור של יום הכפורים מתפלל שבע ומתודה", "On the 'or' of Yom Kippur one prays seven and confesses — so 'or' is night. Conclude so", { marker: "תא שמע" }],
    ["m15", "D", "rav-huna", "תא שמע דתני דבי שמואל: לילי ארבעה עשר בודקין את החמץ", "Shmuel's school: on the night of the fourteenth one searches — so 'or' is night", { marker: "תא שמע" }],
    ["ela", "C", "ka-salka", "אלא: בין רב הונא ובין רב יהודה דכולי עלמא אור אורתא הוא", "Rather: both agree 'or' is night; each used his own town's word", { marker: "אלא" }],
    ["q-tanna", "Q", "mishnah", "ותנא דידן מאי טעמא לא קתני לילי?", "Why does our mishnah not say 'night'?", { marker: "ותנא דידן מאי טעמא" }],
    ["a-lishna", "A", "q-tanna", "לישנא מעליא הוא דנקט", "It chose refined speech, as R. Yehoshua b. Levi taught", { marker: "לישנא מעליא הוא דנקט" }],
  ],
);
