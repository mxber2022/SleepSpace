import React from 'react';

interface ConnectDeviceStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function ConnectDeviceStep({ onNext, onPrevious }: ConnectDeviceStepProps) {
  return (
    <div className="w-[519px] h-[610px] flex items-center justify-center">
      <div className="w-full h-full bg-[#FFFFFF4D] rounded-[22px] p-8 backdrop-blur-md border border-night-800 relative overflow-hidden font-dm-sans">
        {/* Main Title and Text */}
        <div className="w-full text-center mt-[50px] text-white font-bold text-[24px] leading-[24px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040]">
          Connect your device
        </div>
        <div className="w-full text-center mt-[20px] text-[#E0E0E0] font-normal text-[16px] leading-[20.83px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040]">
          Thanks to ZK technology, no data is shared between the app and your tracking device.{' '}
          <a
            href="https://github.com/your-repo-url" // Replace with your actual GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#434CCD] underline hover:text-[#5A68D5]"
          >
            Learn more.
          </a>
        </div>

        {/* Whoop Device Button (styled like MetaMask and Safe) */}
        <div className="flex flex-col items-center mt-[50px] space-y-4">
          <button
            onClick={() => console.log('Connecting Whoop')} // Placeholder for Whoop connection logic
            className="w-[304px] h-[43px] bg-black text-white rounded-[15px] flex items-center justify-center font-medium text-[16px] leading-[20.83px] tracking-[0%]"
          >
            <img 
              src="/Whoop.png" 
              alt="Whoop Icon"
              className="w-6 h-6 mr-2 object-contain" 
              
            />
            Whoop
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