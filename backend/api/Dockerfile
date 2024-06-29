FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# copy dependencies
ADD ./package.json .

# Install dependencies
RUN npm install

# Copy all other files
ADD . .

# Expose port 3000
EXPOSE 3000

# Run app
CMD [ "node", "expressAPI.js" ]