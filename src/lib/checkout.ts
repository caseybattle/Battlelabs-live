export function buildTrackedCheckoutUrl(
  rawUrl: string,
  params: Record<string, string>,
): string {
  if (!rawUrl) {
    return "";
  }

  try {
    const isAbsolute = rawUrl.includes("://");
    const isPath = rawUrl.startsWith("/");
    const url = isAbsolute ? new URL(rawUrl) : isPath ? new URL(rawUrl, "https://battlelabs.live") : new URL(rawUrl);

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        url.searchParams.set(key, value);
      }
    }

    return isAbsolute ? url.toString() : isPath ? `${url.pathname}${url.search}${url.hash}` : url.toString();
  } catch {
    return rawUrl;
  }
}
