# Tokyo Mistakes

An [Eleventy (11ty)](https://www.11ty.dev/) static-site theme that ports the
layouts and features of the Jekyll theme
[Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes), skinned
with the [Tokyo Night](https://github.com/folke/tokyonight.nvim) color
palette. Ships two switchable skins — **night** (dark) and **day** (light) —
toggled instantly via CSS custom properties (no rebuild required).

## Install

```bash
npm install
```

## Develop

```bash
npm start
# runs `eleventy --serve`, http://localhost:8080
```

## Build

```bash
npm run build
# outputs static site to ./_site
```

## Theme / skin system

Colors live as CSS custom properties in `src/assets/css/main.css`:

- `:root { ... }` defines the **day** (light) palette by default, so the
  site still looks correct with JS disabled.
- `:root[data-theme="night"] { ... }` overrides those variables with the
  **night** (dark) palette.

`src/assets/js/theme.js` runs inline in `<head>` (to avoid a flash of the
wrong theme) and:

1. Reads `localStorage['theme-pref']` (`'night'`, `'day'`, or `'auto'`).
2. When unset or `'auto'`, resolves via
   `window.matchMedia('(prefers-color-scheme: dark)')`.
3. Sets `data-theme` on `<html>` accordingly, and listens for OS
   preference changes when in `'auto'` mode.

The toggle button in the header (`src/_includes/partials/masthead.njk`,
wired up in `src/assets/js/main.js`) cycles the preference and persists it
to `localStorage`, flipping `data-theme` immediately — no page reload or
rebuild needed.

### Color values

**Night** (dark, based on tokyonight.nvim's `storm` palette that `night.lua`
extends): `bg=#1a1b26`, `bg_dark=#16161e`, `bg_highlight=#292e42`,
`fg=#c0caf5`, `fg_dark=#a9b1d6`, `comment=#565f89`, `blue=#7aa2f7`,
`cyan=#7dcfff`, `green=#9ece6a`, `magenta=#bb9af7`, `orange=#ff9e64`,
`red=#f7768e`, `yellow=#e0af68`, plus supporting shades — see
`src/assets/css/main.css` for the full set.

**Day** (light, from tokyonight.nvim's official Alacritty export
`tokyonight_day.toml`): `background=#e1e2e7`, `foreground=#3760bf`,
`red=#f52a65`, `green=#587539`, `yellow=#8c6c3e`, `blue=#2e7de9`,
`magenta=#9854f1`, `cyan=#007197`, plus bright variants.

These map onto page/card backgrounds, text/muted text, links + hover,
borders, code blocks, blockquote accents, tag/category chips (rotating
blue/green/magenta/orange/red), and success/warning/danger/info notices.

## Layouts / features ported from Minimal Mistakes

- `default.njk` — base layout: skip links, masthead/nav, footer, inline
  theme-detection script.
- `single.njk` — post layout: meta (date/author/read time/tags/categories),
  breadcrumbs, share buttons, sidebar TOC, author sidebar, related posts,
  prev/next pager, comments placeholder.
- `archive-grid.njk` — grid/list toggle + pagination for the posts index.
- `archive-taxonomy.njk` — tag/category archive views.
- `splash.njk` — home/splash hero layout.
- `page.njk` — generic content page with sidebar.
- `pages/404.njk`, `pages/search.njk` — 404 and client-side Lunr search
  (index built by `search-index.11ty.js`, queried in `main.js`).
- `_data/navigation.json` — drives the main nav (Home / Posts / About /
  Tags), mirroring Minimal Mistakes' `_data/navigation.yml`.
- `_data/site.json` — site title/description and author profile
  (avatar/bio/social links) for the sidebar widget.
- Partials: post meta, breadcrumbs, author profile, TOC, search modal,
  masthead, footer.

## Adding a post

Add a Markdown file to `src/posts/`:

```md
---
title: My Post
date: 2026-01-01
tags: [example]
categories: [general]
header:
  image: /assets/images/headers/example.svg
excerpt: Short summary shown in archive listings.
---

Post content here.
```

## Attribution

- Layout/feature structure adapted from
  [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes),
  © Michael Rose, [MIT License](https://github.com/mmistakes/minimal-mistakes/blob/master/LICENSE).
- Color palette from [tokyonight.nvim](https://github.com/folke/tokyonight.nvim),
  © Folke Lemaitre, [Apache License 2.0](https://github.com/folke/tokyonight.nvim/blob/main/LICENSE).

No code was copied from either project — layouts were re-implemented for
Eleventy/Nunjucks, and colors were re-derived from the published hex values
in tokyonight.nvim's Lua palette files and Alacritty color export.
