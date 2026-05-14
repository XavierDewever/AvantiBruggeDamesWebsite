import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CONTACT_PAGINA_QUERY } from "@/sanity/lib/queries";

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
  sporthallen:          [] as { naam: string; adres?: string; extra?: string }[],
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

      {/* ── Tweekoloms inhoud ──────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* ── Linkerkolom: Contactgegevens ─────────────────────────── */}
            <div className="flex flex-col gap-10 bg-red-50 rounded-2xl px-8 py-10">

              {/* E-mail */}
              <div>
                <SectionLabel>E-mail</SectionLabel>
                <a
                  href={`mailto:${d.email}`}
                  className="group inline-flex items-center gap-3 mt-3 text-gray-800 hover:text-primary transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <span className="font-semibold text-base">{d.email}</span>
                </a>
              </div>

              {/* Secretariaat */}
              <div>
                <SectionLabel>Secretariaat</SectionLabel>
                <a
                  href="mailto:secretariaat@avantibruggedames.be"
                  className="group inline-flex items-center gap-3 mt-3 text-gray-800 hover:text-primary transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <span className="font-semibold text-base">secretariaat@avantibruggedames.be</span>
                </a>
              </div>

              {/* Sociale media */}
              {(d.facebookUrl || d.instagramUrl) && (
                <div>
                  <SectionLabel>Sociale media</SectionLabel>
                  <div className="flex gap-3 mt-3">
                    {d.facebookUrl && (
                      <SocialButton href={d.facebookUrl} label="Facebook">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </SocialButton>
                    )}
                    {d.instagramUrl && (
                      <SocialButton href={d.instagramUrl} label="Instagram">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                        </svg>
                      </SocialButton>
                    )}
                  </div>
                </div>
              )}

              {/* Sporthallen */}
              {d.sporthallen && d.sporthallen.length > 0 && (
                <div>
                  <SectionLabel>Sporthallen</SectionLabel>
                  <ul className="mt-3 flex flex-col gap-4">
                    {d.sporthallen.map((hal, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
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

            {/* ── Rechterkolom: CTA-kaart ──────────────────────────────── */}
            <div className="flex items-start lg:items-center">
              <div className="w-full rounded-2xl border-2 border-primary/20 overflow-hidden shadow-sm">

                {/* Rode bovenbalk */}
                <div className="bg-primary px-8 py-6">
                  <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
                    {d.formulierTitel}
                  </h2>
                </div>

                {/* Witte onderkant */}
                <div className="bg-white px-8 py-8 flex flex-col gap-6">
                  <p className="text-gray-600 leading-relaxed text-base">
                    {d.formulierOmschrijving}
                  </p>

                  {/* Antwoordtijd badge */}
                  <div className="flex items-center gap-2.5 text-sm text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                    Gemiddelde reactietijd: binnen 48 uur
                  </div>

                  {/* CTA-knop */}
                  {d.formulierUrl && d.formulierUrl !== "#" ? (
                    <a
                      href={d.formulierUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-wider text-sm rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      {d.formulierKnopLabel}
                    </a>
                  ) : (
                    <div className="w-full px-6 py-4 bg-gray-100 text-gray-400 font-bold uppercase tracking-wider text-sm rounded-lg text-center">
                      URL nog niet ingesteld in Sanity
                    </div>
                  )}

                  <p className="text-xs text-gray-400 text-center">
                    Je wordt doorgestuurd naar Twizzit, ons ledenadministratieplatform.
                  </p>
                </div>
              </div>
            </div>

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
      className="w-11 h-11 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-gray-500 flex items-center justify-center transition-colors"
    >
      {children}
    </a>
  );
}
