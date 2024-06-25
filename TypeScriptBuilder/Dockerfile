FROM node:16-alpine

WORKDIR /app

ADD ./package.json .

RUN npm install

ADD ./tsconfig.json .

ADD ./src/ ./src/

RUN npx tsc
