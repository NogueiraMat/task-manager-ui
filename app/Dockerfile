FROM node:18-alpine

WORKDIR /app

COPY package.json package.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

ENV NODE_OPTIONS="--openssl-legacy-provider"

CMD [ "npm", "run", "start" ]
