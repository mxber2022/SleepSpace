import { FeatureCard } from "../components/FeatureCard"
import { Shield, Gift, Trophy } from 'lucide-react';

export default function Features () {
    return(
        <section className="container mx-auto px-4 py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-transparent to-transparent"></div>
        <div className="relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-night-900 mb-6 font-display">
              Introducing Sleep2Earn
            </h2>
            <p className="text-night-600 text-lg">
              Transform your sleep habits into rewards while maintaining complete privacy and security.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Trophy className="w-6 h-6 text-primary-500" />}
              title="Gamified Health"
              description="Turn your sleep routine into a rewarding challenge with daily goals and achievements."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-primary-500" />}
              title="Secure Verification"
              description="Your sleep data is verified using advanced zkTLS technology without exposing personal details."
            />
            <FeatureCard
              icon={<Gift className="w-6 h-6 text-primary-500" />}
              title="Valuable Rewards"
              description="Earn tokens for meeting sleep goals that can be redeemed for real-world benefits."
            />
          </div>
        </div>
      </section>
    )
}