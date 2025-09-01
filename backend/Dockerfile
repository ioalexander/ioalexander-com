# ----------------------
# Builder stage
# ----------------------
FROM node:22-slim AS builder
WORKDIR /app

# Install build tools for native modules
RUN apt-get update && apt-get install -y python3 make g++ sqlite3 bash

COPY package.json yarn.lock ./

RUN yarn global add ts-node typescript

RUN yarn install --frozen-lockfile --production

COPY . .

RUN yarn build

# ----------------------
# Runner stage
# ----------------------
FROM node:22-slim AS runner
WORKDIR /app

# Copy build artifacts and node_modules from builder
COPY --from=builder /app /app

RUN mkdir -p /app/db_data

# Reinstall only production dependencies to reduce image size
RUN yarn install --frozen-lockfile --production && yarn cache clean

EXPOSE 4000
CMD ["yarn", "start"]
