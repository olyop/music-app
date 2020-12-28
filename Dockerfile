FROM node:current-alpine

ENV NODE_ENV=production

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN npm i --legacy-peer-deps
RUN npm run build

ENTRYPOINT npm run host