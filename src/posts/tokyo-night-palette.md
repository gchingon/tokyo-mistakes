---
title: "Why Tokyo Night Is the Perfect Static-Site Palette"
date: 2026-01-05
excerpt: "A look at why the tokyonight.nvim color scheme translates so well from terminal to browser."
tags: ["design", "color-theory"]
categories: ["Design"]
header_image: /assets/images/header-1.svg
---

Tokyo Night started life as a Neovim colorscheme, but its restrained blues, magentas, and
desaturated backgrounds make it a natural fit for the web too. In this post we look at how the
**night** and **day** variants map onto a typical content site.

## Why it works for reading

Long-form reading needs enough contrast to be legible, but not so much that a full page of text
turns into a strobe light. Tokyo Night's `fg` (`#c0caf5`) against `bg` (`#1a1b26`) sits at a
comfortable contrast ratio, while the day variant's `foreground` (`#3760bf`) against
`background` (`#e1e2e7`) does the same job for daylight reading.

## Accent colors as signal, not noise

Instead of throwing a rainbow at every tag and button, Tokyo Night gives us a small rotating set:
blue, magenta, green, orange, and red. That's exactly enough to color-code tags, categories, and
notices without turning the page into confetti.

> Good theme design is mostly restraint — pick five colors and use them consistently everywhere.

We'll dig into implementation details (CSS custom properties, `data-theme` attributes, and
`localStorage` persistence) in a follow-up post.
