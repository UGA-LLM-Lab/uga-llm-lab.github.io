# Daily and weekly AI newsletters

The existing weekly analysis and review articles supply the email content. Brevo
hosts the subscription form and stores subscribers, confirmations, and opt-outs.
GitHub Actions builds the email and submits a marketing campaign. No subscriber
addresses are stored in this repository, browser storage, or workflow artifacts.

Daily emails contain every visible article published on the selected day: a bold,
underlined title linking to the full article, an estimated reading time when full
article text is available, and the existing short summary. Weekly reviews published
that day are included too. Reading time is estimated at 200 words/minute. The system
does not write new articles or generate new summaries; editors keep publishing news
through the existing monthly archives.

Daily subjects feature the first three article headlines with light emoji accents,
for example, “DeepSeek upgrades Flash + opens search ✨”. Editors can add an optional
`newsletterHeadline` to an article in its monthly data file to give it a shorter
email headline. Otherwise, the existing title is used. Each headline is shortened
at a word boundary to fit 48 characters; the email still includes every story.

Daily and weekly subscriptions use separate Brevo lists and separate sending
switches. Existing weekly subscribers are never automatically enrolled in daily mail.

## What works before domain authentication

- All three news page types include the signup section. Until configured, it
  explains that subscriptions are coming soon and collects nothing.
- Preview generation and automated delivery tests require no Brevo account,
  network connection, credentials, or sending-domain authentication.
- The workflow runs every Monday at 9:17 a.m. America/New_York, including daylight
  saving adjustments. Before launch, scheduled runs only generate preview artifacts.
- Once a Brevo account and sender exist, draft mode can create a campaign without
  sending it. Brevo may require account/sender verification even for creating drafts.

## Preview locally

Use Node.js 24; there are no dependencies to install:

```sh
node scripts/newsletter.mjs
node scripts/newsletter.mjs --week 2026-09-28-to-2026-10-04
node scripts/newsletter.mjs --frequency daily
node scripts/newsletter.mjs --frequency daily --date 2026-10-17
node --test tests/*.test.mjs
```

Open `.newsletter-preview/newsletter.html` in a browser. The same directory contains
the plain-text review copy and edition metadata. Generated files are ignored by Git.
The `{{ unsubscribe }}` placeholder only becomes a working personal link inside a
Brevo campaign; it intentionally does not work in the local preview. The text file
is an editorial reference, not an independently sent email.

Daily previews are saved separately at `.newsletter-preview/daily/newsletter.html`.
By default, daily preview/draft mode selects the latest day with published articles
up to yesterday in America/New_York. `--date` can inspect another day, including
today. Live daily mode sends yesterday's articles only and skips days with no stories;
it never fills a missing day with older news. Article dates use the existing
`sortDate` publication field, not Git commit timestamps or dates mentioned in a story.

Preview defaults to the latest catalog edition whose reporting week has finished.
An explicit `--week` allows reviewing any registered edition. Both weekly JSON
schemas are supported, and review slugs are resolved across every registered month.
The email uses the weekly synthesis (or review summary) and the first finding from
each analysis section, with links to the full analysis and week-in-review article.

You can also open **Actions → Weekly AI newsletter → Run workflow**, leave mode
as `preview`, and download the `weekly-newsletter-preview` artifact. Draft/send
requests from branches other than the default branch only produce a local preview.

## Configure subscription signup

1. Create a lab-owned Brevo account and a dedicated **UGA AI Weekly** contact list.
2. Create a full-page/embedded signup form targeting that list. Enable double
   opt-in and CAPTCHA, and explain the weekly frequency and use of email addresses.
   Add an appropriate privacy notice/link in the hosted form. Ask only for email
   initially; a name can be optional.
3. Paste the form's HTTPS `*.sibforms.com` URL into `signupFormUrl` in
   `ai-news/newsletter-config.json`. Use the URL from Brevo's iframe embed code,
   not the Brevo administration URL.
4. The news index, article page, and weekly analysis page will embed this form and
   offer a link to open it separately. Resize `.newsletter__form` in the site CSS
   if your form is taller than the default; scrolling remains available.
5. Test the full flow in the actual Brevo form: submission, confirmation email,
   confirmation link, list membership, duplicate signup, and unsubscribe. Publish
   the form URL only when that flow works. Confirmation email delivery itself may
   require Brevo account/sender verification; the local preview cannot test it.

