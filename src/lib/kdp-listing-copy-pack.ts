export const kdpListingCopyPack = {
  sku: "KDP-LISTING-001",
  name: "KDP Listing Copy Pack",
  angle: "KDP Listing Copy Pack",
  introPrice: 9,
  regularPrice: 19,
  audience:
    "Self-publishers, low-content book creators, journal creators, and printable sellers who have a niche idea but weak listing copy.",
  promise:
    "Turn a rough KDP book, journal, workbook, or printable idea into clearer title angles, subtitle options, benefit bullets, description copy, keyword groups, and compliance reminders.",
  disclaimer: "No sales or ranking results are guaranteed.",
  checkoutEnvVar: "NEXT_PUBLIC_KDP_LISTING_COPY_PACK_CHECKOUT_URL",
  freeChecklistPath: "/products/kdp-listing-copy-pack/free-listing-angle-checklist.md",
  previewPath: "/products/kdp-listing-copy-pack/paid-workbook-template.md",
  deliverables: [
    "Title angle worksheet (recipient, occasion, format, outcome)",
    "Subtitle pattern bank + fill-in prompts",
    "Seven bullet-benefit prompts (buyer-first, not feature-first)",
    "Description structure + swipeable outline",
    "Keyword cluster worksheet (intent, recipient, occasion, format)",
    "Buyer objection checklist (clarity, proof, originality, risk)",
    "KDP compliance + required AI-content disclosure reminders",
    "Fictional before/after example (no copied Amazon listings)",
  ],
  compliance: [
    "Review and edit before publishing. You are responsible for originality, trademarks, and platform rules.",
    "No sales, ranking, income, or approval outcomes are guaranteed.",
    "Do not copy competitor listings or stuff keywords; write for clarity first.",
    "Disclose AI-assisted content on platforms that require it (including KDP).",
  ],
} as const;

export type KdpListingCopyPack = typeof kdpListingCopyPack;

