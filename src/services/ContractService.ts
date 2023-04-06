import { ethers } from "ethers";
import { EventData } from "../interfaces/EventData";
import { Interface } from "ethers/lib/utils";
import { PRIVATE_KEY, EVENT_NAME } from "../constants/contants";

export class ContractService {
  private contract: ethers.Contract;
  private contractInterface: ethers.utils.Interface;
  private logEvent: ethers.utils.EventFragment;

  constructor(
    private readonly contractAbi: any,
    private readonly rpcUrl: string,
    private readonly contractAddress: string
  ) {
    const provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);

    this.contract = new ethers.Contract(
      this.contractAddress,
      this.contractAbi,
      signer
    );

    // Get the interface of the contract
    this.contractInterface = new Interface(contractAbi);
    this.logEvent = this.contractInterface.getEvent(EVENT_NAME);
  }

  async getEventsByName(dealId: string, fileId: string): Promise<EventData[]> {
    const decodedLogs = await this.getDecodedLogs(dealId, fileId);
    const indexedParams = this.getIndexedParams();
    //TODO lets extract these for each and map function into separate private ones
    const eventsArray = decodedLogs.map((decodedLog) => {
      const eventObj: EventData = {} as EventData;
      indexedParams.forEach((paramName, index) => {
        const paramValue = decodedLog[index].toString();
        eventObj[paramName] = paramValue;
      });
      return eventObj;
    });
    return eventsArray;
  }

  async writeEvent(data: EventData): Promise<void> {
    //TODO What about the [key: string]: string here and why we need it?
    const { dealID, fileID, fileHash } = { ...data };

    const events: EventData[] = await this.getEventsByName(dealID, fileID);

    if (events.length != 0) {
      throw new Error(
        `Log with dealID ${dealID} and fileID ${fileID} already exist.`
      );
    }
    const tx = await this.contract.log(dealID, fileID, fileHash);
    const receipt = await tx.wait();
    console.log(receipt);
  }

  // Get the names of the indexed parameters for the event
  private getIndexedParams(): string[] {
    return this.logEvent.inputs
      .filter((input) => input.indexed)
      .map((input) => input.name);
  }

  //Decode the event logs
  private async getDecodedLogs(
    dealId: string,
    fileId: string
  ): Promise<ethers.utils.Result[]> {
    const logsFilter = this.contract.filters.Log(dealId, fileId);
    const events = await this.contract.queryFilter(logsFilter, 0, "latest");
    const decodedLogs: ethers.utils.Result[] = [];
    events.map((event: ethers.Event) => {
      const decodedLog = this.contract.interface.decodeEventLog(
        EVENT_NAME,
        event.data,
        event.topics
      );
      decodedLogs.push(decodedLog);
    });
    return decodedLogs;
  }
}
