import { ethers } from "ethers";
import { EventData } from "../interfaces/EventData";
import { EVENT_NAME, PRIVATE_KEY } from "../constants/contants";

export class ContractService {
  //The parameters that the Solidity contract expects
  //If those are changed then the Solidity contract also has to be changed and redeployed
  //And the server should be restarted with the new contract address
  readonly eventParams = ["messageID", "messageHash", "fileHash", "dealID"];

  private contract: ethers.Contract;
  private provider: ethers.providers.JsonRpcProvider;

  constructor(
    private readonly contractAbi: any,
    private readonly rpcUrl: string,
    private readonly contractAddress: string
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
    const signer = new ethers.Wallet(PRIVATE_KEY, this.provider);

    this.contract = new ethers.Contract(
      this.contractAddress,
      this.contractAbi,
      signer
    );
  }

  async getEventsByName(messageID: string): Promise<EventData[]> {
    const decodedLogs = await this.getDecodedLogsByMessageID(messageID);

    const eventsArray = decodedLogs.map((decodedLog) => {
      const eventObj: EventData = {} as EventData;
      this.eventParams.forEach((paramName, index) => {
        eventObj[paramName] = decodedLog[index];
      });
      eventObj.timestamp = new Date(decodedLog.timestamp * 1000).toUTCString();
      eventObj.transactionHash = decodedLog.transactionHash;
      return eventObj;
    });
    return eventsArray;
  }

  async getEventByTransactionHash(
    transactionHash: string
  ): Promise<EventData[]> {
    const decodedLog = await this.getDecodedLogByTransactionHash(
      transactionHash
    );

    const eventObj: EventData = {} as EventData;
    this.eventParams.forEach((paramName, index) => {
      eventObj[paramName] = decodedLog[index];
    });
    eventObj.timestamp = new Date(decodedLog.timestamp * 1000).toUTCString();

    return [eventObj];
  }

  //Calls the contract to emit the event with the given data
  async writeEvent(data: EventData): Promise<string> {
    const { messageID, messageHash, fileHash, dealID } = { ...data };

    const gasPrice = await this.provider.getGasPrice(); // Get the current gas price from the network

    const tx = await this.contract.log(
      messageID,
      messageHash,
      fileHash,
      dealID,
      {
        gasPrice: gasPrice, // Set the gas price for the transaction
      }
    );

    const response = await tx.wait();
    return response.transactionHash;
  }

  //Decode the event logs
  private async getDecodedLogsByMessageID(
    messageID: string
  ): Promise<ethers.utils.Result[]> {
    const logsFilter = this.contract.filters.Log(messageID);
    const events = await this.contract.queryFilter(logsFilter, 0, "latest");
    const decodedLogs: ethers.utils.Result[] = [];
    for (const event of events) {
      const block = await this.provider.getBlock(event.blockNumber);
      const timestamp = block.timestamp;

      const decodedLog = {
        ...this.contract.interface.decodeEventLog(
          EVENT_NAME,
          event.data,
          event.topics
        ),
        timestamp: timestamp,
        transactionHash: event.transactionHash,
      };

      decodedLogs.push(decodedLog);
    }

    return decodedLogs;
  }

  private async getDecodedLogByTransactionHash(
    transactionHash: string
  ): Promise<ethers.utils.Result> {
    const transactionReceipt = await this.provider.getTransactionReceipt(
      transactionHash
    );

    if (!transactionReceipt) {
      throw new Error("No transaction receipt found for the given hash");
    }

    const decodedLog = this.contract.interface.decodeEventLog(
      EVENT_NAME,
      transactionReceipt.logs[0].data,
      transactionReceipt.logs[0].topics
    );
    const block = await this.provider.getBlock(transactionReceipt.blockNumber);
    const timestamp = block.timestamp;

    const eventWithTimestamp = {
      ...decodedLog,
      timestamp: timestamp,
    };

    return eventWithTimestamp;
  }
}
