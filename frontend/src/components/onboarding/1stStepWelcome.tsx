// src/components/1stStep.tsx
import React from 'react';

interface FirstStepProps {
  onNext: () => void;
}

export function FirstStep({ onNext }: FirstStepProps) {
  return (
    <div className="w-[519px] h-[610px]">
      <div className="w-full h-full bg-[#FFFFFF4D] rounded-[22px] p-8 backdrop-blur-md border border-night-800 relative overflow-hidden font-dm-sans">
        {/* Welcome Text */}
        <div className="w-full text-center mt-[20px] text-white font-bold text-[28px] leading-[36.46px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040]">
          Welcome to Sleepspace
        </div>

        {/* Description Text */}
        <div className="w-full text-center mt-4 text-[#E0E0E0] font-normal text-[18px] leading-[23.44px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040] whitespace-pre-line">
          Your mindful space
          to rest & earn.
        </div>

        {/* Icon */}
        <div className="absolute top-[220px] left-[calc(50%-83px)] w-[148px] h-[149px]">
          <div className="relative w-full h-full">
            <div className="absolute w-[125px] h-[125px] border border-white rounded-full left-[calc(50%-62.5px)] top-[calc(50%-62.5px-15.25px)]"></div>
            <div className="absolute w-[125px] h-[125px] border border-white rounded-full left-[calc(50%-62.5px+8px)] top-[calc(50%-62.5px-8.25px)]"></div>
            <div className="absolute w-[125px] h-[125px] border border-white rounded-full left-[calc(50%-62.5px+16px)] top-[calc(50%-62.5px-1.25px)]"></div>
            <div className="absolute w-[125px] h-[125px] border border-white rounded-full left-[calc(50%-62.5px+23px)] top-[calc(50%-62.5px+5.75px)]"></div>
          </div>
        </div>

        {/* Privacy Text */}
        <div className="w-full text-center left-[calc(50%-253px)] absolute bottom-[120px] text-[#E0E0E0] font-normal text-[16px] leading-[20.83px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040]">
          <p>Your Sleep, Your Data, Your Privacy<br />Powered by Web3</p>
        </div>

        {/* Learn More Link */}
        <a
          href="https://github.com/mxber2022/Sleep2Earn"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center left-[calc(50%-253px)] absolute bottom-[96px] text-[#E0E0E0] font-normal text-[16px] leading-[23px] tracking-[0%] underline text-shadow-[0px_4px_4px_#00000040]"
        >
          Learn more.
        </a>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-[304px] h-[43px] bg-transparent border border-white rounded-[15px] text-white font-medium text-[16px] leading-[20.83px] tracking-[0%] flex items-center justify-center mx-auto absolute left-[calc(50%-152px)] bottom-[30px]"
        >
          Next
        </button>
      </div>
    </div>
  );
}