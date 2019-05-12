#!/bin/bash

docker-compose exec postgres psql -U postgres postgres -c '\pset pager off' -c "drop table recipes"
docker-compose exec redis redis-cli FLUSHALL
docker-compose restart api
docker-compose exec api npm run setup
