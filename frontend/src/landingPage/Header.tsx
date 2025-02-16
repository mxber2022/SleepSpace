import { 
    ArrowRight,
    Sparkles,
    Stars
  } from 'lucide-react';
  
export default function Header (){
    return(
        <header className="container mx-auto px-4 pt-32 pb-16 relative">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left relative animate-slide-up">
            <div className="absolute -top-8 left-0 md:left-8 transform rotate-12">
              {/* <Stars className="w-8 h-8 text-primary-400 animate-glow" /> */}
            </div>
            <div className="relative">
              <h1 className="text-display-xl md:text-display-2xl font-black text-night-900 mb-8 font-display tracking-tight relative">
                <span className="inline-block hover:scale-105 transition-transform">Earn</span>{' '}
                <span className="inline-block hover:scale-105 transition-transform">While</span>{' '}
                <span className="inline-block hover:scale-105 transition-transform">You</span>{' '}
                
                <span className="relative inline-block">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-900 hover:scale-105 transition-transform inline-block">
    Sleep
  </span>
  <div className="absolute -top-6 -right-6 w-8 h-8 text-primary-400 animate-snooze">
    <span className="absolute top-0 left-0 opacity-0 animate-snooze-1">z</span>
    <span className="absolute top-0 left-2 opacity-0 animate-snooze-2">z</span>
    <span className="absolute top-0 left-4 opacity-0 animate-snooze-3">z</span>
  </div>
</span>

                <div className="absolute -right-4 top-0 w-32 h-32 bg-gradient-radial from-primary-300/30 to-transparent rounded-full blur-2xl"></div>
              </h1>
              <p className="text-body-lg text-night-600 mb-12 leading-relaxed max-w-2xl font-light tracking-wide relative">
                <span className="inline-block hover:text-primary-600 transition-colors">Transform</span> your sleep habits into rewards. 
                Connect your Whoop device, meet sleep goals, and earn tokens - all while maintaining your 
                <span className="inline-block group relative mx-2">
                  privacy
                  <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </span>
                through secure zkTLS verification.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <button className="group relative px-8 py-3 overflow-hidden rounded-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA1NiA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjggMEwwIDQ5aDU2TDI4IDB6IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] bg-[length:20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <span className="text-white font-semibold tracking-wide">Get Started</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-colors"></div>
              </button>
              <button className="group relative px-8 py-4 overflow-hidden rounded-2xl bg-white transform hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-primary-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* <span className="relative text-primary-600 group-hover:text-primary-700 font-semibold tracking-wide">
                  Learn More
                </span> */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-primary-200 group-hover:ring-primary-300 transition-colors"></div>
              </button>
            </div>
          </div>
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
            </div>
          </div>
        </div>
      </header>
    )
}