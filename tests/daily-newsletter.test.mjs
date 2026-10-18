import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  buildNewsletter, campaignPayload, deliver, estimatedReadingTime, previousDay
} from "../scripts/newsletter.mjs";

const fixture = async (run) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "uga-daily-newsletter-"));
  try {
    await mkdir(path.join(root, "ai-news/2026-09"), { recursive: true });
    await mkdir(path.join(root, "ai-news/2026-10"), { recursive: true });
    await writeFile(path.join(root, "ai-news/newsletter-config.json"), JSON.stringify({
      siteUrl: "https://example.org/", mailingAddress: "Test Lab, Athens, GA", senderName: "Test Lab"
    }));
    const catalog = { months: [
      { id: "2026-09", data: "ai-news/2026-09/data.js" },
      { id: "2026-10", data: "ai-news/2026-10/data.js" }
    ] };
    await writeFile(path.join(root, "ai-news/catalog.js"), `window.AI_NEWS_CATALOG = ${JSON.stringify(catalog)};`);
    const story = (slug, extra = {}) => ({ slug, title: "<AI & news>", summary: "A short summary with <markup> & facts.",
      category: "Industry", sortDate: "2026-09-30", content: [{ text: "word ".repeat(401) }], ...extra });
    await writeFile(path.join(root, "ai-news/2026-09/data.js"), `window.AI_NEWS_MONTH_DATA["2026-09"] = ${JSON.stringify({ articles: [
      story("visible-september"), story("hidden-story", { hidden: true }),
      story("weekly-ai-review", { category: "AI Weekly", title: "Weekly report published today" }),
      story("previous-day", { sortDate: "2026-09-29" })
    ] })};`);
    await writeFile(path.join(root, "ai-news/2026-10/data.js"), `window.AI_NEWS_MONTH_DATA["2026-10"] = ${JSON.stringify({ articles: [
      story("visible-october"), story("tomorrow", { sortDate: "2026-10-01" })
    ] })};`);
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
};

const now = new Date("2026-10-01T12:00:00Z");
const settings = { BREVO_LIST_ID: "3", BREVO_DAILY_LIST_ID: "4",
  NEWSLETTER_SENDER_EMAIL: "lab@example.org", NEWSLETTER_REPLY_TO: "lab@example.org" };

test("daily cutoff follows New York midnight through daylight saving changes", () => {
  assert.equal(previousDay(new Date("2026-10-18T03:59:59Z")), "2026-10-16");
  assert.equal(previousDay(new Date("2026-10-18T04:00:00Z")), "2026-10-17");
  assert.equal(previousDay(new Date("2026-11-02T04:59:59Z")), "2026-10-31");
  assert.equal(previousDay(new Date("2026-11-02T05:00:00Z")), "2026-11-01");
});

test("daily email includes every visible article of the day with links, summaries, and reading estimates", async () => {
  await fixture(async (root) => {
    const result = await buildNewsletter({ root, frequency: "daily", now });
    assert.equal(result.entry.id, "2026-09-30");
    assert.equal(result.name, "uga-ai-daily-2026-09-30");
    assert.equal(result.articleUrls.length, 3);
    assert.ok(result.articleUrls.some((url) => new URL(url).searchParams.get("month") === "2026-10"));
    assert.ok(result.html.includes("&lt;AI &amp; news&gt; (about 3 min read)"));
    assert.ok(result.html.includes("A short summary with &lt;markup&gt; &amp; facts."));
    assert.ok(result.html.includes("Weekly report published today"));
    assert.ok(!result.html.includes("hidden-story"));
    assert.ok(!result.html.includes("previous-day"));
    assert.ok(!result.html.includes("slug=tomorrow"));
    assert.ok(result.html.includes("{{ unsubscribe }}"));
    assert.equal(result.publicFiles.length, 3);
    assert.ok(result.text.includes(result.articleUrls[0]));
  });
});

test("daily preview can inspect today's articles while default preview uses completed days", async () => {
  await fixture(async (root) => {
    const result = await buildNewsletter({ root, frequency: "daily", date: "2026-10-01", now });
    assert.equal(result.articleUrls.length, 1);
    assert.ok(result.articleUrls[0].includes("slug=tomorrow"));
  });
});

test("daily live mode skips an empty yesterday and never substitutes older news", async () => {
  await fixture(async (root) => {
    assert.equal(await buildNewsletter({ root, frequency: "daily", mode: "send",
      now: new Date("2026-10-03T12:00:00Z") }), null);
  });
});

