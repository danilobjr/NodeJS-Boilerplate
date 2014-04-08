'use strict';

module.exports = {
	putUserInResLocal: function (req, res, next) {
		res.locals.session = undefined;

		if (req.user) {
			res.locals.session = {
				user: req.user
			}
		}

		next();
	}
};