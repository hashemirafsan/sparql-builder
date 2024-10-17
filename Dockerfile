# Use the Ubuntu base image for better compatibility
FROM ubuntu:22.04

# Install Node.js and npm
RUN apt-get update && apt-get install -y   curl   git   python3   make   g++   && curl -fsSL https://deb.nodesource.com/setup_20.x | bash -   && apt-get install -y nodejs   && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage caching
COPY package*.json ./

# Install dependencies if package.json exists
RUN if [ -f package.json ]; then npm install; fi

# Copy the rest of the application
COPY . .

# Command to keep the container running without exposing a port initially
CMD ["tail", "-f", "/dev/null"]
