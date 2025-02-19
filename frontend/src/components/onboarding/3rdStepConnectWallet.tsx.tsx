import React from 'react';

interface ConnectWalletStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function ConnectWalletStep({ onNext, onPrevious }: ConnectWalletStepProps) {
  return (
    <div className="w-[519px] h-[610px] flex items-center justify-center">
      <div className="w-full h-full bg-[#FFFFFF4D] rounded-[22px] p-8 backdrop-blur-md border border-night-800 relative overflow-hidden font-dm-sans">
        {/* Connecting Wallet Title */}
        <div className="w-full text-center mt-[10px] text-white font-bold text-[24px] leading-[36.46px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040]">
          Choose Your Wallet
        </div>

        {/* Wallet Options (MetaMask and Safe) */}
        <div className="flex flex-col items-center mt-[50px] space-y-4">
          <button
            onClick={() => console.log('Connecting MetaMask')} // Placeholder for MetaMask connection logic
            className="w-[304px] h-[43px] bg-black text-white rounded-[15px] flex items-center justify-center font-medium text-[16px] leading-[20.83px] tracking-[0%]"
          >
            <img src="/Metamask.png" alt="MetaMask" className="w-6 h-6 mr-2 object-contain" onError={(e) => {
              console.error('MetaMask icon failed to load:', e);
              e.currentTarget.src = 'https://via.placeholder.com/24'; // Fallback placeholder
            }} />
            MetaMask
          </button>
          <button
            onClick={() => console.log('Connecting Safe')} // Placeholder for Safe connection logic
            className="w-[304px] h-[43px] bg-black text-white rounded-[15px] flex items-center justify-center font-medium text-[16px] leading-[20.83px] tracking-[0%]"
          >
            <img src="/Safe.png" alt="Safe" className="w-6 h-6 mr-2 object-contain" onError={(e) => {
              console.error('Safe icon failed to load:', e);
              e.currentTarget.src = 'https://via.placeholder.com/24'; // Fallback placeholder
            }} />
            Safe
          </button>
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