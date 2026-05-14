import { defineField, defineType } from "sanity";

export default defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",

  fields: [
    // ── Naam ────────────────────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Naam",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // ── Type ────────────────────────────────────────────────────────────
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Hoofdsponsor", value: "hoofdsponsor" },
          { title: "Sponsor",      value: "sponsor"      },
        ],
        layout: "radio",
      },
      initialValue: "sponsor",
      validation: (Rule) => Rule.required(),
    }),

    // ── Omschrijving (optioneel, enkel relevant voor hoofdsponsors) ──────
    defineField({
      name: "omschrijving",
      title: "Omschrijving",
      type: "text",
      rows: 3,
      description: "Optioneel — korte tekst die getoond wordt bij hoofdsponsors.",
    }),

    // ── Logo ─────────────────────────────────────────────────────────────
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Alternatieve tekst",
          type: "string",
          initialValue: "",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Website URL ───────────────────────────────────────────────────────
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).warning(
          "Voeg een geldige URL toe zodat het logo klikbaar is.",
        ),
    }),

    // ── Volgorde ──────────────────────────────────────────────────────────
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
      description: "Lager nummer = eerder getoond. Hoofdsponsors worden altijd bovenaan gezet.",
      initialValue: 99,
    }),

    // ── Verborgen legacy veld (backwards compat) ──────────────────────────
    defineField({
      name: "tier",
      title: "Niveau (oud)",
      type: "string",
      hidden: true,
    }),
  ],

  orderings: [
    {
      title: "Type → Volgorde",
      name: "typeOrderAsc",
      by: [
        { field: "type",  direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],

  preview: {
    select: { title: "name", subtitle: "type", media: "logo" },
    prepare({ title, subtitle, media }) {
      const types: Record<string, string> = {
        hoofdsponsor: "Hoofdsponsor",
        sponsor:      "Sponsor",
      };
      return { title, subtitle: types[subtitle] ?? subtitle, media };
    },
  },
});
