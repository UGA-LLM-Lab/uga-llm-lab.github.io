import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  assertPublished, brevoClient, buildNewsletter, campaignPayload, deliver,
  loadDataScript, previousWeek, selectEdition
} from "../scripts/newsletter.mjs";

const preview = await buildNewsletter({ week: "2026-10-05-to-2026-10-11" });
const ready = { ...preview,
  config: { ...preview.config, mailingAddress: "Test Lab, 123 Example Street, Athens, GA 30602" } };
const settings = { NEWSLETTER_SENDING_ENABLED: "true", NEWSLETTER_SENDER_EMAIL: "news@example.org",
  NEWSLETTER_REPLY_TO: "team@example.org", BREVO_LIST_ID: "7" };
const publicFetch = async (url) => {
  const file = ready.publicFiles.find((item) => new URL(url).pathname.endsWith(item.path));
  assert.ok(file, `Unexpected public URL: ${url}`);
  return new Response(file.source);
};

test("reporting week follows New York boundaries, including DST", () => {
  assert.equal(previousWeek(new Date("2026-10-12T03:59:59Z")), "2026-09-28-to-2026-10-04");
  assert.equal(previousWeek(new Date("2026-10-12T04:00:00Z")), "2026-10-05-to-2026-10-11");
  assert.equal(previousWeek(new Date("2026-11-02T04:59:59Z")), "2026-10-19-to-2026-10-25");
  assert.equal(previousWeek(new Date("2026-11-02T05:00:00Z")), "2026-10-26-to-2026-11-01");
});

test("every existing weekly schema builds a useful, email-compatible preview", async () => {
  const catalog = loadDataScript(await readFile(new URL("../ai-news/catalog.js", import.meta.url), "utf8")).AI_NEWS_CATALOG;
  for (const entry of catalog.weeklyAnalyses) {
    const result = await buildNewsletter({ week: entry.id });
    assert.ok(result.html.includes("Research / Academia"), entry.id);
    assert.ok(result.html.includes("Industry"), entry.id);
    assert.ok(result.html.includes("{{ unsubscribe }}"));
    assert.ok(!/<script\b|<iframe\b|role="tablist"/i.test(result.html));
    assert.ok(result.text.includes(result.analysisUrl));
    assert.ok(result.html.length < 100 * 1024);
  }
});

test("cross-month review links use the real archive month", async () => {
  const result = await buildNewsletter({ week: "2026-09-28-to-2026-10-04" });
  assert.equal(new URL(result.reviewUrl).searchParams.get("month"), "2026-10");
  assert.equal(new URL(result.reviewUrl).searchParams.get("slug"), "weekly-ai-september-28-october-4");
});

test("current repo previews select the latest finished edition", async () => {
  const result = await buildNewsletter({ now: new Date("2026-10-18T12:00:00Z") });
  assert.equal(result.entry.id, "2026-10-05-to-2026-10-11");
});

test("live selection skips a missing week instead of sending old backlog", () => {
  assert.equal(selectEdition({ weeklyAnalyses: [ready.entry] }, {
    mode: "send", now: new Date("2026-10-19T14:00:00Z")
  }), null);
});

test("live selection rejects stale explicit weeks and malformed IDs", () => {
  const catalog = { weeklyAnalyses: [preview.entry] };
  assert.throws(() => selectEdition(catalog, { mode: "send", week: preview.entry.id,
    now: new Date("2026-10-19T14:00:00Z") }), /previous completed week/);
  assert.equal(selectEdition(catalog, { mode: "send",
    now: new Date("2026-10-12T14:00:00Z") }).id, preview.entry.id);
  assert.throws(() => selectEdition(catalog, { week: "../../secrets" }), /Invalid week/);
});

test("campaigns target one provider list and preserve the unsubscribe placeholder", () => {
  const payload = campaignPayload(ready, settings);
  assert.deepEqual(payload.recipients, { listIds: [7] });
  assert.equal(payload.replyTo, settings.NEWSLETTER_REPLY_TO);
  assert.ok(payload.htmlContent.includes('href="{{ unsubscribe }}"'));
});

