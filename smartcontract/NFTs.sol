// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts@5.2.0/token/ERC721/ERC721.sol";
import {ERC721Burnable} from "@openzeppelin/contracts@5.2.0/token/ERC721/extensions/ERC721Burnable.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts@5.2.0/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721Pausable} from "@openzeppelin/contracts@5.2.0/token/ERC721/extensions/ERC721Pausable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts@5.2.0/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts@5.2.0/access/Ownable.sol";

contract ZZZ is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Pausable, Ownable, ERC721Burnable {
    uint256 private _nextTokenId;

    constructor(address initialOwner) ERC721("ZZZ", "ZZZ") Ownable(initialOwner) {}

    string[7] private _predefinedURIs = [
        "https://ipfs.io/ipfs/bafkreid3wkecsezp5q37xeqpnpxy2h7snenqvsqqvk3vazkzeuxxb7t3mu", // 1. Dream Weaver
        "https://ipfs.io/ipfs/bafkreiefojwjknx6aznzwa3mkffvmvychoxlctjr3ejotadurz7ll3cx7q", // 2. Circadian Tuner
        "https://ipfs.io/ipfs/bafkreicdcc44qrf7dunrb4whcy26cic5v52yyraq7fdq3gru2gel4rhgtm", // 3. Restful Pillow
        "https://ipfs.io/ipfs/bafkreigadkp7tqjrxkvvoo4jp62skipdhaxxjukxr2myomopl4upajaebi", // 4. Lucid Dream Catcher
        "https://ipfs.io/ipfs/bafkreihwvfczk7gfr5clqs4xk7iolszyyf3m3ujgetl4u44seea32xewle", // 5. Sleep Guardian
        "https://ipfs.io/ipfs/bafkreietfm326kydjv4tdu2lj2wfyypx4k656qtrv5kjijbejh222m3lgm", // 6. Melatonin Crystal
        "https://ipfs.io/ipfs/bafkreicumyn7oz42wvd63kjce63vgjd4bmsyxkxizj33foqgal5yy2xdye"  // 7. Sleep Accelerator
    ];


    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _predefinedURIs[0]);
    }

    /* Upgrade NFT Based on sleep data. possible integratuíon zk */
    function upgradeURI(uint256 tokenId, string memory uri) public onlyOwner{
        require(ownerOf(tokenId) == msg.sender, "You do not own this NFT");

        // 1. Dream Weaver - first nft minted (ignore)
        // 2. Circadian Tuner - 5% bonus when hitting targeted weekly sleep performance
        // 3. Restful Pillow - 10% bonus Achieve 8 hours of sleep for 3 consecutive nights
        // 4. Lucid Dream Catcher - 15 % bonus Achieve optimal sleep quality with rem cycle
        // 5. Sleep Guardian - 2x earning Maintain 90%+ sleep score for 30 consecutive days
        // 6. Melatonin Crystal - 3x earning 8 hours of high-quality sleep for 30 consecutive days
        // 7. Sleep Accelerator - Consistently achieve high sleep scores over time of 3 months

        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
