import React, { useState, useEffect } from 'react';
import { 
  Moon, Clock, Battery, Zap, Calendar, ArrowRight, CheckCircle, XCircle, 
  Coins, Timer, Sparkles, PartyPopper as Party, Lock, Lock as LockOpen, 
  Eye, Target, Shield, AlertTriangle, HelpCircle 
} from 'lucide-react';
import { useSleepGoals } from '../hooks/useSleepGoals';
import { useAppKitAccount } from '@reown/appkit/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';

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

type GoalMode = 'secure' | 'challenge';

interface GoalModeOption {
  id: GoalMode;
  name: string;
  description: string;
  icon: React.ReactNode;
  riskLevel: string;
  potential: string;
}

const goalModes: GoalModeOption[] = [
  {
    id: 'secure',
    name: 'Secure Mode',
    description: 'Stake is locked until maturity date while earning rewards. No risk of losing your stake.',
    icon: <Shield className="w-6 h-6" />,
    riskLevel: 'No Risk',
    potential: '1x-2x Returns'
  },
  {
    id: 'challenge',
    name: 'Challenge Mode',
    description: 'Higher rewards but risk losing a portion of your stake if goals are not met.',
    icon: <Target className="w-6 h-6" />,
    riskLevel: 'Medium Risk',
    potential: '2x-5x Returns'
  }
];