test("pasted email settings with surrounding whitespace produce valid provider addresses", () => {
  const payload = campaignPayload(ready, { ...settings,
    NEWSLETTER_SENDER_EMAIL: ` ${settings.NEWSLETTER_SENDER_EMAIL}\r\n`,
    NEWSLETTER_REPLY_TO: `\t${settings.NEWSLETTER_REPLY_TO}\n`
  });
  assert.equal(payload.sender.email, settings.NEWSLETTER_SENDER_EMAIL);
  assert.equal(payload.replyTo, settings.NEWSLETTER_REPLY_TO);
});

test("invalid internal whitespace is rejected and identifies the incorrect setting", () => {
  assert.throws(() => campaignPayload(ready, { ...settings,
    NEWSLETTER_SENDER_EMAIL: "news\r\n@example.org"
  }), /NEWSLETTER_SENDER_EMAIL/);
  assert.throws(() => campaignPayload(ready, { ...settings,
    NEWSLETTER_REPLY_TO: "team @example.org"
  }), /NEWSLETTER_REPLY_TO/);
});

test("incomplete sender, list, and mailing address settings fail closed", () => {
  assert.throws(() => campaignPayload(ready, { ...settings, BREVO_LIST_ID: "bad" }), /BREVO_LIST_ID/);
  assert.throws(() => campaignPayload(ready, { ...settings, NEWSLETTER_REPLY_TO: "" }), /NEWSLETTER_REPLY_TO/);
  assert.throws(() => campaignPayload({ ...ready, config: { ...ready.config, mailingAddress: "" } }, settings), /mailingAddress/);
});

test("disabled sending never calls the provider", async () => {
  await assert.rejects(deliver(ready, { mode: "send", env: { ...settings, NEWSLETTER_SENDING_ENABLED: "false" },
    request: () => assert.fail("Provider must not be called") }), /disabled/);
});

test("draft mode creates a campaign without sending or fetching the public site", async () => {
  const calls = [];
  const result = await deliver(ready, { mode: "draft", env: settings,
    fetcher: () => assert.fail("Draft does not require public deployment"),
    request: async (endpoint, options) => {
      calls.push({ endpoint, options });
      if (!options) return { campaigns: [] };
      assert.equal(endpoint, "/emailCampaigns");
      assert.equal(options.method, "POST");
      return { id: 42 };
    } });
  assert.equal(result.status, "draft-created");
  assert.equal(calls.length, 2);
});

test("existing drafts can be updated in draft mode", async () => {
  const calls = [];
  const result = await deliver(ready, { mode: "draft", env: settings, request: async (endpoint, options) => {
    calls.push({ endpoint, options });
    if (endpoint.includes("?")) return { campaigns: [{ id: 42, name: ready.name }] };
    if (!options) return { id: 42, status: "draft" };
    assert.equal(options.method, "PUT");
    return null;
  } });
  assert.equal(result.status, "draft-updated");
  assert.ok(!calls.some((item) => item.endpoint.endsWith("sendNow")));
});

for (const status of ["sent", "queued", "running", "scheduled"]) {
  test(`an existing ${status} campaign is never resubmitted`, async () => {
    const result = await deliver(ready, { mode: "send", env: settings, request: async (endpoint, options) => {
      assert.equal(options, undefined);
      return endpoint.includes("?") ? { campaigns: [{ id: 42, name: ready.name }] } : { id: 42, status };
    } });
    assert.equal(result.status, "already-submitted");
  });
}

test("an existing draft left by an ambiguous request is not automatically sent", async () => {
  await assert.rejects(deliver(ready, { mode: "send", env: settings, request: async (endpoint, options) => {
    assert.equal(options, undefined);
    return endpoint.includes("?") ? { campaigns: [{ id: 42, name: ready.name }] } : { id: 42, status: "draft" };
  } }), /existing draft needs review/);
});

test("duplicate detection searches beyond the first provider page", async () => {
  let foundSecondPage = false;
  const result = await deliver(ready, { mode: "send", env: settings, request: async (endpoint, options) => {
    assert.equal(options, undefined);
    if (endpoint.includes("offset=0&")) return { campaigns: Array.from({ length: 100 }, (_, id) => ({ id, name: `other-${id}` })) };
    if (endpoint.includes("offset=100&")) {
      foundSecondPage = true;
      return { campaigns: [{ id: 142, name: ready.name }] };
    }
    return { id: 142, status: "sent" };
  } });
  assert.ok(foundSecondPage);
  assert.equal(result.campaignId, 142);
});

