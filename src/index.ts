import express, { Request, Response } from "express";
import { ethers } from "ethers";
import { Interface } from "ethers/lib/utils";
import { contractABI } from "./contractABIs/contractABIs";
import { EventData } from "./interfaces/EventData";
import { ContractService } from "./services/ContractService";


// Initialize Express app
const app = express();

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "";

// Set up middleware to parse JSON request bodies
app.use(express.json());

// Define a GET route to retrieve a specific event by name
app.get("/api/v1/logs/:dealID/:fileID", async (req: Request, res: Response) => {
  try {
    // Get the event name from the request parameters
    const { dealID, fileID } = req.params;

    const contractService = new ContractService(
      contractABI, MUMBAI_RPC_URL, CONTRACT_ADDRESS
    )

    const events = await contractService.getEventsByName(dealID, fileID);
    console.log(events);
    res.json(events);
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
