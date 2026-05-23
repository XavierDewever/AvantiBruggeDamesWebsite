import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE = "https://www.avantibruggedames.be";

// ── Statische pagina's ────────────────────────────────────────────────────────
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                                  priority: 1.0, changeFrequency: "weekly"  },
  { url: `${BASE}/nieuws`,                      priority: 0.9, changeFrequency: "weekly"  },
  { url: `${BASE}/evenementen`,                 priority: 0.9, changeFrequency: "weekly"  },
  { url: `${BASE}/ploegen`,                     priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE}/volgende-speeldag`,           priority: 0.8, changeFrequency: "weekly"  },
  { url: `${BASE}/lid-worden`,                  priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE}/contact`,                     priority: 0.6, changeFrequency: "yearly"  },
  { url: `${BASE}/sponsors`,                    priority: 0.5, changeFrequency: "monthly" },
];

// ── GROQ slug-queries (enkel het minimum) ────────────────────────────────────
const POST_SLUGS_QUERY =
  `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current, publishedAt
  }`;

const TEAM_SLUGS_QUERY =
  `*[_type == "team" && defined(slug.current)] | order(volgorde asc) {
    "slug": slug.current, _updatedAt
  }`;

const PAGE_SLUGS_QUERY =
  `*[_type == "page" && defined(slug.current)] {
    "slug": slug.current, _updatedAt
  }`;

// ── Sitemap generator ─────────────────────────────────────────────────────────
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, teams, pages] = await Promise.all([
    client.fetch<{ slug: string; publishedAt?: string }[]>(
      POST_SLUGS_QUERY, {}, { next: { revalidate: 3600 } },
    ),
    client.fetch<{ slug: string; _updatedAt?: string }[]>(
      TEAM_SLUGS_QUERY, {}, { next: { revalidate: 3600 } },
    ),
    client.fetch<{ slug: string; _updatedAt?: string }[]>(
      PAGE_SLUGS_QUERY, {}, { next: { revalidate: 3600 } },
    ),
  ]);

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url:             `${BASE}/nieuws/${p.slug}`,
    lastModified:    p.publishedAt ? new Date(p.publishedAt) : undefined,
    changeFrequency: "monthly",
    priority:        0.7,
  }));

  const teamRoutes: MetadataRoute.Sitemap = (teams ?? []).map((t) => ({
    url:             `${BASE}/ploegen/${t.slug}`,
    lastModified:    t._updatedAt ? new Date(t._updatedAt) : undefined,
    changeFrequency: "monthly",
    priority:        0.6,
  }));

  const cmsRoutes: MetadataRoute.Sitemap = (pages ?? []).map((p) => ({
    url:             `${BASE}/${p.slug}`,
    lastModified:    p._updatedAt ? new Date(p._updatedAt) : undefined,
    changeFrequency: "monthly",
    priority:        0.5,
  }));

  return [...STATIC_ROUTES, ...postRoutes, ...teamRoutes, ...cmsRoutes];
}
