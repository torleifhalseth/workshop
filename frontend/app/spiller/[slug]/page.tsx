import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import PlayerDetail from '@/app/components/PlayerDetail'
import {sanityFetch} from '@/sanity/lib/live'
import {playerBySlugQuery, playerSlugsQuery} from '@/sanity/lib/queries'

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: playerSlugsQuery,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(
  props: {params: Promise<{slug: string}>},
): Promise<Metadata> {
  const params = await props.params
  const {data: player} = await sanityFetch({
    query: playerBySlugQuery,
    params,
    stega: false,
  })

  return {
    title: player?.name,
    description: player?.position
      ? `${player.name} - ${player.position}`
      : player?.name || undefined,
  }
}

export default async function PlayerPage(props: {params: Promise<{slug: string}>}) {
  const params = await props.params
  const {data: player} = await sanityFetch({query: playerBySlugQuery, params})

  if (!player?._id) {
    return notFound()
  }

  return <PlayerDetail player={player} />
}
