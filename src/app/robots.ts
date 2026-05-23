import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio/",       // Sanity Studio — niet indexeren
          "/studio",
          "/api/",          // interne API routes
        ],
      },
    ],
    sitemap: "https://www.avantibruggedames.be/sitemap.xml",
    host:    "https://www.avantibruggedames.be",
  };
}
