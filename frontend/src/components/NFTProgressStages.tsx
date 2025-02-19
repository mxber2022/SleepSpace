import React from 'react';
import { 
  CheckCircle, Shield, Brain, 
  Sparkles, Zap, Moon, Trophy, Target, Clock , BedDouble
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NFTProgressStagesProps {
  currentStage?: number;
  totalStages?: number;
}

export function NFTProgressStages({ currentStage = 1, totalStages = 7 }: NFTProgressStagesProps) {
  const stages = [
    { 
      name: 'Dream Weaver', 
      icon: Moon,
      rarity: 'Common',
      color: 'from-blue-500/20 to-blue-600/20'
    },
    { 
      name: 'Circadian Tuner', 
      icon: Clock,
      rarity: 'Uncommon',
      color: 'from-green-500/20 to-green-600/20'
    },
    { 
      name: 'Restful Pillow', 
      icon: BedDouble,
      rarity: 'Rare',
      color: 'from-purple-500/20 to-purple-600/20'
    },
    { 
      name: 'Lucid Dream Catcher', 
      icon: Brain,
      rarity: 'Epic',
      color: 'from-indigo-500/20 to-indigo-600/20'
    },
    { 
      name: 'Sleep Guardian', 
      icon: Shield,
      rarity: 'Legendary',
      color: 'from-amber-500/20 to-amber-600/20'
    },
    { 
      name: 'Melatonin Crystal', 
      icon: Sparkles,
      rarity: 'Mythical',
      color: 'from-pink-500/20 to-pink-600/20'
    },
    { 
      name: 'Sleep Accelerator', 
      icon: Zap,
      rarity: 'Ultra-Legendary',
      color: 'from-primary-500/20 to-primary-600/20'
    }
  ];

  const getStageColor = (index: number) => {
    if (index + 1 < currentStage) return 'text-primary-600 bg-primary-100';
    if (index + 1 === currentStage) return 'text-primary-600 bg-primary-50';
    return 'text-night-400 bg-night-50';
  };

  const getLineColor = (index: number) => {
    if (index + 1 < currentStage) return 'bg-primary-500';
    if (index + 1 === currentStage) return 'bg-primary-200';
    return 'bg-night-200';
  };

  const getRequirements = (stage: number) => {
    switch(stage) {
      case 1: return "Mint your first Dream Weaver NFT";
      case 2: return "Maintain consistent sleep patterns for 7 days";
      case 3: return "Achieve 8 hours of sleep for 3 consecutive nights";
      case 4: return "Achieve optimal sleep quality with consistent REM cycles";
      case 5: return "Maintain 90%+ sleep score for 7 consecutive days";
      case 6: return "7-8 hours of high-quality sleep for 10 consecutive days";
      case 7: return "Consistently achieve high sleep scores over time";
      default: return "";
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-xl">
            <Trophy className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-night-900 font-display">Your NFT Journey</h3>
            {/* <p className="text-sm text-night-600">Track your progress through the NFT tiers</p> */}
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-lg">
          <Target className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-600">Stage {currentStage} of {totalStages}</span>
        </div>
      </div>
      
      <div className="relative mb-12">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-night-100 -translate-y-1/2 rounded-full">
          <motion.div 
            className="h-full bg-primary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStage - 1) / (stages.length - 1)) * 100}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>

        {/* Stages */}
        <div className="relative z-10 flex justify-between">
          {stages.map((stage, index) => {
            const StageIcon = stage.icon;
            const isCompleted = index + 1 < currentStage;
            const isCurrent = index + 1 === currentStage;
            const isUpcoming = index + 1 > currentStage;

            return (
              <div key={stage.name} className="flex flex-col items-center">
                <motion.div 
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-primary-500 text-white' 
                      : isCurrent
                        ? 'bg-white text-primary-600 ring-4 ring-primary-100'
                        : 'bg-white text-night-400 ring-1 ring-night-200'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 animate-pulse" />
                  ) : (
                    <StageIcon className="w-6 h-6" />
                  )}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary-200/30"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                
                <div className="mt-4 text-center">
                  <p className={`text-sm font-medium ${
                    isCompleted 
                      ? 'text-primary-600' 
                      : isCurrent
                        ? 'text-night-900'
                        : 'text-night-400'
                  }`}>
                    {stage.name}
                  </p>
                  <span className={`text-xs ${
                    isCompleted 
                      ? 'text-primary-500' 
                      : isCurrent
                        ? 'text-primary-500'
                        : 'text-night-400'
                  }`}>
                    {stage.rarity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Stage Info */}
      {/* <div className="bg-gradient-to-r from-primary-50 to-white p-6 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            {React.createElement(stages[currentStage - 1].icon, {
              className: "w-6 h-6 text-primary-600"
            })}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-night-900">
                Current Goal: {stages[currentStage - 1].name}
              </h4>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-600`}>
                {stages[currentStage - 1].rarity}
              </span>
            </div>
            <p className="text-sm text-night-600 mb-4">
              {getRequirements(currentStage)}
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-600">
              <Target className="w-4 h-4" />
              <span>Complete this goal to unlock the next tier</span>
            </div>
          </div>
        </div> 
        </div>
        */}
      
    </div>
  );
}