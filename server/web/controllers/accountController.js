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

module.exports.signup = function (User, gravatar) {
	return function (req, res, next) {
		var newUser = new User({
			email: req.body.email
		});

		newUser.avatar = gravatar.url(newUser.email, { d: 'mm' });
		newUser.fullName = req.body.fullName;
		newUser.password = req.body.password;

		if (req.body.country) {
			newUser.country = req.body.country;
		}

		if (req.body.occupation) {
			newUser.occupation = req.body.occupation;
		}

		if (req.body.company) {
			newUser.company = req.body.company;
		}

		newUser.save(function (saveError, user, numberAffected) {
			if (saveError) { 
				if (saveError.name = 'ValidationError') {
					var errors = saveError.errors;
					req.flash('signup-success', 'false');
					req.flash('signup-message', errors[Object.keys(errors)[0]].message);
					return res.redirect('/signup');
				}
				
				return next(saveError);
			}

			if (numberAffected) {
				passport.authenticate('local', function(authenticateError, user, info) {
					if (authenticateError) { return next(authenticateError); }

					req.logIn(user, function(loginError) {
						if (loginError) { return next(loginError); }
						res.redirect('/');
					});
				})(req, res, next);
			} else {
				req.flash('signup-success', 'false');
				req.flash('signup-message', 'User not created');
				return res.redirect('/signup');
			}
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

module.exports.changePassword = function (User) {
	return function (req, res, next) {
		User.findById(req.user._id, function (errorFind, user) {
			if (errorFind) { return next(errorFind); }

			// if user was not found, redirect to logout, cause session is over
			if (!user) {
				res.redirect('/logout');
			}

			if (user.authenticate(req.body.oldPassword)) {

				user.password = req.body.newPassword;

				user.save(function (errorSave, user, numberAffected) {
					if (errorSave) { return next(errorSave); }

					var success = 'false',
						message = '';

					if (numberAffected) {
						success = 'true';
						message = 'Password changed';
					} else {
						message = 'Password could not change. Try later'
					}

					req.flash('change-password-success', success);
					req.flash('change-password-message', message);
					res.redirect('/change-password');
				});
			} else {
				req.flash('change-password-success', 'false');
				req.flash('change-password-message', 'This is not your current password');
				res.redirect('/change-password');
			}
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