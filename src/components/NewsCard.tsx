import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export type NewsCardProps = {
  _id: string | null;
  title: string | null;
  slug: { current: string | null } | null;
  publishedAt?: string | null;
  excerpt?: string | null;
  mainImage?: { asset?: unknown; alt?: string } | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsCard({
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
}: NewsCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imgSrc = mainImage?.asset
    ? urlFor(mainImage as Parameters<typeof urlFor>[0]).width(600).height(340).fit("crop").url()
    : null;

  const displayTitle = title ?? "Nieuwsbericht";
  const slugCurrent = slug?.current ?? "";

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-card hover:shadow-md transition-shadow duration-200">
      {/* Afbeelding */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-900">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={(mainImage as { alt?: string } | null)?.alt ?? displayTitle}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center gap-2">
            <svg
              className="w-12 h-12 text-white/10"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                fill="none"
                stroke="rgba(255,255,255,.12)"
                strokeWidth="1"
                d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"
              />
            </svg>
            <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">
              Avanti Brugge
            </span>
          </div>
        )}
      </div>

      {/* Inhoud */}
      <div className="flex flex-1 flex-col p-5 gap-2">
        {publishedAt && (
          <p className="text-primary text-xs font-bold uppercase tracking-widest">
            {formatDate(publishedAt)}
          </p>
        )}
        <h3 className="font-black text-gray-900 text-base uppercase leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {displayTitle}
        </h3>
        {excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mt-1">
            {excerpt}
          </p>
        )}
        <Link
          href={`/nieuws/${slugCurrent}`}
          className="mt-auto pt-3 inline-flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-wider hover:gap-2 transition-all"
        >
          Lees meer
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
