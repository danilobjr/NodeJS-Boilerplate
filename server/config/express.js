'use strict';

var express = require('express'),
	engine = require('ejs-locals'),
	passport = require('passport'),
	flash = require('connect-flash'),
	middleware = require('./middleware'),
	MongoStore = require('connect-mongo')(express);

module.exports = function (app, config) {

	app.configure('production', function () {
		process.env.MONGOLAB_URI = 'mongodb://admin:admin@ds031088.mongolab.com:31088/nodejs-boilerplate';
	});

	app.configure('development', function () {
		// add the livereload script to the response
		app.use(require('connect-livereload')());
	});

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

		// persist sessions with MongoStore
		app.use(express.session({
			secret: config.cookieSecretPhrase,
			store: new MongoStore({
				url: config.mongo.uri
			}, function () {
				console.log('db connection open');
			})
		}));

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

		// 500 Internal Server Error handler
		app.use(middleware.internalServerErrorHandler);
	});
};
