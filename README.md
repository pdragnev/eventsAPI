# NodeJS EventsAPI Almacena

This simple NodeJS API is responsible for receiving data and sending it to the configured smart contract address.
The API is configured to work with the Almacena AuditLog.sol contract.
You can simply build and run the API by running the following commands:

```shell
docker build -t eventsapi .
```
After the image has been build successfully, you can run it as a container with passing the following env variables:
PRIVATE_KEY - your wallet's private key
CONTRACT_ADDRESS - the contract'address
POLYGON_ETHERSCAN_API_KEY = the etherscan api key used to validate transactions
RPC_URL - the RPC_URL of the blockchain where the contract is deployed (Polygon MainNet, Mumbai Testnet, etc)

An example command:
```shell
docker run -e PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY" -e POLYGON_ETHERSCAN_API_KEY="your_api_key" -e CONTRACT_ADDRESS="CONTRACT_ADDRESS" eventsapi
```
If the container starts properly, you should see 
Server is listening on port 3000
On the console
# eventsAPI
