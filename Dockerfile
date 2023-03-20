# syntax=docker/dockerfile:1

################################################################################
# This is a multi stage Docker (build) file
################################################################################


## React Js (frontend)

# the alias is for grabbing build artifacts in a later stage
FROM node:13.12.0-alpine as builder

WORKDIR src/

ENV PATH src/node_modules/.bin:$PATH

# install dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add the app
COPY . ./

# build and the production app (this creates a build folder in the CWD)
RUN npm run build

## Nginx Proxy Manager (rev proxy)

FROM jc21/nginx-proxy-manager:latest

COPY --from=builder /src/build /usr/share/nginx/html