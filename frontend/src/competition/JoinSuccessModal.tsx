import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Trophy, Star, Target, Users } from 'lucide-react';

interface JoinSuccessModalProps {
  show: boolean;
  onClose: () => void;
  competition: {
    name: string;
    targetScore: number;
    participants: string[];
  } | null;
}

export default function JoinSuccessModal({ show, onClose, competition }: JoinSuccessModalProps) {
  if (!competition) return null;

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: it's the consistency that counts.",
    "The difference between try and triumph is just a little umph!",
    "The only way to do great work is to love what you do.",
    "Quality sleep is the foundation of great achievements.",
    "Every night of good sleep brings you closer to your goals."
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-night-950/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4 relative overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-conic from-primary-200/30 via-primary-300/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-[200px] h-[200px] bg-gradient-conic from-primary-300/20 via-primary-200/20 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center relative"
              >
                <PartyPopper className="w-10 h-10 text-primary-600" />
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -right-2 -top-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
                >
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-night-900 mb-2 font-display">
                  Welcome to {competition.name}! 🎉
                </h2>
                <p className="text-night-600 mb-6">
                  You've successfully joined the competition. Get ready to transform your sleep habits!
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-primary-50 rounded-xl p-6 mb-6"
              >
                <p className="text-primary-700 font-medium italic">"{randomQuote}"</p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4 mb-6"
              >
                <div className="bg-night-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-night-700">Target Score</span>
                  </div>
                  <div className="text-xl font-bold text-night-900">{competition.targetScore}%</div>
                </div>
                <div className="bg-night-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-night-700">Competitors</span>
                  </div>
                  <div className="text-xl font-bold text-night-900">{competition.participants.length}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                  Let's Get Started!
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}