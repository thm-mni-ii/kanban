FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
RUN npm install express
RUN npm install pg
RUN npm install cors

# Copy all files
COPY . .

# Expose port 3000
EXPOSE 3000

# Run app
CMD [ "node", "expressAPI.js" ]