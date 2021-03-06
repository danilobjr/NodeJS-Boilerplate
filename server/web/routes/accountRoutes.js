'use strict';

var	accountController = require('./../controllers/accountController'),
	isLoggedIn = require('./../../config/middleware').isLoggedIn;

module.exports = function (app) {
	app.get('/login', accountController.loginPage);
	app.post('/login', accountController.login);
	app.get('/logout', accountController.logout);
	app.get('/signup', accountController.signupPage);
	app.post('/signup', accountController.signup);
	app.get('/change-password', isLoggedIn, accountController.changePasswordPage);
	app.post('/change-password', isLoggedIn, accountController.changePassword);
	app.get('/forgot-password', accountController.forgotPasswordPage);
	app.post('/forgot-password', accountController.sendInstructionsToResetPassword);
	app.get('/reset-password', accountController.resetPasswordPage);
	app.post('/reset-password', accountController.resetPassword);
	app.get('/delete-account', isLoggedIn, accountController.deleteAccount);
};
