# syntax=docker/dockerfile:1

################################################################################
# This is a multi stage Docker (build) file
################################################################################

## MariaDb Database

FROM mariadb:10.5.8

COPY scripts/init-users.sql /docker-entrypoint-initdb.d/init-users.sql

## React Js (frontend)

# the alias is for grabbing build artifacts in a later stage
FROM node:16-alpine as builder

# install dependencies to the image
COPY src/frontend /data/
RUN npm ci
ENV PATH /data/node_modules/.bin:$PATH

# copy the app files to the image
COPY src/frontend/ /app/

# build and the production app (this creates a build folder in the CWD)
WORKDIR /app
RUN npm run build

## Nginx Proxy Manager (rev proxy)

FROM jc21/nginx-proxy-manager:latest as production

ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html