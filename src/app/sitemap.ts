import type { MetadataRoute } from "next";

const getSiteUrl = (): string => {
  const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicitSiteUrl) {
    return explicitSiteUrl.startsWith("http") ? explicitSiteUrl : `https://${explicitSiteUrl}`;
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const urls: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> =
    [
      { path: "/", changeFrequency: "monthly", priority: 1 },
      { path: "/kdp-niche-scorecard", changeFrequency: "weekly", priority: 0.9 },
      { path: "/kdp-niche-scorecard/checklist", changeFrequency: "weekly", priority: 0.85 },
      { path: "/memory-journal-gift-kit", changeFrequency: "weekly", priority: 0.8 },
      { path: "/memory-journal-gift-kit/checkout", changeFrequency: "weekly", priority: 0.6 },
    ];

  return urls.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

