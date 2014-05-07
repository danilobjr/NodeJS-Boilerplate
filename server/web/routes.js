'use strict';

var accountRoute = require('./routes/accountRoutes'),
	homeRoute = require('./routes/homeRoutes'),
	userRoute = require('./routes/userRoutes'),
	contactRoute = require('./routes/contactRoutes');

module.exports = function (app) {
	accountRoute(app);
	homeRoute(app);
	userRoute(app);
	contactRoute(app);
};
