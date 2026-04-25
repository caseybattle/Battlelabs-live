import { buildTrackedCheckoutUrl } from "./checkout";

describe("buildTrackedCheckoutUrl", () => {
  it("adds attribution params to a valid checkout URL", () => {
    const result = buildTrackedCheckoutUrl("https://buy.stripe.com/test_123", {
      source_page: "pilot-build",
      offer_name: "battle-labs-pilot-build",
      entry_tag: "pilot-build-page",
    });

    const url = new URL(result);

    expect(url.origin + url.pathname).toBe("https://buy.stripe.com/test_123");
    expect(url.searchParams.get("source_page")).toBe("pilot-build");
    expect(url.searchParams.get("offer_name")).toBe("battle-labs-pilot-build");
    expect(url.searchParams.get("entry_tag")).toBe("pilot-build-page");
  });

  it("preserves existing query params while adding attribution", () => {
    const result = buildTrackedCheckoutUrl("https://buy.stripe.com/test_123?prefilled_email=a%40b.com", {
      source_page: "reply-deck",
      offer_name: "reply-deck",
    });

    const url = new URL(result);

    expect(url.searchParams.get("prefilled_email")).toBe("a@b.com");
    expect(url.searchParams.get("source_page")).toBe("reply-deck");
    expect(url.searchParams.get("offer_name")).toBe("reply-deck");
  });

  it("returns the original string when the URL is invalid", () => {
    expect(
      buildTrackedCheckoutUrl("not-a-url", {
        source_page: "pilot-build",
      }),
    ).toBe("not-a-url");
  });
});
