import { ethers } from "ethers";
import { EventData } from "../interfaces/EventData";
import { Interface } from "ethers/lib/utils";
import { log } from "console";

export class ContractService {
    private provider: ethers.providers.JsonRpcProvider;
    private contract: ethers.Contract;
    private contractInterface: ethers.utils.Interface;
    private logEvent: ethers.utils.EventFragment;

    constructor(
        private readonly contractAbi: any,
        private readonly rpcUrl: string,
        private readonly contractAddress: string
        ) {

        // Create an Ethers provider for the Mumbai testnet
        this.provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
        this.contract = new ethers.Contract(
            this.contractAddress, 
            this.contractAbi, 
            this.provider
        );

        // Get the interface of the contract
        this.contractInterface = new Interface(contractAbi);
        this.logEvent = this.contractInterface.getEvent('Log');
    }

    async getEventsByName(dealId: string, fileId: string): Promise<EventData[]>  {
        const decodedLogs = await this.getDecodedLogs(dealId, fileId);
        const indexedParams = this.getIndexedParams();
        const eventsArray = decodedLogs.map((log) => {
            const eventObj: EventData = {} as EventData;
            indexedParams.forEach((paramName, index) => {
              const paramValue = decodedLogs[0][index].toString();
              eventObj[paramName] = paramValue;
            });
            return eventObj;
          });
          return eventsArray;
    }

    // Get the names of the indexed parameters for the event
    private getIndexedParams(): string[] {
        return this.logEvent.inputs
        .filter((input) => input.indexed)
        .map((input) => input.name);
    }

    private async getDecodedLogs(dealId: string, fileId: string): Promise<ethers.utils.Result[]> {
        const logsFilter = this.contract.filters.Log(dealId, fileId);
        const events = await this.contract.queryFilter(logsFilter, 0, 'latest');
        const decodedLogs: ethers.utils.Result[] = [];
        events.map((event: ethers.Event) => {
            const decodedLog = this.contract.interface.decodeEventLog('Log', event.data, event.topics);
            decodedLogs.push(decodedLog);
        })
        return decodedLogs;
    }

}