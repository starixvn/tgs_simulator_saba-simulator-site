
FROM node:18.18.0 AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./

RUN  yarn install

FROM node:18.18.0 AS builder
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules


COPY . .


RUN yarn build


FROM caddy:2.1.1-alpine AS runner

COPY --from=builder /app/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /usr/share/caddy