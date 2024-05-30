# Use the official Node.js image
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon  

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3333

# Start the app
CMD ["nodemon", "index.js"]
