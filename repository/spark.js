// Description: Provides the repository for the spark application
// Developer: Matt Cole
// Date created: 2022-03-12
// Change history:
//  1. 

const database = require('../config/database');

const postSensorData = (req, next) => {
    
    const dbConnect = database.getDb();

    dbConnect
        .collection('sensorData')
        .insertOne(req, function (err, result) {
        if(err)
            next({status: 400, msg: err}, null);
        else
            next(null, {status: 201, data: result});
    });
}

const getSensorData = (req, next) => {

    const dbConnect = database.getDb();

    dbConnect
        .collection('sensorData')
        .find({})
        // .limit(200)
        .toArray(function (err, result) {
        if (err) 
            next({status: 400, msg: err}, null);
        else 
            next(null, {status: 200, data: result});
        
        });
};

module.exports = {
    getSensorData: getSensorData,
    postSensorData: postSensorData 
}

// // This section will help you create a new record.
// recordRoutes.route('/listings/recordSwipe').post(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const matchDocument = {
//     listing_id: req.body.id,
//     last_modified: new Date(),
//     session_id: req.body.session_id,
//     direction: req.body.direction,
//   };

//   dbConnect
//     .collection('matches')
//     .insertOne(matchDocument, function (err, result) {
//       if (err) {
//         res.status(400).send('Error inserting matches!');
//       } else {
//         console.log(`Added a new match with id ${result.insertedId}`);
//         res.status(204).send();
//       }
//     });
// });

// // This section will help you update a record by id.
// recordRoutes.route('/listings/updateLike').post(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { _id: req.body.id };
//   const updates = {
//     $inc: {
//       likes: 1,
//     },
//   };

//   dbConnect
//     .collection('listingsAndReviews')
//     .updateOne(listingQuery, updates, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error updating likes on listing with id ${listingQuery.id}!`);
//       } else {
//         console.log('1 document updated');
//       }
//     });
// });

// // This section will help you delete a record.
// recordRoutes.route('/listings/delete/:id').delete((req, res) => {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { listing_id: req.body.id };

//   dbConnect
//     .collection('listingsAndReviews')
//     .deleteOne(listingQuery, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
//       } else {
//         console.log('1 document deleted');
//       }
//     });
// });