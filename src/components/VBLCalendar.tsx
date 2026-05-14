import type { VBLMatch, VBLCalendarResult } from "@/lib/vbl";
import { formatVBLDate } from "@/lib/vbl";

type Props = {
  calendar: VBLCalendarResult;
  highlightTeam?: string;
};

export default function VBLCalendar({ calendar, highlightTeam }: Props) {
  const { upcoming, past } = calendar;

  if (upcoming.length === 0 && past.length === 0) {
    return (
      <div className="py-10 text-center border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide">
          Geen wedstrijden gevonden
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {upcoming.length > 0 && (
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">
            Komende wedstrijden
          </h3>
          <MatchList matches={upcoming} highlightTeam={highlightTeam} />
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
            Laatste resultaten
          </h3>
          <MatchList matches={past} highlightTeam={highlightTeam} showScore />
        </div>
      )}
    </div>
  );
}

function MatchList({
  matches,
  highlightTeam,
  showScore = false,
}: {
  matches: VBLMatch[];
  highlightTeam?: string;
  showScore?: boolean;
}) {
  return (
    <ul className="divide-y divide-gray-100 rounded-lg border border-gray-100 overflow-hidden">
      {matches.map((match, i) => {
        const teamLower = highlightTeam?.toLowerCase() ?? "";
        const isHome = teamLower
          ? match.tTNaam.toLowerCase().includes(teamLower)
          : false;
        const isAway = teamLower
          ? match.tUNaam.toLowerCase().includes(teamLower)
          : false;

        return (
          <li
            key={i}
            className={`grid grid-cols-[auto_auto_1fr_auto_1fr] items-center gap-2 sm:gap-3 px-4 py-3 transition-colors text-sm ${
              isHome || isAway ? "bg-red-50" : "bg-white hover:bg-gray-50"
            }`}
          >
            {/* Datum + tijd */}
            <div className="min-w-[80px]">
              <p className="font-bold text-gray-900 text-xs leading-tight">
                {formatVBLDate(match.datumString)}
              </p>
              <p className="text-gray-400 text-xs">{match.beginTijd}</p>
            </div>

            {/* THUIS / UIT badge */}
            <div className="min-w-[36px]">
              {isHome && (
                <span className="inline-block bg-primary text-white text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded leading-none">
                  THUIS
                </span>
              )}
              {isAway && (
                <span className="inline-block bg-gray-700 text-white text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded leading-none">
                  UIT
                </span>
              )}
            </div>

            {/* Thuisploeg */}
            <p
              className={`text-right truncate ${
                isHome
                  ? "font-black text-primary"
                  : "text-gray-700 font-medium"
              }`}
            >
              {match.tTNaam}
            </p>

            {/* Score / vs */}
            <div className="flex flex-col items-center min-w-[44px]">
              {showScore && match.uitslag ? (
                <span className="bg-gray-900 text-white text-xs font-black px-2 py-0.5 rounded tabular-nums">
                  {match.uitslag}
                </span>
              ) : (
                <span className="text-gray-400 text-xs font-bold uppercase">
                  vs
                </span>
              )}
            </div>

            {/* Uitploeg */}
            <p
              className={`truncate ${
                isAway
                  ? "font-black text-primary"
                  : "text-gray-700 font-medium"
              }`}
            >
              {match.tUNaam}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
