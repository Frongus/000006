const fetch = require('node-fetch');
const apiUrl = process.env.LLAMAURL;
const logger = require('./logger.js');

logger.log(apiUrl)

module.exports = {
    translate: function(type, messageType, text, languageType) {
        const promise = new Promise((resolve, reject) => {
            // Dynamically set parameters in the prompt text
            const promptText = `seriousness: ${type},
                                type of text: ${messageType},
                                target language: ${languageType},
                                text:
                                ${text}`;
    
            fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({
                    "stream": false,
                    "prompt": promptText,
                    "model": "tranlator:V1",
                    "keep_alive": 1
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                logger.log(data.response);
                resolve(data.response); 
            })
            .catch(error => {
                logger.error(error); 
                reject(error);
            });
        });
    
        return promise;
    }
    
}