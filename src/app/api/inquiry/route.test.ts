import { POST } from "./route";

describe("POST /api/inquiry", () => {
  it("maps battle labs inquiry values into the Google Form payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    const request = new Request("http://localhost/api/inquiry", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "Casey",
        email: "casey@example.com",
        service: "website-chat",
        pageType: "homepage-form",
        details: "Need a new website and AI chat.",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(body).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [, init] = fetchMock.mock.calls[0];
    const payload = new URLSearchParams(String(init?.body));

    expect(payload.get("entry.1043560953")).toBe("Battlelabs.live");
    expect(payload.get("entry.611908730")).toBe("Casey");
    expect(payload.get("entry.1847535132")).toBe("casey@example.com");
    expect(payload.get("entry.259762019")).toBe("Website Design & Development");
    expect(payload.get("entry.1993641716")).toBe(
      "Entry: homepage-form | Need a new website and AI chat.",
    );
  });

  it("returns a 502 when the Google Form submission fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    const request = new Request("http://localhost/api/inquiry", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "Casey",
        email: "casey@example.com",
        service: "custom",
        pageType: "reply-deck",
        details: "Custom workflow",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body).toEqual({
      ok: false,
      error: "Google Form submission failed.",
    });
  });
});
