'use strict';

var accountRoute = require('./routes/accountRoutes'),
	homeRoute = require('./routes/homeRoutes'),
	userRoute = require('./routes/userRoutes');

module.exports = function (app) {
	accountRoute(app);
	homeRoute(app);
	userRoute(app);
};