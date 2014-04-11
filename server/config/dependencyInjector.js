'use strict';

module.exports.createDependencies = function (mongoose, di) {
	di.assemble([
		[
			{
				name: 'gravatar',
				obj: require('gravatar')
			},
			{
				name : 'User',
				factory : function() {
					var userSchema = require('../domain/models/user').createSchema();
					return mongoose.model('User', userSchema);
				}
			}
		]
	]);
};