ARG NODE_VERSION=24.15.0

FROM node:${NODE_VERSION}-bookworm-slim AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM node:${NODE_VERSION}-bookworm-slim AS final

USER node

WORKDIR /usr/src/app

COPY --from=build --chown=node:node /usr/src/app/package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build --chown=node:node /usr/src/app/public/css ./public/css
COPY --from=build --chown=node:node /usr/src/app/public/dist ./public/dist
COPY --from=build --chown=node:node /usr/src/app/public/img ./public/img

COPY --from=build --chown=node:node /usr/src/app/controllers ./controllers
COPY --from=build --chown=node:node /usr/src/app/model ./model
COPY --from=build --chown=node:node /usr/src/app/routes ./routes
COPY --from=build --chown=node:node /usr/src/app/utils ./utils
COPY --from=build --chown=node:node /usr/src/app/views ./views
COPY --from=build --chown=node:node /usr/src/app/app.js ./
COPY --from=build --chown=node:node /usr/src/app/server.js ./

EXPOSE 8000

CMD ["node","server.js"]
