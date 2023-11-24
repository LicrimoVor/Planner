# build env
FROM node:16.20-alpine as build
WORKDIR '/app'

COPY package*.json ./
RUN npm install
COPY tsconfig.* .

COPY . .

RUN npm run build
CMD ["cp", "-r", "build", "result_build"]