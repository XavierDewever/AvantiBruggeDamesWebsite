import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { TEAM_BY_SLUG_QUERY, ALL_TEAM_SLUGS_QUERY } from "@/sanity/lib/queries";
import { fetchVBLData, buildTeamGuid } from "@/lib/vbl";
import VBLCalendar from "@/components/VBLCalendar";
import VBLStandings from "@/components/VBLStandings";

type Props = { params: Promise<{ slug: string }> };

// ── Statische params voor build-time pre-rendering ───────────────────────────
export async function generateStaticParams() {
  const teams = await client.fetch(ALL_TEAM_SLUGS_QUERY, {});
  return (teams ?? []).map((t: { slug: string }) => ({ slug: t.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const team = await client.fetch(
    TEAM_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 3600 } },
  );
  if (!team) return { title: "Team niet gevonden" };
  return {
    title: `${team.name} | Ford Unicars Avanti Brugge Dames`,
    description: team.description ?? undefined,
  };
}

// ── Pagina ────────────────────────────────────────────────────────────────────
export default async function TeamPage({ params }: Props) {
  const { slug } = await params;

  // Sanity en VBL parallel ophalen
  const team = await client.fetch(
    TEAM_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 3600 } },
  );

  if (!team) notFound();

  const { calendar, standings } = team.basketVlaanderenId
    ? await fetchVBLData(team.basketVlaanderenId)
    : { calendar: { upcoming: [], past: [], reeksGuid: null }, standings: [] };

  const photoSrc = team.teamPhoto?.asset
    ? urlFor(team.teamPhoto).width(1200).height(600).fit("crop").url()
    : null;

  const CATEGORY_LABEL: Record<string, string> = {
    dames_1: "Dames 1", dames_2: "Dames 2",
    u21: "U21", u18: "U18", u16: "U16", u14: "U14", u12: "U12",
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Teamfoto als achtergrond */}
        {photoSrc && (
          <Image
            src={photoSrc}
            alt={team.teamPhoto?.alt ?? team.name}
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col gap-4">
          {team.category && (
            <span className="inline-flex items-center gap-2 w-fit bg-primary px-3 py-1 rounded text-xs font-black uppercase tracking-widest">
              {CATEGORY_LABEL[team.category] ?? team.category}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-none tracking-tight">
            {team.name}
          </h1>
          {team.coachName && (
            <p className="text-gray-300 text-lg">
              Coach: <span className="font-bold text-white">{team.coachName}</span>
            </p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Linker kolom: teaminfo ────────────────────────────────────── */}
          <aside className="lg:col-span-1 space-y-6">

            {/* Teamfoto */}
            {photoSrc && (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={photoSrc}
                  alt={team.teamPhoto?.alt ?? team.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            )}

            {/* Info-kaart */}
            <div className="rounded-lg border border-gray-100 divide-y divide-gray-100">
              <InfoRow label="Team" value={team.name} />
              {team.coachName && (
                <InfoRow label="Coach" value={team.coachName} />
              )}
              {team.category && (
                <InfoRow
                  label="Categorie"
                  value={CATEGORY_LABEL[team.category] ?? team.category}
                />
              )}
              {team.basketVlaanderenId && (
                <InfoRow
                  label="VBL-ID"
                  value={buildTeamGuid(team.basketVlaanderenId)}
                  mono
                />
              )}
            </div>

            {/* Trainingsuren */}
            {team.trainingHours?.length > 0 && (
              <div>
                <SectionLabel>Trainingsuren</SectionLabel>
                <ul className="rounded-lg border border-gray-100 divide-y divide-gray-100">
                  {team.trainingHours.map(
                    (
                      slot: {
                        day: string;
                        startTime: string;
                        endTime: string;
                        location?: string;
                      },
                      i: number,
                    ) => (
                      <li
                        key={i}
                        className="flex items-center justify-between px-4 py-3 text-sm"
                      >
                        <span className="font-bold text-gray-900 capitalize">
                          {slot.day}
                        </span>
                        <span className="text-gray-500">
                          {slot.startTime}–{slot.endTime}
                          {slot.location && (
                            <span className="ml-2 text-xs text-gray-400">
                              {slot.location}
                            </span>
                          )}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {/* Beschrijving */}
            {team.description && (
              <div>
                <SectionLabel>Over dit team</SectionLabel>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {team.description}
                </p>
              </div>
            )}

            {/* Geen VBL-ID waarschuwing */}
            {!team.basketVlaanderenId && (
              <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
                Geen VBL-ID ingesteld — live kalender en stand niet beschikbaar.
              </div>
            )}
          </aside>

          {/* ── Rechter kolom: live VBL data ──────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Kalender */}
            <div>
              <SectionLabel accent>Wedstrijdkalender</SectionLabel>
              <VBLCalendar calendar={calendar} highlightTeam={team.name} />
            </div>

            {/* Klassement */}
            <div>
              <SectionLabel accent>Klassement</SectionLabel>
              <VBLStandings standings={standings} highlightTeam={team.name} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ── Kleine herbruikbare sub-componenten ──────────────────────────────────────

function SectionLabel({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {accent && <span className="w-6 h-0.5 bg-primary" />}
      <h2 className="text-xs font-black uppercase tracking-widest text-gray-500">
        {children}
      </h2>
    </div>
  );
}

function InfoRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <span className="text-gray-400 font-medium">{label}</span>
      <span className={`font-bold text-gray-900 ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </span>
    </div>
  );
}
