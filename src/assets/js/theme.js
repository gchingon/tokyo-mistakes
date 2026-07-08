(function () {
  function getPreferred() {
    var stored = localStorage.getItem("theme-pref");
    return stored || "auto";
  }

  function resolveTheme(pref) {
    if (pref === "night" || pref === "day") return pref;
    var prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "night" : "day";
  }

  function apply(pref) {
    var resolved = resolveTheme(pref);
    document.documentElement.setAttribute("data-theme", resolved);
    document.documentElement.setAttribute("data-theme-pref", pref);
  }

  window.TokyoMistakesTheme = {
    get: getPreferred,
    set: function (pref) {
      localStorage.setItem("theme-pref", pref);
      apply(pref);
    },
    cycle: function () {
      var current = getPreferred();
      var resolved = resolveTheme(current);
      var next = resolved === "night" ? "day" : "night";
      window.TokyoMistakesTheme.set(next);
      return next;
    },
    apply: apply,
    resolve: resolveTheme,
  };

  // Keep in sync with OS changes while pref === auto
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function () {
        if (getPreferred() === "auto") {
          apply("auto");
        }
      });
  }
})();
