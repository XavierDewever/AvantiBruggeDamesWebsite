import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_SPONSORS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Sponsors | Ford Unicars Avanti Brugge Dames",
  description:
    "Dank aan alle partners en sponsors die Ford Unicars Avanti Brugge Dames mogelijk maken.",
};

type Sponsor = {
  _id: string | null;
  name: string | null;
  logo?: { asset: unknown } | null;
  websiteUrl?: string | null;
  type?: string | null;
  omschrijving?: string | null;
};

export default async function SponsorsPage() {
  const sponsors = await client.fetch<Sponsor[]>(
    ALL_SPONSORS_QUERY,
    {},
    { cache: "no-store" },
  );

  const hoofdsponsors = (sponsors ?? []).filter((s) => s.type === "hoofdsponsor");
  const overige       = (sponsors ?? []).filter((s) => s.type !== "hoofdsponsor");

  return (
    <>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            Onze <span className="text-primary">Sponsors</span>
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-xl leading-relaxed">
            Zonder onze partners is topbasketbal in Brugge niet mogelijk.
            Hartelijk dank aan iedereen die ons steunt.
          </p>
        </div>
      </section>

      {/* ── Sponsor-secties ────────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* ── Sectie 1: Hoofdsponsors ──────────────────────────────────── */}
          {hoofdsponsors.length > 0 && (
            <div>
              <SectionTitle>Hoofdsponsors</SectionTitle>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {hoofdsponsors.map((sponsor) => {
                  const logoSrc = sponsor.logo?.asset
                    ? urlFor(sponsor.logo as Parameters<typeof urlFor>[0])
                        .width(480)
                        .fit("max")
                        .url()
                    : null;
                  const displayName = sponsor.name ?? "Sponsor";

                  return (
                    <SponsorLink key={sponsor._id ?? displayName} href={sponsor.websiteUrl} label={displayName}>
                      <div className="flex flex-col h-full rounded-xl border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden group">
                        {/* Logo-zone */}
                        <div className="flex items-center justify-center bg-white px-10 py-10 min-h-[180px]">
                          {logoSrc ? (
                            <Image
                              src={logoSrc}
                              alt={displayName}
                              width={300}
                              height={140}
                              className="object-contain max-h-32 w-auto"
                            />
                          ) : (
                            <span className="text-base font-black text-gray-700 uppercase tracking-wide text-center group-hover:text-primary transition-colors">
                              {displayName}
                            </span>
                          )}
                        </div>

                        {/* Rode onderrand + naam + omschrijving */}
                        <div className="border-t-2 border-primary/10 bg-gray-50 px-6 py-4 flex flex-col gap-1.5">
                          <p className="text-xs font-black text-primary uppercase tracking-widest">
                            Hoofdsponsor
                          </p>
                          <p className="text-sm font-bold text-gray-900">{displayName}</p>
                          {sponsor.omschrijving && (
                            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                              {sponsor.omschrijving}
                            </p>
                          )}
                        </div>
                      </div>
                    </SponsorLink>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Sectie 2: Sponsors ───────────────────────────────────────── */}
          {overige.length > 0 && (
            <div>
              <SectionTitle>Sponsors</SectionTitle>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {overige.map((sponsor) => {
                  const logoSrc = sponsor.logo?.asset
                    ? urlFor(sponsor.logo as Parameters<typeof urlFor>[0])
                        .width(280)
                        .fit("max")
                        .url()
                    : null;
                  const displayName = sponsor.name ?? "Sponsor";

                  return (
                    <SponsorLink key={sponsor._id ?? displayName} href={sponsor.websiteUrl} label={displayName}>
                      <div className="flex items-center justify-center bg-white border border-gray-100 rounded-lg p-6 min-h-[100px] hover:border-primary/40 hover:shadow-md transition-all duration-200 group">
                        {logoSrc ? (
                          <Image
                            src={logoSrc}
                            alt={displayName}
                            width={160}
                            height={80}
                            className="object-contain max-h-14 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        ) : (
                          <span className="text-xs font-black text-gray-600 uppercase tracking-wide text-center group-hover:text-primary transition-colors">
                            {displayName}
                          </span>
                        )}
                      </div>
                    </SponsorLink>
                  );
                })}
              </div>
            </div>
          )}

          {/* Leeg staat ─────────────────────────────────────────────────── */}
          {(sponsors ?? []).length === 0 && (
            <div className="py-24 text-center border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 font-semibold uppercase tracking-wide text-sm">
                Nog geen sponsors toegevoegd
              </p>
            </div>
          )}

        </div>
      </section>

      {/* ── CTA: word sponsor ──────────────────────────────────────────────── */}
      <section className="bg-primary py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mb-4">
            Word ook partner
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-8">
            Zichtbaarheid bij een groeiende club in Brugge? Neem contact op
            en ontdek onze sponsorpakketten.
          </p>
          <a
            href="https://app.twizzit.com/go/sponsors-26-27"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-black uppercase tracking-wider text-sm rounded hover:bg-gray-100 transition-colors"
          >
            Contacteer ons
          </a>
        </div>
      </section>
    </>
  );
}

// ── Hulpcomponenten ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="w-8 h-0.5 bg-primary shrink-0" />
      <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">
        {children}
      </h2>
    </div>
  );
}

function SponsorLink({
  href,
  label,
  children,
}: {
  href?: string | null;
  label: string;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="block"
      >
        {children}
      </a>
    );
  }
  return <div>{children}</div>;
}
