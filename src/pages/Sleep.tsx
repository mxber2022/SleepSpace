import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Moon, Clock, Battery, Activity, Brain, Heart, Calendar, ChevronLeft, ChevronRight, ArrowRight, Sparkles, Shield, BedDouble } from 'lucide-react';
import { format, parseISO, subDays } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';

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
}

const COLORS = ['#E31B5E', '#FB7AA1', '#FECDD6'];

export function Sleep() {
  const { user, login } = useAuth();
  const [sleepData, setSleepData] = useState<SleepData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSleep, setSelectedSleep] = useState<SleepData | null>(null);
  useEffect(() => {
    
    const fetchSleepData = async () => {
      try {
        if (!user) return;

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
        setSleepData(data.records);
        setSelectedSleep(data.records[0]); // Set first sleep record as selected
      } catch (err) {
        console.error('Error fetching sleep data:', err);
        setError('Failed to load sleep data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSleepData();
  }, [user]);

  if (!user) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Connection Prompt Card */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg ring-1 ring-primary-100 relative overflow-hidden">
              {/* Background Decorations */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-conic from-primary-200/30 via-primary-300/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-[200px] h-[200px] bg-gradient-conic from-primary-300/20 via-primary-200/20 to-transparent rounded-full blur-3xl"></div>
              </div>

              <div className="relative">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 relative group">
                    <div className="absolute inset-0 bg-primary-100 rounded-2xl transform transition-transform group-hover:scale-110"></div>
                    <BedDouble className="w-8 h-8 text-primary-600 relative" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-night-900 mb-4 font-display">
                    Connect Your WHOOP Device
                  </h1>
                  <p className="text-night-600 text-lg max-w-2xl">
                    Transform your sleep data into rewards. Connect your WHOOP device to start tracking your sleep performance and earning tokens.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-primary-50/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Shield className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="font-semibold text-night-900">Privacy First</h3>
                    </div>
                    <p className="text-night-600 text-sm">
                      Your sleep data is protected using advanced encryption and zero-knowledge proofs.
                    </p>
                  </div>

                  <div className="bg-primary-50/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Activity className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="font-semibold text-night-900">Smart Analysis</h3>
                    </div>
                    <p className="text-night-600 text-sm">
                      Get detailed insights into your sleep patterns and performance metrics.
                    </p>
                  </div>

                  <div className="bg-primary-50/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Sparkles className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="font-semibold text-night-900">Earn Rewards</h3>
                    </div>
                    <p className="text-night-600 text-sm">
                      Convert quality sleep into tokens through our innovative reward system.
                    </p>
                  </div>
                </div>

                {/* Connect Button */}
                <div className="flex justify-center">
                  <button
                    onClick={login}
                    disabled={isLoading}
                    className="group relative px-8 py-4 overflow-hidden rounded-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA1NiA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjggMEwwIDQ5aDU2TDI4IDB6IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] bg-[length:20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center gap-3">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span className="text-white font-semibold tracking-wide">Connect WHOOP</span>
                          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDuration = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatHours = (milliseconds: number) => {
    return (milliseconds / (1000 * 60 * 60)).toFixed(1);
  };

  const getSleepStagesData = (sleep: SleepData) => {
    return [
      {
        name: 'Deep Sleep',
        value: sleep.score.stage_summary.total_slow_wave_sleep_time_milli,
      },
      {
        name: 'REM Sleep',
        value: sleep.score.stage_summary.total_rem_sleep_time_milli,
      },
      {
        name: 'Light Sleep',
        value: sleep.score.stage_summary.total_light_sleep_time_milli,
      },
    ];
  };

  const getWeeklyTrendData = () => {
    return sleepData.slice(0, 7).map(sleep => ({
      date: format(parseISO(sleep.start), 'EEE'),
      fullDate: format(parseISO(sleep.start), 'MMM d'),
      performance: Math.round(sleep.score.sleep_performance_percentage),
      efficiency: Math.round(sleep.score.sleep_efficiency_percentage),
      consistency: Math.round(sleep.score.sleep_consistency_percentage),
      hours: Number(formatHours(sleep.score.stage_summary.total_in_bed_time_milli))
    })).reverse();
  };

  const navigateSleep = (direction: 'prev' | 'next') => {
    if (!selectedSleep) return;
    const currentIndex = sleepData.findIndex(sleep => sleep.id === selectedSleep.id);
    if (direction === 'prev' && currentIndex < sleepData.length - 1) {
      setSelectedSleep(sleepData[currentIndex + 1]);
    } else if (direction === 'next' && currentIndex > 0) {
      setSelectedSleep(sleepData[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-50 rounded-xl">
                  <Moon className="w-6 h-6 text-primary-600" />
                </div>
                <h1 className="text-2xl font-bold text-night-900 font-display">Sleep Performance</h1>
              </div>
              {selectedSleep && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigateSleep('prev')}
                    className="p-2 rounded-lg hover:bg-primary-50 transition-colors"
                    disabled={sleepData.indexOf(selectedSleep) === sleepData.length - 1}
                  >
                    <ChevronLeft className="w-5 h-5 text-night-600" />
                  </button>
                  <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-primary-600" />
                    <span className="font-medium text-night-900">
                      {format(parseISO(selectedSleep.start), 'MMMM d, yyyy')}
                    </span>
                  </div>
                  <button
                    onClick={() => navigateSleep('next')}
                    className="p-2 rounded-lg hover:bg-primary-50 transition-colors"
                    disabled={sleepData.indexOf(selectedSleep) === 0}
                  >
                    <ChevronRight className="w-5 h-5 text-night-600" />
                  </button>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : (
              <div className="space-y-8">
                {/* Weekly Trends Chart */}
                <div className="bg-white rounded-xl p-6 ring-1 ring-primary-100">
                  <h2 className="text-lg font-semibold text-night-900 mb-4">Weekly Sleep Trends</h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getWeeklyTrendData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis 
                          dataKey="fullDate" 
                          tick={{ fill: '#475569' }}
                          axisLine={{ stroke: '#E2E8F0' }}
                        />
                        <YAxis 
                          yAxisId="left" 
                          tick={{ fill: '#475569' }}
                          axisLine={{ stroke: '#E2E8F0' }}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis 
                          yAxisId="right" 
                          orientation="right"
                          tick={{ fill: '#475569' }}
                          axisLine={{ stroke: '#E2E8F0' }}
                          tickFormatter={(value) => `${value}h`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number, name: string) => [
                            name === 'Hours' ? `${value}h` : `${value}%`,
                            name
                          ]}
                        />
                        <Legend />
                        <Line 
                          yAxisId="left" 
                          type="monotone" 
                          dataKey="performance" 
                          stroke="#E31B5E" 
                          name="Performance" 
                          strokeWidth={2}
                          dot={{ fill: '#E31B5E', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          yAxisId="left" 
                          type="monotone" 
                          dataKey="efficiency" 
                          stroke="#FB7AA1" 
                          name="Efficiency" 
                          strokeWidth={2}
                          dot={{ fill: '#FB7AA1', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          yAxisId="right" 
                          type="monotone" 
                          dataKey="hours" 
                          stroke="#4F46E5" 
                          name="Hours" 
                          strokeWidth={2}
                          dot={{ fill: '#4F46E5', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Latest Sleep Details */}
                {selectedSleep && (
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Sleep Stages Distribution */}
                    <div className="bg-white rounded-xl p-6 ring-1 ring-primary-100">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-night-900">Sleep Stages Distribution</h2>
                        <div className="text-sm text-night-600">
                          {format(parseISO(selectedSleep.start), 'h:mm a')} - {format(parseISO(selectedSleep.end), 'h:mm a')}
                        </div>
                      </div>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={getSleepStagesData(selectedSleep)}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, value }) => `${name} (${formatDuration(value)})`}
                            >
                              {getSleepStagesData(selectedSleep).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value: number) => formatDuration(value)}
                              contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #E2E8F0',
                                borderRadius: '8px'
                              }}
                            />
                            <Legend 
                              formatter={(value, entry) => (
                                <span className="text-night-600">{value}</span>
                              )}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Sleep Metrics */}
                    <div className="bg-white rounded-xl p-6 ring-1 ring-primary-100">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-night-900">Sleep Metrics</h2>
                        <div className="text-sm text-night-600">
                          Total: {formatDuration(selectedSleep.score.stage_summary.total_in_bed_time_milli)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary-50/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Battery className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium text-night-600">Efficiency</span>
                          </div>
                          <div className="text-xl font-bold text-night-900">
                            {Math.round(selectedSleep.score.sleep_efficiency_percentage)}%
                          </div>
                        </div>

                        <div className="bg-primary-50/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium text-night-600">Consistency</span>
                          </div>
                          <div className="text-xl font-bold text-night-900">
                            {Math.round(selectedSleep.score.sleep_consistency_percentage)}%
                          </div>
                        </div>

                        <div className="bg-primary-50/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium text-night-600">Cycles</span>
                          </div>
                          <div className="text-xl font-bold text-night-900">
                            {selectedSleep.score.stage_summary.sleep_cycle_count}
                          </div>
                        </div>

                        <div className="bg-primary-50/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium text-night-600">Respiratory Rate</span>
                          </div>
                          <div className="text-xl font-bold text-night-900">
                            {selectedSleep.score.respiratory_rate.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sleep History */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-night-900">Sleep History</h2>
                  {sleepData.map((sleep) => (
                    <button
                      key={sleep.id}
                      onClick={() => setSelectedSleep(sleep)}
                      className={`w-full text-left group relative bg-white rounded-xl p-6 ring-1 ${
                        selectedSleep?.id === sleep.id ? 'ring-primary-400 bg-primary-50/10' : 'ring-primary-100'
                      } hover:ring-primary-300 transition-all duration-300`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                      <div className="relative flex items-center justify-between">
                        <div>
                          <div className="text-sm text-night-600 mb-1">
                            {format(parseISO(sleep.start), 'EEEE, MMMM d, yyyy')}
                          </div>
                          <div className="flex items-center gap-4 text-night-600">
                            <span>{format(parseISO(sleep.start), 'h:mm a')} - {format(parseISO(sleep.end), 'h:mm a')}</span>
                            <span className="text-primary-600">
                              {formatDuration(sleep.score.stage_summary.total_in_bed_time_milli)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary-600">
                            {Math.round(sleep.score.sleep_performance_percentage)}%
                          </div>
                          <div className="text-sm text-night-600">Performance</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}