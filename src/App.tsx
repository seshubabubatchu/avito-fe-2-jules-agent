import { LenisProvider } from './components/LenisProvider'
import { HeroSection } from './components/HeroSection'
import { StatsSection } from './components/StatsSection'
import { ServicesSection } from './components/ServicesSection'
import { TrackingWidget } from './components/TrackingWidget'
import { Footer } from './components/Footer'
import './index.css'

function App() {
  return (
    <LenisProvider>
      <main className="min-h-screen bg-vortex-bg text-white selection:bg-vortex-cyan selection:text-black">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <TrackingWidget />
        <Footer />
      </main>
    </LenisProvider>
  )
}

export default App
