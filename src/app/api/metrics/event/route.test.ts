import { POST } from "./route";

describe("POST /api/metrics/event", () => {
  it("returns 204 and logs structured metric events", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    const request = new Request("http://localhost/api/metrics/event", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        event: "checkout_click",
        page: "/kdp-niche-scorecard",
        meta: { channel: "product-hunt" },
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(204);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(String(logSpy.mock.calls[0][0])).toContain("[METRIC_EVENT]");

    logSpy.mockRestore();
  });

  it("accepts download_click events", async () => {
    const request = new Request("http://localhost/api/metrics/event", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        event: "download_click",
        page: "/kdp-launch-report-delivery",
        meta: { sku: "KDP-SCORECARD-001" },
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(204);
  });

  it("rejects invalid event names", async () => {
    const request = new Request("http://localhost/api/metrics/event", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        event: "drop table metrics",
        page: "/kdp-niche-scorecard",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ ok: false, error: "Invalid metric payload." });
  });

  it("rejects invalid JSON bodies", async () => {
    const request = new Request("http://localhost/api/metrics/event", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: "{not valid json",
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ ok: false, error: "Invalid metric payload." });
  });
});
