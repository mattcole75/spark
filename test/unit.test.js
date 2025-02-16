const endPoint = require('./endPoint');
const config = require('../config/config');
const service = config.get('service');
const version = config.get('version');
const moment = require('moment');

let idToken = '7c58e9e7cd20ae44';
let wrongIdToken = '7c58f9e7cd20ae42';

let sensors = require('./data/sensor.data');

// Post sensor data
describe('Test the post sensor data functionality', () => {
    it('should return 401 when given an incorrect token ID', async() => {
        await endPoint.post(service + '/api/' + version + '/sensordata')
            .set({
                "Content-Type": "application/json",
                idToken: wrongIdToken
            })
            .send({
                id: "RIG-R&D-TMP-003", 
                value: "22"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
    });

    it('should return 401 when given an random token ID', async() => {
        await endPoint.post(service + '/api/' + version + '/sensordata')
            .set({
                "Content-Type": "application/json",
                idToken: 'adgdfgWER32543KN'
            })
            .send({
                id: "RIG-R&D-TMP-003",
                value: "22"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
    });

    sensors.forEach(sensor => {

        it('should, create a sensor reading record', async () => {
            await endPoint.post(service + '/api/' + version + '/sensordata')
                .set({
                    "Content-Type": "application/json",
                    idToken: idToken
                })
                .send([{
                    id: sensor.id, 
                    value: sensor.value,
                    eventTimestamp: sensor.eventTimestamp
                }])
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
        });

    });

    it('should deny access to the sensor data given the wrong token ID', async() => {
        await endPoint.get(service + '/api/' + version + '/sensordata')
            .set({
                idToken: wrongIdToken
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
    });

    it('should successfully return all the sensor data given the correct token ID', async() => {
        await endPoint.get(service + '/api/' + version + '/sensordata')
            .set({
                idToken: idToken
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should successfully return all the sensor data given the correct token ID and sensor ID', async() => {
        await endPoint.get(service + '/api/' + version + '/sensordata')
            .set({
                idToken: idToken,
                param: 'RIG-R&D-TMP-003'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should successfully return all the agrregated sensor data given the correct token ID', async() => {
        await endPoint.get(service + '/api/' + version + '/sensordataaaggregate')
            .set({
                idToken: idToken
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should successfully return all the aggregated sensor data given the correct token ID and sensor ID', async() => {
        await endPoint.get(service + '/api/' + version + '/sensordataaaggregate')
            .set({
                idToken: idToken,
                param: 'RIG-R&D-TMP-003'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });
});

describe('Bug replication and fixes', () => {

    it('should return 200 server is up', async () => {
        await endPoint.get('')
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
            expect(res.body.msg).toBe('Server is up!');
        })
    });

    // monitoring the logs on the live server and clocked this request... someone trying to hack the system? 
    it('should return 404 Not Found', async () => {
        await endPoint.get('.env')
        .expect(404)
        .then(res => {
            expect(res.res.statusMessage).toBe('Not Found');
        })
    });

    it('should return 404 Not Found', async () => {
        await endPoint.get('/index.html')
        .expect(404)
        .then(res => {
            expect(res.res.statusMessage).toBe('Not Found');
        })
    });
});