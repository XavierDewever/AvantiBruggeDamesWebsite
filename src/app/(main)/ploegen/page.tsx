import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_TEAMS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Ploegen | Ford Unicars Avanti Brugge Dames",
  description: "Bekijk alle ploegen van Ford Unicars Avanti Brugge Dames — van bovenbouw tot onderbouw.",
};

type Team = {
  _id: string;
  name: string;
  slug: { current: string };
  categorie: "bovenbouw" | "onderbouw" | null;
  teamPhoto?: { asset: unknown; alt?: string };
  coachName?: string;
  assistantCoach?: string;
  basketVlaanderenId?: string;
};

export default async function PloegenPage() {
  const teams: Team[] = await client.fetch(
    ALL_TEAMS_QUERY,
    {},
    { cache: "no-store" },
  );

  const bovenbouw = (teams ?? []).filter((t) => t.categorie === "bovenbouw");
  const onderbouw = (teams ?? []).filter((t) => t.categorie === "onderbouw");

  return (
    <>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            Onze <span className="text-primary">Ploegen</span>
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-xl leading-relaxed">
            Van bovenbouw tot onderbouw — Ford Unicars Avanti Brugge Dames heeft voor elk niveau een ploeg.
          </p>
        </div>
      </section>

      <div className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {bovenbouw.length > 0 && (
            <TeamSection label="Bovenbouw" teams={bovenbouw} />
          )}

          {onderbouw.length > 0 && (
            <TeamSection label="Onderbouw" teams={onderbouw} />
          )}

          {teams?.length === 0 && (
            <div className="py-24 text-center border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 font-semibold uppercase tracking-wide text-sm">
                Nog geen ploegen toegevoegd
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function TeamSection({ label, teams }: { label: string; teams: Team[] }) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <span className="w-8 h-0.5 bg-primary" />
        <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-gray-900">
          {label}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teams.map((team) => {
          const photoSrc = team.teamPhoto?.asset
            ? urlFor(team.teamPhoto as Parameters<typeof urlFor>[0]).width(400).height(280).fit("crop").url()
            : null;

          return (
            <Link
              key={team._id}
              href={`/ploegen/${team.slug.current}`}
              className="group rounded-lg overflow-hidden border border-gray-100 hover:border-primary hover:shadow-lg transition-all duration-200"
            >
              {/* Foto */}
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                {photoSrc ? (
                  <Image
                    src={photoSrc}
                    alt={team.teamPhoto?.alt ?? team.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                  </div>
                )}
                {/* Red accent on hover */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>

              {/* Info */}
              <div className="px-4 py-4">
                <h3 className="font-black text-gray-900 uppercase tracking-wide text-sm group-hover:text-primary transition-colors">
                  {team.name}
                </h3>
                {team.coachName && (
                  <p className="mt-1 text-xs text-gray-500">Coach: {team.coachName}</p>
                )}
                {team.assistantCoach && (
                  <p className="mt-0.5 text-xs text-gray-400">Assistent: {team.assistantCoach}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
