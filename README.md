# NodeJS EventsAPI Almacena

This simple NodeJS API is responsible for receiving data and sending it to the configured smart contract address.
The API is configured to work with the Almacena AuditLog.sol contract.

The API exposes a single endpoint with a GET and POST request at /api/v1/logs:
The API works with a single data interface - EventsData

# Event Data Interface
1) GET - used to retrieve an EventsData object from the blockchain by passing a messageID or transactionHash query parameter. For example:
   ````javascript
    /api/v1/logs?messageID=10
   ````
      ````javascript
    /api/v1/logs?transactionHash=0x50eede617b046b61871bdb4fbfcfdb246adc80dbc44e0bf9e9283aca3f5f97e3
   ````
   On valid request the responce is:
    ````typescript
   messageID: string;
   messageHash: string;
   fileHash: string;
   dealID: string;
   timestamp: string;
   transactionHash: string; //Only visible when calling with messageID
   ````

2) POST - used to write an EventsData object to the blockchain, following the EventsData interface, in the request body

    ````javascript
    /api/v1/logs
    ````
    Example request body:
    ````javascript
    {
    "messageID":"7",
    "messageHash":"exampleMessageHash",
    "dealID": "DealIDHash",
    "fileHash": "FileHash"
    }
    ````
You can simply build and run the API by running the following commands:



```shell
docker build -t eventsapi .
```
After the image has been build successfully, you can run it as a container with passing the following env variables:
PRIVATE_KEY - your wallet's private key
CONTRACT_ADDRESS - the contract'address
RPC_URL - the RPC_URL of the blockchain where the contract is deployed (Polygon MainNet, Mumbai Testnet, etc)

An example command:
```shell
docker run -p 3000:3000 -e PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY" -e CONTRACT_ADDRESS="CONTRACT_ADDRESS" -e RPC_URL="RPC_URL" eventsapi
```
If the container starts properly, you should see 
Server is listening on port 3000
On the console
