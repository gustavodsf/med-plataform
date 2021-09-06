# pull official base image
FROM node:16-alpine3.11 as build-step

EXPOSE 3000

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:latest

COPY --from=build-step /app/build /usr/share/nginx/html