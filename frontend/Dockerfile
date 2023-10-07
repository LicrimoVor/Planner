FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g typescript
# RUN npm install -g typescript

COPY . ./

RUN mkdir dist
RUN chmod +x /app/.
RUN chmod +x /bin/sh

RUN rm -rf node_modules
RUN npm run build_prod

CMD cp -r /app /frontend
