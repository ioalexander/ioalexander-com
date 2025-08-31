FROM node:22-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn generate

FROM nginx:alpine
COPY --from=build /app/.output/public /usr/share/nginx/html
