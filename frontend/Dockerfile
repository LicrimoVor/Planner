# build env
FROM node:16.20-alpine as build
WORKDIR '/app'

COPY package*.json ./
RUN npm install
COPY tsconfig.* .

RUN mkdir src
COPY ./src ./src
COPY ./craco.config.js ./

RUN mkdir public
COPY ./public ./public 

RUN npm run build
CMD ["cp", "-r", "build", "result_build"]