'use strict';

var http = require('http'),
	express = require('express');

// setting environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'production') {
	process.env.MONGOLAB_URI = 'mongodb://admin:admin@ds031088.mongolab.com:31088/nodejs-boilerplate';
}

// set config options
var config = require('./server/config/config');

// database settings
require('./server/config/mongoose').setup(config);

// dependency injector settings
var di = require('./server/config/dependencyInjector');

// put data in database
require('./server/config/dbSeed').insertModels.inject(di);

// passport.js settings
require('./server/config/passport').setup.inject(di);

var app = express();

// express config
require('./server/config/express')(app, config);

// routes' register
require('./server/web/routes')(app);

var server = http.createServer(app);
server.listen(config.port, function () {
	console.log('# Express server is listening on port ' + config.port + ' on ' + config.env + ' mode...');
});
