interface NavbarProps {
  activeTab: 'apod' | 'gallery'
  onTabChange: (tab: 'apod' | 'gallery') => void
}

const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-40 bg-space-950/80 backdrop-blur-md border-b border-blue-600/20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">🛸</span>
          <span className="font-display font-bold text-blue-400 text-sm tracking-[0.15em] text-glow-blue">
            NASA.EXP
          </span>
          <span className="font-mono-space text-star/20 text-xs hidden sm:block">
            // v0.1.0
          </span>
        </div>

        <div className="flex gap-1 bg-space-900/60 rounded-sm p-1 border border-blue-600/15">
          <button
            onClick={() => onTabChange('apod')}
            className={`px-4 py-2 rounded-sm font-display text-xs font-semibold tracking-widest transition-all ${
              activeTab === 'apod'
                ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
                : 'text-star/40 hover:text-star/70'
            }`}
          >
            APOD
          </button>
          <button
            onClick={() => onTabChange('gallery')}
            className={`px-4 py-2 rounded-sm font-display text-xs font-semibold tracking-widest transition-all ${
              activeTab === 'gallery'
                ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
                : 'text-star/40 hover:text-star/70'
            }`}
          >
            GALLERY
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
