'use strict';

var accountRoute = require('./routes/accountRoutes'),
	homeRoute = require('./routes/homeRoutes'),
	userRoute = require('./routes/userRoutes');

module.exports = function (app, di) {
	accountRoute(app, di);
	homeRoute(app);
	userRoute(app, di);
};