import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/avantibruggedames",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/avantibruggedames/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@avantibruggedames?lang=nl-NL",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-primary mt-auto">

      {/* ── Hoofdsectie ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* ── Kolom 1: Clubnaam ────────────────────────────────────────── */}
          <div className="flex flex-col items-start">
            <Link href="/" className="group">
              <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">
                Ford Unicars
              </p>
              <p className="text-2xl font-black text-gray-900 uppercase leading-tight tracking-tight group-hover:text-primary transition-colors">
                Avanti Brugge
              </p>
              <p className="text-2xl font-black text-gray-900 uppercase leading-tight tracking-tight group-hover:text-primary transition-colors">
                Dames
              </p>
            </Link>
          </div>

          {/* ── Kolom 2: Socials ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">
              Socials
            </h3>

            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-gray-500 flex items-center justify-center transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Kolom 3: Partners ────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">
              In samenwerking met
            </h3>

            <div className="flex items-center gap-4">

              {/* Stad Brugge */}
              <a href="https://www.brugge.be" target="_blank" rel="noopener noreferrer" aria-label="Stad Brugge">
                <Image
                  src="/logo_brugge.png"
                  alt="Stad Brugge"
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </a>

              {/* Uitpas */}
              <a href="https://www.brugge.be/uitpas" target="_blank" rel="noopener noreferrer" aria-label="Uitpas">
                <Image
                  src="/UITPAS-logo.png"
                  alt="Uitpas"
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/80 text-xs">
          <p>© {new Date().getFullYear()} Ford Unicars Avanti Brugge Dames. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-verklaring"
              className="hover:text-white transition-colors"
            >
              Privacyverklaring
            </Link>
            <span className="text-white/40">·</span>
            <Link
              href="/cookie-policy"
              className="hover:text-white transition-colors"
            >
              Cookiebeleid
            </Link>
            <span className="text-white/40">·</span>
            <p>
              Lid van{" "}
              <a
                href="https://basketvlaanderen.be"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-semibold"
              >
                Basket Vlaanderen
              </a>
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
