import { describe, expect, it } from "vitest";
import {
  calculateKdpScore,
  getKdpScoreBand,
  KDP_SCORECARD_OFFER,
} from "./kdp-scorecard";

describe("kdp scorecard", () => {
  it("scores a strong niche above 75", () => {
    const result = calculateKdpScore({
      buyerIntent: 5,
      giftability: 5,
      competitionClarity: 4,
      productionSimplicity: 5,
      evergreenDemand: 4,
    });

    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.band).toBe("Strong");
  });

  it("flags weak niches below 45", () => {
    const result = calculateKdpScore({
      buyerIntent: 1,
      giftability: 2,
      competitionClarity: 1,
      productionSimplicity: 2,
      evergreenDemand: 1,
    });

    expect(result.score).toBeLessThan(45);
    expect(result.band).toBe("Weak");
  });

  it("maps score bands consistently", () => {
    expect(getKdpScoreBand(82)).toBe("Strong");
    expect(getKdpScoreBand(61)).toBe("Test");
    expect(getKdpScoreBand(44)).toBe("Weak");
  });

  it("keeps the paid offer self-serve and no-guarantee", () => {
    expect(KDP_SCORECARD_OFFER.price).toBe("$19");
    expect(KDP_SCORECARD_OFFER.disclaimer).toContain("No sales or ranking results are guaranteed");
  });
});
