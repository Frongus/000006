const express = require('express');
const router = express.Router();
const logger = require('./logger.js');

router.get('/', (req, res) => {
    logger.log(req);
});

module.exports = router