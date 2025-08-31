# ----------------------
# Builder stage
# ----------------------
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache sqlite python3

COPY package.json yarn.lock ./
RUN yarn global add ts-node typescript
RUN yarn install --frozen-lock-file
COPY . .

# Build the project
RUN yarn build

# ----------------------
# Runner stage
# ----------------------
FROM node:22-alpine AS runner
WORKDIR /app

# Copy build artifacts and node_modules from builder
COPY --from=builder /app /app

# Only install production dependencies
RUN yarn install --frozen-lock-file --production && yarn cache clean

EXPOSE 4000
CMD ["yarn", "start"]
