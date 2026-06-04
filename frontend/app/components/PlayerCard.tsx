import Link from 'next/link'

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

type PlayerCardProps = {
  player: {
    name?: string | null
    slug?: string | null
    position?: string | null
    number?: number | null
    caps?: number | null
    club?: {name?: string | null; slug?: string | null} | null
  }
}

export default function PlayerCard({player}: PlayerCardProps) {
  const content = (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-lg">{player.name}</h3>
        <p className="text-sm text-gray-500">{player.position ? (positionLabels[player.position] ?? player.position) : null}</p>
        {player.club?.name && (
          <p className="text-sm text-gray-400">{player.club.name}</p>
        )}
      </div>
      <div className="text-right">
        {player.number != null && (
          <span className="text-2xl font-bold text-gray-300">#{player.number}</span>
        )}
        {player.caps != null && (
          <p className="text-xs text-gray-400">{player.caps} landskamper</p>
        )}
      </div>
    </div>
  )

  if (!player.slug) {
    return (
      <div className="block border border-gray-200 rounded-lg p-4">
        {content}
      </div>
    )
  }

  return (
    <Link
      href={`/spiller/${player.slug}`}
      className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      {content}
    </Link>
  )
}
