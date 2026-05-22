# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The marketing/landing site for the **Tethys Platform** project (the platform itself lives at https://github.com/tethysplatform/tethys). This repo is **not** the Tethys Platform — it's the public website that promotes it.

- **Hosting**: GitHub Pages, served from the `master` branch root
- **Custom domain**: `www.tethysplatform.org` (configured via `CNAME`)
- **Stack**: Plain static HTML + CSS + jQuery. No build step, no package manager, no Jekyll, no tests.
- **Deploy**: Merging to `master` publishes automatically via GitHub Pages. There is no CI.

## Local development

There is no build pipeline. To preview changes, serve the directory with any static server, e.g.:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Open the page directly in a browser also works for most things, but some relative paths (`/community-apps`, `/publications`, `/project-steering-committee`) assume server-style routing — GitHub Pages resolves the extensionless URLs to the corresponding `.html` files.

## Page structure

Four standalone HTML pages, each self-contained with its own copy of the header/nav/footer markup:

- `index.html` — landing page
- `community-apps.html` — gallery of community-built apps (linked as `/community-apps`)
- `project-steering-committee.html` — PSC members + bylaws (linked as `/project-steering-committee`)
- `publications.html` — academic publications list (linked as `/publications`)

**There is no template system.** When you change the nav, header, footer, or any shared chrome, you must edit all four files. Search for the relevant block (e.g. `class="mobile-nav"`, `class="site-header"`, `class="header-dropdown-menu"`) and update each occurrence.

## Assets

- `css/tethys_main.css` — main stylesheet (~1800 lines); everything visual lives here unless page-specific
- `css/tethys_typography.css` — shared font/typography rules
- `css/community_apps.css`, `css/publications.css`, `css/psc.css` — small page-specific overrides
- `js/tethys_main.js` — primary jQuery script using an IIFE/module pattern (`TETHYS_THEME`); handles parallax, responsive layout shifts, mobile nav, dropdowns
- `js/dropdown_menu.js` — dropdown behavior for the header nav
- `images/` — all image assets (favicons, logos, hero images, community-app screenshots in `images/community-apps/`)

External dependencies are loaded via CDN, not vendored: **Bootstrap 5.1.3**, **jQuery 3.6.0**, **bootstrap-icons 1.5.0** (community-apps page only).

## Conventions

- **jQuery, not vanilla JS.** `tethys_main.js` uses the revealing module pattern (`var TETHYS_THEME = (function() { ... })();`). New behavior goes inside the IIFE; expose via the returned `public_interface` only if needed externally.
- **Bootstrap 5 utility classes** are used heavily for layout. Prefer extending with utility classes before adding new CSS.
- **Google Analytics** (gtag, ID `G-3HZGSHLW9L`) is included inline in the `<head>` of every page — preserve it when editing.
- **Image optimization matters.** Several hero images are large (>1 MB). Compressed variants like `*-compressed.jpg/png` exist alongside originals; use compressed versions in production HTML where possible.

## Common edits

- **Adding a community app**: edit `community-apps.html` (card markup near the bottom) and drop the screenshot in `images/community-apps/`.
- **Adding a publication**: edit `publications.html`; follow the existing entry format.
- **Updating the PSC roster or bylaw dates**: edit `project-steering-committee.html`.
- **Site-wide nav/header/footer change**: edit all four HTML files. Verify each.

## Things to be careful about

- Don't introduce a build step (webpack, Vite, npm, Jekyll, etc.) without explicit user confirmation — GitHub Pages serves these files directly as-is, and adding a build breaks the deploy model.
- Don't rename pages (`community-apps.html`, `project-steering-committee.html`, `publications.html`) — they're linked by extensionless URLs from other sites and bookmarks.
- `CNAME` controls the custom domain. Do not modify or delete it.
