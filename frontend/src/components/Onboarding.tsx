import React, { useState } from 'react';
import { FirstStep } from './onboarding/1stStepWelcome.tsx'; 
import { SignUpStep } from './onboarding/2ndStepSignUp.tsx'; 
import { ConnectWalletStep } from './onboarding/3rdStepConnectWallet.tsx'; 
import { InformationalStep } from './onboarding/4thStepInformational.tsx'; 
import { FifthStepGoals } from './onboarding/5thStepGoals.tsx'; 
import { ConnectDeviceStep } from './onboarding/6thStepConnectDevice.tsx'; 
import { CompletionStep } from './onboarding/7thStepCompletion.tsx'; 

interface Step {
  component: React.ReactElement;
  title?: string;
  description?: string; 
}

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const steps: Step[] = [
    // First step (informational welcome window)
    {
      component: <FirstStep onNext={() => setStep(step + 1)} />,
      title: "Welcome to Sleepspace",
      description: "Get started with a better sleep experience."
    },
    // Second step (Sign Up)
    {
      component: <SignUpStep onNext={() => setStep(step + 1)} onPrevious={() => setStep(step - 1)} />,
      title: "Sign Up",
      description: "Create your account to begin your journey."
    },
    // Third step (Connect Wallet)
    {
      component: <ConnectWalletStep onNext={() => setStep(step + 1)} onPrevious={() => setStep(step - 1)} />,
      title: "Connect Wallet",
      description: "Link your wallet for secure access."
    },
    // Fourth step (Informational)
    {
      component: <InformationalStep onNext={() => setStep(step + 1)} onPrevious={() => setStep(step - 1)} />,
      title: "Learn More",
      description: "Discover how Sleepspace improves your sleep."
    },
    // Fifth step (Set Sleeping Goal)
    {
      component: <FifthStepGoals onNext={() => setStep(step + 1)} onPrevious={() => setStep(step - 1)} />,
      title: "Set Your Sleep Goal",
      description: "Define your sleep schedule for optimal rest."
    },
    // Sixth step (Connect Device)
    {
      component: <ConnectDeviceStep onNext={() => setStep(step + 1)} onPrevious={() => setStep(step - 1)} />,
      title: "Connect Device",
      description: "Pair your device for personalized insights."
    },
    // Seventh step (Completion)
    {
      component: <CompletionStep onComplete={onComplete} />,
      title: "You’re all set to Sleep & Earn!",
      description: "Track your sleep effortlessly. Earn tokens while you recharge. Wake up refreshed & ready to go."
    }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-[#000000] via-[#252745] to-[#434CCD] z-50 flex items-center justify-center">
      <div className="w-[519px] h-[610px] relative"> 
        <div className="w-full h-full relative">
          {/* Render logo only for steps 1–6 (not step 0 or 7) */}
          {step >= 1 && step <= 6 && (
            <div className="flex justify-center mb-4">
              <img src="/Logo.png" alt="Sleepspace Logo" className="w-8 h-8 mr-2" />
              <span className="text-white text-lg font-bold">Sleepspace</span>
            </div>
          )}

          {/* Render progress bar only for steps 1–6 (not step 0 or 7) */}
          {step >= 1 && step <= 6 && (
            <div className="flex justify-center mt-10 mb-6">
              <div className="h-[10px] w-[180px] bg-gray-200 rounded-[100px]">
                <div
                  className="h-[10px] bg-[#434CCD] rounded-[100px] transition-all duration-300"
                  style={{ width: `${getProgressWidth(step)}%` }} 
                ></div>
              </div>
            </div>
          )}

          {/* Render the current step component */}
          {steps[step].component}
        </div>
      </div>
    </div>
  );
}

function getProgressWidth(step: number): number {
  if (step === 0) return 14.29; 
  if (step >= 1 && step < 6) {
    const progress = (step + 1) / 7;
    return progress * 100;
  }
  return 100; 
}