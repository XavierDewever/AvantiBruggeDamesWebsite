import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Herbruikbare Bekers",
  description:
    "Ford Unicars Avanti Brugge Dames kiest voor herbruikbare bekers op evenementen. Ontdek onze sponsormogelijkheden en volg ons op sociale media.",
  alternates: { canonical: "https://www.avantibruggedames.be/cups" },
  robots: { index: false },
};

const SOCIALS = [
  {
    label: "Facebook",
    handle: "avantibruggedames",
    href: "https://www.facebook.com/avantibruggedames",
    color: "#1877F2",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: "@avantibruggedames",
    href: "https://www.instagram.com/avantibruggedames/",
    color: "#E1306C",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    handle: "@avantibruggedames",
    href: "https://www.tiktok.com/@avantibruggedames?lang=nl-NL",
    color: "#010101",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z" />
      </svg>
    ),
  },
];

export default function CupsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <p className="text-primary text-xs font-black uppercase tracking-widest mb-3">
            Je hebt onze beker gescand
          </p>
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            Welkom bij{" "}
            <span className="text-primary">Avanti Brugge</span>{" "}
            Dames
          </h1>
          <p className="mt-5 text-gray-400 text-lg max-w-2xl leading-relaxed">
            Ford Unicars Avanti Brugge Dames is dé damesbasketbalclub van Brugge.
            Van bovenbouw tot jeugd — wij bieden een warme clubomgeving waar elke
            speelster telt.
          </p>
        </div>
      </section>

      {/* ── Herbruikbare bekers ───────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 lg:gap-10">

            {/* Icoon */}
            <div className="shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <CupIcon className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
            </div>

            {/* Tekst */}
            <div>
              <span className="inline-block text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                Duurzaamheid
              </span>
              <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-gray-900 leading-tight mb-4">
                Herbruikbare bekers
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl">
                Op onze evenementen kiezen wij bewust voor herbruikbare bekers.
                Zo verminderen we plastic afval en dragen we als club bij aan een
                groenere toekomst — klein gebaar, groot verschil.
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed max-w-2xl">
                De QR-code op deze beker bracht je hier. Mooi meegenomen: je
                ontdekt meteen wie we zijn en hoe je ons kunt steunen.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Sponsor worden ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <span className="inline-block w-8 h-0.5 bg-primary mb-4" />
          <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-gray-900 mb-3">
            Steun onze club
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mb-10">
            Als sponsor van Ford Unicars Avanti Brugge Dames krijg je zichtbaarheid
            bij een groeiende club in het hart van Brugge. Van logoplacement tot
            naamsvermeldingen — we hebben een sponsorpakket voor elk budget.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MegaphoneIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm">Zichtbaarheid</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Logo op onze website, social media en communicatie naar leden en ouders.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm">Community</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Verbinding met een actieve sportclub en de Brugse basketbalcommunity.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <StarIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm">Op maat</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sponsorpakketten afgestemd op jouw doelstellingen en budget.
              </p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/sponsors"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-black uppercase tracking-wider text-sm rounded hover:bg-primary-dark transition-colors"
            >
              Bekijk onze sponsors
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <a
              href="https://app.twizzit.com/go/sponsors-26-27"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-primary text-primary font-black uppercase tracking-wider text-sm rounded hover:bg-primary hover:text-white transition-colors"
            >
              Word partner
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ── Volg ons ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <span className="inline-block w-8 h-0.5 bg-white/40 mb-4" />
          <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mb-3">
            Volg ons
          </h2>
          <p className="text-white/70 leading-relaxed max-w-xl mb-10">
            Blijf op de hoogte van wedstrijden, stages en clubnieuws via onze
            sociale media.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl px-5 py-4 transition-colors group"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-colors text-white">
                  {s.icon}
                </div>
                <div>
                  <p className="text-white font-black uppercase tracking-wide text-sm leading-none">
                    {s.label}
                  </p>
                  <p className="text-white/60 text-xs mt-1">{s.handle}</p>
                </div>
                <ArrowIcon className="w-4 h-4 text-white/40 group-hover:text-white/70 ml-auto transition-colors" />
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ── Footer CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-black uppercase tracking-tight text-lg">
              Meer weten over de club?
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Bekijk onze volledige website of neem contact op.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-black uppercase tracking-wider text-sm rounded hover:bg-gray-100 transition-colors"
            >
              Naar de website
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 hover:border-white hover:text-white font-bold uppercase tracking-wider text-sm rounded transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Inline iconen ─────────────────────────────────────────────────────────────

function CupIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3h8l-1 9H9L8 3Z" />
      <path d="M9 12c0 3 1.5 5 3 6s3-3 3-6" />
      <path d="M6 21h12" />
      <path d="M12 18v3" />
    </svg>
  );
}

function MegaphoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11l19-9-9 19-2-8-8-2Z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}
