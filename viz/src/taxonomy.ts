/**
 * Derech Tevunos ch. 9 — `חלקי הסוגיות`, "the parts of the sugyos".
 *
 * Seven principal elements (Ch2 p14, Ch9 p162) and their nineteen leaf types.
 * English labels follow the Sackton/Tscholkowsky translation; Hebrew terms are
 * taken from the facing Hebrew column, pp. 161-187 odd. Outline: p253.
 */

export type Move =
  | {
      readonly element: "statement";
      readonly subtype:
        | "firsthand"
        | "explanation"
        | "forcedExplanation"
        | "presumption"
        | "inference"
        | "reported";
    }
  | { readonly element: "question"; readonly subtype: "query" | "principle" }
  | { readonly element: "answer"; readonly subtype: "answer" | "determination" }
  | { readonly element: "proof"; readonly subtype: "demonstration" | "validation" }
  | { readonly element: "contradiction"; readonly subtype: "direct" | "opposition" }
  | {
      readonly element: "difficulty";
      readonly subtype: "objection" | "apparentContradiction" | "refutation";
    }
  | { readonly element: "resolution"; readonly subtype: "settlement" | "alternative" };

export type Element = Move["element"];

type KeyOf<M> = M extends { element: infer E extends string; subtype: infer S extends string }
  ? `${E}/${S}`
  : never;

export type MoveKey = KeyOf<Move>;

export const keyOf = (move: Move): MoveKey => `${move.element}/${move.subtype}` as MoveKey;

/**
 * What a landed move does to the thing it lands on.
 *
 * `discharge` and `reject` both stop the target exerting force, but only
 * `reject` marks it false. Answering a question and settling a difficulty
 * close them; they do not refute them.
 */
export type Effect = "raise" | "reject" | "discharge" | "unsettle" | "open";

/**
 * One pictograph per element, chosen so a reader with no background in logic
 * can read the diagram without consulting the legend. Each is a distinct
 * silhouette, so the set still works in monochrome.
 */
export type Icon =
  | "page"
  | "questionMark"
  | "checkbox"
  | "thumbsUp"
  | "crossedOut"
  | "warning"
  | "lightbulb";

export const ICONS: Record<Element, Icon> = {
  statement: "page",
  question: "questionMark",
  answer: "checkbox",
  proof: "thumbsUp",
  contradiction: "crossedOut",
  difficulty: "warning",
  resolution: "lightbulb",
};

/** Legend order: the two neutral elements, then the pairs that argue. */
export const ELEMENTS: readonly Element[] = [
  "statement",
  "question",
  "answer",
  "proof",
  "contradiction",
  "difficulty",
  "resolution",
];

/** Short active hint for the legend, for readers meeting the system cold. */
export const ELEMENT_GLOSS: Record<Element, string> = {
  statement: "someone speaks",
  question: "someone asks",
  answer: "answers it",
  proof: "backs it up",
  contradiction: "knocks it down",
  difficulty: "raises a problem",
  resolution: "clears the problem",
};

export type LeafInfo = {
  readonly en: string;
  readonly he: string;
  /** Plain-English gloss, written for a reader who is not a logician. */
  readonly plain: string;
  /** Two-letter code used in the terminal summary. */
  readonly chip: string;
  readonly effect: Effect;
  /** English page in the Feldheim edition where the leaf is defined. */
  readonly page: number;
};

/**
 * Effects for the four adjudicating elements are fixed by the text. Ramchal
 * pins the resolution pair exactly at Heb p185: a `שנוי` "is truly a `דחיה`,
 * except that a `דחיה` falls on a statement or a proof and a `שנוי` falls on a
 * difficulty" — so it weakens where a `ישוב` closes.
 *
 * Effects on the `statement` subtypes are a reading, not a quotation. Ramchal
 * treats a forced explanation and an `אוקימתא` as costs paid to keep a
 * statement standing, so both are recorded as weakening it.
 */
