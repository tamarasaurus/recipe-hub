#!/bin/bash

# Run
redis-server &

# Start
cd app && npm run setup && npm start && cd ../ &
cd scraper && npm start