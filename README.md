# recipe-hub

[![Build Status](https://travis-ci.org/tamarasaurus/recipe-hub.svg?branch=master)](https://travis-ci.org/tamarasaurus/recipe-hub)

Scrapes and store recipes to generate shopping lists

### Sites
- [x] HelloFresh
- [x] Quitoque
- [x] Les commis
- [x] Bon Appetit
- [ ] Blue Apron
- [ ] Foodette

## Setup


```bash
cp .env.dist .env
```

In `.env`, replace `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` with real values.

```bash
export $(cat .env)
./bin/install_dependencies.sh
./bin/run.sh
```

Go to http://localhost:8000
