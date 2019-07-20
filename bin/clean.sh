#!/bin/bash

sudo -u postgres psql -c "drop table recipe cascade;drop table auth_user cascade;drop table auth_user_recipe cascade;"
redis-cli FLUSHALL
npm run setup
