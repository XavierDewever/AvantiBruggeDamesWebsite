import { Suspense } from "react";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { ALL_EVENTS_QUERY } from "@/sanity/lib/queries";
import FilterTabs, { type FilterType } from "@/components/FilterTabs";
import EventCard, { type EventCardProps } from "@/components/EventCard";

export const metadata: Metadata = {
  title: "Evenementen | Ford Unicars Avanti Brugge Dames",
  description:
    "Bekijk alle evenementen en stages van Ford Unicars Avanti Brugge Dames en schrijf je in via Twizzit.",
};

const VALID_TYPES = ["stage", "event"] as const;
type EventType = (typeof VALID_TYPES)[number];

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function EvenementenPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const activeType = VALID_TYPES.includes(type as EventType)
    ? (type as EventType)
    : null;

  const allEvents = await client.fetch<EventCardProps[]>(
    ALL_EVENTS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

  const filtered = activeType
    ? allEvents?.filter((e) => e.eventType === activeType)
    : allEvents;

  const counts: Record<FilterType, number> = {
    all:   allEvents?.length ?? 0,
    stage: allEvents?.filter((e) => e.eventType === "stage").length ?? 0,
    event: allEvents?.filter((e) => e.eventType === "event").length ?? 0,
  };

  return (
    <>
      {/* ── Paginaheader ───────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-4">
            Evenementen &{" "}
            <span className="text-primary">Stages</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Alle activiteiten van Avanti Brugge Dames — van zomerstages tot
            clubevenementen. Schrijf je rechtstreeks in via Twizzit.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            <Stat label="Stages"          value={counts.stage} />
            <Stat label="Clubevenementen" value={counts.event} />
            <Stat label="Totaal"          value={counts.all}   />
          </div>
        </div>
      </section>

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<TabsSkeleton />}>
            <FilterTabs counts={counts} />
          </Suspense>

          {filtered?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <EventCard key={event._id ?? ""} {...event} variant="full" />
              ))}
            </div>
          ) : (
            <EmptyState type={activeType} />
          )}
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl font-black text-white">{value}</span>
      <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
}

function TabsSkeleton() {
  return (
    <div className="flex gap-2 mb-10">
      {[80, 96, 112].map((w) => (
        <div key={w} style={{ width: w }} className="h-10 rounded bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}

function EmptyState({ type }: { type: EventType | null }) {
  const label = type === "stage" ? "stages" : type === "event" ? "clubevents" : "evenementen";
  return (
    <div className="py-24 text-center border-2 border-dashed border-gray-200 rounded-lg">
      <svg
        className="mx-auto w-12 h-12 text-gray-300 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
      </svg>
      <p className="text-gray-500 font-bold uppercase tracking-wide text-sm">
        Geen {label} gevonden
      </p>
      {type && (
        <a href="/evenementen" className="mt-3 inline-block text-primary text-sm font-bold hover:underline">
          Toon alle evenementen
        </a>
      )}
    </div>
  );
}
