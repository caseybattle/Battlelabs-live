export const KDP_REPORT_DELIVERY = {
  productName: "KDP Launch Report Kit",
  sku: "KDP-SCORECARD-REPORT-001",
  fileName: "kdp-launch-report-kit-battlelabs-v1.zip",
  expectedBytes: 424775,
  viewerUrl: "/products/kdp-niche-scorecard/kdp-launch-report-kit-battlelabs-v1.zip",
  directDownloadUrl: "/products/kdp-niche-scorecard/kdp-launch-report-kit-battlelabs-v1.zip",
} as const;

const fallbackDeliveryKey = "kdp-report-delivery-XBV9JNJS6SPJE-v1";

export function getKdpReportDeliveryKey() {
  return process.env.KDP_LAUNCH_REPORT_DELIVERY_KEY?.trim() || fallbackDeliveryKey;
}

export function normalizeSearchParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

export function isValidKdpReportDeliveryAccess(
  value: string | string[] | undefined,
  expectedKey = getKdpReportDeliveryKey(),
) {
  const suppliedKey = normalizeSearchParam(value);
  return Boolean(suppliedKey && expectedKey && suppliedKey === expectedKey);
}

export function buildKdpReportDeliveryUrl(
  origin = "https://battlelabs.live",
  accessKey = getKdpReportDeliveryKey(),
) {
  const baseUrl = origin.replace(/\/$/, "");
  return `${baseUrl}/kdp-launch-report-delivery?access=${encodeURIComponent(accessKey)}`;
}
