// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./NGToken.sol";

contract NGTokenSale {
  address admin;
  NGToken public tokenContract;
  uint256 public tokenPrice;

  constructor(NGToken _tokenContract, uint256 _tokenPrice) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }
}
