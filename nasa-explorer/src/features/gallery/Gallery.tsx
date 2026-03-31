import { useState, useEffect } from 'react'
import { fetchApodRange } from './api'
import type { GalleryItem } from './types'

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  const getLast7Days = () => {
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - 7)
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    }
  }

  useEffect(() => {
    const { start, end } = getLast7Days()
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchApodRange(start, end)
        setItems(data)
      } catch {
        setError('Neizdevās ielādēt galeriju.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-36 gap-5">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-blue-400/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 orbit-spin" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/30 orbit-spin" style={{animationDirection:'reverse',animationDuration:'0.9s'}} />
        </div>
        <p className="font-mono-space text-blue-400/50 text-xs tracking-widest">FETCHING GALLERY DATA...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-card rounded-sm p-8 text-center border-red-500/30">
        <p className="font-mono-space text-red-400/70 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <span className="tag-badge">LAST 7 DAYS</span>
        <span className="font-mono-space text-star/25 text-xs">{items.length} ENTRIES</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.date}
            onClick={() => setSelected(item)}
            className="group relative space-card rounded-sm overflow-hidden glow-box-hover transition-all duration-300 text-left border-blue-600/15"
          >
            {item.media_type === 'image' ? (
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-48 bg-space-800 flex items-center justify-center">
                <span className="text-3xl opacity-40">▶</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent" />
            {/* corner accent on hover */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-blue-400/0 group-hover:border-blue-400/60 transition-all duration-300" />
            <div className="absolute bottom-0 p-3 w-full">
              <p className="font-mono-space text-blue-400/60 text-xs mb-1">{item.date}</p>
              <p className="text-star/80 text-sm font-display font-semibold line-clamp-2 tracking-wide">{item.title}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-space-950/92 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="space-card glow-box rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto border-blue-500/25"
            onClick={(e) => e.stopPropagation()}
          >
            {/* top corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400/50 rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400/50 rounded-tr-sm" />

            {selected.media_type === 'image' && (
              <img src={selected.url} alt={selected.title} className="w-full rounded-t-sm" />
            )}
            <div className="p-6 space-y-3">
              <span className="tag-badge">{selected.date}</span>
              <h3 className="text-lg font-display font-bold text-star/90 tracking-wide">{selected.title}</h3>
              <div className="sep-line" />
              <p className="text-star/60 leading-relaxed text-sm font-body">{selected.explanation}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-4 w-full bg-blue-600/15 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 py-3 rounded-sm transition-all font-display text-xs tracking-widest"
              >
                [ CLOSE ]
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery
