import type { VBLMatch } from "@/lib/vbl";
import { formatVBLDate } from "@/lib/vbl";

type Props = {
  matches: VBLMatch[];
  highlightTeam?: string;
};

export default function VBLUpcoming({ matches, highlightTeam }: Props) {
  if (matches.length === 0) {
    return (
      <div className="py-10 flex flex-col items-center gap-3 text-center border-2 border-dashed border-gray-200 rounded-lg">
        <svg
          className="w-10 h-10 text-gray-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
        </svg>
        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide">
          Geen komende wedstrijden gevonden
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100">
    <ul className="divide-y divide-gray-100 min-w-[480px]">
      {matches.map((match, i) => {
        const teamLower = highlightTeam?.toLowerCase() ?? "";
        const isHome = teamLower ? match.tTNaam.toLowerCase().includes(teamLower) : false;
        const isAway = teamLower ? match.tUNaam.toLowerCase().includes(teamLower) : false;

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
            <p className={`text-right truncate ${isHome ? "font-black text-primary" : "text-gray-700 font-medium"}`}>
              {match.tTNaam}
            </p>

            {/* vs */}
            <div className="flex flex-col items-center min-w-[44px]">
              <span className="text-gray-400 text-xs font-bold uppercase">vs</span>
            </div>

            {/* Uitploeg */}
            <p className={`truncate ${isAway ? "font-black text-primary" : "text-gray-700 font-medium"}`}>
              {match.tUNaam}
            </p>
          </li>
        );
      })}
    </ul>
    </div>
  );
}
