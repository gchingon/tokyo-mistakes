class SearchIndex {
  data() {
    return {
      permalink: "/search-index.json",
      eleventyExcludeFromCollections: true,
    };
  }

  async render({ collections }) {
    const posts = (collections.posts || []).map((post, i) => {
      const plain = (post.templateContent || "").replace(/<[^>]+>/g, " ");
      return {
        id: i,
        title: post.data.title,
        url: post.url,
        tags: (post.data.tags || []).join(" "),
        content: plain,
        excerpt: plain.trim().slice(0, 160),
      };
    });
    return JSON.stringify(posts);
  }
}

module.exports = SearchIndex;
