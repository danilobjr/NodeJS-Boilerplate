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
			if (saveError) { return next(saveError); }

			if (numberAffected) {
				passport.authenticate('local', function(authenticateError, user, info) {
					if (authenticateError) { return next(authenticateError); }

					if (!user) {
						req.flash('signup-success', false);
						req.flash('signup-message', info.message);
						return res.redirect('/signup');
					}

					req.logIn(user, function(loginError) {
						if (loginError) { return next(loginError); }
						res.redirect('/');
					});
				})(req, res, next);
			} else {
				req.flash('signup-success', false);
				req.flash('signup-message', 'User not created');
				return res.redirect('/signup');
			}
		});
	};
};
