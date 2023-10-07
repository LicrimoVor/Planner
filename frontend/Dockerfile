FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

# RUN chmod +x filename
# RUN mkdir dist
# RUN touch dist/init.js

RUN npm run build_prod

CMD cp -r /app /frontend
