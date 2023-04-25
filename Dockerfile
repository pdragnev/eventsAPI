FROM node:18-alpine

# Create app directory
WORKDIR /usr/src

COPY package*.json ./

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

ENV PRIVATE_KEY = $PRIVATE_KEY

ENV POLYGON_ETHERSCAN_API_KEY = $POLYGON_ETHERSCAN_API_KEY

ENV RPC_URL = RPC_URL

EXPOSE 3000

ENV POLYGON_ETHERSCAN_API_KEY = $POLYGON_ETHERSCAN_API_KEY



CMD ["npx", "ts-node", "src/index.ts"]