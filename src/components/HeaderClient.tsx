"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type { TeamForNav } from "./Header";

// ── Static nav data ───────────────────────────────────────────────────────────

const clubItems = [
  { label: "Visie & Missie",     href: "/visie"              },
  { label: "Gedragscode",        href: "/gedragscode"        },
  { label: "Vertrouwenspersoon", href: "/vertrouwenspersoon" },
  { label: "GDPR",               href: "/gdpr"               },
  { label: "Documenten & handleidingen", href: "/documenten" },
];


// ── Helpers ───────────────────────────────────────────────────────────────────

function useClickOutside(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, cb]);
}

function ChevronIcon({ open, dark = false }: { open: boolean; dark?: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""} ${dark ? "text-gray-500" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
    </svg>
  );
}

// ── Desktop: simple dropdown (Club, Contact) ──────────────────────────────────

function DropdownMenu({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useClickOutside(ref, () => setOpen(false));

  function handleMouseEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white/90 uppercase tracking-wide hover:text-white transition-colors rounded"
      >
        {label}
        <ChevronIcon open={open} />
      </button>

      <div
        role="menu"
        className={`absolute top-full left-0 mt-1 w-60 rounded-b-md bg-white shadow-lg border-t-2 border-primary overflow-hidden
          transition-all duration-150 origin-top
          ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
      >
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            onClick={() => setOpen(false)}
            className={`flex items-center px-4 py-3 text-sm font-bold text-gray-800 uppercase tracking-wide
              hover:bg-primary hover:text-white transition-colors
              ${i !== 0 ? "border-t border-gray-100" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Desktop: Ploegen mega menu ────────────────────────────────────────────────

function PloegenMegaMenu({ teams }: { teams: TeamForNav[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useClickOutside(ref, () => setOpen(false));

  const bovenbouw = teams.filter((t) => t.categorie === "bovenbouw");
  const onderbouw = teams.filter((t) => t.categorie === "onderbouw");

  function handleMouseEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white/90 uppercase tracking-wide hover:text-white transition-colors rounded"
      >
        Ploegen
        <ChevronIcon open={open} />
      </button>

      {/* Mega panel */}
      <div
        className={`absolute top-full left-0 mt-1 w-[500px] rounded-b-md bg-white shadow-xl border-t-4 border-primary overflow-hidden
          transition-all duration-150 origin-top
          ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
      >
        <div className="grid grid-cols-2 divide-x divide-gray-100">

          {/* Bovenbouw */}
          <div className="p-5">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">
              Bovenbouw
            </p>
            <div className="space-y-0.5">
              {bovenbouw.length > 0 ? (
                bovenbouw.map((team) => (
                  <Link
                    key={team._id}
                    href={`/ploegen/${team.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 text-sm font-bold text-gray-700 uppercase tracking-wide hover:text-primary hover:bg-red-50 rounded transition-colors"
                  >
                    {team.name}
                  </Link>
                ))
              ) : (
                <p className="text-xs text-gray-400 px-2 py-1 italic">Nog geen ploegen</p>
              )}
            </div>
          </div>

          {/* Onderbouw */}
          <div className="p-5">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">
              Onderbouw
            </p>
            <div className="space-y-0.5">
              {onderbouw.length > 0 ? (
                onderbouw.map((team) => (
                  <Link
                    key={team._id}
                    href={`/ploegen/${team.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 text-sm font-bold text-gray-700 uppercase tracking-wide hover:text-primary hover:bg-red-50 rounded transition-colors"
                  >
                    {team.name}
                  </Link>
                ))
              ) : (
                <p className="text-xs text-gray-400 px-2 py-1 italic">Nog geen ploegen</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom link: alle ploegen */}
        <div className="border-t border-gray-100 px-5 py-3">
          <Link
            href="/ploegen"
            onClick={() => setOpen(false)}
            className="text-xs font-black text-primary uppercase tracking-widest hover:underline"
          >
            Alle ploegen bekijken →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Mobile: simple dropdown ───────────────────────────────────────────────────

function MobileDropdown({
  label,
  items,
  closeMenu,
}: {
  label: string;
  items: { label: string; href: string }[];
  closeMenu: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-3 text-sm font-bold text-gray-800 uppercase tracking-wide hover:text-primary hover:bg-gray-50 rounded transition-colors"
      >
        {label}
        <ChevronIcon open={open} dark />
      </button>

      {open && (
        <div className="ml-3 border-l-2 border-primary pl-3 mb-1 flex flex-col gap-0.5">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => { setOpen(false); closeMenu(); }}
              className="px-2 py-2.5 text-sm font-bold text-gray-600 uppercase tracking-wide hover:text-primary transition-colors rounded"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Mobile: Ploegen mega dropdown ─────────────────────────────────────────────

function MobilePloegenDropdown({
  teams,
  closeMenu,
}: {
  teams: TeamForNav[];
  closeMenu: () => void;
}) {
  const [open, setOpen] = useState(false);
  const bovenbouw = teams.filter((t) => t.categorie === "bovenbouw");
  const onderbouw = teams.filter((t) => t.categorie === "onderbouw");

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-3 text-sm font-bold text-gray-800 uppercase tracking-wide hover:text-primary hover:bg-gray-50 rounded transition-colors"
      >
        Ploegen
        <ChevronIcon open={open} dark />
      </button>

      {open && (
        <div className="ml-3 border-l-2 border-primary pl-3 mb-1">
          {bovenbouw.length > 0 && (
            <>
              <p className="px-2 py-1.5 text-[10px] font-black text-primary uppercase tracking-widest">
                Bovenbouw
              </p>
              {bovenbouw.map((team) => (
                <Link
                  key={team._id}
                  href={`/ploegen/${team.slug}`}
                  onClick={() => { setOpen(false); closeMenu(); }}
                  className="block px-2 py-2 text-sm font-bold text-gray-600 uppercase tracking-wide hover:text-primary transition-colors rounded"
                >
                  {team.name}
                </Link>
              ))}
            </>
          )}

          {onderbouw.length > 0 && (
            <>
              <p className="px-2 py-1.5 text-[10px] font-black text-primary uppercase tracking-widest mt-2">
                Onderbouw
              </p>
              {onderbouw.map((team) => (
                <Link
                  key={team._id}
                  href={`/ploegen/${team.slug}`}
                  onClick={() => { setOpen(false); closeMenu(); }}
                  className="block px-2 py-2 text-sm font-bold text-gray-600 uppercase tracking-wide hover:text-primary transition-colors rounded"
                >
                  {team.name}
                </Link>
              ))}
            </>
          )}

          <Link
            href="/ploegen"
            onClick={() => { setOpen(false); closeMenu(); }}
            className="block px-2 py-2.5 text-sm font-black text-primary uppercase tracking-wide hover:underline"
          >
            Alle ploegen →
          </Link>
        </div>
      )}
    </div>
  );
}

// ── HeaderClient (main export) ────────────────────────────────────────────────

export default function HeaderClient({ teams }: { teams: TeamForNav[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 shadow-lg">

      {/* ── Navigatiebalk ─────────────────────────────────────────────── */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28 lg:h-32">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo_avanti_transparent.svg"
                alt="Ford Unicars Avanti Brugge Dames"
                height={100}
                width={400}
                className="h-[120px] w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-bold text-white/90 uppercase tracking-wide hover:text-white hover:bg-white/10 transition-colors rounded"
              >
                Home
              </Link>
              <DropdownMenu label="Club" items={clubItems} />
              <PloegenMegaMenu teams={teams} />
              <Link
                href="/sponsors"
                className="px-4 py-2 text-sm font-bold text-white/90 uppercase tracking-wide hover:text-white hover:bg-white/10 transition-colors rounded"
              >
                Sponsors
              </Link>
              <Link
                href="/evenementen"
                className="px-4 py-2 text-sm font-bold text-white/90 uppercase tracking-wide hover:text-white hover:bg-white/10 transition-colors rounded"
              >
                Evenementen
              </Link>
              <Link
                href="/lid-worden"
                className="px-4 py-2 text-sm font-bold text-white/90 uppercase tracking-wide hover:text-white hover:bg-white/10 transition-colors rounded"
              >
                Lid worden
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-bold text-white/90 uppercase tracking-wide hover:text-white hover:bg-white/10 transition-colors rounded"
              >
                Contacteer ons
              </Link>
            </nav>

            {/* Shop + hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="https://static.twizzit.com/v2/form/QnptTWJYbWErUDhlRCtaTWhhSEp1QT09"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary hover:bg-gray-100 text-sm font-black uppercase tracking-wider rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                </svg>
                Shop
              </a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded text-white hover:bg-white/10 focus:outline-none transition-colors"
                aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-primary shadow-md overflow-y-auto overscroll-contain max-h-[calc(100dvh-7rem)]">
          <nav className="flex flex-col px-4 py-4 gap-1 max-w-7xl mx-auto">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-sm font-bold text-gray-800 uppercase tracking-wide hover:text-primary hover:bg-gray-50 rounded transition-colors"
            >
              Home
            </Link>
            <MobileDropdown label="Club" items={clubItems} closeMenu={() => setMenuOpen(false)} />
            <MobilePloegenDropdown teams={teams} closeMenu={() => setMenuOpen(false)} />
            <Link
              href="/sponsors"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-sm font-bold text-gray-800 uppercase tracking-wide hover:text-primary hover:bg-gray-50 rounded transition-colors"
            >
              Sponsors
            </Link>
            <Link
              href="/evenementen"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-sm font-bold text-gray-800 uppercase tracking-wide hover:text-primary hover:bg-gray-50 rounded transition-colors"
            >
              Evenementen
            </Link>
            <Link
              href="/lid-worden"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-sm font-bold text-gray-800 uppercase tracking-wide hover:text-primary hover:bg-gray-50 rounded transition-colors"
            >
              Lid worden
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-sm font-bold text-gray-800 uppercase tracking-wide hover:text-primary hover:bg-gray-50 rounded transition-colors"
            >
              Contacteer ons
            </Link>

            <a
              href="https://static.twizzit.com/v2/form/QnptTWJYbWErUDhlRCtaTWhhSEp1QT09"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white text-sm font-black uppercase tracking-wider rounded transition-colors hover:bg-primary-dark"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
              </svg>
              Shop
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
