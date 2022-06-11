const database = require('../config/database');

const postSensorData = (req, next) => {
    
    const dbConnect = database.getDb();

    dbConnect
        .collection('sensorData')
        .insertOne(req, function (err, res) {
        if(err)
            next({ status: 500, msg: err }, null);
        else
            next(null, { status: 201, data: res });
    });
}

const getSensorData = (req, next) => {

    const dbConnect = database.getDb();

    dbConnect
        .collection('sensorData')
        .find({})
        // .limit(200)
        .toArray(function (err, res) {
        if (err) 
            next({ status: 500, msg: err }, null);
        else 
            next(null, { status: 200, data: res });
        
        });
};

module.exports = {
    getSensorData: getSensorData,
    postSensorData: postSensorData 
}