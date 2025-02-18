import React, { useState, useEffect } from 'react';
import { 
  Moon, Clock, Battery, Zap, Calendar, ArrowRight, CheckCircle, XCircle, 
  Coins, Timer, Sparkles, PartyPopper as Party, Lock, Lock as LockOpen, 
  Eye, Target, Shield, AlertTriangle, HelpCircle 
} from 'lucide-react';
import { useSleepGoals } from '../hooks/useSleepGoals';
import { useAppKitAccount } from '@reown/appkit/react';
import { ethers } from 'ethers';
import GoalSuccessModal from '../sleepGoals/GoalSuccessModal';
import CurrentGoal from '../sleepGoals/CurrentGoal';
import SetGoalForm from '../sleepGoals/SetGoalForm';

interface SleepHistory {
  date: string;
  bedtime: string;
  wakeTime: string;
  duration: number;
  quality: number;
  achieved: boolean;
}

const sleepHistory: SleepHistory[] = [
  {
    date: '2025-02-14',
    bedtime: '22:00',
    wakeTime: '06:00',
    duration: 8,
    quality: 92,
    achieved: true,
  },
  {
    date: '2025-02-13',
    bedtime: '22:30',
    wakeTime: '06:30',
    duration: 8,
    quality: 85,
    achieved: true,
  },
  {
    date: '2025-02-12',
    bedtime: '23:00',
    wakeTime: '06:00',
    duration: 7,
    quality: 78,
    achieved: false,
  },
];

export function SleepGoals() {
  const { isConnected } = useAppKitAccount();
  const [showSuccess, setShowSuccess] = useState(false);
  const { setSleepGoal, getUserGoal, isLoading, error, approvingStatus } = useSleepGoals();
  const [currentGoal, setCurrentGoal] = useState<any>(null);
  const [showSetGoals, setShowSetGoals] = useState(false);
  
  const fetchCurrentGoal = async () => {
    try {
      const goal = await getUserGoal();
      if (goal) {
        setCurrentGoal({
          ...goal,
          bedtime: new Date(goal.bedtime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
          wakeTime: new Date(goal.wakeTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
          depositAmount: ethers.formatEther(goal.depositAmount)
        });
      }
    } catch (err) {
      console.error('Error fetching current goal:', err);
    }
  };
  
  useEffect(() => {
    if (isConnected) {
      fetchCurrentGoal();
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Celebration Modal */}
          {/* <GoalSuccessModal showSuccess={showSuccess} goals={{}} /> */}

          {/* Current Goal Card */}
          <CurrentGoal currentGoal={currentGoal} setShowSetGoals={setShowSetGoals} />

          {/* Set Goals Form */}
          {showSetGoals && (
            <SetGoalForm setShowSetGoals={setShowSetGoals} />
          )}

          {/* Sleep History */}
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-night-900 font-display">Sleep History</h2>
              </div>
              <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                <span className="text-sm font-medium">View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {sleepHistory.map((history, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl p-6 ring-1 ring-primary-100 hover:ring-primary-300 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-night-600">
                          {new Date(history.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        {history.achieved ? (
                          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">Goal Achieved</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                            <XCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">Goal Missed</span>
                          </div>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-night-900">{history.quality}%</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-night-600 mb-1">Bedtime</div>
                        <div className="font-medium text-night-900">{history.bedtime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-night-600 mb-1">Wake Time</div>
                        <div className="font-medium text-night-900">{history.wakeTime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-night-600 mb-1">Duration</div>
                        <div className="font-medium text-night-900">{history.duration}h</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}