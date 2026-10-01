import { Ship, Plane, ThermometerSnowflake, Activity } from 'lucide-react'

const services = [
  {
    title: 'Ocean Freight',
    description: 'Autonomous zero-emission container vessels optimizing maritime routes in real-time.',
    icon: Ship,
    color: 'from-blue-500/20 to-vortex-cyan/20',
    borderColor: 'group-hover:border-vortex-cyan'
  },
  {
    title: 'Air Cargo',
    description: 'High-speed autonomous drone fleets and converted freighters for critical timeline deliveries.',
    icon: Plane,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'group-hover:border-purple-500'
  },
  {
    title: 'Cold Chain',
    description: 'Intelligent temperature-controlled pods with blockchain-verified environmental logs.',
    icon: ThermometerSnowflake,
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'group-hover:border-cyan-500'
  },
  {
    title: 'Telemetry',
    description: 'Predictive AI routing and millisecond-precision tracking across the global network.',
    icon: Activity,
    color: 'from-vortex-orange/20 to-vortex-amber/20',
    borderColor: 'group-hover:border-vortex-orange'
  }
]

export function ServicesSection() {
  return (
    <section className="py-32 bg-vortex-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-vortex-cyan text-sm uppercase tracking-widest mb-4">
              [ Fleet Capabilities ]
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Multimodal Network
            </h2>
          </div>
          <p className="max-w-md text-white/60 font-sans text-sm md:text-base leading-relaxed">
            Our autonomous infrastructure seamlessly integrates across all domains, providing unparalleled visibility and control over your supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className={`group glass-panel rounded-2xl p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,240,255,0.1)] ${service.borderColor}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-display text-xl font-semibold text-white mb-4">
                    {service.title}
                  </h3>

                  <p className="text-white/60 font-sans text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
