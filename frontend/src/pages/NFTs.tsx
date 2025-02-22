import React, { useState } from "react";
import {
  Moon,
  Star,
  Shield,
  Crown,
  Sparkles,
  Brain,
  BedDouble,
  Zap,
  Target,
  Trophy,
  Clock,
  Loader2,
  CheckCircle,
  ZapIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppKitAccount } from "@reown/appkit/react";
import { useNFT } from "../hooks/useNFT";
import { NFTProgressStages } from "../components/NFTProgressStages";

interface NFTCard {
  name: string;
  rarity: string;
  icon: React.ReactNode;
  description: string;
  requirements: string;
  effects: string[];
  color: {
    bg: string;
    text: string;
    border: string;
    icon: string;
  };
}

const nfts: NFTCard[] = [
  {
    name: "Dream Weaver",
    rarity: "Common",
    icon: <Moon className="w-6 h-6" />,
    description:
      "Your entry-level booster—mint it and start benefiting right away!",
    requirements: "Public Mint Available",
    effects: ["3% boost to nightly sleep-to-earn rewards"],
    color: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
      icon: "text-blue-500",
    },
  },
  {
    name: "Circadian Tuner",
    rarity: "Uncommon",
    icon: <Clock className="w-6 h-6" />,
    description:
      "Adjusts to your unique sleep cycle for optimized performance.",
    requirements: "Meet personalized sleep goals",
    effects: [
      "5% bonus when hitting your weekly targeted goal sleep performance",
    ],
    color: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
      icon: "text-green-500",
    },
  },
  {
    name: "Restful Pillow",
    rarity: "Rare",
    icon: <BedDouble className="w-6 h-6" />,
    description: "A powerful boost for consistent quality sleep.",
    requirements: "Achieve 8 hours of sleep for 7 consecutive nights",
    effects: [
      "10% base boost to earnings",
      "Additional 5% boost for deep sleep > 25%",
    ],
    color: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
      icon: "text-purple-500",
    },
  },
  {
    name: "Lucid Dream Catcher",
    rarity: "Epic",
    icon: <Brain className="w-6 h-6" />,
    description: "Master the art of lucid sleep for enhanced rewards.",
    requirements:
      "Achieve optimal sleep quality with consistent REM cycles for 2 weeks",
    effects: [
      "15% bonus on nights with lucid sleep",
      "10% bonus for 4/7 lucid sleep nights",
    ],
    color: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-200",
      icon: "text-indigo-500",
    },
  },
  {
    name: "Sleep Guardian",
    rarity: "Legendary",
    icon: <Shield className="w-6 h-6" />,
    description: "The ultimate protector of perfect sleep patterns.",
    requirements: "Maintain 90%+ sleep score for 30 consecutive days",
    effects: ["Double your earnings", "GiftsCards"],
    color: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
      icon: "text-amber-500",
    },
  },
  {
    name: "Melatonin Crystal",
    rarity: "Mythical",
    icon: <Sparkles className="w-6 h-6" />,
    description: "Harness the power of perfect sleep balance.",
    requirements: "8 hours of high-quality sleep for 30 consecutive days",
    effects: ["Double your earnings", "GiftCards"],
    color: {
      bg: "bg-pink-50",
      text: "text-pink-600",
      border: "border-pink-200",
      icon: "text-pink-500",
    },
  },
  {
    name: "Sleep Accelerator Suit",
    rarity: "Ultra-Legendary",
    icon: <Zap className="w-6 h-6" />,
    description: "The pinnacle of sleep enhancement technology.",
    requirements:
      "Consistently achieve high sleep scores over time of 3 months",
    effects: ["Triple your earnings", "GiftCards", "Upgrade device for free"],
    color: {
      bg: "bg-primary-50",
      text: "text-primary-600",
      border: "border-primary-200",
      icon: "text-primary-500",
    },
  },
];

