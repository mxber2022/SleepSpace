// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Reclaim.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZKClaim {
   address public reclaimAddress;
   IERC20 private _rewardToken = IERC20(0xb507eEF94DB8AFa44BE58Fb687c5234FddF14b44); //sleep token
   
   event TokenClaimed(address indexed user, uint256 amount);

   constructor() {
      // Replace with the network you are deploying on
      reclaimAddress = 0xAe94FB09711e1c6B057853a515483792d8e474d0; 
   }

   function verifyProof(Reclaim.Proof memory proof,  uint256 amount) public {
       Reclaim(reclaimAddress).verifyProof(proof);
       // Your business logic upon successful verification
       // Example: Verify that proof.context matches your expectations
       // TO do in future: 
       // 1. Implement onchain token calculation may be, 
       // 2. abstract data
       withdrawTokens(amount);
   }

   function withdrawTokens(uint256 amount) internal {
      require(_rewardToken.balanceOf(address(this)) >= amount, "Insufficient contract balance");
      require(_rewardToken.transfer(msg.sender, amount), "Transfer failed");

      emit TokenClaimed(msg.sender, amount);
   }
} 