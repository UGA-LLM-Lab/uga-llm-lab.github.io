(() => {
  "use strict";

  const directory = document.querySelector("[data-venture-directory]");
  const status = document.querySelector("[data-venture-status]");
  const count = document.querySelector("[data-venture-count]");
  if (!directory || !status || !count) return;

  const repositoryApi = "https://api.github.com/repos/UGA-LLM-Lab/uga-llm-lab.github.io/contents/startup";
  const fallbackFiles = ["alavon.html", "rostudio.html"];
  const getMeta = (documentNode, name) =>
    documentNode.head.querySelector(`meta[name="${name}"]`)?.content.trim() || "";

  async function readVenture(file) {
    if (file.type && file.type !== "file") return null;
    if (!file.name.toLowerCase().endsWith(".html")) return null;

    const sourceUrl = file.download_url || `startup/${file.name}`;
    const response = await fetch(sourceUrl, { headers: { Accept: "text/html" } });
    if (!response.ok) throw new Error(`Could not read ${file.name}`);

    const source = await response.text();
    const documentNode = new DOMParser().parseFromString(source, "text/html");
    if (getMeta(documentNode, "venture-directory").toLowerCase() !== "profile") return null;

    const name = getMeta(documentNode, "venture-name");
    const bio = getMeta(documentNode, "venture-bio");
    if (!name || !bio) return null;

    return {
      name,
      bio,
      order: Number(getMeta(documentNode, "venture-order")) || 999,
      url: `startup/${encodeURIComponent(file.name)}`
    };
  }

  function renderVenture(venture) {
    const card = document.createElement("article");
    card.className = "opportunity-card";
    card.setAttribute("data-reveal", "");

    const heading = document.createElement("h2");
    heading.textContent = venture.name;
    const bio = document.createElement("p");
    bio.textContent = venture.bio;
    const link = document.createElement("a");
    link.className = "opportunity-action";
    link.href = venture.url;
    link.innerHTML = `Learn about ${venture.name} <span aria-hidden="true">→</span>`;

    card.append(heading, bio, link);
    directory.append(card);
  }

  async function getFiles() {
    try {
      const response = await fetch(repositoryApi, {
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!response.ok) throw new Error("Directory request failed");
      return await response.json();
    } catch (error) {
      return fallbackFiles.map((name) => ({ name, download_url: `startup/${name}` }));
    }
  }

  async function loadVentures() {
    try {
      const files = await getFiles();
      const ventures = (await Promise.all(files.map(readVenture)))
        .filter(Boolean)
        .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

      count.textContent = ventures.length ? `${ventures.length} ${ventures.length === 1 ? "venture" : "ventures"}` : "";
      status.textContent = ventures.length ? "" : "No student ventures are currently listed.";
      status.hidden = ventures.length > 0;
      ventures.forEach(renderVenture);
      directory.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
    } catch (error) {
      count.textContent = "";
      status.hidden = false;
      status.textContent = "Student venture profiles are temporarily unavailable.";
    }
  }

  loadVentures();
})();
