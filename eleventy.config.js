const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const readingTime = require("reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.setServerPassthroughCopyBehavior("copy");

  // Markdown-it with anchor links (for TOC)
  const md = markdownIt({ html: true, breaks: false, linkify: true }).use(
    markdownItAnchor,
    {
      permalink: markdownItAnchor.permalink.headerLink(),
      slugify: (s) =>
        String(s)
          .trim()
          .toLowerCase()
          .replace(/[^\w]+/g, "-"),
    }
  );
  eleventyConfig.setLibrary("md", md);

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat(
      "LLL dd, yyyy"
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat(
      "yyyy-LL-dd"
    );
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    if (!content) return "1 min read";
    const stats = readingTime(content);
    return `${Math.max(1, Math.ceil(stats.minutes))} min read`;
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) return [];
    if (n < 0) return array.slice(n);
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("where_exp_tag", (posts, tag) => {
    return (posts || []).filter(
      (p) => p.data.tags && p.data.tags.includes(tag)
    );
  });

  eleventyConfig.addFilter("jsonify", (obj) => JSON.stringify(obj));

  // Extract a simple TOC (h2/h3 with ids) from rendered HTML content
  eleventyConfig.addFilter("toc", (html) => {
    if (!html) return [];
    const headingRegex = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/gi;
    const toc = [];
    let match;
    while ((match = headingRegex.exec(html))) {
      const level = parseInt(match[1], 10);
      const id = match[2];
      const text = match[3].replace(/<[^>]+>/g, "").trim();
      toc.push({ level, id, text });
    }
    return toc;
  });

  // Strip HTML tags -> plain text excerpt
  eleventyConfig.addFilter("stripTags", (html) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  });

  eleventyConfig.addFilter("slugify", (str) =>
    String(str)
      .trim()
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
  );

  eleventyConfig.addFilter("plus", (a, b) => Number(a) + Number(b));

  // Group posts by a taxonomy field (tags/categories) into [{name, slug, posts}]
  eleventyConfig.addFilter("groupByTaxonomy", (posts, field) => {
    const slugify = (s) =>
      String(s)
        .trim()
        .toLowerCase()
        .replace(/[^\w]+/g, "-");
    const map = new Map();
    (posts || []).forEach((post) => {
      const values = post.data[field] || [];
      values.forEach((val) => {
        const slug = slugify(val);
        if (!map.has(slug)) {
          map.set(slug, { name: val, slug, posts: [] });
        }
        map.get(slug).posts.push(post);
      });
    });
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  });

  // Collections
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tagSet = new Set();
    collectionApi.getFilteredByGlob("src/posts/*.md").forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return [...tagSet].sort();
  });

  eleventyConfig.addCollection("categoryList", (collectionApi) => {
    const catSet = new Set();
    collectionApi.getFilteredByGlob("src/posts/*.md").forEach((item) => {
      (item.data.categories || []).forEach((cat) => catSet.add(cat));
    });
    return [...catSet].sort();
  });

  // Related posts by shared tags
  eleventyConfig.addFilter("relatedPosts", (posts, currentPost, limit = 3) => {
    if (!currentPost || !currentPost.data || !currentPost.data.tags)
      return [];
    const currentTags = currentPost.data.tags;
    const scored = (posts || [])
      .filter((p) => p.url !== currentPost.url)
      .map((p) => {
        const tags = p.data.tags || [];
        const shared = tags.filter((t) => currentTags.includes(t)).length;
        return { post: p, shared };
      })
      .filter((x) => x.shared > 0)
      .sort((a, b) => b.shared - a.shared)
      .slice(0, limit)
      .map((x) => x.post);
    return scored;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
