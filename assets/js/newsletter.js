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
    fallback.textContent = "Open the subscription form in a new tab";
    target.append(form, fallback);
  };

  const configure = async () => {
    try {
      const response = await fetch("ai-news/newsletter-config.json");
      if (!response.ok) return;
      const config = await response.json();
      const weekly = formUrl(config.signupFormUrl);
      const combined = config.signupIncludesDaily === true;
      if (weekly) {
        if (combined) {
          mount.querySelector(".newsletter__eyebrow").textContent = "THE DAY AND WEEK IN AI";
          mount.querySelector("h2").textContent = "Get daily and weekly AI news from UGA LLM Lab";
          mount.querySelector("[data-newsletter-description]").textContent =
            "One signup for daily article links and short summaries, plus our weekly AI analysis.";
        }
        embedForm(mount.querySelector("[data-newsletter-form]"), weekly, combined ? "daily and weekly" : "weekly");
        mount.querySelector("[data-newsletter-status]").textContent =
          combined
            ? "Confirm once to receive daily updates on days with new stories and a weekly roundup. Unsubscribe anytime."
            : "Confirm your email after subscribing. One email each week; unsubscribe anytime.";
      }

    } catch {
      // Keep the existing availability message if configuration cannot load.
    }
  };

  configure();
})();