export function NFTs() {
  const { isConnected, address } = useAppKitAccount();
  const [showMintModal, setShowMintModal] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintingStage, setMintingStage] = useState(0);
  const [mintingComplete, setMintingComplete] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [userProgress, setUserProgress] = useState(35);
  const { isLoading, error, mintDreamWeaver } = useNFT();

  const handleMint = async () => {
    if (!isConnected) return;

    setShowMintModal(true);
    setIsMinting(true);
    setMintingStage(0);

    try {
      // Call mintDreamWeaver from useNFT hook
      const success = await mintDreamWeaver();

      if (success) {
        setMintingStage(1);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setMintingStage(2);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsMinting(false);
        setMintingComplete(true);
      } else {
        // Handle minting failure
        // Optionally, you can set error state from useNFT hook
        console.error("Failed to mint NFT");
        // Handle error state
      }
    } catch (error) {
      // Handle any other errors
      console.error("Error minting NFT:", error);
      // Handle error state
    }
  };

  const MintingModal = () => (
    <AnimatePresence>
      {showMintModal && (
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
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-conic from-primary-200/30 via-primary-300/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-[200px] h-[200px] bg-gradient-conic from-primary-300/20 via-primary-200/20 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
              {isMinting ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                    </div>
                    <h2 className="text-xl font-bold text-night-900 mb-2">
                      Minting Dream Weaver NFT
                    </h2>
                    <p className="text-night-600">
                      Please wait while we mint your NFT...
                    </p>
                  </div>

                  <div className="space-y-4">
                    <MintingStep
                      step={1}
                      currentStep={mintingStage}
                      title="Initializing Mint"
                      description="Preparing your Dream Weaver NFT"
                    />
                    <MintingStep
                      step={2}
                      currentStep={mintingStage}
                      title="Confirming Transaction"
                      description="Verifying blockchain transaction"
                    />
                    <MintingStep
                      step={3}
                      currentStep={mintingStage}
                      title="Finalizing"
                      description="Completing NFT minting process"
                    />
                  </div>
                </>
              ) : mintingComplete ? (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-green-50 rounded-full mx-auto mb-6 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-night-900 mb-4">
                    Minting Complete!
                  </h2>
                  <p className="text-night-600 mb-6">
                    Your Dream Weaver NFT has been successfully minted. You can
                    now start earning boosted rewards!
                  </p>
                  <button
                    onClick={() => setShowMintModal(false)}
                    className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                  >
                    Start Earning
                  </button>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const NFTProgressCard = () => (
    <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-primary-100 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-xl">
            <Trophy className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-night-900">Dream Weaver</h3>
            {/* <p className="text-sm text-night-600">Level {userLevel} Collector</p> */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-medium text-night-900">{userProgress} XP</span> */}
        </div>
      </div>

      <div className="relative mb-4">
        <div className="h-2 bg-primary-100 rounded-full">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${userProgress}%` }}
          ></div>
        </div>
        <div className="absolute -top-6 right-0 text-sm text-night-600">
          {/* Next Level: {100 - userProgress} XP */}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-night-600">
        <span>Level {userLevel}</span>
        <span>Level {userLevel + 6}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-night-900 mb-4 font-display">
              {/* SleepSpace NFTs */}
            </h1>
            <p className="text-night-600 text-lg max-w-2xl mx-auto">
              Transform your sleep habits into digital assets. Each NFT provides
              unique benefits and boosts to your sleep-to-earn rewards.
            </p>
          </div>

          {/* Progress Card */}
          {isConnected && <NFTProgressStages />}

          {/* NFT Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <div
                key={nft.name}
                className="group relative bg-white rounded-2xl p-6 shadow-lg ring-1 ring-primary-100 hover:ring-primary-300 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${nft.color.bg} rounded-xl`}>
                        <div className={nft.color.icon}>{nft.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-night-900">
                          {nft.name}
                        </h3>
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${nft.color.bg} ${nft.color.text} border ${nft.color.border}`}
                        >
                          {nft.rarity}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-night-600 mb-4 text-sm">
                    {nft.description}
                  </p>

                  {/* Requirements */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-medium text-night-700">
                        Requirements
                      </span>
                    </div>
                    <p className="text-sm text-night-600">{nft.requirements}</p>
                  </div>

                  {/* Effects */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-medium text-night-700">
                        Effects
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {nft.effects.map((effect, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-night-600"
                        >
                          <Star className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                          <span>{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mint Button (only for Dream Weaver) */}
                  {nft.name === "Dream Weaver" && (
                    <button
                      onClick={handleMint}
                      disabled={!isConnected}
                      className="w-full group relative px-4 py-2 overflow-hidden rounded-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative flex items-center justify-center gap-2 text-white">
                        <span className="font-medium">Mint</span>
                        {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
                      </div>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100 mt-12">
            <h2 className="text-2xl font-bold text-night-900 mb-6 font-display">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <ZapIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-night-900">Mint or Earn NFTs</h3>
                <p className="text-sm text-night-600">
                  Get started with the Dream Weaver NFT or earn higher-tier NFTs
                  through consistent sleep performance.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <BedDouble className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-night-900">Track Your Sleep</h3>
                <p className="text-sm text-night-600">
                  Use our integrated sleep tracking system to monitor your
                  progress and achieve your goals.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-night-900">Receive Boosts</h3>
                <p className="text-sm text-night-600">
                  Earn increased rewards based on your NFTs and sleep
                  performance metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MintingModal />
    </div>
  );
}

function MintingStep({
  step,
  currentStep,
  title,
  description,
}: {
  step: number;
  currentStep: number;
  title: string;
  description: string;
}) {
  const isComplete = currentStep >= step;
  const isActive = currentStep === step - 1;

  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isComplete
            ? "bg-green-50"
            : isActive
            ? "bg-primary-50"
            : "bg-night-50"
        }`}
      >
        {isComplete ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : isActive ? (
          <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-night-300" />
        )}
      </div>
      <div>
        <h3
          className={`font-medium ${
            isComplete
              ? "text-green-600"
              : isActive
              ? "text-primary-600"
              : "text-night-400"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${
            isComplete || isActive ? "text-night-600" : "text-night-400"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
