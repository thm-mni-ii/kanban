FROM node:22-alpine

WORKDIR /app

ADD ./package.json .

RUN npm install

ADD ./tsconfig.json .

ADD ./src/ ./src/

RUN npx tsc
