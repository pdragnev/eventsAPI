import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "dotenv/config";
import "hardhat-deploy";
import "solidity-coverage";
import { HardhatUserConfig } from "hardhat/config";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const MUMBAI_RPC_URL = process.env.RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const POLYGON_ETHERSCAN_API_KEY = process.env.POLYGON_ETHERSCAN_API_KEY || "";
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || "";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
    },
    mainnet: {
      url: POLYGON_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 137
    }
  },
  etherscan: {
    apiKey: POLYGON_ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
};

export default config;
