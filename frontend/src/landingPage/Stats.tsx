import { StatCard } from "../components/StatCard"

export default function Stats() {
    return(
        <section className="container mx-auto px-4 py-24 relative">
          <div className="relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-night-900 mb-6 font-display">
                Our Impact in Numbers
              </h2>
              <p className="text-night-600 text-lg max-w-2xl mx-auto">
                Join thousands of users who are already transforming their sleep habits and earning rewards.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-primary-100/50 via-white to-transparent opacity-60"></div>
                <div className="relative bg-white/50 backdrop-blur-xl rounded-2xl p-12 ring-1 ring-primary-200/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-primary-100/50 opacity-50"></div>
                  <div className="relative grid md:grid-cols-3 gap-8 text-center">
                    <StatCard number="X" label="Active Users" />
                    <StatCard number="X" label="Rewards Distributed" />
                    <StatCard number="100%" label="Privacy Score" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}