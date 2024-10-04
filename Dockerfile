
FROM node:18.18.0-alpine AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install

FROM node:18.18.0-alpine AS builder
WORKDIR /app

ARG TRANSFORM_CONFIG

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN if [ "${TRANSFORM_CONFIG}" = "LOCAL" ]; then \
        yarn run build ; \
    elif [ "${TRANSFORM_CONFIG}" = "UAT" ]; then \
        yarn run build:uat ; \
    elif [ "${TRANSFORM_CONFIG}" = "PROD" ]; then \
        yarn run build:prod ; \
    else \
        yarn build; \
    fi

FROM caddy:2.1.1-alpine AS runner

COPY --from=builder /app/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /usr/share/caddy