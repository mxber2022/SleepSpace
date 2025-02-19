import React from 'react';

interface InformationalStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function InformationalStep({ onNext, onPrevious }: InformationalStepProps) {
  return (
    <div className="w-[470px] h-[570px]"> 
      <div className="w-full h-full bg-[#FFFFFF4D] rounded-[22px] p-8 backdrop-blur-md border border-night-800 relative overflow-hidden font-dm-sans">
        {/* Main Title */}
        <div className="w-full text-center mt-[20px] text-white font-bold text-[24px] leading-[24px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040]">
          Let’s make your sleep better!
        </div>

        {/* Informational Text */}
        <div className="w-full text-center mt-[20px] text-[#E0E0E0] font-normal text-[16px] leading-[20.83px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040]">
          Getting 7–9 hours of sleep can boost productivity by up to 30%
        </div>

        {/* Moon Icon (Centered in the Card) */}
        <div className="absolute inset-0 flex items-center mt-[40px] justify-center">
          <img
            src="/Moon.png" 
            alt="Moon"
            className="w-[236px] h-[236px]"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between absolute bottom-[20px] w-[304px] left-[calc(50%-152px)]">
          <button
            onClick={onPrevious}
            className="w-[140px] h-[43px] bg-transparent border border-white rounded-[15px] text-white font-medium text-[16px] leading-[20.83px] tracking-[0%]"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className="w-[140px] h-[43px] bg-transparent border border-white rounded-[15px] text-white font-medium text-[16px] leading-[20.83px] tracking-[0%]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}