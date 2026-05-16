"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "avanti-cookie-consent";

/**
 * Stuurt een consent-update naar Google via window.gtag.
 * gtag() werd geïnitialiseerd in de root layout vóór het GA4-script.
 * 'ad_storage' blijft altijd 'denied' — we gebruiken geen advertenties.
 */
function updateGtagConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (!w.gtag) return;
  w.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
  });
}

export default function CookieBanner() {
  /**
   * null  → SSR / eerste render: nog niet bepaald, render niets
   *         (voorkomt hydration-mismatch)
   * true  → toon banner
   * false → verberg banner
   */
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === null) {
      // Nog geen keuze gemaakt → toon banner
      setShow(true);
    } else {
      // Keuze al opgeslagen → herstel consent-status stil op de achtergrond
      if (stored === "accepted") updateGtagConsent(true);
      setShow(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    updateGtagConsent(true); // gtag: analytics_storage → 'granted'
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    updateGtagConsent(false); // gtag: analytics_storage blijft 'denied'
    setShow(false);
  };

  // Render niets totdat de client-side check gedaan is
  if (show === null || show === false) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookiemelding"
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-5"
    >
      <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-2xl border border-white/10 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          {/* Tekst */}
          <div className="flex-1 min-w-0">
            <p className="font-black text-xs uppercase tracking-widest text-primary mb-1">
              Cookies
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              We gebruiken analytische cookies (Google Analytics) om te begrijpen hoe bezoekers onze website gebruiken. Je keuze wordt onthouden.{" "}
              <Link
                href="/cookie-policy"
                className="underline text-gray-400 hover:text-white transition-colors"
              >
                Meer info
              </Link>
            </p>
          </div>

          {/* Knoppen — beide even zichtbaar (GDPR-vereiste) */}
          <div className="flex flex-col xs:flex-row gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg border border-white/25 text-white text-xs font-black uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Weigeren
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-black uppercase tracking-wider hover:bg-primary-dark transition-colors"
            >
              Accepteren
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
