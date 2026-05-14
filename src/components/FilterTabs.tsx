"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

export type FilterType = "all" | "stage" | "event";

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "all",   label: "Alle"       },
  { value: "stage", label: "Stages"     },
  { value: "event", label: "Clubevenementen" },
];

type Props = {
  counts: Record<FilterType, number>;
};

export default function FilterTabs({ counts }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const active = (searchParams.get("type") ?? "all") as FilterType;

  const setFilter = useCallback(
    (value: FilterType) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") params.delete("type");
      else params.set("type", value);

      startTransition(() => {
        router.replace(`/evenementen?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  return (
    <div
      role="tablist"
      aria-label="Filter evenementen"
      className={`flex flex-wrap items-center gap-2 mb-10 transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}
    >
      {FILTER_OPTIONS.map(({ value, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            onClick={() => setFilter(value)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-bold uppercase tracking-wider transition-colors
              ${isActive
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
          >
            {label}
            <span
              className={`text-xs font-black px-1.5 py-0.5 rounded-sm
                ${isActive ? "bg-white/20 text-white" : "bg-gray-300/60 text-gray-500"}`}
            >
              {counts[value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
