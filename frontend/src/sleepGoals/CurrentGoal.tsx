import { Clock, Target, Coins, Sparkles, Eye } from "lucide-react"; // Replace with your actual icon imports

const CurrentGoal = ({ currentGoal, setShowSetGoals }: any) => {
  return currentGoal ? (
    <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-xl">
            <Target className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-night-900 font-display">
            Current Sleep Goal
          </h2>
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
            Mode: {currentGoal.mode}
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
        <h2 className="text-xl font-bold text-night-900">
          No Active Sleep Goal
        </h2>
        <p className="text-night-600 max-w-md mx-auto mb-4">
          Set your first sleep goal to start earning rewards for maintaining a
          healthy sleep schedule.
        </p>
        <button
          onClick={() => setShowSetGoals(true)}
          className="px-6 py-3 bg-primary-50 rounded-xl text-primary-600 font-medium hover:bg-primary-100 transition-colors"
        >
          Set Your First Goal
        </button>
      </div>
    </div>
  );
};

export default CurrentGoal;
