'use strict';

var di = require('./../../config/dependencyInjector'),
	userManager = require('./../../domain/managers/userManager').inject(di),
	accountManager = require('./../../domain/managers/accountManager').inject(di),
	passport = require('passport');

module.exports.loginPage = function (req, res) {
	res.render('account/login', {
		message: {
			success: req.flash('login-success'),
			description: req.flash('login-message')
		}
	});
};

module.exports.login = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
});

module.exports.logout = function (req, res) {
	req.logout();
	res.redirect('/login');
};

module.exports.signupPage = function (req, res) {
	res.render('account/signup', { message: req.flash('signup') });
};

module.exports.signup = function (req, res, next) {
	// data

	var newUserData = req.body;

	// callbacks

	var createUserCallback = function (newUser) {
		userManager.saveUser(newUser, saveUserCallback);
	};

	var saveUserCallback = function (saveError, userSaved, message, done) {
		if (saveError) {
			if (saveError.name === 'ValidationError') {
				var errors = saveError.errors;
				req.flash('signup', errors[Object.keys(errors)[0]].message);
				return res.redirect('/signup');
			}

			return next(saveError);
		}

		if (!done) {
			req.flash('signup', message);
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

module.exports.forgotPasswordPage = function (req, res) {
	res.render('account/forgot-password', {
		message: {
			success: req.flash('forgot-password-success'),
			description: req.flash('forgot-password-message')
		}
	});
};

module.exports.sendInstructionsToResetPassword = function (req, res, next) {
	var data = {
		email: req.body.email,
		urlOrigin: req.headers.origin
	};

	accountManager.sendInstructionsToResetPassword(data, function (err, user, message, done) {
		if (err) {
			return next(err);
		}

		req.flash('forgot-password-success', done.toString());
		req.flash('forgot-password-message', message);

		res.redirect('/forgot-password');
	});
};

module.exports.resetPasswordPage = function (req, res) {
	var token = req.query.token;
	res.render('account/reset-password', {
		token: token,
		message: {
			success: req.flash('reset-password-success'),
			description: req.flash('reset-password-message')
		}
	});
};

module.exports.resetPassword = function (req, res, next) {
	var data = {
		_id: req.body.token,
		newPassword: req.body.newPassword
	};

	userManager.resetPassword(data, function (err, user, message, done) {
		if (err) { return next(err); }

		if (done) {
			req.flash('login-success', 'true');
			req.flash('login-message', 'Login with your new password');
			res.redirect('/login');
		} else {
			req.flash('reset-password-success', 'false');
			req.flash('reset-password-message', message);
			res.redirect('/reset-password');
		}
	});
};

module.exports.changePasswordPage = function (req, res) {
	res.render('account/change-password', {
		message: {
			success: req.flash('change-password-success'),
			description: req.flash('change-password-message')
		}
	});
};

module.exports.changePassword = function (req, res, next) {
	var data = {
		_id: req.user._id,
		oldPassword: req.body.oldPassword,
		newPassword: req.body.newPassword
	};

	userManager.changePassword(data, function (error, user, message, done) {
		if (error) { return next(error); }

		req.flash('change-password-success', done.toString());
		req.flash('change-password-message', message);
		res.redirect('/change-password');
	});
};

module.exports.deleteAccount = function (req, res, next) {
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
