import { useState, useEffect } from 'react';
import { 
  Calendar, CheckCircle, XCircle, Clock4, BedDouble,
  Moon, Target, Shield, Activity, AlertCircle
} from 'lucide-react';
import { useSleepGoals } from '../hooks/useSleepGoals';
import { useAppKitAccount } from '@reown/appkit/react';
import { ethers } from 'ethers';
import CurrentGoal from '../sleepGoals/CurrentGoal';
import SetGoalForm from '../sleepGoals/SetGoalForm';
import { useAuth } from '../context/AuthContext';

interface SleepHistory {
  date: string;
  bedtime: string | null;
  wakeTime: string | null;
  duration: number | null;
  quality: number | null;
  achieved: boolean | null;
  isFuture: boolean;
  score?: {
    stage_summary: {
      total_in_bed_time_milli: number;
      total_light_sleep_time_milli: number;
      total_slow_wave_sleep_time_milli: number;
      total_rem_sleep_time_milli: number;
      sleep_cycle_count: number;
      disturbance_count: number;
    };
    respiratory_rate: number;
    sleep_performance_percentage: number;
    sleep_consistency_percentage: number;
    sleep_efficiency_percentage: number;
  };
}

export function SleepGoals() {
  const { isConnected } = useAppKitAccount();
  const { user } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const { setSleepGoal, getUserGoal, isLoading, error, approvingStatus } = useSleepGoals();
  const [currentGoal, setCurrentGoal] = useState<any>(null);
  const [showSetGoals, setShowSetGoals] = useState(false);
  const [sleepHistory, setSleepHistory] = useState<SleepHistory[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

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

        // Fetch sleep history from WHOOP API
        await fetchSleepHistory(goal);
      }
    } catch (err) {
      console.error('Error fetching current goal:', err);
    }
  };

  const fetchSleepHistory = async (goal: any) => {
    if (!user) return;

    setIsLoadingHistory(true);
    try {
      const response = await fetch("/api/whoop/sleep", {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sleep data");
      }

      const data = await response.json();
      const whoopData = data.records;

      // Get goal start date
      const goalStartDate = new Date(goal.createdAt * 1000);
      goalStartDate.setHours(0, 0, 0, 0);

      // Calculate goal end date
      const goalEndDate = new Date(goalStartDate);
      goalEndDate.setDate(goalEndDate.getDate() + goal.goalDuration - 1);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Create sleep history array
      const history: SleepHistory[] = [];
      let currentDate = new Date(goalStartDate);

      while (currentDate <= goalEndDate) {
        const isFutureDate = currentDate > today;
        const whoopEntry = whoopData.find((entry: any) => {
          const entryDate = new Date(entry.start);
          return entryDate.toDateString() === currentDate.toDateString();
        });

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
        } else if (whoopEntry) {
          // Use actual WHOOP data
          const quality = Math.round(whoopEntry.score.sleep_performance_percentage);
          const achieved = quality >= goal.quality;
          const duration = whoopEntry.score.stage_summary.total_in_bed_time_milli / (1000 * 60 * 60);

          history.push({
            date: currentDate.toISOString(),
            bedtime: new Date(whoopEntry.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            wakeTime: new Date(whoopEntry.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            duration,
            quality,
            achieved,
            isFuture: false,
            score: whoopEntry.score
          });
        } else {
          // Past date with no WHOOP data
          history.push({
            date: currentDate.toISOString(),
            bedtime: null,
            wakeTime: null,
            duration: null,
            quality: null,
            achieved: false,
            isFuture: false
          });
        }

        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setSleepHistory(history); 
      setHistoryError(null);
    } catch (err) {
      console.error('Error fetching sleep history:', err);
      setHistoryError('Failed to load sleep history');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchCurrentGoal();
    }
  }, [isConnected, user]);

  const getQualityIndicator = (score: number | null) => {
    if (!score) return { color: 'text-night-600', bg: 'bg-night-50', text: 'No Data' };
    if (score >= 90) return { color: 'text-green-600', bg: 'bg-green-50', text: 'Excellent' };
    if (score >= 80) return { color: 'text-primary-600', bg: 'bg-primary-50', text: 'Good' };
    if (score >= 70) return { color: 'text-yellow-600', bg: 'bg-yellow-50', text: 'Fair' };
    return { color: 'text-red-600', bg: 'bg-red-50', text: 'Poor' };
  };

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

            {isLoadingHistory ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : historyError ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-2">{historyError}</div>
                <button
                  onClick={() => fetchCurrentGoal()}
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Try Again
                </button>
              </div>
            ) : sleepHistory.length === 0 ? (
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
                {sleepHistory.map((history, index) => {
                  const quality = getQualityIndicator(history.quality);
                  
                  return (
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
                            <div className={`px-3 py-1 rounded-full ${quality.bg} ${quality.color} font-medium text-sm flex items-center gap-1.5`}>
                              <Activity className="w-4 h-4" />
                              <span>{history.quality ? `${history.quality}% - ${quality.text}` : 'No Data'}</span>
                            </div>
                          )}
                        </div>

                        {history.isFuture ? (
                          <div className="flex items-center justify-center py-6">
                            <div className="text-night-600 text-sm">
                              Sleep data will be available after this date
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div>
                                <div className="text-sm text-night-600 mb-1">Bedtime</div>
                                <div className="font-medium text-night-900">
                                  {history.bedtime || 'No Data'}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-night-600 mb-1">Wake Time</div>
                                <div className="font-medium text-night-900">
                                  {history.wakeTime || 'No Data'}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-night-600 mb-1">Duration</div>
                                <div className="font-medium text-night-900">
                                  {history.duration ? `${history.duration.toFixed(1)}h` : 'No Data'}
                                </div>
                              </div>
                            </div>

                            {/* {history.score && (
                              <div className="mt-4 p-4 bg-night-50/50 rounded-lg">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <div className="text-sm text-night-600 mb-1">Sleep Cycles</div>
                                    <div className="font-medium text-night-900">
                                      {history.score.stage_summary.sleep_cycle_count} cycles
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-night-600 mb-1">Efficiency</div>
                                    <div className="font-medium text-night-900">
                                      {Math.round(history.score.sleep_efficiency_percentage)}%
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-night-600 mb-1">Consistency</div>
                                    <div className="font-medium text-night-900">
                                      {Math.round(history.score.sleep_consistency_percentage)}%
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-night-600 mb-1">Respiratory Rate</div>
                                    <div className="font-medium text-night-900">
                                      {history.score.respiratory_rate.toFixed(1)} bpm
                                    </div>
                                  </div>
                                </div>

                                {history.score.stage_summary.disturbance_count > 0 && (
                                  <div className="mt-4 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm text-yellow-600">
                                      {history.score.stage_summary.disturbance_count} sleep disturbances detected
                                    </span>
                                  </div>
                                )}
                              </div>
                            )} */}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}