test("ambiguous duplicate campaign names fail without mutation", async () => {
  await assert.rejects(deliver(ready, { mode: "send", env: settings, request: async (_, options) => {
    assert.equal(options, undefined);
    return { campaigns: [{ id: 1, name: ready.name }, { id: 2, name: ready.name }] };
  } }), /Multiple campaigns/);
});

test("unpublished content prevents campaign creation", async () => {
  await assert.rejects(deliver(ready, { mode: "send", env: settings,
    fetcher: async () => new Response("outdated website"), request: async (_, options) => {
      assert.equal(options, undefined);
      return { campaigns: [] };
    } }), /does not match the public website/);
});

test("matching public content allows one create and one send request", async () => {
  const calls = [];
  const result = await deliver(ready, { mode: "send", env: settings, fetcher: publicFetch,
    request: async (endpoint, options) => {
      calls.push({ endpoint, options });
      if (!options) return { campaigns: [] };
      if (endpoint === "/emailCampaigns") return { id: 42 };
      assert.equal(endpoint, "/emailCampaigns/42/sendNow");
      return null;
    } });
  assert.equal(result.status, "submitted");
  assert.equal(calls.filter((item) => item.options?.method === "POST").length, 2);
  await assertPublished(ready, publicFetch);
});

test("network failures are not retried or logged with secrets", async () => {
  let calls = 0;
  const request = brevoClient("PRIVATE-API-KEY", async () => {
    calls += 1;
    throw new Error("PRIVATE-API-KEY in a low-level error");
  });
  await assert.rejects(request("/emailCampaigns/42/sendNow", { method: "POST" }), (error) => {
    assert.ok(!error.message.includes("PRIVATE-API-KEY"));
    return /no automatic retry/.test(error.message);
  });
  assert.equal(calls, 1);
});

test("provider errors do not expose the response body", async () => {
  const request = brevoClient("secret", async () => new Response("private contact details", { status: 400 }));
  await assert.rejects(request("/emailCampaigns"), (error) => {
    assert.ok(!error.message.includes("private contact details"));
    return /HTTP 400/.test(error.message);
  });
});

test("campaign rejection logs include the provider reason and affected API path", async () => {
  const request = brevoClient("private-key", async () => Response.json({
    code: "method_not_allowed", message: "Campaign creation is unavailable for this account."
  }, { status: 405 }));
  await assert.rejects(request("/emailCampaigns", { method: "POST" }), (error) => {
    assert.match(error.message, /POST \/v3\/emailCampaigns failed \(HTTP 405\)/);
    assert.match(error.message, /method_not_allowed: Campaign creation is unavailable/);
    return true;
  });
});

test("provider error explanations redact credentials, addresses, and personal links", async () => {
  const privateKey = "xkeysib-PRIVATE_KEY_123456";
  const request = brevoClient(privateKey, async () => Response.json({
    code: "unauthorized",
    message: `IP address not authorized. Key ${privateKey}; other key xsmtpsib-OTHER_KEY; sender private@example.org; https://example.org/confirm?token=PRIVATE_TOKEN\r\nBearer PRIVATE_ACCESS_TOKEN`,
    contacts: [{ email: "private-response@example.org" }]
  }, { status: 401 }));
  await assert.rejects(request("/emailCampaigns?private=query"), (error) => {
    assert.match(error.message, /IP address not authorized/);
    for (const value of [privateKey, "OTHER_KEY", "private@example.org", "PRIVATE_TOKEN", "PRIVATE_ACCESS_TOKEN", "private-response@example.org", "private=query"]) {
      assert.ok(!error.message.includes(value), value);
    }
    assert.ok(!/[\r\n]/.test(error.message));
    return true;
  });
});

test("unrecognized error fields and long messages cannot dump response payloads", async () => {
  const request = brevoClient("private-key", async () => Response.json({
    code: "private-key", message: "A".repeat(5000), body: { secret: "PRIVATE_PAYLOAD" }
  }, { status: 400 }));
  await assert.rejects(request("/emailCampaigns"), (error) => {
    assert.ok(error.message.length < 700);
    assert.ok(!error.message.includes("private-key"));
    assert.ok(!error.message.includes("PRIVATE_PAYLOAD"));
    return true;
  });
});
