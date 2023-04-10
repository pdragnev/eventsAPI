import express, { Request, Response } from "express";
import { EventData } from "./interfaces/EventData";
import { serviceInstantiator } from "./services/ServiceInstantiator";

// Initialize Express app
const app = express();

const contractService = serviceInstantiator.getContractServiceMap();

// Set up middleware to parse JSON request bodies
app.use(express.json());

// Define a GET route to retrieve a specific event by name
app.get("/api/v1/logsMap", async (req: Request, res: Response) => {
  try {
    // Get the event params from the request parameters
    const dealID = req.query.dealID as string;
    const fileID = req.query.fileID as string;

    const events = await contractService.getEventsByName(dealID, fileID);
    res.json(events);
  } catch (error: any) {
    res.status(500).send(JSON.stringify(error.message));
  }
});

app.post("/api/v1/logsMap", async (req: Request, res: Response) => {
  try {
    const data = req.body as EventData;
    await contractService.writeEvent(data);
    res.status(201).send("created");
  } catch (error: any) {
    res.status(500).send(JSON.stringify(error.message));
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
