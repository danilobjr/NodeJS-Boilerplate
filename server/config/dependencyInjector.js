'use strict';

var omni = require('omni-di'),
	mongoose = require('mongoose');

var createDependencies = function (di) {
	di.assemble([
		[
			{
				name: 'gravatar',
				obj: require('gravatar')
			},
			{
				name: 'email',
				obj: require('./email')
			},
			{
				name : 'User',
				factory : function() {
					return mongoose.model('User');
				}
			}
		]
	]);
};

var setup = function () {
	omni.addInjectToFunctionPrototype();
	var di = omni();
	createDependencies(di);
	return di;
};

module.exports = setup();
