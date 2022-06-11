# spark
Node Express MongoDB api for a sensor network

## Installation

Use the package manager [npm](https://github.com/mattcole75/spark) to install Spark once you have cloned the repository.

```bash
npm install
```
## description
This API is a stand alone system to encourage and enable individuals to develop sensor networks.

## Data requirements
```
    - name: String(1 - 64)
    - description: String(1 - 256)
    - address.line1: String(1 - 64)
    - address.line2: String(1 - 64)
    - address.city: String(1 - 64)
    - address.postcode: String(1 - 16)
    - latitude: String(1 - 32)
    - longitude: String(1 - 32)
    - what3words: String(1 - 256)
```
## Usage

### POST Sensor Record:
This API will accept the id and sensor payload and store it in the database. The server date and time is added to each payload.
```
POST http://localhost:1337/spark/api/0.1/sensordata

Requires JSON Header:
    {
        idToken: 'a pre configured access token'
    }

Requires JSON Body:
    {
        The Sensor Payload in JSON format
    }

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
        idToken: 'a pre configured access token'
    }

Returns:
    - 200 ok, returns the stored sensor data
    - 401 Unauthorised
    - 500 Internal error message
```

### GET API Status:
This API will return the matching locations provided it is in use for all levels.
```
GET http://localhost:1337/spark/api/0.1

Requires JSON Header:
    {
    }

Returns:
    - 200 ok, msg: The server is up!
```

## License
[GNU GENERAL PUBLIC LICENSE V3](https://www.gnu.org/licenses/gpl-3.0.en.html)
