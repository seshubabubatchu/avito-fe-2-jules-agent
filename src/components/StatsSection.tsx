import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const stats = [
    { value: 99.4, suffix: '%', label: 'On-Time Delivery', decimals: 1 },
    { value: 140, suffix: '+', label: 'Trade Corridors', decimals: 0 },
    { value: 4.2, suffix: 'M', label: 'Metric Tons Moved', decimals: 1 },
  ]

  useEffect(() => {
    if (!sectionRef.current || !statsRef.current) return

    const counters = statsRef.current.querySelectorAll('.stat-value')

    counters.forEach((counter, index) => {
      const targetValue = stats[index].value
      const obj = { val: 0 }

      gsap.to(obj, {
        val: targetValue,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        onUpdate: () => {
          if (counter) {
            counter.innerHTML = obj.val.toFixed(stats[index].decimals)
          }
        },
      })
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 bg-vortex-bg border-y border-white/10 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <p className="font-mono text-vortex-orange text-sm uppercase tracking-widest mb-4">
            [ Global Impact ]
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Relentless Efficiency
          </h2>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vortex-cyan to-vortex-orange transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>

              <div className="font-display text-6xl md:text-7xl font-bold text-white mb-2 flex items-baseline">
                <span className="stat-value">0</span>
                <span className="text-vortex-cyan ml-1">{stat.suffix}</span>
              </div>
              <p className="font-mono text-sm text-white/60 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
