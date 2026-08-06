(() => {
  "use strict";

  const data = window.LLM_LAB_DATA;
  if (!data) return;

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const externalAttributes = (url = "") => /^https?:/i.test(url)
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";

  const linkIcons = {
    website: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 4.5 6 4.5 9S15 18 12 21c-3-3-4.5-6-4.5-9S9 6 12 3Z"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12.5V17c3 2.2 7 2.2 10 0v-4.5M21 9v7"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 9.5V19M6.5 5.5v.1M11 19v-9.5M11 14c0-2.5 6-3 6 1v4"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9c0-1.1.1-1.5-.5-2.1 2.8-.3 5.8-1.4 5.8-6.2 0-1.4-.5-2.5-1.3-3.4.1-.3.6-1.6-.1-3.3 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C7.6 2.7 6.5 3.1 6.5 3.1c-.7 1.7-.2 3-.1 3.3A4.8 4.8 0 0 0 5 9.8c0 4.8 3 5.9 5.8 6.2-.5.5-.6 1.1-.6 2.1V22"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>'
  };

  const iconForLink = (label = "") => {
    const normalized = label.toLowerCase();
    if (normalized.includes("scholar")) return linkIcons.scholar;
    if (normalized.includes("linkedin")) return linkIcons.linkedin;
    if (normalized.includes("github")) return linkIcons.github;
    if (normalized.includes("email")) return linkIcons.email;
    return linkIcons.website;
  };

  function renderHeader() {
    const mount = document.querySelector("[data-site-header]");
    if (!mount) return;

    const currentPage = document.body.dataset.page || "home";
    const items = data.navigation.map((item) => {
      const active = item.id === currentPage || item.children?.some((child) => child.id === currentPage);
      const activeClass = active ? " is-active" : "";

      if (item.children) {
        const children = item.children.map((child) => `
          <li><a class="dropdown-link${child.id === currentPage ? " is-active" : ""}" href="${escapeHtml(child.href)}">${escapeHtml(child.label)}</a></li>`).join("");
        return `
          <li class="nav-item nav-item--dropdown${activeClass}">
            <button class="nav-link dropdown-toggle" type="button" aria-expanded="false">
              <span>${escapeHtml(item.label)}</span>
              <svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg>
            </button>
            <ul class="dropdown-menu">${children}</ul>
          </li>`;
      }

      const label = item.logo
        ? `<span class="nav-wordmark"><img src="${escapeHtml(item.logo)}" alt="${escapeHtml(item.label)}"></span>`
        : escapeHtml(item.label);
      return `<li class="nav-item${activeClass}"><a class="nav-link${item.logo ? " nav-link--wordmark" : ""}" href="${escapeHtml(item.href)}">${label}</a></li>`;
    }).join("");

    mount.innerHTML = `
      <a class="skip-link" href="#main-content">Skip to main content</a>
      <header class="site-header" data-header>
        <div class="brand-row shell">
          <a class="uga-brand" href="${escapeHtml(data.site.ugaUrl)}" target="_blank" rel="noopener noreferrer" aria-label="University of Georgia website">
            <img src="assets/images/uga-logo-transparent.png" alt="University of Georgia">
          </a>
          <div class="lab-brand">
            <a class="lab-brand__main" href="index.html">
              <img src="assets/images/lab-logo-placeholder.svg" alt="UGA LLM Lab logo placeholder">
              <span class="notranslate" translate="no">${escapeHtml(data.site.name)}</span>
            </a>
            <span class="sponsor-line">sponsored by <a href="${escapeHtml(data.site.sponsorUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(data.site.sponsorName)}</a></span>
          </div>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
            <span>Menu</span><i aria-hidden="true"></i>
          </button>
        </div>
        <div class="nav-wrap">
          <nav class="primary-nav shell" id="primary-navigation" aria-label="Primary navigation">
            <ul class="nav-list">${items}</ul>
          </nav>
        </div>
      </header>`;

    const header = mount.querySelector("[data-header]");
    const menuButton = mount.querySelector(".menu-toggle");
    const dropdownItems = [...mount.querySelectorAll(".nav-item--dropdown")];

    const closeDropdowns = () => dropdownItems.forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
    });

    menuButton.addEventListener("click", () => {
      const opening = !document.body.classList.contains("nav-open");
      document.body.classList.toggle("nav-open", opening);
      menuButton.setAttribute("aria-expanded", String(opening));
      if (!opening) closeDropdowns();
    });

    dropdownItems.forEach((item) => {
      const button = item.querySelector(".dropdown-toggle");
      button.addEventListener("click", () => {
        const opening = !item.classList.contains("is-open");
        closeDropdowns();
        item.classList.toggle("is-open", opening);
        button.setAttribute("aria-expanded", String(opening));
      });
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) closeDropdowns();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        document.body.classList.remove("nav-open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  function renderFooter() {
    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;
    mount.innerHTML = `
      <footer class="site-footer">
        <div class="shell footer-row">
          <div class="footer-identity">
            <img src="assets/images/lab-logo-placeholder.svg" alt="" aria-hidden="true">
            <div>
              <strong class="notranslate" translate="no">${escapeHtml(data.site.name)}</strong>
              <span><a href="${escapeHtml(data.site.computingUrl)}" target="_blank" rel="noopener noreferrer">School of Computing</a> · <a href="${escapeHtml(data.site.ugaUrl)}" target="_blank" rel="noopener noreferrer">University of Georgia</a> · Athens, GA</span>
            </div>
          </div>
          <div class="footer-links">
            <a class="footer-email" href="mailto:${escapeHtml(data.site.contactEmail)}" aria-label="Email Tianming Liu" title="Email Tianming Liu">${linkIcons.email}</a>
            <span>© ${new Date().getFullYear()} <a href="${escapeHtml(data.site.ugaUrl)}" target="_blank" rel="noopener noreferrer">University of Georgia</a></span>
            <span>Website designed by <a href="${escapeHtml(data.site.designerUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(data.site.designerName)}</a></span>
          </div>
        </div>
      </footer>`;
  }

  function renderHome() {
    const summary = document.querySelector("[data-home-summary]");
    const mission = document.querySelector("[data-home-mission]");
    const focus = document.querySelector("[data-home-focus]");
    if (summary) summary.textContent = data.home.summary;
    if (mission) mission.innerHTML = data.home.mission.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    if (focus) focus.innerHTML = data.researchAreas.map((area) => `<li><a href="research.html#${escapeHtml(area.id)}">${escapeHtml(area.title)} <span>→</span></a></li>`).join("");
  }

  function renderNews() {
    const mount = document.querySelector("[data-news-list]");
    if (!mount) return;

    const news = [...data.news].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
    mount.innerHTML = news.map((item) => {
      const title = item.url
        ? `<a href="${escapeHtml(item.url)}"${externalAttributes(item.url)}>${escapeHtml(item.title)}</a>`
        : escapeHtml(item.title);
      const image = item.image
        ? `<div class="news-item__image"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt || "")}"></div>`
        : "";
      return `
        <article class="news-item${item.image ? " has-image" : ""}" data-reveal>
          <div class="news-item__date"><time>${escapeHtml(item.date)}</time><span>${escapeHtml(item.category)}</span></div>
          ${image}
          <div class="news-item__body"><h3>${title}</h3>${item.excerpt ? `<p>${escapeHtml(item.excerpt)}</p>` : ""}</div>
        </article>`;
    }).join("");
  }

  function renderMembers() {
    const mount = document.querySelector("[data-members-list]");
    if (!mount) return;

    mount.innerHTML = data.memberGroups.map((group) => {
      const members = group.id === "alumni"
        ? [...group.members].sort((a, b) => (a.sortYear ?? Infinity) - (b.sortYear ?? Infinity))
        : group.members;
      return `
        <section class="member-section${group.id === "principal-investigator" ? " member-section--pi" : ""}" id="${escapeHtml(group.id)}">
          <div class="section-bar"><h2>${escapeHtml(group.title)}</h2></div>
          <div class="member-list">
            ${members.map((member) => {
            const destination = member.website || member.profilePage;
            const name = destination
              ? `<a href="${escapeHtml(destination)}"${externalAttributes(destination)}>${escapeHtml(member.name)}</a>`
              : escapeHtml(member.name);
            const affiliation = member.affiliationUrl
              ? `<a href="${escapeHtml(member.affiliationUrl)}"${externalAttributes(member.affiliationUrl)}>${escapeHtml(member.affiliation)}</a>`
              : escapeHtml(member.affiliation || "");
            const links = member.links?.length
              ? `<div class="member-links">${member.links.map((link) => `<a href="${escapeHtml(link.url)}"${externalAttributes(link.url)} aria-label="${escapeHtml(link.label)}" title="${escapeHtml(link.label)}">${iconForLink(link.label)}</a>`).join("")}</div>`
              : "";
            const photo = `<img src="${escapeHtml(member.photo || "assets/images/member-placeholder.svg")}" alt="${member.photo ? escapeHtml(member.name) : "Portrait placeholder"}" data-member-photo>`;
            const photoElement = destination
              ? `<a class="member-photo" href="${escapeHtml(destination)}"${externalAttributes(destination)} aria-label="View ${escapeHtml(member.name)} profile">${photo}</a>`
              : `<div class="member-photo">${photo}</div>`;
            return `
              <article class="member-card${member.isPlaceholder ? " member-card--placeholder" : ""}" data-reveal>
                ${photoElement}
                <div class="member-copy">
                  <h3>${name}</h3>
                  ${member.role ? `<p class="member-role">${escapeHtml(member.role)}</p>` : ""}
                  ${member.affiliation ? `<p class="member-affiliation">${affiliation}</p>` : ""}
                  ${member.bio ? `<p class="member-bio">${escapeHtml(member.bio)}</p>` : ""}
                  ${links}
                </div>
              </article>`;
            }).join("")}
          </div>
        </section>`;
    }).join("");

    mount.querySelectorAll("[data-member-photo]").forEach((image) => {
      image.addEventListener("error", () => {
        image.src = "assets/images/member-placeholder.svg";
      }, { once: true });
    });
  }

  function renderResearchAreas() {
    const mount = document.querySelector("[data-research-areas]");
    if (!mount) return;
    mount.innerHTML = data.researchAreas.map((area) => `
      <article class="research-card" id="${escapeHtml(area.id)}" data-reveal>
        <h3>${escapeHtml(area.title)}</h3>
        <p>${escapeHtml(area.summary)}</p>
        <ul>${area.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}</ul>
      </article>`).join("");
  }

  function renderPublications() {
    const mount = document.querySelector("[data-publications-list]");
    if (!mount) return;

    mount.innerHTML = data.publications.map((group) => {
      const publications = [...group.items].sort((a, b) =>
        (b.year - a.year) || (b.monthNumber - a.monthNumber));
      return `
        <section class="publication-group" id="${escapeHtml(group.id)}">
          <div class="section-bar"><h3>${escapeHtml(group.label)}</h3></div>
          <ol class="publication-list">
            ${publications.map((publication) => {
              const title = publication.url
                ? `<a href="${escapeHtml(publication.url)}"${externalAttributes(publication.url)}>${escapeHtml(publication.title)}</a>`
                : escapeHtml(publication.title);
              return `
                <li class="publication-item" data-reveal>
                  <time datetime="${publication.year}-${String(publication.monthNumber).padStart(2, "0")}"><span>${escapeHtml(publication.month.slice(0, 3))}</span>${publication.year}</time>
                  <div class="publication-copy">
                    <h4>${title}</h4>
                    <p class="publication-authors">${escapeHtml(publication.authors)}</p>
                    <p class="publication-venue">${escapeHtml(publication.venue)}</p>
                  </div>
                </li>`;
            }).join("")}
          </ol>
        </section>`;
    }).join("");
  }

  function renderOpportunity() {
    const mount = document.querySelector("[data-opportunity-page]");
    if (!mount) return;

    const pageId = document.body.dataset.page;
    const page = data.opportunities[pageId];
    if (!page) return;

    mount.innerHTML = `
      <header class="page-heading">
        <p class="breadcrumb"><a href="index.html">Home</a><span>/</span>Opportunities</p>
        <h1>${escapeHtml(page.title)}</h1>
        <p>${escapeHtml(page.summary)}</p>
      </header>
      <div class="opportunity-grid">
        ${page.tracks.map((track) => `
          <article class="opportunity-card" data-reveal>
            <h2>${escapeHtml(track.title)}</h2>
            <p>${track.descriptionHtml || escapeHtml(track.description)}</p>
            ${track.points?.length ? `<ul>${track.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>` : ""}
            ${track.action ? `<a class="opportunity-action" href="${escapeHtml(track.action.url)}"${externalAttributes(track.action.url)}>${escapeHtml(track.action.label)} <span aria-hidden="true">→</span></a>` : ""}
          </article>`).join("")}
      </div>`;
  }

  function enableReveals() {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    if (!elements.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -20px" });
    elements.forEach((element) => observer.observe(element));
  }

  renderHeader();
  renderFooter();
  renderHome();
  renderNews();
  renderMembers();
  renderResearchAreas();
  renderPublications();
  renderOpportunity();
  enableReveals();
})();
