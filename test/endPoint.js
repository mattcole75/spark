// Description: Setup configuration for supertest
// Developer: Matt Cole
// Date created: 2022-03-12
// Change history:
//  1. 

let supertest = require('supertest');
const config = require('../config/config');
const application = config.get('application');
const version = config.get('version');
const baseUrl = 'http://localhost:1337/' + application + '/api/' + version;

const endPoint = supertest(baseUrl);

module.exports = endPoint;