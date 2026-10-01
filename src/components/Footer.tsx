import { useState, useEffect } from 'react'

export function Footer() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (timeZone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(time)
  }

  const cities = [
    { name: 'New York', tz: 'America/New_York' },
    { name: 'Rotterdam', tz: 'Europe/Amsterdam' },
    { name: 'Singapore', tz: 'Asia/Singapore' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
  ]

  return (
    <footer className="bg-vortex-bg border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tighter mb-6">
              Vortex Global
            </h2>
            <p className="text-white/50 font-sans text-sm max-w-sm mb-8 leading-relaxed">
              Engineering the future of autonomous logistics. Building resilient, intelligent supply chains for a connected world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-vortex-cyan transition-colors">
                <span className="sr-only">LinkedIn</span>
                in
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-vortex-cyan transition-colors">
                <span className="sr-only">Twitter</span>
                x
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-sm text-white uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">Ocean Freight</a></li>
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">Air Cargo</a></li>
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">Cold Chain</a></li>
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">Telemetry API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm text-white uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">Sustainability</a></li>
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm text-white uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-white/50 hover:text-vortex-cyan transition-colors text-sm">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8">
            {cities.map(city => (
              <div key={city.name} className="flex flex-col">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{city.name}</span>
                <span className="font-mono text-sm text-white">{formatTime(city.tz)}</span>
              </div>
            ))}
          </div>

          <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Vortex Global Logistics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
