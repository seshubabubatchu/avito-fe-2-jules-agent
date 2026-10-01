import { LenisProvider } from './components/LenisProvider'
import { HeroSection } from './components/HeroSection'
import { StatsSection } from './components/StatsSection'
import { ServicesSection } from './components/ServicesSection'
import { TrackingWidget } from './components/TrackingWidget'
import { Footer } from './components/Footer'
import { LogisticsScene } from './scenes/LogisticsScene'
import './index.css'

function App() {
  return (
    <LenisProvider>
      <main className="min-h-screen text-white selection:bg-vortex-cyan selection:text-black">
        {/* Global 3D Background */}
        <LogisticsScene />

        {/* Make sections translucent so the 3D model shows through */}
        <div className="relative z-10">
          <HeroSection />
          <StatsSection />
          <ServicesSection />
          <TrackingWidget />
          <Footer />
        </div>
      </main>
    </LenisProvider>
  )
}

export default App
