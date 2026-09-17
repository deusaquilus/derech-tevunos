# Derech Tevunos (דרך תבונות) — interlinear edition, chapters 1–6 of 11

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

**Status:** chapters 1–6 are cut. Chapters 7–11 and the Sugya Context Index are not yet in this file.

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
   verse's two sides always cover the same span of thought.
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
