import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const WEEK_ID = /^\d{4}-\d{2}-\d{2}-to-\d{4}-\d{2}-\d{2}$/;
const API = "https://api.brevo.com/v3";
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g,
  (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const digest = (value) => createHash("sha256").update(value).digest("hex");

// These are trusted, version-controlled data scripts, not code supplied by visitors.
export function loadDataScript(source) {
  const context = { window: { AI_NEWS_MONTH_DATA: {} } };
  vm.runInNewContext(source, context, { timeout: 1000 });
  return JSON.parse(JSON.stringify(context.window));
}

export function previousWeek(now = new Date()) {
  const localDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit"
  }).format(now);
  const date = new Date(`${localDate}T12:00:00Z`);
  const daysSinceMonday = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - daysSinceMonday - 1);
  const end = date.toISOString().slice(0, 10);
  date.setUTCDate(date.getUTCDate() - 6);
  return `${date.toISOString().slice(0, 10)}-to-${end}`;
}

export function selectEdition(catalog, { week, mode = "preview", now = new Date() } = {}) {
  const editions = catalog.weeklyAnalyses || [];
  const expected = previousWeek(now);
  if (week && !WEEK_ID.test(week)) throw new Error("Invalid week ID.");
  if (mode === "send" && week && week !== expected) {
    throw new Error(`Live sending is limited to the previous completed week (${expected}).`);
  }
  const entry = week || mode === "send"
    ? editions.find((item) => item.id === (week || expected))
    : [...editions].filter((item) => WEEK_ID.test(item.id) && item.id <= expected)
      .sort((a, b) => b.id.localeCompare(a.id))[0];
  if (!entry) {
    if (week) throw new Error(`Weekly edition ${week} was not found.`);
    return null;
  }
  if (!WEEK_ID.test(entry.id)) throw new Error("Invalid catalog edition ID.");
  return entry;
}

function absoluteUrl(relative, siteUrl) {
  const url = new URL(relative, siteUrl);
  if (url.protocol !== "https:") throw new Error("Newsletter links must use HTTPS.");
  return url.href;
}

