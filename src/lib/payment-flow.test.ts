import { getOfferConfig, normalizeOffer } from "./payment-flow";

describe("payment flow config", () => {
  it("normalizes offer names and falls back to default", () => {
    expect(normalizeOffer(" Pilot-Build ")).toBe("pilot-build");
    expect(normalizeOffer(undefined)).toBe("default");
    expect(normalizeOffer("")).toBe("default");
  });

  it("returns the pilot-build config when that offer is requested", () => {
    const config = getOfferConfig("pilot-build");

    expect(config.title).toContain("pilot build");
    expect(config.kickoffHref).toBe("/kickoff?offer=pilot-build");
    expect(config.nextSteps).toContain(
      "State the one bottleneck that matters most so the pilot stays focused.",
    );
  });

  it("returns the default config for unknown offers", () => {
    const config = getOfferConfig("something-else");

    expect(config.title).toBe("Your purchase is confirmed");
    expect(config.kickoffHref).toBe("/kickoff");
  });
});
