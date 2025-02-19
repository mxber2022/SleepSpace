import React, { useState, useEffect } from 'react';
import { 
  Trophy, Users, ArrowUp, Plus, Calendar, Target, 
  Clock, Loader2, XCircle, Coins, Share2, User,
  Copy, Check, ExternalLink
} from 'lucide-react';
import { useCompetition, Competition as CompetitionType } from '../hooks/useCompetition';
import { useAppKitAccount } from '@reown/appkit/react';
import { motion, AnimatePresence } from 'framer-motion';
import CreateCompetition from '../competition/CreateCompetition';
import ParticipantList from '../competition/ParticipantList';
import JoinSuccessModal from '../competition/JoinSuccessModal';

export function Competition() {
  const { isConnected, address } = useAppKitAccount();
  const { createCompetition, joinCompetition, getCompetitions, error: competitionError } = useCompetition();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [competitions, setCompetitions] = useState<CompetitionType[]>([]);
  const [joiningCompetitions, setJoiningCompetitions] = useState<{ [key: number]: boolean }>({});
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [expandedCompetition, setExpandedCompetition] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showJoinSuccess, setShowJoinSuccess] = useState(false);
  const [joinedCompetition, setJoinedCompetition] = useState<CompetitionType | null>(null);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  useEffect(() => {
    if (competitionError) {
      setError(competitionError);
    }
  }, [competitionError]);

  const fetchCompetitions = async () => {
    setIsFetching(true);
    try {
      const comps = await getCompetitions();
      setCompetitions(comps);
      setError(null);
    } catch (err) {
      setError('Failed to fetch competitions');
    } finally {
      setIsFetching(false);
    }
  };

  const handleJoinCompetition = async (competitionId: number) => {
    if (!isConnected) {
      setShowError(true);
      return;
    }

    setJoiningCompetitions(prev => ({ ...prev, [competitionId]: true }));
    try {
      const success = await joinCompetition(competitionId);
      if (success) {
        await fetchCompetitions();
        setError(null);
        
        // Find the joined competition and show success modal
        const competition = competitions.find(c => c.id === competitionId);
        if (competition) {
          setJoinedCompetition(competition);
          setShowJoinSuccess(true);
        }
      }
    } catch (err) {
      setError('Failed to join competition');
    } finally {
      setJoiningCompetitions(prev => ({ ...prev, [competitionId]: false }));
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleCopyLink = (competitionId: number) => {
    const shareUrl = `${window.location.origin}/competition?join=${competitionId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(competitionId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isCreator = (competition: CompetitionType) => {
    return address && competition.creator.toLowerCase() === address.toLowerCase();
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

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg text-red-600 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {isFetching ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
              </div>
            ) : competitions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-night-900 mb-2">No Active Competitions</h3>
                <p className="text-night-600 mb-6">Create your first competition and invite friends to join!</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Competition</span>
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {competitions.map((competition) => (
                  <div
                    key={competition.id}
                    className="group relative bg-white rounded-xl p-6 ring-1 ring-primary-100 hover:ring-primary-300 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold text-night-900">{competition.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-night-600">
                            <User className="w-4 h-4" />
                            <span>
                              {isCreator(competition) ? (
                                <span className="text-primary-600">Created by you</span>
                              ) : (
                                <>Created by {truncateAddress(competition.creator)}</>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary-500" />
                            <span className="text-sm text-night-600">{competition.participants.length} joined</span>
                          </div>
                          <button
                            onClick={() => handleCopyLink(competition.id)}
                            className="p-2 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors relative group"
                          >
                            {copiedId === competition.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <>
                                <Share2 className="w-4 h-4" />
              
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary-500" />
                          <span className="text-sm text-night-600">
                            {competition.startDate.toLocaleDateString()} - {competition.endDate.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary-500" />
                          <span className="text-sm text-night-600">Target Score: {competition.targetScore}+</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-primary-500" />
                          <span className="text-sm text-night-600">Prize: {competition.prizePool} SLEEP</span>
                        </div>
                      </div>

                      <div className="flex gap-4 mb-4">
                        {!competition.participants.includes(address || '') ? (
                          <button
                            onClick={() => handleJoinCompetition(competition.id)}
                            disabled={joiningCompetitions[competition.id] || !competition.isActive}
                            className="flex-1 bg-primary-50 py-2 rounded-lg text-primary-600 font-medium hover:bg-primary-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                          >
                            {joiningCompetitions[competition.id] ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                                <span>Joining...</span>
                              </div>
                            ) : (
                              <span>{competition.isActive ? 'Join Competition' : 'Competition Ended'}</span>
                            )}
                          </button>
                        ) : (
                          <div className="flex-1 bg-green-50 py-2 rounded-lg text-green-600 font-medium text-center">
                            You've Joined
                          </div>
                        )}
                        <button
                          onClick={() => setExpandedCompetition(expandedCompetition === competition.id ? null : competition.id)}
                          className="px-4 py-2 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors"
                        >
                          <Users className="w-4 h-4" />
                        </button>
                      </div>

                      {expandedCompetition === competition.id && (
                        <ParticipantList 
                          participants={competition.participants}
                          creator={competition.creator}
                        />
                      )}

                      {/* Shareable Link */}
                      {expandedCompetition === competition.id && (
                        <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-night-600">Shareable Link:</div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono text-night-600">
                                {`${window.location.origin}/competition?join=${competition.id}`}
                              </span>
                              <button
                                onClick={() => handleCopyLink(competition.id)}
                                className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
                              >
                                {copiedId === competition.id ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 text-primary-600" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Create Competition Modal */}
          <CreateCompetition 
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
          />

          {/* Join Success Modal */}
          <JoinSuccessModal
            show={showJoinSuccess}
            onClose={() => setShowJoinSuccess(false)}
            competition={joinedCompetition}
          />
        </div>
      </div>
    </div>
  );
}