import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Pagina",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Paginatitel",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description:
        'De URL waarop de pagina bereikbaar is. Bv. slug "vrijwilligers" → /vrijwilligers.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Korte beschrijving (SEO)",
      type: "text",
      rows: 2,
      description: "Wordt gebruikt als meta-description in zoekmachines.",
      validation: (Rule) => Rule.max(160).warning("Houd de beschrijving onder 160 tekens."),
    }),
    defineField({
      name: "content",
      title: "Inhoud",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normaal", value: "normal" },
            { title: "Kop 1", value: "h1" },
            { title: "Kop 2", value: "h2" },
            { title: "Kop 3", value: "h3" },
            { title: "Kop 4", value: "h4" },
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
                      Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
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
            defineField({ name: "alt", type: "string", title: "Alternatieve tekst" }),
            defineField({ name: "caption", type: "string", title: "Onderschrift" }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title, subtitle: slug ? `/${slug}` : "Geen slug" };
    },
  },
});
