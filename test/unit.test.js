const endPoint = require('./endPoint');
const config = require('../config/config');
const application = config.get('application');
const version = config.get('version');

let idToken = '7c58e9e7cd20ae44';
let wrongIdToken = '7c58f9e7cd20ae42';

// Post sensor data
describe('Test the post sensor data functionality', () => {
    it('should return 401 when given an incorrect token ID', async() => {
        await endPoint.post(application + '/api/' + version + '/sensordata')
            .set({
                "Content-Type": "application/json",
                idToken: wrongIdToken
            })
            .send({
                id: 'ALT-TMP-001',
                location: 'ALT',
                monitoring: 'CER UPS Temperature',
                value: 20,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
    });

    it('should return 401 when given an random token ID', async() => {
        await endPoint.post(application + '/api/' + version + '/sensordata')
            .set({
                "Content-Type": "application/json",
                idToken: 'adgdfgWER32543KN'
            })
            .send({
                id: 'ALT-TMP-001',
                location: 'ALT',
                monitoring: 'CER UPS Temperature',
                value: 20,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
    });

    

    it('should return 201 when given an correct token ID', async() => {
        await endPoint.post(application + '/api/' + version + '/sensordata')
            .set({
                "Content-Type": "application/json",
                idToken: idToken
            })
            .send({
                id: 'ALT-TMP-001',
                location: 'ALT',
                monitoring: 'CER UPS Temperature',
                value: 20,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
    });

    it('should deny access to the sensor data given the wrong token ID', async() => {
        await endPoint.get(application + '/api/' + version + '/sensordata')
            .set({
                idToken: wrongIdToken
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
    });

    it('should successfully return all the sensor data given the correct token ID', async() => {
        await endPoint.get(application + '/api/' + version + '/sensordata')
            .set({
                idToken: idToken
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