import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { TEAM_BY_SLUG_QUERY, ALL_TEAM_SLUGS_QUERY } from "@/sanity/lib/queries";
import { fetchVBLData } from "@/lib/vbl";
import VBLCalendar from "@/components/VBLCalendar";
import VBLStandings from "@/components/VBLStandings";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const teams = await client.fetch(ALL_TEAM_SLUGS_QUERY, {}) as unknown[];
  return (teams ?? [])
    .filter((t): t is { slug: string } => typeof (t as Record<string, unknown>)?.slug === "string")
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const team = await client.fetch(
    TEAM_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 3600 } },
  );
  if (!team) return { title: "Ploeg niet gevonden" };
  return {
    title: `${team.name ?? "Ploeg"} | Ford Unicars Avanti Brugge Dames`,
    description: team.description ?? undefined,
  };
}

export default async function PloegPage({ params }: Props) {
  const { slug } = await params;

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

  const CATEGORIE_LABEL: Record<string, string> = {
    bovenbouw: "Bovenbouw",
    onderbouw: "Onderbouw",
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {photoSrc && (
          <Image
            src={photoSrc}
            alt={team.teamPhoto?.alt ?? team.name ?? ""}
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col gap-4">
          {team.categorie && (
            <span className="inline-flex items-center gap-2 w-fit bg-primary px-3 py-1 rounded text-xs font-black uppercase tracking-widest">
              {CATEGORIE_LABEL[team.categorie] ?? team.categorie}
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
          {team.assistantCoach && (
            <p className="text-gray-400 text-base">
              Assistent: <span className="font-semibold text-gray-200">{team.assistantCoach}</span>
            </p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Linker kolom: teaminfo ────────────────────────────────────── */}
          <aside className="lg:col-span-1 space-y-6">

            {photoSrc && (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={photoSrc}
                  alt={team.teamPhoto?.alt ?? team.name ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            )}

            <div className="rounded-lg border border-gray-100 divide-y divide-gray-100">
              <InfoRow label="Team" value={team.name ?? "Naamloos team"} />
              {team.coachName && <InfoRow label="Hoofdcoach" value={team.coachName} />}
              {team.assistantCoach && <InfoRow label="Assistent" value={team.assistantCoach} />}
            </div>

            {(team.trainingHours ?? []).length > 0 && (
              <div>
                <SectionLabel>Trainingsuren</SectionLabel>
                <ul className="rounded-lg border border-gray-100 divide-y divide-gray-100">
                  {(team.trainingHours ?? []).map(
                    (
                      slot: {
                        day?: string | null;
                        startTime?: string | null;
                        endTime?: string | null;
                        location?: string | null;
                      },
                      i: number,
                    ) => (
                      <li key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                        <span className="font-bold text-gray-900 capitalize">{slot.day ?? ""}</span>
                        <span className="text-gray-500">
                          {slot.startTime ?? ""}–{slot.endTime ?? ""}
                          {slot.location && (
                            <span className="ml-2 text-xs text-gray-400">{slot.location}</span>
                          )}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {team.description && (
              <div>
                <SectionLabel>Over deze ploeg</SectionLabel>
                <p className="text-gray-600 text-sm leading-relaxed">{team.description}</p>
              </div>
            )}

            {!team.basketVlaanderenId && (
              <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
                Geen VBL-ID ingesteld — live kalender en stand niet beschikbaar.
              </div>
            )}
          </aside>

          {/* ── Rechter kolom: live VBL data ──────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <SectionLabel accent>Wedstrijdkalender</SectionLabel>
              <VBLCalendar calendar={calendar} highlightTeam={team.name ?? ""} />
            </div>
            <div>
              <SectionLabel accent>Klassement</SectionLabel>
              <VBLStandings standings={standings} highlightTeam={team.name ?? ""} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ── Sub-componenten ───────────────────────────────────────────────────────────

function SectionLabel({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {accent && <span className="w-6 h-0.5 bg-primary" />}
      <h2 className="text-xs font-black uppercase tracking-widest text-gray-500">{children}</h2>
    </div>
  );
}

function InfoRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <span className="text-gray-400 font-medium">{label}</span>
      <span className={`font-bold text-gray-900 ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
    </div>
  );
}
