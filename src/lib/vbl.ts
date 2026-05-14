/**
 * Basket Vlaanderen (VBL) API utility
 *
 * Base URL: https://vblcb.wisseq.eu/VBLCB_WebService/data/
 *
 * Endpoints:
 *   TeamMatchesByGuid?teamguid={guid}   → wedstrijden van een team
 *   ReeksStandByGuid?guid={reeksGuid}   → klassement van een reeks
 *
 * Team GUID opbouw:
 *   Vast clubpreffix  : "BVBL1436"
 *   Variabel suffix   : opgeslagen in Sanity als `basketVlaanderenId`
 *   Voorbeelden       : "DSE++1" (Dames 1), "M14++2" (M14B)
 *   Volledig GUID     : "BVBL1436DSE++1"
 *
 * De + tekens worden NIET URL-geëncodeerd — de API verwacht ze letterlijk.
 */

const VBL_BASE = "https://vblcb.wisseq.eu/VBLCB_WebService/data";

/** Vast clubprefix voor alle Avanti Brugge Dames ploegen. */
export const VBL_CLUB_PREFIX = "BVBL1436";

/**
 * Bouw het volledige team-GUID op vanuit het variabele suffix dat
 * in Sanity bewaard wordt.
 *
 * @example buildTeamGuid("DSE++1")  // → "BVBL1436DSE++1"
 * @example buildTeamGuid("M14++2")  // → "BVBL1436M14++2"
 */
export function buildTeamGuid(suffix: string): string {
  // Vermijd dubbel prefix als het volledige GUID per vergissing werd ingegeven
  if (suffix.startsWith(VBL_CLUB_PREFIX)) return suffix;
  return `${VBL_CLUB_PREFIX}${suffix}`;
}

// ── Types ────────────────────────────────────────────────────────────────────

export type VBLMatch = {
  /** "DD-MM-YYYY" */
  datumString: string;
  /** "HH:MM" */
  beginTijd: string;
  /** Thuisploeg naam */
  tTNaam: string;
  /** Uitploeg naam */
  tUNaam: string;
  /** Uitslag bv. "75-68" of lege string als nog niet gespeeld */
  uitslag: string;
  /** Reeks-GUID — nodig om het klassement op te halen */
  reeksGuid: string;
  /** Accommodatienaam */
  accNaam?: string;
};

export type VBLStanding = {
  /** Rangpositie */
  iStand: number;
  /** Clubnaam */
  naam: string;
  aantalGewonnen: number;
  aantalVerloren: number;
  totaalVoor: number;
  totaalTegen: number;
  punten: number;
};

export type VBLCalendarResult = {
  upcoming: VBLMatch[];
  past: VBLMatch[];
  reeksGuid: string | null;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseVBLDate(datumString: string): Date {
  // Formaat: "DD-MM-YYYY"
  const [day, month, year] = datumString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// ── API functies ─────────────────────────────────────────────────────────────

/**
 * Haal de wedstrijdenkalender op voor een team.
 * @param suffix Het variabele deel van het GUID uit Sanity (bv. "DSE++1").
 *               Het clubprefix "BVBL1436" wordt automatisch toegevoegd.
 */
export async function fetchTeamCalendar(
  suffix: string,
): Promise<VBLCalendarResult> {
  const guid = buildTeamGuid(suffix);
  const url = `${VBL_BASE}/TeamMatchesByGuid?teamguid=${guid}`;

  const res = await fetch(url, {
    next: { revalidate: 1800 }, // 30 min — wedstrijddata wijzigt niet continu
  });

  if (!res.ok) {
    throw new Error(`VBL API fout (kalender): ${res.status}`);
  }

  const raw: VBLMatch[] = await res.json();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sorted = [...raw].sort(
    (a, b) =>
      parseVBLDate(a.datumString).getTime() -
      parseVBLDate(b.datumString).getTime(),
  );

  const upcoming = sorted.filter(
    (m) => parseVBLDate(m.datumString) >= today,
  );
  const past = sorted
    .filter((m) => parseVBLDate(m.datumString) < today)
    .reverse() // meest recent eerst
    .slice(0, 5); // laatste 5 resultaten

  const reeksGuid = raw[0]?.reeksGuid ?? null;

  return { upcoming, past, reeksGuid };
}

/**
 * Haal het klassement op voor een reeks via de reeksGuid.
 * reeksGuid komt uit de wedstrijddata (fetchTeamCalendar).
 */
export async function fetchStandings(
  reeksGuid: string,
): Promise<VBLStanding[]> {
  const url = `${VBL_BASE}/ReeksStandByGuid?guid=${reeksGuid}`;

  const res = await fetch(url, {
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error(`VBL API fout (klassement): ${res.status}`);
  }

  return res.json();
}

/**
 * Combineer kalender + klassement in één aanroep.
 * @param suffix Het variabele deel van het GUID uit Sanity (bv. "DSE++1").
 * Gooit nooit — geeft lege arrays terug bij API-fouten zodat de pagina
 * altijd rendert.
 */
export async function fetchVBLData(suffix: string): Promise<{
  calendar: VBLCalendarResult;
  standings: VBLStanding[];
}> {
  try {
    const calendar = await fetchTeamCalendar(suffix);

    const standings = calendar.reeksGuid
      ? await fetchStandings(calendar.reeksGuid).catch(() => [])
      : [];

    return { calendar, standings };
  } catch {
    return {
      calendar: { upcoming: [], past: [], reeksGuid: null },
      standings: [],
    };
  }
}

// ── Format helpers (herbruikbaar in componenten) ─────────────────────────────

export function formatVBLDate(datumString: string): string {
  return parseVBLDate(datumString).toLocaleDateString("nl-BE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
