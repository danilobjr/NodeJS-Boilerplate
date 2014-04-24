'use strict';

// __dirname is not recognized in files in subdirectories
var rootPath = __dirname + '../../../..';

module.exports = {
	rootPath: rootPath,
	port: process.env.PORT || 3000,
	cookieSecretPhrase: 'nodejsboilerplateveryveryverysecretphrase',
	mongo: {
		options: {
			db: {
				safe: true
			}
		}
	}
};
