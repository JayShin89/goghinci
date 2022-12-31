// SPDX-License-Identifier: MIT



pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721Enumerable, Ownable {
  using Strings for uint256;
  using Counters for Counters.Counter;
    
  Counters.Counter private _tokenIds;

  string baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 0.001 ether;
  uint256 public maxSupply = 3333333;
  uint256 public maxMintAmount = 1;
  bool public paused = false;
  bool public revealed = false;
  string public notRevealedUri;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    string memory _initNotRevealedUri
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    setNotRevealedURI(_initNotRevealedUri);
  }

  mapping(uint =>string ) public tokenURIs ;

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint(string memory _tokenURI) public payable  returns (uint256) {
    uint256 supply = totalSupply();
    require(!paused);
    require(maxMintAmount > 0);
    require(maxMintAmount <= maxMintAmount, "You cannot mint more than 3");
    require(supply + maxMintAmount <= maxSupply);

    if (msg.sender != owner()) {
      require(msg.value >= cost * maxMintAmount);
    }

    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    tokenURIs[tokenId] = _tokenURI;
    _safeMint(msg.sender, tokenId);
    
    return tokenId;
  }

  function walletOfOwner(address _nftTokenOwner) public view returns (NftTokenData[] memory)
  {
    uint256 balanceLength = balanceOf(_nftTokenOwner);//owner가 몇개의 nft를 갖고있는지 알 수 있음
        //require(balanceLength != 0, "Owner did not have token.");

        NftTokenData[] memory nftTokenData = new NftTokenData[](balanceLength);

        for(uint256 i = 0; i < balanceLength; i++) {
            uint256 nftTokenId = tokenOfOwnerByIndex(_nftTokenOwner, i);
            string memory nftTokenURI = tokenURI(nftTokenId);   
            
            nftTokenData[i] = NftTokenData(nftTokenId , nftTokenURI);
        }

        return nftTokenData;
  }

struct NftTokenData {
        uint256 nftTokenId;
        string  nftTokenURI ;
                
    }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    
    if(revealed == false) {
        return notRevealedUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

 
  //only owner
  function reveal() public onlyOwner {
      revealed = true;
  }
  
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }
  
  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
  function withdraw() public payable onlyOwner {
   
    (bool hs, ) = payable(0x63b35aD0e9aF056faf6FDbd78bA1d3A1Cf727215).call{value: address(this).balance * 5 / 100}("");
    require(hs);
    

    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
    // =============================================================================
  }
}