/**
 * Created by digibrose on 09/12/2016.
 */
var mongoose = require ('mongoose');



var dbURI = 'mongodb://localhost/Loc8r';

if (process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + dbURI);
});

mongoose.connection.on('diconnected', function () {
    console.log('Mongoose diconnected from ' + dbURI);
});

var gracefullShutdown = function (msg, callback) {
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function() {
    gracefullShutdown('nodemon restart', function () {
        proces(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function() {
    gracefullShutdown('app termination', function () {
        proces.exit(0);
    });
});

process.on('SIGTERM', function() {
    gracefullShutdown('heroku app shutdown', function () {
        proces.exit(0);
    });
});

require('./locations');