import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[(_type == "page" || _type == "post" || _type == "player" || _type == "nationalTeam" || _type == "club") && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// Player queries
export const allPlayersQuery = defineQuery(`
  *[_type == "player" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    position,
    number,
    image,
    birthDate,
    caps,
    "club": club->{name, "slug": slug.current},
    "nationalTeam": nationalTeam->{name, "slug": slug.current},
  }
`)

export const playerBySlugQuery = defineQuery(`
  *[_type == "player" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    "slug": slug.current,
    position,
    number,
    image,
    birthDate,
    birthPlace,
    caps,
    "club": club->{name, "slug": slug.current, image},
    "nationalTeam": nationalTeam->{name, "slug": slug.current, image},
  }
`)

export const playerSlugsQuery = defineQuery(`
  *[_type == "player" && defined(slug.current)]
  {"slug": slug.current}
`)

// National Team queries
export const nationalTeamBySlugQuery = defineQuery(`
  *[_type == "nationalTeam" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    "slug": slug.current,
    image,
    federation,
    fifaRanking,
    "players": *[_type == "player" && references(^._id)] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      position,
      number,
      image,
      caps,
      "club": club->{name, "slug": slug.current},
    },
  }
`)

export const nationalTeamSlugsQuery = defineQuery(`
  *[_type == "nationalTeam" && defined(slug.current)]
  {"slug": slug.current}
`)

// Club queries
export const clubBySlugQuery = defineQuery(`
  *[_type == "club" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    "slug": slug.current,
    image,
    league,
    country,
    "players": *[_type == "player" && references(^._id)] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      position,
      number,
      image,
      caps,
    },
  }
`)

export const clubSlugsQuery = defineQuery(`
  *[_type == "club" && defined(slug.current)]
  {"slug": slug.current}
`)
