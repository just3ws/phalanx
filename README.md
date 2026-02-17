# Phalanx Pages Site

This directory is the `gh-pages` worktree for the Phalanx website.

## Local Preview

1. `cd /Users/mike/github.com/just3ws/phalanx-site`
2. `bin/dev`
3. Open `http://127.0.0.1:4000/phalanx/`

`bin/dev` will install gems via Bundler if needed, then run Jekyll with livereload.

Manual commands:

1. `bundle install`
2. `bundle exec jekyll build`
3. `bundle exec jekyll serve --livereload --host 127.0.0.1 --port 4000`

Alternative local server script:

- `./bin/server`

## GitHub Pages Configuration

- Branch: `gh-pages`
- Source: branch root
- Tooling: vanilla Jekyll (GitHub Pages compatible)

The site uses `_layouts`, `_includes`, Markdown content pages, and `assets/` for styles and images.

## CI and Validation Tooling

The repository now mirrors the core validation structure used in your primary site tooling:

- GitHub Actions workflow: `.github/workflows/validate.yml`
- Pipeline entrypoint: `bin/pipeline`
- Semantic/a11y validator: `bin/validate_semantic_output.rb`
- Browser smoke test: `bin/smoke_playwright.sh`

Pipeline commands:

- `./bin/pipeline build`
- `./bin/pipeline validate`
- `./bin/pipeline smoke`
- `./bin/pipeline test`
- `./bin/pipeline ci`

## Content Editing Guide

- Main pages are Markdown files in the repo root:
  - `index.md`
  - `how-to-play.md`
  - `rules.md`
  - `suits-strategy.md`
  - `faq.md`
  - `history.md`
  - `roadmap.md`
  - `quick-reference.md`
- Shared UI:
  - `_layouts/default.html`
  - `_includes/header.html`
  - `_includes/footer.html`
- Styling:
  - `assets/css/site.css`
- SEO/support:
  - `_config.yml`
  - `sitemap.xml`
  - `robots.txt`
  - `assets/img/favicon.svg`
  - `assets/img/og-image.svg`
  - `assets/history/README.md` (historical archive policy + provenance)

## Runtime Tool Versions

Managed via `.tool-versions`:

- Ruby `3.4.8`
- Node.js `25.6.1`

## Historical Assets Policy

Historical artifacts from related Phalanx repositories are stored under `assets/history/`.

- They are for narrative and archival context only.
- They are not canonical gameplay references.
- Canonical rules remain in the primary repo (`docs/RULES.md`).
