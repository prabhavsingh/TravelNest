ARG version=24

FROM node:${version}=bookworm-slim

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["node", "server.js"]