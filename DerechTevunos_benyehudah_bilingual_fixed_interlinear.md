# Derech Tevunos (דרך תבונות) — interlinear edition, chapters 1–3 of 11

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

**Status:** chapters 1–3 are cut. Chapters 4–11 and the Sugya Context Index are not yet in this file.

## How this file is organised

- `## Chapter N · פרק X` — the chapter heading, identical to the parent's, so the parent's chapter parser
  (`site/scripts/build-text-docs.ts`, `parseChapterHeading`) still matches it.
- `### N.P · label` — paragraph `P` of chapter `N`, numbered as the parent's paragraphs run within the
  chapter. `P = 0` is the chapter's caption line (the parent's `summary`); `P = 1…` are the parent's body
  paragraphs in order. So `3.14` is the fourteenth body paragraph of chapter 3 on *both* sides of the
  parent. The label after ` · ` is an editorial navigation aid and is **not** part of the text. A label
  names a construct only by the name the text itself gives it (`ונקרא…`, "and this is called…") or by a
  phrase the text itself uses to describe it. Where the text gives no name (in chapter 3, kinds 8 and 9),
  the label describes the kind in the text's own words and says the text does not name it. The site's
  internal keys for such kinds are never used as labels here.
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

### 3.9 · Kind 2 · asserted in a qualified and limited manner (מיחד ומגבל): certainty, possibility, doubt, impossibility

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

### 3.14 · Kind 7 · compound (מרבה הענינים): predicates or subjects asserted together, on one equal footing or one novel and one known (לא זו אף זו · זו ואין צריך לומר זו); or a subject suspended between two predicates (או … או)

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

### 3.15 · Kind 8 · one predicate asserted by negating another predicate or subject (בשלילת; the text gives no name)

#### 3.15.1

המין השמיני — שיאמר בנושא נשוא אחד בשלילת נשוא או נושא אחר,

The eighth kind — in which one predicate is asserted of a subject by negating another predicate or subject;

#### 3.15.2

דרך משל (תרומות): “לא יאבד את השאר אלא יניחנה במקום מצנע”.

for example (Terumot) [ed. Mishnah Terumot 11:5]: "He shall not let the remainder be lost, but rather shall put it in a concealed place."

### 3.16 · Kind 9 · a second predicate that on the face of it contradicts the first (מכחיש … לכאורה; the text gives no name)

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

### 3.18 · Kind 11 · a predicate consequent upon another predicate (נמשך, the text's own word from 3.13.4)

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
