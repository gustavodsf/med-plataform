# pull official base image
FROM node:16-alpine3.11 as build-step

EXPOSE 80

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm install -g serve

RUN npm run build

CMD serve -s build -p 80