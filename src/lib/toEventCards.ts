import type { EventCardProps } from "@/components/EventCard";

/** Raw type zoals Sanity het teruggeeft — alle velden potentieel null */
export type RawEvent = {
  _id: string | null;
  title: string | null;
  slug: { current: string | null } | null;
  eventType: string | null;
  startDate: string | null;
  endDate?: string | null;
  status?: string | null;
  twizzitUrl?: string | null;
  image?: { asset?: { _ref: string }; alt?: string } | null;
};

/**
 * Filter onvolledige events eruit en map naar EventCardProps.
 * Events zonder _id, title, slug, eventType of startDate worden overgeslagen.
 */
export function toEventCards(raw: RawEvent[]): EventCardProps[] {
  return raw
    .filter(
      (e): e is RawEvent & {
        _id: string;
        title: string;
        slug: { current: string };
        eventType: string;
        startDate: string;
      } =>
        typeof e._id === "string" &&
        typeof e.title === "string" &&
        typeof e.slug?.current === "string" &&
        typeof e.eventType === "string" &&
        typeof e.startDate === "string",
    )
    .map((e) => ({
      _id: e._id,
      title: e.title,
      slug: { current: e.slug.current },
      eventType: e.eventType,
      startDate: e.startDate,
      endDate: e.endDate,
      status: e.status,
      twizzitUrl: e.twizzitUrl,
      image: e.image,
    }));
}
