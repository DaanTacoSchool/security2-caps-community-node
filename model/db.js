// http://theholmesoffice.com/mongoose-connection-best-practice/

// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Build the connection string
var dbURI = process.env.DBURI || 'mongodb://localhost/communitybackend';

// Create the database connection
mongoose.connect(dbURI, {
  useMongoClient: true,
  keepAlive: 120
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => console.log('Mongoose default connection open to ' + dbURI));

// If the connection throws an error
mongoose.connection.on('error', (err) => console.log('Mongoose default connection error: ' + err));

// When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS // For example
require('./user');
// require('./../model/team');