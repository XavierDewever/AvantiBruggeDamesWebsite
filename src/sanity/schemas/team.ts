import { defineField, defineType } from "sanity";

// Herbruikbaar object voor één trainingsblok
const trainingSlot = defineField({
  name: "trainingSlot",
  title: "Trainingsblok",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Dag",
      type: "string",
      options: {
        list: [
          { title: "Maandag", value: "maandag" },
          { title: "Dinsdag", value: "dinsdag" },
          { title: "Woensdag", value: "woensdag" },
          { title: "Donderdag", value: "donderdag" },
          { title: "Vrijdag", value: "vrijdag" },
          { title: "Zaterdag", value: "zaterdag" },
          { title: "Zondag", value: "zondag" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startTime",
      title: "Starttijd",
      type: "string",
      description: "Formaat: HH:MM (bijv. 19:30)",
      validation: (Rule) =>
        Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
          name: "tijdformaat",
          invert: false,
        }).error("Gebruik het formaat HH:MM, bijv. 19:30"),
    }),
    defineField({
      name: "endTime",
      title: "Eindtijd",
      type: "string",
      description: "Formaat: HH:MM (bijv. 21:00)",
      validation: (Rule) =>
        Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
          name: "tijdformaat",
          invert: false,
        }).error("Gebruik het formaat HH:MM, bijv. 21:00"),
    }),
    defineField({
      name: "location",
      title: "Locatie",
      type: "string",
      description: "Naam van de sporthal of zaal.",
    }),
  ],
  preview: {
    select: { day: "day", start: "startTime", end: "endTime" },
    prepare({ day, start, end }) {
      const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
      return {
        title: day ? capitalize(day) : "Dag onbekend",
        subtitle: start && end ? `${start} – ${end}` : "",
      };
    },
  },
});

export default defineType({
  name: "team",
  title: "Team",
  type: "document",

  fields: [
    // ── Volgorde ─────────────────────────────────────────────
    defineField({
      name: "volgorde",
      title: "Volgorde",
      type: "number",
      description: "Lager nummer = eerder in de lijst. Ploegen met hetzelfde nummer worden alfabetisch gesorteerd.",
      initialValue: 99,
    }),

    // ── Basis ────────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Teamnaam",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // ── VBL-koppeling ────────────────────────────────────────
    defineField({
      name: "basketVlaanderenId",
      title: "VBL Team-suffix",
      type: "string",
      description:
        'Vul enkel het variabele deel van het VBL team-GUID in. Het clubprefix "BVBL1436" wordt automatisch toegevoegd. Voorbeelden: "DSE++1" (Dames 1), "DSE++2" (Dames 2), "M14++2" (M14B).',
      placeholder: "bv. DSE++1",
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return true; // optioneel
          // Geldig formaat: letters, cijfers en + tekens
          if (/^[A-Za-z0-9+]+$/.test(val)) return true;
          return 'Gebruik enkel letters, cijfers en + tekens. Bv. "DSE++1" of "M14++2".';
        }),
    }),

    // ── Foto ─────────────────────────────────────────────────
    defineField({
      name: "teamPhoto",
      title: "Teamfoto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternatieve tekst",
          type: "string",
          validation: (Rule) => Rule.required().warning("Altijd een alt-tekst invullen voor toegankelijkheid."),
        }),
      ],
    }),

    // ── Staf ─────────────────────────────────────────────────
    defineField({
      name: "coachName",
      title: "Hoofdcoach",
      type: "string",
      description: "Volledige naam van de hoofdcoach.",
    }),
    defineField({
      name: "assistantCoach",
      title: "Assistant-coach",
      type: "string",
      description: "Volledige naam van de assistant-coach (optioneel).",
    }),

    // ── Trainingen ───────────────────────────────────────────
    defineField({
      name: "trainingHours",
      title: "Trainingsuren",
      type: "array",
      of: [trainingSlot],
      description: "Voeg één blok toe per trainingsmoment.",
    }),

    // ── Extra ────────────────────────────────────────────────
    defineField({
      name: "categorie",
      title: "Afdeling",
      type: "string",
      options: {
        list: [
          { title: "Bovenbouw", value: "bovenbouw" },
          { title: "Onderbouw", value: "onderbouw" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().error("Selecteer een afdeling."),
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
    }),

    // ── Legacy (verborgen) ───────────────────────────────────
    // Bewaard om "unknown field"-waarschuwingen op bestaande documenten te vermijden.
    defineField({
      name: "category",
      title: "Categorie (oud)",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "order",
      title: "Volgorde (oud)",
      type: "number",
      hidden: true,
    }),
  ],

  preview: {
    select: { title: "name", subtitle: "categorie", media: "teamPhoto" },
    prepare({ title, subtitle, media }) {
      const labels: Record<string, string> = {
        bovenbouw: "Bovenbouw",
        onderbouw: "Onderbouw",
      };
      return {
        title,
        subtitle: subtitle ? labels[subtitle] ?? subtitle : "",
        media,
      };
    },
  },
});
