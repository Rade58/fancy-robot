# NO OP (INTENDED FOR CONTAINER TO RUMM TESTS IN IT)
# OVERKILL FOR MY USE CASE
FROM node:14.18.0-alpine3.11 AS base
WORKDIR /usr/src/app
RUN apk update \ 
  && apk add bash \
  && rm -rf /var/cache/apk/*
COPY . . 
RUN yarn install --frozen-lockfile
RUN yarn p:generate