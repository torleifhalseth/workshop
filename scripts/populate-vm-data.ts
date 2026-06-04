/**
 * Script to populate Sanity with Norwegian VM 2026 squad data.
 *
 * Usage:
 *   npx tsx scripts/populate-vm-data.ts
 *
 * Requires environment variables:
 *   SANITY_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID)
 *   SANITY_DATASET (or NEXT_PUBLIC_SANITY_DATASET)
 *   SANITY_API_TOKEN (a write-enabled token)
 */

import {createClient} from '@sanity/client'

const projectId =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset =
  process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || ''

if (!projectId || !token) {
  console.error(
    'Missing SANITY_PROJECT_ID / SANITY_API_TOKEN. Set them as env vars before running.',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-09-25',
  token,
  useCdn: false,
})

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

type ClubData = {name: string; league: string; country: string}
type PlayerData = {
  name: string
  position: string
  clubName: string
  birthDate: string
  birthPlace: string
  caps: number
  number: number
}

const clubs: ClubData[] = [
  {name: 'Sevilla', league: 'La Liga', country: 'Spania'},
  {name: 'Watford', league: 'Championship', country: 'England'},
  {name: 'Hamburg', league: '2. Bundesliga', country: 'Tyskland'},
  {name: 'Borussia Dortmund', league: 'Bundesliga', country: 'Tyskland'},
  {name: 'Torino', league: 'Serie A', country: 'Italia'},
  {name: 'Brentford', league: 'Premier League', country: 'England'},
  {name: 'Bologna', league: 'Serie A', country: 'Italia'},
  {name: 'Genoa', league: 'Serie A', country: 'Italia'},
  {name: 'Derby County', league: 'Championship', country: 'England'},
  {name: 'Viking', league: 'Eliteserien', country: 'Norge'},
  {name: 'Wolverhampton', league: 'Premier League', country: 'England'},
  {name: 'Bodø/Glimt', league: 'Eliteserien', country: 'Norge'},
  {name: 'Arsenal', league: 'Premier League', country: 'England'},
  {name: 'Fulham', league: 'Premier League', country: 'England'},
  {name: 'Benfica', league: 'Primeira Liga', country: 'Portugal'},
  {name: 'Cremonese', league: 'Serie B', country: 'Italia'},
  {name: 'Sassuolo', league: 'Serie A', country: 'Italia'},
  {name: 'Rangers', league: 'Scottish Premiership', country: 'Skottland'},
  {name: 'RB Leipzig', league: 'Bundesliga', country: 'Tyskland'},
  {name: 'Manchester City', league: 'Premier League', country: 'England'},
  {name: 'Atlético Madrid', league: 'La Liga', country: 'Spania'},
  {name: 'Crystal Palace', league: 'Premier League', country: 'England'},
]

