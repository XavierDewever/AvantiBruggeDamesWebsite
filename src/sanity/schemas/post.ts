import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Nieuws",
  type: "document",

  fields: [
    // ── Basis ────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publicatiedatum",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm" },
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    // ── Afbeelding ───────────────────────────────────────────
    defineField({
      name: "mainImage",
      title: "Hoofdafbeelding",
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

    // ── Samenvatting ─────────────────────────────────────────
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Korte samenvatting — verschijnt in lijstweergaven en SEO.",
      validation: (Rule) => Rule.max(200).warning("Houd de excerpt onder 200 tekens."),
    }),

    // ── Call to action ───────────────────────────────────────
    defineField({
      name: "ctaLabel",
      title: "CTA-knoptekst",
      type: "string",
      description: 'Tekst op de actieknop, bv. "Inschrijven" of "Meer info". Laat leeg als er geen knop nodig is.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA-link (URL)",
      type: "url",
      description: "Link die de knop opent, bv. een Twizzit-formulier of externe pagina.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] })
          .custom((url, context) => {
            const doc = context.document as { ctaLabel?: string };
            if (doc?.ctaLabel && !url) return "Vul een URL in als je een knoptekst hebt opgegeven.";
            return true;
          }),
    }),

    // ── Inhoud ───────────────────────────────────────────────
    defineField({
      name: "body",
      title: "Tekst",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normaal", value: "normal" },
            { title: "Kop 2", value: "h2" },
            { title: "Kop 3", value: "h3" },
            { title: "Citaat", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Vet", value: "strong" },
              { title: "Cursief", value: "em" },
              { title: "Onderstreept", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({ scheme: ["http", "https", "mailto"] }),
                  }),
                  defineField({
                    name: "blank",
                    type: "boolean",
                    title: "Openen in nieuw tabblad",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternatieve tekst",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Onderschrift",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      media: "mainImage",
    },
    prepare({ title, date, media }) {
      const dateStr = date
        ? new Date(date).toLocaleDateString("nl-BE", { day: "2-digit", month: "short", year: "numeric" })
        : "Niet gepubliceerd";
      return { title, subtitle: dateStr, media };
    },
  },
});
