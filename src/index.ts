import express, { Request, Response } from "express";
import { CONTRACT_ABI } from "./contractABIs/contractABIs";
import { ContractService } from "./services/ContractService";
import { EventData } from "./interfaces/EventData";
import { serviceInstantiator } from "./services/ServiceInstantiator";


// Initialize Express app
const app = express();

// Set up middleware to parse JSON request bodies
app.use(express.json());

// Define a GET route to retrieve a specific event by name
app.get("/api/v1/logs/:dealID/:fileID", async (req: Request, res: Response) => {
  try {
    // Get the event name from the request parameters
    const { dealID, fileID } = req.params;

    const contractService = serviceInstantiator.getContractService();

    const events = await contractService.getEventsByName(dealID, fileID);
    console.log(events);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post('/api/v1/logs', async (req: Request, res: Response) => {
  const data = req.body as EventData;
  const contractService = serviceInstantiator.getContractService();
  await contractService.writeEvent(data);
})

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
