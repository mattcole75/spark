// Description: Jest tests to support a TDD development approach
// Developer: Matt Cole
// Date created: 2022-03-12
// Change history:
//  1. 

const endPoint = require('./endPoint');
let idToken = '7c58e9e7cd20ae44f354d59f7a73ebb7e346d5e5a61517e33e0e97c4c79d25a826debfc57ca2e99c66108f80801059a9d2d94d14886fc98539e4ab324a5da2e125aa7e7d26af000e103fcbc75b0ed9caa75895ba26efa248fc0c2154a581786679c6a2a9120fadc9e68fef80bc30d6a8644cd19362e035a85e130d675e2e30a9';
let wrongIdToken = '7c58f9e7cd20ae44f354d59f7a73ebb7e346d5e5a61517e33e0e97c4c79d25a826debdc57ca2e99c66108f80801059a9d2d94d14686fc98539h4ab324a5da2e125aa7e7d26af000e103fcbc75b0ed9caa75895ba26efa248fc0c2154a581786679c6a2a9120fadc9e68fef80bc30d6a8644cd19362e035a85e130d675e2e30a9';

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