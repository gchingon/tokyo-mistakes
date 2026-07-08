---
title: "Porting Jekyll Layouts to Eleventy, Include by Include"
date: 2026-01-12
excerpt: "Minimal Mistakes has a rich set of Liquid includes. Here's how each one maps onto an Eleventy/Nunjucks partial."
tags: ["eleventy", "jekyll", "static-sites"]
categories: ["Engineering"]
header_image: /assets/images/header-2.svg
---

Jekyll's Minimal Mistakes theme leans heavily on `_includes/` — small Liquid partials for post
meta, breadcrumbs, author sidebars, and pagination. Eleventy's Nunjucks engine has a nearly
1-to-1 equivalent in `{% raw %}{% include %}{% endraw %}`, which made this port pretty mechanical.

## Mapping table

| Minimal Mistakes | Eleventy equivalent |
| --- | --- |
| `_layouts/default.html` | `layouts/default.njk` |
| `_layouts/single.html` | `layouts/single.njk` |
| `_layouts/archive.html` | `layouts/archive-grid.njk` / `archive-taxonomy.njk` |
| `_layouts/splash.html` | `layouts/splash.njk` |
| `_includes/author-profile.html` | `partials/author-profile.njk` |
| `_includes/breadcrumbs.html` | `partials/breadcrumbs.njk` |
| `_includes/page__meta.html` | `partials/post-meta.njk` |
| `_includes/toc.html` | `partials/toc.njk` + a `toc` filter |
| `_data/navigation.yml` | `_data/navigation.json` |

## Where it diverges

Jekyll's Sass-based skins compile a *specific* color skin at build time — switching skins means
rebuilding the site. This theme instead keeps a single stylesheet with CSS custom properties for
both `night` and `day`, so switching is instant and client-side.

```njk
{% raw %}{% include "partials/post-meta.njk" %}{% endraw %}
```

That one include gives us the date, author, reading time, and tag/category chips in a single line,
same as Minimal Mistakes' `page__meta` partial.
