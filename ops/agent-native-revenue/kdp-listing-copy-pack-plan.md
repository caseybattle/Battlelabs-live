# KDP Listing Copy Pack Plan

Status: Ready

## SKU

`KDP-LISTING-001`

## Product Angle

KDP Listing Copy Pack

## Buyer

Self-publishers, low-content book creators, journal creators, and printable sellers who already have a book or niche idea but do not know how to explain it clearly on a sales page or Amazon listing.

## Problem

The buyer can create pages, journals, and covers faster than they can write a listing that sounds specific, compliant, and buyer-oriented. Weak listings make even decent products look generic.

## Promise

Turn a rough KDP book, journal, workbook, or printable idea into cleaner title angles, subtitle options, benefit bullets, description copy, keyword groups, and compliance reminders.

No sales, ranking, or approval outcome is guaranteed.

## Free Hook

Free KDP Listing Angle Checklist

The checklist should help the buyer score whether their listing explains:

- the buyer or recipient,
- the use case,
- the gift or workflow occasion,
- the outcome,
- the format,
- the differentiator,
- and the compliance risk.

## Paid Deliverable

KDP Listing Copy Workbook

Suggested intro price: `$9`

Regular target price: `$19`

Include:

- title angle worksheet,
- subtitle pattern bank,
- seven bullet-benefit prompts,
- description structure,
- keyword cluster worksheet,
- buyer objection checklist,
- KDP compliance reminder,
- AI disclosure reminder,
- example before/after listing copy using fictional products only.

## Landing Page Shape

Route:

`/kdp-listing-copy-pack`

Sections:

1. Hero: "Make the listing easier to understand before you publish."
2. Free checklist CTA.
3. Paid workbook CTA.
4. What the workbook includes.
5. Compliance and originality notes.
6. FAQ.
7. Cross-link back to `/kdp-niche-scorecard`.

## Cross-Sell Logic

Add a small link from the KDP scorecard page after the score results:

If the user already has a niche, the next bottleneck is usually listing clarity.

Use this only after the first version of `/kdp-listing-copy-pack` exists and evals pass.

## Compliance Notes

- Do not claim ranking improvements.
- Do not claim guaranteed sales.
- Do not encourage keyword stuffing.
- Remind buyers to check trademarks, category rules, metadata rules, and AI-content disclosure requirements.
- Examples must be fictional and not copied from live Amazon listings.

## Kill / Improve Rules

Keep building if:

- KDP scorecard gets checkout clicks or Product Hunt comments mentioning listing/positioning,
- the listing page gets checklist clicks,
- or users ask for title/description help.

Improve if:

- checklist clicks occur but paid workbook clicks do not.

Kill or pause if:

- no KDP scorecard signal exists after the Product Hunt launch cycle,
- the page needs too much explanation,
- or compliance risk rises.

## First Build Tasks

1. Create free checklist source under `public/products/kdp-listing-copy-pack/`.
2. Create paid workbook source under `deliverables/kdp-listing-copy-pack/`.
3. Add route `/kdp-listing-copy-pack`.
4. Add tests for offer language and risky-claim avoidance.
5. Add dashboard row metrics.
6. Run full gates before deploying.
