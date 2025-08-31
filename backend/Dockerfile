# ----------------------
# Builder stage
# ----------------------
FROM node:22-alpine AS builder
WORKDIR /app

ARG BACKEND_PORT
ARG BACKEND_APP_DOMAIN
ARG BACKEND_TURNSTILE_SECRET_KEY
ARG BACKEND_TELEGRAM_NOTIFICATIONS_BOT_TOKEN
ARG BACKEND_TELEGRAM_NOTIFICATIONS_CHAT_ID

# Set build-time environment variables
ENV BACKEND_PORT=$BACKEND_PORT
ENV BACKEND_APP_DOMAIN=$BACKEND_APP_DOMAIN
ENV BACKEND_TURNSTILE_SECRET_KEY=$BACKEND_TURNSTILE_SECRET_KEY
ENV BACKEND_TELEGRAM_NOTIFICATIONS_BOT_TOKEN=$BACKEND_TELEGRAM_NOTIFICATIONS_BOT_TOKEN
ENV BACKEND_TELEGRAM_NOTIFICATIONS_CHAT_ID=$BACKEND_TELEGRAM_NOTIFICATIONS_CHAT_ID

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

# Set runtime environment variables (optional, can reuse ARGs or pass via Kubernetes)
ENV BACKEND_PORT=$BACKEND_PORT
ENV BACKEND_APP_DOMAIN=$BACKEND_APP_DOMAIN
ENV BACKEND_TURNSTILE_SECRET_KEY=$BACKEND_TURNSTILE_SECRET_KEY
ENV BACKEND_TELEGRAM_NOTIFICATIONS_BOT_TOKEN=$BACKEND_TELEGRAM_NOTIFICATIONS_BOT_TOKEN
ENV BACKEND_TELEGRAM_NOTIFICATIONS_CHAT_ID=$BACKEND_TELEGRAM_NOTIFICATIONS_CHAT_ID

EXPOSE $BACKEND_PORT
CMD ["yarn", "start"]
