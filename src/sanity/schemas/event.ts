import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Evenement",
  type: "document",

  fields: [
    // ── Basis ────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Stage", value: "stage" },
          { title: "Evenement", value: "event" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Datum & tijd ─────────────────────────────────────────
    defineField({
      name: "startDate",
      title: "Startdatum & -tijd",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm", timeStep: 15 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Einddatum & -tijd",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm", timeStep: 15 },
    }),

    // ── Inhoud ───────────────────────────────────────────────
    defineField({
      name: "description",
      title: "Omschrijving",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normaal", value: "normal" },
            { title: "Kop 2", value: "h2" },
            { title: "Kop 3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Vet", value: "strong" },
              { title: "Cursief", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({ name: "href", type: "url", title: "URL" }),
                ],
              },
            ],
          },
        },
      ],
    }),

    // ── Inschrijving & status ────────────────────────────────
    defineField({
      name: "inschrijving",
      title: "Inschrijving",
      type: "string",
      options: {
        list: [
          { title: "Niet vereist", value: "niet_vereist" },
          { title: "Gesloten (nog niet beschikbaar)", value: "gesloten" },
          { title: "Open (Twizzit link invullen hieronder)", value: "open" },
        ],
        layout: "radio",
      },
      initialValue: "niet_vereist",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "twizzitUrl",
      title: "Twizzit-URL (inschrijven)",
      type: "url",
      description: "Enkel invullen als inschrijving op 'Open' staat.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Bijna Volzet", value: "bijna_volzet" },
          { title: "Volzet", value: "volzet" },
        ],
        layout: "dropdown",
      },
      initialValue: "open",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      type: "eventType",
      date: "startDate",
      status: "status",
    },
    prepare({ title, type, date, status }) {
      const label = type === "stage" ? "Stage" : "Evenement";
      const dateStr = date
        ? new Date(date).toLocaleDateString("nl-BE", { day: "2-digit", month: "short", year: "numeric" })
        : "";
      const statusBadge = status === "volzet" ? " 🔴" : status === "bijna_volzet" ? " 🟡" : " 🟢";
      return {
        title: `${title}${statusBadge}`,
        subtitle: `${label} · ${dateStr}`,
      };
    },
  },
});
