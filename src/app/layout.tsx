import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const BASE_URL = "https://www.avantibruggedames.be";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Ford Unicars Avanti Brugge Dames",
    template: "%s | Ford Unicars Avanti Brugge Dames",
  },
  description:
    "Officiële website van Ford Unicars Avanti Brugge Dames — damesbasketbal in Brugge. Bekijk wedstrijdprogramma, nieuws, ploegen en inschrijvingen.",
  keywords: [
    "basketbal Brugge",
    "damesbasketbal Brugge",
    "Avanti Brugge",
    "Ford Unicars Avanti",
    "basketbalclub Brugge",
    "basketbal West-Vlaanderen",
    "meisjesbasketbal Brugge",
  ],
  authors: [{ name: "Ford Unicars Avanti Brugge Dames", url: BASE_URL }],
  creator: "Ford Unicars Avanti Brugge Dames",

  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: BASE_URL,
    siteName: "Ford Unicars Avanti Brugge Dames",
    title: "Ford Unicars Avanti Brugge Dames",
    description:
      "Officiële website van Ford Unicars Avanti Brugge Dames — damesbasketbal in Brugge.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ford Unicars Avanti Brugge Dames",
    description:
      "Officiële website van Ford Unicars Avanti Brugge Dames — damesbasketbal in Brugge.",
  },

  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${montserrat.variable} h-full antialiased`}>
      <head>
        {/*
         * ── Google Consent Mode v2 initialisatie ──────────────────────────────
         * Dit inline script MOET synchroon laden vóór gtag.js.
         * Het zet analytics_storage en ad_storage standaard op 'denied'.
         * De CookieBanner component updatet deze waarden later via gtag()
         * zodra de gebruiker een keuze maakt.
         *
         * dangerouslySetInnerHTML is hier bewust: next/script met
         * strategy="beforeInteractive" garandeert geen volgorde t.o.v.
         * een raw inline script in <head>.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />

        {/* ── Google Analytics (laadt na consent-initialisatie) ────────────── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7WEPXZEMKH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7WEPXZEMKH');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
        {/* Banner verschijnt pas client-side na hydration (SSR-safe) */}
        <CookieBanner />
      </body>
    </html>
  );
}
