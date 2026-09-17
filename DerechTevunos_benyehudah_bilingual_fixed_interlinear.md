# Derech Tevunos (דרך תבונות) — interlinear edition, chapters 1–9 of 11

Hebrew and English interleaved verse by verse. The text on both sides is that of
`DerechTevunos_benyehudah_bilingual_fixed.md` (the copy whose English terminology is aligned to the
Diaspora Yeshiva translation), reproduced **verbatim**: the unvocalized 1742 Amsterdam Hebrew as keyed by
Project Ben-Yehuda, the clean-room English with its `[ed. …]` source-reading brackets, the printed
citations, the `וכו'`, and the keying artefacts of the Ben-Yehuda transcription. Nothing has been emended,
re-translated or re-worded. The only work done here is the cutting: each of the parent's paragraph pairs is
divided into verses, and the verses are numbered so that anything the site later attaches (a source, a
glyph, a figure, a widget) has an exact place to land. The companion file
`DerechTevunos_benyehudah_bilingual_fixed_interlinear_notes.md` records where such attachments would earn
their place.

**Status:** chapters 1–9 are cut. Chapters 10–11 and the Sugya Context Index are not yet in this file.

## How this file is organised

- `## Chapter N · פרק X` — the chapter heading, identical to the parent's, so the parent's chapter parser
  (`site/scripts/build-text-docs.ts`, `parseChapterHeading`) still matches it.
- `### N.P · label` — paragraph `P` of chapter `N`, numbered as the parent's paragraphs run within the
  chapter. `P = 0` is the chapter's caption line (the parent's `summary`); `P = 1…` are the parent's body
  paragraphs in order. So `3.14` is the fourteenth body paragraph of chapter 3 on *both* sides of the
  parent. The label after ` · ` is an editorial navigation aid and is **not** part of the text. A name
  in a label comes from one of two sources, and the label says which. Either the text names the
  construct itself (`ונקרא…`, "and this is called…": simple, exclusive, exceptive, conditional,
  hypothetical, compound, comparative), or, where the 1742 text gives no name, the label carries the
  name the **Diaspora Yeshiva translation** (Feldheim, 1988/2014) gives it at the same place: in chapter 3,
  *qualified* (kind 2), *disjunction* (the second part of kind 7), *preclusive* (kind 8), *discrepancy*
  (kind 9) and *consequent* (kind 11). Those are the names the site's glyphs (`icons_v3/ICONS_REFERENCE.md`),
  its taxonomy (`site/src/rail/anatomy.ts`), its passage schema, the agent card
  (`DERECH_TEVUNOS_FOR_AGENTS.md`) and the parent's own Sugya Context Index already use, so a label
  that carries one identifies the kind for everything downstream. "Kind N" is Ramchal's own ordinal
  (`המין השמיני`, "the eighth kind"), counted as he counts.
- `#### N.P.S` — verse `S` of that paragraph. Under the heading: one Hebrew paragraph, a blank line, one
  English paragraph. Anything that follows the English paragraph before the next `####` is an
  **insertion** (a note, a figure, a widget) and not text.

## How the verses were cut

1. A verse is one complete move of thought: a definition, the method that follows it, a cited example
   with its citation, the gloss on that example, or the naming of a kind. A paragraph that *is* a list
   (the seven parts, the three quantities) stays one verse; the per-item paragraphs that follow are where
   the items get their own verses.
2. Cuts fall only at the source's own punctuation (`;` `—` `.` `:` `,`) and never inside a quotation.
   Where the Hebrew and the English place a clause boundary differently, the coarser boundary wins, so a
   verse's two sides always cover the same span of thought. A cut is made only where both sides already
   have a space at the seam, so re-joining the verses of a paragraph with single spaces reproduces the
   parent paragraph exactly; an unspaced dash in the English (`heart"—"Rava said`) therefore cannot be
   cut at.
