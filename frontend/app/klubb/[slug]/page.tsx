import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import TeamHeader from '@/app/components/TeamHeader'
import PlayerCard from '@/app/components/PlayerCard'
import {sanityFetch} from '@/sanity/lib/live'
import {clubBySlugQuery, clubSlugsQuery} from '@/sanity/lib/queries'

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: clubSlugsQuery,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(
  props: {params: Promise<{slug: string}>},
): Promise<Metadata> {
  const params = await props.params
  const {data: club} = await sanityFetch({
    query: clubBySlugQuery,
    params,
    stega: false,
  })

  return {
    title: club?.name,
    description: club?.league ? `${club.name} - ${club.league}` : club?.name || undefined,
  }
}

export default async function ClubPage(props: {params: Promise<{slug: string}>}) {
  const params = await props.params
  const {data: club} = await sanityFetch({query: clubBySlugQuery, params})

  if (!club?._id) {
    return notFound()
  }

  return (
    <div className="container my-12 lg:my-24 grid gap-12">
      <TeamHeader
        name={club.name}
        subtitle={club.league}
        meta={club.country || undefined}
      />

      {club.players && club.players.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Spillere ({club.players.length})</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {club.players.map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
