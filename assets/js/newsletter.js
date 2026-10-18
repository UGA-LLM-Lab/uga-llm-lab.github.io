(() => {
  "use strict";

  const mount = document.querySelector("[data-newsletter]");
  if (!mount) return;

  const configure = async () => {
    try {
      const response = await fetch("ai-news/newsletter-config.json");
      if (!response.ok) return;
      const config = await response.json();
      if (!config.signupFormUrl) return;

      // Only embed the hosted Brevo form. No subscriber data or API keys enter this site.
      const url = new URL(config.signupFormUrl);
      if (url.protocol !== "https:" || url.username || url.password
        || !url.hostname.endsWith(".sibforms.com")) return;

      const form = document.createElement("iframe");
      form.src = url.href;
      form.title = "Subscribe to UGA LLM Lab weekly AI news";
      form.loading = "lazy";
      form.referrerPolicy = "strict-origin-when-cross-origin";
      form.className = "newsletter__form";

      const fallback = document.createElement("a");
      fallback.href = url.href;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.textContent = "Open the subscription form in a new tab";
      mount.querySelector("[data-newsletter-form]").append(form, fallback);
      mount.querySelector("[data-newsletter-status]").textContent =
        "Confirm your email after subscribing. One email each week; unsubscribe anytime.";
    } catch {
      // Keep the existing, honest availability message if configuration cannot load.
    }
  };

  configure();
})();
