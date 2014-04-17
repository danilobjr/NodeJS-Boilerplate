'use strict';

var accountController = require('./../controllers/accountController'),
	isLoggedIn = require('./../../config/middleware').isLoggedIn,
	di = require('./../../config/dependencyInjector');

module.exports = function (app) {
	app.get('/login', accountController.loginPage);
	app.post('/login', accountController.login);
	app.get('/logout', accountController.logout);
	app.get('/signup', accountController.signupPage);
	app.post('/signup', accountController.signup.inject(di));
	app.get('/change-password', isLoggedIn, accountController.changePasswordPage);
	app.post('/change-password', isLoggedIn, accountController.changePassword.inject(di));
	app.get('/delete-account', isLoggedIn, accountController.deleteAccount.inject(di));
};