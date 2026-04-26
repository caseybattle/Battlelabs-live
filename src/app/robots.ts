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

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/kdp-launch-report-delivery"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

