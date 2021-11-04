FROM node:14.18.1-alpine3.14 AS build

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

FROM node:14.18.1-alpine3.14

ARG PORT=8080

ENV PORT=${PORT}

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn install --prod --frozen-lockfile

COPY --from=build /home/app/dist ./dist

CMD ["node", "dist/main"]

EXPOSE ${PORT}
