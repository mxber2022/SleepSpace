import React, { useState, useEffect } from 'react';
import { 
  Trophy, Medal, Crown, Users, ArrowUp, Plus, Calendar, Target, 
  Clock, Loader2, XCircle, Coins, PartyPopper, Share2, Copy, Check,
  Twitter, MessageCircle, Send
} from 'lucide-react';
import { useCompetition, Competition as CompetitionType } from '../hooks/useCompetition';
import { useAppKitAccount } from '@reown/appkit/react';
import { motion, AnimatePresence } from 'framer-motion';

export function Competition() {
  const { isConnected } = useAppKitAccount();
  const { createCompetition, joinCompetition, getCompetitions, isLoading, error } = useCompetition();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState<number | null>(null);
  const [competitions, setCompetitions] = useState<CompetitionType[]>([]);
  const [newCompetition, setNewCompetition] = useState({
    name: '',
    startDate: '',
    endDate: '',
    targetScore: 85,
    prizePool: '',
  });
  const [isJoining, setIsJoining] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    const comps = await getCompetitions();
    setCompetitions(comps);
  };

  const handleCreateCompetition = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      setShowError(true);
      return;
    }

    try {
      const success = await createCompetition(
        newCompetition.name,
        new Date(newCompetition.startDate),
        new Date(newCompetition.endDate),
        newCompetition.targetScore,
        newCompetition.prizePool
      );

      if (success) {
        setShowCreateModal(false);
        await fetchCompetitions();
        setShowSuccessModal(true);
        
        // Reset form
        setNewCompetition({
          name: '',
          startDate: '',
          endDate: '',
          targetScore: 85,
          prizePool: '',
        });
      }
    } catch (err) {
      console.error('Error creating competition:', err);
    }
  };

  const handleJoinCompetition = async (competitionId: number) => {
    if (!isConnected) {
      setShowError(true);
      return;
    }

    setIsJoining(competitionId);
    try {
      const success = await joinCompetition(competitionId);
      if (success) {
        fetchCompetitions();
      }
    } catch (err) {
      console.error('Error joining competition:', err);
    } finally {
      setIsJoining(null);
    }
  };

  const handleCopyInviteLink = (competitionId: number) => {
    const inviteLink = `${window.location.origin}/competition?join=${competitionId}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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

            {isLoading ? (
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
                    className="group relative bg-white rounded-xl p-6 ring-1 ring-primary-100 hover:ring-primary-300 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-night-900">{competition.name}</h3>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary-500" />
                          <span className="text-sm text-night-600">{competition.participants.length} joined</span>
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
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleJoinCompetition(competition.id)}
                          disabled={isJoining === competition.id || !competition.isActive}
                          className="flex-1 bg-primary-50 py-2 rounded-lg text-primary-600 font-medium hover:bg-primary-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                          {isJoining === competition.id ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                              <span>Joining...</span>
                            </div>
                          ) : (
                            <span>{competition.isActive ? 'Join Competition' : 'Competition Ended'}</span>
                          )}
                        </button>
                        <button
                          onClick={() => setShowInviteModal(competition.id)}
                          className="px-4 py-2 bg-primary-50 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Create Competition Modal */}
          <AnimatePresence>
            {showCreateModal && (
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
                  className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4"
                >
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
                        Prize Pool (SLEEP)
                      </label>
                      <input
                        type="text"
                        value={newCompetition.prizePool}
                        onChange={(e) => setNewCompetition({ ...newCompetition, prizePool: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., 1000"
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
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Creating...</span>
                          </div>
                        ) : (
                          'Create Competition'
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Modal */}
          <AnimatePresence>
            {showSuccessModal && (
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
                  className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 bg-primary-50 rounded-full mx-auto mb-6 flex items-center justify-center"
                  >
                    <PartyPopper className="w-8 h-8 text-primary-600" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-night-900 mb-4">Competition Created! 🎉</h2>
                  <p className="text-night-600 mb-8">
                    Your competition has been created successfully. Share it with your friends to start the challenge!
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowSuccessModal(false)}
                      className="flex-1 px-4 py-2 rounded-xl border border-primary-100 text-night-600 hover:bg-primary-50 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowSuccessModal(false);
                        setShowInviteModal(competitions[competitions.length - 1].id);
                      }}
                      className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:opacity-90 transition-opacity"
                    >
                      Invite Friends
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Invite Modal */}
          <AnimatePresence>
            {showInviteModal && (
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
                  className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4"
                >
                  <h2 className="text-2xl font-bold text-night-900 mb-6">Invite Friends</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-night-700 mb-2">
                        Share Link
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1 px-4 py-2 bg-primary-50 rounded-xl text-night-600 font-mono text-sm truncate">
                          {`${window.location.origin}/competition?join=${showInviteModal}`}
                        </div>
                        <button
                          onClick={() => handleCopyInviteLink(showInviteModal)}
                          className="px-4 py-2 bg-primary-50 rounded-xl text-primary-600 hover:bg-primary-100 transition-colors"
                        >
                          {copiedLink ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-primary-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-night-600">or share via</span>
                        </div>
                      </div>

                      <div className="flex justify-center gap-4">
                        <SocialShareButton
                          platform="Twitter"
                          url={`${window.location.origin}/competition?join=${showInviteModal}`}
                          text="Join my sleep competition on Sleep2Earn! 😴💪"
                        />
                        <SocialShareButton
                          platform="Telegram"
                          url={`${window.location.origin}/competition?join=${showInviteModal}`}
                          text="Join my sleep competition on Sleep2Earn! 😴💪"
                        />
                        <SocialShareButton
                          platform="WhatsApp"
                          url={`${window.location.origin}/competition?join=${showInviteModal}`}
                          text="Join my sleep competition on Sleep2Earn! 😴💪"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setShowInviteModal(null)}
                      className="w-full px-4 py-2 rounded-xl border border-primary-100 text-night-600 hover:bg-primary-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SocialShareButton({ platform, url, text }: { platform: string; url: string; text: string }) {
  const getShareUrl = () => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    switch (platform) {
      case 'Twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
      case 'Telegram':
        return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
      case 'WhatsApp':
        return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
      default:
        return '#';
    }
  };

  const getIcon = () => {
    switch (platform) {
      case 'Twitter':
        return <Twitter className="w-5 h-5" />;
      case 'Telegram':
        return <Send className="w-5 h-5" />;
      case 'WhatsApp':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <a
      href={getShareUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-primary-50 rounded-xl text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center"
      title={`Share on ${platform}`}
    >
      {getIcon()}
    </a>
  );
}