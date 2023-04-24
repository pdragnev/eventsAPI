FROM node:18.16.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npx", "hardhat", "run", "src/index.ts", "--network", "mumbai"]
