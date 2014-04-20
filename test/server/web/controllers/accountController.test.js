'use strict';

// fake config setup
var testConfig = require('./../../../config/testConfig');


var should = require('should'),
	gravatar = require('gravatar'),
	fakeFlashMessage = require(testConfig.rootPath + '/test/config/fakes/flashMessage'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	accountController = require(testConfig.rootPath + '/server/web/controllers/accountController')(User, gravatar),
	userManager = require(testConfig.rootPath + '/server/domain/managers/userManager')(User, gravatar);

// passport setup
require(testConfig.rootPath + '/server/config/passport').setup(User);

describe('accountController', function () {
	var users = require(testConfig.rootPath + '/test/config/modelsFactory').createUsers(User, gravatar);

	var request = {
		flash: fakeFlashMessage
	};

	var response = {};

	beforeEach(function (done) {
		request = { flash: fakeFlashMessage };
		response = {};
		User.find({}).remove(function () {
			User.create(users, function (error) {				
				done();
			});
		});
	});

	afterEach(function () {
		request.flash().clear();
	});

	describe('#loginPage', function () {
		it('should render "account/login" view', function () {
			response.render = function (viewName) {
				viewName.should.be.exactly('account/login');
			};

			accountController.loginPage(request, response);
		});

		it('should send a flash message to view', function () {
			response.render = function (viewName, viewModel) {
				viewModel.should.have.property('message');
				viewModel.message.should.be.exactly('This test should pass');
			};

			request.flash('login', 'This test should pass');

			accountController.loginPage(request, response);
		});
	});

	describe('#logout', function () {
		it('should logout user', function () {
			response.redirect = function () { };

			var logoutCalled = false;

			request.logout = function () {
				logoutCalled = true;
			};

			accountController.logout(request, response);

			logoutCalled.should.be.true;
		});

		it ('should redirect to /login route', function () {
			request.logout = function () { };

			response.redirect = function (route) {
				route.should.be.exactly('/login');
			};

			accountController.logout(request, response);
		});
	});

	describe('#signupPage', function () {
		it('should render "account/signup" view', function () {
			response.render = function (viewName) {
				viewName.should.be.exactly('account/signup');
			};

			accountController.signupPage(request, response);
		});

		it('should send a flash message to view', function () {
			response.render = function (viewName, viewModel) {
				viewModel.should.have.property('message');
				viewModel.message.should.have.properties('success', 'description');
				viewModel.message.success.should.exactly('true');
				viewModel.message.description.should.exactly('Some message');
			};

			request.flash('signup-success', 'true');
			request.flash('signup-message', 'Some message');

			accountController.signupPage(request, response);
		});
	});

	describe('#signup', function () {
		it('should sign up a user without errors', function (done) {
			var logInCalled = false;

			request.body = {
				fullName: 'Full Name',
				email: 'name@email.com',
				password: '123456'
			};

			request.logIn = function (logInCalled) {				
				return function (user, callback) {
					logInCalled = true;
					setTimeout(function () {
						callback(null);
						logInCalled.should.be.true;
						done();
					}, 0);
				};
			}(logInCalled);

			response.redirect = function () { };

			accountController.signup(request, response, done);
		});

		it('should redirect to "/" route', function (done) {
			request.body = {
				fullName: 'Full Name',
				email: 'name@email.com',
				password: '123456'
			};

			request.logIn = function (user, callback) {
				setTimeout(function () {
					callback(null);
				}, 0);
			};

			response.redirect = function (route) {
				route.should.be.exactly('/');
				done();
			};

			accountController.signup(request, response, done);
		});

		it('should send fail message if try to sign up a user with a email that is already saved on database', function (done) {
			// arrange

			request.body = {
				fullName: 'Full Name',
				email: 'wayne@email.com',
				password: '123456'
			};

			request.logIn = function (user, callback) {
				setTimeout(function () {
					callback(null);
				}, 0);
			};

			response.redirect = function (route) {
				// assert
				route.should.be.exactly('/signup');
				request.flash('signup-success').should.be.exactly('false');
				request.flash('signup-message').should.be.exactly('Email is already in use');

				done();
			};

			// act

			accountController.signup(request, response, done);
		});
	});

	describe('#changePasswordPage', function () {
		it('should render "account/change-password" view', function () {
			response.render = function (viewName) {
				viewName.should.be.exactly('account/change-password');
			};

			accountController.changePasswordPage(request, response);
		});

		it('should send a flash message to view', function () {
			response.render = function (viewName, viewModel) {
				viewModel.should.have.property('message');
				viewModel.message.should.have.properties('success', 'description');
				viewModel.message.success.should.exactly('true');
				viewModel.message.description.should.exactly('Some message');
			};

			request.flash('change-password-success', 'true');
			request.flash('change-password-message', 'Some message');

			accountController.changePasswordPage(request, response);
		});
	});

	// describe('#changePassword');
	// describe('#deleteAccount');
});