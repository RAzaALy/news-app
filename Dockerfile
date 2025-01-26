# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the application (optional step, for production builds)
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev"]
