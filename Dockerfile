# base image
FROM node:12-alpine

# Define current work directory
WORKDIR /usr/src/app

# Added package file
COPY package*.json ./

# Install deps
RUN npm install --quiet

# Copy source
COPY . .

# Build dist
RUN npm run build

# Expose port 1234
EXPOSE 1234

# Start server
CMD npm run start