test("daily dates reject malformed IDs, impossible dates, and stale live editions", async () => {
  await fixture(async (root) => {
    for (const date of ["../../config", "2026-02-30", "2026-13-01"]) {
      await assert.rejects(buildNewsletter({ root, frequency: "daily", date, now }), /Invalid daily date/);
    }
    await assert.rejects(buildNewsletter({ root, frequency: "daily", mode: "send", date: "2026-09-29", now }), /yesterday/);
    await assert.rejects(buildNewsletter({ root, frequency: "daily", date: "2026-09-28", now }), /No visible daily stories/);
    await assert.rejects(buildNewsletter({ root, frequency: "daily", week: "2026-09-28-to-2026-10-04", now }), /Use --date/);
    await assert.rejects(buildNewsletter({ root, date: "2026-09-30", now }), /Use --week/);
    await assert.rejects(buildNewsletter({ root, frequency: "hourly", now }), /Frequency/);
  });
});

test("daily campaigns require their own list and never fall back to weekly subscribers", async () => {
  await fixture(async (root) => {
    const daily = await buildNewsletter({ root, frequency: "daily", now });
    assert.deepEqual(campaignPayload(daily, settings).recipients, { listIds: [4] });
    assert.throws(() => campaignPayload(daily, { ...settings, BREVO_DAILY_LIST_ID: "" }), /BREVO_DAILY_LIST_ID/);
    assert.throws(() => campaignPayload(daily, { ...settings, BREVO_DAILY_LIST_ID: "3" }), /separate/);
    assert.throws(() => campaignPayload(daily, { ...settings, BREVO_LIST_ID: "" }), /BREVO_LIST_ID/);
  });
});

test("enabling weekly sending does not enable daily sending", async () => {
  await fixture(async (root) => {
    const daily = await buildNewsletter({ root, frequency: "daily", now });
    await assert.rejects(deliver(daily, { mode: "send", env: { ...settings, NEWSLETTER_SENDING_ENABLED: "true" },
      request: () => assert.fail("Provider must not be called") }), /daily sending is disabled/);
  });
});

test("daily draft uses the shared provider integration without requesting a send", async () => {
  await fixture(async (root) => {
    const daily = await buildNewsletter({ root, frequency: "daily", now });
    const result = await deliver(daily, { mode: "draft", env: settings, request: async (endpoint, options) => {
      if (!options) return { campaigns: [] };
      assert.equal(endpoint, "/emailCampaigns");
      assert.deepEqual(options.body.recipients, { listIds: [4] });
      assert.equal(options.body.name, daily.name);
      return { id: 6 };
    } });
    assert.equal(result.status, "draft-created");
  });
});

test("an existing daily campaign is not resubmitted", async () => {
  await fixture(async (root) => {
    const daily = await buildNewsletter({ root, frequency: "daily", now });
    const result = await deliver(daily, { mode: "send", env: { ...settings, NEWSLETTER_DAILY_SENDING_ENABLED: "true" },
      request: async (endpoint, options) => {
        assert.equal(options, undefined);
        return endpoint.includes("?") ? { campaigns: [{ id: 6, name: daily.name }] } : { id: 6, status: "sent" };
      } });
    assert.equal(result.status, "already-submitted");
  });
});

test("daily sending uses its own switch, validates publication, and targets the daily list", async () => {
  await fixture(async (root) => {
    const daily = await buildNewsletter({ root, frequency: "daily", mode: "send", now });
    let sent = false;
    const result = await deliver(daily, { mode: "send",
      env: { ...settings, NEWSLETTER_SENDING_ENABLED: "false", NEWSLETTER_DAILY_SENDING_ENABLED: "true" },
      fetcher: async (url) => {
        const file = daily.publicFiles.find((item) => new URL(url).pathname.endsWith(item.path));
        assert.ok(file);
        return new Response(file.source);
      },
      request: async (endpoint, options) => {
        if (!options) return { campaigns: [] };
        if (endpoint === "/emailCampaigns") {
          assert.deepEqual(options.body.recipients, { listIds: [4] });
          return { id: 6 };
        }
        assert.equal(endpoint, "/emailCampaigns/6/sendNow");
        sent = true;
        return null;
      }
    });
    assert.equal(result.status, "submitted");
    assert.ok(sent);
  });
});

test("reading time is an estimate from full article content and is omitted without content", () => {
  assert.equal(estimatedReadingTime({ content: [{ text: "word ".repeat(401) }] }), 3);
  assert.equal(estimatedReadingTime({ content: [{ text: "Short article" }] }), 1);
  assert.equal(estimatedReadingTime({ summary: "Summary alone does not establish article length" }), null);
});

test("real daily data generates an email using actual article links", async () => {
  const result = await buildNewsletter({ frequency: "daily", date: "2026-10-17", now: new Date("2026-10-18T12:00:00Z") });
  assert.equal(result.entry.id, "2026-10-17");
  assert.ok(result.articleUrls.length > 0);
  assert.ok(result.articleUrls.every((url) => url.startsWith("https://llm.franklinresearch.uga.edu/ai-news-article.html?")));
  assert.ok(result.html.length < 100 * 1024);
});
