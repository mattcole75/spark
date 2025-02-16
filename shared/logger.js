const bunyan = require('bunyan');
const config = require('../config/config');

const logger = () => {

    const logger = bunyan.createLogger({
        name: config.get('service'),
        streams: [{
            path: config.get('logPath')
        }],
        level: config.get('logLevel')
    });

    return logger;   
};


module.exports = logger;