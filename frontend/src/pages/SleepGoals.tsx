import React, { useState } from 'react';
import { Moon, Clock, Battery, Zap, Calendar, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

interface SleepHistory {
  date: string;
  bedtime: string;
  wakeTime: string;
  duration: number;
  quality: number;
  achieved: boolean;
}

// Mock data - replace with Supabase data
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
  const [goals, setGoals] = useState({
    bedtime: '22:00',
    wakeTime: '06:00',
    duration: 8,
    quality: 85
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save goals to Supabase
    console.log('Goals saved:', goals);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Current Goals */}
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary-50 rounded-xl">
                <Moon className="w-6 h-6 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold text-night-900 font-display">Set Your Sleep Goals</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
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
                </div>

                <div className="space-y-4">
                  <label className="block">
                    <div className="flex items-center gap-2 mb-2">
                      <Battery className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-medium text-night-700">Sleep Duration (hours)</span>
                    </div>
                    <input
                      type="number"
                      min="4"
                      max="12"
                      value={goals.duration}
                      onChange={(e) => setGoals({ ...goals, duration: Number(e.target.value) })}
                      className="w-full px-4 py-2 rounded-xl bg-white text-night-900 outline-none ring-1 ring-primary-100 focus:ring-2 focus:ring-primary-500 transition-all"
                    />
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
                </div>
              </div>

              <button
                type="submit"
                className="w-full group relative px-8 py-4 overflow-hidden rounded-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative text-white font-medium tracking-wide">Save Sleep Goals</span>
              </button>
            </form>
          </div>

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