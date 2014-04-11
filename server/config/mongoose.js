'use strict';

var mongoose = require('mongoose');

module.exports.setup = function (config) {
	mongoose.connect(config.mongo.uri, config.mongo.options);

	var db = mongoose.connection;

	db.on('error', function (error) {
		throw new Error(error);
		console.log('# Error on database: ');
		console.error(error);
	});
	
	db.once('open', function () {
		console.log('# Database open');
	});

	return mongoose;
};