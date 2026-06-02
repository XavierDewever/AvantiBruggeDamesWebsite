/**
 * Migratiescript: verwijder het `image`-veld uit alle event-documenten.
 *
 * Achtergrond
 * -----------
 * Het `image`-veld is uit het Sanity-schema verwijderd, maar bestaande
 * documenten bevatten de data nog. Sanity Studio toont hierdoor de melding
 * "Unknown field found". Dit script patcht alle betrokken documenten zodat
 * de melding verdwijnt.
 *
 * Stap 1 — Haal een schrijf-token op
 *   https://sanity.io/manage → jouw project → API → Tokens
 *   → Add API token → kies "Editor" → kopieer de token
 *
 * Stap 2 — Zet de token in .env.local
 *   SANITY_WRITE_TOKEN="plak_hier_je_token"
 *
 * Stap 3 — Voer het script uit (eenmalig, vanuit de projectmap)
 *   node --env-file=.env.local scripts/remove-event-image.mjs
 *
 * Wil je eerst droogdraaien zonder iets te wijzigen?
 *   node --env-file=.env.local scripts/remove-event-image.mjs --dry-run
 */

import { createClient } from "@sanity/client";

// ── Configuratie ──────────────────────────────────────────────────────────────
const PROJECT_ID  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID  ?? "8xyvn733";
const DATASET     = process.env.NEXT_PUBLIC_SANITY_DATASET     ?? "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const TOKEN       = process.env.SANITY_WRITE_TOKEN;
const DRY_RUN     = process.argv.includes("--dry-run");

if (!TOKEN) {
  console.error(
    "\n❌  Geen SANITY_WRITE_TOKEN gevonden in de omgevingsvariabelen.\n" +
    "   Voeg hem toe aan .env.local (zie instructies bovenaan dit bestand).\n",
  );
  process.exit(1);
}

const client = createClient({
  projectId:  PROJECT_ID,
  dataset:    DATASET,
  apiVersion: API_VERSION,
  token:      TOKEN,
  useCdn:     false,
});

// ── Migratie ──────────────────────────────────────────────────────────────────
console.log(`\n🔍  Zoeken naar event-documenten met een 'image'-veld…`);
console.log(`    Dataset: ${DATASET} | Dry-run: ${DRY_RUN}\n`);

const events = await client.fetch(
  `*[_type == "event" && defined(image)]{ _id, title }`,
);

if (events.length === 0) {
  console.log("✅  Geen documenten gevonden — niets te doen.\n");
  process.exit(0);
}

console.log(`📋  ${events.length} document(en) gevonden:\n`);
for (const e of events) {
  console.log(`    • ${e._id}  "${e.title ?? "(geen titel)"}"`);
}

if (DRY_RUN) {
  console.log("\n⚠️   Dry-run modus — geen wijzigingen aangebracht.\n");
  process.exit(0);
}

console.log("\n🔧  Patchen…\n");

let success = 0;
let failed  = 0;

for (const e of events) {
  try {
    await client.patch(e._id).unset(["image"]).commit();
    console.log(`    ✓ ${e._id}`);
    success++;
  } catch (err) {
    console.error(`    ✗ ${e._id}  →  ${err.message}`);
    failed++;
  }
}

console.log(
  `\n✅  Klaar — ${success} gepatcht${failed > 0 ? `, ${failed} mislukt` : ""}.\n` +
  "   Herlaad Sanity Studio om te bevestigen dat de melding verdwenen is.\n",
);
