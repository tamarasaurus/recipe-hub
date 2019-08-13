FROM alpine:3.8

WORKDIR /usr/src/app
ENV PATH=node_modules/.bin:$PATH

RUN apk add --no-cache git npm
RUN npm set unsafe-perm true

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8000
