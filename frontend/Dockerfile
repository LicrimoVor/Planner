FROM node:16.20-alpine
WORKDIR '/app'

COPY package*.json ./
RUN npm install
RUN npm install --save-dev @types/uuid
COPY tsconfig.* .
COPY . ./

RUN npm run build
CMD ["cp", "-r", "build", "result_build"]