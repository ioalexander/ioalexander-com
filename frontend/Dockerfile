FROM node:22-alpine as build
WORKDIR /app

ARG NUXT_PUBLIC_DOMAIN
ARG NUXT_PUBLIC_TURNSTILE_KEY
ARG NUXT_PUBLIC_API_BASE

ENV NUXT_PUBLIC_DOMAIN=$NUXT_PUBLIC_DOMAIN
ENV NUXT_PUBLIC_TURNSTILE_KEY=$NUXT_PUBLIC_TURNSTILE_KEY
ENV NUXT_PUBLIC_API_BASE=$NUXT_PUBLIC_API_BASE

# COPY package.json yarn.lock ./
# RUN yarn global add ts-node typescript
# RUN yarn install --production --frozen-lockfile && yarn cache clean
# COPY . .
# RUN yarn generate
#
# FROM nginx:alpine
# COPY --from=build /app/.output/public /usr/share/nginx/html
