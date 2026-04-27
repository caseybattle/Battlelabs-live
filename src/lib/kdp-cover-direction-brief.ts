export const kdpCoverDirectionBrief = {
  sku: "KDP-COVER-001",
  name: "KDP Cover Direction Brief",
  angle: "KDP Cover Direction Brief",
  introPrice: 9,
  regularPrice: 19,
  audience:
    "Self-publishers and low-content book creators who have a niche idea but need a clearer cover direction brief.",
  promise:
    "Turn a rough KDP book, journal, or workbook idea into cover direction: audience + promise, mood cues, typography, color constraints, imagery direction, and a thumbnail test checklist.",
  disclaimer: "No sales or ranking results are guaranteed.",
  checkoutEnvVar: "NEXT_PUBLIC_KDP_COVER_DIRECTION_BRIEF_CHECKOUT_URL",
  freeChecklistPath: "/products/kdp-cover-direction-brief/free-cover-direction-prompt.md",
  previewPath: "/products/kdp-cover-direction-brief/paid-brief-template.md",
  deliverables: [
    "One-page cover brief worksheet (buyer, promise, category cues)",
    "Mood + keywords-to-visual mapping table",
    "Typography direction sheet (weight, style, hierarchy)",
    "Color constraint prompts (avoid muddy + low-contrast thumbnails)",
    "Imagery constraints (what to include / avoid, no copied covers)",
    "Thumbnail test checklist (readable at small size)",
    "KDP compliance + required AI-content disclosure reminders",
    "Fictional example cover briefs (no copied covers)",
  ],
  compliance: [
    "Review and edit before publishing. You are responsible for originality, trademarks, and platform rules.",
    "No sales, ranking, income, royalty, bestseller, approval, or traffic results are guaranteed.",
    "Do not copy competitor covers or listings; use category cues without imitation.",
    "Disclose AI-assisted content on platforms that require it (including KDP).",
  ],
} as const;

export type KdpCoverDirectionBrief = typeof kdpCoverDirectionBrief;

