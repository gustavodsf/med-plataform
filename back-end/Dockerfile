# pull official base image
FROM node:16-alpine3.11 as build-step

EXPOSE 5000

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD npm run dev