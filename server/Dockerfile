FROM node:18-slim

WORKDIR /app

# Copy package.json and package-lock.json first to cache npm install layer
COPY server/package*.json ./

# Install only production dependencies (cached)
RUN npm install --omit=dev

# Copy server build output (backend code) and other necessary files
COPY server/dist ./dist
COPY server/web-client-dist ./web-client-dist/
COPY server/.env.prod .env.prod

# Expose the necessary port (if your app listens on port 3001)
EXPOSE 3000

# Run the application with the 'start' script from package.json
CMD ["npm", "run", "start"]


