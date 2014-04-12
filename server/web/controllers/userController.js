'use strict';

module.exports.profile = function (User) {
	return function (req, res) {
		res.render('user/profile');
	};
};