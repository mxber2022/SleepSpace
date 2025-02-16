import { 
  ArrowRight,
  Sparkles,
  Moon,
  Shield
} from 'lucide-react';

export default function Header() {
  return (
    <header className="container mx-auto px-4 pt-32 pb-16">
      <div className="flex flex-col md:flex-row items-center gap-16 relative">
        {/* Left Column - Text Content */}
        <div className="flex-1 text-center md:text-left">
          {/* Main heading */}
          <div className="relative">
            {/* ZZZ Animation */}
            

            <h1 className="text-display-xl md:text-display-2xl font-black text-night-900 mb-8 font-display tracking-tight">
              <span className="inline-block hover:scale-105 transition-transform">Transform</span>{' '}
              <span className="inline-block hover:scale-105 transition-transform">Your</span>{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 hover:scale-105 transition-transform inline-block">
                  Sleep Into Rewards
                </span>

                <div className="absolute -top-12 right-12 hidden md:block">
              <div className="relative">
                <span className="absolute text-2xl font-bold text-primary-400 animate-snooze-1">Z</span>
                <span className="absolute text-2xl font-bold text-primary-400 translate-x-4 -translate-y-4 animate-snooze-2">Z</span>
                <span className="absolute text-2xl font-bold text-primary-400 translate-x-8 -translate-y-8 animate-snooze-3">Z</span>
              </div>
            </div>
                {/*  <Sparkles className="absolute -top-6 -right-6 w-8 h-8 text-primary-400 animate-spin-slow" /> */}
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-body-lg text-night-600 mb-12 leading-relaxed max-w-2xl font-light tracking-wide">
            <span className="inline-block hover:text-primary-600 transition-colors">Earn tokens</span> while you sleep. 
            Connect your Whoop device, meet sleep goals, and build healthy habits - all while maintaining your{' '}
            <span className="inline-flex items-center gap-1 text-primary-600">
              <Shield className="w-4 h-4 inline animate-pulse-slow" />
              <span className="group relative">
                privacy
                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </span>
            </span>
            {' '}through secure zkTLS verification.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <button className="group relative px-8 py-4 overflow-hidden rounded-2xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA1NiA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjggMEwwIDQ5aDU2TDI4IDB6IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] bg-[length:20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Moon className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                <span className="text-white font-semibold tracking-wide">Start Earning</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-colors"></div>
            </button>

            <button className="group relative px-8 py-4 overflow-hidden rounded-2xl bg-white transform hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-primary-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative text-primary-600 group-hover:text-primary-700 font-semibold tracking-wide flex items-center gap-2">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Learn More
              </span>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-primary-200 group-hover:ring-primary-300 transition-colors"></div>
            </button>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-conic from-primary-300/30 via-primary-200/20 to-transparent blur-2xl transform rotate-45"></div>
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-300/10 mix-blend-overlay group-hover:opacity-75 transition-opacity duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80" 
              alt="Peaceful Sleep"
              className="rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700 will-change-transform"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl group-hover:ring-white/20 transition-colors duration-500"></div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-primary-600">Sleep Better</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg transform -rotate-3 group-hover:-rotate-6 transition-transform">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-primary-600">Earn Rewards</span>
              </div>
            </div>

            {/* ZZZ Animation for mobile */}
            <div className="absolute -top-8 -right-4 md:hidden">
              <div className="relative">
                <span className="absolute text-xl font-bold text-primary-400 animate-snooze-1">Z</span>
                <span className="absolute text-xl font-bold text-primary-400 translate-x-3 -translate-y-3 animate-snooze-2">Z</span>
                <span className="absolute text-xl font-bold text-primary-400 translate-x-6 -translate-y-6 animate-snooze-3">Z</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}