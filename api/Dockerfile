# syntax=docker/dockerfile:1

# See docker-compose[.prod].yaml for customized CMD steps (depends on different `npm run ...` scripts)

# Copy without building, enables dev-hosting w/ live-reloading
FROM node:latest as dev_target

ARG PORT=8080
ARG DB_URL=postgresql://eblackwelder:assessment@db:5432/stratusgrid
ENV PORT=${PORT}
ENV DB_URL=${DB_URL}

EXPOSE ${PORT}
WORKDIR /home/node/app
CMD npm run dev-server
COPY package*.json ./
RUN npm install
COPY jest.config.js nodemon.json tsconfig.json ./
COPY src ./

# Compile javascript app
FROM dev_target as prod_target
ENV NODE_PATH=./build
RUN npm run build
