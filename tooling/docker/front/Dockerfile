FROM node:22-alpine AS build

RUN apk add --no-cache make bash

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY front/package.json ./front/package.json
COPY shared/uikit/package.json ./shared/uikit/package.json
COPY shared/contracts/package.json ./shared/contracts/package.json
COPY shared/contracts/generate-front-types.sh ./shared/contracts/generate-front-types.sh

RUN pnpm install --frozen-lockfile

COPY . .

RUN make build-front

COPY tooling/docker/front/.env.docker ./front/.env

FROM nginx:alpine

COPY --from=build /app/front/dist /usr/share/nginx/html
COPY tooling/docker/front/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 1809

CMD ["nginx", "-g", "daemon off;"]