# syntax=docker/dockerfile:1.4

## frontend-spa hosted with production-proxy (nginx)

FROM node:18-alpine as spa-builder

# make a working directory for the SPA builder
WORKDIR /src

# copy config
COPY package.json package-lock.json vite.config.ts tsconfig.node.json tsconfig.json ./

# install deps
RUN apk add --no-cache --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm ci

ENV PATH /src/app/node_modules/.bin:$PATH

COPY . .

# executes vite build
RUN npm run build

FROM nginx:1.23.4-alpine-slim as production-proxy

# copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/includes/ /etc/nginx/includes

# copy the SPA app
COPY --from=spa-builder /src/dist /usr/share/nginx/html