FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache python3 make g++ tree

# Copy everything except node_modules, dist, logs, git, etc.
COPY . .

# Install dependencies once at root
RUN npm install

# Build server
RUN npm run --prefix server build

# Build web-client
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run --prefix web-client build

# Copy web-client/dist into server/dist/web-client-dist
RUN mkdir -p server/dist/web-client-dist && \
  cp -r web-client/dist/* server/dist/web-client-dist/

# Start server from /app/server
WORKDIR /app/server
CMD ["npm", "run", "start"]