const players: PlayerData[] = [
  {name: 'Ørjan Håskjold Nyland', position: 'goalkeeper', clubName: 'Sevilla', birthDate: '1990-09-10', birthPlace: 'Volda', caps: 69, number: 1},
  {name: 'Egil Selvik', position: 'goalkeeper', clubName: 'Watford', birthDate: '1997-07-30', birthPlace: 'Sandnes', caps: 6, number: 12},
  {name: 'Sander Tangvik', position: 'goalkeeper', clubName: 'Hamburg', birthDate: '2002-11-29', birthPlace: 'Trondheim', caps: 0, number: 23},
  {name: 'Julian Ryerson', position: 'right_back', clubName: 'Borussia Dortmund', birthDate: '1997-11-17', birthPlace: 'Lyngdal', caps: 41, number: 2},
  {name: 'Marcus Holmgren Pedersen', position: 'right_back', clubName: 'Torino', birthDate: '2000-07-16', birthPlace: 'Hammerfest', caps: 31, number: 16},
  {name: 'Kristoffer Ajer', position: 'center_back', clubName: 'Brentford', birthDate: '1998-04-17', birthPlace: 'Rælingen', caps: 50, number: 3},
  {name: 'Torbjørn Heggem', position: 'center_back', clubName: 'Bologna', birthDate: '1999-01-12', birthPlace: 'Trondheim', caps: 13, number: 4},
  {name: 'Leo Skiri Østigård', position: 'center_back', clubName: 'Genoa', birthDate: '1999-11-28', birthPlace: 'Åndalsnes', caps: 36, number: 5},
  {name: 'Sondre Langås', position: 'center_back', clubName: 'Derby County', birthDate: '2001-02-02', birthPlace: 'Namsos', caps: 2, number: 13},
  {name: 'Henrik Falchener', position: 'center_back', clubName: 'Viking', birthDate: '2003-05-08', birthPlace: 'Tønsberg', caps: 1, number: 15},
  {name: 'David Møller Wolfe', position: 'left_back', clubName: 'Wolverhampton', birthDate: '2002-11-23', birthPlace: 'Bergen', caps: 20, number: 6},
  {name: 'Fredrik André Bjørkan', position: 'left_back', clubName: 'Bodø/Glimt', birthDate: '1998-08-21', birthPlace: 'Bodø', caps: 19, number: 14},
  {name: 'Martin Ødegaard', position: 'midfielder', clubName: 'Arsenal', birthDate: '1998-12-17', birthPlace: 'Drammen', caps: 67, number: 10},
  {name: 'Sander Berge', position: 'midfielder', clubName: 'Fulham', birthDate: '1998-02-14', birthPlace: 'Asker', caps: 64, number: 8},
  {name: 'Fredrik Aursnes', position: 'midfielder', clubName: 'Benfica', birthDate: '1995-12-10', birthPlace: 'Hareid', caps: 20, number: 17},
  {name: 'Patrick Berg', position: 'midfielder', clubName: 'Bodø/Glimt', birthDate: '1997-11-24', birthPlace: 'Bodø', caps: 41, number: 18},
  {name: 'Morten Thorsby', position: 'midfielder', clubName: 'Cremonese', birthDate: '1996-05-05', birthPlace: 'Oslo', caps: 30, number: 20},
  {name: 'Kristian Thorstvedt', position: 'midfielder', clubName: 'Sassuolo', birthDate: '1999-03-13', birthPlace: 'Stavanger', caps: 35, number: 19},
  {name: 'Thelo Aasgaard', position: 'midfielder', clubName: 'Rangers', birthDate: '2002-05-02', birthPlace: 'Liverpool', caps: 6, number: 22},
  {name: 'Oscar Bobb', position: 'winger_midfielder', clubName: 'Fulham', birthDate: '2003-07-12', birthPlace: 'Oslo', caps: 18, number: 21},
  {name: 'Andreas Schjelderup', position: 'winger', clubName: 'Benfica', birthDate: '2004-06-01', birthPlace: 'Bodø', caps: 10, number: 7},
  {name: 'Jens Petter Hauge', position: 'winger', clubName: 'Bodø/Glimt', birthDate: '1999-10-12', birthPlace: 'Bodø', caps: 14, number: 24},
  {name: 'Antonio Nusa', position: 'winger', clubName: 'RB Leipzig', birthDate: '2005-04-17', birthPlace: 'Langhus', caps: 22, number: 11},
  {name: 'Erling Braut Haaland', position: 'forward', clubName: 'Manchester City', birthDate: '2000-07-21', birthPlace: 'Bryne', caps: 49, number: 9},
  {name: 'Alexander Sørloth', position: 'forward_winger', clubName: 'Atlético Madrid', birthDate: '1995-12-05', birthPlace: 'Trondheim', caps: 70, number: 25},
  {name: 'Jørgen Strand Larsen', position: 'forward', clubName: 'Crystal Palace', birthDate: '2000-02-06', birthPlace: 'Halden', caps: 26, number: 26},
]

async function main() {
  console.log('Creating national team...')
  const teamId = 'nationalTeam-norge'
  await client.createOrReplace({
    _id: teamId,
    _type: 'nationalTeam',
    name: 'Norge',
    slug: {_type: 'slug', current: 'norge'},
    federation: 'Norges Fotballforbund (NFF)',
    fifaRanking: 57,
  })

  console.log('Creating clubs...')
  const clubIdMap = new Map<string, string>()
  for (const c of clubs) {
    const id = `club-${slugify(c.name)}`
    clubIdMap.set(c.name, id)
    await client.createOrReplace({
      _id: id,
      _type: 'club',
      name: c.name,
      slug: {_type: 'slug', current: slugify(c.name)},
      league: c.league,
      country: c.country,
    })
  }

  console.log('Creating players...')
  for (const p of players) {
    const id = `player-${slugify(p.name)}`
    const clubId = clubIdMap.get(p.clubName)
    await client.createOrReplace({
      _id: id,
      _type: 'player',
      name: p.name,
      slug: {_type: 'slug', current: slugify(p.name)},
      position: p.position,
      number: p.number,
      birthDate: p.birthDate,
      birthPlace: p.birthPlace,
      caps: p.caps,
      nationalTeam: {_type: 'reference', _ref: teamId},
      ...(clubId ? {club: {_type: 'reference', _ref: clubId}} : {}),
    })
  }

  console.log('Done! Created 1 national team, %d clubs, %d players.', clubs.length, players.length)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
