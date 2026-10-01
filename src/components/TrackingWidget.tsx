import { useState } from 'react'
import { Search, MapPin, CheckCircle2, CircleDashed } from 'lucide-react'

export function TrackingWidget() {
  const [trackingNumber, setTrackingNumber] = useState('VX-8892')
  const [isTracking, setIsTracking] = useState(false)
  const [activeStep, setActiveStep] = useState(2)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingNumber) return
    setIsTracking(true)
    // Simulate progression
    let step = 0
    setActiveStep(0)
    const interval = setInterval(() => {
      step += 1
      setActiveStep(step)
      if (step >= 2) clearInterval(interval)
    }, 800)
  }

  const steps = [
    { location: 'Shanghai Port, CN', status: 'Dispatched', time: '08:45 GMT+8', date: 'Oct 12' },
    { location: 'Pacific Ocean Transit', status: 'In Transit', time: '14:20 GMT', date: 'Oct 14' },
    { location: 'Rotterdam, NL', status: 'Arriving', time: 'Est. 09:00 GMT+1', date: 'Oct 18' },
  ]

  return (
    <section className="py-32 bg-[#06080A] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-4">
            Live Telemetry Console
          </h2>
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest">
            Enter tracking ID for real-time routing data
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-1 shadow-2xl shadow-vortex-cyan/5">
          <div className="bg-[#0B0F17] rounded-[22px] p-8 md:p-12">

            <form onSubmit={handleTrack} className="relative mb-16">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                placeholder="e.g. VX-8892"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-6 pl-14 text-white font-mono text-lg focus:outline-none focus:border-vortex-cyan transition-colors placeholder:text-white/20"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 w-6 h-6" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-vortex-bg font-mono text-sm uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-vortex-cyan transition-colors"
              >
                Trace
              </button>
            </form>

            {isTracking && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                  <div>
                    <p className="font-mono text-xs text-white/50 uppercase tracking-widest mb-1">Shipment ID</p>
                    <p className="font-mono text-xl text-white">{trackingNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-white/50 uppercase tracking-widest mb-1">Status</p>
                    <div className="inline-flex items-center gap-2 bg-vortex-cyan/10 border border-vortex-cyan/30 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-vortex-cyan animate-pulse"></div>
                      <span className="font-mono text-xs text-vortex-cyan uppercase tracking-widest">In Transit</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-8 bottom-8 w-px bg-white/10">
                    <div
                      className="absolute top-0 left-0 w-full bg-gradient-to-b from-vortex-orange to-vortex-cyan transition-all duration-1000 ease-in-out"
                      style={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                    ></div>
                  </div>

                  <div className="space-y-12">
                    {steps.map((step, index) => {
                      const isActive = index === activeStep
                      const isPast = index < activeStep

                      return (
                        <div key={index} className={`relative flex items-start gap-8 transition-opacity duration-500 ${isPast || isActive ? 'opacity-100' : 'opacity-40'}`}>
                          <div className="relative z-10 bg-[#0B0F17] p-2 rounded-full">
                            {isPast ? (
                              <CheckCircle2 className="w-8 h-8 text-vortex-orange" />
                            ) : isActive ? (
                              <div className="relative flex items-center justify-center w-8 h-8">
                                <CircleDashed className="absolute w-8 h-8 text-vortex-cyan animate-spin-slow" />
                                <div className="w-3 h-3 bg-vortex-cyan rounded-full glow-text-cyan"></div>
                              </div>
                            ) : (
                              <MapPin className="w-8 h-8 text-white/20" />
                            )}
                          </div>

                          <div className="flex-1 pt-1">
                            <h4 className={`font-display text-xl md:text-2xl font-semibold mb-1 ${isActive ? 'text-white' : 'text-white/80'}`}>
                              {step.location}
                            </h4>
                            <p className="font-mono text-sm text-white/60 mb-3">{step.status}</p>

                            {(isPast || isActive) && (
                              <div className="inline-flex items-center gap-4 bg-white/5 rounded-md px-4 py-2 border border-white/5">
                                <span className="font-mono text-xs text-white/40">{step.date}</span>
                                <span className="font-mono text-xs text-white/80">{step.time}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
