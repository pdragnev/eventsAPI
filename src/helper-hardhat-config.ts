export interface networkConfigItem {
    maticUsdPriceFeed?: string;
    blockConfirmations?: number;
}

export interface NetworkConfigInfo {
    [key: string]: networkConfigItem;
}

export const networkConfig: NetworkConfigInfo = {
    localhost: {},
    hardhat: {},
}

export const developmentChains = ['hardhat', 'localhost'];