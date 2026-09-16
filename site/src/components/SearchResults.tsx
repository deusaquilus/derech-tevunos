import { segment, snippet, type SearchHit } from '../lib/search';
import styles from './SearchResults.module.css';

interface Props {
  readonly query: string;
  readonly hits: readonly SearchHit[];
  readonly selected: number;
  readonly busy: boolean;
  readonly onPick: (index: number) => void;
  readonly onHover: (index: number) => void;
}

/**
 * Render a string with its query matches marked.
 *
 * Note what is NOT here: `dangerouslySetInnerHTML`. The Vue original built a
 * `<mark>` string and handed it to `v-html`, so a `<` in the indexed text was
 * parsed as markup. Segments are rendered as children, so the text is escaped
 * by React and the class of bug does not exist. See `segment` in lib/search.
 */
const Marked = ({ text, query }: { readonly text: string; readonly query: string }): React.ReactElement => (
  <>
    {segment(text, query).map((piece, i) =>
      piece.hit ? (
        <mark key={i} className={styles.mark}>
          {piece.text}
        </mark>
      ) : (
        <span key={i}>{piece.text}</span>
      ),
    )}
  </>
);

export const SearchResults = ({
  query,
  hits,
  selected,
  busy,
  onPick,
  onHover,
}: Props): React.ReactElement => (
  <div className={styles.panel} role="listbox" aria-label="Search results">
    {hits.length === 0 ? (
      <p className={styles.empty}>
        {busy ? 'Searching…' : (
          <>
            Nothing matches <strong>{query}</strong>.
          </>
        )}
      </p>
    ) : (
      <ul className={styles.list}>
        {hits.map((hit, i) => (
          <li key={hit.item.slug}>
            {/* `onMouseDown` rather than `onClick`: the input's blur fires
                first on click and its 150ms timer would close the panel before
                the click landed. mousedown precedes blur. */}
            <a
              href={`/docs/${hit.item.slug}`}
              className={`${styles.row}${i === selected ? ` ${styles.on}` : ''}`}
              role="option"
              aria-selected={i === selected}
              onMouseEnter={() => onHover(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                onPick(i);
              }}
            >
              <span className={styles.top}>
                <span className={styles.title}>
                  <Marked text={hit.item.title} query={query} />
                </span>
                <span className={styles.category}>{hit.item.category}</span>
              </span>
              <span className={styles.snippet}>
                <Marked text={snippet(hit.item.content, query)} query={query} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SearchResults;
