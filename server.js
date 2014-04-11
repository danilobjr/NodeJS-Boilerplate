'use strict';

var http = require('http'),
	express = require('express'),
	omni = require('omni-di');

// set 'development' as default environment 
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// set config options
var config = require('./server/config/config');

// database settings
var mongoose = require('./server/config/mongoose').setup(config);

// dependency injector setting
omni.addInjectToFunctionPrototype(); // Attaches a convenience helper .inject(di) to Function.prototype
var di = omni();
require('./server/config/dependencyInjector').createDependencies(mongoose, di);

// put data to database
require('./server/config/dbSeed').insertModels.inject(di);

// passport settings
require('./server/config/passport').setup.inject(di);

var app = express();

// express config
require('./server/config/express')(app, config);

// routes' register
require('./server/web/routes')(app, di);

var server = http.createServer(app);
server.listen(config.port, function () {
	console.log('# Express server is listening on port ' + config.port + ' on ' + config.env + ' mode...');
});