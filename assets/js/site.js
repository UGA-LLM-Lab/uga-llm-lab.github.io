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
              <span>${escapeHtml(data.site.name)}</span>
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
            <div><strong>${escapeHtml(data.site.name)}</strong><span>${escapeHtml(data.site.address)}</span></div>
          </div>
          <div class="footer-links">
            <a href="mailto:${escapeHtml(data.site.contactEmail)}">${escapeHtml(data.site.contactEmail)}</a>
            <span>© ${new Date().getFullYear()} University of Georgia</span>
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
          ${image}
          <div class="news-item__date"><time>${escapeHtml(item.date)}</time><span>${escapeHtml(item.category)}</span></div>
          <div class="news-item__body"><h3>${title}</h3>${item.excerpt ? `<p>${escapeHtml(item.excerpt)}</p>` : ""}</div>
        </article>`;
    }).join("");
  }

  function renderMembers() {
    const mount = document.querySelector("[data-members-list]");
    if (!mount) return;

    mount.innerHTML = data.memberGroups.map((group) => `
      <section class="member-section${group.id === "principal-investigator" ? " member-section--pi" : ""}" id="${escapeHtml(group.id)}">
        <div class="section-bar"><h2>${escapeHtml(group.title)}</h2><span>${group.members.length}</span></div>
        <div class="member-list">
          ${group.members.map((member) => {
            const destination = member.website || member.profilePage;
            const name = destination
              ? `<a href="${escapeHtml(destination)}"${externalAttributes(destination)}>${escapeHtml(member.name)}</a>`
              : escapeHtml(member.name);
            const links = member.links?.length
              ? `<div class="member-links">${member.links.map((link) => `<a href="${escapeHtml(link.url)}"${externalAttributes(link.url)}>${escapeHtml(link.label)}</a>`).join("")}</div>`
              : "";
            return `
              <article class="member-card${member.isPlaceholder ? " member-card--placeholder" : ""}" data-reveal>
                <div class="member-photo"><img src="${escapeHtml(member.photo || "assets/images/member-placeholder.svg")}" alt="${member.photo ? escapeHtml(member.name) : "Portrait placeholder"}" data-member-photo></div>
                <div class="member-copy">
                  <h3>${name}</h3>
                  ${member.role ? `<p class="member-role">${escapeHtml(member.role)}</p>` : ""}
                  ${member.affiliation ? `<p class="member-affiliation">${escapeHtml(member.affiliation)}</p>` : ""}
                  ${member.bio ? `<p class="member-bio">${escapeHtml(member.bio)}</p>` : ""}
                  ${links}
                </div>
              </article>`;
          }).join("")}
        </div>
      </section>`).join("");

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
          <div class="section-bar"><h3>${escapeHtml(group.label)}</h3><span>${publications.length}</span></div>
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
            <p class="card-kicker">${escapeHtml(track.type)}</p>
            <h2>${escapeHtml(track.title)}</h2>
            <p>${escapeHtml(track.description)}</p>
            <ul>${track.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
          </article>`).join("")}
      </div>
      <aside class="contact-strip" data-reveal>
        <div><strong>Interested?</strong><span>Send a concise introduction, your current school or program, and the opportunity that interests you.</span></div>
        <a class="button" href="mailto:${escapeHtml(data.site.contactEmail)}?subject=${encodeURIComponent(page.subject)}">Contact the lab</a>
      </aside>`;
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
