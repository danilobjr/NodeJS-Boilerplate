'use strict';

var userController = require('./../controllers/userController'),
	isLoggedIn = require('./../../config/middleware').isLoggedIn;

module.exports = function (app) {
	app.get('/user/profile/:id', isLoggedIn, userController.profile);
};