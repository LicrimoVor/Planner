FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install typescript

COPY . ./

RUN chmod +x /app/.
# RUN tsc
# RUN npx fix-esm-import-path dist
RUN npm run build_prod

CMD cp -r /app /frontend
