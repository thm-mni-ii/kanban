FROM node:20

WORKDIR /kanban/backend/api

COPY package*.json ./

RUN yarn install

COPY . .

# tells the container which port to use. (you find the number of the port in the index.js -> const port)
EXPOSE 3000

# command to run when container is started.
CMD [ "node", "index.js" ]
