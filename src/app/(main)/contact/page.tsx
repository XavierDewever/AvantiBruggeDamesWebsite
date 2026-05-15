import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CONTACT_PAGINA_QUERY } from "@/sanity/lib/queries";

type Sporthal = { naam?: string; adres?: string; extra?: string };

export const metadata: Metadata = {
  title: "Contact | Ford Unicars Avanti Brugge Dames",
  description:
    "Neem contact op met Ford Unicars Avanti Brugge Dames via e-mail of ons Twizzit-contactformulier.",
};

// Fallback-waarden als het Sanity-document nog niet is aangemaakt
const DEFAULTS = {
  introTitel:           "Heb je een vraag?",
  introOmschrijving:    "We helpen je graag verder! Neem contact op via e-mail, sociale media of ons contactformulier.",
  email:                "avantibruggedames@gmail.com",
  facebookUrl:          null as string | null,
  instagramUrl:         null as string | null,
  sporthallen:          [] as Sporthal[],
  formulierTitel:       "Stuur ons een bericht",
  formulierOmschrijving:"Klik op de knop hieronder om ons contactformulier in Twizzit te openen. We proberen binnen de 48 uur te antwoorden.",
  formulierUrl:         "#",
  formulierKnopLabel:   "Open Contactformulier",
};

export default async function ContactPage() {
  const cms = await client.fetch(CONTACT_PAGINA_QUERY, {}, { cache: "no-store" });
  const d = { ...DEFAULTS, ...cms };

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-4">
            {d.introTitel}{" "}
            <span className="text-primary">We helpen je verder.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            {d.introOmschrijving}
          </p>
        </div>
      </section>

      {/* ── Inhoud ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 rounded-2xl px-8 py-10 flex flex-col gap-10">

            {/* E-mailadressen */}
            <div>
              <SectionLabel>E-mail</SectionLabel>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Algemeen",    adres: d.email },
                  { label: "Secretariaat", adres: "secretariaat@avantibruggedames.be" },
                  { label: "Sponsoring",  adres: "sponsoring@avantibruggedames.be" },
                  { label: "Twizzit",     adres: "twizzit@avantibruggedames.be" },
                ].map(({ label, adres }) => (
                  <li key={adres}>
                    <a
                      href={`mailto:${adres}`}
                      className="group flex items-center gap-3 rounded-xl border border-transparent hover:border-primary/20 hover:bg-white px-4 py-3 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-wider text-gray-400">{label}</p>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors truncate">{adres}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sociale media */}
            <div>
              <SectionLabel>Sociale media</SectionLabel>
              <div className="flex flex-wrap gap-3 mt-4">
                <SocialButton href="https://www.facebook.com/avantibruggedames" label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  <span className="text-sm font-semibold">Facebook</span>
                </SocialButton>
                <SocialButton href="https://www.instagram.com/avantibruggedames/" label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                  </svg>
                  <span className="text-sm font-semibold">Instagram</span>
                </SocialButton>
                <SocialButton href="https://www.tiktok.com/@avantibruggedames" label="TikTok">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z" />
                  </svg>
                  <span className="text-sm font-semibold">TikTok</span>
                </SocialButton>
              </div>
            </div>

            {/* Sporthallen */}
            {d.sporthallen && d.sporthallen.length > 0 && (
              <div>
                <SectionLabel>Sporthallen</SectionLabel>
                <ul className="mt-4 flex flex-col gap-4">
                  {d.sporthallen.filter((hal: Sporthal) => !!hal.naam).map((hal: Sporthal, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{hal.naam}</p>
                        {hal.adres && <p className="text-gray-500 text-xs mt-0.5">{hal.adres}</p>}
                        {hal.extra && <p className="text-gray-400 text-xs italic mt-0.5">{hal.extra}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}

// ── Hulpcomponenten ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 h-0.5 bg-primary shrink-0" />
      <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">
        {children}
      </h2>
    </div>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-gray-100 hover:border-primary/30 hover:bg-primary/5 text-gray-600 hover:text-primary transition-colors"
    >
      {children}
    </a>
  );
}
