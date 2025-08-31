FROM node:22-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN printenv
RUN yarn global add ts-node typescript
RUN yarn install --production --frozen-lockfile && yarn cache clean
COPY . .
RUN yarn generate

FROM nginx:alpine
COPY --from=build /app/.output/public /usr/share/nginx/html
