const UPSTREAM_WEBHOOK_URL =
  "http://95.111.243.97:5678/webhook/4sAG5F1uJ8P2DssC/webhook/battle-labs-lead";

export async function POST(request: Request) {
  const payload = await request.json();

  const upstreamResponse = await fetch(UPSTREAM_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!upstreamResponse.ok) {
    return Response.json(
      { ok: false, error: "Upstream webhook request failed." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
