# Stage 1: Build Stage
FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN yarn build

# Stage 2: Production Stage
FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
