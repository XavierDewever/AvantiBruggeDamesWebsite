import type { Metadata } from "next";
import ConsentReset from "@/components/ConsentReset";

export const metadata: Metadata = {
  title: "Cookiebeleid | Ford Unicars Avanti Brugge Dames",
  description:
    "Meer informatie over het gebruik van cookies op de website van Ford Unicars Avanti Brugge Dames.",
};

export default function CookiePolicyPage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            Cookie<span className="text-primary">beleid</span>
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-xl leading-relaxed">
            Laatst bijgewerkt: mei 2026
          </p>
        </div>
      </section>

      {/* ── Inhoud ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">

          <Section title="Wat zijn cookies?">
            <p>
              Cookies zijn kleine tekstbestanden die door een website op je apparaat worden opgeslagen
              wanneer je die website bezoekt. Ze worden veel gebruikt om websites goed te laten
              werken en om informatie te verstrekken aan de eigenaren van de website.
            </p>
          </Section>

          <Section title="Welke cookies gebruiken wij?">
            <p>
              De website van Ford Unicars Avanti Brugge Dames gebruikt uitsluitend analytische cookies.
              Wij gebruiken geen advertentiecookies of tracking cookies van derden voor commerciële doeleinden.
            </p>

            <CookieTable
              cookies={[
                {
                  naam: "Analytische cookies",
                  aanbieder: "Google Analytics 4 (GA4)",
                  doel: "Meten hoe bezoekers onze website gebruiken: welke pagina's bezocht worden, hoe lang, via welk apparaat. Deze data is volledig geanonimiseerd.",
                  bewaartermijn: "Tot 14 maanden",
                  grondslag: "Toestemming (opt-in)",
                },
                {
                  naam: "avanti-cookie-consent",
                  aanbieder: "Ford Unicars Avanti Brugge Dames",
                  doel: "Onthoudt jouw cookiekeuze zodat de banner niet bij elk bezoek opnieuw verschijnt.",
                  bewaartermijn: "1 jaar (localStorage)",
                  grondslag: "Legitiem belang",
                },
              ]}
            />
          </Section>

          <Section title="Google Analytics en Consent Mode v2">
            <p>
              Wij maken gebruik van Google Analytics 4 (GA4) met <strong>Google Consent Mode v2</strong>.
              Dit betekent dat:
            </p>
            <ul>
              <li>
                Vóórdat jij toestemming geeft, staat het meten van websitegedrag standaard
                uitgeschakeld (<code>analytics_storage: denied</code>).
              </li>
              <li>
                Alleen na jouw expliciete toestemming worden analytische gegevens verzameld.
              </li>
              <li>
                Wij gebruiken <strong>geen</strong> advertentiecookies (<code>ad_storage</code> blijft
                altijd <code>denied</code>).
              </li>
              <li>
                De verzamelde gegevens worden verwerkt door Google LLC. Meer informatie vind je in het{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  privacybeleid van Google
                </a>
                .
              </li>
            </ul>
          </Section>

          <Section title="Jouw keuze aanpassen">
            <p>
              Je kan je toestemming op elk moment intrekken of wijzigen. Klik op onderstaande knop
              om je cookievoorkeur te resetten. De cookiebanner verschijnt daarna opnieuw zodat
              je een nieuwe keuze kan maken.
            </p>
            <ConsentReset />
          </Section>

          <Section title="Cookies beheren via je browser">
            <p>
              Je kan cookies ook beheren of verwijderen via de instellingen van je browser.
              Houd er rekening mee dat het uitschakelen van cookies de werking van sommige
              websites kan beïnvloeden.
            </p>
            <ul>
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a>
              </li>
              <li>
                <a href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a>
              </li>
              <li>
                <a href="https://support.apple.com/nl-be/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apple Safari</a>
              </li>
              <li>
                <a href="https://support.microsoft.com/nl-nl/windows/cookies-verwijderen-en-beheren-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a>
              </li>
            </ul>
          </Section>

          <Section title="Contact">
            <p>
              Heb je vragen over ons cookiebeleid? Neem dan contact op via{" "}
              <a href="mailto:info@avantibruggedames.be" className="text-primary hover:underline">
                info@avantibruggedames.be
              </a>
              .
            </p>
          </Section>

        </div>
      </section>
    </>
  );
}

// ── Hulpcomponenten ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-6 h-0.5 bg-primary shrink-0" />
        <h2 className="text-lg font-black uppercase tracking-widest text-gray-900 m-0">{title}</h2>
      </div>
      <div className="text-gray-600 leading-relaxed space-y-3 text-sm">{children}</div>
    </div>
  );
}

type CookieRow = {
  naam: string;
  aanbieder: string;
  doel: string;
  bewaartermijn: string;
  grondslag: string;
};

function CookieTable({ cookies }: { cookies: CookieRow[] }) {
  return (
    <div className="overflow-x-auto mt-4 rounded-lg border border-gray-100">
      <table className="w-full min-w-[560px] text-sm border-collapse">
        <thead>
          <tr className="bg-primary text-white text-left">
            {["Naam", "Aanbieder", "Doel", "Bewaartermijn", "Grondslag"].map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-black uppercase tracking-widest whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cookies.map((c, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">{c.naam}</td>
              <td className="px-4 py-3 text-gray-600">{c.aanbieder}</td>
              <td className="px-4 py-3 text-gray-600">{c.doel}</td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.bewaartermijn}</td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.grondslag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
