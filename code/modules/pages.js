const express = require('express');
const router = express.Router();
const logger = require('./logger.js');

router.get('/', (req, res) => {
    logger.log(req);
});

router.post('/request/translator/', (req, res) => {
    logger.log(req.body, important);
})

module.exports = router