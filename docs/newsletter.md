# Weekly AI newsletter

The existing weekly analysis and review articles supply the email content. Brevo
hosts the subscription form and stores subscribers, confirmations, and opt-outs.
GitHub Actions builds the email and submits a marketing campaign. No subscriber
addresses are stored in this repository, browser storage, or workflow artifacts.

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
node --test tests/newsletter.test.mjs
```

Open `.newsletter-preview/newsletter.html` in a browser. The same directory contains
the plain-text review copy and edition metadata. Generated files are ignored by Git.
The `{{ unsubscribe }}` placeholder only becomes a working personal link inside a
Brevo campaign; it intentionally does not work in the local preview. The text file
is an editorial reference, not an independently sent email.

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

Use the dedicated list only for confirmed, opted-in subscribers. Do not manually
import Professor Liu's contacts without their subscription. Brevo handles campaign
unsubscribe suppression; the generator never exports or iterates over recipients.

After account configuration, choose workflow mode `draft` to create a reviewable
campaign in Brevo. Repeating draft mode updates an existing draft for that week.
It does not send a test email or a subscriber email. The default `preview` mode
never calls Brevo, even when credentials happen to be present.

## Launch after authentication

1. Authenticate the chosen sending domain using Brevo's DNS instructions and verify
   the registered sender. This is separate from deploying the website.
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

## Reference documentation

- [Brevo signup forms](https://help.brevo.com/hc/en-us/articles/208771869-Create-a-sign-up-form-in-Brevo)
- [Create a campaign](https://developers.brevo.com/reference/create-email-campaign)
- [List campaigns](https://developers.brevo.com/reference/get-email-campaigns)
- [Send a campaign](https://developers.brevo.com/reference/send-email-campaign-now)
- [Unsubscribe placeholder](https://help.brevo.com/hc/en-us/articles/209553645-Insert-a-custom-unsubscribe-link-in-your-emails)
- [Domain authentication](https://help.brevo.com/hc/en-us/articles/12163873383186-Authenticate-your-domain-with-Brevo-Brevo-code-DKIM-DMARC)
- [GitHub scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
