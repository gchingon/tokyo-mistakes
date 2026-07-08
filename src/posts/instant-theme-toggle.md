---
title: "Building an Instant Theme Toggle With CSS Custom Properties"
date: 2026-01-19
excerpt: "No rebuild, no flash of the wrong theme — just data-theme, custom properties, and a tiny inline script."
tags: ["css", "javascript", "eleventy"]
categories: ["Engineering"]
header_image: /assets/images/header-3.svg
---

The classic problem with dark/light toggles on static sites is the "flash of wrong theme" — the
page renders in the default color scheme for a split second before JavaScript catches up and
applies the user's saved preference.

## The fix: an inline script in `<head>`

Before any CSS or JS bundle loads, a tiny inline script reads `localStorage.theme-pref` and sets
`data-theme` on `<html>` synchronously:

```html
<script>
  var pref = localStorage.getItem("theme-pref") || "auto";
  var resolved = pref === "auto"
    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day")
    : pref;
  document.documentElement.setAttribute("data-theme", resolved);
</script>
```

## The CSS side

```css
:root { /* day values, the light-first default */ }
:root[data-theme="night"] { /* dark overrides */ }
:root[data-theme="day"] { /* explicit light overrides */ }
```

Because everything is a custom property, toggling `data-theme` on the client is instant — no
network request, no rebuild, no flash. It's essentially the same trick GitHub and Discord use for
their own theme switches, just scoped to two skins named after the Tokyo Night variants.
