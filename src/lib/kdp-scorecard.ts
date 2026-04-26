export type KdpScoreInput = {
  buyerIntent: number;
  giftability: number;
  competitionClarity: number;
  productionSimplicity: number;
  evergreenDemand: number;
};

export type KdpScoreBand = "Strong" | "Test" | "Weak";

export type KdpScoreResult = {
  score: number;
  band: KdpScoreBand;
  recommendations: string[];
};

const WEIGHTS: Record<keyof KdpScoreInput, number> = {
  buyerIntent: 0.28,
  giftability: 0.22,
  competitionClarity: 0.18,
  productionSimplicity: 0.17,
  evergreenDemand: 0.15,
};

export const KDP_SCORECARD_OFFER = {
  name: "KDP Niche Scorecard Generator + KDP Launch Report",
  price: "$19",
  regularPrice: "$39-$49",
  checkoutLabel: "Get the $19 launch report",
  disclaimer:
    "No sales or ranking results are guaranteed. The scorecard is a planning aid, not Amazon or marketplace advice.",
};

export function getKdpScoreBand(score: number): KdpScoreBand {
  if (score >= 75) return "Strong";
  if (score >= 45) return "Test";
  return "Weak";
}

function clampRating(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(5, Math.max(1, Math.round(value)));
}

export function calculateKdpScore(input: KdpScoreInput): KdpScoreResult {
  const weighted = Object.entries(WEIGHTS).reduce((total, [key, weight]) => {
    const rating = clampRating(input[key as keyof KdpScoreInput]);
    return total + (rating / 5) * weight * 100;
  }, 0);

  const score = Math.round(weighted);
  const band = getKdpScoreBand(score);

  const recommendations =
    band === "Strong"
      ? [
          "Create a sample listing and test the promise with organic posts.",
          "Build one paid launch report before cloning adjacent versions.",
        ]
      : band === "Test"
        ? [
            "Tighten the buyer, occasion, or keyword angle before building the full asset.",
            "Use a free sample or checklist to test demand before expanding.",
          ]
        : [
            "Do not build the full product yet.",
            "Choose a narrower buyer, stronger gift occasion, or simpler production format.",
          ];

  return { score, band, recommendations };
}
