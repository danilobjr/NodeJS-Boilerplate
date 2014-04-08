'use strict';

var homeController = require('./../controllers/homeController'),
	isLoggedIn = require('./../../config/middleware').isLoggedIn;

module.exports = function (app) {
	app.get('/', isLoggedIn, homeController.index);
};