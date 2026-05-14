import { defineField, defineType } from "sanity";

export default defineType({
  name: "lidWordenPagina",
  title: "Lid worden pagina",
  type: "document",

  fields: [
    // ── Optie 1: Competitief lid ─────────────────────────────
    defineField({
      name: "lidTitel",
      title: "Titel (Word lid)",
      type: "string",
      initialValue: "Word een Avanti Dame",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lidOmschrijving",
      title: "Omschrijving (Word lid)",
      type: "text",
      rows: 4,
      initialValue:
        "Sluit je aan bij één van onze competitieve ploegen en speel mee op het hoogste niveau. Je traint wekelijks met een gemotiveerde groep en neemt deel aan officiële wedstrijden via Basket Vlaanderen.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lidTwizzitUrl",
      title: "Twizzit-link (Word lid)",
      type: "url",
      description: "Link naar het inschrijvingsformulier op Twizzit.",
      validation: (Rule) => Rule.required().uri({ scheme: ["https", "http"] }),
    }),

    // ── Optie 2: Basketbalschool ─────────────────────────────
    defineField({
      name: "schoolTitel",
      title: "Titel (Basketbalschool)",
      type: "string",
      initialValue: "Basketbalschool",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "schoolOmschrijving",
      title: "Omschrijving (Basketbalschool)",
      type: "text",
      rows: 4,
      initialValue:
        "Voor de allerkleinsten (U6–U8) die spelenderwijs willen leren basketballen. In een veilige en speelse omgeving maken ze kennis met de sport en bouwen ze meteen vriendschappen op.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "schoolTwizzitUrl",
      title: "Twizzit-link (Basketbalschool)",
      type: "url",
      description: "Link naar het inschrijvingsformulier voor de basketbalschool.",
      validation: (Rule) => Rule.required().uri({ scheme: ["https", "http"] }),
    }),
  ],

  preview: {
    prepare() {
      return { title: "Lid worden pagina" };
    },
  },
});
