# Use an official Node.js runtime as the base image
FROM node:18.14.2

# Set the working directory in the container
WORKDIR /dbackup-ui

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the built app files to the container
COPY . .

# Build the React app
RUN npm run build

# Install `serve` globally
RUN npm install -g serve

# Expose a port (change if necessary)
EXPOSE 80

# Start the app with `serve`
CMD ["serve", "-s", "build", "-l", "80"]
