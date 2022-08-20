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
    const { param } = req.headers;
    let query = null;

    if(param)
        query = { id: param };

    dbConnect
        .collection('sensorData')
        .find(query)
        // .limit(200)
        .toArray(function (err, res) {
        if (err)
            next({ status: 500, msg: err }, null);
        else
            next(null, { status: 200, data: res });
        });
};

const getSensorDatAaggregate = (req, next) => {

    const dbConnect = database.getDb();
    const { param } = req.headers;

    const query = [
        { $project: { date: { $dateToParts: { date: "$timestamp" } }, id: 1, value: 1 } },
        { $group: { _id: { id: "$id", date: { year: "$date.year", month: "$date.month", day: "$date.day" } }, min: { $min: "$value" }, max: { $max: "$value" }, avg: { $avg: "$value" } } }
    ];

    if(param)
        query.unshift(
            { $match: { id: param } }
        );

    dbConnect
        .collection('sensorData')
        .aggregate(query)
        .toArray(function (err, res) {
        if (err)
            next({ status: 500, msg: err }, null);
        else
            next(null, { status: 200, data: res });
        });

};

module.exports = {
    getSensorData: getSensorData,
    postSensorData: postSensorData,
    getSensorDatAaggregate: getSensorDatAaggregate
}