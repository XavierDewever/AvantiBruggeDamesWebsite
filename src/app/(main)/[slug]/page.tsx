import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY, ALL_PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";

type Props = { params: Promise<{ slug: string }> };

// ── Statische params voor build-time pre-rendering ───────────────────────────
export async function generateStaticParams() {
  const pages = await client.fetch(ALL_PAGE_SLUGS_QUERY, {});
  return (pages ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
}

// ── Metadata uit Sanity ──────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await client.fetch(
    PAGE_BY_SLUG_QUERY,
    { slug },
    { cache: "no-store" },
  );
  if (!page) return { title: "Pagina niet gevonden" };
  return {
    title: `${page.title} | Ford Unicars Avanti Brugge Dames`,
    description: page.excerpt ?? undefined,
  };
}

// ── Pagina ────────────────────────────────────────────────────────────────────
export default async function CmsPage({ params }: Props) {
  const { slug } = await params;

  const page = await client.fetch(
    PAGE_BY_SLUG_QUERY,
    { slug },
    { cache: "no-store" },
  );

  if (!page) notFound();

  return (
    <>
      {/* ── Paginaheader ──────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            {page.title}
          </h1>
          {page.excerpt && (
            <p className="mt-4 text-gray-400 text-lg leading-relaxed max-w-2xl">
              {page.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* ── Inhoud ────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortableTextRenderer value={page.content} />
        </div>
      </section>
    </>
  );
}
