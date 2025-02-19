import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Onboarding } from './components/Onboarding';
import { SleepGoals } from './pages/SleepGoals';
import { Competition } from './pages/Competition';
import { Claims } from './pages/Claims';
import { Profile } from './pages/Profile';
import { Sleep } from './pages/Sleep';
import Header from './landingPage/Header';
import Features from './landingPage/Features';
import Stats from './landingPage/Stats';
import Working from './landingPage/Working';
import Problem from './landingPage/Problem';
import FinalCTA from './landingPage/FinalCTA';
import logoImage from '/../frontend/public/Logo.png'; // Example path; adjust as needed

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
    <div className="min-h-screen bg-gradient-linear from-primary-50 via-white to-white relative overflow-hidden">
      {/* Background gradients (unchanged, with lower z-index) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-linear from-primary-200/30 via-primary-300/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-linear from-primary-300/20 via-primary-200/20 to-transparent rounded-full blur-3xl animate-float-delayed" style={{ animationDelay: '-3s' }}></div>
      </div>

      {/* Show Header during onboarding */}
      <Header />

      {showOnboarding && (
        <>
          {/* Sleepspace Logo and Text just above the onboarding card (with debugging aids) */}
          <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 flex items-center pointer-events-none z-1000" style={{ outline: '3px solid red', background: 'rgba(255, 0, 0, 0.1)' }}>
            <div className="flex items-center bg-transparent">
            <img 
                src={logoImage} 
                alt="Sleepspace Logo" 
                className="w-8 h-8 mr-2" 
                onError={(e) => console.error('Imported image failed to load:', e)}
              /> 
              <span className="text-white text-lg font-bold">Sleepspace</span>
            </div>
          </div>

          {/* Onboarding component (with reduced z-index for testing) */}
          <Onboarding onComplete={handleOnboardingComplete} />
        </>
      )}

      {/* Main content (only shown after onboarding or if onboarding is skipped) */}
      {!showOnboarding && (
        <>
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
        </>
      )}
    </div>
  );
}

function Home() {
  return (
    <>
      <Problem />
      <Features />
      <Working />
      <Stats />
      <FinalCTA />
    </>
  );
}

export default App;