const Arena = require('bull-arena');
const express = require('express');
const router = express.Router();

const arena = Arena({
  queues: [
    {
        "name": "scraping",
        "hostId": "scraping",
        "host": "cache",
        "port": 6379
    },
  ]
});

router.use('/', arena);
