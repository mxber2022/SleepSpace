import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper as Party } from "lucide-react"; 

const GoalSuccessModal = ({ showSuccess, goals }: any) => {
  return (
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
  );
};

export default GoalSuccessModal;
