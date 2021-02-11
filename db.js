/**
 * for mongodb connection
 */
const mongoose = require('mongoose');
require('dotenv').config();
const conString = process.env.DB_CONNECTION;
mongoose.connect(
  conString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log('Successfully connect to MongoDB...');
    else
      console.log(
        'Connection to MongoDb failed :' + JSON.stringify(err, undefined, 2)
      );
  }
);

module.exports = mongoose;
