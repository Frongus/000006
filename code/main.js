require('dotenv').config();
const bodyParser = require('body-parser')
const logger = require('./modules/logger.js');
const express = require('express');
const server = express();

server.use(bodyParser.json())
server.use('/', require('./modules/pages.js'));
server.use(express.static('./public'));

console.log(
    `=====================================================================================\n`,
    `\n`,
    `Variable information: \n`,
    `\n`,
    `  Debug: ${process.env.DEBUG}\n`,
    `  Port: ${process.env.PORT}\n`,
    `  Ollama URL: ${process.env.LLAMAURL}\n`,
    `\n`,
    `GMG-COMPANY PROPERTY NOT FOR COMERCIAL USE\n`,
    `\n`,
    `Powerd by Ollama\n`,
    `\n`,
    `=====================================================================================\n`,
    `Server Log:\n`
)

server.listen(process.env.PORT, (err) => {
    if(err) {
        logger.log(err);
    } else {
        logger.log(`Server is running on Port ${process.env.PORT}`, true)
    }
})