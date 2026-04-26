# First Three Organic Placement Packet - KDP Scorecard

## Purpose

Ship the first no-spend distribution test for the live KDP Niche Scorecard funnel.

Live URL:

`https://battlelabs-live.vercel.app/kdp-niche-scorecard`

Tracked live URL:

`https://battlelabs-live.vercel.app/kdp-niche-scorecard?utm_source=community&utm_medium=organic&utm_campaign=kdp_scorecard_launch`

Rubric URL (value-first checklist, easier to paste in communities):

`https://battlelabs-live.vercel.app/kdp-niche-scorecard/rubric`

Tracked rubric URL:

`https://battlelabs-live.vercel.app/kdp-niche-scorecard/rubric?utm_source=community&utm_medium=organic&utm_campaign=kdp_scorecard_launch`

Rules:

- No paid boosts, ads, paid APIs, or vote solicitation.
- No sales, ranking, income, royalty, or bestseller claims.
- If a community discourages links, post the value-first text without a link and only share the URL when requested.
- Track every placement URL, publish time, views, sample clicks, checkout clicks, and comments.

## Auth preflight (2026-04-26)

Posting requires authenticated sessions:

- Product Hunt: `/posts/new` redirects to “How can I get access to post?” (personal accounts may need an age/wait period). Evidence: `outputs/ph-access-help.png`.
- Hacker News: `/submit` requires login. Evidence: `outputs/hn-login.png`.
- Reddit: `/r/SideProject/submit` redirects to login. Evidence: `outputs/reddit-login.png`.

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

`https://battlelabs-live.vercel.app/kdp-niche-scorecard`

Backup (if posting access is gated): use the rubric URL as the shared link target.

Tracking fields:

- Tracked URL: `https://battlelabs-live.vercel.app/kdp-niche-scorecard?utm_source=producthunt&utm_medium=organic&utm_campaign=kdp_scorecard_launch`
- Placement URL:
- Published at:
- Views after 24h:
- Free sample clicks after 24h:
- Checkout clicks after 24h:
- Comments / buyer language:

## Placement 2: Hacker News Show HN

Title:

`Show HN: I built a free KDP niche scorecard for book ideas`

URL:

`https://battlelabs-live.vercel.app/kdp-niche-scorecard`

Backup (if direct tool link feels too promotional): submit the rubric write-up instead.

Optional first comment:

`This is a small free tool for scoring KDP or low-content book ideas before spending time on design and formatting. It scores five dimensions: buyer intent, giftability, competition clarity, production simplicity, and evergreen demand. It is a planning aid, not an Amazon ranking predictor. I would be interested in feedback on whether the scoring model is too simple, too subjective, or missing a stronger validation signal.`

Tracking fields:

- Tracked URL: `https://battlelabs-live.vercel.app/kdp-niche-scorecard/rubric?utm_source=hackernews&utm_medium=organic&utm_campaign=kdp_scorecard_launch`
- Placement URL:
- Published at:
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

Tool: https://battlelabs-live.vercel.app/kdp-niche-scorecard`

Alternative link target (value-first): `https://battlelabs-live.vercel.app/kdp-niche-scorecard/rubric`

Fallback no-link body:

`I built a small free scorecard model for testing KDP or low-content book ideas before making them. It scores buyer intent, giftability, competition clarity, production simplicity, and evergreen demand.

The goal is to catch weak or too-generic ideas before spending a weekend building the interior, cover, listing, and launch assets.

It does not predict Amazon rankings or sales. It is just a structured go/no-go planning aid.

I would appreciate feedback on the scoring model: are these the right five dimensions, or is there a better signal I should add before calling a niche worth testing?`

Tracking fields:

- Tracked URL: `https://battlelabs-live.vercel.app/kdp-niche-scorecard/rubric?utm_source=reddit&utm_medium=organic&utm_campaign=kdp_scorecard_launch&utm_content=sideproject`
- Placement URL:
- Published at:
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
