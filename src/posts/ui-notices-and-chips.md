---
title: "Notices, Chips, and Buttons: Mapping MM's UI Kit to Tokyo Night"
date: 2026-02-02
excerpt: "Success, warning, danger, and info notices — plus tag chips and buttons — all recolored with the Tokyo Night accent set."
tags: ["design", "css", "components"]
categories: ["Design"]
header_image: /assets/images/header-5.svg
---

Minimal Mistakes includes a small set of "notice" boxes for calling out important information —
`.notice--success`, `.notice--warning`, `.notice--danger`, and `.notice--info`. This theme keeps
the same class names but recolors them using Tokyo Night's semantic-ish colors.

<div class="notice notice--success"><strong>Success:</strong> uses <code>green</code> — <code>#9ece6a</code> at night, <code>#587539</code> by day.</div>

<div class="notice notice--warning"><strong>Warning:</strong> uses <code>yellow</code> — <code>#e0af68</code> at night, <code>#8c6c3e</code> by day.</div>

<div class="notice notice--danger"><strong>Danger:</strong> uses <code>red</code> — <code>#f7768e</code> at night, <code>#f52a65</code> by day.</div>

<div class="notice notice--info"><strong>Info:</strong> uses <code>blue</code> — <code>#7aa2f7</code> at night, <code>#2e7de9</code> by day.</div>

## Tag chips

Tags and categories rotate through five accent colors — magenta, green, orange, red, and blue —
so a post with several tags reads as a small, colorful (but not chaotic) set of pills, same as
Minimal Mistakes' tag list but without a Sass color-skin rebuild.
