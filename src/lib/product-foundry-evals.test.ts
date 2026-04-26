import { describe, expect, it } from "vitest";
import {
  evaluateProductFoundrySku,
  parseSimpleCsv,
  type ProductDashboardRow,
} from "./product-foundry-evals";

const dashboardCsv = `SKU,Product,Page URL,Views,Free Sample Clicks,Checkout Clicks,Sales,Refunds,Revenue,Build Hours,Next Action
KDP-SCORECARD-001,KDP Niche Scorecard Generator + KDP Launch Report,/kdp-niche-scorecard,0,0,0,0,0,$0,0,Publish organic distribution posts and track first targeted traffic`;

describe("product foundry evals", () => {
  it("passes when required KDP scorecard launch gates are satisfied", () => {
    const result = evaluateProductFoundrySku({
      sku: "KDP-SCORECARD-001",
      pageUrl: "/kdp-niche-scorecard",
      requiredFiles: ["src/app/kdp-niche-scorecard/page.tsx"],
      pageText:
        "KDP Niche Scorecard Generator. No sales or ranking results are guaranteed.",
      assetText:
        "Review all generated text before publishing. Check platform rules and required AI-content disclosure.",
      dashboardRows: parseSimpleCsv<ProductDashboardRow>(dashboardCsv),
      taskQueueText: "KDP-SCORECARD-005,KDP Niche Scorecard,Prepare organic distribution,Distribution Agent,KDP-SCORECARD-003,SEO tasks,Ready,ops/file.md,Next",
    });

    expect(result.passed).toBe(true);
  });

  it("fails risky revenue and ranking claims", () => {
    const result = evaluateProductFoundrySku({
      sku: "KDP-SCORECARD-001",
      pageUrl: "/kdp-niche-scorecard",
      requiredFiles: [],
      pageText:
        "KDP Niche Scorecard Generator. No sales or ranking results are guaranteed. Make $1000 per month.",
      assetText: "Check platform compliance.",
      dashboardRows: parseSimpleCsv<ProductDashboardRow>(dashboardCsv),
      taskQueueText: "KDP-SCORECARD-005,Ready",
    });

    expect(result.passed).toBe(false);
    expect(result.checks.find((check) => check.name === "no risky earnings or ranking claims")?.passed).toBe(
      false,
    );
  });

  it("does not treat no-guarantee disclaimers as risky claims", () => {
    const result = evaluateProductFoundrySku({
      sku: "KDP-SCORECARD-001",
      pageUrl: "/kdp-niche-scorecard",
      requiredFiles: [],
      pageText:
        "No sales or ranking results are guaranteed. The scorecard is a planning aid.",
      assetText: "Check platform rules and required AI-content disclosure.",
      dashboardRows: parseSimpleCsv<ProductDashboardRow>(dashboardCsv),
      taskQueueText: "KDP-SCORECARD-005,KDP Niche Scorecard,Distribution,Agent,Dep,Criteria,Ready,File,Next",
    });

    expect(result.passed).toBe(true);
  });

  it("parses quoted csv fields", () => {
    const rows = parseSimpleCsv<{ Name: string; Notes: string }>(
      'Name,Notes\n"Test, Product","Uses ""quoted"" copy"',
    );

    expect(rows).toEqual([{ Name: "Test, Product", Notes: 'Uses "quoted" copy' }]);
  });
});
