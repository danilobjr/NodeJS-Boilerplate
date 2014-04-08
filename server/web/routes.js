'use strict';

var accountRoute = require('./routes/accountRoutes'),
	homeRoute = require('./routes/homeRoutes');

module.exports = function (app) {
	accountRoute(app);
	homeRoute(app);
};