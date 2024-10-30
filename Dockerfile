# Node Js runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /

#EXPOSE PORT
EXPOSE 3000

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies, including typescript if needed
RUN npm install
RUN npm install typescript

# Copy the rest of the application code
COPY . .

# Compile Typescript files
RUN npx tsc

#Make the compiled javascript CLI script executable
RUN chmod +x dist/index.js

#Set the default command to run the compiled Javascript CLI
ENTRYPOINT [ "node", "index.js" ]
