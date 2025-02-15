import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BedDouble, Shield, Gift, ChevronRight, Moon, Stars, ArrowRight, Sparkles } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Onboarding } from './components/Onboarding';
import { SleepGoals } from './pages/SleepGoals';
import { Competition } from './pages/Competition';
import { Claims } from './pages/Claims';
import { Profile } from './pages/Profile';
import { Sleep } from './pages/Sleep';
import { FeatureCard } from './components/FeatureCard';
import { StatCard } from './components/StatCard';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted');
    if (hasCompletedOnboarding) {
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    // Store onboarding completion in localStorage
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-primary-50 via-white to-white relative overflow-hidden">
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-conic from-primary-200/30 via-primary-300/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-conic from-primary-300/20 via-primary-200/20 to-transparent rounded-full blur-3xl animate-float-delayed" style={{ animationDelay: '-3s' }}></div>
      </div>

      <Navigation />
      
      <Routes>
        <Route path="/goals" element={<SleepGoals />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/" element={<Home />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-32 pb-16 relative">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left relative animate-slide-up">
            <div className="absolute -top-8 left-0 md:left-8 transform rotate-12">
              <Stars className="w-8 h-8 text-primary-400 animate-glow" />
            </div>
            <div className="relative">
              <h1 className="text-display-xl md:text-display-2xl font-black text-night-900 mb-8 font-display tracking-tight relative">
                <span className="inline-block hover:scale-105 transition-transform">Earn</span>{' '}
                <span className="inline-block hover:scale-105 transition-transform">While</span>{' '}
                <span className="inline-block hover:scale-105 transition-transform">You</span>{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 hover:scale-105 transition-transform inline-block">
                    Sleep
                  </span>
                  <Sparkles className="absolute -top-6 -right-6 w-8 h-8 text-primary-400 animate-spin-slow" />
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
              <button className="group relative px-8 py-4 overflow-hidden rounded-2xl transform hover:-translate-y-1 transition-all duration-300">
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
                <span className="relative text-primary-600 group-hover:text-primary-700 font-semibold tracking-wide">
                  Learn More
                </span>
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

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BedDouble className="w-6 h-6 text-primary-500" />}
            title="Smart Sleep Tracking"
            description="Advanced sleep monitoring through your Whoop device, analyzing your sleep patterns and quality metrics."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-primary-500" />}
            title="Privacy First"
            description="Your sleep data is protected using zero-knowledge proofs, ensuring complete privacy while earning rewards."
          />
          <FeatureCard
            icon={<Gift className="w-6 h-6 text-primary-500" />}
            title="Daily Rewards"
            description="Earn tokens for meeting your sleep goals. Better sleep equals more rewards in your wallet. What are you waiting for ?"
          />
        </div>
      </section>

      {/* Stats Section */}
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
    </>
  );
}

export default App;