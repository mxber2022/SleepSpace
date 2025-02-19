import { useState, useCallback } from 'react';
import { BrowserProvider, Eip1193Provider, ethers } from 'ethers';
import { NFT_ABI, NFT_ADDRESS, DREAM_WEAVER_METADATA } from '../contracts/nft';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';

export function useNFT() {
  const { address, isConnected } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { walletProvider } = useAppKitProvider('eip155');

  const mintDreamWeaver = useCallback(async () => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const provider = new BrowserProvider(walletProvider as Eip1193Provider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);

      // Upload metadata to IPFS or use a predefined URI
      // For this example, we'll use a static IPFS URI
      const metadataUri = `data:application/json;base64,${btoa(encodeURIComponent(JSON.stringify(DREAM_WEAVER_METADATA)))}`;


      // Mint NFT
      const tx = await contract.safeMint(address, metadataUri);
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

  const checkNFTOwnership = useCallback(async (): Promise<boolean> => {
    if (!isConnected || !address) {
      return false;
    }

    try {
      const provider = new BrowserProvider(walletProvider as Eip1193Provider);
      const contract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
      const balance = await contract.balanceOf(address);
      return balance > 0;
    } catch (err) {
      console.error('Error checking NFT ownership:', err);
      return false;
    }
  }, [isConnected, address, walletProvider]);

  return {
    mintDreamWeaver,
    checkNFTOwnership,
    isLoading,
    error
  };
}