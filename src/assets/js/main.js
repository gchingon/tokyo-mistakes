document.addEventListener("DOMContentLoaded", function () {
  var toggleBtn = document.getElementById("theme-toggle-btn");
  if (toggleBtn) {
    updateToggleLabel();
    toggleBtn.addEventListener("click", function () {
      window.TokyoMistakesTheme.cycle();
      updateToggleLabel();
    });
  }

  function updateToggleLabel() {
    var resolved = window.TokyoMistakesTheme.resolve(
      window.TokyoMistakesTheme.get()
    );
    if (toggleBtn) {
      toggleBtn.textContent = resolved === "night" ? "☀ Day" : "🌙 Night";
      toggleBtn.setAttribute(
        "aria-label",
        "Switch to " + (resolved === "night" ? "day" : "night") + " theme"
      );
    }
  }

  // Search modal
  var searchToggle = document.getElementById("search-toggle-btn");
  var searchModal = document.getElementById("search-modal");
  var searchClose = document.getElementById("search-modal-close");
  var searchInput = document.getElementById("search-input");
  var searchResults = document.getElementById("search-results");
  var idx = null;
  var store = {};

  function openModal() {
    if (!searchModal) return;
    searchModal.classList.add("is-open");
    if (searchInput) searchInput.focus();
    loadIndex();
  }
  function closeModal() {
    if (!searchModal) return;
    searchModal.classList.remove("is-open");
  }

  if (searchToggle) searchToggle.addEventListener("click", openModal);
  if (searchClose) searchClose.addEventListener("click", closeModal);
  if (searchModal) {
    searchModal.addEventListener("click", function (e) {
      if (e.target === searchModal) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openModal();
    }
  });

  function loadIndex() {
    if (idx) return;
    fetch("/search-index.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        store = {};
        data.forEach(function (entry) {
          store[entry.id] = entry;
        });
        idx = lunr(function () {
          this.ref("id");
          this.field("title", { boost: 10 });
          this.field("tags", { boost: 5 });
          this.field("content");
          data.forEach(function (doc) {
            this.add(doc);
          }, this);
        });
      })
      .catch(function (err) {
        console.error("Search index failed to load", err);
      });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      runSearch(searchInput.value, searchResults);
    });
  }

  var searchPageInput = document.getElementById("search-page-input");
  var searchPageResults = document.getElementById("search-page-results");
  if (searchPageInput) {
    loadIndex();
    searchPageInput.addEventListener("input", function () {
      runSearch(searchPageInput.value, searchPageResults);
    });
  }

  function runSearch(query, resultsEl) {
    query = (query || "").trim();
    if (!resultsEl) return;
    if (!query || !idx) {
      resultsEl.innerHTML = "";
      return;
    }
    var results;
    try {
      results = idx.search(query + "*");
    } catch (e) {
      results = idx.search(query);
    }
    resultsEl.innerHTML = results
      .slice(0, 10)
      .map(function (r) {
        var doc = store[r.ref];
        if (!doc) return "";
        return (
          '<div class="search-result"><a href="' +
          doc.url +
          '">' +
          doc.title +
          "</a><p>" +
          (doc.excerpt || "") +
          "</p></div>"
        );
      })
      .join("");
    if (!results.length) {
      resultsEl.innerHTML =
        '<p class="search-empty">No results for "' + query + '"</p>';
    }
  }

  // Archive grid/list toggle
  var gridBtn = document.querySelector("[data-view-toggle='grid']");
  var listBtn = document.querySelector("[data-view-toggle='list']");
  var gridEl = document.querySelector(".entries-grid");
  var listEl = document.querySelector(".entries-list");

  function setView(view) {
    if (gridEl) gridEl.hidden = view !== "grid";
    if (listEl) listEl.hidden = view !== "list";
    if (gridBtn) gridBtn.classList.toggle("is-active", view === "grid");
    if (listBtn) listBtn.classList.toggle("is-active", view === "list");
  }
  if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", function () {
      setView("grid");
    });
    listBtn.addEventListener("click", function () {
      setView("list");
    });
    setView("grid");
  }
});
