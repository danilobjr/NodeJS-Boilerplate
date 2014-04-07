'use strict';

var http = require('http'),
	express = require('express');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config');

var app = express();

app.get('/', function (req, res) {
	res.send('Express is running');
});

var server = http.createServer(app);
server.listen(config.port, function () {
	console.log('Express server is listening on port ' + config.port + ' on ' + config.env + ' mode...');
});