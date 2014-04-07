'use strict';

var engine = require('ejs-locals');

module.exports = function (app, config) {

	app.configure(function () {
		// ejs as view engine
		app.engine('ejs', engine);

		// views location
		app.set('views', config.rootPath + '/server/web/views');

		// so you can use: res.render('index')
		app.set('view engine', 'ejs');
	});
};