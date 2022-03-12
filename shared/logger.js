// Description: The application logging utility
// Developer: Matt Cole
// Date created: 2022-03-11
// Change history:
//  1. 

const bunyan = require('bunyan');
const config = require('../config/config');

const logger = () => {

    const logger = bunyan.createLogger({
        name: config.get('application'),
        streams: [{
            path: process.env.LOG_PATH,
        }],
        level: process.env.LOG_LEVEL
    });

    return logger;   
};


module.exports = logger;