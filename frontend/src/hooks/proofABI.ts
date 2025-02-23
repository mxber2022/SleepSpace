
export const abi =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokenClaimed",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "reclaimAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "provider",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "parameters",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "context",
                "type": "string"
              }
            ],
            "internalType": "struct Claims.ClaimInfo",
            "name": "claimInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "bytes32",
                    "name": "identifier",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "internalType": "uint32",
                    "name": "timestampS",
                    "type": "uint32"
                  },
                  {
                    "internalType": "uint32",
                    "name": "epoch",
                    "type": "uint32"
                  }
                ],
                "internalType": "struct Claims.CompleteClaimData",
                "name": "claim",
                "type": "tuple"
              },
              {
                "internalType": "bytes[]",
                "name": "signatures",
                "type": "bytes[]"
              }
            ],
            "internalType": "struct Claims.SignedClaim",
            "name": "signedClaim",
            "type": "tuple"
          }
        ],
        "internalType": "struct Reclaim.Proof",
        "name": "proof",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "verifyProof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]