FROM alpine:3.8 as build
WORKDIR /usr/src/app
ENV PATH=node_modules/.bin:$PATH
RUN apk add --no-cache git npm
RUN npm set unsafe-perm true

COPY ./frontend/ .
RUN npm install
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/src/app
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
