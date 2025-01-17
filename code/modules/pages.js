const express = require('express');
const router = express.Router();
const logger = require('./logger.js');
const ollamaCommunication = require('./ollamaComunication.js')

router.get('/', (req, res) => {
    logger.log(req);
});

router.post('/request/translator/', async(req, res) => {
    logger.log(req.body, true);

    try {
        const {typeSelection, textType, languageInput, language} = req.body
        const response = await ollamaCommunication.translate(typeSelection, textType, languageInput, language);

        res.json({"translation": response});
    } catch (e) {
        res.status(500).json({"message": e})
    }
    
});

module.exports = router