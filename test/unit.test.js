const endPoint = require('./endPoint');
let idToken = '7c58e9e7cd20ae44';
let wrongIdToken = '7c58f9e7cd20ae42';

// Post sensor data
describe('Test the post sensor data functionality', () => {
    it('should return 401 when given an incorrect token ID', async() => {
        await endPoint.post('/sensordata')
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
        await endPoint.post('/sensordata')
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
        await endPoint.post('/sensordata')
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
        await endPoint.get('/sensordata')
            .set({
                idToken: wrongIdToken
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
    });

    it('should successfully return all the sensor data given the correct token ID', async() => {
        await endPoint.get('/sensordata')
            .set({
                idToken: idToken
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });
});