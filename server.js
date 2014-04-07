'use strict';

var http = require('http'),
	express = require('express');

// set 'development' as default environment 
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// set config options
var config = require('./server/config/config');

var app = express();

// routes' register
require('./server/web/routes')(app);

var server = http.createServer(app);
server.listen(config.port, function () {
	console.log('Express server is listening on port ' + config.port + ' on ' + config.env + ' mode...');
});