(() => {
  "use strict";

  const mount = document.querySelector("[data-newsletter]");
  if (!mount) return;

  const formUrl = (value) => {
    if (!value) return null;
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password
        && url.hostname.endsWith(".sibforms.com") ? url : null;
    } catch {
      return null;
    }
  };

  const embedForm = (target, url, frequency) => {
    // Only embed the hosted Brevo form. No subscriber data or API keys enter this site.
    const form = document.createElement("iframe");
    form.src = url.href;
    form.title = `Subscribe to UGA LLM Lab ${frequency} AI news`;
    form.loading = "lazy";
    form.referrerPolicy = "strict-origin-when-cross-origin";
    form.className = "newsletter__form";

    const fallback = document.createElement("a");
    fallback.href = url.href;
    fallback.target = "_blank";
    fallback.rel = "noopener noreferrer";
    fallback.textContent = frequency === "daily"
      ? "Open the daily subscription form in a new tab"
      : "Open the subscription form in a new tab";
    target.append(form, fallback);
  };

  const configure = async () => {
    try {
      const response = await fetch("ai-news/newsletter-config.json");
      if (!response.ok) return;
      const config = await response.json();
      const weekly = formUrl(config.signupFormUrl);
      if (weekly) {
        embedForm(mount.querySelector("[data-newsletter-form]"), weekly, "weekly");
        mount.querySelector("[data-newsletter-status]").textContent =
          "Confirm your email after subscribing. One email each week; unsubscribe anytime.";
      }

      const daily = formUrl(config.dailySignupFormUrl);
      if (!daily || daily.href === weekly?.href) return;
      const section = document.createElement("section");
      section.className = "newsletter__daily";
      section.setAttribute("aria-labelledby", "daily-newsletter-title");
      const heading = document.createElement("h3");
      heading.id = "daily-newsletter-title";
      heading.textContent = "Prefer daily AI news?";
      const description = document.createElement("p");
      description.textContent = "Get article links and short summaries each morning on days with new stories. Subscribe separately below to receive daily updates.";
      const status = document.createElement("p");
      status.className = "newsletter__status";
      status.textContent = "Confirm your email after subscribing. Unsubscribe anytime.";
      section.append(heading, description, status);
      embedForm(section, daily, "daily");
      mount.append(section);
    } catch {
      // Keep the existing availability message if configuration cannot load.
    }
  };

  configure();
})();
