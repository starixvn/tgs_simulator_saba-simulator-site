
FROM node:18.18.0-alpine AS dependencies
ARG TRANSFORM_CONFIG
WORKDIR /app
COPY package.json yarn.lock ./

RUN  yarn install

FROM node:18.18.0-alpine AS builder
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules


COPY . .

RUN if [ "${TRANSFORM_CONFIG}" = "LOCAL" ]; then \
        yarn run build ; \
    else \
        yarn build; \
    fi

FROM caddy:2.1.1-alpine AS runner

COPY --from=builder /app/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /usr/share/caddy