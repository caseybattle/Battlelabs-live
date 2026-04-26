import { memoryJournalProduct } from "./memory-journal-product";

describe("memoryJournalProduct", () => {
  it("defines the first agent-native SKU and pricing ladder", () => {
    expect(memoryJournalProduct.sku).toBe("grandma-memory-journal-gift-kit");
    expect(memoryJournalProduct.introPrice).toBe(9);
    expect(memoryJournalProduct.regularPrice).toBe(19);
    expect(memoryJournalProduct.bundlePriceRange).toBe("$29-$49");
  });

  it("keeps the product asset-based instead of service-based", () => {
    expect(memoryJournalProduct.deliverables).toContain("120-page printable memory journal interior");
    expect(memoryJournalProduct.deliverables).toContain("KDP niche scorecard CSV");
    expect(memoryJournalProduct.promise).not.toMatch(/done-for-you client service/i);
  });

  it("includes compliance boundaries for marketplace-safe publishing", () => {
    expect(memoryJournalProduct.compliance.join(" ")).toContain("Disclose AI-generated content");
    expect(memoryJournalProduct.compliance.join(" ")).toContain("fake reviews");
    expect(memoryJournalProduct.compliance.join(" ")).toContain("income claims");
  });
});
