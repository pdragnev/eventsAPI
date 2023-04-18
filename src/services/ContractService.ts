import { Transaction, ethers } from "ethers";
import { EventData } from "../interfaces/EventData";
import { PRIVATE_KEY, EVENT_NAME } from "../constants/contants";

export class ContractService {
  readonly eventParams = ["messageID", "messageHash", "fileHash", "dealID"];
  private contract: ethers.Contract;

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
  }

  async getEventsByName(messageID: string): Promise<EventData[]> {
    const decodedLogs = await this.getDecodedLogs(messageID);
    const eventsArray = decodedLogs.map((decodedLog) => {
      const eventObj: EventData = {} as EventData;
      this.eventParams.forEach((paramName, index) => {
        const paramValue = decodedLog[index];
        eventObj[paramName] = paramValue;
      });
      return eventObj;
    });
    return eventsArray;
  }

  async writeEvent(data: EventData): Promise<Transaction> {
    const { messageID, messageHash, fileHash, dealID } = { ...data };

    const events: EventData[] = await this.getEventsByName(messageID);

    if (events.length !== 0) {
      throw new Error(`Log with messageID ${messageID} already exist.`);
    }

    const tx = await this.contract.log(
      messageID,
      messageHash,
      fileHash,
      dealID
    );
    const response = await tx.wait() as Transaction;
    return response;
  }

  //Decode the event logs
  private async getDecodedLogs(
    messageID: string
  ): Promise<ethers.utils.Result[]> {
    const logsFilter = this.contract.filters.Log(messageID);
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
