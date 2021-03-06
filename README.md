# recipe-hub

[![Build Status](https://travis-ci.org/tamarasaurus/recipe-hub.svg?branch=master)](https://travis-ci.org/tamarasaurus/recipe-hub)

Recipe Hub scrapes and stores recipes from subscription box websites. With Recipe Hub you can choose your recipes for the week and generate a shopping list for all the ingredients. Logging in with Google lets you save, like, and exclude recipes.

![Recipe Hub UI](https://user-images.githubusercontent.com/1336344/61590615-49b04180-abbc-11e9-814b-033266874edb.png)

### Scraped sites
- [x] Quitoque
- [x] Les commis
- [x] Bon Appetit
- [x] Blue Apron
- [ ] Foodette

## Setup

### With docker and docker-compose

```bash
cp .env.dist .env
export $(cat .env)
docker-compose up --build
```

### Without docker

```bash
cp .env.dist .env
./bin/install_dependencies.sh
./bin/run.sh
```

Go to http://localhost:8000


## Mock setup

```
cd frontend && REACT_APP_API_URL=http://localhost:4000 npm start
cd test && npm start
```
