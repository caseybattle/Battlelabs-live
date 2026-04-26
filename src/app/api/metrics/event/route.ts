const ALLOWED_EVENTS = [
  "page_view",
  "free_sample_click",
  "checkout_click",
  "download_click",
  "share_url_copy",
  "share_text_copy",
 ] as const;

type AllowedMetricEvent = (typeof ALLOWED_EVENTS)[number];
const ALLOWED_EVENT_SET = new Set<AllowedMetricEvent>(ALLOWED_EVENTS);

type MetricPayload = {
  event: AllowedMetricEvent;
  page?: string;
  meta?: Record<string, string>;
};

function readTrimmedString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > maxLength) return trimmed.slice(0, maxLength);
  return trimmed;
}

function readStringMap(value: unknown, maxKeys: number, maxValueLength: number): Record<string, string> | undefined {
  if (!value || typeof value !== "object") return undefined;
  if (Array.isArray(value)) return undefined;

  const entries = Object.entries(value as Record<string, unknown>).slice(0, maxKeys);
  const next: Record<string, string> = {};

  for (const [key, rawValue] of entries) {
    const k = readTrimmedString(key, 40);
    const v = readTrimmedString(rawValue, maxValueLength);
    if (k && v) {
      next[k] = v;
    }
  }

  return Object.keys(next).length ? next : undefined;
}

function parseMetricPayload(payload: unknown): MetricPayload | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  if (Array.isArray(payload)) return undefined;

  const rawEvent = (payload as Record<string, unknown>).event;
  const event = readTrimmedString(rawEvent, 48);
  if (!event || !ALLOWED_EVENT_SET.has(event as AllowedMetricEvent)) return undefined;

  const page = readTrimmedString((payload as Record<string, unknown>).page, 120);
  const meta = readStringMap((payload as Record<string, unknown>).meta, 12, 120);

  return { event: event as AllowedMetricEvent, page, meta };
}

function metricResponse(status: number, body: unknown) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const metric = parseMetricPayload(payload);

  if (!metric) {
    return metricResponse(400, { ok: false, error: "Invalid metric payload." });
  }

  console.log(
    `[METRIC_EVENT] ${JSON.stringify({
      event: metric.event,
      page: metric.page ?? "unknown",
      meta: metric.meta ?? {},
      ts: new Date().toISOString(),
    })}`,
  );

  return new Response(null, {
    status: 204,
    headers: {
      "cache-control": "no-store",
    },
  });
}
