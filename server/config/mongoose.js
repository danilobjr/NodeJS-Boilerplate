'use strict';

var mongoose = require('mongoose');

var bootstrapModels = function () {
	require('./../domain/models/user');
};

module.exports = function (config) {
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

	bootstrapModels();
};