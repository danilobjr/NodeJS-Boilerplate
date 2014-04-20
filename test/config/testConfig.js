'use strict';

module.exports = {
	rootPath: __dirname + '../../..',
	mongo: {
		uri: 'mongodb://localhost/nodejs-boilerplate-test',
		options: {
			db: {
				safe: true
			}
		}
	}
};