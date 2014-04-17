'use strict';

var passport = require('passport');

module.exports.loginPage = function (req, res) {
	res.render('account/login', { message: req.flash('login') });
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
	res.render('account/signup', { 
		message: {
			success: req.flash('signup-success'),
			description: req.flash('signup-message')
		}
	});
};

module.exports.signup = function (userManager, User, gravatar) {
	return function (req, res, next) {

		var objects = {
			User: User, 
			gravatar: gravatar
		};

		userManager.createUser(req.body, objects, function (newUser) {
			userManager.saveUser(newUser, function (saveError, userSaved, message, done) {
				if (saveError) {
					if (saveError.name == 'ValidationError') {
						var errors = saveError.errors;
						req.flash('signup-success', done.toString());
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

				passport.authenticate('local', function(authenticateError, userSaved) {
					if (authenticateError) { return next(authenticateError); }

					req.logIn(userSaved, function(loginError) {
						if (loginError) { return next(loginError); }						
						res.redirect('/');
					});
				})(req, res, next);
			});
		});
	};
};

module.exports.changePasswordPage = function (req, res) {
	res.render('account/change-password', {
		message: {
			success: req.flash('change-password-success'),
			description: req.flash('change-password-message')
		}
	});
};

module.exports.changePassword = function (userManager, User) {
	return function (req, res, next) {
		var data = {
			_id: req.user._id,
			oldPassword: req.body.oldPassword,
			newPassword: req.body.newPassword
		};

		var objects = {
			User: User
		};

		userManager.changePassword(data, objects, function (error, user, message, done) {
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
};

module.exports.deleteAccount = function (User) {
	return function (req, res, next) {
		User.findById(req.user._id, function (errorFind, user) {
			if (errorFind) { return next(errorFind); }
			if (!user) { return res.redirect('/logout'); }

			user.remove(function (errorRemove, userRemoved) {
				if (errorRemove) { return next(errorRemove); }

				res.redirect('/logout');
			});
		});
	};
};