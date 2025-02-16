import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { SLEEP_GOALS_ABI, SLEEP_TOKEN_ABI, SLEEP_GOALS_ADDRESS, SLEEP_TOKEN_ADDRESS } from '../contracts/sleepGoals';
import { useAppKitAccount } from '@reown/appkit/react';

export interface SleepGoal {
  bedtime: number;
  wakeTime: number;
  duration: number;
  quality: number;
  depositAmount: bigint;
  achieved: boolean;
  goalDuration: number;
}

export function useSleepGoals() {
  const { address, isConnected } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setSleepGoal = useCallback(async (
    bedtime: string,
    wakeTime: string,
    duration: number,
    quality: number,
    depositAmount: string,
    goalDuration: number
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

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

      // Set sleep goal
      const contract = new ethers.Contract(SLEEP_GOALS_ADDRESS, SLEEP_GOALS_ABI, signer);
      const tx = await contract.setSleepGoal(
        bedtimeTimestamp,
        wakeTimeTimestamp,
        duration,
        quality,
        depositAmountWei,
        goalDuration
      );
      await tx.wait();

      return true;
    } catch (err) {
      console.error('Error setting sleep goal:', err);
      setError(err instanceof Error ? err.message : 'Failed to set sleep goal');
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
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(SLEEP_GOALS_ADDRESS, SLEEP_GOALS_ABI, provider);
      const goal = await contract.getUserGoal(address);
      
      return {
        bedtime: Number(goal.bedtime),
        wakeTime: Number(goal.wakeTime),
        duration: Number(goal.duration),
        quality: Number(goal.quality),
        depositAmount: goal.depositAmount,
        achieved: goal.achieved,
        goalDuration: Number(goal.goalDuration)
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
      const provider = new ethers.BrowserProvider(window.ethereum);
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
    error
  };
}