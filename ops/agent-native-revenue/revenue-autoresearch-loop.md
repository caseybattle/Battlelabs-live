# Battlelabs Revenue Autoresearch Loop

Updated: 2026-04-26

## Installed Loop Assets

- Karpathy-style `autoresearch` skill is installed at `C:\Users\casba\.codex\skills\autoresearch`.
- Ralph/Wiggum loop was not found as an installed skill by name, but the operating pattern is now encoded here for Battlelabs: fresh context, one measurable objective, implement, validate, record, repeat.

## Battlelabs Version

This is not an ML training loop. It is a revenue experiment loop.

Each run must:

1. Read `battlelabs-agent-product-dashboard.csv`, `portfolio-task-queue.csv`, and `metrics-snapshot-log.csv`.
2. Pick the highest-ROI no-spend action that is not blocked by payment, credentials, external posting, or account settings.
3. Favor adjacent products that reuse existing audience, assets, checkout, and distribution.
4. Produce one concrete artifact: product page, deliverable, SEO page, distribution packet, scorecard, or tracking update.
5. Run gates before promoting code changes:

```powershell
npm test
npm run lint
npm run build
npm run eval:products
```

6. Update the dashboard/task queue with what changed and the next measurable bottleneck.

## Current Wait States

- KDP payment-to-download: owner configured PayPal Auto Return; still needs one human-approved paid checkout-to-download test.
- Product Hunt: scheduled for 2026-04-28 03:01 ET; wait to capture final live URL.
- Google Sheets dashboard: blocked by Google Drive OAuth/sign-in; manual import path exists.

These waits must not stop production. The runner should start adjacent no-spend SKUs while waiting.

## Next Revenue Thesis

The most efficient next SKU is not a new audience. It is an upsell/cross-sell for the same KDP creator audience:

**KDP Listing Copy Pack**

Buyer:

- Creator with a KDP book, journal, workbook, or printable idea who has a niche but weak listing copy.

Promise:

- Turn a rough niche/book concept into title angles, subtitle options, seven bullet benefits, description copy, keyword groups, and compliance reminders.

Free tool:

- Listing angle grader or description checklist.

Paid product:

- $9-$19 downloadable listing copy workbook and templates.

Why this comes next:

- Reuses KDP traffic and Product Hunt audience.
- Can link from the existing KDP scorecard result page.
- Lower build effort than a new market.
- Buyer intent is closer to purchase than generic brainstorming.

## Decision Rule

Start KDP Listing Copy Pack if:

- KDP scorecard receives any checkout clicks, free sample clicks, Product Hunt comments, or direct feedback.
- Or if no signal exists by the next autonomous run but all active work is blocked by waiting states.

Do not clone into unrelated niches until the KDP path has at least one measurable signal or one full distribution cycle.
