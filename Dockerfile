# syntax=docker/dockerfile:1

################################################################################
# This is a multi stage Docker (build) file
################################################################################

## React Js (production-spa-builder)

# the alias is for grabbing build artifacts in a later stage
FROM node:18-alpine as builder

# make a working directory for the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy config and install dependencies
COPY src/frontend/vite.config.ts src/frontend/tsconfig.node.json src/frontend/tsconfig.json ./
COPY src/frontend/package.json src/frontend/package-lock.json ./
RUN apk add --no-cache --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm ci

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# copy the app files to the image
COPY src/frontend/ ./

# build and the production app (this creates a build folder in the CWD)
RUN npm run build

## Nginx Proxy Manager (rev proxy)

FROM jc21/nginx-proxy-manager:latest as production

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
