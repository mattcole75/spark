const convict = require('convict');

const config = convict({
    version: {
        type: String,
        default: '0.1'
    },
    application: {
        type: String,
        default: 'Spark'
    },
    db: {
        host: {
            type: String,
            default: process.env.DB_HOST
        },
        port: {
            type: Number,
            default: process.env.DB_PORT
        },
        user: {
            type: String,
            default: process.env.DB_USER
        },
        password: {
            type: String,
            default: process.env.DB_PASS
        },
        database: {
            type: String,
            default: process.env.DB_DB
        },
        multipleStatements: {
            type: Boolean,
            default: true
        }
    }
});

module.exports = config;