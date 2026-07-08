---
title: About
layout: layouts/page.njk
permalink: /about/
---

## About this site

**Tokyo Mistakes** is a demo Eleventy theme that ports the layouts and features of Jekyll's
[Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) theme, skinned entirely with the
[Tokyo Night](https://github.com/folke/tokyonight.nvim) color palette.

Everything here — posts, author bio, images — is placeholder content meant to exercise every
layout: the splash home page, paginated post archive, tag/category archives, single post view with
sidebar author widget, table of contents, breadcrumbs, share buttons, related posts, prev/next
pagination, a client-side Lunr search modal, and a 404 page.

## About the theme

- Dark skin: **tokyonight-night**, based on the "storm" variant.
- Light skin: **tokyonight-day**, from the official Alacritty export.
- Switch instantly with the toggle button in the header — no rebuild needed. Your choice is
  remembered in `localStorage` under the key `theme-pref` (`night`, `day`, or `auto`).

## About the author

{{ site.author.bio }}
