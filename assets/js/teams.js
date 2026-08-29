(() => {
  "use strict";

  const directory = document.querySelector("[data-team-directory]");
  const status = document.querySelector("[data-team-status]");
  const count = document.querySelector("[data-team-count]");
  if (!directory || !status || !count) return;

  const repositoryApi = "https://api.github.com/repos/UGA-LLM-Lab/uga-llm-lab.github.io/contents/startup/teams";

  const getMeta = (documentNode, name) =>
    documentNode.head.querySelector(`meta[name="${name}"]`)?.content.trim() || "";

  async function readProfile(file) {
    if (file.type !== "file" || !file.name.toLowerCase().endsWith(".html")) return null;

    const response = await fetch(file.download_url, { headers: { Accept: "text/html" } });
    if (!response.ok) throw new Error(`Could not read ${file.name}`);

    const source = await response.text();
    const documentNode = new DOMParser().parseFromString(source, "text/html");
    if (getMeta(documentNode, "team-directory").toLowerCase() !== "profile") return null;

    const title = getMeta(documentNode, "team-title");
    const name = getMeta(documentNode, "team-name");
    const bio = getMeta(documentNode, "team-bio");
    const idea = getMeta(documentNode, "team-idea");
    if (!title || !name || !bio || !idea) return null;

    return {
      title,
      name,
      role: getMeta(documentNode, "team-role"),
      bio,
      idea,
      lookingFor: getMeta(documentNode, "team-looking-for"),
      location: getMeta(documentNode, "team-location"),
      entryTerm: getMeta(documentNode, "team-entry-term"),
      stage: getMeta(documentNode, "team-stage"),
      url: `startup/teams/${encodeURIComponent(file.name)}`
    };
  }

  function addDefinition(list, term, description) {
    if (!description) return;
    const row = document.createElement("div");
    const label = document.createElement("dt");
    const value = document.createElement("dd");
    label.textContent = term;
    value.textContent = description;
    row.append(label, value);
    list.append(row);
  }

  function renderProfile(profile) {
    const card = document.createElement("article");
    card.className = "team-card";
    card.setAttribute("data-reveal", "");

    const heading = document.createElement("div");
    heading.className = "team-card__heading";
    const title = document.createElement("h2");
    title.textContent = profile.title;
    heading.append(title);

    const context = [`Proposed by ${profile.name}`, profile.location].filter(Boolean).join(" · ");
    if (context) {
      const meta = document.createElement("p");
      meta.textContent = context;
      heading.append(meta);
    }

    if (profile.stage) {
      const stage = document.createElement("span");
      stage.className = "team-card__stage";
      stage.textContent = profile.stage;
      heading.append(stage);
    }

    const bio = document.createElement("p");
    bio.className = "team-card__bio";
    bio.textContent = profile.idea;

    const details = document.createElement("dl");
    addDefinition(details, "Proposer", [profile.role, profile.entryTerm].filter(Boolean).join(" · "));
    addDefinition(details, "Background", profile.bio);
    addDefinition(details, "Looking for", profile.lookingFor);

    const link = document.createElement("a");
    link.className = "opportunity-action";
    link.href = profile.url;
    link.innerHTML = 'View profile <span aria-hidden="true">→</span>';

    card.append(heading, bio);
    if (details.children.length) card.append(details);
    card.append(link);
    directory.append(card);
  }

  async function loadDirectory() {
    try {
      const response = await fetch(repositoryApi, {
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!response.ok) throw new Error("Directory request failed");

      const files = await response.json();
      const profiles = (await Promise.all(files.map(readProfile)))
        .filter(Boolean)
        .sort((a, b) => a.title.localeCompare(b.title));

      count.textContent = profiles.length ? `${profiles.length} ${profiles.length === 1 ? "listing" : "listings"}` : "";
      status.textContent = profiles.length
        ? ""
        : "No public team listings are available yet. Use the Founder Profile template to publish the first one.";
      status.hidden = profiles.length > 0;
      profiles.forEach(renderProfile);

      directory.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
    } catch (error) {
      count.textContent = "";
      status.hidden = false;
      status.textContent = "The team directory is temporarily unavailable. You can still use the Founder Profile template and follow the submission instructions.";
    }
  }

  loadDirectory();
})();
