import { 
    Moon, Clock, Battery, Zap, Calendar, ArrowRight, CheckCircle, XCircle, 
    Coins, Timer, Sparkles, PartyPopper as Party, Lock, Lock as LockOpen, 
    Eye, Target, Shield, AlertTriangle, HelpCircle 
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSleepGoals } from '../hooks/useSleepGoals';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppKitAccount } from '@reown/appkit/react';
import { ethers } from 'ethers';
import GoalSuccessModal from './GoalSuccessModal';

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

export default function SetGoalForm({ setShowSetGoals }: { setShowSetGoals: (show: boolean) => void }) {

    const [showError, setShowError] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const { setSleepGoal, getUserGoal, isLoading, error, approvingStatus } = useSleepGoals();
    const [isApproving, setIsApproving] = useState(false);
   // const [showSetGoals] = useState(false);
    const [showModeTooltip, setShowModeTooltip] = useState(false);
    const { isConnected } = useAppKitAccount();
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentGoal, setCurrentGoal] = useState<any>(null);
    
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
    

    useEffect(()=>{
        console.log("something changed: ", approvingStatus);
      
        if(approvingStatus){
          setIsApproving(false);
          setCurrentStep(3);
        }
       
       },[approvingStatus])

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
          // await new Promise(resolve => setTimeout(resolve, 2000));
          // setIsApproving(false);
          // setCurrentStep(3);
          console.log(goals.mode);
          console.log("approvingStatus: ", approvingStatus);
          const success = await setSleepGoal(
            goals.bedtime,
            goals.wakeTime,
            goals.duration,
            goals.quality,
            goals.depositAmount,
            goals.goalDuration,
            String(goals.mode)
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

      
    return(
<>
        <GoalSuccessModal showSuccess={showSuccess} goals={goals} /> 

        <AnimatePresence>
            {  (
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
          </>
    )
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