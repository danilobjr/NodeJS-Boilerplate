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

		newUser.save(function (error, user, numberAffected) {
			if (error) { return next(error); }

			var success = false,
				message = '';

			if (numberAffected) {
				success = true;
				message = 'Go to sign in page';
			} else {
				message = 'User not saved';
			}

			req.flash('signup-success', success);
			req.flash('signup-message', message);
			res.redirect('/signup');
		});
	};
};
