FROM node:18-alpine as build

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install
RUN npm install -g typescript
# RUN npm install -g typescript

COPY . ./

RUN mkdir dist
RUN chmod +x /bin/sh
RUN chmod +x node_modules

# RUN rm -rf node_modules
RUN npm run build_prod
