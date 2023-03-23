# syntax=docker/dockerfile:1

################################################################################
# This is a multi stage Docker (build) file
################################################################################

## React Js (production-spa-builder)

# the alias is for grabbing build artifacts in a later stage
FROM node:18-alpine as builder

# # make a working directory for the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependencies to the image
COPY src/frontend/vite.config.ts src/frontend/tsconfig.node.json src/frontend/tsconfig.json src/frontend/package.json src/frontend/package-lock.json /usr/src/app/
RUN npm ci --legacy-peer-deps

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# copy the app files to the image
COPY src/frontend/ /usr/src/app/

# build and the production app (this creates a build folder in the CWD)
RUN npm run build

## Nginx Proxy Manager (rev proxy)

FROM jc21/nginx-proxy-manager:latest as production

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
