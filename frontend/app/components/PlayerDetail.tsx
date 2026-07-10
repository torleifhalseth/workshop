import Link from 'next/link'
import type {PlayerBySlugQueryResult} from '@/sanity.types'

const positionLabels: Record<string, string> = {
  goalkeeper: 'Keeper',
  right_back: 'Høyreback',
  center_back: 'Midtstopper',
  left_back: 'Venstreback',
  midfielder: 'Midtbane',
  winger_midfielder: 'Kant/midtbane',
  winger: 'Kantspiller',
  forward: 'Spiss',
  forward_winger: 'Spiss/kant',
}

type PlayerDetailProps = {
  player: NonNullable<PlayerBySlugQueryResult>
}

export default function PlayerDetail({player}: PlayerDetailProps) {
  return (
    <div className="container my-12 lg:my-24 grid gap-8">
      <div className="pb-6 border-b border-gray-100">
        <div className="max-w-3xl flex flex-col gap-4">
          <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl">{player.name}</h1>
          <div className="flex gap-4 text-gray-500">
            {player.position && <span>{positionLabels[player.position] ?? player.position}</span>}
            {player.number != null && <span>#{player.number}</span>}
          </div>
        </div>
      </div>

      <div className="grid gap-6 max-w-3xl">
        <dl className="grid grid-cols-2 gap-4">
          {player.birthDate && (
            <div>
              <dt className="text-sm text-gray-400">Fødselsdato</dt>
              <dd className="text-gray-900">
                {new Date(player.birthDate + 'T00:00:00').toLocaleDateString('nb-NO', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </dd>
            </div>
          )}
          {player.birthPlace && (
            <div>
              <dt className="text-sm text-gray-400">Fødested</dt>
              <dd className="text-gray-900">{player.birthPlace}</dd>
            </div>
          )}
          {player.caps != null && (
            <div>
              <dt className="text-sm text-gray-400">Landskamper</dt>
              <dd className="text-gray-900">{player.caps}</dd>
            </div>
          )}
        </dl>

        <div className="flex gap-6">
          {player.club && player.club.slug && (
            <div>
              <span className="text-sm text-gray-400">Klubb</span>
              <Link
                href={`/klubb/${player.club.slug}`}
                className="block font-semibold text-blue-600 hover:underline"
              >
                {player.club.name}
              </Link>
            </div>
          )}
          {player.nationalTeam && player.nationalTeam.slug && (
            <div>
              <span className="text-sm text-gray-400">Landslag</span>
              <Link
                href={`/landslag/${player.nationalTeam.slug}`}
                className="block font-semibold text-blue-600 hover:underline"
              >
                {player.nationalTeam.name}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
