import React, { useState, useEffect } from 'react';
import { Coins, Calendar, Trophy, Star, ChevronRight, Gift, Shield, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface SleepData {
  id: number;
  start: string;
  end: string;
  score: {
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
  claimed?: boolean;
}

export function Claims() {
  const [sleepData, setSleepData] = useState<SleepData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claimingId, setClaimingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await fetch('/api/whoop/sleep', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch sleep data');
        }

        const data = await response.json();
        // Add claimed status to each record (this would come from your database in production)
        const processedData = data.records.map((record: SleepData) => ({
          ...record,
          claimed: false // In production, this would be fetched from your database
        }));
        setSleepData(processedData);
      } catch (err) {
        console.error('Error fetching sleep data:', err);
        setError('Failed to load sleep data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSleepData();
  }, []);

  const calculateTokens = (sleep: SleepData) => {
    // Base calculation components
    const baseTokens = 50; // Base reward for logging sleep
    
    // 1. Sleep Performance Score (0-40 tokens)
    const performanceScore = Math.min(40, (sleep.score.sleep_performance_percentage / 100) * 40);
    
    // 2. Sleep Duration Bonus (0-30 tokens)
    const durationHours = sleep.score.stage_summary.total_in_bed_time_milli / (1000 * 60 * 60);
    let durationBonus = 0;
    if (durationHours >= 7 && durationHours <= 9) {
      durationBonus = 30; // Optimal sleep duration
    } else if (durationHours >= 6 && durationHours < 7) {
      durationBonus = 15; // Acceptable sleep duration
    } else if (durationHours > 9) {
      durationBonus = 20; // Too much sleep
    }
    
    // 3. Sleep Quality Multiplier (based on sleep stages)
    const totalSleepTime = sleep.score.stage_summary.total_in_bed_time_milli;
    const deepSleepPercentage = sleep.score.stage_summary.total_slow_wave_sleep_time_milli / totalSleepTime;
    const remSleepPercentage = sleep.score.stage_summary.total_rem_sleep_time_milli / totalSleepTime;
    
    let qualityMultiplier = 1;
    // Ideal: 20-25% deep sleep, 20-25% REM sleep
    if (deepSleepPercentage >= 0.20 && remSleepPercentage >= 0.20) {
      qualityMultiplier = 1.2; // 20% bonus for good sleep composition
    }
    
    // 4. Consistency Bonus (0-20 tokens)
    const consistencyBonus = (sleep.score.sleep_consistency_percentage / 100) * 20;
    
    // 5. Efficiency Bonus (0-20 tokens)
    const efficiencyBonus = (sleep.score.sleep_efficiency_percentage / 100) * 20;
    
    // 6. Sleep Cycles Bonus (0-20 tokens)
    const cyclesBonus = Math.min(20, sleep.score.stage_summary.sleep_cycle_count * 4);
    
    // 7. Disturbance Penalty
    const disturbancePenalty = Math.min(20, sleep.score.stage_summary.disturbance_count * 2);
    
    // Calculate total tokens
    const totalTokens = Math.round(
      (baseTokens +
       performanceScore +
       durationBonus +
       consistencyBonus +
       efficiencyBonus +
       cyclesBonus -
       disturbancePenalty) * qualityMultiplier
    );
    
    return Math.max(0, totalTokens); // Ensure non-negative token amount
  };

  const handleClaim = async (id: number) => {
    setClaimingId(id);
    // TODO: Implement token claiming logic with Supabase
    // This would involve:
    // 1. Marking the sleep record as claimed
    // 2. Creating a token transaction record
    // 3. Updating user's token balance
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setSleepData(prev => prev.map(sleep => 
      sleep.id === id ? { ...sleep, claimed: true } : sleep
    ));
    setClaimingId(null);
  };

  const formatDuration = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const totalAvailable = sleepData
    .filter(sleep => !sleep.claimed)
    .reduce((sum, sleep) => sum + calculateTokens(sleep), 0);

  const totalEarned = sleepData
    .filter(sleep => sleep.claimed)
    .reduce((sum, sleep) => sum + calculateTokens(sleep), 0);

  const currentStreak = sleepData
    .filter(sleep => sleep.score.sleep_performance_percentage >= 85)
    .length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-red-600">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Token Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary-50 rounded-xl">
                <Coins className="w-6 h-6 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold text-night-900 font-display">Token Claims</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-medium text-night-600">Available Tokens</span>
                </div>
                <div className="text-2xl font-bold text-night-900">{totalAvailable} SLEEP</div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-medium text-night-600">Total Earned</span>
                </div>
                <div className="text-2xl font-bold text-night-900">{totalEarned} SLEEP</div>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-medium text-night-600">Current Streak</span>
                </div>
                <div className="text-2xl font-bold text-night-900">{currentStreak} days</div>
              </div>
            </div>
          </div>

          {/* Claimable Rewards */}
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
            <h2 className="text-xl font-bold text-night-900 mb-6">Recent Sleep Performance</h2>
            <div className="space-y-4">
              {sleepData.map((sleep) => (
                <div
                  key={sleep.id}
                  className="group relative bg-white rounded-xl p-6 ring-1 ring-primary-100 hover:ring-primary-300 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-500" />
                        <span className="text-night-600">
                          {format(parseISO(sleep.start), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-sm text-night-600">Sleep Score</div>
                          <div className="font-bold text-night-900">
                            {Math.round(sleep.score.sleep_performance_percentage)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-night-600">Duration</div>
                          <div className="font-bold text-night-900">
                            {formatDuration(sleep.score.stage_summary.total_in_bed_time_milli)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-night-600">Tokens</div>
                          <div className="font-bold text-primary-600">
                            {calculateTokens(sleep)} SLEEP
                          </div>
                        </div>
                      </div>
                    </div>
                    {sleep.claimed ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">Claimed</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaim(sleep.id)}
                        disabled={claimingId === sleep.id}
                        className="group relative px-6 py-2 rounded-xl overflow-hidden transform hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center gap-2 text-white">
                          <span>Claim Tokens</span>
                          {claimingId === sleep.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          )}
                        </div>
                      </button>
                    )}
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