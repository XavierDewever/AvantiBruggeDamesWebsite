import type { VBLStanding } from "@/lib/vbl";

type Props = {
  standings: VBLStanding[];
  highlightTeam?: string;
};

export default function VBLStandings({ standings, highlightTeam }: Props) {
  if (standings.length === 0) {
    return (
      <div className="py-10 text-center border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide">
          Klassement niet beschikbaar
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100">
      <table className="w-full min-w-[480px] text-sm border-collapse">
        <thead>
          <tr className="bg-primary text-white">
            <Th className="w-10 text-center">#</Th>
            <Th>Club</Th>
            <Th className="text-center">G</Th>
            <Th className="text-center">W</Th>
            <Th className="text-center">V</Th>
            <Th className="text-center hidden sm:table-cell">Voor</Th>
            <Th className="text-center hidden sm:table-cell">Tegen</Th>
            <Th className="text-center">Ptn</Th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, i) => {
            const isHighlighted = highlightTeam
              ? team.naam.toLowerCase().includes(highlightTeam.toLowerCase())
              : false;
            const isEven = i % 2 === 0;

            return (
              <tr
                key={i}
                className={`
                  transition-colors
                  ${isHighlighted
                    ? "bg-primary/10 font-black text-primary border-l-4 border-l-primary"
                    : isEven
                    ? "bg-white hover:bg-gray-50"
                    : "bg-gray-50 hover:bg-gray-100"
                  }
                `}
              >
                <td className="px-3 py-3 text-center font-black text-gray-500">
                  {team.iStand}
                </td>
                <td className="px-3 py-3 font-semibold truncate max-w-[180px]">
                  {team.naam}
                </td>
                <td className="px-3 py-3 text-center text-gray-600">
                  {team.aantalGewonnen + team.aantalVerloren}
                </td>
                <td className="px-3 py-3 text-center text-gray-600">
                  {team.aantalGewonnen}
                </td>
                <td className="px-3 py-3 text-center text-gray-600">
                  {team.aantalVerloren}
                </td>
                <td className="px-3 py-3 text-center text-gray-600 hidden sm:table-cell">
                  {team.totaalVoor}
                </td>
                <td className="px-3 py-3 text-center text-gray-600 hidden sm:table-cell">
                  {team.totaalTegen}
                </td>
                <td className="px-3 py-3 text-center font-black text-gray-900">
                  {team.punten}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Legenda */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
        <span className="w-3 h-3 border-l-2 border-primary bg-primary/10 inline-block" />
        <span>Eigen team</span>
        <span className="ml-4">G = Gespeeld · W = Gewonnen · V = Verloren · Ptn = Punten</span>
      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-3 py-3 text-left text-xs font-black uppercase tracking-widest ${className}`}
    >
      {children}
    </th>
  );
}
