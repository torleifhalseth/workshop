import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import TeamHeader from '@/app/components/TeamHeader'
import PlayerCard from '@/app/components/PlayerCard'
import {sanityFetch} from '@/sanity/lib/live'
import {nationalTeamBySlugQuery, nationalTeamSlugsQuery} from '@/sanity/lib/queries'

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: nationalTeamSlugsQuery,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(
  props: {params: Promise<{slug: string}>},
): Promise<Metadata> {
  const params = await props.params
  const {data: team} = await sanityFetch({
    query: nationalTeamBySlugQuery,
    params,
    stega: false,
  })

  return {
    title: team?.name,
    description: team?.name ? `${team.name} - VM 2026` : undefined,
  }
}

export default async function NationalTeamPage(props: {params: Promise<{slug: string}>}) {
  const params = await props.params
  const {data: team} = await sanityFetch({query: nationalTeamBySlugQuery, params})

  if (!team?._id) {
    return notFound()
  }

  return (
    <div className="container my-12 lg:my-24 grid gap-12">
      <TeamHeader
        name={team.name}
        subtitle={team.federation}
        meta={team.fifaRanking ? `FIFA-ranking: ${team.fifaRanking}` : undefined}
      />

      {team.players && team.players.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Spillere ({team.players.length})</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.players.map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
