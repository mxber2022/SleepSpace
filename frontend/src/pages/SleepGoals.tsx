import { useState, useEffect } from 'react';
import {  Calendar, CheckCircle, XCircle, Clock4 } from 'lucide-react';
import { useSleepGoals } from '../hooks/useSleepGoals';
import { useAppKitAccount } from '@reown/appkit/react';
import { ethers } from 'ethers';
import CurrentGoal from '../sleepGoals/CurrentGoal';
import SetGoalForm from '../sleepGoals/SetGoalForm';

interface SleepHistory {
  date: string;
  bedtime: string | null;
  wakeTime: string | null;
  duration: number | null;
  quality: number | null;
  achieved: boolean | null;
  isFuture: boolean;
}

export function SleepGoals() {
  const { isConnected } = useAppKitAccount();
  const [showSuccess, setShowSuccess] = useState(false);
  const { setSleepGoal, getUserGoal, isLoading, error, approvingStatus } = useSleepGoals();
  const [currentGoal, setCurrentGoal] = useState<any>(null);
  const [showSetGoals, setShowSetGoals] = useState(false);
  const [sleepHistory, setSleepHistory] = useState<SleepHistory[]>([]);

  const fetchCurrentGoal = async () => {
    try {
      const goal = await getUserGoal();
      if (goal) {
        // Get the goal creation timestamp from blockchain data
        const startDate = new Date(goal.createdAt * 1000); // Convert blockchain timestamp to JS Date
        startDate.setHours(0, 0, 0, 0); // Normalize to start of day
        
        setCurrentGoal({
          ...goal,
          bedtime: new Date(goal.bedtime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
          wakeTime: new Date(goal.wakeTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
          depositAmount: ethers.formatEther(goal.depositAmount)
        });
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + goal.goalDuration - 1);

        const history: SleepHistory[] = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          const isFutureDate = currentDate > today;

          if (isFutureDate) {
            // Future date - use placeholder
            history.push({
              date: currentDate.toISOString(),
              bedtime: null,
              wakeTime: null,
              duration: null,
              quality: null,
              achieved: null,
              isFuture: true
            });
          } else {
            // Past or current date - generate data
            const baseQuality = Math.floor(Math.random() * 20) + 70;
            const achieved = baseQuality >= goal.quality;
            const variationMinutes = Math.floor(Math.random() * 30);

            const bedtimeBase = new Date(`2000-01-01T${goal.bedtime}`);
            const wakeTimeBase = new Date(`2000-01-01T${goal.wakeTime}`);

            bedtimeBase.setMinutes(bedtimeBase.getMinutes() + (Math.random() > 0.5 ? 1 : -1) * variationMinutes);
            wakeTimeBase.setMinutes(wakeTimeBase.getMinutes() + (Math.random() > 0.5 ? 1 : -1) * variationMinutes);

            history.push({
              date: currentDate.toISOString(),
              bedtime: bedtimeBase.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
              wakeTime: wakeTimeBase.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
              duration: goal.duration + (Math.random() > 0.5 ? 0.5 : -0.5),
              quality: baseQuality,
              achieved,
              isFuture: false
            });
          }

          // Move to next day
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setSleepHistory(history.reverse()); // Show most recent first
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
              {sleepHistory.length > 0 && (
                <div className="text-sm text-night-600">
                  {currentGoal?.goalDuration} day goal period
                </div>
              )}
            </div>

            {sleepHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-night-900 mb-2">No Sleep Data Yet</h3>
                <p className="text-night-600">
                  Sleep data will appear here once your goal period begins.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sleepHistory.map((history, index) => (
                  <div
                    key={index}
                    className={`group relative bg-white rounded-xl p-6 ring-1 ${
                      history.isFuture 
                        ? 'ring-primary-100/50 bg-primary-50/10' 
                        : 'ring-primary-100 hover:ring-primary-300'
                    } transition-all duration-300`}
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
                          {history.isFuture ? (
                            <div className="flex items-center gap-1 text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                              <Clock4 className="w-4 h-4" />
                              <span className="text-xs font-medium">Coming Soon</span>
                            </div>
                          ) : history.achieved ? (
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
                        {!history.isFuture && (
                          <div className="text-2xl font-bold text-night-900">{history.quality}%</div>
                        )}
                      </div>
                      {history.isFuture ? (
                        <div className="flex items-center justify-center py-6">
                          <div className="text-night-600 text-sm">
                            Sleep data will be available after this date
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-night-600 mb-1">Bedtime</div>
                            <div className="font-medium text-night-900">
                              {history.bedtime || '--:--'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-night-600 mb-1">Wake Time</div>
                            <div className="font-medium text-night-900">
                              {history.wakeTime || '--:--'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-night-600 mb-1">Duration</div>
                            <div className="font-medium text-night-900">
                              {history.duration ? `${history.duration}h` : '--'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}