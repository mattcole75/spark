# SPARK
Node Express MongoDB api for a sensor network

## Introduction
Spark is intended to be lightweight and quick to deploy data repository with basic HTTPS POST and GET interfaces. The software was developed to support developments in sensor technology within Manchester Metrolink.

The problem was getting important sensor data back to a data repository for analysis. Single board computers with temperature sensors were being deployed to monitor environments across the network. The biggest limitation was that someone had to return to each site periodically to copy the data before any analysis could take place.

SPARK is a stand-alone web service specifically designed to accept data in any JSON format (no defined schema). Deploying IOT SIM cards and hardware utilising GPRS HTTPS requests meant that data could be automatically sent to an endpoint on the Internet. The SPARK application was developed to act as the endpoint exposing POST and GET methods through an SSL encrypted apache web server. Amazon AWS was used as a proof of concept and has remained in operation since.

More and more sensors with more data and system resource demands will require and rethink around the architecture for scalability. I imagine some queuing or load balancing technology would need to be deployed to ensure no data transmissions are missed. The system has a basic fixed token security challenge which could do with some enhancements to improve security.

## Requirements
1. Node.JS needs to be installed. (>= v16).
2. Linux or Apple OS only, this has not been tested with windows.
3. MongoDb need to be installed (>v6)

## Concepts
1. SPARK uses various mainstream libraries to function correctly, at its core there is Node.JS and Express.
2. SPARK is an API not designed for heavy loads.
3. The MongoDB is set up to use time series data which automatically deletes after a defined time. This is defined in the package.json file. 

## Quick Start

1. Create a config.js file in the config directory. Add the following to the file and adjust to your environment.
    ```
    const convict = require('convict');

    const config = convict({
        version: {
            type: String,
            default: '0.1'
        },
        service: {
            type: String,
            default: 'spark'
        },
        port: {
            type: Number,
            default: 1337
        },
        connectionString: {
            type: String,
            default: "mongodb://localhost:27017/"
        },
        securityToken: {
            type: String,
            default: "[add your fixed token here]"
        },
        logPath: {
            type: String,
            default: "./logs/spark.log"
        },
        logLevel: {
            type: String,
            default: "info"
        }
    });

    module.exports = config;
    ```
- The security token for SPARK is short usually under 16 characters. This is because space in the sensor hardware is limited.
- Check the connection string is right for your systems configuration.
2. Run the install and setup the database

    ```bash
    npm install
    npm run dbInit1
    npm run spark
    ```
Spark should be running on your system now.

## Database
The system is using MongoDB and a time series setup to optimise the storage of data.

The collection take the following form:
```
db.createCollection("sensorData", {
  timeseries: {
    timeField: "timestamp",
    metaField: "id",
    granularity: "minutes"
  },
    expireAfterSeconds: 31536000
});
```

An example of an insert statement for the above collection will be:
```
db.sensorData.insertOne({id: "RIG-R&D-TMP-003", timestamp: new Date(), value: "22"})
```

## Usage

### POST Sensor Record:
This API will accept the id and sensor payload and store it in the database. The server date and time is added to each payload.
```
POST http://localhost:1337/spark/api/0.1/sensordata

Requires JSON Header:
    {
        idToken: 'a pre configured access token check your config'
    }

Requires JSON Body:
    [{
        id: 'sensor id',
        value: 20, // this must be a numerical value for the aggregate GET request to work correctly
        eventTimestamp: // the new Date().toISOString() from the edge device.
    }]

Returns:
    - 201 Created, returns the uid and transaction status
    - 401 Unauthorised
    - 500 Internal error message
```

### GET Sensor Records:
This API will return all sensor records
```
GET http://localhost:1337/spark/api/0.1/sensordata

Requires JSON Header:
    {
        idToken: 'a pre configured access token',
        param: 'optional sensor ID'
    }

Returns:
    - 200 ok, returns the stored sensor data array
    - 401 Unauthorised
    - 500 Internal error message
```

### GET Sensor Records Aggregated:
This API will return all sensor records aggregated for a report
```
GET http://localhost:1337/spark/api/0.1/sensordataaaggregate

Requires JSON Header:
    {
        idToken: 'a pre configured access token',
        param: 'optional sensor ID'
    }

Returns:
    - 200 ok, returns the stored sensor data array
    - 401 Unauthorised
    - 500 Internal error message
```

### GET API Status:
This API will return the matching locations provided it is in use for all levels.
```
GET http://localhost:1337


Returns:
    - 200 ok, msg: The server is up!
```

## License
[GNU GENERAL PUBLIC LICENSE V3](https://www.gnu.org/licenses/gpl-3.0.en.html)

## Deployment
if you want to deploy the system then check out the serverAsBuilt.md for more information.

## FAQ
No FAQ yet

## Change Log
- 2025-02-16 - Made a few changes to prepare the repo for public sharing.
- 2025-02-16 - Updated the README.