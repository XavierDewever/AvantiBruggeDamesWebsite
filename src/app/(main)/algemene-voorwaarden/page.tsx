import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden | Ford Unicars Avanti Brugge Dames",
  description:
    "Algemene voorwaarden en herroepingsrecht voor de webshop en merchandise van Avanti Brugge Dames VZW.",
};

const SECTIONS = [
  { id: "toepasselijkheid",    title: "1. Toepasselijkheid"            },
  { id: "prijzen-betaling",    title: "2. Prijzen & betaling"          },
  { id: "levering",            title: "3. Levering"                    },
  { id: "herroepingsrecht",    title: "4. Herroepingsrecht"            },
  { id: "garantie-klachten",   title: "5. Garantie & klachten"        },
  { id: "toepasselijk-recht",  title: "6. Toepasselijk recht"         },
];

export default function AlgemeneVoorwaardenPage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            Algemene <span className="text-primary">Voorwaarden</span>
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-xl leading-relaxed">
            Webshop &amp; merchandise · Avanti Brugge Dames VZW · Versie mei 2026
          </p>
        </div>
      </section>

      {/* ── Inhoud ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16 lg:items-start">

            {/* ── Inhoudsopgave (sticky sidebar) ────────────────────────── */}
            <aside className="hidden lg:block sticky top-8 self-start">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
                Inhoudsopgave
              </p>
              <nav className="flex flex-col gap-1">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="text-sm text-gray-500 hover:text-primary hover:translate-x-1 transition-all py-1 border-l-2 border-transparent hover:border-primary pl-3"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>

              {/* Bedrijfsgegevens kaartje */}
              <div className="mt-10 rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Verkoper</p>
                {[
                  { label: "Naam",   value: "Avanti Brugge Dames VZW" },
                  { label: "Adres",  value: "Spastraat 1, 8000 Brugge" },
                  { label: "Ondern.", value: "0860.324.672" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">{label}</span>
                    <span className="text-xs font-semibold text-gray-700">{value}</span>
                  </div>
                ))}
                <div className="flex flex-col pt-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">E-mail</span>
                  <a href="mailto:avantibruggedames@gmail.com" className="text-xs font-semibold text-primary hover:underline break-all">
                    avantibruggedames@gmail.com
                  </a>
                </div>
              </div>
            </aside>

            {/* ── Artikelinhoud ─────────────────────────────────────────── */}
            <div className="space-y-12">

              <Section id="toepasselijkheid" title="1. Toepasselijkheid">
                <p>
                  Deze algemene voorwaarden zijn van toepassing op elk aanbod van Avanti Brugge Dames VZW
                  (hierna: <strong>"de club"</strong>) via haar webshop en op elke tot stand gekomen overeenkomst
                  op afstand met betrekking tot merchandise en clubuitrusting.
                </p>
                <p>
                  Door een bestelling te plaatsen aanvaardt de koper uitdrukkelijk deze algemene voorwaarden.
                  De club behoudt zich het recht voor deze voorwaarden te allen tijde te wijzigen. De versie die
                  van kracht is op het moment van de bestelling is steeds van toepassing.
                </p>
                <p>
                  Afwijkingen van deze voorwaarden zijn enkel geldig indien uitdrukkelijk en schriftelijk
                  overeengekomen.
                </p>
              </Section>

              <Section id="prijzen-betaling" title="2. Prijzen &amp; betaling">
                <p>
                  Alle vermelde prijzen zijn uitgedrukt in <strong>euro (€)</strong> en zijn, waar van toepassing,
                  inclusief BTW. Verzendkosten zijn niet inbegrepen in de productprijs en worden apart vermeld
                  tijdens het afrekenproces.
                </p>
                <p>
                  De club behoudt zich het recht voor prijzen op elk moment te wijzigen. De prijs die van toepassing
                  is op uw bestelling is de prijs die geldig was op het moment van uw bevestiging.
                </p>
                <p>
                  Betaling dient te geschieden via de betaalmethoden aangeboden op het moment van bestelling.
                  Uw bestelling wordt pas verwerkt na ontvangst van de betaling of schriftelijke betalingsbevestiging.
                </p>
              </Section>

              <Section id="levering" title="3. Levering">
                <p>
                  Na ontvangst van de bestelling en betaling ontvangt de koper een bevestiging per e-mail.
                  Leveringstermijnen worden steeds zo nauwkeurig mogelijk vermeld, maar zijn indicatief en geven
                  geen aanleiding tot schadevergoeding bij overschrijding.
                </p>
                <Subsection title="Afhalen">
                  <p>
                    Producten kunnen worden afgehaald op een door de club aangeduide locatie (training, thuiswedstrijd
                    of een ander afgesproken moment). De koper ontvangt hierover een aparte communicatie per e-mail.
                  </p>
                </Subsection>
                <Subsection title="Verzending">
                  <p>
                    Indien de club verzending aanbiedt, worden de verzendkosten en de geschatte levertermijn
                    duidelijk vermeld vóór het voltooien van de bestelling. De club is niet aansprakelijk voor
                    vertraging of verlies door de vervoerder. Bij niet-levering van een pakket dient de koper
                    de club zo spoedig mogelijk te contacteren via{" "}
                    <a href="mailto:avantibruggedames@gmail.com" className="text-primary hover:underline font-semibold">
                      avantibruggedames@gmail.com
                    </a>.
                  </p>
                </Subsection>
              </Section>

              <Section id="herroepingsrecht" title="4. Herroepingsrecht">
                <p>
                  Als consument heeft u in principe het recht een overeenkomst op afstand te herroepen binnen
                  <strong> 14 kalenderdagen</strong> na ontvangst van het product, zonder opgave van reden
                  (conform art. VI.47 Wetboek Economisch Recht).
                </p>

                {/* Uitzondering — prominent in de verf zetten */}
                <div className="rounded-xl border-l-4 border-primary bg-red-50 px-5 py-4 space-y-2">
                  <p className="text-xs font-black uppercase tracking-widest text-primary">
                    Wettelijke uitzondering — gepersonaliseerde goederen
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Het herroepingsrecht is <strong>niet van toepassing</strong> op producten die duidelijk
                    zijn vervaardigd volgens de specificaties van de consument of die een duidelijk persoonlijk
                    karakter hebben (art. VI.53, 3° WER). Dit omvat onder meer:
                  </p>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Clubuitrusting (trui, short, tas, …) bedrukt of geborduurd met uw eigen naam, nummer of andere persoonlijke gegevens</li>
                    <li>Merchandise die specifiek op bestelling en op maat wordt vervaardigd</li>
                    <li>Artikelen waarvan de verpakking werd verbroken en die om hygiënische redenen niet kunnen worden teruggezonden</li>
                  </ul>
                  <p className="text-sm font-bold text-gray-800">
                    Deze producten kunnen <u>niet</u> worden teruggestuurd, omgeruild of gecrediteerd, tenzij
                    sprake is van een fabricagefout of non-conformiteit (zie punt 5).
                  </p>
                </div>

                <Subsection title="Uitoefening herroepingsrecht (standaard producten)">
                  <p>
                    Wenst u gebruik te maken van uw herroepingsrecht, stuur dan binnen de bedenktermijn een
                    ondubbelzinnige verklaring per e-mail naar{" "}
                    <a href="mailto:avantibruggedames@gmail.com" className="text-primary hover:underline font-semibold">
                      avantibruggedames@gmail.com
                    </a>{" "}
                    met vermelding van uw naam, bestelnummer en de te retourneren producten.
                  </p>
                  <p>
                    De kosten voor retourverzending zijn ten laste van de koper, tenzij anders overeengekomen.
                    Terugbetaling gebeurt binnen 14 dagen na ontvangst van het retour, via hetzelfde betaalmiddel
                    als de originele betaling.
                  </p>
                </Subsection>
              </Section>

              <Section id="garantie-klachten" title="5. Garantie &amp; klachten">
                <p>
                  De club staat in voor de conformiteit van de geleverde producten overeenkomstig de wettelijke
                  garantiebepalingen. Bij een fabricagefout of non-conformiteit heeft u als consument recht op
                  herstel, vervanging of terugbetaling.
                </p>
                <p>
                  Klachten dienen zo snel mogelijk, en uiterlijk binnen <strong>14 dagen</strong> na ontvangst
                  van het product, te worden gemeld via{" "}
                  <a href="mailto:avantibruggedames@gmail.com" className="text-primary hover:underline font-semibold">
                    avantibruggedames@gmail.com
                  </a>{" "}
                  met een duidelijke omschrijving van het probleem en, indien van toepassing, foto's van het gebrek.
                </p>
                <p>
                  Klachten met betrekking tot zichtbare beschadiging bij levering dienen te worden gemeld
                  binnen <strong>48 uur</strong> na ontvangst.
                </p>
                <p>
                  De club verbindt zich ertoe elke klacht binnen een redelijke termijn te behandelen en de koper
                  op de hoogte te houden van de verdere afhandeling.
                </p>
              </Section>

              <Section id="toepasselijk-recht" title="6. Toepasselijk recht">
                <p>
                  Op alle overeenkomsten tussen de club en de koper is uitsluitend het <strong>Belgisch recht</strong> van
                  toepassing. Bij geschillen zijn uitsluitend de rechtbanken van het arrondissement
                  <strong> Brugge</strong> bevoegd, tenzij dwingende wettelijke bepalingen anders voorzien.
                </p>
                <p>
                  Als consument kunt u ook een beroep doen op het Europees Online Dispute Resolution-platform:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold"
                  >
                    ec.europa.eu/consumers/odr
                  </a>.
                </p>
              </Section>

              {/* Mobiele bedrijfsgegevens */}
              <div className="lg:hidden rounded-xl bg-gray-50 border border-gray-100 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Verkoper</p>
                <address className="not-italic divide-y divide-gray-100 text-sm">
                  {[
                    { label: "Naam",              value: "Avanti Brugge Dames VZW" },
                    { label: "Adres",             value: "Spastraat 1, 8000 Brugge" },
                    { label: "Ondernemingsnummer", value: "0860.324.672" },
                  ].map(({ label, value }) => (
                    <div key={label} className="grid grid-cols-[140px_1fr] gap-2 py-2.5">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-400 self-center">{label}</span>
                      <span className="font-semibold text-gray-800">{value}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-[140px_1fr] gap-2 py-2.5">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-400 self-center">E-mail</span>
                    <a href="mailto:avantibruggedames@gmail.com" className="font-semibold text-primary hover:underline break-all">
                      avantibruggedames@gmail.com
                    </a>
                  </div>
                </address>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Hulpcomponenten ──────────────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-6 h-0.5 bg-primary shrink-0" />
        <h2 className="text-lg font-black uppercase tracking-widest text-gray-900"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <div className="text-gray-600 leading-relaxed space-y-4 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </div>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
