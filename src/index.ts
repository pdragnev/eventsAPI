import express, { Request, Response } from "express";
import { ethers } from "ethers";
import { Interface } from "ethers/lib/utils";

interface EventData {
  [key: string]: string;
  dealID: string;
  fileID: string;
  filehash: string;
}
// Initialize Express app
const app = express();

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "";

// Define the ABI of the contract you want to interact with
const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "dealID",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "fileID",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "filehash",
        type: "uint256",
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
        name: "_dealID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fileID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_filehash",
        type: "uint256",
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

// Define the address of the contract you want to interact with
const contractAddress = "0xf63fDcCd99a9a97480d95aa15497Beec83f7CBA7";
// Replace the above with the actual contract address you want to interact with on the Mumbai testnet

// Get the interface of the contract
const contractInterface = new Interface(contractABI);

const logEvent = contractInterface.getEvent("Log");

// Get the names of the indexed parameters for the event
const indexedParams = logEvent.inputs
  .filter((input) => input.indexed)
  .map((input) => input.name);

// Create an Ethers provider for the Mumbai testnet
const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL);

// Create an Ethers contract instance using the ABI and address
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Set up middleware to parse JSON request bodies
app.use(express.json());

// Define a GET route to retrieve a specific event by name
app.get("/api/v1/logs/:dealID/:fileID", async (req: Request, res: Response) => {
  try {
    // Get the event name from the request parameters
    const { dealID, fileID } = req.params;

    const logsFilter = contract.filters.Log(dealID, fileID);
    const events = await contract.queryFilter(logsFilter, 0, "latest");

    // decode the event logs
    const decodedLogs = events.map((event) =>
      contract.interface.decodeEventLog("Log", event.data, event.topics)
    );
    console.log(decodedLogs);

    // Map the decoded logs to an array of event objects
    const eventsArray = decodedLogs.map((log) => {
      const eventObj: EventData = {} as EventData;
      indexedParams.forEach((paramName, index) => {
        const paramValue = decodedLogs[0][index].toString();
        eventObj[paramName] = paramValue;
      });
      return eventObj;
    });

    console.log(eventsArray);
    // Send the matching events as a response
    res.json(eventsArray);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
