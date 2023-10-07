FROM node:18-alpine as build
WORKDIR /app
COPY . ./
COPY package*.json ./
RUN mkdir dist
RUN touch dist/init.js
RUN npm install
RUN npm run build
CMD cp -r /app /frontend
