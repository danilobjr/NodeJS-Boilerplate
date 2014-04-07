'use strict';

var http = require('http'),
	express = require('express');

var app = express();

app.get('/', function (req, res) {
	res.send('Express is running');
});

var server = http.createServer(app);
server.listen(3000, function () {
	console.log('Express server is listening on port 3000');
})