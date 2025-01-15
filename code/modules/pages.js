const express = require('express');
const router = express.Router();
const logger = require('./logger.js');

router.get('/', (req, res) => {
    logger.log(req);
});

router.post('/request/translator/', (req, res) => {
    logger.log(req.body, true);
    res.status(200).send('Request received');
});

module.exports = router