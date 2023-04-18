import { expect } from "chai";
import { ContractService } from "../services/ContractService";
import { serviceInstantiator } from "../services/ServiceInstantiator";

describe('Service test', () => {
    let contractService: ContractService;

    beforeEach(() => {
        contractService = serviceInstantiator.getContractService();
        
    })
    
    it('contract service will fail for existing', async () => {
        const promise = contractService.writeEvent({
            messageHash: '412i419skxuaujdas',
            dealID: 'dsai41',
            messageID: '12345868',
            fileHash: '2159591fksadkasdo4124'
        })
        await expect(promise).to.throw;
    })
});