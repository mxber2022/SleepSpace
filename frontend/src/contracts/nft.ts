import { ethers } from 'ethers';

export const NFT_ABI = [
  "function safeMint(address to, string memory uri) public",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)"
];

export const NFT_ADDRESS = "0x5E7Ba34c425fCB9773f78864220769aFFc80A1E7";

export const DREAM_WEAVER_METADATA = {
  name: "Dream Weaver NFT",
  description: "Your entry-level booster—providing a 3% boost to your nightly sleep-to-earn rewards.",
  image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
  attributes: [
    {
      trait_type: "Rarity",
      value: "Common"
    },
    {
      trait_type: "Boost",
      value: "3%"
    },
    {
      trait_type: "Type",
      value: "Sleep Booster"
    }
  ]
};