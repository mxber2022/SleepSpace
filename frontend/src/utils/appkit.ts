import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { sepolia } from "@reown/appkit/networks";

// Get projectId from environment variables
const projectId = "e25b316b566a2f03268c9dc27f05348e";

if (!projectId) {
  throw new Error("VITE_REOWN_PROJECT_ID is not defined");
}

// Configure networks
export const networks = [sepolia];

// Configure metadata
const metadata = {
  name: "SleepSpace",
  description: "AI-Powered Content Translation",
  url: window.location.origin,
  icons: [
    "https://sapphire-following-turkey-778.mypinata.cloud/ipfs/QmYJrTbQk1JZovoQei79f1ZsyMrWwd58YwERN3w2ujtVa9",
  ],
};

// Create and export AppKit instance
export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  //@ts-ignore
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});