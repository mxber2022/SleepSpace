import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Onboarding } from './components/Onboarding';
import { SleepGoals } from './pages/SleepGoals';
import { Competition } from './pages/Competition';
import { Claims } from './pages/Claims';
import { Profile } from './pages/Profile';
import { Sleep } from './pages/Sleep';
import LandingPage from './pages/LandingPage';
import Features from './landingPage/Features';
import Stats from './landingPage/Stats';
import Working from './landingPage/Working';
import Problem from './landingPage/Problem';
import FinalCTA from './landingPage/FinalCTA';
function App() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if onboarding is completed on mount
    const onboardingStatus = localStorage.getItem('onboardingCompleted');
    if (onboardingStatus === 'true') {
      setIsOnboardingCompleted(true);
    } else {
      setIsOnboardingCompleted(false);
      // If the user is not on the root or onboarding path, redirect to root
      if (location.pathname !== '/' && location.pathname !== '/onboarding') {
        navigate('/');
      }
    }
  }, [location.pathname, navigate]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setIsOnboardingCompleted(true);
    navigate('/'); // Redirect to Home after onboarding
  };

  return (
    <div className="min-h-screen bg-gradient-linear from-primary-50 via-white to-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-linear from-primary-200/30 via-primary-300/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-linear from-primary-300/20 via-primary-200/20 to-transparent rounded-full blur-3xl animate-float-delayed" style={{ animationDelay: '-3s' }}></div>
      </div>

      <Routes>
        {/* Root path: Show LandingPage if not onboarded, otherwise Home */}
        <Route 
          path="/" 
          element={
            !isOnboardingCompleted ? (
              <LandingPage /> // Updated LandingPage handles navigation to /onboarding
            ) : (
              <Home />
            )
          } 
        />

        {/* Onboarding route */}
        <Route 
          path="/onboarding" 
          element={
            <Onboarding onComplete={handleOnboardingComplete} />
          } 
        />

        {/* Authenticated routes (after onboarding) */}
        {isOnboardingCompleted && (
          <>
            <Route path="/goals" element={<SleepGoals />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sleep" element={<Sleep />} />
          </>
        )}

        {/* Redirect any unmatched routes to root if not onboarded, or stay on current if onboarded */}
        <Route 
          path="*" 
          element={
            !isOnboardingCompleted ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/goals" replace />
            )
          } 
        />
      </Routes>

      {/* Show Navigation and Footer only after onboarding is complete */}
      {isOnboardingCompleted && (
        <>
          <Navigation />
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