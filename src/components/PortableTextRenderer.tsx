import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  value: unknown[];
};

const components: PortableTextComponents = {
  // ── Blokstijlen ────────────────────────────────────────────────────────────
  block: {
    normal:     ({ children }) => <p className="leading-relaxed text-gray-700 mb-4">{children}</p>,
    h1:         ({ children }) => <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900 mt-10 mb-4">{children}</h1>,
    h2:         ({ children }) => <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mt-8 mb-3 flex items-center gap-3 before:block before:w-6 before:h-0.5 before:bg-primary before:shrink-0">{children}</h2>,
    h3:         ({ children }) => <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">{children}</h3>,
    h4:         ({ children }) => <h4 className="text-base font-bold text-gray-900 mt-4 mb-1">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-5 py-1 my-6 text-gray-600 italic">
        {children}
      </blockquote>
    ),
  },

  // ── Decorators ─────────────────────────────────────────────────────────────
  marks: {
    strong:    ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em:        ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
      return (
        <a
          href={href}
          target={value?.blank ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary font-semibold underline underline-offset-2 hover:text-primary-dark transition-colors"
        >
          {children}
        </a>
      );
    },
  },

  // ── Lijsten ────────────────────────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul className="list-none space-y-1.5 my-4 pl-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1.5 my-4 pl-1 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2 text-gray-700">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-gray-700">{children}</li>,
  },

  // ── Inline afbeeldingen ────────────────────────────────────────────────────
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(900).fit("max").url();
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={value.alt ?? ""}
              width={900}
              height={500}
              className="w-full h-auto object-cover"
            />
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

export default function PortableTextRenderer({ value }: Props) {
  return (
    <div className="prose-avanti max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
