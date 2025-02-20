import { useEffect, useState } from "react";
import { useAppKitAccount } from '@reown/appkit/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompetition, Competition as CompetitionType } from '../hooks/useCompetition';
import { Check, Copy, Loader2, MessageCircle, PartyPopper, Send, Twitter } from 'lucide-react';

interface CreateCompetitionProps {
  showCreateModal: boolean;
  setShowCreateModal: (show: boolean) => void;
}

export default function CreateCompetition({ showCreateModal, setShowCreateModal }: CreateCompetitionProps) {
  const [isCreating, setIsCreating] = useState(false);
  const { isConnected } = useAppKitAccount();
  const { createCompetition, getCompetitions, error: competitionError } = useCompetition();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [competitions, setCompetitions] = useState<CompetitionType[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
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

  const [newCompetition, setNewCompetition] = useState({
    name: '',
    startDate: '',
    endDate: '',
    targetScore: 85,
    prizePool: '',
  });

  const handleCreateCompetition = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      setShowError(true);
      return;
    }

    setIsCreating(true);
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
      setError('Failed to create competition');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyInviteLink = (competitionId: number) => {
    const inviteLink = `${window.location.origin}/competition?join=${competitionId}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
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
                    className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:border-transparent"
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
                      className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:border-transparent"
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
                      className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:border-transparent"
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
                    className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:border-transparent"
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
                    className="w-full px-4 py-2 rounded-xl border border-primary-100 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:border-transparent"
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
                    disabled={isCreating}
                    className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreating ? (
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
    </>
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