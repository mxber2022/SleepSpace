import { useState } from 'react';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Eip1193Provider, ethers } from 'ethers';

const COMPETITION_ABI = [
  "function createCompetition(string memory _name, uint256 _startDate, uint256 _endDate, uint256 _targetScore, uint256 _prizePool) external",
  "function joinCompetition(uint256 _competitionId) external",
  "function competitions(uint256) external view returns (uint256 id, string name, uint256 startDate, uint256 endDate, uint256 targetScore, uint256 prizePool, address[] participants, bool isActive)",
  "function competitors(uint256, address) external view returns (address participant, uint256 score, uint256 rank, bool hasJoined)",
  "function competitionCounter() external view returns (uint256)",
  "function getAllCompetitions() external view returns (tuple(uint256 id, string name, uint256 startDate, uint256 endDate, uint256 targetScore, uint256 prizePool, address[] participants, bool isActive)[] memory)"
];

// Replace with your deployed contract address
const COMPETITION_ADDRESS = "0x308de3630373eC8757c78244B5f1B68Eb78A374b";

export interface Competition {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  targetScore: number;
  prizePool: string;
  participants: string[];
  isActive: boolean;
}

export interface Competitor {
  participant: string;
  score: number;
  rank: number;
  hasJoined: boolean;
}

export function useCompetition() {
  const { address, isConnected } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { walletProvider } = useAppKitProvider('eip155')

  const getContract = async (withSigner = false) => {
    //if (!window.ethereum) throw new Error('No wallet found');
    const raedProvider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/PRvrTo5Mqehu0WC5gbMvMx9ZsISAhozA");
    
    let provider;
    if(withSigner){
        provider = new BrowserProvider(walletProvider as Eip1193Provider)
    }
    
    const contract = new ethers.Contract(
      COMPETITION_ADDRESS,
      COMPETITION_ABI,
      withSigner ? await provider!.getSigner() : raedProvider
    );

    console.log("contract: ", contract);
    
    return contract;
  };

  const createCompetition = async (
    name: string,
    startDate: Date,
    endDate: Date,
    targetScore: number,
    prizePool: string
  ) => {
    if (!isConnected) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      const contract = await getContract(true);
      const startTimestamp = Math.floor(startDate.getTime() / 1000);
      const endTimestamp = Math.floor(endDate.getTime() / 1000);
      const prizePoolWei = ethers.parseEther(prizePool);

      const tx = await contract.createCompetition(
        name,
        startTimestamp,
        endTimestamp,
        targetScore,
        prizePoolWei
      );
      await tx.wait();

      return true;
    } catch (err) {
      console.error('Error creating competition:', err);
      setError(err instanceof Error ? err.message : 'Failed to create competition');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const joinCompetition = async (competitionId: number) => {
    if (!isConnected) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      const contract = await getContract(true);
      const tx = await contract.joinCompetition(competitionId);
      await tx.wait();
      return true;
    } catch (err) {
      console.error('Error joining competition:', err);
      setError(err instanceof Error ? err.message : 'Failed to join competition');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getCompetitions = async (): Promise<Competition[]> => {
    try {
      const contract = await getContract();
      const allCompetitions = await contract.getAllCompetitions();
      
      return allCompetitions.map((comp: any) => ({
        id: Number(comp.id),
        name: comp.name,
        startDate: new Date(Number(comp.startDate) * 1000),
        endDate: new Date(Number(comp.endDate) * 1000),
        targetScore: Number(comp.targetScore),
        prizePool: ethers.formatEther(comp.prizePool),
        participants: comp.participants,
        isActive: comp.isActive
      }));
    } catch (err) {
      console.error('Error fetching competitions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch competitions');
      return [];
    }
  };

  const getCompetitor = async (competitionId: number, participantAddress: string): Promise<Competitor | null> => {
    try {
      const contract = await getContract();
      const competitor = await contract.competitors(competitionId, participantAddress);
      
      return {
        participant: competitor.participant,
        score: Number(competitor.score),
        rank: Number(competitor.rank),
        hasJoined: competitor.hasJoined
      };
    } catch (err) {
      console.error('Error fetching competitor:', err);
      return null;
    }
  };

  return {
    createCompetition,
    joinCompetition,
    getCompetitions,
    getCompetitor,
    isLoading,
    error
  };
}