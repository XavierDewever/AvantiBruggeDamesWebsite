"use client";

/**
 * Knop waarmee de gebruiker zijn cookiekeuze kan resetten.
 * Verwijdert de localStorage-sleutel en herlaadt de pagina
 * zodat de CookieBanner opnieuw verschijnt.
 */
export default function ConsentReset() {
  const handleReset = () => {
    localStorage.removeItem("avanti-cookie-consent");
    window.location.reload();
  };

  return (
    <button
      onClick={handleReset}
      className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-lg hover:bg-primary-dark transition-colors"
    >
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
      Cookievoorkeur resetten
    </button>
  );
}
