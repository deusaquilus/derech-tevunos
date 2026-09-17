// @ts-check
//
// ── VERSION CONSTRAINT: keep this whole tree on Vite 6 ──────────────────────
//
// `astro@5.18.2` depends on `vite@6.4.3`. Three packages here can drag in a
// newer Vite, and if any of them does, `@astrojs/react` resolves to THAT copy
// instead of Astro's, loads the rolldown-based pipeline, and installs a native
// React-refresh wrapper that Astro's Vite 6 dev server cannot accept. Every
// request for a `.tsx` module then 500s with ``Missing field `moduleType` ``.
// It is a dev-only failure — the production build never installs refresh — so
// the build stays green while `astro dev` is unusable, which is the worst
// possible shape for a bug like this. Measured 2026-09-16: 71 console errors
// with a split tree, 0 once aligned.
//
// So the pins are deliberate, not laziness about upgrading:
//
//   @astrojs/react    ^4.4.0   — the major built for Vite ^6.3.6. v5 wants
//                                Vite ^7, v6 wants Vite ^8; neither matches
//                                any Astro 5.x.
//   @vitejs/plugin-react ^4.7.0 — the major that pairs with it.
//   vitest            ^3.2.4   — v4 requires Vite ^6||^7||^8 and resolves to
//                                the newest, which is what pulled Vite 8 and
//                                rolldown into the tree in the first place.
//
// Before upgrading any of them, check `npm ls vite`: `@astrojs/react` must
// show the same version Astro itself depends on.
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

/** Paths that must stay out of the index. Keep in sync with `noindex` on Layout.astro. */
const SITEMAP_EXCLUDE = ['/docs/index/', '/byo/'];

const configDir = path.dirname(fileURLToPath(import.meta.url));
const lastmodPath = path.join(configDir, 'public', 'blog-lastmod.json');
/** @type {Record<string, string>} */
const blogLastmod = existsSync(lastmodPath)
  ? JSON.parse(readFileSync(lastmodPath, 'utf-8'))
  : {};

// `astro build` and `astro dev` share Vite's default cache
// (`node_modules/.vite/deps`). A build prebundles React with
// `NODE_ENV=production`, and React 19's production jsx-dev-runtime
// exports `jsxDEV` as undefined. The next `astro dev` then hydrates
// every `client:only` island into a blank sheet:
// `TypeError: jsxDEV is not a function` in ConnectorLayer (and every
// other `.tsx`). Separate caches so a build cannot poison the dev
// server. Measured 2026-09-16: homepage, `/sugya/pesachim-liquids`
// and `/sugya/bk-2a-toldos` all empty with the shared cache; all
// three draw after the split.
//
// The first split left the dev server on that default path. Measured
// 2026-09-17: a config restart rewrote `.vite/deps/react_jsx-dev-runtime.js`
// as the production stub again (`exports.jsxDEV = void 0`; 1138 bytes,
// same shape as `.vite-build`). Vitest and `@vitejs/plugin-react` also
// resolve Vite 7 onto `node_modules/.vite`, so anything that prebundles
// there can recapture the astro-dev cache. Two further isolations: the
// dev cache lives at `.vite-dev`, off the default path, and the
// optimizer's `NODE_ENV` is pinned to development so a leftover
// production value cannot recapture the prebundle.
const isBuild = process.argv.includes('build');

export default defineConfig({
  site: 'https://derech-tevunos.com',
  vite: {
    cacheDir: isBuild ? './node_modules/.vite-build' : './node_modules/.vite-dev',
    ...(!isBuild && {
      optimizeDeps: {
        esbuildOptions: {
          define: {
            'process.env.NODE_ENV': '"development"',
          },
        },
      },
    }),
  },
  adapter: vercel(),
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => {
        try {
          const pathname = new URL(page).pathname;
          return !SITEMAP_EXCLUDE.some(
            (prefix) => pathname === prefix || pathname.startsWith(prefix),
          );
        } catch {
          return true;
        }
      },
      serialize(item) {
        try {
          const url = new URL(item.url);
          // The lastmod lookup happens BEFORE the trailing slash is stripped,
          // because blog-lastmod.json is keyed on the slash-ful pathname.
          // Reordering these two steps silently drops every lastmod.
          const lastmod = blogLastmod[url.pathname];
          if (lastmod) {
            item.lastmod = lastmod;
          }
          // Emit the slash-free URL. A trailing-slash sitemap entry counts as a
          // different URL from the one Google canonicalizes and lands as "No
          // referring sitemaps detected" in Search Console. This hook, the
          // canonical tag in Layout.astro, and `trailingSlash: false` in
          // vercel.json must always agree. See AGENTS.md.
          if (url.pathname !== '/') {
            url.pathname = url.pathname.replace(/\/$/, '');
            item.url = url.href;
          }
        } catch {
          /* leave item unchanged */
        }
        return item;
      },
    }),
  ],
  markdown: {
    smartypants: false,
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
