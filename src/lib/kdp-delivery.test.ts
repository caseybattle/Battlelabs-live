import {
  buildKdpReportDeliveryUrl,
  isValidKdpReportDeliveryAccess,
  KDP_REPORT_DELIVERY,
  normalizeSearchParam,
} from "./kdp-delivery";

describe("kdp report delivery", () => {
  it("normalizes string and array search params", () => {
    expect(normalizeSearchParam(" key ")).toBe("key");
    expect(normalizeSearchParam([" first ", "second"])).toBe("first");
    expect(normalizeSearchParam(undefined)).toBe("");
  });

  it("requires the expected access key before exposing the delivery page", () => {
    expect(isValidKdpReportDeliveryAccess("abc", "abc")).toBe(true);
    expect(isValidKdpReportDeliveryAccess("abc", "def")).toBe(false);
    expect(isValidKdpReportDeliveryAccess("", "abc")).toBe(false);
  });

  it("builds a return URL for the PayPal success redirect", () => {
    expect(buildKdpReportDeliveryUrl("https://battlelabs.live/", "delivery key")).toBe(
      "https://battlelabs.live/kdp-launch-report-delivery?access=delivery%20key",
    );
  });

  it("points at the verified website-hosted delivery file", () => {
    expect(KDP_REPORT_DELIVERY.directDownloadUrl).toBe(
      "/products/kdp-niche-scorecard/kdp-launch-report-kit-battlelabs-v1.zip",
    );
    expect(KDP_REPORT_DELIVERY.expectedBytes).toBe(424775);
  });
});
