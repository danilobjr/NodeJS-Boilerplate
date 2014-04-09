'use strict';

module.exports = {
	isLoggedIn: function (req, res, next) {
		if (req.isAuthenticated()) { 
			next(); 
		} else {
			res.redirect('/login');
		}
	},
	putUserInResLocal: function (req, res, next) {
		res.locals.session = undefined;

		if (req.user) {
			res.locals.session = {
				user: req.user.info
			}
		}

		next();
	}
};