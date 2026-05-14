import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_EVENTS_QUERY, HOMEPAGE_POSTS_QUERY } from "@/sanity/lib/queries";
import EventCard from "@/components/EventCard";
import NewsCard from "@/components/NewsCard";

export default async function HomePage() {
  const now = new Date().toISOString();

  // Parallelle fetches met per-query revalidatie — geen waterval
  const [events, posts] = await Promise.all([
    client.fetch(HOMEPAGE_EVENTS_QUERY, { now }, { next: { revalidate: 60 } }),
    client.fetch(HOMEPAGE_POSTS_QUERY,   {},     { next: { revalidate: 300 } }),
  ]);

  const nextEvent = events?.[0] ?? null;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Achtergrond: diagonale rode band */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          {/* Donkere overlay */}
          <div className="absolute inset-0 bg-gray-950/60" />
          {/* Rode diagonale accent */}
          <div className="absolute -top-32 -right-24 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-primary/10 rounded-full blur-2xl" />
          {/* Basketbal textuurlijn */}
          <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#fff_0px,#fff_1px,transparent_1px,transparent_60px)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-44 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
          {/* Linker kolom: tekst */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <span className="inline-block w-14 h-1 bg-primary rounded-full" />
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-none tracking-tight">
              Ford Unicars
              <br />
              <span className="text-primary">Avanti Brugge</span>
              <br />
              <span className="text-gray-300">Dames</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Ford Unicars Avanti Brugge Dames wil een warme clubomgeving bieden waarin kinderen, jongeren en volwassenen alle kansen krijgen om te ontwikkelen en te presteren. Bij ons staan respect, samenwerking, plezier en persoonlijke groei centraal. Ons doel? Een clubcultuur waarin elke speelster telt en zich maximaal kan ontplooien zowel op als naast het veld.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              {nextEvent?.slug?.current ? (
                <Link
                  href={`/evenementen/${nextEvent.slug.current}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-wider text-sm rounded transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  Eerstvolgende match
                </Link>
              ) : (
                <Link
                  href="/evenementen"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-wider text-sm rounded transition-colors"
                >
                  Bekijk kalender
                </Link>
              )}
              <Link
                href="/ploegen"
                className="px-7 py-3.5 border border-gray-600 hover:border-white text-gray-300 hover:text-white font-bold uppercase tracking-wider text-sm rounded transition-colors"
              >
                Onze ploegen
              </Link>
            </div>
          </div>

          {/* Rechter kolom: next-event preview (alleen als er een is) */}
          {nextEvent && (
            <div className="w-full lg:w-80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 flex flex-col gap-3">
              <p className="text-primary text-xs font-black uppercase tracking-widest">
                Eerstvolgende evenement
              </p>
              <p className="text-white font-black text-base uppercase leading-tight">
                {nextEvent.title}
              </p>
              <p className="text-gray-400 text-sm">
                {nextEvent.startDate ? (
                  <>
                    {new Date(nextEvent.startDate).toLocaleDateString("nl-BE", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                    {" · "}
                    {new Date(nextEvent.startDate).toLocaleTimeString("nl-BE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </>
                ) : (
                  "Datum nog niet bekend"
                )}
              </p>
              {nextEvent.twizzitUrl && (
                <a
                  href={nextEvent.twizzitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 w-full text-center px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                >
                  Inschrijven
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── UPCOMING EVENTS ──────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sectieheader */}
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <span className="block w-8 h-0.5 bg-primary mb-3" />
              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-gray-900">
                Komende Evenementen
              </h2>
            </div>
            <Link
              href="/evenementen"
              className="hidden sm:inline-flex items-center gap-1.5 text-primary text-sm font-bold uppercase tracking-wider hover:gap-2.5 transition-all"
            >
              Alle evenementen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {events.map((event: NonNullable<typeof events>[number]) => (
                <EventCard key={event._id} {...event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 font-semibold uppercase tracking-wide text-sm">
                Geen evenementen gepland
              </p>
              <Link href="/evenementen" className="mt-3 inline-block text-primary text-sm font-bold hover:underline">
                Bekijk het volledige overzicht
              </Link>
            </div>
          )}

          {/* Mobiele link */}
          <div className="mt-6 text-center sm:hidden">
            <Link href="/evenementen" className="text-primary text-sm font-bold uppercase tracking-wider">
              Alle evenementen bekijken →
            </Link>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sectieheader */}
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <span className="block w-8 h-0.5 bg-primary mb-3" />
              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-gray-900">
                Laatste Nieuws
              </h2>
            </div>
            <Link
              href="/nieuws"
              className="hidden sm:inline-flex items-center gap-1.5 text-primary text-sm font-bold uppercase tracking-wider hover:gap-2.5 transition-all"
            >
              Alle berichten
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: NonNullable<typeof posts>[number]) => (
                <NewsCard key={post._id} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 font-semibold uppercase tracking-wide text-sm">
                Nog geen nieuwsberichten
              </p>
            </div>
          )}

          {/* Mobiele link */}
          <div className="mt-6 text-center sm:hidden">
            <Link href="/nieuws" className="text-primary text-sm font-bold uppercase tracking-wider">
              Alle berichten bekijken →
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
