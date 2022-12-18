FROM node:14.17-alpine

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache protobuf-dev

COPY ./package*.json .

RUN npm install