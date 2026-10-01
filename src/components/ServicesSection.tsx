import { useRef, useLayoutEffect } from 'react'
import { Ship, Plane, ThermometerSnowflake, Activity } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Ocean Freight',
    description: 'Autonomous zero-emission container vessels optimizing maritime routes in real-time.',
    icon: Ship,
    color: 'from-blue-500/20 to-vortex-cyan/20',
    borderColor: 'border-vortex-cyan'
  },
  {
    title: 'Air Cargo',
    description: 'High-speed autonomous drone fleets and converted freighters for critical timeline deliveries.',
    icon: Plane,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500'
  },
  {
    title: 'Cold Chain',
    description: 'Intelligent temperature-controlled pods with blockchain-verified environmental logs.',
    icon: ThermometerSnowflake,
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500'
  },
  {
    title: 'Telemetry',
    description: 'Predictive AI routing and millisecond-precision tracking across the global network.',
    icon: Activity,
    color: 'from-vortex-orange/20 to-vortex-amber/20',
    borderColor: 'border-vortex-orange'
  }
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current || !wrapperRef.current) return

    // Create a horizontal scroll effect
    // We get the total width to scroll based on the children width vs window width
    const getScrollAmount = () => {
      if (!wrapperRef.current) return 0
      const wrapperWidth = wrapperRef.current.scrollWidth
      return -(wrapperWidth - window.innerWidth) - 100 // Extra padding
    }

    const tween = gsap.to(wrapperRef.current, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculates on resize
      }
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="h-screen bg-transparent relative overflow-hidden flex flex-col justify-center border-t border-white/5">
      <div className="absolute top-20 left-10 md:left-20 z-10">
        <p className="font-mono text-vortex-cyan text-sm uppercase tracking-widest mb-4">
          [ Fleet Capabilities ]
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white uppercase tracking-tight">
          Multimodal <br />Network
        </h2>
      </div>

      {/* Horizontal scrolling wrapper */}
      <div ref={wrapperRef} className="flex gap-8 px-10 md:px-20 pt-40 md:pt-20 w-[200vw] md:w-[120vw]">
        {/* Empty space to allow title to be seen first */}
        <div className="w-[10vw] md:w-[30vw] shrink-0" />

        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <div
              key={index}
              className={`shrink-0 w-[85vw] md:w-[400px] h-[400px] group glass-panel rounded-3xl p-10 relative overflow-hidden transition-all duration-500 border border-white/10 hover:${service.borderColor} hover:bg-white/10`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-auto border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="font-display text-3xl font-semibold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-white/60 font-sans text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