export const LEAVES: Record<MoveKey, LeafInfo> = {
  "statement/firsthand": { en: "first-hand knowledge", he: "שמועה", plain: "states a ruling", chip: "fh", effect: "open", page: 162 },
  "statement/explanation": { en: "full explanation", he: "פרוש מרוח", plain: "explains what it means", chip: "ex", effect: "open", page: 164 },
  "statement/forcedExplanation": { en: "forced explanation", he: "פרוש דחוק", plain: "explains it, but strains the wording", chip: "fx", effect: "unsettle", page: 164 },
  "statement/presumption": { en: "presumption", he: "אוקימתא", plain: "narrows it to a particular case", chip: "oq", effect: "unsettle", page: 164 },
  "statement/inference": { en: "inference", he: "דיוק", plain: "reads something out of it", chip: "in", effect: "open", page: 166 },
  "statement/reported": { en: "reported information", he: "הגדה", plain: "reports what someone else said", chip: "rp", effect: "open", page: 166 },

  "question/query": { en: "query", he: "שאלה", plain: "asks for information", chip: "qy", effect: "open", page: 168 },
  "question/principle": { en: "question of principle", he: "אבעיא", plain: "asks which of two ways the law goes", chip: "ab", effect: "open", page: 170 },

  "answer/answer": { en: "answer", he: "תשובה", plain: "answers the question", chip: "an", effect: "discharge", page: 172 },
  "answer/determination": { en: "determination", he: "פשיטות", plain: "decides the question", chip: "dt", effect: "discharge", page: 172 },

  "proof/demonstration": { en: "demonstration", he: "הוכחה", plain: "brings proof", chip: "dm", effect: "raise", page: 174 },
  "proof/validation": { en: "validation", he: "סיעתא", plain: "cites a source that agrees", chip: "vl", effect: "raise", page: 176 },

  "contradiction/direct": { en: "direct contradiction", he: "סתירה", plain: "refutes it outright", chip: "st", effect: "reject", page: 178 },
  "contradiction/opposition": { en: "opposition", he: "דחיה", plain: "undermines it, but leaves it possible", chip: "dc", effect: "unsettle", page: 178 },

  "difficulty/objection": { en: "objection", he: "פרכא", plain: "objects to how it is put", chip: "pk", effect: "unsettle", page: 180 },
  "difficulty/apparentContradiction": { en: "apparent contradiction", he: "רמיא", plain: "two sources clash", chip: "rm", effect: "unsettle", page: 182 },
  "difficulty/refutation": { en: "refutation", he: "תיובתא", plain: "a third kind of difficulty", chip: "tv", effect: "unsettle", page: 184 },

  "resolution/settlement": { en: "settlement", he: "ישוב", plain: "resolves it, and means it", chip: "ys", effect: "discharge", page: 184 },
  "resolution/alternative": { en: "alternative", he: "שנוי", plain: "offers a way out, without claiming it is true", chip: "sh", effect: "unsettle", page: 186 },
};

/**
 * `תיובתא` is announced at p180 and never defined; the translator flags the gap
 * in-line at p184. The `unsettle` effect above is a placeholder, not a reading.
 */
export const UNDEFINED_IN_SOURCE: readonly MoveKey[] = ["difficulty/refutation"];

export const MOVE_KEYS: readonly MoveKey[] = Object.keys(LEAVES) as MoveKey[];

/** The subtypes of each element, in the order `LEAVES` lists them. */
export const SUBTYPES: Readonly<Record<Element, readonly string[]>> = Object.fromEntries(
  ELEMENTS.map((element) => [
    element,
    MOVE_KEYS.filter((k) => k.startsWith(`${element}/`)).map((k) => k.slice(element.length + 1)),
  ]),
) as unknown as Record<Element, readonly string[]>;

export const describe = (move: Move): LeafInfo => LEAVES[keyOf(move)];

export const effectOf = (move: Move): Effect => LEAVES[keyOf(move)].effect;

export const iconOf = (move: Move): Icon => ICONS[move.element];

export const isUndefinedInSource = (move: Move): boolean =>
  UNDEFINED_IN_SOURCE.includes(keyOf(move));
