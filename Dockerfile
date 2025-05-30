# Use a minimal and secure Node.js base image with pinned digest
FROM node:22-slim

# Set working directory
WORKDIR /usr/src/app

# Copy only package files first for better Docker caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy rest of the app
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
