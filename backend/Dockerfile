# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Expose backend port
EXPOSE 4000

# Start server
CMD ["node", "server.js"]
