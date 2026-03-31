import { useState } from 'react'
import Navbar from './components/Navbar'
import ApodCard from './features/apod/ApodCard'
import Gallery from './features/gallery/Gallery'

type Tab = 'apod' | 'gallery'

const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>('apod')

  return (
    <div className="min-h-screen bg-space-950 scanlines relative">
      {/* background layers */}
      <div className="nebula-bg" />
      <div className="starfield" />

      {/* content above bg layers */}
      <div className="relative z-10">
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="max-w-5xl mx-auto px-4 py-10">
          {/* Hero */}
          <div className="text-center mb-14 pt-4">
            <div className="tag-badge inline-block mb-4">NASA PUBLIC API // PROGRAMMĒŠANA II</div>
            <h1
              className="glitch font-display text-4xl md:text-6xl font-black text-space-gradient text-glow-blue mb-4 tracking-wider"
              data-text="NASA EXPLORER"
            >
              NASA EXPLORER
            </h1>
            <div className="sep-line w-48 mx-auto mb-4" />
            <p className="font-mono-space text-blue-400/60 text-sm tracking-widest">
              ASTRONOMY PICTURE OF THE DAY // LIVE FEED
            </p>
          </div>

          {activeTab === 'apod' ? <ApodCard /> : <Gallery />}
        </main>

        <footer className="text-center py-8 mt-20 border-t border-blue-600/15">
          <p className="font-mono-space text-star/20 text-xs tracking-widest">
            DATA SRC: NASA APOD API &bull; PROG2 2026 &bull; LATVIJA
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
