#!/usr/bin/env bash
#
# Run the site locally.
#
#   ./start.sh            dev server: the generators, then `astro dev`
#   ./start.sh prod       the real build, then `astro preview` over its output
#   ./start.sh check      typecheck, the rail's acceptance oracle, the tests
#
# Anything after the mode goes to astro, so `./start.sh dev --port 5000` and
# `./start.sh prod --host` both work.
#
# Unlike `push-to-dev.sh` and `push-to-prod.sh`, which are at the repository
# root because they operate on git rather than on the npm package, this one is
# here for the opposite reason: there is no package.json at the root, `site/`
# is the npm package, and every command below has to be run from inside it.
# Being runnable from the root is the whole point, so do not move it into
# `site/` — there it would only be `npm run dev` with extra steps.

set -euo pipefail

cd "$(dirname "$0")/site"

MODE="${1:-dev}"
if [ $# -gt 0 ]; then shift; fi

# Node 22 is what `engines` asks for and what Vercel builds with. Astro 5 does
# not start on an older major and does not say clearly why.
NODE_MAJOR="$(node -v | sed 's/^v\([0-9]*\).*/\1/')"
if [ "$NODE_MAJOR" -lt 22 ]; then
  echo "start.sh: node $(node -v) is too old — site/package.json asks for >= 22" >&2
  exit 1
fi

# A fresh clone has nothing installed, and a pulled branch may have moved the
# lockfile under an install that is already there.
if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; then
  echo "start.sh: installing dependencies…"
  npm install
fi

case "$MODE" in
  dev)
    # `npm run dev` is `generate && astro dev`, and the generate step is not
    # optional: the chapter pages, the search index, the blog lastmod map and
    # the rail glyphs are all generated and gitignored, so a bare `astro dev`
    # on a fresh clone serves a docs section with nothing in it.
    exec npm run dev -- "$@"
    ;;
  prod)
    npm run build
    echo
    echo "start.sh: serving the build. This is the Vercel adapter's own output,"
    echo "          so it is the same thing production serves — no dev server,"
    echo "          no HMR, islands hydrated from the built bundles."
    exec npx astro preview "$@"
    ;;
  check)
    npm run check
    exec npm test
    ;;
  *)
    echo "start.sh: unknown mode \"$MODE\" — expected dev, prod or check" >&2
    exit 1
    ;;
esac
