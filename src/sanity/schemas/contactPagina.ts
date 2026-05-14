import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPagina",
  title: "Contact pagina",
  type: "document",

  fields: [
    // ── Intro ────────────────────────────────────────────────────────────
    defineField({
      name: "introTitel",
      title: "Intro titel",
      type: "string",
      initialValue: "Heb je een vraag?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introOmschrijving",
      title: "Intro omschrijving",
      type: "text",
      rows: 2,
      initialValue: "We helpen je graag verder! Neem contact op via e-mail, sociale media of ons contactformulier.",
      validation: (Rule) => Rule.required(),
    }),

    // ── Contactgegevens ───────────────────────────────────────────────────
    defineField({
      name: "email",
      title: "E-mailadres",
      type: "string",
      initialValue: "avantibruggedames@gmail.com",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["https", "http"] }),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["https", "http"] }),
    }),

    // ── Sporthallen ───────────────────────────────────────────────────────
    defineField({
      name: "sporthallen",
      title: "Sporthallen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "naam",    title: "Naam sporthal",  type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "adres",   title: "Adres",          type: "string" }),
            defineField({ name: "extra",   title: "Extra info",     type: "string", description: "Bijv. 'Trainingen U12–U16'" }),
          ],
          preview: {
            select: { title: "naam", subtitle: "adres" },
          },
        },
      ],
    }),

    // ── Contactformulier (Twizzit CTA) ────────────────────────────────────
    defineField({
      name: "formulierTitel",
      title: "CTA titel",
      type: "string",
      initialValue: "Stuur ons een bericht",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formulierOmschrijving",
      title: "CTA omschrijving",
      type: "text",
      rows: 3,
      initialValue: "Klik op de knop hieronder om ons contactformulier in Twizzit te openen. We proberen binnen de 48 uur te antwoorden.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formulierUrl",
      title: "Twizzit contactformulier URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["https", "http"] }),
    }),
    defineField({
      name: "formulierKnopLabel",
      title: "Knoptekst",
      type: "string",
      initialValue: "Open Contactformulier",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    prepare() {
      return { title: "Contact pagina" };
    },
  },
});
