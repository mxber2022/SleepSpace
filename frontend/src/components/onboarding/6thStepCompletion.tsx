import React from 'react';

interface CompletionStepProps {
  onComplete: () => void;
}

export function CompletionStep({ onComplete }: CompletionStepProps) {
  return (
    <div className="w-[519px] h-[610px] flex items-center justify-center">
      <div className="w-full h-full bg-[#FFFFFF4D] rounded-[22px] p-8 backdrop-blur-md border border-night-800 relative overflow-hidden font-dm-sans">
        {/* Main Title */}
        <div className="w-full text-center mt-[30px] text-white font-bold text-[28px] leading-[32px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040] font-dm-sans">
          You’re all set to Sleep & Earn!
        </div>
        <img
          src="/Logo.png"
          alt="Sleepspace Logo"
          className="mx-auto mt-[100px] w-[127px] h-[125px]"
        />

        {/* Description Text */}
        <div className="w-full text-center mt-[120px] text-[#E0E0E0] font-normal text-[16px] leading-[20.83px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040] font-dm-sans">
          Track your sleep effortlessly.  
          Earn tokens while you recharge.  
          Wake up refreshed & ready to go.
        </div>

        {/* "Zzzzz" Button */}
        <div className="flex justify-center mt-[30px]">
          <button
            onClick={onComplete}
            className="w-[304px] h-[43px] bg-transparent border border-white rounded-[15px] text-white font-medium text-[16px] leading-[20.83px] tracking-[0%] flex items-center justify-center"
          >
            Zzzzz
          </button>
        </div>
      </div>
    </div>
  );
}