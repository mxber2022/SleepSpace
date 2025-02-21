// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.4",
// };

// export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "@nomicfoundation/hardhat-verify";
import { vars } from "hardhat/config";
import dotenv from "dotenv";

dotenv.config();

const accounts = [process.env.PRIVATE_KEY
].filter((key): key is string => !!key);
const celoScan: any = process.env.CELOSCAN_API_KEY;
const ethsepoliaScan: any = process.env.ETHSEPOLIASCAN_API_KEY;
const scrollScan: any = process.env.SCROLLSCAN_API_KEY;
const arbitrumScan: any = process.env.ARBITRUMSCAN_API_KEY;

const config: HardhatUserConfig = {
  networks: {
    ethereumSepolia: {
      chainId: 11155111,
      url: "https://eth-sepolia.g.alchemy.com/v2/PRvrTo5Mqehu0WC5gbMvMx9ZsISAhozA",
      accounts: accounts,
    },
    arbitrumOne: {
      chainId: 421614,
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: accounts,
    },
    scrollSepolia: {
      chainId: 534351,
      url: "https://sepolia-rpc.scroll.io",
      accounts: accounts,
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: accounts,
      chainId: 44787,
    },
  },
  etherscan: {
    apiKey: {
      ethereumSepolia: ethsepoliaScan,
      alfajores: celoScan,
      scrollSepolia: scrollScan,
      arbitrumOne: arbitrumScan,
    },
    customChains: [
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io",
        },
      },
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  solidity: "0.8.4",
};

export default config;
