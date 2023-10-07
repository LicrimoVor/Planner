FROM node:18
WORKDIR /app
COPY . ./
RUN mkdir dist
RUN touch dist/init.js
RUN npm install
RUN npm run build
CMD cp -r /app /frontend
