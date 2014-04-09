'use strict';

var express = require('express'),
	engine = require('ejs-locals'),
	passport = require('passport'),
	flash = require('connect-flash'),
	middleware = require('./middleware');

module.exports = function (app, config) {

	app.configure(function () {
		// public files (assets: js, css)
		app.use(express.static(config.rootPath + '/public'));
		// ejs as view engine
		app.engine('ejs', engine);
		// views location
		app.set('views', config.rootPath + '/server/web/views');
		// so you can use: res.render('index')
		app.set('view engine', 'ejs');

		// parses objects to and from request
		app.use(express.json());
		app.use(express.urlencoded());

		// parses the Cookie header field and populates req.cookies with an object keyed by the cookie names
		app.use(express.cookieParser());
		// working with sessions
		app.use(express.session({ secret: 'nodejsboilerplateveryveryverysecretphrase' }));

		// send flash message to response
		app.use(flash());

		// passport
		app.use(passport.initialize());
		app.use(passport.session());

		// put user in a res.locals variable (mimic session variable)
		app.use(middleware.putUserInResLocal);

		app.use(app.router);

		// 404 Not Found handler
		app.use(middleware.notFoundHandler);
	});
};