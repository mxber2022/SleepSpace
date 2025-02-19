import React from 'react';

interface SignUpStepProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export function SignUpStep({ onNext, onPrevious }: SignUpStepProps) {
  return (
    <div className="w-[470px] h-[570px]"> 
      <div className="w-full h-full bg-[#FFFFFF4D] rounded-[22px] p-8 backdrop-blur-md border border-night-800 relative overflow-hidden font-dm-sans">
        {/* Sign Up Title */}
        <div className="w-full text-center mt-[10px] text-white font-bold text-[24px] leading-[36.46px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040]">
          Sign up
        </div>

        {/* Sign Up Buttons */}
        <div className="flex flex-col items-center mt-[30px] space-y-4">
          <button className="w-[304px] h-[43px] bg-black text-white rounded-[15px] flex items-center justify-center font-medium text-[16px] leading-[20.83px] tracking-[0%]">
            <span className="mr-2">🔗</span> Connect Wallet
          </button>
          <div className="text-[#E0E0E0] text-[16px] leading-[20.83px] tracking-[0%]">or</div>
          <button className="w-[304px] h-[43px] bg-black text-white rounded-[15px] flex items-center justify-center font-medium text-[16px] leading-[20.83px] tracking-[0%]">
            <img src="/Apple.png" alt="Apple Logo" className="mr-2 w-[12px] h-[15px] " />
            Sign in with Apple
          </button>
          <button className="w-[304px] h-[43px] bg-black text-white rounded-[15px] flex items-center justify-center font-medium text-[16px] leading-[20.83px] tracking-[0%]">
            <span className="mr-2">G</span> Sign in with Google
          </button>
          <button className="w-[304px] h-[43px] bg-black text-white rounded-[15px] flex items-center justify-center font-medium text-[16px] leading-[20.83px] tracking-[0%]">
            <span className="mr-2">✉️</span> Sign in with Email
          </button>
          <button className="w-[304px] h-[43px] bg-black text-white rounded-[15px] flex items-center justify-center font-medium text-[16px] leading-[20.83px] tracking-[0%]">
            <span className="mr-2">X</span> Sign in with X
          </button>
        </div>

        {/* Already Have an Account Link */}
        <div className="w-full text-center absolute left-[1px] bottom-[80px] text-[#E0E0E0] font-normal text-[16px] leading-[20.83px] tracking-[0%] text-shadow-[0px_4px_4px_#00000040]">
          Already have an account? <a href="#" className="underline">Log in.</a>
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