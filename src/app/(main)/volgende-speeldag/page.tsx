import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { ALL_TEAMS_QUERY } from "@/sanity/lib/queries";
import { fetchTeamCalendar, parseVBLDate } from "@/lib/vbl";
import type { VBLMatch } from "@/lib/vbl";

export const metadata: Metadata = {
  title: "Volgende Speeldag | Ford Unicars Avanti Brugge Dames",
  description: "Alle wedstrijden van Avanti Brugge Dames dit weekend.",
};

type SanityTeam = {
  _id: string | null;
  name: string | null;
  basketVlaanderenId?: string | null;
};

// ── Weekend window ────────────────────────────────────────────────────────────

function getWeekendWindow(): { from: Date; to: Date } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dow = today.getDay(); // 0=Sun, 1=Mon … 6=Sat

  let from: Date;
  let to: Date;

  if (dow === 0) {
    // Zondag — alleen vandaag
    from = today;
    to = new Date(today);
  } else if (dow === 6) {
    // Zaterdag — vandaag + morgen (zondag)
    from = today;
    to = new Date(today);
    to.setDate(today.getDate() + 1);
  } else if (dow === 5) {
    // Vrijdag — vandaag t/m zondag
    from = today;
    to = new Date(today);
    to.setDate(today.getDate() + 2);
  } else {
    // Ma–Do — zoek volgende vrijdag t/m zondag
    const daysToFri = 5 - dow;
    from = new Date(today);
    from.setDate(today.getDate() + daysToFri);
    to = new Date(from);
    to.setDate(from.getDate() + 2);
  }

  to.setHours(23, 59, 59, 999);
  return { from, to };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDayHeader(datumString: string): string {
  return parseVBLDate(datumString).toLocaleDateString("nl-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function matchKey(m: VBLMatch) {
  return `${m.datumString}|${m.beginTijd}|${m.tTNaam}|${m.tUNaam}`;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function VolgendeSpeeldagPage() {
  // 1. Haal alle ploegen op uit Sanity
  const teams = await client.fetch<SanityTeam[]>(
    ALL_TEAMS_QUERY,
    {},
    { cache: "no-store" },
  );

  const activeTeams = (teams ?? []).filter((t) => !!t.basketVlaanderenId);

  // 2. Parallel VBL calendars ophalen (fouten per team afvangen)
  const calendars = await Promise.all(
    activeTeams.map((t) =>
      fetchTeamCalendar(t.basketVlaanderenId!).catch(() => ({
        upcoming: [],
        past: [],
        reeksGuid: null,
      })),
    ),
  );

  // 3. Alle upcoming wedstrijden samenvoegen + dedupliceren
  const { from, to } = getWeekendWindow();
  const seen = new Set<string>();
  const weekendMatches: VBLMatch[] = [];

  for (const cal of calendars) {
    for (const match of cal.upcoming) {
      const d = parseVBLDate(match.datumString);
      if (d < from || d > to) continue;
      const key = matchKey(match);
      if (seen.has(key)) continue;
      seen.add(key);
      weekendMatches.push(match);
    }
  }

  // 4. Sorteren: eerst op datum, dan op tijd
  weekendMatches.sort((a, b) => {
    const dateDiff =
      parseVBLDate(a.datumString).getTime() -
      parseVBLDate(b.datumString).getTime();
    if (dateDiff !== 0) return dateDiff;
    return a.beginTijd.localeCompare(b.beginTijd);
  });

  // 5. Groeperen per dag
  const groupedMap = new Map<string, VBLMatch[]>();
  for (const match of weekendMatches) {
    const existing = groupedMap.get(match.datumString) ?? [];
    existing.push(match);
    groupedMap.set(match.datumString, existing);
  }
  const grouped = Array.from(groupedMap.entries());

  // Weekend-label voor de header
  const weekendLabel =
    from.toLocaleDateString("nl-BE", { day: "numeric", month: "long" }) +
    (from.getTime() !== to.getTime()
      ? " – " + to.toLocaleDateString("nl-BE", { day: "numeric", month: "long" })
      : "");

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            Volgende <span className="text-primary">Speeldag</span>
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-xl leading-relaxed">
            Wedstrijden van {weekendLabel} — alle ploegen van Avanti Brugge Dames.
          </p>
        </div>
      </section>

      {/* ── Inhoud ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {grouped.length > 0 ? (
            <div className="space-y-12">
              {grouped.map(([datumString, matches]) => (
                <div key={datumString}>
                  {/* Dag-header */}
                  <div className="flex items-center gap-4 mb-5">
                    <span className="w-8 h-0.5 bg-primary shrink-0" />
                    <h2 className="text-sm font-black uppercase tracking-widest text-gray-900 capitalize">
                      {formatDayHeader(datumString)}
                    </h2>
                  </div>

                  {/* Wedstrijden */}
                  <ul className="divide-y divide-gray-100 rounded-lg border border-gray-100 overflow-hidden">
                    {matches.map((match, i) => (
                      <MatchRow key={i} match={match} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </>
  );
}

// ── MatchRow ─────────────────────────────────────────────────────────────────

function MatchRow({ match }: { match: VBLMatch }) {
  const isAvanti = (name: string) =>
    name.toLowerCase().includes("avanti");
  const homeIsAvanti = isAvanti(match.tTNaam);
  const awayIsAvanti = isAvanti(match.tUNaam);

  return (
    <li className={`px-4 py-4 sm:px-5 ${homeIsAvanti || awayIsAvanti ? "bg-red-50" : "bg-white hover:bg-gray-50"} transition-colors`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

        {/* Tijdstip */}
        <div className="shrink-0 w-14">
          <span className="text-sm font-black text-gray-900 tabular-nums">
            {match.beginTijd}
          </span>
        </div>

        {/* Teams */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className={`flex-1 text-right text-sm truncate ${homeIsAvanti ? "font-black text-primary" : "font-semibold text-gray-800"}`}>
            {match.tTNaam}
          </span>
          <span className="shrink-0 text-xs font-black text-gray-400 uppercase tracking-wider px-2">
            vs
          </span>
          <span className={`flex-1 text-left text-sm truncate ${awayIsAvanti ? "font-black text-primary" : "font-semibold text-gray-800"}`}>
            {match.tUNaam}
          </span>
        </div>

        {/* Locatie */}
        {match.accNaam && (
          <div className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 sm:w-36">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="truncate">{match.accNaam}</span>
          </div>
        )}
      </div>
    </li>
  );
}

// ── EmptyState ────────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="py-24 flex flex-col items-center gap-6 text-center border-2 border-dashed border-gray-200 rounded-lg">
      {/* Kalender-off icoon */}
      <svg
        className="w-16 h-16 text-gray-300"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
      </svg>

      <div className="space-y-1">
        <p className="text-gray-700 font-black text-lg uppercase tracking-tight">
          Geen wedstrijden gepland
        </p>
        <p className="text-gray-400 text-sm">
          Voor het komende weekend staan er geen wedstrijden ingepland.
        </p>
      </div>

      <Link
        href="/ploegen"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-black uppercase tracking-wider rounded hover:bg-primary-dark transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
        Bekijk alle ploegen
      </Link>
    </div>
  );
}
