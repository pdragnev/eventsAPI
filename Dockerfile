FROM node:18.16.0-alpine

# Create app directory
WORKDIR /usr/src

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ENV PRIVATE_KEY = $PRIVATE_KEY

ENV POLYGON_ETHERSCAN_API_KEY = $POLYGON_ETHERSCAN_API_KEY

ENV POLYGON_RPC_URL = $POLYGON_RPC_URL

ENV MUMBAI_RPC_URL = $MUMBAI_RPC_URL

EXPOSE 3000

CMD [ "npx", "hardhat", "run", "src/index.ts", "--network", "mumbai"]
