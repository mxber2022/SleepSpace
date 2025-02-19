import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FifthStepGoalsProps {
  onNext: () => void; 
  onPrevious?: () => void; 
}

export function FifthStepGoals({ onNext, onPrevious }: FifthStepGoalsProps) {
  const navigate = useNavigate();
  const [bedtime, setBedtime] = useState('22:00');
  const [wakeUp, setWakeUp] = useState('06:00'); 
  const [sleepHours, setSleepHours] = useState<number | null>(8); 
  const [hasBedtimeInput, setHasBedtimeInput] = useState(false); 
  const [hasWakeUpInput, setHasWakeUpInput] = useState(false); 

  
  const calculateSleepHours = () => {
    if (bedtime && wakeUp) {
      const [bedHour, bedMinute] = bedtime.split(':').map(Number);
      const [wakeHour, wakeMinute] = wakeUp.split(':').map(Number);

      let hours = wakeHour - bedHour;
      let minutes = wakeMinute - bedMinute;

      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }
      if (hours < 0) {
        hours += 24;
      }

      const totalHours = hours + minutes / 60;
      setSleepHours(totalHours);
    } else {
      setSleepHours(null);
    }
  };

  
  const handleBedtimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBedtime(e.target.value);
    setHasBedtimeInput(e.target.value !== ''); 
    calculateSleepHours();
  };

  const handleWakeUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWakeUp(e.target.value);
    setHasWakeUpInput(e.target.value !== ''); 
    calculateSleepHours();
  };

  return (
    <div className="w-[470px] h-[570px] relative"> 
      <div className="w-full h-full bg-[#FFFFFF4D] rounded-[22px] p-8 backdrop-blur-md border border-night-800 relative overflow-hidden font-dm-sans">
        {/* Main Title */}
        <div className="w-full text-center mt-[20px] text-white font-bold text-[24px] leading-[24px] tracking-[0%]">
          Set Your Sleeping Goal
        </div>

        {/* Bedtime and Wake Up Inputs Container */}
        <div className="absolute left-[54px] top-[140px] flex flex-col items-start gap-3 w-[356px] h-[214px]">
          {/* Bedtime Section */}
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex items-center gap-2">
              <img src="/MoonVector.png" alt="Moon" className="w-6 h-6" />
              <label 
                className="block text-left text-white font-bold text-[16px] leading-[20.83px] tracking-[0%]"
              >
                Bedtime
              </label>
            </div>
            <div className="relative w-full">
              <input
                type="time"
                value={bedtime}
                onChange={handleBedtimeChange}
                onBlur={calculateSleepHours}
                className={`w-full h-[59px] bg-transparent text-white rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#4A6ACD] p-[12px_9px_12px_16px] pr-4 ${hasBedtimeInput ? 'border border-[#212121]' : 'border border-white'}`}
              />
            </div>
          </div>

          {/* Wake Up Section */}
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex items-center gap-2">
              <img src="/SunVector.png" alt="Sun" className="w-6 h-6" />
              <label 
                className="block text-left text-white font-bold text-[16px] leading-[20.83px] tracking-[0%]"
              >
                Wake Up
              </label>
            </div>
            <div className="relative w-full">
              <input
                type="time"
                value={wakeUp}
                onChange={handleWakeUpChange}
                onBlur={calculateSleepHours}
                className={`w-full h-[59px] bg-transparent text-white rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#4A6ACD] p-[12px_9px_12px_16px] pr-4 ${hasWakeUpInput ? 'border border-[#212121]' : 'border border-white'}`}
              />

            </div>
          </div>
        </div>

        {/* Sleep Hours Result and Description */}
        {sleepHours !== null && (
          <div className="absolute bottom-[100px] left-[10px] w-full text-center flex flex-col items-center">
            <p 
              className="text-white font-bold text-[16px] leading-[20.83px] tracking-[0%]"
            >
              {sleepHours.toFixed(0)}h
            </p>
            <p 
              className="text-white font-[DM Sans] font-normal text-[16px] leading-[20.83px] tracking-[0%]"
            >
              Awesome! You are on the right track.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between absolute bottom-[20px] w-[350px] left-[calc(50%-172px)]">
          <button
            onClick={onPrevious}
            className="w-[160px] h-[43px] bg-transparent border border-white rounded-[15px] text-white font-medium text-[16px] leading-[20.83px] tracking-[0%]"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className="w-[160px] h-[43px] bg-transparent border border-white rounded-[15px] text-white font-medium text-[16px] leading-[20.83px] tracking-[0%]"
          >
            Let’s start sleeping!
          </button>
        </div>
      </div>
    </div>
  );
}