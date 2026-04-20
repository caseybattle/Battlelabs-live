import { readFileSync } from "node:fs";
import path from "node:path";

describe("battlelabs site content", () => {
  const html = readFileSync(
    path.join(process.cwd(), "public", "battlelabs-original.html"),
    "utf8",
  );

  it("removes simulated revenue and live-activity claims", () => {
    expect(html).not.toContain("Revenue today");
    expect(html).not.toContain("Monthly Revenue");
    expect(html).not.toContain("posted 3x today");
    expect(html).not.toContain("LIVE</span>");
  });

  it("keeps the primary offer and fallback offer visible in the hero", () => {
    expect(html).toContain("Lead capture + follow-up systems");
    expect(html).toContain("Website rebuilds with inquiry flow");
    expect(html).toContain("Async-only builds");
  });

  it("keeps real proof language on the page", () => {
    expect(html).toContain("Selected Work");
    expect(html).toContain("The Reset Method");
    expect(html).toContain("No inflated claims.");
  });
});
