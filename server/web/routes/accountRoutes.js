'use strict';

var accountController = require('./../controllers/accountController');

module.exports = function (app) {
	app.get('/login', accountController.login);
	app.post('/login', accountController.signin);
	app.get('/logout', accountController.logout);
};