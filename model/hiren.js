/**
 * Created by prism on 5/20/14.
 */
var auth = require('../auth.js');
var mongoose = require( 'mongoose' );

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + auth['mongodb']);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

var authSchema = new mongoose.Schema({
    email: String,
    password: String,
    updatedOn: { type: Date, default: Date.now }
});

exports.auth = mongoose.model('Auth', authSchema);