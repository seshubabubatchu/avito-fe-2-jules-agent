import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, Battery, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function SustainabilitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !statsRef.current) return

    const elements = statsRef.current.children

    gsap.fromTo(
      elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: 'power3.out',
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden border-t border-white/5 bg-transparent">
      {/* Background radial gradient to give some depth without obscuring the truck completely */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080A]/80 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <p className="font-mono text-vortex-orange text-sm uppercase tracking-widest mb-4">
            [ Zero Emissions ]
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight mb-8">
            Pioneering <br />Sustainable Freight
          </h2>
          <p className="text-white/60 font-sans text-lg leading-relaxed">
            We are committing to a fully electrified, zero-emission global fleet by 2030.
            By combining autonomous efficiency with renewable energy grids, we reduce
            carbon overhead by up to 85% compared to traditional logistics networks.
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-vortex-orange/50 transition-colors">
            <Leaf className="w-10 h-10 text-vortex-orange mb-6" />
            <h3 className="font-display text-4xl font-bold text-white mb-2">100%</h3>
            <p className="font-mono text-xs text-white/50 uppercase tracking-widest">Electric Fleet by 2030</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-vortex-cyan/50 transition-colors">
            <Battery className="w-10 h-10 text-vortex-cyan mb-6" />
            <h3 className="font-display text-4xl font-bold text-white mb-2">4.2M</h3>
            <p className="font-mono text-xs text-white/50 uppercase tracking-widest">Tons of CO2 Saved Annually</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-white/50 transition-colors">
            <Zap className="w-10 h-10 text-white mb-6" />
            <h3 className="font-display text-4xl font-bold text-white mb-2">99.9%</h3>
            <p className="font-mono text-xs text-white/50 uppercase tracking-widest">Grid Efficiency</p>
          </div>
        </div>
      </div>
    </section>
  )
}
