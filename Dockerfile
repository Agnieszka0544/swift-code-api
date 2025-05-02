# Use Node base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 8080

# Start the app
CMD ["node", "build/server.js"]
