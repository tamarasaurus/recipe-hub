FROM alpine:3.8 as build

WORKDIR /usr/src/app
ENV PATH=node_modules/.bin:$PATH

RUN apk add --no-cache git npm
RUN npm set unsafe-perm true

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
