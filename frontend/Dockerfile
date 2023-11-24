FROM node:16.20-alpine
WORKDIR '/app'

COPY package.json .
RUN npm install
COPY tsconfig.* .
COPY craco.config.js .

RUN mkdir src
COPY src ./src

RUN mkdir public
COPY public ./public
RUN npm run build
CMD cp -r build result_build