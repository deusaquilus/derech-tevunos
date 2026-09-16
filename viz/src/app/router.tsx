/**
 * A hash router in fifty lines and no dependency.
 *
 * The app is a handful of pages served as static files; `location.hash` is
 * enough to say which one, works without any server rewrite rules, and is
 * trivial to swap for a real router later. `useRoute` subscribes to the hash
 * through `useSyncExternalStore` so every page re-renders on navigation.
 */

import { useSyncExternalStore, type AnchorHTMLAttributes, type JSX, type ReactNode } from "react";

/** The path part of the hash, without any `?query`. */
const normalize = (hash: string): string => {
  const path = hash.replace(/^#/, "").split("?")[0] ?? "";
  return path === "" ? "/" : path;
};

/** The query part of the hash, e.g. `at=69` from `#/sugya/x?at=69`. */
const queryOf = (hash: string): string => hash.replace(/^#/, "").split("?")[1] ?? "";

const subscribe = (onChange: () => void): (() => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};

const getSnapshot = (): string => normalize(window.location.hash);
const getServerSnapshot = (): string => "/";
const getQuery = (): string => queryOf(window.location.hash);
const getServerQuery = (): string => "";

/** The current path, e.g. `/` or `/sugya/bava-metzia-yeush`. */
export const useRoute = (): string =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

/**
 * The current query, so a page can be linked to at a particular state —
 * `#/sugya/bk-2a-toldos?at=69` opens the passage with sixty-nine sentences
 * revealed. Re-read on every navigation, like the route.
 */
export const useQuery = (): URLSearchParams =>
  new URLSearchParams(useSyncExternalStore(subscribe, getQuery, getServerQuery));

export const navigate = (to: string): void => {
  window.location.hash = to;
};

/**
 * Match a pattern like `/sugya/:id` against a path, returning the captured
 * params or `undefined` if it does not match.
 */
export const matchRoute = (
  pattern: string,
  path: string,
): Readonly<Record<string, string>> | undefined => {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return undefined;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i += 1) {
    const seg = patternParts[i]!;
    const value = pathParts[i]!;
    if (seg.startsWith(":")) params[seg.slice(1)] = decodeURIComponent(value);
    else if (seg !== value) return undefined;
  }
  return params;
};

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  readonly to: string;
  readonly children: ReactNode;
};

/** An anchor that navigates by hash; native behaviour, no click handler. */
export const Link = ({ to, children, ...rest }: LinkProps): JSX.Element => (
  <a href={`#${to}`} {...rest}>
    {children}
  </a>
);
