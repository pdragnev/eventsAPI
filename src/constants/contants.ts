//The address of the contract you want to interact with. This s
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";
export const EVENT_NAME = "Log";
//The private key of the wallet that will be paying for the transactions
export const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
export const MUMBAI_RPC_URL = "https://rpc-mumbai.maticvigil.com/";

//The RPC URL with which the the API will work. If no value is provided,
//it will default to the Polygon test net and all transactions will be recored there.
export const RPC_URL = process.env.RPC_URL || MUMBAI_RPC_URL;
