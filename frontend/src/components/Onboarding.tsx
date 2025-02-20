import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, CloudMoon, Bed, Coffee, AArrowDown as ZZZ, 
  Brain, PartyPopper as Party, Wallet, Activity, 
  CheckCircle, XCircle, ArrowRight, Loader2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppKitAccount } from '@reown/appkit/react';
import { useAppKit } from '@reown/appkit/react';

interface OnboardingData {
  name: string;
  whoopConnected: boolean;
  walletConnected: boolean;
  walletAddress: string | null;
  whoopId: string | null;
  lastCompletedStep: number;
}

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { login, isAuthenticated, user, isLoading: whoopLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: '',
    whoopConnected: false,
    walletConnected: false,
    walletAddress: null,
    whoopId: null,
    lastCompletedStep: -1
  });

  // Load existing onboarding data and set initial step
  useEffect(() => {
    const savedData = localStorage.getItem('onboardingData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setOnboardingData(data);
      setName(data.name);

      // Set step to the first incomplete step
      if (!data.name) {
        setStep(0);
      } else if (!data.walletConnected) {
        setStep(1);
      } else if (!data.whoopConnected) {
        setStep(2);
      } else {
        setStep(3);
      }
    }
  }, []);

  // Update onboarding data when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      setOnboardingData(prev => ({
        ...prev,
        walletConnected: true,
        walletAddress: address,
        lastCompletedStep: Math.max(prev.lastCompletedStep, 1)
      }));
    }
  }, [isConnected, address]);

  // Update onboarding data when WHOOP connects
  useEffect(() => {
    if (isAuthenticated && user) {
      setOnboardingData(prev => ({
        ...prev,
        whoopConnected: true,
        whoopId: user.whoop_user_id,
        lastCompletedStep: Math.max(prev.lastCompletedStep, 2)
      }));
    }
  }, [isAuthenticated, user]);

  // Save onboarding data to localStorage whenever it changes
  useEffect(() => {
    if (onboardingData.name || onboardingData.walletConnected || onboardingData.whoopConnected) {
      localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
    }
  }, [onboardingData]);

  const handleConnectWallet = async () => {
    setIsConnectingWallet(true);
    try {
      await open();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const handleNext = () => {
    if (step === 0 && !name) return;
    
    if (step === 0) {
      setOnboardingData(prev => ({
        ...prev,
        name,
        lastCompletedStep: Math.max(prev.lastCompletedStep, 0)
      }));
    }
    
    if (step === steps.length - 1) {
      localStorage.setItem('onboardingCompleted', 'true');
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  const steps = [
    {
      icon: <Moon className="w-12 h-12 text-primary-400 animate-spin-slow" />,
      title: "Hey there, Night Owl! 🌙",
      description: <>
      Welcome to SleepSpace! <br /> Ready to transform your Z's into rewards?
    </>,
      input: (
        <input
          type="text"
          placeholder="What should we call you?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 w-full px-4 py-2 bg-night-900/50 border border-night-800 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      )
    },
    {
      icon: <Wallet className="w-12 h-12 text-primary-400 animate-pulse" />,
      title: "Connect Your Wallet",
      description: "Link your wallet to start earning rewards for quality sleep.",
      action: (
        <button
          onClick={handleConnectWallet}
          disabled={isConnectingWallet || isConnected}
          className={`mt-4 w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
            isConnected 
              ? 'bg-green-500 text-white cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          } transition-colors`}
        >
          {isConnectingWallet ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : isConnected ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Wallet Connected</span>
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </>
          )}
        </button>
      )
    },
    {
      icon: <img src="/Whoop.png" alt="Activity Icon" className="w-12 h-12 text-primary-400" />,
      title: "Connect Your WHOOP",
      description: "Link your WHOOP device to track your sleep metrics.",
      action: (
        <button
          onClick={login}
          disabled={whoopLoading || isAuthenticated}
          className={`mt-4 w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
            isAuthenticated 
              ? 'bg-green-500 text-white cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          } transition-colors`}
        >
          {whoopLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : isAuthenticated ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>WHOOP Connected</span>
            </>
          ) : (
            <>
              <Activity className="w-5 h-5" />
              <span>Connect WHOOP</span>
            </>
          )}
        </button>
      )
    },
    {
      icon: <Party className="w-12 h-12 text-primary-400 animate-wiggle" />,
      title: "You're Ready to Sleep Like a Pro! 🌟",
      description: "Remember to set goals and join competition, Congrats!"
    }
  ];

  return (
    <div className="fixed inset-0 bg-night-950/90 backdrop-blur-lg z-50 flex items-center justify-center">
      <div className="max-w-md w-full p-8">
        <div className="bg-night-900/50 rounded-2xl p-8 backdrop-blur-md border border-night-800 relative overflow-hidden">
          {/* Floating elements animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <ZZZ className="absolute top-8 right-8 w-6 h-6 text-primary-400/20 animate-float" />
            <CloudMoon className="absolute bottom-8 left-8 w-8 h-8 text-primary-400/20 animate-float-delayed" />
            <Sun className="absolute top-1/2 right-4 w-4 h-4 text-primary-400/20 animate-float" />
            <Bed className="absolute bottom-4 right-1/2 w-6 h-6 text-primary-400/20 animate-float-delayed" />
          </div>

          <div className="relative">
            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === step 
                      ? 'bg-primary-500' 
                      : index < step 
                        ? 'bg-primary-400' 
                        : 'bg-night-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-center mb-6">{steps[step].icon}</div>
            <h3 className="text-2xl font-bold text-white text-center mb-4 font-display">
              {steps[step].title}
            </h3>
            <p className="text-night-200 text-center mb-6">
              {steps[step].description}
            </p>
            {'input' in steps[step] && steps[step].input}
            {'action' in steps[step] && steps[step].action}
            
            <div className="flex justify-center mt-8">
              <button
                onClick={handleNext}
                className={`group relative px-8 py-2 overflow-hidden rounded-xl ${
                  (step === 0 && !name) || 
                  (step === 1 && !isConnected) || 
                  (step === 2 && !isAuthenticated)
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:-translate-y-1'
                } transition-all duration-300`}
                disabled={
                  (step === 0 && !name) || 
                  (step === 1 && !isConnected) || 
                  (step === 2 && !isAuthenticated)
                }
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-2 text-white font-medium">
                  <span>
                    {step === steps.length - 1 ? "Let's Go !" : "Continue"}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// 