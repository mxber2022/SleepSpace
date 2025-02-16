
import { StatCard } from "../components/StatCard"

export default function Stats() {
    return(
        <section className="container mx-auto px-4 py-24">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-radial from-primary-100/50 via-white to-transparent opacity-60"></div>
          <div className="relative bg-white/50 backdrop-blur-xl rounded-2xl p-12 ring-1 ring-primary-200/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-primary-100/50 opacity-50"></div>
            <div className="relative grid md:grid-cols-3 gap-8 text-center">
              <StatCard number="10k+" label="Active Users" />
              <StatCard number="$500k+" label="Rewards Distributed" />
              <StatCard number="98%" label="Privacy Score" />
            </div>
          </div>
        </div>
      </section>
    )
}