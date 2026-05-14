import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { LID_WORDEN_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Lid worden | Ford Unicars Avanti Brugge Dames",
  description:
    "Word lid van Ford Unicars Avanti Brugge Dames of schrijf je in voor de basketbalschool.",
};

// Fallback-teksten als het Sanity-document nog niet bestaat
const DEFAULTS = {
  lidTitel: "Word een Avanti Dame",
  lidOmschrijving:
    "Sluit je aan bij één van onze competitieve ploegen en speel mee op het hoogste niveau. Je traint wekelijks met een gemotiveerde groep en neemt deel aan officiële wedstrijden via Basket Vlaanderen.",
  lidTwizzitUrl: "#",
  schoolTitel: "Basketbalschool",
  schoolOmschrijving:
    "Voor de allerkleinsten (U6–U8) die spelenderwijs willen leren basketballen. In een veilige en speelse omgeving maken ze kennis met de sport en bouwen ze meteen vriendschappen op.",
  schoolTwizzitUrl: "#",
};

export default async function LidWordenPage() {
  const data = await client
    .fetch(LID_WORDEN_QUERY, {}, { cache: "no-store" })
    .catch(() => null);

  const c = { ...DEFAULTS, ...data };

  return (
    <>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            Lid <span className="text-primary">worden</span>
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-xl leading-relaxed">
            Kies de formule die bij jou past en schrijf je in via Twizzit.
          </p>
        </div>
      </section>

      {/* ── Cards ─────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── Card 1: Competitief lid ──────────────────────────────── */}
            <div className="flex flex-col bg-primary rounded-2xl overflow-hidden shadow-xl">
              {/* Icoon-zone */}
              <div className="flex items-center justify-center py-12 bg-primary-dark/30">
                <JerseyIcon className="w-24 h-24 text-white/80" />
              </div>

              {/* Inhoud */}
              <div className="flex flex-col flex-1 p-8 gap-6">
                <div>
                  <span className="inline-block text-[10px] font-black text-white/60 uppercase tracking-widest mb-3">
                    Competitie
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                    {c.lidTitel}
                  </h2>
                </div>

                <p className="text-white/80 leading-relaxed flex-1">
                  {c.lidOmschrijving}
                </p>

                <ul className="space-y-2">
                  {["Wekelijkse trainingen", "Officiële wedstrijden", "Alle leeftijden"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/90 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={c.lidTwizzitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-primary font-black uppercase tracking-wider text-sm rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Start aanvraag via Twizzit
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* ── Card 2: Basketbalschool ──────────────────────────────── */}
            <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-primary">
              {/* Icoon-zone */}
              <div className="flex items-center justify-center py-12 bg-primary/5">
                <BasketballIcon className="w-24 h-24 text-primary/70" />
              </div>

              {/* Inhoud */}
              <div className="flex flex-col flex-1 p-8 gap-6">
                <div>
                  <span className="inline-block text-[10px] font-black text-primary/60 uppercase tracking-widest mb-3">
                    U6 – U8
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                    {c.schoolTitel}
                  </h2>
                </div>

                <p className="text-gray-600 leading-relaxed flex-1">
                  {c.schoolOmschrijving}
                </p>

                <ul className="space-y-2">
                  {["Spelenderwijs leren", "Veilige omgeving", "Vriendschappen opbouwen"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={c.schoolTwizzitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-black uppercase tracking-wider text-sm rounded-xl hover:bg-primary-dark transition-colors border-2 border-primary"
                >
                  Inschrijven voor Basketbalschool
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* ── Vraag? ────────────────────────────────────────────────── */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Heb je vragen over het lidmaatschap?{" "}
              <a href="/contact" className="text-primary font-bold hover:underline">
                Contacteer ons
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Inline iconen ─────────────────────────────────────────────────────────────

function JerseyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 L8 16 L14 20 L14 56 L50 56 L50 20 L56 16 L44 6 C44 6 40 12 32 12 C24 12 20 6 20 6Z" />
      <path d="M20 6 L14 20" />
      <path d="M44 6 L50 20" />
    </svg>
  );
}

function BasketballIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="32" r="26" />
      <path d="M32 6 C32 6 32 58 32 58" />
      <path d="M6 32 C6 32 58 32 58 32" />
      <path d="M11 16 C20 22 20 42 11 48" />
      <path d="M53 16 C44 22 44 42 53 48" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}
