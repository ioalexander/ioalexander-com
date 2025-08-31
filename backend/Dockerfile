FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lock-file --production && yarn cache clean
COPY . .
CMD ["yarn", "start"]
