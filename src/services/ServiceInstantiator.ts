import { CONTRACT_ADDRESS, RPC_URL } from "../constants/contants";
import { CONTRACT_ABI } from "../contractABIs/contractABIs";
import { ContractService } from "./ContractService";

class ServiceInstantiator {
  private contractService: ContractService | null = null;

  getContractService(): ContractService {
    if (!this.contractService) {
      this.contractService = new ContractService(
        CONTRACT_ABI,
        RPC_URL,
        CONTRACT_ADDRESS
      );
    }
    return this.contractService;
  }
}

export const serviceInstantiator = new ServiceInstantiator();
