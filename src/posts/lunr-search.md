---
title: "Client-Side Search With Lunr.js on a Static Site"
date: 2026-01-26
excerpt: "How Minimal Mistakes' Lunr search maps onto a build-time JSON index and a small client-side script."
tags: ["search", "javascript", "lunr"]
categories: ["Engineering"]
header_image: /assets/images/header-4.svg
---

Minimal Mistakes ships an optional Lunr-powered search that indexes your posts at build time and
searches them entirely in the browser — no server, no third-party search service. This theme
ports that idea directly.

## Building the index

An `.11ty.js` template (`search-index.11ty.js`) runs at build time, iterates over the `posts`
collection, strips HTML tags from the rendered content, and emits a flat JSON array:

```js
{
  id: 0,
  title: "Why Tokyo Night Is the Perfect Static-Site Palette",
  url: "/posts/tokyo-night-palette/",
  tags: "design color-theory",
  content: "Tokyo Night started life as a Neovim colorscheme...",
  excerpt: "A look at why the tokyonight.nvim color scheme..."
}
```

## Querying it in the browser

On page load, the search modal's script fetches `/search-index.json`, builds a Lunr index client
side, and wires up the search input for live results — with prefix matching (`query*`) so partial
words still match:

```js
this.field("title", { boost: 10 });
this.field("tags", { boost: 5 });
this.field("content");
```

Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> anywhere on this site to try it, or visit the
[dedicated search page](/search/).
