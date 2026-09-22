(() => {
  "use strict";

  const catalog = window.AI_NEWS_CATALOG || { months: [] };
  const monthStore = window.AI_NEWS_MONTH_DATA = window.AI_NEWS_MONTH_DATA || {};

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

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = month.data;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Unable to load ${month.data}`));
      document.head.appendChild(script);
    });
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
      .filter((article) => article.category === "AI Weekly" && article.slug !== entry.reviewSlug)
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

  const renderArchive = (mount, articles, query = "") => {
    const normalizedQuery = normalizeSearchValue(query);
    const matches = normalizedQuery ? searchArticles(articles, query) : articles;
    const archiveByMonth = catalog.months.map((month) => ({
      ...month,
      articles: matches.filter((article) => article.monthId === month.id)
    })).filter((month) => month.articles.length);

    if (normalizedQuery) {
      mount.innerHTML = `
        <section class="ai-news-archive" aria-labelledby="ai-news-archive-title">
          <div class="section-bar">
            <h2 id="ai-news-archive-title">Search results</h2>
            <span>${matches.length} ${matches.length === 1 ? "article" : "articles"}</span>
          </div>
          ${matches.length
            ? `<div class="ai-news-list ai-news-search-results">${matches.map(articleCard).join("")}</div>`
            : '<p class="ai-news-empty">No articles match these keywords.</p>'}
        </section>`;
      return matches.length;
    }

    mount.innerHTML = `
      <section class="ai-news-archive" aria-labelledby="ai-news-archive-title">
        <div class="section-bar">
          <h2 id="ai-news-archive-title">Archive</h2>
          <span>${articles.length} ${articles.length === 1 ? "article" : "articles"}</span>
        </div>
        ${archiveByMonth.map((month) => `
          <section class="ai-news-month" aria-labelledby="ai-news-month-${escapeHtml(month.id)}">
            <h2 id="ai-news-month-${escapeHtml(month.id)}">${escapeHtml(month.label)}</h2>
            <div class="ai-news-list">${month.articles.map(articleCard).join("")}</div>
          </section>`).join("")}
      </section>`;
    return articles.length;
  };

  const renderIndex = (articles) => {
    const mount = document.querySelector("[data-ai-news-index]");
    if (!mount) return;

    if (!articles.length) {
      mount.innerHTML = '<p class="ai-news-loading">No AI news has been published yet.</p>';
      return;
    }

    const archiveArticles = articles;

    mount.innerHTML = `
      <header class="page-heading ai-news-heading">
        <h1>AI News</h1>
        <p>Selected developments in artificial intelligence, from timely reporting to in-depth analysis.</p>
      </header>

      <details class="ai-news-search">
        <summary>Search AI News</summary>
        <form class="ai-news-search__form" role="search">
          <label class="sr-only" for="ai-news-search-input">Search titles and article content</label>
          <div class="ai-news-search__control">
            <input id="ai-news-search-input" type="search" placeholder="Search titles and article content" autocomplete="off">
            <span data-ai-news-search-status aria-live="polite">${articles.length} articles</span>
          </div>
        </form>
      </details>

      ${renderWeeklyAnalysis(articles)}

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
    renderArchive(archiveMount, archiveArticles);

    searchForm.addEventListener("submit", (event) => event.preventDefault());
    searchInput.addEventListener("input", () => {
      const hasQuery = Boolean(normalizeSearchValue(searchInput.value));
      const count = renderArchive(
        archiveMount,
        hasQuery ? articles : archiveArticles,
        searchInput.value
      );
      if (weeklySection) weeklySection.hidden = hasQuery;
      searchStatus.textContent = `${count} ${count === 1 ? "article" : "articles"}`;
    });
    searchDetails.addEventListener("toggle", () => {
      if (searchDetails.open) {
        searchInput.focus();
        return;
      }

      if (searchInput.value) {
        searchInput.value = "";
        renderArchive(archiveMount, archiveArticles);
        if (weeklySection) weeklySection.hidden = false;
        searchStatus.textContent = `${articles.length} ${articles.length === 1 ? "article" : "articles"}`;
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
        <p class="ai-news-not-found"><a class="button" href="ai-news.html">Return to AI News</a></p>`;
      return;
    }

    document.title = `${article.title} | AI News | UGA LLM Lab`;
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
            <h2 id="ai-news-related-title">More AI News</h2>
            <a href="ai-news.html">View all <span aria-hidden="true">→</span></a>
          </div>
          <div class="ai-news-list">${related.map(articleCard).join("")}</div>
        </section>` : ""}`;
  };

  const init = async () => {
    const indexMount = document.querySelector("[data-ai-news-index]");
    const articleMount = document.querySelector("[data-ai-news-article]");
    if (!indexMount && !articleMount) return;

    const results = await Promise.allSettled(catalog.months.map(loadMonth));
    const articles = getArticles();

    if (!articles.length && results.some((result) => result.status === "rejected")) {
      const message = '<p class="ai-news-loading" role="alert">AI News could not be loaded. Please try again later.</p>';
      if (indexMount) indexMount.innerHTML = message;
      if (articleMount) articleMount.innerHTML = message;
      return;
    }

    renderIndex(articles);
    renderArticle(articles);
  };

  init();
})();
