FROM node:current-alpine

LABEL maintainer="oliver.plummer@outlook.com"

COPY .env .
COPY .npmrc .
COPY dist dist
COPY package.json .

RUN npm i --production --legacy-peer-deps

ENTRYPOINT npm run host