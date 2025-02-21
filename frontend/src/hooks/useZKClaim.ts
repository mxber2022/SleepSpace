import { useState, useCallback } from 'react';
import { BrowserProvider, Eip1193Provider, ethers } from 'ethers';
import { SLEEP_GOALS_ABI, ZKClaim_ADDRESS } from '../contracts/zkClaim';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';

export function useZKClaim() {
  const { address, isConnected } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { walletProvider } = useAppKitProvider('eip155');

  const zkclaim = useCallback(async (proof: any) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const provider = new BrowserProvider(walletProvider as Eip1193Provider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(ZKClaim_ADDRESS, SLEEP_GOALS_ABI, signer);

      // Call verifyProof function on contract with proof
      const tx = await contract.verifyProof(proof);
      await tx.wait();

      return true;
    } catch (err: any) {
      console.error('Error minting NFT:', err);
      setError(err.reason || 'Failed to mint NFT');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address, walletProvider]);


  return {
    zkclaim,
    isLoading,
    error
  };
}