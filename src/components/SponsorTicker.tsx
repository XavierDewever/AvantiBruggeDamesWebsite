import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Sponsor = {
  _id: string;
  name: string;
  logo?: { asset?: { _ref: string }; alt?: string } | null;
  websiteUrl?: string | null;
  tier?: string | null;
};

type Props = {
  sponsors: Sponsor[];
  /** Donkere achtergrond (footer) of lichte achtergrond (homepage) */
  variant?: "light" | "dark";
};

export default function SponsorTicker({ sponsors, variant = "light" }: Props) {
  if (!sponsors || sponsors.length === 0) return null;

  const isDark = variant === "dark";

  // Lijst dubbelen voor naadloze CSS loop (translateX -50%)
  const items = [...sponsors, ...sponsors];

  return (
    <div
      className={`w-full overflow-hidden border-y ${
        isDark
          ? "bg-gray-800 border-gray-700"
          : "bg-gray-50 border-gray-100"
      }`}
    >
      {/* Label */}
      <div className="relative">
        <div
          className="flex items-center"
          style={{ animation: "ticker 30s linear infinite" }}
        >
          {items.map((sponsor, i) => {
            const logoSrc = sponsor.logo?.asset
              ? urlFor(sponsor.logo).height(56).fit("max").url()
              : null;

            const inner = (
              <span
                className={`inline-flex items-center justify-center h-14 px-8 shrink-0 ${
                  isDark ? "opacity-60 hover:opacity-100" : "opacity-70 hover:opacity-100"
                } transition-opacity`}
              >
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt={sponsor.logo?.alt ?? sponsor.name}
                    width={120}
                    height={40}
                    className={`h-8 w-auto object-contain ${isDark ? "brightness-0 invert" : ""}`}
                  />
                ) : (
                  <span
                    className={`text-sm font-black uppercase tracking-wider ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {sponsor.name}
                  </span>
                )}
              </span>
            );

            return sponsor.websiteUrl ? (
              <a
                key={`${sponsor._id}-${i}`}
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sponsor.name}
                className="shrink-0"
              >
                {inner}
              </a>
            ) : (
              <span key={`${sponsor._id}-${i}`} className="shrink-0">
                {inner}
              </span>
            );
          })}
        </div>

        {/* Fade-maskers links en rechts */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 w-16 ${
            isDark
              ? "bg-gradient-to-r from-gray-800"
              : "bg-gradient-to-r from-gray-50"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 w-16 ${
            isDark
              ? "bg-gradient-to-l from-gray-800"
              : "bg-gradient-to-l from-gray-50"
          }`}
        />
      </div>
    </div>
  );
}
