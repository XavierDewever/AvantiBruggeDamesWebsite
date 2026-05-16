import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacyverklaring | Ford Unicars Avanti Brugge Dames",
  description:
    "Lees hoe basketbalclub Avanti Brugge Dames omgaat met uw persoonsgegevens conform de GDPR-wetgeving.",
};

export default function PrivacyVerklaringPage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-10 h-0.5 bg-primary mb-4" />
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            Privacy<span className="text-primary">verklaring</span>
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-xl leading-relaxed">
            Laatste wijziging: 16 mei 2026
          </p>
        </div>
      </section>

      {/* ── Inhoud ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <Section title="1. Algemeen">
            <p>
              Basketbalclub Avanti Brugge Dames hecht veel waarde aan uw privacy en de bescherming van uw
              persoonsgegevens.
            </p>
            <p>
              In deze privacyverklaring willen we heldere en transparante informatie geven over hoe wij omgaan met
              persoonsgegevens. Wij doen er alles aan om uw privacy te waarborgen en gaan daarom zorgvuldig om met
              persoonsgegevens. Basketbalclub Avanti Brugge Dames houdt zich in alle gevallen aan de toepasselijke
              wet- en regelgeving, waaronder de Algemene Verordening Gegevensbescherming (ook gekend als GDPR,
              Verordening EU 2016/679).
            </p>
            <p>Dit brengt met zich mee dat wij in ieder geval:</p>
            <ul>
              <li>
                Uw persoonsgegevens verwerken in overeenstemming met het doel waarvoor deze zijn verstrekt;
                deze doelen en type persoonsgegevens zijn beschreven in deze Privacyverklaring.
              </li>
              <li>
                Verwerking van uw persoonsgegevens beperkt is tot enkel die gegevens welke nodig zijn voor de
                doeleinden waarvoor ze worden verwerkt.
              </li>
              <li>
                Vragen om uw uitdrukkelijke toestemming als wij deze nodig hebben voor de verwerking van uw
                persoonsgegevens.
              </li>
              <li>
                Passende technische en organisatorische maatregelen hebben genomen zodat de beveiliging van
                uw persoonsgegevens gewaarborgd is.
              </li>
              <li>
                Geen persoonsgegevens doorgeven aan andere partijen, tenzij dit nodig is voor uitvoering van de
                doeleinden waarvoor ze zijn verstrekt.
              </li>
              <li>
                Op de hoogte zijn van uw rechten als betrokken persoon omtrent uw persoonsgegevens, u hierop
                willen attent maken en deze willen respecteren.
              </li>
            </ul>
            <p>
              Als basketbalclub Avanti Brugge Dames zijn wij verantwoordelijk voor de verwerking van uw
              persoonsgegevens. Indien u na het doornemen van onze privacyverklaring, of in algemenere zin,
              vragen heeft hierover of contact met ons wenst op te nemen kan dit via onderstaande contactgegevens:
            </p>
            <address className="not-italic rounded-xl border border-gray-200 bg-gray-50 divide-y divide-gray-100 overflow-hidden text-sm">
              {[
                { label: "Organisatie", value: "Basketbalclub Avanti Brugge Dames" },
                { label: "Adres",       value: "Spastraat 1, 8000 Brugge" },
              ].map(({ label, value }) => (
                <div key={label} className="grid grid-cols-[140px_1fr] gap-2 px-4 py-3">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-400 self-center">{label}</span>
                  <span className="font-semibold text-gray-800">{value}</span>
                </div>
              ))}
              <div className="grid grid-cols-[140px_1fr] gap-2 px-4 py-3">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 self-center">E-mail</span>
                <a href="mailto:info@avantibruggedames.be" className="font-semibold text-primary hover:underline break-all">
                  info@avantibruggedames.be
                </a>
              </div>
            </address>
            <p>
              Deze privacyverklaring is van toepassing op al onze huidige en vroegere leden, deelnemers aan
              activiteiten, personen die belangstelling tonen of toonden voor onze activiteiten, diensten of producten,
              klanten en prospecten, leveranciers.
            </p>
          </Section>

          <Section title="2. Waarom verwerken wij persoonsgegevens">
            <p>
              Uw persoonsgegevens worden door basketbalclub Avanti Brugge Dames verwerkt ten behoeve van de
              volgende doeleinden en rechtsgronden:
            </p>
            <ul>
              <li>Het voeren van ledenadministratie en dienstverlening aan leden <em>(contractuele grond)</em></li>
              <li>Om te kunnen deelnemen aan de activiteiten van basketbalclub Avanti Brugge Dames <em>(uitvoering overeenkomst)</em></li>
              <li>Het versturen van informatie over onze activiteiten, nieuwsbrieven en uitnodigingen <em>(gerechtvaardigd belang)</em></li>
              <li>Het bekomen van subsidiëring door de overheid <em>(wettelijke verplichting)</em></li>
              <li>
                Promotie, PR en communicatie, waaronder:
                <ul>
                  <li>Het beheren van social media d.m.v. het publiceren van sfeerfoto's <em>(gerechtvaardigd belang)</em></li>
                  <li>Het beheren van social media d.m.v. gerichte foto's <em>(toestemming)</em></li>
                  <li>Het beheren van de clubwebsite <em>(gerechtvaardigd belang)</em></li>
                </ul>
              </li>
            </ul>
          </Section>

          <Section title="3. Welke gegevens verwerken we?">
            <p>
              Wij kunnen de volgende persoonsgegevens van u vragen, opslaan, verzamelen en verwerken voor de
              volgende doelstellingen:
            </p>
            <ul>
              <li>Identificatiegegevens &amp; privé-contactgegevens: naam, voornaam, adres, telefoonnummer, e-mail (voor minderjarigen eveneens de gegevens van de ouders)</li>
              <li>Identiteitsgegevens uitgegeven door overheid: identiteitskaartnummer &amp; rijksregisternummer</li>
              <li>Persoonlijke kenmerken: geslacht, geboortedatum, geboorteplaats, nationaliteit</li>
              <li>Sportieve gegevens (o.a. categorie, uitslagen, aanwezigheden, …)</li>
              <li>Beeldmateriaal (foto's, video's, opnames, …)</li>
            </ul>
            <p>
              We verzamelen enkel persoonsgegevens die u zelf aan ons meedeelt op verschillende manieren
              (o.a. inschrijvingsformulieren, invul- en contactformulieren op onze website,
              persoonlijk/telefonisch/e-mail contact, …). Wij verzamelen geen persoonsgegevens via derden,
              met uitzondering van de informatie ontvangen van de aangesloten verenigingen/clubs of federaties.
            </p>
            <p>
              We gebruiken de verzamelde gegevens alleen voor de doeleinden waarvoor we de gegevens hebben verkregen.
            </p>
          </Section>

          <Section title="4. Verstrekking aan derden">
            <p>
              De gegevens die u aan ons geeft kunnen wij aan derde partijen verstrekken indien dit noodzakelijk is
              voor uitvoering van de hierboven beschreven doeleinden. Zo kunnen wij gebruik maken van een derde
              partij voor:
            </p>
            <ul>
              <li>Het opslaan en verwerken van gegevens in de Cloud (via een Cloud Service Provider)</li>
              <li>Het verzorgen van de internetomgeving (webhosting)</li>
              <li>Het verzorgen van IT-infrastructuur (o.a. IT netwerk, …)</li>
              <li>Het verzorgen van de (financiële) administratie</li>
              <li>Het verzekeren van onze leden, deelnemers en vrijwilligers</li>
              <li>Het verzorgen (en verspreiden) van nieuwsbrieven en uitnodigingen</li>
            </ul>
            <p>
              Wij geven nooit persoonsgegevens door aan verwerkers (andere partijen) dan diegene waarmee we een
              verwerkersovereenkomst hebben afgesloten. Met deze partijen (verwerkers) maken wij hierin uiteraard
              de nodige afspraken om de beveiliging van uw persoonsgegevens te waarborgen.
            </p>
            <p>
              Verder zullen wij de verstrekte gegevens niet aan derden doorgeven tenzij dit wettelijk verplicht
              en/of toegestaan is, zoals bv. in het kader van een politioneel of gerechtelijk onderzoek. Tevens
              kunnen wij persoonsgegevens delen met derden indien u ons hier toestemming voor geeft. Deze
              toestemming kan ten allen tijde ingetrokken worden, zonder dat dit afbreuk doet aan de
              rechtmatigheid van de verwerking voor de intrekking daarvan. Wij verstrekken geen
              persoonsgegevens aan partijen die gevestigd zijn buiten de EU.
            </p>
          </Section>

          <Section title="5. Minderjarigen">
            <p>
              Wij verwerken alleen persoonsgegevens van personen jonger dan 18 jaar indien daarvoor schriftelijke
              toestemming is gegeven door de ouder of wettelijke vertegenwoordiger.
            </p>
            <p>
              Hierbij kunnen volgende gegevens van de ouders worden verwerkt: identificatiegegevens en
              privé-contactgegevens (voor ouderlijke toestemming).
            </p>
          </Section>

          <Section title="6. Bewaartermijn">
            <p>
              Basketbalclub Avanti Brugge Dames bewaart persoonsgegevens niet langer dan noodzakelijk voor het
              doel waarvoor deze zijn verstrekt dan wel op grond van de wet is vereist.
            </p>
            <p>
              Basketbalclub Avanti Brugge Dames verbindt zich ertoe de gegevens niet langer bij te houden dan
              3 jaar na stopzetting lidmaatschap. De gegevens worden bijgehouden om eventuele gevolgen van
              lidmaatschap (subsidies, verzekeringen…) te kunnen beantwoorden.
            </p>
          </Section>

          <Section title="7. Beveiliging van de gegevens">
            <p>
              Volgende passende technische en organisatorische maatregelen zijn genomen om persoonsgegevens
              te beschermen tegen onrechtmatige verwerking:
            </p>
            <ul>
              <li>Alle personen die namens basketbalclub Avanti Brugge Dames van u gegevens kennis kunnen nemen, zijn gehouden aan geheimhouding daarvan.</li>
              <li>We hanteren een gebruikersnaam en wachtwoordbeleid op al onze systemen.</li>
              <li>We pseudonimiseren en zorgen voor de encryptie van persoonsgegevens als daar aanleiding toe is.</li>
              <li>Wij maken back-ups van de persoonsgegevens om deze te kunnen herstellen bij fysieke of technische incidenten.</li>
              <li>We testen en evalueren regelmatig onze maatregelen en stellen bij indien nodig.</li>
              <li>Onze medewerkers zijn geïnformeerd over het belang van de bescherming van persoonsgegevens.</li>
            </ul>
          </Section>

          <Section title="8. Uw rechten omtrent uw gegevens">
            <p>
              U heeft recht op inzage, kopie, aanpassing of het wissen van de persoonsgegevens die wij ontvangen
              hebben. Via het hoger vermeld adres kunt u ons hiervoor contacteren. Tevens kunt u bezwaar indienen
              tegen de verwerking van uw persoonsgegevens (of een deel hiervan) door ons of door één van onze
              verwerkers. Ook heeft u het recht om de verstrekte gegevens door ons te laten overdragen aan uzelf
              of in uw opdracht direct aan een andere partij. Wij kunnen u vragen om u te legitimeren voordat wij
              gehoor kunnen geven aan voornoemde verzoeken.
            </p>
          </Section>

          <Section title="9. Klachten">
            <p>
              Mocht u een klacht hebben over de verwerking van uw persoonsgegevens dan vragen wij u hierover
              direct contact met ons op te nemen. U heeft altijd het recht een klacht in te dienen bij de Privacy
              Commissie, dit is de toezichthoudende autoriteit op het gebied van privacybescherming.
            </p>
          </Section>

          <Section title="10. Wijziging privacy statement">
            <p>
              Basketbalclub Avanti Brugge Dames kan de privacyverklaring steeds wijzigen. De laatste wijziging
              gebeurde op 16 mei 2026.
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
      <div className="text-gray-600 leading-relaxed space-y-3 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul_ul]:mt-1.5">
        {children}
      </div>
    </div>
  );
}
