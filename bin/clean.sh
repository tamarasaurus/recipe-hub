#!/bin/bash

docker-compose exec postgres psql -U postgres postgres -c '\pset pager off' -c "drop table recipe cascade;drop table auth_user cascade;drop table auth_user_recipe cascade;"
docker-compose exec redis redis-cli FLUSHALL
docker-compose restart api app