export async function buildNewsletter({ root = ROOT, week, mode = "preview", now = new Date() } = {}) {
  const config = JSON.parse(await readFile(path.join(root, "ai-news/newsletter-config.json"), "utf8"));
  const catalogSource = await readFile(path.join(root, "ai-news/catalog.js"), "utf8");
  const catalog = loadDataScript(catalogSource).AI_NEWS_CATALOG;
  const entry = selectEdition(catalog, { week, mode, now });
  if (!entry) return null;
  if (entry.data !== `ai-news/weekly/${entry.id}.json`) throw new Error("Unexpected weekly data path.");
  const analysisSource = await readFile(path.join(root, entry.data), "utf8");
  const analysis = JSON.parse(analysisSource);
  const dates = analysis.period?.current || analysis.week;
  if (!Array.isArray(dates) || `${dates[0]}-to-${dates[1]}` !== entry.id) {
    throw new Error("The analysis period does not match its catalog ID.");
  }

  // Cross-month editions can live in the ending month. Resolve by slug, never by week prefix.
  const matches = [];
  for (const month of catalog.months || []) {
    if (!/^ai-news\/\d{4}-\d{2}\/data\.js$/.test(month.data)) throw new Error("Unexpected month data path.");
    const source = await readFile(path.join(root, month.data), "utf8");
    const articles = loadDataScript(source).AI_NEWS_MONTH_DATA[month.id]?.articles || [];
    for (const article of articles) {
      if (article.slug === entry.reviewSlug && !article.hidden) matches.push({ article, month, source });
    }
  }
  if (matches.length !== 1) throw new Error("Expected exactly one visible matching weekly review.");
  const { article: review, month, source: monthSource } = matches[0];
  const tabs = analysis.tabs || analysis.parts || [];
  const highlights = tabs.flatMap((tab) => {
    const finding = (tab.claims || tab.findings || [])[0];
    return finding ? [{ label: tab.label, title: finding.claim || finding.title,
      text: finding.interpretation || "", tab: tab.id }] : [];
  });
  const intro = analysis.synthesis || review.summary;
  if (!analysis.title || !intro || !highlights.length) throw new Error("Weekly content is incomplete.");
  const analysisUrl = absoluteUrl(`ai-weekly-analysis.html?week=${encodeURIComponent(entry.id)}`, config.siteUrl);
  const reviewUrl = absoluteUrl(`ai-news-article.html?month=${encodeURIComponent(month.id)}&slug=${encodeURIComponent(review.slug)}`, config.siteUrl);
  const subject = `UGA AI Weekly · ${entry.label}`;
  const name = `uga-ai-weekly-${entry.id}`;
  const highlightHtml = highlights.map((item) => `<h2 style="font-size:19px;margin:28px 0 8px;color:#171717">${escapeHtml(item.label)}</h2>
<p style="margin:0 0 8px"><strong>${escapeHtml(item.title)}</strong></p>
<p style="margin:0 0 10px">${escapeHtml(item.text)}</p>
<a href="${escapeHtml(`${analysisUrl}&tab=${encodeURIComponent(item.tab)}`)}" style="color:#ba0c2f">Explore this analysis →</a>`).join("\n");
  const address = config.mailingAddress || "[Add the lab’s mailing address before sending]";
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;background:#f6f6f5;color:#333;font-family:Arial,Helvetica,sans-serif;line-height:1.6">
<table role="presentation" style="width:100%;border-collapse:collapse"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" style="width:100%;max-width:640px;border-collapse:collapse;background:#fff;border-top:4px solid #ba0c2f"><tr><td style="padding:30px">
<p style="margin:0;color:#ba0c2f;font-size:12px;letter-spacing:2px;font-weight:bold">UGA LLM LAB · THE WEEK IN AI</p>
<p style="color:#666">${escapeHtml(entry.label)}</p>
<h1 style="font-size:28px;line-height:1.25;color:#171717;font-family:Georgia,serif">${escapeHtml(analysis.title)}</h1>
<p>${escapeHtml(intro)}</p>
${highlightHtml}
<p style="margin-top:30px"><a href="${escapeHtml(reviewUrl)}" style="display:inline-block;background:#ba0c2f;color:#fff;padding:12px 18px;text-decoration:none;font-weight:bold">Read the week in review</a></p>
<p><a href="${escapeHtml(analysisUrl)}" style="color:#ba0c2f">Read the full weekly analysis →</a></p>
<hr style="border:0;border-top:1px solid #dedede;margin:30px 0 18px">
<p style="font-size:12px;color:#666">You received this email because you subscribed to UGA LLM Lab weekly AI news.<br>${escapeHtml(address)}</p>
<p style="font-size:12px"><a href="{{ unsubscribe }}" style="color:#666">Unsubscribe</a> · <a href="${escapeHtml(absoluteUrl("ai-news.html", config.siteUrl))}" style="color:#666">News archive</a></p>
</td></tr></table></td></tr></table></body></html>\n`;
  const text = `${subject}\n\n${analysis.title}\n\n${intro}\n\n${highlights.map((item) => `${item.label}: ${item.title}\n${item.text}`).join("\n\n")}\n\nWeek in review: ${reviewUrl}\nFull analysis: ${analysisUrl}\n\n${address}\nUnsubscribe: {{ unsubscribe }}\n`;
  return { entry, config, name, subject, html, text, analysisUrl, reviewUrl,
    publicFiles: [
      { path: "ai-news/catalog.js", source: catalogSource },
      { path: entry.data, source: analysisSource },
      { path: month.data, source: monthSource }
    ] };
}

export function campaignPayload(newsletter, env) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Repository variables can acquire surrounding whitespace when pasted into GitHub.
  const senderEmail = (env.NEWSLETTER_SENDER_EMAIL || "").trim();
  const replyTo = (env.NEWSLETTER_REPLY_TO || "").trim();
  if (!emailPattern.test(senderEmail)) {
    throw new Error("Set NEWSLETTER_SENDER_EMAIL to a valid email address.");
  }
  if (!emailPattern.test(replyTo)) {
    throw new Error("Set NEWSLETTER_REPLY_TO to a valid email address.");
  }
  const listId = Number(env.BREVO_LIST_ID);
  if (!Number.isSafeInteger(listId) || listId < 1) throw new Error("Set a positive BREVO_LIST_ID.");
  if (!newsletter.config.mailingAddress.trim()) throw new Error("Add the lab’s mailingAddress in newsletter-config.json.");
  return {
    name: newsletter.name, subject: newsletter.subject,
    sender: { name: newsletter.config.senderName, email: senderEmail },
    replyTo, recipients: { listIds: [listId] },
    type: "classic", htmlContent: newsletter.html,
    previewText: "Research highlights and industry developments from UGA LLM Lab.",
    tag: "uga-ai-weekly"
  };
}

export async function assertPublished(newsletter, fetcher = fetch) {
  for (const file of newsletter.publicFiles) {
    const url = new URL(file.path, newsletter.config.siteUrl);
    url.searchParams.set("newsletter_check", String(Date.now()));
    const response = await fetcher(url, { signal: AbortSignal.timeout(20000), cache: "no-store" });
    if (!response.ok || digest(await response.text()) !== digest(file.source)) {
      throw new Error(`${file.path} does not match the public website. Wait for deployment, then retry.`);
    }
  }
}

function providerErrorSummary(details, apiKey) {
  const codes = new Set([
    "invalid_parameter", "missing_parameter", "out_of_range", "unauthorized",
    "document_not_found", "method_not_allowed", "not_enough_credits",
    "duplicate_parameter", "duplicate_request", "account_under_validation", "permission_denied"
  ]);
  const code = codes.has(details?.code) ? details.code : "";
  let message = typeof details?.message === "string" ? details.message : "";
  // Retain only the error explanation, never response payloads, credentials, or links.
  for (const key of [apiKey, apiKey.trim()].filter(Boolean)) {
    message = message.replaceAll(key, "[redacted key]");
  }
  message = message
    .replace(/(?:xkeysib|xsmtpsib)-[a-z0-9_-]+/gi, "[redacted key]")
    .replace(/\b(?:Bearer|Basic)\s+[a-z0-9+/=._-]+/gi, "[redacted authorization]")
    .replace(/https?:\/\/[^\s<>"']+/gi, "[redacted URL]")
    .replace(/[^\s<>"']+@[^\s<>"']+\.[a-z]{2,}/gi, "[redacted email]")
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, " ")
    .trim().slice(0, 600);
  return [code, message].filter(Boolean).join(": ");
}

export function brevoClient(apiKey, fetcher = fetch) {
  if (!apiKey) throw new Error("Set BREVO_API_KEY as a secret.");
  return async (endpoint, { method = "GET", body } = {}) => {
    let response;
    try {
      response = await fetcher(`${API}${endpoint}`, {
        method, headers: { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" },
        ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(30000)
      });
    } catch {
      throw new Error(`Brevo ${method} request did not complete. Inspect campaign status in Brevo before retrying; no automatic retry was attempted.`);
    }
    if (!response.ok) {
      const details = await response.json().catch(() => null);
      const explanation = providerErrorSummary(details, apiKey);
      const resource = new URL(`${API}${endpoint}`).pathname;
      throw new Error(`Brevo ${method} ${resource} failed (HTTP ${response.status})${explanation ? `: ${explanation}` : ". No JSON error explanation was returned."}`);
    }
    return response.status === 204 ? null : response.json();
  };
}

export async function deliver(newsletter, { mode, env = process.env, request, fetcher = fetch } = {}) {
  if (!["draft", "send"].includes(mode)) throw new Error("Provider mode must be draft or send.");
  if (mode === "send" && env.NEWSLETTER_SENDING_ENABLED !== "true") {
    throw new Error("Live sending is disabled. Finish domain authentication and launch setup first.");
  }
  const payload = campaignPayload(newsletter, env);
  const api = request || brevoClient(env.BREVO_API_KEY, fetcher);
  const matches = [];
  // Search every page, including sent campaigns, so state survives runner/cache expiry.
  for (let offset = 0; ; offset += 100) {
    const page = await api(`/emailCampaigns?limit=100&offset=${offset}&sort=desc&excludeHtmlContent=true`);
    if (!Array.isArray(page?.campaigns)) throw new Error("Invalid campaign list response.");
    matches.push(...page.campaigns.filter((item) => item.name === newsletter.name));
    if (page.campaigns.length < 100) break;
  }
  if (matches.length > 1) throw new Error("Multiple campaigns exist for this edition. Inspect them in Brevo.");
  if (matches.length) {
    const existing = await api(`/emailCampaigns/${matches[0].id}`);
    if (["sent", "queued", "running", "scheduled"].includes(existing.status)) {
      return { status: "already-submitted", campaignId: existing.id };
    }
    if (existing.status !== "draft") throw new Error(`Campaign status ${existing.status} requires review in Brevo.`);
    // A draft may be left by an interrupted send. Never automatically resubmit it.
    if (mode === "send") throw new Error("An existing draft needs review. Send it in Brevo after checking its history; this workflow will not resubmit it.");
    await api(`/emailCampaigns/${existing.id}`, { method: "PUT", body: payload });
    return { status: "draft-updated", campaignId: existing.id };
  }
  if (mode === "send") await assertPublished(newsletter, fetcher);
  const created = await api("/emailCampaigns", { method: "POST", body: payload });
  if (!Number.isSafeInteger(created?.id) || created.id < 1) throw new Error("Brevo did not return a valid campaign ID. Inspect campaigns before retrying.");
  if (mode === "draft") return { status: "draft-created", campaignId: created.id };
  await api(`/emailCampaigns/${created.id}/sendNow`, { method: "POST" });
  return { status: "submitted", campaignId: created.id };
}

export async function main(args = process.argv.slice(2), env = process.env) {
  const options = { mode: env.NEWSLETTER_MODE || "preview", week: env.NEWSLETTER_WEEK || undefined };
  for (let i = 0; i < args.length; i += 1) {
    if (!["--mode", "--week"].includes(args[i]) || !args[i + 1]) throw new Error("Usage: node scripts/newsletter.mjs [--mode preview|draft|send] [--week YYYY-MM-DD-to-YYYY-MM-DD]");
    options[args[i].slice(2)] = args[++i];
  }
  if (!["preview", "draft", "send"].includes(options.mode)) throw new Error("Unknown newsletter mode.");
  if (options.mode === "send" && env.NEWSLETTER_SENDING_ENABLED !== "true") throw new Error("Live sending is disabled.");
  const newsletter = await buildNewsletter(options);
  if (!newsletter) {
    console.log("No eligible weekly edition is available. Nothing was sent.");
    return;
  }
  const output = path.join(ROOT, ".newsletter-preview");
  await mkdir(output, { recursive: true });
  await writeFile(path.join(output, "newsletter.html"), newsletter.html);
  await writeFile(path.join(output, "newsletter.txt"), newsletter.text);
  await writeFile(path.join(output, "edition.json"), JSON.stringify({
    id: newsletter.entry.id, subject: newsletter.subject, name: newsletter.name,
    analysisUrl: newsletter.analysisUrl, reviewUrl: newsletter.reviewUrl,
    htmlSha256: digest(newsletter.html)
  }, null, 2) + "\n");
  console.log(`Built ${newsletter.entry.id}: .newsletter-preview/newsletter.html`);
  if (options.mode === "preview") {
    console.log("Preview only. No provider requests were made and no email was sent.");
    return;
  }
  const result = await deliver(newsletter, { mode: options.mode, env });
  console.log(`Campaign ${result.campaignId}: ${result.status}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
