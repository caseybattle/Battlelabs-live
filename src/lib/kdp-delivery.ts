export const KDP_REPORT_DELIVERY = {
  productName: "KDP Launch Report Kit",
  sku: "KDP-SCORECARD-REPORT-001",
  fileName: "KDP Launch Report Kit - Battlelabs - v1.zip",
  expectedBytes: 87073,
  viewerUrl: "https://drive.google.com/file/d/1c1E1XahWjvQ2T8Ea6z0Ovp6as1H6stMp/view?usp=drivesdk",
  directDownloadUrl:
    "https://drive.google.com/uc?export=download&id=1c1E1XahWjvQ2T8Ea6z0Ovp6as1H6stMp",
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
