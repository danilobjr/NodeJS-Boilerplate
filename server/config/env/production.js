'use strict';

module.exports = {
	env: 'production',
	mongo: {
		uri: process.env.MONGOLAB_URI || 'mongodb://localhost/nodejs-boilerplate-prod'
	}
};
