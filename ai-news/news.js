(() => {
  "use strict";

  const catalog = window.AI_NEWS_CATALOG || { months: [] };
  const monthStore = window.AI_NEWS_MONTH_DATA = window.AI_NEWS_MONTH_DATA || {};
  const PAGE_SIZE = 50;
  const monthRequests = new Map();

  const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unable to load ${url}`);
    return response.json();
  };

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const externalAttributes = (url = "") => /^https?:/i.test(url)
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";

  const articleHref = (article) => {
    const month = encodeURIComponent(article.monthId);
    const slug = encodeURIComponent(article.slug);
    return `ai-news-article.html?month=${month}&amp;slug=${slug}`;
  };

  const loadMonth = (month) => {
    if (monthStore[month.id]) return Promise.resolve();
    if (monthRequests.has(month.id)) return monthRequests.get(month.id);

    const request = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = month.data;
      script.onload = () => {
        if (!monthStore[month.id]?.articles) {
          reject(new Error(`No articles found in ${month.data}`));
          return;
        }
        resolve();
      };
      script.onerror = () => reject(new Error(`Unable to load ${month.data}`));
      document.head.appendChild(script);
    }).catch((error) => {
      monthRequests.delete(month.id);
      throw error;
    });
    monthRequests.set(month.id, request);
    return request;
  };

  const compareArticles = (a, b) => {
    const pinnedDifference = Number(Boolean(b.pinned)) - Number(Boolean(a.pinned));
    return pinnedDifference || b.sortDate.localeCompare(a.sortDate);
  };

  const getArticles = () => catalog.months.flatMap((month) => {
    const monthData = monthStore[month.id];
    if (!monthData?.articles) return [];
    return monthData.articles.filter((article) => !article.hidden).map((article) => ({
      ...article,
      monthId: month.id,
      monthLabel: month.label
    }));
  }).sort(compareArticles);

  const articleMeta = (article) => `
    <div class="ai-news-meta">
      <time datetime="${escapeHtml(article.sortDate)}">${escapeHtml(article.dateLabel)}</time>
    </div>`;

  const articleImage = (article, eager = false) => article.image ? `
    <img src="${escapeHtml(article.image.src)}" alt="${escapeHtml(article.image.alt || "")}"${eager ? "" : ' loading="lazy"'}>` : "";

  const articleCard = (article) => `
    <article class="ai-news-card${article.image ? "" : " ai-news-card--text"}">
      ${article.image ? `
        <a class="ai-news-card__image" href="${articleHref(article)}" aria-label="Read ${escapeHtml(article.title)}">
          ${articleImage(article)}
        </a>` : ""}
      <div class="ai-news-card__body">
        ${articleMeta(article)}
        <h3><a href="${articleHref(article)}">${escapeHtml(article.title)}</a></h3>
        <p>${escapeHtml(article.summary)}</p>
        <a class="ai-news-read" href="${articleHref(article)}">Read article <span aria-hidden="true">→</span></a>
      </div>
    </article>`;

  const renderWeeklyAnalysis = (articles) => {
    const feature = window.AI_NEWS_WEEKLY_FEATURE;
    const entry = catalog.weeklyAnalyses?.find((item) => item.id === feature?.analysisId)
      || catalog.weeklyAnalyses?.[0];
    if (!feature || !entry) return "";

    const analysisHref = `ai-weekly-analysis.html?week=${encodeURIComponent(entry.id)}`;
    const review = articles.find((article) => article.slug === entry.reviewSlug);
    const previous = articles
      .filter((article) => article.category.startsWith("AI Weekly") && article.slug !== entry.reviewSlug)
      .slice(0, 2);

    return `
      <section class="ai-news-weekly" data-ai-news-weekly aria-labelledby="ai-news-weekly-title">
        <div class="ai-news-weekly__heading">
          <div>
            <p>WEEKLY IN-DEPTH ANALYSIS</p>
            <h2 id="ai-news-weekly-title">A closer view of the week in AI</h2>
          </div>
          <span>${escapeHtml(entry.label)}</span>
        </div>

        <div class="ai-news-weekly__feature">
          <a class="ai-news-weekly__visual" href="${analysisHref}" aria-label="Open ${escapeHtml(feature.title)}">
            <img src="${escapeHtml(entry.cover)}" alt="${escapeHtml(feature.coverAlt || "")}" loading="lazy">
          </a>

          <div class="ai-news-weekly__body">
            <p class="ai-news-weekly__kicker">Analysis · Research · Industry</p>
            <h2><a href="${analysisHref}">${escapeHtml(feature.title)}</a></h2>
            <p>${escapeHtml(feature.summary)}</p>
            <dl class="ai-news-weekly__metrics">
              ${feature.metrics.map((metric) => `
                <div>
                  <dt>${escapeHtml(metric.value)}</dt>
                  <dd>${escapeHtml(metric.label)}</dd>
                </div>`).join("")}
            </dl>
            <div class="ai-news-weekly__actions">
              <a class="button" href="${analysisHref}">Explore Weekly In-Depth Analysis</a>
              ${review ? `<a href="${articleHref(review)}">Read the week in review <span aria-hidden="true">→</span></a>` : ""}
            </div>
          </div>
        </div>

        ${previous.length ? `
          <div class="ai-news-weekly__previous">
            <strong>Previous weekly reports</strong>
            ${previous.map((article) => `<a href="${articleHref(article)}">${escapeHtml(article.dateLabel)} <span aria-hidden="true">→</span></a>`).join("")}
          </div>` : ""}
      </section>`;
  };

  const normalizeSearchValue = (value = "") => String(value)
    .toLocaleLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

  const searchRank = (article, query) => {
    const normalizedQuery = normalizeSearchValue(query);
    if (!normalizedQuery) return 0;

    const terms = normalizedQuery.split(/\s+/).filter(Boolean);
    const title = normalizeSearchValue(article.title);
    const content = normalizeSearchValue([
      article.summary,
      article.category,
      ...article.content.map((block) => block.text || block.caption || "")
    ].join(" "));

    if (title === normalizedQuery) return 0;
    if (title.startsWith(normalizedQuery)) return 1;
    if (title.includes(normalizedQuery)) return 2;
    if (terms.every((term) => title.includes(term))) return 3;
    if (content.includes(normalizedQuery)) return 4;
    if (terms.every((term) => content.includes(term))) return 5;
    return null;
  };

  const searchArticles = (articles, query) => articles
    .map((article) => ({ article, rank: searchRank(article, query) }))
    .filter((result) => result.rank !== null)
    .sort((a, b) => a.rank - b.rank || compareArticles(a.article, b.article))
    .map((result) => result.article);

  const renderAttention = () => {
    const trends = window.AI_NEWS_TRENDS;
    if (!trends?.items?.length) return "";

    return `
      <aside class="ai-news-attention" aria-labelledby="ai-news-attention-title">
        <div class="ai-news-attention__heading">
          <p>Heat</p>
          <h2 id="ai-news-attention-title">${escapeHtml(trends.title)}</h2>
          <span>${escapeHtml(trends.period)}</span>
        </div>
        <ol class="ai-news-attention__list">
          ${trends.items.map((item) => {
            const width = Math.max(4, Math.min(100, (Number(item.index) / 160) * 100));
            const direction = item.direction === "up" ? "↑" : item.direction === "down" ? "↓" : "→";
            return `
              <li>
                <div class="ai-news-attention__label">
                  <span>${escapeHtml(item.label)}</span>
                  <strong class="is-${escapeHtml(item.direction)}">${escapeHtml(item.index)} ${direction}</strong>
                </div>
                <div class="ai-news-attention__track" aria-hidden="true">
                  <span style="width: ${width.toFixed(1)}%"></span>
                  <i></i>
                </div>
                <small>${escapeHtml(item.share.toFixed(1))}% of sampled papers</small>
              </li>`;
          }).join("")}
        </ol>
        <p class="ai-news-attention__note">${escapeHtml(trends.note)}</p>
        <p class="ai-news-attention__comparison">${escapeHtml(trends.comparison)} · Updated ${escapeHtml(trends.updated)}</p>
      </aside>`;
  };

  const renderArchive = (mount, articles, {
    query = "", total = articles.length, more = false, loading = false, error = ""
  } = {}) => {
    const normalizedQuery = normalizeSearchValue(query);
    const archiveByMonth = catalog.months.map((month) => ({
      ...month,
      articles: articles.filter((article) => article.monthId === month.id)
    })).filter((month) => month.articles.length);
    mount.innerHTML = `
      <section class="ai-news-archive" aria-labelledby="ai-news-archive-title">
        <div class="section-bar">
          <h2 id="ai-news-archive-title">${normalizedQuery ? "Search results" : "Archive"}</h2>
          <span>${total} ${total === 1 ? "article" : "articles"}</span>
        </div>
        ${normalizedQuery ? (articles.length
          ? `<div class="ai-news-list ai-news-search-results">${articles.map(articleCard).join("")}</div>`
          : '<p class="ai-news-empty">No articles match these keywords.</p>')
          : archiveByMonth.map((month) => `
          <section class="ai-news-month" aria-labelledby="ai-news-month-${escapeHtml(month.id)}">
            <h2 id="ai-news-month-${escapeHtml(month.id)}">${escapeHtml(month.label)}</h2>
            <div class="ai-news-list">${month.articles.map(articleCard).join("")}</div>
          </section>`).join("")}
        <div class="ai-news-pagination">
          ${more ? `<button class="button button--outline" type="button" data-ai-news-more${loading ? " disabled" : ""}>${loading ? "Loading..." : "Load more"}</button>` : ""}
          <p role="status">Showing ${articles.length} of ${total} ${total === 1 ? "article" : "articles"}</p>
          ${error ? `<p role="alert">${escapeHtml(error)}</p>` : ""}
        </div>
      </section>`;
  };

  const renderIndex = (index, firstPage) => {
    const mount = document.querySelector("[data-ai-news-index]");
    if (!mount) return;

    const archiveArticles = [...firstPage.articles];
    let nextPage = 1;
    let loadingPage = false;
    let pageError = "";
    let searchResults = [];
    let searchLimit = PAGE_SIZE;
    let searchVersion = 0;
    let searchTimer;

    mount.innerHTML = `
      <header class="page-heading ai-news-heading">
        <h1>AI/SI News</h1>
        <p>Selected developments in artificial intelligence, from timely reporting to in-depth analysis. SI stands for Super Intelligence, the terminology adopted for AI in U.S. executive-branch communications under a September 2026 executive order. <a href="https://www.whitehouse.gov/fact-sheets/2026/09/fact-sheet-president-donald-j-trump-inaugurates-the-era-of-super-intelligence/" target="_blank" rel="noopener noreferrer">White House fact sheet <span aria-hidden="true">↗</span></a></p>
      </header>

      <details class="ai-news-search">
        <summary>Search AI/SI News</summary>
        <form class="ai-news-search__form" role="search">
          <label class="sr-only" for="ai-news-search-input">Search titles and article content</label>
          <div class="ai-news-search__control">
            <input id="ai-news-search-input" type="search" placeholder="Search titles and article content" autocomplete="off">
            <span data-ai-news-search-status aria-live="polite">${index.total} articles</span>
          </div>
        </form>
      </details>

      ${renderWeeklyAnalysis(index.weekly || [])}

      <div class="ai-news-index-layout">
        <div data-ai-news-archive></div>
        ${renderAttention()}
      </div>`;

    const archiveMount = mount.querySelector("[data-ai-news-archive]");
    const searchDetails = mount.querySelector(".ai-news-search");
    const searchForm = mount.querySelector(".ai-news-search__form");
    const searchInput = mount.querySelector("#ai-news-search-input");
    const searchStatus = mount.querySelector("[data-ai-news-search-status]");
    const weeklySection = mount.querySelector("[data-ai-news-weekly]");

    const showArchive = () => renderArchive(archiveMount, archiveArticles, {
      total: index.total,
      more: nextPage < index.pages.length,
      loading: loadingPage,
      error: pageError
    });

    const showSearch = () => renderArchive(archiveMount, searchResults.slice(0, searchLimit), {
      query: searchInput.value,
      total: searchResults.length,
      more: searchLimit < searchResults.length
    });

    const runSearch = async (query, version) => {
      try {
        // Download article bodies only when a reader searches the full archive.
        await Promise.all(catalog.months.map(loadMonth));
        if (version !== searchVersion) return;
        searchResults = searchArticles(getArticles(), query);
        searchLimit = PAGE_SIZE;
        showSearch();
        searchStatus.textContent = `${searchResults.length} ${searchResults.length === 1 ? "article" : "articles"}`;
      } catch (error) {
        if (version !== searchVersion) return;
        console.error(error);
        searchStatus.textContent = "Search unavailable";
        archiveMount.innerHTML = '<p class="ai-news-empty" role="alert">Search could not be loaded. <button class="button button--outline" type="button" data-ai-news-retry-search>Retry search</button></p>';
      }
    };

    const updateSearch = (immediate = false) => {
      clearTimeout(searchTimer);
      const query = searchInput.value;
      const version = ++searchVersion;
      const hasQuery = Boolean(normalizeSearchValue(query));
      if (weeklySection) weeklySection.hidden = hasQuery;
      if (!hasQuery) {
        showArchive();
        searchStatus.textContent = `${index.total} articles`;
        return;
      }
      searchStatus.textContent = "Searching...";
      archiveMount.innerHTML = '<p class="ai-news-empty" role="status">Searching all news...</p>';
      searchTimer = setTimeout(() => runSearch(query, version), immediate ? 0 : 250);
    };

    showArchive();
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      updateSearch(true);
    });
    searchInput.addEventListener("input", () => updateSearch());
    archiveMount.addEventListener("click", async (event) => {
      if (event.target.closest("[data-ai-news-retry-search]")) {
        updateSearch(true);
        return;
      }
      if (!event.target.closest("[data-ai-news-more]")) return;
      if (normalizeSearchValue(searchInput.value)) {
        searchLimit += PAGE_SIZE;
        showSearch();
        return;
      }
      if (loadingPage || nextPage >= index.pages.length) return;

      loadingPage = true;
      pageError = "";
      showArchive();
      try {
        // Each request contains at most 50 summaries; later pages are not prefetched.
        const page = await fetchJson(index.pages[nextPage]);
        archiveArticles.push(...page.articles);
        nextPage += 1;
      } catch (error) {
        console.error(error);
        pageError = "More news could not be loaded. Click Load more to retry.";
      } finally {
        loadingPage = false;
        if (!normalizeSearchValue(searchInput.value)) showArchive();
      }
    });
    searchDetails.addEventListener("toggle", () => {
      if (searchDetails.open) {
        searchInput.focus();
        return;
      }

      if (searchInput.value) {
        searchInput.value = "";
        updateSearch();
      }
    });
  };

  const renderContentBlock = (block) => {
    if (block.type === "heading") {
      return `<h2>${escapeHtml(block.text)}</h2>`;
    }

    if (block.type === "figure") {
      return `
        <figure>
          <a class="ai-news-figure-link" href="${escapeHtml(block.src)}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image">
            <img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt || "")}" loading="lazy">
          </a>
          ${block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ""}
        </figure>`;
    }

    return `<p>${escapeHtml(block.text)}</p>`;
  };

  const renderArticle = (articles) => {
    const mount = document.querySelector("[data-ai-news-article]");
    if (!mount) return;

    const params = new URLSearchParams(window.location.search);
    const monthId = params.get("month");
    const slug = params.get("slug");
    const article = articles.find((item) => item.monthId === monthId && item.slug === slug);

    if (!article) {
      document.title = "Article Not Found | UGA LLM Lab";
      mount.innerHTML = `
        <header class="page-heading">
          <h1>Article not found</h1>
          <p>The requested article is unavailable or its address has changed.</p>
        </header>
        <p class="ai-news-not-found"><a class="button" href="ai-news.html">Return to AI/SI News</a></p>`;
      return;
    }

    document.title = `${article.title} | AI/SI News | UGA LLM Lab`;
    const related = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

    mount.innerHTML = `
      <article class="ai-news-article">
        <header class="ai-news-article__header">
          ${articleMeta(article)}
          <h1>${escapeHtml(article.title)}</h1>
          <p class="ai-news-article__dek">${escapeHtml(article.summary)}</p>
        </header>

        ${article.image ? `
          <figure class="ai-news-article__hero">
            ${articleImage(article, true)}
            ${article.image.caption ? `<figcaption>${escapeHtml(article.image.caption)}</figcaption>` : ""}
          </figure>` : ""}

        <div class="ai-news-article__layout">
          <div class="ai-news-article__copy">
            ${article.content.map(renderContentBlock).join("")}
          </div>
          <aside class="ai-news-sources" aria-labelledby="ai-news-sources-title">
            <h2 id="ai-news-sources-title">Sources</h2>
            <ol>
              ${article.sources.map((source) => `
                <li><a href="${escapeHtml(source.url)}"${externalAttributes(source.url)}>${escapeHtml(source.label)} <span aria-hidden="true">↗</span></a></li>`).join("")}
            </ol>
          </aside>
        </div>
      </article>

      ${related.length ? `
        <section class="ai-news-related" aria-labelledby="ai-news-related-title">
          <div class="section-bar">
            <h2 id="ai-news-related-title">More AI/SI News</h2>
            <a href="ai-news.html">View all <span aria-hidden="true">→</span></a>
          </div>
          <div class="ai-news-list">${related.map(articleCard).join("")}</div>
        </section>` : ""}`;
  };

  const init = async () => {
    const indexMount = document.querySelector("[data-ai-news-index]");
    const articleMount = document.querySelector("[data-ai-news-article]");
    if (!indexMount && !articleMount) return;

    try {
      if (indexMount) {
        const index = await fetchJson(catalog.archive);
        const firstPage = index.pages.length
          ? await fetchJson(index.pages[0])
          : { articles: [] };
        renderIndex(index, firstPage);
      }
      if (articleMount) {
        const monthId = new URLSearchParams(window.location.search).get("month");
        const month = catalog.months.find((item) => item.id === monthId);
        if (month) await loadMonth(month);
        renderArticle(getArticles());
      }
    } catch (error) {
      console.error(error);
      const message = '<p class="ai-news-loading" role="alert">AI/SI News could not be loaded. Please try again later.</p>';
      if (indexMount) indexMount.innerHTML = message;
      if (articleMount) articleMount.innerHTML = message;
    }
  };

  init();
})();
