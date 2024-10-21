# Use the official Node image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock (if available)
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --production

# Copy the rest of the application code
COPY . .

# Build the Next.js app for production
RUN yarn build

# Expose the port on which Next.js will run (default: 3000)
EXPOSE 3000


# Start the Next.js server in production mode
CMD ["yarn", "start"]
