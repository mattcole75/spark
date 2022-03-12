// Description: a function to initiate a Mongo database connection
// Developer: Matt Cole
// Date created: 2022-03-11
// note: sudo service mongod start
// Change history:
//  1. 

const { MongoClient } = require('mongodb');
const connectionString = process.env.DB_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('spark');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};