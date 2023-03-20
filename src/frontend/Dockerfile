# syntax=docker/dockerfile:1
# add a node runtime
FROM node:13.12.0-alpine

WORKDIR src/

ENV PATH src/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add the app
COPY . ./

# start the app
CMD ["npm", "start"]
