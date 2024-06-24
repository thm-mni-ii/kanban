FROM node:16

# Create app directory
WORKDIR /usr/src/app

# copy dependencies
ADD ./package.json .

# Install dependencies
RUN npm install


# Copy 
ADD ./services ./services
ADD ./TS ./TS
ADD ./tsconfig.json ./

RUN npx tsc -init
RUN npx tsc

# Copy all other files
ADD . .

# Expose port 3000
EXPOSE 3000

# Run app
CMD [ "node", "expressAPI.js" ]

# ENTRYPOINT [ "executable" ]