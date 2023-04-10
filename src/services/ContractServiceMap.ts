import { ethers, utils } from "ethers";
import { EventData } from "../interfaces/EventData";
import { Interface } from "ethers/lib/utils";
import { PRIVATE_KEY, EVENT_NAME } from "../constants/contants";

export class ContractServiceMap {
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

  async getEventsByName(dealId: string, fileId: string): Promise<EventData> {
    console.log("starting");
    const fileHashReturn = await this.contract.getLog(dealId, fileId);
    const eventData: EventData = {
      dealID: dealId,
      fileID: fileId,
      fileHash: fileHashReturn,
    };
    return eventData;
  }

  async writeEvent(data: EventData): Promise<void> {
    //TODO What about the [key: string]: string here and why we need it?
    const { dealID, fileID, fileHash } = { ...data };

    //const events: EventData[] = await this.getEventsByName(dealID, fileID);

    //if (events.length !== 0) {
    //  throw new Error(
    //    `Log with dealID ${dealID} and fileID ${fileID} already exist.`
    //  );
    // }
    const tx = await this.contract.log(dealID, fileID, fileHash);
    await tx.wait();
  }
}
