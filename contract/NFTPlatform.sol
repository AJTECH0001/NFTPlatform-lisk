// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTPlatform is ERC721, ERC20, Ownable {
    uint256 public constant REWARD_AMOUNT = 100 * 10**18; // 100 tokens per mint
    uint256 private _tokenIdCounter;

    event NFTMinted(uint256 tokenId, address creator, string tokenURI);

    constructor() 
        ERC721("ArtNFT", "ANFT") 
        ERC20("CreatorToken", "CTK")
        Ownable(msg.sender)
    {
        _tokenIdCounter = 0;
    }

    function mintNFT(string memory tokenURI) public returns (uint256) {
        uint256 newTokenId = _tokenIdCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        // Reward creator with tokens
        _mint(msg.sender, REWARD_AMOUNT);
        emit NFTMinted(newTokenId, msg.sender, tokenURI);
        
        _tokenIdCounter++;
        return newTokenId;
    }

    function rewardCreator(address to, uint256 amount) internal {
        _mint(to, amount);
    }

    // Override required by Solidity for ERC20-ERC721 compatibility
    function _update(address to, uint256 tokenId, address auth) 
        internal 
        override(ERC721) 
        returns (address) 
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 amount) 
        internal 
        override(ERC721) 
    {
        super._increaseBalance(account, amount);
    }

    // Optional: Function to get all minted NFTs
    function getTotalMinted() public view returns (uint256) {
        return _tokenIdCounter;
    }
}