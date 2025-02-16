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
import Problem from './landingPage/problem';

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
      <Header />
      <Problem />
      <Features />
      <Working />
      <Stats />
      
    </>
  );
}

export default App;