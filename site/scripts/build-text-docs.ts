/**
 * Build the docs pages for the text of Derech Tevunos.
 *
 * Two sources, one output directory (`src/content/docs/text/`, generated and
 * gitignored — never hand-edit it; edit a source or this script):
 *
 *   - `../DerechTevunos_benyehudah_bilingual_fixed_interlinear.md` → one page
 *     per chapter, **verse by verse**: each verse is the Hebrew, then the
 *     English, under a stable ID such as `3.14.11` (chapter . paragraph .
 *     verse). The paragraph numbers are the parent's own 174 paragraphs, so a
 *     verse ID maps back onto the parent by construction.
 *   - `../DerechTevunos_benyehudah_bilingual_fixed.md` (the parent) → the
 *     "About this text" page from its preamble, and the Sugya Context Index
 *     from its appendix. The parent is also the oracle: see the guardrail
 *     below.
 *
 * ── THE GRAMMAR OF THE INTERLINEAR ──────────────────────────────────────────
 *
 *   ## Chapter N · פרק X        the parent's own chapter heading, verbatim
 *   ### N.P · label             paragraph P of chapter N; P = 0 is the caption.
 *                               The label is an editorial navigation aid.
 *   #### N.P.S                  verse S; then one Hebrew paragraph, a blank
 *                               line, one English paragraph. Anything after
 *                               the English and before the next `####` is an
 *                               insertion (a note, a figure) and not text.
 *
 * ── THE GUARDRAIL ───────────────────────────────────────────────────────────
 *
 * Re-joining a paragraph's verses with single spaces must reproduce the
 * parent's paragraph exactly (whitespace runs aside), on both sides. The cut
 * is lossless by design, and this build fails loudly if it stops being so —
 * which is what happens when someone edits the text in one file and not the
 * other. Fix the text; do not weaken the check.
 *
 * ── THE TWO THINGS THAT ARE EASY TO GET WRONG ───────────────────────────────
 *
 * 1. Every wrapper is emitted with BLANK LINES inside it — `<div …>\n\n…\n\n</div>`
 *    — so CommonMark closes the raw-HTML block and parses the body as
 *    Markdown. Wrapping tightly (`<div>text</div>`) silently disables every
 *    emphasis inside the verse, and, worse, turns the Hebrew into a block of
 *    HTML that `build-search-index.ts` drops, so the Hebrew stops being
 *    searchable. The Hebrew and the English are both Markdown paragraphs
 *    inside `div` wrappers for exactly that reason.
 *
 * 2. A Hebrew phrase quoted inside an English verse must be bidi-ISOLATED,
 *    not merely marked. `"…" (הוא מותיב לה והוא מפרק לה)` puts its parentheses
 *    on the wrong side otherwise, because parentheses, quotes and digits are
 *    bidi-neutral and resolve against whichever run wins. Measured on the
 *    source: 357 lines carry Hebrew, 172 of those also carry Latin, 205 carry
 *    parentheses and 166 carry digits. `wrapInlineHebrew` emits
 *    `<span lang="he">` around each run and `prose.css` applies
 *    `unicode-bidi: isolate`. The paragraph labels get the same treatment,
 *    both in the heading and in the frontmatter the TOC is built from.
 *
 * ── CONSTRUCT CARDS AND "DRAWN" LINKS ───────────────────────────────────────
 *
 * `src/lib/textAnchors.ts` says which verse defines or names which construct
 * (a chapter 1–8 badge, the statement tile, one of the seven parts, or a
 * chapter 9 leaf), and which verses quote a passage the site ships. The
 * generator turns each anchor into a card drawn from the rail's own data —
 * glyph body from `glyphs.ts`, name, marker and gloss from `anatomy.ts` or
 * `taxonomy.ts`, hue from `theme.ts` — so the card beside the definition is
 * the same picture the Sugyascade uses, from the same source. A card is one
 * contiguous block of HTML with no blank line inside it, so CommonMark passes
 * the SVG through untouched. Both tables are validated here: a verse ID that
 * is not in the interlinear, or a passage ID that is not in `src/rail/sugyot/`,
 * fails the build.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { ANATOMY, ANATOMY_KEYS, FAMILIES, type AnatomyKey } from '../src/rail/anatomy.ts';
import { GLYPHS, TILE_GLYPH, glyphBox, SQUARE_BOX } from '../src/rail/glyphs.ts';
import { shapesFor } from '../src/rail/icons.ts';
import { MOVE_BOX, moveGlyph } from '../src/rail/moveGlyphs.ts';
import { primitiveToSvg } from '../src/rail/render.ts';
import {
  ELEMENT_GLOSS,
  LEAVES,
  MOVE_KEYS,
  SUBTYPES,
  UNDEFINED_IN_SOURCE,
  type Element,
  type MoveKey,
} from '../src/rail/taxonomy.ts';
import { LIGHT } from '../src/rail/theme.ts';
import {
  CONSTRUCTS,
  DRAWN,
  ELEMENT_HEBREW,
  TILE_CARD,
  type ConstructAnchor,
  type Drawn,
} from '../src/lib/textAnchors.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(here, '..', '..');
const SOURCE = path.join(repoRoot, 'DerechTevunos_benyehudah_bilingual_fixed.md');
const INTERLINEAR = path.join(repoRoot, 'DerechTevunos_benyehudah_bilingual_fixed_interlinear.md');
const OUT_DIR = path.join(here, '..', 'src', 'content', 'docs', 'text');
const SUGYOT_DIR = path.join(here, '..', 'src', 'rail', 'sugyot');

const CATEGORY = 'The text';

/** Any Hebrew letter, including the presentation forms and the alphabetic block. */
const HEBREW_CHAR = /[\u0590-\u05FF\uFB1D-\uFB4F]/;
/**
 * One inline Hebrew run: Hebrew letters plus the marks and separators that
 * belong *inside* a run (maqaf, geresh, gershayim, spaces between words).
 * Trailing neutrals are excluded so the isolation wraps the phrase, not the
 * punctuation around it.
 */
