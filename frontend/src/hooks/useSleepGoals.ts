import { useState, useCallback } from 'react';
import { BrowserProvider, Eip1193Provider, ethers } from 'ethers';
import { SLEEP_GOALS_ABI, SLEEP_TOKEN_ABI, SLEEP_GOALS_ADDRESS, SLEEP_TOKEN_ADDRESS } from '../contracts/sleepGoals';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';

export interface SleepGoal {
  bedtime: number;
  wakeTime: number;
  duration: number;
  quality: number;
  depositAmount: bigint;
  achieved: boolean;
  goalDuration: number;
  mode: string;
  createdAt: number;
}

export function useSleepGoals() {
  const { address, isConnected } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approvingStatus, setApprovingStatus] = useState(false);
  const { walletProvider } = useAppKitProvider('eip155')

  const setSleepGoal = useCallback(async (
    bedtime: string,
    wakeTime: string,
    duration: number,
    quality: number,
    depositAmount: string,
    goalDuration: number,
    mode: string
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);
    setApprovingStatus(false);

    try {
      const provider = new BrowserProvider(walletProvider as Eip1193Provider)
      console.log("provider: ", provider);
      //const provider = new ethers.BrowserProvider(ethersProvider);
      const signer = await provider.getSigner();
      console.log("mode is", typeof(mode));
      // Convert time strings to Unix timestamps
      const bedtimeDate = new Date(`1970-01-01T${bedtime}`);
      const wakeTimeDate = new Date(`1970-01-01T${wakeTime}`);
      const bedtimeTimestamp = Math.floor(bedtimeDate.getTime() / 1000);
      const wakeTimeTimestamp = Math.floor(wakeTimeDate.getTime() / 1000);

      // Convert deposit amount to wei
      const depositAmountWei = ethers.parseEther(depositAmount);

      // First approve token spending
      const tokenContract = new ethers.Contract(SLEEP_TOKEN_ADDRESS, SLEEP_TOKEN_ABI, signer);
      const approveTx = await tokenContract.approve(SLEEP_GOALS_ADDRESS, depositAmountWei);
      await approveTx.wait();
      setApprovingStatus(true); // approved successfully
      // Set sleep goal
      const contract = new ethers.Contract(SLEEP_GOALS_ADDRESS, SLEEP_GOALS_ABI, signer);
      const tx = await contract.setSleepGoal(
        bedtimeTimestamp,
        wakeTimeTimestamp,
        duration,
        quality,
        depositAmountWei,
        goalDuration,
        mode
      );
      await tx.wait();

      return true;
    } catch (err: any) {
      console.error('Error setting sleep goal:', err);
      setApprovingStatus(false); 
      setError(err.reason);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address]);

  const getUserGoal = useCallback(async (): Promise<SleepGoal | null> => {
    if (!isConnected || !address) {
      return null;
    }

    try {
      const provider = new BrowserProvider(walletProvider as Eip1193Provider)
      console.log("provider: ", provider);
      const contract = new ethers.Contract(SLEEP_GOALS_ADDRESS, SLEEP_GOALS_ABI, provider);
      const goal = await contract.getUserGoal(address);

      return {
        bedtime: Number(goal.bedtime),
        wakeTime: Number(goal.wakeTime),
        duration: Number(goal.duration),
        quality: Number(goal.quality),
        depositAmount: goal.depositAmount,
        achieved: goal.achieved,
        goalDuration: Number(goal.goalDuration),
        mode: goal.mode,
        createdAt: Number(goal.createdAt)
      };
    } catch (err) {
      console.error('Error getting user goal:', err);
      return null;
    }
  }, [isConnected, address]);

  const verifySleepGoal = useCallback(async (
    actualBedtime: number,
    actualWakeTime: number,
    actualDuration: number,
    actualQuality: number
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const provider = new BrowserProvider(walletProvider as Eip1193Provider)
      console.log("provider: ", provider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(SLEEP_GOALS_ADDRESS, SLEEP_GOALS_ABI, signer);

      const tx = await contract.verifySleepGoal(
        actualBedtime,
        actualWakeTime,
        actualDuration,
        actualQuality
      );
      await tx.wait();

      return true;
    } catch (err) {
      console.error('Error verifying sleep goal:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify sleep goal');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address]);

  return {
    setSleepGoal,
    getUserGoal,
    verifySleepGoal,
    isLoading,
    error,
    approvingStatus
  };
}