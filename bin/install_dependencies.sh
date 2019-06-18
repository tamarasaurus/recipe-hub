#!/bin/bash

# Install dependencies
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib
sudo -u postgres createuser -D -A postgres
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
sudo apt-get install -y redis-server

# Setup
cp .env.dist .env
cd scraper && npm install && cd ../
cd app && npm install &&
cd frontend && npm install && npm run build && cd ../../