const HEBREW_RUN = /[\u0590-\u05FF\uFB1D-\uFB4F]+(?:[\s\u05BE'"״׳-]+[\u0590-\u05FF\uFB1D-\uFB4F]+)*/g;

// ── Model ───────────────────────────────────────────────────────────────────

type Language = 'he' | 'en';

/** One verse of the interlinear: the same span of thought in both languages. */
type Verse = {
  /** `3.14.11` — chapter, paragraph, verse. */
  readonly id: string;
  readonly he: string;
  readonly en: string;
};

type Paragraph = {
  /** Paragraph number within the chapter; 0 is the caption. */
  readonly p: number;
  /** Editorial navigation label; not part of the text. */
  readonly label: string;
  readonly verses: readonly Verse[];
};

type InterlinearChapter = {
  readonly n: number;
  readonly hebrew: string;
  readonly paragraphs: readonly Paragraph[];
};

/** A run of paragraphs in one language, as the parent lays them out. */
type LangBlock = {
  readonly lang: Language;
  /** The block's own first line in the source, which is the chapter's caption. */
  readonly summary: string;
  /** Everything after the caption. */
  readonly body: readonly string[];
};

type Section =
  | { readonly kind: 'chapter'; readonly n: number; readonly hebrew: string; readonly blocks: readonly LangBlock[] }
  | { readonly kind: 'plain'; readonly title: string; readonly paragraphs: readonly string[] };

// ── Parsing the parent (pure) ───────────────────────────────────────────────

const paragraphsOf = (raw: string): readonly string[] =>
  raw
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

/** `## Chapter 1 · פרק א` → `{ n: 1, hebrew: 'פרק א' }`. */
const parseChapterHeading = (
  heading: string,
): { readonly n: number; readonly hebrew: string } | undefined => {
  const m = /^Chapter\s+(\d+)\s*[·|]\s*(.+)$/.exec(heading.trim());
  if (m === null) return undefined;
  const n = Number(m[1]);
  return Number.isNaN(n) ? undefined : { n, hebrew: (m[2] ?? '').trim() };
};

const langOf = (heading: string): Language | undefined => {
  const h = heading.trim();
  if (h === 'עברית') return 'he';
  if (h === 'English') return 'en';
  return undefined;
};

const toLangBlock = (lang: Language, raw: string): LangBlock => {
  const [summary = '', ...body] = paragraphsOf(raw);
  return { lang, summary, body };
};

/**
 * Split the parent on `## ` headings.
 *
 * Returns the preamble (everything before the first `##`) separately, because
 * it is the source's own explanation of what the two files are and of the
 * `[ed.]` brackets — provenance the reader needs, and not a chapter.
 */
const splitParent = (
  md: string,
): { readonly preamble: string; readonly sections: readonly Section[] } => {
  const parts = md.split(/^## (.+)$/m);
  const preamble = (parts[0] ?? '').replace(/^# .*$/m, '').trim();

  const sections: Section[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i] ?? '';
    const bodyRaw = parts[i + 1] ?? '';
    const chapter = parseChapterHeading(heading);

    if (chapter === undefined) {
      sections.push({ kind: 'plain', title: heading.trim(), paragraphs: paragraphsOf(bodyRaw) });
      continue;
    }

    // Inside a chapter, `### עברית` / `### English` delimit the two languages.
    const sub = bodyRaw.split(/^### (.+)$/m);
    const blocks = sub
      .slice(1)
      .reduce<LangBlock[]>((acc, piece, idx, all) => {
        if (idx % 2 !== 0) return acc;
        const lang = langOf(piece);
        return lang === undefined ? acc : [...acc, toLangBlock(lang, all[idx + 1] ?? '')];
      }, []);

    sections.push({ kind: 'chapter', n: chapter.n, hebrew: chapter.hebrew, blocks });
  }

  return { preamble, sections };
};

// ── Parsing the interlinear (pure) ──────────────────────────────────────────

/** `3.14 · Kind 7 · compound …` → `{ p: 14, label: 'Kind 7 · compound …' }`, chapter checked by the caller. */
const parseParagraphHeading = (
  heading: string,
): { readonly n: number; readonly p: number; readonly label: string } | undefined => {
  const m = /^(\d+)\.(\d+)(?:\s*·\s*(.*))?$/.exec(heading.trim());
  if (m === null) return undefined;
  return { n: Number(m[1]), p: Number(m[2]), label: (m[3] ?? '').trim() };
};

const parseVerseHeading = (
  heading: string,
): { readonly n: number; readonly p: number; readonly s: number } | undefined => {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(heading.trim());
  return m === null ? undefined : { n: Number(m[1]), p: Number(m[2]), s: Number(m[3]) };
};

/**
 * Every structural fault in the interlinear, with its location. Reported all
 * at once rather than one per build, in the manner of `parseSugya`.
 */
const parseInterlinear = (
  md: string,
): { readonly chapters: readonly InterlinearChapter[]; readonly faults: readonly string[] } => {
  const faults: string[] = [];
  const chapters: InterlinearChapter[] = [];
  const parts = md.split(/^## (.+)$/m);

  for (let i = 1; i < parts.length; i += 2) {
    const chapter = parseChapterHeading(parts[i] ?? '');
    if (chapter === undefined) continue; // the file's own front matter has no `##` sections today, but be tolerant
    const paragraphs: Paragraph[] = [];
    const sub = (parts[i + 1] ?? '').split(/^### (.+)$/m);

    for (let j = 1; j < sub.length; j += 2) {
      const head = parseParagraphHeading(sub[j] ?? '');
      if (head === undefined || head.n !== chapter.n) {
        faults.push(`chapter ${chapter.n}: paragraph heading "${(sub[j] ?? '').trim()}" is not "${chapter.n}.P · label"`);
        continue;
      }
      const verses: Verse[] = [];
      const vsub = (sub[j + 1] ?? '').split(/^#### (.+)$/m);
      for (let k = 1; k < vsub.length; k += 2) {
        const at = `${chapter.n}.${head.p}`;
        const v = parseVerseHeading(vsub[k] ?? '');
        if (v === undefined || v.n !== chapter.n || v.p !== head.p) {
          faults.push(`¶${at}: verse heading "${(vsub[k] ?? '').trim()}" does not belong to this paragraph`);
          continue;
        }
        if (v.s !== verses.length + 1) faults.push(`¶${at}: verse ${v.s} is out of sequence (expected ${verses.length + 1})`);
        // Only the first two paragraphs are text; anything after them is an insertion.
        const [he, en, ...rest] = paragraphsOf(vsub[k + 1] ?? '');
        if (he === undefined || en === undefined) {
          faults.push(`verse ${at}.${v.s}: needs a Hebrew paragraph and an English paragraph`);
          continue;
        }
        if (!HEBREW_CHAR.test(he)) faults.push(`verse ${at}.${v.s}: first paragraph is not Hebrew`);
        if (!/[A-Za-z]/.test(en)) faults.push(`verse ${at}.${v.s}: second paragraph is not English`);
        if (rest.length > 0) faults.push(`verse ${at}.${v.s}: ${rest.length} insertion(s) after the English; the renderer does not carry them yet`);
        verses.push({ id: `${at}.${v.s}`, he, en });
      }
      paragraphs.push({ p: head.p, label: head.label, verses });
    }
    chapters.push({ n: chapter.n, hebrew: chapter.hebrew, paragraphs });
  }

  return { chapters, faults };
};

// ── The guardrail (pure) ────────────────────────────────────────────────────

const normalise = (s: string): string => s.replace(/\s+/g, ' ').trim();

/**
 * Hold the interlinear to the parent: same chapters, same paragraph count,
 * and every paragraph's verses re-joining to the parent's paragraph on both
 * sides. Returns every disagreement, with the first differing character.
 */
const holdToParent = (
  chapters: readonly InterlinearChapter[],
  parent: readonly Extract<Section, { kind: 'chapter' }>[],
): readonly string[] => {
  const faults: string[] = [];
  const byNumber = new Map(parent.map((c) => [c.n, c]));

  for (const c of parent) {
    if (!chapters.some((x) => x.n === c.n)) faults.push(`chapter ${c.n} is in the parent but not in the interlinear`);
  }

  for (const chapter of chapters) {
    const src = byNumber.get(chapter.n);
    if (src === undefined) {
      faults.push(`chapter ${chapter.n} is in the interlinear but not in the parent`);
      continue;
    }
    for (const lang of ['he', 'en'] as const) {
      const block = src.blocks.find((b) => b.lang === lang);
      const want = block === undefined ? [] : [block.summary, ...block.body];
      if (want.length !== chapter.paragraphs.length) {
        faults.push(`chapter ${chapter.n} [${lang}]: interlinear has ${chapter.paragraphs.length} paragraphs, parent has ${want.length}`);
      }
      for (const para of chapter.paragraphs) {
        const expected = normalise(want[para.p] ?? '');
        const got = normalise(para.verses.map((v) => v[lang]).join(' '));
        if (expected === got) continue;
        let d = 0;
        while (d < expected.length && d < got.length && expected[d] === got[d]) d += 1;
        faults.push(
          `¶${chapter.n}.${para.p} [${lang}] diverges from the parent at character ${d}:\n` +
            `      parent      …${expected.slice(Math.max(0, d - 40), d + 50)}…\n` +
            `      interlinear …${got.slice(Math.max(0, d - 40), d + 50)}…`,
        );
      }
    }
  }
  return faults;
};

// ── Rendering (pure) ────────────────────────────────────────────────────────

/**
 * Isolate every inline Hebrew run in an otherwise-Latin string.
 *
 * Skipped when the text is Hebrew-dominant — the enclosing block already
 * carries `dir="rtl"` there, and wrapping every word would be noise. Skipped
 * inside backtick spans too: a code span is rendered verbatim, so injecting a
 * tag into one would print the tag.
 */
export const wrapInlineHebrew = (text: string): string => {
  const hebrewChars = (text.match(new RegExp(HEBREW_CHAR, 'g')) ?? []).length;
  const latinChars = (text.match(/[A-Za-z]/g) ?? []).length;
  if (hebrewChars === 0 || hebrewChars > latinChars) return text;

  // Split on code spans so replacement never reaches inside one.
  return text
    .split(/(`[^`]*`)/g)
    .map((piece) =>
      piece.startsWith('`')
        ? piece
        : piece.replace(HEBREW_RUN, (run) => `<span lang="he">${run}</span>`),
    )
    .join('');
};

/**
 * The English carries two kinds of square bracket: `[ed. …]` is the parent's
 * editorial source-reading note, plain `[…]` is the translator's clarifying
 * insertion. Mark the editorial kind so the stylesheet can set it apart; the
 * translator's stays as it is. No `[ed.]` note contains a `]`, so the match
 * is a simple span.
 */
const markEditorial = (html: string): string =>
  html.replace(/\[ed\.[^\]]*\]/g, (m) => `<span class="dt-ed">${m}</span>`);

const renderEnglish = (text: string): string => markEditorial(wrapInlineHebrew(text));

const anchorOf = (id: string): string => `v${id.replace(/\./g, '-')}`;
const paragraphAnchorOf = (n: number, p: number): string => `p${n}-${p}`;

// ── Construct cards (pure) ──────────────────────────────────────────────────

/** Text that goes inside an attribute or a text node of the card's HTML. */
const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** An inline SVG, coloured through `currentColor` so one body serves every hue. */
const svgOf = (body: string, box: string, label: string, colour: string): string =>
  `<svg class="dt-glyph" viewBox="${box}" role="img" aria-label="${esc(label)}" style="color:${colour}">${body}</svg>`;

/** The seven element icons, from the same geometry the waterfall draws. */
const elementIcon = (element: Element): string =>
  svgOf(
    shapesFor(element)
      .map((p) => primitiveToSvg(p, LIGHT.element[element], LIGHT.surface))
      .join(''),
    SQUARE_BOX,
    element,
    LIGHT.element[element],
  );

/**
 * A leaf's own drawing where the icon set has one, its parent's where it has
 * not — which is exactly what the waterfall's rows do (`MoveIcon.tsx`). Seven
 * of the nineteen. A verse that defines a leaf should show the picture the
 * reader will meet on the drawing, not the family it belongs to.
 */
const leafIcon = (key: MoveKey, element: Element): string => {
  const body = moveGlyph(key);
  return body === undefined
    ? elementIcon(element)
    : svgOf(body, MOVE_BOX, LEAVES[key].en, LIGHT.element[element]);
};

/** What every card shows: a picture, a name, an optional Hebrew name and marker, a reading, a meta line. */
type Card = {
  readonly key: string;
  readonly icon: string;
  readonly en: string;
  readonly he?: string;
  readonly word?: string;
  readonly reads: string;
  readonly meta?: string;
  /** Shown on hover; the fuller definition where the data has one. */
  readonly title?: string;
};

const intentions = (parts: number): string => (parts === 1 ? '1 intention' : `${parts} intentions`);

const anatomyCard = (key: AnatomyKey): Card => {
  const info = ANATOMY[key];
  const colour = LIGHT.hue[FAMILIES[info.family].hue];
  return {
    key,
    icon: svgOf(GLYPHS[key], glyphBox(key), info.en, colour),
    en: info.en,
    he: info.he,
    word: info.word,
    reads: info.reads,
    meta: info.parts === undefined ? undefined : `${intentions(info.parts)} · ch. 6`,
    title: info.definition,
  };
};

const tileCard = (): Card => ({
  key: 'statement-tile',
  icon: svgOf(TILE_GLYPH, SQUARE_BOX, TILE_CARD.en, LIGHT.hue.violet),
  en: TILE_CARD.en,
  he: TILE_CARD.he,
  reads: TILE_CARD.reads,
});

const elementCard = (element: Element): Card => {
  const kinds = SUBTYPES[element].length;
  return {
    key: element,
    icon: elementIcon(element),
    en: element,
    he: ELEMENT_HEBREW[element],
    reads: ELEMENT_GLOSS[element],
    meta: `divides into ${kinds} in ch. 9`,
  };
};

const leafCard = (key: MoveKey): Card => {
  const info = LEAVES[key];
  const element = key.split('/')[0] as Element;
  const undefinedInSource = UNDEFINED_IN_SOURCE.includes(key);
  return {
    key,
    icon: leafIcon(key, element),
    en: info.en,
    he: info.he,
    reads: undefinedInSource ? 'listed here, and never defined' : info.plain,
    meta: `a kind of ${element} · effect: ${info.effect}`,
  };
};

const cardOf = (anchor: ConstructAnchor): Card => {
  switch (anchor.kind) {
    case 'anatomy':
      return anatomyCard(anchor.key);
    case 'tile':
      return tileCard();
    case 'element':
      return elementCard(anchor.key);
    case 'leaf':
      return leafCard(anchor.key);
    default: {
      const exhaustive: never = anchor;
      return exhaustive;
    }
  }
};

/**
 * One card as HTML. No blank lines anywhere in it: the whole `<aside>` must
 * stay a single raw-HTML block so CommonMark leaves the SVG alone.
 */
const renderCard = (card: Card): string => {
  const he = card.he === undefined ? '' : `<span class="dt-construct-he" lang="he">${esc(card.he)}</span>`;
  const word =
    card.word === undefined || card.word === card.he
      ? ''
      : `<span class="dt-construct-word" lang="he">${esc(card.word)}</span>`;
  const meta = card.meta === undefined ? '' : `<span class="dt-construct-meta">${esc(card.meta)}</span>`;
  const title = card.title === undefined ? '' : ` title="${esc(card.title)}"`;
  return (
    `<figure class="dt-construct" data-key="${esc(card.key)}"${title}>` +
    card.icon +
    `<figcaption>` +
    `<span class="dt-construct-name">${esc(card.en)}</span>${he}${word}` +
    `<span class="dt-construct-reads">${esc(card.reads)}</span>` +
    meta +
    `</figcaption>` +
    `</figure>`
  );
};

const renderConstructs = (anchors: readonly ConstructAnchor[]): string =>
  `<aside class="dt-constructs" aria-label="Constructs this verse defines">` +
  anchors.map((a) => renderCard(cardOf(a))).join('') +
  `</aside>`;

// ── "Drawn" links (pure, given the passages' metadata) ──────────────────────

type PassageMeta = { readonly id: string; readonly title: string; readonly cite: string };

const renderDrawn = (drawn: readonly Drawn[], passages: ReadonlyMap<string, PassageMeta>): string =>
  `<p class="dt-drawn">` +
  drawn
    .map((d) => {
      const p = passages.get(d.sugya);
      if (p === undefined) return ''; // validated before rendering; unreachable in a passing build
      return (
        `Drawn in the Sugyascade as ${esc(d.role)}: ` +
        `<a href="/sugya/${esc(p.id)}">${esc(p.title)}<span class="dt-drawn-cite"> · ${esc(p.cite)}</span></a>`
      );
    })
    .join(' ') +
  `</p>`;

// ── Verses (pure) ───────────────────────────────────────────────────────────

/**
 * One verse. The Hebrew and the English are Markdown paragraphs inside `div`
 * wrappers with blank lines — see the file header for why both halves of that
 * sentence matter. The construct cards and the "drawn" line follow the
 * English, each as its own raw block.
 */
const renderVerse = (v: Verse, passages: ReadonlyMap<string, PassageMeta>): string => {
  const a = anchorOf(v.id);
  const anchors = CONSTRUCTS[v.id];
  const drawn = DRAWN[v.id];
  return [
    `<div class="dt-verse" id="${a}" data-verse="${v.id}">`,
    '',
    `<p class="dt-verse-id"><a href="#${a}">${v.id}</a></p>`,
    '',
    `<div class="dt-he" lang="he" dir="rtl">`,
    '',
    v.he,
    '',
    '</div>',
    '',
    `<div class="dt-en" lang="en">`,
    '',
    renderEnglish(v.en),
    '',
    '</div>',
    ...(drawn === undefined ? [] : ['', renderDrawn(drawn, passages)]),
    ...(anchors === undefined ? [] : ['', renderConstructs(anchors)]),
    '',
    '</div>',
  ].join('\n');
};

/** The chapter's caption (paragraph 0), set as a lead rather than as a numbered verse. */
const renderCaption = (para: Paragraph): string => {
  const v = para.verses[0];
  if (v === undefined) return '';
  return [
    `<div class="dt-caption" lang="he" dir="rtl">`,
    '',
    v.he,
    '',
    '</div>',
    '',
    `<div class="dt-caption dt-caption-en" lang="en">`,
    '',
    renderEnglish(v.en),
    '',
    '</div>',
  ].join('\n');
};

const renderParagraph = (n: number, para: Paragraph, passages: ReadonlyMap<string, PassageMeta>): string => {
  const id = `${n}.${para.p}`;
  const heading =
    `<h3 class="dt-para" id="${paragraphAnchorOf(n, para.p)}" data-paragraph="${id}">` +
    `<span class="dt-para-num">${id}</span> ${wrapInlineHebrew(para.label)}</h3>`;
  return [
    `<section class="dt-paragraph">`,
    '',
    heading,
    '',
    para.verses.map((v) => renderVerse(v, passages)).join('\n\n'),
    '',
    '</section>',
  ].join('\n');
};

const yamlString = (s: string): string => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

const frontmatter = (
  fields: Readonly<Record<string, string | number>>,
  paragraphs: readonly { readonly id: string; readonly label: string }[] = [],
): string => {
  const scalars = Object.entries(fields).map(([k, v]) => `${k}: ${typeof v === 'number' ? v : yamlString(v)}`);
  const list =
    paragraphs.length === 0
      ? []
      : ['paragraphs:', ...paragraphs.flatMap((p) => [`  - id: ${yamlString(p.id)}`, `    label: ${yamlString(p.label)}`])];
  return ['---', ...scalars, ...list, '---'].join('\n');
};

/** Trim a caption down to something that fits a meta description. */
const asDescription = (s: string, fallback: string): string => {
  const clean = s.replace(/\s+/g, ' ').trim();
  if (clean.length === 0) return fallback;
  return clean.length <= 155 ? clean : `${clean.slice(0, 152).trimEnd()}…`;
};

const renderChapter = (
  chapter: InterlinearChapter,
  passages: ReadonlyMap<string, PassageMeta>,
): { readonly slug: string; readonly contents: string } => {
  const caption = chapter.paragraphs.find((p) => p.p === 0);
  const body = chapter.paragraphs.filter((p) => p.p !== 0);
  const description = asDescription(
    caption?.verses[0]?.en ?? '',
    `Derech Tevunos, chapter ${chapter.n}, Hebrew and English, verse by verse.`,
  );

  // The TOC is built from this list: stable anchors, labels already isolated.
  const toc = body.map((p) => ({
    id: paragraphAnchorOf(chapter.n, p.p),
    label: `${chapter.n}.${p.p} · ${wrapInlineHebrew(p.label)}`,
  }));

  const slug = `chapter-${String(chapter.n).padStart(2, '0')}`;
  const title = `Chapter ${chapter.n} · ${chapter.hebrew}`;

  return {
    slug,
    contents: [
      frontmatter({ title, description, category: CATEGORY, order: chapter.n, kind: 'text' }, toc),
      '',
      ...(caption === undefined ? [] : [renderCaption(caption), '']),
      body.map((p) => renderParagraph(chapter.n, p, passages)).join('\n\n'),
      '',
    ].join('\n'),
  };
};

// ── The anchors' guardrail (pure, given what exists) ────────────────────────

/**
 * Every verse the anchor tables name must exist, and every passage `DRAWN`
 * names must be shipped. A table entry that points at nothing is a card or a
 * link that silently never renders, which is the failure mode this catches.
 */
const holdAnchors = (
  chapters: readonly InterlinearChapter[],
  passages: ReadonlyMap<string, PassageMeta>,
): readonly string[] => {
  const verses = new Set(chapters.flatMap((c) => c.paragraphs.flatMap((p) => p.verses.map((v) => v.id))));
  const missingVerses = [...Object.keys(CONSTRUCTS), ...Object.keys(DRAWN)]
    .filter((id) => !verses.has(id))
    .map((id) => `anchor at verse ${id}, which is not in the interlinear`);
  const missingPassages = Object.entries(DRAWN)
    .flatMap(([id, drawn]) => drawn.map((d) => [id, d.sugya] as const))
    .filter(([, sugya]) => !passages.has(sugya))
    .map(([id, sugya]) => `verse ${id} is "drawn" by passage ${sugya}, which is not in src/rail/sugyot/`);
  return [...missingVerses, ...missingPassages];
};

/**
 * A `##` section of the parent that is not a chapter — today only the Sugya
 * Context Index, which has its own `### Seder …` structure and no language
 * split. Its entries mix Hebrew citations into English prose, so every
 * paragraph goes through the inline isolation.
 */
const renderPlain = (
  section: Extract<Section, { kind: 'plain' }>,
  order: number,
): { readonly slug: string; readonly contents: string } => {
  const slug = section.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Keep `### Seder …` headings as headings; isolate Hebrew everywhere else.
  const body = section.paragraphs
    .map((p) => (p.startsWith('#') ? p : wrapInlineHebrew(p)))
    .join('\n\n');

  return {
    slug,
    contents: [
      frontmatter({
        title: section.title,
        description:
          'Every passage cited in Derech Tevunos, with the context of the sugya it comes from, written from the source text.',
        category: CATEGORY,
        order,
        kind: 'text',
      }),
      '',
      body,
      '',
    ].join('\n'),
  };
};

const renderAbout = (preamble: string): string =>
  [
    frontmatter({
      title: 'About this text',
      description:
        'What this edition of Derech Tevunos is: the 1742 Amsterdam Hebrew as keyed by Project Ben-Yehuda, and a clean-room English translation of it, cut verse by verse.',
      category: CATEGORY,
      order: 0,
      kind: 'prose',
    }),
    '',
    preamble
      .split(/\n{2,}/)
      .map((p) => wrapInlineHebrew(p.trim()))
      .filter((p) => p.length > 0)
      .join('\n\n'),
    '',
  ].join('\n');

// ── Effects ─────────────────────────────────────────────────────────────────

const fail = (headline: string, faults: readonly string[]): never => {
  console.error(`✗ ${headline}`);
  for (const f of faults) console.error(`   - ${f}`);
  process.exit(1);
};

/**
 * The shipped passages' id, title and cite, read from their JSON directly.
 * The registry (`src/rail/sugyot/index.ts`) would parse and validate every
 * file at import; for three strings a page can print, the raw JSON is enough,
 * and it keeps this script from depending on the whole rail.
 */
const readPassages = (): ReadonlyMap<string, PassageMeta> =>
  new Map(
    fs
      .readdirSync(SUGYOT_DIR)
      .filter((name) => name.endsWith('.json') && name !== 'sugya.schema.json')
      .flatMap((name): readonly (readonly [string, PassageMeta])[] => {
        const raw: unknown = JSON.parse(fs.readFileSync(path.join(SUGYOT_DIR, name), 'utf-8'));
        if (typeof raw !== 'object' || raw === null) return [];
        const r = raw as Record<string, unknown>;
        const { id, title, tractate, folio } = r;
        if (typeof id !== 'string' || typeof title !== 'string' || typeof tractate !== 'string' || typeof folio !== 'string') {
          return [];
        }
        return [[id, { id, title, cite: `${tractate} ${folio}` }]];
      }),
  );

const main = (): void => {
  for (const [label, file] of [
    ['Source text', SOURCE],
    ['Interlinear text', INTERLINEAR],
  ] as const) {
    if (!fs.existsSync(file)) {
      console.error(`✗ ${label} not found: ${file}`);
      process.exit(1);
    }
  }

  const { preamble, sections } = splitParent(fs.readFileSync(SOURCE, 'utf-8'));
  const parentChapters = sections.filter(
    (s): s is Extract<Section, { kind: 'chapter' }> => s.kind === 'chapter',
  );
  const plains = sections.filter((s): s is Extract<Section, { kind: 'plain' }> => s.kind === 'plain');
  if (parentChapters.length === 0) fail('No chapters parsed from the source. Its headings may have changed shape.', []);

  const { chapters, faults } = parseInterlinear(fs.readFileSync(INTERLINEAR, 'utf-8'));
  if (faults.length > 0) fail('The interlinear does not parse:', faults);
  if (chapters.length === 0) fail('No chapters parsed from the interlinear. Its headings may have changed shape.', []);

  const disagreements = holdToParent(chapters, parentChapters);
  if (disagreements.length > 0) {
    fail(
      'The interlinear no longer reproduces the parent. The cut is meant to be lossless; fix the text, do not loosen this check.',
      disagreements,
    );
  }

  const passages = readPassages();
  const dangling = holdAnchors(chapters, passages);
  if (dangling.length > 0) fail('src/lib/textAnchors.ts points at things that do not exist:', dangling);

  // Write in place, then remove what is stale — never `rmSync` the directory.
  // `astro dev` watches this directory, and a delete-and-recreate makes its
  // content layer drop every chapter and not pick the new files up: the
  // routes 404 until the server restarts. Measured 2026-09-16 after running
  // `npm run build` beside a live dev server. Overwriting files is a change
  // the watcher handles; a vanishing directory is not.
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const written: string[] = [];

  fs.writeFileSync(path.join(OUT_DIR, 'about.md'), renderAbout(preamble), 'utf-8');
  written.push('about');

  for (const chapter of [...chapters].sort((a, b) => a.n - b.n)) {
    const { slug, contents } = renderChapter(chapter, passages);
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), contents, 'utf-8');
    written.push(slug);
  }

  for (const [i, plain] of plains.entries()) {
    const { slug, contents } = renderPlain(plain, 90 + i);
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), contents, 'utf-8');
    written.push(slug);
  }

  const keep = new Set(written.map((slug) => `${slug}.md`));
  const stale = fs.readdirSync(OUT_DIR).filter((name) => name.endsWith('.md') && !keep.has(name));
  for (const name of stale) fs.unlinkSync(path.join(OUT_DIR, name));
  if (stale.length > 0) console.log(`   removed ${stale.length} stale page(s): ${stale.join(', ')}`);

  const verses = chapters.reduce((sum, c) => sum + c.paragraphs.reduce((s, p) => s + p.verses.length, 0), 0);
  const paragraphs = chapters.reduce((sum, c) => sum + c.paragraphs.length, 0);
  const cards = Object.values(CONSTRUCTS).reduce((sum, anchors) => sum + anchors.length, 0);
  const drawnLinks = Object.values(DRAWN).reduce((sum, drawn) => sum + drawn.length, 0);
  console.log(`✅ Text docs: ${written.length} pages → src/content/docs/text/`);
  console.log(
    `   ${chapters.length} chapters, ${paragraphs} paragraphs, ${verses} verses, held to the parent; ${plains.length} appended section(s)`,
  );
  console.log(
    `   ${cards} construct cards on ${Object.keys(CONSTRUCTS).length} verses; ${drawnLinks} "drawn" links to ${new Set(Object.values(DRAWN).flat().map((d) => d.sugya)).size} passages`,
  );
  // Printed, not enforced. The table covered the whole vocabulary on
  // 2026-09-18, and a build that quietly stops covering it should say so —
  // but a new construct may reasonably land in `anatomy.ts` a commit before
  // its verse is found, and failing the build for that helps nobody.
  const anchoredAnatomy = new Set(
    Object.values(CONSTRUCTS).flat().flatMap((a) => (a.kind === 'anatomy' ? [a.key as string] : [])),
  );
  const anchoredLeaves = new Set(
    Object.values(CONSTRUCTS).flat().flatMap((a) => (a.kind === 'leaf' ? [a.key as string] : [])),
  );
  const uncovered = [
    ...ANATOMY_KEYS.filter((k) => !anchoredAnatomy.has(k)),
    ...MOVE_KEYS.filter((k) => !anchoredLeaves.has(k)),
  ];
  console.log(
    uncovered.length === 0
      ? `   vocabulary covered: all ${ANATOMY_KEYS.length} anatomy kinds and all ${MOVE_KEYS.length} ch. 9 leaves have a card`
      : `   ⚠ ${uncovered.length} construct(s) with no card: ${uncovered.join(', ')}`,
  );
};

main();
