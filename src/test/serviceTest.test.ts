import { ContractService } from "../services/ContractService";
import { serviceInstantiator } from "../services/ServiceInstantiator";

describe('Service test', () => {
    let contractService: ContractService;

    beforeEach(() => {
        contractService = serviceInstantiator.getContractService();
        
    })
    
    test(async () => {
        const result = await contractService.writeEvent({
            messageHash: '412i419skxuaujdas',
            dealID: 'dsai41',
            messageID: 'd9xdsads11412gfasda',
            fileHash: '2159591fksadkasdo4124'
        })
        console.log(result);
    })
});