import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type NewsCardProps = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string | null;
  excerpt?: string | null;
  mainImage?: { asset?: { _ref: string }; alt?: string } | null;
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
  const imgSrc =
    mainImage?.asset
      ? urlFor(mainImage).width(600).height(340).fit("crop").url()
      : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-card hover:shadow-md transition-shadow duration-200">
      {/* Afbeelding */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={mainImage?.alt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
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
          {title}
        </h3>
        {excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mt-1">
            {excerpt}
          </p>
        )}
        <Link
          href={`/nieuws/${slug.current}`}
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
