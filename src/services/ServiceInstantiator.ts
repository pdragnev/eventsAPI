import {
  CONTRACT_ADDRESS,
  MAP_CONTRACT_ADDRESS,
  MUMBAI_RPC_URL,
} from "../constants/contants";
import { CONTRACT_ABI, CONTRACT_MAP_ABI } from "../contractABIs/contractABIs";
import { ContractService } from "./ContractService";
import { ContractServiceMap } from "./ContractServiceMap";

class ServiceInstantiator {
  private contractService: ContractService | null = null;
  private contractServiceMap: ContractServiceMap | null = null;

  getContractService(): ContractService {
    if (!this.contractService) {
      this.contractService = new ContractService(
        CONTRACT_ABI,
        MUMBAI_RPC_URL,
        CONTRACT_ADDRESS
      );
    }
    return this.contractService;
  }
  getContractServiceMap(): ContractServiceMap {
    if (!this.contractServiceMap) {
      this.contractServiceMap = new ContractServiceMap(
        CONTRACT_MAP_ABI,
        MUMBAI_RPC_URL,
        MAP_CONTRACT_ADDRESS
      );
    }
    return this.contractServiceMap;
  }
}

export const serviceInstantiator = new ServiceInstantiator();
