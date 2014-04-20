'use strict';

var di = require('./../../config/dependencyInjector'),
	userManager = require('./../../domain/managers/userManager').inject(di),
	passport = require('passport');

module.exports = function (User, gravatar) {
	var loginPage = function (req, res) {
		res.render('account/login', { message: req.flash('login') });
	};	

	var login = passport.authenticate('local', { 
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});

	var logout = function (req, res) {
		req.logout();
		res.redirect('/login');
	};

	var signupPage = function (req, res) {
		res.render('account/signup', { 
			message: {
				success: req.flash('signup-success'),
				description: req.flash('signup-message')
			}
		});
	};

	var signup = function (req, res, next) {

		// data

		var newUserData = req.body;

		// callbacks

		var createUserCallback = function (newUser) {
			userManager.saveUser(newUser, saveUserCallback);
		};

		var saveUserCallback = function (saveError, userSaved, message, done) {
			if (saveError) {
				if (saveError.name == 'ValidationError') {
					var errors = saveError.errors;
					req.flash('signup-success', 'false');
					req.flash('signup-message', errors[Object.keys(errors)[0]].message);
					return res.redirect('/signup');
				}
				
				return next(saveError);
			}

			if (!done) {
				req.flash('signup-success', done.toString());
				req.flash('signup-message', message);
				return res.redirect('/signup');
			}

			passport.authenticate('local', authenticateCallback)(req, res, next);
		};

		var authenticateCallback = function (authenticateError, userSaved) {
			if (authenticateError) { return next(authenticateError); }

			req.logIn(userSaved, function(loginError) {
				if (loginError) { return next(loginError); }
				res.redirect('/');
			});
		};

		// execution

		userManager.createUser(newUserData, createUserCallback);
	};

	var changePasswordPage = function (req, res) {
		res.render('account/change-password', {
			message: {
				success: req.flash('change-password-success'),
				description: req.flash('change-password-message')
			}
		});
	};

	var changePassword = function (req, res, next) {
		var data = {
			_id: req.user._id,
			oldPassword: req.body.oldPassword,
			newPassword: req.body.newPassword
		};

		userManager.changePassword(data, function (error, user, message, done) {
			// TODO: deal with schemaErrors
			if (error) { return next(error); }

			// if user was not found, redirect to logout, cause session is over
			if (!user) {
				return res.redirect('/logout');
			}
			
			req.flash('change-password-success', done.toString());
			req.flash('change-password-message', message);
			res.redirect('/change-password');
		});
	};

	var deleteAccount = function (req, res, next) {
		userManager.deleteUser(req.user._id, function (error, user, message, done) {
			if (error) { return next(error); }

			if (!done) {
				req.flash('profile-success', done.toString());
				req.flash('profile-message', message);
				res.redirect('/profile');
			} else {
				res.redirect('/logout');
			}
		});
	};

	return {
		loginPage: loginPage,
		login: login,
		logout: logout,
		signupPage: signupPage,
		signup: signup,
		changePasswordPage: changePasswordPage,
		changePassword: changePassword,
		deleteAccount: deleteAccount
	};
};