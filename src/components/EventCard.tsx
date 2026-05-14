import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export type EventCardProps = {
  _id: string | null;
  title: string | null;
  slug: { current: string | null } | null;
  eventType: string | null;
  startDate: string | null;
  endDate?: string | null;
  status?: string | null;
  twizzitUrl?: string | null;
  image?: { asset?: unknown; alt?: string } | null;
  /** Volledige kaartvariant voor de events-pagina (grotere afbeelding, prominentere knop) */
  variant?: "default" | "full";
};

const TYPE_LABEL: Record<string, string> = {
  stage: "Stage",
  event: "Clubevent",
};

const STATUS_CONFIG: Record<string, { label: string; dot: string; badge: string }> = {
  open:        { label: "Open",         dot: "bg-green-400",  badge: "bg-green-500/15 text-green-300 ring-green-500/30" },
  bijna_volzet:{ label: "Bijna Volzet", dot: "bg-yellow-400", badge: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30" },
  volzet:      { label: "Volzet",       dot: "bg-red-400",    badge: "bg-red-500/20 text-red-300 ring-red-500/30" },
};

function formatDateRange(start: string, end?: string | null) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;

  const sameDay =
    endDate &&
    startDate.toDateString() === endDate.toDateString();

  const tz = "Europe/Brussels";

  const dateStr = startDate.toLocaleDateString("nl-BE", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: tz,
  });

  if (!endDate) return dateStr;
  if (sameDay) {
    const startTime = startDate.toLocaleTimeString("nl-BE", { hour: "2-digit", minute: "2-digit", timeZone: tz });
    const endTime = endDate.toLocaleTimeString("nl-BE", { hour: "2-digit", minute: "2-digit", timeZone: tz });
    return `${dateStr} · ${startTime}–${endTime}`;
  }

  // Meerdaags (stage)
  const endStr = endDate.toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: tz,
  });
  return `${dateStr} → ${endStr}`;
}

export default function EventCard({
  title,
  slug,
  eventType,
  startDate,
  endDate,
  status,
  twizzitUrl,
  image,
  variant = "default",
}: EventCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imgSrc = image?.asset
    ? urlFor(image as Parameters<typeof urlFor>[0]).width(720).height(variant === "full" ? 400 : 340).fit("crop").url()
    : null;

  const statusCfg = status ? STATUS_CONFIG[status] : null;
  const isVolzet = status === "volzet";
  const imgHeight = variant === "full" ? "h-52" : "h-44";
  const displayTitle = title ?? "Evenement";
  const displayType = eventType ?? "event";
  const slugCurrent = slug?.current ?? "";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg bg-primary text-white shadow-card">

      {/* ── Afbeelding ─────────────────────────────────────────────────────── */}
      <div className={`relative ${imgHeight} w-full overflow-hidden bg-primary-dark`}>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={(image as { alt?: string } | null)?.alt ?? displayTitle}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
          />
        ) : (
          /* Basketbal placeholder */
          <svg
            className="absolute inset-0 m-auto w-16 h-16 text-white/15"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              fill="none"
              stroke="rgba(0,0,0,.3)"
              strokeWidth="1"
              d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"
            />
          </svg>
        )}

        {/* Type badge */}
        <span className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded">
          {TYPE_LABEL[displayType] ?? displayType}
        </span>

        {/* Status badge */}
        {statusCfg && (
          <span
            className={`absolute top-3 right-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded ring-1 ${statusCfg.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
            {statusCfg.label}
          </span>
        )}
      </div>

      {/* ── Inhoud ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5 gap-3">
        <div>
          <p className="text-white/65 text-xs font-semibold uppercase tracking-wide mb-1.5">
            {startDate ? formatDateRange(startDate, endDate) : "Datum niet beschikbaar"}
          </p>
          <h3 className="font-black text-base lg:text-lg uppercase leading-tight line-clamp-2">
            {displayTitle}
          </h3>
        </div>

        {/* ── Knoppen ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2 mt-auto pt-1">
          {/* Twizzit-knop — prominent, volledig breed */}
          {twizzitUrl ? (
            <a
              href={isVolzet ? "#" : twizzitUrl}
              target={isVolzet ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-disabled={isVolzet}
              className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded transition-colors
                ${isVolzet
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white text-primary hover:bg-gray-100"
                }`}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
              </svg>
              {isVolzet ? "Volzet" : "Inschrijven via Twizzit"}
            </a>
          ) : (
            <span className="flex items-center justify-center w-full px-4 py-2.5 bg-white/10 text-white/50 text-xs font-bold uppercase tracking-wider rounded">
              Geen inschrijving vereist
            </span>
          )}

        </div>
      </div>
    </article>
  );
}
