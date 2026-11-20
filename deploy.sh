#!/usr/bin/env bash
# Build and publish dist/ to the gh-pages branch (used until the Actions workflow is enabled).
set -euo pipefail
cd "$(dirname "$0")"
npm run build
touch dist/.nojekyll          # GitHub Pages would otherwise hide the _astro/ folder
remote=$(git remote get-url origin)
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="deploy" -c user.email="deploy@users.noreply.github.com" commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"
git push -q -f "$remote" gh-pages
rm -rf .git
echo "Published to gh-pages"
