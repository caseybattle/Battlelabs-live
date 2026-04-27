# First Three Organic Placement Packet - KDP Scorecard

## Purpose

Ship the first no-spend distribution test for the live KDP Niche Scorecard funnel.

Live URL:

`https://battlelabs.live/kdp-niche-scorecard`

Tracked live URL:

`https://battlelabs.live/kdp-niche-scorecard?utm_source=community&utm_medium=organic&utm_campaign=kdp_scorecard_launch`

Checklist URL (public-friendly; do not lead public posts with internal terminology):

`https://battlelabs.live/kdp-niche-scorecard/checklist`

Tracked checklist URL:

Use clean canonical URLs for community posts unless platform analytics are explicitly needed:

`https://battlelabs.live/kdp-niche-scorecard`

Preview note (2026-04-26 ET):

- The scorecard route now ships route-level Open Graph + Twitter images, so link previews render a clean share card on platforms that support it.

Rules:

- No paid boosts, ads, paid APIs, or vote solicitation.
- No sales, ranking, income, royalty, or bestseller claims.
- If a community discourages links, post the value-first text without a link and only share the URL when requested.
- For Reddit, do not post links until the exact subreddit rules are checked in the logged-in UI or the moderators approve it.
- Public copy should call this a scorecard/checklist/tool; avoid unnecessary internal terminology.
- Track every placement URL, publish time, views, sample clicks, checkout clicks, and comments.

## Auth preflight (2026-04-26)

Posting requires authenticated sessions:

- Product Hunt: `/posts/new` redirects to “How can I get access to post?” (personal accounts may need an age/wait period). Evidence: `outputs/ph-access-help.png`.
- Hacker News: `/submit` requires login. Evidence: `outputs/hn-login.png`.
- Reddit: `/r/SideProject/submit` redirects to login. Evidence: `outputs/reddit-login.png`.

## Current execution status (2026-04-26 ET)

Product Hunt is no longer blocked. It was submitted through the authenticated browser session and Product Hunt confirmed it is **successfully scheduled**:

- Product Hunt: scheduled for April 28, 2026 at 12:01am PT / 03:01am ET. Screenshot of the scheduling confirmation was not saved; re-capture on 2026-04-28 and save it as `outputs/producthunt-scheduled-2026-04-28.png`.
- Hacker News: blocked after authentication by HN's Show HN limit page (`/showlim`). Do not repost or evade. Defer until the account has normal participation history.
- Reddit: submitted to r/SideProject as a text-first feedback post with one clean link, then removed by Reddit's filters. Placement URL: `https://www.reddit.com/r/SideProject/comments/1sw788w/i_built_a_free_kdp_niche_scorecard_and_want/`. Do not immediately repost.

Tracking state:

- `ops/agent-native-revenue/placement-tracking-log.csv` status set to `Scheduled` for Product Hunt, `Blocked` for Hacker News, and `Filtered` for Reddit.

Next action (human, no-spend):

1. On April 28, capture the final Product Hunt URL and monitor comments without asking for upvotes.
2. Do not immediately retry Reddit or HN; that would look like filter evasion.
3. If Reddit is worth recovering, send one concise modmail asking whether the filtered post is acceptable for r/SideProject. Otherwise move to lower-risk organic placements.
4. Continue no-spend distribution through Product Hunt launch-day monitoring, SEO improvements, and non-Reddit placement opportunities already listed in `community-opportunities.csv`.
5. Before any future community post, verify the exact subreddit/community rules in the live logged-in UI, use the canonical `battlelabs.live` URL, and stop before posting if the page preview points anywhere except the KDP scorecard.

## Placement 1: Product Hunt

Product name:

`KDP Niche Scorecard Generator`

Tagline:

`A free 5-factor scorecard for testing KDP book ideas before building them.`

Description:

`KDP Niche Scorecard Generator is a free planning tool for self-publishers and digital product builders. It scores a book or template idea across buyer intent, giftability, competition clarity, production simplicity, and evergreen demand. The goal is to help creators pause weak ideas earlier and focus on clearer niches. It is not an Amazon ranking predictor, and no sales or ranking results are guaranteed.`

