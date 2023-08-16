# syntax=docker/dockerfile:1

# See docker-compose[.prod].yaml for customized CMD steps (depends on different `npm run ...` scripts)

# Copy without building, enables dev-hosting w/ live-reloading
FROM node:latest as dev_target
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY jest.config.js nodemon.json tsconfig.json ./
COPY src ./

# Compile javascript app
FROM dev_target as prod_target
ENV NODE_PATH=./build
RUN npm run build
