import { skeleton } from "./skeleton.ts";

/**
 * Bava Metzia 2a–3a — `שנים אוחזין`: the opening sugya of the tractate.
 *
 * Four challenges to the mishnah in turn (the double clause, Ben Nannas,
 * Sumchos, R. Yose), each answered under itself; Rav Pappa's answer to the
 * first reaches back over the whole exchange it settles. Frames inside
 * threads, and the one page in the corpus where opening a band puts a second
 * rail in a second lane.
 */
export const bavaMetziaOchazin = skeleton(
  {
    id: "bm-2a-ochazin",
    title: "Two holding a garment",
    tractate: "Bava Metzia",
    folio: "2a-3a",
    party: "party-talmud",
  },
  [
    ["mishnah", "S", undefined, "שנים אוחזין בטלית… ויחלוקו", "Mishnah: two hold a garment, each says I found it, each says it is all mine", { speaker: "Mishnah" }],
    ["q-two-clauses", "D", "mishnah", "למה לי למתנא… ליתני חדא!", "Why teach both 'I found it' and 'it is all mine'?", { marker: "למה לי … ליתני" }],
    ["a-chada", "R", "q-two-clauses", "חדא קתני", "It teaches one case: I found it and it is all mine", { marker: "חדא קתני" }],
    ["q-metzasiha", "D", "a-chada", "וליתני אני מצאתיה ואנא ידענא דכולה שלי", "Then teach only 'I found it'", { marker: "וליתני" }],
    ["a-reisiha", "R", "q-metzasiha", "אי תנא אני מצאתיה הוה אמינא ראיתיה", "'Found' alone could mean 'saw'; 'all mine' rules that out", { marker: "אי תנא … הוה אמינא" }],
    ["q-rabbanai", "D", "a-reisiha", "והא אמר רבנאי ומצאתה דאתאי לידיה משמע", "But Rabbanai: 'found' in Scripture means it came to hand", { marker: "והא אמר" }],
    ["a-lishna", "R", "q-rabbanai", "תנא לישנא דעלמא נקט", "The tanna uses everyday speech, where seeing is called finding", { marker: "לישנא דעלמא נקט" }],
    ["q-kula-sheli", "D", "a-reisiha", "וליתני כולה שלי ולא בעי אני מצאתיה", "Then teach only 'all mine'", { marker: "וליתני" }],
    ["a-mishna-yeseira", "R", "q-kula-sheli", "ממשנה יתירה אשמעינן דראיה לא קני", "The extra clause teaches that seeing does not acquire", { marker: "ממשנה יתירה אשמעינן" }],
    ["q-ze-veze", "D", "a-chada", "ומי מצית אמרת חדא קתני? והא זה וזה קתני", "How can it be one case? It says 'this one… and this one' twice", { marker: "ומי מצית אמרת" }],
    ["a-rav-pappa", "R", "q-two-clauses", "אמר רב פפא: רישא במציאה וסיפא במקח וממכר", "Rav Pappa: the first clause is a find, the second a purchase", { speaker: "Rav Pappa", marker: "רישא ב… וסיפא ב…" }],
    ["tzricha", "P", "a-rav-pappa", "וצריכא", "And both are needed: a find alone, or a sale alone, would not teach the other", { marker: "וצריכא" }],
    ["q-zuzei", "D", "a-rav-pappa", "מקח וממכר, ולחזי זוזי ממאן נקט?", "A sale? See whose money the seller took", { marker: "ולחזי" }],
    ["a-zuzei", "R", "q-zuzei", "לא צריכא דנקט מתרוייהו", "He took from both, one willingly, one not, and cannot say which", { marker: "לא צריכא ד" }],
    ["q-ben-nannas", "D", "mishnah", "לימא מתניתין דלא כבן ננס", "Is the mishnah not Ben Nannas, who forbids oaths that make one side swear falsely?", { marker: "לימא מתניתין דלא כ" }],
    ["a-ben-nannas", "R", "q-ben-nannas", "אפילו תימא בן ננס", "Even Ben Nannas: here both may have lifted it together, so no false oath is certain", { marker: "אפילו תימא" }],
    ["q-sumchos", "D", "mishnah", "לימא מתניתין דלא כסומכוס", "Is the mishnah not Sumchos, who divides doubtful money without an oath?", { marker: "לימא מתניתין דלא כ" }],
    ["q-ela-rabbanan", "D", "q-sumchos", "ואלא מאי, רבנן? הא אמרי המוציא מחברו עליו הראיה!", "Then whose — the rabbis? They say the claimant must prove", { marker: "ואלא מאי" }],
    ["a-hai-mai", "R", "q-ela-rabbanan", "האי מאי? אי אמרת בשלמא רבנן", "No: for the rabbis, both holding it is different from neither holding it", { marker: "האי מאי? אי אמרת בשלמא" }],
    ["sharpen-sumchos", "SE", "q-sumchos", "אלא אי אמרת סומכוס… לא כל שכן!", "But for Sumchos, all the more should they divide without an oath", { marker: "אלא אי אמרת … לא כל שכן!" }],
    ["a-sumchos-1", "R", "q-sumchos", "אפילו תימא סומכוס: כי אמר סומכוס שמא ושמא", "Even Sumchos: he spoke of two uncertain claims, not two certain ones", { marker: "אפילו תימא" }],
    ["q-rabbah-b-huna", "D", "a-sumchos-1", "ולרבה בר רב הונא דאמר אמר סומכוס אפילו ברי וברי", "But Rabbah bar Rav Huna has Sumchos say it even for certain claims", { marker: "ולפלוני דאמר" }],
    ["a-sumchos-2", "R", "q-sumchos", "אפילו תימא סומכוס: היכא דאיכא דררא דממונא", "Even Sumchos: he spoke where there is a prior monetary link", { marker: "אפילו תימא" }],
    ["q-kal-vachomer", "D", "a-sumchos-2", "ולאו קל וחומר הוא?", "Is it not a fortiori? Here, with no link, all the more divide without an oath", { marker: "ולאו קל וחומר הוא?" }],
    ["a-sumchos-3", "R", "q-sumchos", "אפילו תימא סומכוס: שבועה זו מדרבנן היא כדרבי יוחנן", "Even Sumchos: this oath is rabbinic, as R. Yoḥanan said, against seizing another's cloak", { marker: "אפילו תימא" }],
    ["q-r-yose", "D", "mishnah", "לימא מתניתין דלא כרבי יוסי", "Is the mishnah not R. Yose, who leaves disputed money until Elijah comes?", { marker: "לימא מתניתין דלא כ" }],
    ["q-ela-rabbanan-2", "D", "q-r-yose", "אלא מאי רבנן… הא נמי כשאר דמי!", "Then the rabbis? They too leave the remainder until Elijah", { marker: "אלא מאי" }],
    ["a-hai-mai-2", "R", "q-ela-rabbanan-2", "האי מאי? אי אמרת בשלמא רבנן", "No: for the rabbis, there one coin certainly belongs to one party; here both may own it", { marker: "האי מאי? אי אמרת בשלמא" }],
    ["sharpen-yose", "SE", "q-r-yose", "אלא אי אמרת רבי יוסי היא… לא כל שכן!", "But for R. Yose, all the more should it wait for Elijah", { marker: "אלא אי אמרת … לא כל שכן!" }],
    ["a-yose-1", "R", "q-r-yose", "אפילו תימא רבי יוסי: התם ודאי איכא רמאי", "Even R. Yose: there a cheat is certain, here perhaps both lifted it", { marker: "אפילו תימא" }],
    ["a-yose-2", "ALT", "q-r-yose", "אי נמי: התם קניס ליה רבי יוסי לרמאי", "Or: there R. Yose penalises the cheat to make him confess; here there is nothing to confess", { marker: "אי נמי" }],
    ["q-tinach", "D", "a-yose-2", "תינח מציאה, מקח וממכר מאי איכא למימר?", "That works for a find; what of a sale?", { marker: "תינח … מאי איכא למימר?" }],
    ["mechavarta", "V", "a-yose-1", "אלא מחוורתא כדשנין מעיקרא", "Rather, the first answer is the clear one", { marker: "אלא מחוורתא כדשנין מעיקרא" }],
    ["q-chenvani", "D", "a-yose-1", "בין לרבנן ובין לרבי יוסי, התם גבי חנוני על פנקסו", "For rabbis and R. Yose alike: the shopkeeper's ledger — both swear and collect, though a cheat is certain"],
    ["a-chenvani", "R", "q-chenvani", "אמרי: התם היינו טעמא", "There the shopkeeper and the worker each have a claim on the employer alone", { marker: "אמרי: התם היינו טעמא" }],
    ["a-chenvani-2", "SE", "a-chenvani", "ושכיר נמי אמר ליה", "And the worker likewise, so both swear and collect from the employer"],
  ],
);
