(() => {
  "use strict";

  const mount = document.querySelector("[data-weekly-analysis]");
  if (!mount) return;

  const catalog = window.AI_NEWS_CATALOG || {};
  const analyses = catalog.weeklyAnalyses || [];

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const periodLabel = (dates = []) => {
    if (dates.length !== 2) return "";
    const start = new Date(`${dates[0]}T12:00:00`);
    const end = new Date(`${dates[1]}T12:00:00`);
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(start);
    return `${month} ${start.getDate()}–${end.getDate()}, ${end.getFullYear()}`;
  };

  const sourceMap = (analysis) => new Map((analysis.sources || []).map((source) => [source.id, source]));

  const renderSources = (ids, sources) => {
    const items = (ids || []).map((id) => sources.get(id)).filter(Boolean);
    if (!items.length) return "";
    return `
      <details class="weekly-claim__details">
        <summary>Sources</summary>
        <ul>
          ${items.map((source) => `
            <li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.name)} <span aria-hidden="true">↗</span></a></li>`).join("")}
        </ul>
      </details>`;
  };

  const renderClaim = (claim, sources) => `
    <article class="weekly-claim">
      <div class="weekly-claim__heading">
        <div>
          <h2>${escapeHtml(claim.claim)}</h2>
          <p class="weekly-claim__scope">${escapeHtml(claim.scope)}</p>
        </div>
        <span class="weekly-claim__confidence">${escapeHtml(claim.confidence)}</span>
      </div>

      <div class="weekly-horizons" aria-label="Evidence by time horizon">
        <section>
          <h3>This week</h3>
          <p>${escapeHtml(claim.this_week)}</p>
        </section>
        <section>
          <h3>Short term</h3>
          <p>${escapeHtml(claim.near_term)}</p>
        </section>
        <section>
          <h3>Medium to long term</h3>
          <p>${escapeHtml(claim.structural)}</p>
        </section>
        <section>
          <h3>Longer-run baseline</h3>
          <p>${escapeHtml(claim.long_run)}</p>
        </section>
      </div>

      <div class="weekly-claim__review">
        <div>
          <h3>Interpretation</h3>
          <p>${escapeHtml(claim.interpretation)}</p>
        </div>
        <details class="weekly-claim__details">
          <summary>Counterevidence and limitations</summary>
          <p>${escapeHtml(claim.counterevidence)}</p>
        </details>
        <div>
          <h3>What would change this view?</h3>
          <p>${escapeHtml(claim.what_would_change)}</p>
        </div>
        ${renderSources(claim.evidence, sources)}
      </div>
    </article>`;

  const renderAnalysis = (analysis) => {
    const sources = sourceMap(analysis);
    const currentPeriod = periodLabel(analysis.period?.current);
    const visibleTabs = (analysis.tabs || []).filter((tab) => tab.id !== "hiring");

    document.title = `${analysis.title} · ${currentPeriod} | UGA LLM Lab`;
    mount.innerHTML = `
      <article class="weekly-analysis">
        <header class="weekly-analysis__header">
          <p class="weekly-analysis__eyebrow">UGA LLM Lab · WEEKLY IN-DEPTH ANALYSIS</p>
          <h1>${escapeHtml(analysis.title)}</h1>
          <p class="weekly-analysis__dek">${escapeHtml(analysis.synthesis)}</p>
        </header>

        <nav class="weekly-analysis__tabs" role="tablist" aria-label="Weekly in-depth analysis sections">
          ${visibleTabs.map((tab, index) => `
            <button type="button" role="tab" id="weekly-tab-${escapeHtml(tab.id)}" aria-controls="weekly-panel-${escapeHtml(tab.id)}" aria-selected="${index === 0}">${escapeHtml(tab.label)}</button>`).join("")}
        </nav>

        <div class="weekly-analysis__panels">
          ${visibleTabs.map((tab, index) => `
            <section role="tabpanel" id="weekly-panel-${escapeHtml(tab.id)}" aria-labelledby="weekly-tab-${escapeHtml(tab.id)}"${index === 0 ? "" : " hidden"}>
              ${(tab.claims || []).map((claim) => renderClaim(claim, sources)).join("")}
            </section>`).join("")}
        </div>

        <footer class="weekly-analysis__footer">
          <p>${escapeHtml(analysis.methodology_note || "Internal monitoring and the cited sources support this week's analysis.")}</p>
          <a href="ai-news.html">Return to AI News <span aria-hidden="true">→</span></a>
        </footer>
      </article>`;

    const tabs = [...mount.querySelectorAll('[role="tab"]')];
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        document.getElementById(item.getAttribute("aria-controls")).hidden = !selected;
      });
    }));

    const requestedTab = new URLSearchParams(window.location.search).get("tab");
    const requestedButton = requestedTab && mount.querySelector(`#weekly-tab-${CSS.escape(requestedTab)}`);
    if (requestedButton) requestedButton.click();
  };

  const init = async () => {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("week");
    const entry = analyses.find((item) => item.id === requestedId) || analyses[0];

    if (!entry) {
      mount.innerHTML = '<p class="ai-news-loading">No weekly in-depth analysis is available yet.</p>';
      return;
    }

    try {
      const response = await fetch(entry.data);
      if (!response.ok) throw new Error(`Unable to load ${entry.data}`);
      const analysis = await response.json();
      renderAnalysis(analysis);
    } catch (error) {
      console.error(error);
      mount.innerHTML = '<p class="ai-news-loading" role="alert">Weekly in-depth analysis could not be loaded. Please try again later.</p>';
    }
  };

  init();
})();
