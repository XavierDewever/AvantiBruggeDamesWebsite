// ── Posts (Nieuws) ────────────────────────────────────────────────────────────

export const ALL_POSTS_QUERY =
  `*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, mainImage
  }`;

export const POST_BY_SLUG_QUERY =
  `*[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, excerpt, mainImage, body
  }`;

// ── Teams ─────────────────────────────────────────────────────────────────────

export const ALL_TEAMS_QUERY =
  `*[_type == "team"] | order(volgorde asc, name asc) {
    _id, name, slug, categorie, teamPhoto, basketVlaanderenId, coachName, assistantCoach
  }`;

export const TEAM_BY_SLUG_QUERY =
  `*[_type == "team" && slug.current == $slug][0] {
    _id, name, slug, categorie, teamPhoto, basketVlaanderenId, coachName, assistantCoach, trainingHours, description
  }`;

export const TEAMS_FOR_NAV_QUERY =
  `*[_type == "team"] | order(volgorde asc, name asc) {
    _id, name, "slug": slug.current, categorie
  }`;

export const TEAM_BY_VBL_ID_QUERY =
  `*[_type == "team" && basketVlaanderenId == $vblId][0]`;

export const ALL_TEAM_SLUGS_QUERY =
  `*[_type == "team"]{ "slug": slug.current }`;

// ── Evenementen ───────────────────────────────────────────────────────────────

export const ALL_EVENTS_QUERY =
  `*[_type == "event"] | order(startDate asc) {
    _id, title, slug, eventType, startDate, endDate, status, twizzitUrl, image
  }`;

export const UPCOMING_EVENTS_QUERY =
  `*[_type == "event" && startDate >= $now] | order(startDate asc) {
    _id, title, slug, eventType, startDate, endDate, status, twizzitUrl, image
  }`;

export const EVENT_BY_SLUG_QUERY =
  `*[_type == "event" && slug.current == $slug][0] {
    _id, title, slug, eventType, startDate, endDate, description, twizzitUrl, status, image
  }`;

export const EVENTS_BY_TYPE_QUERY =
  `*[_type == "event" && eventType == $type] | order(startDate asc) {
    _id, title, slug, startDate, endDate, status, twizzitUrl, image
  }`;

// ── Homepage ──────────────────────────────────────────────────────────────────

export const HOMEPAGE_EVENTS_QUERY =
  `*[_type == "event" && status == "open" && startDate >= $now] | order(startDate asc) [0..2] {
    _id, title, slug, eventType, startDate, endDate, twizzitUrl, image
  }`;

export const HOMEPAGE_POSTS_QUERY =
  `*[_type == "post"] | order(publishedAt desc) [0..2] {
    _id, title, slug, publishedAt, excerpt, mainImage
  }`;

// ── Pagina's (CMS-driven) ─────────────────────────────────────────────────────

export const PAGE_BY_SLUG_QUERY =
  `*[_type == "page" && slug.current == $slug][0] {
    _id, title, slug, excerpt, content
  }`;

export const ALL_PAGE_SLUGS_QUERY =
  `*[_type == "page"]{ "slug": slug.current }`;

// ── Sponsors ──────────────────────────────────────────────────────────────────

export const ALL_SPONSORS_QUERY =
  `*[_type == "sponsor"] | order(order asc, name asc) {
    _id, name, logo, websiteUrl, type, omschrijving, tier
  }`;

// ── Lid worden pagina ─────────────────────────────────────────────────────────

export const LID_WORDEN_QUERY =
  `*[_type == "lidWordenPagina"][0] {
    lidTitel, lidOmschrijving, lidTwizzitUrl,
    schoolTitel, schoolOmschrijving, schoolTwizzitUrl
  }`;

// ── Contact pagina ────────────────────────────────────────────────────────────

export const CONTACT_PAGINA_QUERY =
  `*[_type == "contactPagina"][0] {
    introTitel, introOmschrijving,
    email, facebookUrl, instagramUrl,
    sporthallen,
    formulierTitel, formulierOmschrijving, formulierUrl, formulierKnopLabel
  }`;

// ── Documenten ────────────────────────────────────────────────────────────────

export const ALL_DOCUMENTS_QUERY =
  `*[_type == "clubDocument"] | order(publishedAt desc) {
    _id, title, slug, category, file, publishedAt, team->{ name }
  }`;
