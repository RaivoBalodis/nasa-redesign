import { useState, useEffect } from 'react'
import { fetchApodToday, fetchApodByDate } from './api'
import type { ApodItem } from './types'

const ApodCard = () => {
  const [apod, setApod] = useState<ApodItem | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [expanded, setExpanded] = useState<boolean>(false)

  const today = new Date().toISOString().split('T')[0]

  const loadApod = async (date?: string) => {
    setLoading(true)
    setError(null)
    setExpanded(false)
    try {
      const data = date ? await fetchApodByDate(date) : await fetchApodToday()
      setApod(data)
    } catch (err) {
      setError('Neizdevās ielādēt NASA datus. Pārbaud interneta savienojumu.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadApod() }, [])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  const handleSearch = () => {
    if (selectedDate) loadApod(selectedDate)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-36 gap-5">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-blue-400/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 orbit-spin" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/30 orbit-spin" style={{animationDirection:'reverse',animationDuration:'0.9s'}} />
        </div>
        <p className="font-mono-space text-blue-400/50 text-sm tracking-widest">LOADING SPACE DATA...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-card glow-box rounded-sm p-8 text-center border-red-500/30">
        <p className="font-mono-space text-red-400/80 text-sm mb-2">// ERROR</p>
        <p className="text-red-300/70 mb-6 font-body">{error}</p>
        <button
          onClick={() => loadApod()}
          className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/40 text-blue-400 px-6 py-2 rounded-sm font-display text-xs tracking-widest transition-all"
        >
          RETRY
        </button>
      </div>
    )
  }

  if (!apod) return null

  return (
    <div className="space-y-5">
      {/* date picker row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono-space text-blue-400/40 text-xs pointer-events-none">DATE//</span>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            max={today}
            min="1995-06-16"
            className="w-full bg-space-900/60 border border-blue-600/25 text-star rounded-sm pl-16 pr-4 py-3 focus:outline-none focus:border-blue-400/60 transition-colors font-mono-space text-sm"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!selectedDate}
          className="bg-blue-600/20 hover:bg-blue-600/35 disabled:opacity-30 disabled:cursor-not-allowed border border-blue-500/35 text-blue-400 px-8 py-3 rounded-sm font-display text-xs tracking-widest transition-all"
        >
          SEARCH
        </button>
        <button
          onClick={() => { setSelectedDate(''); loadApod() }}
          className="border border-star/15 hover:border-star/30 text-star/50 hover:text-star/80 px-6 py-3 rounded-sm font-display text-xs tracking-widest transition-all"
        >
          TODAY
        </button>
      </div>

      {/* main card */}
      <div className="space-card glow-box rounded-sm overflow-hidden">
        {apod.media_type === 'image' ? (
          <div className="relative">
            <img
              src={apod.url}
              alt={apod.title}
              className="w-full max-h-[70vh] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent" />
            {/* corner accents */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-blue-400/50" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-blue-400/50" />
          </div>
        ) : (
          <div className="aspect-video relative">
            <iframe src={apod.url} title={apod.title} className="w-full h-full" allowFullScreen />
          </div>
        )}

        <div className="p-6 md:p-8 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="tag-badge">{apod.date}</span>
                {apod.copyright && (
                  <span className="font-mono-space text-star/30 text-xs">© {apod.copyright}</span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-star/90 tracking-wide">
                {apod.title}
              </h2>
            </div>
            {apod.hdurl && apod.media_type === 'image' && (
              <a
                href={apod.hdurl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 border border-blue-500/25 hover:border-blue-400/50 hover:bg-blue-600/10 text-blue-400/70 hover:text-blue-400 px-4 py-2 rounded-sm text-xs font-display tracking-widest transition-all"
              >
                HD ↗
              </a>
            )}
          </div>

          <div className="sep-line" />

          <div className={`text-star/60 leading-relaxed font-body text-sm ${!expanded ? 'line-clamp-4' : ''}`}>
            {apod.explanation}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="font-mono-space text-blue-400/60 hover:text-blue-400 text-xs tracking-wider transition-colors"
          >
            {expanded ? '[ COLLAPSE ↑ ]' : '[ READ MORE ↓ ]'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApodCard
