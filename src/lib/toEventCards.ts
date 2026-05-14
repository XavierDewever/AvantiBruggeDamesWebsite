import type { EventCardProps } from "@/components/EventCard";

/** Normaliseer undefined → null zodat we consistent met null werken */
function nullify<T>(val: T | undefined | null): T | null {
  return val ?? null;
}

/**
 * Accepteert de ruwe Sanity-output (unknown[]) en zet deze om naar EventCardProps[].
 * Events zonder _id, title, slug.current, eventType of startDate worden overgeslagen.
 */
export function toEventCards(raw: unknown[]): EventCardProps[] {
  return raw
    .map((e) => {
      if (!e || typeof e !== "object") return null;

      const item = e as Record<string, unknown>;

      // Slug kan een object { current?: string } of null/undefined zijn
      const slugObj = item.slug as { current?: string | null } | null | undefined;
      const slugCurrent = slugObj?.current ?? null;

      return {
        _id:        typeof item._id       === "string" ? item._id       : null,
        title:      typeof item.title     === "string" ? item.title     : null,
        slug:       slugCurrent !== null ? { current: slugCurrent } : null,
        eventType:  typeof item.eventType === "string" ? item.eventType : null,
        startDate:  typeof item.startDate === "string" ? item.startDate : null,
        endDate:    nullify(item.endDate   as string | undefined),
        status:     nullify(item.status    as string | undefined),
        twizzitUrl: nullify(item.twizzitUrl as string | undefined),
        image:      nullify(item.image as EventCardProps["image"] | undefined),
      };
    })
    .filter(
      (e): e is EventCardProps =>
        typeof e?._id       === "string" &&
        typeof e?.title     === "string" &&
        typeof e?.slug?.current === "string" &&
        typeof e?.eventType === "string" &&
        typeof e?.startDate === "string",
    );
}
