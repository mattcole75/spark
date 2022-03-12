// Description: The entry point for the Spark application
// Developer: Matt Cole
// Date created: 2022-03-11
// Change history:
//  1.

'use strict';
require('dotenv').config({ path: './config.env' });
const database = require('./config/database');
const config = require('./config/config');
const application = config.get('application');
const express = require('./config/express');


const PORT = process.env.PORT || 1337;

const app = express();

app.use(function (err, _req, res) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

database.connectToServer((err) => {
    if (err) {
        console.error(err);
        process.exit();
    } else {
        app.listen(PORT, () => {
            console.log(application + ` server is running on port: ${PORT}`);
        });
    }
});