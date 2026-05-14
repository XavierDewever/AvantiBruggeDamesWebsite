import { client } from "@/sanity/lib/client";
import { TEAMS_FOR_NAV_QUERY } from "@/sanity/lib/queries";
import HeaderClient from "./HeaderClient";

export type TeamForNav = {
  _id: string;
  name: string;
  slug: string;
  categorie: "bovenbouw" | "onderbouw" | null;
};

export default async function Header() {
  const teams: TeamForNav[] = await client
    .fetch(TEAMS_FOR_NAV_QUERY, {}, { cache: "no-store" })
    .catch(() => []);

  return <HeaderClient teams={teams} />;
}
