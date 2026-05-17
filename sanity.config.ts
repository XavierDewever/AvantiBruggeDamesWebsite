import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Website Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "8xyvn733",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Inhoud")
          .items([
            S.listItem().title("Posts").schemaType("post").child(
              S.documentTypeList("post").title("Posts")
            ),
            S.divider(),
            S.listItem().title("Teams").schemaType("team").child(
              S.documentTypeList("team").title("Teams")
            ),
            S.listItem().title("Evenementen").schemaType("event").child(
              S.documentTypeList("event").title("Evenementen")
            ),
            S.divider(),
            S.listItem().title("Documenten").schemaType("clubDocument").child(
              S.documentTypeList("clubDocument").title("Documenten")
            ),
            S.divider(),
            S.listItem().title("Sponsors").schemaType("sponsor").child(
              S.documentTypeList("sponsor").title("Sponsors")
            ),
            S.divider(),
            S.listItem().title("Pagina's").schemaType("page").child(
              S.documentTypeList("page").title("Pagina's")
            ),
            S.divider(),
            S.listItem().title("Lid worden pagina").schemaType("lidWordenPagina").child(
              S.document().schemaType("lidWordenPagina").documentId("lidWordenPagina")
            ),
            S.listItem().title("Contact pagina").schemaType("contactPagina").child(
              S.document().schemaType("contactPagina").documentId("contactPagina")
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
