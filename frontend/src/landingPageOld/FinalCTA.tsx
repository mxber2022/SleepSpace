import { ArrowRight, Moon, Shield, Trophy } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMEwwIDMwbDMwIDMwIDMwLTMwTDMwIDB6IiBmaWxsPSIjZmRlNGVkIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] bg-[length:30px] opacity-50"></div>
          
          <div className="relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-night-900 mb-6 font-display">
                Ready to Transform Your Sleep?
              </h2>
              <p className="text-night-600 text-lg">
                Join thousands of users who are already earning rewards for better sleep habits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Benefit
                icon={<Moon className="w-5 h-5" />}
                title="Better Sleep"
                description="Improve your sleep quality with personalized insights"
              />
              <Benefit
                icon={<Trophy className="w-5 h-5" />}
                title="Earn Rewards"
                description="Get tokens for meeting your sleep goals"
              />
              <Benefit
                icon={<Shield className="w-5 h-5" />}
                title="Stay Private"
                description="Your sleep data remains secure and private"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group relative px-7 py-3 overflow-hidden rounded-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <span className="text-white font-semibold tracking-wide">Start Your Journey</span>
                  {/* <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" /> */}
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-colors"></div>
              </button>

              {/* <button className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                Learn More
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 ring-1 ring-primary-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-primary-50 rounded-lg">
          {icon}
        </div>
        <h3 className="font-semibold text-night-900">{title}</h3>
      </div>
      <p className="text-night-600 text-sm">{description}</p>
    </div>
  );
}