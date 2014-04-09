'use strict';

var accountController = require('./../controllers/accountController');

module.exports = function (app) {
	app.get('/login', accountController.loginPage);
	app.post('/login', accountController.login);
	app.get('/logout', accountController.logout);
};