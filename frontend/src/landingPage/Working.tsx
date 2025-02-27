import { Activity, Target, Coins } from 'lucide-react';

export default function Working() {
    return(
        <section className="container mx-auto px-4 py-24 relative">
          <div className="relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-night-900 mb-6 font-display">
                How It Works
              </h2>
              <p className="text-night-600 text-lg max-w-2xl mx-auto">
                Start your journey to better sleep and earn rewards in three simple steps.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 hidden md:block"></div>
                
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="relative group">
                    <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100 relative group-hover:-translate-y-1 transition-all duration-300 flex flex-col items-stretch min-h-[300px]">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center ring-8 ring-white">
                        <Activity className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="pt-8 flex-1 flex flex-col justify-between">
                        <h3 className="text-xl font-bold text-night-900 mb-4 text-center">Connect Your Device</h3>
                        <p className="text-night-600 text-center leading-relaxed">
                          Link your smartwatch or sleep-tracker to the Sleep2Earn app effortlessly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100 relative group-hover:-translate-y-1 transition-all duration-300 flex flex-col items-stretch min-h-[300px]">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center ring-8 ring-white">
                        <Target className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="pt-8 flex-1 flex flex-col justify-between">
                        <h3 className="text-xl font-bold text-night-900 mb-4 text-center">Set Your Goals</h3>
                        <p className="text-night-600 text-center leading-relaxed">
                          Choose your personalized sleep objectives based on expert recommendations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100 relative group-hover:-translate-y-1 transition-all duration-300 flex flex-col items-stretch min-h-[300px]">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center ring-8 ring-white">
                        <Coins className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="pt-8 flex-1 flex flex-col justify-between">
                        <h3 className="text-xl font-bold text-night-900 mb-4 text-center">Sleep and Earn</h3>
                        <p className="text-night-600 text-center leading-relaxed">
                          Meet your sleep goals and earn tokens while maintaining complete privacy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}