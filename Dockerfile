FROM node:18.16.0-alpine

# Create app directory
WORKDIR /usr/src

COPY package*.json ./

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

#Set ENV variables

ENV PRIVATE_KEY = $PRIVATE_KEY

ENV RPC_URL = $RPC_URL

#Expose server port

EXPOSE 3000

CMD ["npx", "ts-node", "src/index.ts"]