'use strict';
require('dotenv').config({ path: './config.env' });
const database = require('./config/database');
const config = require('./config/config');
const service = config.get('service');
const port = config.get("port");
const express = require('./config/express');

const app = express();

database.connectToServer((err) => {
    if (err) {
        console.error(err);
        process.exit();
    } else {
        app.listen(port, () => {
            console.log(service + ` service is running on port: ${port}`);
        });
    }
});