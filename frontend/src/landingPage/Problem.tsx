import { 
    Brain,
    Heart,
    Zap
  } from 'lucide-react';
  
export default function Problem() {
    return(
      <section className="relative border-t border-primary-100">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary-50/80 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-night-900 mb-6 font-display">
            Sleep Deprivation: A Modern Epidemic
          </h2>
          <p className="text-night-600 text-lg">
            Millions struggle with poor sleep, leading to reduced productivity, mental health issues, and overall diminished well-being.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100 relative group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-night-900 mb-4">Cognitive Impact</h3>
              <p className="text-night-600">
                Poor sleep affects memory, decision-making, and overall mental performance.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100 relative group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-night-900 mb-4">Health Risks</h3>
              <p className="text-night-600">
                Lack of quality sleep increases risks of various health conditions.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100 relative group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-night-900 mb-4">Productivity Loss</h3>
              <p className="text-night-600">
                Sleep deprivation costs billions in lost productivity annually.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

