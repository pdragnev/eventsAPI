export const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "messageID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "messageHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fileHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "dealID",
        type: "string",
      },
    ],
    name: "Log",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_messageID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_messageHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_fileHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_dealID",
        type: "string",
      },
    ],
    name: "log",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
