"use client";

export type MetricEventName =
  | "page_view"
  | "free_sample_click"
  | "checkout_click"
  | "download_click"
  | "share_url_copy"
  | "share_text_copy";

type TrackMetricParams = {
  event: MetricEventName;
  page: string;
  meta?: Record<string, string>;
};

export function trackMetricEvent({ event, page, meta }: TrackMetricParams) {
  const payload = JSON.stringify({ event, page, meta });
  const url = "/api/metrics/event";

  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const ok = navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
      if (ok) return;
    }
  } catch {
    // ignore beacon failures
  }

  void fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: payload,
    keepalive: true,
    cache: "no-store",
  }).catch(() => undefined);
}
