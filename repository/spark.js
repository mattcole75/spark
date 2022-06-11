const database = require('../config/database');

const postSensorData = (req, next) => {
    
    const dbConnect = database.getDb();

    dbConnect
        .collection('sensorData')
        .insertOne(req, function (err, result) {
        if(err)
            next({status: 400, msg: err}, null);
        else
            next(null, {status: 201});
    });
}

const getSensorData = (req, next) => {

    const dbConnect = database.getDb();

    dbConnect
        .collection('sensorData')
        .find({})
        // .limit(200)
        .toArray(function (err, result) {
        if (err) 
            next({status: 400, msg: err}, null);
        else 
            next(null, {status: 200});
        
        });
};

module.exports = {
    getSensorData: getSensorData,
    postSensorData: postSensorData 
}