# Use Node.js as base image
FROM node:18-alpine AS base

# Install dependencies for Python
RUN apk add --no-cache python3 py3-pip

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Install Python dependencies
RUN cd backend && pip3 install -r requirements.txt

# Build the Next.js application
RUN npm run build

# Expose ports for Next.js and FastAPI
EXPOSE 3000 8000

# Create a script to start both servers
RUN echo '#!/bin/sh\ncd backend && python3 main.py & npm start' > start.sh
RUN chmod +x start.sh

# Start both servers
CMD ["./start.sh"]
