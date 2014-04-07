'use strict';

var homeRoute = require('./routes/homeRoutes');

module.exports = function (app) {
	homeRoute(app);
};