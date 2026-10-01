import { useRef, useEffect } from 'react'
import { GlobeScene } from '../scenes/GlobeScene'
import gsap from 'gsap'

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const xPos = (clientX / window.innerWidth - 0.5) * 20
      const yPos = (clientY / window.innerHeight - 0.5) * 20

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power3.out',
        })
      }

      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 1,
          ease: 'power3.out',
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <GlobeScene />

      <div className="z-10 text-center px-4 pointer-events-none">
        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white uppercase"
        >
          The Future of
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vortex-orange to-vortex-cyan">
            Autonomous Freight
          </span>
        </h1>

        <div className="mt-12 pointer-events-auto">
          <button
            ref={buttonRef}
            className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-full font-mono text-sm uppercase tracking-widest text-white overflow-hidden transition-all hover:border-vortex-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
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