export function SleepGoals() {
  const { isConnected } = useAppKitAccount();
  const { setSleepGoal, getUserGoal, isLoading, error } = useSleepGoals();
  const [goals, setGoals] = useState({
    bedtime: '22:00',
    wakeTime: '06:00',
    duration: 8,
    durationMinutes: 0,
    quality: 85,
    depositAmount: '100',
    goalDuration: 7,
    mode: 'secure' as GoalMode
  });
  const [currentGoal, setCurrentGoal] = useState<any>(null);
  const [showError, setShowError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [showSetGoals, setShowSetGoals] = useState(false);
  const [showModeTooltip, setShowModeTooltip] = useState(false);

  useEffect(() => {
    if (isConnected) {
      fetchCurrentGoal();
    }
  }, [isConnected]);

  useEffect(() => {
    // Calculate duration whenever bedtime or wake time changes
    const calculateDuration = () => {
      const bedTime = new Date(`2000-01-01T${goals.bedtime}`);
      const wakeTime = new Date(`2000-01-01T${goals.wakeTime}`);
      
      // If wake time is earlier than bedtime, add one day to wake time
      if (wakeTime < bedTime) {
        wakeTime.setDate(wakeTime.getDate() + 1);
      }
      
      const durationMs = wakeTime.getTime() - bedTime.getTime();
      const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
      const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setGoals(prev => ({
        ...prev,
        duration: durationHours,
        durationMinutes: durationMinutes
      }));
    };

    calculateDuration();
  }, [goals.bedtime, goals.wakeTime]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      setShowError(true);
      return;
    }

    try {
      setIsApproving(true);
      setCurrentStep(2);
      
      // Simulate approval delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsApproving(false);
      setCurrentStep(3);

      const success = await setSleepGoal(
        goals.bedtime,
        goals.wakeTime,
        goals.duration + (goals.durationMinutes / 60), // Convert to decimal hours
        goals.quality,
        goals.depositAmount,
        goals.goalDuration,
        goals.mode
      );

      if (success) {
        setShowSuccess(true);
        fetchCurrentGoal();
        // Reset after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
          setCurrentStep(1);
          setShowSetGoals(false);
        }, 5000);
      }
    } catch (err) {
      console.error('Error setting sleep goal:', err);
      setCurrentStep(1);
    }
  };

  const getGoalModeInfo = (mode: GoalMode) => {
    return goalModes.find(m => m.id === mode)!;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Celebration Modal */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-night-900/80 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-conic from-primary-300/30 via-primary-200/20 to-transparent blur-2xl"></div>
                  <div className="relative text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center"
                    >
                      <Party className="w-10 h-10 text-primary-600" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-night-900 mb-4 font-display">
                      Goal Set Successfully! 🎉
                    </h2>
                    <p className="text-night-600 mb-6">
                      You're on your way to better sleep and earning rewards. Keep up the great work!
                    </p>
                    <div className="flex justify-center gap-4">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="px-4 py-2 bg-primary-50 rounded-lg text-primary-600 font-medium"
                      >
                        {goals.duration}h {goals.durationMinutes}m Sleep Goal
                      </motion.div>
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="px-4 py-2 bg-primary-50 rounded-lg text-primary-600 font-medium"
                      >
                        {goals.depositAmount} SLEEP Staked
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Current Goal Card */}
          {currentGoal ? (
            <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 rounded-xl">
                    <Target className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-night-900 font-display">Current Sleep Goal</h2>
                </div>
                <button
                  onClick={() => setShowSetGoals(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl text-primary-600 hover:bg-primary-100 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Set New Goal</span>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-primary-50/50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-primary-500" />
                    <h3 className="font-medium text-night-900">Sleep Schedule</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-night-600">
                      <span>Bedtime</span>
                      <span className="font-medium">{currentGoal.bedtime}</span>
                    </div>
                    <div className="flex justify-between text-night-600">
                      <span>Wake Time</span>
                      <span className="font-medium">{currentGoal.wakeTime}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50/50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-primary-500" />
                    <h3 className="font-medium text-night-900">Goal Metrics</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-night-600">
                      <span>Duration</span>
                      <span className="font-medium">{currentGoal.duration}h</span>
                    </div>
                    <div className="flex justify-between text-night-600">
                      <span>Quality</span>
                      <span className="font-medium">{currentGoal.quality}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50/50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Coins className="w-4 h-4 text-primary-500" />
                    <h3 className="font-medium text-night-900">Stake Details</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-night-600">
                      <span>Amount</span>
                      <span className="font-medium">{currentGoal.depositAmount} SLEEP</span>
                    </div>
                    <div className="flex justify-between text-night-600">
                      <span>Duration</span>
                      <span className="font-medium">{currentGoal.goalDuration} days</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                <div className="flex items-center gap-2 text-primary-600">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Potential Reward: {Number(currentGoal.depositAmount) * 2} SLEEP
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-primary-50 rounded-full">
                  <Target className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-night-900">No Active Sleep Goal</h2>
                <p className="text-night-600 max-w-md mx-auto mb-4">
                  Set your first sleep goal to start earning rewards for maintaining a healthy sleep schedule.
                </p>
                <button
                  onClick={() => setShowSetGoals(true)}
                  className="px-6 py-3 bg-primary-50 rounded-xl text-primary-600 font-medium hover:bg-primary-100 transition-colors"
                >
                  Set Your First Goal
                </button>
              </div>
            </div>
          )}

          {/* Set Goals Form */}
          <AnimatePresence>
            {showSetGoals && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-50 rounded-xl">
                        <Moon className="w-6 h-6 text-primary-600" />
                      </div>
                      <h1 className="text-2xl font-bold text-night-900 font-display">Set Your Sleep Goals</h1>
                    </div>
                    
                    {/* Progress Steps */}
                    <div className="flex items-center gap-2">
                      <Step number={1} current={currentStep} title="Set Goals" />
                      <div className="w-8 h-px bg-primary-100"></div>
                      <Step number={2} current={currentStep} title="Approve SLEEP" />
                      <div className="w-8 h-px bg-primary-100"></div>
                      <Step number={3} current={currentStep} title="Confirm" />
                    </div>
                  </div>

                  {showError && !isConnected && (
                    <div className="mb-6 p-4 bg-red-50 rounded-lg text-red-600 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      <span>Please connect your wallet to set sleep goals</span>
                    </div>
                  )}

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 rounded-lg text-red-600 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Goal Mode Toggle */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm font-medium text-night-700">
                          Goal Mode
                          <div 
                            className="relative"
                            onMouseEnter={() => setShowModeTooltip(true)}
                            onMouseLeave={() => setShowModeTooltip(false)}
                          >
                            <HelpCircle className="w-4 h-4 text-night-400 cursor-help" />
                            
                            {/* Tooltip */}
                            <AnimatePresence>
                              {showModeTooltip && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute left-1/2 bottom-full mb-2 w-80 -translate-x-1/2 p-4 bg-white rounded-xl shadow-lg ring-1 ring-primary-100 z-50"
                                >
                                  <div className="space-y-4">
                                    {goalModes.map(mode => (
                                      <div key={mode.id} className="flex items-start gap-3">
                                        <div className="p-2 bg-primary-50 rounded-lg shrink-0">
                                          {mode.icon}
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-night-900 mb-1">{mode.name}</h4>
                                          <p className="text-sm text-night-600">{mode.description}</p>
                                          <div className="flex items-center gap-4 mt-2 text-xs">
                                            <span className="text-night-600">Risk: {mode.riskLevel}</span>
                                            <span className="text-night-600">Returns: {mode.potential}</span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-white transform rotate-45 -translate-x-1/2 ring-1 ring-primary-100 ring-r-0 ring-b-0"></div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </label>
                        
                        {/* Toggle Switch */}
                        <button
  type="button"
  onClick={() => setGoals(prev => ({
    ...prev,
    mode: prev.mode === 'secure' ? 'challenge' : 'secure'
  }))}
  className="relative inline-flex items-center h-6 w-14 rounded-full transition-colors duration-300 focus:outline-none"
  style={{
    backgroundColor: goals.mode === 'secure' ? '#CBD5E0' : '#FB7185',
  }}
>
  <span className="sr-only">Toggle goal mode</span>
  <span
    className={`absolute left-1 h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-300 ease-in-out ${
      goals.mode === 'secure' ? 'translate-x-0' : 'translate-x-8'
    }`}
  />
  <span
    className={`absolute inset-0 flex items-center justify-between px-2 text-xs font-medium transition-colors duration-300 ${
      goals.mode === 'secure' ? 'text-gray-700' : 'text-white'
    }`}
  >
    <span>{goals.mode === 'secure' ? 'Safe' : 'Risk'}</span>
  </span>
</button>





                      </div>

                      {/* Mode Info Banner */}
                      <div className={`p-4 rounded-xl ${
                        goals.mode === 'secure' 
                          ? 'bg-primary-50/50 text-primary-700' 
                          : 'bg-red-50/50 text-red-700'
                      }`}>
                        <div className="flex items-start gap-3">
                          {goals.mode === 'secure' ? (
                            <Shield className="w-5 h-5 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium mb-1">
                              {getGoalModeInfo(goals.mode).name}
                            </p>
                            <p className="text-sm opacity-90">
                              {getGoalModeInfo(goals.mode).description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <label className="block">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium text-night-700">Bedtime</span>
                          </div>
                          <input
                            type="time"
                            value={goals.bedtime}
                            onChange={(e) => setGoals({ ...goals, bedtime: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl bg-white text-night-900 outline-none ring-1 ring-primary-100 focus:ring-2 focus:ring-primary-500 transition-all"
                          />
                        </label>

                        <label className="block">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium text-night-700">Wake Time</span>
                          </div>
                          <input
                            type="time"
                            value={goals.wakeTime}
                            onChange={(e) => setGoals({ ...goals, wakeTime: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl bg-white text-night-900 outline-none ring-1 ring-primary-100 focus:ring-2 focus:ring-primary-500 transition-all"
                          />
                        </label>

                        <label className="block">
                          <div className="flex items-center gap-2 mb-2">
                            <Timer className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium text-night-700">Goal Duration (days)</span>
                          </div>
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={goals.goalDuration}
                            onChange={(e) => setGoals({ ...goals, goalDuration: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 rounded-xl bg-white text-night-900 outline-none ring-1 ring-primary-100 focus:ring-2 focus:ring-primary-500 transition-all"
                          />
                        </label>
                      </div>

                      <div className="space-y-4">
                        <label className="block">
                          <div className="flex items-center gap-2 mb-2">
                            <Battery className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium text-night-700">Sleep Duration</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={`${goals.duration}h ${goals.durationMinutes}m`}
                              disabled
                              className="w-full px-4 py-2 rounded-xl bg-primary-50 text-night-900 outline-none ring-1 ring-primary-100 cursor-not-allowed"
                            />
                          </div>
                        </label>

                        <label className="block">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium text-night-700">Sleep Quality Goal (%)</span>
                          </div>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={goals.quality}
                            onChange={(e) => setGoals({ ...goals, quality: Number(e.target.value) })}
                            className="w-full px-4 py-2 rounded-xl bg-white text-night-900 outline-none ring-1 ring-primary-100 focus:ring-2 focus:ring-primary-500 transition-all"
                          />
                        </label>

                        <label className="block">
                          <div className="flex items-center gap-2 mb-2">
                            <Coins className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium text-night-700">Deposit Amount (SLEEP)</span>
                          </div>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={goals.depositAmount}
                            onChange={(e) => setGoals({ ...goals, depositAmount: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl bg-white text-night-900 outline-none ring-1 ring-primary-100 focus:ring-2 focus:ring-primary-500 transition-all"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setShowSetGoals(false)}
                        className="flex-1 px-6 py-4 rounded-xl bg-night-100 text-night-600 hover:bg-night-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading || !isConnected || currentStep > 1}
                        className="flex-1 group relative px-8 py-4 overflow-hidden rounded-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center justify-center gap-2">
                          {isLoading || isApproving ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-white font-medium tracking-wide">
                                {isApproving ? 'Approving SLEEP Tokens...' : 'Setting Goal...'}
                              </span>
                            </>
                          ) : (
                            <>
                              {currentStep === 1 && (
                                <span className="text-white font-medium tracking-wide">Continue to Approve</span>
                              )}
                              {currentStep === 2 && (
                                <span className="text-white font-medium tracking-wide">Approving...</span>
                              )}
                              {currentStep === 3 && (
                                <span className="text-white font-medium tracking-wide">Confirm Goal</span>
                              )}
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                 ```tsx
                          {new Date(history.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        {history.achieved ? (
                          <div className="flex items-center gap-1 te
                        )
                        }
              )
              )
              }
  )
}xt-green-600 bg-green-50 px-2 py-1 rounded-lg">
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

function Step({ number, current, title }: { number: number; current: number; title: string }) {
  const isActive = current >= number;
  const isPast = current > number;

  return (
    <div className="flex items-center gap-2">
      <div className={`relative w-8 h-8 rounded-full flex items-center justify-center ${
        isActive ? 'bg-primary-100' : 'bg-night-100'
      }`}>
        {isPast ? (
          <CheckCircle className="w-4 h-4 text-primary-600" />
        ) : (
          <span className={`text-sm font-medium ${
            isActive ? 'text-primary-600' : 'text-night-400'
          }`}>{number}</span>
        )}
        {isActive && (
          <div className="absolute inset-0 bg-primary-400/20 rounded-full animate-ping"></div>
        )}
      </div>
      <span className={`text-sm ${
        isActive ? 'text-primary-600 font-medium' : 'text-night-400'
      }`}>{title}</span>
    </div>
  );
}
