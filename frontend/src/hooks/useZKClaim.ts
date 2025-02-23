import { useState, useCallback } from 'react';
import { BrowserProvider, Eip1193Provider, ethers, parseEther } from 'ethers';
import { verifyProof_ABI, ZKClaim_ADDRESS } from '../contracts/zkClaim';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { abi } from './proofABI';

const tempProof= {
  claimInfo: {
    context: '{"extractedParameters":{"price":"2670.7"},"providerHash":"0x5dbe58ad866070178af5c86d8caac49014934f9499a5ebd9599961325bfc347d"}',
    parameters: '{"body":"","method":"GET","responseMatches":[{"type":"regex","value":"\\\\{\\"ethereum\\":\\\\{\\"usd\\":(?<price>[\\\\d\\\\.]+)\\\\}\\\\}"}],"responseRedactions":[],"url":"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"}',
    provider: 'http'
  },
  signedClaim: {
    claim: {
      epoch: 1,
      identifier: '0x00e0c79f22b796b31c56b53febfc2e87d126f9dd4c0f7b6f6b9e11beef499208',
      owner: '0x381994d6b9b08c3e7cfe3a4cd544c85101b8f201',
      timestampS: 1740161672
    },
    signatures: [
      '0xfe323d2fca8b9d777a39bd44de9bebb2e0ad0e1cf4a95428eb48d4f4def67baf0429ca999467aa7804c583c8a39163dd1439f491c247b74f544539dd5c80be9b1b'
    ]
  }
}


export function useZKClaim() {
  const { address, isConnected } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { walletProvider } = useAppKitProvider('eip155');

  const zkclaim = useCallback(async (proof: any, amount: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const provider = new BrowserProvider(walletProvider as Eip1193Provider);
      const signer = await provider.getSigner();
      console.log("verifyProof_ABI: ",verifyProof_ABI);
      const contract = new ethers.Contract(ZKClaim_ADDRESS, abi, signer);

      // Call verifyProof function on contract with proof
      const tx = await contract.verifyProof((tempProof), parseEther(amount));
      await tx.wait();

      return true;
    } catch (err: any) {
      console.error('Error verifying proof:', err);
      setError(err.reason || 'Failed to verifying proof');
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