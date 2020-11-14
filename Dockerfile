FROM node:10.22.1-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# copy in several steps to use advantage of Docker caching each step (also called layer)
COPY . .

RUN npm run build

# Stage 2
FROM nginx:1.13.12-alpine

# adapt to angular.json production build "outputPath"
COPY --from=node /usr/src/app/dist/machine-stream /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
