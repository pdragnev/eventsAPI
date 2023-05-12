FROM node:18.16.0-alpine

# Create app directory
WORKDIR /usr/src

COPY package*.json ./

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

#Expose server port

EXPOSE 3000

CMD ["npx", "ts-node", "src/index.ts"]