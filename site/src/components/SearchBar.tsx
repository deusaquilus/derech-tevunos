import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MIN_QUERY, search, type SearchHit } from '../lib/search';
import { SearchResults } from './SearchResults';
import styles from './SearchBar.module.css';

/**
 * Docs search. Ported from the Vue original, with the two bugs that a naive
 * port produces fixed explicitly — both of which fail *silently*, which is why
 * they are called out here rather than left to the reader.
 *
 *   1. THE DEBOUNCER MUST NOT BE REBUILT PER RENDER. In Vue's `<script setup>`
 *      the component body runs once per instance, so `const run = debounce(…)`
 *      is created once. A React function body runs on every render, so the
 *      same line would hand out a fresh timer on every keystroke and the delay
 *      would never elapse — search would fire per character and the debounce
 *      would be decorative. `useMemo` with an empty dependency list is what
 *      makes it one timer for the component's lifetime.
 *
 *   2. THE TIMEOUT MUST NOT READ STATE FROM A CLOSURE. `onBlur` waits 150ms
 *      before closing the panel so the pointer can travel from the input to
 *      the results. Vue refs read their current value when the timer fires; a
 *      React closure captures the value from the render that created it, so
 *      the panel would close while the pointer is over it. `focused` and
 *      `hovering` are therefore refs, not state — correct anyway, since
 *      neither is rendered.
 */
export const SearchBar = (): React.ReactElement => {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<readonly SearchHit[]>([]);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const focused = useRef(false);
  const hovering = useRef(false);
  /** Guards against an older, slower query overwriting a newer one's results. */
  const generation = useRef(0);

  const run = useMemo(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return (value: string): void => {
      if (timer !== undefined) clearTimeout(timer);
      timer = setTimeout(() => {
        const mine = ++generation.current;
        if (value.trim().length < MIN_QUERY) {
          setHits([]);
          setBusy(false);
          return;
        }
        search(value)
          .then((found) => {
            if (generation.current !== mine) return;
            setHits(found);
          })
          .catch(() => {
            if (generation.current !== mine) return;
            setHits([]);
          })
          .finally(() => {
            if (generation.current === mine) setBusy(false);
          });
      }, 250);
    };
  }, []);

  const onChange = useCallback(
    (value: string): void => {
      setQuery(value);
      setOpen(true);
      setSelected(0);
      // Show the spinner immediately rather than after the debounce, so a
      // keystroke always produces visible feedback.
      if (value.trim().length >= MIN_QUERY) setBusy(true);
      run(value);
    },
    [run],
  );

  const clear = useCallback((): void => {
    setQuery('');
    setHits([]);
    setOpen(false);
    setBusy(false);
    inputRef.current?.focus();
  }, []);

  const go = useCallback(
    (hit: SearchHit | undefined): void => {
      if (hit === undefined) return;
      window.location.href = `/docs/${hit.item.slug}`;
    },
    [],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Escape') {
        clear();
        return;
      }
      if (!open || hits.length === 0) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelected((i) => Math.min(i + 1, hits.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelected((i) => Math.max(i - 1, 0));
      } else if (event.key === 'Enter') {
        event.preventDefault();
        go(hits[selected]);
      }
    },
    [open, hits, selected, clear, go],
  );

  // Cmd/Ctrl-K focuses the field from anywhere on the page.
  useEffect(() => {
    const onGlobalKey = (event: KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onGlobalKey);
    return () => document.removeEventListener('keydown', onGlobalKey);
  }, []);

  const showResults = open && query.trim().length >= MIN_QUERY;

  return (
    <div
      className={styles.container}
      onMouseEnter={() => {
        hovering.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
      }}
    >
      <div className={`${styles.bar}${showResults ? ` ${styles.active}` : ''}`}>
        <svg
          className={styles.icon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder="Search the text…"
          aria-label="Search the documentation"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => {
            focused.current = true;
            if (query.trim().length >= MIN_QUERY) setOpen(true);
          }}
          onBlur={() => {
            focused.current = false;
            setTimeout(() => {
              if (!focused.current && !hovering.current) setOpen(false);
            }, 150);
          }}
        />

        {query.length === 0 ? (
          <kbd className={styles.kbd}>⌘K</kbd>
        ) : (
          <button className={styles.clear} onClick={clear} aria-label="Clear the search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {busy && <span className={styles.spinner} aria-hidden="true" />}
      </div>

      {showResults && (
        <SearchResults
          query={query}
          hits={hits}
          selected={selected}
          busy={busy}
          onPick={(i) => go(hits[i])}
          onHover={setSelected}
        />
      )}
    </div>
  );
};

export default SearchBar;
