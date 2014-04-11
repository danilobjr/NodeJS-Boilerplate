'use strict';

var accountRoute = require('./routes/accountRoutes'),
	homeRoute = require('./routes/homeRoutes');

module.exports = function (app, di) {
	accountRoute(app, di);
	homeRoute(app);
};