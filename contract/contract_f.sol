pragma solidity ^0.8.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@1001-digital/erc721-extensions/contracts/RandomlyAssigned.sol";


// Mint costs 0.003 Ether
// 12 Kept for artist, developer & giveaways

contract vanici_cont is ERC721, Ownable, RandomlyAssigned {
  using Strings for uint256;
  uint256 public currentSupply = 0;
  
  string public baseURI = "ipfs://QmdLDHnPofVb1hq2ptwg4auaswiyTxtz9w7FCCNgCKTK4y/";

  constructor() 
    ERC721("12CZ", "12CZ")
    RandomlyAssigned(504,1) // Max. 504 NFTs available; Start counting from 1 (instead of 0)
    {
       for (uint256 a = 1; a <= 12; a++) {
            mint(msg.sender);
        }
    }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

    
  function mint (address _to)
      public
      payable
  {
      require( tokenCount() + 1 <= totalSupply(), "YOU CAN'T MINT MORE THAN MAXIMUM SUPPLY");
      require( availableTokenCount() - 1 >= 0, "YOU CAN'T MINT MORE THAN AVALABLE TOKEN COUNT"); 
      require( tx.origin == msg.sender, "CANNOT MINT THROUGH A CUSTOM CONTRACT");

      if (msg.sender != owner()) {  
        require( msg.value >= 0.003 ether);
        require( balanceOf(msg.sender) <= 1);
        require( balanceOf(_to) <= 1);
      }      
      
      uint256 id = nextToken();
        _safeMint(_to, id);
        currentSupply++;
     
  }

  

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistant token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), ".json"))
        : "";
  }
  
  function withdraw() public payable onlyOwner {
    require(payable(msg.sender).send(address(this).balance));
  }

  function burn(uint256 tokenId) public {
    address addr_owner = ownerOf(tokenId);
    require( addr_owner == msg.sender, "msg.sender is not the owner of the token");
    super._burn(tokenId);
    }
}


//0xC940A5aAADc44703e6E79eba020565c4cd00FE80