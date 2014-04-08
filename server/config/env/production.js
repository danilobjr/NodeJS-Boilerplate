'use strict';

module.exports = {
	env: 'production',
	mongo: {
		uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodejs-boilerplate-dev'
	}
};