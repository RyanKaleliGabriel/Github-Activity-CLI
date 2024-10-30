# Node Js runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies, including typescript if needed
RUN npm Install

# Copy the rest of the application code
COPY . .

# Compile Typescript files
RUN npx tsc

#Make the compiled javascript CLI script executable
RUN chmod +x dist/index.json

#Set the default command to run the compiled Javascript CLI
ENTRYPOINT [ "node", 'dist/index.js' ]
