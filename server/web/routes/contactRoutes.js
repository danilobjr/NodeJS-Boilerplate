'use strict';

var contactController = require('./../controllers/contactController');

module.exports = function (app) {
	app.get('/contact', contactController.index);
	app.post('/contact', contactController.sendMessage);
};
