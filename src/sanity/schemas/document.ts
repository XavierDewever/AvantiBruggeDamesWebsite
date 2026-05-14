import { defineField, defineType } from "sanity";

export default defineType({
  name: "clubDocument",
  title: "Document",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Reglement", value: "reglement" },
          { title: "Formulier", value: "formulier" },
          { title: "Verslag", value: "verslag" },
          { title: "Andere", value: "andere" },
        ],
      },
    }),
    defineField({
      name: "file",
      title: "Bestand",
      type: "file",
      options: { accept: ".pdf,.docx,.xlsx" },
    }),
    defineField({
      name: "publishedAt",
      title: "Publicatiedatum",
      type: "datetime",
    }),
    defineField({
      name: "team",
      title: "Team (optioneel)",
      type: "reference",
      to: [{ type: "team" }],
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
