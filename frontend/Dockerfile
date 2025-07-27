FROM node:22

# Create app directory
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build typescript
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Run app
CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0" ]
