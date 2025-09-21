FROM node:22

# Create app directory
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

ARG VITE_APP_API_URL=/kanban/api
ARG VITE_BASE_URL=/kanban/

# Build typescript
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Run app
CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0" ]
