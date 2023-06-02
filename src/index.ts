import express, { Request, Response } from "express";
import { EventData } from "./interfaces/EventData";
import { serviceInstantiator } from "./services/ServiceInstantiator";

// Initialize Express app
const app = express();

const contractService = serviceInstantiator.getContractService();

// Set up middleware to parse JSON request bodies
app.use(express.json());

app.get("/api/v1/logs", async (req: Request, res: Response) => {
  try {
    const { messageID, transactionHash } = req.query;

    if (messageID) {
      const events = await contractService.getEventsByName(messageID as string);
      res.json(events);
    } else if (transactionHash) {
      const event = await contractService.getEventByTransactionHash(transactionHash as string);
      res.json(event);
    } else {
      throw new Error("Invalid query parameters");
    }
  } catch (error: any) {
    res.status(500).send(JSON.stringify(error.message));
  }
});

// Define a POST route to write events to the blockchain with the provided data.
// The request will return a 201 status code and the hash ot the transaction
// You can use this hash to check the actual transaction via Etherscan
app.post("/api/v1/logs", async (req: Request, res: Response) => {
  try {
    const data = req.body as EventData;
    const hash = await contractService.writeEvent(data);
    res.status(201).json({ transactionHash : hash});
  } catch (error: any) {
    res.status(500).send(JSON.stringify(error.message));
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