3. Every cited example is its own verse, separated from the gloss that follows it (`הנה זה…`, "now
   this…"), so that a source reference attaches to exactly the words it explains and a commentary
   attaches to exactly the reasoning about them.
4. Where a paragraph names the kind it has just defined (`ונקרא…`, "and this is called…"), the naming
   clause is its own verse, so a glyph or a glossary hook has a place to land.
5. A verse may begin lowercase or end on a comma or a dash. That is a cut, not a rewrite: the sentence
   continues in the next verse, exactly as it does in the parent.

## Chapter 1 · פרק א

### 1.0 · Caption

#### 1.0.1

יבאר כלל המשא ומתן העיוני

It explains the general nature of dialectic investigation

### 1.1 · What dialectic investigation is; how the clarification is carried out; how it is decided

#### 1.1.1

המשא ומתן העיוני, הוא העסק והחקירה, במאמר מן המאמרים, או דעה מן הדעות, לברר ולגלות אם הוא אמתי אם לא;

Dialectic investigation is the engagement with, and investigation of, some statement or some opinion, in order to clarify and reveal whether it is true or not;

#### 1.1.2

ואמנם, הברור הזה יעשה — בערך הטענות שיש לטען, לקימו ולאמתו, או לבטלו ולסתר אותו,

however, this clarification is carried out by setting out the arguments that may be advanced, to uphold and verify it or to annul and contradict it,

#### 1.1.3

באפן שיבחן כח הטענות המאמתות אותו וכח הסותרות, ויכרע כפי היותר נאותות אצל השכל.

in such a way that the force of the arguments that verify it and the force of those that contradict it are examined, and it is decided in accordance with those that are more fitting to the intellect.

### 1.2 · Two settings: several parties, or one person supplying every side

#### 1.2.1

הנה העסק הזה אפשר שיהיה בין רבים, שאחד מהם יעמד לצד האחד ואחד לשכנגדו,

Now this engagement may take place among several people, one of them standing on one side and another on the side opposite him —

#### 1.2.2

פרוש אחד יעמד לצד קיום המאמר, ואחד יעמד לצד סתירתו ובטולו, ויערכו טענותיהם זה כנגד זה;

that is, one stands on the side of upholding the statement and one stands on the side of contradicting and annulling it — and they set their arguments against one another;

#### 1.2.3

ואפשר שיהיה עסק איש אחד לבדו, שישלים לכל הצדדין,

and it may be the engagement of a single man by himself, who supplies all the sides —

#### 1.2.4

פרוש שהוא יניח את המאמר בתחלה, והוא עצמו יערך נגד מאמרו טענות, מה שאפשר שיערך נגדו מי שהוא בעל דעה הפכית למאמר ההוא,

that is, he first lays down the statement, and he himself sets arguments against his statement, such as might be set against it by one who holds an opinion opposite to that statement,

#### 1.2.5

והוא עצמו יחזר ויסתר הטענות שהביא ויקים מאמרו הראשון.

and he himself then goes back and rebuts the arguments he brought and upholds his original statement.

### 1.3 · The three forms in the Talmud; all come to one place; arguments, not arguers

#### 1.3.1

ומשני הדרכים האלה נמצאו בש"ס וכוחים ופלפולים,

Debates and analytical arguments of both these ways are found in the Talmud:

#### 1.3.2

כי יש שנשאו ונתנו רבים באחד מן הענינים, זה הקשה וזה השיב,

for there are cases where several engaged in give-and-take on one of the matters, this one raising a difficulty and that one answering;

#### 1.3.3

ויש שמסדר הש"ס עצמו הקשה והשיב, כאלו היו רבים המדברים בענין ההוא,

and there are cases where the redactor of the Talmud himself raised the difficulty and answered, as if there were several speaking on that matter;

#### 1.3.4

ויש שיאמר הש"ס בפרוש, הוא מותיב לה והוא מפרק לה, והינו — שהמקשה עצמו נתן תשובה לקשיתו,

and there are cases where the Talmud says explicitly, "he raises the objection to it and he resolves it" (הוא מותיב לה והוא מפרק לה), namely, that the questioner himself gave the answer to his difficulty.

#### 1.3.5

ואולם כל הדרכים למקום אחד הם באים, שהוא ברור אמתת הדברים ע"י עריכת הטענות זו לעמת זו,

Yet all the ways come to one place, which is the clarification of the truth of things by setting the arguments one against the other;

#### 1.3.6

ומשפט הקשיא שיקשה אחד על מאמר זולתו, או הקשיא שיקשה בעל מאמר אחד על מאמר עצמו — אחד הוא,

and the rule governing a difficulty that one person raises against another's statement, or a difficulty that the author of a statement raises against his own statement, is one and the same;

#### 1.3.7

וכן משפט התשובה שתבוא על קשיא מן הקשיות, בין שתהיה דברי המקשה עצמו, ובין שתהיה דברי זולתו — אחד הוא;

likewise the rule governing an answer that comes in response to one of the difficulties, whether it be the words of the questioner himself or the words of another, is one and the same;

#### 1.3.8

וכן כל שאר חלקי הפלפול, כי אנחנו לא נביט בכל זה אל הטוענים אלא אל הטענות.

likewise all the other parts of analytical argument, for in all this we look not to those who argue but to the arguments.

## Chapter 2 · פרק ב

### 2.0 · Caption

#### 2.0.1

יבאר חלקי המשא ומתן ויסודותיו

Explains the parts of the dialectic and its foundations

### 2.1 · The principal parts are seven

#### 2.1.1

אמנם חלקי המשא ומתן הראשיים, שמהן נבנים הסגיות כלן, בכל התלמוד, — שבעה הם:

However, the principal parts of the dialectic, from which all the sugyot are built, throughout the entire Talmud — are seven:

### 2.2 · The seven named

#### 2.2.1

מימרא, שאלה, תשובה, סתירה, ראיה, קשיא ותרוץ.

statement (*meimra*), question, answer, contradiction, proof, difficulty, and resolution.

### 2.3 · Their explanation

#### 2.3.1

וזה פרושם:

And this is their explanation:

### 2.4 · Statement (מימרא)

#### 2.4.1

מימרא, — הוא שיאמר אומר מאמר אחד.

Statement (*meimra*) — this is when a speaker states a statement.

### 2.5 · Question (שאלה)

#### 2.5.1

שאלה, — שיבקש אחד מאחד ידיעת ענין-מה.

Question — when one person seeks from another the knowledge of some matter.

### 2.6 · Answer (תשובה)

#### 2.6.1

תשובה, — שישיב הנשאל לשואל על שאלתו.

Answer — when the respondent replies to the questioner concerning his question.

### 2.7 · Contradiction (סתירה)

#### 2.7.1

סתירה, — שיבטל מאמר שנאמר ויכחש מכל וכל.

Contradiction — when a statement that has been made is annulled and denied altogether.

### 2.8 · Proof (ראיה)

#### 2.8.1

ראיה, — שיובא מה שממנו יתבאר אמתת אחד מן המאמרים שנאמרו או מן הדעות שנסברו.

Proof — when something is brought from which the truth of one of the statements that were made, or of the opinions that were held, becomes clear.

### 2.9 · Difficulty (קשיא)

#### 2.9.1

קשיא, — שיראה היום במאמר מן המאמרים או דעה מן הדעות, מה שאינו אמת או מה שאינו נאות.

Difficulty — when one shows there to be, in one of the statements or one of the opinions, something that is not true or something that is not fitting.

### 2.10 · Resolution (תרוץ)

#### 2.10.1

תרוץ, — שיוסר הקשיא מן המאמר אשר הקשה עליו או הדעה.

Resolution — when the difficulty is removed from the statement, or the opinion, against which it was raised.

### 2.11 · Each part divides further

#### 2.11.1

והנה כל אחד מן החלקים האלה יתחלקו עוד לחלקים אחרים ויתבארו לפנינו בסיעתא דשמיא.

Now each one of these parts divides further into other parts, and they will be explained further on, with the help of Heaven.

### 2.12 · The foundations lie in the nature of the intellect; three examples from the wording of the Talmud

#### 2.12.1

ומה שצריך שתדע הוא, כי הנה כל משא ומתן הזה נוסד על יסודות ראשונים, נמצאים בטבע שכלנו,

What you need to know is this: all of this dialectic is founded upon primary foundations that exist in the nature of our intellect,

#### 2.12.2

אשר על פיהם יתנהג להבין מאמר אשר יאמר, ולקבל דעה מן הדעות, או להכחישם,

in accordance with which it conducts itself in understanding a statement that is stated and in accepting one of the opinions or denying them;

#### 2.12.3

כי הנה על היסודות האלה יבנו כל הקשיות והתרוצים, הראיות והדחיות, וכן כל שאר החלקים הנבחנים בו;

for it is upon these foundations that all the difficulties and resolutions, the proofs and oppositions, and likewise all the other parts distinguished within it, are built.

#### 2.12.4

דרך משל כשאמרו (ברכות ד') “הקורא דיעבד — אין, לכתחלה — לא”.

For example, when they said (Berachot 4) [ed. Berachot 15a], "'One who recites' [the Shema without making it audible to his ear, has fulfilled his obligation] — after the fact, yes; from the outset, no" (דיעבד — אין, לכתחלה — לא):

#### 2.12.5

הנה זה נוסד על מה שמצטיר בשכלנו מלשון זה, שכונת אומרו היה לדבר במי שכבר קרא,

now this is founded on what is conceived in our intellect from this wording — that the intention of the one who said it was to speak of one who has already recited;

#### 2.12.6

והפך זה (חלין ד"ב) “הכל שוחטין” — לכתחלה, כי טבע הלשון מורה לנו כך,

and the opposite of this (Chullin 2): "all may slaughter" — [that is, permitted] from the outset, because the nature of the language so indicates to us.

#### 2.12.7

וכן כשהקשו בש"ס (פסחים ד') “האי ‘הכל נאמנים’ — כל הבתים בחזקת בדוקים מבעי לה”,

Likewise, when they raised the difficulty in the Talmud (Pesachim 4) [ed. Pesachim 4b], "This 'all are believed' [concerning the removal of leaven] — it should have said (מבעי לה) 'all the houses are presumed to have been searched,'"

#### 2.12.8

נוסדה הקשיא הזאת על מה שטבע הלשון, זה של “הכל נאמנים”, מורה היות הדין ההוא המזכר שם תלוי בהיות הכל נאמנים על הבדיקה,

this difficulty was founded on the fact that the nature of the language — this wording of "all are believed" — indicates that the ruling mentioned there depends on all being believed concerning the search;

#### 2.12.9

ולפי מה שרוצה להעמיד שם הש"ס אינו תלוי באמת אלא בהיות חזקתן של הבתים שהם בדוקים,

whereas according to what the Talmud wishes to establish there, it does not truly depend on that, but rather on the presumption regarding the houses being that they have been searched,

#### 2.12.10

והטבע מורה לנו שכשנרצה להגיד זה הענין לא נאמרהו אלא בלשון כזה: “כל הבתים בחזקת בדוקים”.

and nature indicates to us that when we wish to state this matter, we would state it only in wording such as this: "all the houses are presumed to have been searched."

#### 2.12.11

וכן כל הקשיות כלן, וכל התרוצים, וכל שאר חלקי הפלפול, כשתחקר עליהם באמת, תמצאם נוסדים על יסודות כאלו

Likewise all the difficulties, every one of them, and all the resolutions, and all the other parts of analytical argument — when you truly investigate them, you will find them founded on foundations like these:

#### 2.12.12

ענינים חקוקים בטבע ההבנה השכלית ששכל האדם מחיבם מעצמו בלי שיצטרך לזה למוד כלל.

matters engraved in the nature of intellectual understanding, which the human intellect affirms as necessary of its own accord, without needing any study for this at all.

### 2.13 · The operations of the intellect are three

#### 2.13.1

ואמנם, פעלות השכל בהשכלתו שלשה:

However, the operations of the intellect in its intellection are three:

### 2.14 · First: conception and understanding

#### 2.14.1

האחד — ציור הענינים והבנת המאמרים והסברות כמות שהם.

The first — the conception of matters and the understanding of statements and lines of reasoning (*sevarot*) as they are.

### 2.15 · Second: derivation of conclusions

#### 2.15.1

השני — הלדת תולדותיהם.

The second — the derivation of their conclusions.

### 2.16 · Third: acceptance or denial

#### 2.16.1

השלישי — קבלתם או הכחשתם.

The third — accepting them or denying them.

### 2.17 · In all of them the intellect proceeds by the foundations engraved in it by nature; now to the particulars

#### 2.17.1

ובכלן — מתנהג והולך כפי היסודות החקוקים לו בטבע, וכמו שזכרנו, ותראה עוד לפנים בעזרת השם.

And in all of them it proceeds and conducts itself according to the foundations engraved in it by nature, as we have mentioned and as you will further see below, with God's help.

#### 2.17.2

ועתה נבארה בפרטיהם כל אחד ואחד בפני עצמו.

And now let us explain them in their particulars, each and every one by itself.

## Chapter 3 · פרק ג

### 3.0 · Caption

#### 3.0.1

יבאר מיני המאמרים

It explains the kinds of statements

### 3.1 · Every statement has a subject and a predicate

#### 3.1.1

הנה כל מאמר שיאמר, סברא שתסבר, וענין שיציר, אי אפשר שלא יהיה נבנה משני חלקים

Now every statement that is made, every line of reasoning (*sevara*) that is reasoned out, and every matter that is conceived cannot but be built of two parts,

#### 3.1.2

דהינו: מענין שיקים או ישלם, ומדבר שבו יקים הענין ההוא או ישלל ממנו;

namely: of a matter that is affirmed or negated, and of a thing in which that matter is affirmed or of which it is negated;

#### 3.1.3

דרך משל: אמר רב אדא בר אהבה: “נשים חיבות בקדוש היום” — קים ענין אחד, שהוא חובת קדוש היום, בדבר אחד, דהינו: כלל הנשים.

for example, Rav Adda bar Ahavah said, "Women are obligated in the sanctification of the day [i.e., Kiddush]" — he affirmed one matter, which is the obligation of the sanctification of the day, in one thing, namely: the class of women.

#### 3.1.4

והנה הענין המקים או משולל — נקרא “נשוא”, והדבר שבו קים או שולל ממנו נקרא — “נושא”;

Now the matter that is affirmed or negated is called the "predicate," and the thing in which it is affirmed or of which it is negated is called the "subject";

#### 3.1.5

נמצא נושא המאמר הזה — נשים, והנשוא — החיוב בקדוש היום.

it follows that the subject of this statement is "women," and the predicate is the obligation in the sanctification of the day.

#### 3.1.6

ומצד זה וזה יחלקו המאמרים למינים שונים.

And from both of these standpoints statements are divided into different kinds.

### 3.2 · By subject: three kinds

#### 3.2.1

מצד הנושאים יתחלקו המאמרים לשלשה מינים:

From the standpoint of the subjects, statements are divided into three kinds:

### 3.3 · The three named

#### 3.3.1

כוללים, פרטיים, קצתיים.

categorical, particular, partial.

### 3.4 · Categorical (כולל)

#### 3.4.1

כוללים — הם המאמרים שנושאיהם כולל, דהינו שיכלל פרטים רבים ובכלם יאמר בהם הנשוא שבמאמר ההוא,

Categorical — these are the statements whose subject is general, namely, that it embraces many individuals and the predicate in that statement is asserted of all of them;

#### 3.4.2

דרך משל (סנהדרין ל') “כל ישראל יש להם חלק לעולם הבא”,

for example (Sanhedrin 30) [ed. Sanhedrin 90a], "All Israel have a share in the world to come."

#### 3.4.3

הנה זה כולל פרטיים רבים, שהם אישי האמה הישראלית, ובכלם יאמר הנשוא, שהוא החלק בעה"ב.

Now this embraces many individuals, who are the members of the Israelite nation, and the predicate, which is the share in the world to come, is asserted of all of them.

### 3.5 · Particular (פרטי)

#### 3.5.1

פרטיים — הם שנושאיהם פרט אחד לבד,

Particular — these are those whose subject is one individual only;

#### 3.5.2

דרך משל: “ירושלים אינה מטמאה בנגעים”.

for example: "Jerusalem does not become impure through leprous marks [on its houses]."

### 3.6 · Partial (קצתי); the unqualified statement (סתמי) has categorical force

#### 3.6.1

קצתיים — שיזכרו בנושא קצת מכלל א',

Partial — those in whose subject some members of one class are mentioned;

#### 3.6.2

ד"מ: “יש מתרות לבעליהן” וכו' — הכונה בו, קצת מכלל הנשים יאמר בהם הנשוא, שהוא ההתר לבעליהן.

for example: "There are [women who are] permitted to their husbands," etc. — the intent in it is that of some members of the class of women the predicate is asserted, which is the permission to their husbands.

#### 3.6.3

ואמנם יש המאמר הסתמי שלא נזכר בנושאו מלת “כל” ואעפ"י כן כחו ככח המאמר הכולל,

However, there is the unqualified statement (*stam*), in whose subject the word "all" is not mentioned, and nevertheless its force is like the force of the categorical statement;

#### 3.6.4

ד"מ: “נשים חיבות בקדוש היום” שזכרנו למעלה, הנה הכונה בו, שכל הנשים חיבות בקדוש היום.

for example: "Women are obligated in the sanctification of the day," which we mentioned above — now the intent in it is that all women are obligated in the sanctification of the day.

### 3.7 · By predicate: eleven kinds

#### 3.7.1

מצד הנשואים יתחלקו המאמרים לאחד עשר מינים.

From the standpoint of the predicates, statements are divided into eleven kinds.

#### 3.7.2

וזה, כי לא כל נשוא שיהיה יאמר על כל נושא שיהיה בדרך אחד, אבל יש שיאמר בדרך אחד ויש שיאמר בדרך אחר, ומצד זה יתחלפו המאמרים למיניהם.

This is because not every predicate whatsoever is asserted of every subject whatsoever in one manner; rather, there is that which is asserted in one manner and that which is asserted in another manner, and from this standpoint statements differ according to their kinds.

### 3.8 · Kind 1 · simple (סתם)

#### 3.8.1

המין האחד — הוא כלל המאמרים שיאמר בהם נשוא בנושא, בלי שום תנאי וגבול, כמאמרים שזכרנו למעלה ואחרים זולתם,

The first kind — this is the whole class of statements in which a predicate is asserted of a subject without any condition or limitation, like the statements we mentioned above and others besides them;

#### 3.8.2

ונקרא זה מאמר סתם.

and this is called a simple statement (*stam*).

### 3.9 · Kind 2 · qualified (מיחד ומגבל): certain, possible, doubtful, impossible

#### 3.9.1

המין השני — אותם שיאמר בהם הנשוא בנושא בדרך מיחד ומגבל,

The second kind — those in which the predicate is asserted of the subject in a qualified and limited manner,

#### 3.9.2

כגון שיאמר הנשוא בדרך ודאית או הכרח, ד"מ (פסחים ד'): “כיון דחלדה או ברדלס מצויים שם, ודאי גררוהו בההיא שעתא”,

such as when the predicate is asserted by way of certainty or necessity; for example (Pesachim 4) [ed. Pesachim 9b]: "Since a weasel or a marten [bardelas] are found there, they certainly dragged it off at that time";

#### 3.9.3

או שיאמרוהו בדרך אפשרות, ד"מ (כתבות ד' ע"ה): “אפשר דמעבר לה בקיוהא דחמרא”,

or when they assert it by way of possibility, for example (Ketubot 75): "It is possible to remove it [the sweat] with the sourness of wine";

#### 3.9.4

או שיאמרוהו בדרך ספק, ד"מ: “כל אשראי ספק אתי, ספק לא אתי”,

or when they assert it by way of doubt, for example: "All credit — it is doubtful whether [the money] will come, doubtful whether it will not come";

#### 3.9.5

או שיאמרוהו בדרך מניעה (כתבות שם): “גבי אשה לא אפשר”.

or when they assert it by way of impossibility (Ketubot, ibid.): "In the case of a woman it is not possible."

#### 3.9.6

וכן כל כיוצא בזה.

And likewise all the like.

### 3.10 · Kind 3 · exclusive (ממעט)

#### 3.10.1

המין השלישי — הוא המאמר שיאמר נשוא בנושא וישלל מכל זולתו,

The third kind — this is the statement in which a predicate is asserted of a subject and negated of everything else;

#### 3.10.2

דרך משל: " מאמר הכתוב “הוא לבדו יעשה לכם”, אמר התר העשיה בצרך אכל נפש, ושלל אותו מכל מה שזולת זה,

for example, the statement of the verse "that alone may be done for you" [Exodus 12:16] — it asserted the permission of doing [work] for the need of a person's food, and negated it of everything other than this;

#### 3.10.3

ונקרא מאמר ממעט.

and this is called an exclusive statement (*me'ma'et*).

### 3.11 · Kind 4 · exceptive (מוציא)

#### 3.11.1

המין הרביעי — שיוציא הנשוא מקצת ממה שנכלל בנושא המאמר ההוא,

The fourth kind — that which excludes the predicate from some of what is included in the subject of that statement;

#### 3.11.2

דרך משל (חלין ד"ב): “הכל שוחטין, חוץ מחרש, שוטה וקטן”,

for example (Chullin 2): "All may slaughter, except for a deaf-mute, an imbecile, and a minor" —

#### 3.11.3

שהרי חש"ו גם הם נכללים במשמעות מלת “כל”, ומוצא הנשוא מהם, דהינו התר השחיטה, עם מלת “חוץ”,

for a deaf-mute, an imbecile, and a minor are also included in the meaning of the word "all," and the predicate, namely the permission to slaughter, is excluded from them by means of the word "except";

#### 3.11.4

ונקרא מאמר מוציא.

and this is called an exceptive statement (*motzi*).

### 3.12 · Kind 5 · conditional (מגבל)

#### 3.12.1

המין החמישי — שיאמר נשוא בנושא, אך לא בהחלט אלא בבחינה אחת או עם תנאי אחד,

The fifth kind — in which a predicate is asserted of a subject, but not absolutely, rather in one respect or with one condition;

#### 3.12.2

ד"מ (יבמות ד' ל"ח): “כנסה — הרי היא כאשתו לכל דבר ובלבד שתהא כתבתה על נכסי” וכו',

for example (Yevamot 38): "[Once] he has taken her in [marriage], she is like his wife in every respect, provided that her marriage settlement [ketubah] be upon the property [of her first husband]," etc.;

#### 3.12.3

וכן (דמאי י"ב): “מחללין אותו כסף על כסף וכו, ובלבד שיחזר ויפדה את הפרות”,

and likewise (Demai 12) [ed. Mishnah Demai 1:2]: "They may redeem it [second-tithe money of demai], silver for silver," etc., "provided that he again redeems the produce";

#### 3.12.4

ונקרא מאמר מגבל.

and this is called a conditional statement (*mugbal*).

### 3.13 · Kind 6 · hypothetical (תלוי): antecedent and consequent

#### 3.13.1

המין הששי — שיתלה מציאות ענין אחד במציאות ענין אחר,

The sixth kind — that which makes the existence of one matter depend on the existence of another matter;

#### 3.13.2

ד"מ (שם ט"ו): “אם עני או כהן למודם לאכל אצלו יבואו ויאכלו”, “אם אתה תבוא לביתי אני אבוא לביתך”,

for example (ibid. 15) [ed. Mishnah Demai 4:4]: "If a poor man or a priest were accustomed to eat with him, they may come and eat"; "If you come to my house, I will come to your house";

#### 3.13.3

ונקרא זה מאמר תלוי.

and this is called a hypothetical statement (*talui*).

#### 3.13.4

ויבחנו בו שני חלקים: הקודם והנמשך;

Two parts are distinguished in it: the antecedent and the consequent.

#### 3.13.5

הקודם — הוא החלק שהזכר בו התנאי, ד"מ “אם היה עני או כהן למודים לאכל אצלו”;

The antecedent is the part in which the condition is mentioned, for example, "if a poor man or a priest were accustomed to eat with him";

#### 3.13.6

הנמשך — הוא הנתלה בראשון, ד"מ: “יבואו ויאכלו”.

the consequent is that which depends on the first, for example: "they may come and eat."

### 3.14 · Kind 7 · compound (מרבה הענינים): asserted together, on one equal footing or one novel and one known (לא זו אף זו · זו ואין צריך לומר זו); or disjunction (או … או)

#### 3.14.1

המין השביעי — מאמר יאמרו בו שני נשואים או יותר בנושא אחד, או נשוא אחד בשני נושאים או יותר, ויתחלק לשני חלקים:

The seventh kind — a statement in which two or more predicates are asserted of one subject, or one predicate of two or more subjects; and it divides into two parts.

#### 3.14.2

החלק האחד שיאמרו הנשואים בנושא יחד וכן הנשוא בנושאים,

The first part is that the predicates are asserted of the subject together, and likewise the predicate of the subjects;

#### 3.14.3

ד"מ (כלאים ל"א): “כלאי הכרם אסורים מלזרע ומלקים ואסורים בהנאה”,

for example (Kilayim 31) [ed. Mishnah Kilayim 8:1]: "Mixed seeds of the vineyard are forbidden to be sown and to be kept, and are forbidden for benefit";

#### 3.14.4

וכן (תרומות מ"ח): “אין תורמין לא במדה ולא במשקל ולא במנין”.

and likewise (Terumot 48) [ed. Mishnah Terumot 1:7]: "One does not separate terumah by measure, nor by weight, nor by number."

#### 3.14.5

הנה כאן נאמרו נשואים שונים, שהם אסור הקיום, אסור הזריעה ואסור ההנאה, בכלאי הכרם, וכן אסור המדידה ואסור המשקל ואסור המנין בהפרשת התרומה.

Now here different predicates were asserted — which are the prohibition of keeping, the prohibition of sowing, and the prohibition of benefit — of mixed seeds of the vineyard; and likewise the prohibition of measuring, the prohibition of weighing, and the prohibition of counting, of the separation of terumah.

#### 3.14.6

וכשאמרו (דמאי י"ז): “המקבל שדה מישראל, מן הכותי, מן הנכרי, יחלק לפניהם”,

And when they said (Demai 17) [ed. Mishnah Demai 6:1]: "One who receives a field [as a sharecropper] from an Israelite, from a Samaritan, or from a gentile, divides [the produce] in their presence,"

#### 3.14.7

נאמר נשוא אחד שהוא החלוק לפניהם בשלשה נושאים, שהם: המקבל שדה מן הכותי, המקבלו מישראל והמקבלו מן הנכרי.

one predicate — which is the division in their presence — was asserted of three subjects, which are: one who receives a field from a Samaritan, one who receives it from an Israelite, and one who receives it from a gentile.

#### 3.14.8

והנה החלק הזה יסתעף עוד לשני ענפים.

Now this part branches out further into two branches.

#### 3.14.9

האחד, שיהיו הנשואים נאמרים בהשואה אחת בנושאיהם;

The first: that the predicates are asserted of their subjects on one equal footing;

#### 3.14.10

השני, שאחד מהם יאמר בדרך חדוש והאחד כמו ענין שכבר נודע.

the second: that one of them is asserted by way of novelty and the other as a matter already known.

#### 3.14.11

ד"מ: “הבכור, מוכרים אותו בעל מום, חי ושחוט”,

For example: "The firstborn [animal] — one may sell it, when blemished, alive or slaughtered" [ed. Mishnah Ma'aser Sheni 1:2: תמים חי, ובעל מום חי ושחוט, "unblemished — alive; blemished — alive and slaughtered"; 1742 prints only the second clause].

#### 3.14.12

הנה מכירתו חי כבר נודע, היתרה — שהרי אפלו בתמים הוא מתר, רק מכירתו שחוט הוא החדוש, שלא התר בהם.

Now its sale alive is already known to be permitted, for even in the case of unblemished ones it is permitted; only its sale slaughtered is the novelty, since that was not permitted for those.

#### 3.14.13

והנה בענף זה ימצאו שני דרכים:

Now in this branch two ways are found.

#### 3.14.14

האחד הוא שיקדם הנודע ואח"כ יזכר המחדש ונקרא זה “לא זו אף זו”, והוא כמשל שזכרנו: חי ושחוט;

The first is that the known comes first and afterward the novel is mentioned; and this is called "not only this but even this" (לא זו אף זו), and it is like the example we mentioned: alive or slaughtered.

#### 3.14.15

השני, שיזכר המחדש תחלה ואח"כ הנודע, וזה נקרא: “זו — ואין צריך לומר זו”, ד"מ: “מתרים באכילה וכל שכן בהנאה”.

The second is that the novel is mentioned first and afterward the known; and this is called "this — and needless to say this" (זו ואין צריך לומר זו); for example: "They are permitted for eating, and all the more so for benefit."

#### 3.14.16

החלק השני מהמין הזה שיאמר בנושא אחד, היותו תלוי בין שני נשואים — לא יתר להמצא בו אחד מהם בלבד.

The second part of this kind is that it is asserted of one subject that it is suspended between two predicates, and it is not allowed that one of them alone be found in it;

#### 3.14.17

ד"מ: “או חולץ או מיבם”.

for example: "He either performs chalitzah or performs levirate marriage."

#### 3.14.18

והנה כלל המין הזה נקרא מאמר “מרבה הענינים”, שהוא מרבה הנשואים או הנושאים.

Now this kind as a whole is called a "compound" statement (*marbeh ha-inyanim*), since it multiplies the predicates or the subjects.

### 3.15 · Kind 8 · preclusive (לא … אלא)

#### 3.15.1

המין השמיני — שיאמר בנושא נשוא אחד בשלילת נשוא או נושא אחר,

The eighth kind — in which one predicate is asserted of a subject by negating another predicate or subject;

#### 3.15.2

דרך משל (תרומות): “לא יאבד את השאר אלא יניחנה במקום מצנע”.

for example (Terumot) [ed. Mishnah Terumot 11:5]: "He shall not let the remainder be lost, but rather shall put it in a concealed place."

### 3.16 · Kind 9 · discrepancy (מכחיש)

#### 3.16.1

המין התשיעי — שיאמר בנושא נשוא אחד עם היות בו נשוא אחר מכחיש אותו לכאורה,

The ninth kind — in which one predicate is asserted of a subject while there is in it another predicate that on the face of it contradicts it;

#### 3.16.2

ד"מ (מעשרות פ"ד): “אף על פי שאביהם תרומה הרי אלו יאכלו”;

for example (Maasrot, chapter 4) [ed. Mishnah Ma'asrot 5:8]: "Even though their parent [plant] is terumah, these may be eaten";

#### 3.16.3

כי הנה היות אביהם תרומה לכאורה הוא מכחיש התר אכילת הגדולים, אך באמת אינו כך.

for now, their parent's being terumah on the face of it contradicts the permission to eat the growths [from those seeds], but in truth it is not so.

### 3.17 · Kind 10 · comparative (מדמה)

#### 3.17.1

המין העשירי — שיאמר בו ענין בדמיון עם ענין אחר,

The tenth kind — in which a matter is asserted by likeness to another matter;

#### 3.17.2

ד"מ (דמאי י"ז): “כשם שחולקין בחלין כך חולקין בתרומה”.

for example (Demai 17) [ed. Mishnah Demai 6:5]: "Just as they divide the non-sacred produce, so they divide the terumah."

#### 3.17.3

והנה בזה תראה שתמיד ילקח ענין נודע וישוה לו אחר, בלתי נודע.

Now in this you will see that a known matter is always taken and another, unknown one is equated to it.

#### 3.17.4

ד"מ במאמר שזכרנו, הנה חלוקן בחלין הוא נודע והשוה לו החלוק בתרומה ג"כ, וגזר היותם שוים במקבל זיתים לשמן —

For example, in the statement we mentioned: now their division of the non-sacred produce is known, and the division of the terumah was equated to it as well, and it asserted that they are equal in the case of one who receives olive trees [as a sharecropper] for the oil;

#### 3.17.5

ונקרא זה מאמר מדמה.

and this is called a comparative statement.

### 3.18 · Kind 11 · consequent (נמשך)

#### 3.18.1

המין האחד-עשר — שיאמר בו נשוא נמשך מנשוא אחר,

The eleventh kind — in which a predicate is asserted that is consequent upon another predicate;

#### 3.18.2

ד"מ (מעשרות ס"א): “היה עובר בשוק ואמר: טלו כלם וכו', לפיכך אם הכניסו לבתיהם מתקנים ודאי”.

for example (Maasrot 61) [ed. Mishnah Ma'asrot 2:1; the mishnah reads טלו לכם תאנים, "take figs for yourselves," where 1742 prints טלו כלם]: "If one was passing through the market and said, 'Take them all'," etc., "therefore, if they brought them into their houses, they must tithe them as certainly [untithed]."

### 3.19 · The manner of the utterance versus the statement intended by it: conceive only the subject, the predicate and the manner; the Pesachim 7b example

#### 3.19.1

ומה שצריך שתדע עוד, כי הנה דרכים רבים יש לבני האדם לפרש בלשונם מה שיחשבו במחשבתם,

What you must further know is that now people have many ways of expressing in their language what they think in their thought;

#### 3.19.2

כי הנה יש שיאריכו בדבריהם ויש שיקצרו בהם, יש שידברו בדרך הגדה ויש בדרך תמיהה ויש בדרך רמז.

for now some are lengthy in their words and some are brief in them; some speak by way of report, some by way of rhetorical question, and some by way of allusion.

#### 3.19.3

וכבר נתבארו כל החלוקים האלה אצל בעלי הדקדוק והמליצה,

All these divisions have already been explained by the masters of grammar and rhetoric;

#### 3.19.4

אך מה שצריך לנו עתה הוא, כי כל דבור שיאמר יהיה באיזה סדר ודרך שיהיה, כשנרד לסוף כונת מדברו נמצא ודאי שרצה בו אמירת נשוא בנושא,

but what we need now is this: that every utterance that is uttered, in whatever order and manner it may be, when we get to the bottom of its speaker's intent we shall certainly find that he intended by it the assertion of a predicate of a subject;

#### 3.19.5

כי זולת זה לא היה בדבורו ממש, ולא היה מצטיר ממנו בשכל שומעו שום ציור שלם.

for otherwise there would be no substance in his utterance, and no complete conception would be formed from it in the intellect of his hearer.

#### 3.19.6

ולכן אל תשת לבך אל דרך הדבור אלא אל המאמר המכון בו.

Therefore do not set your mind on the manner of the utterance but on the statement intended by it.

#### 3.19.7

ואם תראה הדבור קצר — השלימהו במחשבתך, ואם תראהו ארך — תסיר ממנו את המותר.

If you see that the utterance is brief, complete it in your thought; and if you see that it is long, remove from it what is superfluous.

#### 3.19.8

ולא תציר במחשבתך אלא הנושא שעליו ידבר והנשוא שיאמר בו והדרך שיאמרהו בו וכמו שכתבתי לעיל.

And conceive in your thought nothing but the subject of which he speaks, the predicate he asserts of it, and the manner in which he asserts it, as I wrote above.

#### 3.19.9

כשתמצא בש"ס (פסחים ד' ז': “התם היכי נימא? — נימא למול, לא סגיא, דלאו איהו מהל”,

When you find in the Talmud (Pesachim 7): "There, how should we say? Should we say 'to circumcise'? Must it necessarily be he who circumcises?" (לא סגיא דלאו איהו מהל) —

#### 3.19.10

הנה זה לשון קצר ובדרך תמיהות,

now this is abbreviated wording and by way of rhetorical questions,

#### 3.19.11

אך הכונה בזה הוא: ששם אינו יכול לברך אלא על המילה, לפי שאין שם מקום לומר למול, מפני שאינו מכרח שיהיה הוא המל.

but the intent in it is: that there one can bless only "concerning circumcision," because there is no room there to say "to circumcise," since it is not necessary that he be the one who circumcises.

#### 3.19.12

ונמצא שזה מה שצריך שתציר במחשבתך מתוך כל המצות ההמה,

And it follows that this is what you must conceive in your thought out of all those words;

#### 3.19.13

וכן כשחזר ואמר: “אבי הבן מאי אכא למימר”, הכונה שאבי הבן צריך שיאמר למול, לפי מה שהניח שם בתחלה,

and likewise when it went on to say, "The father of the child — what is there to say?" (מאי איכא למימר), the intent is that the father of the child must say "to circumcise," according to what it posited there at the outset;

#### 3.19.14

וכשהשיב: “אין, הכי נמי”, הכונה שכך הוא האמת, פרוש, שאבי הבן צריך שיאמר למול,

and when it answered, "Yes, indeed so" (אין הכי נמי), the intent is that such is the truth, that is, that the father of the child must say "to circumcise."

#### 3.19.15

ועל דרך זה תדין בכל הלשונות כלם.

And in this manner you shall judge all wordings whatsoever.

## Chapter 4 · פרק ד

### 4.0 · Caption

#### 4.0.1

יבאר ערכי המאמרים ויחסיהם

It explains the comparisons of statements and their relations.

### 4.1 · From each statement on its own to comparing one with another; ten kinds of relation

#### 4.1.1

הנה עד הנה בארנו מה שנבין מהמאמרים כל אחד בפני עצמו, עתה נבאר מה שנבין מהעריך מאמר עם מאמר אחר.

Now, up to this point we have explained what is understood from statements, each one on its own; now we shall explain what is understood from comparing one statement with another statement.

#### 4.1.2

בבחינת ערכם ויחסם מתחלקים המאמרים לעשרה מינים, והם: הדומים, המתחלפים וההפכים, החלופיים המתהפכים והנבדלים.

In respect of their comparison and relation, statements divide into ten kinds, and they are: equivalent statements, variant statements and opposites, converses, obverses, and incongruent statements.

### 4.2 · Equivalent (דומים)

#### 4.2.1

הדומים הם שני מאמרים שיאמרו נשוא אחד בנושא אחר עצמו; אלא שבאפן האמירה וסדר הדבור יהיה מתחלף,

Equivalent statements are two statements that assert one predicate of one and the same subject, except that in the manner of assertion and the order of the wording they differ;

#### 4.2.2

או שיאמרו נשוא אחד או שני נשואים דומים בשני נושאים דומים, או שיאמרו שני נשואים דומים בנושא אחד,

or that assert one predicate, or two similar predicates, of two similar subjects; or that assert two similar predicates of one subject.

#### 4.2.3

ד"מ כשאמרו (כתבות ל"ז): “ר' יהודה ור' דוסא אמרו דבר אחד; ר”י הא דאמרן, ר' דוסא, דתניא: שבויה אוכלת בתרומה" וכו'.

For example, when they said (Ketubot 37) [ed. Ketubot 36b]: "R. Yehudah and R. Dosa said one thing; R. Yehudah — that which we have stated [in the Mishnah]; R. Dosa — as it is taught [in a baraita]: a captive woman may eat terumah," etc.

#### 4.2.4

הנה אעפ"י שאין מלותיהם שוות תמצא שכונתם אחת.

Now, although their words are not identical, you will find that their intent is one.

#### 4.2.5

וכן כשאמרו (פסחים מ"ה): ר"י בן ברוקא ור' נחמן אמרו דבר אחד" וכו', ומסים שם: “והא אנינות כלאחר זריקא הויא” וכו',

Likewise when they said (Pesachim 45) [ed. Pesachim 82b; there: R. Nechemyah, where 1742 prints ר' נחמן]: "R. Yochanan ben Beroka and R. Nachman said one thing," etc., and it concludes there: "But acute mourning is like [a disqualification that arises] after the sprinkling [of the blood]," etc.

#### 4.2.6

הנה אין שני הענינים שם אחד, אלא דומים זה לזה.

Now the two matters there are not one, but similar to one another.

### 4.3 · Variant (מתחלפים)

#### 4.3.1

המתחלפים הם שני מאמרים שיאמרו בנושא אחד, שני נשואים מתחלפים או נשוא אחד בשני נושאים מתחלפים,

Variant statements are two statements that assert of one subject two differing predicates, or one predicate of two differing subjects.

#### 4.3.2

ד"מ (כתבות נ"ז): ר' טרפון אומר נותנין לה הכל תרומה; רבי עקיבא אומר: מחצה חלין, מחצה תרומה.

For example (Ketubot 57): "R. Tarfon says: they give her all [of her sustenance as] terumah; R. Akiva says: half non-sacred produce, half terumah."

### 4.4 · Opposites (הפכיים): one yes, one no; the four conditions: one time, one place, one respect, the plain sense

#### 4.4.1

ההפכיים הם שיאמרו על נשוא אחד בנושא אחד, אחד הן ואחד לאו,

Opposites are [statements] that, regarding one predicate of one subject, say — the one yes and the other no.

#### 4.4.2

דרך משל (יבמות נ'): “רבן גמליאל אומר: אין גט אחר גט ולא מאמר אחר מאמר, וחכמים אומרים: יש גט אחר גט ויש מאמר אחר מאמר”.

For example (Yevamot 50): "Rabban Gamliel says: there is no bill of divorce after a bill of divorce, nor levirate betrothal [ma'amar] after levirate betrothal; and the Sages say: there is a bill of divorce after a bill of divorce, and there is levirate betrothal after levirate betrothal."

#### 4.4.3

ואולם לשיקראו הפכיים צריך שיהיו נשואם אחד ונושאם אחד ויובנו — בזמן אחד במקום אחד, בבחינה אחת ובהבנה פשוטה בלי שום שתוף והשאלה.

However, for them to be called opposites, their predicate must be one and their subject one, and they must be understood — at one time, in one place, in one respect, and in the plain sense, without any equivocation or figurative usage.

#### 4.4.4

פרוש, כי הנה מאמר: “לא תצא אשה לא בטוטפות ולא בסנבוטין” ומאמר: “יוצאה אשה בטוטפות ובסנבוטין”, אינם הפכיים, לפי שהאחד הוא בזמן שאינם תפורים, והשני בזמן שהם תפורים;

That is: now, the statement "A woman may not go out with a frontlet nor with pendants" and the statement "A woman may go out with a frontlet and with pendants" are not opposites, because the one is [speaking] of when they are not sewn on, and the other of when they are sewn on;

#### 4.4.5

וכן “לא בכבול” עם “יוצאת בכבול” אינם הפכיים, כי אינם במקום אחד, כי האחד לרשות הרבים והאחר לחצר, וכן בשאר התנאים שזכרנו.

likewise "not with a kavul [a woolen cap]" together with "she may go out with a kavul" are not opposites, because they are not in one place, for the one is [speaking] of the public domain and the other of a courtyard; and so too with the other conditions that we have mentioned.

#### 4.4.6

וכן מאמר: “ואם תקע— חיב חטאת” אינו הפכיי למאמר: “תקיעה חכמה היא ואינה מלאכה” כי הבנת הראשון הוא תקיעת הציר בחור שלו והבנת השני — התקיעה בשופר.

Likewise the statement "And if he drove [it] in, he is liable to a sin-offering" is not opposite to the statement "Blowing is a skill and not a labor," because the meaning of the first is the driving-in [teki'ah] of the hinge-pin into its socket, and the meaning of the second is the blowing [teki'ah] of the shofar.

### 4.5 · Diametrically opposed (הפכיים ממש) and contradictory (מתנגדים)

#### 4.5.1

וצריך שתדע כי בהפכיים עצמם, יש הפכיים ממש, שהם מן הקצה אל הקצה, ויש שאינם הפכיים כל כך, אך על כל פנים מכחישים זה את זה ונקראים מתנגדים.

And you must know that among the opposites themselves there are diametrically opposed statements, which are [opposed] from one extreme to the other, and there are some that are not opposites to that degree, yet in any case contradict one another, and these are called contradictory statements.

#### 4.5.2

שני מאמרים כלליים או שני מאמרים פרטיים, שאחד יחיב ואחד ישלל — נשוא אחד בנושא אחד — הם הפכיים מן הקצה אל הקצה,

Two categorical statements or two particular statements, of which one affirms and one negates — one predicate of one subject — are opposites from one extreme to the other.

#### 4.5.3

דרך משל (שבת קכ"ד): “כל הכלים נטלין לצרך ושלא לצרך: רבי נחמיה אומר: אין נטלין אלא לצרך”.

For example (Shabbat 124): "All vessels may be moved, for a purpose and not for a purpose; R. Nechemiah says: they may be moved only for a purpose."

#### 4.5.4

אלה שני מאמרים הם הפכיים ממש, ששניהם כלליים.

These two statements are diametrically opposed, for both are categorical.

#### 4.5.5

“רבי אליעזר אומר: טמאה היא, ואין מדליקין בה; רבי עקיבא אומר: טהורה היא ומדליקין בה” (שם כ"ח) — הפכיים ממש, ששניהם פרטיים.

"R. Eliezer says [of a wick made from a garment]: it is impure, and one may not light with it; R. Akiva says: it is pure, and one may light with it" (ibid. 28) — diametrically opposed, for both are particular.

#### 4.5.6

אך מאמר (שם ע"ו): “ומצטרפין זה עם זה…חוץ מקלפיהן” עם מאמר: “רבי יהודה אומר: חוץ מקלפי עדשים” אינם הפכיים אלא מתנגדים,

But the statement (ibid. 76): "and they combine with one another… except for their peels," together with the statement "R. Yehudah says: except for the peels of lentils," are not opposites but contradictory statements,

#### 4.5.7

כי תנא קמא אמר על הקלפין שאינם מצטרפים עם האכל ורבי יהודה אומר על קלפי העדשים לבדם שמצטרפים עם האכל —

for the first Tanna said of peels that they do not combine with the food, while R. Yehudah says of the peels of lentils alone that they do combine with the food —

#### 4.5.8

ונמצא מאמר תנא קמא כללי ומאמר רבי יהודה פרטי, וכבר יודה רבי יהודה לתנא קמא בשאר הפרטים הנכללין בכלל הקלפין.

and so the statement of the first Tanna turns out to be categorical and the statement of R. Yehudah particular, and R. Yehudah would indeed concede to the first Tanna regarding the other particulars included in the class of peels.

### 4.6 · Opposite terms; opposites with and without an intermediate

#### 4.6.1

וצריך שתדע עוד שכמו שהם הפכיים השלילה והקיום, כך הם הפכיים שני ענינים, שהכונה בכל אחד מהם שלילת חברו,

And you must know further that just as negation and affirmation are opposites, so too two matters are opposites when the intent of each of them is the negation of the other.

#### 4.6.2

דרך משל: טמא וטהור הם הפכים, כי כונת מלת טמא הוא שלילת הטהרה וכונת טהור — שלילת הטמאה.

For example: impure and pure are opposites, for the intent of the word "impure" is the negation of purity, and the intent of "pure" is the negation of impurity.

#### 4.6.3

אמנם צריך שתדע, שיש הפכים שביניהם אמצעי והפכים שאין ביניהם אמצעי,

However, you must know that there are opposites between which there is an intermediate, and opposites between which there is no intermediate.

#### 4.6.4

דרך משל: טמא וטהור, אסור ומתר — אין ביניהם אמצעי; אך רשות וחובה יש ביניהם אמצעי, שהוא מצוה.

For example: impure and pure, forbidden and permitted — there is no intermediate between them; but optional and obligatory have an intermediate between them, namely the mitzvah [a commended but not binding act].

### 4.7 · Converse (חלוף): subject and predicate change places, in three ways

#### 4.7.1

עוד יש מאמרים שאחד הוא חלופו ממש של חברו, פרוש, שמה שהוא הנושא באחד יהיה הנשוא בשני, ומה שהוא נשוא באחד יהיה הנושא בשני,

There are, further, statements of which one is the exact converse of the other, that is, what is the subject in the one is the predicate in the other, and what is the predicate in the one is the subject in the other.

#### 4.7.2

דרך משל, כשתאמר (ירושלמי): “אין עברה מצוה, אין מצוה עברה”.

For example, when you say (Yerushalmi) [ed. Yerushalmi Shabbat 13:3]: "No transgression is a mitzvah; no mitzvah is a transgression."

#### 4.7.3

הנה בראשון — עברה היא נושא ומצוה נשוא, ובשני להפך.

Now in the first, "transgression" is the subject and "mitzvah" the predicate, and in the second the reverse.

#### 4.7.4

ואולם החלוף הזה יוכל להיות בשלשה דרכים:

However, this conversion can take place in three ways.

#### 4.7.5

האחד, שיתחלף הסדר, פרוש: הנושא והנשוא, וישאר הכמות, פרוש, שאם היה כללי ישאר כללי ואם פרטי — פרטי; וכן הגזרה, פרוש, שאם היה מקים ישאר מקים, ואם שולל ישאר שולל,

The first: that the order changes, that is, the subject and the predicate, while the quantity remains — that is, if it was categorical it remains categorical, and if particular, particular — and likewise the quality, that is, if it was affirmative it remains affirmative, and if negative it remains negative;

#### 4.7.6

דרך משל שני המאמרים שזכרנו: “אין עברה מצוה, אין מצוה עברה”.

for example, the two statements we have mentioned: "No transgression is a mitzvah; no mitzvah is a transgression."

#### 4.7.7

השני — שיתחלף הסדר וגם הכמות, אך הגזרה תתקים.

The second: that the order changes and the quantity as well, but the quality is maintained;

#### 4.7.8

דרך משל, מאמר: “כל שאינו אוכל אינו מאכיל” עם מאמר “יש שאינו מאכיל ואינו אוכל”, שהראשון כללי והשני קצתי.

for example, the statement "Whoever does not eat [terumah] does not enable [others] to eat" with the statement "There is one who does not enable [others] to eat and does not eat," for the first is categorical and the second partial.

#### 4.7.9

השלישי — שיתחלף הסדר והגזרה וישאר הכמות,

The third: that the order and the quality change while the quantity remains;

#### 4.7.10

משל: “כל האוכל מאכיל” עם מאמר: “כל שאינו מאכיל אינו אוכל”.

an example: "Whoever eats enables [others] to eat" with the statement "Whoever does not enable [others] to eat does not eat."

### 4.8 · Obverse (מתהפכים)

#### 4.8.1

המתהפכים הם אותם שנשואיהם ונושאיהם שניהם הפכיים, ונמצא ענינם אחד.

Obverse statements are those whose predicates and subjects are both opposites, and so their matter turns out to be one.

#### 4.8.2

דרך משל: " כל האוכל מאכיל, כל שאינו אוכל אינו מאכיל".

For example: "Whoever eats enables [others] to eat; whoever does not eat does not enable [others] to eat."

### 4.9 · Incongruent (נבדלים)

#### 4.9.1

אך המאמרים שאין להם יחס משתף כלל, פרוש, שאין נושאיהם ולא נשואיהם אחד, וגם לא דומים כלל, יקראו נבדלים.

But statements that have no shared relation at all — that is, neither their subjects nor their predicates are one, nor are they similar at all — are called incongruent.

## Chapter 5 · פרק ה

### 5.0 · Caption

#### 5.0.1

יבאר דיוקי המאמרים

Explains the inferences of statements.

### 5.1 · Understanding from what is heard what was not heard: the inference (דיוק)

#### 5.1.1

הנה עד הנה דברנו ממה שמצטיר בשכלנו מן המאמרים שנקרא או שנשמע.

Now, up to this point we have spoken of what is conceived in our intellect from the statements that we read or hear.

#### 5.1.2

אמנם עוד נחקק בטבענו להתבונן מתוך הנשמע מה שלא נשמע, מפני היותו מתחבר בהכרח עם הנשמע.

However, it is further engraved in our nature to reflect, from within what is heard, upon what was not heard, because it is necessarily joined to what is heard.

#### 5.1.3

דרך משל, כשאמרה התורה: “זאת החיה אשר תאכלו” — הנה מאמר הזה נבין תחלה כפי הבנת מלותיו אלה, שאלה המינים המזכרים בפרשה, מתר לנו לאכל אותם;

For example, when the Torah said, "These are the living things that you may eat" [Leviticus 11:2] — now, this statement we understand at first according to the understanding of these words of it: that these species mentioned in the passage — it is permitted for us to eat them;

#### 5.1.4

אמנם, אי אפשר לנו שלא נבין מזה גם כן, ששאר המינים זולת אלה, אינם מתרים לנו;

however, it is impossible for us not to understand from this as well that the other species besides these are not permitted to us.

#### 5.1.5

וכן כשאמר: “אלה דברי דוד האחרונים”, נתבונן מזה מכלל דאכא ראשונים — כי אי אפשר להבין “אחרון” מבלי “ראשון”.

Likewise, when it said, "These are the last words of David" [2 Samuel 23:1], we reflect from this that, by implication, there are first ones — for it is impossible to understand "last" without "first."

#### 5.1.6

ואולם, כל מה שאנו מבינים מתוך מאמר אחד ולא פרש בו, נקראהו “דיוק”.

But everything that we understand from within a statement, which it did not make explicit, we call an "inference."

#### 5.1.7

ועתה נבאר משפטיו.

And now we shall explain its rules.

### 5.2 · Every word keeps its proportion and measure; the inference from "into a house"

#### 5.2.1

הנה כמו כן, מאמר שיאמר, ראוי שישמרו כל מלותיו הערך והשעור הראוי להן,

Now, likewise, when a statement is uttered, all its words ought to preserve the proportion and measure fitting to them;

#### 5.2.2

פרוש, שלא ייחד נשוא לנושא אחד אם הוא ראוי לרבים, ולא יאמר בנושאים רבים נשוא שאינו ראוי אלא לאחד מהם.

that is, one should not confine a predicate to a single subject if it is fitting for many, nor assert of many subjects a predicate that is fitting for only one of them.

#### 5.2.3

וכן על דרך זה לא ייחד לנושא נשוא אחד אם ראוי לו יותר; ולא יאמרו בנושא נשואים רבים אם אין ראוי לו אלא אחד מהם.

Likewise, in the same way, one should not confine a subject to a single predicate if more befit it, nor should many predicates be asserted of a subject if only one of them befits it.

#### 5.2.4

והנה על פי השרש הזה, כשיזדמן לפנינו מן המאמרים, יביט שכלנו אל חלקיו ואל שעורם, וכפי מה שיראה כך יהיה הציור שיקבל מהם.

Now, on the basis of this principle, when one of the statements comes before us, our intellect looks to its parts and to their measure, and according to what it sees, such will be the conception it receives from them;

#### 5.2.5

וכל מה שהוא חוץ מן הגבול ההוא ידון היותו נדחה.

and whatever lies outside that limit, it will judge to be rejected.

#### 5.2.6

דרך משל שנינו: “ר”י אומר: הצד צפר למגדל וצבי לבית — חיב".

For example, we have learned [Mishnah Shabbat 13:5]: "R. Yehudah says: one who traps a bird into a cupboard or a deer into a house is liable."

#### 5.2.7

ודיקו בש"ס: “לבית הוא דמחיב, אבל לביברין — לא”.

And they inferred in the Talmud: "It is [for trapping] into a house that he is liable, but into enclosures — no."

#### 5.2.8

יסוד הדיוק הזה הוא, כי הנה יחד ר"י החיוב אל הנושא המגבל של צד צבי לבית, ומן הראוי שנדון מדבריו שכל מי שלא יהיה מכלל הנושא הזה שהגבילו, לא יהיה בו נשוא זה, פרוש: מי שלא יהיה צד לבית,

The foundation of this inference is this: R. Yehudah confined the liability to the limited subject of one who traps a deer into a house, and it is fitting that we judge from his words that whoever is not included in this subject that he limited will not have this predicate — that is, one who does not trap into a house;

#### 5.2.9

אף על פי שיהיה החיוב על כל צד, בהחלט, לא היה מזכיר בנושאו “הצד לגבול”, דהינו “הצד לבית”.

for if the liability were indeed upon every trapper, absolutely, he would not have mentioned in his subject "one who traps into a limited [place]," namely "one who traps into a house".

#### 5.2.10

וכן כל כיוצא בזה.

And likewise for everything of the like.

### 5.3 · Two kinds of inference: necessary (מכרח) and non-necessary (בלתי מכרח)

#### 5.3.1

ואמנם צריך שתדע, שיש בדיוקים שני מינים: מכרח ובלתי מכרח.

However, you must know that there are two kinds of inferences: the necessary and the non-necessary.

#### 5.3.2

הבלתי מכרח הוא התלוי בדקדוק סדר המלות ויחסן, דאף על פי שתחלת ההתבוננות נותן שנדקדקהו, כבר יוכל למצא טעם שבעבורו נודה במאמר ונכחיש הדיוק,

The non-necessary inference is the one that depends on precision as to the order of the words and their relation; for although reflection at the outset gives grounds for us to draw it precisely, a reason may yet be found on account of which we concede the statement and deny the inference.

#### 5.3.3

דרך משל, כששנינו: “אם רב ישראל — מברך”, ואחר כך אמרו: “בדין הוא, דאפלו מחצה על מחצה, ואידי דתנן רישא רב תנא סיפא נמי רב”. —

For example, when we learned, "If the majority are Jews — he recites the blessing" [over a light seen outside a town; Berachot 53a] [ed. Berachot 53a: the inference drawn there, הא מחצה על מחצה אינו מברך, "hence half and half he does not bless," is not printed in 1742], and afterward they said: "By right, even [for] half and half [he should bless]; but since the first clause taught 'majority,' the latter clause taught 'majority' as well" (ואידי דתנן רישא רב תנא סיפא נמי רב) —

#### 5.3.4

הנה נדחה הדיוק במה שאמר, שלא נתכון התנא להוציא מחצה על מחצה אלא להמשך אחר לשון הרישא.

now, the inference is deflected by what was said, that the Tanna did not intend to exclude half and half, but only to follow the wording of the first clause.

#### 5.3.5

אך המכרח הוא התלוי בעצם המאמר, שאי אפשר שנודע המאמר. ונכחיש הדיוק ההוא, כי באמת אינו מתפרד ממנו

But the necessary inference is the one that depends on the essence of the statement, such that it is impossible for us to acknowledge the statement and deny that inference, for in truth it is not separable from it.

#### 5.3.6

דרך משל, כיון שידענו מאמר: “כל עמר דנקי — אגב אמה סלק”, מכרח שנדע גם כן, שכל דלא סלק לא הוה נקי אגב אמה.

For example, once we know the statement "Any wool that is clean along with its mother rises" [i.e., wool kept clean while still on the ewe turns out well], it is necessary that we also know that whatever did not rise was not clean along with its mother.

### 5.4 · The necessary inferences of each kind of statement: contrapositive, limited converse, complete converse, absolute opposite, limited contrapositive

#### 5.4.1

אמנם כלל הדיוקים המכרחים הם אלה:

However, the necessary inferences as a whole are these.

#### 5.4.2

כל מאמר כללי מקים, ידיקו ממנו שני דיוקים,

From every categorical affirmative statement two inferences are drawn;

#### 5.4.3

דרך משל: “כל דנקי — אגב אמה סלק” — ידיק ממנו: כל דלא סלק לא הוה נקי אגב אמה — ונקרא זה חלוף הפכי כולל,

for example, "Whatever is clean along with its mother rises" — from it is inferred: whatever did not rise was not clean along with its mother — and this is called the contrapositive;

#### 5.4.4

וידיק ממנו, שאחד מן העולים יפה הוא ה"נקי אגב אמה", ונקרא זה חלוף קצתי.

and from it is inferred that one of those that rise well is the one "clean along with its mother," and this is called the limited converse.

#### 5.4.5

וכל מאמר כללי שולל ידיק ממנו דיוק אחד לבד,

And from every categorical negative statement only one inference is drawn;

#### 5.4.6

דרך משל: “אין רע יורד מלמעלה, אין יורד מלמעלה רע”. ונקרא זה חלוף כולל.

for example: "No evil descends from above [Bereshit Rabbah 51:3]; nothing that descends from above is evil." And this is called the complete converse.

#### 5.4.7

וכל מאמר קצתי מקים ידיקו ממנו שלשה דיוקים.

And from every partial affirmative statement three inferences are drawn.

#### 5.4.8

דרך משל: “יש זריז ונשכר”, ידיק ממנו: “יש זריז ואינו נשכר” — ונקרא זה הפך;

For example: "There is one who is diligent and gains" [Pesachim 50b]; from it is inferred: "there is one who is diligent and does not gain" — and this is called the absolute opposite;

#### 5.4.9

וידיק ממנו: “יש שאינו נשכר והוא זריז” — ונקרא זה חלוף קצתי הפכי;

and from it is inferred: "there is one who does not gain and is diligent" — and this is called the limited contrapositive;

#### 5.4.10

וידיק ממנו: “אחד מן הנשכרים הוא הזריז” ויקרא זה חלוף קצתי.

and from it is inferred: "one of those who gain is the diligent one," and this is called the limited converse.

#### 5.4.11

וכן כל מאמר קצתי שולל ידיק ממנו שלשת הדיוקים האלה.

Likewise, from every partial negative statement these three inferences are drawn.

#### 5.4.12

דרך משל: “יש קדשים שיש להם פדיון”, תדיק מזה (יש קדשים שיש להם פדיון): יש שיש להם פדיון והם קדשים, יש שאין להם פדיון והם קדשים.

For example: "There are consecrated things that have redemption"; you will infer from this (there are consecrated things that have redemption): there are things that have redemption and they are consecrated; there are things that have no redemption and they are consecrated.

## Chapter 6 · פרק ו

### 6.0 · Caption

#### 6.0.1

יבאר אמתת המאמרים וכזבם

It explains the truth and falsity of statements.

### 6.1 · True statements and false statements

#### 6.1.1

כלל המאמרים שיאמרו יתחלק לאמתים וכוזבים.

The totality of statements that may be uttered divides into true ones and false ones.

#### 6.1.2

האמתים הם – שיאמרו מה שהוא. הכוזבים – שיאמרו מה שאינו.

The true ones are those that say what is; the false ones, those that say what is not.

### 6.2 · Literal statements, and statements by way of metaphor or hyperbole (השאלה · הפלגה)

#### 6.2.1

והנה צריך שתבחין בזה בין המאמרים הפשוטים ומאמרים הנאמרים על דרך השאלה או ההפלגה.

Now in this you must distinguish between literal statements and statements uttered by way of metaphor or hyperbole.

#### 6.2.2

כי הפשוטים אמתם וכזבם תלוי בהיות צודק או בלתי צודק מה שנרמז במלותיהן לפי הבנתן הפשוטה.

For with the literal ones, their truth and falsity depend on whether what their words indicate, according to their plain sense, holds true or does not hold true.

#### 6.2.3

אך באותן שעל דרך ההשאלה או ההפלגה. כי הפשוטים אמתם וכזבם תלוי בהיות צודק או בלתי צודק מה שנרמז במלותיהן לפי הבנתן הפשוטה.

But in those that are by way of metaphor or hyperbole. For with the literal ones, their truth and falsity depend on whether what their words indicate, according to their plain sense, holds true or does not hold true.

#### 6.2.4

אך באותן שעל דרך ההשאלה או ההפלגה – אין האמת והכזב תלוי במה שמובן מפשט מלותיהן, אלא ברמז המכון בם.

But in those that are by way of metaphor or hyperbole, truth and falsity do not depend on what is understood from the plain sense of their words, but on the allusion intended in them.

#### 6.2.5

דרך משל, כשאמרו לרבי יוחנן: “ארי עלה מבבל”, אין אמתת המאמר ההוא במובן מפשט המלות אלא ברמז הנרמז, שהוא, שאדם חכם גדול בתורה עלה מבבל, והוא – רב כהנא.

For example, when they said to R. Yochanan, "A lion has come up from Babylonia," the truth of that statement does not lie in what is understood from the plain sense of the words but in the allusion that is alluded to, namely, that a man greatly learned in Torah has come up from Babylonia — and that is Rav Kahana.

### 6.3 · The ultimate intention (סוף גזרתו) of each kind of statement, and what makes it false

#### 6.3.1

עוד צריך שתדקדק בכל מאמר שיהיה לדעת סוף גזרתו, שבה יהיה תלוי אמתת המאמר או כזבו.

Further, you must examine closely every statement whatsoever, so as to know its ultimate intention (literally, the sum of its assertion), on which the truth or falsity of the statement depends.

#### 6.3.2

וזה יתחלף לפי התחלף המינים שזכרנו למעלה.

And this varies according to the variation among the kinds we mentioned above.

#### 6.3.3

כי הנה המאמר הסתמי, סוף גזרתו הוא המצא הנשוא ההוא בנושא שיאמרהו בו או העדר ממנו.

For the simple statement (*stam*) — its ultimate intention is that the predicate in question is present in the subject of which it asserts it, or absent from it.

#### 6.3.4

דרך משל: “נשים חיבות בקדוש היום” – סוף גזרתו, שיש לנשים חיוב לקדוש היום, ואמתו תלוי בשיהיה האמת כך, שתהיינה הנשים חיבות בקדוש היום.

For example, "Women are obligated in the sanctification of the day" — its ultimate intention is that women have an obligation of sanctifying the day, and its truth depends on the truth being so, namely that women are obligated in the sanctification of the day.

#### 6.3.5

אך המאמר המיחד שזכרנו, שהוא האומר הנשוא בנושא בדרך מיחד, הנה סוף גזרתו הוא המצא הנשוא ההוא באותו הנושא, באותו הדרך: ואלו ימצא הנשוא בנושא אך לא באותו הדרך, לא יהיה המאמר צודק.

But the qualified statement that we mentioned, which is the one that asserts the predicate of the subject in a qualified manner — its ultimate intention is that the predicate in question is present in that subject in that manner; and if the predicate were present in the subject but not in that manner, the statement would not be true.

#### 6.3.6

דרך משל מאמר: “כיון דחלדה וברדלס מצויים שם – ודאי גררוהו” – אלו לא היה ודאי שיגררוהו, אפלו יארע כן פעמים רבות, לא היה המאמר צודק.

For example, the statement "Since weasels and polecats are common there, they certainly dragged it away" — if it were not certain that they would drag it away, even if this should occur many times, the statement would not be true.

#### 6.3.7

המאמר הממעט, שאומר נשוא בנושא ושוללו מכל זולתו – סוף גזרתו הוא, שבאותו הדבר לבדו נמצא אותו ענין, ואלו היה נמצא בזולתו לא היה צודק.

The exclusive statement, which asserts a predicate of a subject and denies it of everything else — its ultimate intention is that in that thing alone that matter is found, and if it were found in something else, it would not be true.

#### 6.3.8

דרך משל, מאמר הכתוב: “הוא לבדו יעשה לכם” – אלו היה מתר ביום טוב עשית דברים אחרים זולתי אכל נפש, לא היה הכתוב אומר “לבדו”, שהרי אינו לבדו.

For example, the statement of the verse "that alone may be done for you" — if on a festival it were permitted to do other things besides [the preparation of] a person's food, the verse would not say "alone," since it is not alone.

#### 6.3.9

המאמר המוציא, שמוציא קצת מן הנכללים בנושא מן הנשוא – גזרותיו שתים. אחת, שבנושא ההוא נמצא הנשוא ההוא: שתים, שאותם המוצאים, אף על פי שהם מן הנושא ההוא, אין בהם הנשוא ההוא.

The exceptive statement, which excludes some of those included in the subject from the predicate — its intentions are two: one, that in that subject that predicate is found; two, that those who are excluded, although they belong to that subject, do not have that predicate in them.

#### 6.3.10

ואם ימצא גם במוצאים, הנה לא יהיה כל המאמר כוזב, אלא הגזרה השניה תהיה כוזבת והראשונה צודקת.

And if it is found also in those excluded, the whole statement will not be false; rather, the second intention will be false and the first true.

#### 6.3.11

דרך משל: “הכל שוחטין חוץ מחרש שוטה וקטן”, אלו היה הדין שהכל שוחטין וגם חרש שוטה וקטן שוחטין, לא נאמר שכל המאמר כוזב, אלא הגזרה “הכל שוחטין” צודקת,:חוץ מחרש שוטה וקטן" אינה צודקת.

For example: "All may slaughter, except a deaf-mute, an imbecile, and a minor" — if the law were that all may slaughter and a deaf-mute, an imbecile, and a minor may also slaughter, we would not say that the whole statement is false; rather, the intention "All may slaughter" is true, [and] "except a deaf-mute, an imbecile, and a minor" is not true.

#### 6.3.12

וכן המאמר המגבל, אם יהיה הגבול בלתי צודק לא מפני זה יהיה בלתי צודק כל המאמר. אלא הגזרה הראשונה צודקת. השניה בלתי צודקת.

Likewise the conditional statement (*mugbal*): if the limitation is not true, the whole statement is not for that reason untrue; rather, the first intention is true, the second not true.

#### 6.3.13

דרך משל: “ומחללין אותו כסף על כסף, ובלבד שיעלו הפרות” וכו', אלו היה זה התנאי אמתי ולא היה זה החיוב, אף על פי כך היתה אמתית הגזרה הראשונה, ש"מחללין אותו כסף על כסף" וכו''.

For example: "and one may redeem it, silver for silver, provided that the produce is brought up [to Jerusalem]," etc. [ed. Mishnah Demai 1:2: ובלבד שיחזר ויפדה את הפרות, "provided that he again redeem the produce"; 1742 prints שיעלו הפרות, the Sages' wording later in the same mishnah] — if this condition were [not] true and there were no such obligation, nevertheless the first intention, that "one may redeem it, silver for silver," etc., would be true.

#### 6.3.14

והמאמר התלוי – שתולים מציאות ענין אחד במציאות ענין אחר, הנה אין סוף גזרתו שום אחד מן הענינים בפני עצמו, אך סוף גזרתו הוא היותם נתלים זה בזה.

And the hypothetical statement (*talui*) — in which the existence of one matter is made to depend on the existence of another matter — its ultimate intention is not any one of the matters by itself; rather, its ultimate intention is their being dependent on each other.

#### 6.3.15

ואלו היו שני הענינים אמת, כל אחד בפני עצמו, אך תליתם זה בזה בלתי צודקת. יהיה המאמר כוזב: ואלו היו הענינים בפני עצמם כוזבים ותליתם זה בזה אמת – יהיה המאמר אמתי.

And if the two matters were true, each by itself, but their dependence on each other were not true, the statement would be false; and if the matters by themselves were false but their dependence on each other true, the statement would be true.

#### 6.3.16

דרך משל, כשאמר החכם לאותו המין: “אם תעשה כן, רופא אמן תקרא”, לא היתה כונתו רק “שיעשה כן” ולא שיקרא “רופא אמן”, אלא שאם היה יכל לעשות כן היה נקרא רופא אמן – ובאמת לא היה יכול לעשות כן ולא היה נקרא רופא אמן.

For example, when the sage said to that heretic, "If you do so, you will be called an expert physician," his intention was not that he should do so, nor that he should be called "an expert physician," but rather that if he were able to do so he would be called an expert physician — and in truth he was not able to do so, and he was not called an expert physician.

#### 6.3.17

וכן כשאמר אליהו: “ואם הבעל אלהים – לכו אחריו!” – לא היה מודה אליהו חס וחלילה שהבעל הוא אלהים, ולא היה אומר לבני ישראל שראוי שילכו אחריו, אלא שאם הוא אלהים ראוי שילכו אחריו.

Likewise, when Elijah said, "and if Baal is God, follow him!" [ed. I Kings 18:21: ואם הבעל לכו אחריו; 1742 adds אלהים] — Elijah was not conceding, heaven forbid, that Baal is God, nor was he telling the children of Israel that it is fitting for them to follow him, but rather that if he is God it is fitting for them to follow him.

#### 6.3.18

וזה המאמר אמתי בעצמו, כי שני הדברים תלויים זה בזה באמת אך שקר הוא שיהיה הבעל אלהים ושקר שיהיה ראוי שילכו אחריו.

And this statement is true in itself, for the two things are in truth dependent on each other; but it is false that Baal is God, and false that it is fitting for them to follow him.

#### 6.3.19

והפך זה, אם יהיו הענינים אמת ותליתם זה בזה שקר, יהיה המאמר כוזב.

And the opposite of this: if the matters are true but their dependence on each other is false, the statement will be false.

#### 6.3.20

דרך משל, אם תאמר: “אם משה קבל את התורה – שאול הוא מלך ראשון שמלך על ישראל”. הנה שני הענינים אמתים כל אחד בפני עצמו, אך אינם תלויים זה בזה כלל, והמאמר הזה שתולה אותם זה בזה הוא בלתי צודק.

For example, if you say, "If Moses received the Torah, Saul is the first king who reigned over Israel" — the two matters are true, each by itself, but they are not dependent on each other at all, and this statement, which makes them depend on each other, is not true.

#### 6.3.21

אך המאמר שמקבץ נשואים רבים בנושא אחד או נושאים רבים לנשוא אחד, הנה סוף גזרתו שכל אותם הנשואים הם באותו הנושא או בכל אותם הנושאים יהיה אותו הנשוא, ועל כן, לשיהיה צודק צריך שכלם יהיו אמת.

But the statement that gathers many predicates in one subject, or many subjects to one predicate — its ultimate intention is that all those predicates are in that subject, or that in all those subjects that predicate is found; and therefore, for it to be true, all of them must be true.

#### 6.3.22

דרך משל, כשאמר: “אחד חולץ או מיבם”" – אם האמת היה שחולץ ולא מיבם, הנה המאמר הזה בלתי צודק. אף על פי שחלק ממנו, שהוא חולץ, היה צודק.

For example, when it says, "One performs chalitzah or levirate marriage" [ed. Yevamot 112b: או חולץ או מיבם, "either he performs chalitzah or levirate marriage"; 1742 prints אחד for או] — if the truth were that he performs chalitzah and not levirate marriage, this statement would not be true, even though part of it, that he performs chalitzah, would be true.

#### 6.3.23

וכן כל כיוצא בזה ועל דרך זה, שלשת המינים ח' ט' וי', שכלם מקבצים ענינים הרבה כאחד – להיות המאמר צודק, צריך שכל אותם הענינים יהיו כמו שנאמרים במאמר,

And likewise everything of this sort; and in this way, for the three kinds — the eighth, ninth, and tenth — all of which gather many matters together: for the statement to be true, all those matters must be as they are stated in the statement.

#### 6.3.24

אך המין האחד עשר, ההוא שיאמר בו ענין נמשך מענין אחר, הנה גזרותיו שלש: המצא הקודם והמצא הנמשך והיות מציאות הנמשך המשך מציאות הקודם.

But the eleventh kind, that in which a matter is stated as consequent upon another matter — its intentions are three: the presence of the antecedent, the presence of the consequent, and that the existence of the consequent follows from the existence of the antecedent.

#### 6.3.25

ותראה שבזה יבדל המין הזה מן המאמר התלוי, כי בתלוי אין הגזרה על מציאות שום אחד מן הענינים אלא על התלותם לבד, אך זה גוזר מציאות שני הענינים וגוזר התלותם זה בזה.

And you will see that in this, this kind differs from the hypothetical statement: for in the hypothetical, the intention is not about the existence of any one of the matters but only about their dependence; whereas this one asserts the existence of both matters and asserts their dependence on each other.

#### 6.3.26

דרך משל, המאמר שהבאנו למעלה: “היה עובר בשוק וכו' אוכלים ופטורים – לפיכך, אם הכניסו לבתיהם מתקנים ודאי”.

For example, the statement we cited above: "If he was passing through the market, etc., they eat and are exempt — therefore, if they brought [them] into their houses, they must set [them] right as certain [untithed produce]."

#### 6.3.27

הנה שלשה ענינים נגזרים במאמר הזה: אחד, שיכולים הפועלים לאכל במקום שהם בלי הפרשת מעשר – וזה הקודם. שנים, שאם הכניסו לבתיהם – חיבים לתקן ודאי – וזה הנמשך; שלשה, שחיובם ודאי בהכנסם לבית, תלוי בהתר שהם מתרים לאכל בלי הפרשה במקום שהם.

Now three matters are asserted in this statement: one, that the workers may eat where they are without separating tithe — and this is the antecedent; two, that if they brought them into their houses they are obligated to set them right as certain — and this is the consequent; three, that their obligation as certain upon bringing them into the house depends on the permission by which they are permitted to eat, without separating, where they are.

#### 6.3.28

והנה, כדי שיהיה מאמר כזה אמת, צריך שכל שלשת החלקים יהיו אמת, ואם אחד מהם לא יהיה אמת – המאמר בלתי צודק.

Now, for a statement such as this to be true, all three parts must be true; and if one of them is not true, the statement is not true.

## Chapter 7 · פרק ז

### 7.0 · Caption

#### 7.0.1

יבאר מיני ההקשים

It explains the kinds of syllogisms.

### 7.1 · From the first foundation, understanding statements, to the second, generating conclusions

#### 7.1.1

הנה עד הנה בארנו היסוד הראשון – שהוא בהבנת המאמרים.

Now, up to this point we have explained the first foundation — which lies in the understanding of statements.

#### 7.1.2

עתה נבאר השני – שהוא בהלדת התולדות.

Now we shall explain the second — which lies in the generating of conclusions.

### 7.2 · Premise, conclusion, syllogism; the classical syllogism (הקש מופתי); when the conclusion is not generated

#### 7.2.1

טבע ההתבוננות נותן, שכאשר יאמר נשוא אחד בנושא אחד, כל מה שיהיה נכלל או מתחבר באמת בנשוא ההוא, יאמר באותו הנושא.

The nature of reflection dictates that when a certain predicate is asserted of a certain subject, whatever is truly included in or joined to that predicate is asserted of that same subject.

#### 7.2.2

וכן כל מה שנכלל באותו הנושא יאמר בו אותו הנשוא.

Likewise, whatever is included in that subject has that same predicate asserted of it.

#### 7.2.3

ועל פי השרש הזה, כשנשמע מאמר מן המאמרים, יולדו לנו ממנו מאמרים הרבה – כלם נמשכים באמת מן המאמר ההוא ששמענו ונכללים בו, כדרך שנכללים הפרטים בכלליהם.

On the basis of this root, when we hear some statement, many statements are generated for us from it — all of them truly following from that statement which we heard and included in it, in the way that particulars are included in their classes.

#### 7.2.4

דרך משל: שמענו, שהעושה אב מלאכה בשבת חיב סקילה.

For example: we heard that one who performs a primary category of labor on the Sabbath is liable to stoning.

#### 7.2.5

הנה נדע שכל מה שהוא אב מלאכה, יש בו ענין זה של חיוב סקילה: מעתה, כל מעשה שנדע היותו אב מלאכה, נדע ודאי שיש בו חיוב סקילה:

Now we know that whatever is a primary category of labor has in it this matter of liability to stoning; accordingly, for any act that we know to be a primary category of labor, we know with certainty that liability to stoning is in it;

#### 7.2.6

ונוליד מזה, שהכותב בשבת חיב סקילה, הלש חיב סקילה, וכן כלם. כי כל אלה נכללים בנושא המאמר הראשון, דהינו: העושה אב מלאכה.

and we generate from this that one who writes on the Sabbath is liable to stoning, one who kneads is liable to stoning, and likewise all of them. For all these are included in the subject of the first statement, namely: one who performs a primary category of labor.

#### 7.2.7

וכן אלו שמעת מאמר, שהאזמל של מילה הוא מקצה – הנה כל מה שיודע לנו היותו מתחבר לנשוא זה של מקצה תדין בלי ספק המצאו באזמל של מילה;

Likewise, had you heard a statement that the circumcision knife is set aside [*muktzeh*], then whatever becomes known to us as joined to this predicate "set aside" you will judge without doubt to be found in the circumcision knife;

#### 7.2.8

ועל כן, כשתדע שהמקצה אסור בטלטול, תדע שהאזמל של מילה אסור בטלטול.

and therefore, when you know that what is set aside is forbidden to be moved, you will know that the circumcision knife is forbidden to be moved.

#### 7.2.9

והנה המאמר הראשון שממנו ימשך השני נקרא הקדמה, והנמשך נקרא תולדה; והולדת התולדה מהקדמתה נקרא הקש, וכשיהיה על דרך זה נקרא הקש מופתי.

Now the first statement, from which the second follows, is called a premise, and what follows is called a conclusion; and the generating of the conclusion from its premise is called a syllogism, and when it is in this manner it is called a classical syllogism (*hekesh mofti*, a demonstrative syllogism).

#### 7.2.10

ואולם הנך רואה, שהמשך תולדה זו בא מהיות נשוא התולדה מתחבר באמת על נשוא ההקדמה או נושא התולדה נכלל תחת נושא ההקדמה.

But you see that the following of this conclusion comes from the fact that the predicate of the conclusion is truly joined to the predicate of the premise, or the subject of the conclusion is included under the subject of the premise.

#### 7.2.11

ואלו תמצא שאין נשוא התולדה נכלל או מתחבר בהכרח ותמיד בנשוא ההקדמה, הנה התולדה לא תולד.

And were you to find that the predicate of the conclusion is not necessarily and always included in or joined to the predicate of the premise, then the conclusion would not be generated.

#### 7.2.12

דרך משל משבת, שההבערה אב מלאכה, ושמעת שכל העושה אב מלאכה בשבת חיב מיתה, ואחר כך שמעת ר"י אומר שהבערה אינה אב מלאכה: הנה לא תוליד עוד שהמבעיר יהיה חיב מיתה.

For example, from [the laws of] the Sabbath: kindling is a primary category of labor, and you heard that whoever performs a primary category of labor on the Sabbath is liable to death, and afterward you heard R. Yose say that kindling is not a primary category of labor — then you will no longer generate [the conclusion] that one who kindles is liable to death.

#### 7.2.13

וכן כשידעת שהמקצה אסור בטלטול, וחשבת שלטלטלו מן הצד יהיה גם כן אסור, ואחר כך שמעת שטלטול מן הצד אין שמו טלטול – הנה לא תדין עוד שיהיה המקצה אסור לטלטלו מן הצד.

Likewise, when you knew that what is set aside is forbidden to be moved, and you thought that moving it from the side [i.e., indirectly] would likewise be forbidden, and afterward you heard that moving from the side is not called moving — then you will no longer judge that what is set aside is forbidden to be moved from the side.

#### 7.2.14

ואמנם, בדבר הזה יפל הטעות בשכלו של האדם, שיחשב מתחילה היות הדבר בדרך אחד וימצאהו אחר כך בדרך אחר, וגם יפל המחלקת וההפרש בין הסברות ועל כן יקרה שאחד יוליד תולדה אחת ואחר יכחישה.

However, in this matter error befalls a person's intellect, in that he thinks at first that the thing is one way and afterward finds it another way; and here too arise the dispute and the divergence between lines of reasoning (*sevarot*), and therefore it happens that one person generates a certain conclusion and another denies it.

### 7.3 · Analogism (בנין אב · מה מצינו) and a fortiori (כל שכן · קל וחמר); the three ways their conclusion is annulled

#### 7.3.1

עוד מטבע ההתבוננות הוא, שהדומים ילמדו זה מזה.

It is further of the nature of reflection that similar things are learned from one another.

#### 7.3.2

פרוש, שאם מצאנו שני נושאים דומים, מצאנו באחד מהם מפרש נשוא אחד, בדין המצא הנשוא ההוא גם בשני, אף על פי שלא פרש בו, ונקרא “בנין אב” או “מה מצינו”.

That is, if we found two similar subjects, and in one of them we found a certain predicate stated explicitly, it is right that that predicate be found in the second as well, even though it was not stated explicitly of it; and this is called an analogism (*binyan av*, a paradigm case, or *mah matzinu*, "just as we find").

#### 7.3.3

וכן על דרך זה נדון מהפחות על היתר או להפך.

Likewise, in this manner we judge from the lesser to the greater, or the reverse.

#### 7.3.4

והינו, שאם נמצא נשוא בנושא שהוא פחות מחברו, וראוי אותו נשוא להמצא בנושא שיותר ממנו – נדון היותו בו. וכן מהיתר לפחות, וזה נקרא “כל שכן” ו"קל וחמר“.

Namely, if a predicate is found in a subject that is lesser than its fellow, and it is fitting for that predicate to be found in the subject that is greater than it, we judge that it is in it. Likewise from the greater to the lesser; and this is called an a fortiori argument (*kol she-ken* and *kal va-chomer*).

#### 7.3.5

דרך משל, אמרו בתורת כהנים: “יחיד מוצא מכלל צבור ונשיא מוצא מכלל צבור. מה יחיד מביא אשם תלוי אף נשיא מביא אשם תלוי” – זה למוד מכח דמיון:

For example, they said in Torat Kohanim [the Sifra]: "An individual is taken out of the class of the community, and a prince is taken out of the class of the community; just as an individual brings a suspensive guilt offering, so too a prince brings a suspensive guilt offering" — this is a derivation by force of similarity;

#### 7.3.6

וכשאמרו: “ומה אם היחיד, שאין מביא על הודעו זכר – מביא אשם תלוי, נשיא שמביא על הודעו זכר – אינו דין שמביא אשם תלוי” – זה נקרא קל-וחמר.

and when they said: "If the individual, who does not bring a male [animal] upon becoming aware [of his sin], brings a suspensive guilt offering, then the prince, who brings a male upon becoming aware — is it not right (אינו דין) that he brings a suspensive guilt offering?" — this is called an a fortiori argument.

#### 7.3.7

והנה אם תמצא שהנושאים, שחשבת היותם דומים, שאינם דומים באמת, תבטל התולדה; וכן אם תמצא, שאותו שחשבת פחות או יתר, אינו פחות או יתר, תבטל התולדה; או אם תמצא נושא אחר דומה לנושא הנדון, שאין בו הנשוא ההוא – תבטל תולדתך.

Now if you find that the subjects which you thought to be similar are not truly similar, the conclusion is annulled; likewise, if you find that the one you thought lesser or greater is not lesser or greater, the conclusion is annulled; or if you find another subject similar to the subject under judgment which does not have that predicate — your conclusion is annulled.

#### 7.3.8

דרך משל: כשהיינו חושבים ש”ילמד צבור מנשיא" השיב הש"ס (כריתות כ"ו): “צבור מנשיא לא אתי; מה לנשיא, שכן יש בקרבנו נקבה” – ונמצא שאין הצבור ונשיא דומים באמת.

For example: when we were thinking that "the community should be learned from the prince," the Talmud replied (Keritot 26): "The community cannot be derived from the prince; what of the prince — [he is distinctive] in that there is a female among his offerings" — and it turns out that the community and the prince are not truly similar.

#### 7.3.9

וכן כשלמדו בקל-וחמר נשיא ממשיח: “ומה משיח שמביא חטאתו משעבר – אין מביא על הקודמות, נשיא שאין מביא משעבר, אינו דין שלא יביא על הקודמות” – סתרו הקל-וחמר, באמרם: “מה למשיח – שכן אינו מביא בשגגה, תאמר בנשיא שמביא בשגגת מעשה”. –

Likewise, when they derived the prince from the anointed priest by an a fortiori argument: "If the anointed priest, who brings his sin offering after he has left [office], does not bring for prior [sins], then the prince, who does not bring after he has left [office] — is it not right that he should not bring for prior [sins]?" — they rebutted the a fortiori argument by saying: "What of the anointed priest — [he is distinctive] in that he does not bring for an unwitting act [alone]; will you say so of the prince, who brings for an unwitting act?"

#### 7.3.10

וזה, מפני שבתחלה חשבנו היות משיח יותר מנשיא ועל כן למדנו, שאם הוא אינו מביא קרבן על הקודמות, כל שכן הנשיא, שהוא פחות ממנו, ואחר-כך מצאנו שאין הנשיא פחות, שהרי בבחינה אחרת הוא יתר ממנו, ואם כן אי אפשר לדון מזה על זה.

And this is because at first we thought the anointed priest to be greater than the prince, and therefore we derived that if he does not bring an offering for prior [sins], a fortiori the prince, who is lesser than he; and afterward we found that the prince is not lesser, since in another aspect he is greater than him, and if so it is impossible to judge from the one to the other.

#### 7.3.11

וכשרצו ללמד נשיא מיחיד, באמרם: אם יחיד, שאינו מביא על הודעו זכר – מביא אשם תלוי, נשיא, שמביא על הודעו זכר – אינו דין שמביא אשם תלוי, סתרו הדין, באמרם: “משיח יוכיח, שמביא על הודעו זכר ואינו מביא אשם תלוי”.

And when they wanted to derive the prince from the individual, by saying: if the individual, who does not bring a male upon becoming aware, brings a suspensive guilt offering, then the prince, who brings a male upon becoming aware — is it not right that he brings a suspensive guilt offering? — they rebutted the reasoning by saying: "Let the anointed priest prove [the contrary] (משיח יוכיח), for he brings a male upon becoming aware and does not bring a suspensive guilt offering."

#### 7.3.12

וזה, מפני שכבר מצאנו נושא דומה לנושא הנדון שאין בו אותו הנשוא.

And this is because we have already found a subject similar to the subject under judgment which does not have that predicate.

### 7.4 · The hypothetical syllogism (הקש תלוי)

#### 7.4.1

עוד מטבע ההתבוננות, ששני ענינים, שהם אחד קודם ואחד נמשך, יכריחו זה את זה.

It is further of the nature of reflection that two matters, of which one is antecedent and one consequent, necessitate one another.

#### 7.4.2

פרוש, שבהמצא הקודם ימצא הנמשך ובהעדר הנמשך יעדר הקודם.

That is, when the antecedent is found the consequent is found, and when the consequent is absent the antecedent is absent.

#### 7.4.3

דרך משל, אמרו בש"ס (פסחים י"ט): “ואי סלקא דעתך רבי עקיבא, לתני רביעי בתרומה וחמישי בקדש”. –

For example, they said in the Talmud (Pesachim 19): "And if it enters your mind (ואי סלקא דעתך) [that he holds in accordance with] R. Akiva, let him teach a fourth [degree of impurity] in terumah and a fifth in consecrated [food]."

#### 7.4.4

הנה זה ההכרח נוסד על יסוד זה שאמרנו, והינו, כי זה ודאי שאם היה סובר כרבי עקיבא. היה נמשך מזה שהיה שונה רביעי וחמישי.

Now this necessity is founded on this foundation that we have stated, namely: it is certain that if he held in accordance with R. Akiva, it would follow from this that he would teach a fourth and a fifth;

#### 7.4.5

כיון שאנו רואים שאינו שונה רביעי וחמישי, אם כן ודאי שאינו סובר כרבי עקיבא.

since we see that he does not teach a fourth and a fifth, it is therefore certain that he does not hold in accordance with R. Akiva.

#### 7.4.6

הנה הדין הזה נקרא הקש תלוי, לפי שהקדמתו מאמר תלוי.

Now this reasoning is called a hypothetical syllogism, because its premise is a hypothetical statement.

### 7.5 · The disjunctive syllogism (הקש מחלק)

#### 7.5.1

עוד מטבע ההתבוננות, שנשואים שונים, שמכרח המצא אחד מהם לבדו בנושא, כשיתברר לנו מציאת האחד, יכרח העדר כל האחרים, וכשיתברר לנו העדר כלם חוץ מאחד, יכרח מציאות האחד הנשאר.

It is further of the nature of reflection that, with differing predicates of which it is necessary that one of them alone be found in the subject, when the existence of one becomes clear to us, the absence of all the others is necessitated; and when the absence of all of them but one becomes clear to us, the existence of the one that remains is necessitated.

#### 7.5.2

דרך משל, אמרו בש"ס (פסחים ד’–ה'): “שמע מנה: הבערה לחלק יצתה” – נוסד זה הלמוד על היסוד הזה שזכרנו.

For example, they said in the Talmud (Pesachim 4–5) [ed. Pesachim 5b]: "Learn from it (שמע מינה): kindling was singled out to divide [the categories of labor]" — this derivation is founded on the foundation we have mentioned.

#### 7.5.3

כי הנה הבערה לא יצתה אלא לחלק או ללאו, כיון שראינו שלא יצתה ללאו – אם כן מכרח שיצתה לחלק.

For kindling was singled out only either to divide or for a [mere] prohibition; since we saw that it was not singled out for a prohibition, it is therefore necessary that it was singled out to divide.

#### 7.5.4

וכן כשאמרו בבא-קמא ק"ד): “היכי דמי, אי דלא עשה בעדים – מנא ידעינן? – אלא דעשה בעדים”.

Likewise, when they said (Bava Kamma 104): "What are the circumstances (היכי דמי)? If he did not do so before witnesses — how do we know? Rather, [it must be] that he did so before witnesses".

#### 7.5.5

יסוד זה הוא, כי אחת מאלה לא ימנע – או עשה בעדים או שלא בעדים: כיון שנתברר לנו שאי אפשר שלא בעדים – שאם כן, “מנא ידעינן” – מכרח שעשה בעדים

The foundation of this is that one of these cannot fail to hold — either he did so before witnesses or not before witnesses; since it has become clear to us that it is impossible that it was not before witnesses — for if so, "how do we know?" — it is necessary that he did so before witnesses.

#### 7.5.6

והנה דין זה נקרא הקש מחלק, לפי שהקדמתו מאמר מחלק או נשוא זה או נשוא זה. יש בנושא זה, או להפך – או לנושא זה ייחס זה הנשוא, וכמו שזכרתי למעלה.

Now this reasoning is called a disjunctive syllogism, because its premise is a disjunctive statement: either this predicate or that predicate is in this subject; or the reverse — this predicate is attributed either to this subject [or to that one], as I mentioned above.

## Chapter 8 · פרק ח

### 8.0 · Caption

#### 8.0.1

יבאר הראיות האמתות והראיות המכחישות וסתירותיהם וחקות ההגדה וחסרונותיה

It explains the verifying proofs and the disproofs and their rebuttals, and the rules of the report and its deficiencies.

### 8.1 · From understanding statements and generating conclusions to accepting or denying

#### 8.1.1

כבר בארנו הבנת המאמרים והלדת התולדות: עתה נבאר קבלת הדעות או הכחשתן.

We have already explained the understanding of statements and the generation of conclusions; now we shall explain the acceptance of opinions or their denial.

### 8.2 · Accept, deny, or remain in doubt

#### 8.2.1

כל מאמר שנשמע אפשר שנקבל אותו ואפשר שנכחישהו ואפשר שנסתפק:

Any statement that we hear we may accept, we may deny, or we may remain in doubt about:

#### 8.2.2

מאמר שתבוא לנו ראיה אל אמתו – נקבלהו, מאמר שתהיה לנו ראיה על כזבו – נכחישהו. ושלא תהיה לנו ראיה לא על אמתו ולא על כזבו – נסתפק.

a statement for which a proof of its truth comes to us — we accept it; a statement for which we have a proof of its falsity — we deny it; and one for which we have no proof either of its truth or of its falsity — we remain in doubt.

### 8.3 · Proof of truth is of three kinds: from nature, from convention, from syllogism

#### 8.3.1

הראיה אל אמתת המאמר מתחלקת לשלשה מינים: ראיה מצד הטבע. ראיה מצד ההסכמה. ראיה מצד ההקש.

The proof of the truth of a statement divides into three kinds: proof from nature, proof from convention, and proof from syllogism.

### 8.4 · Proof from nature: two kinds of matters verified in themselves

#### 8.4.1

ראיה מצד הטבע היא, שיהיה המאמר מן הדברים המאמתים אצל הכל בטבע, או נוסד על אחד מן הדברים האלה,

Proof from nature is that the statement be one of the things that are verified for everyone by nature, or be founded on one of these things;

#### 8.4.2

כי הנה שני מיני ענינים יש, שהם מאמתים מצד עצמם ואינם צריכים ראיה אחרת, והם: המשכלות הראשונות והמוחשות.

for there are two kinds of matters that are verified in themselves and need no other proof, and they are: the first intelligibles (axioms) and the sensibles (sense perceptions).

### 8.5 · The first intelligibles (המשכלות הראשונות)

#### 8.5.1

המשכלות הראשונות הם הענינים ששכל האדם מורה אותם מעצמו, ולא יצטרך על זה למוד ולא יסתפק בה מי שהוא בריא בשכלו.

The first intelligibles are the matters which a man's intellect teaches of itself, for which he needs no learning, and about which no one of sound intellect is in doubt.

#### 8.5.2

דרך משל: ששנים יותר מאחד, שהחצי פחות מהכל. וכן כל כיוצא בזה.

For example: that two is more than one, that the half is less than the whole. Likewise everything of the like.

### 8.6 · The sensibles (המוחשות)

#### 8.6.1

המוחשות מה שהחוש מעיד עליו, כגון, שהאבן קשה, שהמים לחים.

The sensibles are what the senses attest to, such as that a stone is hard, that water is wet.

#### 8.6.2

דרך משל, כשאמרו (סכה מ') “יצאו עצים – שהנאתן אחר בעורן”.

For example, when they said (Sukkah 40) "wood is excluded [from the sanctity of the Sabbatical year] — for its benefit comes after its burning":

#### 8.6.3

הנה אמתת זה המאמר מתבררת לנו מן החוש, שהרי בעינינו אנו רואים ומרגישים אנו זה, שאין הנאת העצים אלא אחר שנבערו. וכל כל כיוצא בזה.

now the truth of this statement becomes clear to us from the senses, for with our own eyes we see, and we perceive, that there is no benefit from wood except after it has been burned. Likewise everything of the like.

### 8.7 · Proof from convention: two kinds

#### 8.7.1

ראיה מצד ההסכמה הוא שיהיה המאמר מה שדעת כלל האנשים מסכים עליו. או נוסד על זה, שאז יהיה אותו המאמר מאמת לכל מי שיהיה מן הכלל ההוא.

Proof from convention is that the statement be something on which the opinion of the generality of men agrees, or be founded on this; for then that statement will be verified for anyone who belongs to that generality.

#### 8.7.2

ויחלק זה לשני מינים: האחד – כלל המפרסמות והשני – המקבלות.

And this divides into two kinds: the first — the class of commonly accepted opinions (*endoxa*), and the second — received traditions.

### 8.8 · Commonly accepted opinions (המפרסמות)

#### 8.8.1

המפרסמות הם, שדעת רב האנשים מסכים עליו, מצד היותם אנושיים,

Commonly accepted opinions are those on which the opinion of most men agrees, by virtue of their being human;

#### 8.8.2

דרך משל, שהגאוה מגנה ושהענוה משבחת. וכן כל כיוצא בזה.

for example, that pride is blameworthy and that humility is praiseworthy. Likewise everything of the like.

### 8.9 · Received traditions (המקבלות)

#### 8.9.1

המקבלות – מה שנמסר במסרת מהאבות והמלמדים: ונכלל בזה לנו כל כתבי הקדש, וכל הלכה למשה מסיני, וכל שלש עשרה מדות שהתורה נדרשת עם כל משפטיהם.

Received traditions are what has been handed down by tradition from the fathers and the teachers; and included in this, for us, are all the Sacred Writings, every halachah given to Moses at Sinai, and all the thirteen hermeneutic principles by which the Torah is expounded, together with all their rules.

#### 8.9.2

ונמצא שיאמת לנו מאמר כשימצא אחד מן הכתובים או מן ההלכות שבעל פה או ממאמרי מי שאי אפשר לנו לחלק עליהם, שיאמת מאמרנו.

Thus a statement is verified for us when there is found one of the verses, or one of the oral halachot, or one of the statements of those with whom we cannot dispute, that verifies our statement.

#### 8.9.3

דרך משל, כששנינו (יבמות מ'): “אם יש אב” וכו', אמרו בש"ס על זה: “דאמר מר: אב קודם לכל יוצאי ירכיו”:

For example, when we learned [in the Mishnah] (Yevamot 40): "if there is a father," etc., they said in the Talmud on this: "for the Master said: a father takes precedence over all who issue from his loins."

#### 8.9.4

וכן כשאמרו (סנהדרין צ'): “כל ישראל יש להם חלק לעולם הבא”. אמתו מאמר זה בעבור הכתוב שנאמר: “ועמך כלם צדיקים לעולם יירשו ארץ”. וכן כל כיוצא בזה.

Likewise, when they said (Sanhedrin 90): "All Israel have a share in the World to Come," they verified this statement by means of the verse, as it is stated: "And your people are all righteous; they shall inherit the land forever." Likewise everything of the like.

### 8.10 · Proof from syllogism; proof from the falsity of the opposite; a demonstration worked: the priest's wife eats terumah

#### 8.10.1

ראיה מצד ההקש היא, שיתברר לנו היות מאמרנו תולדה אמתית של הקדמה מאמתת, והינו שיולד וימשך זה המאמר ממאמר אחר מאמת לנו.

Proof from syllogism is that it become clear to us that our statement is a true conclusion of a verified premise, namely, that this statement is generated by and follows from another statement that is verified for us;

#### 8.10.2

וזה בכח אחד מן ההקשים שנתבארו למעלה. דהינו: ההקש המופתי, ה"מה מצינו“, ה”כל-שכן“, ההקש תלוי וההקש מחלק.

and this by force of one of the syllogisms explained above, namely: the classical syllogism, the analogism (*mah matzinu*), the a fortiori argument, the hypothetical syllogism, and the disjunctive syllogism.

#### 8.10.3

וצריך שתדע, שכשם שיאמת מאמר אם תבוא לנו. ראיה עליו, יאמת, אם תבוא לנו ראיה על היות הפכו כוזב.

And you must know that just as a statement is verified if a proof of it comes to us, it is verified if a proof comes to us that its opposite is false.

#### 8.10.4

כי זה מחק ההפכיים: כשאחד ישלל – השני יקים, ובלבד שלא יהיו מאותם שיש ביניהם אמצעי, כי אז שנים הם שישוללו ויקים השלישי.

For this is of the rule of opposites: when one is negated, the other is affirmed — provided they are not among those between which there is an intermediate, for then there are two that must be negated for the third to be affirmed.

#### 8.10.5

ואראה לך עתה משל אחד על הראיה שמצד המופת. אמרו בש”ס (יבמות ס"ו): “מנין לכהן שנשא אשה, תאכל בתרומה? – שנאמר: וכהן כי יקנה נפש” וגו'.

Now I shall show you one example of proof from demonstration. They said in the Talmud (Yevamot 66): "From where [is it derived] that when a priest marries a woman, she eats terumah? — for it is stated: 'And if a priest buys any soul,'" etc.

#### 8.10.6

הנה היה המאמר שאשת כהן אוכלת בתרומה, והראיה על זה מכח המופת, שהרי כבר נתאמת לנו שקנין כספו של הכהן אוכל בתרומה, וזה מכח הכתוב, שכך מפרש “וכהן כי יקנה נפש” וגו',

Now the statement was that a priest's wife eats terumah, and the proof of this is by force of demonstration: for it has already been verified for us that the purchase of the priest's money eats terumah, and this by force of the verse, which states so explicitly, "And if a priest buys any soul," etc.;

#### 8.10.7

וידענו כמו כן שאשת(!) של הכהן היא קנין כספו, לפי שאשה נקנית בכסף, אם כן מכרח שתאכל בתרומה.

and we know likewise that the priest's wife is the purchase of his money, since a woman is acquired with money; if so, it is necessary that she eat terumah.

### 8.11 · A demonstration by hypothetical syllogism: "why did the Merciful One write it at the end?"

#### 8.11.1

עוד אמרו (הוריות ב'): מאי שנא דכתב רחמנא לבסוף למימרא דמחיב בכלן, דאי סלקא דעתך מתחיב באחד אף על פי שאינו מתחיב בכלן נכתבה רחמנא להדין באחת בדלות אי נמי בעשירות".

They further said (Horayot 2) [ed. Horayot 9a]: "Why is it different, that the Merciful One wrote it at the end? To say that [whoever is liable for this] is liable for all of them; for if it should enter your mind that one becomes liable for one even though he does not become liable for all of them, let the Merciful One have written this ['one'] in [the section on] poverty, or alternatively in [the section on] wealth."

#### 8.11.2

הנה היה כאן המאמר שרק המתכפר באחד הוא מתכפר בכלן.

Now here the statement was that only one who obtains atonement through one obtains atonement through all of them.

#### 8.11.3

והובא ראיה על זה מכח מופת כזה: אם גם מי שאינו מתכפר באחד היה מתכפר בכלן, היה הכתוב אומר באחת בדלות או בעשירות.

And a proof of this was brought by force of a demonstration of this form: if one who does not obtain atonement through one were also to obtain atonement through all of them, the verse would have said "one" with respect to poverty or with respect to wealth;

#### 8.11.4

ואם אנו רואים שלא אמרו הכתוב לא בדלות ולא בעשירות, אם כן מכרח שמי שאינו מתכפר באחד – אינו מתכפר בכלן, אלא המתכפר באחד מתכפר בכלן.

and since we see that the verse said it neither with respect to poverty nor with respect to wealth, it is therefore necessary that one who does not obtain atonement through one does not obtain atonement through all of them; rather, one who obtains atonement through one obtains atonement through all of them.

#### 8.11.5

וזה על ידי ההקש התלוי שזכרנו למעלה. ועל דרך זה כל שאר ההקשים.

And this is by means of the hypothetical syllogism that we mentioned above. And so with all the other syllogisms.

### 8.12 · Disproof is likewise of three ways; disproof from nature

#### 8.12.1

הראיה על היות המאמר כוזב – גם הוא על שלשה דרכים, והינו מצד הטבע, מצד ההסכמה ומצד ההקש.

The proof that a statement is false proceeds likewise in three ways, namely from nature, from convention, and from syllogism.

#### 8.12.2

מצד הטבע, שימצא אחד מן הענינים המאמתים בטבע שזכרנו שיכחישו את המאמר.

From nature: when one of the matters verified by nature, which we mentioned, is found to disprove the statement.

#### 8.12.3

דרך משל (ברכות): “גמירי דלא עבר”. כשלא הביאו ראיה נגד המאמר מכח החוש ואמרו: “והא קא חזינן דעבר”.

For example (Berachot) [ed. Berachot 58b]: "We have it by tradition that [a comet] does not pass [through Orion]" — when they brought a proof against the statement by force of the senses and said: "But we see that it does pass!"

### 8.13 · Disproof from convention

#### 8.13.1

מצד ההסכמה, שימצא כתוב או מאמר, שאי אפשר לחלק עליו, שיכחישו את המאמר.

From convention: when a verse or a statement that cannot be disputed is found to disprove the statement.

#### 8.13.2

דרך משל כשאמרו: "כל זכורך – לרבות את הקטנים. הביאו ראיה נגד זה מן המשנה: “והא אנן תנן: חוץ מחרש שוטה וקטן”.

For example, when they said: "'all your males' — to include the minors," they brought a proof against this from the Mishnah: "But we have learned [in the Mishnah] (והא אנן תנן): except for a deaf-mute, an imbecile, and a minor."

#### 8.13.3

וכן כשאמרו (בבא-קמא פ"ג): “סמא את עינו רואים אותו כאלו הוא עבד נמכר בשוק”. הביאו ראיה נגד זה מהכתוב, והא כתיב: “ואיש כי יכה נפש אדם – מות יומת; עין תחת עין” וכו'.

Likewise, when they said (Bava Kamma 83): "[if] he blinded his eye, we view him as if he were a slave being sold in the market," they brought a proof against this from the verse: "But it is written: 'And if a man strikes any human being, he shall surely be put to death'; 'an eye for an eye,'" etc.

### 8.14 · Disproof from syllogism: the variant proved true, or a well-known falsehood derived

#### 8.14.1

מצד ההקש, כשנראה היות הפך המאמר, או המתחלק ממנו, תולדה אמתית מהקדמה מאמתת,

From syllogism: when we see that the opposite of the statement, or its variant, is a true conclusion from a verified premise;

#### 8.14.2

או כשנראה יוצאת מן המאמר תולדה שכזבה מפרסם, שאז נדין שבהכרח ההקדמה גם כן כוזבת.

or when we see a conclusion issue from the statement whose falsity is well known, for then we judge that of necessity the premise too is false.

#### 8.14.3

וזה בכח ההקש התלוי שזכרנו למעלה. כי כיון שנתברר לנו היות התולדה ההיא המשך של מאמרנו, הנה מחק הקודם והנמשך הוא, שבהעדר הנמשך, יכרח העדר הקודם.

And this by force of the hypothetical syllogism that we mentioned above; for once it has become clear to us that that conclusion is a consequent of our statement, then it is of the rule of antecedent and consequent that, in the absence of the consequent, the absence of the antecedent follows necessarily.

#### 8.14.4

דרך משל, כשאמרו (שם): “אמא במיתה ממש”, סתרו הסברא הזאת בכח ראיה זאת: “לא סלקא דעתך, דהא אתקש למכה בהמה”.

For example, when they said (ibid.): "Say [it means] actual death," they disproved this line of reasoning (*sevara*) by force of this proof: "It should not enter your mind (לא סלקא דעתך), for it is juxtaposed [in Scripture] to one who strikes an animal."

#### 8.14.5

הנה כאן סתרו הפרוש של מיתה ממש. מפני היות מתחלפו, שהוא ממון, תולדה מהקדמה אמתית, דהינו, שמכה בהמה אינו אלא בממון,

Now here they disproved the explanation of actual death, because its variant, which is money, is a conclusion from a true premise, namely, that one who strikes an animal is [liable] only in money;

#### 8.14.6

וזה על ידי ה"מה מצינו", שזכרנו למעלה מיסד על אחד מן המקבלות אצלנו, שהוא שהנושאים שהקשו זה לזה בכתובים למדים זה מזה.

and this by way of the analogism (*mah matzinu*), which we mentioned above, founded on one of the received traditions that we hold, which is that subjects juxtaposed to one another in the verses are learned from one another.

#### 8.14.7

עתה נאמר: מכה בהמה אינו אלא בממון: מכה אבר אדם למד ממכה בהמה לפי שהקש לו, אם כן מכה אבר באדם אינו אלא בממון,

Now we say: one who strikes an animal is [liable] only in money; one who strikes a limb of a man is learned from one who strikes an animal, since it is juxtaposed to it; if so, one who strikes a limb of a man is [liable] only in money.

#### 8.14.8

נמצא זה הפרוש מקים ונסתר מאליו פרוש “במיתה”,

Thus this explanation stands affirmed, and the explanation "death" is disproved of itself.

#### 8.14.9

וכשאמרו: “אמר קרא: ‘כן ינתן בו’ – ואין נתינה אלא ממון”, הביאו ראיה נגד זה, באמרם: “אלא מעתה, ‘כאשר יתן מום באדם’ – הכי נמי דממון הוא”.

And when they said: "The verse says, 'so shall it be given to him' — and 'giving' means nothing but money," they brought a proof against this, saying: "But then (אלא מעתה), 'as he gives a blemish in a man' — is this too money?"

#### 8.14.10

הנה היה המאמר שכל מקום שכתוב נתינה רוצה לומר ממון. מכאן יוצאת תולדת שכשאמר הכתוב: “כאשר יתן מום באדם”, גם זה ממון, כי גם זה לשון נתינה – וזה דבר שכזבו מפרסם. אם כן ודאי שההקדמה כוזבת.

Now the statement was that wherever "giving" is written, it means money. From this issues the conclusion that when the verse says "as he gives a blemish in a man," this too is money, since this too is the language of giving — and this is something whose falsity is well known. If so, the premise is certainly false.

#### 8.14.11

וזה מכח ההקש התלוי כזה: אם כל נתינה שבתורה היא ממון, גם ‘כאשר יתן מום באדם’ הוא ממון. ‘כאשר יתן מום’ ודאי אינו ממון, אם כן לא כל נתינה שבתורה ממון.

And this is by force of the hypothetical syllogism, as follows: if every "giving" in the Torah is money, then "as he gives a blemish in a man" is also money; "as he gives a blemish" is certainly not money; therefore not every "giving" in the Torah is money.

### 8.15 · The dilemma (ממה נפשך): false in every way it can be read

#### 8.15.1

ויש מין מופת מכחיש שכחו חזק מאד. והוא שנבאר כל הדרכים שאפשר להתפרש בם המאמר. ונראה היותו כוזב בכלם.

There is also a kind of disproving demonstration whose force is very strong. It consists in our setting out all the ways in which the statement could be interpreted, and showing that it is false in all of them.

#### 8.15.2

דרך משל, אמרו בש"ס (בבא-קמא כ"ט): אמר ר' אחא: כגון דעברא במיא דרך שרעתא דנהרא", וסתרו זה באמרם: “היכי דמי, אי דאכא דרכא אחרינא – פושע הוא. אי דלכא דרכא אחרינא – אנוס הוא”.

For example, they said in the Talmud (Bava Kamma 29): "R. Acha said: such as where it [the camel] crossed through water by way of the sloping bank of the river," and they disproved this by saying: "What are the circumstances (היכי דמי)? If there is another way — he is negligent; if there is no other way — he is under compulsion [and exempt]."

#### 8.15.3

וזה נקרא גם כן “ממה נפשך”.

And this is also called a dilemma (ממה נפשך, "either way").

### 8.16 · Rebutting a proof or a disproof: the source does not reach it, or the syllogism fails

#### 8.16.1

ואמנם, בין הראיה המאמתת ובין המכחשת תסתרנה, אם ימצא שאין הדבר כמו שהזכר בראיה, דהינו, שהמשכל או החוש או המפרסם או המסרת או הכתוב אינו מאמתו או אינו מכחישו.

However, both the verifying proof and the disproof are rebutted if it is found that the matter is not as it was mentioned in the proof — namely, that the intelligible, or the sense, or the commonly accepted opinion, or the tradition, or the verse does not verify it or does not disprove it.

#### 8.16.2

וכן ההקש: או שיסתר ההקש ותבטל תולדתו.

And likewise the syllogism — or else the syllogism is rebutted and its conclusion nullified.

#### 8.16.3

דרך משל, כשהביאו ראיה על מאמר רבי יהודה שאמר: “החובל בעבד כנעני שלו – פטור”, מן הכתוב: “כי ינצו אחים יחדו – יצא עבד שאין לו אחוה”,

For example, when they brought a proof for the statement of R. Yehudah, who said: "One who injures his own Canaanite slave — is exempt," from the verse "When brothers strive together" [ed. Deuteronomy 25:11: כי ינצו אנשים יחדו איש ואחיו, "when men strive together, a man and his brother"; 1742 prints אחים] — "a slave is excluded, since he has no brotherhood" —

#### 8.16.4

סתרו לדעת חכמים את הראיה באמרם: “אחיו הוא במצות”, ונמצא שאין הפסוק הזה פוטרו.

they rebutted the proof, on the view of the Sages, by saying: "He is his brother in the commandments," and it turns out that this verse does not exempt him.

#### 8.16.5

וכן כשרצה לסתר המאמר: “גמירי דלא עבר כסלא”, מכח החוש, באמרו: “והא קא חזינן דעבר”. סתרו הראיה המכחשת באמרם: “זיוה הוא דעבר”, והינו שאין החוש מכחיש המאמר הזה:

Likewise, when one wished to disprove the statement "It is a received tradition that it [the comet] does not pass through Kesil [Orion]" by force of the sense, by saying: "But we see that it passes!" — they rebutted the disproof by saying: "It is its glow that passes," namely, that the sense does not disprove this statement.

#### 8.16.6

וכשרצו להוכיח מכח קל-וחמר שנשיא יביא אשם תלוי סתרו הקל-וחמר, באמרם: “משיח, יוכיח”, ונמצא התולדה מבטלת.

And when they wished to demonstrate by force of an a fortiori argument that the prince [nasi] brings a suspensive guilt offering, they rebutted the a fortiori argument by saying: "Let the anointed [High Priest] prove [otherwise]" (משיח יוכיח), and the conclusion turns out to be nullified.

### 8.17 · Turning the difficulty back on the disputant: "and according to your reasoning" (ולטעמך · ולדידך)

#### 8.17.1

ומסותרו, המופת המכחיש הוא כשנחזר על דעת החולק אותו הקשי עצמו שהקשה על מאמרנו, או הקשי אחר שנראה היות גם דעת החולק מכחש, באפן שבהכרח צריך שיסכים החולק עצמו באיזה תנאי או חלוק שבו ימלטו דעתו ודעתנו מן הקשי שהיה נראה בם,

And what rebuts it — the disproving demonstration — is when we turn back upon the disputant's opinion the very same difficulty that he raised against our statement, or another difficulty by which it appears that the disputant's opinion too is disproved, in such a way that the disputant himself must of necessity agree to some condition or distinction by which his opinion and ours escape the difficulty that appeared in them;

#### 8.17.2

וזה נקרא “ולטעמך” או “ולדידך”.

and this is called "and according to your reasoning" (ולטעמך) or "and according to you" (ולדידך).

#### 8.17.3

דרך משל, כשהקשו בש"ס (בבא-קמא פ"ח): “אלא מעתה, לרבנן עבד יהא כשר למלכות”, השיבו על זה: “אמרי: ולטעמך תקשי לך גר לדברי הכל?! – אלא אמר קרא: ‘מקרב אחיך’ – המבחר שבאחיך”.

For example, when they raised a difficulty in the Talmud (Bava Kamma 88): "But if so (אלא מעתה), according to the Rabbis a slave should be fit for kingship!" — they answered this: "They say: and according to your reasoning, a convert should pose a difficulty for you according to all opinions! Rather, the verse says: 'from among your brothers' — from the choicest among your brothers."

### 8.18 · Casting the difficulty onto the disputant, or turning his proof into ours: "just the opposite" (אדרבא · היא הנותנת · משם ראיה)

#### 8.18.1

ויותר חזק מזה יהיה כשנסיר הקשי ממאמרנו ונשליכהו על דעת החולק אתנו, או שהראיה שהביא להכחיש מאמרנו נחזירה ראיה למאמרנו:

Stronger still than this is when we remove the difficulty from our statement and cast it upon the opinion of the one who disputes with us, or when the proof that he brought to disprove our statement we turn back into a proof for our statement;

#### 8.18.2

וזה נקרא “אדרבא” או:היא הנותנת", “משם ראיה”.

and this is called "just the opposite" (אדרבא), or "that proves my point" (היא הנותנת), "from there is a proof" (משם ראיה).

#### 8.18.3

דרך משל, כשהקשו בש"ס (שם פ"ג): “דנין נזקין מנזקין ואין דנין נזקין ממיתה”, השיבו: אדרבא. דנין אדם מאדם ואין דנין אדם מבהמה".

For example, when they raised a difficulty in the Talmud (ibid. 83): "We derive damages from damages, and we do not derive damages from death," they answered: "Just the opposite! We derive [the law of] a man from [that of] a man, and we do not derive [the law of] a man from [that of] an animal."

#### 8.18.4

וכשהביא ר"מ ראיה לדבריו (שבת פ"ב) מפסוק: “לחתות אש מיקוד”, השיב לו: “משם ראיה! – ולחשוף מים מגבא”.

And when R. Meir brought a proof for his words (Shabbat 82) from the verse "to rake fire from the hearth," he [R. Yosei] answered him: "From there is a proof?! — [the verse continues:] 'and to draw water from the cistern.'"

### 8.19 · A rebutted proof or disproof returns the statement to doubt

#### 8.19.1

והנה כל זמן שתסתר הראיה המאמתת ישוב המאמר מספק אם לא יהיה עליו ראיה מכחשת: וכן כשתסתר המכחשת ישוב מספק אם לא יהיה עליו ראיה מאמתת.

Now whenever the verifying proof is rebutted, the statement reverts to being doubtful, if there is no disproof against it; and likewise when the disproof is rebutted, it reverts to being doubtful, if there is no verifying proof for it.

### 8.20 · Sevara (סברא): a proof that only inclines the mind

#### 8.20.1

ואמנם, יש מין ראיה אחרת, שאינו לא מאמתת לגמרי ולא מכחשת לגמרי, אלא מטה הדעת לא מן הצדדין, ונקרא זה סברא.

However, there is another kind of proof, which neither verifies completely nor disproves completely, but inclines the mind to one of the sides, and this is called *sevara* (plausible reasoning).

#### 8.20.2

ויקרא זה בהיות הטענות שקולות להן וללאו, אלא שהדעת יטה יותר לצד אחד משכנגדו.

It is so called when the arguments are evenly balanced for yes and for no, except that the mind inclines more toward one side than toward the side opposite it.

#### 8.20.3

דרך משל (חלין י"ט): "אכא דאמרי: אף מחזיר ואכא דאמרי: מחזיר – ומסתברא כמאן דאמר אף מחזיר.

For example (Chullin 19): "There are those who say: he may even turn back [the windpipe and gullet, in pinching a bird offering]; and there are those who say: he turns them back [and only so] — and it stands to reason (מסתברא) like the one who says: he may even turn back."

### 8.21 · Aspects (בחינות): a predicate holds in one aspect only; the four aspects, essence, proprium, accident, relation; light and severe; in potentiality and in actuality

#### 8.21.1

וממה שצריך שתדע, שלהיות הראיות אמתיות והתולדות צודקות, צריך שיהיה מאמר-היחס הנכון בין כל המאמרים המולידים, והתולדות המאמתים והמאמתים, הנסתרים והסותרים; שיהיו דומים זה לזה.

Among the things you need to know is that, for the proofs to be true and the conclusions to be true, there must be a correct statement of relation between all the generating statements and the conclusions, the verifying and the verified, the disproved and the disproving — that they be similar to one another.

#### 8.21.2

וזה, כי הנה כל נושא שיהיה אי אפשר שלא יבחנו בו בחינות רבות. אם במה שנוגע בעצמו של נושא ואם במה שנוגע במה שהוא מתיחס אל אחרים.

This is because in any subject whatsoever it is impossible that many aspects should not be discerned in it, whether in what concerns the essence of the subject or in what concerns its being related to others.

#### 8.21.3

והנשואים שיאמרו בו – אפשר שיאמרו בו לפי כל מה שבעצמו או לפי קצת ממה שבעצמו, או לפי איזה יחס מיחסיו.

And the predicates that are asserted of it may be asserted of it according to all that is in its essence, or according to part of what is in its essence, or according to some one of its relations.

#### 8.21.4

וכבר מצינו במיני המאמרים המאמר שהוא לפי בחינה א' שהוא על פי השרש הזה.

We have already found, among the kinds of statements, the statement that is according to one aspect, which rests on this principle.

#### 8.21.5

דרך משל אמרו בש"ס (פסחים כ'): “עזרה רשות הרבים היא”.

For example, they said in the Talmud (Pesachim 20) [ed. Pesachim 19b]: "The Temple courtyard is a public domain."

#### 8.21.6

הנה מאמר הזה לא יובן בהחלט שתהיה העזרה רשות הרבים לכל הבחינות. אלא לענין ספק טמאה,

Now this statement is not to be understood absolutely, that the courtyard is a public domain in all aspects, but only with respect to doubtful impurity;

#### 8.21.7

והמאמר שנאמר לפי בחינה א' לא תעשהו הקדמה לתולדה בבחינה אחרת. כי אין הדמיון וההשואה ביניהם אמתיים אלא נראית.

and a statement made according to one aspect you must not make into a premise for a conclusion in another aspect, for the similarity and equivalence between them are not true but only apparent.

#### 8.21.8

ונמצא שלא תוכל להוליד מן המאמר שזכרנו, “עזרה רשות הרבים היא”, שהמטלטל בה בשבת חוץ לארבע אמות יהיה חיב, כי לענין טמאה לבד היא רשות הרבים ולענין שבת היא רשות היחיד.

Thus it turns out that you cannot derive from the statement we mentioned, "The Temple courtyard is a public domain," that one who carries within it on the Sabbath beyond four cubits is liable, since it is a public domain only with respect to impurity, while with respect to the Sabbath it is a private domain.

#### 8.21.9

וכן לא תכחיש מאמר אומר היותה רשות היחיד מכח המאמר הזה שזכרנו. כי האומר רשות היחיד ידבר לענין שבת והמאמר הזה לענין טמאה. וכן כל דומה לזה,

Likewise, you cannot disprove a statement that says it is a private domain on the strength of this statement we mentioned, since the one who says "private domain" speaks with respect to the Sabbath, and this statement with respect to impurity. And likewise with everything similar to this.

#### 8.21.10

צריך שתדע שכלל הבחינות שאפשר שיבחנו בנושא מן הנושאים ארבע: מה שבעצמו, מה שבסגלתו, מה שבמקריו, מה שביחסו אל זולתו.

You need to know that the aspects that can be discerned in any given subject total four: its essence, its proprium, its accident, and its relation.

#### 8.21.11

מה שבעצמו – הוא מה שבו תלוי הויות הנושא ההוא באמת, שאלו היה נעדר לא היה הנושא ההוא מה שהוא. דרך משל: הסכין, היותו כלי מחתך הוא.

Its essence is that on which the being of that subject truly depends, such that were it absent, that subject would not be what it is. For example: the knife — it is its being a cutting instrument.

#### 8.21.12

מה שבסגלתו – הוא ענין שמתלוה תמיד אל הנושא ולא יסור ממנו אך אין הוית הנושא תלוי בו. שהרי אלו יציר העדרו, לא היה חדל הנושא מלהיות מה שהוא.

Its proprium is a matter that always accompanies the subject and does not depart from it, yet the being of the subject does not depend on it; for if one were to conceive its absence, the subject would not cease to be what it is.

#### 8.21.13

דרך משל כשאמרו (פרה פ"ג): “חוץ מן החלדה מפני שהיא מלקקת”, הנה זה דבר נמצא תמיד בחלדה – שהיא מלקקת, אך אין היותה חלדה תלוי בזה.

For example, when they said (Mishnah Parah 3) [ed. Mishnah Parah 9:3]: "[Creeping creatures do not disqualify the water of purification,] except for the weasel, because it laps" — now this is something always found in the weasel, that it laps, yet its being a weasel does not depend on this.

#### 8.21.14

מה שבמקריו – הוא מה שמתלוה אל הנושא בדרך מקרה. פרוש: שכבר היה אפשר שלא יתלוה לו או שיתלוה לו ענין מתחלף מזה ואפלו הפכי לו, ואף על פי כן היה הנושא ההוא מי שהוא.

Its accident is what accompanies the subject by way of accident — that is, it could have been that it did not accompany it, or that a matter different from this accompanied it, even one opposite to it, and nevertheless that subject would be what it is.

#### 8.21.15

וזה מה שנוגע בצורת הנושא או במדתו, פרוש: היותו עגל או מרבע, ארך או קצר. שהרי העגל היה אפשר שיהיה מרבע. המרבע היה אפשר שיהיה עגל. הארך היה אפשר שיהיה קצר והקצר אפשר שיהיה ארך, ולא מפני זו היה אותו הנושא נושא אחר.

This is what concerns the form of the subject or its measure — that is, its being round or square, long or short. For the round thing could have been square, the square thing could have been round, the long could have been short and the short could have been long, and that subject would not thereby have been a different subject.

#### 8.21.16

מה שביחסו אל זולתו – הוא ענין שאינו בו מפני עצמו כלל, אלא מפני שהוא מצטרף ומתיחס אל אחר.

Its relation is a matter that is not in it on its own account at all, but only because it is joined and related to another.

#### 8.21.17

דרך משל: היותו דומה או בלתי דומה זה אינו ענין נבחן בנושא מצד עצמו אלא מצד היותו נערך עם אחד היותו פועל או היותו נפעל. וכן על כיוצא בזה. ממה שלא ישתלם במציאות נושא אחד לבד אלא במציאות נושאים שונים להיותם מתיחסים זה לזה.

For example: its being similar or dissimilar — this is not a matter discerned in the subject in itself, but only insofar as it is set in comparison with another; [so too] its acting or its being acted upon, and likewise the like — matters that are not completed in the existence of one subject alone, but only in the existence of different subjects, by their being related to one another.

#### 8.21.18

ואמנם, בכל בחינה שתהיה, אפשר שיאמר נשוא בנושא, ולא מפני זה נדין אותו הנשוא עצמו באותו הנושא עצמו בבחינה אחרת.

However, in whatever aspect it may be, a predicate may be asserted of a subject, and we do not on that account judge that very predicate [to hold] of that very subject in another aspect.

#### 8.21.19

דרך משל אמרו בספרי (פ' נשא): “כשבא אסור הקל על אסור הקל אסר את אוסריו” וכו',

For example, they said in the Sifrei (parashat Naso): "When the light prohibition came upon the light prohibition, it made forbidden those who forbade it," etc. [ed. Sifrei Bamidbar 7: כשבא אסור הקל על אסור הקלה, "upon the lightly prohibited [woman]"; 1742 prints הקל twice] —

#### 8.21.20

פרוש: אשת איש נקראת אסור קל לגבי חמותו במה שיש לה התר שאין כן בחמותו. והנה מצד אחר אשת איש חמורה מחמותו – שזו בחנק וזו בכרת.

that is: a married woman is called a light prohibition relative to his mother-in-law, in that she has a permission [she can become permitted], which is not so with his mother-in-law. Now from another side a married woman is more severe than his mother-in-law — for the former is by strangulation and the latter by excision.

#### 8.21.21

אמנם בבחינת היות לה התר נקראת אשת איש קלה ובבחינת הענש נקראת אשת איש חמורה.

However, in the aspect of her having a permission a married woman is called light, and in the aspect of punishment a married woman is called severe.

#### 8.21.22

עוד צריך שתדע שהנשוא אפשר שיאמר בנושא בכח ואפשר שיאמר בפעל. פרוש: אפשר שנאמר שאותו הנשוא היה בפעל באותו הנושא.

Further, you need to know that a predicate may be asserted of a subject in potentiality, and it may be asserted in actuality — that is, we may say that that predicate is in actuality in that subject.

#### 8.21.23

דרך משל אמרו (זבחים צ"א): “כהן המחטא מחלק ושאינו מחטא אינו מחלק”. והקשו: “וכללא הוא? והרי משמרה כלה דאין מחטאין ומחלקין!?” ותרצו: “ראוי לחטוי קאמרינן!”

For example, they said (Zevachim 91) [ed. Zevachim 99a]: "A priest who sprinkles [the blood of the sin-offering] takes a share, and one who does not sprinkle does not take a share". And they raised the difficulty: "Is this a general rule? But there is the entire watch [of priests], who do not sprinkle, yet they take a share!" And they resolved: "We are speaking of one fit for sprinkling!"

#### 8.21.24

וזה שהמקשה הבין בתחלה “כהן המחטא” – שמחטא בפעל, ועל זה הביא ראיה נגד זה המאמר מן המנהג הנוהג שבני המשמרה אינם מחטאין בפעל ואף על פי כן מחלקין,

This is because the questioner at first understood "a priest who sprinkles" as one who sprinkles in actuality, and against this he brought a proof contrary to this statement from the prevailing practice, that the members of the watch do not sprinkle in actuality and nevertheless take a share;

#### 8.21.25

ותרץ המתרץ, שאין להבין כאן מחטא בפעל אלא בכח ובהכנה, פרוש: שראוי לחטוי, ובני המשמרה – כלם ראויים לחטוי.

and the answerer resolved that "sprinkles" here is not to be understood as in actuality but in potentiality and in readiness — that is, one who is fit for sprinkling — and the members of the watch are all fit for sprinkling.

#### 8.21.26

ואמנם כל החלוקים והבדלים האלה צריך לשמר בכל המשא ומתן העיוני. ואז יהיה אמתי ונכון.

However, all these divisions and distinctions must be observed in all dialectic investigation; then it will be true and correct.

### 8.22 · Agreement not from the matter of a statement but from its report; as a whole, and in its parts

#### 8.22.1

והנה עד הנה בארנו קבלת המאמרים או הכחשתן במה שיסכים השכל עמהם או לא יסכים, מצד ענינם.

Now up to here we have explained the acceptance of statements or their denial according as the intellect agrees with them or does not agree, from the side of their matter.

#### 8.22.2

ואולם יש עוד שיסכים או לא יסכים עם המאמר, לא מצד ענינו, אלא מצד הגדתו.

But there is a further way in which it agrees or does not agree with a statement — not from the side of its matter, but from the side of its report.

#### 8.22.3

וזה בשני דרכים, האחד מצד כלל כל ההגדה, השני מצד חלקיה.

This is in two ways: the one, from the report as a whole; the second, from its parts.

### 8.23 · The report as a whole: "it is obvious" (פשיטא) and "it might have entered our mind" (סלקא דעתן)

#### 8.23.1

מצד כלל כל ההגדה הוא, כי הנה מחק ישר הספור הוא שיהיה בספור תועלת ולא יהיה מותר ודבר כפל.

From the report as a whole: it is a rule of a proper account that the account should have some use, and that there be nothing superfluous or repeated in it.

#### 8.23.2

ועל פי השרש הזה, אם נשמע ספור שיראה לנו הגדתו בלתי מצרכת, נקשה עליו: “פשיטא!” כי הדבר המפרסם ונודע לכל אין צרך להגידו.

On the basis of this principle, if we hear an account whose report appears to us unnecessary, we raise the difficulty against it: "It is obvious!" (פשיטא), since a thing that is commonly known and known to all need not be reported.

#### 8.23.3

ותרוץ הקשיה הזה יהיה כשנמצא שיהיה מקום לחשב נגד מה שיגד לנו, ונקרא זה “סלקא דעתן”.

The resolution of this difficulty comes when we find that there is room to think contrary to what is reported to us, and this is called "it might have entered our mind" (סלקא דעתן).

### 8.24 · The parts of the report: nothing superfluous, a proper order; "this itself is difficult" (הא גופא קשיא)

#### 8.24.1

מצד חלקי ההגדה הוא, כי מחק הספור הוא גם כן, שלא יהיה בשום חלק ממנו דבר מותר או נכפל ללא צרך: ומחקו כמו כן, שיהיה סדרו הגון ונאות בחלק מה שצריך לחלק ובחבר מה שצריך לחבר.

From the parts of the report: it is likewise a rule of the account that in no part of it should there be anything superfluous or repeated without need; and it is likewise its rule that its order be proper and fitting, in dividing what needs to be divided and joining what needs to be joined.

#### 8.24.2

ואם נמצא במאמר חסרון אחד מאלה התנאים נקשה עליו כפי מה שנמצא שחסר ממנו.

If we find in a statement the lack of one of these conditions, we raise a difficulty against it according to what we find lacking in it.

#### 8.24.3

דרך משל: כשנמצא היות המלות בלתי מכונות, נקשה עליו “הא גופא קשיא!”

For example: when we find the words to be ill-fitting, we raise against it: "This itself is difficult!" (הא גופא קשיא).

#### 8.24.4

כשנמצא שאין ההסדר הגון, נקשה עליו כפי מה שחסר ממנו.

When we find that the arrangement is not proper, we raise a difficulty against it according to what is lacking in it.

#### 8.24.5

דרך משל (ברכות ב')::“תנא היכא קאי? ליערבינהו ולתנינהו”. (בבא קמא כ"ז): “פתח בכד וסים בחבית?” וכיוצא ביה.

For example (Berachot 2): "Where does the Tanna stand [that he teaches 'From when']?" (תנא היכא קאי); "Let him combine them and teach them together" (ליערבינהו ולתנינהו) [ed. Gittin 80b; 1742 places both under ברכות ב']. (Bava Kamma 27): "He opened with a jug and closed with a barrel?" (פתח בכד וסים בחבית) — and the like.

### 8.25 · All these are natural foundations

#### 8.25.1

כל אלה יסודות טבעיים מחקקים בשכלנו. שעליהם נבנים בניני העיון והחקירה וכל סוגיות התלמוד בכל חלקיהם.

All these are natural foundations engraved in our intellect, upon which the structures of study and inquiry are built, and all the sugyot of the Talmud in all their parts.

### 8.26 · Now to the parts of the sugyot in particular

#### 8.26.1

עתה נבאר חלקי הסוגיות בפרט, שהם כלל הבנינים הנבנים על היסודות האלה.

Now we will explain the parts of the sugyot in particular, which are the totality of the structures built upon these foundations.

## Chapter 9 · פרק ט

### 9.0 · Caption

#### 9.0.1

יבאר חלקי הסגיות ומשפטיהם

Explains the parts of the sugyot and their rules

### 9.1 · The seven parts recalled

#### 9.1.1

הנה חלקי הסוגיות בכלל כבר זכרנום, והם: מימרא, שאלה, תשובה, סתירה, ראיה, קשיא ותרוץ.

Now the parts of the sugyot in general we have already mentioned, and they are: statement (*meimra*), question, answer, contradiction (*setirah*), proof, difficulty (*kushya*), and resolution (*terutz*).

### 9.2 · Now their particulars and their rules

#### 9.2.1

עתה נזכיר פרטיהם ונבאר משפטיהם.

Now we shall mention their particulars and explain their rules.

### 9.3 · The divisions: statement into four (שמועה · פרוש · דיוק · הגדה); question into two (שאלה · אבעיא); answer into two (תשובה · פשיטות)

#### 9.3.1

המימרא – מתחלק לארבעה חלקים: האחד – שמועה, השני – פרוש, השלישי – דיוק, הרביעי – הגדה.

The statement divides into four parts: the first, firsthand statement (*shemua*); the second, explanation; the third, inference (*diyuk*); the fourth, report.

#### 9.3.2

השאלה – תחלק לשנים: האחד – שאלה, השני – אבעיא.

The question divides into two: the first, query; the second, question of principle (*ibbaya*).

#### 9.3.3

התשובה – גם כן לשנים: האחד – תשובת השאלה, השני – תשובת האבעיא, ונקראת פשיטית.

The answer, likewise, into two: the first, the answer to a query; the second, the answer to a question of principle, and it is called determination (*peshitut*).

### 9.4 · Proof into two (הוכחה · סיעתא); contradiction into two (סתירה · דחיה); difficulty into three (פרכא · רמיא · תיובתא)

#### 9.4.1

הראיה – תחלק לשנים: האחד – הוכחה והשני – סיעתא.

The proof divides into two: the first, demonstration, and the second, validation (*siyata*).

#### 9.4.2

הסתירה – תחלק לשנים: האחד – סתירה והשני – דחיה.

The contradiction divides into two: the first, direct contradiction, and the second, opposition (*dechiyah*).

#### 9.4.3

הקשיא – תחלק לשלשה: האחד – פרכא, השני – רמיא, השלישי – תיובתא.

The difficulty divides into three: the first, objection (*pirka*); the second, apparent contradiction (*rumya*, a clash); the third, refutation (*teyuvta*).

### 9.5 · Resolution into two (ישיבה · שנוי); the firsthand statement (שמועה)

#### 9.5.1

התרוץ – יחלק לשנים: האחד – ישיבה, השני – שנוי.

The resolution divides into two: the first, settlement; the second, alternative (*shinuya*).

#### 9.5.2

השמועה היא – שיאמר אומר מאמר אחד, יודיע בו אחד מן הענינים, דבר מן ההלכות, או מן המוסרים, או באיזה מין משכל שיהיה.

The firsthand statement is when a speaker says a statement by which he makes known one of the matters—something from the halachot, or from the ethical teachings, or of whatever kind of intelligible it may be.

#### 9.5.3

דרך משל (ברכות): “אמר רבי אליעזר: נשים חיבות בקדוש היום – דבר תורה”,

For example (Berachot) [ed. Berachot 20b: אמר רב אדא בר אהבה, "Rav Adda bar Ahavah said"; 1742 prints רבי אליעזר]: "R. Eliezer said: Women are obligated in the sanctification of the day [kiddush] by Torah law";

#### 9.5.4

ומשפטיה משפטי המאמרים שבארנו בפרק שלישי.

and its rules are the rules of statements, which we explained in the third chapter.

### 9.6 · The explanation (פרוש): full (מרוח) or forced (דחוק); the presumption (אוקמתא)

#### 9.6.1

הפרוש הוא – שיפרש אחד מן הכתובים או מן המאמרים.

The explanation is when one explains one of the verses or one of the statements.

#### 9.6.2

דרך משל, כשאמר רבי יהושע בן לוי (ברכות כ"ב): “מה טיבן של טובלי שחרית” – פרש אחר כך: “הכי קאמר, מה טיבן בארבעים סאה, אפשר בתשעה קבין” וכו'.

For example, when R. Yehoshua ben Levi said (Berachot 22): "What is the nature of those who immerse in the morning?"—it was afterward explained [in the Gemara]: "This is what he is saying (הכי קאמר): what is the nature of [their immersing] in forty se'ah, when it is possible with nine kav?" and so on.

#### 9.6.3

ואמנם משפט הפרוש הוא, שמלבד הסכימו עם האמת בעצם ענינו, צריך שיסכים עם המאמר המפרש כפי מלותיו וסדר הגדתו;

However, the rule of the explanation is that, besides its agreeing with the truth in the essence of its matter, it must agree with the statement being explained according to its words and the order of its report;

#### 9.6.4

ואולם אם יסכים לגמרי עם המאמר – יקרא פרוש מרוח,

but if it agrees completely with the statement, it is called a full explanation (*perush meruvach*),

#### 9.6.5

ואם יסכים בעקר המאמר ולא יאות היטב עם כל המלות או עם כל הסדר, עד שנצטרך לומר שלא דבר בעל המאמר בדקדוק – יקרא פרוש דחוק.

and if it agrees with the core of the statement but does not fit well with all the words or with all the order, so that we are compelled to say that the author of the statement did not speak with precision, it is called a forced explanation (*perush dachuk*).

#### 9.6.6

ואם לא יסכים כלל עם המאמר – נדחהו לגמרי,

And if it does not agree with the statement at all, we reject it entirely.

#### 9.6.7

והנה בכלל זה יכלל דרך באור הנקרא אוקמתא, והוא באור תנאי במאמר, דהינו, שלא נבאר כלל ההגדה ומלותיה אלא נניחם כמשמען הפשוט, אבל נגמל המאמר באחד התנאים,

Now under this heading is included the manner of elucidation called presumption (*okimta*, a case-restriction), which is an elucidation of a condition within the statement, namely, that we do not elucidate the report and its words at all but leave them in their plain sense; rather, we confine the statement to one of the conditions,

#### 9.6.8

והוא כשנאמר: “הכא במאי עסקינן” או: “הא מני? – ר' פלוני היא”.

which is when we say: "With what are we dealing here?" (הכא במאי עסקינן) or: "Whose [view] is this? It is R. So-and-so's" (הא מני, ר' פלוני היא).

#### 9.6.9

דרך משל (ברכות ב'): “הכא במאי עסקינן”, וכן (שם כ"ד): "לא שנו אלא שיכול לכון לבו, וכו'.

For example (Berachot 2) [ed. the formula does not occur on Berachot 2a–b; it stands three times on Berachot 26a]: "With what are we dealing here?", and likewise (ibid. 24): "They taught this only where he is able to direct his heart," and so on.

### 9.7 · The inference (דיוק)

#### 9.7.1

הדיוק הוא – שידיק ממאמר אחד או כתוב אחד מה שלא פרש בו, וכמה שזכרתי למעלה.

The inference is when one infers from a statement or from a verse what is not made explicit in it, as I mentioned above.

#### 9.7.2

דרך משל, על משנת “בעל קרי מהרהר בלבו” – “אמר רבא: זאת אומרת, הרהור כדבור דמי” – ומשפטיו נתבארו בפרק חמשי.

For example, on the Mishnah "One who has had a seminal emission ponders [the Shema] in his heart"—"Rava said: This is to say that pondering is like speech" [ed. Berachot 20b: אמר רבינא, "Ravina said"; 1742 prints רבא]—and its rules were explained in the fifth chapter.

### 9.8 · The report (הגדה)

#### 9.8.1

ההגדה – שיגיד אחד מעשה או מאמר זולתו, פרוש: כשיגיד אחד מה שהרגיש אחר, לפי דעתו, מן הקשיות או מן התרוצים.

The report is when one relates an incident or a statement of someone else; that is, when one relates what another felt, on his view, of the difficulties or of the resolutions.

#### 9.8.2

דרך משל. כשאמרו (שבת י"ט): “אמר רבי יהושע בן לוי” וכו',

For example, when they said (Shabbat 19) [ed. Shabbat 19a: the report there is R. Tzadok's, "such was the custom of the house of Rabban Gamliel"; 1742 prints רבי יהושע בן לוי]: "R. Yehoshua ben Levi said," and so on,

#### 9.8.3

וכשאמרו (בבא קמא פ"ג): תו קשיא ליה מאי חזית" וכו', הנה שם מגיד הש"ס מה שהרגיש התנא. לפי דעתו, בדברי עצמו.

and when they said (Bava Kamma 83): "A further difficulty troubled him: what did you see [to derive it from the one verse rather than the other]?" and so on—there the Talmud reports what the Tanna felt, on his view, in its own words.

### 9.9 · The query (שאלה)

#### 9.9.1

השאלה – כשישאל שואל על ענין אחד, אם הוא, אם אינו, או על תנאי ממנו, כגון על מקום או על זמן או על טעם וכיוצא.

The query is when a questioner asks about a matter—whether it is so or not—or about some condition of it, such as about place, or about time, or about a reason, and the like.

#### 9.9.2

דרך משל (יבמות ק"ב): “אמרתי לו: כלום אתה בקי ברבי יהודה בן בתירא?”

For example (Yevamot 102): "I said to him: Are you acquainted with R. Yehudah ben Beteira?"

#### 9.9.3

וכן כשאמרו (ברכות ל"ה): “כיצד מברכין” וכו',

Likewise, when they said (Berachot 35): "How does one bless [over fruits]?" and so on;

#### 9.9.4

וכן כשאמרו (יבמות קי"ב): “מאי שנא חרש וחרשת וכו', ומאי שנא שוטה” וכו'.

and likewise when they said (Yevamot 112): "What is different about a deaf-mute man and a deaf-mute woman... and what is different about an imbecile?" and so on.

### 9.10 · The question of principle (אבעיא)

#### 9.10.1

האבעיא – כשישאל שואל על ענין אחד, שיש בו פנים לשני צדדין, ויבקש על ההכרעה לאחד מהם.

The question of principle is when a questioner asks about a matter that has grounds on two sides, and seeks a decision for one of them.

#### 9.10.2

דרך משל: “בעא מניה רב חיא בר יוסף משמואל: כהן גדול שקדש את הקטנה ובגרה תחתיו – מהו, בתר נשואין אזלינן” וכו'.

For example: "Rav Chiya bar Yosef asked Shmuel: A High Priest who betrothed a minor girl and she reached full maturity under him—what [is the law]? Do we go by the marriage?" and so on.

### 9.11 · The answer (תשובה)

#### 9.11.1

התשובה – שישיב על השאלה כפי מה שהיא: אם שאל על מציאות ענין, אם הוא אם אינו – ישיב לו: הן או לאו; ואם טעם בקש – ישיבהו הטעם.

The answer is that one answers the query according to what it is: if he asked about the existence of a matter, whether it is so or not, he answers him yes or no; and if he sought a reason, he answers him with the reason.

#### 9.11.2

דרך משל, על שאלת “כלום אתה בקי” וכו', השיב – הן, על שאלת “מאי שנא חרש” וכו' השיב: “חרש וחרשת דקימא תקנתא” וכו', וכן השאר. –

For example, to the question "Are you acquainted..." and so on, he answered: yes; to the question "What is different about a deaf-mute..." and so on, he answered: "A deaf-mute man and a deaf-mute woman, for whom the enactment holds," and so on; and so with the rest.

#### 9.11.3

ומשפטה להיות תשובה על פי השאלה להיות אמתית.

And its rule is that it be an answer corresponding to the query, and that it be true.

### 9.12 · The determination (פשיטות)

#### 9.12.1

הפשיטות הוא – שיכריע לאחד משני צדדי האבעיא.

The determination is that one decides for one of the two sides of the question of principle.

#### 9.12.2

דרך משל, על הבעיא דכהן גדול שקדש וכו', פשט שמואל “דבתר נשואין אזלינן”. –

For example, on the question of principle concerning a High Priest who betrothed, and so on, Shmuel determined it: "that we go by the marriage."

#### 9.12.3

ומשפטה כמשפט התשובה.

And its rule is like the rule of the answer.

### 9.13 · The demonstration (הוכחה)

#### 9.13.1

ההוכחה הוא – שיביא ראיה להוכיח אמתת מאמר שנאמר.

The demonstration is when one brings a proof to demonstrate the truth of a statement that has been said.

#### 9.13.2

דרך משל (פסחים): “אמר רבי אליעזר: אין טמאה למשקין כל עקר; תדע, שהרי העיד יוסי בן יועזר” וכו'.

For example (Pesachim) [ed. Pesachim 16a]: "R. Eliezer said: There is no impurity for liquids at all; know [this is so], for Yosei ben Yo'ezer testified," and so on.

#### 9.13.3

וכן כששאלו: “מנא הני מלי?” והשיבו: “דתנו רבנן” וכו'.

Likewise, when they asked: "From where are these words [derived]?" (מנא הני מילי) and answered: "As the Sages taught" (דתנו רבנן), and so on.

#### 9.13.4

ומשפטו, שתוכיח בהכרח אמתת המאמר על פי חקי הראיה המכרחת שפיר: אמנם, גם מכח סברא נוכל להוכיח, אך אינה כל כך חזקה.

And its rule is that it demonstrate the truth of the statement by necessity, according to the laws of necessary proof that I explained; however, we can also demonstrate by force of a *sevara*, but it is not as strong.

### 9.14 · The validation (סיעתא)

#### 9.14.1

הסיעתא – שיובא מאמר אחד שיסכים למאמר אחר, לחזק הדעה שנאמרה בו.

The validation is that a statement is brought which agrees with another statement, to strengthen the opinion stated in it.

#### 9.14.2

דרך משל (יבמות ק"ב): “דתניא כותיה דרבא, חלצה במנעל הנפרם וכו' חליצתה כשרה”. –

For example (Yevamot 102): "For it was taught in accordance with Rava (דתניא כותיה): If she performed chalitzah with a shoe that has come unstitched... her chalitzah is valid."

#### 9.14.3

ומשפטה כמשפט ההוכחה.

And its rule is like the rule of the demonstration.

### 9.15 · The direct contradiction (סתירה)

#### 9.15.1

הסתירה – שיסתר מאמר שנאמר, או ראיה שהובאה, ויראה היותה מבטלת.

The direct contradiction is when one contradicts a statement that has been said, or a proof that has been brought, and shows it to be annulled.

#### 9.15.2

דרך משל: “אפלו למאן דאמר טמאת משקין דאוריתא וכו' אמר ליה רב אשי וכו' ואי הלכתא גמירי לה, מי ילפינן מנה?”

For example: "Even according to the one who says that the impurity of liquids is by Torah law," and so on; "Rav Ashi said to him," and so on; "and if it is a halachah they hold by tradition, can we derive from it?"

#### 9.15.3

הנה כאן סתר שמועתו של רב פפא לחלוטין מכח המופת שהביא נגדה

Here he contradicted Rav Pappa's firsthand statement absolutely, by force of the demonstration (מופת) he brought against it.

#### 9.15.4

והנה משפט הסתירה – שתסתר בכח חזק על פי חזקות הראיה המכחשת שפיר למעלה.

Now the rule of the direct contradiction is that it contradict with strong force, according to the rules of disproof that I explained above.

### 9.16 · The opposition (דחיה)

#### 9.16.1

הדחיה – שידחה הכרח המאמר, אך לא יבטל ענינו לגמרי ולא יכחש אפשריותו.

The opposition is when one deflects the necessity of the statement, but does not annul its matter entirely and does not deny its possibility.

#### 9.16.2

דרך משל, כשאמרו: “מאי לאו?” השיבו: “לא”. וכן כשאמרו: “ודלמא” ו"אימא", הנה הוא סמן דחיה להכרח המאמר שנאמר.

For example, when they said: "Is it not [so]?" (מאי לאו), they answered: "No." Likewise, when they said: "But perhaps" (ודלמא) and "Say [rather]" (אימא)—this is a sign of opposition to the necessity of the statement that was said.

#### 9.16.3

והנה הדחיה, די שתסתר ההכרח אף על פי שנשאר המאמר אפשרי, ואז נשאר המאמר מספק ובלתי מכרח.

Now as for the opposition, it suffices that it deflect the necessity even though the statement remains possible, and then the statement remains doubtful and non-necessary.

#### 9.16.4

אמנם צריך על כל פנים, שמה שיקים על ידה יהיה לו מקום בנושא אשר נדין עליו, ולא יהיה דבר רחוק בתכלית, כי אלו היה כך – היה נשאר המאמר מקים בכח הסברא כמה שזכרתי למעלה.

However, in any case it is required that what it sets up have a footing in the subject about which we are judging, and not be something far-fetched in the extreme; for if it were so, the statement would remain upheld by force of *sevara*, as I mentioned above.

### 9.17 · The objection (פרכא)

#### 9.17.1

הפרכא היא – כשימצא בסדר המאמר או הגדתו דבר בלתי נאות.

The objection is when something unfitting is found in the order of the statement or in its report.

#### 9.17.2

דרך משל, כשאמרו: “הא גופא קשיא”. או שאמרו: “שנים אומרים מת וכו', מאי קא משמע לן וכו' הינו הך”.

For example, when they said: "This itself is difficult" (הא גופא קשיא). Or when they said: "Two say he died... what is he teaching us? (מאי קא משמע לן)... it is the very same thing" (היינו הך).

#### 9.17.3

וכן שם (יבמות קי"ח): “ולפלוג רבי מאיר ברישא?”

Likewise, there (Yevamot 118): "And let R. Meir disagree in the first clause?"

#### 9.17.4

וכן כל כיוצא בזה קשיות שעל סדורי המאמרים או צרך ההגדה בכלה או בחלקיהם.

And likewise everything of this kind: difficulties concerning the orderings of statements or the need for the report, as a whole or in their parts.

### 9.18 · The apparent contradiction (רמיא)

#### 9.18.1

הרמיא – כשיובאו שני מאמרים או שני כתובים הפכיים או מתנגדים לבקש ישובם.

The apparent contradiction is when two statements or two verses that are opposite or contradictory are brought, in order to seek their settlement.

#### 9.18.2

דרך משל (יבמות קכ"א): "ורמינהי: אדם אינו מטמא, וכו'.

For example (Yevamot 121) [ed. Yevamot 120b]: "And set against it (ורמינהי): A person does not impart impurity," and so on.

#### 9.18.3

וכן כשאמרו: “רבי יעקב בר אידי רמי, כתיב: והנה אנכי עמך” וכו'.

Likewise, when they said: "R. Ya'akov bar Idi raised an apparent contradiction: It is written, 'And behold, I am with you' [Genesis 28:15]," and so on.

### 9.19 · The settlement (ישוב)

#### 9.19.1

הישוב – כשתתרץ הפרכא או הרמיא בישוב נכון ואמתי שיאמין בו המתרץ היות זה אמתת הדבר.

The settlement is when the objection or the apparent contradiction is resolved with a correct and true settlement, which the answerer believes to be the truth of the matter.

#### 9.19.2

דרך משל, כשתרץ ר' יעקב בר אידי לרמיתו סבר וכו'.

For example, when R. Ya'akov bar Idi resolved his apparent contradiction: "He thought [that perhaps sin would be the cause]", and so on.

#### 9.19.3

ומשפטו שיהיה אמתי בעצמו, ויסכים עם המאמר שעליו הוא בא.

And its rule is that it be true in itself, and agree with the statement on account of which it comes.

### 9.20 · The alternative (שנוי)

#### 9.20.1

השנוי – כשתתרץ הקשיא או הרמיא, במה שאין הכונה בו למתרץ בהחלט שיהיה כן אמתת הדבר, אלא שתדחה הקשיא.

The alternative is when the difficulty or the apparent contradiction is resolved by something in which the answerer's intention is not absolutely that this is the truth of the matter, but only that it deflect the difficulty.

#### 9.20.2

והנה זה דומה לדחיה באמת, אלא שהדחיה תהיה על מאמר שהנח או שהובאת והשנוי דחיה על קשיא.

Now this is in truth similar to the opposition, except that the opposition is against a statement that was laid down or [a proof] that was brought, while the alternative is an opposition against a difficulty.

#### 9.20.3

דרך משל, כשהקשו על רבא, באמרם (יבמות ק"ד): “חרש שנחלץ וכו' מאי טעמא לאו – משום דלאו בני קריה ננהו”. דחו ואמרו: “לאו, משום דלאו בני דעה ננהו”.

For example, when they raised a difficulty against Rava, saying (Yevamot 104): "A deaf-mute man who underwent chalitzah... what is the reason? Is it not because they are not capable of recitation?"—they deflected it and said: "No, [it is] because they are not possessed of understanding."

#### 9.20.4

ומשפט השנוי הוא, שיוכל להסכים עם המאמר שעליו הובא, ואפילו נצטרך להניח בו קצת זרות וחסרון או דבר בלתי נאות, מאמר שלא דקדק כל כך בעל המאמר במלותיו.

And the rule of the alternative is that it must be able to agree with the statement on account of which it was brought, even if we must posit in it some strangeness and deficiency, or something unfitting, on the grounds that the author of the statement was not so precise in his words.

#### 9.20.5

ואולם, כפי רבות החסרון שנצטרך להניח בו, כך יהיה השנוי יותר דחוק; ואם ירבה הזרות שמלותיו באמת לא תסבלנה אותו, לא נתן לו מקום כלל.

But the more deficiency we must posit in it, the more forced the alternative will be; and if the strangeness grows so great that its words truly cannot bear it, we give it no place at all.
