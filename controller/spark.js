const repository = require('../repository/spark');
const log = require('../shared/logger')();
const config = require('../config/config');
const version = config.get('version');
const moment = require('moment');

const postSensorData = (req, next) => {

    let data = {
        ...req.body,
        serverTimestamp: moment().format()
    }

    repository.postSensorData(data, (err, data) => {
        if(err) {
            log.error(`status: ${err.status} POST (postSensorData) v${version} failed error: ${err}`);
            next({ status: err.status, msg: 'Internal Server Error' }, null);
        } else {
            log.info(`status: ${data.status} POST (postSensorData) v${version} success`);
            next(null, data);
        }
    });
};

const getSensorData = (req, next) => {
    repository.getSensorData(req, (err, data) => {
        if(err) {
            log.error(`status: ${err.status} GET (getSensorData) v${version} failed error: ${err}`);
            next({ status: err.status, msg: 'Internal Server Error' }, null);
        } else {
            log.info(`status: ${data.status} GET (getSensorData) v${version} success`);
            next(null, data);
        }
    });
};

module.exports = {
    getSensorData: getSensorData,
    postSensorData: postSensorData
}