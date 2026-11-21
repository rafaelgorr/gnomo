FROM rust:1-alpine AS build

RUN apk add --no-cache \
    make \
    bash \
    build-base \
    nodejs \
    npm \
    openssl-dev \
    pkgconf \
    ca-certificates

RUN npm install -g pnpm

WORKDIR /app

COPY core/package.json ./core/package.json
COPY shared/contracts/package.json ./shared/contracts/package.json
COPY shared/contracts/generate-back-types.sh ./shared/contracts/generate-back-types.sh

COPY . .

COPY tooling/docker/back/.env.docker ./back/.env
COPY tooling/docker/back/.env.docker ./core/.env

RUN pnpm install --frozen-lockfile

EXPOSE 8086