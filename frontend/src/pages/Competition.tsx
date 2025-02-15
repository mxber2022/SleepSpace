import React, { useState } from 'react';
import { Trophy, Medal, Crown, Users, ArrowUp, Plus, Calendar, Target, Clock } from 'lucide-react';

interface Competitor {
  rank: number;
  name: string;
  score: number;
  streak: number;
  change: 'up' | 'down' | 'same';
}

interface Competition {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  participants: number;
  targetScore: number;
  prize: string;
}

const activeCompetitions: Competition[] = [
  {
    id: '1',
    name: 'February Sleep Challenge',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    participants: 156,
    targetScore: 85,
    prize: '1000 SLEEP',
  },
  {
    id: '2',
    name: 'Weekend Warriors',
    startDate: '2025-02-15',
    endDate: '2025-02-17',
    participants: 89,
    targetScore: 90,
    prize: '500 SLEEP',
  },
];

const competitors: Competitor[] = [
  { rank: 1, name: 'Sarah K.', score: 98, streak: 7, change: 'up' },
  { rank: 2, name: 'Michael R.', score: 95, streak: 5, change: 'same' },
  { rank: 3, name: 'Emma L.', score: 92, streak: 4, change: 'up' },
  { rank: 4, name: 'James B.', score: 88, streak: 3, change: 'down' },
  { rank: 5, name: 'Lisa M.', score: 85, streak: 2, change: 'up' },
];

export function Competition() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCompetition, setNewCompetition] = useState({
    name: '',
    startDate: '',
    endDate: '',
    targetScore: 85,
    prize: '',
  });

  const handleCreateCompetition = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save competition to Supabase
    console.log('Competition created:', newCompetition);
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Active Competitions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-50 rounded-xl">
                  <Trophy className="w-6 h-6 text-primary-600" />
                </div>
                <h1 className="text-2xl font-bold text-night-900 font-display">Active Competitions</h1>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-xl hover:bg-primary-100 transition-colors"
              >
                <Plus className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">Create Competition</span>
              </button>
            </div>

            <div className="grid gap-4">
              {activeCompetitions.map((competition) => (
                <div
                  key={competition.id}
                  className="group relative bg-white rounded-xl p-6 ring-1 ring-primary-100 hover:ring-primary-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-night-900">{competition.name}</h3>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary-500" />
                        <span className="text-sm text-night-600">{competition.participants} joined</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-500" />
                        <span className="text-sm text-night-600">
                          {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary-500" />
                        <span className="text-sm text-night-600">Target Score: {competition.targetScore}+</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary-500" />
                        <span className="text-sm text-night-600">Prize: {competition.prize}</span>
                      </div>
                    </div>
                    <button className="w-full bg-primary-50 py-2 rounded-lg text-primary-600 font-medium hover:bg-primary-100 transition-colors">
                      Join Competition
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-50 rounded-xl">
                  <Medal className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-night-900 font-display">Current Leaderboard</h2>
              </div>
            </div>

            <div className="space-y-4">
              {competitors.map((competitor) => (
                <div
                  key={competitor.rank}
                  className="group relative bg-white rounded-xl p-6 ring-1 ring-primary-100 hover:ring-primary-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          competitor.rank <= 3 ? 'bg-primary-100' : 'bg-night-100'
                        }`}>
                          {competitor.rank <= 3 ? (
                            <Crown className={`w-4 h-4 ${
                              competitor.rank === 1 ? 'text-primary-600' : 'text-primary-500'
                            }`} />
                          ) : (
                            <span className="text-sm font-medium text-night-600">
                              {competitor.rank}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-night-900">{competitor.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Medal className="w-4 h-4 text-primary-400" />
                            <span className="text-sm text-night-600">
                              {competitor.streak} day streak
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-night-900">{competitor.score}</div>
                        <div className="text-sm text-night-600">Sleep Score</div>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        competitor.change === 'up' ? 'bg-green-100' : 
                        competitor.change === 'down' ? 'bg-red-100' : 'bg-night-100'
                      }`}>
                        <ArrowUp className={`w-4 h-4 ${
                          competitor.change === 'up' ? 'text-green-600' :
                          competitor.change === 'down' ? 'text-red-600 rotate-180' : 'text-night-400'
                        } transition-transform`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Competition Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-night-950/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-night-900 mb-6 font-display">Create Competition</h2>
            <form onSubmit={handleCreateCompetition} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-night-700 mb-2">
                  Competition Name
                </label>
                <input
                  type="text"
                  value={newCompetition.name}
                  onChange={(e) => setNewCompetition({ ...newCompetition, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., March Sleep Challenge"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-night-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newCompetition.startDate}
                    onChange={(e) => setNewCompetition({ ...newCompetition, startDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-night-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newCompetition.endDate}
                    onChange={(e) => setNewCompetition({ ...newCompetition, endDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-night-700 mb-2">
                  Target Sleep Score
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newCompetition.targetScore}
                  onChange={(e) => setNewCompetition({ ...newCompetition, targetScore: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-night-700 mb-2">
                  Prize Pool
                </label>
                <input
                  type="text"
                  value={newCompetition.prize}
                  onChange={(e) => setNewCompetition({ ...newCompetition, prize: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 1000 SLEEP"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-primary-100 text-night-600 hover:bg-primary-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:opacity-90 transition-opacity"
                >
                  Create Competition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}