First comment:

`I built this as a no-signup validation tool for KDP and low-content book ideas. The scorecard intentionally avoids ranking or income promises. I am looking for feedback on whether the five dimensions are clear enough: buyer intent, giftability, competition clarity, production simplicity, and evergreen demand.`

URL:

`https://battlelabs.live/kdp-niche-scorecard`

Backup (if posting access is gated): use the checklist page only if the main product page preview is wrong.

Tracking fields:

- Tracked URL: `https://battlelabs.live/kdp-niche-scorecard?utm_source=producthunt&utm_medium=organic&utm_campaign=kdp_scorecard_launch`
- Placement URL:
- Published at: scheduled for 2026-04-28 03:01 ET (12:01am PT)
- Views after 24h:
- Free sample clicks after 24h:
- Checkout clicks after 24h:
- Comments / buyer language: waiting for launch day

## Placement 2: Hacker News Show HN

Title:

`Show HN: I built a free KDP niche scorecard for book ideas`

URL:

`https://battlelabs.live/kdp-niche-scorecard`

Backup (if direct tool link feels too promotional): submit a non-promotional checklist write-up instead, without sales wording.

Optional first comment:

`This is a small free tool for scoring KDP or low-content book ideas before spending time on design and formatting. It scores five dimensions: buyer intent, giftability, competition clarity, production simplicity, and evergreen demand. It is a planning aid, not an Amazon ranking predictor. I would be interested in feedback on whether the scoring model is too simple, too subjective, or missing a stronger validation signal.`

Tracking fields:

- Tracked URL: `https://battlelabs.live/kdp-niche-scorecard`
- Placement URL: blocked by HN `/showlim`
- Published at: not published
- HN points / comments after 24h:
- Views after 24h:
- Free sample clicks after 24h:
- Checkout clicks after 24h:
- Comments / buyer language:

## Placement 3: Reddit r/SideProject

Title:

`I built a free scorecard for testing KDP book ideas before making them`

Body:

`I built a small free tool that scores a KDP or low-content book idea across five dimensions:

1. Buyer intent
2. Giftability
3. Competition clarity
4. Production simplicity
5. Evergreen demand

The goal is to catch weak or too-generic ideas before spending a weekend building the interior, cover, listing, and launch assets.

It does not predict Amazon rankings or sales. It is just a structured go/no-go planning aid.

I would appreciate feedback on the scoring model: are these the right five dimensions, or is there a better signal I should add before calling a niche worth testing?

Tool: https://battlelabs.live/kdp-niche-scorecard`

Alternative link target (value-first): `https://battlelabs.live/kdp-niche-scorecard`

Fallback no-link body:

`I built a small free scorecard model for testing KDP or low-content book ideas before making them. It scores buyer intent, giftability, competition clarity, production simplicity, and evergreen demand.

The goal is to catch weak or too-generic ideas before spending a weekend building the interior, cover, listing, and launch assets.

It does not predict Amazon rankings or sales. It is just a structured go/no-go planning aid.

I would appreciate feedback on the scoring model: are these the right five dimensions, or is there a better signal I should add before calling a niche worth testing?`

Tracking fields:

- Tracked URL: `https://battlelabs.live/kdp-niche-scorecard`
- Placement URL: `https://www.reddit.com/r/SideProject/comments/1sw788w/i_built_a_free_kdp_niche_scorecard_and_want/`
- Published at: 2026-04-26 ET; removed by Reddit filters
- Upvotes / comments after 24h:
- Views after 24h:
- Free sample clicks after 24h:
- Checkout clicks after 24h:
- Comments / buyer language:

## Measurement Update Rule

After posting, update:

- `ops/agent-native-revenue/battlelabs-agent-product-dashboard.csv`
- `ops/agent-native-revenue/community-opportunities.csv`
- `ops/agent-native-revenue/placement-tracking-log.csv`

Decision after 24-48 hours:

- Keep: any real comments, sample clicks, or checkout clicks.
- Improve: views but no sample clicks.
- Clone later: repeated checkout clicks, buyer requests, or 5%+ free sample click rate.
- Kill distribution angle: no views or engagement after all three placements.
