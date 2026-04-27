# Product Hunt Launch Day Prep - KDP Scorecard

Launch:

- Product: KDP Niche Scorecard Generator
- Scheduled: 2026-04-28 03:01 ET / 12:01 PT
- Product Hunt status: scheduled
- Evidence: scheduled was confirmed in the Product Hunt maker UI on 2026-04-26 ET; re-capture a screenshot on launch day and save it as `outputs/producthunt-scheduled-2026-04-28.png`.

Canonical URLs:

- Product page: `https://battlelabs.live/kdp-niche-scorecard`
- Scoring checklist page: `https://battlelabs.live/kdp-niche-scorecard/checklist`
- Example share link: `https://battlelabs.live/kdp-niche-scorecard?bi=5&g=5&cc=4&ps=5&ed=4`
- Clean share examples: `ops/agent-native-revenue/kdp-scorecard-clean-share-examples.md`
- Listing fields (paste-ready): `ops/agent-native-revenue/producthunt-listing-fields-kdp-scorecard.md`

Preflight (2026-04-27 ET):

- `NEXT_PUBLIC_SITE_URL` is set in Vercel production and `battlelabs.live` is aliased to the latest production deployment.
- Verified: `/kdp-niche-scorecard` and `/kdp-niche-scorecard/checklist` return `200`, ship `<link rel="canonical">`, and `og:image` resolves under `https://battlelabs.live/...`.
- Verified: `https://battlelabs.live/robots.txt` and `https://battlelabs.live/sitemap.xml` return `200`.

Example to Mention if Asked:

- Example idea: `Grandma Memory Journal Gift Kit`
- Buyer intent: 5
- Giftability: 5
- Competition clarity: 4
- Production simplicity: 5
- Evergreen demand: 4
- Score: 93 / Strong
- Why it works: clear gift buyer, clear recipient, evergreen family-memory use case, and simple first product format.

Launch-Day Reply Templates:

1. Scoring logic question

`The score is intentionally simple: buyer intent and giftability carry the most weight, then competition clarity, production simplicity, and evergreen demand. I kept it as a planning aid rather than a ranking predictor because KDP outcomes depend on execution, listing quality, reviews, category fit, and platform behavior.`

2. "Does this predict sales?"

`No. It does not predict sales, rankings, royalties, or Amazon placement. It is a go/no-go checklist for deciding whether an idea is specific enough to test before building the full product.`

3. "Why KDP?"

`KDP and low-content products are easy to overbuild before validating the buyer and use case. This tool is meant to force that check earlier: who buys it, why now, how giftable it is, and whether it can be built cleanly without copying crowded listings.`

4. Bug or UX feedback

`Appreciate the catch. I am tracking launch feedback and will patch clear UX issues before expanding the paid report template or cloning adjacent scorecards.`

Do Not Do:

- Do not ask for upvotes.
- Do not claim sales, income, rankings, or passive income.
- Do not repost the Reddit filtered post.
- Do not retry HN Show HN while the account is gated by `/showlim`.
- Do not add checkout/payment claims until an actual checkout link is live.

Launch-Day Checklist:

- Verify the Product Hunt listing URL points to `https://battlelabs.live/kdp-niche-scorecard` and the preview card lands on the scorecard page (not a different route).
- Capture final Product Hunt URL once live.
- Add final URL and timestamp to `ops/agent-native-revenue/placement-tracking-log.csv`.
- Check the product page and example share link from a fresh browser session.
- Verify `[METRIC_EVENT]` logging is present in deployment logs (see `ops/agent-native-revenue/metrics-playbook.md`).
- Monitor comments for buyer language, objections, and feature requests.
- After 24 hours, record Product Hunt views, free sample clicks, checkout clicks, sales, refunds, and useful comments.

Optional log capture (no-spend, for deterministic counting):

```powershell
vercel inspect https://battlelabs.live

powershell -ExecutionPolicy Bypass -File scripts/capture-vercel-logs.ps1 `
  -Target https://battlelabs.live `
  -OutPath outputs/producthunt-launch-logs.txt `
  -Minutes 30
```
