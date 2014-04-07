'use strict';

var http = require('http'),
	express = require('express'),
	engine = require('ejs-locals');

// set 'development' as default environment 
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// set config options
var config = require('./server/config/config');

var app = express();

app.configure(function () {
	// ejs as view engine
	app.engine('ejs', engine);

	// views location
	app.set('views', __dirname + '/server/web/views');

	// so you can use: res.render('index')
	app.set('view engine', 'ejs');
});

// routes' register
require('./server/web/routes')(app);

var server = http.createServer(app);
server.listen(config.port, function () {
	console.log('Express server is listening on port ' + config.port + ' on ' + config.env + ' mode...');
});