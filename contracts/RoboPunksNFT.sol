//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol'; //defines functions that only the owner can use

contract RoboPunksNFT is ERC721, Ownable {
    
    uint256 public mintPrice; 

    uint256 public totalSupply;

    uint256 public maxSupply;

    uint256 public maxPerWallet;

    bool public isPublicMintEnabled; //Public sale enabled or not

    string internal baseTokenUri;

    address payable public withdrawWallet; //To retrieve the funds, only this wallet can withdraw

    mapping(address => uint256) public walletMints; //the amount owned by an address

    constructor() payable ERC721('RoboPunks', 'RP'){ //We are passing the name and symbol to the ERC721 superclass constructor
        mintPrice = 0.02 ether;
        totalSupply = 0; //starting supply
        maxSupply = 1000; 
        maxPerWallet = 3;

        //We can set a withdraw address also by setting 'withdrawWallet'
    }

    //Only from the outside we can call this function and it has the onlyOwner modifier from the Ownable superclass. 
    //(Only who deploys the contract can call this function or who is the owner right now thanks to the possibility we can transfer ownership)
    function setIsPublicMinEnabled(bool _isPublicMintEnabled) external onlyOwner { 
        isPublicMintEnabled = _isPublicMintEnabled;                 
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner{
        baseTokenUri = _baseTokenUri;
    }

    //overriding ERC721 virtual method
    //this method is the final part of the URI to get the token's exact image
    function tokenURI(uint256 _tokenId) public view override returns (string memory){
        require(_exists(_tokenId), "Token does not exist!");

        //Returns the tokenURI in a json format as a string
        return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        //low level transfer without error handling but returns true or false
        (bool success, ) = withdrawWallet.call{value: address(this).balance}('');

        require(success, "Withdraw failed!");//Reverts if it wasn't successful
    }
 
    function mint(uint256 quantity) public payable {
        require(isPublicMintEnabled, "Minting is not yet enabled!");
        require(msg.value == quantity * mintPrice, "Wrong amount of ether!");
        require(totalSupply + quantity <= maxSupply, "Sold out!");
        require(walletMints[msg.sender] + quantity <= maxPerWallet, "Exceeded max mints per wallet!");

        for(uint256 i = 0; i < quantity; i++){
            //Check effects interaction pattern: effects on the storage to be down before we interact with other contracts/addresses
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;

            _safeMint(msg.sender, newTokenId);
        } 

    }
}