## Configure campaigns

The `mailingAddress` in the same JSON config uses the School of Computing's
[published postal address](https://www.computing.uga.edu/find-or-contact-us):
415 Boyd Research and Education Center, University of Georgia, Athens, GA 30602-7404.
Use this department address in Brevo too, rather than an unrelated campus landmark.
Update the configuration if the lab supplies a different mailing address.
`siteUrl` defaults to the repository's custom domain and must point to the deployed
site. Do not put secrets in this public file.

In **GitHub repository → Settings → Secrets and variables → Actions**, configure:

| Setting | Type | Purpose |
| --- | --- | --- |
| `BREVO_API_KEY` | Secret | Campaign API access; never paste into source or chat |
| `BREVO_LIST_ID` | Variable | Numeric ID of the dedicated, confirmed subscriber list |
| `NEWSLETTER_SENDER_EMAIL` | Variable | Sender registered with Brevo |
| `NEWSLETTER_REPLY_TO` | Variable | Monitored address for subscriber replies |
| `NEWSLETTER_SENDING_ENABLED` | Variable | Leave absent or `false` until launch |
| `BREVO_DAILY_LIST_ID` | Variable | Separate numeric list ID for confirmed daily subscribers |
| `NEWSLETTER_DAILY_SENDING_ENABLED` | Variable | Leave absent or `false` until daily launch |

Use the dedicated list only for confirmed, opted-in subscribers. Do not manually
import Professor Liu's contacts without their subscription. Brevo handles campaign
unsubscribe suppression; the generator never exports or iterates over recipients.

After account configuration, choose workflow mode `draft` to create a reviewable
campaign in Brevo. Repeating draft mode updates an existing draft for that week.
It does not send a test email or a subscriber email. The default `preview` mode
never calls Brevo, even when credentials happen to be present.

## Set up optional daily subscriptions

1. Create a **UGA AI Daily** list in the same Brevo account. Its ID must differ from
   the existing **UGA AI Weekly** list (`3`). Do not copy weekly subscribers into it.
2. Create a separate full-page/embedded form targeting the daily list, with double
   opt-in. Explain that it delivers article links and short summaries each morning
   on days with new stories. Use a confirmation template that identifies the daily
   subscription rather than promising one email per week.
3. Add the new list ID as `BREVO_DAILY_LIST_ID` in GitHub repository variables. Keep
   `BREVO_LIST_ID=3` configured too: daily mode checks that the two lists differ.
4. Put the new form's HTTPS `*.sibforms.com` URL in `dailySignupFormUrl` in
   `ai-news/newsletter-config.json`. Leave `signupFormUrl` pointing at the weekly
   form. The daily section appears on the news pages only when a separate valid
   daily form is configured. Test confirmation and actual daily list membership.
5. Open **Actions → Daily AI newsletter → Run workflow**. Use `preview` to review
   the email without credentials, then `draft` to test the daily list integration.
   The shared sender/reply settings and `BREVO_API_KEY` are reused.
6. After testing, setting `NEWSLETTER_DAILY_SENDING_ENABLED=true` enables the daily
   8:17 a.m. America/New_York schedule. Weekly delivery keeps its separate Monday
   9:17 a.m. schedule and switch. Neither switch enables the other cadence.

Both workflows share a concurrency group to serialize campaign mutations. Provider
campaign names are `uga-ai-daily-YYYY-MM-DD` and `uga-ai-weekly-<week-id>`, so their
delivery histories are distinct. Brevo may apply a standard email unsubscribe across
all email lists in the account; configure and test a profile/preference form if you
want readers to change frequency instead of opting out of all email.

Daily and weekly campaigns share the account's sending allowance. A paid plan may
be needed as the lists grow; turning on daily mail does not raise the free daily cap.
If publishing happens after the daily schedule, run `send` manually later that day
while yesterday is still the eligible date.

## Launch sending

1. Verify the registered sender. For an organization-controlled sending domain,
   authenticate it using Brevo's DNS instructions. Brevo can also use its temporary
   `brevosend.com` replacement for an accepted verified Gmail sender; a Gmail inbox
   itself cannot be domain-authenticated. The weekly pilot successfully created a
   campaign and delivered a test using that temporary setup. Authentication does
   not guarantee inbox placement, so test the actual sender before launch.
2. Review a generated campaign, then use Brevo to send a test to the lab team.
   Check Gmail/Outlook rendering, links, mailing address, and real unsubscribe flow.
3. Confirm the plan can deliver to the full list on the same day. Brevo's free plan
   currently allows 300 sends/day, shared with other sending activity. The workflow
   does not split an oversized campaign across days or automatically buy capacity.
4. Publish the current weekly edition through the usual process: add its analysis
   JSON, weekly review, and catalog entry, then commit and deploy the website.
5. Set `NEWSLETTER_SENDING_ENABLED` to exactly `true`. The next Monday run can now
   send the **previous Monday–Sunday reporting week**, provided it is published
   on the website. After launch, publishing weekly content is enough; no extra
   per-edition approval flag is needed. A manual `send` run can retry later that
   week if publishing happened after Monday's scheduled run. Missing editions are
   skipped; incomplete or not-yet-deployed content stops with an actionable error.
   Old backlog is never sent automatically.

To stop automatic and manual workflow sending, set the variable back to `false`.
This does not recall a campaign already accepted by Brevo or stop campaigns sent
directly in its dashboard.

## Delivery, retries, and failure handling

- The generator checks that the live catalog, monthly archive, and weekly JSON
  exactly match the checked-out versions before creating a live campaign. If the
  deployment has not caught up, wait and retry. It compares data bytes, so an
  unrelated update to the same monthly file can also require a fresh checkout.
- Each edition has a stable campaign name, `uga-ai-weekly-<edition-id>`. All Brevo
  campaign pages are searched, including sent campaigns. Already submitted/sent
  campaigns are skipped. Keep these campaigns and their names in Brevo so their
  history can prevent duplicate delivery.
- If a campaign already exists as a draft, live mode stops. This can mean someone
  prepared a review draft or an earlier request was interrupted. Inspect it and
  its sending history, then send the draft **in Brevo** when ready. The workflow
  intentionally does not automatically resubmit an existing draft after a timeout.
- Unexpected states and duplicate campaign names require manual investigation.
  API mutations are never automatically retried. Campaign submission is not a
  guarantee of inbox delivery; use Brevo's reporting to monitor delivery/bounces.
- GitHub concurrency serializes this repository's newsletter runs. Use this
  workflow as the only automated sender; don't run independent live CLI senders
  simultaneously. Brevo does not enforce uniqueness of campaign names.
- Enable GitHub Actions failure notifications for the maintainer and check Brevo's
  campaign history each week. GitHub schedules can be delayed and can be disabled
  after 60 days of inactivity in a public repository. Manual runs remain available.
- Never expose the API key to browser JavaScript or pull-request previews.

## Handoff status and domain decision

The weekly workflow, subscriber form, and provider integration have been tested:
Brevo draft campaign #5 was created, and the user received a test email in Gmail.
Weekly live sending is disabled. The daily workflow and linked-title/summary layout
have automated and browser coverage, but daily provider delivery still requires a
separate Brevo list, hosted form, and test campaign. Daily live sending is disabled
unless its separate repository variable is explicitly set to `true`.

Before purchasing a separate domain, coordinate with the lab's PhD maintainer about
using a UGA-managed sending domain or subdomain and having its DNS administrator add
Brevo's records. The website can keep its existing UGA address regardless of which
email-sending domain is chosen. A separate purchased domain is an alternative when
the lab wants to manage its own email DNS and annual renewal.

## Reference documentation

- [Brevo signup forms](https://help.brevo.com/hc/en-us/articles/208771869-Create-a-sign-up-form-in-Brevo)
- [Create a campaign](https://developers.brevo.com/reference/create-email-campaign)
- [List campaigns](https://developers.brevo.com/reference/get-email-campaigns)
- [Send a campaign](https://developers.brevo.com/reference/send-email-campaign-now)
- [Unsubscribe placeholder](https://help.brevo.com/hc/en-us/articles/209553645-Insert-a-custom-unsubscribe-link-in-your-emails)
- [Domain authentication](https://help.brevo.com/hc/en-us/articles/12163873383186-Authenticate-your-domain-with-Brevo-Brevo-code-DKIM-DMARC)
- [GitHub scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
