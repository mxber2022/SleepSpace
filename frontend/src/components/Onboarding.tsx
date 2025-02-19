import React, { useState } from 'react';
import { FirstStep } from './onboarding/1stStepWelcome.tsx'; 
import { SignUpStep } from './onboarding/2ndStepSignUp.tsx'; 
import { ConnectWalletStep } from './onboarding/3rdStepConnectWallet.tsx'; 
import { InformationalStep } from './onboarding/4thStepInformational.tsx'; 
import { ConnectDeviceStep } from './onboarding/5thStepConnectDevice.tsx'; 
import { CompletionStep } from './onboarding/6thStepCompletion.tsx'; 

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
    // Fifth step (Connect Device)
    {
      component: <ConnectDeviceStep onNext={() => setStep(step + 1)} onPrevious={() => setStep(step - 1)} />,
      title: "Connect Device",
      description: "Pair your device for personalized insights."
    },
    // Sixth step (Completion)
    {
      component: <CompletionStep onComplete={onComplete} />,
      title: "You’re all set to Sleep & Earn!",
      description: "Track your sleep effortlessly. Earn tokens while you recharge. Wake up refreshed & ready to go."
    }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-[#000000] via-[#252745] to-[#434CCD] z-50 flex items-center justify-center">
      {step === 0 ? (
        <div className="w-[519px] h-[610px]"> 
          <div className="w-full h-full relative ">
            {/* Sleepspace Logo centered above FirstStep */}
            <div className="flex justify-center mb-4">
              <img src="/Logo.png" alt="Sleepspace Logo" className="w-8 h-8 mr-2"  />
              <span className="text-white text-lg font-bold">Sleepspace</span>
            </div>
            {steps[step].component}
          </div>
        </div>
      ) : step === 1 ? (
        <div className="w-[519px] h-[610px]"> 
          <div className="w-full h-full relative ">
            {/* Sleepspace Logo centered above SignUpStep */}
            <div className="flex justify-center mb-4">
              <img src="/Logo.png" alt="Sleepspace Logo" className="w-8 h-8 mr-2" />
              <span className="text-white text-lg font-bold">Sleepspace</span>
            </div>
            {/* Progress Bar (centered, 180px width, specific dimensions) */}
            <div className="flex justify-center mt-10 mb-6">
              <div className="h-[10px] w-[180px] bg-gray-200 rounded-[100px]">
                <div
                  className="h-[10px] bg-[#434CCD] rounded-[100px] transition-all duration-300"
                  style={{ width: `${getProgressWidth(step)}%` }} 
                ></div>
              </div>
            </div>
            {steps[step].component}
          </div>
        </div>
      ) : step === 2 ? (
        <div className="w-[519px] h-[610px]"> 
          <div className="w-full h-full relative ">
            {/* Sleepspace Logo centered above ConnectWalletStep */}
            <div className="flex justify-center mb-4">
             <img src="/Logo.png" alt="Sleepspace Logo" className="w-8 h-8 mr-2" />
              <span className="text-white text-lg font-bold">Sleepspace</span>
            </div>
            {/* Progress Bar (centered, 180px width, specific dimensions) */}
            <div className="flex justify-center mt-10 mb-6">
              <div className="h-[10px] w-[180px] bg-gray-200 rounded-[100px]">
                <div
                  className="h-[10px] bg-[#434CCD] rounded-[100px] transition-all duration-300"
                  style={{ width: `${getProgressWidth(step)}%` }} 
                ></div>
              </div>
            </div>
            {steps[step].component}
          </div>
        </div>
      ) : step === 3 ? (
        <div className="w-[519px] h-[610px]"> 
          <div className="w-full h-full relative ">
            {/* Sleepspace Logo centered above InformationalStep */}
            <div className="flex justify-center mb-4">
            <img src="/Logo.png" alt="Sleepspace Logo" className="w-8 h-8 mr-2" />
              <span className="text-white text-lg font-bold">Sleepspace</span>
            </div>
            {/* Progress Bar (centered, 180px width, specific dimensions) */}
            <div className="flex justify-center mt-10 mb-6">
              <div className="h-[10px] w-[180px] bg-gray-200 rounded-[100px]">
                <div
                  className="h-[10px] bg-[#434CCD] rounded-[100px] transition-all duration-300"
                  style={{ width: `${getProgressWidth(step)}%` }} 
                ></div>
              </div>
            </div>
            {steps[step].component}
          </div>
        </div>
      ) : step === 4 ? (
        <div className="w-[519px] h-[610px]"> 
          <div className="w-full h-full relative ">
            {/* Sleepspace Logo centered above ConnectDeviceStep */}
            <div className="flex justify-center mb-4">
            <img src="/Logo.png" alt="Sleepspace Logo" className="w-8 h-8 mr-2" />
              <span className="text-white text-lg font-bold">Sleepspace</span>
            </div>
            {/* Progress Bar (centered, 180px width, specific dimensions) */}
            <div className="flex justify-center mt-10 mb-6">
              <div className="h-[10px] w-[180px] bg-gray-200 rounded-[100px]">
                <div
                  className="h-[10px] bg-[#434CCD] rounded-[100px] transition-all duration-300"
                  style={{ width: `${getProgressWidth(step)}%` }} 
                ></div>
              </div>
            </div>
            {steps[step].component}
          </div>
        </div>
      ) : step === 5 ? (
        <div className="w-[519px] h-[610px]"> 
          <div className="w-full h-full relative ">
            {/* Sleepspace Logo centered above CompletionStep */}
            <div className="flex justify-center mb-4">
            <img src="/Logo.png" alt="Sleepspace Logo" className="w-8 h-8 mr-2" />
              <span className="text-white text-lg font-bold">Sleepspace</span>
            </div>
            {/* Progress Bar (100% for completion) */}
            <div className="flex justify-center mt-10 mb-6">
              <div className="h-[10px] w-[180px] bg-gray-200 rounded-[100px]">
                <div
                  className="h-[10px] bg-[#434CCD] rounded-[100px] transition-all duration-300"
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
            {steps[step].component}
          </div>
        </div>
      ) : null}
    </div>
  );
}

// Helper function to safely get progress width, handling potential undefined values
function getProgressWidth(step: number): number {
  if (step === 0) return 16.67; 
  if (step >= 1 && step < 5) {
    const progress = (step + 1) / 6; 
    return progress * 100;
  }
  return 100; 
}