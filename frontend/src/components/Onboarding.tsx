import React, { useState } from 'react';
import { Moon, Sun, CloudMoon, Bed, Coffee, AArrowDown as ZZZ, Brain, PartyPopper as Party } from 'lucide-react';

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(() => {
    // Try to get name from localStorage
    return localStorage.getItem('userName') || '';
  });

  const steps = [
    {
      icon: <Moon className="w-12 h-12 text-primary-400 animate-spin-slow" />,
      title: "Hey there, Night Owl! 🌙",
      description: "Ready to turn those Z's into cryptocurrency?",
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
      icon: <Coffee className="w-12 h-12 text-primary-400 animate-bounce" />,
      title: `${name}, are you tired of...being tired? 😴`,
      description: "Don't worry, we won't make you do jumping jacks at midnight."
    },
    {
      icon: <Brain className="w-12 h-12 text-primary-400 animate-pulse" />,
      title: "Fun Fact Time! 🎯",
      description: "Did you know? Giraffes only need 2 hours of sleep! But don't worry, we won't hold you to those standards."
    },
    {
      icon: <Party className="w-12 h-12 text-primary-400 animate-wiggle" />,
      title: "You're Ready to Sleep Like a Pro! 🌟",
      description: "Remember: The early bird gets the worm, but the night owl gets the cryptocurrency!"
    }
  ];

  const handleNext = () => {
    if (step === 0) {
      if (!name) return;
      // Save name to localStorage
      localStorage.setItem('userName', name);
    }
    
    if (step === steps.length - 1) {
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

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
            <div className="flex justify-center mb-6">{steps[step].icon}</div>
            <h3 className="text-2xl font-bold text-white text-center mb-4 font-display">
              {steps[step].title}
            </h3>
            <p className="text-night-200 text-center mb-6">
              {steps[step].description}
            </p>
            {'input' in steps[step] && steps[step].input}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleNext}
                className="group relative px-8 py-3 overflow-hidden rounded-xl"
                disabled={step === 0 && !name}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative text-white font-medium">
                  {step === steps.length - 1 ? "Let's Start!" : "Next"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}