'use strict';

var mongoose = require('mongoose'),
	path = require('path'),
	fs = require('fs');

// init every js (or coffeeScript) file in the /server/domain/models path
var bootstrapModels = function (config) {
	var modelsPath = path.join(config.rootPath, '/server/domain/models');
	fs.readdirSync(modelsPath).forEach(function (file) {
		if (/(.*)\.(js$|coffee$)/.test(file)) {
			require(modelsPath + '/' + file);
		}
	});
};

module.exports.setup = function (config) {
	mongoose.connect(config.mongo.uri, config.mongo.options);

	var db = mongoose.connection;

	db.on('error', function (error) {
		console.log('# Error on database: ');
		console.error(error);
		throw new Error(error);
	});
	
	db.once('open', function () {
		console.log('# Database open');
	});

	bootstrapModels(config);
};