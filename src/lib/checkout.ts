export function buildTrackedCheckoutUrl(
  rawUrl: string,
  params: Record<string, string>,
): string {
  if (!rawUrl) {
    return "";
  }

  try {
    const url = new URL(rawUrl);

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        url.searchParams.set(key, value);
      }
    }

    return url.toString();
  } catch {
    return rawUrl;
  }
}
