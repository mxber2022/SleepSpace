// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Reclaim.sol";

contract ZKClaim {
   address public reclaimAddress;

   constructor() {
      // Replace with the network you are deploying on
      reclaimAddress = 0xAe94FB09711e1c6B057853a515483792d8e474d0; 
   }

   function verifyProof(Reclaim.Proof memory proof) public view {
       Reclaim(reclaimAddress).verifyProof(proof);
       // Your business logic upon successful verification
       // Example: Verify that proof.context matches your expectations
   }
}