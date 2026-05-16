import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY, ALL_POSTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  params: Promise<{ slug: string }>;
};

type PostSlugRow = { slug: { current: string | null } | null };

type Post = {
  _id: string | null;
  title: string | null;
  slug: { current: string | null } | null;
  publishedAt?: string | null;
  excerpt?: string | null;
  mainImage?: { asset?: unknown; alt?: string } | null;
  body?: Array<{ _type: string; [key: string]: unknown }> | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug }, { cache: "no-store" });
  if (!post) return {};
  return {
    title: `${post.title ?? "Nieuws"} | Ford Unicars Avanti Brugge Dames`,
    description: post.excerpt ?? undefined,
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch<PostSlugRow[]>(ALL_POSTS_QUERY, {}, { cache: "no-store" });
  return (posts ?? [])
    .filter((p) => !!p.slug?.current)
    .map((p) => ({ slug: p.slug!.current as string }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Portable Text component-map ──────────────────────────────────────────────
const ptComponents: PortableTextComponents = {
  block: {
    normal:     ({ children }) => <p className="mb-5 leading-relaxed text-gray-700">{children}</p>,
    h2:         ({ children }) => <h2 className="mt-10 mb-4 text-2xl font-black uppercase tracking-tight text-gray-900">{children}</h2>,
    h3:         ({ children }) => <h3 className="mt-8 mb-3 text-xl font-black uppercase tracking-tight text-gray-900">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 border-l-4 border-primary text-gray-600 italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em:     ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-primary font-semibold hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(800).fit("max").url();
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-lg bg-gray-100" style={{ aspectRatio: "16/9" }}>
            <Image src={src} alt={value.alt ?? ""} fill className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-xs text-gray-400 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function NieuwsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug }, { cache: "no-store" });

  if (!post) notFound();

  const imgSrc = post.mainImage?.asset
    ? urlFor(post.mainImage as Parameters<typeof urlFor>[0]).width(1200).height(600).fit("crop").url()
    : null;

  const displayTitle = post.title ?? "Nieuwsbericht";

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white">
        {imgSrc && (
          <div className="relative h-64 lg:h-96 w-full overflow-hidden">
            <Image
              src={imgSrc}
              alt={(post.mainImage as { alt?: string } | null)?.alt ?? displayTitle}
              fill
              priority
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          </div>
        )}
        <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${imgSrc ? "pb-12 -mt-24 relative" : "py-16 lg:py-20"}`}>
          <Link
            href="/nieuws"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider mb-6 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Alle berichten
          </Link>
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          {post.publishedAt && (
            <p className="text-primary text-xs font-black uppercase tracking-widest mb-3">
              {formatDate(post.publishedAt)}
            </p>
          )}
          <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tight leading-tight text-white">
            {displayTitle}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-gray-300 text-lg leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* ── Artikelinhoud ──────────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.body && (
            <div className="prose-avanti">
              <PortableText value={post.body} components={ptComponents} />
            </div>
          )}

          {/* ── Call to action ───────────────────────────────────── */}
          {post.ctaLabel && post.ctaUrl && (
            <div className="mt-10 p-6 rounded-xl bg-gray-900 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <span className="inline-block w-6 h-0.5 bg-primary mb-2" />
                <p className="text-white text-sm font-bold leading-snug">
                  Wil je meer weten of meteen actie ondernemen?
                </p>
              </div>
              <a
                href={post.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-lg hover:bg-primary-dark transition-colors"
              >
                {post.ctaLabel}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          )}

          {/* Terug-link */}
          <div className="mt-14 pt-8 border-t border-gray-100">
            <Link
              href="/nieuws"
              className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider hover:gap-3 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Terug naar alle berichten
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
