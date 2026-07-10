type TeamHeaderProps = {
  name?: string | null
  subtitle?: string | null
  meta?: string | null
}

export default function TeamHeader({name, subtitle, meta}: TeamHeaderProps) {
  return (
    <div className="pb-6 border-b border-gray-100">
      <div className="max-w-3xl flex flex-col gap-2">
        <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl">{name}</h1>
        {subtitle && <p className="text-lg text-gray-500">{subtitle}</p>}
        {meta && <p className="text-sm text-gray-400">{meta}</p>}
      </div>
    </div>
  )
}
