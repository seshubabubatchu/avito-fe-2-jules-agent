import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLSpanElement>(null)
  const title2Ref = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Awwwards-style staggered text reveal
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

    tl.fromTo(
      [title1Ref.current, title2Ref.current],
      { y: 100, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.2, duration: 1.8 }
    )
    .fromTo(
      buttonRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=1'
    )

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const xPos = (clientX / window.innerWidth - 0.5) * 30
      const yPos = (clientY / window.innerHeight - 0.5) * 30

      if (containerRef.current) {
        gsap.to(containerRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power3.out',
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* We removed the old GlobeScene here so the global LogisticsScene shows through */}

      <div ref={containerRef} className="z-10 text-center px-4 pointer-events-none">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white uppercase flex flex-col items-center gap-2" style={{ perspective: '1000px' }}>
          <span ref={title1Ref} className="block origin-bottom transform-gpu">
            The Future of
          </span>
          <span ref={title2Ref} className="block origin-bottom transform-gpu text-transparent bg-clip-text bg-gradient-to-r from-vortex-orange to-vortex-cyan">
            Autonomous Freight
          </span>
        </h1>

        <div ref={buttonRef} className="mt-12 pointer-events-auto">
          <button className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-full font-mono text-sm uppercase tracking-widest text-white overflow-hidden transition-all hover:border-vortex-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <span className="relative z-10">Track Shipment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-vortex-orange/20 to-vortex-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 font-mono text-xs text-white/50 tracking-widest uppercase">
        <p>SYS.OP. ONLINE</p>
        <p className="text-vortex-cyan">LIVE TELEMETRY ACTIVE</p>
      </div>
    </section>
  )
}
