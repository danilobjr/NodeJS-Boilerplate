'use strict';

var omni = require('omni-di');

var createDependencies = function (mongoose, di) {
	di.assemble([
		[
			{
				name: 'gravatar',
				obj: require('gravatar')
			},
			{
				name: 'userManager',
				obj: require('./../domain/managers/userManager')
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

module.exports.setup = function (mongoose) {
	// Attaches a convenience helper .inject(di) to Function.prototype
	omni.addInjectToFunctionPrototype(); 
	var di = omni();

	createDependencies(mongoose, di);

	return di;
};